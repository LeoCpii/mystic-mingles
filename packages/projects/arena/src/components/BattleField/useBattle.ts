import { useContext } from 'react';

import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { wait } from '@mingles/services/promise';

import { attack, poisonDamage } from './action-fight';
import { BattleContext } from './BattleProvider';
import { getTarget, goTo, getCoordinates, goBack, getElem } from './actions-target';
import { chooseCards, getCardsToBuy, rollbackChooseCards } from './actions-deck';
import { damageAnimation, throwingAnimation, impactAnimation, damageMultipleAnimation } from './action-animation';
import { useCanvas } from '../Canvas';

export default function useBattle() {
    const { ref } = useCanvas();
    const canvas = ref.current as HTMLCanvasElement;

    const {
        round,
        teamAlly,
        teamEnemy,
        chosenCards,

        setChosenCards,

        nextRount,
        updateTeamAlly,
        updateTeamEnemy,
    } = useContext(BattleContext);

    const isAlly = (fighter: Ally<Species>) => teamAlly.allies.some(a => a.id === fighter.id);

    const getAlive = () => {
        return [...teamAlly.priorityOrder, ...teamEnemy.priorityOrder]
            .filter(a => a.stats.life > 0)
            .sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    };

    const updateTeam = (team: Team) => {
        const isAllyTeam = teamAlly.id === team.id;

        isAllyTeam ? updateTeamAlly(team) : updateTeamEnemy(team);
    };

    const addCard = (fighter: Ally<Species>, card: Card<Species, ActiveParts>) => {
        const { newTeam, newChosenCards } = chooseCards({ teamAlly, fighter, fighterCards: chosenCards[fighter.id], card });

        updateTeam(newTeam);
        setChosenCards({ ...chosenCards, [fighter.id]: newChosenCards });
    };

    const rollbackCards = (fighter: Ally<Species>) => {
        const newTeam = rollbackChooseCards(teamAlly, fighter, chosenCards[fighter.id]);

        updateTeam(newTeam);
        setChosenCards({ ...chosenCards, [fighter.id]: [] });
    };

    const replenishCardsAndEnergy = () => {
        const energies = teamAlly.energy + 2;

        const cardsDrawn = getCardsToBuy(teamAlly);

        const newTeam = new Team({
            ...teamAlly,
            deck: cardsDrawn,
            energy: energies > 10 ? 10 : energies,
            allies: teamAlly.allies.map(a => {
                a.shield = 0;
                return a;
            })
        });

        setChosenCards({ [teamAlly.allies[0].id]: [], [teamAlly.allies[1].id]: [], [teamAlly.allies[2].id]: [] });
        updateTeam(newTeam);
        nextRount();
    };

    const endTurn = async () => {
        return new Promise((resolve) => {
            let promiseChain = Promise.resolve();

            getAlive().forEach((fighter) => {
                const _isAlly = isAlly(fighter);
                const enemies = _isAlly ? teamEnemy.priorityOrder : teamAlly.priorityOrder;

                const cards = chosenCards[fighter.id];

                if (!cards || !cards.length) { return; }

                promiseChain = promiseChain.then(() => {
                    return new Promise((resolveInner) => {
                        setTimeout(() => {
                            const promiseCards = cards.reduce((acc, card) => {
                                const target = getTarget({ card: cards[0], enemies, ally: fighter });
                                const refCoordinate = getCoordinates(fighter, target);
                                const isMelee = card.type === 'melee';

                                return acc
                                    .then(() => {
                                        if (!target.isAlive) { throw new Error('Target is dead'); }
                                    })
                                    .then(() => {
                                        return wait(() => {
                                            const { newTeam: newTeamEnemy, poisoned: poisonedTeamEnemy } = poisonDamage(teamEnemy);
                                            const { newTeam: newTeamAlly, poisoned: poisonedTeamAlly } = poisonDamage(teamAlly);

                                            if (poisonedTeamEnemy.length || poisonedTeamAlly.length) {

                                                if (poisonedTeamEnemy.length) {
                                                    damageMultipleAnimation(canvas, poisonedTeamEnemy);
                                                    updateTeamEnemy(newTeamEnemy);
                                                }

                                                if (poisonedTeamAlly.length) {
                                                    damageMultipleAnimation(canvas, poisonedTeamAlly);
                                                    updateTeamAlly(newTeamAlly);
                                                }
                                            }
                                        }, 1600);
                                    })
                                    .then(() => {
                                        if (isMelee) {
                                            return wait(() => { goTo(fighter, refCoordinate.x, refCoordinate.y); }, 500);
                                        }
                                    })
                                    .then(() => {
                                        // ANIMATION    
                                        return wait(() => {
                                            const attackData = attack({ card, target, fighter, teamAlly, teamEnemy, isAlly: _isAlly, });

                                            const { newAllyTeam, newEnemyTeam, critical, damage } = attackData;

                                            const { rect: targetRect } = getElem(target.id);
                                            const { rect: allyRect } = getElem(fighter.id);

                                            if (isMelee) {
                                                impactAnimation(fighter.id, 'attack');
                                                impactAnimation(target.id, 'took-damage');

                                                updateTeamAlly(newAllyTeam);
                                                updateTeamEnemy(newEnemyTeam);

                                                return damageAnimation(canvas, { x: targetRect.x, y: targetRect.y, }, damage, critical);
                                            } else {
                                                impactAnimation(fighter.id, 'attack');

                                                return throwingAnimation(canvas, { x: allyRect.x, y: allyRect.y }, { x: targetRect.x, y: targetRect.y })
                                                    .then(() => {
                                                        updateTeamAlly(newAllyTeam);
                                                        updateTeamEnemy(newEnemyTeam);
                                                        impactAnimation(target.id, 'took-damage');
                                                        damageAnimation(canvas, { x: targetRect.x, y: targetRect.y, }, damage, critical);
                                                    });
                                            }
                                        }, 1600);
                                    })
                                    .catch(() => { });
                            }, Promise.resolve());

                            promiseCards.then(() => {
                                goBack(fighter);
                                resolveInner();
                            });
                        }, 600);
                    });
                });
            });

            promiseChain.then(() => { resolve({}); });
        }).then(() => wait(() => { replenishCardsAndEnergy(); }, 1000));
    };

    return {
        round,
        addCard,
        endTurn,

        chosenCards,
        rollbackCards,

        alive: getAlive(),
        deck: teamAlly.deck,
        energy: teamAlly.energy,
        allies: teamAlly.priorityOrder.filter(a => a.stats.life > 0),
        enemies: teamEnemy.priorityOrder.filter(a => a.stats.life > 0),
    };
};
import { useContext } from 'react';

import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { wait } from '@mingles/services/promise';

import { getAttackData, poisonDamage } from './action-fight';
import { BattleContext } from './BattleProvider';
import { getTarget, getCoordinates, goBack, getElem } from './actions-target';
import { chooseCards, getCardsToBuy, rollbackChooseCards } from './actions-deck';
import { damageAnimation, throwingAnimation, impactAnimation, damageMultipleAnimation, goTo, Coordinates, messageAnimation } from './action-animation';
import { useCanvas } from '../Canvas';
import { simpleAttack } from './action-sound';

export default function useBattle() {
    const { ref } = useCanvas();
    const canvas = ref.current as HTMLCanvasElement;

    const {
        hud,
        teamAlly,
        teamEnemy,

        setHud,

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
        const { newTeam, newChosenCards } = chooseCards({ teamAlly, fighter, fighterCards: hud.chosenCards[fighter.id], card });

        updateTeam(newTeam);
        // setHud({ ...chosenCards, [fighter.id]: newChosenCards });
        setHud({ ...hud, chosenCards: { ...hud.chosenCards, [fighter.id]: newChosenCards } });
    };

    const rollbackCards = (fighter: Ally<Species>) => {
        const newTeam = rollbackChooseCards(teamAlly, fighter, hud.chosenCards[fighter.id]);

        updateTeam(newTeam);
        setHud({ ...hud, chosenCards: { ...hud.chosenCards, [fighter.id]: [] } });
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

        // setChosenCards({ [teamAlly.allies[0].id]: [], [teamAlly.allies[1].id]: [], [teamAlly.allies[2].id]: [] });
        setHud({ ...hud, chosenCards: { [teamAlly.allies[0].id]: [], [teamAlly.allies[1].id]: [], [teamAlly.allies[2].id]: [] } });
        updateTeam(newTeam);
        nextRount();
    };

    const damageByPoison = () => {
        const { newTeam: newTeamEnemy, poisoned: poisonedTeamEnemy } = poisonDamage(teamEnemy);
        const { newTeam: newTeamAlly, poisoned: poisonedTeamAlly } = poisonDamage(teamAlly);

        return new Promise((resolve) => {
            if (poisonedTeamEnemy.length || poisonedTeamAlly.length) {
                damageMultipleAnimation(canvas, [...poisonedTeamEnemy, ...poisonedTeamAlly])
                    .then(() => {
                        updateTeamEnemy(newTeamEnemy);
                        updateTeamAlly(newTeamAlly);

                        wait(() => { resolve(''); }, 0);
                    });
            } else {
                resolve('');
            }
        });
    };

    const goToEnemy = (isMelee: boolean, fighter: Ally<Species>, coordinates: Coordinates) => {
        return new Promise((resolve) => {
            if (isMelee) {
                const { el } = getElem(fighter.id);

                goTo(el, coordinates.x, coordinates.y)
                    .then(() => { resolve(''); });
            } else {
                resolve('');
            }
        });
    };

    const damageByAttack = (fighter: Ally<Species>, target: Ally<Species>, card: Card<Species, ActiveParts>, isMelee: boolean, isAlly: boolean) => {
        return new Promise((resolve) => {
            const isStunned = fighter.isStunned;
            const hasRiseDamage = fighter.buffs.damage;
            const attackData = getAttackData({ card, target, fighter, teamAlly, teamEnemy, isAlly, });

            const { newAllyTeam, newEnemyTeam, critical, damage } = attackData;

            const { rect: targetRect } = getElem(target.id);
            const { rect: allyRect } = getElem(fighter.id);

            if (isMelee) {
                let timeout = 0;

                if (hasRiseDamage) {
                    messageAnimation(canvas, { x: allyRect.x - 40, y: allyRect.y }, 'Rise Damage');
                    timeout = 500;
                }

                wait(() => {
                    impactAnimation(fighter.id, 'attack');

                    updateTeamAlly(newAllyTeam);
                    updateTeamEnemy(newEnemyTeam);

                    if (isStunned) {
                        messageAnimation(canvas, { x: allyRect.x - 40, y: allyRect.y }, 'Miss')
                            .then(() => { resolve(''); })
                    } else {
                        simpleAttack();
                        impactAnimation(target.id, 'took-damage');
                        damageAnimation(canvas, { x: targetRect.x, y: targetRect.y, }, damage, critical)
                            .then(() => { resolve(''); });
                    }
                }, timeout);
            } else {
                impactAnimation(fighter.id, 'attack');

                throwingAnimation(canvas, { x: allyRect.x, y: allyRect.y }, { x: targetRect.x, y: targetRect.y })
                    .then(() => {
                        updateTeamAlly(newAllyTeam);
                        updateTeamEnemy(newEnemyTeam);

                        if (isStunned) {
                            messageAnimation(canvas, { x: allyRect.x - 40, y: allyRect.y }, 'Miss')
                                .then(() => { resolve(''); })
                        } else {
                            impactAnimation(target.id, 'took-damage');
                            simpleAttack();
                            damageAnimation(canvas, { x: targetRect.x, y: targetRect.y }, damage, critical)
                                .then(() => { resolve(''); });
                        }
                    });
            }
        });
    };

    const endTurn = async () => {
        return new Promise((resolve) => {
            let promiseChain = Promise.resolve();

            getAlive().forEach((fighter) => {
                const _isAlly = isAlly(fighter);
                const teamAttacked = _isAlly ? teamEnemy : teamAlly;

                const cards = hud.chosenCards[fighter.id];

                if (!cards || !cards.length) { return; };

                promiseChain = promiseChain
                    .then(() => {
                        return new Promise((resolveInner) => {
                            setHud({ ...hud, currentCards: cards, chosenCards: { ...hud.chosenCards, [fighter.id]: [] } });

                            const promiseCards = cards.reduce((acc, card) => {
                                const target = getTarget({ card: cards[0], teamAttacked, ally: fighter });
                                const refCoordinate = getCoordinates(fighter, target);
                                const isMelee = card.type === 'melee';

                                return acc
                                    .then(() => { if (!target.isAlive) { throw new Error('Target is dead'); } })
                                    .then(() => damageByPoison())
                                    .then(() => goToEnemy(isMelee, fighter, refCoordinate))
                                    .then(() => damageByAttack(fighter, target, card, isMelee, _isAlly))
                                    .then(() => acc)
                                    .catch((e) => { console.log(e); });
                            }, Promise.resolve());

                            promiseCards.then(() => {
                                goBack(fighter);
                                resolveInner();
                            });
                        });
                    });
            });
            promiseChain.then(() => { resolve({}); });
        }).then(() => wait(() => { replenishCardsAndEnergy(); }, 1000));
    };

    return {
        hud,
        addCard,
        endTurn,

        rollbackCards,

        alive: getAlive(),
        deck: teamAlly.deck,
        energy: teamAlly.energy,
        allies: teamAlly.priorityOrder.filter(a => a.stats.life > 0),
        enemies: teamEnemy.priorityOrder.filter(a => a.stats.life > 0),
    };
};
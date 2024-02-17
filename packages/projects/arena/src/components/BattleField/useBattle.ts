import { useContext } from 'react';

import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

import { attack } from './action-fight';
import { BattleContext } from './BattleProvider';
import { getTarget, goTo, goBack } from './actions-target';
import { chooseCards, getCardsToBuy, rollbackChooseCards } from './actions-deck';

export default function useBattle() {
    const {
        round,
        teamAlly,
        teamEnemy,
        chosenCards,
        setChosenCards,
        nextRount,
        setTookDamage,
        tookDamage,
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

    const endTurn = () => {
        new Promise((resolve) => {
            let promiseChain = Promise.resolve();

            // PARA CADA TAMANHO
            getAlive().forEach((fighter, index) => {
                const _isAlly = isAlly(fighter);
                const enemies = _isAlly ? teamEnemy.priorityOrder : teamAlly.priorityOrder;
                const cards = chosenCards[fighter.id];

                if (!cards || !cards.length) { return; }

                const target = getTarget({ card: cards[0], enemies, ally: fighter });

                promiseChain = promiseChain.then(() => {
                    return new Promise((resolveInner) => {
                        setTimeout(() => {
                            const promiseCards = cards.reduce((acc, card) => {
                                goTo(fighter, target);
                                return acc.then(() => {
                                    return new Promise((resolveCard) => {
                                        setTimeout(() => {

                                            const { newAllyTeam, newChosenCards, newEnemyTeam } = attack({
                                                card,
                                                index,
                                                target,
                                                fighter,
                                                teamAlly,
                                                teamEnemy,
                                                isAlly: _isAlly,
                                                chosenFighterCards: cards,
                                            });

                                            updateTeam(newEnemyTeam);
                                            updateTeam(newAllyTeam);

                                            setChosenCards(prev => {
                                                return { ...prev, [fighter.id]: newChosenCards };
                                            });

                                            setTookDamage(target);

                                            resolveCard();
                                        }, 600);
                                    });
                                });
                            }, Promise.resolve());

                            promiseCards.then(() => {
                                goBack(fighter);
                                setTookDamage(undefined);
                                resolveInner();
                            });
                        }, 600);
                    });
                });
            });

            promiseChain.then(() => { resolve({}); });
        }).then(() => replenishCardsAndEnergy());
    };

    return {
        round,
        addCard,
        endTurn,
        chosenCards,
        rollbackCards,
        setTookDamage,
        tookDamage,
        alive: getAlive(),
        deck: teamAlly.deck,
        energy: teamAlly.energy,
        allies: teamAlly.priorityOrder.filter(a => a.stats.life > 0),
        enemies: teamEnemy.priorityOrder.filter(a => a.stats.life > 0),
    };
};
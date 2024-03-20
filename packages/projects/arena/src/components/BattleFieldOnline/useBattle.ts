import { useContext } from 'react';

import Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import { cards } from '@mingles/business/species';
import type { Action } from '@mingles/business/game';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

import { getTarget } from '@/shared/actions/actions-target';
import { getAttackData } from '@/shared/actions/actions-fight-new';
import { chooseCards, rollbackChooseCards } from '@/shared/actions/actions-deck';

import { BattleFieldOnlineContext } from './BattleFieldOnlineProvider';

export default function useBattle() {
    const {
        hud,
        teams,

        updateCards,
        updateTeamAlly,

        populateTeams
    } = useContext(BattleFieldOnlineContext);

    const getAlive = () => {
        return [...teams.teamAlly.priorityOrder, ...teams.teamEnemy.priorityOrder]
            .filter(a => a.stats.life > 0)
            .sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    };

    // CARDS
    const addCard = (fighter: Ally<Species>, card: Card<Species, ActiveParts>) => {
        const { newTeam, newChosenCards } = chooseCards({ teamAlly: teams.teamAlly, fighter, fighterCards: hud.chosenCards[fighter.id], card });

        updateTeamAlly(newTeam);
        updateCards(fighter.id, newChosenCards);
    };

    const rollbackCards = (fighter: Ally<Species>) => {
        const newTeam = rollbackChooseCards(teams.teamAlly, fighter, hud.chosenCards[fighter.id]);

        updateTeamAlly(newTeam);
        updateCards(fighter.id, []);
    };

    const endTurn = () => {
        const actions = gerenateTurnActions();

        return actions;
    };

    const gerenateTurnActions = () => {
        const ids = teams.teamAlly.priorityOrder.map(a => a.id);

        return teams.teamAlly.priorityOrder
            .reduce<{ [id: string]: Array<Action> }>((acc, ally) => {
                const cards = hud.chosenCards[ally.id];

                if (!cards || !cards.length) { return acc; };

                const actions = cards.map<Action>((card) => {
                    const target = getTarget({ card: cards[0], teamEnemy: teams.teamEnemy, ally });
                    const { damage, critical, buffs, debuffs } = getAttackData({ card, target, ally });

                    return {
                        buffs,
                        damage,
                        debuffs,
                        critical,
                        targetId: target.id,
                        card: {
                            name: card.name,
                            species: card.species,
                            activePart: card.part,
                        },
                    };
                });

                acc[ally.id] = actions;

                return acc;
            }, { [ids[0]]: [], [ids[1]]: [], [ids[2]]: [] });
    };

    const playAnimations = async (data: { actions: Action[]; allyId: string; }[]) => {
        return new Promise((resolve) => {
            let promiseChain = Promise.resolve();

            console.log('teams', teams);

            getAlive().forEach((ally) => {
                const actions = data.find(a => a.allyId === ally.id)?.actions;

                if (!actions) { return; }

                promiseChain = promiseChain
                    .then(() => {
                        return new Promise((resolveInner) => {
                            const promiseActions = actions.reduce((acc, action) => {
                                const card = cards[action.card.species][action.card.activePart].find(c => c.name === action.card.name);

                                console.log('card', card);

                                return acc;
                            }, Promise.resolve());

                            promiseActions.then(() => {
                                // goBack(fighter);
                                resolveInner();
                            });
                        });
                    });
            });
            promiseChain.then(() => { resolve({}); });
        });
    };

    return {
        hud,
        teams,
        populateTeams,

        alive: getAlive(),

        deck: teams.teamAlly.deck,
        energy: teams.teamAlly.energy,
        allies: teams.teamAlly.priorityOrder.filter(a => a.stats.life > 0),
        enemies: teams.teamEnemy.priorityOrder.filter(a => a.stats.life > 0),

        // TURN
        endTurn,

        //CARDS
        addCard,
        rollbackCards,

        // ANIMATIONS
        playAnimations
    };
}
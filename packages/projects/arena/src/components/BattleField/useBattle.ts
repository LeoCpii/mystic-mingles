import { useContext } from 'react';

import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

import { BattleContext } from './BattleProvider';

export default function useBattle() {
    const {
        teamAlly,
        teamEnemy,
        chooseCards,
        updateTeamAlly,
        updateTeamEnemy,
        updateChooseCards
    } = useContext(BattleContext);

    const isAlly = (fighter: Ally<Species>) => teamAlly.allies.some(a => a.id === fighter.id);
    const getOriginalTeam = (fighter: Ally<Species>) => { return isAlly(fighter) ? teamAlly : teamEnemy; };

    const updateTeam = (team: Team) => {
        const isAllyTeam = teamAlly.id === team.id;
        isAllyTeam ? updateTeamAlly(team) : updateTeamEnemy(team);
    };

    const attack = (target: Ally<Species>) => {
        const damage = 100;
        target.takesDamage(damage);

        const original = getOriginalTeam(target);

        const newTeam = new Team({ ...original, allies: [...original.allies.filter(a => a.id !== target.id), target] });

        updateTeam(newTeam);
    };

    const buyCard = () => {
        teamAlly.buyCard(3);

        const newTeam = new Team({ ...teamAlly });

        updateTeam(newTeam);
    };

    const addCard = (fighter: Ally<Species>, card: Card<Species, ActiveParts>) => {
        const newChooseCards = chooseCards[fighter.id]
            ? [...chooseCards[fighter.id], card]
            : [card];

        updateChooseCards({ ...chooseCards, [fighter.id]: newChooseCards });
    };

    return {
        deck: teamAlly.deck,
        energy: teamAlly.energy,
        allies: teamAlly.priorityOrder,
        enemies: teamEnemy.priorityOrder,
        alive: [...teamAlly.priorityOrder, ...teamEnemy.priorityOrder]
            .filter(a => a.stats.life > 0)
            .sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1),
        attack,
        buyCard,
        addCard,
        chooseCards,
    };
}
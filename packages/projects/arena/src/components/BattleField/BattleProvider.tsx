import { createContext, useMemo, useState } from 'react';

import type Team from '@mingles/business/team';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

type ChooseCards = { [id: string]: Card<Species, ActiveParts>[]; }

interface BattleContext {
    teamAlly: Team;
    teamEnemy: Team;
    chooseCards: ChooseCards;
    updateChooseCards: (cards: ChooseCards) => void;
    updateTeamAlly: (team: Team) => void;
    updateTeamEnemy: (team: Team) => void;
}

export const BattleContext = createContext<BattleContext>({
    teamAlly: {} as Team,
    teamEnemy: {} as Team,
    chooseCards: {},
    updateTeamAlly: () => { },
    updateTeamEnemy: () => { },
    updateChooseCards: () => { },
});

interface BattleFieldProviderProps { children: React.ReactNode; teamAlly: Team; teamEnemy: Team; }
export default function BattleFieldProvider({ children, teamAlly: _teamAlly, teamEnemy: _teamEnemy }: BattleFieldProviderProps) {
    const [teamAlly, setTeamAlly] = useState<Team>(_teamAlly);
    const [teamEnemy, setTeamEnemy] = useState<Team>(_teamEnemy);
    const [chooseCards, setChooseCards] = useState<ChooseCards>({
        ..._teamAlly.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
        ..._teamEnemy.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
    });

    const context: BattleContext = useMemo(() => ({
        teamAlly,
        teamEnemy,
        chooseCards,
        updateTeamAlly: (team) => setTeamAlly(team),
        updateTeamEnemy: (team) => setTeamEnemy(team),
        updateChooseCards: (cards) => { setChooseCards(cards); },
    }), [teamAlly, teamEnemy, chooseCards]);

    return (
        <BattleContext.Provider value={context}>
            {children}
        </BattleContext.Provider>
    );
}
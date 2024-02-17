import { createContext, useMemo, useState } from 'react';

import type Team from '@mingles/business/team';
import type Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

export type ChosenCards = { [id: string]: Card<Species, ActiveParts>[]; }

interface BattleContext {
    round: number;
    teamAlly: Team;
    teamEnemy: Team;
    chosenCards: ChosenCards;
    tookDamage?: Ally<Species>;
    nextRount: () => void;
    updateTeamAlly: (team: Team) => void;
    updateTeamEnemy: (team: Team) => void;
    updateChooseCards: (cards: ChosenCards) => void;
    setTookDamage: (value: React.SetStateAction<Ally<Species> | undefined>) => void
    setChosenCards: (value: React.SetStateAction<ChosenCards>) => void
}

export const BattleContext = createContext<BattleContext>({
    round: 0,
    chosenCards: {},
    teamAlly: {} as Team,
    teamEnemy: {} as Team,
    tookDamage: {} as Ally<Species>,
    setTookDamage: () => { },
    nextRount: () => { },
    updateTeamAlly: () => { },
    updateTeamEnemy: () => { },
    updateChooseCards: () => { },
    setChosenCards: () => { }
});

interface BattleFieldProviderProps { children: React.ReactNode; teamAlly: Team; teamEnemy: Team; }
export default function BattleFieldProvider({ children, teamAlly: _teamAlly, teamEnemy: _teamEnemy }: BattleFieldProviderProps) {
    const [round, setRound] = useState(1);
    const [teamAlly, setTeamAlly] = useState<Team>(_teamAlly);
    const [tookDamage, setTookDamage] = useState<Ally<Species> | undefined>();
    const [teamEnemy, setTeamEnemy] = useState<Team>(_teamEnemy);
    const [chosenCards, setChosenCards] = useState<ChosenCards>({
        ..._teamAlly.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
        ..._teamEnemy.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
    });

    const context: BattleContext = useMemo(() => ({
        round,
        teamAlly,
        teamEnemy,
        chosenCards,
        tookDamage,
        setChosenCards,
        setTookDamage,
        nextRount: () => setRound(round + 1),
        updateTeamAlly: (team) => setTeamAlly(team),
        updateTeamEnemy: (team) => setTeamEnemy(team),
        updateChooseCards: (cards) => { setChosenCards(cards); },
    }), [teamAlly, teamEnemy, chosenCards]);

    return (
        <BattleContext.Provider value={context}>
            {children}
        </BattleContext.Provider>
    );
}
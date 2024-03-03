import { createContext, useMemo, useState } from 'react';

import type Team from '@mingles/business/team';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

export type ChosenCards = { [id: string]: Card<Species, ActiveParts>[]; }
interface HudData {
    round: number;
    chosenCards: ChosenCards;
    currentCards: Card<Species, ActiveParts>[];
}

interface BattleContext {
    hud: HudData;
    teamAlly: Team;
    teamEnemy: Team;

    nextRount: () => void;
    updateTeamAlly: (team: Team) => void;
    updateTeamEnemy: (team: Team) => void;

    setHud: (value: React.SetStateAction<HudData>) => void;
}

export const BattleContext = createContext<BattleContext>({
    hud: { round: 0, chosenCards: {}, currentCards: [] },
    teamAlly: {} as Team,
    teamEnemy: {} as Team,

    nextRount: () => { },
    updateTeamAlly: () => { },
    updateTeamEnemy: () => { },

    setHud: () => { },
});

interface BattleFieldProviderProps { children: React.ReactNode; teamAlly: Team; teamEnemy: Team; }
export default function BattleFieldProvider({ children, teamAlly: _teamAlly, teamEnemy: _teamEnemy }: BattleFieldProviderProps) {
    const [teamAlly, setTeamAlly] = useState<Team>(_teamAlly);
    const [teamEnemy, setTeamEnemy] = useState<Team>(_teamEnemy);

    const [hud, setHud] = useState<HudData>({
        round: 1,
        currentCards: [],
        chosenCards: {
            ..._teamAlly.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
            ..._teamEnemy.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
        },
    });

    const context: BattleContext = useMemo(() => ({
        hud,
        teamAlly,
        teamEnemy,

        setHud,

        updateTeamAlly: (team) => setTeamAlly(team),
        updateTeamEnemy: (team) => setTeamEnemy(team),

        nextRount: () => setHud((prev) => ({ ...prev, round: prev.round + 1 })),
    }), [teamAlly, teamEnemy, hud]);

    return (
        <BattleContext.Provider value={context}>
            {children}
        </BattleContext.Provider>
    );
}
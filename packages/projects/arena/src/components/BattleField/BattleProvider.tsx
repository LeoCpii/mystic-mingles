import { createContext, useMemo, useState } from 'react';

import Team from '@mingles/business/team';

interface BattleContext {
    teamAlly: Team;
    teamEnemy: Team;
    updateTeamAlly: (team: Team) => void;
    updateTeamEnemy: (team: Team) => void;
}

export const BattleContext = createContext<BattleContext>({
    teamAlly: {} as Team,
    teamEnemy: {} as Team,
    updateTeamAlly: () => { },
    updateTeamEnemy: () => { },
});

interface BattleFieldProviderProps { children: React.ReactNode; teamAlly: Team; teamEnemy: Team; }
export default function BattleFieldProvider({ children, teamAlly: _teamAlly, teamEnemy: _teamEnemy }: BattleFieldProviderProps) {
    const [teamAlly, setTeamAlly] = useState<Team>(_teamAlly);
    const [teamEnemy, setTeamEnemy] = useState<Team>(_teamEnemy);

    const context: BattleContext = useMemo(() => ({
        teamAlly,
        teamEnemy,
        updateTeamAlly: (team) => setTeamAlly(team),
        updateTeamEnemy: (team) => setTeamEnemy(team),
    }), [teamAlly, teamEnemy]);

    return (
        <BattleContext.Provider value={context}>
            {children}
        </BattleContext.Provider>
    );
}
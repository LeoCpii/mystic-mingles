import { createContext, useMemo, useState } from 'react';

import type Team from '@mingles/business/team';
import type Mingle from '@mingles/business/mingle';
import type { Species } from '@mingles/business/species';

export interface BaseContextData {
    myTeams: Team[];
    myMingles: Mingle<Species>[];

    updateMyTeams: (teams: Team[]) => void;
    updateMyMingles: (mingles: Mingle<Species>[]) => void;

    addTeam: (team: Team) => void;
    addMingle: (mingle: Mingle<Species>) => void;

    editTeam: (team: Team) => void;
}

export const BaseContext = createContext<BaseContextData>({} as BaseContextData);

interface BaseProviderProps { children: React.JSX.Element; }
export default function BaseProvider({ children }: BaseProviderProps) {
    const [myMingles, setMyMingles] = useState<Mingle<Species>[]>([]);
    const [myTeams, setMyTeams] = useState<Team[]>([]);

    const context = useMemo<BaseContextData>(() => ({
        myTeams,
        myMingles,

        addTeam: (team: Team) => { setMyTeams([...myTeams, team]); },
        addMingle: (mingle: Mingle<Species>) => { setMyMingles([...myMingles, mingle]); },

        updateMyTeams: (teams: Team[]) => { setMyTeams(teams); },
        updateMyMingles: (mingles: Mingle<Species>[]) => { updateMyMingles(mingles); },

        editTeam: (team: Team) => { editTeam(team); }
    }), [myMingles, myTeams]);

    const updateMyMingles = (mingles: Mingle<Species>[]) => { setMyMingles(mingles); };

    const editTeam = (team: Team) => {
        setMyTeams(prev => {
            return [...prev.filter(t => t.id !== team.id), team];
        });
    };

    return (
        <BaseContext.Provider value={context}>
            {children}
        </BaseContext.Provider>
    );
}
import React, { createContext, useMemo, useState } from 'react';

import { local } from '@mingles/services';
import type { Team, Mingle, Species } from '@mingles/business';

export interface BaseContextData {
    myTeams: Team[];
    favoriteTeam: string;
    myMingles: Mingle<Species>[];
    selectedTeam?: Team;

    updateMyTeams: (teams: Team[]) => void;
    updateFavoriteTeam: (id: string) => void;
    updateMyMingles: (mingles: Mingle<Species>[]) => void;

    addTeam: (team: Team) => void;
    addMingle: (mingle: Mingle<Species>) => void;

    editTeam: (team: Team) => void;
}

export const BaseContext = createContext<BaseContextData>({} as BaseContextData);

interface BaseProviderProps { children: React.JSX.Element; }
export default function ToolsProvider({ children }: BaseProviderProps) {
    const [myTeams, setMyTeams] = useState<Team[]>([]);
    const [myMingles, setMyMingles] = useState<Mingle<Species>[]>([]);
    const [favoriteTeam, setFavoriteTeam] = useState<string>(local.get('favoriteTeam'));

    const context = useMemo<BaseContextData>(() => ({
        myTeams,
        myMingles,
        favoriteTeam,
        selectedTeam: myTeams.find(t => t.id === favoriteTeam),

        addTeam: (team: Team) => { setMyTeams([...myTeams, team]); },
        addMingle: (mingle: Mingle<Species>) => { setMyMingles([...myMingles, mingle]); },

        updateMyTeams: (teams: Team[]) => { setMyTeams(teams); },
        updateMyMingles: (mingles: Mingle<Species>[]) => { updateMyMingles(mingles); },

        updateFavoriteTeam: (id: string) => { updateFavoriteTeam(id); },

        editTeam: (team: Team) => { editTeam(team); }
    }), [myMingles, myTeams, favoriteTeam]);

    const updateMyMingles = (mingles: Mingle<Species>[]) => { setMyMingles(mingles); };

    const updateFavoriteTeam = (id: string) => {
        local.set('favoriteTeam', id);
        setFavoriteTeam(id);
    };

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
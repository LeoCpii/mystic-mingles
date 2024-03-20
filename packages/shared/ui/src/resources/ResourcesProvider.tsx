import React, { createContext, useMemo, useState } from 'react';

import type { Team, Mingle, Species } from '@mingles/business';

interface Resources {
    myTeams: Team[];
    favoriteTeam?: Team;
    myMingles: Mingle<Species>[];
}

export interface ResourcesContextData {
    resources: Resources;

    updateMyTeams: (teams: Team[]) => void;
    updateFavoriteTeam: (id: string) => void;
    updateMyMingles: (mingles: Mingle<Species>[]) => void;

    addTeam: (team: Team) => void;
    addMingle: (mingle: Mingle<Species>) => void;

    editTeam: (team: Team) => void;
}

export const ResourcesContext = createContext<ResourcesContextData>({} as ResourcesContextData);

interface UserProviderProps { children: React.JSX.Element; }
export default function ResourcesProvider({ children }: UserProviderProps) {
    const [resources, setResources] = useState<Resources>({} as Resources);

    const context = useMemo<ResourcesContextData>(() => ({
        resources,

        updateMyTeams: (teams: Team[]) => { updateMyTeams(teams); },
        updateMyMingles: (mingles: Mingle<Species>[]) => { updateMyMingles(mingles); },
        updateFavoriteTeam: (id: string) => { updateFavoriteTeam(resources.myTeams.find(t => t.id === id) as Team); },

        addMingle: (mingle: Mingle<Species>) => { addMingle(mingle); },
        addTeam: (team: Team) => { addTeam(team); },

        editTeam: (team: Team) => { editTeam(team); }
    }), [resources]);

    const updateMyTeams = (teams: Team[]) => { setResources({ ...resources, myTeams: teams }); };
    const updateFavoriteTeam = (team: Team) => { setResources({ ...resources, favoriteTeam: team }); };
    const updateMyMingles = (mingles: Mingle<Species>[]) => { setResources({ ...resources, myMingles: mingles }); };

    const addTeam = (team: Team) => { setResources({ ...resources, myTeams: [...resources.myTeams, team] }); };
    const addMingle = (mingle: Mingle<Species>) => { setResources({ ...resources, myMingles: [...resources.myMingles, mingle] }); };

    const editTeam = (team: Team) => {
        setResources(prev => {
            return { ...prev, myTeams: [...prev.myTeams.filter(t => t.id !== team.id), team] };
        });
    };

    return (
        <ResourcesContext.Provider value={context}>
            {children}
        </ResourcesContext.Provider>
    );
}
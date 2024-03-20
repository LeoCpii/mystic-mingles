import { Outlet, createBrowserRouter, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

import type { TeamDataBase } from '@mingles/business/team';
import type Mingle from '@mingles/business/mingle';
import type { Species } from '@mingles/business/species';

import App from './App';
import MenuPage from './pages/menu';
import TeamPage from './pages/team';
import MyTeamsPage from './pages/my-teams';
import MyMingles from './pages/my-mingles';
import CreateMinglePage from './pages/create-mingle';
import BaseProvider from './pages/BaseProvider';
import { mingleServices, auth, teamServices } from './shared/core';
import useBase from './pages/useBase';

function getBase() {
    const base = import.meta.env.BASE_URL;
    return base === '/' ? '/' : `${base}/`;
}

interface UserArtifactsData {
    myMingles: Mingle<Species>[];
    myTeams: TeamDataBase[];
}

function UserArtifacts({ children }: { children: React.JSX.Element }) {
    const { updateMyMingles, updateMyTeams } = useBase();
    const { myMingles, myTeams } = useLoaderData() as UserArtifactsData;

    useEffect(() => {
        const populatedTeams = teamServices.populateTeam({ teams: myTeams, mingles: myMingles });

        updateMyTeams(populatedTeams);
        updateMyMingles(myMingles);
    }, [myTeams, myMingles]);

    return (
        <>
            {children}
        </>
    );
}

export const router = createBrowserRouter([
    {
        path: '',
        loader: async () => {
            return {
                myMingles: await mingleServices.getMingles(auth.user.user_id),
                myTeams: await teamServices.getTeams(auth.user.user_id)
            };
        },
        element: (
            <BaseProvider>
                <UserArtifacts>
                    <App />
                </UserArtifacts>
            </BaseProvider>
        ),
        children: [
            {
                path: '/',
                element: <MenuPage />,
            },
            {
                path: '/create-mingle',
                element: <CreateMinglePage />,
            },
            {
                path: '/my-mingles',
                element: <MyMingles />,
            },
            {
                path: '/my-teams',
                element: <Outlet />,
                children: [
                    {
                        path: ':id',
                        element: <TeamPage action="edit" />,
                    },
                    {
                        path: '',
                        element: <MyTeamsPage />,
                    }
                ]
            },
            {
                path: 'create-team',
                element: <TeamPage action="create" />,
            }
        ]
    },
], {
    basename: getBase()
});
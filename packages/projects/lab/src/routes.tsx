import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Menu from './pages/menu';
import Team from './pages/team';
import MyTeams from './pages/my-teams';
import CreateMingle from './pages/create-mingle';

function getBase() {
    const base = import.meta.env.BASE_URL;
    return base === '/' ? '/' : `${base}/`;
}

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <>
                <App />
            </>
        ),
        children: [
            {
                path: '/',
                element: <Menu />,
            },
            {
                path: '/create',
                element: <CreateMingle />,
            },
            {
                path: '/my-teams',
                element: <MyTeams />,
            },
            {
                path: '/team/:id',
                element: <Team />,
            }
        ]
    },
], {
    basename: getBase()
});
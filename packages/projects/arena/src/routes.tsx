import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Test from './pages/test';
import Lobby from './pages/lobby';
import Battle from './pages/battle';
import CanvasProvider from './components/Canvas/CanvaProvider';
import BattleFieldOnlineProvider from './components/BattleFieldOnline/BattleFieldOnlineProvider';

function getBase() {
    const base = import.meta.env.BASE_URL;
    return base === '/' ? '/' : `${base}/`;
}

export const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Lobby />
            },
            {
                path: '/offline',
                element: <CanvasProvider>
                    <Battle />
                </CanvasProvider>
            },
            {
                path: '/room/:id',
                element: <BattleFieldOnlineProvider>
                    <Test />
                </BattleFieldOnlineProvider>
            }
        ]
    },
], {
    basename: getBase()
});
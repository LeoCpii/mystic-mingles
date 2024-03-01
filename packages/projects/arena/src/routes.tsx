import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Test from './pages/test';
import Battle from './pages/battle';
import CanvasProvider from './components/Canvas/CanvaProvider';

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
                element: <CanvasProvider>
                    <Battle />
                </CanvasProvider>
            },
            {
                path: '/test',
                element: <CanvasProvider>
                    <Test />
                </CanvasProvider>
            }
        ]
    },
], {
    basename: getBase()
});
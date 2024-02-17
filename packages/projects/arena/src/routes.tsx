import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Test from './pages/test';
import Battle from './pages/battle';

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
                element: <Battle />
            },
            {
                path: '/test',
                element: <Test />
            }
        ]
    },
], {
    basename: getBase()
});
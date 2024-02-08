import { createBrowserRouter } from 'react-router-dom';

import App from './App';
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
            }
        ]
    },
], {
    basename: getBase()
});
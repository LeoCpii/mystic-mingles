import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Login from './pages/login';

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
                element: <Login />,
            },
        ]
    },
], {
    basename: getBase()
});
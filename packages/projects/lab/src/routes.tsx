import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Create from './pages/create';

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
                element: <Navigate to='/create' />,
            },
            {
                path: '/create',
                element: <Create />,
            },
        ]
    },
], {
    basename: getBase()
});
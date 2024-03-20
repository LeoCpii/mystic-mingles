import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ResourcesProvider from '@mingles/ui/resources';

import '@mingles/ui/style';
import '@mingles/ui/fonts';

function App() {
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <ResourcesProvider>
                <SnackbarProvider
                    maxSnack={3}
                    hideIconVariant={false}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <CssBaseline />
                    <Outlet />
                </SnackbarProvider>
            </ResourcesProvider>
        </ThemeProvider>
    );
}

export default App;

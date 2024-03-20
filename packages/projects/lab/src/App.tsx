import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@mingles/ui/style';
import '@mingles/ui/fonts';

function App() {
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <SnackbarProvider
                maxSnack={3}
                hideIconVariant={false}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <CssBaseline />
                <Outlet />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;

import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <SnackbarProvider
                maxSnack={3}
                hideIconVariant={false}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <CssBaseline />
                <Outlet />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;

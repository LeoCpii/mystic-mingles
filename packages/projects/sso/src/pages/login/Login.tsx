import { useState } from 'react';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import GoogleIcon from '@mui/icons-material/Google';
import { SxProps, Theme } from '@mui/material/styles';

import { auth, url } from '@/shared/core';

const styles: SxProps<Theme> = {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mymagic.chat/">
                Mystical Mingles
            </Link>{' '}
            2024
            {'.'}
        </Typography>
    );
}

export default function Login() {
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

    const handleLoding = () => {
        setLoadingLogin(true);

        auth.login()
            .then(() => {
                window.location.href = url.arena;
            })
            .catch(e => {
                console.log('e', e);
            })
            .finally(() => {
                setLoadingLogin(false);
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Grow in={true}>
                <Box component="div" sx={styles}>
                    <Box component="div" sx={{ textAlign: 'center', mb: 3, width: '100%' }}>
                        <Typography variant="h3" component="h3" sx={{ mb: 1, fontFamily: 'riffic' }}>
                            Mystical Mingles
                        </Typography>
                        <Typography variant="subtitle1" component="h4" sx={{ mb: 1 }}>
                            Play with your friends
                        </Typography>
                    </Box>
                    <LoadingButton
                        startIcon={<GoogleIcon />}
                        fullWidth
                        type="submit"
                        loading={loadingLogin}
                        variant="contained"
                        onClick={handleLoding}
                    >
                        Login with google
                    </LoadingButton>
                    <Copyright />
                </Box>
            </Grow>
        </Container>
    );
}
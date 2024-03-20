import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Container from '@mui/material/Container';
import PetsIcon from '@mui/icons-material/Pets';
import ScienceIcon from '@mui/icons-material/Science';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

export default function Menu() {
    const navigate = useNavigate();

    const goTo = (path: string) => { navigate(path); };

    return (
        <Container sx={{ height: '100vh' }}>
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                    <MenuList>
                        <MenuItem onClick={() => goTo('/create-mingle')}>
                            <ListItemIcon>
                                <ScienceIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Criar Mingle</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => goTo('/my-teams')}>
                            <ListItemIcon>
                                <WorkspacesIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Meus Times</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => goTo('/my-mingles')}>
                            <ListItemIcon>
                                <PetsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Meus Mingles</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        </Container>
    );
}
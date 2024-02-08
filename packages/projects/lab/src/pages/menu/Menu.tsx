import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import ScienceIcon from '@mui/icons-material/Science';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PetsIcon from '@mui/icons-material/Pets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Menu() {
    const navigate = useNavigate();

    const goTo = (path: string) => { navigate(path); };

    return (
        <Container sx={{ height: '100vh' }}>
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                    <MenuList>
                        <MenuItem onClick={() => goTo('/my-teams')}>
                            <ListItemIcon>
                                <WorkspacesIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Teams</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => goTo('/my-teams')}>
                            <ListItemIcon>
                                <PetsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Mingles</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => goTo('/team/1')}>
                            <ListItemIcon>
                                <AutoAwesomeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Create Team</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => goTo('/create')}>
                            <ListItemIcon>
                                <ScienceIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Create</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        </Container>
    );
}
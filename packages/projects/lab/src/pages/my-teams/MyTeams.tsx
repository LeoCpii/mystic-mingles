import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CardActionArea from '@mui/material/CardActionArea';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Team from '@mingles/business/team';
import MingleParts from '@mingles/ui/mingle-parts';

import useBase from '../useBase';

interface TeamCardProps { team: Team; selected: boolean; onRemove: (id: string) => void; onSelect: (id: string) => void; }
function TeamCard({ team, selected, onRemove, onSelect }: TeamCardProps) {
    const navigate = useNavigate();

    const handleSelect = () => { onSelect(team.id); };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onRemove(team.id);
    };
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        navigate(`/my-teams/${team.id}`);
    };

    return (
        <Card sx={{
            borderBottom: '4px solid',
            borderColor: selected ? 'secondary.main' : 'transparent',
            transition: 'border-color 0.2s ease-in-out'
        }}>
            <CardHeader
                title={team.name}
                action={
                    <>
                        <IconButton onClick={handleEdit} aria-label="create">
                            <CreateIcon />
                        </IconButton>
                        <IconButton onClick={handleRemove} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
            />
            <CardActionArea onClick={handleSelect}>
                <CardContent sx={{ paddingBottom: '16px !important' }}>
                    <Grid container spacing={3}>
                        {
                            team.allies.map((ally) => (
                                <Grid item xs={4} key={ally.id}>
                                    <MingleParts
                                        key={ally.id}
                                        direction="right"
                                        mingle={ally}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function ListTeamCardSkeleton() {
    const arr = new Array(6).fill('');

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {
                    arr.map((e, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={e + i}>
                                <Skeleton variant="rectangular" sx={{ height: 196.8 }} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

function Content() {
    const navigate = useNavigate();
    const { myTeams } = useBase();

    const goTo = () => { navigate('/create-team'); };

    return (
        <Grid container spacing={3}>
            {
                myTeams.length === 0
                    ? <Grid item xs={12} textAlign="center">
                        <Typography variant="body1" align="center">Nenhum time encontrado</Typography>
                        <Button onClick={goTo} size="small" variant="contained" sx={{ margin: 'auto', mt: 3 }}>
                            Criar meu primeiro time
                        </Button>
                    </Grid>
                    : myTeams.map((team, index) => (
                        <Zoom
                            in
                            key={team.name}
                            style={{ transitionDelay: `${50 * (index + 1)}ms` }}>
                            <Grid item xs={4} key={team.name}>
                                <TeamCard
                                    key={team.id}
                                    team={team}
                                    selected={false}
                                    onRemove={() => console.log('remove')}
                                    onSelect={() => console.log('select')}
                                />
                            </Grid>
                        </Zoom>
                    ))
            }
        </Grid>
    );
}

export default function MyTeams() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => { setTimeout(() => { setLoading(false); }, 500); }, []);

    const goTo = () => { navigate('/create-team'); };
    const goBack = () => { navigate('/'); };

    return (
        <Container sx={{ py: 3 }}>
            <Stack spacing={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack spacing={3} direction="row">
                        <IconButton color="inherit" onClick={goBack}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography variant="h4">
                            Meus times
                        </Typography>
                    </Stack>

                    <Button onClick={goTo} size="large" variant="contained">
                        Novo time
                    </Button>
                </Box>
                <Box>
                    {
                        loading
                            ? <ListTeamCardSkeleton />
                            : <Content />
                    }
                </Box>
            </Stack>
        </Container>
    );
}
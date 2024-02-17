import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';

import Team from '@mingles/business/team';
import MingleParts from '@mingles/ui/mingle-parts';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';
import Ally from '@mingles/business/ally';

import usePlayer from './usePlayer';

const minglesMock = [
    generateRandomMingle(),
    generateRandomMingle(),
    generateRandomMingle(),

    generateRandomMingle(),
    generateRandomMingle(),
    generateRandomMingle(),

    generateRandomMingle(),
    generateRandomMingle(),
    generateRandomMingle()
];

const teamA = new Team({
    name: 'Team A',
    allies: [
        new Ally({ mingle: new Mingle(minglesMock[0]), coordinates: { x: 1, y: 0 } }),
        new Ally({ mingle: new Mingle(minglesMock[1]), coordinates: { x: 0, y: 2 } }),
        new Ally({ mingle: new Mingle(minglesMock[2]), coordinates: { x: 2, y: 0 } }),
    ],
});

const teamB = new Team({
    name: 'Team B',
    allies: [
        new Ally({ mingle: new Mingle(minglesMock[3]), coordinates: { x: 1, y: 0 } }),
        new Ally({ mingle: new Mingle(minglesMock[4]), coordinates: { x: 0, y: 2 } }),
        new Ally({ mingle: new Mingle(minglesMock[5]), coordinates: { x: 2, y: 0 } }),
    ],
});

const teamC = new Team({
    name: 'Team C',
    allies: [
        new Ally({ mingle: new Mingle(minglesMock[6]), coordinates: { x: 1, y: 0 } }),
        new Ally({ mingle: new Mingle(minglesMock[7]), coordinates: { x: 0, y: 2 } }),
        new Ally({ mingle: new Mingle(minglesMock[8]), coordinates: { x: 2, y: 0 } }),
    ],
});

interface TeamCardProps { team: Team; selected: boolean; onRemove: (id: string) => void; onSelect: (id: string) => void; }
function TeamCard({ team, selected, onRemove, onSelect }: TeamCardProps) {
    const handleSelect = () => { onSelect(team.id); };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onRemove(team.id);
    };
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
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

export default function MyTeams() {
    const [loading, setLoading] = useState(true);

    const { player, removeTeam, selectTeam } = usePlayer({
        name: 'Player',
        teams: [teamA, teamB, teamC],
        selectedTeamId: teamA.id
    });

    useEffect(() => { setTimeout(() => { setLoading(false); }, 500); }, []);

    return (
        <Container sx={{ py: 3 }}>
            <Stack spacing={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">
                        Meus times
                    </Typography>

                    <Button size="large" variant="contained">
                        Criar time
                    </Button>
                </Box>
                <Box>
                    {
                        loading
                            ? <ListTeamCardSkeleton />
                            : <Grid container spacing={3}>
                                {
                                    player.teams.map((team, index) => (
                                        <Zoom
                                            in
                                            key={team.name}
                                            style={{ transitionDelay: `${50 * (index + 1)}ms` }}>
                                            <Grid item xs={4} key={team.name}>
                                                <TeamCard
                                                    key={team.id}
                                                    team={team}
                                                    selected={team.id === player.selectedTeamId}
                                                    onRemove={removeTeam}
                                                    onSelect={selectTeam}
                                                />
                                            </Grid>
                                        </Zoom>
                                    ))
                                }
                            </Grid>
                    }
                </Box>
            </Stack>
        </Container>
    );
}
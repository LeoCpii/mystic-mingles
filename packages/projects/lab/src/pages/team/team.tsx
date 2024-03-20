import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Team from '@mingles/business/team';
import MingleParts from '@mingles/ui/mingle-parts';
import type { Species } from '@mingles/business/species';
// import Ally from '@mingles/business/ally';
import Mingle from '@mingles/business/mingle';
import type { Coordinates } from '@mingles/business/ally';
import Form, { useForm, Control, FormControl } from '@mingles/ui/form';

import { auth, teamServices } from '@/shared/core';

import ArenaEdit from './ArenaEdit';
import { useTeam } from './useTeam';
import useBase from '../useBase';

interface MingleCardProps extends MinglesListProps { mingle: Mingle<Species>; team: Team; };
function MingleCard({ mingle, team, currentSlot, onChooseAlly, onRemoveAlly }: MingleCardProps) {
    const handleChoose = () => { onChooseAlly(mingle); };
    const handleRemove = () => { onRemoveAlly(mingle.id); };

    return (
        <Card
            elevation={0}
            sx={{ background: 'transparent' }}
            key={mingle.id}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ width: 72, height: 72 }}>
                        <MingleParts direction="right" mingle={mingle} />
                    </Avatar>
                }
                title={mingle.name}
                subheader={mingle.species}
                action={
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {
                            team.allies.find(ally => ally.id === mingle.id)
                                ? <IconButton
                                    aria-label="remove-ally"
                                    onClick={handleRemove}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                : <Button
                                    onClick={handleChoose}
                                    disabled={!currentSlot}
                                >
                                    Selecionar
                                </Button>
                        }
                    </Box>
                }
            />
        </Card>
    );
}

interface MinglesListProps {
    team: Team;
    currentSlot?: Coordinates;
    onRemoveAlly: (id: string) => void;
    onChooseAlly: (mingle: Mingle<Species>) => void;
}
function MinglesList({ team, currentSlot, onChooseAlly, onRemoveAlly }: MinglesListProps) {
    const navigate = useNavigate();
    const { myMingles } = useBase();

    const goTo = () => { navigate('/create-mingle'); };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {
                        myMingles.length
                            ? myMingles.map((mingle) => (
                                <MingleCard
                                    key={mingle.id}
                                    team={team}
                                    mingle={mingle}
                                    currentSlot={currentSlot}
                                    onChooseAlly={onChooseAlly}
                                    onRemoveAlly={onRemoveAlly}
                                />
                            ))
                            : <Box textAlign="center">
                                <Typography variant="h6">Você ainda não possui nenhum mingle</Typography>
                                <Button onClick={goTo} variant="contained" sx={{ mt: 3 }}>Criar meu primeiro Mingle</Button>
                            </Box>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}

//TODO: criar variante para edição
interface TeamPageProps { action: 'edit' | 'create'; }
export default function TeamPage({ action }: TeamPageProps) {
    const { id } = useParams<{ id: string }>();
    const { myTeams, addTeam, editTeam } = useBase();

    const teamDefault = useMemo(() => {
        return action === 'edit' && myTeams.length
            ? myTeams.find(team => team.id === id) as Team
            : new Team({ name: '', allies: [] });
    }, [myTeams]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { team, addAlly, removeAlly } = useTeam(teamDefault);
    const [currentSlot, setCurrentSlot] = useState<Coordinates>();

    const [formGroup] = useForm<{ name: string; }>({
        form: {
            name: new FormControl({ value: team.name, type: 'text', required: true }),
        },
        handle: {
            submit: (form) => {
                setLoading(true);

                const { name } = form.values;

                team.name = name;

                if (action === 'create') {
                    teamServices.addTeam(auth.user.user_id, team)
                        .then(() => {
                            addTeam(team);
                            navigate('/my-teams');
                            enqueueSnackbar(`"${name}" aguarda por seu primeiro duelo!`, { variant: 'success' });
                        })
                        .catch((error) => { console.log('Error', error); })
                        .finally(() => { setTimeout(() => { setLoading(false); }, 500); });
                } else {
                    teamServices.updateTeam(auth.user.user_id, team)
                        .then(() => {
                            editTeam(team);
                            navigate('/my-teams');
                            enqueueSnackbar(`"${name}" foi atualizado e está pronto para amassar crânios!`, { variant: 'success' });
                        })
                        .catch((error) => { console.log('Error', error); })
                        .finally(() => { setTimeout(() => { setLoading(false); }, 500); });
                }
            }
        }
    }, [teamDefault, team, myTeams]);

    const handleRemoveAlly = (id: string) => { removeAlly(id); };
    const handleChooseSlot = (coordinate: Coordinates) => { setCurrentSlot(coordinate); };
    const handleChooseAlly = (mingle: Mingle<Species>) => { if (currentSlot) { addAlly(currentSlot, mingle); } };

    const goBack = () => { navigate('/my-teams'); };

    useEffect(() => { setCurrentSlot(undefined); }, [team]);

    return (
        <Container sx={{ py: 3 }}>
            <Stack spacing={3}>
                <Stack spacing={3} direction="row">
                    <IconButton color="inherit" onClick={goBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h4">
                        {action === 'edit' ? 'Editar time' : 'Criar time'}
                    </Typography>
                </Stack>
                <Alert variant="outlined" severity="info">
                    Você precisa adicionar <strong>3 mingles</strong> para criar um time.
                </Alert>
                <Box sx={{ margin: 'auto' }}>
                    <Form formGroup={formGroup}>
                        <Stack direction="row" spacing={3}>
                            <Control controlName="name" action="input">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Nome do time"
                                    value={formGroup.controls.name.value}
                                    defaultValue={formGroup.controls.name.value}
                                    helperText={formGroup.controls.name.isInvalid && 'Nome do time é obrigatório'}
                                    error={formGroup.controls.name.isInvalid}
                                />
                            </Control>
                            <LoadingButton
                                type="submit"
                                size="large"
                                variant="contained"
                                loading={loading}
                                disabled={team.allies.length < 3}
                            >
                                Salvar
                            </LoadingButton>
                        </Stack>
                    </Form>
                </Box>
                <Stack direction={{ md: 'row', sm: 'column' }} spacing={3}>
                    <Box width="100%">
                        <Stack spacing={3}>
                            <ArenaEdit
                                team={team}
                                onChooseAlly={(ally) => console.log('Ally', ally)}
                                onChooseCoordinate={handleChooseSlot}
                            />
                        </Stack>
                    </Box>
                    <Box width="100%">
                        <MinglesList
                            team={team}
                            currentSlot={currentSlot}
                            onChooseAlly={handleChooseAlly}
                            onRemoveAlly={handleRemoveAlly}
                        />
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}
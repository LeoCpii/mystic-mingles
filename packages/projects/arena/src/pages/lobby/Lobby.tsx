import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import StyleIcon from '@mui/icons-material/Style';
import CardHeader from '@mui/material/CardHeader';
import BuildIcon from '@mui/icons-material/Build';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import DialogTitle from '@mui/material/DialogTitle';
import ScienceIcon from '@mui/icons-material/Science';
import MuiFormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogContentText from '@mui/material/DialogContentText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';

// import Team from '@mingles/business/team';
import Team from '@mingles/business/team';
import MingleParts from '@mingles/ui/mingle-parts';
import { useResources } from '@mingles/ui/resources';
import Game from '@mingles/business/game';
import Form, { FormControl, useForm, Control } from '@mingles/ui/form';

import { auth, url } from '@/shared/core';

interface LoadingButton { create: boolean; play: boolean; }

function Header() {
    const goToLab = () => { window.location.href = url.lab; };

    return (
        <Stack direction="row" spacing={3} justifyContent="space-between">
            <Card>
                <CardHeader
                    title={auth.user.email}
                    subheader="-"
                    avatar={
                        <Avatar alt="Remy Sharp" src={auth.user.picture} />
                    }
                />
            </Card>
            <Box>
                <IconButton onClick={goToLab} size="large">
                    <ScienceIcon />
                </IconButton>
                <IconButton size="large">
                    <BuildIcon />
                </IconButton>
            </Box>
        </Stack>
    );
}

interface FooterProps { loading: LoadingButton; onCreateRoom: () => void; onJoinRoom: () => void; }
function Footer({ loading, onCreateRoom, onJoinRoom }: FooterProps) {

    const { resources, updateFavoriteTeam, } = useResources();

    const favoriteTeamId = resources.favoriteTeam?.id;

    const handleChange = (event: SelectChangeEvent<string>) => {
        const { target: { value } } = event;
        updateFavoriteTeam(value);
    };

    return (
        <Stack direction="row" spacing={3} justifyContent="space-between">
            <MuiFormControl fullWidth>
                <InputLabel>Selecione seu time</InputLabel>
                <Select
                    value={favoriteTeamId || ''}
                    label="Selecione seu time"
                    onChange={handleChange}
                >
                    {
                        resources.myTeams.map((team) => (
                            <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                        ))
                    }
                </Select>
            </MuiFormControl>
            <Stack direction="row" spacing={3} sx={{ width: '100%' }} >
                <LoadingButton
                    fullWidth
                    variant="outlined"
                    loading={loading.create}
                    color="inherit"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={onCreateRoom}
                    disabled={!favoriteTeamId}
                >
                    Criar sala
                </LoadingButton>
                <LoadingButton
                    fullWidth
                    variant="contained"
                    loading={loading.play}
                    startIcon={<StyleIcon />}
                    onClick={onJoinRoom}
                    disabled={!favoriteTeamId}
                >
                    Jogar
                </LoadingButton>
            </Stack>
        </Stack>
    );
}

function Content() {
    const { resources } = useResources();
    const [animate, setAnimate] = useState(false);

    useEffect(() => { setTimeout(() => { setAnimate(true); }, 0); }, []);

    const goToCreateTeam = () => { window.location.href = `${url.lab}/create-team`; };

    return (
        <Container>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ minHeight: 335 }}>
                {
                    resources.favoriteTeam
                        ? resources.favoriteTeam?.allies.map((ally, index) => (
                            <Zoom key={ally.id} in={animate} style={{ transitionDelay: `${50 * (index + 1)}ms` }}>
                                <div style={{ width: '100%' }}>
                                    <MingleParts
                                        size={index === 1 ? 0.7 : 0.5}
                                        mingle={ally}
                                        direction="right"
                                    />
                                </div>
                            </Zoom>
                        ))
                        : <Box textAlign="center">
                            <WorkspacesIcon sx={{ fontSize: 40 }} />
                            <Typography variant="h6" align="center">
                                Selecione um time para começar
                            </Typography>
                            <Button onClick={goToCreateTeam}>
                                Criar Time
                            </Button>
                        </Box>
                }
            </Stack>
        </Container>
    );
}

interface JoinRoomModalProps { open: boolean; handleClose: () => void; }
function JoinRoomModal({ open, handleClose }: JoinRoomModalProps) {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const { resources } = useResources();
    const [form] = useForm<{ roomID: string }>({
        form: {
            roomID: new FormControl({ value: '', required: true })
        },
        handle: {
            submit: () => {
                setLoading(true);
                // const { roomID } = form.values;
                // const userId = auth.user.user_id;

                // gameServices.joinPlayToRoom(roomID, userId, resources.favoriteTeam as Team)
                //     .then(() => { goToRoom(roomID); })
                //     .finally(() => { setLoading(false); });
            }
        }
    }, []);

    // const goToRoom = (roomID: string) => { navigate(`/room/${roomID}`); };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Form formGroup={form}>
                <DialogTitle>
                    Insira o código da sala
                </DialogTitle>
                <DialogContent sx={{ width: 422 }}>
                    <Control controlName="roomID">
                        <TextField label="Código da sala" variant="outlined" fullWidth />
                    </Control>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        startIcon={<SportsMmaIcon />}
                    >
                        Entrar
                    </LoadingButton>
                </DialogActions>
            </Form>
        </Dialog>
    );
}

interface CreatedRoomModalProps { open: boolean; gameId: string; joined: boolean; handleClose: () => void; }
function CreatedRoomModal({ open, gameId, joined, handleClose }: CreatedRoomModalProps) {
    const handleCopy = () => { copy(gameId); };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Sala criada
            </DialogTitle>
            <DialogContent>
                <Stack direction="column" justifyContent="center" mb={3}>
                    {
                        joined
                            ? <>
                                <Zoom in>
                                    <CheckIcon sx={{ margin: 'auto', fontSize: 36 }} />
                                </Zoom>
                                <Typography variant="h6" align="center">
                                    Iniciando batalha
                                </Typography>
                            </>
                            : <>
                                <CircularProgress sx={{ margin: 'auto' }} />
                                <Typography variant="h6" align="center">
                                    Aguardando outro jogador
                                </Typography>
                            </>
                    }
                </Stack>
                <DialogContentText>
                    Envie o código da sala para seu desafiar seu amigo
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                >
                    Copiar código da sala
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function Lobby() {
    // const navigate = useNavigate();
    const { resources } = useResources();

    const [gameId, setGameId] = useState('');
    const [joined] = useState(false);
    const [loading] = useState<boolean>(true);
    const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);
    const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false);
    const [loadingButton, setLoadingButton] = useState<LoadingButton>({ create: false, play: false });

    useEffect(() => {
        // getTeamAlly(auth.user.user_id)
        //     .then(({ myMingles, myTeams }) => {
        //         updateMyMingles(myMingles);
        //         updateMyTeams(myTeams);
        //     });
    }, []);

    // const getTeamAlly = async (userId: string) => {
    //     return gameServices.populateTeam(userId)
    //         .then(({ myTeams, myMingles }) => {
    //             setTimeout(() => { setLoading(false); }, 500);

    //             return { myMingles, myTeams };
    //         });
    // };

    const handleCreateRoom = () => {
        setLoadingButton({ ...loadingButton, create: true });
        const game = new Game({
            players: [{
                id: auth.user.user_id,
                team: resources.favoriteTeam as Team
            }]
        });

        setGameId(game.id);

        // gameServices.createRoom(game)
        //     .then(() => {
        //         handleOpenCreateRoomModal();
        //         handleSubscribe(game.id);
        //     })
        //     .catch((e) => console.error(e))
        //     .finally(() => {
        //         setTimeout(() => { setLoadingButton({ ...loadingButton, create: false }); }, 500);
        //     });
    };

    // const goToRoom = (id: string) => { navigate(`/room/${id}`); };

    // const handleOpenCreateRoomModal = () => { setOpenCreateRoomModal(true); };
    const handleOpenJoinRoomModal = () => { setOpenJoinRoomModal(true); };

    // const handleSubscribe = async (id: string) => {
    //     gameServices.subscribe<GameDataBase>(async (game) => {
    //         if (Object.keys(game.players).length === 2) {
    //             setJoined(true);
    //             setTimeout(() => { goToRoom(id); }, 500);
    //         }
    //     }, id);
    // };

    return (
        <Container>
            {
                loading
                    ? <Backdrop
                        open
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : <Box sx={{ height: '100vh', p: 3 }}>
                        <Header />
                        <Content />
                        <Footer
                            loading={loadingButton}
                            onCreateRoom={handleCreateRoom}
                            onJoinRoom={handleOpenJoinRoomModal}
                        />
                    </Box>
            }
            <CreatedRoomModal
                joined={joined}
                gameId={gameId}
                open={openCreateRoomModal}
                handleClose={() => setOpenCreateRoomModal(false)}
            />
            <JoinRoomModal
                open={openJoinRoomModal}
                handleClose={() => setOpenJoinRoomModal(false)}
            />
        </Container>
    );
}
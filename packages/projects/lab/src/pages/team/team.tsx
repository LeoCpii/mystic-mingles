import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';

import Team from '@mingles/business/team';
import MingleParts from '@mingles/ui/mingle-parts';
import type { Species } from '@mingles/business/species';
// import Ally from '@mingles/business/ally';
import type { Coordinates } from '@mingles/business/ally';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';

import ArenaEdit from './ArenaEdit';
import { useTeam } from './useTeam';

const minglesMock = [
    new Mingle(generateRandomMingle()),
    new Mingle(generateRandomMingle()),
    new Mingle(generateRandomMingle()),
    new Mingle(generateRandomMingle()),
    new Mingle(generateRandomMingle()),
    new Mingle(generateRandomMingle()),
];

const teamMock = new Team({
    name: 'Time 1',
    allies: [
        // new Ally({ mingle: minglesMock[0], coordinates: { x: 1, y: 2 } }),
        // new Ally({ mingle: minglesMock[1], coordinates: { x: 3, y: 2 } }),
        // new Ally({ mingle: minglesMock[5], coordinates: { x: 4, y: 1 } }),
    ]
});

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
                        <MingleParts
                            direction="right"
                            body={mingle.body}
                            color={mingle.color}
                            eye={mingle.genes.eye.name}
                            tail={mingle.genes.tail.name}
                            back={mingle.genes.back.name}
                            mouth={mingle.genes.mouth.name}
                            horn={mingle.genes.horn.name}
                        />
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
    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {
                        minglesMock.map((mingle) => (
                            <MingleCard
                                key={mingle.id}
                                team={team}
                                mingle={mingle}
                                currentSlot={currentSlot}
                                onChooseAlly={onChooseAlly}
                                onRemoveAlly={onRemoveAlly}
                            />
                        ))
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function TeamEdit() {
    const [messageError, setMessageError] = useState('');
    const { team, addAlly, removeAlly, updateName } = useTeam(teamMock);
    const [currentSlot, setCurrentSlot] = useState<Coordinates>();

    const handleRemoveAlly = (id: string) => { removeAlly(id); };
    const handleChooseSlot = (coordinate: Coordinates) => { setCurrentSlot(coordinate); };
    const handleChooseAlly = (mingle: Mingle<Species>) => { if (currentSlot) { addAlly(currentSlot, mingle); } };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => { updateName(e.target.value); };

    const handleSave = () => {
        if (!team.name) {
            setMessageError('Nome do time é obrigatório');
            return;
        }

        if (team.allies.length < 3) {
            setMessageError('Selecione 3 mingles para o time');
            return;
        }

        console.log('posso salvar', team);
    };

    useEffect(() => { setCurrentSlot(undefined); }, [team]);

    return (
        <Container sx={{ py: 3 }}>
            <Stack spacing={3}>
                <Typography variant="h4">Criar time</Typography>
                {
                    messageError && <Alert variant="outlined" severity="error">{messageError}</Alert>
                }
                <Box sx={{ margin: 'auto' }}>
                    <TextField
                        sx={{ width: { sm: '100%' } }}
                        variant="outlined"
                        label="Nome do time"
                        defaultValue={team.name}
                        onBlur={handleBlur}
                    />
                </Box>
                <Stack direction={{ md: 'row', sm: 'column' }} spacing={3}>
                    <Box width="100%">
                        <Stack spacing={3}>
                            <ArenaEdit
                                team={team}
                                onChooseAlly={(ally) => console.log('Ally', ally)}
                                onChooseCoordinate={handleChooseSlot}
                            />
                            <Button
                                fullWidth
                                onClick={handleSave}
                                size="large"
                                variant="contained"
                            >
                                Salvar
                            </Button>
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
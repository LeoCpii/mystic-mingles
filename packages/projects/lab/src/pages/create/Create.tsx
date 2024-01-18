import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CasinoIcon from '@mui/icons-material/Casino';

import { useMingle } from '@mingles/ui/game';
import MingleParts from '@mingles/ui/mingle-parts';
import { type Species, colors } from '@mingles/business/species';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';
import type { GeneParts, BodyFormats } from '@mingles/business/parts';

// import MingleParts from '@/components/mingle-parts';
import CardFake from '@/assets/card-fake.png';

import GENES_CONFIG from './genes-config';
import BODIES_CONFIG from './bodies-configs';
import SPECIES_CONFIG from './species-config';
import FeatureSelector from './FeatureSelector';


interface OptionsProps<T> { mingle: Mingle<Species>; change: (data: T) => void; }

interface StatsProps { stats: Mingle<Species>['stats']; };
function StatsChart({ stats }: StatsProps) {
    return (
        <Stack direction="row" spacing={2}>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Vidalidade</Typography>
                <Typography variant="h5">{stats.life}</Typography>
            </Stack>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Velocidade</Typography>
                <Typography variant="h5">{stats.speed}</Typography>
            </Stack>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Fúria</Typography>
                <Typography variant="h5">{stats.fury}</Typography>
            </Stack>
        </Stack>
    );
}

interface GeneCardProps { icon: React.ReactNode; label: string; name: string; species: Species; };
function GeneCard({ icon, label: title, name, species }: GeneCardProps) {
    const newColors = colors[species].map(r => r).sort((a, b) => a > b ? 1 : -1);
    return (
        <Card elevation={0} sx={{ background: 'transparent' }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Avatar
                    variant="rounded"
                    sx={{
                        background: newColors[0]
                    }}
                >
                    {icon}
                </Avatar>
                <Box>
                    <Typography variant="caption" color="text.secondary">{title}</Typography>
                    <Typography variant="body1">{name}</Typography>
                </Box>
            </Stack>
        </Card>
    );
}

interface BannerProps { mingle: Mingle<Species>; onGenerateRandom: () => void; };
function BannerCard({ mingle, onGenerateRandom }: BannerProps) {
    const config = SPECIES_CONFIG[mingle.species];
    return (
        <Card sx={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
            backgroundImage: config.backgroundImage,
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={onGenerateRandom}
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.default,
                            ':hover': (theme) => {
                                return {
                                    color: theme.palette.background.default,
                                };
                            }
                        }}>
                        <CasinoIcon />
                    </IconButton>
                </Box>
                <Box maxWidth={250} margin="auto">
                    <MingleParts
                        body={mingle.body}
                        color={mingle.color}
                        eye={mingle.genes.eye.name}
                        horn={mingle.genes.horn.name}
                        back={mingle.genes.back.name}
                        tail={mingle.genes.tail.name}
                        mouth={mingle.genes.mouth.name}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

function Body({ mingle, change }: OptionsProps<BodyFormats>) {
    return (
        <Box>
            <Typography gutterBottom variant="h5" component="div">
                Corpo
            </Typography>
            <Stack direction="row" spacing={1}>
                {
                    Object.keys(BODIES_CONFIG).map((body) => {
                        const current = body as BodyFormats;
                        const config = BODIES_CONFIG[current];
                        return (
                            <Chip
                                key={body}
                                icon={config.icon}
                                label={config.label}
                                onClick={() => change(current)}
                                variant={mingle.body === body ? 'filled' : 'outlined'}
                            />
                        );
                    })
                }
            </Stack>
        </Box>
    );
}

function MingleClass({ mingle, change }: OptionsProps<Species>) {
    return (
        <Box>
            <Typography gutterBottom variant="h5" component="div">
                Classe
            </Typography>
            <Stack direction="row" spacing={1}>
                {
                    Object.keys(SPECIES_CONFIG).map((species) => {
                        const config = SPECIES_CONFIG[species as Species];
                        return (
                            <Chip
                                key={species}
                                variant="outlined"
                                label={config.label}
                                icon={config.icon}
                                onClick={() => change(species as Species)}
                                sx={{
                                    background: mingle.species === species ? config.color : 'transparent',
                                    borderColor: config.color
                                }}
                            />
                        );
                    })
                }
            </Stack>
        </Box>
    );
}

function Colors({ mingle, change }: OptionsProps<Mingle<Species>['color']>) {
    const newColors = colors[mingle.species].map(r => r).sort((a, b) => a > b ? 1 : -1);
    return (
        <Box>
            <Typography gutterBottom variant="h5" component="div">
                Coloração
            </Typography>
            <Stack direction="row" spacing={1}>
                {
                    newColors
                        .map((color) =>
                            <Chip
                                key={color}
                                label={color}
                                sx={{
                                    borderColor: color,
                                    textTransform: 'uppercase',
                                    background: mingle.color === color ? color : 'transparent',
                                }}
                                variant={mingle.color === color ? 'filled' : 'outlined'}
                                onClick={() => change(color)}
                            />
                        )
                }
            </Stack>
        </Box>
    );
}

interface CharacteristicsProps { mingle: Mingle<Species>; onToggleModalEdit: () => void; };
function Characteristics({ mingle, onToggleModalEdit }: CharacteristicsProps) {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography gutterBottom variant="h5" component="div">
                    Características
                </Typography>
                <IconButton onClick={onToggleModalEdit}>
                    <EditIcon />
                </IconButton>
            </Box>
            <Grid container spacing={2}>
                {
                    Object.keys(mingle.genes).map((gene) => {
                        const current = gene as GeneParts;
                        const config = GENES_CONFIG[current];

                        return (
                            <Grid item xs={4} key={gene}>
                                <GeneCard
                                    icon={config.icon}
                                    label={config.label}
                                    name={mingle.genes[current].name}
                                    species={mingle.genes[current].species}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

interface CardsProps { mingle: Mingle<Species> }
function Cards({ mingle }: CardsProps) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    {
                        Object.keys(mingle.cards).map(() => {
                            return (
                                <Grid item sm={4}>
                                    <img style={{ width: '100%', borderRadius: 15 }} src={CardFake} alt="" />
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </CardContent>
        </Card >
    );
}

interface CharacteristicCardProps {
    mingle: Mingle<Species>;
    onToggleModalEdit: () => void;
    onChangeBody: (body: BodyFormats) => void;
    onChangeSpecies: (species: Species) => void;
    onChangeColor: (color: Mingle<Species>['color']) => void;
};
function CharacteristicCard({ mingle, onChangeSpecies, onChangeBody, onChangeColor, onToggleModalEdit }: CharacteristicCardProps) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Body mingle={mingle} change={onChangeBody} />
                    <Divider />
                    <MingleClass mingle={mingle} change={onChangeSpecies} />
                    <Divider />
                    <Colors mingle={mingle} change={onChangeColor} />
                    <Divider />
                    <Characteristics mingle={mingle} onToggleModalEdit={onToggleModalEdit} />
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function Create() {
    const [showModalEdit, setShowModalEdit] = useState(false);
    const { mingle, update, updateGenes } = useMingle(generateRandomMingle());

    const handleUpdateBody = (body: BodyFormats) => { update({ body }); };
    const handleUpdateSpecies = (species: Species) => { update({ species }); };
    const handleUpdateColor = (color: Mingle<Species>['color']) => { update({ color }); };
    const handleUpdateGenes = (genes: Mingle<Species>['genes']) => { updateGenes(genes); };

    const toggleModalEdit = () => { setShowModalEdit(!showModalEdit); };

    const shuffle = () => { update(generateRandomMingle()); };

    return (
        <Container sx={{ py: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <BannerCard
                            mingle={mingle}
                            onGenerateRandom={shuffle}
                        />
                        <CharacteristicCard
                            mingle={mingle}
                            onChangeBody={handleUpdateBody}
                            onChangeColor={handleUpdateColor}
                            onChangeSpecies={handleUpdateSpecies}
                            onToggleModalEdit={toggleModalEdit}
                        />
                        <Cards mingle={mingle} />
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Stack spacing={2}>
                                <StatsChart stats={mingle.stats} />
                                <Button variant="contained" fullWidth>
                                    Criar
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Drawer
                anchor="right"
                open={showModalEdit}
                onClose={toggleModalEdit}
            >
                <Stack p={3} spacing={2}>
                    <FeatureSelector
                        onChange={handleUpdateGenes}
                    />
                </Stack>
            </Drawer>
        </Container>
    );
}
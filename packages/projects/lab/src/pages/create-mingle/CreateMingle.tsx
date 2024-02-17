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

import DeckCard from '@mingles/ui/card';
import { useMingle } from '@mingles/ui/game';
import MingleParts from '@mingles/ui/mingle-parts';
import { type Species, rodent, plant, bird, fish } from '@mingles/business/species';
import type { GeneParts, BodyFormats, ActiveParts } from '@mingles/business/parts';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';

import { classColors } from '@/shared/core';

import GENES_CONFIG from './genes-config';
import BODIES_CONFIG from './bodies-configs';
import SPECIES_CONFIG from './species-config';
import FeatureSelector from './FeatureSelector';

interface OptionsProps<T> { mingle: Mingle<Species>; change: (data: T) => void; }

interface ProgressBarProps { background: string; max: number; min: number; value: number; }
function ProgressBar({ background, max, min, value }: ProgressBarProps) {
    const percent = (value / max) * 100;

    return (
        <Stack direction="row" display="flex" justifyContent="center" alignItems="center">
            {min}
            <Box sx={{
                height: 20,
                width: '100%',
                position: 'relative',
                marginLeft: 1,
                marginRight: 1,
                backgroundColor: (theme) => theme.palette.action.hover,
                borderRadius: 5
            }}>
                <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${percent}%`,
                    position: 'absolute',
                    backgroundColor: background,
                    borderRadius: 5,
                    textAlign: 'center',
                    transition: (theme) => theme.transitions.create('width', { duration: 300 })
                }}>
                    {value}
                </Box>
            </Box>
            {max}
        </Stack>
    );
}

interface StatsProps { stats: Mingle<Species>['stats']; };
function StatsChart({ stats }: StatsProps) {
    const barColors = {
        life: classColors.plant[2],
        speed: classColors.bird[1],
        fury: classColors.rodent[2]
    };

    const barStatsMax = {
        life: plant.stats.base.life + (plant.stats.part.life * 5),
        speed: bird.stats.base.speed + (bird.stats.part.speed * 5),
        fury: rodent.stats.base.fury + (rodent.stats.part.fury * 5),
    };

    const barStatsMin = {
        life: bird.stats.base.life + (bird.stats.part.life * 5),
        speed: plant.stats.base.speed + (plant.stats.part.speed * 5),
        fury: fish.stats.base.fury + (fish.stats.part.fury * 5),
    };

    return (
        <Stack direction="column" spacing={2}>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Vitalidade</Typography>
                <ProgressBar background={barColors.life} max={barStatsMax.life} min={barStatsMin.life} value={stats.life} />
            </Stack>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Velocidade</Typography>
                <ProgressBar background={barColors.speed} max={barStatsMax.speed} min={barStatsMin.speed} value={stats.speed} />
            </Stack>
            <Stack spacing={1} flex={1}>
                <Typography variant="body2" color="text.secondary">Fúria</Typography>
                <ProgressBar background={barColors.fury} max={barStatsMax.fury} min={barStatsMin.fury} value={stats.fury} />
            </Stack>
        </Stack>
    );
}

interface GeneCardProps { icon: React.ReactNode; label: string; name: string; species: Species; };
function GeneCard({ icon, label: title, name, species }: GeneCardProps) {
    return (
        <Card elevation={0} sx={{ background: 'transparent' }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Avatar
                    variant="rounded"
                    sx={{
                        background: classColors[species][1]
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
                    <MingleParts direction='right' mingle={mingle} />
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
    return (
        <Box>
            <Typography gutterBottom variant="h5" component="div">
                Coloração
            </Typography>
            <Stack direction="row" spacing={1}>
                {
                    classColors[mingle.species]
                        .map((color) =>
                            <Box
                                key={color}
                                sx={{
                                    padding: '5px',
                                    borderRadius: '100%',
                                    border: (theme) => `2px solid ${mingle.color === color ? theme.palette.action.active : 'transparent'}`,
                                    transition: (theme) => theme.transitions.create('border-color', { duration: 300 }),
                                }}>
                                <Chip
                                    sx={{
                                        width: 40,
                                        background: color,
                                        borderColor: 'transparent',
                                        ':hover': {
                                            background: color,
                                        }
                                    }}

                                    onClick={() => change(color)}
                                />
                            </Box>
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
                        Object.keys(mingle.cards).map((key) => {
                            const k = key as ActiveParts;
                            return (
                                <Grid key={key} item sm={4}>
                                    <DeckCard
                                        part={k}
                                        cost={mingle.cards[k].cost}
                                        name={mingle.cards[k].name}
                                        attack={mingle.cards[k].attack}
                                        effect={mingle.cards[k].effect}
                                        shield={mingle.cards[k].shield}
                                        species={mingle.cards[k].species}
                                        description={mingle.cards[k].description}
                                    />
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

export default function CreateMingle() {
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
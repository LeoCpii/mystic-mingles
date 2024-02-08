import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import type Mingle from '@mingles/business/mingle';
import type { GeneParts } from '@mingles/business/parts';
import { type Species, type ItemGene, listGenes, cards } from '@mingles/business/species';

import { classColors } from '@/shared/core';

import GENES_CONFIG from './genes-config';
import SPECIES_CONFIG from './species-config';

interface ChipsProps<T> { selecteds: T[]; onChange: (species: T) => void; };

function SpeciesChips({ selecteds, onChange }: ChipsProps<Species>) {
    return (
        <Stack direction="row" spacing={1}>
            {
                Object.keys(SPECIES_CONFIG).map((species) => {
                    const current = species as Species;
                    const config = SPECIES_CONFIG[current];

                    return (
                        <Chip
                            key={species}
                            variant="outlined"
                            label={config.label}
                            icon={config.icon}
                            onClick={() => onChange(current)}
                            sx={{
                                background: selecteds.includes(current) ? config.color : 'transparent',
                                borderColor: config.color
                            }}
                        />
                    );
                })
            }
        </Stack>
    );
}

function GeneChips({ selecteds, onChange }: ChipsProps<GeneParts>) {
    return (
        <Stack direction="row" spacing={1}>
            {
                Object.keys(GENES_CONFIG).map((gene) => {
                    const current = gene as GeneParts;
                    const config = GENES_CONFIG[current];

                    return (
                        <Chip
                            key={gene}
                            variant={selecteds.includes(current) ? 'filled' : 'outlined'}
                            label={config.label}
                            icon={config.icon}
                            onClick={() => onChange(current)}
                        />
                    );
                })
            }
        </Stack>
    );
}

interface GeneCardsProps { filtereds: ItemGene[]; onChange: (species: Species, gene: GeneParts, name: string) => void; }
function GeneCards({ filtereds, onChange }: GeneCardsProps) {
    return (
        <Box sx={{
            maxHeight: 'calc(100vh - 314px)',
            overflowY: 'auto',
            paddingRight: 2
        }}>
            <Grid container spacing={2}>
                {
                    filtereds.map((opt) => (
                        <Grid key={opt.name} item xs={6}>
                            <Card>
                                <CardActionArea onClick={() => onChange(opt.species, opt.gene, opt.name)}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                sx={{ bgcolor: classColors[opt.species][1] }}
                                                aria-label="recipe"
                                            >
                                                {opt.name.split(' ').map((i) => i[0]).join('')}
                                            </Avatar>
                                        }
                                        title={opt.name}
                                        subheader={
                                            opt.gene === 'eye'
                                                ? '-'
                                                : cards[opt.species][opt.gene].find((i) => i.name === opt.name)?.description
                                        }
                                    >
                                    </CardHeader>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

interface FeatureSelectorProps { onChange: (genes: Mingle<Species>['genes']) => void; }
export default function FeatureSelector({ onChange }: FeatureSelectorProps) {
    const [selectedName, setSelectedName] = useState<ItemGene>();
    const [selectedGene, setSelectedGene] = useState<GeneParts[]>([]);
    const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);

    const listGenesFiltered = listGenes
        .filter(i => {
            return !selectedSpecies.length
                ? listGenes
                : selectedSpecies.includes(i.species as Species);
        })
        .filter(i => {
            return !selectedGene.length
                ? listGenes
                : selectedGene.includes(i.gene as GeneParts);
        })
        .filter(i => {
            return !selectedName
                ? listGenes
                : i.name.includes(selectedName.name);
        });

    const toggleGene = (gene: GeneParts) => {
        const shouldRemove = selectedGene.includes(gene);
        setSelectedGene((prev) => {
            if (shouldRemove) {
                return prev.filter((current) => current !== gene);
            }
            return [...prev, gene];
        });
    };

    const toggleSpecies = (species: Species) => {
        const shouldRemove = selectedSpecies.includes(species);
        setSelectedSpecies((prev) => {
            if (shouldRemove) {
                return prev.filter((current) => current !== species);
            }
            return [...prev, species];
        });
    };

    const changeGene = (species: Species, gene: GeneParts, name: string) => {
        onChange({ [gene]: { species, name } } as any);
    };

    return (
        <Stack width={700} spacing={2}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h6">Classe</Typography>
                    <Divider />
                </Box>
                <SpeciesChips
                    selecteds={selectedSpecies}
                    onChange={toggleSpecies}
                />
            </Stack>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h6">Parte</Typography>
                    <Divider />
                </Box>
                <GeneChips
                    selecteds={selectedGene}
                    onChange={toggleGene}
                />
                <Autocomplete
                    disablePortal
                    sx={{ mt: 3 }}
                    options={listGenesFiltered}
                    groupBy={(option) => option.species}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) => setSelectedName(value as ItemGene)}
                    renderInput={(params) => <TextField
                        {...params}
                        label='Habilidade'
                    />}
                />
                <GeneCards
                    filtereds={listGenesFiltered}
                    onChange={changeGene}
                />
            </Stack >
        </Stack >
    );
}
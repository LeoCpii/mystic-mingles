import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SpeedIcon from '@mui/icons-material/Speed';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import { debounce } from '@mingles/ui/utils';
import useSpecies from '@mingles/ui/useSpecies';
import { slug } from '@mingles/services/string';
import MingleParts from '@mingles/ui/mingle-parts';
import type Mingle from '@mingles/business/mingle';
import type { Species } from '@mingles/business/species';
import Form, { useForm, Control, FormControl } from '@mingles/ui/form';

import useBase from '../useBase';

interface MingleCardProps { mingle: Mingle<Species> }
function MingleCard({ mingle }: MingleCardProps) {
    const { icon, color, label } = useSpecies(mingle.species);

    return (
        <Card>
            <CardHeader
                title={mingle.name}
                action={

                    <Chip
                        label={label}
                        variant="outlined"
                        sx={{ borderColor: color }}
                        icon={
                            <div style={{ padding: 5, marginTop: 5 }}>
                                {icon({ color: 'white', size: 16 })}
                            </div>
                        }
                    />
                }
                subheader={
                    <Stack spacing={1} direction="row" mt={1}>
                        <Chip icon={<FavoriteIcon />} label={mingle.stats.life} variant="outlined" />
                        <Chip icon={<LocalFireDepartmentIcon />} label={mingle.stats.fury} variant="outlined" />
                        <Chip icon={<SpeedIcon />} label={mingle.stats.speed} variant="outlined" />
                    </Stack>
                }
            />
            <CardContent >
                <Box sx={{ width: 150, margin: 'auto' }}>
                    <MingleParts mingle={mingle} direction="right" isStatic />
                </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default function MyMingles() {
    const navigate = useNavigate();
    const { myMingles } = useBase();
    const [loading, setLoading] = useState(false);

    const [filterdMingles, setFilterdMingles] = useState<Mingle<Species>[]>([]);

    const [formGroup] = useForm<{ name: string }>({
        form: {
            name: new FormControl({ value: '', type: 'text' })
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

                if (name.length < 3) {
                    setFilterdMingles(myMingles);
                    return;
                }

                setLoading(true);

                debounce.delay(() => {
                    setFilterdMingles(prev => prev.filter(mingle => slug(mingle.name).includes(slug(name))));
                    setTimeout(() => { setLoading(false); }, 500);
                });
            }
        }
    }, []);

    useEffect(() => { setFilterdMingles(myMingles); }, [myMingles]);

    const goBack = () => { navigate('/'); };

    return (
        <Container>
            <Stack sx={{ p: 3 }} direction="column" spacing={3}>
                <Stack spacing={3} direction="row">
                    <IconButton color="inherit" onClick={goBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h4">
                        Meus Mingles
                    </Typography>
                </Stack>
                <Form formGroup={formGroup}>
                    <Control controlName="name" action="input">
                        <TextField fullWidth label="Buscar" variant="outlined" />
                    </Control>
                </Form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        {
                            loading
                                ? <Grid item xs={12}>
                                    <Typography variant="h5" align="center">
                                        Carregando...
                                    </Typography>
                                </Grid>
                                : filterdMingles.map((mingle) => (
                                    <Grid key={mingle.id} item xs={12} md={6} lg={4}>
                                        <MingleCard mingle={mingle} />
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Box>
            </Stack>
        </Container >
    );
}
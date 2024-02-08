import AirIcon from '@mui/icons-material/Air';
import EggIcon from '@mui/icons-material/Egg';
import PetsIcon from '@mui/icons-material/Pets';
import GrassIcon from '@mui/icons-material/Grass';
import PhishingIcon from '@mui/icons-material/Phishing';
import BugReportIcon from '@mui/icons-material/BugReport';

import { type Species, colors } from '@mingles/business/species';

import Sky from '@/assets/sceneries/sky_scenary.png';
import Clay from '@/assets/sceneries/clay_scenary.png';
import Ocean from '@/assets/sceneries/ocean_scenary.png';
import Forest from '@/assets/sceneries/forest_scenery.png';
import Desert from '@/assets/sceneries/desert_scenary.png';
import Garden from '@/assets/sceneries/garden_scenary.png';

export type SpeciesChips = {
    [S in Species]: {
        label: string;
        color: string;
        icon: React.JSX.Element;
        backgroundImage: string;
    }
}

export default {
    bird: {
        label: 'Pássaro',
        species: 'bird',
        icon: <AirIcon color="action" />,
        color: colors['bird'].map(r => r).sort((a, b) => a > b ? 1 : -1)[2],
        backgroundImage: `url(${Sky})`
    },
    bug: {
        label: 'Inseto',
        species: 'bug',
        icon: <BugReportIcon />,
        color: colors['bug'].map(r => r).sort((a, b) => a > b ? 1 : -1)[2],
        backgroundImage: `url(${Clay})`
    },
    fish: {
        label: 'Peixe',
        species: 'fish',
        icon: <PhishingIcon />,
        color: colors['fish'][1],
        backgroundImage: `url(${Ocean})`
    },
    plant: {
        label: 'Planta',
        species: 'plant',
        icon: <GrassIcon />,
        color: colors['plant'].map(r => r).sort((a, b) => a > b ? 1 : -1)[2],
        backgroundImage: `url(${Garden})`
    },
    reptile: {
        label: 'Réptil',
        species: 'reptile',
        icon: <EggIcon />,
        color: colors['reptile'].map(r => r).sort((a, b) => a > b ? 1 : -1)[2],
        backgroundImage: `url(${Forest})`
    },
    rodent: {
        label: 'Roedor',
        species: 'rodent',
        icon: <PetsIcon />,
        color: colors['rodent'].map(r => r).sort((a, b) => a > b ? 1 : -1)[2],
        backgroundImage: `url(${Desert})`
    }
} as SpeciesChips;
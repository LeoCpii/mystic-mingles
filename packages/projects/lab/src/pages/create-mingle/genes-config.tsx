import GrassIcon from '@mui/icons-material/Grass';
import VisibilityIcon from '@mui/icons-material/Visibility';

import type { BodyParts, GeneParts } from '@mingles/business/parts';

export type PartsLabel = {
    [G in GeneParts]: {
        label: string;
        part: BodyParts;
        icon: React.JSX.Element;
    }
}

export default {
    eye: {
        label: 'Olhos',
        part: 'eye',
        icon: <VisibilityIcon />,
    },
    mouth: {
        label: 'Boca',
        part: 'mouth',
        icon: <GrassIcon />,
    },
    horn: {
        label: 'Chifre',
        part: 'horn',
        icon: <GrassIcon />,
    },
    tail: {
        label: 'Calda',
        part: 'tail',
        icon: <GrassIcon />,
    },
    back: {
        label: 'Costas',
        part: 'back',
        icon: <GrassIcon />,
    },
} as PartsLabel;
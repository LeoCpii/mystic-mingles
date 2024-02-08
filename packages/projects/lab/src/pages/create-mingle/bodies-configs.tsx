
import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';
import HexagonIcon from '@mui/icons-material/Hexagon';

import { BodyFormats } from '@mingles/business/parts';

type BodyCofigs = {
    [B in BodyFormats]: {
        label: string;
        icon: React.ReactNode
    };
}

export default {
    circle: {
        label: 'Círculo',
        icon: <CircleIcon />
    },
    square: {
        label: 'Quadrado',
        icon: <SquareIcon />
    },
    hex: {
        label: 'Hexágono',
        icon: <HexagonIcon />
    },
} satisfies BodyCofigs;
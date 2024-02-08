import React from 'react';

import { type Species, colors } from '@mingles/business';

import BugIcon from './BugIcon';
import FishIcon from './FishIcon';
import BirdIcon from './BirdIcon';
import PlantIcon from './PlantIcon';
import RodentIcon from './RodentIcon';
import ReptileIcon from './ReptileIcon';

type Config = {
    [s in Species]: {
        label: string;
        color: string;
        icon: ({ color, size }: { color?: string; size?: number; }) => React.JSX.Element;
    }
}

export const classColors = {
    bug: colors.bug.map(r => r).sort((a, b) => a > b ? 1 : -1),
    bird: colors.bird.map(r => r).sort((a, b) => a > b ? 1 : -1),
    fish: colors.fish.map(r => r).sort((a, b) => a > b ? 1 : -1),
    plant: colors.plant.map(r => r).sort((a, b) => a > b ? 1 : -1),
    rodent: colors.rodent.map(r => r).sort((a, b) => a > b ? 1 : -1),
    reptile: colors.reptile.map(r => r).sort((a, b) => a > b ? 1 : -1),
};

export default {
    plant: {
        label: 'Planta',
        color: classColors['plant'][3],
        icon: ({ color, size }) => <PlantIcon color={color} size={size} />,
    },
    bird: {
        label: 'Pássaro',
        color: classColors['bird'][2],
        icon: ({ color, size }) => <BirdIcon color={color} size={size} />,
    },
    bug: {
        label: 'Inseto',
        color: classColors['bug'][2],
        icon: ({ color, size }) => <BugIcon color={color} size={size} />,
    },
    fish: {
        label: 'Peixe',
        color: classColors['fish'][0],
        icon: ({ color, size }) => <FishIcon color={color} size={size} />,
    },
    reptile: {
        label: 'Réptil',
        color: classColors['reptile'][2],
        icon: ({ color, size }) => <ReptileIcon color={color} size={size} />,
    },
    rodent: {
        label: 'Roedor',
        color: classColors['rodent'][2],
        icon: ({ color, size }) => <RodentIcon color={color} size={size} />,
    },
} satisfies Config;
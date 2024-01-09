import { Parts } from '@/parts';
import { Passive } from '@/cards';

import type { SpeciesOptions } from './interface';

// COLORS
type ReptileColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type ReptileHorn = 'reptile-horn' | 'reptile-horn-2';
type ReptileTail = 'reptile-tail' | 'reptile-tail-2';
type ReptileMouth = 'reptile-mouth' | 'reptile-mouth-2';
type ReptileBody = 'reptile-body' | 'reptile-body-2';
type ReptileEye = 'reptile-eye' | 'reptile-eye-2';

type ReptileParts = {
    eye: ReptileEye;
    horn: ReptileHorn;
    tail: ReptileTail;
    body: ReptileBody;
    mouth: ReptileMouth;
};

// CARDS
type ReptileCards = {
    [Part in Parts]: {
        [ReptilePartName in ReptileParts[Part]]: {
            name: ReptilePartName;
            description: string;
            passive: Passive;
        }[];
    }[ReptileParts[Part]]
};

export type Reptile = SpeciesOptions<ReptileParts, ReptileColors, ReptileCards>;
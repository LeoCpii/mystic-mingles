import { Parts } from '@/parts';
import { Passive } from '@/cards';

import type { SpeciesOptions } from './interface';

// COLORS
type RodentColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type RodentHorn = 'rodent-horn' | 'rodent-horn-2';
type RodentTail = 'rodent-tail' | 'rodent-tail-2';
type RodentMouth = 'rodent-mouth' | 'rodent-mouth-2';
type RodentBody = 'rodent-body' | 'rodent-body-2';
type RodentEye = 'rodent-eye' | 'rodent-eye-2';

type RodentParts = {
    eye: RodentEye;
    horn: RodentHorn;
    tail: RodentTail;
    body: RodentBody;
    mouth: RodentMouth;
};

// CARDS
type RodentCards = {
    [Part in Parts]: {
        [RodentPartName in RodentParts[Part]]: {
            name: RodentPartName;
            description: string;
            passive: Passive;
        }[];
    }[RodentParts[Part]]
};

export type Rodent = SpeciesOptions<RodentParts, RodentColors, RodentCards>;
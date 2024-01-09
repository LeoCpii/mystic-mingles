import { Parts } from '@/parts';
import { Passive } from '@/cards';

import type { SpeciesOptions } from './interface';

// COLORS
type BirdColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type BirdHorn = 'bird-horn' | 'bird-horn-2';
type BirdTail = 'bird-tail' | 'bird-tail-2';
type BirdMouth = 'bird-mouth' | 'bird-mouth-2';
type BirdBody = 'bird-body' | 'bird-body-2';
type BirdEye = 'bird-eye' | 'bird-eye-2';

type BirdParts = {
    eye: BirdEye;
    horn: BirdHorn;
    tail: BirdTail;
    body: BirdBody;
    mouth: BirdMouth;
};

// CARDS
type BirdCards = {
    [Part in Parts]: {
        [BirdPartName in BirdParts[Part]]: {
            name: BirdPartName;
            description: string;
            passive: Passive;
        }[];
    }[BirdParts[Part]]
};

export type Bird = SpeciesOptions<BirdParts, BirdColors, BirdCards>;
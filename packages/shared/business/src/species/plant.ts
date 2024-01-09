import { Parts } from '@/parts';
import { Passive } from '@/cards';

import type { SpeciesOptions } from './interface';

// COLORS
type PlantColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type PlantHorn = 'plant-horn' | 'plant-horn-2';
type PlantTail = 'plant-tail' | 'plant-tail-2';
type PlantMouth = 'plant-mouth' | 'plant-mouth-2';
type PlantBody = 'plant-body' | 'plant-body-2';
type PlantEye = 'plant-eye' | 'plant-eye-2';

type PlantParts = {
    eye: PlantEye;
    horn: PlantHorn;
    tail: PlantTail;
    body: PlantBody;
    mouth: PlantMouth;
};

// CARDS
type PlantCards = {
    [Part in Parts]: {
        [PlantPartName in PlantParts[Part]]: {
            name: PlantPartName;
            description: string;
            passive: Passive;
        }[];
    }[PlantParts[Part]]
};

export type Plant = SpeciesOptions<PlantParts, PlantColors, PlantCards>;
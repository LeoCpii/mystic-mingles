import { Parts } from '@/parts';
import type { SpeciesOptions } from './interface';

// COLORS
type FishColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type FishHorn = 'fish-horn' | 'fish-horn-2';
type FishTail = 'fish-tail' | 'fish-tail-2';
type FishMouth = 'fish-mouth' | 'fish-mouth-2';
type FishBody = 'fish-body' | 'fish-body-2';
type FishEye = 'fish-eye' | 'fish-eye-2';

export type FishCardHornPassive<Horn extends FishHorn> =
    Horn extends 'fish-horn' ? 'iron-1' :
    Horn extends 'fish-horn-2' ? 'iron-2' :
    never;

type FishParts = {
    eye: FishEye;
    horn: FishHorn;
    tail: FishTail;
    body: FishBody;
    mouth: FishMouth;
};

// CARDS
export type FishCardPassive<Part extends Parts, FishPart extends FishParts[Part]> =
    FishPart extends 'bug-horn' ? 'heal' :
    FishPart extends 'bug-horn-2' ? 'damage' :
    never;

type FishCards = {
    [Part in Parts]: {
        [FishPartName in FishParts[Part]]: {
            name: FishPartName;
            description: string;
            passive: FishCardPassive<Part, FishPartName>;
        }[];
    }[FishParts[Part]]
};

export type Fish = SpeciesOptions<FishParts, FishColors, FishCards>;
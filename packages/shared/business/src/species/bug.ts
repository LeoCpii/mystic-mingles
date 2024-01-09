import { Parts } from '@/parts';
import type { SpeciesOptions } from './interface';
import { Passive } from '@/cards';

// COLORS
type BugColors = '#ea3266' | '#e81b55' | '#bc1343';

// PARTS
type BugHorn = 'bug-horn' | 'bug-horn-2';
type BugTail = 'bug-tail' | 'bug-tail-2';
type BugMouth = 'bug-mouth' | 'bug-mouth-2';
type BugBody = 'bug-body' | 'bug-body-2';
type BugEye = 'bug-eye' | 'bug-eye-2';

type BugParts = {
    eye: BugEye;
    horn: BugHorn;
    tail: BugTail;
    body: BugBody;
    mouth: BugMouth;
};

// CARDS

type BugCards = {
    [Part in Parts]: {
        [BugPartName in BugParts[Part]]: {
            name: BugPartName;
            description: string;
            passive: Passive;
        }[];
    }[BugParts[Part]]
};

export type Bug = SpeciesOptions<BugParts, BugColors, BugCards>;
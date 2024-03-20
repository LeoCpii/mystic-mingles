import type Ally from '@/ally';
import type Card from '@/card';
import type { Species } from '@/species';
import type { ActiveParts } from '@/parts';
import type { Coordinates } from '@/ally';

export interface TeamDataBase {
    id: string;
    name: string;
    allies: {
        id: string;
        coordinates: Coordinates;
    }[];
}

export interface TeamOptions {
    deck?: Deck;
    id?: string;
    name: string;
    energy?: number;
    allies: Ally<Species>[];
}

export type Deck = {
    [id: string]: Card<Species, ActiveParts>[];
};
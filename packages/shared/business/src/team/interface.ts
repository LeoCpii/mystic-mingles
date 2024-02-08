import type Ally from '@/ally';
import type Card from '@/card';
import type { Species } from '@/species';
import type { ActiveParts } from '@/parts';

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
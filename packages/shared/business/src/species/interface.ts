import Card from '@/cards';
import type { BodyParts, ActiveParts, Stats } from '@/parts';

export type Species = 'fish' | 'bird' | 'reptile' | 'rodent' | 'plant' | 'bug';

export type SpeciesStats = { base: Stats; part: Stats; }
export type SpeciesParts = { [key in BodyParts]: string[]; };
export type SpeciesCards<S extends Species> = { [key in ActiveParts]: Card<S>[]; };

export interface SpeciesOptions<S extends Species> {
    readonly parts: SpeciesParts;
    readonly cards: SpeciesCards<S>;
    readonly stats: SpeciesStats;
    readonly colors: string[];
}
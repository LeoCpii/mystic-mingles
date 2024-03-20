import type { ActiveParts, BodyFormats, GeneParts, Stats } from '@/parts';
import type { Category, Species, SpeciesCards, SpeciesDetails } from '@/species';

export type MingleCards = {
    [A in ActiveParts]: SpeciesCards<Species>[A][number];
};

export type MingleColor<S extends Species> = SpeciesDetails<S>['colors'][number];
export type MingleGenes = {
    [S in Species]: {
        [G in GeneParts]: {
            species: S;
            name: SpeciesDetails<S>['genes'][G][number];
        };
    }
}[Species];

export type MingleOptions<S extends Species> = {
    name: string;
    species: S;
    stats: Stats;
    body: BodyFormats;
    genes: MingleGenes;
    cards: MingleCards;
    category: Category;
    color: MingleColor<S>;
    createAt: Date;
};

export type MingleBasicOptions<S extends Species> = {
    [A in S]: {
        id?: string;
        name: string;
        species: A;
        body: BodyFormats;
        genes: MingleGenes;
        color: MingleColor<A>;
        createAt?: Date;
    };
}[S];
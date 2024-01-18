import type { BodyFormats, GeneParts, Stats } from '@/parts';
import type { Species, SpeciesCards, SpeciesDetails } from '@/species';

export type MingleCards = {
    horn: SpeciesCards<Species>['horn'][number];
    tail: SpeciesCards<Species>['tail'][number];
    mouth: SpeciesCards<Species>['mouth'][number];
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
    color: MingleColor<S>;
};

export type MingleBasicOptions<S extends Species> = {
    [A in S]: {
        name: string;
        species: A;
        body: BodyFormats;
        genes: MingleGenes;
        color: MingleColor<A>;
    };
}[S];
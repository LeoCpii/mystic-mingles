import type { BodyFormats, Stats } from '@/parts';
import type { Species, SpeciesCards, Bird, Bug, Fish, Plant, Reptile, Rodent } from '@/species';

type MingleSpeciesOptions<S extends Species> =
    S extends 'bug' ? Bug<S> :
    S extends 'bird' ? Bird<S> :
    S extends 'fish' ? Fish<S> :
    S extends 'plant' ? Plant<S> :
    S extends 'rodent' ? Rodent<S> :
    S extends 'reptile' ? Reptile<S> :
    never;

export type MingleCards<S extends Species> = {
    horn: SpeciesCards<S>['horn'][number];
    tail: SpeciesCards<S>['tail'][number];
    mouth: SpeciesCards<S>['mouth'][number];
};
export type MingleColor<S extends Species> = MingleSpeciesOptions<S>['colors'][number];
export type MingleEye<S extends Species> = { species: S; eye: string; };

export type MingleOptions<S extends Species> = {
    name: string;
    species: S;
    stats: Stats;
    eye: MingleEye<S>;
    body: BodyFormats;
    color: MingleColor<S>;
    cards: MingleCards<S>;
}

export type MingleOptionsWithOutStats<S extends Species> = Omit<MingleOptions<S>, 'stats'>;
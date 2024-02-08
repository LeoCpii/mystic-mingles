import type Card from '@/card';
import type { GeneParts, ActiveParts, Stats } from '@/parts';

import type { Bug, BugGenes, BugColors } from './bug';
import type { Bird, BirdGenes, BirdColors } from './bird';
import type { Fish, FishGenes, FishColors } from './fish';
import type { Plant, PlantGenes, PlantColors } from './plant';
import type { Rodent, RodentGenes, RodentColors } from './rodent';
import type { Reptile, ReptileGenes, ReptileColors } from './reptile';

export type Species = 'fish' | 'bird' | 'reptile' | 'rodent' | 'plant' | 'bug';

export type SpeciesGenesParts = { [Key in GeneParts]: string; };

export type SpeciesColors = readonly string[];
export type SpeciesStats = { base: Stats; part: Stats; }
export type SpeciesCards<S extends Species> = { [Key in ActiveParts]: Card<S, ActiveParts>[]; };
export type SpeciesGenes<SGP extends SpeciesGenesParts> = { [Key in GeneParts]: SGP[Key][]; };

export interface SpeciesOptions<S extends Species, SGP extends SpeciesGenesParts, Colors extends SpeciesColors> {
    readonly colors: Colors;
    readonly stats: SpeciesStats;
    readonly cards: SpeciesCards<S>;
    readonly genes: SpeciesGenes<SGP>;
    readonly life_multiplicator: number;
}

export type SpeciesDetails<S extends Species> =
    S extends 'bug' ? Bug<S, BugGenes, BugColors> :
    S extends 'bird' ? Bird<S, BirdGenes, BirdColors> :
    S extends 'fish' ? Fish<S, FishGenes, FishColors> :
    S extends 'plant' ? Plant<S, PlantGenes, PlantColors> :
    S extends 'rodent' ? Rodent<S, RodentGenes, RodentColors> :
    S extends 'reptile' ? Reptile<S, ReptileGenes, ReptileColors> :
    never;
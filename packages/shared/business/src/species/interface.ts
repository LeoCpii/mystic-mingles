import type { Parts } from '@/parts'
import type { Passive } from '@/cards';

import type { Bug } from './bug';
import type { Fish } from './fish';
import type { Bird } from './bird';
import type { Plant } from './plant';
import type { Rodent } from './rodent';
import type { Reptile } from './reptile';

export type Species = 'fish' | 'bird' | 'reptile' | 'rodent' | 'plant' | 'bug';

export type SpeciesParts = { [key in Parts]: string; };
export type SpeciesCards = {
    [Part in Parts]: {
        name: string;
        passive: Passive;
        description: string;
    }[];
};

export interface SpeciesOptions<
    Parts extends SpeciesParts,
    Colors extends string,
    Cards extends SpeciesCards,
> {
    parts: Parts;
    cards: Cards;
    colors: Colors;
}

export type ChooseSpecies<S extends Species> =
    S extends 'bug' ? Bug :
    S extends 'fish' ? Fish :
    S extends 'plant' ? Plant :
    S extends 'bird' ? Bird :
    S extends 'plant' ? Plant :
    S extends 'rodent' ? Rodent :
    S extends 'reptile' ? Reptile :
    never;
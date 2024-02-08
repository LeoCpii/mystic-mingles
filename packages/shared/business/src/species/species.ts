import { GeneParts } from '@/parts';

import bug from './bug';
import bird from './bird';
import fish from './fish';
import plant from './plant';
import rodent from './rodent';
import reptile from './reptile';
import type { Species, SpeciesCards, SpeciesDetails, SpeciesGenes, SpeciesGenesParts } from './interface';


export type Genes = typeof genes;

export type ItemGene = { gene: GeneParts; name: string; species: Species };

export const species: Species[] = ['bird', 'bug', 'fish', 'plant', 'reptile', 'rodent'];

export const cards: { [S in Species]: SpeciesCards<S> } = {
    bug: bug.cards,
    bird: bird.cards,
    fish: fish.cards,
    plant: plant.cards,
    rodent: rodent.cards,
    reptile: reptile.cards,
};

export const genes: { [S in Species]: SpeciesGenes<SpeciesGenesParts> } = {
    bug: bug.genes,
    bird: bird.genes,
    fish: fish.genes,
    plant: plant.genes,
    rodent: rodent.genes,
    reptile: reptile.genes,
} as const;

export const colors: { [S in Species]: SpeciesDetails<S>['colors'] } = {
    bug: bug.colors,
    bird: bird.colors,
    fish: fish.colors,
    plant: plant.colors,
    rodent: rodent.colors,
    reptile: reptile.colors,
};

export const modificators: { [S in Species]: number } = {
    bug: bug.life_multiplicator,
    bird: bird.life_multiplicator,
    fish: fish.life_multiplicator,
    plant: plant.life_multiplicator,
    rodent: rodent.life_multiplicator,
    reptile: reptile.life_multiplicator,
};

export const listGenes: ItemGene[] = Object.keys(genes)
    .map((species) => ({ species, genes: genes[species as Species] }))
    .reduce<any[]>((acc, current) => {
        Object.keys(current.genes)
            .forEach((gene) => {
                current.genes[gene as GeneParts]
                    .forEach((name) => {
                        acc.push({ gene, name, species: current.species });
                    });
            });
        return acc;
    }, []);
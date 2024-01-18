import { getRandom } from '@mingles/services/array';

import { geneParts, bodyFormats } from '@/parts';
import { species, colors, genes, type Species } from '@/species';

import type { MingleGenes, MingleBasicOptions } from './interface';

export function generateRandomMingle(): MingleBasicOptions<Species> {
    const chosenSpecies = getRandom(species);
    const chosenBodyFormat = getRandom(bodyFormats);
    const chosenColor = getRandom(colors[chosenSpecies] as any);

    const chosenGenes = geneParts.reduce((acc, part) => {
        const currentSpecies = getRandom(species);

        acc[part] = { species: currentSpecies, name: getRandom(genes[currentSpecies][part]) };

        return acc;
    }, {}) as MingleGenes;

    return {
        name: 'random',
        genes: chosenGenes,
        body: chosenBodyFormat,
        species: chosenSpecies,
        color: chosenColor as any,
    };
}
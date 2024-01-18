import { type GeneParts } from '@mingles/business/parts';
import { type Species, genes } from '@mingles/business/species';

export default function getSpeciesParts(species: Species, gene: GeneParts) {
    return genes[species][gene];
};

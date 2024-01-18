import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Plant Cyclope', 'Plant Closed'] as const;
const BACK = ['Plant Flower'] as const;
const HORNS = ['Plant Fall'] as const;
const TAILS = ['Plant Leaf'] as const;
const MOUTHS = ['Plant Laught', 'Plant Snack'] as const;

const COLORS = ['#32eab7', '#15d49f', '#11a67c'] as const;

export interface PlantGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type PlantColors = typeof COLORS;

export class Plant<S extends Species, G extends PlantGenes, Colors extends PlantColors> implements SpeciesOptions<S, G, Colors> {
    public readonly colors: Colors;
    public readonly genes: SpeciesGenes<G>;
    public readonly cards: SpeciesCards<S>;
    public readonly stats: SpeciesStats;

    constructor({ genes: parts, cards, colors, stats }: SpeciesOptions<S, G, Colors>) {
        this.genes = parts;
        this.cards = cards;
        this.colors = colors;
        this.stats = stats;
    }
}

export default new Plant({
    genes: {
        eye: ['Plant Cyclope', 'Plant Closed'],
        horn: ['Plant Fall'],
        tail: ['Plant Leaf'],
        mouth: ['Plant Laught', 'Plant Snack'],
        back: ['Plant Flower'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 140, speed: 5, fury: 4 },
        part: { life: 1.34, speed: 1.13, fury: 1.03 },
    },
    colors: [...COLORS]
});
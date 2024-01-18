import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Bird Glass'] as const;
const BACK = ['Bird Wing'] as const;
const HORNS = ['Bird Topknot'] as const;
const TAILS = ['Bird Feather'] as const;
const MOUTHS = ['Bird Beak'] as const;

const COLORS = ['#f8bceb', '#f6a5e5', '#f38ede'] as const;

export interface BirdGenes {
    eye: typeof EYES[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    back: typeof BACK[number];
    mouth: typeof MOUTHS[number];
}

export type BirdColors = typeof COLORS;

export class Bird<S extends Species, G extends BirdGenes, Colors extends BirdColors> implements SpeciesOptions<S, G, Colors> {
    public readonly colors: Colors;
    public readonly genes: SpeciesGenes<G>;
    public readonly cards: SpeciesCards<S>;
    public readonly stats: SpeciesStats;

    constructor({ genes, cards, colors, stats }: SpeciesOptions<S, G, Colors>) {
        this.genes = genes;
        this.cards = cards;
        this.stats = stats;
        this.colors = colors;
    }
}

export default new Bird({
    genes: {
        eye: ['Bird Glass'],
        horn: ['Bird Topknot'],
        tail: ['Bird Feather'],
        mouth: ['Bird Beak'],
        back: ['Bird Wing'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 100, speed: 10, fury: 2 },
        part: { life: 1.25, speed: 1.25, fury: 1.02 },
    },
    colors: [...COLORS]
});
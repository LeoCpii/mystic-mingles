import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Bird Glass'] as const;
const BACK = ['Bird Wing'] as const;
const HORNS = ['Bird Topknot'] as const;
const TAILS = ['Bird Feather'] as const;
const MOUTHS = ['Bird Beak'] as const;

const COLORS = ['#ff78b4', '#ffafc1', '#ff99b0', '#583c44', '#fff7ff'] as const;

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
    public readonly life_multiplicator: number;

    constructor({ genes, cards, colors, stats, life_multiplicator }: SpeciesOptions<S, G, Colors>) {
        this.genes = genes;
        this.cards = cards;
        this.stats = stats;
        this.colors = colors;
        this.life_multiplicator = life_multiplicator;
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
        base: { life: 27, speed: 43, fury: 35 },
        part: { life: 0, speed: 3, fury: 1 },
    },
    colors: [...COLORS],
    life_multiplicator: 12,
});
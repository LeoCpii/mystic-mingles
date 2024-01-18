import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Reptile Curious'] as const;
const BACK = ['Reptile Turtle'] as const;
const HORNS = ['Reptile Iguana'] as const;
const TAILS = ['Reptile Lizard'] as const;
const MOUTHS = ['Reptile Sad'] as const;

const COLORS = ['#cf77f1', '#be49ec', '#ae1be8'] as const;

export interface ReptileGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type ReptileColors = typeof COLORS;

export class Reptile<S extends Species, G extends ReptileGenes, Colors extends ReptileColors> implements SpeciesOptions<S, G, Colors> {
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

export default new Reptile({
    genes: {
        eye: ['Reptile Curious'],
        horn: ['Reptile Iguana'],
        tail: ['Reptile Lizard'],
        back: ['Reptile Turtle'],
        mouth: ['Reptile Sad'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 2, speed: 2 },
        part: { life: 1, speed: 1 },
    },
    colors: [...COLORS]
});
import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Fish Crazy'] as const;
const BACK = ['Fish Fin'] as const;
const HORNS = ['Fish Shark'] as const;
const TAILS = ['Fish Gold'] as const;
const MOUTHS = ['Fish Eat'] as const;

const COLORS = ['#77d7f1', '#49c9ec', '#1bbbe8'] as const;

export interface FishGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type FishColors = typeof COLORS;

export class Fish<S extends Species, G extends FishGenes, Colors extends FishColors> implements SpeciesOptions<S, G, Colors> {
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

export default new Fish({
    genes: {
        eye: ['Fish Crazy'],
        horn: ['Fish Shark'],
        tail: ['Fish Gold'],
        back: ['Fish Fin'],
        mouth: ['Fish Eat'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 115, speed: 9, fury: 1 },
        part: { life: 1.29, speed: 1.24, fury: 1.01 },
    },
    colors: [...COLORS]
});
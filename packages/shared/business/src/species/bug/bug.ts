import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Bug Spider'] as const;
const BACK = ['Bug Fly'] as const;
const HORNS = ['Bug Butterfly'] as const;
const TAILS = ['Bug Bee'] as const;
const MOUTHS = ['Bug Termite'] as const;

const COLORS = ['#ea3266', '#e81b55', '#bc1343'] as const;

export interface BugGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type BugColors = typeof COLORS;

export class Bug<S extends Species, G extends BugGenes, Colors extends BugColors> implements SpeciesOptions<S, G, Colors> {
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

export default new Bug({
    genes: {
        eye: ['Bug Spider'],
        horn: ['Bug Butterfly'],
        tail: ['Bug Bee'],
        mouth: ['Bug Termite'],
        back: ['Bug Fly'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 115, speed: 7, fury: 6 },
        part: { life: 1.32, speed: 1.15, fury: 1.04 },
    },
    colors: [...COLORS]
});
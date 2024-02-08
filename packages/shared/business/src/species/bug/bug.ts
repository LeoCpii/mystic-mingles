import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Bug Spider'] as const;
const BACK = ['Bug Fly'] as const;
const HORNS = ['Bug Butterfly'] as const;
const TAILS = ['Bug Bee'] as const;
const MOUTHS = ['Bug Termite'] as const;

const COLORS = ['#df2e54', '#ff433e', '#ff606c', '#553b39', '#fffaf5'] as const;

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
    public readonly life_multiplicator: number;

    constructor({ genes: parts, cards, colors, stats, life_multiplicator }: SpeciesOptions<S, G, Colors>) {
        this.genes = parts;
        this.cards = cards;
        this.colors = colors;
        this.stats = stats;
        this.life_multiplicator = life_multiplicator;
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
        base: { life: 35, speed: 31, fury: 39 },
        part: { life: 1, speed: 0, fury: 3 },
    },
    colors: [...COLORS],
    life_multiplicator: 10.5
});
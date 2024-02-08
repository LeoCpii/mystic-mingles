import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats } from '../interface';

const EYES = ['Rodent Oriental'] as const;
const BACK = ['Rodent Nut'] as const;
const HORNS = ['Rodent Rat'] as const;
const TAILS = ['Rodent Beaver'] as const;
const MOUTHS = ['Rodent Squirrel'] as const;

const COLORS = ['#f5a037', '#fdb014', '#ffd500', '#544f44', '#fdfcf2'] as const;

export interface RodentGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type RodentColors = typeof COLORS;

export class Rodent<S extends Species, G extends RodentGenes, Colors extends RodentColors> implements SpeciesOptions<S, G, Colors> {
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

export default new Rodent({
    genes: {
        eye: ['Rodent Oriental'],
        horn: ['Rodent Rat'],
        tail: ['Rodent Beaver'],
        back: ['Rodent Nut'],
        mouth: ['Rodent Squirrel'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: TAIL_CARDS,
        back: BACK_CARDS,
        mouth: MOUTH_CARDS,
    },
    stats: {
        base: { life: 31, speed: 35, fury: 43 },
        part: { life: 0, speed: 1, fury: 3 },
    },
    colors: [...COLORS],
    life_multiplicator: 11.5
});
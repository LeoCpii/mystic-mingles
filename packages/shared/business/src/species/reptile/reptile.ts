import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats, Category } from '../interface';

const EYES = ['Reptile Curious'] as const;
const BACK = ['Reptile Turtle'] as const;
const HORNS = ['Reptile Iguana'] as const;
const TAILS = ['Reptile Lizard'] as const;
const MOUTHS = ['Reptile Sad'] as const;

const COLORS = ['#9967fb', '#c569cf', '#f8bbff', '#5e436d', '#fff7ff'] as const;

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
    public readonly category: Category;
    public readonly stats: SpeciesStats;
    public readonly genes: SpeciesGenes<G>;
    public readonly cards: SpeciesCards<S>;
    public readonly life_multiplicator: number;

    constructor({ genes: parts, cards, colors, stats, category, life_multiplicator }: SpeciesOptions<S, G, Colors>) {
        this.genes = parts;
        this.cards = cards;
        this.stats = stats;
        this.colors = colors;
        this.category = category;
        this.life_multiplicator = life_multiplicator;
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
        base: { life: 39, speed: 35, fury: 35 },
        part: { life: 3, speed: 1, fury: 0 },
    },
    category: 'tank',
    colors: [...COLORS],
    life_multiplicator: 9
});
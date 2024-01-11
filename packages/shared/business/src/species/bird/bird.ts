import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Bird<S extends Species> implements SpeciesOptions<S> {
    public readonly colors: string[];
    public readonly parts: SpeciesParts;
    public readonly cards: SpeciesCards<S>;
    public readonly stats: SpeciesStats;

    constructor({ parts, cards, colors, stats }: SpeciesOptions<S>) {
        this.parts = parts;
        this.cards = cards;
        this.colors = colors;
        this.stats = stats;
    }
}

export default new Bird({
    parts: {
        body: ['bird body', 'bird body 2'],
        eye: ['bird eye', 'bird eye 2'],
        horn: ['bird horn', 'bird horn 2'],
        tail: ['bird tail', 'bird tail 2'],
        mouth: ['bird mouth', 'bird mouth 2'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: MOUTH_CARDS,
        mouth: TAIL_CARDS,
    },
    stats: {
        base: { life: 80, speed: 2 },
        part: { life: 15, speed: 1.8 },
    },
    colors: ['#f8bceb', '#f6a5e5', '#f38ede']
});
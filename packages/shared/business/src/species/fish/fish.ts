import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Fish<S extends Species> implements SpeciesOptions<S> {
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

export default new Fish({
    parts: {
        body: ['fish body', 'fish body 2'],
        eye: ['fish eye', 'fish eye 2'],
        horn: ['fish horn', 'fish horn 2'],
        tail: ['fish tail', 'fish tail 2'],
        mouth: ['fish mouth', 'fish mouth 2'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: MOUTH_CARDS,
        mouth: TAIL_CARDS,
    },
    stats: {
        base: { life: 150, speed: 1.3 },
        part: { life: 35, speed: 1.4 },
    },
    colors: ['#77d7f1', '#49c9ec', '#1bbbe8']
});
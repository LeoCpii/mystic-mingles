import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Reptile<S extends Species> implements SpeciesOptions<S> {
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

export default new Reptile({
    parts: {
        body: ['reptile body', 'reptile body 2'],
        eye: ['reptile eye', 'reptile eye 2'],
        horn: ['reptile horn', 'reptile horn 2'],
        tail: ['reptile tail', 'reptile tail 2'],
        mouth: ['reptile mouth', 'reptile mouth 2'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: MOUTH_CARDS,
        mouth: TAIL_CARDS,
    },
    stats: {
        base: { life: 210, speed: 1.1 },
        part: { life: 40, speed: 1.3 },
    },
    colors: ['#cf77f1', '#be49ec', '#ae1be8']
});
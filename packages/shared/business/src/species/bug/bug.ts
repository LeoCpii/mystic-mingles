import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Bug<S extends Species> implements SpeciesOptions<S> {
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

export default new Bug({
    parts: {
        body: ['bug body', 'bug body 2'],
        eye: ['bug eye', 'bug eye 2'],
        horn: ['bug horn', 'bug horn 2'],
        tail: ['bug tail', 'bug tail 2'],
        mouth: ['bug mouth', 'bug mouth 2'],
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
    colors: ['#ea3266', '#e81b55', '#bc1343']
});
import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Plant<S extends Species> implements SpeciesOptions<S> {
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

export default new Plant({
    parts: {
        body: ['plant body', 'plant body 2'],
        eye: ['plant eye', 'plant eye 2'],
        horn: ['plant horn', 'plant horn 2'],
        tail: ['plant tail', 'plant tail 2'],
        mouth: ['plant mouth', 'plant mouth 2'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: MOUTH_CARDS,
        mouth: TAIL_CARDS,
    },
    stats: {
        base: { life: 250, speed: 1 },
        part: { life: 50, speed: 1.1 },
    },
    colors: ['#32eab7', '#15d49f', '#11a67c']
});
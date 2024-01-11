import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS } from './cards';
import type { Species, SpeciesOptions, SpeciesParts, SpeciesCards, SpeciesStats } from '../interface';

export class Rodent<S extends Species> implements SpeciesOptions<S> {
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

export default new Rodent({
    parts: {
        body: ['rodent body', 'rodent body 2'],
        eye: ['rodent eye', 'rodent eye 2'],
        horn: ['rodent horn', 'rodent horn 2'],
        tail: ['rodent tail', 'rodent tail 2'],
        mouth: ['rodent mouth', 'rodent mouth 2'],
    },
    cards: {
        horn: HORN_CARDS,
        tail: MOUTH_CARDS,
        mouth: TAIL_CARDS,
    },
    stats: {
        base: { life: 100, speed: 1.5 },
        part: { life: 30, speed: 1.5 },
    },
    colors: ['#f1cf77', '#ecbe49', '#e8ae1b']
});
import { uuid } from '@mingles/services/uuid';
import { higherThan, lessThan, getRandom } from '@mingles/services/array';

import type Ally from '@/ally';
import { activeParts } from '@/parts';
import type { Species } from '@/species';

import type { TeamOptions, Deck } from './interface';

export default class Team implements TeamOptions {
    public deck: Deck;
    public id: string;
    public energy = 3;

    public readonly name: string;
    public readonly allies: Ally<Species>[] = [];

    constructor({ allies, name, deck, energy, id }: TeamOptions) {
        this.name = name || this.name;

        this.id = id || uuid();
        this.allies = allies || this.allies;
        this.deck = deck || this.getCards(6);
        this.energy = energy || this.energy;
    }

    get priorityOrder() {
        return this.allies.sort((a, b) => {
            return a.stats.speed > b.stats.speed ? -1 : 1;
        });
    }

    get higherLife() { return higherThan(this.allies, 'stats.life'); }
    get higherSpeed() { return higherThan(this.allies, 'stats.speed'); }

    get lessLife() { return lessThan(this.allies, 'stats.life'); }
    get lessSpeed() { return lessThan(this.allies, 'stats.speed'); }

    public getCards(count: number): Deck {
        const arr = Array.from(Array(count), () => '');

        return arr.reduce((acc) => {
            const chosen = getRandom(this.allies);
            const part = getRandom(activeParts);

            acc[chosen.id] = [...acc[chosen.id], chosen.cards[part]];

            return acc;
        }, { [this.allies[0].id]: [], [this.allies[1].id]: [], [this.allies[2].id]: [] });
    }

    public buyCard(count: number) {
        const newCards = this.getCards(count);
        Object.keys(newCards).forEach((id) => { this.deck[id] = [...this.deck[id], ...newCards[id]]; });
    }
}
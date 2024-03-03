import { uuid } from '@mingles/services/uuid';
import { higherThan, lessThan, getRandom } from '@mingles/services/array';

import type Ally from '@/ally';
import { activeParts } from '@/parts';
import type { Species } from '@/species';

import type { TeamOptions, Deck } from './interface';

export default class Team implements TeamOptions {
    public deck: Deck = {};
    public id: string;
    public energy = 3;

    public readonly name: string;
    public readonly allies: Ally<Species>[] = [];

    constructor({ allies, name, deck, energy, id }: TeamOptions) {
        this.name = name || this.name;

        this.id = id || uuid();
        this.allies = allies || this.allies;
        this.deck = deck || this.getCards(6);
        this.energy = energy ?? this.energy;
    }

    get alives() { return this.allies.filter((ally) => ally.isAlive); }

    get priorityOrder() {
        return this.allies.sort((a, b) => {
            return a.stats.speed > b.stats.speed ? -1 : 1;
        });
    }

    get higherLife() { return higherThan(this.alives, 'stats.life'); }
    get higherSpeed() { return higherThan(this.alives, 'stats.speed'); }

    get lessLife() { return lessThan(this.alives, 'stats.life'); }
    get lessSpeed() { return lessThan(this.alives, 'stats.speed'); }

    private getUniqueCard(newDeck: Deck) {
        const chosenAlly = getRandom(this.alives);
        // const chosenAlly = this.alives[0];
        const part = getRandom(activeParts);

        const reference = [...(this.deck[chosenAlly.id] || []), ...newDeck[chosenAlly.id]];

        const chosenCard = chosenAlly.cards[part];

        if (reference) {
            const numberOfExistingCards = reference.filter((card) => card.name === chosenCard.name);

            if (numberOfExistingCards.length >= 2) {
                // não pode ter mais de 2 cartas iguais
                return this.getUniqueCard(newDeck);
            }

            return { chosenAlly, chosenCard };
        }

        return { chosenAlly, chosenCard };;
    }

    public getCards(count: number): Deck {
        const arr = Array.from(Array(count), () => '');

        return arr.reduce((acc) => {
            const { chosenCard, chosenAlly } = this.getUniqueCard(acc);

            acc[chosenAlly.id] = [...acc[chosenAlly.id], chosenCard];

            return acc;
        }, { [this.allies[0].id]: [], [this.allies[1].id]: [], [this.allies[2].id]: [] });
    }

    public buyCard(count: number) {
        const newCards = this.getCards(count);
        Object.keys(newCards).forEach((id) => { this.deck[id] = [...this.deck[id], ...newCards[id]]; });
    }
}
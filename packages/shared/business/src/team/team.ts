import { uuid } from '@mingles/services/uuid';
import { getRandom, higherThan, lessThan } from '@mingles/services/array';

import type Mingle from '@/mingle';
import type { Species } from '@/species';

import type { TeamOptions, Positions, Deck } from './interface';

export default class Team implements TeamOptions {
    public deck: Deck;
    public id = uuid();
    public energy = 10;

    public readonly name: string;
    public readonly positions: Positions[];
    public readonly mingles: Mingle<Species>[];

    constructor({ mingles, name, positions }: TeamOptions) {
        this.name = name;
        this.mingles = mingles;
        this.positions = positions;
        this.deck = this.mingles.map(m => m.cards);
    }

    get higherLife(): Mingle<Species> { return higherThan(this.mingles, 'stats.life'); }
    get higherSpeed(): Mingle<Species> { return higherThan(this.mingles, 'stats.speed'); }

    get lessLife(): Mingle<Species> { return lessThan(this.mingles, 'stats.life'); }
    get lessSpeed(): Mingle<Species> { return lessThan(this.mingles, 'stats.speed'); }

    get first(): Mingle<Species> {
        const higherX = higherThan(this.positions, 'x').x;
        const id = getRandom(this.positions.filter(p => p.x === higherX)).id;

        console.log('id', id);
        return this.mingles.find(m => m.id === id);
    }

    get last(): Mingle<Species> {
        const lessX = lessThan(this.positions, 'x').x;
        const id = getRandom(this.positions.filter(p => p.x === lessX)).id;
        return this.mingles.find(m => m.id === id);
    }

    get priorityOrder(): Mingle<Species>[] {
        return this.mingles.sort((a, b) => {
            if (a.stats.speed > b.stats.speed) { return -1; };
            if (a.stats.speed < b.stats.speed) { return 1; };
            return 0;
        });
    }
}
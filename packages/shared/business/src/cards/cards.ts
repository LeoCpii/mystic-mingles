import { Species } from '@/species';
import { ActiveParts } from '@/parts';

import { CardOptions, CardOptionsLock, Cost, Passive } from './interface';

export default class Card<S extends Species> implements CardOptions<S> {
    private _attack: number;
    private _shield: number;

    public readonly species: S;
    public readonly cost: Cost;
    public readonly passive: Passive;
    public readonly part: ActiveParts;
    public readonly name: string;
    public readonly description: string;

    constructor(data: CardOptionsLock<S>) {
        this.name = data.name;
        this.cost = data.cost;
        this.part = data.part;
        this.attack = data.attack;
        this.shield = data.shield;
        this.passive = data.passive;
        this.species = data.species;
        this.description = data.description;
    };

    get attack() { return this._attack; };
    set attack(value: number) { this._attack = value * 10; };

    get shield() { return this._shield; };
    set shield(value: number) { this._shield = value * 5; };
}
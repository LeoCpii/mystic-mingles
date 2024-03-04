import type { Effect } from '@/effect';
import type { ActiveParts } from '@/parts';
import type { Genes, Species } from '@/species';

import type { CardOptions, CardOptionsLock, Cost, Type, Assets } from './interface';

export default class Card<S extends Species, P extends ActiveParts> implements CardOptions<S, P> {
    private _attack: number;
    private _shield: number;

    public readonly part: P;
    public readonly species: S;
    public readonly cost: Cost;
    public readonly type: Type;
    public readonly assets: Assets;
    public readonly effect: Effect;
    public readonly description: string;
    public readonly name: Genes[S][P][number];

    constructor(data: CardOptionsLock<S, P>) {
        this.name = data.name;
        this.cost = data.cost;
        this.part = data.part;
        this.type = data.type;
        this.assets = data.assets;
        this.attack = data.attack;
        this.shield = data.shield;
        this.effect = data.effect;
        this.species = data.species;
        this.description = data.description;
    };

    get attack() { return this._attack; };
    set attack(value: number) { this._attack = value * 10; };

    get shield() { return this._shield; };
    set shield(value: number) { this._shield = value * 10; };
}
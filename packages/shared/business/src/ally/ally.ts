import { type Species, modificators } from '@/species';
import type { BodyFormats, Stats } from '@/parts';
import type { MingleCards, MingleGenes, MingleColor } from '@/mingle';

import type { AllyBasicOptions, AllyOptions, Coordinates, Buff, Debuff } from './interface';

export default class Ally<S extends Species> implements AllyOptions {
    public id: string;
    public life: number;
    public name: string;
    public shield: number;
    public species: S;
    public stats: Stats;
    public buffs: Buff[];
    public debuffs: Debuff[];
    public body: BodyFormats;
    public genes: MingleGenes;
    public cards: MingleCards;
    public coordinates: Coordinates;
    public color: MingleColor<S>;

    constructor({ mingle, coordinates: positions }: AllyBasicOptions<S>) {
        this.buffs = [];
        this.shield = 0;
        this.debuffs = [];
        this.id = mingle.id;
        this.name = mingle.name;
        this.body = mingle.body;
        this.stats = mingle.stats;
        this.cards = mingle.cards;
        this.genes = mingle.genes;
        this.color = mingle.color;
        this.coordinates = positions;
        this.species = mingle.species;
        this.life = Math.ceil(mingle.stats.life * modificators[mingle.species]);
    }

    get isAlive() { return this.life > 0; }
    get totalLife() { return Math.ceil(this.stats.life * modificators[this.species]); }

    public applyBuff(buff: Buff) { this.buffs.push(buff); }
    public applyDebuff(debuff: Debuff) { this.debuffs.push(debuff); }

    public takesDamage(damage: number) {
        const totalDamage = damage - this.shield;
        const newLife = this.life - totalDamage;

        this.life = newLife > 0 ? newLife : 0;
    };
}
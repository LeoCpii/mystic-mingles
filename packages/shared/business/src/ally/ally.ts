import { probably } from '@mingles/services/number';

import { buffs } from '@/effect';
import type Card from '@/card';
import type { Buff, Debuff } from '@/effect';
import type { BodyFormats, Stats, ActiveParts } from '@/parts';
import type { MingleCards, MingleGenes, MingleColor } from '@/mingle';
import { type Species, type Category, modificators, interaction, categories } from '@/species';

import type { AllyBasicOptions, AllyOptions, Coordinates } from './interface';


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
    public category: Category;
    public color: MingleColor<S>;
    public coordinates: Coordinates;

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
        this.category = mingle.category;
        this.species = mingle.species;
        this.life = Math.ceil(mingle.stats.life * modificators[mingle.species]);
    }

    get isAlive() { return this.life > 0; }
    get totalLife() { return Math.ceil(this.stats.life * modificators[this.species]); }

    public applyBuff(buff: Buff) { this.buffs.push(buff); }
    public applyDebuff(debuff: Debuff) { this.debuffs.push(debuff); }

    public calculateDamage(card: Card<Species, ActiveParts>, target: Ally<Species>) {
        let damage = card.attack;
        let critical = false;

        // BUFF
        const multiplicator = this.buffs.filter(buff => buff === 'damage');

        if (multiplicator.length) {
            damage = multiplicator.reduce((acc) => acc = buffs.damage(acc), card.attack);
            this.buffs = this.buffs.filter(buff => buff !== 'damage');
        }

        // SPECIES
        if (card.species === this.species) {
            damage += card.attack * .1;
        }

        // COUNTER
        const cardCategory = categories[card.species];

        if (interaction[cardCategory].advantage === target.category) { damage += card.attack * .15; }
        if (interaction[cardCategory].disadvantage === target.category) { damage -= card.attack * .15; }

        // CRITICAL
        if (probably(this.stats.fury / 1000)) {
            damage += card.attack * .5;
            critical = true;
        }

        return {
            damage: Math.ceil(damage),
            critical
        };
    }

    public takesDamage(damage: number) {
        const remainingDamage = damage - this.shield;

        if (remainingDamage < 0) {
            this.shield = Math.abs(Math.ceil(remainingDamage));
            return;
        }

        this.shield = 0;

        const newLife = this.life - remainingDamage;

        this.life = newLife > 0 ? newLife : 0;
    };

    public takesTrueDamage(damage: number) {
        const newLife = this.life - damage;

        this.life = newLife > 0 ? newLife : 0;
    }
}
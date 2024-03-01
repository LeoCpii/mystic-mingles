import { probably } from '@mingles/services/number';

import { buffs } from '@/effect';
import type Card from '@/card';
import type { Buff, Debuff } from '@/effect';
import type { BodyFormats, Stats, ActiveParts } from '@/parts';
import type { MingleCards, MingleGenes, MingleColor } from '@/mingle';
import { type Species, type Category, modificators, interaction, categories } from '@/species';

import type { AllyBasicOptions, AllyOptions, Coordinates, SetOfEffects } from './interface';

export default class Ally<S extends Species> implements AllyOptions {
    public id: string;
    public life: number;
    public name: string;
    public shield: number;
    public species: S;
    public stats: Stats;
    public body: BodyFormats;
    public genes: MingleGenes;
    public cards: MingleCards;
    public category: Category;
    public color: MingleColor<S>;
    public coordinates: Coordinates;
    public buffs: SetOfEffects<Buff>;
    public debuffs: SetOfEffects<Debuff>;

    constructor({ mingle, coordinates: positions }: AllyBasicOptions<S>) {
        this.shield = 0;
        this.id = mingle.id;
        this.name = mingle.name;
        this.body = mingle.body;
        this.stats = mingle.stats;
        this.cards = mingle.cards;
        this.genes = mingle.genes;
        this.color = mingle.color;
        this.coordinates = positions;
        this.species = mingle.species;
        this.category = mingle.category;
        this.buffs = {};
        this.debuffs = {};
        this.life = Math.ceil(mingle.stats.life * modificators[mingle.species]);
    }

    get isAlive() { return this.life > 0; }
    get totalLife() { return Math.ceil(this.stats.life * modificators[this.species]); }

    public applyBuff(buff: Buff) { this.buffs[buff] = (this.buffs[buff] ?? 0) + 1; }
    public applyDebuff(debuff: Debuff) {
        if (debuff === 'poison') { this.debuffs[debuff] = (this.debuffs[debuff] ?? 0) + 1; }
        else { this.debuffs[debuff] = 1; }
    }

    public calculateDamage(card: Card<Species, ActiveParts>, target: Ally<Species>) {
        let damage = card.attack;
        let critical = false;

        // BUFF
        const multiplicator = this.buffs['damage'];

        if (multiplicator) {
            damage = buffs.damage(card.attack) * multiplicator;
            this.buffs['damage'] = 0;
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
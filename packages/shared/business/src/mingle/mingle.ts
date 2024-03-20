import { uuid } from '@mingles/services/uuid';

import { ActiveParts, BodyFormats, GeneParts, Stats } from '@/parts';
import { Category, Species, bird, bug, fish, plant, reptile, rodent, categories } from '@/species';

import type { MingleOptions, MingleColor, MingleGenes, MingleCards, MingleBasicOptions } from './interface';

const species = { bird, bug, fish, plant, reptile, rodent };

const getSpecieStats = (s: Species) => { return species[s].stats; };

export default class Mingle<S extends Species> implements MingleOptions<S> {
    public id: string;

    public name: string;
    public createAt = new Date();

    public species: S;
    public stats: Stats;
    public cards: MingleCards;
    public body: BodyFormats;
    public genes: MingleGenes;
    public category: Category;
    public color: MingleColor<S>;

    constructor({ id, name, species, genes, body, color, createAt }: MingleBasicOptions<S>) {
        this.id = id || uuid();
        this.genes = genes;
        this.name = name;
        this.body = body;
        this.color = color;
        this.species = species;
        this.category = categories[species];
        this.createAt = createAt || new Date();

        this.stats = this.setStats({
            species,
            eye: genes.eye.species,
            horn: genes.horn.species,
            tail: genes.tail.species,
            back: genes.back.species,
            mouth: genes.mouth.species,
        });

        this.cards = this.setCards({ horn: genes.horn, tail: genes.tail, mouth: genes.mouth, back: genes.back });
    }

    private setStats({ eye, horn, mouth, tail, species, back }: { [G in GeneParts]: Species } & { species: Species }) {
        const stats: Stats = { life: 0, speed: 0, fury: 0 };

        const geneParts = { eye, horn, tail, mouth, back };

        stats.life += getSpecieStats(species).base.life;
        stats.fury += getSpecieStats(species).base.fury;
        stats.speed += getSpecieStats(species).base.speed;

        for (const part in geneParts) {
            stats.fury += getSpecieStats(geneParts[part]).part.fury;
            stats.speed += getSpecieStats(geneParts[part]).part.speed;
            stats.life += getSpecieStats(geneParts[part]).part.life;
        }

        return {
            fury: Math.round(stats.fury),
            speed: Math.round(stats.speed),
            life: Math.round(stats.life),
        };
    }

    private setCards({ horn, mouth, tail, back }: { [A in ActiveParts]: { species: Species; name: string; } }): MingleCards {
        return {
            horn: species[horn.species].cards.horn.find(card => card.name === horn.name),
            tail: species[tail.species].cards.tail.find(card => card.name === tail.name),
            back: species[back.species].cards.back.find(card => card.name === back.name),
            mouth: species[mouth.species].cards.mouth.find(card => card.name === mouth.name)
        };
    }
};
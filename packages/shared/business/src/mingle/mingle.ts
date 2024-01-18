import { uuid } from '@mingles/services/uuid';

import { ActiveParts, BodyFormats, GeneParts, Stats } from '@/parts';
import { Species, bird, bug, fish, plant, reptile, rodent } from '@/species';

import type { MingleOptions, MingleColor, MingleGenes, MingleCards, MingleBasicOptions } from './interface';

const species = { bird, bug, fish, plant, reptile, rodent };

const getSpecieStats = (s: Species) => { return species[s].stats; };

export default class Mingle<S extends Species> implements MingleOptions<S> {
    public id = uuid();

    public stats: Stats;
    public cards: MingleCards;

    public name: string;
    public species: S;
    public body: BodyFormats;
    public genes: MingleGenes;
    public color: MingleColor<S>;

    constructor({ name, species, genes, body, color }: MingleBasicOptions<S>) {
        this.genes = genes;
        this.name = name;
        this.body = body;
        this.color = color;
        this.species = species;

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

    private setStats({ eye, horn, mouth, tail, species, back }: { [G in GeneParts]: Species } & { species: Species }): Stats {
        const stats: Stats = { life: 0, speed: 0 };

        const geneParts = { eye, horn, tail, mouth, back };

        stats.life += getSpecieStats(species).base.life;
        stats.speed += getSpecieStats(species).base.speed;

        for (const part in geneParts) {
            stats.life += getSpecieStats(geneParts[part]).part.life;
            stats.speed += getSpecieStats(geneParts[part]).part.speed;
        }

        return stats;
    }

    private setCards({ horn, mouth, tail }: { [A in ActiveParts]: { species: Species; name: string; } }) {
        return {
            horn: species[horn.species].cards.horn.find(card => card.name === horn.name),
            tail: species[tail.species].cards.tail.find(card => card.name === tail.name),
            mouth: species[mouth.species].cards.mouth.find(card => card.name === mouth.name),
        };
    }
};
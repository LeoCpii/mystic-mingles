import { BodyFormats, Stats, GenreParts } from '@/parts';
import { Species, bird, bug, fish, plant, reptile, rodent } from '@/species';

import type { MingleOptions, MingleColor, MingleEye, MingleCards, MingleOptionsWithOutStats } from './interface';

type MingleGenes = { [G in GenreParts]: Species; } & { species: Species; };

const species = { bird, bug, fish, plant, reptile, rodent };

const getSpecieStats = (s: Species) => { return species[s].stats; };

export default class Mingle<S extends Species> implements MingleOptions<S> {
    public stats: Stats;

    public readonly name: string;
    public readonly species: S;
    public readonly eye: MingleEye<S>;
    public readonly body: BodyFormats;
    public readonly color: MingleColor<S>;
    public readonly cards: MingleCards<S>;

    constructor({ name, species, eye, body, color, cards }: MingleOptionsWithOutStats<S>) {
        this.eye = eye;
        this.name = name;
        this.body = body;
        this.color = color;
        this.cards = cards;
        this.species = species;

        this.stats = this.setStats({
            species,
            eye: eye.species,
            horn: cards.horn.species,
            tail: cards.tail.species,
            mouth: cards.mouth.species,
        });
    }

    private setStats({ eye, horn, mouth, species, tail }: MingleGenes): Stats {
        const stats: Stats = { life: 0, speed: 0 };

        const geneParts = { eye, horn, tail, mouth };

        stats.life += getSpecieStats(species).base.life;
        stats.speed += getSpecieStats(species).base.speed;

        for (const part in geneParts) {
            stats.life += getSpecieStats(geneParts[part]).part.life;
            stats.speed += getSpecieStats(geneParts[part]).part.speed;
        }

        return stats;
    }
};
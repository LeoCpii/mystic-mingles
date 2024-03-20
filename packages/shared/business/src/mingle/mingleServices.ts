import type DB from '@mingles/middleware/db';
import { Converter } from '@mingles/middleware/db';

import type { Species } from '@/species';

import Mingle from './mingle';
import { MingleBasicOptions } from './interface';

export class MingleServices {
    constructor(private db: DB) { }

    private converter<S extends Species, Instance extends Mingle<S>, Opts extends MingleBasicOptions<S>>(): Converter<Instance, Opts> {
        return {
            toFirestore: (data) => {
                return {
                    id: data.id,
                    name: data.name,
                    body: data.body,
                    color: data.color,
                    genes: data.genes,
                    species: data.species,
                    createAt: data.createAt,
                } as Opts;
            },
            fromFirestore: (snapshot, options) => {
                const data = snapshot.data(options);
                return new Mingle<S>(data as Opts) as Instance;
            }
        };
    }

    public async addMingle<S extends Species>(email: string, mingle: Mingle<S>) {
        return this.db.addCollectionItem({
            data: mingle,
            path: 'player',
            pathSegments: [email, 'mingles', mingle.id],
            converter: this.converter()
        });
    }

    public async getMingles(email: string) {
        return this.db.getAllCollectionItem({
            path: 'player',
            pathSegments: [email, 'mingles'],
            converter: this.converter()
        });
    }
}
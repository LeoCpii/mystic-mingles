import { uuid } from '@mingles/services/uuid';

import type Team from '@/team';

import type { PlayerOptions } from './interface';

export default class Player implements PlayerOptions {
    public id: string;
    public team: Team;

    constructor({ id, team }: PlayerOptions) {
        this.id = id || uuid();
        this.team = team;
    }
}
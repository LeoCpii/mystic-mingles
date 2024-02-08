import type Player from '@/player';

import type { GameOptions } from './interface';

export default class Game implements GameOptions {
    public id: string;
    public players: Player[];

    constructor({ id, players }: GameOptions) {
        this.id = id;
        this.players = players;
    }
}
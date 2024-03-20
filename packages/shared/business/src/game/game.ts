import { uuid } from '@mingles/services/uuid';

import type Player from '@/player';

import type { GameOptions } from './interface';

export default class Game implements GameOptions {
    public id: string;
    public players: Player[];

    constructor({ id, players }: GameOptions) {
        this.id = id || uuid();
        this.players = players;
    }

    public addPlayer(player: Player) { this.players.push(player); }
}
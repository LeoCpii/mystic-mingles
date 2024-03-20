import type Player from '@/player';
import type { Species, } from '@/species';
import type { ActiveParts } from '@/parts';
import type { SetOfEffects } from '@/ally';
import type { Buff, Debuff } from '@/effect';

export interface Action {
    damage: number;
    targetId: string;
    card: {
        name: string;
        species: Species;
        activePart: ActiveParts;
    };
    critical: boolean;
    buffs: SetOfEffects<Buff>;
    debuffs: SetOfEffects<Debuff>;
}

export interface PlayerDataBase {
    [id: string]: {
        teamId: string;
    }
}

export interface DeckRound {
    species: Species;
    activePart: ActiveParts;
    name: string;
}

export interface TeamRound {
    [allyId: string]: {
        deck: DeckRound[];
        actions: Action[],
    };
}

export interface Round {
    id: number;
    teams: {
        [playerId: string]: TeamRound;
    };
    ready?: {
        [playerId: string]: boolean;
    }
}

export interface GameDataBase {
    id: string;
    players: PlayerDataBase;
    rounds: {
        [x in string]: Round;
    };
}

export interface GameOptions {
    id?: string;
    players: Player[];
}
import { IntRange } from '@mingles/services/interface';

import type Mingle from '@/mingle';
import type { Species } from '@/species';
import type { MingleOptions } from '@/mingle';

export type Buff = 'damage' | 'heal' | 'fury' | 'speed';
export type Debuff = 'poison' | 'stun';

export type Coordinates = { x: IntRange<0, 6>; y: IntRange<0, 4> };

export interface AllyOptions extends MingleOptions<Species> {
    life: number;
    shield: number;
    buffs: Buff[];
    debuffs: Debuff[];
    coordinates: Coordinates;
}

export interface AllyBasicOptions<S extends Species> {
    mingle: Mingle<S>;
    coordinates: Coordinates;
}
import { IntRange } from '@mingles/services/interface';

import type Mingle from '@/mingle';
import type { Species } from '@/species';
import type { MingleOptions } from '@/mingle';
import type { Buff, BuffAndDebuff, Debuff } from '@/effect';

export type Coordinates = { x: IntRange<0, 6>; y: IntRange<0, 4>; };
export type SetOfEffects<E extends BuffAndDebuff> = Partial<{ [key in E]: number; }>

export interface AllyOptions extends MingleOptions<Species> {
    life: number;
    shield: number;
    buffs: SetOfEffects<Buff>;
    debuffs: SetOfEffects<Debuff>;
    coordinates: Coordinates;
}

export interface AllyBasicOptions<S extends Species> {
    mingle: Mingle<S>;
    coordinates: Coordinates;
}
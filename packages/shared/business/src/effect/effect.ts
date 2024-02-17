import type { Buff, Debuff, Backdoor } from './interface';

export const buffEffects: Buff[] = ['damage', 'speed'];
export const debuffEffects: Debuff[] = ['stun', 'poison'];
export const backdoorEffects: Backdoor[] = ['faster_backdoor', 'less_life_backdoor'];

export const buffs = {
    damage: (value: number) => value * 1.1,
    speed: (value: number) => value * 1.1
};
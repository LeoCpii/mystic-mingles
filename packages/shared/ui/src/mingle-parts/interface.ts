import type { Species, Mingle, Ally } from '@mingles/business';

export interface PartsProps {
    color: string;
}
export type Direction = 'left' | 'right';

export type Warrior<S extends Species> = Mingle<S> | Ally<S>;

export type Animation = 'attack' | 'took-damage';
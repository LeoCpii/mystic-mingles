import type { Species } from '@/species';
import type { ActiveParts } from '@/parts';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type Cost = IntRange<0, 3>;
export type Attack = IntRange<0, 8>;
export type Shield = IntRange<0, 8>;
export type Passive = 'heal' | 'damage' | 'speed';

export type CardOptions<S extends Species> = {
  cost: Cost;
  species: S;
  passive: Passive;
  part: ActiveParts;
  name: string;
  attack: number;
  shield: number;
  description: string;
};

export interface CardOptionsLock<S extends Species> extends Omit<CardOptions<S>, 'attack' | 'shield'> {
  attack: Attack;
  shield: Shield;
}
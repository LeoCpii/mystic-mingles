import type { IntRange } from '@mingles/services/interface';

import type { ActiveParts } from '@/parts';

import type { Species, Genes } from '../species';

export type Cost = IntRange<0, 3>;
export type Attack = IntRange<0, 8>;
export type Shield = IntRange<0, 8>;
export type Passive = 'heal' | 'damage' | 'speed';

export type CardOptions<S extends Species, P extends ActiveParts> = {
  attack: number;
  shield: number;
  description: string;
  part: P;
  cost: Cost;
  species: S;
  passive: Passive;
  name: Genes[S][P][number];
};

export interface CardOptionsLock<S extends Species, P extends ActiveParts> extends Omit<CardOptions<S, P>, 'attack' | 'shield'> {
  attack: Attack;
  shield: Shield;
}
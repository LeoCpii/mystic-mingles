import type { IntRange } from '@mingles/services/interface';

import type { Effect } from '@/effect';
import type { ActiveParts } from '@/parts';

import type { Species, Genes } from '../species';

export type Cost = IntRange<0, 3>;
export type Attack = number;
export type Shield = number;
export type Type = 'ranged' | 'melee';
export type Audio = { start?: HTMLAudioElement; finish: HTMLAudioElement; };
export type Image = { card: string; bullet?: string; }

export type Assets = { audio: Audio; image: Image; }

export type CardOptions<S extends Species, P extends ActiveParts> = {
  attack: number;
  shield: number;
  description: string;
  part: P;
  cost: Cost;
  species: S;
  effect?: Effect;
  name: Genes[S][P][number];
  type: Type;
  assets: Assets;
};

export interface CardOptionsLock<S extends Species, P extends ActiveParts> extends Omit<CardOptions<S, P>, 'attack' | 'shield'> {
  attack: Attack;
  shield: Shield;
}
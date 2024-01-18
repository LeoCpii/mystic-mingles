import type { IntRange } from '@mingles/services/interface';

import type Mingle from '@/mingle';
import type { Species } from '@/species';

export type Positions = { id: string; x: IntRange<0, 3>; y: IntRange<0, 3>; }

export interface TeamOptions {
    name: string;
    positions: Positions[];
    mingles: Mingle<Species>[];
}

export type Deck = Mingle<Species>['cards'][];
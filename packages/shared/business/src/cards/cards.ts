import { Species } from '@/species';

import BUG_CARDS from './_bug-cards';
import FISH_CARDS from './_fish-cards';
import BIRD_CARDS from './_bird-cards';
import PLANT_CARDS from './_plant-cards';
import RODENT_CARDS from './_rodent-cards';
import REPTILE_CARDS from './_reptile-cards';

import { Card } from './interface';

export * from './interface';

export const CARDS: { [S in Species]: Card<S>[] } = {
    bug: BUG_CARDS,
    fish: FISH_CARDS,
    bird: BIRD_CARDS,
    plant: PLANT_CARDS,
    rodent: RODENT_CARDS,
    reptile: REPTILE_CARDS,
}
import Card from '@/cards';

export const HORN_CARDS: Card<'plant'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'plant',
        name: 'plant-horn',
        passive: 'damage',
        description: 'plant-horn',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'horn',
        species: 'plant',
        name: 'plant-horn',
        passive: 'damage',
        description: 'plant-horn',
    }),
];

export const TAIL_CARDS: Card<'plant'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'plant',
        name: 'plant-tail',
        passive: 'damage',
        description: 'plant-tail',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'tail',
        species: 'plant',
        name: 'plant-tail-2',
        passive: 'damage',
        description: 'plant-tail-2',
    }),
];

export const MOUTH_CARDS: Card<'plant'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'plant',
        name: 'plant-mouth',
        passive: 'damage',
        description: 'plant-mouth',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'plant',
        name: 'plant-mouth-2',
        passive: 'damage',
        description: 'plant-mouth-2',
    }),
];
import Card from '@/cards';

export const HORN_CARDS: Card<'fish'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'fish',
        name: 'fish-horn',
        passive: 'damage',
        description: 'fish-horn',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'horn',
        species: 'fish',
        name: 'fish-horn',
        passive: 'damage',
        description: 'fish-horn',
    }),
];

export const TAIL_CARDS: Card<'fish'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'fish',
        name: 'fish-tail',
        passive: 'damage',
        description: 'fish-tail',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'tail',
        species: 'fish',
        name: 'fish-tail-2',
        passive: 'damage',
        description: 'fish-tail-2',
    }),
];

export const MOUTH_CARDS: Card<'fish'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'fish',
        name: 'fish-mouth',
        passive: 'damage',
        description: 'fish-mouth',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'fish',
        name: 'fish-mouth-2',
        passive: 'damage',
        description: 'fish-mouth-2',
    }),
];
import Card from '@/cards';

export const HORN_CARDS: Card<'rodent'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'rodent',
        name: 'rodent-horn',
        passive: 'damage',
        description: 'rodent-horn',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'horn',
        species: 'rodent',
        name: 'rodent-horn',
        passive: 'damage',
        description: 'rodent-horn',
    }),
];

export const TAIL_CARDS: Card<'rodent'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'rodent',
        name: 'rodent-tail',
        passive: 'damage',
        description: 'rodent-tail',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'tail',
        species: 'rodent',
        name: 'rodent-tail-2',
        passive: 'damage',
        description: 'rodent-tail-2',
    }),
];

export const MOUTH_CARDS: Card<'rodent'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'rodent',
        name: 'rodent-mouth',
        passive: 'damage',
        description: 'rodent-mouth',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'rodent',
        name: 'rodent-mouth-2',
        passive: 'damage',
        description: 'rodent-mouth-2',
    }),
];
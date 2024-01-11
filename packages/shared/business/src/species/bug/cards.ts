import Card from '@/cards';

export const HORN_CARDS: Card<'bug'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'bug',
        name: 'bug-horn',
        passive: 'damage',
        description: 'bug-horn',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'horn',
        species: 'bug',
        name: 'bug-horn',
        passive: 'damage',
        description: 'bug-horn',
    }),
];

export const TAIL_CARDS: Card<'bug'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'bug',
        name: 'bug-tail',
        passive: 'damage',
        description: 'bug-tail',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'tail',
        species: 'bug',
        name: 'bug-tail-2',
        passive: 'damage',
        description: 'bug-tail-2',
    }),
];

export const MOUTH_CARDS: Card<'bug'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'bug',
        name: 'bug-mouth',
        passive: 'damage',
        description: 'bug-mouth',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'bug',
        name: 'bug-mouth-2',
        passive: 'damage',
        description: 'bug-mouth-2',
    }),
];
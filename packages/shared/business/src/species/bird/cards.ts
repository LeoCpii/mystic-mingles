import Card from '@/cards';

export const HORN_CARDS: Card<'bird'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'bird',
        name: 'bird-horn',
        passive: 'damage',
        description: 'bird-horn',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'horn',
        species: 'bird',
        name: 'bird-horn',
        passive: 'damage',
        description: 'bird-horn',
    }),
];

export const TAIL_CARDS: Card<'bird'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'bird',
        name: 'bird-tail',
        passive: 'damage',
        description: 'bird-tail',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'tail',
        species: 'bird',
        name: 'bird-tail-2',
        passive: 'damage',
        description: 'bird-tail-2',
    }),
];

export const MOUTH_CARDS: Card<'bird'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'bird',
        name: 'bird-mouth',
        passive: 'damage',
        description: 'bird-mouth',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'bird',
        name: 'bird-mouth-2',
        passive: 'damage',
        description: 'bird-mouth-2',
    }),
];
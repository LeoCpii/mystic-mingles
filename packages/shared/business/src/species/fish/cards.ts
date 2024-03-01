import Card from '@/card';

export const HORN_CARDS: Card<'fish', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 9,
        shield: 7,
        part: 'horn',
        species: 'fish',
        name: 'Fish Shark',
        description: 'Fish Shark',
        type: 'ranged',
    })
];

export const TAIL_CARDS: Card<'fish', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 10,
        shield: 4,
        part: 'tail',
        species: 'fish',
        name: 'Fish Gold',
        description: 'Fish Gold',
        type: 'ranged',
    })
];

export const MOUTH_CARDS: Card<'fish', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 12.5,
        shield: 1.5,
        part: 'mouth',
        species: 'fish',
        name: 'Fish Eat',
        description: 'Fish Eat',
        type: 'ranged',
    })
];

export const BACK_CARDS: Card<'fish', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 13,
        shield: 1,
        part: 'back',
        species: 'fish',
        name: 'Fish Fin',
        description: 'Fish Fin',
        type: 'ranged',
    })
];
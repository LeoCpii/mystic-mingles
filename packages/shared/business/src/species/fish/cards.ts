import Card from '@/card';

export const HORN_CARDS: Card<'fish', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'fish',
        name: 'Fish Shark',
        effect: 'damage',
        description: 'Fish Shark',
    })
];

export const TAIL_CARDS: Card<'fish', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'fish',
        name: 'Fish Gold',
        effect: 'damage',
        description: 'Fish Gold',
    })
];

export const MOUTH_CARDS: Card<'fish', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'fish',
        name: 'Fish Eat',
        effect: 'damage',
        description: 'Fish Eat',
    })
];

export const BACK_CARDS: Card<'fish', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'fish',
        name: 'Fish Fin',
        effect: 'damage',
        description: 'Fish Fin',
    })
];
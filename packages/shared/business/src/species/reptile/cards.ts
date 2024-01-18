import Card from '@/card';

export const HORN_CARDS: Card<'reptile', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'reptile',
        name: 'Reptile Iguana',
        passive: 'damage',
        description: 'Reptile Iguana',
    })
];

export const TAIL_CARDS: Card<'reptile', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'reptile',
        name: 'Reptile Lizard',
        passive: 'damage',
        description: 'Reptile Lizard',
    })
];

export const MOUTH_CARDS: Card<'reptile', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'reptile',
        name: 'Reptile Sad',
        passive: 'damage',
        description: 'Reptile Sad',
    })
];

export const BACK_CARDS: Card<'reptile', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'reptile',
        name: 'Reptile Turtle',
        passive: 'damage',
        description: 'Reptile Turtle',
    })
];
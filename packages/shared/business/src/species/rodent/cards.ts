import Card from '@/card';

export const HORN_CARDS: Card<'rodent', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'rodent',
        name: 'Rodent Rat',
        description: 'Rodent Rat',
    })
];

export const TAIL_CARDS: Card<'rodent', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'rodent',
        name: 'Rodent Beaver',
        description: 'Rodent Beaver',
    })
];

export const MOUTH_CARDS: Card<'rodent', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'rodent',
        name: 'Rodent Squirrel',
        description: 'Rodent Squirrel',
    })
];

export const BACK_CARDS: Card<'rodent', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'rodent',
        name: 'Rodent Nut',
        description: 'Rodent Nut',
    })
];
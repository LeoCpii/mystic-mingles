import Card from '@/card';

export const HORN_CARDS: Card<'rodent', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 15,
        shield: 0,
        part: 'horn',
        species: 'rodent',
        name: 'Rodent Rat',
        description: 'Rodent Rat',
        type: 'melee',
    })
];

export const TAIL_CARDS: Card<'rodent', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 12,
        shield: 1,
        part: 'tail',
        species: 'rodent',
        name: 'Rodent Beaver',
        description: 'Rodent Beaver',
        type: 'melee',
    })
];

export const MOUTH_CARDS: Card<'rodent', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 13,
        shield: 1,
        part: 'mouth',
        species: 'rodent',
        name: 'Rodent Squirrel',
        description: 'Rodent Squirrel',
        type: 'melee',
    })
];

export const BACK_CARDS: Card<'rodent', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 9,
        shield: 4,
        part: 'back',
        species: 'rodent',
        name: 'Rodent Nut',
        description: 'Rodent Nut',
        type: 'melee',
    })
];
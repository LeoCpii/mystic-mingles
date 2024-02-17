import Card from '@/card';

export const HORN_CARDS: Card<'bird', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'bird',
        name: 'Bird Topknot',
        description: 'Bird Feather',
    })
];

export const TAIL_CARDS: Card<'bird', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'bird',
        name: 'Bird Feather',
        description: 'Bird Feather',
    })
];

export const MOUTH_CARDS: Card<'bird', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'bird',
        name: 'Bird Beak',
        description: 'Bird Beak',
    })
];

export const BACK_CARDS: Card<'bird', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'bird',
        name: 'Bird Wing',
        description: 'Bird Wing',
    })
];
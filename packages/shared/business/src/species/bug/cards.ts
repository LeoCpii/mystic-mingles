import Card from '@/card';

export const HORN_CARDS: Card<'bug', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'bug',
        name: 'Bug Butterfly',
        description: 'Bug Butterfly',
    })
];

export const TAIL_CARDS: Card<'bug', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'bug',
        name: 'Bug Bee',
        description: 'Bug Bee',
    })
];

export const MOUTH_CARDS: Card<'bug', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'bug',
        name: 'Bug Termite',
        description: 'Bug Termite',
    })
];

export const BACK_CARDS: Card<'bug', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'bug',
        name: 'Bug Fly',
        description: 'Bug Fly',
    })
];
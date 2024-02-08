import Card from '@/card';

export const HORN_CARDS: Card<'plant', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'horn',
        species: 'plant',
        name: 'Plant Fall',
        effect: 'damage',
        description: 'Plant Fall',
    })
];

export const TAIL_CARDS: Card<'plant', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'tail',
        species: 'plant',
        name: 'Plant Leaf',
        effect: 'damage',
        description: 'Plant Leaf',
    })
];

export const MOUTH_CARDS: Card<'plant', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'mouth',
        species: 'plant',
        name: 'Plant Laught',
        effect: 'damage',
        description: 'Plant Laught',
    }),
    new Card({
        cost: 2,
        attack: 3,
        shield: 1,
        part: 'mouth',
        species: 'plant',
        name: 'Plant Snack',
        effect: 'damage',
        description: 'Plant Snack',
    }),
];

export const BACK_CARDS: Card<'plant', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 3,
        part: 'back',
        species: 'plant',
        name: 'Plant Flower',
        effect: 'damage',
        description: 'Plant Flower',
    })
];
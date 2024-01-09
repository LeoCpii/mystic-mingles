import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'fish'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'fish',
        name: 'fish-horn',
        passive: 'damage',
        description: 'fish-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'fish',
        name: 'fish-horn',
        passive: 'damage',
        description: 'fish-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'fish'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'fish',
        name: 'fish-tail',
        passive: 'damage',
        description: 'fish-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'fish',
        name: 'fish-tail-2',
        passive: 'damage',
        description: 'fish-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'fish'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'fish',
        name: 'fish-mouth',
        passive: 'damage',
        description: 'fish-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'fish',
        name: 'fish-mouth-2',
        passive: 'damage',
        description: 'fish-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
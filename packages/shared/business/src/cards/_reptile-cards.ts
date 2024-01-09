import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'reptile'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'reptile',
        name: 'reptile-horn',
        passive: 'damage',
        description: 'reptile-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'reptile',
        name: 'reptile-horn',
        passive: 'damage',
        description: 'reptile-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'reptile'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'reptile',
        name: 'reptile-tail',
        passive: 'damage',
        description: 'reptile-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'reptile',
        name: 'reptile-tail-2',
        passive: 'damage',
        description: 'reptile-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'reptile'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'reptile',
        name: 'reptile-mouth',
        passive: 'damage',
        description: 'reptile-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'reptile',
        name: 'reptile-mouth-2',
        passive: 'damage',
        description: 'reptile-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
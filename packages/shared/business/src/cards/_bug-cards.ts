import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'bug'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'bug',
        name: 'bug-horn',
        passive: 'damage',
        description: 'bug-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'bug',
        name: 'bug-horn',
        passive: 'damage',
        description: 'bug-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'bug'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'bug',
        name: 'bug-tail',
        passive: 'damage',
        description: 'bug-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'bug',
        name: 'bug-tail-2',
        passive: 'damage',
        description: 'bug-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'bug'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'bug',
        name: 'bug-mouth',
        passive: 'damage',
        description: 'bug-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'bug',
        name: 'bug-mouth-2',
        passive: 'damage',
        description: 'bug-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
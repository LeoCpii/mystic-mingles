import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'rodent'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'rodent',
        name: 'rodent-horn',
        passive: 'damage',
        description: 'rodent-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'rodent',
        name: 'rodent-horn',
        passive: 'damage',
        description: 'rodent-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'rodent'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'rodent',
        name: 'rodent-tail',
        passive: 'damage',
        description: 'rodent-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'rodent',
        name: 'rodent-tail-2',
        passive: 'damage',
        description: 'rodent-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'rodent'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'rodent',
        name: 'rodent-mouth',
        passive: 'damage',
        description: 'rodent-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'rodent',
        name: 'rodent-mouth-2',
        passive: 'damage',
        description: 'rodent-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'bird'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'bird',
        name: 'bird-horn',
        passive: 'damage',
        description: 'bird-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'bird',
        name: 'bird-horn',
        passive: 'damage',
        description: 'bird-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'bird'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'bird',
        name: 'bird-tail',
        passive: 'damage',
        description: 'bird-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'bird',
        name: 'bird-tail-2',
        passive: 'damage',
        description: 'bird-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'bird'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'bird',
        name: 'bird-mouth',
        passive: 'damage',
        description: 'bird-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'bird',
        name: 'bird-mouth-2',
        passive: 'damage',
        description: 'bird-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
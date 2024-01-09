import { Card } from "./interface";
import { getAttack, getShield } from "./indicators";

const HORN_CARDS: Card<'plant'>[] = [
    {
        cost: 1,
        part: 'horn',
        species: 'plant',
        name: 'plant-horn',
        passive: 'damage',
        description: 'plant-horn',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'horn',
        species: 'plant',
        name: 'plant-horn',
        passive: 'damage',
        description: 'plant-horn',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const TAIL_CARDS: Card<'plant'>[] = [
    {
        cost: 1,
        part: 'tail',
        species: 'plant',
        name: 'plant-tail',
        passive: 'damage',
        description: 'plant-tail',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'tail',
        species: 'plant',
        name: 'plant-tail-2',
        passive: 'damage',
        description: 'plant-tail-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

const MOUTH_CARDS: Card<'plant'>[] = [
    {
        cost: 1,
        part: 'mouth',
        species: 'plant',
        name: 'plant-mouth',
        passive: 'damage',
        description: 'plant-mouth',
        shield: getShield(3),
        attack: getAttack(1),
    },
    {
        cost: 2,
        part: 'mouth',
        species: 'plant',
        name: 'plant-mouth-2',
        passive: 'damage',
        description: 'plant-mouth-2',
        shield: getShield(1),
        attack: getAttack(3),
    },
];

export default [...HORN_CARDS, ...TAIL_CARDS, ...MOUTH_CARDS];
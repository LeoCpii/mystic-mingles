import { GrassImage, CloverImage } from '@mingles/resources/images';
import { SimpleAttackAudio } from '@mingles/resources/audio';

import Card from '@/card';

export const HORN_CARDS: Card<'plant', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 5,
        shield: 9,
        part: 'horn',
        species: 'plant',
        name: 'Plant Fall',
        effect: 'damage',
        description: 'Plant Fall',
        type: 'melee',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];

export const TAIL_CARDS: Card<'plant', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 3,
        shield: 10,
        part: 'tail',
        species: 'plant',
        name: 'Plant Leaf',
        effect: 'damage',
        description: 'Plant Leaf',
        type: 'melee',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];

export const MOUTH_CARDS: Card<'plant', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 7,
        shield: 4,
        part: 'mouth',
        species: 'plant',
        name: 'Plant Laught',
        effect: 'damage',
        description: 'Plant Laught',
        type: 'melee',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    }),
    new Card({
        cost: 2,
        attack: 8.5,
        shield: 5,
        part: 'mouth',
        species: 'plant',
        name: 'Plant Snack',
        effect: 'damage',
        description: 'Plant Snack',
        type: 'melee',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    }),
];

export const BACK_CARDS: Card<'plant', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 4,
        shield: 9,
        part: 'back',
        species: 'plant',
        name: 'Plant Flower',
        effect: 'damage',
        description: 'Plant Flower',
        type: 'melee',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];
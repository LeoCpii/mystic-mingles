import { GrassImage, CloverImage } from '@mingles/resources/images';
import { SimpleAttackAudio } from '@mingles/resources/audio';

import Card from '@/card';

export const HORN_CARDS: Card<'reptile', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 6,
        shield: 6,
        part: 'horn',
        species: 'reptile',
        name: 'Reptile Iguana',
        description: 'Reptile Iguana',
        type: 'ranged',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];

export const TAIL_CARDS: Card<'reptile', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 7,
        shield: 4,
        part: 'tail',
        species: 'reptile',
        name: 'Reptile Lizard',
        description: 'Reptile Lizard',
        type: 'ranged',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];

export const MOUTH_CARDS: Card<'reptile', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 4,
        shield: 7,
        part: 'mouth',
        species: 'reptile',
        name: 'Reptile Sad',
        description: 'Reptile Sad',
        type: 'ranged',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];

export const BACK_CARDS: Card<'reptile', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 1,
        shield: 15,
        part: 'back',
        species: 'reptile',
        name: 'Reptile Turtle',
        description: 'Reptile Turtle',
        type: 'ranged',
        assets: {
            audio: { finish: SimpleAttackAudio },
            image: { card: GrassImage, bullet: CloverImage }
        }
    })
];
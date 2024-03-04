import { SimpleAttackAudio } from '@mingles/resources/audio';
import { BlueLightImage, BlueSkyImage } from '@mingles/resources/images';

import Card from '@/card';

export const HORN_CARDS: Card<'bird', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 15,
        shield: 3,
        part: 'horn',
        species: 'bird',
        name: 'Bird Topknot',
        description: 'Bird Feather',
        type: 'ranged',
        effect: 'faster_backdoor',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: BlueSkyImage, bullet: BlueLightImage }
        }
    })
];

export const TAIL_CARDS: Card<'bird', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 12,
        shield: 3,
        part: 'tail',
        species: 'bird',
        name: 'Bird Feather',
        description: 'Bird Feather',
        type: 'ranged',
        effect: 'faster_backdoor',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: BlueSkyImage, bullet: BlueLightImage }
        }
    })
];

export const MOUTH_CARDS: Card<'bird', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 10,
        shield: 3,
        part: 'mouth',
        species: 'bird',
        name: 'Bird Beak',
        description: 'Bird Beak',
        type: 'ranged',
        effect: 'faster_backdoor',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: BlueSkyImage, bullet: BlueLightImage }
        }
    })
];

export const BACK_CARDS: Card<'bird', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 11,
        shield: 3,
        part: 'back',
        species: 'bird',
        name: 'Bird Wing',
        description: 'Bird Wing',
        type: 'ranged',
        effect: 'faster_backdoor',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: BlueSkyImage, bullet: BlueLightImage }
        }
    })
];
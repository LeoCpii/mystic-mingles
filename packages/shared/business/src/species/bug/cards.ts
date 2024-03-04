import { RedLightImage, LoveBugImage, BeattleImage } from '@mingles/resources/images';
import { SimpleAttackAudio } from '@mingles/resources/audio';

import Card from '@/card';

export const HORN_CARDS: Card<'bug', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 10,
        shield: 3,
        part: 'horn',
        species: 'bug',
        name: 'Bug Butterfly',
        description: 'Bug Butterfly',
        type: 'ranged',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: LoveBugImage, bullet: RedLightImage }
        }
    })
];

export const TAIL_CARDS: Card<'bug', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 15,
        shield: 1,
        part: 'tail',
        species: 'bug',
        name: 'Bug Bee',
        description: 'Bug Bee',
        type: 'ranged',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: LoveBugImage, bullet: RedLightImage }
        }
    })
];

export const MOUTH_CARDS: Card<'bug', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 9,
        shield: 5,
        part: 'mouth',
        species: 'bug',
        name: 'Bug Termite',
        description: 'Bug Termite',
        type: 'ranged',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: BeattleImage, bullet: RedLightImage }
        }
    })
];

export const BACK_CARDS: Card<'bug', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 10,
        shield: 6,
        part: 'back',
        species: 'bug',
        name: 'Bug Fly',
        description: 'Bug Fly',
        type: 'ranged',
        assets: {
            audio: { start: SimpleAttackAudio, finish: SimpleAttackAudio },
            image: { card: LoveBugImage, bullet: RedLightImage }
        }
    })
];
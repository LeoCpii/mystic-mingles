export type Parts = ActionParts | BodyParts;

export type ActionParts = 'horn' | 'tail' | 'mouth';
export type BodyParts = 'eye' | 'body';

export type PartStats = {
    life: number;
    speed: number;
}
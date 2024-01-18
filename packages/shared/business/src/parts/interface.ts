export type PassiveParts = 'eye' | 'body';
export type ActiveParts = 'horn' | 'tail' | 'mouth' | 'back';
export type GeneParts = ActiveParts | 'eye';
export type BodyParts = ActiveParts | PassiveParts;

export type Stats = { life: number; speed: number; }

export type BodyFormats = 'hex' | 'square' | 'circle';

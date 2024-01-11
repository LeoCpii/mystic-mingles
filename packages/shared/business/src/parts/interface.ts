export type PassiveParts = 'eye' | 'body';
export type ActiveParts = 'horn' | 'tail' | 'mouth';
export type GenreParts = ActiveParts | 'eye';
export type BodyParts = ActiveParts | PassiveParts;

export type Stats = { life: number; speed: number; }

export type BodyFormats = 'triangle' | 'square' | 'circle' | 'star' | 'oval';

import type { ActiveParts, BodyParts, PassiveParts, GeneParts, BodyFormats } from './interface';

export const passiveParts: PassiveParts[] = ['eye', 'body'];
export const activeParts: ActiveParts[] = ['horn', 'tail', 'mouth', 'back'];
export const geneParts: GeneParts[] = ['eye', ...activeParts];
export const bodyParts: BodyParts[] = [...passiveParts, ...activeParts];
export const bodyFormats: BodyFormats[] = ['hex', 'square', 'circle'];
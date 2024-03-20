import type Card from '@mingles/business/card';
import type Ally from '@mingles/business/ally';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import type { Buff, Debuff } from '@mingles/business/effect';
import type { SetOfEffects } from '@mingles/business/ally';

interface GetAttackData { ally: Ally<Species>; target: Ally<Species>; card: Card<Species, ActiveParts>; };
interface GetAttackDataResult { damage: number; critical: boolean; debuffs: SetOfEffects<Debuff>; buffs: SetOfEffects<Buff>; };
export function getAttackData({ ally, card, target }: GetAttackData): GetAttackDataResult {
    if (ally.debuffs.stun) {
        return {
            damage: 0,
            critical: false,
            buffs: ally.buffs,
            debuffs: { ...ally.debuffs, stun: 0 },
        };
    }

    const { damage, critical } = ally.calculateDamage(card, target);

    return {
        damage,
        critical,
        buffs: ally.buffs,
        debuffs: ally.debuffs
    };
}
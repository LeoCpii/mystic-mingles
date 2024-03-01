import Team from '@mingles/business/team';
import type Card from '@mingles/business/card';
import type Ally from '@mingles/business/ally';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { type Buff, buffEffects } from '@mingles/business/effect';

import { getElem } from './actions-target';

interface ActionData {
    damage?: number;
    critical: boolean;
    ally: Ally<Species>;
    target: Ally<Species>;
    card: Card<Species, ActiveParts>;
}

export function applyShield(ally: Ally<Species>, cards: Card<Species, ActiveParts>[]) {
    const shield = cards.reduce((acc, card) => acc + card.shield, 0);

    ally.shield = shield;

    return ally;
};

export function make({ card, ally, target, damage = 0, critical }: ActionData) {
    return {
        applyBuff: () => {
            const effect = card.effect as Buff;

            if (buffEffects.includes(effect)) { ally.applyBuff(effect); }

            return make({ card, ally, target, damage, critical });
        },
        applyDebuff: () => {
            return make({ card, ally, target, damage, critical });
        },
        applyDamage: () => {
            const { critical: hasCriticalAttack, damage } = ally.calculateDamage(card, target);

            target.takesDamage(damage);

            return make({ card, ally, target, damage, critical: hasCriticalAttack });
        },
        return: {
            ally,
            target,
            damage,
            critical
        }
    };
}

interface Attack {
    teamAlly: Team;
    teamEnemy: Team;
    isAlly: boolean;
    target: Ally<Species>;
    fighter: Ally<Species>;
    card: Card<Species, ActiveParts>;
}
export function getAttackData({ card, fighter, target, isAlly, teamAlly, teamEnemy }: Attack) {
    const { target: newEnemy, ally: newAlly, damage, critical } = make({ card, ally: fighter, target, critical: false })
        .applyDamage()
        .applyBuff()
        .applyDebuff()
        .return;

    const rivalTeam = isAlly ? teamEnemy : teamAlly;
    const equivalentTeam = isAlly ? teamAlly : teamEnemy;

    const newEnemyTeam = new Team({
        ...rivalTeam,
        allies: [...rivalTeam.allies.filter(a => a.id !== target.id), newEnemy],
    });

    const newAllyTeam = new Team({
        ...equivalentTeam,
        allies: [...equivalentTeam.allies.filter(a => a.id !== newAlly.id), newAlly],
    });

    return { newEnemyTeam, newAllyTeam, damage, critical };
}

export function poisonDamage(team: Team) {
    const poisoned = team.allies
        .filter(e => e.debuffs.poison && e.isAlive)
        .map(e => {
            const poisonCount = e.debuffs.poison as number;
            const damage = poisonCount * 2;

            const { rect } = getElem(e.id);

            e.takesDamage(damage);

            return {
                damage,
                poisoned: e,
                critical: false,
                coordinates: { x: rect.x, y: rect.y },
            };
        });

    const newTeam = new Team({
        ...team,
        allies: [...team.allies.filter(t => !poisoned.some(i => i.poisoned.id === t.id)), ...poisoned.map(i => i.poisoned)]
    });

    return {
        newTeam,
        poisoned: poisoned.map(p => ({
            coordinates: p.coordinates,
            damage: p.damage,
            critical: p.critical
        })),
    };
}
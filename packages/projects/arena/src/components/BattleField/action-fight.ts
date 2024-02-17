import Team from '@mingles/business/team';
import type Card from '@mingles/business/card';
import type Ally from '@mingles/business/ally';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { type Buff, buffEffects } from '@mingles/business/effect';

interface ActionData {
    ally: Ally<Species>;
    target: Ally<Species>;
    card: Card<Species, ActiveParts>;
}

export function applyShield(ally: Ally<Species>, cards: Card<Species, ActiveParts>[]) {
    const shield = cards.reduce((acc, card) => acc + card.shield, 0);

    ally.shield = shield;

    return ally;
};

export function make({ card, ally, target }: ActionData) {
    return {
        applyBuff: () => {
            const effect = card.effect as Buff;

            if (buffEffects.includes(effect)) { ally.applyBuff(effect); }

            return make({ card, ally, target });
        },
        applyDebuff: () => {
            return make({ card, ally, target });
        },
        applyDamage: () => {
            const damage = ally.calculateDamage(card, target);
            target.takesDamage(damage);

            return make({ card, ally, target });
        },
        return: {
            ally,
            target,
        }
    };
}

interface Attack {
    index: number;
    isAlly: boolean;
    teamAlly: Team;
    teamEnemy: Team;
    target: Ally<Species>;
    fighter: Ally<Species>;
    card: Card<Species, ActiveParts>;
    chosenFighterCards: Card<Species, ActiveParts>[];
}
export function attack({ card, fighter, target, isAlly, teamAlly, teamEnemy, chosenFighterCards, index }: Attack) {
    const { target: newEnemy, ally } = make({ card, ally: fighter, target })
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
        allies: [...equivalentTeam.allies.filter(a => a.id !== ally.id), ally],
    });

    const newChosenCards = chosenFighterCards.slice(index + 1, chosenFighterCards.length);

    return { newEnemyTeam, newAllyTeam, newChosenCards };
}
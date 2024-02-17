import type Card from '@mingles/business/card';
import type Ally from '@mingles/business/ally';
import { getRandom } from '@mingles/services/array';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { backdoorEffects, type Backdoor } from '@mingles/business/effect';

interface GetTarget {
    card: Card<Species, ActiveParts>;
    ally: Ally<Species>;
    enemies: Ally<Species>[];
}

const calculateDistance = (ally: Ally<Species>, enemy: Ally<Species>) => {
    const x = Math.pow(ally.coordinates.x - (10 - enemy.coordinates.x), 2);
    const y = Math.pow(ally.coordinates.y - enemy.coordinates.y, 2);

    return Math.sqrt(x + y);
};

const getClosestEnemy = (ally: Ally<Species>, enemies: Ally<Species>[]) => {
    const closest = enemies.map(enemy => {
        const distance = calculateDistance(ally, enemy);
        return { id: enemy.id, distance };
    })
        .sort((a, b) => a.distance > b.distance ? 1 : -1)
        .filter((enemy, _, ordered) => enemy.distance === ordered[0].distance);

    const id = getRandom(closest).id;

    return enemies.find(enemy => enemy.id === id) as Ally<Species>;
};

export function getTarget({ card, enemies, ally }: GetTarget) {
    if (backdoorEffects.includes(card.effect as Backdoor)) { return getClosestEnemy(ally, enemies); }

    return getClosestEnemy(ally, enemies);
}

export function goTo(ally: Ally<Species>, enemy: Ally<Species>) {
    const attacker = document.getElementById(ally.id) as HTMLElement;
    const defender = document.getElementById(enemy.id) as HTMLElement;

    if (attacker && defender) {
        const attackerRect = attacker.getBoundingClientRect();
        const defenderRect = defender.getBoundingClientRect();

        const x = defenderRect.x - attackerRect.x - 190;
        const y = defenderRect.y - attackerRect.y;

        attacker.style.transform = `translate(${x}px, ${y}px)`;
        attacker.style.zIndex = '100';
    }
}

export function goBack(ally: Ally<Species>) {
    const attacker = document.getElementById(ally.id) as HTMLElement;

    if (attacker) {
        attacker.style.transform = 'translate(0px, 0px)';
        attacker.style.zIndex = '2';
    }
}
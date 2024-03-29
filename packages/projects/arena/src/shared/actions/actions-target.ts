import type Card from '@mingles/business/card';
import type Ally from '@mingles/business/ally';
import type Team from '@mingles/business/team';
import { getRandom } from '@mingles/services/array';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { backdoorEffects, type Backdoor } from '@mingles/business/effect';

interface GetTarget {
    teamEnemy: Team;
    ally: Ally<Species>;
    card: Card<Species, ActiveParts>;
}

export const getElem = (id: string) => {
    const el = document.getElementById(id) as HTMLElement;
    return { el, rect: el.getBoundingClientRect() };
};

const calculateDistance = (ally: Ally<Species>, enemy: Ally<Species>) => {
    const x = Math.pow(ally.coordinates.x - (10 - enemy.coordinates.x), 2);
    const y = Math.pow(ally.coordinates.y - enemy.coordinates.y, 2);

    return Math.sqrt(x + y);
};

const getClosestEnemy = (ally: Ally<Species>, enemies: Ally<Species>[]) => {
    const closest = enemies
        .filter(e => e.isAlive)
        .map(enemy => {
            const distance = calculateDistance(ally, enemy);
            return { id: enemy.id, distance };
        })
        .sort((a, b) => a.distance > b.distance ? 1 : -1)
        .filter((enemy, _, ordered) => enemy.distance === ordered[0].distance);

    const id = getRandom(closest).id;

    return enemies.find(enemy => enemy.id === id) as Ally<Species>;
};

export function getTarget({ card, teamEnemy, ally }: GetTarget) {
    const enemies = teamEnemy.priorityOrder.filter(e => e.isAlive);

    if (backdoorEffects.includes(card.effect as Backdoor)) {
        if (card.effect === 'faster_backdoor') { return teamEnemy.higherSpeed; }
    }

    return getClosestEnemy(ally, enemies);
}

export function getCoordinates(ally: Ally<Species>, enemy: Ally<Species>) {
    const attacker = getElem(ally.id);
    const defender = getElem(enemy.id);

    const x = defender.rect.x - attacker.rect.x - 190;
    const y = defender.rect.y - attacker.rect.y;

    return { x, y };
}

export function goBack(ally: Ally<Species>) {
    const attacker = document.getElementById(ally.id) as HTMLElement;

    if (attacker) {
        attacker.style.transform = 'translate(0px, 0px)';
        attacker.style.zIndex = '2';
    }
}
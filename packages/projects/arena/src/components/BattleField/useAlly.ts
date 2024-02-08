import { useState } from 'react';

import Ally from '@mingles/business/ally';
import type { Species } from '@mingles/business/species';

export default function useAlly(ally: Ally<Species>) {
    const [_ally, setAlly] = useState<Ally<Species>>(ally);

    const takesDamage = (damage: number) => {
        _ally.life -= damage;
        setAlly({ ..._ally, life: _ally.life } as Ally<Species>);
    };

    return { ally, takesDamage };
}
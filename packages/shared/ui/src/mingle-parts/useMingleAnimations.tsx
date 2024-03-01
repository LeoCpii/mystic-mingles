import { useState } from 'react';

import type { Animation } from './interface';

export default function useMingleAnimations() {
    const [animation, setAnimation] = useState<Animation>();

    const simpleAttack = () => {
        setAnimation('attack');
        setTimeout(() => { setAnimation(undefined); }, 500);
    };

    const tookDamage = () => {
        setAnimation('took-damage');
        setTimeout(() => { setAnimation(undefined); }, 600);
    };

    return {
        animation,
        simpleAttack,
        tookDamage
    };
}
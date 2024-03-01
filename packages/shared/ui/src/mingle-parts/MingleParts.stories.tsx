import React from 'react';

import { Mingle, generateRandomMingle } from '@mingles/business';

import type { Meta, StoryObj } from '@storybook/react';

import MingleParts from './MingleParts';
import useMingleAnimations from './useMingleAnimations';

const meta: Meta<typeof MingleParts> = {
    title: 'MingleParts',
    component: MingleParts,
};

const mingle = new Mingle(generateRandomMingle());

export const HowToUse: StoryObj<typeof MingleParts> = {
    render: () => {
        const {
            animation: animationLeft,
            simpleAttack: simpleAttackLeft,
            tookDamage: tookDamageLeft
        } = useMingleAnimations();
        const {
            animation: animationRight,
            simpleAttack: simpleAttackRight,
            tookDamage: tookDamageRight
        } = useMingleAnimations();

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button onClick={simpleAttackRight}>ATTACK RIGHT</button>
                    <button onClick={tookDamageRight}>TOOK DAMAGE</button>
                    <div style={{ width: 350 }}>
                        <MingleParts mingle={mingle} direction="right" animation={animationRight} />
                    </div>
                </div>
                <div>
                    <button onClick={simpleAttackLeft}>ATTACK LEFT</button>
                    <button onClick={tookDamageLeft}>TOOK DAMAGE</button>
                    <div style={{ width: 350 }}>
                        <MingleParts mingle={mingle} direction="left" animation={animationLeft} />
                    </div>
                </div>
            </div>

        );
    }
};

export default meta;
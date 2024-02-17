import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import MiniCard from './MiniCard';

const meta: Meta<typeof MiniCard> = {
    title: 'MiniCard',
    component: MiniCard,
};

export const HowToUse: StoryObj<typeof MiniCard> = {
    render: () => {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MiniCard
                        attack={150}
                        species='bird'
                        name='Parasite'
                    />
                    <MiniCard
                        attack={150}
                        species='bug'
                        name='Parasite'
                    />
                    <MiniCard
                        attack={150}
                        species='fish'
                        name='Parasite'
                    />
                    <MiniCard
                        attack={150}
                        species='plant'
                        name='Parasite'
                    />
                    <MiniCard
                        attack={150}
                        species='reptile'
                        name='Parasite'
                    />
                    <MiniCard
                        attack={150}
                        species='rodent'
                        name='Parasite'
                    />
                </div>
            </div>
        );
    }
};

export default meta;
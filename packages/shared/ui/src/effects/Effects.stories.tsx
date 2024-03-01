import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Effects from './Effects';

const meta: Meta<typeof Effects> = {
    title: 'Effects',
    component: Effects,
};

export const HowToUse: StoryObj<typeof Effects> = {
    render: () => {
        return (
            <div style={{ width: '150px', position: 'relative' }}>
                <div style={{ width: '150px', position: 'relative' }}>
                    <Effects effect="damage" />
                </div>
                <Effects effect="poison" />
            </div>
        );
    }
};

export default meta;
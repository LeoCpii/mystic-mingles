import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import GameProvider from './GameProvider';

const meta: Meta<typeof GameProvider> = {
    title: 'Game',
    component: GameProvider,
};

function Content() {
    return (
        <div>
            <p>GameProvider</p>
        </div>
    );
}

export const HowToUse: StoryObj<typeof GameProvider> = {
    render: () => {
        return (
            <GameProvider>
                <Content />
            </GameProvider>
        );
    }
};

export default meta;
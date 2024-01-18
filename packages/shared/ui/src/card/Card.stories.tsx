import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
const meta: Meta<typeof Card> = {
    title: 'Card',
    component: Card,
};

export const HowToUse: StoryObj<typeof Card> = {
    render: () => {

        return (
            <Card />
        );
    }
};

export default meta;
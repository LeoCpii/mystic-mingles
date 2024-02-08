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
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='bird'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='bug'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='fish'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='plant'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='reptile'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                    <Card
                        cost={2}
                        shield={35}
                        attack={150}
                        part='back'
                        effect='poison'
                        species='rodent'
                        name='Parasite'
                        description='A plant card with a stun effect'
                    />
                </div>
            </div>
        );
    }
};

export default meta;
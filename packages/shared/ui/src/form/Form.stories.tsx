import React, { InputHTMLAttributes, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import FormControl from './formControl';

const meta: Meta<typeof Form> = {
    title: 'Form',
    component: Form,
};

interface IFormTeste {
    email: string;
    password: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> { error: string; }
const Input = ({ error, value, onInput, maxLength }: IInputProps) => {
    return (
        <>
            <input type='text' onInput={onInput} value={value} maxLength={maxLength} />
            <p style={{ color: 'red' }}>{error}</p>
        </>
    );
};

export const HowToUse: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<IFormTeste>({
            form: {
                email: new FormControl({ value: 'goku@dragonball.com', type: 'email' }),
                password: new FormControl({ value: '', type: 'password', required: true }),
            },
            handle: {
                submit(form) {
                    alert(JSON.stringify(form.values, null, 2));
                },
                change(form) {
                    console.info(form);
                }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control controlName="email">
                    <Input
                        placeholder="email"
                        value={formGroup.controls.email.value}
                        error={
                            formGroup.controls.email.isInvalid
                                ? formGroup.controls.email.error
                                : ''
                        }
                    />
                </Control>
                <Control controlName="password">
                    <Input
                        placeholder="password"
                        value={formGroup.controls.password.value}
                        error={
                            formGroup.controls.password.isInvalid
                                ? formGroup.controls.password.error
                                : ''
                        }
                    />
                </Control>
                <button type="submit">Submit</button>
            </Form>
        );
    }
};

export const WithCustomValidation: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<{ number: number }>({
            form: {
                number: new FormControl({ value: 0, type: 'text' }),
            },
            validator: {
                PrimeNumbers: (form) => {
                    const { number } = form.values;

                    const isPrime = (num: number) => {
                        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
                            if (num % i === 0) return false;
                        }
                        return num > 1;
                    };

                    if (isPrime(number)) {
                        form.controls.number.error = '';
                    } else {
                        form.controls.number.error = 'This number is not prime';
                    }
                }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <p>Write a prime number:</p>
                <Control controlName="number">
                    <Input
                        placeholder="number"
                        value={formGroup.controls.number.value}
                        error={
                            formGroup.controls.number.isInvalid
                                ? formGroup.controls.number.error
                                : ''
                        }
                    />
                </Control>
            </Form>
        );
    }
};

export const WithMask: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<{ tel: string }>({
            form: {
                tel: new FormControl({ value: '99999999999', type: 'tel' }),
            },
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <p>Write a phone number:</p>
                <Control controlName="tel">
                    <Input
                        placeholder="tel"
                        maxLength={15}
                        value={formGroup.controls.tel.masked}
                        error={
                            formGroup.controls.tel.isInvalid
                                ? formGroup.controls.tel.error
                                : ''
                        }
                    />
                </Control>
            </Form>
        );
    }
};

export const WithDependencies: StoryObj<typeof Form> = {
    render: () => {
        const [count, setCount] = useState<number>(0);
        const [formGroup] = useForm<{ value1: string; value2: string }>({
            form: {
                value1: new FormControl({ value: '', type: 'text' }),
                value2: new FormControl({ value: '', type: 'text' }),
            },
            handle: {
                change() {
                    setCount(count + 1);
                }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <p>you typed x times: {count}</p>
                <Control controlName="value1">
                    <Input
                        placeholder="value1"
                        maxLength={15}
                        value={formGroup.controls.value1.masked}
                        error={
                            formGroup.controls.value1.isInvalid
                                ? formGroup.controls.value1.error
                                : ''
                        }
                    />
                </Control>
                <Control controlName="value2">
                    <Input
                        placeholder="value2"
                        maxLength={15}
                        value={formGroup.controls.value2.masked}
                        error={
                            formGroup.controls.value2.isInvalid
                                ? formGroup.controls.value2.error
                                : ''
                        }
                    />
                </Control>
            </Form>
        );
    }
};

export default meta;
import React from 'react';

import { userMock } from '@mymagicchat/mock';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import { Handle } from './formGroup';
import FormControl from './formControl';

interface MockForm {
    tel: string;
    name: string;
    email: string;
    password: string;
}

interface ControlMockProps { controlName: keyof MockForm; control: FormControl<string> }
function ControlMock({ controlName, control }: ControlMockProps) {
    return (
        <Control controlName={controlName}>
            <Input control={control} controlName={controlName} />
        </Control>
    );
}

function Input({ controlName, control }: ControlMockProps) {
    const { error, masked } = control;

    return (
        <>
            <input data-testid={controlName} defaultValue={masked} />
            <span data-testid={`error-${controlName}`}>{error}</span>
        </>
    );
}

interface MockedFormProps { handle: Handle<MockForm>; }
function MockedForm({ handle }: MockedFormProps) {
    const [formGroup] = useForm({
        form: {
            tel: new FormControl({ value: '', type: 'tel', required: true }),
            password: new FormControl({ value: '', required: true }),
            email: new FormControl({ value: userMock.email, type: 'email' }),
            name: new FormControl({ value: userMock.first_name, required: true }),
        },
        handle
    });

    const setValues = () => {
        formGroup.setValues({ name: userMock.first_name, email: userMock.email });
    };

    return (
        <Form formGroup={formGroup} >
            <ControlMock controlName="tel" control={formGroup.controls.tel} />
            <ControlMock controlName="name" control={formGroup.controls.name} />
            <ControlMock controlName="email" control={formGroup.controls.email} />
            <ControlMock controlName="password" control={formGroup.controls.password} />

            <button type="submit" data-testid="submit"></button>
            <button type="button" data-testid="set-values" onClick={setValues}></button>
        </Form>
    );
}

describe('Form', () => {
    let handleMock: any;
    let handle: Handle<MockForm>;

    const setup = (): RenderResult => {
        handleMock = jest.fn();

        handle = { change: handleMock };

        return render(
            <MockedForm handle={handle} />
        );
    };

    const type = (el: HTMLElement, value: string) => { userEvent.type(el, value); };

    describe.skip('Typing', () => {
        it('Should insert value on input', () => {
            const wrapper = setup();
            const { getByTestId } = wrapper;
            const password = getByTestId('password');

            type(password, 'Teste1');

            expect(password).toHaveValue('Teste1');
        });
    });
});

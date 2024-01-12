import React, { Children, useEffect, ReactElement, JSXElementConstructor, cloneElement, FormHTMLAttributes, InputHTMLAttributes } from 'react';

import useControl from './useControl';

type ChildrenElem = ReactElement<any, string | JSXElementConstructor<any>>[];

const validateChildren = <T,>(controlName: keyof T, arrayChildren: ChildrenElem) => {
    if (!arrayChildren.length || arrayChildren.length > 1) {
        throw new Error(`the control "${String(controlName)}" must have only one child`);
    }
};

interface ControlProps<Form> extends FormHTMLAttributes<InputHTMLAttributes<any>> { controlName: keyof Form; children: React.ReactNode; }
export default function Control<Form>({ controlName, children }: ControlProps<Form>) {
    const { update } = useControl<Form>(controlName);
    const arrayChildren = Children.toArray(children) as ChildrenElem;

    useEffect(() => { validateChildren<Form>(controlName, arrayChildren); }, []);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        return cloneElement(child, {
            onInput: (e: any) => update(e.target['value'])
        });
    };

    return (
        renderChildren(arrayChildren[0])
    );
}
import React, { Children, useEffect, ReactElement, JSXElementConstructor, cloneElement, FormHTMLAttributes, InputHTMLAttributes } from 'react';

import useControl from './useControl';

type ChildrenElem = ReactElement<any, string | JSXElementConstructor<any>>[];
type Action = 'blur' | 'input';

const validateChildren = <T,>(controlName: keyof T, arrayChildren: ChildrenElem) => {
    if (!arrayChildren.length || arrayChildren.length > 1) {
        throw new Error(`the control "${String(controlName)}" must have only one child`);
    }
};

interface ControlProps<Form> extends FormHTMLAttributes<InputHTMLAttributes<any>> { controlName: keyof Form; children: React.ReactNode; action?: Action; }
export default function Control<Form>({ controlName, children, action = 'input' }: ControlProps<Form>) {
    const { update } = useControl<Form>(controlName);
    const arrayChildren = Children.toArray(children) as ChildrenElem;

    useEffect(() => { validateChildren<Form>(controlName, arrayChildren); }, []);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        return cloneElement(child, {
            ...(
                action === 'input'
                    ? { onInput: (e: any) => update(e.target['value']) }
                    : { onBlur: (e: any) => update(e.target['value']) }
            )
        });
    };

    return (
        renderChildren(arrayChildren[0])
    );
}
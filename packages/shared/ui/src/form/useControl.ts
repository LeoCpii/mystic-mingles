import { useContext } from 'react';

import debounce from '@/utils/debounce';
import formatter from '@/utils/formatter';

import FormContext from './FormContext';

export default function useControl<T>(controlName: keyof T, delay = 0) {
    const { formGroup } = useContext(FormContext);
    const control = formGroup.controls[controlName];

    if (!formGroup.controls[controlName]) { throw new Error(`Control "${String(controlName)}" not found`); }

    const shouldSanitize = ['tel'].includes(control.type);

    const update = (value: any) => {
        debounce.delay(() => {
            control.value = value;
            control.dirty = true;
            formGroup.update({ [controlName]: shouldSanitize ? formatter.sanitize(value) : value });
        }, delay);
    };

    return { control, update };
}
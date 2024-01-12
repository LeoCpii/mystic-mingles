import validator from '@/utils/validator';
import formatter from '@/utils/formatter';

export const MESSAGES = {
    email: () => 'O campo deve ser um email válido',
    tel: () => 'O campo deve ser um telefone válido',
    required: (field?: string) => field ? `Por favor, nos informe seu ${field}` : 'Este é um campo obrigatório'
};

type KeyMessage = keyof typeof MESSAGES;
type Type = 'text' | 'email' | 'password' | 'tel';

export interface Control<C> {
    value: C;
    type?: Type;
    name?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

export default class FormControl<C> {
    protected _value!: C;

    public error = '';
    public type = 'text';
    public name!: string;
    public dirty = false;
    public required!: boolean;
    public disabled!: boolean;

    constructor(control: Control<C>) {
        this.value = control.value;
        this.disabled = Boolean(control.disabled);
        this.required = Boolean(control.required);

        if (control.type) { this.type = control.type; }
        if (control.name) { this.name = control.name; }

        this.validate();
    }

    public get value(): C { return this._value; }
    public set value(value: C) {
        this._value = value;
        this.validate();
    }

    public get masked() {
        const fn = formatter[this.type];

        if (fn) { return formatter[this.type](this.value); }

        return this.value;
    }

    public get isInvalid() { return Boolean(this.dirty && this.error); }

    public validate(): void {
        const data: any = {};

        data.required = this.required && validator.isEmpty(this.value);

        if (this.value) {
            data.email = this.type === 'email' && !validator.isValidEmail(this.value as string);
            data.tel = this.type === 'tel' && !validator.isValidTelCel(this.value as string);
        }

        const hasError = Object.keys(data).some(key => data[key]);

        if (hasError) {
            const att = Object.keys(data).find(key => data[key]) as KeyMessage;
            this.error = MESSAGES[att](this.name);
        } else {
            this.error = '';
        }
    }
}
export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export function chooseNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom<T>(arr: T[]): T {
    const shuffled = shuffle(arr);
    const chosen = chooseNumber(0, shuffled.length - 1);

    return shuffled[chosen];
}

function greaterOrLessThan<T>(arr: T[], path: string, position: 'higher' | 'less'): T {
    const props = path.split('.');

    const shuffled = shuffle(arr);

    const navigate = (arr: any, prop: string[]) => {
        const value = arr.reduce((p, c) => p[c], prop);

        if (!value && value !== 0) { throw new Error(`Property path "${path}" does not exist.`); }

        return value;
    };

    return shuffled.reduce((prev, current) => {
        const currentValue = navigate(props, current);
        const previousValue = navigate(props, prev);

        return position === 'higher'
            ? (previousValue > currentValue) ? prev : current
            : (previousValue < currentValue) ? prev : current;
    });
}

export function higherThan<T>(arr: T[], path: string): T {
    return greaterOrLessThan(arr, path, 'higher');
}

export function lessThan<T>(arr: T[], path: string): T {
    return greaterOrLessThan(arr, path, 'less');
}
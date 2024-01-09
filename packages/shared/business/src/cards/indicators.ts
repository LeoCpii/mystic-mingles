export const getAttack = (value: number) => {
    const RANGE = { max: 8, min: 0 };

    if (value < RANGE.min || value > RANGE.max) {
        throw new Error(`Invalid attack value: ${value} - The attack value must be between ${RANGE.min} and ${RANGE.max}`);
    }

    return value * 10;
}

export const getShield = (value: number) => {
    const RANGE = { max: 8, min: 0 };

    if (value < RANGE.min || value > RANGE.max) {
        throw new Error(`Invalid shield value: ${value} - The shield value must be between ${RANGE.min} and ${RANGE.max}`);
    }

    return value * 5;
}
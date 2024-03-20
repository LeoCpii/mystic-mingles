export function isObject(value: any) {
    return value instanceof Object;
}

export function deepEqual(
    object1: Record<string, any>,
    object2: Record<string, any>,
    propertiesToDisregard: Array<string> = []
) {
    const keys1 = Object.keys(object1).filter(p => !propertiesToDisregard.includes(p));
    const keys2 = Object.keys(object2).filter(p => !propertiesToDisregard.includes(p));

    if (keys1.length !== keys2.length) { return false; }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);

        if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) { return false; }
    }

    return true;
}

export function isPlainObject(val: any) {
    if (val === undefined || val === null || val.then) return false;
    return Object.prototype.toString.call(val) === '[object Object]';
}

export function mapKeys(obj: any, mapper: any) {
    return Object.entries(obj).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [mapper(value, key)]: value,
        }),
        {}
    );
}

export function deepCopy(obj: any) {
    if (obj === null) return null;
    const copy = Object.assign({}, obj);

    for (const key in copy) {
        copy[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }

    if (Array.isArray(obj)) {
        copy.length = obj.length;
        return Array.from(copy);
    }
    return copy;
}

export function removeEmptyProperties<T>(obj: T, onlyNullishValues = false): T {
    return _removeEmptyProperties(obj, onlyNullishValues);
}

function _removeEmptyProperties(obj: any, onlyNullishValues = false, recursion = false) {
    const data = recursion ? obj : deepCopy(obj);

    for (const key in data) {
        const isPropertyObject = data[key] !== null && typeof data[key] === 'object';
        if (isPropertyObject) {
            _removeEmptyProperties(data[key], onlyNullishValues, true);
        }

        let shouldDelete = !data[key] || isEmpty(data[key]);

        if (onlyNullishValues) {
            shouldDelete = data[key] === null || data[key] === undefined;
        }

        if (shouldDelete) {
            delete data[key];
        }
    }

    if (isEmpty(data)) { return {}; }

    return data;
}

export function removeDuplicateValue(array: Array<any>, attribute = 'value') {
    const uniqueAddresses = Array
        .from(new Set(array.map(a => a[attribute])))
        .map(value => {
            return array.find(a => a[attribute] === value);
        });

    return uniqueAddresses;
}

export function isEmpty(obj: any) {
    if (!obj || typeof obj !== 'object') { return false; }
    return !Object.keys(obj).length;
}

export function serialize(data: any) {
    if (Object.keys(data).some((key) => key)) {
        const url = new URLSearchParams(data).toString();
        return url;
    }
}
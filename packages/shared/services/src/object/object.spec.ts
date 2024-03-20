import { isObject, mapKeys, isPlainObject, removeDuplicateValue, removeEmptyProperties, deepCopy, isEmpty, serialize } from './object';

describe('Util - Object methods', () => {
    const customObject = { userId: 1, fullName: 'Text' };

    describe('mapKeys', () => {
        it('should return a new mapped keys', () => {
            const toUpper = (_value, key: string) => key.toUpperCase();

            const keys = mapKeys(customObject, toUpper);
            expect(keys['USERID']).toBeTruthy();
        });
    });

    describe('isObject', () => {
        it('should return true when param is a object', () => {
            expect(isObject(customObject)).toBeTruthy();
        });

        it('should return false when param is not a valid object', () => {
            expect(isObject('not-object')).toBeFalsy();
        });

    });

    describe('isPlainObject', () => {
        it('should return true when param is a plain object', () => {
            expect(isPlainObject(customObject)).toBeTruthy();
        });

        it('should return false when param is not a plain object', () => {
            expect(isPlainObject(['1', '2', '3'])).toBeFalsy();
        });
    });

    describe('deepCopy', () => {
        it('should return same object when receive simple object', () => {
            expect(deepCopy(customObject)).toStrictEqual(customObject);
        });

        it('should return same object when receive DEEP NESTED object', () => {
            const input = {
                a: 'a',
                b: 4,
                c: null,
                d: { aa: 'aa', bb: 44, cc: { aaa: 'aaa', bbb: 444 } },
                e: [1, 2, 4],
                f: ['1', '2']
            };
            expect(deepCopy(input)).toStrictEqual(input);
        });
    });

    describe('removeEmptyProperties', () => {
        it('should return {} when receive empty object', () => {
            expect(removeEmptyProperties({})).toStrictEqual({});
        });

        describe('onlyNullishValues FALSE', () => {
            it('should return {} when receive object with all values FALSY', () => {
                const input = { a: undefined, b: '', c: null, d: 0, e: NaN, f: [] };
                expect(removeEmptyProperties(input)).toStrictEqual({});
            });

            it('should return correct object when receive object with all values TRUTHY', () => {
                const input = { a: 'a', b: 2, c: true, d: { e: 1 } };
                const expectedObj = { a: 'a', b: 2, c: true, d: { e: 1 } };
                expect(removeEmptyProperties(input)).toStrictEqual(expectedObj);
            });

            it('should return correct object when receive nested value with all properties FALSY', () => {
                const input = { a: 'a', b: 2, c: true, d: { e: null, f: undefined } };
                const expectedObj = { a: 'a', b: 2, c: true };
                expect(removeEmptyProperties(input)).toStrictEqual(expectedObj);
            });

            it('should return correct object when receive object with NESTED empty values', () => {
                const input = { a: 'a', b: 2, c: { d: null, e: 1, f: [] }, g: [1, 2] };
                const expectedObj = { a: 'a', b: 2, c: { e: 1 }, g: [1, 2] };
                expect(removeEmptyProperties(input)).toStrictEqual(expectedObj);
            });

            it('should return correct object when receive object with DEEPLY NESTED empty values', () => {
                const input = { a: 'a', b: 2, c: { d: null, e: 1 }, f: { aa: 1, bb: null, cc: [] } };
                const expectedObj = { a: 'a', b: 2, c: { e: 1 }, f: { aa: 1 } };
                expect(removeEmptyProperties(input)).toStrictEqual(expectedObj);
            });
        });

        describe('onlyNullishValues TRUE', () => {
            it('should return correct object when receive object with all values FALSY', () => {
                const input = { a: undefined, b: '', c: null, d: 0, e: false, f: NaN, g: [] };
                const expectedObj = { b: '', d: 0, e: false, f: NaN, g: [] };
                expect(removeEmptyProperties(input, true)).toStrictEqual(expectedObj);
            });
        });
    });

    describe('isEmpty', () => {
        it('should return true when receive empty object', () => {
            expect(isEmpty({})).toBe(true);
        });

        it('should return false when receive object', () => {
            expect(isEmpty(customObject)).toBe(false);
        });

        it('should return false when receive null', () => {
            expect(isEmpty(null)).toBe(false);
        });

        it('should return false when receive undefined', () => {
            expect(isEmpty(undefined)).toBe(false);
        });

        it('should return false when receive NaN', () => {
            expect(isEmpty(NaN)).toBe(false);
        });
    });

    describe('removeDuplicateValue', () => {
        describe('Empty array', () => {
            const props = [];

            it('should return empty array', () => {
                expect(removeDuplicateValue(props)).toEqual([]);
            });
        });

        describe('Array with one obj', () => {
            const props = [{ value: 'oi' }];

            it('should return the array with the object', () => {
                expect(removeDuplicateValue(props)).toEqual(props);
            });
        });

        describe('Array with two obj with same value', () => {
            const props = [{ value: 'oi' }, { value: 'oi' }];

            it('should return the array with only one object', () => {
                expect(removeDuplicateValue(props)).toEqual([props[0]]);
            });
        });

        describe('Array with some objects with same values', () => {
            const props = [{ value: 'oi' }, { value: 'oi' }, { value: 'oi' }];

            it('should return the two objects', () => {
                expect(removeDuplicateValue(props)).toEqual([props[0]]);
            });
        });

        describe('Array with two obj with different values', () => {
            const props = [{ value: 'oi' }, { value: 'oito' }];

            it('should return the two objects', () => {
                expect(removeDuplicateValue(props)).toEqual(props);
            });
        });
    });

    describe('serialize', () => {
        it('should return serialized string when recieved only one value', () => {
            const data = { name: 'your_name' };
            expect(serialize(data)).toEqual('name=your_name');
        });

        it('should return serialized string when recieved multiples values', () => {
            const data = { name: 'your_name', lastname: 'your_lastname' };
            expect(serialize(data)).toEqual('name=your_name&lastname=your_lastname');
        });

        it('should return undefined when recieved empty object', () => {
            const data = {};
            expect(serialize(data)).toEqual(undefined);
        });
    });
});

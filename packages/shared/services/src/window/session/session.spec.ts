
import { Session } from '.';

describe('Window Session', () => {
    it('should check that has method returns true when key exists in sessionStorage', () => {
        const session = new Session();

        sessionStorage.setItem('test_key', 'test_value');

        expect(session.has('test_key')).toBe(true);
    });

    it('should check that has method returns false when key does not exist in sessionStorage', () => {
        const session = new Session();

        expect(session.has('non_existent_key')).toBe(false);
    });

    it('should check that get method returns the correct value when key exists in sessionStorage', () => {
        const session = new Session();

        sessionStorage.setItem('test_key', 'test_value');

        expect(session.get('test_key')).toBe('test_value');
    });

    it('should check that set method sets the correct value in sessionStorage', () => {
        const session = new Session();

        session.set('test_key', 'test_value');

        expect(sessionStorage.getItem('test_key')).toBe('test_value');
    });

    it('should check that set method removes the key from sessionStorage when value is falsy', () => {
        const session = new Session();

        sessionStorage.setItem('test_key', 'test_value');
        session.set('test_key', '');

        expect(sessionStorage.getItem('test_key')).toBe(null);
    });

    it('should check that clear method clears all items from sessionStorage', () => {
        const session = new Session();

        sessionStorage.setItem('test_key1', 'test_value1');
        sessionStorage.setItem('test_key2', 'test_value2');
        session.clear();

        expect(sessionStorage.getItem('test_key1')).toBe(null);
        expect(sessionStorage.getItem('test_key2')).toBe(null);
    });

    it('should check that the set method sets the correct value in sessionStorage when encrypt is true', () => {
        const session = new Session();
        const key = 'test_key';
        const value = 'test_value';

        const encryptedValue = window.btoa(JSON.stringify(value));
        session.set(key, value, true);

        expect(sessionStorage.getItem(key)).toEqual(encryptedValue);
    });

    it('should check that the get method returns the decrypted value when encrypt is true', () => {
        const session = new Session();
        const key = 'test_key';
        const value = 'test_value';

        const encryptedValue = window.btoa(JSON.stringify(value));
        sessionStorage.setItem(key, encryptedValue);

        expect(session.get(key, true)).toEqual(value);
    });

    it('should check that the get method returns empty string when not in browser', () => {
        const session = new Session();
        const key = 'test_key';
        const value = 'test_value';

        sessionStorage.setItem(key, value);
        // @ts-ignore
        delete global.window;

        expect(session.get(key, true)).toEqual('');
    });
});

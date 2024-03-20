import { isBrowser } from '@/window';

export class Session<T extends string> {
    public has(key: T): boolean {
        return key in window.sessionStorage;
    }

    public get<K>(key: T, encrypt = false): K {
        const data = isBrowser() ? sessionStorage.getItem(`${key}`) : '';
        return encrypt && data ? JSON.parse(window.atob(data)) : data;
    }

    public set(key: T, value: string, encrypt = false): void {
        if (isBrowser()) {
            if (value) {
                const data = encrypt ? window.btoa(JSON.stringify(value)) : value;
                sessionStorage.setItem(`${key}`, data);
            } else {
                this.remove(key);
            }
        }
    }

    private remove(key: T) {
        !isBrowser() || sessionStorage.removeItem(`${key}`);
    }

    public clear() {
        !isBrowser() || sessionStorage.clear();
    }
}
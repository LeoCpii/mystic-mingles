export function waitDoing<T>(arr: Array<T>, callback: (item: T, index: number, arr: Array<T>) => void, timeout = 1500) {
    return Promise.all(arr.map((item, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                callback(item, index, arr);
                return resolve('');
            }, timeout * index + 1);
        });
    }));
}

export function wait(callback: () => void, ms: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            callback();
            resolve();
        }, ms);
    });
}
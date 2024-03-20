import type { Database, ref, set, get, onValue, Unsubscribe, update, child, push } from 'firebase/database';

interface RealtimeDBOptions {
    db: Database;
    ref: typeof ref;
    set: typeof set;
    get: typeof get;
    push: typeof push;
    child: typeof child;
    update: typeof update;
    onValue: typeof onValue;
}

export type Subscribe = Unsubscribe;

export default class RealtimeDB {
    constructor(private opts: RealtimeDBOptions) { }

    public async read<T>(path: string[]) {
        return this.opts.get(
            this.opts.child(
                this.opts.ref(this.opts.db),
                path.join('/')
            )
        ).then((snapshot) => snapshot.val() as T);
    }

    public write<T>(data: T, path: string[]) {
        return this.opts.set(
            this.opts.ref(this.opts.db, path.join('/')),
            data
        );
    };

    public update<T>(data: T, path: string[]) {
        return this.opts.update(
            this.opts.ref(this.opts.db),
            { [path.join('/')]: data }
        );
    };

    public subscribe<T>(callback: (data: T) => void, path: string[]) {
        return this.opts.onValue(
            this.opts.ref(this.opts.db, path.join('/')),
            (snapshot) => {
                const data = snapshot.val() as T;

                if (snapshot.exists()) { callback(data); }
            });
    }
}
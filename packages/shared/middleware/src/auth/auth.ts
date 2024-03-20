import { decode } from '@mingles/services/jwt';
import { Cookies } from '@mingles/services/window';

import type { AuthMethods, User } from './interface';

export default class Auth {
    private cookies = new Cookies();

    constructor(private methods: AuthMethods) { }

    get access_token() { return this.cookies.get('access_token'); }
    set access_token(token: string) { this.cookies.set('access_token', token); }

    get user() { return decode<User>(this.cookies.get('access_token')); }

    public async login() {
        return this.methods.googleAuth()
            .then(r => { this.access_token = r.user.accessToken; });
    }
}
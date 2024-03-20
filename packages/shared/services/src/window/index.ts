export * from './url';

export { copy } from './clipboard';
export { Cookies } from './cookies';
export { Session } from './session';

export { default as local } from './local';

export const isBrowser = () => typeof (window) !== 'undefined';
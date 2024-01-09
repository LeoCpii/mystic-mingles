import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import * as Sentry from '@sentry/react';

// VARIABLES
export const theme = import.meta.env.VITE_THEME;
export const isProd = import.meta.env.VITE_ENV === 'production';

export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    manager: import.meta.env.VITE_MANAGER_URL
};

export const env = import.meta.env.VITE_ENV;
export const release = import.meta.env.VITE_RELEASE;

export const sentry = {
    dsn: import.meta.env.VITE_SENTRY_DSN
};

// SENTRY
isProd && Sentry.init({
    dsn: sentry.dsn,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    // Performance Monitoring
    tracesSampleRate: 0.1, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    release
});

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'lab');

const auth = getAuth(app);
const config = getRemoteConfig(app);
const analytics = getAnalytics(app);

// setUserId(analytics, '');

// MODULES

// export const featureToggle = new FeatureToggle(config, REMOTE_CONFIG, isProd);
// export const tracking = new Tracking((event, params) => { logEvent(analytics, event, params); }, isProd);
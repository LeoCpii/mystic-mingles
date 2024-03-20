import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

import DB from '@mingles/middleware/db';
import Auth from '@mingles/middleware/auth';
import { TeamServices } from '@mingles/business/team';
import { MingleServices } from '@mingles/business/mingle';
import { colors } from '@mingles/business/species';

import * as Sentry from '@sentry/react';

// VARIABLES
export const theme = import.meta.env.VITE_THEME;
export const isProd = import.meta.env.VITE_ENV === 'production';

export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    lab: import.meta.env.VITE_LAB_URL,
    arena: import.meta.env.VITE_LAB_ARENA,
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
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'lab');

const firestore = getFirestore(app);

export const db = new DB({ db: firestore, collection, doc, getDoc, setDoc, addDoc, query, where, getDocs, updateDoc });
export const auth = new Auth({});

export const classColors = {
    bug: colors.bug.map(r => r).sort((a, b) => a > b ? 1 : -1),
    bird: colors.bird.map(r => r).sort((a, b) => a > b ? 1 : -1),
    fish: colors.fish.map(r => r).sort((a, b) => a > b ? 1 : -1),
    plant: colors.plant.map(r => r).sort((a, b) => a > b ? 1 : -1),
    rodent: colors.rodent.map(r => r).sort((a, b) => a > b ? 1 : -1),
    reptile: colors.reptile.map(r => r).sort((a, b) => a > b ? 1 : -1),
};

// SERVICES
export const teamServices = new TeamServices(db);
export const mingleServices = new MingleServices(db);
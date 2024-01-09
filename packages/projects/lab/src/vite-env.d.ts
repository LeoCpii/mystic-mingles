/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_THEME: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_RELEASE: string;

    // URLs
    readonly VITE_SSO_URL: string;
    readonly VITE_MANAGER_URL: string;

    // FIREBASE
    readonly VITE_ID: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_DOMAIN: string;
    readonly VITE_PROJECT_ID: string;
    readonly VITE_STORAGE_BUCKET: string;
    readonly VITE_MEASUREMENT_ID: string;
    readonly VITE_MESSAGING_SENDER_ID: string;

    // SENTRY
    readonly VITE_SENTRY_DSN: string;

    // APIs
    readonly VITE_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
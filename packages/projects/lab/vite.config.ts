import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    server: {
        host: 'dev.mystic-mingles.com',
    },
    css: {
        postcss: '@mingles/ui/dist/esm/mingle/index.css'
    }
});

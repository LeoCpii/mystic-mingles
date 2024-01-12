import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import packageJson from './package.json';

const pluginsTS = [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser()
];

const getInput = (name, path, plugins) => {
    return {
        input: path,
        external: [
            ...Object.keys(packageJson.peerDependencies),
            '@mingles/services',
            '@mingles/business'
        ],
        output: [
            {
                file: `dist/cjs/${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `dist/esm/${name}.js`,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins
    };
};

export default [
    getInput('index', 'src/index.ts', [...pluginsTS]),
    getInput('form', 'src/form/index.ts', [...pluginsTS]),
];

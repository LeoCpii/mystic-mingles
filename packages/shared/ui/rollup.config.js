import path from 'path';
import { glob } from 'glob';
import url from 'postcss-url';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';


import packageJson from './package.json';

const pluginsCSS = [
    image(),
    postcss({
        use: [['sass']],
        preprocessor: (content, id) => new Promise((resolve) => {
            const result = sass.renderSync({ file: id });
            resolve({ code: result.css.toString() });
        }),
        plugins: [
            url({
                url: 'inline', // enable inline assets using base64 encoding
                maxSize: 10, // maximum file size to inline (in kilobytes)
                fallback: 'copy', // fallback method to use if max size is exceeded
            })
        ],
        sourceMap: true,
        extract: 'style/index.css',
        minimize: true,
        extensions: ['.sass', '.css', '.scss']
    }),
];

const pluginsTS = [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.stories.tsx', 'dist'] }),
    terser()
];

// const getInput = (name, path, plugins) => {
//     return {
//         input: path,
//         external: [
//             ...Object.keys(packageJson.peerDependencies),
//             '@mingles/services',
//             '@mingles/business'
//         ],
//         output: [
//             {
//                 file: `dist/cjs/${name}.js`,
//                 format: 'cjs',
//                 sourcemap: true,
//             },
//             {
//                 file: `dist/esm/${name}.js`,
//                 format: 'esm',
//                 sourcemap: true,
//             },
//         ],
//         plugins
//     };
// };

// export default [
//     getInput('index', 'src/index.ts', [...pluginsTS, ...pluginsCSS]),
//     getInput('mingle-parts', 'src/mingle-parts/index.ts', [...pluginsTS, ...pluginsCSS]),
//     getInput('form', 'src/form/index.ts', [...pluginsTS]),
//     getInput('game', 'src/game/index.ts', [...pluginsTS]),
//     getInput('utils', 'src/utils/index.ts', [...pluginsTS]),
// ];


export default [
    {
        // input: 'src/index.ts',
        input: glob.sync('src/**/index.ts'),
        external: [
            ...Object.keys(packageJson.peerDependencies),
            '@mingles/services',
            '@mingles/business'
        ],
        output: [
            {
                dir: path.dirname(packageJson.main),
                format: 'esm',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        ],
        plugins: [...pluginsTS, ...pluginsCSS]
    }
];
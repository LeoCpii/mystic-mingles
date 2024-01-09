const { name } = require('./package.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const modules = ['mock', 'services', 'resources'].join('|');
const esModules = ['@mingles/mock', '@mingles/services', '@mingles/resources'].join('|');

module.exports = {
    displayName: name,
    preset: 'ts-jest/presets/js-with-ts',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    },
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`,
        `<rootDir>/../(?!${modules})`
    ],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/.jest/setEnvVars.js', '<rootDir>/.jest/setupJest.js'],
    modulePathIgnorePatterns: [
        "<rootDir>/dist",
        '.*__mocks__.*',
    ]
};

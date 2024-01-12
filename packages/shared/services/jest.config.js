const { name } = require('./package.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    displayName: name,
    preset: 'ts-jest',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        '../../../node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'
    ],
    setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
    modulePathIgnorePatterns: [
        "<rootDir>/dist",
        '.*__mocks__.*'
    ]
};

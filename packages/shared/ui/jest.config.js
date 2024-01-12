const { name } = require('./package.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    displayName: name,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-jest.js'],
    collectCoverageFrom: [`src/**/*.tsx`, `!src/**/*.stories.*`],
    modulePathIgnorePatterns: [
        "<rootDir>/dist",
        '.*__mocks__.*'
    ],
    // fakeTimers: { enableGlobally: true }
};

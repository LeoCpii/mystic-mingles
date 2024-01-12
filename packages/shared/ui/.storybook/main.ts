import { dirname, join } from "path";
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/preset-scss")
  ],

  typescript: {
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../tsconfig.json'
    }
  },

  webpackFinal: async (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin({
      extensions: config.resolve.extensions,
    })];
    return config;
  },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {}
  },

  docs: {
    autodocs: true
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
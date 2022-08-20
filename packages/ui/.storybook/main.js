const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// Many of the stories at the moment do not work because they depend on packages
// that are causing webpack issues (it even has trouble when we import from
// @dao-dao/utils right now). New components we write will work as long as we
// make them totally stateless. Storybook is useful for making new components,
// so let's use it for now and set a goal to fix the broken ones.

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../stories/**/*.@(ts|tsx)'],
  staticDirs: ['./static', '../../../apps/dapp/public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    'storybook-dark-mode',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.plugins = [new tsconfigPathsPlugin()]
    return config
  },
}

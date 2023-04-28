const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../../../**/*.stories.tsx'],
  staticDirs: ['./static', '../../../apps/dapp/public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, 'next.config.js'),
      },
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.plugins = [new tsconfigPathsPlugin()]
    // These packages fail to import Buffer, and adding webpack.ProvidePlugin
    // doesn't fix the issue, so let's just ignore them!
    config.resolve.alias['tiny-secp256k1'] = false
    config.resolve.alias['@toruslabs/eccrypto'] = false

    return config
  },
}

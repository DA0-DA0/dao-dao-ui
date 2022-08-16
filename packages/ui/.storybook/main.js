const path = require('path')

module.exports = {
  // @todo replace with ['../src/**/*.stories.@(js|jsx|ts|tsx)'] once we switch to a mono-repo
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
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
  // webpackFinal: async (config) => {
  //   // @todo resolve path for '@components' should be '../src' once we switch to a mono-repo
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'util/constants': path.resolve(__dirname, '../util/constants'),
  //     'contexts/theme': path.resolve(__dirname, '../contexts/theme'),
  //     styles: path.resolve(__dirname, '../styles'),
  //     '@components': path.resolve(__dirname, '../components'),
  //   }

  //   return config
  // },
}

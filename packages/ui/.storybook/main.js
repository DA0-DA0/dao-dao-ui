module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../**/*.stories.@(ts|tsx)'],
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
}

module.exports = {
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
  // webpackFinal: (config) => {
  //   config.module.rules.push({
  //     test: /\.tsx?$/,
  //     exclude: /node_modules/,
  //     use: [
  //       {
  //         loader: require.resolve('babel-loader'),
  //         options: {
  //           presets: [
  //             require('@babel/preset-typescript').default,
  //             [require('@babel/preset-react').default, { runtime: 'automatic' }],
  //             require('@babel/preset-env').default,
  //           ],
  //         },
  //       },
  //     ],
  //   })

  //   config.resolve.extensions.push('.ts', '.tsx')

  //   config.module.rules.push({
  //     test: /\.mjs$/,
  //     include: /node_modules/,
  //     type: 'javascript/auto',
  //   })

  //   config.resolve.extensions.push('.mjs')

  //   return config
  // },
}

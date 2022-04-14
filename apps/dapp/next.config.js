const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')([
  'ui',
  '@dao-dao/icons',
  '@dao-dao/utils',
])

/** @type {import("next").NextConfig} */
let config = {
  /*
    The reactStrictMode flag is set to false
    to allow for the proposal JSON editor to show.
  */
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  react: {
    useSuspense: false,
    wait: true,
  },
  eslint: {
    dirs: [
      'atoms',
      'components',
      'models',
      'pages',
      'selectors',
      'services',
      'templates',
      'types',
      'util',
    ],
  },
}

// Only need rewrites for local development
if (process.env.NEXT_PUBLIC_CHAIN_ID === 'testing') {
  config.rewrites = async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:26657/:path*', // Proxy to Backend
      },
    ]
  }
}

module.exports = withBundleAnalyzer(withTM(config))

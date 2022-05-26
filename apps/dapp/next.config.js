const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withInterceptStdout = require('next-intercept-stdout')
const withTM = require('next-transpile-modules')([
  '@dao-dao/ui',
  '@dao-dao/icons',
  '@dao-dao/utils',
  '@dao-dao/state',
])

/** @type {import("next").NextConfig} */
let config = {
  /*
    The reactStrictMode flag is set to false
    to allow for the proposal JSON editor to show.
  */
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
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

module.exports = withBundleAnalyzer(
  withInterceptStdout(
    withTM(config),
    // Silence Recoil duplicate warnings on dev.
    (text) =>
      process.env.NODE_ENV === 'development' &&
      text.includes('Expectation Violation: Duplicate atom key')
        ? ''
        : text
  )
)

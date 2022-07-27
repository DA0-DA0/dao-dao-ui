const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withInterceptStdout = require('next-intercept-stdout')
const withTM = require('next-transpile-modules')([
  '@dao-dao/ui',
  '@dao-dao/icons',
  '@dao-dao/utils',
  '@dao-dao/state',
  '@dao-dao/actions',
  '@dao-dao/common',
  '@dao-dao/i18n',
  '@dao-dao/voting-module-adapter',
  '@dao-dao/proposal-module-adapter',
])

const { withSentryConfig } = require('@sentry/nextjs')
/** @type {import("@sentry/nextjs").SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const { i18n } = require('./next-i18next.config')

/** @type {import("next").NextConfig} */
let config = {
  i18n,
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
      'pages',
      'selectors',
      'services',
      'types',
      'util',
      'server',
    ],
  },
  redirects: async () => [
    {
      source: '/starred',
      destination: '/home',
      permanent: false,
    },
    // Redirect legacy multisigs (legacy DAOs redirected in
    // makeGetDaoStaticProps function).
    {
      source: '/multisig/:slug*',
      destination:
        process.env.NEXT_PUBLIC_LEGACY_URL_PREFIX + '/multisig/:slug*',
      permanent: false,
    },
  ],
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['@noahsaso/cosmodal', ...config.externals]
    }

    config.resolve.alias['@noahsaso/cosmodal'] = path.resolve(
      __dirname,
      '..',
      '..',
      'node_modules',
      '@noahsaso',
      'cosmodal'
    )

    return config
  },
  // Only upload source maps to Sentry in CI action when token is provided.
  sentry: {
    disableServerWebpackPlugin:
      process.env.CI !== 'true' || !process.env.SENTRY_AUTH_TOKEN,
    disableClientWebpackPlugin:
      process.env.CI !== 'true' || !process.env.SENTRY_AUTH_TOKEN,
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

module.exports = withSentryConfig(
  withBundleAnalyzer(
    withInterceptStdout(
      withTM(config),
      // Silence Recoil duplicate warnings on dev.
      (text) =>
        process.env.NODE_ENV === 'development' &&
        text.includes('Expectation Violation: Duplicate atom key')
          ? ''
          : text
    )
  ),
  sentryWebpackPluginOptions
)

// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withInterceptStdout = require('next-intercept-stdout')

const { withSentryConfig } = require('@sentry/nextjs')
/** @type {import("@sentry/nextjs").SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const { i18n } = require('./next-i18next.config')

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: [
    '@dao-dao/stateless',
    '@dao-dao/utils',
    '@dao-dao/state',
    '@dao-dao/stateful',
    '@dao-dao/i18n',
    '@dao-dao/types',
  ],
  // Faster minifier during Next build.
  swcMinify: true,
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
      destination: '/',
      permanent: false,
    },
    {
      source: '/home',
      destination: '/',
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
  images: {
    domains: [
      'ipfs.stargaze.zone',
      'nftstorage.link',
      'img-proxy.ekez.workers.dev',
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

module.exports = withSentryConfig(
  withBundleAnalyzer(
    withInterceptStdout(
      config,
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

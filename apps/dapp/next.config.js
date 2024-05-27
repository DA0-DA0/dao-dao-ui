// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

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
    '@cosmos-kit/web3auth',
    'chartjs-adapter-date-fns',
    'chartjs-plugin-annotation',
  ],
  // Because @cosmos-kit/web3auth uses a Worker ESM import.
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // @cosmos-kit/web3auth uses eccrypto, which uses `stream`. This needs to be
    // polyfilled.
    config.resolve.alias['stream'] = 'stream-browserify'
    return config
  },
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
    {
      source: '/inbox/:slug*',
      destination: '/notifications/:slug*',
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
    {
      source: '/me/:slug*',
      destination: '/:slug*',
      permanent: false,
    },
    {
      source: '/tx',
      destination: '/actions',
      permanent: false,
    },
    // Redirect all gov subpages to the dao subpage, but leave /gov alone.
    {
      source: '/gov/:chain/:slug*',
      destination: '/dao/:chain/:slug*',
      permanent: false,
    },
    // Rename Neutron proposal IDs from starting with N to A.
    {
      source:
        '/dao/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff/proposals/N:slug',
      destination:
        '/dao/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff/proposals/A:slug',
      permanent: true,
    },
    // Rename Neutron proposal IDs from starting with P to C.
    {
      source:
        '/dao/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff/proposals/P:slug',
      destination:
        '/dao/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff/proposals/C:slug',
      permanent: true,
    },
  ],
  // Only upload source maps to Sentry in CI action when token is provided.
  sentry: {
    disableServerWebpackPlugin:
      process.env.CI !== 'true' || !process.env.SENTRY_AUTH_TOKEN,
    disableClientWebpackPlugin:
      process.env.CI !== 'true' || !process.env.SENTRY_AUTH_TOKEN,
  },
  images: {
    unoptimized: true,
    domains: [
      'ipfs.stargaze.zone',
      'ipfs-gw.stargaze-apis.com',
      'i.stargaze-apis.com',
      'nftstorage.link',
      'ipfs.daodao.zone',
      'img-proxy.daodao.zone',
      'raw.githubusercontent.com',
    ],
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
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

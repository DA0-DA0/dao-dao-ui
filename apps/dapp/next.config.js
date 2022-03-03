const withTM = require('next-transpile-modules')(['ui'])

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
  experimental: {},
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

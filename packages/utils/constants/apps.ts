import { App, ChainId } from '@dao-dao/types'

import { MAINNET } from './env'

export const APPS: App[] = [
  // Show for all chains.
  {
    name: 'DAO DAO',
    imageUrl: '/apps/daodao.png',
    url: 'https://daodao.zone',
  },

  // Only show on THORChain, since THORChain doesn't support IBC.
  {
    imageUrl: 'https://rujira.network/banner.jpg',
    url: 'https://rujira.network',
    chainIdFilter: {
      include: [ChainId.ThorchainMainnet],
    },
  },

  // Only show on non-THORChain chains, since THORChain doesn't support IBC.
  {
    name: 'Osmosis',
    imageUrl: 'https://app.osmosis.zone/images/preview.jpg',
    url: 'https://app.osmosis.zone',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Neutron',
    imageUrl: '/apps/neutron.png',
    url: 'https://app.neutron.org',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Astroport',
    imageUrl: 'https://app.astroport.fi/thumbnail.jpg',
    url: 'https://app.astroport.fi/swap',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    imageUrl: 'https://stargaze.zone/TwitterCard.png',
    url: MAINNET
      ? 'https://stargaze.zone'
      : 'https://testnet.publicawesome.dev',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    imageUrl: '/apps/stardex.jpg',
    url: 'https://swap.stargaze.zone/swap',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Stargaze Studio',
    imageUrl: 'https://studio.stargaze.zone/assets/android-chrome-256x256.png',
    url: MAINNET
      ? 'https://studio.stargaze.zone'
      : 'https://studio.publicawesome.dev',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Mars Protocol',
    imageUrl: '/apps/mars.jpg',
    url: 'https://app.marsprotocol.io',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Solid Protocol',
    imageUrl: 'https://app.solidcapa.com/logo.svg',
    url: 'https://app.solidcapa.com',
    chainIdFilter: {
      include: [ChainId.TerraMainnet],
    },
  },
  {
    name: 'Atrium',
    imageUrl: 'https://atrium.markets/img/atrium-favicon.svg',
    url: 'https://atrium.markets',
    chainIdFilter: {
      include: [ChainId.TerraMainnet],
    },
  },
  {
    name: 'The Backroom · Quarters',
    imageUrl: 'https://the-backroom.xyz/apple-touch-icon.svg',
    url: 'https://the-backroom.xyz/marketplace',
    chainIdFilter: {
      include: [ChainId.TerraMainnet],
    },
  },
  {
    name: 'Sundial',
    imageUrl: 'https://sundial.markets/logo.svg',
    url: 'https://sundial.markets',
    chainIdFilter: {
      include: [ChainId.TerraMainnet],
    },
  },
  {
    name: 'Calculated Finance',
    imageUrl: '/apps/calcfi.jpg',
    url: 'https://app.calculated.fi/?chain=osmosis-1',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Kleomedes',
    imageUrl: '/apps/kleomedes.png',
    url: 'https://dashboard.kleomed.es',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    imageUrl: '/apps/stakehub.jpeg',
    url: 'https://www.stake-hub.xyz',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Migaloo Command',
    imageUrl: '/apps/migaloo.png',
    url: 'https://app.migaloo.zone',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Atlas',
    imageUrl: '/apps/atlas.jpg',
    url: MAINNET
      ? 'https://app.atlasdao.zone'
      : 'https://testapp.atlasdao.zone',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'Eris Protocol',
    imageUrl: '/apps/eris.png',
    url: 'https://www.erisprotocol.com',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'FIN',
    platform: 'Kujira',
    imageUrl: '/apps/fin.png',
    url: 'https://fin.kujira.network',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'BOW',
    platform: 'Kujira',
    imageUrl: '/apps/bow.png',
    url: 'https://bow.kujira.network',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'GHOST',
    platform: 'Kujira',
    imageUrl: '/apps/ghost.png',
    url: 'https://ghost.kujira.network',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },
  {
    name: 'PILOT',
    platform: 'Kujira',
    imageUrl: '/apps/pilot.png',
    url: 'https://pilot.kujira.network',
    chainIdFilter: {
      exclude: [ChainId.ThorchainMainnet],
    },
  },

  // Must be last for index matching. Enables custom URL input.
  {
    name: '',
    imageUrl: '',
    url: '',
  },
]

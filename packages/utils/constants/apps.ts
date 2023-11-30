import { DaoApp as DaoApp } from '@dao-dao/types'

import { MAINNET } from './env'

export const DAO_APPS: DaoApp[] = [
  {
    name: 'Osmosis',
    imageUrl: 'https://app.osmosis.zone/images/preview.jpg',
    url: 'https://app.osmosis.zone',
  },
  // TODO(apps): uncomment when Stargaze works
  // {
  //   name: 'Stargaze',
  //   imageUrl: 'https://stargaze.zone/TwitterCard.png',
  //   url: MAINNET
  //     ? 'https://stargaze.zone'
  //     : 'https://testnet.publicawesome.dev',
  // },
  {
    name: 'Calculated Finance',
    imageUrl: '/apps/calcfi.jpg',
    url: 'https://app.calculated.fi/?chain=osmosis-1',
  },
  {
    name: 'Stargaze Studio',
    imageUrl: 'https://studio.stargaze.zone/assets/android-chrome-256x256.png',
    url: MAINNET
      ? 'https://studio.stargaze.zone'
      : 'https://studio.publicawesome.dev',
  },

  // Must be last for index matching. Enables custom URL input.
  {
    name: '',
    imageUrl: '',
    url: '',
  },
]

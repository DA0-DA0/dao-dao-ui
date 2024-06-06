import { PfpkProfile, UnifiedProfile } from '@dao-dao/types'

import { getFallbackImage } from './getFallbackImage'

export const makeEmptyPfpkProfile = (): PfpkProfile => ({
  uuid: null,
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  nft: null,
  chains: {},
})

export const makeEmptyUnifiedProfile = (
  chainId: string,
  address: string
): UnifiedProfile => ({
  ...makeEmptyPfpkProfile(),
  source: {
    chainId,
    address,
  },
  nameSource: 'pfpk',
  imageUrl: getFallbackImage(address),
  backupImageUrl: getFallbackImage(address),
})

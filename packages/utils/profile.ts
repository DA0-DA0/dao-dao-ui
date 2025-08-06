import { PfpkProfile, UnifiedProfile } from '@dao-dao/types'

import { getFallbackImage } from './getFallbackImage'

export const makeEmptyPfpkProfile = (): PfpkProfile => ({
  // Disallows editing if we don't have correct nonce from server.
  uuid: '',
  name: null,
  nft: null,
  chains: {},
  createdAt: -1,
  updatedAt: -1,
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

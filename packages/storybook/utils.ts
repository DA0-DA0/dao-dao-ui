import { ChainId, UnifiedProfile } from '@dao-dao/types'

// Use Juno mainnet as storybook chains.
export const CHAIN_ID = ChainId.JunoMainnet

export const WALLET_PROFILE_DATA: UnifiedProfile = {
  nonce: 0,
  name: '@Modern-Edamame',
  nft: null,
  chains: {},
  source: {
    chainId: CHAIN_ID,
    address: 'address',
  },
  imageUrl: '/noah.jpg',
  nameSource: 'pfpk',
  backupImageUrl: '/placeholder/1.svg',
}

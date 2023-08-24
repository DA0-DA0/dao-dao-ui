import { ChainId, WalletProfileData } from '@dao-dao/types'

// Use Juno mainnet as storybook chains.
export const CHAIN_ID = ChainId.JunoMainnet

export const WALLET_PROFILE_DATA: WalletProfileData = {
  loading: false,
  address: '0x123',
  profile: {
    nonce: 0,
    imageUrl: '/noah.jpg',
    name: '@Modern-Edamame',
    nameSource: 'pfpk',
    nft: null,
  },
  backupImageUrl: '/placeholder/1.svg',
}

export const WALLET_PROFILE_DATA_LOADING: WalletProfileData = {
  loading: true,
  address: '0x123',
  profile: {
    nonce: 0,
    imageUrl: '/placeholder/1.svg',
    name: null,
    nameSource: 'pfpk',
    nft: null,
  },
  backupImageUrl: '/placeholder/1.svg',
}

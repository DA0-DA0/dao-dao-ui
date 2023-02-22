import { WalletProfileData } from '@dao-dao/types'

export const WALLET_PROFILE_DATA: WalletProfileData = {
  loading: false,
  address: '0x123',
  profile: {
    nonce: 0,
    imageUrl: '/noah.jpg',
    name: '@Modern-Edamame',
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
    nft: null,
  },
  backupImageUrl: '/placeholder/1.svg',
}

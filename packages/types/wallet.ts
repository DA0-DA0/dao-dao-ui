export interface PfpkWalletProfile {
  nonce: number
  name: string | null
  nft: {
    imageUrl: string
    tokenId: string
    collectionAddress: string
  } | null
}

// Move `imageUrl` out of `NFT` in case we use the Keplr profile image API or a
// fallback image as backup.
export interface WalletProfile extends Omit<PfpkWalletProfile, 'nft'> {
  imageUrl: string
  nft: {
    tokenId: string
    collectionAddress: string
  } | null
}

export interface WalletProfileUpdate {
  nonce: number
  name?: WalletProfile['name']
  nft?: {
    tokenId: string
    collectionAddress: string
  } | null
}

export interface KeplrWalletProfile {
  profile:
    | {}
    | {
        imageUrl: string
        version: number
      }
}

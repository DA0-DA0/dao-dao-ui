import { Chain } from '@chain-registry/types'

export type PfpkProfile = {
  nonce: number
  name: string | null
  nft: {
    chainId: string
    imageUrl: string
    tokenId: string
    collectionAddress: string
  } | null
  /**
   * Map chain ID to public key and address.
   */
  chains: Record<
    string,
    {
      publicKey: string
      address: string
    }
  >
}

export type WalletProfileNameSource = 'pfpk' | 'stargaze'

// Move `imageUrl` out of `NFT` in case we use the Keplr profile image API or a
// fallback image as backup.
export type WalletProfile = PfpkProfile & {
  imageUrl: string
  // Whether or not the name is loaded from PFPK or Stargaze names.
  nameSource: WalletProfileNameSource
}

export type WalletProfileUpdate = {
  nonce: number
  name?: WalletProfile['name']
  nft?: {
    chainId: string
    tokenId: string
    collectionAddress: string
  } | null
}

export type KeplrWalletProfile = {
  profile:
    | {}
    | {
        imageUrl: string
        version: number
      }
}

export type ResolvedProfile = {
  publicKey: string
  address: string
  name: string | null
  nft: {
    chainId: string
    collectionAddress: string
    tokenId: string
    imageUrl: string
  } | null
}

// Meta info about wallet profile, including loading state and a fallback image.
export type WalletProfileData = {
  loading: boolean
  address: string
  profile: WalletProfile
  backupImageUrl: string
}

export type ProfileChain = {
  /**
   * The chain ID of the chain.
   */
  chainId: string
  /**
   * The chain object.
   */
  chain: Chain
  /**
   * Whether or not this is a DAO DAO-supported chain.
   */
  supported: boolean
  /**
   * The address for the profile on this chain.
   */
  address: string
  /**
   * The hex public key for the profile on this chain.
   */
  publicKey: string
}

export type AddChainsStatus = 'idle' | 'chains' | 'registering'
export type AddChainsChainStatus = 'idle' | 'loading' | 'done'

/**
 * Function used to add chains to a profile. Throws an error on failure.
 */
export type AddChainsFunction = (
  /**
   * Chain IDs to add to the profile.
   */
  chainIds: string[],
  /**
   * Callbacks.
   */
  callbacks?: {
    /**
     * Callback for handling status updates for displaying in the UI while the
     * chains are being added.
     */
    setChainStatus?: (chainId: string, status: AddChainsChainStatus) => void
  }
) => Promise<void>

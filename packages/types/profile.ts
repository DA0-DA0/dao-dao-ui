import { AnyChain } from './chain'

export type PfpkPublicKey = {
  /**
   * Type of public key.
   */
  type: string
  /**
   * Public key data hexstring.
   */
  hex: string
}

export type PfpkProfile = {
  /**
   * Unique ID for this profile. Will be null if no profile has been created.
   */
  uuid: string | null
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
      publicKey: PfpkPublicKey
      address: string
    }
  >
}

export type PfpkProfileUpdate = {
  nonce: number
  name?: string | null
  nft?: {
    chainId: string
    tokenId: string
    collectionAddress: string
  } | null
}

/**
 * Function used to update a profile. Throws an error on failure.
 */
export type PfpkProfileUpdateFunction = (
  updates: Omit<PfpkProfileUpdate, 'nonce'>
) => Promise<void>

/**
 * The source of the name in the unified profile.
 */
export type UnifiedProfileNameSource = 'pfpk' | 'stargaze'

/**
 * A unified profile that uses information from backup sources when missing from
 * PFPK.
 */
export type UnifiedProfile = PfpkProfile & {
  /**
   * The source chain and address used to load the profile.
   */
  source: {
    /**
     * The chain ID of the source.
     */
    chainId: string
    /**
     * The address of the source.
     */
    address: string
  }
  /**
   * Image URL to use, which takes into account backup data sources if PFPK does
   * not have an NFT set.
   */
  imageUrl: string
  /**
   * The source of the name.
   */
  nameSource: UnifiedProfileNameSource
  /**
   * Backup image URL that will be used if no PFPK NFT is set.
   */
  backupImageUrl: string
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
  publicKey: PfpkPublicKey
  address: string
  name: string | null
  nft: {
    chainId: string
    collectionAddress: string
    tokenId: string
    imageUrl: string
  } | null
}

export type ProfileChain = {
  /**
   * The chain ID of the chain.
   */
  chainId: string
  /**
   * The chain object.
   */
  chain: AnyChain
  /**
   * Whether or not this is a DAO DAO-supported chain.
   */
  supported: boolean
  /**
   * The address for the profile on this chain.
   */
  address: string
  /**
   * The public key for the profile on this chain.
   */
  publicKey: PfpkPublicKey
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

/**
 * Another profile connected on the same wallet. Used in `useManageProfile`.
 */
export type OtherProfile = {
  /**
   * The chain ID of the chain.
   */
  chainId: string
  /**
   * The address for the profile on this chain.
   */
  address: string
  /**
   * The profile.
   */
  profile: UnifiedProfile
}

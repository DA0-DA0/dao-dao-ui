/**
 * Profile used when updating/saving.
 */
export type ProfileUpdate = Partial<{
  /**
   * Next profile nonce.
   */
  nonce: number
  /**
   * Profile name.
   */
  name: string | null
  /**
   * Profile NFT.
   */
  nft: ProfileNft | null
}>

/**
 * Profile used when fetching directly.
 */
export type FetchedProfile = {
  /**
   * Unique ID. If no profile set, this will be empty.
   */
  uuid: string
  /**
   * Next profile nonce.
   */
  nonce: number
  /**
   * Profile name.
   */
  name: string | null
  /**
   * Profile NFT with image loaded.
   */
  nft: ProfileNftWithImage | null
  /**
   * Map of chain ID to public key and address.
   */
  chains: Record<
    string,
    {
      publicKey: PublicKeyJson
      address: string
    }
  >
}

/**
 * Profile used when searching/resolving by name on a specific chain.
 */
export type ResolvedProfile = {
  /**
   * Unique ID.
   */
  uuid: string
  /**
   * Profile public key for this chain.
   */
  publicKey: PublicKeyJson
  /**
   * Profile address for this chain.
   */
  address: string
  /**
   * Profile name.
   */
  name: string | null
  /**
   * Profile NFT with image loaded.
   */
  nft: ProfileNftWithImage | null
}

export type ProfileNft = {
  chainId: string
  collectionAddress: string
  tokenId: string
}

export type ProfileNftWithImage = ProfileNft & {
  imageUrl: string
}

export type NonceResponse = {
  nonce: number
}

export type StatsResponse = {
  total: number
}

// Body of fetch profile response.
export type FetchProfileResponse = FetchedProfile

export type FetchProfileUuidOnlyResponse = {
  uuid: string
}

// Body of profile update request.
export type UpdateProfileRequest = {
  /**
   * Allow partial updates to profile.
   */
  profile: Omit<ProfileUpdate, 'nonce'>
  /**
   * Optionally use the current public key as the preference for these chains.
   * If undefined, defaults to the chain used to sign this request on profile
   * creation.
   */
  chainIds?: string[]
}

// Body of register public keys request.
export type RegisterPublicKeysRequest = {
  /**
   * List of public key authorizations to register.
   */
  publicKeys: RequestBody<
    {
      /**
       * Profile UUID or public key that is allowed to register this public key.
       */
      allow:
        | {
            uuid: string
          }
        | {
            publicKey: PublicKeyJson
          }
      /**
       * Optionally use this public key as the preference for certain chains. If
       * undefined, no preferences set.
       */
      chainIds?: string[]
    },
    true
  >[]
}

// Body of unregister public keys request.
export type UnregisterPublicKeysRequest = {
  publicKeys: PublicKeyJson[]
}

export type InvalidateTokensRequest = {
  /**
   * Token IDs to invalidate. If not provided, only expired tokens will be
   * invalidated.
   */
  tokens?: string[]
}

export type TokenJson = {
  id: string
  token: string
  name: string | null
  audience: string[] | null
  role: string | null
  issuedAt: number
  expiresAt: number
}

export type TokenFilter = {
  audience?: string | string[]
  role?: string | string[]
}

export type TokenJsonNoToken = Omit<TokenJson, 'token'>

export type FetchTokensResponse = {
  tokens: TokenJsonNoToken[]
}

export type SearchProfilesResponse = {
  profiles: ResolvedProfile[]
}

export type ResolveProfileResponse = {
  resolved: ResolvedProfile
}

export type CreateTokensRequest = {
  /**
   * If not provided, or if an empty array, a single token will be created.
   */
  tokens?: {
    name?: string
    audience?: string[]
    role?: string
  }[]
}

export type CreateTokensResponse = {
  tokens: TokenJson[]
}

export type FetchAuthenticatedResponse = {
  uuid: string
}

export type Auth = {
  /**
   * Timestamp must be within the last 5 minutes.
   */
  timestamp: number
  type: string
  nonce: number
  chainId: string
  chainFeeDenom: string
  chainBech32Prefix: string
  publicKey: PublicKeyJson
}

export type RequestBody<
  Data extends Record<string, unknown> | undefined = Record<string, any>,
  /**
   * Whether or not the request body requires authentication.
   */
  RequireAuth extends boolean = boolean,
> = {
  data: (RequireAuth extends true
    ? {
        /**
         * Authentication data that must be provided.
         */
        auth: Auth
      }
    : {
        /**
         * Authentication data. Only set if the request is authenticated via:
         * 1. wallet signature.
         * 2. JWT token AND EITHER the public key auth provided matches the
         *    profile of the JWT token.
         *
         * If `auth` is sent in the body when using a JWT token, and it doesn't
         * match the profile, it will be stripped since it is untrusted. This is the
         * same as the `publicKey` field in the authorized request object.
         */
        auth?: Auth
      }) &
    Data
  /**
   * Signature of the `data` field using ADR-036 (see `verifySignature` in
   * `auth.ts`).
   *
   * If not provided, a valid JWT bearer token must be provided via the
   * `Authorization` header for the profile associated with the public key used
   * in the `data.auth` field.
   */
  signature?: string
}

/**
 * Known public key types.
 */
export enum PublicKeyType {
  CosmosSecp256k1 = '/cosmos.crypto.secp256k1.PubKey',
  InjectiveEthSecp256k1 = '/injective.crypto.v1beta1.ethsecp256k1.PubKey',
}

export type PublicKeyJson = {
  /**
   * Type of public key.
   */
  type: string
  /**
   * Public key data hexstring.
   */
  hex: string
}

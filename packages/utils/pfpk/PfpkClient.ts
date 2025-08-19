import { OfflineAminoSigner, makeSignDoc } from '@cosmjs/amino'
import { toHex } from '@cosmjs/encoding'
import { nanoid } from 'nanoid'

import { AnyChain } from '@dao-dao/types'
import {
  CreateTokensRequest,
  CreateTokensResponse,
  FetchProfileResponse,
  FetchTokensResponse,
  ProfileUpdate,
  PublicKeyJson,
  RegisterPublicKeysRequest,
  RequestBody,
  TokenFilter,
  TokenJson,
} from '@dao-dao/types/pfpk'

import {
  getChainForChainId,
  getNativeTokenForChainId,
  getPublicKeyTypeForChain,
} from '../chain'
import { PFPK_API_HOSTNAME } from '../constants/env'
import {
  createTokens,
  fetchAuthenticated,
  fetchNonce,
  fetchProfileUuidViaPublicKey,
  fetchProfileViaPublicKey,
  fetchTokens,
  invalidateTokens,
  registerPublicKeys,
  unregisterPublicKeys,
  updateProfile,
} from './routes'

export type PfpkClientOptions = {
  getOfflineSignerAmino?: (
    chainId: string
  ) => OfflineAminoSigner | Promise<OfflineAminoSigner>
  onProfileUpdated?: (
    preparedSigner: PfpkClientPreparedSigner
  ) => void | Promise<void>
  urlPrefix?: string
  defaultChainId?: string
  defaultSignatureType?: string
  flattenData?: boolean
}

export type PfpkClientPreparedSigner = {
  chain: AnyChain
  signer: OfflineAminoSigner
  address: string
  publicKey: PublicKeyJson
  publicKeyData: Uint8Array
  feeDenom: string
}

export type SignAndSendOptions<
  Data extends Record<string, unknown> | undefined = Record<string, unknown>,
> = {
  chainId?: string
  /**
   * The endpoint to send the request to. Added to `urlPrefix` if set.
   */
  endpoint?: string
  /**
   * The request method. Defaults to POST.
   */
  method?: string
  /**
   * The signature type to use (arbitrary string). Defaults to
   * `defaultSignatureType` if not provided.
   */
  type?: string
  /**
   * The data to sign and send.
   */
  data?: Data
  /**
   * The token to use for authentication. If not provided, will use wallet
   * signature auth instead.
   */
  token?: string
}

// Add extra field to StorageEvent to indicate the PFPK client ID that sent the
// event.
declare global {
  interface StorageEvent {
    /**
     * If the storage event was emitted from a PFPK client, this will be the ID
     * of the client that emitted the event. This is used in clients to avoid
     * performing a redundant reload in the same client. Storage event updates
     * are intended to notify other PFPK clients.
     */
    pfpkClientId?: string
  }
}

const PFPK_ADMIN_ROLE = 'admin'

// TODO(pfpk): use this client as the source of truth for profiles and UUIDs.
// move queries here, auto refresh, etc. so we don't have to call fetchProfile a
// bunch. also useful in KvpkClient and other derivatives since they'll need
// UUID to query stuff.
export class PfpkClient {
  /**
   * The function to get an offline amino signer for a given chain ID. If not
   * defined, only the query methods will be available.
   */
  public readonly getOfflineSignerAmino?: (
    chainId: string
  ) => OfflineAminoSigner | Promise<OfflineAminoSigner>

  /**
   * The callback that executes when the profile is updated. This might be used
   * to refresh query state.
   */
  public onProfileUpdated?: (
    preparedSigner: PfpkClientPreparedSigner
  ) => void | Promise<void>

  /**
   * A unique ID among all PFPK clients.
   *
   * This is used to prevent token storage update events sent from this client
   * from triggering a redundant load in this same client.
   */
  public readonly id: string

  /**
   * The URL prefix to use for all requests.
   */
  public urlPrefix: string | undefined

  /**
   * The default chain ID to use for requests. This can be overridden
   * per-request.
   */
  public defaultChainId: string | undefined

  /**
   * The default signature type to use for requests. This can be overridden
   * per-request.
   */
  public defaultSignatureType: string | undefined

  /**
   * Whether or not to flatten the data when sending requests with token auth
   * instead of key signature auth. Defaults to false.
   */
  public flattenData: boolean

  /**
   * Signer information for each chain.
   */
  private _signers: Record<string, PfpkClientPreparedSigner> = {}

  /**
   * Map of public key hex to tokens.
   */
  private _tokens: Record<string, TokenJson[]> = {}

  /**
   * Map of public key hex to local storage event listeners.
   */
  private _localStorageEventListeners: Record<
    string,
    (event: StorageEvent) => void
  > = {}

  constructor({
    getOfflineSignerAmino,
    onProfileUpdated,
    urlPrefix,
    defaultChainId,
    defaultSignatureType,
    flattenData = false,
  }: PfpkClientOptions = {}) {
    this.id = nanoid()
    this.getOfflineSignerAmino = getOfflineSignerAmino
    this.onProfileUpdated = onProfileUpdated
    this.urlPrefix = urlPrefix
    this.defaultChainId = defaultChainId
    this.defaultSignatureType = defaultSignatureType
    this.flattenData = flattenData
  }

  /**
   * Teardown the client.
   *
   * This removes all local storage event listeners.
   */
  teardown() {
    for (const publicKeyHex in this._localStorageEventListeners) {
      window.removeEventListener(
        'storage',
        this._localStorageEventListeners[publicKeyHex]
      )
    }
  }

  /**
   * Resolve the chain ID to use, falling back to `defaultChainId` if undefined,
   * and throwing if neither are provided.
   */
  protected resolveChainId(
    chainId: string | undefined = this.defaultChainId
  ): string {
    if (!chainId) {
      throw new Error('No chain ID nor default provided')
    }
    return chainId
  }

  /**
   * Prepare a chain for signing. Returns the prepared signer.
   */
  async prepare(chainId?: string): Promise<PfpkClientPreparedSigner> {
    // TODO(pfpk): support manually specifying public keys for queries? other clients (like KvpkClient) may want to expose non-signing query methods.
    if (!this.getOfflineSignerAmino) {
      throw new Error(
        'No offline signer amino function provided. All signing methods are unavailable.'
      )
    }

    const resolvedChainId = this.resolveChainId(chainId)
    const chain = getChainForChainId(resolvedChainId)
    const signer = await this.getOfflineSignerAmino(resolvedChainId)
    const { address, pubkey: publicKeyData } =
      (await signer.getAccounts())[0] ?? {}
    if (!address || !publicKeyData) {
      throw new Error('Failed to get amino signer account')
    }

    this._signers[resolvedChainId] = {
      chain,
      signer,
      address,
      publicKey: {
        type: getPublicKeyTypeForChain(resolvedChainId),
        hex: toHex(publicKeyData),
      },
      publicKeyData,
      feeDenom: getNativeTokenForChainId(resolvedChainId).denomOrAddress,
    }

    // Load tokens into cache.
    await this.loadTokens(resolvedChainId)

    return this._signers[resolvedChainId]
  }

  /**
   * Get prepared chain signer or prepare if not already prepared.
   */
  async getOrPrepare(chainId?: string): Promise<PfpkClientPreparedSigner> {
    const resolvedChainId = this.resolveChainId(chainId)
    if (this._signers[resolvedChainId]) {
      return this._signers[resolvedChainId]
    }
    return this.prepare(resolvedChainId)
  }

  /**
   * Whether or not the chain signer is prepared.
   */
  isPrepared(chainId?: string) {
    const resolvedChainId = this.resolveChainId(chainId)
    return !!this._signers[resolvedChainId]
  }

  /**
   * Get a chain signer, if prepared.
   */
  getSigner(chainId?: string): PfpkClientPreparedSigner | null {
    const resolvedChainId = this.resolveChainId(chainId)
    return this._signers[resolvedChainId]
  }

  /**
   * Get a chain signer. Throws if not prepared.
   */
  mustGetSigner(chainId?: string): PfpkClientPreparedSigner {
    const resolvedChainId = this.resolveChainId(chainId)
    const signer = this.getSigner(resolvedChainId)
    if (!signer) {
      throw new Error(`Chain ${resolvedChainId} not prepared`)
    }
    return signer
  }

  /**
   * Get the address for a given chain signer. Throws if the signer is not
   * prepared.
   */
  getAddress(chainId?: string): string {
    return this.mustGetSigner(chainId).address
  }

  /**
   * Get the public key for a given chain signer. Throws if the signer is not
   * prepared.
   */
  getPublicKey(chainId?: string): PublicKeyJson {
    return this.mustGetSigner(chainId).publicKey
  }

  /**
   * Load the tokens for a given chain and cache them.
   */
  async loadTokens(chainId?: string): Promise<TokenJson[] | null> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    // Return cached tokens if available.
    if (this._tokens[publicKeyHex]) {
      return this._tokens[publicKeyHex]
    }

    // Load tokens from local storage.
    const key = getLocalStorageKey(publicKeyHex)
    const tokens =
      typeof localStorage !== 'undefined' && localStorage.getItem(key)

    // Cache tokens.
    this._tokens[publicKeyHex] = tokens
      ? (JSON.parse(tokens) as TokenJson[])
      : []

    // Validate loaded tokens, removing invalid ones.
    await this._validateTokens(chainId)

    // Add local storage event listener if in a browser and not already added.
    if (
      typeof window !== 'undefined' &&
      !this._localStorageEventListeners[publicKeyHex]
    ) {
      // Add event listener that updates token cache if local storage changes in
      // another PFPK client.
      this._localStorageEventListeners[publicKeyHex] = (event) => {
        // Ignore events from this client to prevent redundant reloads.
        if (event.pfpkClientId === this.id) {
          return
        }

        if (event.key === key) {
          this._tokens[publicKeyHex] = event.newValue
            ? (JSON.parse(event.newValue) as TokenJson[])
            : []
        }
      }
      window.addEventListener(
        'storage',
        this._localStorageEventListeners[publicKeyHex]
      )
    }

    return this._tokens[publicKeyHex]
  }

  /**
   * Validate tokens (optionally filtered), removing them if invalid.
   */
  private async _validateTokens(
    chainId?: string,
    filter: (token: TokenJson) => boolean = () => true
  ) {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    const tokensToVerify = this._tokens[publicKeyHex]?.filter(filter)
    if (!tokensToVerify?.length) {
      return
    }

    const invalidTokenIds: string[] = []

    // Check invalid tokens in batches of 10.
    const batchSize = 10
    for (let i = 0; i < tokensToVerify.length; i += batchSize) {
      const invalidBatch = (
        await Promise.all(
          tokensToVerify
            .slice(i, i + batchSize)
            .map(async (token) =>
              (await this._isTokenInvalid(token)) ? token.id : []
            )
        )
      ).flat()

      if (invalidBatch.length) {
        invalidTokenIds.push(...invalidBatch)
      }
    }

    // Remove invalid tokens, if any.
    if (invalidTokenIds.length) {
      await this._removeTokens({ chainId, tokenIds: invalidTokenIds })
    }
  }

  /**
   * Add tokens for a chain.
   */
  private async _addTokens({
    chainId,
    tokens,
  }: {
    chainId?: string
    tokens: TokenJson[]
  }): Promise<void> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    if (!this._tokens[publicKeyHex]) {
      this._tokens[publicKeyHex] = []
    }
    this._tokens[publicKeyHex].push(...tokens)

    await this.saveTokens(chainId)
  }

  /**
   * Remove tokens for a chain.
   */
  private async _removeTokens({
    chainId,
    tokenIds,
  }: {
    chainId?: string
    tokenIds: string[]
  }): Promise<void> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    this._tokens[publicKeyHex] =
      this._tokens[publicKeyHex]?.filter(
        (token) => !tokenIds.includes(token.id)
      ) ?? []

    await this.saveTokens(chainId)
  }

  /**
   * Save the tokens for a given chain. Throws if there are no tokens to save.
   */
  async saveTokens(chainId?: string): Promise<void> {
    if (typeof localStorage === 'undefined') {
      throw new Error('Local storage is not available')
    }

    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    const tokens = this._tokens[publicKeyHex]
    if (!tokens) {
      throw new Error('No tokens to save')
    }

    const key = getLocalStorageKey(publicKeyHex)
    const newValue = tokens.length ? JSON.stringify(tokens) : null

    if (newValue) {
      localStorage.setItem(key, newValue)
    } else {
      localStorage.removeItem(key)
    }

    // Dispatch storage event if available so that other PFPK clients can
    // refresh their tokens.
    if (typeof window !== 'undefined') {
      const event = new StorageEvent('storage', {
        key,
        newValue,
        storageArea: localStorage,
      })
      // Add our client ID to the event.
      event.pfpkClientId = this.id

      window.dispatchEvent(event)
    }
  }

  /**
   * Get the PFPK admin token for a given chain signer, creating if needed.
   */
  async getAdminToken(chainId?: string): Promise<string> {
    return this.findOrCreateToken({
      chainId,
      audience: PFPK_API_HOSTNAME,
      role: PFPK_ADMIN_ROLE,
    })
  }

  /**
   * Find a non-expired token for a given chain signer and audience, optionally
   * with a specific role as well, validating tokens and preparing the chain if
   * necessary. Returns null if not found.
   */
  async findValidToken({
    chainId,
    ...filter
  }: {
    chainId?: string
    audience: string
    role?: string
  }): Promise<string | null> {
    const alreadyPrepared = this.isPrepared(chainId)

    // Validate desired tokens if already prepared.
    if (alreadyPrepared) {
      await this._validateTokens(chainId, makeTokenFilter(filter))
    }
    // Otherwise, prepare the chain signer, which also validates all tokens.
    else {
      await this.prepare(chainId)
    }

    // Attempt to find an existing token.
    return this.findToken({
      chainId,
      ...filter,
    })
  }

  /**
   * Find a non-expired token for a given chain signer and audience, optionally
   * with a specific role as well, preparing the chain if necessary. Creates a
   * new one with the specified audience and role if not found.
   */
  async findOrCreateToken({
    chainId,
    ...filter
  }: {
    chainId?: string
    audience: string
    role?: string
  }): Promise<string> {
    const validToken = await this.findValidToken({
      chainId,
      ...filter,
    })
    if (validToken) {
      return validToken
    }

    // If no token is found, create a new one and return it.
    const [{ token }] = await this.createTokens({
      chainId,
      tokens: [
        {
          audience: [filter.audience],
          role: filter.role,
        },
      ],
      // If no token is found, create an admin token as well, unless creating a
      // token for the PFPK service already.
      withAdminIfNeeded: filter.audience !== PFPK_API_HOSTNAME,
    })

    return token
  }

  /**
   * Find a non-expired token for a given chain signer, optionally filtered by
   * audience and role. Throws if the signer is not prepared. Returns null if
   * not found.
   */
  findToken({
    chainId,
    ...filter
  }: {
    chainId?: string
  } & TokenFilter): string | null {
    const publicKeyHex = this.getPublicKey(chainId).hex

    // Find non-expired token that matches the filter.
    const token =
      this._tokens[publicKeyHex]?.find(
        (token) => doesTokenMatchFilter(token, filter) && !isTokenExpired(token)
      )?.token || null

    return token
  }

  /**
   * Create a new JWT token or tokens for the user via token auth or wallet
   * signature auth if necessary. By default creates a single token.
   */
  async createTokens({
    chainId,
    tokens,
    withAdminIfNeeded = false,
  }: {
    chainId?: string
    tokens: Required<CreateTokensRequest>['tokens']
    /**
     * If no PFPK admin token exists, also create one.
     */
    withAdminIfNeeded?: boolean
  }): Promise<CreateTokensResponse['tokens']> {
    let requestBody: RequestBody<CreateTokensRequest>
    let token: string | undefined

    // Check if we need to create an admin token.
    if (withAdminIfNeeded) {
      const adminToken = await this.findValidToken({
        chainId,
        audience: PFPK_API_HOSTNAME,
        role: PFPK_ADMIN_ROLE,
      })
      // If no admin token exists, add it to the end of the tokens array so it
      // gets created and saved.
      if (!adminToken) {
        tokens = [
          ...tokens,
          {
            audience: [PFPK_API_HOSTNAME],
            role: PFPK_ADMIN_ROLE,
          },
        ]
      }
    }

    // If tokens includes PFPK service itself, use key signature auth.
    // Otherwise, use token auth.
    if (tokens.some((token) => token.audience?.includes(PFPK_API_HOSTNAME))) {
      // Use key signature auth.
      requestBody = await this.signRequestBody({
        chainId,
        type: 'DAO DAO Profile | Login',
        data: { tokens },
      })
    } else {
      requestBody = {
        data: { tokens },
      }

      // Use token auth.
      token = await this.getAdminToken(chainId)
    }

    const { response, body, error } = await createTokens(requestBody, token)
    if (response.status !== 200) {
      throw new Error(`Failed to create tokens: ${response.status} ${error}`)
    }

    // Save tokens.
    await this._addTokens({ chainId, tokens: body.tokens })

    // Call `onProfileUpdated` callback if defined, in case the profile was just
    // created and empty profiles should be refreshed throughout the UI.
    await this.onProfileUpdated?.(await this.getOrPrepare(chainId))

    return body.tokens
  }

  /**
   * Fetch whether or not the user is authenticated.
   */
  async fetchAuthenticated(chainId?: string): Promise<boolean> {
    const adminToken = await this.getAdminToken(chainId)
    const { response } = await fetchAuthenticated(adminToken)
    return response.status === 200
  }

  /**
   * Check whether or not a token is invalid.
   */
  private async _isTokenInvalid(token: TokenJson): Promise<boolean> {
    if (isTokenExpired(token)) {
      return true
    }

    const { response, error } = await fetchAuthenticated(token.token)
    const invalid =
      response.status === 401 &&
      (!error ||
        error.includes('Token invalidated') ||
        error.includes('Token expired') ||
        error.includes('Invalid token'))

    return invalid
  }

  /**
   * Fetch the nonce for the public key of the chain signer.
   */
  async fetchNonce(chainId?: string): Promise<number> {
    const resolvedChainId = this.resolveChainId(chainId)
    const publicKeyHex = (await this.getOrPrepare(resolvedChainId)).publicKey
      .hex
    const {
      response,
      body: { nonce },
      error,
    } = await fetchNonce(
      getPublicKeyTypeForChain(resolvedChainId),
      publicKeyHex
    )
    if (response.status !== 200) {
      throw new Error(`Failed to fetch nonce: ${response.status} ${error}`)
    }

    return nonce
  }

  /**
   * Fetch the user's profile via public key (no authentication required).
   */
  async fetchProfile(chainId?: string): Promise<FetchProfileResponse> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex
    const { response, body, error } =
      await fetchProfileViaPublicKey(publicKeyHex)
    if (response.status !== 200) {
      throw new Error(`Failed to fetch profile: ${response.status} ${error}`)
    }
    return body
  }

  /**
   * Fetch the user's profile UUID via public key (no authentication required).
   */
  async fetchProfileUuid(chainId?: string): Promise<string> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex
    const { response, body, error } =
      await fetchProfileUuidViaPublicKey(publicKeyHex)
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch profile UUID: ${response.status} ${error}`
      )
    }
    return body.uuid
  }

  /**
   * Fetch the tokens created during authentications.
   */
  async fetchTokens(chainId?: string): Promise<FetchTokensResponse['tokens']> {
    const adminToken = await this.getAdminToken(chainId)
    const {
      response,
      body: { tokens },
      error,
    } = await fetchTokens(adminToken)
    if (response.status !== 200) {
      throw new Error(`Failed to fetch tokens: ${response.status} ${error}`)
    }

    return tokens
  }

  /**
   * Invalidate tokens for the user.
   */
  async invalidateTokens({
    chainId,
    tokenIds,
  }: {
    chainId?: string
    tokenIds: string[]
  }): Promise<void> {
    const adminToken = await this.getAdminToken(chainId)
    const { response, error } = await invalidateTokens(
      {
        data: {
          tokens: tokenIds,
        },
      },
      adminToken
    )
    if (response.status !== 204) {
      throw new Error(
        `Failed to invalidate tokens: ${response.status} ${error}`
      )
    }

    await this._removeTokens({ chainId, tokenIds })
  }

  /**
   * Register public keys to the user's profile.
   */
  async registerPublicKeys({
    chainId,
    chainIds,
    onAllowanceBeginGenerating,
    onAllowanceGenerated,
    onAllAllowancesGenerated,
  }: {
    chainId?: string
    /**
     * List of chains to register public keys for.
     */
    chainIds: string[]
    /**
     * Callback handler for when an individual allowance begins generating.
     */
    onAllowanceBeginGenerating?: (chainId: string) => void
    /**
     * Callback handler for when an individual allowance is generated.
     */
    onAllowanceGenerated?: (chainId: string) => void
    /**
     * Callback handler for when all allowances are generated.
     */
    onAllAllowancesGenerated?: () => void
  }): Promise<void> {
    const preparedSigner = await this.getOrPrepare(chainId)
    const adminToken = await this.getAdminToken(chainId)

    let profile = await this.fetchProfile(chainId)
    // If profile doesn't exist yet, create it. This should never happen since
    // we created a profile when the admin token was created.
    if (!profile.uuid) {
      await this.updateProfile({ chainId })
      profile = await this.fetchProfile(chainId)
      if (!profile.uuid) {
        throw new Error('Failed to create profile')
      }
    }

    const existingPublicKeys = Object.values(profile.chains).map(
      (chain) => chain.publicKey.hex
    )

    const publicKeys: RegisterPublicKeysRequest['publicKeys'] = []
    for (const registeringChainId of chainIds) {
      onAllowanceBeginGenerating?.(registeringChainId)

      const publicKeyHex = (await this.getOrPrepare(registeringChainId))
        .publicKey.hex

      const allowance = await this.signRequestBody({
        chainId: registeringChainId,
        type: 'DAO DAO Profile | Add Chain Allowance',
        data: {
          allow: { uuid: profile.uuid },
          chainIds: [registeringChainId],
        },
        // No signature required if we're registering a new chain for a public
        // key already attached to the profile.
        noSign: existingPublicKeys.includes(publicKeyHex),
      })

      publicKeys.push(allowance)
      onAllowanceGenerated?.(registeringChainId)
    }

    onAllAllowancesGenerated?.()

    const { response, error } = await registerPublicKeys(
      {
        data: {
          publicKeys,
        },
      },
      adminToken
    )
    if (response.status !== 204) {
      throw new Error(
        `Failed to register public keys: ${response.status} ${error}`
      )
    }

    // Call `onProfileUpdated` callback if defined.
    await this.onProfileUpdated?.(preparedSigner)
  }

  /**
   * Unregister public keys from the user's profile.
   */
  async unregisterPublicKeys({
    chainId,
    publicKeys,
  }: {
    chainId?: string
    publicKeys: PublicKeyJson[]
  }): Promise<void> {
    const preparedSigner = await this.getOrPrepare(chainId)
    const adminToken = await this.getAdminToken(chainId)
    const { response, error } = await unregisterPublicKeys(
      {
        data: {
          publicKeys,
        },
      },
      adminToken
    )
    if (response.status !== 204) {
      throw new Error(
        `Failed to unregister public keys: ${response.status} ${error}`
      )
    }

    // Call `onProfileUpdated` callback if defined.
    await this.onProfileUpdated?.(preparedSigner)
  }

  /**
   * Update the profile for the user.
   */
  async updateProfile({
    chainId,
    profile = {},
  }: {
    chainId?: string
    profile?: Omit<ProfileUpdate, 'nonce'>
  } = {}): Promise<void> {
    const preparedSigner = await this.getOrPrepare(chainId)
    const adminToken = await this.getAdminToken(chainId)
    const { response, error } = await updateProfile(
      {
        data: {
          profile,
        },
      },
      adminToken
    )
    if (response.status !== 204) {
      throw new Error(`Failed to update profile: ${response.status} ${error}`)
    }

    // Call `onProfileUpdated` callback if defined.
    await this.onProfileUpdated?.(preparedSigner)
  }

  /**
   * Sign a request body.
   */
  async signRequestBody<
    Data extends Record<string, unknown> | undefined = Record<string, any>,
  >({
    chainId,
    type,
    data,
    nonce,
    noSign = false,
  }: {
    chainId?: string
    /**
     * Signature type to use.
     */
    type: string
    /**
     * Data to sign.
     */
    data: Data
    /**
     * Nonce to use for the request. Defaults to the latest nonce.
     */
    nonce?: number
    /**
     * Don't sign the request body, just return the data. This is useful for
     * generating the expected request body but using JWT token auth.
     */
    noSign?: boolean
  }): Promise<RequestBody<Data, true>> {
    const resolvedChainId = this.resolveChainId(chainId)
    const {
      signer,
      address,
      publicKey,
      feeDenom,
      chain: { bech32Prefix },
    } = await this.getOrPrepare(resolvedChainId)

    nonce ??= await this.fetchNonce(resolvedChainId)

    const dataWithAuth: RequestBody<Data, true>['data'] = {
      ...data,
      auth: {
        type,
        nonce,
        chainId: resolvedChainId,
        chainFeeDenom: feeDenom,
        chainBech32Prefix: bech32Prefix,
        publicKey,
        timestamp: Date.now(),
      },
    }

    // Generate data to sign.
    const signDocAmino = makeSignDoc(
      [
        {
          type: dataWithAuth.auth.type,
          value: {
            signer: address,
            data: JSON.stringify(dataWithAuth, undefined, 2),
          },
        },
      ],
      {
        gas: '0',
        amount: [
          {
            denom: dataWithAuth.auth.chainFeeDenom,
            amount: '0',
          },
        ],
      },
      resolvedChainId,
      '',
      0,
      0
    )

    const signature = noSign
      ? undefined
      : (await signer.signAmino(address, signDocAmino)).signature.signature

    return {
      data: dataWithAuth,
      signature,
    }
  }

  /**
   * Sign and send a request to a URL. Returns the parsed response body, or
   * undefined if the response is 204 no content. Throws if the response is not
   * OK.
   */
  async signAndSend<
    Response = unknown,
    Data extends Record<string, unknown> | undefined = Record<string, unknown>,
  >(
    /**
     * The options to use for the request, overriding the defaults.
     */
    options?: SignAndSendOptions<Data>
  ): Promise<Response>
  async signAndSend<
    Response = unknown,
    Data extends Record<string, unknown> | undefined = Record<string, unknown>,
  >(
    /**
     * The endpoint to send the request to. Added to `urlPrefix` if set.
     */
    endpoint: string,
    /**
     * The data to send with the request, if any (not allowed for GET requests).
     */
    data?: Data,
    /**
     * The options to use for the request, overriding the defaults.
     */
    options?: Omit<SignAndSendOptions<Data>, 'endpoint' | 'data'>
  ): Promise<Response>
  async signAndSend<
    Response = unknown,
    Data extends Record<string, unknown> | undefined = Record<string, unknown>,
  >(
    _endpointOrOptions?: string | SignAndSendOptions<Data>,
    _data?: Data,
    _options?: Omit<SignAndSendOptions<Data>, 'endpoint' | 'data'>
  ): Promise<Response> {
    const isFirstFunction =
      _endpointOrOptions === undefined ||
      (typeof _endpointOrOptions === 'object' && _endpointOrOptions !== null)

    const options: SignAndSendOptions<Data> = isFirstFunction
      ? _endpointOrOptions || {}
      : {
          endpoint: _endpointOrOptions,
          data: _data,
          ..._options,
        }

    let {
      chainId,
      endpoint,
      method = 'POST',
      type = this.defaultSignatureType,
      data,
      token,
    } = options || {}

    if (!type) {
      throw new Error('No signature type nor default provided')
    }

    endpoint = (this.urlPrefix || '') + (endpoint || '')
    if (!endpoint) {
      throw new Error('No endpoint nor default provided')
    }

    // If a token is provided, use data as-is. Otherwise, sign the request body.
    const body = token
      ? this.flattenData
        ? data
        : { data }
      : await this.signRequestBody({
          chainId,
          type,
          data,
        })

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })

    // If response not OK, throw error.
    if (!response.ok) {
      const responseBody = await response.json().catch((err) => ({
        error: err instanceof Error ? err.message : JSON.stringify(err),
      }))
      throw new Error(
        responseBody && 'error' in responseBody && responseBody.error
          ? responseBody.error
          : `Unexpected error: ${responseBody}`
      )
    }

    // If response OK, return response body (unless 204 no content, in which
    // case return undefined).
    return response.status === 204
      ? (undefined as Response)
      : ((await response.json()) as Response)
  }
}

/**
 * Whether or not a token has at least 5 minutes left before expiration.
 *
 * @param token - The token to check.
 * @returns Whether or not the token has at least 5 minutes left before
 * expiration.
 */
const isTokenExpired = (token: TokenJson) =>
  token.expiresAt <= Date.now() / 1000 + 5 * 60

/**
 * Whether or not a token matches a given audience and role.
 *
 * @param token - The token to check.
 * @param filter - The filter to check against.
 * @returns Whether or not the token matches the filter.
 */
const doesTokenMatchFilter = (
  token: TokenJson,
  { audience, role }: TokenFilter
) => {
  const allowedAudiences = audience?.length ? [audience].flat() : undefined
  const allowedRoles = role?.length ? [role].flat() : undefined
  return (
    (!allowedAudiences ||
      allowedAudiences.some((audience) =>
        token.audience?.includes(audience)
      )) &&
    (!allowedRoles || allowedRoles.some((role) => token.role === role))
  )
}

/**
 * Make a filter that returns whether or not a token matches a given audience
 * and role.
 */
const makeTokenFilter = (filter: TokenFilter) => (token: TokenJson) =>
  doesTokenMatchFilter(token, filter)

/**
 * Get the local storage key for a given public key hex.
 */
const getLocalStorageKey = (publicKeyHex: string) =>
  `pfpkTokens:${publicKeyHex}`

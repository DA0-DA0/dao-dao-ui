import { OfflineAminoSigner, makeSignDoc } from '@cosmjs/amino'
import { toHex } from '@cosmjs/encoding'
import { QueryClient } from '@tanstack/react-query'

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
  TokenJson,
} from '@dao-dao/types/pfpk'
import {
  PFPK_API_HOSTNAME,
  getChainForChainId,
  getNativeTokenForChainId,
  getPublicKeyTypeForChain,
} from '@dao-dao/utils'

import { profileQueries } from '../../query'
import {
  createTokens,
  fetchAuthenticated,
  fetchNonce,
  fetchProfileViaPublicKey,
  fetchTokens,
  invalidateTokens,
  registerPublicKeys,
  unregisterPublicKeys,
  updateProfile,
} from './routes'

export type PfpkClientChain = {
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

export class PfpkClient {
  public readonly queryClient: QueryClient
  public readonly getOfflineSignerAmino: (
    chainId: string
  ) => OfflineAminoSigner | Promise<OfflineAminoSigner>

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
   * Signer information for each chain.
   */
  private _chains: Record<string, PfpkClientChain> = {}

  /**
   * Map of public key hex to tokens.
   */
  private _tokens: Record<string, TokenJson[]> = {}

  constructor({
    queryClient,
    getOfflineSignerAmino,
    urlPrefix,
    defaultChainId,
    defaultSignatureType,
  }: {
    queryClient: QueryClient
    getOfflineSignerAmino: (
      chainId: string
    ) => OfflineAminoSigner | Promise<OfflineAminoSigner>
    urlPrefix?: string
    defaultChainId?: string
    defaultSignatureType?: string
  }) {
    this.queryClient = queryClient
    this.getOfflineSignerAmino = getOfflineSignerAmino
    this.urlPrefix = urlPrefix
    this.defaultChainId = defaultChainId
    this.defaultSignatureType = defaultSignatureType
  }

  /**
   * Resolve the chain ID to use, falling back to `defaultChainId` if undefined,
   * and throwing if neither are provided.
   */
  private resolveChainId(
    chainId: string | undefined = this.defaultChainId
  ): string {
    if (!chainId) {
      throw new Error('No chain ID nor default provided')
    }
    return chainId
  }

  /**
   * Prepare a chain for signing. Returns the prepared chain.
   */
  async prepare(chainId?: string): Promise<PfpkClientChain> {
    const resolvedChainId = this.resolveChainId(chainId)
    const chain = getChainForChainId(resolvedChainId)
    const signer = await this.getOfflineSignerAmino(resolvedChainId)
    const { address, pubkey: publicKeyData } =
      (await signer.getAccounts())[0] ?? {}
    if (!address || !publicKeyData) {
      throw new Error('Failed to get amino signer account')
    }

    this._chains[resolvedChainId] = {
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

    return this._chains[resolvedChainId]
  }

  /**
   * Get prepared chain or prepare it if not already prepared.
   */
  async getOrPrepare(chainId?: string): Promise<PfpkClientChain> {
    const resolvedChainId = this.resolveChainId(chainId)
    if (this._chains[resolvedChainId]) {
      return this._chains[resolvedChainId]
    }
    return this.prepare(resolvedChainId)
  }

  /**
   * Whether or not the chain is prepared.
   */
  isPrepared(chainId?: string) {
    const resolvedChainId = this.resolveChainId(chainId)
    return !!this._chains[resolvedChainId]
  }

  /**
   * Get the chain for a given chain ID, if prepared.
   */
  getChain(chainId?: string): PfpkClientChain | null {
    const resolvedChainId = this.resolveChainId(chainId)
    return this._chains[resolvedChainId]
  }

  /**
   * Get the chain for a given chain ID. Throws if the chain is not prepared.
   */
  mustGetChain(chainId?: string): PfpkClientChain {
    const resolvedChainId = this.resolveChainId(chainId)
    const chain = this.getChain(resolvedChainId)
    if (!chain) {
      throw new Error(`Chain ${resolvedChainId} not prepared`)
    }
    return chain
  }

  /**
   * Get the signer for a given chain ID. Throws if the chain is not prepared.
   */
  getSigner(chainId?: string): OfflineAminoSigner {
    return this.mustGetChain(chainId).signer
  }

  /**
   * Get the address for a given chain ID. Throws if the chain is not prepared.
   */
  getAddress(chainId?: string): string {
    return this.mustGetChain(chainId).address
  }

  /**
   * Get the public key for a given chain ID. Throws if the chain is not
   * prepared.
   */
  getPublicKey(chainId?: string): PublicKeyJson {
    return this.mustGetChain(chainId).publicKey
  }

  /**
   * Get the PFPK admin token for a given chain, or null if not found. Use
   * `ensureAdminToken` to guarantee the PFPK admin token exists.
   */
  getAdminToken(chainId?: string): string | null {
    const publicKeyHex = this.getChain(chainId)?.publicKey.hex ?? null
    if (!publicKeyHex) {
      return null
    }

    // Find PFPK admin token with at least 5 minutes left before expiration.
    const token =
      this._tokens[publicKeyHex]?.find(
        (token) =>
          token.audience?.includes(PFPK_API_HOSTNAME) &&
          token.role === 'admin' &&
          !isTokenExpired(token)
      )?.token || null

    return token
  }

  /**
   * Load the tokens for a given chain and cache them.
   */
  async loadTokens(chainId?: string): Promise<TokenJson[] | null> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex

    if (this._tokens[publicKeyHex]) {
      return this._tokens[publicKeyHex]
    }

    const tokens =
      typeof localStorage !== 'undefined' &&
      localStorage.getItem(`pfpkTokens:${publicKeyHex}`)

    this._tokens[publicKeyHex] = tokens
      ? (JSON.parse(tokens) as TokenJson[])
      : []

    // Validate loaded tokens.
    await this.validateTokens(chainId)

    return this._tokens[publicKeyHex]
  }

  /**
   * Validate tokens (optionally filtered), removing them if invalid.
   */
  async validateTokens(
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
      await this.removeTokens({ chainId, tokenIds: invalidTokenIds })
    }
  }

  /**
   * Add tokens for a chain.
   */
  async addTokens({
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
  async removeTokens({
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

    localStorage.setItem(`pfpkTokens:${publicKeyHex}`, JSON.stringify(tokens))
  }

  /**
   * Ensure the PFPK admin token exists.
   */
  async ensureAdminToken(chainId?: string): Promise<string> {
    const alreadyPrepared = this.isPrepared(chainId)

    // Validate admin tokens if already prepared.
    if (alreadyPrepared) {
      await this.validateTokens(
        chainId,
        (token) =>
          !!token.audience?.includes(PFPK_API_HOSTNAME) &&
          token.role === 'admin'
      )
    }
    // Otherwise, prepare the chain, which also validates all loaded tokens.
    else {
      await this.prepare(chainId)
    }

    const existingAdminToken = this.getAdminToken(chainId)
    if (existingAdminToken) {
      return existingAdminToken
    }

    const [{ token }] = await this.createTokens({
      chainId,
      tokens: [
        {
          audience: [PFPK_API_HOSTNAME],
          role: 'admin',
        },
      ],
    })

    return token
  }

  /**
   * Refresh query state for a chain.
   */
  async refreshQueryState(chainId?: string) {
    const resolvedChainId = this.resolveChainId(chainId)
    await this.queryClient.refetchQueries(
      profileQueries.pfpk({
        address: this.getAddress(resolvedChainId),
      })
    )
    await this.queryClient.refetchQueries(
      profileQueries.unified(this.queryClient, {
        chainId: resolvedChainId,
        address: this.getAddress(resolvedChainId),
      })
    )
  }

  /**
   * Create a new JWT token or tokens for the user via token auth or wallet
   * signature auth if necessary. By default creates a single token.
   */
  async createTokens({
    chainId,
    tokens,
  }: {
    chainId?: string
    tokens: Required<CreateTokensRequest>['tokens']
  }): Promise<CreateTokensResponse['tokens']> {
    let requestBody: RequestBody<CreateTokensRequest>
    let token: string | undefined

    // If tokens includes PFPK service itself, use wallet signature auth.
    // Otherwise, use token auth.
    if (tokens.some((token) => token.audience?.includes(PFPK_API_HOSTNAME))) {
      // Use wallet signature auth.
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
      token = await this.ensureAdminToken(chainId)
    }

    const { response, body, error } = await createTokens(requestBody, token)
    if (response.status !== 200) {
      throw new Error(`Failed to create tokens: ${response.status} ${error}`)
    }

    // Save tokens.
    await this.addTokens({ chainId, tokens: body.tokens })

    return body.tokens
  }

  /**
   * Fetch whether or not the user is authenticated.
   */
  async fetchAuthenticated(chainId?: string): Promise<boolean> {
    const adminToken = await this.ensureAdminToken(chainId)
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
   * Fetch the nonce for the user.
   */
  async fetchNonce(chainId?: string): Promise<number> {
    const publicKeyHex = (await this.getOrPrepare(chainId)).publicKey.hex
    const {
      response,
      body: { nonce },
      error,
    } = await fetchNonce(publicKeyHex)
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
   * Fetch the tokens created during authentications.
   */
  async fetchTokens(chainId?: string): Promise<FetchTokensResponse['tokens']> {
    const adminToken = await this.ensureAdminToken(chainId)
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
    const adminToken = await this.ensureAdminToken(chainId)
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

    await this.removeTokens({ chainId, tokenIds })
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
    const adminToken = await this.ensureAdminToken(chainId)

    let profile = await this.fetchProfile(chainId)
    if (!profile.uuid) {
      // If profile doesn't exist yet, create it.
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
        chainId,
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

    // Refresh query state.
    await this.refreshQueryState(chainId)
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
    const adminToken = await this.ensureAdminToken(chainId)
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

    // Refresh query state.
    await this.refreshQueryState(chainId)
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
    const adminToken = await this.ensureAdminToken(chainId)
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

    // Refresh query state.
    await this.refreshQueryState(chainId)
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
    } = options || {}

    if (!type) {
      throw new Error('No signature type nor default provided')
    }

    endpoint = (this.urlPrefix || '') + (endpoint || '')
    if (!endpoint) {
      throw new Error('No endpoint nor default provided')
    }

    const body = await this.signRequestBody({
      chainId,
      type,
      data,
    })

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
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

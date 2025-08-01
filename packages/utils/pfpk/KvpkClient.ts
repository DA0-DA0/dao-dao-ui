import { KVPK_API_BASE } from '../constants'
import { PfpkClient, PfpkClientOptions } from './PfpkClient'

export type KvpkClientOptions = Omit<PfpkClientOptions, 'onProfileUpdated'> & {
  /**
   * Optionally provide a prefix for all keys.
   */
  keyPrefix?: string
}

export class KvpkClient extends PfpkClient {
  /**
   * The prefix for all keys, if any.
   */
  public keyPrefix: string | undefined

  // URL prefix is guaranteed to be set.
  declare urlPrefix: string

  constructor({
    keyPrefix,

    // Defaults specific to KVPK.
    urlPrefix = KVPK_API_BASE,
    defaultSignatureType = 'KVPK',
    ...options
  }: KvpkClientOptions = {}) {
    super({
      ...options,
      urlPrefix,
      defaultSignatureType,
    })

    this.keyPrefix = keyPrefix
  }

  /**
   * Get the full key for a given key.
   */
  private getKey(key: string) {
    return (this.keyPrefix ?? '') + key
  }

  /**
   * Set a key-value pair. Returns the key that was set, which may be useful if
   * a key prefix is set.
   */
  async set({
    chainId,
    key,
    value,
  }: {
    chainId?: string
    key: string
    value: any
  }): Promise<string> {
    const fullKey = this.getKey(key)
    await this.signAndSend({
      endpoint: '/set',
      data: {
        key,
        value,
      },
      chainId,
      token: await this.getKvpkAdminToken(chainId),
    })
    return fullKey
  }

  /**
   * Delete a key-value pair. Returns the key that was deleted, which may be
   * useful if a key prefix is set.
   */
  async delete({
    chainId,
    key,
  }: {
    chainId?: string
    key: string
  }): Promise<string> {
    const fullKey = this.getKey(key)
    await this.set({
      chainId,
      key: fullKey,
      value: null,
    })
    return fullKey
  }

  /**
   * Fetch a key-value pair for a given public key.
   */
  async get({ publicKey, key }: { publicKey: string; key: string }): Promise<{
    key: string
    value: any | null
  }> {
    const response = await fetch(
      this.urlPrefix + `/get/${publicKey}/${this.getKey(key)}`
    )

    if (!response.ok) {
      throw new Error(
        `[KVPK] Failed to fetch value for key ${this.getKey(key)} and public key ${publicKey}: code=${response.status} message=${response.statusText} data=${await response.text().catch(() => '<error>')}`
      )
    }

    return response.json()
  }

  /**
   * Fetch a key-value pair for a given public key.
   */
  async list({
    publicKey,
    prefix = '',
  }: {
    publicKey: string
    /**
     * The prefix to list keys for. Defaults to the empty string, which may be
     * useful if a global key prefix is already set.
     */
    prefix?: string
  }): Promise<{
    items: {
      key: string
      value: any | null
    }[]
  }> {
    const response = await fetch(
      this.urlPrefix + `/list/${publicKey}/${this.getKey(prefix)}`
    )

    if (!response.ok) {
      throw new Error(
        `[KVPK] Failed to fetch list for prefix ${this.getKey(prefix)} and public key ${publicKey}: code=${response.status} message=${response.statusText} data=${await response.text().catch(() => '<error>')}`
      )
    }

    return response.json()
  }

  /**
   * Get the KVPK admin token for a given chain signer, creating if needed.
   */
  async getKvpkAdminToken(chainId?: string): Promise<string> {
    return this.findOrCreateToken({
      chainId,
      audience: this.urlPrefix,
      role: 'admin',
    })
  }
}

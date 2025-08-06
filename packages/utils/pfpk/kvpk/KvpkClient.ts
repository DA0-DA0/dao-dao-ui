import { QueryClient, queryOptions } from '@tanstack/react-query'

import { IQueryClient } from '@dao-dao/types'

import { KVPK_API_HOSTNAME } from '../../constants'
import { PfpkClient, PfpkClientOptions } from '../PfpkClient'

export type KvpkClientOptions = Omit<
  PfpkClientOptions,
  'onProfileUpdated' | 'flattenData'
> & {
  /**
   * The query client to use for the KVPK client.
   */
  queryClient: IQueryClient
  /**
   * The hostname of the KVPK server, to use for the token audience.
   *
   * Defaults to KVPK_API_HOSTNAME constant.
   */
  hostname?: string
  /**
   * Optionally provide a prefix for all keys.
   */
  keyPrefix?: string
}

export class KvpkClient extends PfpkClient {
  /**
   * The query client.
   */
  public queryClient: IQueryClient

  /**
   * The hostname of the KVPK service.
   */
  public hostname: string

  /**
   * The prefix for all keys, if any.
   */
  public keyPrefix: string | undefined

  constructor({
    // KvpkClient options.
    queryClient,
    hostname = KVPK_API_HOSTNAME,
    keyPrefix,

    // PfpkClient options.
    defaultSignatureType = 'KVPK',
    ...options
  }: KvpkClientOptions) {
    super({
      ...options,
      urlPrefix: `https://${hostname}`,
      defaultSignatureType,
      // Do not wrap request bodies in data object since we use token auth
      // exclusively.
      flattenData: true,
    })

    // Use dependency tracker if available, since it can invalidate/refetch
    // better.
    this.queryClient =
      'dependencyTracker' in queryClient && queryClient.dependencyTracker
        ? (queryClient as QueryClient).dependencyTracker!
        : queryClient
    this.hostname = hostname
    this.keyPrefix = keyPrefix
  }

  /**
   * Get the full key for a given key.
   */
  protected getKey(key: string) {
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
        key: fullKey,
        value,
      },
      chainId,
      token: await this.getKvpkAdminToken(chainId),
    })

    // Invalidate list queries for the current UUID and key prefix.
    const uuid = await this.fetchProfileUuid(chainId)
    await this.queryClient.invalidateQueries(this.listQuery({ uuid }))

    return fullKey
  }

  /**
   * Delete a key-value pair. Returns the key that was deleted, which may be
   * useful if a key prefix is set.
   */
  delete({ chainId, key }: { chainId?: string; key: string }): Promise<string> {
    return this.set({
      chainId,
      key,
      value: null,
    })
  }

  /**
   * Fetch a key-value pair for a given UUID.
   */
  async get({ uuid, key }: { uuid: string; key: string }): Promise<{
    key: string
    value: any | null
  }> {
    const fullKey = this.getKey(key)

    const response = await fetch(this.urlPrefix + `/get/${uuid}/${fullKey}`)
    if (!response.ok) {
      throw new Error(
        `[KVPK] Failed to fetch value for key ${fullKey} and UUID ${uuid}: code=${response.status} message=${response.statusText} data=${await response.text().catch(() => '<error>')}`
      )
    }

    return response.json()
  }

  /**
   * Fetch a key-value pair for a given UUID.
   */
  async list({
    uuid,
    prefix = '',
  }: {
    uuid: string
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
    const fullKey = this.getKey(prefix)

    const response = await fetch(this.urlPrefix + `/list/${uuid}/${fullKey}`)
    if (!response.ok) {
      throw new Error(
        `[KVPK] Failed to fetch list for prefix ${fullKey} and UUID ${uuid}: code=${response.status} message=${response.statusText} data=${await response.text().catch(() => '<error>')}`
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
      audience: this.hostname,
      role: 'admin',
    })
  }

  /**
   * A query to list all keys with a prefix, stripping the prefix from the key.
   */
  listQuery(options: { uuid: string; prefix?: string }) {
    const fullPrefix = this.getKey(options.prefix ?? '')
    return queryOptions({
      queryKey: ['kvpk', 'list', { ...options, fullPrefix }],
      queryFn: () =>
        options.uuid
          ? this.list(options).then(({ items }) =>
              fullPrefix.length
                ? items.map(({ key, value }) => ({
                    key: key.slice(fullPrefix.length),
                    value,
                  }))
                : items
            )
          : [],
    })
  }
}

import { QueryClient, queryOptions } from '@tanstack/react-query'

import { IndexerFormulaType } from '@dao-dao/types'

import {
  QueryIndexerOptions,
  QuerySnapperOptions,
  SearchDaosOptions,
  queryIndexer,
  queryIndexerUpStatus,
  querySnapper,
  searchDaos,
} from '../../indexer'

/**
 * Check whether or not the indexer is caught up.
 */
export const isIndexerCaughtUp = async ({
  chainId,
}: {
  chainId: string
}): Promise<boolean> => (await queryIndexerUpStatus({ chainId })).caughtUp

export type FetchIndexerQueryOptions = QueryIndexerOptions & {
  /**
   * If there is no fallback query available, this will still query even if
   * indexer is behind. Defaults to false.
   */
  noFallback?: boolean
  /**
   * If true, throw indexer behind error on server. Defaults to false.
   */
  throwOnServer?: boolean
}

export class IndexerBehindError extends Error {
  constructor() {
    super('Indexer is behind')
    this.name = 'IndexerBehindError'
  }
}

/**
 * Fetch indexer query, unless the indexer is behind and there is a fallback, in
 * which case it errors.
 */
export const fetchIndexerQuery = async <T = any>(
  queryClient: QueryClient,
  { noFallback, throwOnServer = false, ...options }: FetchIndexerQueryOptions
): Promise<T> => {
  // If the indexer is behind and either there's a fallback or we're on the
  // server, return null to make the caller use the fallback. Throw error if no
  // fallback and on client.
  if (!noFallback) {
    const isCaughtUp = await queryClient.fetchQuery(
      indexerQueries.isCaughtUp({ chainId: options.chainId })
    )

    if (!isCaughtUp && (throwOnServer || typeof window !== 'undefined')) {
      throw new IndexerBehindError()
    }
  }

  // Replace undefined responses with null since react-query and static props
  // can't serialize undefined. Rely on caller knowing that this may return
  // null to type it correctly.
  return (await queryIndexer<T>(options)) ?? (null as T)
}

export const indexerQueries = {
  /**
   * Check whether or not the indexer is caught up.
   */
  isCaughtUp: (options: Parameters<typeof isIndexerCaughtUp>[0]) =>
    queryOptions({
      queryKey: ['indexer', 'isCaughtUp', options],
      queryFn: () => isIndexerCaughtUp(options),
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  query: <T = any>(options: FetchIndexerQueryOptions) =>
    queryOptions({
      queryKey: ['indexer', 'query', options],
      queryFn: (ctx) => fetchIndexerQuery<T>(ctx.client, options),
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryAccount: <T = any>({
    address,
    ...options
  }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
    address: string
  }) =>
    indexerQueries.query<T>({
      ...options,
      type: IndexerFormulaType.Account,
      address,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryContract: <T = any>({
    contractAddress: address,
    ...options
  }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
    contractAddress: string
  }) =>
    indexerQueries.query<T>({
      ...options,
      type: IndexerFormulaType.Contract,
      address,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryGeneric: <T = any>(
    options: Omit<FetchIndexerQueryOptions, 'type' | 'address'>
  ) =>
    indexerQueries.query<T>({
      ...options,
      type: IndexerFormulaType.Generic,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryValidator: <T = any>({
    validatorOperatorAddress: address,
    ...options
  }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
    validatorOperatorAddress: string
  }) =>
    indexerQueries.query<T>({
      ...options,
      type: IndexerFormulaType.Validator,
      address,
    }),
  /**
   * Fetch query from Snapper.
   */
  snapper: <T = any>(options: QuerySnapperOptions) =>
    queryOptions({
      queryKey: ['indexer', 'snapper', options],
      // Replace undefined responses with null since react-query and static
      // props can't serialize undefined.
      queryFn: async () => (await querySnapper<T>(options)) ?? null,
    }),
  /**
   * Search DAOs.
   */
  searchDaos: (options: SearchDaosOptions) =>
    queryOptions({
      queryKey: ['indexer', 'searchDaos', options],
      queryFn: () => searchDaos(options),
    }),
}

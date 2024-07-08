import { QueryClient, queryOptions } from '@tanstack/react-query'

import { IndexerFormulaType } from '@dao-dao/types'

import {
  QueryIndexerOptions,
  QuerySnapperOptions,
  queryIndexer,
  queryIndexerUpStatus,
  querySnapper,
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
}

/**
 * Fetch indexer query, unless the indexer is behind and there is a fallback, in
 * which case it errors.
 */
export const fetchIndexerQuery = async <T = any>(
  queryClient: QueryClient,
  { noFallback, ...options }: FetchIndexerQueryOptions
): Promise<T> => {
  // If the indexer is behind and either there's a fallback or we're on the
  // server, return null to make the caller use the fallback. Throw error if no
  // fallback and on client.
  if (!noFallback) {
    const isCaughtUp = await queryClient.fetchQuery(
      indexerQueries.isCaughtUp({ chainId: options.chainId })
    )

    if (!isCaughtUp && typeof window !== 'undefined') {
      throw new Error('Indexer is behind and no fallback is available')
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
  query: <T = any>(
    queryClient: QueryClient,
    options: FetchIndexerQueryOptions
  ) =>
    queryOptions({
      queryKey: ['indexer', 'query', options],
      queryFn: () => fetchIndexerQuery<T>(queryClient, options),
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryContract: <T = any>(
    queryClient: QueryClient,
    {
      contractAddress: address,
      ...options
    }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
      contractAddress: string
    }
  ) =>
    indexerQueries.query<T>(queryClient, {
      ...options,
      type: IndexerFormulaType.Contract,
      address,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryGeneric: <T = any>(
    queryClient: QueryClient,
    options: Omit<FetchIndexerQueryOptions, 'type' | 'address'>
  ) =>
    indexerQueries.query<T>(queryClient, {
      ...options,
      type: IndexerFormulaType.Generic,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryValidator: <T = any>(
    queryClient: QueryClient,
    {
      validatorOperatorAddress: address,
      ...options
    }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
      validatorOperatorAddress: string
    }
  ) =>
    indexerQueries.query<T>(queryClient, {
      ...options,
      type: IndexerFormulaType.Validator,
      address,
    }),
  /**
   * Fetch indexer query, unless the indexer is behind and there is a fallback.
   */
  queryWallet: <T = any>(
    queryClient: QueryClient,
    {
      walletAddress: address,
      ...options
    }: Omit<FetchIndexerQueryOptions, 'type' | 'address'> & {
      walletAddress: string
    }
  ) =>
    indexerQueries.query<T>(queryClient, {
      ...options,
      type: IndexerFormulaType.Wallet,
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
}

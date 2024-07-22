import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  GenericTokenSource,
  SkipAsset,
  SkipChain,
  TokenType,
} from '@dao-dao/types'

import { indexerQueries } from './indexer'

/**
 * Fetch Skip chain.
 */
export const fetchSkipChain = async (
  queryClient: QueryClient,
  {
    chainId,
  }: {
    chainId: string
  }
): Promise<SkipChain> => {
  const chain = await queryClient.fetchQuery(
    indexerQueries.snapper({
      query: 'skip-chain',
      parameters: {
        chainId,
      },
    })
  )

  if (!chain) {
    throw new Error('No Skip chain found')
  }

  return chain
}

/**
 * Fetch Skip asset.
 */
export const fetchSkipAsset = async (
  queryClient: QueryClient,
  { type, chainId, denomOrAddress }: GenericTokenSource
): Promise<SkipAsset> => {
  const asset = await queryClient.fetchQuery(
    indexerQueries.snapper({
      query: 'skip-asset',
      parameters: {
        chainId,
        denom: denomOrAddress,
        cw20: (type === TokenType.Cw20).toString(),
      },
    })
  )

  if (!asset) {
    throw new Error('No Skip asset found')
  }

  return asset
}

/**
 * Fetch Skip recommended asset.
 */
export const fetchSkipRecommendedAsset = async (
  queryClient: QueryClient,
  {
    fromChainId,
    denom,
    toChainId,
  }: {
    fromChainId: string
    denom: string
    toChainId: string
  }
): Promise<SkipAsset> => {
  const { asset } =
    (await queryClient.fetchQuery(
      indexerQueries.snapper({
        query: 'skip-recommended-asset',
        parameters: {
          sourceAssetChainId: fromChainId,
          sourceAssetDenom: denom,
          destChainId: toChainId,
        },
      })
    )) ?? {}

  if (!asset) {
    throw new Error('No Skip recommended asset found')
  }

  return asset
}

export const skipQueries = {
  /**
   * Fetch Skip chain.
   */
  chain: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSkipChain>[1]
  ) =>
    queryOptions({
      queryKey: ['skip', 'chain', options],
      queryFn: () => fetchSkipChain(queryClient, options),
    }),
  /**
   * Fetch Skip asset.
   */
  asset: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSkipAsset>[1]
  ) =>
    queryOptions({
      queryKey: ['skip', 'asset', options],
      queryFn: () => fetchSkipAsset(queryClient, options),
    }),
  /**
   * Fetch Skip recommended asset.
   */
  recommendedAsset: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSkipRecommendedAsset>[1]
  ) =>
    queryOptions({
      queryKey: ['skip', 'recommendedAsset', options],
      queryFn: () => fetchSkipRecommendedAsset(queryClient, options),
    }),
}

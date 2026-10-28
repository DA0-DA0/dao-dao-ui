import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  AnyChain,
  GenericTokenSource,
  SkipAsset,
  SkipChain,
  TokenType,
} from '@dao-dao/types'
import { convertSkipChainToAnyChain } from '@dao-dao/utils'

import {
  fetchSkipChains,
  fetchSkipAssets,
  fetchSkipRecommendations,
  RecommendationOptions,
  selectSkipRecommendation,
  skipChainSupportsPfm,
} from '../providers/skip'

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
): Promise<AnyChain> => {
  const chain = await queryClient.fetchQuery(skipQueries.chainRaw({ chainId }))

  if (!chain) {
    throw new Error('No Skip chain found')
  }

  return convertSkipChainToAnyChain(chain)
}

/**
 * Fetch Skip asset.
 */
export const fetchSkipAsset = async (
  queryClient: QueryClient,
  { type, chainId, denomOrAddress }: GenericTokenSource
): Promise<SkipAsset> => {
  const assets = await queryClient.fetchQuery(skipQueries.assets({ chainId }))
  const asset = assets?.find(
    (asset) =>
      (asset.is_cw20 ? TokenType.Cw20 : TokenType.Native) === type &&
      (asset.is_cw20
        ? asset.token_contract || asset.denom.replace(/^cw20:/, '')
        : asset.denom) === denomOrAddress
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
  const asset = selectSkipRecommendation(
    await queryClient.fetchQuery(
      skipQueries.recommendations({ fromChainId, denom, toChainId })
    )
  )?.asset

  if (!asset) {
    throw new Error('No Skip recommended asset found')
  }

  return asset
}

/**
 * Fetch whether or not pfm is enabled for a chain.
 */
export const fetchSkipChainPfmEnabled = async (
  queryClient: QueryClient,
  { chainId }: { chainId: string }
): Promise<boolean> => {
  const chain = await queryClient.fetchQuery(skipQueries.chainRaw({ chainId }))
  return skipChainSupportsPfm(chain)
}

export const skipQueries = {
  chains: () =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'chains'],
      queryFn: () => fetchSkipChains().catch(() => null),
      staleTime: (q) => (q.state.data === null ? 30_000 : 300_000),
    }),
  chainRaw: ({ chainId }: { chainId: string }) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'chainRaw', chainId],
      queryFn: async (ctx) => {
        const chains = await ctx.client.fetchQuery(skipQueries.chains())
        if (!chains) throw new Error('Skip chains unavailable')
        return chains.find((chain) => chain.chain_id === chainId) || null
      },
    }),
  assets: ({ chainId }: { chainId: string }) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'assets', chainId],
      queryFn: () => fetchSkipAssets(chainId).catch(() => null),
      staleTime: (q) => (q.state.data === null ? 30_000 : 3_600_000),
    }),
  recommendations: (options: RecommendationOptions) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'recommendations', options],
      staleTime: 600_000,
      queryFn: () => fetchSkipRecommendations(options),
    }),
  /**
   * Fetch Skip chain.
   */
  chain: (options: Parameters<typeof fetchSkipChain>[1]) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'chain', options],
      queryFn: (ctx) => fetchSkipChain(ctx.client, options),
    }),
  /**
   * Fetch Skip asset.
   */
  asset: (options: Parameters<typeof fetchSkipAsset>[1]) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'asset', options],
      queryFn: (ctx) => fetchSkipAsset(ctx.client, options),
    }),
  /**
   * Fetch Skip recommended asset.
   */
  recommendedAsset: (
    options: Parameters<typeof fetchSkipRecommendedAsset>[1]
  ) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'recommendedAsset', options],
      queryFn: (ctx) => fetchSkipRecommendedAsset(ctx.client, options),
    }),
  /**
   * Fetch Skip recommended asset for generic token.
   */
  recommendedAssetForGenericToken: (
    options: Omit<Parameters<typeof fetchSkipRecommendedAsset>[1], 'denom'> &
      Pick<GenericTokenSource, 'type' | 'denomOrAddress'>
  ) =>
    skipQueries.recommendedAsset({
      fromChainId: options.fromChainId,
      toChainId: options.toChainId,
      denom:
        (options.type === TokenType.Cw20 ? 'cw20:' : '') +
        options.denomOrAddress,
    }),
  /**
   * Fetch whether or not pfm is enabled for a chain.
   */
  chainPfmEnabled: (options: Parameters<typeof fetchSkipChainPfmEnabled>[1]) =>
    queryOptions({
      retry: false,
      queryKey: ['skip', 'chainPfmEnabled', options],
      queryFn: (ctx) => fetchSkipChainPfmEnabled(ctx.client, options),
    }),
}

import type { MsgsDirectResponse } from '@skip-go/client'
import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  AnyChainSkip,
  GenericToken,
  GenericTokenSource,
  SkipAsset,
  SkipChain,
  TokenType,
} from '@dao-dao/types'
import {
  convertSkipAssetToGenericToken,
  convertSkipChainToAnyChain,
} from '@dao-dao/utils'

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
): Promise<AnyChainSkip> => {
  const chain = await queryClient.fetchQuery(
    indexerQueries.snapper<SkipChain>({
      query: 'skip-chain',
      parameters: {
        chainId,
      },
    })
  )

  if (!chain) {
    throw new Error('No Skip chain found')
  }

  return convertSkipChainToAnyChain(chain)
}

/**
 * Fetch all Skip chains.
 */
export const fetchAllSkipChains = async (
  queryClient: QueryClient
): Promise<AnyChainSkip[]> => {
  const chains = await queryClient.fetchQuery(
    indexerQueries.snapper<SkipChain[]>({
      query: 'skip-chains',
      parameters: {
        all: true,
      },
    })
  )

  return (
    chains
      ?.map(convertSkipChainToAnyChain)
      .sort((a, b) => a.prettyName.localeCompare(b.prettyName)) ?? []
  )
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
 * Fetch all Skip assets as generic tokens.
 *
 * Returns a map of chainId to assets.
 */
export const fetchAllSkipAssets = async (
  queryClient: QueryClient
): Promise<Record<string, GenericToken[]>> => {
  const assets = await queryClient.fetchQuery(
    indexerQueries.snapper<Record<string, { assets: SkipAsset[] }>>({
      query: 'skip-all-assets',
    })
  )

  return Object.fromEntries(
    Object.entries(assets ?? {}).map(([chainId, { assets }]) => [
      chainId,
      assets
        .map(convertSkipAssetToGenericToken)
        .sort((a, b) => a.symbol.localeCompare(b.symbol)),
    ])
  )
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

/**
 * Fetch whether or not pfm is enabled for a chain.
 */
export const fetchSkipChainPfmEnabled = async (
  queryClient: QueryClient,
  { chainId }: { chainId: string }
): Promise<boolean> => {
  const chain = await fetchSkipChain(queryClient, { chainId })
  return (
    chain?.skipChain?.ibc_capabilities?.cosmos_pfm ??
    chain?.skipChain?.pfm_enabled ??
    false
  )
}

/**
 * Fetch the route and messages for a transfer via Skip Go.
 */
export const fetchSkipGoMsgsDirect = async (
  queryClient: QueryClient,
  {
    fromChainId,
    fromTokenType,
    fromDenomOrAddress,
    toChainId,
    toTokenType,
    toDenomOrAddress,
    amount,
    slippageTolerancePercent,
    timeoutSeconds,
    addresses,
    smartRelay,
    allowSwaps,
  }: {
    fromChainId: string
    fromTokenType: TokenType
    fromDenomOrAddress: string
    toChainId: string
    toTokenType: TokenType
    toDenomOrAddress: string
    amount: string
    slippageTolerancePercent: number
    timeoutSeconds: number
    addresses: Record<string, string>
    smartRelay: boolean
    allowSwaps: boolean
  }
): Promise<MsgsDirectResponse> => {
  const fromDenom =
    fromTokenType === TokenType.Cw20
      ? 'cw20:' + fromDenomOrAddress
      : fromDenomOrAddress
  const toDenom =
    toTokenType === TokenType.Cw20
      ? 'cw20:' + toDenomOrAddress
      : toDenomOrAddress

  const data = await queryClient.fetchQuery(
    indexerQueries.snapper<MsgsDirectResponse>({
      query: 'skip-go-msgs-direct',
      parameters: {
        fromChainId,
        fromDenom,
        toChainId,
        toDenom,
        amountIn: amount,
        slippageTolerancePercent,
        timeoutSeconds,
        addresses: JSON.stringify(addresses),
        smartRelay,
        allowSwaps,
      },
    })
  )

  if (!data) {
    throw new Error('No Skip Go msgs direct found')
  }

  return data
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
   * Fetch all Skip chains.
   */
  chains: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: ['skip', 'chains'],
      queryFn: () => fetchAllSkipChains(queryClient),
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
   * Fetch all Skip assets.
   */
  allAssets: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: ['skip', 'allAssets'],
      queryFn: () => fetchAllSkipAssets(queryClient),
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
  /**
   * Fetch Skip recommended asset for generic token.
   */
  recommendedAssetForGenericToken: (
    queryClient: QueryClient,
    options: Omit<Parameters<typeof fetchSkipRecommendedAsset>[1], 'denom'> &
      Pick<GenericTokenSource, 'type' | 'denomOrAddress'>
  ) =>
    skipQueries.recommendedAsset(queryClient, {
      fromChainId: options.fromChainId,
      toChainId: options.toChainId,
      denom:
        (options.type === TokenType.Cw20 ? 'cw20:' : '') +
        options.denomOrAddress,
    }),
  /**
   * Fetch whether or not pfm is enabled for a chain.
   */
  chainPfmEnabled: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSkipChainPfmEnabled>[1]
  ) =>
    queryOptions({
      queryKey: ['skip', 'chainPfmEnabled', options],
      queryFn: () => fetchSkipChainPfmEnabled(queryClient, options),
    }),
  /**
   * Fetch the route and messages for a transfer via Skip Go.
   */
  skipGoMsgsDirect: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSkipGoMsgsDirect>[1]
  ) =>
    queryOptions({
      queryKey: ['skip', 'skipGoMsgsDirect', options],
      queryFn: () => fetchSkipGoMsgsDirect(queryClient, options),
    }),
}

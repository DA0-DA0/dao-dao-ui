import { SkipAsset, SkipAssetRecommendation, SkipChain } from '@dao-dao/types'
import { SKIP_API_BASE } from '@dao-dao/utils'

import { fetchPublicJson } from './http'

export const fetchSkipChains = async (): Promise<SkipChain[]> => {
  const data = await fetchPublicJson<{ chains?: SkipChain[] }>(
    'skip',
    SKIP_API_BASE + '/v2/info/chains'
  )
  if (
    !Array.isArray(data?.chains) ||
    data.chains.some((chain) => typeof chain?.chain_id !== 'string')
  )
    throw new Error('Invalid Skip chains')
  return data.chains
}

export const fetchSkipAssets = async (
  chainId: string
): Promise<SkipAsset[]> => {
  const params = new URLSearchParams({
    chain_ids: chainId,
    include_cw20_assets: 'true',
  })
  const data = await fetchPublicJson<{
    chain_to_assets_map?: Record<string, { assets?: SkipAsset[] }>
  }>('skip', SKIP_API_BASE + '/v2/fungible/assets?' + params)
  const assets = data?.chain_to_assets_map?.[chainId]?.assets
  if (!Array.isArray(assets)) throw new Error('Invalid Skip assets')
  return assets.filter(
    (asset) =>
      asset?.chain_id === chainId &&
      typeof asset.denom === 'string' &&
      typeof asset.is_cw20 === 'boolean'
  )
}

export type RecommendationOptions = {
  fromChainId: string
  denom: string
  toChainId: string
}
export const fetchSkipRecommendations = async ({
  fromChainId,
  denom,
  toChainId,
}: RecommendationOptions): Promise<SkipAssetRecommendation[]> => {
  const data = await fetchPublicJson<{
    recommendation_entries?: {
      error?: unknown
      recommendations?: SkipAssetRecommendation[]
    }[]
  }>('skip', SKIP_API_BASE + '/v2/fungible/recommend_assets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [
        {
          source_asset_chain_id: fromChainId,
          source_asset_denom: denom,
          dest_chain_id: toChainId,
        },
      ],
    }),
  })
  const entry = data?.recommendation_entries?.[0]
  if (!entry || entry.error || !Array.isArray(entry.recommendations))
    throw new Error('Skip recommendations unavailable')
  return entry.recommendations.filter(
    ({ asset }) =>
      asset?.chain_id === toChainId && typeof asset.denom === 'string'
  )
}

export const selectSkipRecommendation = (
  recommendations: SkipAssetRecommendation[]
) =>
  recommendations.find(({ reason }) => reason === 'BASE_TOKEN') ||
  recommendations.find(({ reason }) => reason === 'MOST_LIQUID') ||
  recommendations.find(({ reason }) => reason === 'DIRECT') ||
  recommendations[0]

/** A malformed modern capability never falls back to an optimistic legacy value. */
export const skipChainSupportsPfm = (chain?: SkipChain | null) =>
  chain?.ibc_capabilities?.cosmos_pfm !== undefined
    ? chain.ibc_capabilities.cosmos_pfm === true
    : chain?.pfm_enabled === true

export const hasSkipDecimals = (
  asset: SkipAsset | null | undefined
): asset is SkipAsset & { decimals: number } =>
  typeof asset?.decimals === 'number' &&
  Number.isInteger(asset.decimals) &&
  asset.decimals >= 0

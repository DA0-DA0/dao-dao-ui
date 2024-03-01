export type SkipChain = {
  chain_name: string
  chain_id: string
  pfm_enabled: boolean
  cosmos_module_support: Record<string, boolean | undefined>
  supports_memo: boolean
  logo_uri: string
  bech32_prefix: string
  fee_assets: {
    denom: string
    gas_price: {
      low: string
      average: string
      high: string
    }
  }[]
  chain_type: string
  ibc_capabilities: Record<string, boolean | undefined>
}

export type SkipAsset = {
  denom: string
  chain_id: string
  origin_denom: string
  origin_chain_id: string
  trace: string
  is_cw20: boolean
  is_evm: boolean
  symbol: string
  name: string
  logo_uri: string
  decimals: number
  description: string
  coingecko_id?: string
  token_contract?: string
  recommended_symbol: string
}

export type SkipAssetRecommendation = {
  asset: SkipAsset
  reason: string
}

export type SkipRoute = {
  source_asset_denom: string
  source_asset_chain_id: string
  dest_asset_denom: string
  dest_asset_chain_id: string
  amount_in: string
  amount_out: string
  operations: any[]
  chain_ids: string[]
  does_swap: boolean
  estimated_amount_out: string
  txs_required: number
  usd_amount_in: string
  usd_amount_out: string
}

export type SkipMultiChainMsg = {
  chain_id: string
  path: string[]
  msg: string
  msg_type_url: string
}

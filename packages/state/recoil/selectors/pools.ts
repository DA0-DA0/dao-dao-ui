import { selector } from 'recoil'

import { POOLS_LIST_URL } from '@dao-dao/utils'

export interface TokenInfo {
  id: string
  chain_id: string
  token_address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  tags: string[]
  native: boolean
  denom: string
}

export type TokenInfoWithReward = TokenInfo & {
  rewards_address: string
}

export interface JunoswapPoolEntityType {
  pool_id: string
  pool_assets: [TokenInfo, TokenInfo]
  swap_address: string
  staking_address: string
  rewards_tokens: TokenInfoWithReward[]
}

export interface JunoswapPoolsListQueryResponse {
  name: string
  base_token: TokenInfo
  logoURI: string
  keywords: string[]
  tags: Record<string, { name: string; description: string }>
  timestamp: string
  pools: JunoswapPoolEntityType[]
}

export const junoswapPoolsListSelector = selector<
  JunoswapPoolsListQueryResponse | undefined
>({
  key: 'junoswapPoolsList',
  get: async () => {
    try {
      const junoswapPoolsList = await fetch(POOLS_LIST_URL)
      return (await junoswapPoolsList.json()) as JunoswapPoolsListQueryResponse
    } catch {
      return undefined
    }
  },
})

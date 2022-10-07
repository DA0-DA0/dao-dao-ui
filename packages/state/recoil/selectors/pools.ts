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

export interface PoolEntityType {
  pool_id: string
  pool_assets: [TokenInfo, TokenInfo]
  swap_address: string
  staking_address: string
  rewards_tokens: TokenInfoWithReward[]
}

export interface PoolsListQueryResponse {
  name: string
  base_token: TokenInfo
  logoURI: string
  keywords: string[]
  tags: Record<string, { name: string; description: string }>
  timestamp: string
  pools: PoolEntityType[]
}

export const poolsListSelector = selector<PoolsListQueryResponse | undefined>({
  key: 'poolsList',
  get: async () => {
    try {
      const poolsList = await fetch(POOLS_LIST_URL)
      return (await poolsList.json()) as PoolsListQueryResponse
    } catch {
      return undefined
    }
  },
})

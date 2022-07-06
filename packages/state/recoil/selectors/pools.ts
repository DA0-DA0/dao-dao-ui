import { selector } from 'recoil'

import { POOLS_LIST_URL } from '@dao-dao/utils'

export type TokenInfo = {
  id: string
  chain_id: string
  token_address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  tags: string[]
  denom: string
  native: boolean
}

export type TokenInfoWithReward = TokenInfo & {
  rewards_address: string
}

export type PoolEntityType = {
  pool_id: string
  pool_assets: [TokenInfo, TokenInfo]
  swap_address: string
  staking_address: string
  rewards_tokens: Array<TokenInfoWithReward>
}

type PoolsListQueryResponse = {
  base_token: TokenInfo
  pools: Array<PoolEntityType>
  poolsById: Record<string, PoolEntityType>
  name: string
  logoURI: string
  keywords: Array<string>
  tags: Record<string, { name: string; description: string }>
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

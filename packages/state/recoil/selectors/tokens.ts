import { selector, selectorFamily, waitForAll } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { POOLS_LIST_URL } from '@dao-dao/utils'

import { Cw20BaseSelectors, CwCoreSelectors } from '../../index'

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

export const poolsListSelector = selector<PoolsListQueryResponse>({
  key: 'poolsList',
  get: async () => {
    const poolsList = await fetch(POOLS_LIST_URL)
    const tokens = (await poolsList.json()) as PoolsListQueryResponse
    return tokens
  },
})

export const cw20BalancesInfoSelector = selectorFamily<
  { symbol: string; denom: string; amount: string; decimals: number }[],
  { address: string }
>({
  key: 'cw20BalanceInfo',
  get:
    ({ address }) =>
    async ({ get }) => {
      const cw20List =
        get(
          CwCoreSelectors.allCw20BalancesSelector({ contractAddress: address })
        ) ?? []

      const cw20Info = get(
        waitForAll(
          cw20List.map(({ addr }) =>
            Cw20BaseSelectors.tokenInfoSelector({
              contractAddress: addr,
              params: [],
            })
          )
        )
      ).filter(Boolean) as TokenInfoResponse[]

      const cw20Tokens = cw20Info.map((info, idx) => {
        return {
          symbol: info.symbol,
          denom: cw20List[idx].addr,
          amount: cw20List[idx].balance,
          decimals: info.decimals,
        }
      })
      return cw20Tokens
    },
})

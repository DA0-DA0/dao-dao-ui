import { selectorFamily } from 'recoil'

import { NATIVE_DECIMALS, USDC_SWAP_ADDRESS } from '@dao-dao/utils'

import { cosmWasmClientSelector } from './chain'

export const tokenUSDPriceSelector = selectorFamily<
  number | undefined,
  { tokenSwapAddress: string; tokenDecimals: number }
>({
  key: 'tokenUSDPriceSelector',
  get:
    ({ tokenSwapAddress, tokenDecimals }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return 0

      // Likely means we're on the testnet. Just make up a number.
      if (!tokenSwapAddress.length) return undefined

      if (!USDC_SWAP_ADDRESS) {
        return undefined
      }

      const junoUSD = (
        await client.queryContractSmart(
          // Juno UST pool on Junoswap.
          USDC_SWAP_ADDRESS,
          { token1_for_token2_price: { token1_amount: '1000000' } }
        )
      ).token2_amount

      const junoToken = (
        await client.queryContractSmart(tokenSwapAddress, {
          token2_for_token1_price: { token2_amount: '1000000' },
        })
      ).token1_amount

      const price =
        Number(junoToken) *
        Number(junoUSD) *
        Math.pow(10, -(NATIVE_DECIMALS + tokenDecimals))
      return price
    },
})

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

export const tokenUSDCPriceSelector = selectorFamily<
  number | undefined,
  { denom: string; }
>({
  key: 'tokenUSDCPriceSelector',
  get:
  ({ denom }) =>
    async ({ get }) => {
      return async () => {

      const tokens = await ((await fetch('/pools_list.json')).json() as Promise<PoolsListQueryResponse>)
      // const tokens = JSON.parse(tokenList)
        const USDCSwap = tokens.pools.find(({
            pool_id
        }) => pool_id === "JUNO-USDC")

        const denomSwap = tokens.pools.find(
            ({
                pool_assets
            }) => pool_assets.find(
                ({
                    denom: pool_denom,
                    token_address
                }) => pool_denom === denom || token_address === denom) !== undefined)

        // No price information avaliable.
        if (!denomSwap) {
            return 0
        }

        const client = get(cosmWasmClientSelector)

        const junoUSDC = (
            USDCSwap ? await client.queryContractSmart(
                USDCSwap.swap_address, {
                    token1_for_token2_price: {
                        token1_amount: '1000000'
                    }
                }
            ) : {token2_amount: 0}
        ).token2_amount

        if (denom === "ujuno") {
            return Number(junoUSDC) * Math.pow(10, -12)
        }

        const junoToken = (
            await client.queryContractSmart(denomSwap.swap_address, {
                token2_for_token1_price: {
                    token2_amount: '1000000'
                },
            })
        ).token1_amount

        const denomSwapAssetInfo = denomSwap.pool_assets.find(({
            denom: pool_denom,
            token_address
        }) => denom === pool_denom || token_address === denom)
        const denomDecimals = denomSwapAssetInfo?.decimals || 6

        const price = Number(junoToken) * Number(junoUSDC) * Math.pow(10, -(6 + denomDecimals * 2))

        return price
      }
    }
})

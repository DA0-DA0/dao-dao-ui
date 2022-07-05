import { selectorFamily } from 'recoil'

import { NATIVE_DECIMALS } from '@dao-dao/utils'

import { cosmWasmClientSelector, nativeBalanceSelector } from './chain'
import { cw20BalancesInfoSelector, poolsListSelector } from './tokens'

export const tokenUSDCPriceSelector = selectorFamily<
  number,
  { denom: string; tokenDecimals?: number }
>({
  key: 'tokenUSDCPriceSelector',
  get:
    ({ denom, tokenDecimals }) =>
    async ({ get }) => {
      const tokens = get(poolsListSelector)
      const usdcSwap = tokens.pools.find(
        ({ pool_id }) => pool_id === 'JUNO-USDC'
      )

      const denomSwap = tokens.pools.find(
        ({ pool_assets }) =>
          pool_assets.find(
            ({ denom: pool_denom, token_address }) =>
              pool_denom === denom || token_address === denom
          ) !== undefined
      )

      // No price information avaliable.
      if (!denomSwap) {
        return 0
      }

      const client = get(cosmWasmClientSelector)

      const junoUSDC = (
        usdcSwap
          ? await client.queryContractSmart(usdcSwap.swap_address, {
              token1_for_token2_price: {
                token1_amount: '1000000',
              },
            })
          : { token2_amount: 0 }
      ).token2_amount

      if (denom === 'ujuno') {
        return Number(junoUSDC) * Math.pow(10, -12)
      }

      const junoToken = (
        await client.queryContractSmart(denomSwap.swap_address, {
          token2_for_token1_price: {
            token2_amount: '1000000',
          },
        })
      ).token1_amount

      const denomSwapAssetInfo = denomSwap.pool_assets.find(
        ({ denom: pool_denom, token_address }) =>
          denom === pool_denom || token_address === denom
      )
      const denomDecimals = tokenDecimals
        ? tokenDecimals
        : denomSwapAssetInfo
        ? denomSwapAssetInfo.decimals
        : NATIVE_DECIMALS

      const price =
        Number(junoToken) *
        Number(junoUSDC) *
        Math.pow(10, -(6 + denomDecimals * 2))

      return price
    },
})

export const addressTVLSelector = selectorFamily<number, { address: string }>({
  key: 'tokenUSDCPriceSelector',
  get:
    ({ address }) =>
    async ({ get }) => {
      const nativeBalances = get(nativeBalanceSelector(address))
      const cw20Balances = get(cw20BalancesInfoSelector({ address }))

      let balances = cw20Balances
        ? cw20Balances.map(({ amount, denom }) => ({ amount, denom }))
        : []
      if (nativeBalances) {
        balances = [nativeBalances].concat(balances)
      }

      const prices = balances.map(({ amount, denom }) => {
        const price = get(tokenUSDCPriceSelector({ denom }))
        return price ? Number(amount) * price : 0
      })

      return prices.reduce((price, total) => price + total, 0)
    },
})

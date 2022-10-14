import { ChainInfoID } from '@noahsaso/cosmodal'
import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/tstypes'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  USDC_SWAP_ADDRESS,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { refreshTokenUsdcPriceIdAtom } from '../atoms/refresh'
import { cosmWasmClientForChainSelector, nativeBalanceSelector } from './chain'
import { CwdCoreV2Selectors } from './clients'
import { junoswapPoolsListSelector } from './pools'

// TODO(multichain): Figure out how to match CW20s on other chains to CW20s in
// Junoswap pools so we can check prices.

// Gets the price of a token in USDC / TOKEN. DENOM may either be a native
// denomination or the address of a cw20 token. Price data is only available for
// tokens that are tradable on Junoswap.
export const usdcPerMacroTokenSelector = selectorFamily<
  number | undefined,
  { denom: string; decimals: number }
>({
  key: 'usdcPerMacroToken',
  get:
    ({ denom, decimals }) =>
    async ({ get }) => {
      get(refreshTokenUsdcPriceIdAtom(denom))

      const tokens = get(junoswapPoolsListSelector)
      if (!tokens) {
        return
      }

      // Find swap for denom
      const denomSwap = tokens.pools.find(
        ({ pool_assets }) =>
          pool_assets.find(
            ({ denom: pool_denom, token_address }) =>
              pool_denom === denom || token_address === denom
          ) !== undefined
      )

      // No price information available.
      if (!denomSwap) {
        return
      }

      // Find USDC swap by USDC_SWAP_ADDRESS
      const usdcSwap = tokens.pools.find(
        ({ swap_address }) => swap_address === USDC_SWAP_ADDRESS
      )

      // Junoswap exists on Juno mainnet.
      const client = get(cosmWasmClientForChainSelector(ChainInfoID.Juno1))

      // Query for price of 1000000 tokens since decimals are not returned
      // by API. This will give us up to 10^-6 precision for calculations
      const tokenAmount = Math.pow(10, NATIVE_DECIMALS)

      // Query and calculate price for 1 native token
      // uUSDC / uJUNO
      const nativeUSDC =
        Number(
          (usdcSwap
            ? await client.queryContractSmart(usdcSwap.swap_address, {
                token1_for_token2_price: {
                  token1_amount: tokenAmount.toString(),
                },
              })
            : { token2_amount: '0' }
          ).token2_amount
        ) / tokenAmount

      // Don't need to query again for price of native token.
      if (denom === NATIVE_DENOM) {
        // USDC / JUNO
        return Number(nativeUSDC)
      }

      // Get juno price in terms of the native token.
      // uJUNO / uTOKEN
      const tokenPairPrice =
        Number(
          (
            await client.queryContractSmart(denomSwap.swap_address, {
              token2_for_token1_price: {
                token2_amount: tokenAmount.toString(),
              },
            })
          ).token1_amount
        ) / tokenAmount

      const price =
        // (uUSDC / uJUNO) * (uJUNO / uTOKEN) = uUSDC / uTOKEN
        ((Number(nativeUSDC) * Number(tokenPairPrice)) /
          // Divide out the number of decimals in USDC.
          Math.pow(10, NATIVE_DECIMALS)) *
        // Mutltiply by the number of decimals in TOKEN.
        Math.pow(10, decimals)

      return price
    },
})

export const daoTvlSelector = selectorFamily<
  number,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoTvl',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const nativeBalance = get(
        nativeBalanceSelector({ address: coreAddress, chainId })
      )
      const cw20Balances = get(
        CwdCoreV2Selectors.cw20BalancesInfoSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      let balances = cw20Balances
        ? cw20Balances.map(({ amount, denom, decimals }) => ({
            amount,
            denom,
            decimals,
          }))
        : []
      if (nativeBalance) {
        balances = [{ ...nativeBalance, decimals: NATIVE_DECIMALS }].concat(
          balances
        )
      }

      const prices = balances.map(({ amount, denom, decimals }) => {
        const price = get(usdcPerMacroTokenSelector({ denom, decimals }))
        return price
          ? convertMicroDenomToDenomWithDecimals(amount, decimals) * price
          : 0
      })

      return prices.reduce((price, total) => price + total, 0)
    },
})

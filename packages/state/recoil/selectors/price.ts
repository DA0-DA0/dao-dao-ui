import { ChainInfoID } from '@noahsaso/cosmodal'
import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  AmountWithTimestampAndDenom,
  WithChainId,
} from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  USDC_SWAP_ADDRESS,
  convertMicroDenomToDenomWithDecimals,
  convertSecondsToBlocks,
  isJunoIbcUsdc,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { refreshTokenUsdcPriceAtom } from '../atoms/refresh'
import {
  blockHeightSelector,
  blocksPerYearSelector,
  cosmWasmClientForChainSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from './chain'
import { DaoCoreV2Selectors } from './contracts'
import { queryContractIndexerSelector } from './indexer'
import { junoswapPoolsListSelector } from './pools'

// TODO(multichain): Figure out how to match CW20s on other chains to CW20s in
// Junoswap pools so we can check prices.

const BASE_SWAP_DENOM = 'ujuno'
const BASE_SWAP_DECIMALS = 6

// Gets the price of a token in USDC / TOKEN. DENOM may either be a native
// denomination or the address of a cw20 token. Price data is only available for
// tokens that are tradable on Junoswap.
export const usdcPerMacroTokenSelector = selectorFamily<
  AmountWithTimestampAndDenom | undefined,
  { denom: string; decimals: number }
>({
  key: 'usdcPerMacroToken',
  get:
    ({ denom, decimals }) =>
    async ({ get }) => {
      const timestamp = new Date()

      // Allow refreshing all prices at once.
      get(refreshTokenUsdcPriceAtom(''))
      // Allow refreshing just this denom.
      get(refreshTokenUsdcPriceAtom(denom))

      // If checking price of USDC, just return 1.
      if (isJunoIbcUsdc(denom)) {
        return { denom, amount: 1, timestamp }
      }

      const tokens = get(junoswapPoolsListSelector)
      if (!tokens) {
        return
      }

      // Find swap for denom.
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

      // Find JUNO-USDC swap by USDC_SWAP_ADDRESS.
      const usdcSwap = tokens.pools.find(
        ({ swap_address }) => swap_address === USDC_SWAP_ADDRESS
      )

      // Query and calculate price for 1 native token.
      // uUSDC / uJUNO
      const nativeUSDC = usdcSwap
        ? get(
            wasmswapToken1PriceInToken2Selector({
              swapAddress: usdcSwap.swap_address,
            })
          ).amount
        : 0

      // Don't need to query again for price of native token.
      if (denom === BASE_SWAP_DENOM) {
        // USDC / JUNO
        return { denom, amount: Number(nativeUSDC), timestamp }
      }

      // Get amount of JUNO per token.
      // uTOKEN / uJUNO
      const tokenPerJuno = get(
        wasmswapToken1PriceInToken2Selector({
          swapAddress: denomSwap.swap_address,
        })
      ).amount
      // uJUNO / uTOKEN
      const tokenPairPrice = tokenPerJuno === 0 ? 0 : 1 / tokenPerJuno

      const price =
        // (uUSDC / uJUNO) * (uJUNO / uTOKEN) = uUSDC / uTOKEN
        ((Number(nativeUSDC) * Number(tokenPairPrice)) /
          // Divide out the number of decimals in USDC.
          Math.pow(10, BASE_SWAP_DECIMALS)) *
        // Mutltiply by the number of decimals in TOKEN.
        Math.pow(10, decimals)

      return { denom, amount: price, timestamp }
    },
})

export const daoTvlSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'daoTvl',
  get:
    ({ coreAddress, cw20GovernanceTokenAddress, chainId }) =>
    async ({ get }) => {
      const timestamp = new Date()

      const nativeBalances = get(
        nativeBalancesSelector({
          address: coreAddress,
          chainId,
        })
      )
      const nativeDelegatedBalance = get(
        nativeDelegatedBalanceSelector({
          address: coreAddress,
          chainId,
        })
      )
      const cw20TokenBalances = get(
        DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
          contractAddress: coreAddress,
          chainId,
          governanceTokenAddress: cw20GovernanceTokenAddress,
        })
      )

      const balances = [
        ...nativeBalances.map(
          ({ token: { denomOrAddress, decimals }, balance }) => ({
            amount: balance,
            denom: denomOrAddress,
            decimals,
          })
        ),
        {
          amount: nativeDelegatedBalance.amount,
          denom: nativeDelegatedBalance.denom,
          decimals:
            nativeTokenDecimals(nativeDelegatedBalance.denom) ||
            NATIVE_DECIMALS,
        },
        ...cw20TokenBalances.map(({ balance, token }) => ({
          amount: balance,
          denom: token.denomOrAddress,
          decimals: token.decimals,
        })),
      ]

      const prices = balances.map(({ amount, denom, decimals }) => {
        const price = get(
          usdcPerMacroTokenSelector({ denom, decimals })
        )?.amount
        return price
          ? convertMicroDenomToDenomWithDecimals(amount, decimals) * price
          : 0
      })

      return {
        amount: prices.reduce((price, total) => price + total, 0),
        timestamp,
      }
    },
})

export const wasmswapToken1PriceInToken2Selector = selectorFamily<
  AmountWithTimestamp,
  { swapAddress: string }
>({
  key: 'wasmswapToken1PriceInToken2',
  get:
    ({ swapAddress }) =>
    async ({ get }) => {
      const timestamp = new Date()
      const prices = get(
        queryContractIndexerSelector({
          contractAddress: swapAddress,
          formulaName: 'wasmswap/price',
        })
      )
      if (prices) {
        return { amount: prices.token1, timestamp }
      }

      // If indexer query fails, fallback to contract query.

      // Junoswap exists on Juno mainnet.
      const client = get(cosmWasmClientForChainSelector(ChainInfoID.Juno1))
      // Query for price of 1*10^BASE_SWAP_DECIMALS tokens since decimals are
      // not returned by API. This will give us up to 10^-BASE_SWAP_DECIMALS
      // precision for calculations.
      const tokenAmount = Math.pow(10, BASE_SWAP_DECIMALS)
      const token1 =
        Number(
          (
            await client.queryContractSmart(swapAddress, {
              token1_for_token2_price: {
                token1_amount: tokenAmount.toString(),
              },
            })
          ).token2_amount
        ) / tokenAmount

      return { amount: token1, timestamp }
    },
})

export const wasmswapToken1PriceInToken2With24HoursAgoSelector = selectorFamily<
  { price: number; price24HoursAgo: number; timestamp: Date } | undefined,
  { swapAddress: string }
>({
  key: 'wasmswapToken1PriceInToken2With24HoursAgo',
  get:
    ({ swapAddress }) =>
    async ({ get }) => {
      const timestamp = new Date()
      const chainId = ChainInfoID.Juno1

      const currentBlockHeight = get(blockHeightSelector({ chainId }))
      const blocksPerYear = get(blocksPerYearSelector({ chainId }))
      const blockHeight24HoursAgo =
        currentBlockHeight - convertSecondsToBlocks(blocksPerYear, 24 * 60 * 60)

      const client = get(cosmWasmClientForChainSelector(chainId))
      const block24HoursAgo = await client.getBlock(blockHeight24HoursAgo)

      const currentPrice = get(
        queryContractIndexerSelector({
          contractAddress: swapAddress,
          formulaName: 'wasmswap/price',
          id: currentBlockHeight,
          chainId,
        })
      )?.token1
      const price24HoursAgo = get(
        queryContractIndexerSelector({
          contractAddress: swapAddress,
          formulaName: 'wasmswap/price',
          block: {
            height: block24HoursAgo.header.height,
            timeUnixMs: new Date(block24HoursAgo.header.time).getTime(),
          },
        })
      )?.token1

      if (!currentPrice || !price24HoursAgo) {
        return
      }

      return {
        price: currentPrice,
        price24HoursAgo: price24HoursAgo,
        timestamp,
      }
    },
})

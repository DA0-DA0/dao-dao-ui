import { selectorFamily, waitForAll } from 'recoil'

import {
  AmountWithTimestampAndDenom,
  ChainId,
  GenericToken,
  GenericTokenBalance,
  GenericTokenWithUsdPrice,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getFallbackImage,
  getTokenForChainIdAndDenom,
  isValidContractAddress,
  isValidTokenFactoryDenom,
  isValidWalletAddress,
} from '@dao-dao/utils'

import {
  denomMetadataSelector,
  nativeBalanceSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from './chain'
import { isContractSelector } from './contract'
import { Cw20BaseSelectors, DaoCoreV2Selectors } from './contracts'
import { osmosisUsdPriceSelector } from './osmosis'
import { walletCw20BalancesSelector } from './wallet'
import { wyndUsdPriceSelector } from './wynd'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  WithChainId<Pick<GenericToken, 'type' | 'denomOrAddress'>>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
      let tokenInfo =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.tokenInfoSelector({
                contractAddress: denomOrAddress,
                chainId,
                params: [],
              })
            )
          : // Native factory tokens.
          type === TokenType.Native &&
            isValidTokenFactoryDenom(
              denomOrAddress,
              getChainForChainId(chainId).bech32_prefix
            )
          ? get(
              nativeDenomMetadataInfoSelector({
                denom: denomOrAddress,
                chainId,
              })
            )
          : // Native token or invalid type.
            undefined

      // If native non-factory token, try to get the token from the asset list.
      if (!tokenInfo) {
        try {
          return getTokenForChainIdAndDenom(chainId, denomOrAddress, false)
        } catch {
          // If that fails, try to fetch from chain if not IBC asset.
          try {
            tokenInfo = denomOrAddress.startsWith('ibc/')
              ? undefined
              : get(
                  nativeDenomMetadataInfoSelector({
                    denom: denomOrAddress,
                    chainId,
                  })
                )
          } catch (err) {
            // If not an error, rethrow. This may be a promise, which is how
            // recoil waits for the `get` to resolve.
            if (!(err instanceof Error)) {
              throw err
            }
          }

          // If that fails, return placeholder token.
          if (!tokenInfo) {
            return getTokenForChainIdAndDenom(chainId, denomOrAddress)
          }
        }
      }

      const imageUrl =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.logoUrlSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            )
          : getFallbackImage(denomOrAddress)

      return {
        chainId,
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
      }
    },
})

export const usdPriceSelector = selectorFamily<
  AmountWithTimestampAndDenom | undefined,
  Pick<GenericToken, 'chainId' | 'denomOrAddress'>
>({
  key: 'usdPrice',
  get:
    ({ denomOrAddress, chainId }) =>
    async ({ get }) => {
      switch (chainId) {
        case ChainId.JunoMainnet:
          return get(wyndUsdPriceSelector(denomOrAddress))
        case ChainId.OsmosisMainnet:
        // TODO(stargaze): get osmosis denoms for stargaze assets
        case ChainId.StargazeMainnet:
          return get(osmosisUsdPriceSelector(denomOrAddress))
      }
    },
})

export const genericTokenWithUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice,
  WithChainId<Pick<GenericToken, 'type' | 'denomOrAddress'>>
>({
  key: 'genericTokenWithUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      const { amount: usdPrice, timestamp } =
        get(usdPriceSelector(params)) ?? {}

      return {
        token,
        usdPrice,
        timestamp,
      }
    },
})

export const genericTokenBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
    cw20GovernanceTokenAddress?: string
    // Only get balances for this token type.
    filter?: TokenType
  }>
>({
  key: 'genericTokenBalances',
  get:
    ({ address, cw20GovernanceTokenAddress, chainId, filter }) =>
    async ({ get }) => {
      const nativeTokenBalances =
        !filter || filter === TokenType.Native
          ? get(
              nativeBalancesSelector({
                address,
                chainId,
              })
            )
          : []

      // TODO: Get polytone cw20s from some item prefix in the DAO.
      const cw20TokenBalances =
        !filter || filter === TokenType.Cw20
          ? get(
              isValidContractAddress(
                address,
                getChainForChainId(chainId).bech32_prefix
              ) &&
                // If is a DAO contract.
                get(
                  isContractSelector({
                    contractAddress: address,
                    chainId,
                    names: [
                      // V1
                      'cw-core',
                      // V2
                      'cwd-core',
                      'dao-core',
                    ],
                  })
                )
                ? DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
                    contractAddress: address,
                    governanceTokenAddress: cw20GovernanceTokenAddress,
                    chainId,
                  })
                : isValidWalletAddress(
                    address,
                    getChainForChainId(chainId).bech32_prefix
                  )
                ? walletCw20BalancesSelector({
                    walletAddress: address,
                    chainId,
                  })
                : waitForAll([])
            )
          : []

      return [...nativeTokenBalances, ...cw20TokenBalances]
    },
})

export const genericTokenBalanceSelector = selectorFamily<
  GenericTokenBalance,
  Parameters<typeof genericTokenSelector>[0] & {
    walletAddress: string
  }
>({
  key: 'genericTokenBalance',
  get:
    ({ walletAddress, ...params }) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      let balance = '0'
      if (token.type === TokenType.Native) {
        balance = get(
          nativeBalanceSelector({
            address: walletAddress,
            chainId: params.chainId,
          })
        ).amount
      } else if (token.type === TokenType.Cw20) {
        balance = get(
          Cw20BaseSelectors.balanceSelector({
            contractAddress: params.denomOrAddress,
            chainId: params.chainId,
            params: [
              {
                address: walletAddress,
              },
            ],
          })
        ).balance
      }

      return {
        token,
        balance,
      }
    },
})

export const genericTokenDelegatedBalanceSelector = selectorFamily<
  GenericTokenBalance,
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'genericTokenDelegatedBalance',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      const { denom, amount: balance } = get(
        nativeDelegatedBalanceSelector({
          chainId,
          address: walletAddress,
        })
      )
      const token = get(
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )

      return {
        token,
        balance,
      }
    },
})

export const nativeDenomMetadataInfoSelector = selectorFamily<
  | {
      symbol: string
      decimals: number
    }
  | undefined,
  WithChainId<{ denom: string }>
>({
  key: 'nativeDenomMetadataInfo',
  get:
    (params) =>
    async ({ get }) => {
      const metadata = get(denomMetadataSelector(params))
      if (!metadata) {
        return
      }

      const { base, denomUnits, symbol, display } = metadata

      const displayDenom =
        denomUnits.find(({ denom }) => denom === display) ??
        denomUnits.find(({ exponent }) => exponent > 0) ??
        denomUnits[0]

      if (!displayDenom) {
        throw new Error('No denom unit found for token factory denom')
      }

      return {
        symbol: symbol || display || base,
        decimals: displayDenom.exponent,
      }
    },
})

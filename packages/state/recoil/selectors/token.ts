import { constSelector, selectorFamily, waitForAll } from 'recoil'

import {
  GenericToken,
  GenericTokenBalance,
  GenericTokenWithUsdPrice,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidContractAddress,
  isValidTokenFactoryDenom,
  isValidWalletAddress,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import {
  denomMetadataSelector,
  nativeBalanceSelector,
  nativeBalancesSelector,
} from './chain'
import { Cw20BaseSelectors, DaoCoreV2Selectors } from './contracts'
import { walletCw20BalancesSelector } from './wallet'
import { wyndUsdPriceSelector } from './wynd'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  WithChainId<Pick<GenericToken, 'type' | 'denomOrAddress'>>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    async ({ get }) => {
      const tokenInfo = get(
        type === TokenType.Cw20
          ? Cw20BaseSelectors.tokenInfoSelector({
              contractAddress: denomOrAddress,
              chainId,
              params: [],
            })
          : // Native factory tokens.
          isValidTokenFactoryDenom(denomOrAddress, CHAIN_BECH32_PREFIX)
          ? factoryTokenInfoSelector({
              denom: denomOrAddress,
              chainId,
            })
          : // Native IBC tokens.
            constSelector({
              decimals: nativeTokenDecimals(denomOrAddress) ?? 0,
              symbol: nativeTokenLabel(denomOrAddress),
            })
      )
      const imageUrl =
        get(
          type === TokenType.Cw20
            ? Cw20BaseSelectors.logoUrlSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            : constSelector(nativeTokenLogoURI(denomOrAddress) ?? '')
        ) || getFallbackImage(denomOrAddress)

      return {
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
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
      const { amount, timestamp } =
        get(wyndUsdPriceSelector(token.denomOrAddress)) ?? {}

      return {
        token,
        usdPrice: amount,
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

      const cw20TokenBalances =
        !filter || filter === TokenType.Cw20
          ? get(
              isValidContractAddress(address, CHAIN_BECH32_PREFIX)
                ? DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
                    contractAddress: address,
                    governanceTokenAddress: cw20GovernanceTokenAddress,
                    chainId,
                  })
                : isValidWalletAddress(address, CHAIN_BECH32_PREFIX)
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

export const factoryTokenInfoSelector = selectorFamily<
  {
    symbol: string
    decimals: number
  },
  WithChainId<{ denom: string }>
>({
  key: 'factoryTokenInfo',
  get:
    (params) =>
    async ({ get }) => {
      const { base, denomUnits, symbol } = get(denomMetadataSelector(params))

      // `display` field not yet updated to point to the correct denom unit, so
      // use the first one with nonzero decimals if it exists, and the first
      // otherwise.
      const displayDenom =
        denomUnits.find((unit) => unit.exponent > 0) || denomUnits[0]
      if (!displayDenom) {
        throw new Error('No denom unit found for token factory denom')
      }

      return {
        symbol: symbol || base,
        decimals: displayDenom.exponent,
      }
    },
})

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
  isValidWalletAddress,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { nativeBalanceSelector, nativeBalancesSelector } from './chain'
import {
  Cw20BaseSelectors,
  Cw20StakeSelectors,
  DaoCoreV2Selectors,
} from './contracts'
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
          : constSelector({
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

// Returns a list of DAOs that use the given cw20 token as their governance
// token with the staked balance of the given wallet address for each.
export const cw20TokenDaosWithStakedBalanceSelector = selectorFamily<
  {
    coreAddress: string
    stakingContractAddress: string
    stakedBalance: number
  }[],
  WithChainId<{
    cw20Address: string
    walletAddress: string
  }>
>({
  key: 'cw20TokenDaosWithStakedBalance',
  get:
    ({ cw20Address, walletAddress, chainId }) =>
    ({ get }) => {
      const daos = get(
        Cw20BaseSelectors.daosWithVotingAndStakingContractSelector({
          chainId,
          contractAddress: cw20Address,
        })
      )

      const daosWalletStakedTokens = get(
        waitForAll(
          daos.map(({ stakingContractAddress }) =>
            Cw20StakeSelectors.stakedValueSelector({
              chainId,
              contractAddress: stakingContractAddress,
              params: [
                {
                  address: walletAddress,
                },
              ],
            })
          )
        )
      )

      const daosWithBalances = daos
        .map(({ coreAddress, stakingContractAddress }, index) => ({
          coreAddress,
          stakingContractAddress,
          stakedBalance: Number(daosWalletStakedTokens[index].value),
        }))
        // Sort descending by staked tokens.
        .sort((a, b) => b.stakedBalance - a.stakedBalance)

      return daosWithBalances
    },
})

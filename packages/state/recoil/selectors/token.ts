import { constSelector, selectorFamily, waitForAll } from 'recoil'

import { GenericToken, TokenType, WithChainId } from '@dao-dao/types'
import {
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { Cw20BaseSelectors, Cw20StakeSelectors } from './contracts'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  WithChainId<{
    type: TokenType
    denomOrAddress: string
  }>
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
          contractAddress: cw20Address,
          chainId,
        })
      )

      const daosWalletStakedTokens = get(
        waitForAll(
          daos.map(({ stakingContractAddress }) =>
            Cw20StakeSelectors.stakedValueSelector({
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

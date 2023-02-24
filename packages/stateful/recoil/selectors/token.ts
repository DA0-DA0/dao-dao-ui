import { selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  walletCw20BalancesSelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state'
import {
  GenericToken,
  GenericTokenBalance,
  TokenCardLazyInfo,
  UnstakingTaskStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  isValidContractAddress,
  isValidWalletAddress,
} from '@dao-dao/utils'

export const tokenCardLazyInfoSelector = selectorFamily<
  TokenCardLazyInfo,
  WithChainId<{
    walletAddress: string
    token: GenericToken
  }>
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ walletAddress, token, chainId }) =>
    ({ get }) => {
      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined

      const usdUnitPrice = get(wyndUsdPriceSelector(token.denomOrAddress))

      // For now, stakingInfo only exists for native token, until ICA.
      if (token.denomOrAddress === NATIVE_DENOM) {
        const nativeDelegationInfo = get(
          nativeDelegationInfoSelector({ address: walletAddress, chainId })
        )

        if (nativeDelegationInfo) {
          const unstakingDurationSeconds = get(
            nativeUnstakingDurationSecondsSelector({
              chainId,
            })
          )

          stakingInfo = {
            unstakingTasks: nativeDelegationInfo.unbondingDelegations.map(
              ({ balance, finishesAt }) => ({
                token,
                status: UnstakingTaskStatus.Unstaking,
                amount: convertMicroDenomToDenomWithDecimals(
                  balance.amount,
                  token.decimals
                ),
                date: finishesAt,
              })
            ),
            unstakingDurationSeconds,
            stakes: nativeDelegationInfo.delegations.map(
              ({ validator, delegated, pendingReward }) => ({
                token,
                validator,
                amount: convertMicroDenomToDenomWithDecimals(
                  delegated.amount,
                  token.decimals
                ),
                rewards: convertMicroDenomToDenomWithDecimals(
                  pendingReward.amount,
                  token.decimals
                ),
              })
            ),
          }
        }
      }

      return {
        usdUnitPrice,
        stakingInfo,
      }
    },
})

export const genericTokenBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'genericTokenBalances',
  get:
    ({ address, cw20GovernanceTokenAddress, chainId }) =>
    async ({ get }) => {
      const nativeTokenBalances = get(
        nativeBalancesSelector({
          address,
          chainId,
        })
      )

      const cw20TokenBalances = get(
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

      return [...nativeTokenBalances, ...cw20TokenBalances]
    },
})

import { noWait, selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  cw20TokenDaosWithStakedBalanceSelector,
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
  TokenType,
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
    // For calculating totalBalance.
    unstakedBalance: number
  }>
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ walletAddress, token, chainId, unstakedBalance }) =>
    ({ get }) => {
      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined
      let daosGoverned: TokenCardLazyInfo['daosGoverned'] = undefined

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

          const unstakingTasks = nativeDelegationInfo.unbondingDelegations.map(
            ({ balance, finishesAt }) => ({
              token,
              status: UnstakingTaskStatus.Unstaking,
              amount: convertMicroDenomToDenomWithDecimals(
                balance.amount,
                token.decimals
              ),
              date: finishesAt,
            })
          )

          const stakes = nativeDelegationInfo.delegations.map(
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
          )

          const totalStaked =
            stakes.reduce((acc, stake) => acc + stake.amount, 0) ?? 0
          const totalPendingRewards =
            stakes?.reduce((acc, stake) => acc + stake.rewards, 0) ?? 0
          const totalUnstaking =
            unstakingTasks.reduce(
              (acc, task) =>
                acc +
                // Only include balance of unstaking tasks.
                (task.status === UnstakingTaskStatus.Unstaking
                  ? task.amount
                  : 0),
              0
            ) ?? 0

          stakingInfo = {
            unstakingTasks,
            unstakingDurationSeconds,
            stakes,
            totalStaked,
            totalPendingRewards,
            totalUnstaking,
          }
        }
      }

      if (token.type === TokenType.Cw20 && walletAddress) {
        const daosGovernedLoading = get(
          noWait(
            cw20TokenDaosWithStakedBalanceSelector({
              cw20Address: token.denomOrAddress,
              walletAddress,
            })
          )
        )

        if (daosGovernedLoading.state === 'hasValue') {
          daosGoverned = daosGovernedLoading.contents.map(
            ({ stakedBalance, ...rest }) => ({
              ...rest,
              // Convert to expected denom.
              stakedBalance: convertMicroDenomToDenomWithDecimals(
                stakedBalance,
                token.decimals
              ),
            })
          )
        }
      }

      const totalBalance =
        unstakedBalance +
        // Add staked and unstaking balances.
        (stakingInfo
          ? stakingInfo.totalStaked + stakingInfo.totalUnstaking
          : 0) +
        // Add balances staked in DAOs.
        (daosGoverned?.reduce(
          (acc, { stakedBalance }) => acc + (stakedBalance ?? 0),
          0
        ) || 0)

      return {
        usdUnitPrice,
        stakingInfo,
        totalBalance,
        daosGoverned,
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

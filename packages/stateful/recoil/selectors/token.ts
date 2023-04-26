import { selectorFamily } from 'recoil'

import {
  cw20TokenDaosWithStakedBalanceSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state'
import {
  GenericToken,
  TokenCardLazyInfo,
  TokenType,
  UnstakingTaskStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

export const tokenCardLazyInfoSelector = selectorFamily<
  TokenCardLazyInfo,
  WithChainId<{
    owner: string
    token: GenericToken
    // For calculating totalBalance.
    unstakedBalance: number
  }>
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ owner, token, chainId, unstakedBalance }) =>
    ({ get }) => {
      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined
      let daosGoverned: TokenCardLazyInfo['daosGoverned'] = undefined

      const usdUnitPrice = get(wyndUsdPriceSelector(token.denomOrAddress))

      // Staking info only exists for native token.
      if (
        token.denomOrAddress ===
        getNativeTokenForChainId(chainId).denomOrAddress
      ) {
        const nativeDelegationInfo = get(
          nativeDelegationInfoSelector({
            address: owner,
            chainId,
          })
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

      if (token.type === TokenType.Cw20 && owner) {
        daosGoverned = get(
          cw20TokenDaosWithStakedBalanceSelector({
            chainId,
            cw20Address: token.denomOrAddress,
            walletAddress: owner,
          })
        ).map(({ stakedBalance, ...rest }) => ({
          ...rest,
          // Convert to expected denom.
          stakedBalance: convertMicroDenomToDenomWithDecimals(
            stakedBalance,
            token.decimals
          ),
        }))
      }

      const totalBalance =
        unstakedBalance +
        // Add staked and unstaking balances.
        (stakingInfo
          ? stakingInfo.totalStaked + stakingInfo.totalUnstaking
          : 0) +
        // Add balances staked in DAOs, grouped by their
        // `stakingContractAddress` so we don't double-count tokens staked with
        // the same staking contract if that staking contract is used in
        // different DAOs in the list.
        Object.values(
          daosGoverned?.reduce(
            (acc, { stakingContractAddress, stakedBalance = 0 }) => ({
              ...acc,
              // If the staking contract address is already in the accumulator,
              // overwrite so we don't double-count. All staked balances for the
              // same staking contract should be the same, so overwriting should
              // do nothing.
              [stakingContractAddress]: stakedBalance,
            }),
            {} as Record<string, number>
          ) || {}
        ).reduce((acc, stakedBalance) => acc + stakedBalance, 0)

      return {
        usdUnitPrice,
        stakingInfo,
        totalBalance,
        daosGoverned,
      }
    },
})

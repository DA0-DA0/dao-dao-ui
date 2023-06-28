import { selectorFamily, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakeSelectors,
  DaoCoreV2Selectors,
  DaoVotingNativeStakedSelectors,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  queryGenericIndexerSelector,
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
  NATIVE_TOKEN,
  convertMicroDenomToDenomWithDecimals,
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
      if (token.denomOrAddress === NATIVE_TOKEN.denomOrAddress) {
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

      if (walletAddress) {
        daosGoverned = get(
          tokenDaosWithStakedBalanceSelector({
            type: token.type,
            denomOrAddress: token.denomOrAddress,
            walletAddress,
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

// Get DAOs that use this native token as their governance token from the
// indexer, and load their dao-voting-native-staked contracts.
export const daosWithNativeVotingContractSelector = selectorFamily<
  {
    coreAddress: string
    votingModuleAddress: string
  }[],
  WithChainId<{
    denom: string
  }>
>({
  key: 'daosWithNativeVotingContract',
  get:
    ({ denom, chainId }) =>
    ({ get }) => {
      const daos: string[] =
        get(
          queryGenericIndexerSelector({
            chainId,
            formula: 'token/daos',
            args: {
              denom,
            },
          })
        ) ?? []
      const votingModuleAddresses = get(
        waitForAll(
          daos.map((contractAddress) =>
            DaoCoreV2Selectors.votingModuleSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      )

      return daos.map((coreAddress, index) => ({
        coreAddress,
        votingModuleAddress: votingModuleAddresses[index],
      }))
    },
})

// Returns a list of DAOs that use the given cw20 token as their governance
// token with the staked balance of the given wallet address for each.
export const tokenDaosWithStakedBalanceSelector = selectorFamily<
  {
    coreAddress: string
    stakingContractAddress: string
    stakedBalance: number
  }[],
  WithChainId<{
    type: TokenType
    denomOrAddress: string
    walletAddress: string
  }>
>({
  key: 'tokenDaosWithStakedBalance',
  get:
    ({ type, denomOrAddress, walletAddress, chainId }) =>
    ({ get }) => {
      const daos =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.daosWithVotingAndStakingContractSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            )
          : get(
              daosWithNativeVotingContractSelector({
                denom: denomOrAddress,
                chainId,
              })
            ).map((daoWithContracts) => ({
              ...daoWithContracts,
              stakingContractAddress: daoWithContracts.votingModuleAddress,
            }))

      const daosWalletStakedTokens = get(
        waitForAll(
          daos.map(({ stakingContractAddress }) =>
            type === TokenType.Cw20
              ? Cw20StakeSelectors.stakedValueSelector({
                  contractAddress: stakingContractAddress,
                  chainId,
                  params: [
                    {
                      address: walletAddress,
                    },
                  ],
                })
              : DaoVotingNativeStakedSelectors.votingPowerAtHeightSelector({
                  contractAddress: stakingContractAddress,
                  chainId,
                  params: [
                    {
                      address: walletAddress,
                    },
                  ],
                })
          )
        )
      ).map((staked) => ('value' in staked ? staked.value : staked.power))

      const daosWithBalances = daos
        .map(({ coreAddress, stakingContractAddress }, index) => ({
          coreAddress,
          stakingContractAddress,
          stakedBalance: Number(daosWalletStakedTokens[index]),
        }))
        // Sort descending by staked tokens.
        .sort((a, b) => b.stakedBalance - a.stakedBalance)

      return daosWithBalances
    },
})

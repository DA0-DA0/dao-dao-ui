import { selectorFamily, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  DaoCoreV2Selectors,
  cw20TokenDaosWithStakedBalanceSelector,
  genericTokenSelector,
  nativeBalanceSelector,
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
  NATIVE_TOKEN,
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

      if (token.type === TokenType.Cw20 && walletAddress) {
        daosGoverned = get(
          cw20TokenDaosWithStakedBalanceSelector({
            cw20Address: token.denomOrAddress,
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

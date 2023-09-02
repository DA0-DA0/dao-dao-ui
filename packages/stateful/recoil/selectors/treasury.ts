import { noWait, selectorFamily } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import { TokenCardInfo, WithChainId } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

// lazyInfo must be loaded in the component separately, since it refreshes on a
// timer and we don't want this whole selector to reevaluate and load when that
// refreshes. Use `tokenCardLazyInfoSelector`.
export const treasuryTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
    nativeGovernanceTokenDenom?: string
  }>
>({
  key: 'treasuryTokenCardInfos',
  get:
    ({
      chainId,
      coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }) =>
    ({ get }) => {
      const nativeBalances = get(
        nativeBalancesSelector({
          address: coreAddress,
          chainId,
        })
      )

      // Only cw20s on native chain.
      const cw20sLoadable = get(
        noWait(
          DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
            contractAddress: coreAddress,
            chainId,
            governanceTokenAddress: cw20GovernanceTokenAddress,
          })
        )
      )
      const cw20s =
        cw20sLoadable.state === 'hasValue' ? cw20sLoadable.contents : []

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(({ token, balance }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          // Staking info only exists for native token.
          const hasStakingInfo =
            token.denomOrAddress ===
              getNativeTokenForChainId(chainId).denomOrAddress &&
            // Check if anything staked.
            Number(
              get(
                nativeDelegatedBalanceSelector({
                  address: coreAddress,
                  chainId,
                })
              ).amount
            ) > 0

          const info: TokenCardInfo = {
            owner: coreAddress,
            token,
            // True if native token DAO and using this denom.
            isGovernanceToken:
              nativeGovernanceTokenDenom === token.denomOrAddress,
            unstakedBalance,
            hasStakingInfo,

            lazyInfo: { loading: true },
          }

          return info
        }),
        ...cw20s.map(({ token, balance, isGovernanceToken }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          const info: TokenCardInfo = {
            owner: coreAddress,
            token,
            isGovernanceToken: isGovernanceToken ?? false,
            unstakedBalance,
            // No unstaking info for CW20.
            hasStakingInfo: false,

            lazyInfo: { loading: true },
          }

          return info
        }),
      ]

      return infos
    },
})

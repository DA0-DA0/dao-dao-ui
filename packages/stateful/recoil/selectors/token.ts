import { selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
  walletCw20BalancesSelector,
} from '@dao-dao/state/recoil'
import { GenericTokenBalance, WithChainId } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  isValidContractAddress,
  isValidWalletAddress,
} from '@dao-dao/utils'

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

import { selectorFamily } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state/recoil'
import { GenericTokenBalance, WithChainId } from '@dao-dao/types'
import { CHAIN_BECH32_PREFIX, isValidContractAddress } from '@dao-dao/utils'

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

      const cw20TokenBalances = isValidContractAddress(
        address,
        CHAIN_BECH32_PREFIX
      )
        ? get(
            DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
              contractAddress: address,
              governanceTokenAddress: cw20GovernanceTokenAddress,
              chainId,
            })
          )
        : // TODO: Index wallet CW20s and load them here.
          []

      return [...(nativeTokenBalances || []), ...(cw20TokenBalances || [])]
    },
})

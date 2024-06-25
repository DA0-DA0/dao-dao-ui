import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  AccountType,
  GenericToken,
  TokenType,
  ValenceAccount,
  WithChainId,
} from '@dao-dao/types'
import { getSupportedChainConfig } from '@dao-dao/utils'

import { ValenceServiceRebalancerSelectors } from './contracts'
import { queryWalletIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

// Retrieve the valence accounts owned by a given address.
export const valenceAccountsSelector = selectorFamily<
  ValenceAccount[],
  WithChainId<{ address: string }>
>({
  key: 'valenceAccounts',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      // Get valence accounts from indexer.
      const valenceAccountAddresses = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress: address,
          formula: 'valence/accounts',
        })
      )
      if (!valenceAccountAddresses || !Array.isArray(valenceAccountAddresses)) {
        return []
      }

      return get(
        waitForAll(
          valenceAccountAddresses.map((address) =>
            valenceAccountSelector({
              chainId,
              address,
            })
          )
        )
      )
    },
})

// Retrieve the valence account config for this valence account.
export const valenceAccountSelector = selectorFamily<
  ValenceAccount,
  WithChainId<{ address: string }>
>({
  key: 'valenceAccount',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const rebalancerAddress =
        getSupportedChainConfig(chainId)?.valence?.rebalancer

      const rebalancerConfig = rebalancerAddress
        ? get(
            waitForAllSettled([
              // This will error when no rebalancer is configured.
              ValenceServiceRebalancerSelectors.getConfigSelector({
                contractAddress: rebalancerAddress,
                chainId,
                params: [
                  {
                    addr: address,
                  },
                ],
              }),
            ])
          ).map((loadable) =>
            loadable.state === 'hasValue' ? loadable.contents : null
          )[0]
        : null

      const uniqueDenoms =
        rebalancerConfig?.targets.map(({ denom }) => denom) || []
      // Map token denom to token.
      const tokenMap = get(
        waitForAll(
          uniqueDenoms.map((denom) =>
            genericTokenSelector({
              type: TokenType.Native,
              chainId,
              denomOrAddress: denom,
            })
          )
        )
      ).reduce(
        (acc, token) => ({
          ...acc,
          [token.denomOrAddress]: token,
        }),
        {} as Record<string, GenericToken>
      )

      const account: ValenceAccount = {
        type: AccountType.Valence,
        chainId,
        address,
        config: {
          rebalancer: rebalancerConfig && {
            config: rebalancerConfig,
            targets: rebalancerConfig.targets.map((target) => ({
              token: tokenMap[target.denom],
              // TODO(rebalancer): Get targets over time.
              targets: [
                {
                  timestamp: 0,
                  ...target,
                },
              ],
            })),
          },
        },
      }

      return account
    },
})

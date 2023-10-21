import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  AccountType,
  GenericToken,
  TokenType,
  ValenceAccount,
  ValenceAccountConfig,
  WithChainId,
} from '@dao-dao/types'
import { getSupportedChainConfig } from '@dao-dao/utils'

import { ValenceServiceRebalancerSelectors } from './contracts'
import { queryWalletIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

// Retrieve the valence accounts for a given address.
export const valenceAccountsSelector = selectorFamily<
  ValenceAccount[],
  WithChainId<{ address: string }>
>({
  key: 'valenceAccounts',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const rebalancerAddress =
        getSupportedChainConfig(chainId)?.valence?.rebalancer

      // Get valence accounts from indexer.
      const valenceAccountAddresses = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress: address,
          formula: 'valence/accounts',
          required: true,
        })
      )
      if (!valenceAccountAddresses || !Array.isArray(valenceAccountAddresses)) {
        return []
      }

      const rebalancerConfigs = rebalancerAddress
        ? get(
            waitForAllSettled(
              valenceAccountAddresses.map((addr) =>
                // This will error when no rebalancer is configured.
                ValenceServiceRebalancerSelectors.getConfigSelector({
                  contractAddress: rebalancerAddress,
                  chainId,
                  params: [
                    {
                      addr,
                    },
                  ],
                })
              )
            )
          ).flatMap((loadable) =>
            loadable.state === 'hasValue' ? loadable.contents : []
          )
        : undefined

      const uniqueDenoms = [
        ...new Set(
          rebalancerConfigs?.flatMap((config) =>
            config.targets.map(({ denom }) => denom)
          ) ?? []
        ),
      ]
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

      const accounts = valenceAccountAddresses.map(
        (address): ValenceAccount => {
          const rebalancerConfig = rebalancerConfigs?.[address]

          const config: ValenceAccountConfig = {
            rebalancer: rebalancerConfig && {
              config: rebalancerConfig,
              targets: rebalancerConfig.targets.map((target) => ({
                source: tokenMap[target.denom].source,
                // TODO(rebalancer): Get targets over time.
                targets: [
                  {
                    timestamp: 0,
                    ...target,
                  },
                ],
              })),
            },
          }

          return {
            type: AccountType.Valence,
            chainId,
            address,
            config,
          }
        }
      )

      return accounts
    },
})

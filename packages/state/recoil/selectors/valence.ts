import { selectorFamily } from 'recoil'

import {
  AccountType,
  ChainId,
  ValenceAccount,
  ValenceAccountConfig,
  WithChainId,
} from '@dao-dao/types'

import { queryWalletIndexerSelector } from './indexer'

// Retrieve the valence accounts for a given address.
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
          required: true,
        })
      )
      if (!valenceAccountAddresses || !Array.isArray(valenceAccountAddresses)) {
        return []
      }

      const accounts = valenceAccountAddresses.map(
        (address): ValenceAccount => {
          // TODO(rebalancer): Get config
          const config: ValenceAccountConfig = {
            rebalancer: {
              targets: [
                {
                  source: {
                    chainId: ChainId.NeutronMainnet,
                    denomOrAddress: 'untrn',
                  },
                  targets: [
                    {
                      timestamp: 0,
                      target: 0.75,
                    },
                  ],
                },
                {
                  source: {
                    chainId: 'axelar-dojo-1',
                    denomOrAddress: 'uusdc',
                  },
                  targets: [
                    {
                      timestamp: 0,
                      target: 0.25,
                    },
                  ],
                },
              ],
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

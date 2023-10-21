import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  Account,
  AccountType,
  GenericTokenBalance,
  WithChainId,
} from '@dao-dao/types'

import { isDaoSelector } from './contract'
import { DaoCoreV2Selectors } from './contracts'
import {
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
} from './token'
import { valenceAccountsSelector } from './valence'

// Get accounts controlled by this address, including its native chain, all
// polytone proxies, and all valence accounts.
export const accountsSelector = selectorFamily<
  Account[],
  WithChainId<{ address: string }>
>({
  key: 'accounts',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const isDao = get(
        isDaoSelector({
          chainId,
          address,
        })
      )

      const polytoneProxies = isDao
        ? Object.entries(
            get(
              DaoCoreV2Selectors.polytoneProxiesSelector({
                chainId,
                contractAddress: address,
              })
            )
          )
        : []

      const allAccounts: Account[] = [
        // Current chain.
        {
          chainId,
          address,
          type: AccountType.Native,
        },
        // Polytone.
        ...polytoneProxies.map(
          ([chainId, address]): Account => ({
            chainId,
            address,
            type: AccountType.Polytone,
          })
        ),
      ]

      // Get valence accounts on each potential chain.
      const valenceAccounts = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            valenceAccountsSelector({
              address,
              chainId,
            })
          )
        )
      ).flat()

      // Add valence accounts.
      allAccounts.push(...valenceAccounts)

      return allAccounts
    },
})

export const allBalancesSelector = selectorFamily<
  // Map chain ID to token balances on that chain.
  Record<string, GenericTokenBalance[]>,
  WithChainId<{
    address: string
    // If account is a DAO, set this to the address of its governance token.
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'allBalances',
  get:
    ({ address, cw20GovernanceTokenAddress, chainId }) =>
    ({ get }) => {
      const isDao = get(
        isDaoSelector({
          chainId,
          address,
        })
      )

      const allAccounts = get(
        accountsSelector({
          chainId,
          address,
        })
      )

      // Neutron's modified DAOs do not support cw20s, so this may error. Ignore
      // if so.
      const cw20BalancesLoadable = get(
        waitForAllSettled(
          isDao
            ? [
                DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
                  contractAddress: address,
                  chainId,
                  governanceTokenAddress: cw20GovernanceTokenAddress,
                }),
              ]
            : [constSelector([])]
        )
      )[0]

      const allBalances = [
        // Native balances.
        ...get(
          waitForAll(
            allAccounts.flatMap(({ address, chainId }) => [
              // All unstaked
              genericTokenBalancesSelector({
                chainId,
                address,
              }),
              // Native staked
              genericTokenDelegatedBalanceSelector({
                chainId,
                walletAddress: address,
              }),
            ])
          )
        ).flat(),
        // Cw20s on native chain.
        ...(cw20BalancesLoadable.state === 'hasValue'
          ? cw20BalancesLoadable.contents
          : []),
      ]

      const uniqueChainIds = [
        ...new Set(allAccounts.map(({ chainId }) => chainId)),
      ]

      return uniqueChainIds.reduce(
        (acc, chainId) => ({
          ...acc,
          [chainId]: allBalances.filter(
            ({ token }) => token.chainId === chainId
          ),
        }),
        {} as Record<string, GenericTokenBalance[]>
      )
    },
})

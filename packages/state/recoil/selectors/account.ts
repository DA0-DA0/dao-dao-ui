import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  Account,
  AccountType,
  GenericTokenBalanceWithOwner,
  IcaAccount,
  WithChainId,
} from '@dao-dao/types'

import {
  isDaoSelector,
  isPolytoneProxySelector,
  isValenceAccountSelector,
} from './contract'
import { DaoCoreV2Selectors } from './contracts'
import { icaRemoteAddressSelector } from './ica'
import {
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
} from './token'
import { valenceAccountSelector, valenceAccountsSelector } from './valence'

// Get accounts controlled by this address, including its native chain, all
// polytone proxies, and all valence accounts.
export const accountsSelector = selectorFamily<
  Account[],
  WithChainId<{
    address: string
    // Chain IDs to include accounts from. This will find any ICA accounts, and
    // for wallets, this adds other native accounts.
    includeIcaChains?: string[]
  }>
>({
  key: 'accounts',
  get:
    ({ chainId, address, includeIcaChains }) =>
    ({ get }) => {
      const [isDao, isPolytoneProxy, isValenceAccount] = get(
        waitForAll([
          isDaoSelector({
            chainId,
            address,
          }),
          isPolytoneProxySelector({
            chainId,
            address,
          }),
          isValenceAccountSelector({
            chainId,
            address,
          }),
        ])
      )

      // If this is a DAO, get its polytone proxies.
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

      const mainAccount: Account = isValenceAccount
        ? // If this is a valence account, get its config.
          get(
            valenceAccountSelector({
              chainId,
              address,
            })
          )
        : {
            chainId,
            address,
            type: isPolytoneProxy ? AccountType.Polytone : AccountType.Native,
          }

      const allAccounts: Account[] = [
        // Main account.
        mainAccount,
        // Polytone.
        ...polytoneProxies.map(
          ([chainId, address]): Account => ({
            chainId,
            address,
            type: AccountType.Polytone,
          })
        ),
      ]

      // Get valence accounts controlled by all non-valence accounts.
      const valenceAccounts = get(
        waitForAll(
          allAccounts
            .filter(({ type }) => type !== AccountType.Valence)
            .map(({ chainId, address }) =>
              valenceAccountsSelector({
                address,
                chainId,
              })
            )
        )
      ).flat()

      // Add valence accounts.
      allAccounts.push(...valenceAccounts)

      // Get ICA account addresses controlled by native account.
      const icaAccounts =
        mainAccount.type === AccountType.Native && includeIcaChains?.length
          ? get(
              waitForAll(
                includeIcaChains.map((chainId) =>
                  icaRemoteAddressSelector({
                    srcChainId: mainAccount.chainId,
                    address: mainAccount.address,
                    destChainId: chainId,
                  })
                )
              )
            ).flatMap((address, index): IcaAccount | [] =>
              address
                ? {
                    type: AccountType.Ica,
                    chainId: includeIcaChains[index],
                    address,
                  }
                : []
            )
          : []

      // Add ICA accounts.
      allAccounts.push(...icaAccounts)

      return allAccounts
    },
})

export const allBalancesSelector = selectorFamily<
  // Map chain ID to token balances on that chain.
  Record<string, GenericTokenBalanceWithOwner[]>,
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
      const allAccounts = get(
        accountsSelector({
          chainId,
          address,
        })
      )

      const accountBalances = get(
        waitForAll(
          allAccounts.map(({ address, chainId }) =>
            waitForAllSettled([
              // All unstaked
              genericTokenBalancesSelector({
                chainId,
                address,
                cw20GovernanceTokenAddress,
              }),
              // Native staked
              genericTokenDelegatedBalanceSelector({
                chainId,
                walletAddress: address,
              }),
            ])
          )
        )
      )

      const uniqueChainIds = uniq(allAccounts.map(({ chainId }) => chainId))

      return uniqueChainIds.reduce((acc, chainId) => {
        // Get accounts and balances per account on this chain.
        const chainAccountBalances = allAccounts.flatMap((account, index) => {
          // All unstaked
          const unstakedBalances = accountBalances[index][0].valueMaybe() || []
          // Native staked
          const stakedBalance = accountBalances[index][1].valueMaybe()

          return account.chainId === chainId
            ? {
                account,
                balances: [
                  ...unstakedBalances,
                  ...(stakedBalance
                    ? [
                        {
                          ...stakedBalance,
                          staked: true,
                        },
                      ]
                    : []),
                ],
              }
            : []
        })

        return {
          ...acc,
          [chainId]: chainAccountBalances.flatMap(({ account, balances }) =>
            balances.map(
              (balance): GenericTokenBalanceWithOwner => ({
                ...balance,
                owner: account,
              })
            )
          ),
        }
      }, {} as Record<string, GenericTokenBalanceWithOwner[]>)
    },
})

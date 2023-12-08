import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  Account,
  AccountType,
  GenericTokenBalanceWithOwner,
  IcaAccount,
  WithChainId,
} from '@dao-dao/types'
import { ICA_CHAINS_TX_PREFIX } from '@dao-dao/utils'

import { isDaoSelector, isPolytoneProxySelector } from './contract'
import { DaoCoreV2Selectors } from './contracts'
import { icaRemoteAddressSelector } from './ica'
import {
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
} from './token'

// Get accounts controlled by this address, including its native chain, all
// polytone proxies, and all ICA accounts.
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
      const [isDao, isPolytoneProxy] = get(
        waitForAll([
          isDaoSelector({
            chainId,
            address,
          }),
          isPolytoneProxySelector({
            chainId,
            address,
          }),
        ])
      )

      // If this is a DAO, get its polytone proxies and registered ICAs.
      const [polytoneProxies, registeredIcas] = isDao
        ? get(
            waitForAll([
              DaoCoreV2Selectors.polytoneProxiesSelector({
                chainId,
                contractAddress: address,
              }),
              DaoCoreV2Selectors.listAllItemsWithPrefixSelector({
                chainId,
                contractAddress: address,
                prefix: ICA_CHAINS_TX_PREFIX,
              }),
            ])
          )
        : []

      const mainAccount: Account = {
        chainId,
        address,
        type: isPolytoneProxy ? AccountType.Polytone : AccountType.Native,
      }

      const allAccounts: Account[] = [
        // Main account.
        mainAccount,
        // Polytone.
        ...Object.entries(polytoneProxies || {}).map(
          ([chainId, address]): Account => ({
            chainId,
            address,
            type: AccountType.Polytone,
          })
        ),
      ]

      // If main account is native, load ICA accounts.
      const icaChains =
        mainAccount.type === AccountType.Native
          ? [
              ...(registeredIcas || []).map(([key]) =>
                key.replace(ICA_CHAINS_TX_PREFIX, '')
              ),
              ...(includeIcaChains || []),
            ]
          : []

      // Get ICA addresses controlled by native account.
      const icas = icaChains.length
        ? get(
            waitForAll(
              icaChains.map((chainId) =>
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
                  chainId: icaChains[index],
                  address,
                }
              : []
          )
        : []

      // Add ICA accounts.
      allAccounts.push(...icas)

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

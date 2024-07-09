import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  Account,
  AccountType,
  GenericToken,
  GenericTokenBalanceWithOwner,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import { POLYTONE_CONFIG_PER_CHAIN, tokensEqual } from '@dao-dao/utils'

import { accountQueries } from '../../query'
import { queryClientAtom } from '../atoms'
import { PolytoneProxySelectors } from './contracts'
import {
  genericTokenBalanceSelector,
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
  genericTokenUndelegatingBalancesSelector,
} from './token'

/**
 * Fetch the list of accounts associated with the specified address, with
 * support for:
 * - detecting if the address is a polytone proxy
 * - automatically loading a DAO's registered ICAs
 */
export const accountsSelector = selectorFamily<
  Account[],
  WithChainId<{
    address: string
    // Chain IDs to include ICAs from.
    includeIcaChains?: string[]
  }>
>({
  key: 'accounts',
  get:
    ({ chainId, address, includeIcaChains }) =>
    ({ get }) => {
      const queryClient = get(queryClientAtom)
      return queryClient.fetchQuery(
        accountQueries.list(queryClient, {
          chainId,
          address,
          ...(includeIcaChains && { includeIcaChains }),
        })
      )
    },
})

export const allBalancesSelector = selectorFamily<
  GenericTokenBalanceWithOwner[],
  WithChainId<{
    address: string
    // If account is a DAO, set this to the denom of its native governance
    // token.
    nativeGovernanceTokenDenom?: string
    // If account is a DAO, set this to the address of its cw20 governance
    // token.
    cw20GovernanceTokenAddress?: string
    // Chain IDs to include ICAs from.
    includeIcaChains?: string[]
    // Only get balances for this token type.
    filter?: TokenType
    // Additional tokens to fetch balances for.
    additionalTokens?: Pick<
      GenericToken,
      'chainId' | 'type' | 'denomOrAddress'
    >[]
    // Ignore staked and unstaking tokens.
    ignoreStaked?: boolean
    // Include only these account types.
    includeAccountTypes?: AccountType[]
    // Exclude these account types.
    excludeAccountTypes?: AccountType[]
  }>
>({
  key: 'allBalances',
  get:
    ({
      chainId: mainChainId,
      address: mainAddress,
      nativeGovernanceTokenDenom,
      cw20GovernanceTokenAddress,
      includeIcaChains,
      filter,
      additionalTokens,
      ignoreStaked,
      includeAccountTypes,
      excludeAccountTypes = [AccountType.Valence],
    }) =>
    ({ get }) => {
      const allAccounts = get(
        accountsSelector({
          chainId: mainChainId,
          address: mainAddress,
          includeIcaChains,
        })
      ).filter(({ type }) => {
        if (includeAccountTypes) {
          return includeAccountTypes.includes(type)
        }
        if (excludeAccountTypes) {
          return !excludeAccountTypes.includes(type)
        }
        return true
      })

      const accountBalances = get(
        waitForAll(
          allAccounts.map(({ address, chainId }) =>
            waitForAllSettled([
              // All unstaked
              genericTokenBalancesSelector({
                chainId: mainChainId,
                address: mainAddress,
                nativeGovernanceTokenDenom:
                  chainId === mainChainId
                    ? nativeGovernanceTokenDenom
                    : undefined,
                cw20GovernanceTokenAddress:
                  chainId === mainChainId
                    ? cw20GovernanceTokenAddress
                    : undefined,
                filter: {
                  tokenType: filter,
                  account: {
                    chainId,
                    address,
                  },
                },
              }),
              // Additional unstaked tokens on this account's chain.
              waitForAllSettled(
                (additionalTokens || [])
                  .filter((token) => token.chainId === chainId)
                  .map((token) =>
                    genericTokenBalanceSelector({
                      ...token,
                      address,
                    })
                  )
              ),
              // Native staked
              (!filter || filter === TokenType.Native) && !ignoreStaked
                ? genericTokenDelegatedBalanceSelector({
                    chainId,
                    address,
                  })
                : constSelector(undefined),
              // Native unstaking
              (!filter || filter === TokenType.Native) && !ignoreStaked
                ? genericTokenUndelegatingBalancesSelector({
                    chainId,
                    address,
                  })
                : constSelector(undefined),
            ])
          )
        )
      )

      return allAccounts.flatMap((owner, index) => {
        // All unstaked
        const unstakedBalances = accountBalances[index][0].valueMaybe() || []
        // Additional unstaked
        const additionalUnstakedBalances =
          accountBalances[index][1]
            .valueMaybe()
            ?.flatMap((loadable) => loadable.valueMaybe() || [])
            // Remove any tokens that are already in unstakedBalances.
            .filter(
              (a) =>
                !unstakedBalances.some((b) => tokensEqual(a.token, b.token))
            ) || []

        // Native staked
        const stakedBalance = accountBalances[index][2].valueMaybe()
        // Native unstaking
        const unstakingBalances = accountBalances[index][3].valueMaybe()

        const balances = [
          ...unstakedBalances,
          ...additionalUnstakedBalances,
          ...(stakedBalance ? [stakedBalance] : []),
          ...(unstakingBalances ?? []),
        ]

        return balances.map(
          (balance): GenericTokenBalanceWithOwner => ({
            ...balance,
            owner,
          })
        )
      })
    },
})

/**
 * Given a polytone proxy, get the source chain, address, and polytone note.
 */
export const reverseLookupPolytoneProxySelector = selectorFamily<
  | {
      chainId: string
      address: string
      note: string
    }
  | undefined,
  WithChainId<{ proxy: string }>
>({
  key: 'reverseLookupPolytoneProxy',
  get:
    ({ proxy, chainId }) =>
    ({ get }) => {
      // Get voice for this proxy on destination chain.
      const voice = get(
        PolytoneProxySelectors.instantiatorSelector({
          chainId,
          contractAddress: proxy,
          params: [],
        })
      )
      if (!voice) {
        return
      }

      // Get source address for this voice.
      const address = get(
        PolytoneProxySelectors.remoteControllerForPolytoneProxySelector({
          chainId,
          voice,
          proxy,
        })
      )
      if (!address) {
        return
      }

      // Get source polytone connection, where the note lives for this voice.
      const srcPolytoneInfo = POLYTONE_CONFIG_PER_CHAIN.find(([, config]) =>
        Object.entries(config).some(
          ([destChainId, connection]) =>
            destChainId === chainId && connection.voice === voice
        )
      )
      if (!srcPolytoneInfo) {
        return
      }

      return {
        chainId: srcPolytoneInfo[0],
        address,
        note: srcPolytoneInfo[1][chainId].note,
      }
    },
})

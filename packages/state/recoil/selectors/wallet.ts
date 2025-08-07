import {
  Loadable,
  noWait,
  selectorFamily,
  waitForAll,
  waitForAny,
} from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  AccountType,
  LazyNftCardInfo,
  TokenCardInfo,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import { getNativeTokenForChainId, loadableToLoadingData } from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms'
import { accountsSelector } from './account'
import { nativeBalancesSelector, nativeDelegatedBalanceSelector } from './chain'
import { queryAccountIndexerSelector } from './indexer'
import {
  walletLazyNftCardInfosSelector,
  walletStakedLazyNftCardInfosSelector,
} from './nft'
import { genericTokenSelector, tokenCardLazyInfoSelector } from './token'

// lazyInfo must be loaded in the component separately, since it refreshes on a
// timer and we don't want this whole selector to reevaluate and load when that
// refreshes. Use `tokenCardLazyInfoSelector`.
export const walletTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'walletTokenCardInfos',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(walletAddress))

      const allAccounts = get(
        accountsSelector({
          chainId,
          address: walletAddress,
        })
      )

      const nativeBalances = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            nativeBalancesSelector({
              address,
              chainId,
            })
          )
        )
      )
      const cw20ContractsLoadable: Loadable<
        | {
            contractAddress: string
            balance: string | undefined
          }[]
        | undefined
      > = get(
        noWait(
          queryAccountIndexerSelector({
            chainId,
            walletAddress,
            formula: 'tokens/list',
            id,
            noFallback: true,
          })
        )
      )
      const cw20Contracts =
        cw20ContractsLoadable.state === 'hasValue'
          ? (cw20ContractsLoadable.contents ?? [])
          : []
      const cw20s = get(
        noWait(
          waitForAny(
            cw20Contracts.map((c) =>
              genericTokenSelector({
                type: TokenType.Cw20,
                denomOrAddress: c.contractAddress,
                chainId,
              })
            )
          )
        )
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.flatMap((accountBalances, accountIndex) =>
          accountBalances.map(({ token, balance }) => {
            // Staking info only exists for native token.
            const hasStakingInfo =
              token.denomOrAddress ===
                getNativeTokenForChainId(chainId).denomOrAddress &&
              // Check if anything staked.
              HugeDecimal.from(
                get(
                  nativeDelegatedBalanceSelector({
                    address: walletAddress,
                    chainId,
                  })
                ).amount
              ).isPositive()

            const owner = allAccounts[accountIndex]

            const lazyInfo = get(
              noWait(
                tokenCardLazyInfoSelector({
                  owner: owner.address,
                  token,
                  unstakedBalance: balance,
                })
              )
            )

            const info: TokenCardInfo = {
              owner,
              token,
              isGovernanceToken: false,
              unstakedBalance: HugeDecimal.from(balance),
              hasStakingInfo,
              lazyInfo: loadableToLoadingData(lazyInfo, {
                usdUnitPrice: undefined,
                stakingInfo: undefined,
                totalBalance: HugeDecimal.from(balance),
              }),
            }

            return info
          })
        ),
        ...(cw20s.valueMaybe() || []).flatMap((tokenLoadable, index) => {
          const token = tokenLoadable.valueMaybe()
          if (!token) {
            return []
          }

          const unstakedBalance = HugeDecimal.from(
            cw20Contracts[index].balance || 0
          )

          const lazyInfo = get(
            noWait(
              tokenCardLazyInfoSelector({
                owner: walletAddress,
                token,
                unstakedBalance: unstakedBalance.toString(),
              })
            )
          )

          const info: TokenCardInfo = {
            owner: {
              type: AccountType.Base,
              chainId,
              address: walletAddress,
            },
            token,
            isGovernanceToken: false,
            unstakedBalance,
            // No unstaking info for CW20.
            hasStakingInfo: false,
            lazyInfo: loadableToLoadingData(lazyInfo, {
              usdUnitPrice: undefined,
              stakingInfo: undefined,
              totalBalance: unstakedBalance,
            }),
          }

          return info
        }),
      ]

      return infos
    },
})

// Get NFTs for a wallet on many chains.
export const allWalletNftsSelector = selectorFamily<
  LazyNftCardInfo[],
  {
    chainId: string
    walletAddress: string
  }[]
>({
  key: 'allWalletNfts',
  get:
    (chainWallets) =>
    ({ get }) => {
      const nativeNfts = get(
        waitForAll(
          chainWallets.map(({ chainId, walletAddress }) =>
            walletLazyNftCardInfosSelector({
              chainId,
              walletAddress,
            })
          )
        )
      ).reduce(
        (acc, nftCardInfos) => [
          ...acc,
          ...Object.values(nftCardInfos).flatMap((data) =>
            !data || data.loading || data.errored ? [] : data.data
          ),
        ],
        [] as LazyNftCardInfo[]
      )

      const nativeStakedNfts = get(
        waitForAll(
          chainWallets.map(({ chainId, walletAddress }) =>
            walletStakedLazyNftCardInfosSelector({
              chainId,
              walletAddress,
            })
          )
        )
      ).flat()

      return [...nativeNfts, ...nativeStakedNfts]
    },
})

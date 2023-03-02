import { atomFamily, selectorFamily, waitForAll } from 'recoil'

import {
  genericTokenSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  queryWalletIndexerSelector,
  refreshHiddenBalancesAtom,
  refreshSavedTxsAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  MeTransactionSave,
  NftCardInfo,
  TokenCardInfo,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  HIDDEN_BALANCE_PREFIX,
  KVPK_API_BASE,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import {
  walletNftCardInfos,
  walletStakedNftCardInfosSelector,
  walletStargazeNftCardInfosSelector,
} from './nft'

export const SAVED_TX_PREFIX = 'savedTx:'

// This doesn't update right away due to Cloudflare KV Store latency, so this
// serves to keep track of all successful updates for the current session. This
// will be reset on page refresh. Set this right away so the UI can update
// immediately even if the API takes up to a minute or two. Though likely it
// only takes 10 seconds or so.
//
// Takes wallet public key as a parameter.
export const temporarySavedTxsAtom = atomFamily<
  Record<string, MeTransactionSave | null>,
  string
>({
  key: 'temporarySavedTxs',
  default: {},
})

// Takes wallet public key as a parameter.
export const savedTxsSelector = selectorFamily<MeTransactionSave[], string>({
  key: 'savedTxs',
  get:
    (walletPublicKey) =>
    async ({ get }) => {
      get(refreshSavedTxsAtom)

      const temporary = get(temporarySavedTxsAtom(walletPublicKey))

      const response = await fetch(
        KVPK_API_BASE + `/list/${walletPublicKey}/${SAVED_TX_PREFIX}`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: MeTransactionSave
          }[]
        }

        const savedItems = Object.entries(temporary)
        // Add any items that are in the KV store but not in the temporary map.
        items.forEach(({ key, value }) => {
          if (!(key in temporary)) {
            savedItems.push([key, value])
          }
        })

        const saves = savedItems
          .map(([, value]) => value)
          // If the save is null, it came from the temporary map and means it
          // was deleted, so we need to remove it from the list.
          .filter((save): save is MeTransactionSave => !!save)
          .sort((a, b) => a.name.localeCompare(b.name))

        return saves
      } else {
        throw new Error(
          `Failed to fetch tx saves: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

// This doesn't update right away due to Cloudflare KV Store latency, so this
// serves to keep track of all successful updates for the current session. This
// will be reset on page refresh. Set this right away so the UI can update
// immediately even if the API takes up to a minute or two. Though likely it
// only takes 10 seconds or so.
//
// Takes wallet public key as a parameter.
export const temporaryHiddenBalancesAtom = atomFamily<
  Record<string, number | null>,
  string
>({
  key: 'temporaryHiddenBalances',
  default: {},
})

// Takes wallet public key as a parameter. Return list of token denomOrAddress
// fields that are hidden.
export const hiddenBalancesSelector = selectorFamily<string[], string>({
  key: 'hiddenBalances',
  get:
    (walletPublicKey) =>
    async ({ get }) => {
      get(refreshHiddenBalancesAtom)

      const temporary = get(temporaryHiddenBalancesAtom(walletPublicKey))

      const response = await fetch(
        KVPK_API_BASE + `/list/${walletPublicKey}/${HIDDEN_BALANCE_PREFIX}`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: number | null
          }[]
        }

        const hiddenBalances = Object.entries(temporary)
        // Add any items that are in the KV store but not in the temporary map.
        items.forEach(({ key, value }) => {
          if (!(key in temporary)) {
            hiddenBalances.push([key, value])
          }
        })

        const hidden = hiddenBalances
          .filter(([, value]) => value !== null)
          // Remove prefix so it's just the token's denomOrAddress.
          .map(([key]) => key.replace(HIDDEN_BALANCE_PREFIX, ''))

        return hidden
      } else {
        throw new Error(
          `Failed to fetch hidden balances: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

type ContractWithBalance = {
  contractAddress: string
  balance: string | undefined
}

// TODO: Standardize this with the treasury token cards.
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

      const nativeBalances = get(
        nativeBalancesSelector({ address: walletAddress, chainId })
      )
      const cw20Contracts: ContractWithBalance[] =
        get(
          queryWalletIndexerSelector({
            chainId,
            walletAddress,
            formulaName: 'tokens/list',
            id,
          })
        ) ?? []
      const cw20s = get(
        waitForAll(
          cw20Contracts.map((c) =>
            genericTokenSelector({
              type: TokenType.Cw20,
              denomOrAddress: c.contractAddress,
              chainId,
            })
          )
        )
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(({ token, balance }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          // For now, stakingInfo only exists for native token, until ICA.
          const hasStakingInfo =
            token.denomOrAddress === NATIVE_DENOM &&
            // Check if anything staked.
            Number(
              get(
                nativeDelegatedBalanceSelector({
                  address: walletAddress,
                  chainId,
                })
              ).amount
            ) > 0

          const info: TokenCardInfo = {
            token,
            isGovernanceToken: false,
            unstakedBalance,
            hasStakingInfo,

            lazyInfo: { loading: true },
          }

          return info
        }),
        ...cw20s.map((token, index) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            cw20Contracts[index].balance || '0',
            token.decimals
          )

          const info: TokenCardInfo = {
            token,
            isGovernanceToken: false,
            unstakedBalance,
            // No unstaking info for CW20.
            hasStakingInfo: false,

            lazyInfo: { loading: true },
          }

          return info
        }),
      ]

      return infos
    },
})

export const walletNativeAndStargazeNftsSelector = selectorFamily<
  NftCardInfo[],
  string
>({
  key: 'walletNativeAndStargazeNfts',
  get:
    (walletAddress) =>
    ({ get }) => {
      const nativeNfts = get(
        walletNftCardInfos({
          walletAddress,
        })
      )

      const nativeStakedNfts = get(
        walletStakedNftCardInfosSelector({
          walletAddress,
        })
      )

      const stargazeNfts = get(
        walletStargazeNftCardInfosSelector(walletAddress)
      )

      return [...nativeNfts, ...nativeStakedNfts, ...stargazeNfts]
    },
})

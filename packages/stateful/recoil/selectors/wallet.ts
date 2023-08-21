import {
  Loadable,
  atomFamily,
  noWait,
  selectorFamily,
  waitForAll,
} from 'recoil'

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
  ME_SAVED_TX_PREFIX,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  getSupportedChains,
  transformBech32Address,
} from '@dao-dao/utils'

import {
  walletNftCardInfos,
  walletStakedNftCardInfosSelector,
  walletStargazeNftCardInfosSelector,
} from './nft'

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
        KVPK_API_BASE + `/list/${walletPublicKey}/${ME_SAVED_TX_PREFIX}`
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
        nativeBalancesSelector({
          address: walletAddress,
          chainId,
        })
      )
      const cw20ContractsLoadable: Loadable<ContractWithBalance[]> =
        get(
          noWait(
            queryWalletIndexerSelector({
              chainId,
              walletAddress,
              formula: 'tokens/list',
              id,
              required: true,
            })
          )
        ) ?? []
      const cw20Contracts =
        cw20ContractsLoadable.state === 'hasValue'
          ? cw20ContractsLoadable.contents
          : []
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

          // Staking info only exists for native token.
          const hasStakingInfo =
            token.denomOrAddress ===
              getNativeTokenForChainId(chainId).denomOrAddress &&
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
            owner: walletAddress,
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
            owner: walletAddress,
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

// Get NFTs across all DAO DAO-supported chains.
export const allWalletNftsSelector = selectorFamily<
  NftCardInfo[],
  // Can be any wallet address.
  { walletAddress: string }
>({
  key: 'allWalletNfts',
  get:
    ({ walletAddress }) =>
    ({ get }) => {
      const chains = getSupportedChains()

      const nativeNfts = get(
        waitForAll(
          chains.map(({ chain }) =>
            walletNftCardInfos({
              chainId: chain.chain_id,
              walletAddress: transformBech32Address(
                walletAddress,
                chain.chain_id
              ),
            })
          )
        )
      ).flat()

      const nativeStakedNfts = get(
        waitForAll(
          chains.map(({ chain }) =>
            walletStakedNftCardInfosSelector({
              chainId: chain.chain_id,
              walletAddress: transformBech32Address(
                walletAddress,
                chain.chain_id
              ),
            })
          )
        )
      ).flat()

      const stargazeNfts = get(
        walletStargazeNftCardInfosSelector(walletAddress)
      )

      return [...nativeNfts, ...nativeStakedNfts, ...stargazeNfts]
    },
})

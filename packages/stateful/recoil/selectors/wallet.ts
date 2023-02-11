import { atomFamily, selectorFamily, waitForAll } from 'recoil'

import {
  eitherTokenInfoSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  queryWalletIndexerSelector,
  refreshCheckmarkStatusAtom,
  refreshSavedTxsAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  MeIdentityStatus,
  MeTransactionSave,
  TokenCardInfo,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  CHECKMARK_API_BASE,
  KVPK_API_BASE,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
} from '@dao-dao/utils'

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

// Takes wallet public key as a parameter.
export const checkmarkStatusSelector = selectorFamily<MeIdentityStatus, string>(
  {
    key: 'checkmarkStatus',
    get:
      (walletPublicKey) =>
      async ({ get }) => {
        get(refreshCheckmarkStatusAtom)

        const response = await fetch(
          CHECKMARK_API_BASE + `/status/${walletPublicKey}`
        )

        if (response.ok) {
          return await response.json()
        } else {
          throw new Error(
            `Failed to fetch checkmark status: ${response.status}/${
              response.statusText
            } ${await response.text().catch(() => '')}`.trim()
          )
        }
      },
  }
)

type ContractWithBalance = {
  contractAddress: string
  balance: string | undefined
}

// TODO: Standardize this with the treasury token cards.
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
            eitherTokenInfoSelector({
              type: TokenType.Cw20,
              denomOrAddress: c.contractAddress,
              chainId,
            })
          )
        )
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(
          ({ denom, amount, decimals, label, imageUrl }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )

            // For now, stakingInfo only exists for native token, until ICA.
            const hasStakingInfo =
              denom === NATIVE_DENOM &&
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
              token: {
                type: TokenType.Native,
                denomOrAddress: denom,
                symbol: label,
                decimals,
                imageUrl: imageUrl || getFallbackImage(denom),
              },
              isGovernanceToken: false,
              unstakedBalance,
              hasStakingInfo,

              lazyInfo: { loading: true },
            }

            return info
          }
        ),
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

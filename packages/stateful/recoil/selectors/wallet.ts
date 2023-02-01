import { atomFamily, selectorFamily } from 'recoil'

import { refreshSavedTxsAtom } from '@dao-dao/state/recoil'
import { MeTransactionSave } from '@dao-dao/types'
import { KVPK_API_BASE } from '@dao-dao/utils'

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

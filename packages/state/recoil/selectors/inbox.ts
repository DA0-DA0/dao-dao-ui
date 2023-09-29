import { atomFamily, selectorFamily } from 'recoil'

import {
  InboxApiItem,
  InboxApiItemType,
  InboxApiLoadedItem,
  WithChainId,
} from '@dao-dao/types'
import { INBOX_API_BASE } from '@dao-dao/utils'

import { refreshInboxApiItemsAtom } from '../atoms/refresh'

// Inbox API doesn't update right away due to Cloudflare KV Store latency, so
// this serves to keep track of all successful updates for the current session.
// This will be reset on page refresh. Set this right away so the UI can update
// immediately even if the API takes up to a minute or two. Though likely it
// only takes 10 seconds or so.
export const temporaryClearedInboxApiItemsAtom = atomFamily<string[], string>({
  key: 'temporaryClearedInboxApiItems',
  default: [],
})

export const inboxApiItemsSelector = selectorFamily<
  InboxApiItem[],
  WithChainId<{
    walletAddress: string
    // Optional type filter.
    type?: InboxApiItemType
  }>
>({
  key: 'inboxApiItems',
  get:
    ({ walletAddress, type, chainId }) =>
    async ({ get }) => {
      const temporaryClearedInboxApiItems = get(
        temporaryClearedInboxApiItemsAtom(walletAddress)
      )

      get(refreshInboxApiItemsAtom)

      // Optional filters.
      const query = new URLSearchParams({
        ...(type ? { type } : {}),
        ...(chainId ? { chainId } : {}),
      })
      const response = await fetch(
        INBOX_API_BASE + `/load/${walletAddress}?${query.toString()}`
      )

      if (response.ok) {
        const { items: loadedItems } = (await response.json()) as {
          items: InboxApiLoadedItem[]
        }

        const items = loadedItems
          // Extract type from ID.
          .map(
            (item) =>
              ({
                type: item.id.split('/')[0] as InboxApiItemType,
                ...item,
              } as InboxApiItem)
          )
          .filter(
            (item): item is InboxApiItem =>
              !!item &&
              // Filter out items that were cleared.
              !temporaryClearedInboxApiItems.includes(item.id)
          )

        return items
      } else {
        throw new Error(
          `Failed to fetch inbox API items: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

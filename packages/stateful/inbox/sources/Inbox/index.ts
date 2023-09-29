import { fromBech32, toHex } from '@cosmjs/encoding'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  inboxApiItemsSelector,
  refreshInboxApiItemsAtom,
} from '@dao-dao/state/recoil'
import { useCachedLoading } from '@dao-dao/stateless'
import {
  InboxApiItem,
  InboxApiItemType,
  InboxSource,
  InboxSourceData,
} from '@dao-dao/types'
import { getSupportedChains, transformBech32Address } from '@dao-dao/utils'

import { useOnWebSocketMessage } from '../../../hooks'
import { useWallet } from '../../../hooks/useWallet'
import { Renderer } from './Renderer'

export const InboxItems: InboxSource<InboxApiItem> = {
  id: 'inbox_items',
  Renderer,
  useData: () => {
    const { address } = useWallet()
    const bech32Hex = address && toHex(fromBech32(address).data)

    const setRefresh = useSetRecoilState(refreshInboxApiItemsAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    // Refresh when any inbox items are added.
    useOnWebSocketMessage([`inbox_${bech32Hex}`], 'add', refresh)

    // Refresh every minute.
    useEffect(() => {
      const interval = setInterval(() => refresh(), 60 * 1000)
      return () => clearInterval(interval)
    }, [refresh])

    const items = useCachedLoading(
      address
        ? waitForAll(
            getSupportedChains().map(({ chain }) =>
              inboxApiItemsSelector({
                walletAddress: transformBech32Address(address, chain.chain_id),
                chainId: chain.chain_id,
              })
            )
          )
        : undefined,
      []
    )

    const allItems = items.loading ? [] : items.data.flat()

    return {
      loading: items.loading,
      refreshing: !items.loading && !!items.updating,
      daosWithItems: allItems.reduce((acc, item, index) => {
        let existing = acc.find(
          (entry) =>
            entry.chainId === item.data.chainId &&
            entry.coreAddress === item.data.dao
        )
        if (!existing) {
          existing = {
            chainId: item.data.chainId,
            coreAddress: item.data.dao,
            items: [],
          }
          acc.push(existing)
        }

        existing.items.push({
          props: item,
          // Order joined DAO items first.
          order: item.type === InboxApiItemType.JoinedDao ? 0 : undefined,
          // All are pending.
          pending: true,
        })

        // Sort all items.
        if (index === allItems.length - 1) {
          acc.forEach((entry) => {
            entry.items.sort((a, b) =>
              a.props.timestamp && b.props.timestamp
                ? new Date(b.props.timestamp).getTime() -
                  new Date(a.props.timestamp).getTime()
                : a.props.timestamp
                ? -1
                : b.props.timestamp
                ? 1
                : 0
            )
          })
        }

        return acc
      }, [] as InboxSourceData<InboxApiItem>['daosWithItems']),
      refresh,
    }
  },
}

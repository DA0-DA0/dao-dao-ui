import { fromBech32, toHex } from '@cosmjs/encoding'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  inboxItemsSelector,
  refreshInboxItemsAtom,
} from '@dao-dao/state/recoil'
import { useCachedLoading } from '@dao-dao/stateless'
import { InboxState } from '@dao-dao/types'

import { useSupportedChainWallets } from './useSupportedChainWallets'
import { useWallet } from './useWallet'
import { useOnWebSocketMessage } from './useWebSocket'

export const useInbox = (): InboxState => {
  const { address } = useWallet()
  const bech32Hex = address && toHex(fromBech32(address).data)

  const setRefresh = useSetRecoilState(refreshInboxItemsAtom)
  const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

  // Refresh when any inbox items are added.
  useOnWebSocketMessage(bech32Hex ? [`inbox_${bech32Hex}`] : [], 'add', refresh)

  // Refresh every minute.
  useEffect(() => {
    const interval = setInterval(() => refresh(), 60 * 1000)
    return () => clearInterval(interval)
  }, [refresh])

  const supportedChainWallets = useSupportedChainWallets()
  const itemsLoading = useCachedLoading(
    supportedChainWallets.every(({ chainWallet: { address } }) => address)
      ? waitForAll(
          supportedChainWallets.flatMap(({ chainWallet: { chain, address } }) =>
            address
              ? inboxItemsSelector({
                  walletAddress: address,
                  chainId: chain.chain_id,
                })
              : []
          )
        )
      : undefined,
    []
  )

  const items = itemsLoading.loading ? [] : itemsLoading.data.flat()
  // Sort all items.
  items.sort((a, b) =>
    a.timestamp && b.timestamp
      ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      : a.timestamp
      ? -1
      : b.timestamp
      ? 1
      : 0
  )

  return {
    loading: itemsLoading.loading,
    refreshing: itemsLoading.loading || itemsLoading.updating || false,
    items,
    refresh,
  }
}

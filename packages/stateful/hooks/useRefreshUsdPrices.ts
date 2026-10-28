import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshUsdPricesAtom } from '@dao-dao/state'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'

import {
  refreshUsdPriceConsumers,
  subscribeUsdPriceRefresh,
} from './usdPriceRefresh'

/** Shared by both apps. Only market leaves and their consumers are invalidated;
 * inactive data is not eagerly fetched, and chain/asset metadata is untouched.
 */
export const useRefreshUsdPrices = () => {
  const client = useDependencyTrackedQueryClient()
  const setClock = useSetRecoilState(refreshUsdPricesAtom)
  useEffect(
    () =>
      subscribeUsdPriceRefresh({
        target: window,
        visibilityTarget: document,
        visible: () => document.visibilityState === 'visible',
        subscribe: (reschedule) =>
          client.queryClient.getQueryCache().subscribe(reschedule),
        nextExpiry: () => {
          const expiries = client.queryClient
            .getQueryCache()
            .findAll({ queryKey: ['prices'] })
            .flatMap(({ state }) => {
              const timestamp = (state.data as { updatedAt?: number } | null)
                ?.updatedAt
              return timestamp && timestamp + 300_000 >= Date.now()
                ? [timestamp + 300_000]
                : []
            })
          return expiries.length ? Math.min(...expiries) : undefined
        },
        refresh: () => {
          void refreshUsdPriceConsumers(
            () => client.invalidateQueries({ queryKey: ['prices'] }),
            () => setClock((n) => n + 1)
          )
        },
      }),
    [client, setClock]
  )
}

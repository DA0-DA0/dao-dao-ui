import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { chainQueries } from '@dao-dao/state/query'
import {
  refreshBlockHeightAtom,
  refreshIndexerUpStatusAtom,
  refreshTokenUsdcPriceAtom,
} from '@dao-dao/state/recoil'

/**
 * Refresh data every minute:
 * - block height
 * - prices
 * - indexer status
 * - dynamic gas prices
 */
export const useAutoRefreshData = () => {
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)
  const setRefreshUsdcPrices = useSetRecoilState(refreshTokenUsdcPriceAtom(''))
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)

  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshBlockHeight((id) => id + 1)
      setRefreshUsdcPrices((id) => id + 1)
      setRefreshIndexerStatus((id) => id + 1)

      queryClient.refetchQueries({
        queryKey: chainQueries
          .dynamicGasPrice({ chainId: '' })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1),
      })
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [
    queryClient,
    setRefreshBlockHeight,
    setRefreshIndexerStatus,
    setRefreshUsdcPrices,
  ])
}

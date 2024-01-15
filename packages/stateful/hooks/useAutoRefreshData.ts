import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

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
 */
export const useAutoRefreshData = () => {
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)
  const setRefreshUsdcPrices = useSetRecoilState(refreshTokenUsdcPriceAtom(''))
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshBlockHeight((id) => id + 1)
      setRefreshUsdcPrices((id) => id + 1)
      setRefreshIndexerStatus((id) => id + 1)
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [setRefreshBlockHeight, setRefreshIndexerStatus, setRefreshUsdcPrices])
}

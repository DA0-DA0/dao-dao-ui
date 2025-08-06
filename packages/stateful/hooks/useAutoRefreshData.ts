import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import {
  chainQueries,
  indexerQueries,
  tokenQueries,
} from '@dao-dao/state/query'
import { refreshIndexerUpStatusAtom } from '@dao-dao/state/recoil'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

/**
 * Refresh data every minute:
 * - block height
 * - indexer status
 * - dynamic gas prices
 * - prices
 */
export const useAutoRefreshData = () => {
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)

  const queryClient = useDependencyTrackedQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.refetch(
        chainQueries
          .block({ chainId: '' })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1)
      )

      setRefreshIndexerStatus((id) => id + 1)
      queryClient.refetch(
        indexerQueries
          .isCaughtUp({ chainId: '' })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1),
        {
          // Don't refetch every single indexer query as that would be
          // expensive.
          bubbleUp: false,
        }
      )

      queryClient.refetch(
        chainQueries
          .dynamicGasPrice({ chainId: '' })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1)
      )

      queryClient.refetch(
        tokenQueries
          .usdPrice({
            chainId: '',
            type: TokenType.Native,
            denomOrAddress: '',
          })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1)
      )
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [queryClient, setRefreshIndexerStatus])
}

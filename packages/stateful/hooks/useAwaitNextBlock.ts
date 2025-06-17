import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { chainQueries } from '@dao-dao/state/query'
import { useChain } from '@dao-dao/stateless'
import {
  getCosmWasmClientForChainId,
  waitUntilBlockHeight,
} from '@dao-dao/utils'

/**
 * Returns a function that polls the chain's block height and resolves once it
 * increments.
 */
export const useAwaitNextBlock = () => {
  const { chainId } = useChain()
  const queryClient = useQueryClient()

  const doAfterNextBlock = useCallback(async () => {
    const client = await getCosmWasmClientForChainId(chainId)

    await waitUntilBlockHeight({
      chainId,
      blockHeight: (await client.getHeight()) + 1,
    })

    await queryClient.refetchQueries({
      queryKey: chainQueries.block({ chainId }).queryKey,
    })
  }, [chainId, queryClient])

  return doAfterNextBlock
}

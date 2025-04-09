import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshBlockHeightAtom } from '@dao-dao/state'
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

  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)

  const doAfterNextBlock = useCallback(async () => {
    const client = await getCosmWasmClientForChainId(chainId)

    await waitUntilBlockHeight({
      chainId,
      blockHeight: (await client.getHeight()) + 1,
    })

    // Refresh global block height.
    setRefreshBlockHeight((id) => id + 1)
  }, [chainId, setRefreshBlockHeight])

  return doAfterNextBlock
}

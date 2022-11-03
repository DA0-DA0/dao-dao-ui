import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  refreshBlockHeightAtom,
} from '@dao-dao/state'

// Returns a function that polls the chain's block height and resolves once it
// increments.
export const useAwaitNextBlock = (chainId?: string) => {
  const client = useRecoilValue(cosmWasmClientForChainSelector(chainId))
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)

  const doAfterNextBlock = useCallback(async () => {
    let currentBlockHeight = await client.getHeight()
    // Store what block height we want to wait for. Wait for one past next block
    // to ensure one whole block starts and finishes. If we wait for the next
    // one and we are only 2 seconds from it, it's possible the transaction
    // we're waiting for has not yet happened.
    const nextBlockHeight = currentBlockHeight + 2

    // Refresh block height every 1 second until height changes.
    while (currentBlockHeight < nextBlockHeight) {
      currentBlockHeight = await client.getHeight()
    }

    // Refresh global block height.
    setRefreshBlockHeight((id) => id + 1)
  }, [client, setRefreshBlockHeight])

  return doAfterNextBlock
}

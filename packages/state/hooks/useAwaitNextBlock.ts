import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { cosmWasmClientForChainSelector } from '../recoil'

// Returns a function that polls the chain's block height and resolves once it
// increments.
export const useAwaitNextBlock = (chainId?: string) => {
  const client = useRecoilValue(cosmWasmClientForChainSelector(chainId))

  const doAfterNextBlock = useCallback(async () => {
    let currentBlockHeight = await client.getHeight()
    // Store what block height we want to wait for.
    const nextBlockHeight = currentBlockHeight + 1

    // Refresh block height every 1 second until height changes.
    while (currentBlockHeight < nextBlockHeight) {
      currentBlockHeight = await client.getHeight()
    }
  }, [client])

  return doAfterNextBlock
}

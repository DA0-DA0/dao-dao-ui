import { useCallback } from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  refreshBlockHeightAtom,
} from '@dao-dao/state'
import { useChain } from '@dao-dao/stateless'

// Returns a function that polls the chain's block height and resolves once it
// increments.
export const useAwaitNextBlock = () => {
  const { chain_id: chainId } = useChain()

  const clientLoadable = useRecoilValueLoadable(
    cosmWasmClientForChainSelector(chainId)
  )
  const client =
    clientLoadable.state === 'hasValue' ? clientLoadable.contents : undefined

  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)

  const doAfterNextBlock = useCallback(async () => {
    if (!client) {
      return
    }

    // Store what block height we want to wait for.
    const nextBlockHeight = (await client.getHeight()) + 1

    // Refresh block height every 1 second until height changes.
    await new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        const currentBlockHeight = await client.getHeight()
        // Once we reach the next block height, stop polling and resolve.
        if (currentBlockHeight >= nextBlockHeight) {
          clearInterval(interval)
          resolve()
        }
      }, 1000)
    })

    // Refresh global block height.
    setRefreshBlockHeight((id) => id + 1)
  }, [client, setRefreshBlockHeight])

  return doAfterNextBlock
}

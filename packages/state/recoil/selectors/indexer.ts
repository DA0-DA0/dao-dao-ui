import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { queryIndexer } from '@dao-dao/utils'

// TODO(multichain): Switch indexer on chainId.
export const queryIndexerSelector = selectorFamily<
  any,
  WithChainId<{
    contractAddress: string
    formulaName: string
    blockHeight?: number
  }>
>({
  key: 'queryIndexer',
  get:
    ({ contractAddress, formulaName, blockHeight }) =>
    async () => {
      const response = await queryIndexer(
        contractAddress,
        formulaName,
        blockHeight
      )

      // If JSON decoding fails, return undefined.
      return response.json().catch(() => undefined)
    },
})

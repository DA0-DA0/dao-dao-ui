import queryString from 'query-string'

import { WithChainId } from '@dao-dao/types'
import { INDEXER_BASE } from '@dao-dao/utils'

export type QueryIndexerOptions = WithChainId<{
  args?: Record<string, any>
  blockHeight?: number
}>

// TODO(multichain): Switch indexer on chainId.
export const queryIndexer = async <T = any>(
  contractAddress: string,
  formulaName: string,
  { args, blockHeight }: QueryIndexerOptions = {}
): Promise<T | undefined> => {
  const query = queryString.stringify({
    ...args,
    blockHeight,
  })
  const response = await fetch(
    `${INDEXER_BASE}/${contractAddress}/${formulaName}` +
      (query ? `?${query}` : '')
  )

  if (!response.ok) {
    const errorResponse = await response.text().catch(() => undefined)
    throw new Error(
      `Error querying indexer for ${contractAddress}/${formulaName}: ${response.status} ${errorResponse}`
    )
  } else if (response.status === 204) {
    // If no content is returned, return undefined. This will happen if the
    // formula computed succesfully and outputted nothing (undefined or null).
    return undefined
  }

  return response.json()
}

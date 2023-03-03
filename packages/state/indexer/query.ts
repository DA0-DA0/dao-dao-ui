import { ChainInfoID } from '@noahsaso/cosmodal'

import { WithChainId } from '@dao-dao/types'
import { CHAIN_ID, INDEXER_URL, fetchWithTimeout } from '@dao-dao/utils'

export type QueryIndexerOptions = WithChainId<{
  args?: Record<string, any>
  block?: {
    height: number
    // Most formulas do not need the time, so make it optional.
    timeUnixMs?: number
  }
}>

export const queryIndexer = async <T = any>(
  type: 'contract' | 'wallet' | 'generic',
  address: string,
  formula: string,
  { args, block, chainId = CHAIN_ID }: QueryIndexerOptions = {}
): Promise<T | undefined> => {
  const params = new URLSearchParams({
    ...args,
    ...(block ? { block: `${block.height}:${block.timeUnixMs ?? 1}` } : {}),
  })
  // Filter out undefined values.
  params.forEach((value, key) => {
    if (value === undefined) {
      params.delete(key)
    }
  })

  const response = await fetchWithTimeout(
    // Timeout after 10 seconds.
    10 * 1000,
    `${INDEXER_URL}/${chainId}/${type}/${address}/${formula}?${params.toString()}`
  )

  if (!response.ok) {
    const errorResponse = await response.text().catch(() => undefined)
    throw new Error(
      `Error querying indexer for ${type}/${address}/${formula}: ${response.status} ${errorResponse}`.trim()
    )
  } else if (response.status === 204) {
    // If no content is returned, return undefined. This will happen if the
    // formula computed succesfully and outputted nothing (undefined or null).
    return undefined
  }

  return response.json()
}

export const queryFeaturedDaoDumpStatesFromIndexer = () =>
  queryIndexer('generic', '_', 'featuredDaos', {
    chainId: ChainInfoID.Juno1,
  })

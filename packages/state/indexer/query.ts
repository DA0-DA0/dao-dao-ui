import { ChainInfoID } from '@noahsaso/cosmodal'

import { WithChainId } from '@dao-dao/types'
import { CHAIN_ID, SITE_URL, fetchWithTimeout } from '@dao-dao/utils'

export type QueryIndexerOptions = WithChainId<{
  args?: Record<string, any>
  block?: {
    height: number
    // Most formulas do not need the time, so make it optional.
    timeUnixMs?: number
  }
  baseUrl?: string
}>

export const queryIndexer = async <T = any>(
  type: 'contract' | 'wallet' | 'generic',
  address: string,
  formula: string,
  { args, block, chainId, baseUrl }: QueryIndexerOptions = {}
): Promise<T | undefined> => {
  const response = await fetchWithTimeout(
    // Timeout after 5 seconds.
    5000,
    (baseUrl || '') + '/api/indexer',
    {
      method: 'POST',
      body: JSON.stringify({
        chainId: chainId ?? CHAIN_ID,
        type,
        address,
        formula,
        args,
        block: block ? `${block.height}:${block.timeUnixMs ?? 1}` : undefined,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
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
    // Needed for server-side queries.
    baseUrl: SITE_URL,
  })

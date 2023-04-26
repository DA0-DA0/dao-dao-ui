import { ChainInfoID } from '@noahsaso/cosmodal'

import { IndexerFormulaType, WithChainId } from '@dao-dao/types'
import { INDEXER_URL, fetchWithTimeout } from '@dao-dao/utils'

export type QueryIndexerOptions = WithChainId<
  {
    formula: string
    args?: Record<string, any>
    block?: {
      height: number | string
      // Most formulas do not need the time, so make it optional.
      timeUnixMs?: number | string
    }
  } & (
    | {
        type: `${IndexerFormulaType.Generic}`
        address?: never
      }
    | {
        type: `${Exclude<IndexerFormulaType, IndexerFormulaType.Generic>}`
        address: string
      }
  )
>

export const queryIndexer = async <T = any>({
  type,
  address = '_',
  formula,
  args,
  block,
  chainId,
}: QueryIndexerOptions): Promise<T | undefined> => {
  // Filter out undefined args.
  if (args) {
    args = Object.entries(args).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>)
  }

  const params = new URLSearchParams({
    ...args,
    ...(block ? { block: `${block.height}:${block.timeUnixMs ?? 1}` } : {}),
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
  queryIndexer({
    type: IndexerFormulaType.Generic,
    formula: 'featuredDaos',
    chainId: ChainInfoID.Juno1,
  })

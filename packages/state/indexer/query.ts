import { ChainInfoID } from '@noahsaso/cosmodal'
import queryString from 'query-string'

import { WithChainId } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

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
  formulaName: string,
  { args, block, chainId }: QueryIndexerOptions = {}
): Promise<T | undefined> => {
  const indexerApiBase = CHAIN_INDEXER_MAP[chainId ?? CHAIN_ID]
  if (!indexerApiBase) {
    throw new Error(
      `No indexer configured for chain ID ${chainId ?? CHAIN_ID}.`
    )
  }

  const query = queryString.stringify({
    ...args,
    ...(block ? { block: `${block.height}:${block.timeUnixMs ?? 1}` } : {}),
  })
  const response = await fetch(
    `${indexerApiBase}/${type}/${address}/${formulaName}` +
      (query ? `?${query}` : '')
  )

  if (!response.ok) {
    const errorResponse = await response.text().catch(() => undefined)
    throw new Error(
      `Error querying indexer for ${type}/${address}/${formulaName}: ${response.status} ${errorResponse}`
    )
  } else if (response.status === 204) {
    // If no content is returned, return undefined. This will happen if the
    // formula computed succesfully and outputted nothing (undefined or null).
    return undefined
  }

  return response.json()
}

const CHAIN_INDEXER_MAP: Record<string, string | undefined> = {
  [ChainInfoID.Uni5]: 'https://indexer-testnet.daodao.zone',
  [ChainInfoID.Juno1]: 'https://indexer-mainnet.daodao.zone',
}

export const queryFeaturedDaoDumpStatesFromIndexer = () =>
  queryIndexer('generic', '_', 'featuredDaos', {
    chainId: ChainInfoID.Juno1,
  })

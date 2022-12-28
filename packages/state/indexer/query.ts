import { ChainInfoID } from '@noahsaso/cosmodal'
import queryString from 'query-string'

import { WithChainId } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

export type QueryIndexerOptions = WithChainId<{
  args?: Record<string, any>
  blockHeight?: number
}>

export const queryIndexer = async <T = any>(
  contractAddress: string,
  formulaName: string,
  { args, blockHeight, chainId }: QueryIndexerOptions = {}
): Promise<T | undefined> => {
  const indexerApiBase = CHAIN_INDEXER_MAP[chainId ?? CHAIN_ID]
  if (!indexerApiBase) {
    throw new Error(
      `No indexer configured for chain ID ${chainId ?? CHAIN_ID}.`
    )
  }

  const query = queryString.stringify({
    ...args,
    blockHeight,
  })
  const response = await fetch(
    `${indexerApiBase}/contract/${contractAddress}/${formulaName}` +
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

const CHAIN_INDEXER_MAP: Record<string, string | undefined> = {
  [ChainInfoID.Uni5]: 'https://indexer-testnet.daodao.zone',
  [ChainInfoID.Juno1]: 'https://indexer-mainnet.daodao.zone',
}

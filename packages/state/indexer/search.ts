import MeiliSearch from 'meilisearch'

import { IndexerDumpState, WithChainId } from '@dao-dao/types'
import {
  INACTIVE_DAO_NAMES,
  SEARCH_API_KEY,
  SEARCH_HOST,
  getSupportedChainConfig,
} from '@dao-dao/utils'

let _client: MeiliSearch | undefined

export const loadMeilisearchClient = async (): Promise<MeiliSearch> => {
  if (!_client) {
    _client = new MeiliSearch({
      host: SEARCH_HOST,
      apiKey: SEARCH_API_KEY,
    })
  }

  return _client
}

export type DaoSearchResult = {
  chainId: string
  contractAddress: string
  codeId: number
  blockHeight: number
  blockTimeUnixMicro: number
  value: IndexerDumpState
}

export type SearchDaosOptions = WithChainId<{
  query: string
  limit?: number
  exclude?: string[]
}>

export const searchDaos = async ({
  chainId,
  query,
  limit,
  exclude,
}: SearchDaosOptions): Promise<DaoSearchResult[]> => {
  const client = await loadMeilisearchClient()

  const config = getSupportedChainConfig(chainId)
  if (!config) {
    return []
  }
  const index = client.index(config.indexes.search)

  const results = await index.search<Omit<DaoSearchResult, 'chainId'>>(query, {
    limit,
    filter: [
      // Exclude inactive DAOs.
      `NOT value.config.name IN ["${INACTIVE_DAO_NAMES.join('", "')}"]`,
      ...(exclude?.length
        ? // Exclude DAOs that are in the exclude list.
          [`NOT contractAddress IN ["${exclude.join('", "')}"]`]
        : []),
    ]
      .map((filter) => `(${filter})`)
      .join(' AND '),
    // Most recent at the top.
    sort: ['blockHeight:desc', 'value.proposalCount:desc'],
  })

  return results.hits.map((hit) => ({
    chainId,
    ...hit,
  }))
}

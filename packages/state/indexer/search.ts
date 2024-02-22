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
  id: string
  block: {
    height: string
    timeUnixMs: string
  }
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
  const index = client.index(chainId + '_daos')

  const results = await index.search<Omit<DaoSearchResult, 'chainId'>>(query, {
    limit,
    filter: [
      // Exclude inactive DAOs.
      `NOT value.config.name IN ["${INACTIVE_DAO_NAMES.join('", "')}"]`,
      ...(exclude?.length
        ? // Exclude DAOs that are in the exclude list.
          [`NOT id IN ["${exclude.join('", "')}"]`]
        : []),
    ]
      .map((filter) => `(${filter})`)
      .join(' AND '),
    // Most recent at the top.
    sort: ['block.height:desc', 'value.proposalCount:desc'],
  })

  return results.hits.map((hit) => ({
    chainId,
    ...hit,
  }))
}

import MeiliSearch from 'meilisearch'

import { IndexerDumpState, WithChainId } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'
import {
  CommonError,
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
  if (!config || config.noIndexer) {
    throw new Error(CommonError.NoIndexerForChain)
  }

  const index = client.index(chainId + '_daos')

  const results = await index.search<Omit<DaoSearchResult, 'chainId'>>(query, {
    limit,
    filter: [
      // Exclude inactive DAOs.
      `NOT value.config.name IN ["${INACTIVE_DAO_NAMES.join('", "')}"]`,
      // Exclude hidden DAOs.
      'value.hideFromSearch NOT EXISTS OR value.hideFromSearch != true',
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

export type GovProposalSearchResult = {
  chainId: string
  id: string
  block: {
    height: string
    timeUnixMs: string
  }
  value: {
    id: string
    data: string
    title: string
    description: string
    status: ProposalStatus
    submitTime?: number
    depositEndTime?: number
    votingStartTime?: number
    votingEndTime?: number
  }
}

export type SearchGovProposalsOptions = WithChainId<{
  query?: string
  status?: ProposalStatus
  offset?: number
  limit?: number
}>

export const searchGovProposals = async ({
  chainId,
  query,
  status,
  offset,
  limit,
}: SearchGovProposalsOptions): Promise<{
  results: GovProposalSearchResult[]
  total: number
}> => {
  const client = await loadMeilisearchClient()

  const config = getSupportedChainConfig(chainId)
  if (!config || config.noIndexer) {
    throw new Error(CommonError.NoIndexerForChain)
  }

  const index = client.index(chainId + '_gov-proposals')

  const results = await index.search<Omit<GovProposalSearchResult, 'chainId'>>(
    query,
    {
      filter: [...(status ? [`value.status = ${status}`] : [])]
        .map((filter) => `(${filter})`)
        .join(' AND '),
      offset,
      limit,
      // Most recent at the top if no query passed.
      sort: query ? undefined : ['value.id:desc'],
    }
  )

  const total = (await index.getStats()).numberOfDocuments

  return {
    results: results.hits.map((hit) => ({
      chainId,
      ...hit,
    })),
    total,
  }
}

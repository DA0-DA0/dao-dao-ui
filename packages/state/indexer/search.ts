import MeiliSearch, { SearchResponse } from 'meilisearch'

import {
  IndexerDumpState,
  SupportedChainIndexerMode,
  WithChainId,
} from '@dao-dao/types'
import { ProposalResponse as MultipleChoiceProposalResponse } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { ProposalResponse as SingleChoiceProposalResponse } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'
import {
  CommonError,
  DAOS_HIDDEN_FROM_SEARCH,
  INACTIVE_DAO_NAMES,
  SEARCH_API_KEY,
  SEARCH_HOST,
  chainIsIndexed,
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
    height: number
    timeUnixMs: number
  }
  value: IndexerDumpState
}

export type SearchDaosOptions = WithChainId<{
  /**
   * Search query that compares against all fields.
   */
  query: string
  /**
   * Offset to start search results from.
   */
  offset?: number
  /**
   * Limit number of search results.
   */
  limit?: number
  /**
   * Number of hits per page.
   */
  hitsPerPage?: number
  /**
   * Page number.
   */
  page?: number
  /**
   * Exclude DAOs by their core address.
   */
  exclude?: string[]
  /**
   * Sort search results by the given fields.
   *
   * Defaults to most recently created at the top, and deprioritize those with
   * no proposals: `['value.createdAtEpoch:desc', 'value.proposalCount:desc']`.
   */
  sort?: string[]
}>

export const searchDaos = async ({
  chainId,
  query,
  offset,
  limit,
  hitsPerPage,
  page,
  exclude = [],
  sort = ['value.createdAtEpoch:desc', 'value.proposalCount:desc'],
}: SearchDaosOptions): Promise<SearchResponse<DaoSearchResult>> => {
  const client = await loadMeilisearchClient()

  if (
    !chainIsIndexed(
      chainId,
      SupportedChainIndexerMode.Tx,
      SupportedChainIndexerMode.All
    )
  ) {
    throw new Error(CommonError.NoIndexerForChain)
  }

  const index = client.index(chainId + '_daos')

  exclude.push(...DAOS_HIDDEN_FROM_SEARCH)

  const results = await index.search<Omit<DaoSearchResult, 'chainId'>>(query, {
    offset,
    limit,
    hitsPerPage,
    page,
    filter: [
      // Exclude inactive DAOs.
      `NOT value.config.name IN ["${INACTIVE_DAO_NAMES.join('", "')}"]`,
      // Exclude hidden DAOs.
      'value.hideFromSearch NOT EXISTS OR value.hideFromSearch != true',
      // Exclude DAOs that are in the exclude list.
      `NOT id IN ["${exclude.join('", "')}"]`,
    ]
      .map((filter) => `(${filter})`)
      .join(' AND '),
    sort,
  })

  return {
    ...results,
    hits: results.hits.map((hit) => ({
      chainId,
      ...hit,
    })),
  }
}

export type DaoProposalSearchResult = {
  chainId: string
  id: string
  block: {
    height: number
    timeUnixMs: number
  }
  value: SingleChoiceProposalResponse | MultipleChoiceProposalResponse
}

export type SearchDaoProposalsOptions = WithChainId<{
  /**
   * Search query.
   */
  query?: string
  /**
   * Limit number of search results.
   */
  limit?: number
  /**
   * Only search proposals in a specific DAO.
   */
  dao?: string
  /**
   * Whether or not to sort by recently created first. Defaults to false.
   */
  recentFirst?: boolean
  /**
   * Exclude hidden DAOs. Defaults to false.
   */
  excludeHidden?: boolean
}>

export const searchDaoProposals = async ({
  chainId,
  query,
  limit,
  dao,
  recentFirst,
  excludeHidden,
}: SearchDaoProposalsOptions): Promise<DaoProposalSearchResult[]> => {
  const client = await loadMeilisearchClient()

  if (
    !chainIsIndexed(
      chainId,
      SupportedChainIndexerMode.Tx,
      SupportedChainIndexerMode.All
    )
  ) {
    throw new Error(CommonError.NoIndexerForChain)
  }

  const index = client.index(chainId + '_proposals')

  const results = await index.search<Omit<DaoProposalSearchResult, 'chainId'>>(
    query,
    {
      limit,
      filter: [
        // Exclude hidden DAOs.
        ...(excludeHidden
          ? ['value.hideFromSearch NOT EXISTS OR value.hideFromSearch != true']
          : []),
        // Ensure DAO and proposal ID exist.
        dao ? `value.dao = "${dao}"` : 'value.dao EXISTS',
        'value.daoProposalId EXISTS',
      ]
        .map((filter) => `(${filter})`)
        .join(' AND '),
      sort: recentFirst ? ['value.proposal.start_height:desc'] : undefined,
    }
  )

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

  if (!chainIsIndexed(chainId)) {
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

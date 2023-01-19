import { selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  queryContractIndexerSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import { WithChainId } from '@dao-dao/types'
import {
  Addr,
  Config,
  HooksResponse,
  InfoResponse,
  ProposalCreationPolicyResponse,
  ProposalListResponse,
  ProposalResponse,
  VoteInfo,
  VoteListResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/CwdProposalMultiple'

import {
  CwdProposalMultipleClient,
  CwdProposalMultipleQueryClient,
} from './CwdProposalMultiple.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdProposalMultipleQueryClient,
  QueryClientParams
>({
  key: 'cwdProposalMultipleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdProposalMultipleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdProposalMultipleClient | undefined,
  ExecuteClientParams
>({
  key: 'CwdProposalMultipleExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwdProposalMultipleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<Config, QueryClientParams>({
  key: 'CwdProposalMultipleConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/config',
        })
      )
      if (config) {
        return config
      }
      const client = get(queryClient(queryClientParams))
      return await client.config()
    },
})
export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['proposal']>
  }
>({
  key: 'daoProposalMultipleProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const proposalResponse = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/proposal',
          args: {
            id: params[0].proposalId,
          },
          id,
        })
      )
      if (proposalResponse) {
        return proposalResponse
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ProposalListResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['listProposals']>
  }
>({
  key: 'CwdProposalMultipleListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const proposals = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/listProposals',
          args: params[0],
          id,
        })
      )
      if (proposals) {
        return { proposals }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const reverseProposalsSelector = selectorFamily<
  ProposalListResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['reverseProposals']>
  }
>({
  key: 'CwdProposalMultipleReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const proposals = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/reverseProposals',
          args: params[0],
          id,
        })
      )
      if (proposals) {
        return { proposals }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const proposalCountSelector = selectorFamily<
  number | string,
  QueryClientParams
>({
  key: 'CwdProposalMultipleProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const count = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/proposalCount',
          id,
        })
      )
      if (typeof count === 'number') {
        return count
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposalCount()
    },
})
export const getVoteSelector = selectorFamily<
  VoteResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['getVote']>
  }
>({
  key: 'CwdProposalMultipleGetVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const vote = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/vote',
          args: params[0],
          id,
        })
      )
      // Null when indexer fails. Undefined when no vote exists.
      if (vote !== null) {
        return { vote: vote || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getVote(...params)
    },
})
export const listVotesSelector = selectorFamily<
  VoteListResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['listVotes']>
  }
>({
  key: 'CwdProposalMultipleListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const votes = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/listVotes',
          args: params[0],
          id,
        })
      )
      if (votes) {
        return { votes }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listVotes(...params)
    },
})

const LIST_ALL_VOTES_LIMIT = 30
export const listAllVotesSelector = selectorFamily<
  VoteInfo[],
  QueryClientParams & {
    proposalId: number
  }
>({
  key: 'daoProposalMultipleCommonListAllVotes',
  get:
    ({ proposalId, ...queryClientParams }) =>
    async ({ get }) => {
      const votes: VoteInfo[] = []

      while (true) {
        const response = get(
          listVotesSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: votes[votes.length - 1]?.voter,
                proposalId,
                limit: LIST_ALL_VOTES_LIMIT,
              },
            ],
          })
        )
        if (!response?.votes.length) break

        votes.push(...response.votes)

        // If we have less than the limit of items, we've exhausted them.
        if (response.votes.length < LIST_ALL_VOTES_LIMIT) {
          break
        }
      }

      return votes
    },
})

export const proposalCreationPolicySelector = selectorFamily<
  ProposalCreationPolicyResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['proposalCreationPolicy']>
  }
>({
  key: 'CwdProposalMultipleProposalCreationPolicy',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const creationPolicy = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/creationPolicy',
        })
      )
      if (creationPolicy) {
        return creationPolicy
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposalCreationPolicy(...params)
    },
})
export const proposalHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['proposalHooks']>
  }
>({
  key: 'CwdProposalMultipleProposalHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalHooks(...params)
    },
})
export const voteHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['voteHooks']>
  }
>({
  key: 'CwdProposalMultipleVoteHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voteHooks(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['dao']>
  }
>({
  key: 'CwdProposalMultipleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalMultiple/dao',
        })
      )
      if (dao) {
        return dao
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalMultipleQueryClient['info']>
  }
>({
  key: 'CwdProposalMultipleInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'info',
        })
      )
      if (info) {
        return { info }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})

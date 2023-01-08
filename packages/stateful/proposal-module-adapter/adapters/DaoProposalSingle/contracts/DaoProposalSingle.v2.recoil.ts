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
  ListVotesResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  ConfigResponse,
  DaoResponse,
  InfoResponse,
  ListProposalsResponse,
  ProposalCountResponse,
  ProposalCreationPolicyResponse,
  ProposalHooksResponse,
  ProposalResponse,
  ReverseProposalsResponse,
  VoteHooksResponse,
} from '@dao-dao/types/contracts/DaoProposalSingle.v2'

import {
  DaoProposalSingleV2Client,
  DaoProposalSingleV2QueryClient,
} from './DaoProposalSingle.v2.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoProposalSingleV2QueryClient,
  QueryClientParams
>({
  key: 'daoProposalSingleV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoProposalSingleV2QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  DaoProposalSingleV2Client | undefined,
  ExecuteClientParams
>({
  key: 'daoProposalSingleV2ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new DaoProposalSingleV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<ConfigResponse, QueryClientParams>(
  {
    key: 'daoProposalSingleV2Config',
    get:
      (queryClientParams) =>
      async ({ get }) => {
        const config = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formulaName: 'daoProposalSingle/config',
          })
        )
        if (config) {
          return config
        }

        // If indexer query fails, fallback to contract query.
        const client = get(queryClient(queryClientParams))
        return await client.config()
      },
  }
)
export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['proposal']>
  }
>({
  key: 'daoProposalSingleV2Proposal',
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
          formulaName: 'daoProposalSingle/proposal',
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
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['listProposals']>
  }
>({
  key: 'daoProposalSingleV2ListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const proposals = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalSingle/listProposals',
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
  ReverseProposalsResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['reverseProposals']>
  }
>({
  key: 'daoProposalSingleV2ReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const proposals = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalSingle/reverseProposals',
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
  ProposalCountResponse,
  QueryClientParams
>({
  key: 'daoProposalSingleV2ProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const count = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalSingle/proposalCount',
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
    params: Parameters<DaoProposalSingleV2QueryClient['getVote']>
  }
>({
  key: 'daoProposalSingleV2GetVote',
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
          formulaName: 'daoProposalSingle/vote',
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
  ListVotesResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['listVotes']>
  }
>({
  key: 'daoProposalSingleV2ListVotes',
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
          formulaName: 'daoProposalSingle/listVotes',
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
export const proposalCreationPolicySelector = selectorFamily<
  ProposalCreationPolicyResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['proposalCreationPolicy']>
  }
>({
  key: 'daoProposalSingleV2ProposalCreationPolicy',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const creationPolicy = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalSingle/creationPolicy',
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
  ProposalHooksResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['proposalHooks']>
  }
>({
  key: 'daoProposalSingleV2ProposalHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalHooks(...params)
    },
})
export const voteHooksSelector = selectorFamily<
  VoteHooksResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['voteHooks']>
  }
>({
  key: 'daoProposalSingleV2VoteHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voteHooks(...params)
    },
})
export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['dao']>
  }
>({
  key: 'daoProposalSingleV2Dao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoProposalSingle/dao',
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
    params: Parameters<DaoProposalSingleV2QueryClient['info']>
  }
>({
  key: 'daoProposalSingleV2Info',
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

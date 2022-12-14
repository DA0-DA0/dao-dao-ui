import { selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  queryIndexerSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import { WithChainId } from '@dao-dao/types'
import {
  ListVotesResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/CwdProposalSingle.common'
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
} from '@dao-dao/types/contracts/CwdProposalSingle.v2'

import {
  CwdProposalSingleV2Client,
  CwdProposalSingleV2QueryClient,
} from './CwdProposalSingle.v2.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdProposalSingleV2QueryClient,
  QueryClientParams
>({
  key: 'cwdProposalSingleV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdProposalSingleV2QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdProposalSingleV2Client | undefined,
  ExecuteClientParams
>({
  key: 'cwdProposalSingleV2ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwdProposalSingleV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<ConfigResponse, QueryClientParams>(
  {
    key: 'cwdProposalSingleV2Config',
    get:
      (queryClientParams) =>
      async ({ get }) => {
        const config = get(
          queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['proposal']>
  }
>({
  key: 'cwdProposalSingleV2Proposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      // Indexer currently cannot accurately compute status of proposals since
      // the contract performs extra logic on the query based on the latest
      // votes. For now, just get from chain.

      // const proposalResponse = get(
      //   queryIndexerSelector({
      //     ...queryClientParams,
      //     formulaName: 'daoProposalSingle/proposal',
      //     args: {
      //       id: params[0].proposalId,
      //     },
      //     id,
      //   })
      // )
      // if (proposalResponse) {
      //   return proposalResponse
      // }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalSingleV2QueryClient['listProposals']>
  }
>({
  key: 'cwdProposalSingleV2ListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      // Indexer currently cannot accurately compute status of proposals since
      // the contract performs extra logic on the query based on the latest
      // votes. For now, just get from chain.

      // const proposals = get(
      //   queryIndexerSelector({
      //     ...queryClientParams,
      //     formulaName: 'daoProposalSingle/listProposals',
      //     args: params[0],
      //     id,
      //   })
      // )
      // if (proposals) {
      //   return { proposals }
      // }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const reverseProposalsSelector = selectorFamily<
  ReverseProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwdProposalSingleV2QueryClient['reverseProposals']>
  }
>({
  key: 'cwdProposalSingleV2ReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      // Indexer currently cannot accurately compute status of proposals since
      // the contract performs extra logic on the query based on the latest
      // votes. For now, just get from chain.

      // const proposals = get(
      //   queryIndexerSelector({
      //     ...queryClientParams,
      //     formulaName: 'daoProposalSingle/reverseProposals',
      //     args: params[0],
      //     id,
      //   })
      // )
      // if (proposals) {
      //   return { proposals }
      // }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const proposalCountSelector = selectorFamily<
  ProposalCountResponse,
  QueryClientParams
>({
  key: 'cwdProposalSingleV2ProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const id = get(refreshProposalsIdAtom)

      const count = get(
        queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['getVote']>
  }
>({
  key: 'cwdProposalSingleV2GetVote',
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
        queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['listVotes']>
  }
>({
  key: 'cwdProposalSingleV2ListVotes',
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
        queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['proposalCreationPolicy']>
  }
>({
  key: 'cwdProposalSingleV2ProposalCreationPolicy',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const creationPolicy = get(
        queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['proposalHooks']>
  }
>({
  key: 'cwdProposalSingleV2ProposalHooks',
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
    params: Parameters<CwdProposalSingleV2QueryClient['voteHooks']>
  }
>({
  key: 'cwdProposalSingleV2VoteHooks',
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
    params: Parameters<CwdProposalSingleV2QueryClient['dao']>
  }
>({
  key: 'cwdProposalSingleV2Dao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryIndexerSelector({
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
    params: Parameters<CwdProposalSingleV2QueryClient['info']>
  }
>({
  key: 'cwdProposalSingleV2Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryIndexerSelector({
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

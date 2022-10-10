import { selectorFamily } from 'recoil'

import {
  cosmWasmClientSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import {
  ConfigResponse,
  DaoResponse,
  GetVoteResponse,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalCreationPolicyResponse,
  ProposalHooksResponse,
  ProposalResponse,
  ReverseProposalsResponse,
  VoteHooksResponse,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'

import {
  CwProposalSingleClient,
  CwProposalSingleQueryClient,
} from './CwProposalSingle.v2.client'

type QueryClientParams = {
  contractAddress: string
}

export const queryClient = selectorFamily<
  CwProposalSingleQueryClient,
  QueryClientParams
>({
  key: 'cwProposalSingleV2QueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwProposalSingleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwProposalSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'cwProposalSingleV2ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwProposalSingleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<ConfigResponse, QueryClientParams>(
  {
    key: 'cwProposalSingleV2Config',
    get:
      (queryClientParams) =>
      async ({ get }) => {
        const client = get(queryClient(queryClientParams))
        return await client.config()
      },
  }
)
export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['proposal']>
  }
>({
  key: 'cwProposalSingleV2Proposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['listProposals']>
  }
>({
  key: 'cwProposalSingleV2ListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshProposalsIdAtom)
      return await client.listProposals(...params)
    },
})

// Custom
export const listAllProposalsSelector = selectorFamily<
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['listProposals']>
  }
>({
  key: 'cwProposalSingleV2ListAllProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const allProposals: ListProposalsResponse['proposals'] = []
      const limit = params[0].limit ?? 30
      let { startAfter } = params[0]

      while (true) {
        const { proposals } = get(
          listProposalsSelector({
            ...queryClientParams,
            params: [{ startAfter, limit }],
          })
        )

        allProposals.push(...proposals)

        // If we did not get all proposals we asked for, we're at the end.
        if (proposals.length < limit) break
        // Start after last proposal we got.
        startAfter = proposals[proposals.length - 1].id
      }

      return { proposals: allProposals }
    },
})

export const reverseProposalsSelector = selectorFamily<
  ReverseProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['reverseProposals']>
  }
>({
  key: 'cwProposalSingleV2ReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshProposalsIdAtom)
      return await client.reverseProposals(...params)
    },
})
export const proposalCountSelector = selectorFamily<
  ProposalCountResponse,
  QueryClientParams
>({
  key: 'cwProposalSingleV2ProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshProposalsIdAtom)
      try {
        return await client.proposalCount()
      } catch {
        // Contract throws error if no proposals have been made, so return 0 for
        // now until the contract is fixed.
        return 0
      }
    },
})
export const getVoteSelector = selectorFamily<
  GetVoteResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['getVote']>
  }
>({
  key: 'cwProposalSingleV2GetVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )
      return await client.getVote(...params)
    },
})
export const listVotesSelector = selectorFamily<
  ListVotesResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['listVotes']>
  }
>({
  key: 'cwProposalSingleV2ListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )
      return await client.listVotes(...params)
    },
})
export const proposalCreationPolicySelector = selectorFamily<
  ProposalCreationPolicyResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['proposalCreationPolicy']>
  }
>({
  key: 'cwProposalSingleV2ProposalCreationPolicy',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalCreationPolicy(...params)
    },
})
export const proposalHooksSelector = selectorFamily<
  ProposalHooksResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['proposalHooks']>
  }
>({
  key: 'cwProposalSingleV2ProposalHooks',
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
    params: Parameters<CwProposalSingleQueryClient['voteHooks']>
  }
>({
  key: 'cwProposalSingleV2VoteHooks',
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
    params: Parameters<CwProposalSingleQueryClient['dao']>
  }
>({
  key: 'cwProposalSingleV2Dao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleQueryClient['info']>
  }
>({
  key: 'cwProposalSingleV2Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})

import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Config,
  ProposalListResponseForEmpty,
  ProposalResponseForEmpty,
  ThresholdResponse,
  VoteListResponse,
  VoteResponse,
  VoterListResponse,
  VoterResponse,
} from '@dao-dao/types/contracts/Cw3FlexMultisig'

import { Cw3FlexMultisigQueryClient } from '../../../contracts/Cw3FlexMultisig'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  Cw3FlexMultisigQueryClient,
  QueryClientParams
>({
  key: 'cw3FlexMultisigQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw3FlexMultisigQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const thresholdSelector = selectorFamily<
  ThresholdResponse,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['threshold']>
  }
>({
  key: 'cw3FlexMultisigThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.threshold(...params)
    },
})
export const proposalSelector = selectorFamily<
  ProposalResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['proposal']>
  }
>({
  key: 'cw3FlexMultisigProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ProposalListResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['listProposals']>
  }
>({
  key: 'cw3FlexMultisigListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const reverseProposalsSelector = selectorFamily<
  ProposalListResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['reverseProposals']>
  }
>({
  key: 'cw3FlexMultisigReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const getVoteSelector = selectorFamily<
  VoteResponse,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['getVote']>
  }
>({
  key: 'cw3FlexMultisigVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getVote(...params)
    },
})
export const listVotesSelector = selectorFamily<
  VoteListResponse,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['listVotes']>
  }
>({
  key: 'cw3FlexMultisigListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVotes(...params)
    },
})
export const voterSelector = selectorFamily<
  VoterResponse,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['voter']>
  }
>({
  key: 'cw3FlexMultisigVoter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voter(...params)
    },
})
export const listVotersSelector = selectorFamily<
  VoterListResponse,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['listVoters']>
  }
>({
  key: 'cw3FlexMultisigListVoters',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVoters(...params)
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<Cw3FlexMultisigQueryClient['config']>
  }
>({
  key: 'cw3FlexMultisigConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})

// Custom

const LIST_VOTERS_LIMIT = 30
export const listAllVotersSelector = selectorFamily<
  VoterListResponse,
  QueryClientParams
>({
  key: 'cw3FlexMultisigListAllVoters',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const voters: VoterListResponse['voters'] = []

      while (true) {
        const response = await get(
          listVotersSelector({
            ...queryClientParams,
            params: [
              {
                limit: LIST_VOTERS_LIMIT,
                startAfter:
                  voters.length > 0
                    ? voters[voters.length - 1].addr
                    : undefined,
              },
            ],
          })
        )

        voters.push(...response.voters)

        if (response.voters.length < LIST_VOTERS_LIMIT) {
          break
        }
      }

      return {
        voters,
      }
    },
})

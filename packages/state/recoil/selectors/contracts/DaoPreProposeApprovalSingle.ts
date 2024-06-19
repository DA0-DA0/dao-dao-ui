import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  HooksResponse,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

import {
  DaoPreProposeApprovalSingleClient,
  DaoPreProposeApprovalSingleQueryClient,
} from '../../../contracts/DaoPreProposeApprovalSingle'
import {
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeApprovalSingleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeApprovalSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeApprovalSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoPreProposeApprovalSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoPreProposeApprovalSingleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoPreProposeApprovalSingleClient(
        client,
        sender,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeApprovalSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalModule(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeApprovalSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['config']>
  }
>({
  key: 'daoPreProposeApprovalSingleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const depositInfoSelector = selectorFamily<
  DepositInfoResponse,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeApprovalSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
export const proposalSubmittedHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<
      DaoPreProposeApprovalSingleQueryClient['proposalSubmittedHooks']
    >
  }
>({
  key: 'daoPreProposeApprovalSingleProposalSubmittedHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalSubmittedHooks(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  any,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['queryExtension']>
  }
>({
  key: 'daoPreProposeApprovalSingleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      let id = get(refreshProposalsIdAtom)

      const query = params[0].msg
      if ('approver' in query) {
        const approver = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/approver',
          })
        )
        if (approver) {
          return approver
        }
      } else if ('proposal' in query) {
        id += get(
          refreshProposalIdAtom({
            address: queryClientParams.contractAddress,
            proposalId: query.proposal.id,
          })
        )

        const proposal = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/proposal',
            args: {
              id: query.proposal.id,
            },
            id,
          })
        )
        if (proposal) {
          return proposal
        }
      } else if ('pending_proposals' in query) {
        const pendingProposals = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/pendingProposals',
            args: {
              limit: query.pending_proposals.limit,
              startAfter: query.pending_proposals.start_after,
            },
            id,
          })
        )
        if (pendingProposals) {
          return pendingProposals
        }
      } else if ('reverse_pending_proposals' in query) {
        const reversePendingProposals = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/reversePendingProposals',
            args: {
              limit: query.reverse_pending_proposals.limit,
              startBefore: query.reverse_pending_proposals.start_before,
            },
            id,
          })
        )
        if (reversePendingProposals) {
          return reversePendingProposals
        }
      } else if ('completed_proposals' in query) {
        const completedProposals = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/completedProposals',
            args: {
              limit: query.completed_proposals.limit,
              startAfter: query.completed_proposals.start_after,
            },
            id,
          })
        )
        if (completedProposals) {
          return completedProposals
        }
      } else if ('reverse_completed_proposals' in query) {
        const reverseCompletedProposals = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprovalSingle/reverseCompletedProposals',
            args: {
              limit: query.reverse_completed_proposals.limit,
              startBefore: query.reverse_completed_proposals.start_before,
            },
            id,
          })
        )
        if (reverseCompletedProposals) {
          return reverseCompletedProposals
        }
      } else if ('completed_proposal_id_for_created_proposal_id' in query) {
        const id = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula:
              'daoPreProposeApprovalSingle/completedProposalIdForCreatedProposalId',
            args: {
              id: query.completed_proposal_id_for_created_proposal_id.id,
            },
          })
        )
        if (id) {
          return id
        }
      }

      // If indexer query fails or doesn't exist, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})

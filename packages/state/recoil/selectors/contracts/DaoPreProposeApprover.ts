import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  HooksResponse,
} from '@dao-dao/types/contracts/DaoPreProposeApprover'
import { extractAddressFromMaybeSecretContractInfo } from '@dao-dao/utils'

import { DaoPreProposeApproverQueryClient } from '../../../contracts/DaoPreProposeApprover'
import { refreshProposalIdAtom, refreshProposalsIdAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeApproverQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeApproverSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeApproverQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeApproverProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return extractAddressFromMaybeSecretContractInfo(
        await client.proposalModule(...params)
      )
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['dao']>
  }
>({
  key: 'daoPreProposeApproverDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return extractAddressFromMaybeSecretContractInfo(
        await client.dao(...params)
      )
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['config']>
  }
>({
  key: 'daoPreProposeApproverConfig',
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
    params: Parameters<DaoPreProposeApproverQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeApproverDepositInfo',
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
      DaoPreProposeApproverQueryClient['proposalSubmittedHooks']
    >
  }
>({
  key: 'daoPreProposeApproverProposalSubmittedHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalSubmittedHooks(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  string | number,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['queryExtension']>
  }
>({
  key: 'daoPreProposeApproverQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      let id = get(refreshProposalsIdAtom)

      const query = params[0].msg
      if ('pre_propose_approval_contract' in query) {
        const preProposeApprovalContract = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoPreProposeApprover/preProposeApprovalContract',
          })
        )
        if (preProposeApprovalContract) {
          return preProposeApprovalContract
        }
      } else if ('pre_propose_approval_id_for_approver_proposal_id' in query) {
        id += get(
          refreshProposalIdAtom({
            address: queryClientParams.contractAddress,
            proposalId:
              query.pre_propose_approval_id_for_approver_proposal_id.id,
          })
        )

        const proposalId = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula:
              'daoPreProposeApprover/preProposeApprovalIdForApproverProposalId',
            args: {
              id: query.pre_propose_approval_id_for_approver_proposal_id.id,
            },
            id,
          })
        )
        if (proposalId) {
          return proposalId
        }
      } else if ('approver_proposal_id_for_pre_propose_approval_id' in query) {
        id += get(
          refreshProposalIdAtom({
            address: queryClientParams.contractAddress,
            proposalId:
              query.approver_proposal_id_for_pre_propose_approval_id.id,
          })
        )

        const proposalId = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula:
              'daoPreProposeApprover/approverProposalIdForPreProposeApprovalId',
            args: {
              id: query.approver_proposal_id_for_pre_propose_approval_id.id,
            },
            id,
          })
        )
        if (proposalId) {
          return proposalId
        }
      }

      // If indexer query fails or doesn't exist, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      const res = await client.queryExtension(...params)

      // This will be an object if on Secret Network and a string otherwise.
      if ('pre_propose_approval_contract' in query && typeof res === 'object') {
        return extractAddressFromMaybeSecretContractInfo(res)
      }

      return res
    },
})

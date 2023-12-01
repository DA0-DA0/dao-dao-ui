import { selectorFamily } from 'recoil'

import {
  DaoProposalMultipleSelectors,
  DaoProposalSingleV2Selectors,
  contractInfoSelector,
} from '@dao-dao/state'
import { WithChainId } from '@dao-dao/types'
import { ProposalResponse as DaoProposalMultipleProposalResponse } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { ProposalResponse as DaoProposalSingleProposalResponse } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
} from '@dao-dao/utils'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const daoSelector = selectorFamily<string, QueryClientParams>({
  key: 'daoProposalCommonDao',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const { info } = get(contractInfoSelector(queryClientParams))

      if (DAO_PROPOSAL_SINGLE_CONTRACT_NAMES.includes(info.contract)) {
        return get(
          DaoProposalSingleV2Selectors.daoSelector({
            ...queryClientParams,
            params: [],
          })
        )
      } else if (DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES.includes(info.contract)) {
        return get(
          DaoProposalMultipleSelectors.daoSelector({
            ...queryClientParams,
            params: [],
          })
        )
      }

      throw new Error('Unrecognized proposal module contract')
    },
})

export const proposalSelector = selectorFamily<
  DaoProposalSingleProposalResponse | DaoProposalMultipleProposalResponse,
  QueryClientParams & {
    params: [
      {
        proposalId: number
      }
    ]
  }
>({
  key: 'daoProposalCommonProposal',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const { info } = get(contractInfoSelector(queryClientParams))

      if (DAO_PROPOSAL_SINGLE_CONTRACT_NAMES.includes(info.contract)) {
        return get(
          DaoProposalSingleV2Selectors.proposalSelector(queryClientParams)
        )
      } else if (DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES.includes(info.contract)) {
        return get(
          DaoProposalMultipleSelectors.proposalSelector(queryClientParams)
        )
      }

      throw new Error('Unrecognized proposal module contract')
    },
})

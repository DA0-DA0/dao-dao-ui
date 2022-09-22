import { constSelector, useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  proposalExecutionTXHashSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useProposalExecutionTxHash = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const executionTxHash = useRecoilValue(
    proposal.status === Status.Executed ||
      proposal.status === Status.ExecutionFailed
      ? proposalExecutionTXHashSelector({
          contractAddress: proposalModuleAddress,
          proposalId: proposalNumber,
        })
      : constSelector(undefined)
  )

  return executionTxHash
}

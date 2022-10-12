import { constSelector, useRecoilValue } from 'recoil'

import { proposalExecutionTXHashSelector } from '@dao-dao/state'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useProposal } from './useProposal'

export const useProposalExecutionTxHash = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()

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

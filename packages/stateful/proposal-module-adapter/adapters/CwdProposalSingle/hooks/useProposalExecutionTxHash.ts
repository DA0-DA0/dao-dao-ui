import { constSelector } from 'recoil'

import { proposalExecutionTXHashSelector } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useProposal } from './useProposal'

export const useProposalExecutionTxHash = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()

  const executionTxHash = loadableToLoadingData(
    useCachedLoadable(
      proposal.status === Status.Executed ||
        proposal.status === Status.ExecutionFailed
        ? proposalExecutionTXHashSelector({
            contractAddress: proposalModuleAddress,
            proposalId: proposalNumber,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  return executionTxHash
}

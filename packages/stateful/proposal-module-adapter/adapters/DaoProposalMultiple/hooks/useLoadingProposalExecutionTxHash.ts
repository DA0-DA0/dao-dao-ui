import { constSelector } from 'recoil'

import { proposalExecutionTXHashSelector } from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { ProposalStatus } from '@dao-dao/types'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalExecutionTxHash = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  return useCachedLoading(
    loadingProposal.loading
      ? // Returns loading when undefined passed to indicate we are still loading.
        undefined
      : loadingProposal.data.status === ProposalStatus.Executed ||
        loadingProposal.data.status === ProposalStatus.ExecutionFailed
      ? // If in an execute state, load the execution TX hash.
        proposalExecutionTXHashSelector({
          contractAddress: proposalModuleAddress,
          proposalId: proposalNumber,
        })
      : // Returns not loading with undefined value when undefined selector passed, indicating there is no data available.
        constSelector(undefined),
    undefined
  )
}

import { constSelector } from 'recoil'

import { proposalExecutionTXHashSelector } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalExecutionTxHash = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  const executionTxHashLoadable = useCachedLoadable(
    loadingProposal.loading
      ? undefined
      : loadingProposal.data.status === Status.Executed ||
        loadingProposal.data.status === Status.ExecutionFailed
      ? proposalExecutionTXHashSelector({
          contractAddress: proposalModuleAddress,
          proposalId: proposalNumber,
        })
      : constSelector(undefined)
  )

  return loadableToLoadingData(executionTxHashLoadable, undefined)
}

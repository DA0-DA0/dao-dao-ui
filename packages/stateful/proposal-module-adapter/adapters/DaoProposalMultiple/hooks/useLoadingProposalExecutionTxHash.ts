import { proposalQueries } from '@dao-dao/state'
import { LoadingData, ProposalStatusEnum } from '@dao-dao/types'

import { useQueryLoadingData } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalExecutionTxHash = (): LoadingData<
  string | null
> => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chain: { chainId },
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  return useQueryLoadingData(
    loadingProposal.loading
      ? // Returns loading when undefined passed to indicate we are still loading.
        undefined
      : loadingProposal.data.status === ProposalStatusEnum.Executed ||
          loadingProposal.data.status === ProposalStatusEnum.ExecutionFailed
        ? // If in an execute state, load the execution TX hash.
          proposalQueries.proposalExecutionTxHash({
            chainId,
            contractAddress: proposalModuleAddress,
            proposalId: proposalNumber,
          })
        : // Returns not loading with value when undefined selector passed, indicating there is no data available.
          {
            queryKey: [
              'proposal',
              'executionTxHash',
              {
                chainId,
                contractAddress: proposalModuleAddress,
                proposalId: proposalNumber,
              },
            ],
            queryFn: () => null,
          },
    null
  )
}

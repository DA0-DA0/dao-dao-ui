import { proposalQueries } from '@dao-dao/state/query'
import {
  LoadingData,
  PreProposeModuleType,
  ProposalStatusEnum,
} from '@dao-dao/types'

import { useQueryLoadingData } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalExecutionTxHash = (): LoadingData<
  string | null
> => {
  const {
    proposalModule: { address: proposalModuleAddress, prePropose },
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
        ? // If Neutron fork SubDAO with timelock, get execution event from
          // timelock module since that is the one that executes the actual
          // messages in the proposal.
          prePropose?.type === PreProposeModuleType.NeutronSubdaoSingle
          ? proposalQueries.proposalExecutionTxHash({
              chainId,
              contractAddress: prePropose.config.timelockAddress,
              proposalId: proposalNumber,
              isNeutronTimelockExecute: true,
            })
          : // If in an execute state, load the execution TX hash.
            proposalQueries.proposalExecutionTxHash({
              chainId,
              contractAddress: proposalModuleAddress,
              proposalId: proposalNumber,
            })
        : // Returns not loading with undefined value when undefined selector passed, indicating there is no data available.
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

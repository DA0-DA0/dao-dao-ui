import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  daoPreProposeApprovalSingleQueries,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'
import { ProposalRefreshers } from '@dao-dao/types'

import { useQueryLoadingData } from '../../../../hooks'
import { useProposalModuleAdapterContext } from '../../../react/context'

export const useProposalRefreshers = (): ProposalRefreshers => {
  const {
    proposalModule,
    options: { proposalNumber, isApprovalProposal },
  } = useProposalModuleAdapterContext()

  const queryClient = useDependencyTrackedQueryClient()
  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const [refreshProposalId, setRefreshProposalId] = useRecoilState(
    refreshProposalIdAtom({
      address:
        isApprovalProposal && proposalModule.prePropose
          ? proposalModule.prePropose.address
          : proposalModule.address,
      proposalId: proposalNumber,
    })
  )

  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)

    // Invalidate indexer queries first, then invalidate the contract queries.

    if (isApprovalProposal && proposalModule.prePropose) {
      queryClient.invalidate(
        proposalModule.getApprovalProposalQuery({
          proposalId: proposalNumber,
        })
      )
      queryClient.invalidate(
        daoPreProposeApprovalSingleQueries.queryExtension({
          chainId: proposalModule.chainId,
          contractAddress: proposalModule.prePropose!.address,
          args: {
            msg: {
              completed_proposal_id_for_created_proposal_id: {
                id: proposalNumber,
              },
            },
          },
        })
      )
    } else {
      queryClient.invalidate(
        proposalModule.getVoteQuery({
          proposalId: proposalNumber,
          voter: undefined,
        })
      )
      queryClient.invalidate(
        proposalModule.getProposalQuery({
          proposalId: proposalNumber,
        })
      )
    }
  }, [
    isApprovalProposal,
    proposalModule,
    proposalNumber,
    queryClient,
    setRefreshProposalId,
  ])

  // Refresh all proposal lists and proposals.
  const refreshProposalAndAll = useCallback(() => {
    refreshProposal()
    setRefreshProposalsId((id) => id + 1)
  }, [refreshProposal, setRefreshProposalsId])

  const loadingProposal = useQueryLoadingData(
    !isApprovalProposal
      ? proposalModule.getProposalQuery({
          proposalId: proposalNumber,
        })
      : undefined,
    undefined
  )

  const loadingApprovalProposal = useQueryLoadingData(
    isApprovalProposal && proposalModule.prePropose
      ? proposalModule.getApprovalProposalQuery({
          proposalId: proposalNumber,
        })
      : undefined,
    undefined
  )

  return {
    refreshProposalId,
    refreshProposal,
    refreshProposalAndAll,
    refreshing: isApprovalProposal
      ? loadingApprovalProposal.loading || !!loadingApprovalProposal.updating
      : loadingProposal.loading || !!loadingProposal.updating,
  }
}

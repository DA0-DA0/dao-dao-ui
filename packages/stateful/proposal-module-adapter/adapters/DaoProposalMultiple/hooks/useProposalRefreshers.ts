import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  daoPreProposeApprovalMultipleQueries,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'
import { ProposalRefreshers } from '@dao-dao/types'

import { useProposalModuleAdapterContext } from '../../../react/context'
import { useLoadingProposal } from './useLoadingProposal'

export const useProposalRefreshers = (): ProposalRefreshers => {
  const {
    proposalModule,
    options: { proposalNumber, isApprovalProposal },
  } = useProposalModuleAdapterContext()

  const queryClient = useDependencyTrackedQueryClient()
  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const [refreshProposalId, setRefreshProposalId] = useRecoilState(
    refreshProposalIdAtom({
      address: proposalModule.address,
      proposalId: proposalNumber,
    })
  )

  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)

    // Invalidate indexer queries first, then contract queries.

    if (isApprovalProposal && proposalModule.prePropose) {
      queryClient.invalidate(
        proposalModule.getApprovalProposalQuery({
          proposalId: proposalNumber,
        })
      )
      queryClient.invalidate(
        daoPreProposeApprovalMultipleQueries.queryExtension({
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

  const refreshProposalAndAll = useCallback(() => {
    refreshProposal()
    setRefreshProposalsId((id) => id + 1)
  }, [setRefreshProposalsId, refreshProposal])

  const loadingProposal = useLoadingProposal()

  return {
    refreshProposalId,
    refreshProposal,
    refreshProposalAndAll,
    refreshing: loadingProposal.loading || !!loadingProposal.updating,
  }
}

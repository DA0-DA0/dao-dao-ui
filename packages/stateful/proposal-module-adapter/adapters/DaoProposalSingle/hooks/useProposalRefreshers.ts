import { useCallback } from 'react'
import { constSelector, useRecoilState, useSetRecoilState } from 'recoil'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoProposalSingleCommonSelectors,
  daoPreProposeApprovalSingleQueries,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import {
  useCachedLoading,
  useDependencyTrackedQueryClient,
} from '@dao-dao/stateless'
import { ProposalRefreshers } from '@dao-dao/types'

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
      queryClient.refetch(
        proposalModule.getApprovalProposalQuery({
          proposalId: proposalNumber,
        })
      )
      queryClient.refetch(
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
      queryClient.refetch(
        proposalModule.getVoteQuery({
          proposalId: proposalNumber,
          voter: undefined,
        })
      )
      queryClient.refetch(
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

  const loadingProposal = useCachedLoading(
    !isApprovalProposal
      ? DaoProposalSingleCommonSelectors.proposalSelector({
          contractAddress: proposalModule.address,
          chainId: proposalModule.chainId,
          params: [
            {
              proposalId: proposalNumber,
            },
          ],
        })
      : constSelector(undefined),
    undefined
  )

  const loadingApprovalProposal = useCachedLoading(
    isApprovalProposal && proposalModule.prePropose
      ? DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          chainId: proposalModule.chainId,
          contractAddress: proposalModule.prePropose.address,
          params: [
            {
              msg: {
                proposal: {
                  id: proposalNumber,
                },
              },
            },
          ],
        })
      : constSelector(undefined),
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

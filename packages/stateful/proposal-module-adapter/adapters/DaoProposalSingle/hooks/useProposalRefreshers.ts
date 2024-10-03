import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { constSelector, useRecoilState, useSetRecoilState } from 'recoil'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoProposalSingleCommonSelectors,
  indexerQueries,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { ProposalRefreshers } from '@dao-dao/types'

import { useProposalModuleAdapterContext } from '../../../react/context'

export const useProposalRefreshers = (): ProposalRefreshers => {
  const {
    proposalModule,
    options: { proposalNumber, isPreProposeApprovalProposal },
  } = useProposalModuleAdapterContext()

  const queryClient = useQueryClient()
  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const [refreshProposalId, setRefreshProposalId] = useRecoilState(
    refreshProposalIdAtom({
      address:
        isPreProposeApprovalProposal && proposalModule.prePropose
          ? proposalModule.prePropose.address
          : proposalModule.address,
      proposalId: proposalNumber,
    })
  )

  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)

    // Invalidate indexer query first.
    queryClient.invalidateQueries({
      queryKey: indexerQueries.queryContract(queryClient, {
        chainId: proposalModule.chainId,
        contractAddress: proposalModule.address,
        formula: 'daoProposalSingle/vote',
        args: {
          proposalId: proposalNumber,
        },
      }).queryKey,
    })
    // And then the contract query that depends on it.
    queryClient.invalidateQueries({
      queryKey: proposalModule.getVoteQuery({
        proposalId: proposalNumber,
        voter: undefined,
      }).queryKey,
    })
  }, [proposalModule, proposalNumber, queryClient, setRefreshProposalId])

  // Refresh all proposal lists and proposals.
  const refreshProposalAndAll = useCallback(() => {
    refreshProposal()
    setRefreshProposalsId((id) => id + 1)
  }, [refreshProposal, setRefreshProposalsId])

  const loadingProposal = useCachedLoading(
    !isPreProposeApprovalProposal
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

  const loadingPreProposeApprovalProposal = useCachedLoading(
    isPreProposeApprovalProposal && proposalModule.prePropose
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
    refreshing: isPreProposeApprovalProposal
      ? loadingPreProposeApprovalProposal.loading ||
        !!loadingPreProposeApprovalProposal.updating
      : loadingProposal.loading || !!loadingProposal.updating,
  }
}

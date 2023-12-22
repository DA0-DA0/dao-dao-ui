import { useCallback } from 'react'
import { constSelector, useSetRecoilState } from 'recoil'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoProposalSingleCommonSelectors,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { ProposalRefreshers } from '@dao-dao/types'

import { useProposalModuleAdapterOptions } from '../../../react/context'

export const useProposalRefreshers = (): ProposalRefreshers => {
  const {
    proposalModule: { address: proposalModuleAddress, prePropose },
    proposalNumber,
    chain: { chain_id: chainId },
    isPreProposeApprovalProposal,
  } = useProposalModuleAdapterOptions()

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const setRefreshProposalId = useSetRecoilState(
    refreshProposalIdAtom({
      address:
        isPreProposeApprovalProposal && prePropose
          ? prePropose.address
          : proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )

  // Refresh just this proposal.
  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)
  }, [setRefreshProposalId])

  // Refresh all proposal lists and proposals.
  const refreshProposalAndAll = useCallback(() => {
    setRefreshProposalsId((id) => id + 1)
  }, [setRefreshProposalsId])

  const loadingProposal = useCachedLoading(
    DaoProposalSingleCommonSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    }),
    undefined
  )

  const loadingPreProposeApprovalProposal = useCachedLoading(
    isPreProposeApprovalProposal && prePropose
      ? DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          chainId,
          contractAddress: prePropose.address,
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
    refreshProposal,
    refreshProposalAndAll,
    refreshing: isPreProposeApprovalProposal
      ? loadingPreProposeApprovalProposal.loading ||
        !!loadingPreProposeApprovalProposal.updating
      : loadingProposal.loading || !!loadingProposal.updating,
  }
}

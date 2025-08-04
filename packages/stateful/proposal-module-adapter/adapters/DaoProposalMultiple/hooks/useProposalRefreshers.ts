import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  daoPreProposeApprovalMultipleQueries,
  indexerQueries,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import { ProposalRefreshers } from '@dao-dao/types'

import { useProposalModuleAdapterContext } from '../../../react/context'
import { useLoadingProposal } from './useLoadingProposal'

export const useProposalRefreshers = (): ProposalRefreshers => {
  const {
    proposalModule,
    options: { proposalNumber, isApprovalProposal },
  } = useProposalModuleAdapterContext()

  const queryClient = useQueryClient()
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
      queryClient
        .refetchQueries(
          indexerQueries.queryContract({
            chainId: proposalModule.chainId,
            contractAddress: proposalModule.prePropose.address,
            formula: 'daoPreProposeApprovalMultiple/proposal',
            args: {
              id: proposalNumber,
            },
          })
        )
        .then(() =>
          queryClient.refetchQueries(
            proposalModule.getApprovalProposalQuery({
              proposalId: proposalNumber,
            })
          )
        )

      queryClient
        .refetchQueries(
          indexerQueries.queryContract({
            chainId: proposalModule.chainId,
            contractAddress: proposalModule.prePropose.address,
            formula:
              'daoPreProposeApprovalMultiple/completedProposalIdForCreatedProposalId',
            args: {
              id: proposalNumber,
            },
          })
        )
        .then(() =>
          queryClient.refetchQueries(
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
        )
    } else {
      queryClient
        .refetchQueries(
          indexerQueries.queryContract({
            chainId: proposalModule.chainId,
            contractAddress: proposalModule.address,
            formula: 'daoProposalMultiple/vote',
            args: {
              proposalId: proposalNumber,
            },
          })
        )
        .then(() =>
          queryClient.refetchQueries(
            proposalModule.getVoteQuery({
              proposalId: proposalNumber,
              voter: undefined,
            })
          )
        )

      queryClient
        .refetchQueries(
          indexerQueries.queryContract({
            chainId: proposalModule.chainId,
            contractAddress: proposalModule.address,
            formula: 'daoProposalMultiple/proposal',
            args: {
              proposalId: proposalNumber,
            },
          })
        )
        .then(() =>
          queryClient.refetchQueries(
            proposalModule.getProposalQuery({
              proposalId: proposalNumber,
            })
          )
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

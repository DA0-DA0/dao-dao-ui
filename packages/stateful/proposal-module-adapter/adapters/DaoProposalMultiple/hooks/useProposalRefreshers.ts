import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
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
    options: { proposalNumber },
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

    // Invalidate indexer query first.
    queryClient.invalidateQueries({
      queryKey: indexerQueries.queryContract(queryClient, {
        chainId: proposalModule.chainId,
        contractAddress: proposalModule.address,
        formula: 'daoProposalMultiple/vote',
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

import { useMemo } from 'react'

import { LoadingData, ProposalStatus } from '@dao-dao/types'

import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalStatus = () => {
  const loadingProposal = useLoadingProposal()
  return useMemo(
    (): LoadingData<{
      status: ProposalStatus
      isVotingOpen: boolean
    }> =>
      loadingProposal.loading
        ? {
            loading: true,
          }
        : {
            loading: false,
            data: {
              status: loadingProposal.data.status,
              isVotingOpen: loadingProposal.data.votingOpen,
            },
          },
    [loadingProposal]
  )
}

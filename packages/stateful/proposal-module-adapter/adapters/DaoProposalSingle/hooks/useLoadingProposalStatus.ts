import { useMemo } from 'react'

import { LoadingData, ProposalStatus } from '@dao-dao/types'

import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingProposalStatus = () => {
  const loadingProposal = useLoadingProposal()
  return useMemo(
    (): LoadingData<ProposalStatus | undefined> =>
      loadingProposal.loading
        ? {
            loading: true,
          }
        : {
            loading: false,
            data: loadingProposal.data.status,
          },
    [loadingProposal]
  )
}

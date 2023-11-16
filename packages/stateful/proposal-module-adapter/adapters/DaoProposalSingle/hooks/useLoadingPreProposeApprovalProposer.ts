import { useMemo } from 'react'

import { LoadingData } from '@dao-dao/types'

import { useLoadingPreProposeProposal } from './useLoadingPreProposeProposal'

export const useLoadingPreProposeApprovalProposer = () => {
  const loadingPreProposeProposal = useLoadingPreProposeProposal()
  return useMemo(
    (): LoadingData<string | undefined> =>
      loadingPreProposeProposal.loading
        ? {
            loading: true,
          }
        : loadingPreProposeProposal.errored
        ? {
            loading: false,
            data: undefined,
          }
        : {
            loading: false,
            data: loadingPreProposeProposal.data.proposer,
          },
    [loadingPreProposeProposal]
  )
}

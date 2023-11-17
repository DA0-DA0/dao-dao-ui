import { useMemo } from 'react'

import { LoadingData } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

import { useLoadingPreProposeProposal } from './useLoadingPreProposeProposal'

export const useLoadingPreProposeApprovalStatus = () => {
  const loadingPreProposeProposal = useLoadingPreProposeProposal()
  return useMemo(
    (): LoadingData<ProposalStatus | undefined> =>
      loadingPreProposeProposal.loading
        ? {
            loading: true,
          }
        : {
            loading: false,
            data: loadingPreProposeProposal.data.status,
          },
    [loadingPreProposeProposal]
  )
}

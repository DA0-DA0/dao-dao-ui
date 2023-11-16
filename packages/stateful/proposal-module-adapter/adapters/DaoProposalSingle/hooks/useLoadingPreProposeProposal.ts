import { DaoPreProposeApprovalSingleSelectors } from '@dao-dao/state/recoil'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useLoadingPreProposeProposal = () => {
  const {
    chain: { chain_id: chainId },
    proposalModule,
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  return useCachedLoadingWithError(
    DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
      chainId,
      contractAddress: proposalModule.prePropose!.address,
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
  ) as LoadingDataWithError<DaoPreProposeApprovalSingleProposal>
}

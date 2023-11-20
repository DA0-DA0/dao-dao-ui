import { PreProposeModuleType, ProposalStatus } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../../components'
import { useProposalModuleAdapterOptions } from '../../../../react'
import { useLoadingProposal, useLoadingVotesInfo } from '../../hooks'
import {
  ProposalVoteTallyLoader,
  ProposalVoteTally as StatelessProposalVoteTally,
} from './ProposalVoteTally'

export const ProposalVoteTally = () => {
  const loadingProposal = useLoadingProposal()
  const loadingVotesInfo = useLoadingVotesInfo()

  const {
    proposalModule: { prePropose },
  } = useProposalModuleAdapterOptions()
  const isPreProposeApproverProposal =
    prePropose?.type === PreProposeModuleType.Approver

  return (
    <SuspenseLoader
      fallback={
        <ProposalVoteTallyLoader
          isPreProposeApproverProposal={isPreProposeApproverProposal}
        />
      }
      forceFallback={loadingProposal.loading || loadingVotesInfo.loading}
    >
      {!loadingProposal.loading && !loadingVotesInfo.loading && (
        <StatelessProposalVoteTally
          isPreProposeApproverProposal={isPreProposeApproverProposal}
          open={loadingProposal.data.status === ProposalStatus.Open}
          votesInfo={loadingVotesInfo.data}
        />
      )}
    </SuspenseLoader>
  )
}

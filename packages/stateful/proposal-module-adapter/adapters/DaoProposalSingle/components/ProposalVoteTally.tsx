import { ProposalStatus } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { useLoadingProposal, useLoadingVotesInfo } from '../hooks'
import {
  ProposalVoteTallyLoader,
  ProposalVoteTally as StatelessProposalVoteTally,
} from './ui/ProposalVoteTally'

export const ProposalVoteTally = () => {
  const loadingProposal = useLoadingProposal()
  const loadingVotesInfo = useLoadingVotesInfo()

  return (
    <SuspenseLoader
      fallback={<ProposalVoteTallyLoader />}
      forceFallback={loadingProposal.loading || loadingVotesInfo.loading}
    >
      {!loadingProposal.loading && !loadingVotesInfo.loading && (
        <StatelessProposalVoteTally
          open={loadingProposal.data.status === ProposalStatus.Open}
          votesInfo={loadingVotesInfo.data}
        />
      )}
    </SuspenseLoader>
  )
}

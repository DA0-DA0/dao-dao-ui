import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { useProposal, useVotesInfo } from '../hooks'
import { ProposalVoteTally as StatelessProposalVoteTally } from './ui/ProposalVoteTally'

export const ProposalVoteTally = () => {
  const proposal = useProposal()

  return (
    <StatelessProposalVoteTally
      open={proposal.status === Status.Open}
      votesInfo={useVotesInfo()}
    />
  )
}

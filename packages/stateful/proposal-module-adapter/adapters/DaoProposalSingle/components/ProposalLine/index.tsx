import { ProposalLine as StatelessProposalLine } from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { useVotingModule } from '../../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../../react'
import {
  useProposal,
  useTimestampDisplay,
  useWalletVoteInfo,
} from '../../hooks'
import { ProposalWalletVote } from '../ProposalWalletVote'
import { ProposalStatus } from './ProposalStatus'

export const ProposalLine = (props: BaseProposalLineProps) => {
  const {
    coreAddress,
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { couldVote, canVote, vote } = useWalletVoteInfo()
  const timestampDisplay = useTimestampDisplay()

  return (
    <StatelessProposalLine
      Status={({ dimmed }) => (
        <ProposalStatus dimmed={dimmed} status={proposal.status} />
      )}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      timestampDisplay={timestampDisplay?.content ?? ''}
      title={proposal.title}
      // Show vote if they are a member of the DAO or if they could vote on this
      // proposal. This ensures that someone who is part of the DAO sees their
      // votes on every proposal (for visual consistency and reassurance), even
      // 'None' for proposals they were unable to vote on due to previously not
      // being part of the DAO. This also ensures that someone who is no longer
      // part of the DAO can still see their past votes.
      vote={
        (isMember || couldVote) && (
          <ProposalWalletVote
            fallback={
              // If did not vote, display pending or none based on if they are
              // currently able to vote.
              canVote ? 'pending' : 'none'
            }
            vote={vote}
          />
        )
      }
      votingOpen={proposal.status === Status.Open}
      {...props}
    />
  )
}

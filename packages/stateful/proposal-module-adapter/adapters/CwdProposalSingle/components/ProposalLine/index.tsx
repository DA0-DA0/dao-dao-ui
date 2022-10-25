import { ProposalLine as StatelessProposalLine } from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'

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
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()
  const { canVote, vote } = useWalletVoteInfo()
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
      // Even if no vote, display pending if can vote. If can't vote and didn't
      // vote, show nothing.
      vote={
        (vote || canVote) && (
          <ProposalWalletVote fallback="pending" vote={vote} />
        )
      }
      votingOpen={proposal.status === Status.Open}
      {...props}
    />
  )
}

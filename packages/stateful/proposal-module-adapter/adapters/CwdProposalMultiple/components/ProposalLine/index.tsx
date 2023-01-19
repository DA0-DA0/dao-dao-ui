import {
  ProposalLineLoader,
  ProposalStatus,
  ProposalLine as StatelessProposalLine,
} from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../../components'
import { useMembership } from '../../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../../react'
import { useLoadingProposal, useLoadingWalletVoteInfo } from '../../hooks'
import { ProposalWithMetadata } from '../../types'
import { ProposalWalletVote } from '../ProposalWalletVote'

export const ProposalLine = (props: BaseProposalLineProps) => {
  const loadingProposal = useLoadingProposal()

  return (
    <SuspenseLoader
      fallback={<ProposalLineLoader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerProposalLine {...props} proposal={loadingProposal.data} />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalLine = ({
  proposal,
  ...props
}: BaseProposalLineProps & {
  proposal: ProposalWithMetadata
}) => {
  const {
    coreAddress,
    chainId,
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

  return (
    <StatelessProposalLine
      Status={({ dimmed }) => (
        <ProposalStatus dimmed={dimmed} status={proposal.status} />
      )}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      timestampDisplay={proposal.timestampInfo?.display?.content}
      title={proposal.title}
      vote={
        // If no wallet connected, show nothing. If loading, also show nothing
        // until loaded.
        !loadingWalletVoteInfo || loadingWalletVoteInfo.loading
          ? undefined
          : // Show vote if they are a member of the DAO or if they could vote on
            // this proposal. This ensures that someone who is part of the DAO sees
            // their votes on every proposal (for visual consistency and
            // reassurance), even 'None' for proposals they were unable to vote on
            // due to previously not being part of the DAO. This also ensures that
            // someone who is no longer part of the DAO can still see their past
            // votes.
            (isMember || loadingWalletVoteInfo.data.couldVote) && (
              <ProposalWalletVote
                fallback={
                  // If did not vote, display pending or none based on if they
                  // are currently able to vote.
                  loadingWalletVoteInfo.data.canVote ? 'pending' : 'hasNoVote'
                }
                vote={loadingWalletVoteInfo.data.vote}
              />
            )
      }
      votingOpen={proposal.votingOpen}
      {...props}
    />
  )
}

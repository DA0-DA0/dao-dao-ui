import { ReactNode } from 'react'

import {
  ProposalLineLoader,
  ProposalLine as StatelessProposalLine,
} from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'

import { SuspenseLoader } from '../../../../../components'
import { useMembership } from '../../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../../react'
import {
  useLoadingProposal,
  useLoadingTimestampInfo,
  useLoadingWalletVoteInfo,
} from '../../hooks'
import { ProposalWalletVote } from '../ProposalWalletVote'
import { ProposalStatus } from './ProposalStatus'

export const ProposalLine = (props: BaseProposalLineProps) => {
  const loadingProposal = useLoadingProposal()
  const loadingTimestampInfo = useLoadingTimestampInfo()

  return (
    <SuspenseLoader
      fallback={<ProposalLineLoader />}
      forceFallback={loadingProposal.loading || loadingTimestampInfo.loading}
    >
      {!loadingProposal.loading && !loadingTimestampInfo.loading && (
        <InnerProposalLine
          {...props}
          proposal={loadingProposal.data}
          timestampDisplay={loadingTimestampInfo.data?.display.content}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalLine = ({
  proposal,
  timestampDisplay,
  ...props
}: BaseProposalLineProps & {
  proposal: Proposal | SingleChoiceProposal
  timestampDisplay: ReactNode | undefined
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
      timestampDisplay={timestampDisplay}
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
      votingOpen={proposal.status === Status.Open}
      {...props}
    />
  )
}

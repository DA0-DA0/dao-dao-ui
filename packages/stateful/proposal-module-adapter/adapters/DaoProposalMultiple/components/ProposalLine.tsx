import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  LineLoader,
  ProposalStatus,
  ProposalLine as StatelessProposalLine,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'
import {
  formatDateTime,
  formatDateTimeTz,
  humanReadableExpiration,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useMembership } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal, useLoadingWalletVoteInfo } from '../hooks'
import { ProposalWithMetadata } from '../types'
import { ProposalWalletVote } from './ProposalWalletVote'

export const ProposalLine = (props: BaseProposalLineProps) => {
  const loadingProposal = useLoadingProposal()

  return (
    <SuspenseLoader
      fallback={<LineLoader type="proposal" />}
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
  const { t } = useTranslation()
  const {
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { isMember = false } = useMembership()
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  return (
    <StatelessProposalLine
      Status={(props) => <ProposalStatus {...props} status={proposal.status} />}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      timestampDisplay={
        proposal.vetoTimelock
          ? {
              // Not used.
              label: '',
              tooltip: proposal.vetoTimelock.date
                ? formatDateTimeTz(proposal.vetoTimelock.date)
                : 'at_height' in proposal.vetoTimelock.expiration
                  ? t('info.vetoTimelockEndBlockTooltip')
                  : undefined,
              content: proposal.vetoTimelock.date ? (
                <TimeAgo
                  date={proposal.vetoTimelock.date}
                  formatter={timeAgoFormatter}
                />
              ) : (
                humanReadableExpiration(
                  t,
                  formatDateTime,
                  proposal.vetoTimelock.expiration
                )
              ),
            }
          : proposal.timestampInfo?.display
      }
      title={proposal.title}
      vote={
        // If no wallet connected, show nothing. If loading, also show nothing
        // until loaded.
        !loadingWalletVoteInfo || loadingWalletVoteInfo.loading
          ? undefined
          : // Show vote if they are a member of the DAO or if they could vote
            // on this proposal. This ensures that someone who is part of the
            // DAO sees their votes on every proposal (for visual consistency
            // and reassurance), even 'None' for proposals they were unable to
            // vote on due to previously not being part of the DAO. This also
            // ensures that someone who is no longer part of the DAO can still
            // see their past votes.
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
      {...props}
    />
  )
}

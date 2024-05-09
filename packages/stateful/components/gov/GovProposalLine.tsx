import {
  GovProposalStatus,
  GovProposalWalletVote,
  ProposalLine as StatelessProposalLine,
  useConfiguredChainContext,
  useDaoNavHelpers,
  useLoadingGovProposalTimestampInfo,
} from '@dao-dao/stateless'
import { StatefulGovProposalLineProps } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { useLoadingGovProposalWalletVoteInfo } from '../../hooks'
import { LinkWrapper } from '../LinkWrapper'

export const GovProposalLine = (props: StatefulGovProposalLineProps) => {
  const { proposalId, proposal } = props
  const {
    config: { name },
  } = useConfiguredChainContext()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const loadingTimestampInfo = useLoadingGovProposalTimestampInfo(
    proposal.proposal
  )
  const loadingWalletVoteInfo = useLoadingGovProposalWalletVoteInfo(proposalId)

  return (
    <StatelessProposalLine
      LinkWrapper={LinkWrapper}
      Status={(props) => (
        <GovProposalStatus {...props} status={proposal.proposal.status} />
      )}
      href={getDaoProposalPath(name, proposalId)}
      proposalNumber={Number(proposalId)}
      proposalPrefix=""
      timestampDisplay={
        loadingTimestampInfo.loading
          ? undefined
          : loadingTimestampInfo.data.display
      }
      title={proposal.title}
      vote={
        // If loading, show nothing until loaded.
        loadingWalletVoteInfo.loading ? undefined : (
          <GovProposalWalletVote
            fallback={
              // If no vote, display pending or none based on if they are
              // currently able to vote.
              proposal.proposal.status ===
              ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
                ? 'pending'
                : 'hasNoVote'
            }
            vote={loadingWalletVoteInfo.data.vote?.[0].option}
          />
        )
      }
    />
  )
}

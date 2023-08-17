import { ProposalStatus } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import {
  ErrorBoundary,
  GovProposalStatus,
  GovProposalWalletVote,
  ProposalLineLoader,
  ProposalLine as StatelessProposalLine,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { GovProposalWithDecodedContent } from '@dao-dao/types'
import { getGovProposalPath } from '@dao-dao/utils'

import { useLoadingGovProposal } from '../../hooks'
import { LinkWrapper } from '../LinkWrapper'
import { SuspenseLoader } from '../SuspenseLoader'

export type GovProposalLineProps = {
  proposalId: string
  proposal: GovProposalWithDecodedContent
}

export const GovProposalLine = (props: GovProposalLineProps) => (
  <ErrorBoundary>
    <InnerGovProposalLine {...props} />
  </ErrorBoundary>
)

const InnerGovProposalLine = ({
  proposalId,
  proposal,
}: GovProposalLineProps) => {
  const { config } = useSupportedChainContext()
  const loadingGovProp = useLoadingGovProposal(proposalId)

  return (
    <SuspenseLoader
      fallback={<ProposalLineLoader />}
      forceFallback={loadingGovProp.loading}
    >
      <StatelessProposalLine
        LinkWrapper={LinkWrapper}
        Status={({ dimmed }) => (
          <GovProposalStatus
            dimmed={dimmed}
            status={proposal.proposal.status}
          />
        )}
        href={getGovProposalPath(config.name, proposalId)}
        proposalNumber={Number(proposalId)}
        proposalPrefix=""
        timestampDisplay={
          loadingGovProp.loading
            ? undefined
            : loadingGovProp.data.timestampInfo.display
        }
        title={proposal.title}
        vote={
          // If loading, show nothing until loaded.
          loadingGovProp.loading ||
          loadingGovProp.data.walletVoteInfo.loading ? undefined : (
            <GovProposalWalletVote
              fallback={
                // If no vote, display pending or none based on if they are
                // currently able to vote.
                loadingGovProp.data.proposal.status ===
                ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
                  ? 'pending'
                  : 'hasNoVote'
              }
              vote={loadingGovProp.data.walletVoteInfo.data.vote?.[0].option}
            />
          )
        }
        votingOpen={
          proposal.proposal.status ===
          ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
        }
      />
    </SuspenseLoader>
  )
}

import { useCallback } from 'react'

import { govProposalSelector } from '@dao-dao/state/recoil'
import {
  PageLoader,
  Proposal,
  ProposalNotFound,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { GovProposalWithDecodedContent } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1/gov'

import { useWallet } from '../../hooks'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { GovProposalPageWrapperProps } from './GovPageWrapper'
import { GovProposalContentDisplay } from './GovProposalContentDisplay'
import {
  GovProposalStatusAndInfo,
  GovProposalStatusAndInfoProps,
} from './GovProposalStatusAndInfo'
import { GovProposalVotes } from './GovProposalVotes'
import { GovProposalVoteTally } from './GovProposalVoteTally'

type InnerGovProposalProps = {
  proposal: GovProposalWithDecodedContent
}

const InnerGovProposal = ({ proposal }: InnerGovProposalProps) => {
  const { isWalletConnected } = useWallet()

  const proposalId = proposal.id.toString()
  const ProposalStatusAndInfo = useCallback(
    (props: Omit<GovProposalStatusAndInfoProps, 'proposalId'>) => (
      <GovProposalStatusAndInfo {...props} proposalId={proposalId} />
    ),
    [proposalId]
  )

  return (
    <Proposal
      ProposalStatusAndInfo={ProposalStatusAndInfo}
      contentDisplay={<GovProposalContentDisplay proposal={proposal} />}
      id={proposalId}
      rightSidebarContent={
        isWalletConnected ? (
          <SuspenseLoader
            fallback={<ProfileDisconnectedCard className="animate-pulse" />}
          >
            <ProfileHomeCard />
          </SuspenseLoader>
        ) : (
          <ProfileDisconnectedCard />
        )
      }
      voteTally={<GovProposalVoteTally proposalId={proposalId} />}
      votesCast={
        (proposal.proposal.status ===
          ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
          proposal.proposal.status ===
            ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) && (
          <GovProposalVotes proposalId={proposalId} />
        )
      }
    />
  )
}

export const GovProposal = ({
  proposalId,
}: Pick<GovProposalPageWrapperProps, 'proposalId'>) => {
  const { chain_id: chainId } = useChain()
  const proposalLoading = useCachedLoading(
    govProposalSelector({
      chainId,
      proposalId: Number(proposalId),
    }),
    undefined
  )

  return proposalId ? (
    <SuspenseLoader
      fallback={<PageLoader />}
      forceFallback={proposalLoading.loading || !proposalLoading.data}
    >
      {!proposalLoading.loading && proposalLoading.data && (
        <InnerGovProposal proposal={proposalLoading.data} />
      )}
    </SuspenseLoader>
  ) : (
    <ProposalNotFound />
  )
}

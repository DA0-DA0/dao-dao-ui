import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import {
  govProposalSelector,
  refreshGovProposalsAtom,
} from '@dao-dao/state/recoil'
import {
  PageLoader,
  Proposal,
  ProposalNotFound,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import {
  GovProposalVersion,
  GovProposalWithDecodedContent,
} from '@dao-dao/types'
import { govProposalToDecodedContent } from '@dao-dao/utils'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1/gov'

import { useEntity, useLoadingGovProposal, useWallet } from '../../hooks'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { GovProposalPageWrapperProps } from './GovPageWrapper'
import { GovProposalActionDisplay } from './GovProposalActionDisplay'
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
  const { chain_id: chainId } = useChain()

  const proposerAddress =
    (proposal.version === GovProposalVersion.V1 &&
      proposal.proposal.proposer) ||
    ''
  const entity = useEntity(proposerAddress)

  const proposalId = proposal.id.toString()
  const ProposalStatusAndInfo = useCallback(
    (props: Omit<GovProposalStatusAndInfoProps, 'proposalId'>) => (
      <GovProposalStatusAndInfo {...props} proposalId={proposalId} />
    ),
    [proposalId]
  )

  const loadingProposal = useLoadingGovProposal(proposalId)
  const setRefreshProposal = useSetRecoilState(refreshGovProposalsAtom(chainId))

  return (
    <Proposal
      EntityDisplay={EntityDisplay}
      IconButtonLink={IconButtonLink}
      ProposalStatusAndInfo={ProposalStatusAndInfo}
      approval={false}
      createdAt={proposal.proposal.submitTime}
      creator={
        proposerAddress
          ? {
              address: proposerAddress,
              entity,
            }
          : undefined
      }
      description={proposal.description.replace(/\\n/g, '\n')}
      duplicateUrl={undefined}
      id={proposalId}
      onRefresh={() => setRefreshProposal((id) => id + 1)}
      proposalInnerContentDisplay={
        <GovProposalActionDisplay
          content={govProposalToDecodedContent(proposal)}
        />
      }
      refreshing={loadingProposal.loading || !!loadingProposal.updating}
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
      title={proposal.title}
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

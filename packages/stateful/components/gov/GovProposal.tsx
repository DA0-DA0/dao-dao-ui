import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { govProposalSelector } from '@dao-dao/state/recoil'
import {
  PageLoader,
  Proposal,
  ProposalNotFound,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { DaoTabId, GovProposalWithDecodedContent } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1/gov'

import { GovActionsProvider } from '../../actions'
import { useWallet } from '../../hooks'
import { PageHeaderContent } from '../PageHeaderContent'
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
  const { t } = useTranslation()
  const { isWalletConnected } = useWallet()

  const proposalId = proposal.id.toString()
  const ProposalStatusAndInfo = useCallback(
    (props: Omit<GovProposalStatusAndInfoProps, 'proposalId'>) => (
      <GovProposalStatusAndInfo {...props} proposalId={proposalId} />
    ),
    [proposalId]
  )

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          homeTab: {
            id: DaoTabId.Proposals,
            sdaLabel: t('title.proposals'),
          },
          current: `${t('title.proposal')} ${proposalId}`,
        }}
        className="mx-auto max-w-5xl"
      />

      <Proposal
        ProposalStatusAndInfo={ProposalStatusAndInfo}
        contentDisplay={
          <GovActionsProvider>
            <GovProposalContentDisplay proposal={proposal} />
          </GovActionsProvider>
        }
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
    </>
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
    <ProposalNotFound PageHeaderContent={PageHeaderContent} />
  )
}

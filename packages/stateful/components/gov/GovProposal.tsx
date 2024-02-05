import { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { govProposalSelector } from '@dao-dao/state/recoil'
import {
  PageLoader,
  Popup,
  Proposal,
  ProposalNotFound,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { DaoTabId, GovProposalWithDecodedContent } from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1/gov'

import { GovActionsProvider } from '../../actions'
import { useLoadingGovProposal } from '../../hooks'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { GovProposalPageWrapperProps } from './GovPageWrapper'
import { GovProposalContentDisplay } from './GovProposalContentDisplay'
import {
  GovProposalStatusAndInfo,
  GovProposalStatusAndInfoProps,
} from './GovProposalStatusAndInfo'
import { GovProposalVoter } from './GovProposalVoter'
import { GovProposalVotes } from './GovProposalVotes'
import { GovProposalVoteTally } from './GovProposalVoteTally'

type InnerGovProposalProps = {
  proposal: GovProposalWithDecodedContent
}

const InnerGovProposal = ({ proposal }: InnerGovProposalProps) => {
  const { t } = useTranslation()

  const proposalId = proposal.id.toString()
  const loadingProposal = useLoadingGovProposal(proposalId)

  const ProposalStatusAndInfo = useCallback(
    (props: Omit<GovProposalStatusAndInfoProps, 'proposalId'>) => (
      <GovProposalStatusAndInfo {...props} proposalId={proposalId} />
    ),
    [proposalId]
  )

  const alreadyVoted =
    !loadingProposal.loading &&
    !loadingProposal.data.walletVoteInfo.loading &&
    !!loadingProposal.data.walletVoteInfo.data.vote?.length

  const setVoteOpenRef = useRef<
    (Dispatch<SetStateAction<boolean>> | null) | null
  >(null)

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
        rightNode={
          <Popup
            popupClassName="min-w-56 max-w-lg p-3"
            position="left"
            setOpenRef={setVoteOpenRef}
            trigger={{
              type: 'button',
              props: {
                className: 'animate-fade-in',
                contentContainerClassName: 'text-base',
                variant: 'brand_ghost',
                children: alreadyVoted
                  ? t('button.changeVote')
                  : t('title.vote'),
              },
            }}
          >
            <GovProposalVoter
              onVoteSuccess={
                // Close vote popup in case it's open.
                () => setVoteOpenRef.current?.(false)
              }
              proposalId={proposalId}
            />
          </Popup>
        }
      />

      <Proposal
        ProposalStatusAndInfo={ProposalStatusAndInfo}
        contentDisplay={
          <GovActionsProvider>
            <GovProposalContentDisplay proposal={proposal} />
          </GovActionsProvider>
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

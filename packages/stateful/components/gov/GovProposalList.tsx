import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { govProposalsSelector } from '@dao-dao/state/recoil'
import {
  Pagination,
  ProposalList as StatelessProposalList,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { LinkWrapper } from '../LinkWrapper'
import { GovProposalLine, GovProposalLineProps } from './GovProposalLine'

const PROPSALS_PER_PAGE = 10

export const GovProposalList = () => {
  const { t } = useTranslation()
  const chain = useChain()
  const { asPath } = useRouter()

  const openGovProposalsDepositPeriod = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      status: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
      all: true,
    }),
    {
      proposals: [],
      total: 0,
    }
  )
  const openGovProposalsVotingPeriod = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
      all: true,
    }),
    {
      proposals: [],
      total: 0,
    }
  )

  const [page, setPage] = useState(1)
  const loadingAllGovProposals = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      offset: (page - 1) * PROPSALS_PER_PAGE,
      limit: PROPSALS_PER_PAGE,
    }),
    {
      proposals: [],
      total: 0,
    },
    (error) => {
      console.error(error)
      throw new Error(t('error.loadingData'))
    }
  )

  const openProposals =
    openGovProposalsDepositPeriod.loading ||
    openGovProposalsVotingPeriod.loading
      ? []
      : [
          ...openGovProposalsDepositPeriod.data.proposals,
          ...openGovProposalsVotingPeriod.data.proposals,
        ]
          .map(
            (proposal): GovProposalLineProps => ({
              proposalId: proposal.id.toString(),
              proposal,
            })
          )
          .sort(
            (a, b) =>
              (
                (b.proposal.proposal.votingEndTime ||
                  b.proposal.proposal.depositEndTime) ??
                new Date(0)
              ).getTime() -
              (
                (a.proposal.proposal.votingEndTime ||
                  a.proposal.proposal.depositEndTime) ??
                new Date(0)
              ).getTime()
          )

  const historyProposals = loadingAllGovProposals.loading
    ? []
    : loadingAllGovProposals.data.proposals
        .filter(
          (prop) =>
            prop.proposal.status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
            prop.proposal.status === ProposalStatus.PROPOSAL_STATUS_REJECTED
        )
        .map(
          (proposal): GovProposalLineProps => ({
            proposalId: proposal.id.toString(),
            proposal,
          })
        )

  // Initial loading if any are loading for the first time. Since they're all
  // cached, loading is only true on initial load.
  const initialLoad =
    openGovProposalsDepositPeriod.loading ||
    openGovProposalsVotingPeriod.loading ||
    loadingAllGovProposals.loading

  const historyCount = loadingAllGovProposals.loading
    ? 0
    : loadingAllGovProposals.data.total - openProposals.length

  return (
    <>
      <div
        className={clsx(
          !initialLoad &&
            (loadingAllGovProposals.loading ||
              !!loadingAllGovProposals.updating) &&
            'animate-pulse'
        )}
      >
        <StatelessProposalList
          DiscordNotifierConfigureModal={undefined}
          LinkWrapper={LinkWrapper}
          ProposalLine={GovProposalLine}
          canLoadMore={false}
          createNewProposalHref={asPath + '/create'}
          daosWithVetoableProposals={[]}
          historyCount={historyCount}
          historyProposals={historyProposals}
          isMember={true}
          loadMore={() => {}}
          loadingMore={initialLoad}
          openProposals={openProposals}
        />
      </div>

      {!loadingAllGovProposals.loading &&
        loadingAllGovProposals.data.total > PROPSALS_PER_PAGE && (
          <Pagination
            className="mx-auto mt-4"
            page={page}
            pageSize={PROPSALS_PER_PAGE}
            setPage={setPage}
            total={historyCount}
          />
        )}
    </>
  )
}

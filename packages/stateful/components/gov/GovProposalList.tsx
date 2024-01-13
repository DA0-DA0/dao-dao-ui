import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { govProposalsSelector } from '@dao-dao/state/recoil'
import {
  ProposalList as StatelessProposalList,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { LinkWrapper } from '../LinkWrapper'
import { GovProposalLine, GovProposalLineProps } from './GovProposalLine'

const PROPSALS_PER_PAGE = 20

export const GovProposalList = () => {
  const { t } = useTranslation()
  const chain = useChain()
  const { asPath } = useRouter()

  const openGovProposalsVotingPeriod = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
    }),
    {
      proposals: [],
      total: 0,
    }
  )

  const govProposalsDepositPeriod = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      status: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
    }),
    {
      proposals: [],
      total: 0,
    }
  )

  // Get max page by loading a single item and then getting the total.
  const loadingMaxPage = useCachedLoading(
    govProposalsSelector({
      chainId: chain.chain_id,
      limit: 1,
    }),
    {
      proposals: [],
      total: 0,
    }
  )
  const maxPage =
    loadingMaxPage.loading || loadingMaxPage.updating
      ? 1
      : Math.ceil(loadingMaxPage.data.total / PROPSALS_PER_PAGE)

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
  // Only allow incrementing the page once the current page has loaded and if
  // we're below the max.
  const goToNextPage = useCallback(() => {
    if (loadingAllGovProposals.loading || loadingAllGovProposals.updating) {
      return
    }

    setPage((page) => Math.min(page + 1, maxPage))
  }, [loadingAllGovProposals, maxPage])

  const [historyProposals, setHistoryProposals] = useState<
    GovProposalLineProps[]
  >([])

  useEffect(() => {
    if (loadingAllGovProposals.loading || loadingAllGovProposals.updating) {
      return
    }

    const newHistoryProposals = loadingAllGovProposals.data.proposals
      .filter(
        (prop) =>
          prop.proposal.status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
          prop.proposal.status === ProposalStatus.PROPOSAL_STATUS_REJECTED ||
          prop.proposal.status === ProposalStatus.PROPOSAL_STATUS_FAILED
      )
      .map(
        (proposal): GovProposalLineProps => ({
          proposalId: proposal.id.toString(),
          proposal,
        })
      )

    // Add new proposals to history that aren't already there.
    setHistoryProposals((prev) =>
      [
        ...prev,
        ...newHistoryProposals.filter(
          ({ proposalId }) => !prev.some((p) => p.proposalId === proposalId)
        ),
      ].sort((a, b) => Number(b.proposalId) - Number(a.proposalId))
    )
  }, [loadingAllGovProposals])

  const openProposals = openGovProposalsVotingPeriod.loading
    ? []
    : openGovProposalsVotingPeriod.data.proposals
        .map(
          (proposal): GovProposalLineProps => ({
            proposalId: proposal.id.toString(),
            proposal,
          })
        )
        .sort(
          (a, b) =>
            (b.proposal.proposal.votingEndTime ?? new Date(0)).getTime() -
            (a.proposal.proposal.votingEndTime ?? new Date(0)).getTime()
        )

  const depositPeriodProposals = govProposalsDepositPeriod.loading
    ? []
    : govProposalsDepositPeriod.data.proposals
        .map(
          (proposal): GovProposalLineProps => ({
            proposalId: proposal.id.toString(),
            proposal,
          })
        )
        .sort(
          (a, b) =>
            (b.proposal.proposal.depositEndTime ?? new Date(0)).getTime() -
            (a.proposal.proposal.depositEndTime ?? new Date(0)).getTime()
        )

  const historyCount = loadingAllGovProposals.loading
    ? 0
    : loadingAllGovProposals.data.total - openProposals.length

  return (
    <StatelessProposalList
      DiscordNotifierConfigureModal={undefined}
      LinkWrapper={LinkWrapper}
      ProposalLine={GovProposalLine}
      canLoadMore={page < maxPage}
      createNewProposalHref={asPath + '/create'}
      daosWithVetoableProposals={[]}
      isMember={true}
      loadMore={goToNextPage}
      loadingMore={
        openGovProposalsVotingPeriod.loading ||
        govProposalsDepositPeriod.loading ||
        loadingAllGovProposals.loading ||
        !!loadingAllGovProposals.updating
      }
      openProposals={openProposals}
      sections={[
        {
          title: t('title.depositPeriod'),
          proposals: depositPeriodProposals,
          defaultCollapsed: true,
        },
        {
          title: t('title.history'),
          proposals: historyProposals,
          total: historyCount,
        },
      ]}
    />
  )
}

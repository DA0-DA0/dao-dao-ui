// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { getRecentDaoProposals } from '@dao-dao/state'
import { Home, StatefulHomeProps } from '@dao-dao/stateful'
import { AccountTabId } from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

export default Home

const RECENT_PROPOSAL_LIMIT = 30

export const getStaticProps: GetStaticProps<StatefulHomeProps> = async ({
  locale,
}) => {
  const chains = getSupportedChains({ hasIndexer: true })

  // Get N most recent across all chains by getting N most recent per-chain,
  // sorting, and then slicing only the first N.
  const recentProposals = (
    await Promise.allSettled(
      chains.map(({ chainId }) =>
        getRecentDaoProposals({
          chainId,
          limit: RECENT_PROPOSAL_LIMIT,
        })
      )
    )
  )
    .flatMap((p) => (p.status === 'fulfilled' ? p.value : []))
    // Most recent first.
    .sort(
      (a, b) => b.value.proposal.start_height - a.value.proposal.start_height
    )
    // Get N most recent across all chains.
    .slice(0, RECENT_PROPOSAL_LIMIT)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      recentProposals,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [
    // Index page with no tab specified.
    {
      params: {
        tab: [],
      },
    },
    // All tabs.
    ...Object.values(AccountTabId).map((tab) => ({
      params: {
        tab: [tab],
      },
    })),
    // All chains.
    ...getSupportedChains().map(({ name }) => ({
      params: {
        tab: [name],
      },
    })),
  ],
  fallback: false,
})

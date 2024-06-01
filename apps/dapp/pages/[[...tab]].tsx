// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { querySnapper } from '@dao-dao/state'
import { Home, StatefulHomeProps } from '@dao-dao/stateful'
import { AccountTabId, ChainId, DaoDaoIndexerChainStats } from '@dao-dao/types'
import {
  MAINNET,
  getDaoInfoForChainId,
  getSupportedChains,
  processError,
} from '@dao-dao/utils'

export default Home

export const getStaticProps: GetStaticProps<StatefulHomeProps> = async ({
  locale,
  params,
}) => {
  const tabPath =
    params?.tab && Array.isArray(params?.tab) ? params.tab[0] : undefined

  // If defined, try to find matching chain. If found, show chain-only page.
  const selectedChain = tabPath
    ? getSupportedChains().find(({ name }) => name === tabPath)
    : undefined
  const chainId = selectedChain?.chainId

  const chainGovDaos = chainId
    ? selectedChain.noGov
      ? undefined
      : [getDaoInfoForChainId(chainId, [])]
    : // Get chain x/gov DAOs if not on a chain-specific home.
      [
        // Start with Cosmos Hub.
        MAINNET ? ChainId.CosmosHubMainnet : ChainId.CosmosHubTestnet,
        // Add DAO DAO-supported chains.
        ...getSupportedChains().flatMap(({ chainId, noGov }) =>
          noGov ? [] : chainId
        ),
        // Add some other common chains.
        ...(MAINNET
          ? [
              'akashnet-2',
              'secret-4',
              'regen-1',
              'injective-1',
              'celestia',
              'dydx-mainnet-1',
              'archway-1',
              'coreum-mainnet-1',
            ]
          : []),
      ].map((chainId) => getDaoInfoForChainId(chainId, []))

  // Get all or chain-specific stats and TVL.
  const [tvl, allStats, monthStats, weekStats] = await Promise.all([
    querySnapper<number>({
      query: chainId ? 'daodao-chain-tvl' : 'daodao-all-tvl',
      parameters: chainId ? { chainId } : undefined,
    }),
    querySnapper<DaoDaoIndexerChainStats>({
      query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
      parameters: chainId ? { chainId } : undefined,
    }),
    querySnapper<DaoDaoIndexerChainStats>({
      query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
      parameters: {
        ...(chainId ? { chainId } : undefined),
        daysAgo: 30,
      },
    }),
    querySnapper<DaoDaoIndexerChainStats>({
      query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
      parameters: {
        ...(chainId ? { chainId } : undefined),
        daysAgo: 7,
      },
    }),
  ])

  const validTvl = typeof tvl === 'number'
  const validAllStats = !!allStats
  const validMonthStats = !!monthStats
  const validWeekStats = !!weekStats
  if (!validTvl || !validAllStats || !validMonthStats || !validWeekStats) {
    processError('Failed to fetch TVL/stats for home page', {
      forceCapture: true,
      tags: {
        chainId,
      },
      extra: {
        tvl,
        allStats,
        monthStats,
        weekStats,
      },
    })
    throw new Error(
      `Failed to fetch stats due to invalid: ${[
        !validTvl && 'TVL',
        !validAllStats && 'all stats',
        !validMonthStats && 'month stats',
        !validWeekStats && 'week stats',
      ]
        .filter(Boolean)
        .join(', ')}.`
    )
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      // Chain-specific home page.
      ...(chainId && { chainId }),
      // All or chain-specific stats.
      stats: {
        all: allStats,
        month: monthStats,
        week: weekStats,
        // If chain is 1, it will not be shown.
        chains: chainId ? 1 : getSupportedChains().length,
        tvl,
      },
      // Chain x/gov DAOs.
      ...(chainGovDaos && { chainGovDaos }),
    },
    // Revalidate every day.
    revalidate: 24 * 60 * 60,
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

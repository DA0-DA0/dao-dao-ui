// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { querySnapper } from '@dao-dao/state'
import { Home, StatefulHomeProps } from '@dao-dao/stateful'
import { AccountTabId, DaoDaoIndexerChainStats } from '@dao-dao/types'
import {
  getConfiguredChains,
  getDaoInfoForChainId,
  getSupportedChains,
  processError,
} from '@dao-dao/utils'

export default Home

export const getStaticProps: GetStaticProps<StatefulHomeProps> = async ({
  locale,
}) => {
  const chainDaos = getConfiguredChains().map(({ chainId }) =>
    getDaoInfoForChainId(chainId, [])
  )

  // Get stats and TVL.
  const [tvl, stats] = await Promise.all([
    querySnapper<number>({
      query: 'daodao-all-tvl',
    }),
    querySnapper<DaoDaoIndexerChainStats>({
      query: 'daodao-all-stats',
    }),
  ])

  if (!tvl || !stats) {
    processError('Failed to fetch TVL/stats for home page', {
      forceCapture: true,
    })
    throw new Error('Failed to fetch stats.')
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      stats: {
        ...stats,
        chains: getSupportedChains().length,
        tvl,
      },
      chainDaos,
    },
    // Revalidate every hour.
    revalidate: 60 * 60,
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

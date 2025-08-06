import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { indexerQueries, refreshIndexerUpStatusAtom } from '@dao-dao/state'
import {
  Status as StatelessStatus,
  useDependencyTrackedQueryClient,
} from '@dao-dao/stateless'
import {
  SITE_URL,
  STATUS_PAGE_DESCRIPTION,
  STATUS_PAGE_TITLE,
} from '@dao-dao/utils'

import { ChainStatus } from '../ChainStatus'
import { PageHeaderContent } from '../PageHeaderContent'

export const StatusPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const queryClient = useDependencyTrackedQueryClient()

  // Refresh every 3 seconds.
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIndexerStatus((id) => id + 1)
      queryClient.refetch(
        indexerQueries
          .isCaughtUp({ chainId: '' })
          // Remove the final parameter in the key (options) so we match the
          // query key for all chains.
          .queryKey.slice(0, -1),
        {
          // Don't refetch every single indexer query as that would be
          // expensive.
          bubbleUp: false,
        }
      )
    }, 3 * 1000)

    return () => clearInterval(interval)
  }, [queryClient, setRefreshIndexerStatus])

  return (
    <>
      <NextSeo
        description={STATUS_PAGE_DESCRIPTION}
        openGraph={{
          url: SITE_URL + asPath,
          title: STATUS_PAGE_TITLE,
          description: STATUS_PAGE_DESCRIPTION,
        }}
        title={STATUS_PAGE_TITLE}
      />

      <PageHeaderContent title={t('title.status')} />

      <StatelessStatus ChainStatus={ChainStatus} />
    </>
  )
}

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshIndexerUpStatusAtom } from '@dao-dao/state'
import { Status as StatelessStatus } from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

import { ChainStatus } from '../ChainStatus'
import { PageHeaderContent } from '../PageHeaderContent'

export const StatusPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()

  // Refresh every 3 seconds.
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIndexerStatus((id) => id + 1)
    }, 3 * 1000)

    return () => clearInterval(interval)
  }, [setRefreshIndexerStatus])

  return (
    <>
      <NextSeo
        description={t('info.statusPageDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.status'),
          description: t('info.statusPageDescription'),
        }}
        title={t('title.status')}
      />

      <PageHeaderContent title={t('title.status')} />

      <StatelessStatus ChainStatus={ChainStatus} />
    </>
  )
}

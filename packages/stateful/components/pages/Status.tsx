import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshIndexerUpStatusAtom } from '@dao-dao/state'
import { Status as StatelessStatus } from '@dao-dao/stateless'
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

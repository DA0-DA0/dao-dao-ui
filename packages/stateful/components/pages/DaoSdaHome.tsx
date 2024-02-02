import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import {
  DaoSdaWrappedTab,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'

import { useDaoTabs } from '../../hooks'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoSdaHome = () => {
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  const loadingTabs = useDaoTabs()
  // Just a type-check because some tabs are loaded at the beginning.
  const tabs = loadingTabs.loading ? undefined : loadingTabs.data
  // Default to proposals tab for type-check, but should never happen as some
  // tabs are loaded at the beginning.
  const firstTabId = tabs?.[0].id || DaoTabId.Proposals

  // Pre-fetch tabs.
  useEffect(() => {
    tabs?.forEach((tab) => {
      router.prefetch(getDaoPath(coreAddress, tab.id))
    })
  }, [coreAddress, getDaoPath, router, tabs])

  const slug = (router.query.slug || []) as string[]
  const checkedSlug = useRef(false)
  useEffect(() => {
    // Only check one time, in case they load the page with no slug. This
    // prevents a bug where sometimes this would reset the page to the current
    // DAO when clicking on a SubDAO before the SubDAO loads.
    if (checkedSlug.current) {
      return
    }
    checkedSlug.current = true

    // If no slug, redirect to first tab.
    if (slug.length === 0) {
      router.replace(getDaoPath(coreAddress, firstTabId), undefined, {
        shallow: true,
      })
    }
  }, [coreAddress, getDaoPath, router, slug.length, firstTabId])

  const selectedTabId =
    slug.length > 0 && tabs?.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId

  const activeTab =
    (tabs || []).find(({ id }) => id === selectedTabId) || tabs?.[0]

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          current: activeTab?.label,
        }}
        className="mx-auto max-w-5xl"
        gradient
      />

      <DaoSdaWrappedTab
        SuspenseLoader={SuspenseLoader}
        allTabs={tabs || []}
        tabId={selectedTabId}
      />
    </>
  )
}

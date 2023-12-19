// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

import {
  ProfileDaoHomeCard,
  SuspenseLoader,
  useDaoTabs,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import {
  DaoSdaWrappedTab,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { DaoPageMode, DaoTabId } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage = () => {
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
      router.push(getDaoPath(coreAddress, firstTabId), undefined, {
        shallow: true,
      })
    }
  }, [coreAddress, getDaoPath, router, slug.length, firstTabId])

  const selectedTabId =
    slug.length > 0 && tabs?.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId

  return (
    <DaoSdaWrappedTab
      SuspenseLoader={SuspenseLoader}
      allTabs={tabs || []}
      rightSidebarContent={<ProfileDaoHomeCard />}
      tabId={selectedTabId}
    />
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Sda,
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Sda, coreAddress),
  }),
})

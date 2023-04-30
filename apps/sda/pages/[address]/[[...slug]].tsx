// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import {
  ProfileDaoHomeCard,
  SdaDaoHome,
  SuspenseLoader,
  useDaoTabs,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import {
  DaoSdaWrappedTab,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage = () => {
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  const tabs = useDaoTabs({ includeHome: SdaDaoHome })
  const firstTabId = tabs[0].id

  // Pre-fetch tabs.
  useEffect(() => {
    tabs.forEach((tab) => {
      router.prefetch(getDaoPath(coreAddress) + '/' + tab.id)
    })
  }, [coreAddress, getDaoPath, router, tabs])

  const slug = (router.query.slug || []) as string[]
  useEffect(() => {
    // If no slug, redirect to first tab.
    if (slug.length === 0) {
      router.push(getDaoPath(coreAddress) + '/' + firstTabId, undefined, {
        shallow: true,
      })
    }
  }, [coreAddress, getDaoPath, router, slug.length, firstTabId])

  const selectedTabId =
    slug.length > 0 && tabs.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId

  return (
    <DaoSdaWrappedTab
      SuspenseLoader={SuspenseLoader}
      allTabs={tabs}
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
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Sda, coreAddress),
  }),
})

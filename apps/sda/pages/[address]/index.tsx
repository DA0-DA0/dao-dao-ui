// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import {
  ProfileDaoHomeCard,
  SdaDaoHome,
  SuspenseLoader,
  useDaoTabs,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { DaoSdaWrappedTab } from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage = () => {
  const router = useRouter()

  const tabs = useDaoTabs({ includeHome: SdaDaoHome })
  const tabId = router.asPath.split('#')[1]

  return (
    <DaoSdaWrappedTab
      SuspenseLoader={SuspenseLoader}
      allTabs={tabs}
      rightSidebarContent={<ProfileDaoHomeCard />}
      tabId={tabId}
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

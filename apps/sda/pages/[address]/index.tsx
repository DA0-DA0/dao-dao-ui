// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import {
  DiscordNotifierConfigureModal,
  ProfileDaoHomeCard,
  SuspenseLoader,
  useDaoTabs,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { DaoWrappedTab } from '@dao-dao/stateless'
import { DaoPageMode, DaoTabId } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage = () => {
  const router = useRouter()

  const tabs = useDaoTabs({ includeSdaHome: true })
  const tabId = router.asPath.split('#')[1]

  return (
    <DaoWrappedTab
      DiscordNotifierConfigureModal={DiscordNotifierConfigureModal}
      SuspenseLoader={SuspenseLoader}
      allTabs={tabs}
      rightSidebarContent={<ProfileDaoHomeCard />}
      showDiscordNotifierConfigureModal={
        // Only show notifier configure modal if the user is viewing the
        // proposals tab.
        tabId === DaoTabId.Proposals
      }
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

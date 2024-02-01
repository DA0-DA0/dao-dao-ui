// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLink,
  DaoPageWrapper,
  DaoPageWrapperProps,
  LinkWrapper,
  ProfileDaoHomeCard,
  ProfileDisconnectedCard,
  SuspenseLoader,
  useDaoTabs,
  useFollowingDaos,
  useMembership,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import {
  DaoDappTabbedHome,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, DaoPageMode, DaoTabId, Feature } from '@dao-dao/types'
import {
  SITE_URL,
  getDaoPath,
  getDaoProposalSinglePrefill,
} from '@dao-dao/utils'

const InnerDaoHome = () => {
  const { t } = useTranslation()
  const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()

  const daoInfo = useDaoInfoContext()

  // If no parent, fallback to current DAO since it's already loaded from the
  // above hook. We won't use this value unless there's a parent. It's redundant
  // but has no effect.
  const { isMember: isMemberOfParent = false } = useMembership(
    daoInfo.parentDao ?? daoInfo
  )

  const parentProposalRecognizeSubDaoHref =
    // Only show this prefill proposal link if the wallet is a member of the
    // parent.
    isMemberOfParent &&
    // Only v2+ DAOs support SubDAOs.
    daoInfo.supportedFeatures[Feature.SubDaos] &&
    // Only show if the parent has not already registered this as a SubDAO.
    daoInfo.parentDao &&
    !daoInfo.parentDao.registeredSubDao
      ? getDaoProposalPath(daoInfo.parentDao.coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill({
            title: t('title.recognizeSubDao', {
              name: daoInfo.name,
            }),
            description: t('info.recognizeSubDaoDescription', {
              name: daoInfo.name,
            }),
            actions: [
              {
                actionKey: ActionKey.ManageSubDaos,
                data: {
                  toAdd: [
                    {
                      addr: daoInfo.coreAddress,
                    },
                  ],
                  toRemove: [],
                },
              },
            ],
          }),
        })
      : undefined

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos(daoInfo.chainId)
  const following = isFollowing(daoInfo.coreAddress)

  const loadingTabs = useDaoTabs()
  // Just a type-check because some tabs are loaded at the beginning.
  const tabs = loadingTabs.loading ? undefined : loadingTabs.data
  // Default to proposals tab for type-check, but should never happen as some
  // tabs are loaded at the beginning.
  const firstTabId = tabs?.[0].id || DaoTabId.Proposals

  // Pre-fetch tabs.
  useEffect(() => {
    tabs?.forEach((tab) => {
      router.prefetch(getDaoPath(daoInfo.coreAddress, tab.id))
    })
  }, [daoInfo.coreAddress, getDaoPath, router, tabs])

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

    // If no slug and on current DAO, redirect to first tab.
    if (slug.length === 0) {
      router.replace(getDaoPath(daoInfo.coreAddress, firstTabId), undefined, {
        shallow: true,
      })
    }
  }, [daoInfo.coreAddress, getDaoPath, router, slug.length, firstTabId])

  const tabId =
    slug.length > 0 && tabs?.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId
  const onSelectTabId = (tabId: string) =>
    router.replace(getDaoPath(daoInfo.coreAddress, tabId), undefined, {
      shallow: true,
    })

  return (
    <DaoDappTabbedHome
      ButtonLink={ButtonLink}
      LinkWrapper={LinkWrapper}
      SuspenseLoader={SuspenseLoader}
      daoInfo={daoInfo}
      follow={{
        following,
        onFollow: () =>
          following
            ? setUnfollowing(daoInfo.coreAddress)
            : setFollowing(daoInfo.coreAddress),
        updatingFollowing,
      }}
      onSelectTabId={onSelectTabId}
      parentProposalRecognizeSubDaoHref={parentProposalRecognizeSubDaoHref}
      rightSidebarContent={
        <SuspenseLoader
          fallback={<ProfileDisconnectedCard className="animate-pulse" />}
        >
          <ProfileDaoHomeCard />
        </SuspenseLoader>
      }
      selectedTabId={tabId}
      tabs={tabs || []}
    />
  )
}

const DaoHomePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <InnerDaoHome />
  </DaoPageWrapper>
)

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Dapp,
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Dapp, coreAddress),
  }),
})

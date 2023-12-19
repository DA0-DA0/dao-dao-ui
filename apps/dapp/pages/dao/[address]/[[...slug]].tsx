// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import {
  DaoInfoBar,
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
import { useActionForKey } from '@dao-dao/stateful/actions'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import {
  DaoDappTabbedHome,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, DaoPageMode, DaoTabId } from '@dao-dao/types'
import {
  SITE_URL,
  getDaoPath,
  getDaoProposalSinglePrefill,
} from '@dao-dao/utils'

const InnerDaoHome = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()

  const daoInfo = useDaoInfoContext()

  // If no parent, fallback to current address since it's already loaded from
  // the above hook. We won't use this value unless there's a parent. It's
  // redundant but has no effect.
  const { isMember: isMemberOfParent } = useMembership(
    daoInfo.parentDao ?? daoInfo
  )
  const parentDaosSubDaosLoadable = useRecoilValueLoadable(
    daoInfo.parentDao
      ? DaoCoreV2Selectors.listAllSubDaosSelector({
          chainId,
          contractAddress: daoInfo.parentDao.coreAddress,
        })
      : constSelector(undefined)
  )

  // Check if action exists, since v1 DAOs do not have this action.
  const manageSubDaosAction = useActionForKey(ActionKey.ManageSubDaos)
  // Prefill URL only valid if action exists.
  const prefillValid = !!manageSubDaosAction
  const addSubDaoProposalPrefillHref =
    prefillValid && daoInfo.parentDao && manageSubDaosAction
      ? getDaoProposalPath(daoInfo.parentDao.coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill(
            manageSubDaosAction
              ? {
                  title: t('title.recognizeSubDao', {
                    name: daoInfo.name,
                  }),
                  description: t('info.recognizeSubDaoDescription', {
                    name: daoInfo.name,
                  }),
                  actions: [
                    {
                      actionKey: manageSubDaosAction.action.key,
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
                }
              : {}
          ),
        })
      : undefined
  useEffect(() => {
    if (!addSubDaoProposalPrefillHref) {
      return
    }
    router.prefetch(addSubDaoProposalPrefillHref)
  }, [addSubDaoProposalPrefillHref, router])
  // Notify if parent has not yet added subDAO.
  const notifiedNotAddedSubDao = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (
      daoInfo.parentDao &&
      parentDaosSubDaosLoadable.state === 'hasValue' &&
      parentDaosSubDaosLoadable.contents &&
      !parentDaosSubDaosLoadable.contents.some(
        ({ addr }) => addr === daoInfo.coreAddress
      ) &&
      notifiedNotAddedSubDao.current !== daoInfo.coreAddress
    ) {
      if (isMemberOfParent && addSubDaoProposalPrefillHref) {
        toast(
          <p
            className="cursor-pointer transition-opacity hover:opacity-80 active:opacity-70"
            onClick={() => router.push(addSubDaoProposalPrefillHref)}
          >
            {t('info.subDaoNeedsAdding', {
              parent: daoInfo.parentDao.name,
              child: daoInfo.name,
            })}{' '}
            <span className="underline">
              {t('button.clickHereToProposeAdding')}
            </span>
          </p>
        )
      } else {
        toast.success(
          t('info.subDaoNeedsAdding', {
            parent: daoInfo.parentDao.name,
            child: daoInfo.name,
          })
        )
      }

      notifiedNotAddedSubDao.current = daoInfo.coreAddress
    }
  }, [
    addSubDaoProposalPrefillHref,
    daoInfo.coreAddress,
    daoInfo.name,
    daoInfo.parentDao,
    isMemberOfParent,
    parentDaosSubDaosLoadable.contents,
    parentDaosSubDaosLoadable.state,
    router,
    t,
  ])

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
      router.push(getDaoPath(daoInfo.coreAddress, firstTabId), undefined, {
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
    router.push(getDaoPath(daoInfo.coreAddress, tabId), undefined, {
      shallow: true,
    })

  return (
    <DaoDappTabbedHome
      DaoInfoBar={DaoInfoBar}
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

export const getStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Dapp,
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Dapp, coreAddress),
  }),
})

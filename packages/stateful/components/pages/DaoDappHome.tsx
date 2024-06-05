import { Add } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDappTabbedHome,
  FollowingToggle,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  DaoDappTabbedHomeProps,
  DaoTabId,
  DaoTabWithComponent,
  Feature,
  FollowState,
  LoadingData,
} from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import {
  useDaoTabs,
  useFollowingDaos,
  useGovDaoTabs,
  useMembership,
} from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'

export type InnerDaoDappHomeProps = Pick<
  DaoDappTabbedHomeProps,
  'parentProposalRecognizeSubDaoHref'
> & {
  loadingTabs: LoadingData<DaoTabWithComponent[]>
}

export const InnerDaoDappHome = ({
  loadingTabs,
  ...props
}: InnerDaoDappHomeProps) => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()
  const following = isFollowing({
    chainId: daoInfo.chainId,
    coreAddress: daoInfo.coreAddress,
  })

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

  const follow: FollowState = {
    following,
    onFollow: () =>
      (following ? setUnfollowing : setFollowing)({
        chainId: daoInfo.chainId,
        coreAddress: daoInfo.coreAddress,
      }),
    updatingFollowing,
  }

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          current: daoInfo.name,
          daoInfo,
        }}
        rightNode={
          <>
            {/* Show propose button on desktop. */}
            <ButtonLink
              className="hidden md:block"
              contentContainerClassName="text-text-body text-base !gap-1.5"
              href={getDaoProposalPath(daoInfo.coreAddress, 'create')}
              variant="ghost"
            >
              <Add className="!h-5 !w-5 !text-icon-primary" />
              {t('button.propose')}
            </ButtonLink>

            {/* Show follow button on mobile. */}
            <FollowingToggle
              {...follow}
              className="md:hidden"
              contentContainerClassName="text-text-body text-sm"
              variant="ghost"
            />
          </>
        }
      />

      <DaoDappTabbedHome
        {...props}
        ButtonLink={ButtonLink}
        LinkWrapper={LinkWrapper}
        SuspenseLoader={SuspenseLoader}
        follow={follow}
        onSelectTabId={onSelectTabId}
        selectedTabId={tabId}
        tabs={tabs || []}
      />
    </>
  )
}

export const DaoDappHome = () => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()

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

  const loadingTabs = useDaoTabs()

  return (
    <InnerDaoDappHome
      loadingTabs={loadingTabs}
      parentProposalRecognizeSubDaoHref={parentProposalRecognizeSubDaoHref}
    />
  )
}

export const ChainGovernanceDappHome = () => {
  const loadingTabs = useGovDaoTabs()
  return <InnerDaoDappHome loadingTabs={loadingTabs} />
}

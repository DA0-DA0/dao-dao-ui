import { ArrowOutwardRounded } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDappTabbedHome,
  useConfiguredChainContext,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, ContractVersion, DaoTabId, Feature } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useDaoTabs, useFollowingDaos, useMembership } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoDappHome = () => {
  const { t } = useTranslation()
  const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()
  const { config: chainConfig } = useConfiguredChainContext()

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
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          current: daoInfo.name,
        }}
        rightNode={
          daoInfo.coreVersion === ContractVersion.Gov ? (
            chainConfig?.explorerUrlTemplates?.gov ? (
              // Go to governance page of chain explorer.
              <IconButtonLink
                Icon={ArrowOutwardRounded}
                href={chainConfig.explorerUrlTemplates.gov}
                variant="ghost"
              />
            ) : undefined
          ) : (
            <ButtonLink
              contentContainerClassName="text-text-primary text-sm"
              href={getDaoProposalPath(daoInfo.coreAddress, 'create')}
              variant="ghost"
            >
              {t('button.propose')}
            </ButtonLink>
          )
        }
      />

      <DaoDappTabbedHome
        ButtonLink={ButtonLink}
        LinkWrapper={LinkWrapper}
        SuspenseLoader={SuspenseLoader}
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
        selectedTabId={tabId}
        tabs={tabs || []}
      />
    </>
  )
}

import {
  AccountBalanceWalletOutlined,
  AccountBalanceWalletRounded,
  ArrowOutwardRounded,
  FiberSmartRecordOutlined,
  FiberSmartRecordRounded,
  HowToVoteOutlined,
  HowToVoteRounded,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ChainPickerPopup,
  DaoDappTabbedHome,
  useConfiguredChainContext,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ContractVersion, DaoTabId, DaoTabWithComponent } from '@dao-dao/types'
import {
  CHAIN_SUBDAOS,
  getConfiguredChainConfig,
  getConfiguredChains,
  getGovPath,
} from '@dao-dao/utils'

import { ButtonLink } from '../ButtonLink'
import { GovCommunityPoolTab, GovProposalsTab, GovSubDaosTab } from '../gov'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'

export const ChainGovernanceHome = () => {
  const { t } = useTranslation()
  const {
    chainId,
    config: { name, explorerUrlTemplates },
  } = useConfiguredChainContext()
  const { coreVersion } = useDaoInfoContext()

  const router = useRouter()

  const tabs: DaoTabWithComponent[] = useRef([
    {
      id: DaoTabId.Proposals,
      label: t('title.proposals'),
      Component: GovProposalsTab,
      Icon: HowToVoteOutlined,
      IconFilled: HowToVoteRounded,
    },
    {
      id: DaoTabId.Treasury,
      label: t('title.communityPool'),
      Component: GovCommunityPoolTab,
      Icon: AccountBalanceWalletOutlined,
      IconFilled: AccountBalanceWalletRounded,
      lazy: true,
    },
    // If SubDAOs exist, show them.
    ...(CHAIN_SUBDAOS[chainId]?.length
      ? [
          {
            id: DaoTabId.SubDaos,
            label: t('title.subDaos'),
            Component: GovSubDaosTab,
            Icon: FiberSmartRecordOutlined,
            IconFilled: FiberSmartRecordRounded,
          },
        ]
      : []),
  ]).current
  const firstTabId = tabs[0].id

  // Pre-fetch tabs.
  useEffect(() => {
    tabs.forEach((tab) => {
      router.prefetch(getGovPath(name, tab.id))
    })
  }, [name, router, tabs])

  const slug = (router.query.slug || []) as string[]
  const checkedSlug = useRef(false)
  useEffect(() => {
    // Only check one time, in case they load the page with no slug.
    if (checkedSlug.current) {
      return
    }
    checkedSlug.current = true

    // If no slug, redirect to first tab.
    if (slug.length === 0) {
      router.replace(getGovPath(name, firstTabId), undefined, {
        shallow: true,
      })
    }
  }, [router, slug.length, firstTabId, name])

  const tabId =
    slug.length > 0 && tabs.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId
  const onSelectTabId = (tabId: string) =>
    router.replace(getGovPath(name, tabId), undefined, {
      shallow: true,
    })

  const [goingToChainId, setGoingToChainId] = useState<string>()
  // Pre-fetch other chains.
  useEffect(() => {
    getConfiguredChains().forEach(({ name }) => {
      router.prefetch(getGovPath(name, tabId))
    })
  }, [router, tabId])

  const explorerButton =
    coreVersion === ContractVersion.Gov && explorerUrlTemplates?.gov ? (
      // Go to governance page of chain explorer.
      <IconButtonLink
        Icon={ArrowOutwardRounded}
        href={explorerUrlTemplates.gov}
        variant="ghost"
      />
    ) : undefined

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          override: true,
          current: (
            <ChainPickerPopup
              chains={{
                type: 'configured',
                onlyGov: true,
              }}
              headerMode
              loading={!!goingToChainId && goingToChainId !== chainId}
              onSelect={(chainId) => {
                // Type-check. None option is not enabled so this shouldn't
                // happen.
                if (!chainId) {
                  return
                }

                const chainConfig = getConfiguredChainConfig(chainId)
                if (chainConfig) {
                  router.push(getGovPath(chainConfig.name, tabId))
                  setGoingToChainId(chainId)
                }
              }}
              selectedChainId={chainId}
              // Match title in `PageHeader`.
              selectedLabelClassName="header-text truncate text-lg leading-[5rem] sm:text-xl"
            />
          ),
        }}
        rightNode={explorerButton}
      />

      <DaoDappTabbedHome
        ButtonLink={ButtonLink}
        LinkWrapper={LinkWrapper}
        SuspenseLoader={SuspenseLoader}
        onSelectTabId={onSelectTabId}
        selectedTabId={tabId}
        tabs={tabs}
      />
    </>
  )
}

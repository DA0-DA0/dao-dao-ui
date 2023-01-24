import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoHomeProps, DaoHomeTab } from '@dao-dao/types'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

import {
  DaoHeader,
  Loader,
  SegmentedControls,
  useAppLayoutContext,
} from '../components'

export const DaoHome = ({
  daoInfo,
  follow,
  DiscordNotifierConfigureModal,
  daoInfoBar,
  rightSidebarContent,
  SuspenseLoader,
  LinkWrapper,
  ProposalsTab,
  TreasuryAndNftsTab,
  SubDaosTab,
  extraTabs,
}: DaoHomeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const tabs: DaoHomeTab[] = [
    {
      id: 'proposals',
      label: t('title.proposals'),
      Component: ProposalsTab,
    },
    {
      id: 'treasury',
      label: t('title.treasuryAndNfts'),
      Component: TreasuryAndNftsTab,
    },
    {
      id: 'subdaos',
      label: t('title.subDaos'),
      Component: SubDaosTab,
    },
    ...extraTabs,
  ]

  const [selectedTab, setSelectedTab] = useState(() => {
    // Default to tab from URL hash if present and valid.
    const windowHash =
      typeof window === 'undefined'
        ? undefined
        : window.location.hash.replace('#', '')

    return windowHash && tabs.some(({ id }) => id === windowHash)
      ? windowHash
      : tabs[0].id
  })

  // Store selected tab in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.location.hash.replace('#', '') !== selectedTab) {
      window.location.hash = selectedTab
    }
  }, [selectedTab])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        breadcrumbs={{
          crumbs: [
            { href: '/home', label: 'Home' },
            ...getParentDaoBreadcrumbs(daoInfo.parentDao),
          ],
          current: daoInfo.name,
        }}
        className="mx-auto max-w-5xl"
        gradient
        rightNode={<DiscordNotifierConfigureModal />}
      />

      <div className="relative z-[1] mx-auto flex max-w-5xl flex-col items-stretch">
        <DaoHeader
          LinkWrapper={LinkWrapper}
          coreAddress={daoInfo.coreAddress}
          description={daoInfo.description}
          established={daoInfo.created && formatDate(daoInfo.created)}
          follow={follow}
          imageUrl={daoInfo.imageUrl}
          name={daoInfo.name}
          parentDao={daoInfo.parentDao}
        />

        {daoInfoBar}

        <div className="flex flex-col items-center border-y border-t-border-base border-b-border-secondary py-6">
          <SegmentedControls
            className="w-full max-w-2xl shrink"
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
          />
        </div>

        <div className="py-6">
          {tabs.map(({ id, Component }) => (
            <div key={id} className={clsx(selectedTab !== id && 'hidden')}>
              <SuspenseLoader fallback={<Loader />}>
                <Component />
              </SuspenseLoader>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoInfo,
  FollowState,
  LinkWrapperProps,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

import {
  DaoHeader,
  Loader,
  SegmentedControls,
  useAppLayoutContext,
} from '../components'

export interface DaoHomeProps {
  daoInfo: DaoInfo
  follow: FollowState
  DiscordNotifierConfigureModal: ComponentType
  daoInfoBar: ReactNode
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  // Tabs
  proposalsTab: ReactNode
  treasuryAndNftsTab: ReactNode
  subDaosTab: ReactNode
  membersTab?: ReactNode
  payrollTab?: ReactNode
}

export const DaoHome = ({
  daoInfo,
  follow,
  DiscordNotifierConfigureModal,
  daoInfoBar,
  rightSidebarContent,
  SuspenseLoader,
  LinkWrapper,
  proposalsTab,
  treasuryAndNftsTab,
  subDaosTab,
  membersTab,
  payrollTab,
}: DaoHomeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const windowHash =
    typeof window === 'undefined'
      ? undefined
      : window.location.hash.replace('#', '')
  // Default to tab from URL hash if present.
  const [selectedTab, setSelectedTab] = useState(
    windowHash && TabValues.includes(windowHash as Tab)
      ? (windowHash as Tab)
      : Tab.Proposals
  )

  const tabs = [
    Tab.Proposals,
    Tab.TreasuryAndNfts,
    Tab.SubDaos,
    // Don't include Members if no membersTab.
    ...(membersTab !== undefined ? [Tab.Members] : []),
    // Don't include Payroll if no payrollTab.
    ...(payrollTab !== undefined ? [Tab.Payroll] : []),
  ].map((tab) => ({
    label: t(TabTitleI18nKeyMap[tab]),
    value: tab,
  }))

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
            tabs={tabs}
          />
        </div>

        <div className="py-6">
          <div className={clsx(selectedTab !== Tab.Proposals && 'hidden')}>
            <SuspenseLoader fallback={<Loader />}>
              {proposalsTab}
            </SuspenseLoader>
          </div>
          <div
            className={clsx(selectedTab !== Tab.TreasuryAndNfts && 'hidden')}
          >
            <SuspenseLoader fallback={<Loader />}>
              {treasuryAndNftsTab}
            </SuspenseLoader>
          </div>
          <div className={clsx(selectedTab !== Tab.SubDaos && 'hidden')}>
            <SuspenseLoader fallback={<Loader />}>{subDaosTab}</SuspenseLoader>
          </div>
          {membersTab !== undefined && (
            <div className={clsx(selectedTab !== Tab.Members && 'hidden')}>
              <SuspenseLoader fallback={<Loader />}>
                {membersTab}
              </SuspenseLoader>
            </div>
          )}
          {payrollTab !== undefined && (
            <div className={clsx(selectedTab !== Tab.Payroll && 'hidden')}>
              <SuspenseLoader fallback={<Loader />}>
                {payrollTab}
              </SuspenseLoader>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Value used in URL hash.
enum Tab {
  Proposals = 'proposals',
  TreasuryAndNfts = 'treasury',
  SubDaos = 'subdaos',
  Members = 'members',
  Payroll = 'payroll',
}
const TabValues = Object.values(Tab)

export const TabTitleI18nKeyMap: Record<Tab, string> = {
  [Tab.Proposals]: 'title.proposals',
  [Tab.TreasuryAndNfts]: 'title.treasuryAndNfts',
  [Tab.SubDaos]: 'title.subDaos',
  [Tab.Members]: 'title.members',
  [Tab.Payroll]: 'title.payroll',
}

import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'

import { DaoInfo } from '@dao-dao/tstypes'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

import {
  DaoHeader,
  PinToggle,
  SegmentedControls,
  useAppLayoutContext,
} from '../components'

export interface DaoHomeProps {
  daoInfo: DaoInfo
  pinned: boolean
  onPin: () => void
  daoInfoBar: ReactNode
  // Tabs
  proposalsTab: ReactNode
  treasuryAndNftsTab: ReactNode
  subDaosTab: ReactNode
  membersTab?: ReactNode
  rightSidebarContent: ReactNode
}

export const DaoHome = ({
  daoInfo,
  pinned,
  onPin,
  daoInfoBar,
  proposalsTab,
  treasuryAndNftsTab,
  subDaosTab,
  membersTab,
  rightSidebarContent,
}: DaoHomeProps) => {
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
  ].map((tab) => ({
    label: TabTitleMap[tab],
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
        className="mx-auto max-w-6xl"
        gradient
        rightNode={<PinToggle onPin={onPin} pinned={pinned} />}
      />

      <div className="flex relative z-[1] flex-col items-stretch mx-auto max-w-6xl">
        <DaoHeader
          coreAddress={daoInfo.coreAddress}
          description={daoInfo.description}
          established={daoInfo.created && formatDate(daoInfo.created)}
          imageUrl={daoInfo.imageUrl}
          name={daoInfo.name}
          parentDao={daoInfo.parentDao}
        />

        {daoInfoBar}

        <div className="flex flex-col items-center py-6 border-y border-t-border-base border-b-border-secondary">
          <SegmentedControls
            className="shrink w-full max-w-2xl"
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs}
          />
        </div>

        <div className="py-6">
          <div className={clsx(selectedTab !== Tab.Proposals && 'hidden')}>
            {proposalsTab}
          </div>
          <div
            className={clsx(selectedTab !== Tab.TreasuryAndNfts && 'hidden')}
          >
            {treasuryAndNftsTab}
          </div>
          <div className={clsx(selectedTab !== Tab.SubDaos && 'hidden')}>
            {subDaosTab}
          </div>
          {membersTab !== undefined && (
            <div className={clsx(selectedTab !== Tab.Members && 'hidden')}>
              {membersTab}
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
}
const TabValues = Object.values(Tab)

export const TabTitleMap: Record<Tab, string> = {
  [Tab.Proposals]: 'Proposals',
  [Tab.TreasuryAndNfts]: 'Treasury & NFTs',
  [Tab.SubDaos]: 'SubDAOs',
  [Tab.Members]: 'Members',
}

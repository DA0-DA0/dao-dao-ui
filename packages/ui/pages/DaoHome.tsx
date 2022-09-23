import clsx from 'clsx'
import { ReactNode, useState } from 'react'

import { DaoInfo } from '@dao-dao/tstypes'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

import {
  DaoHeader,
  GradientHero,
  PageHeader,
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
  const { RightSidebarContent } = useAppLayoutContext()
  const [selectedTab, setSelectedTab] = useState(Tab.Proposals)

  const tabs = [
    Tab.Proposals,
    Tab.TreasuryAndNfts,
    Tab.SubDaos,
    // Don't include Members if no membersTab.
    ...(membersTab !== undefined ? [Tab.Members] : []),
  ].map((tab) => ({
    label: tab,
    value: tab,
  }))

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      {/* No container padding because we want the gradient to expand. Apply px-6 to children instead. */}
      <div className="flex flex-col items-stretch mx-auto max-w-6xl">
        <GradientHero childContainerClassName="px-6">
          <PageHeader
            breadcrumbs={{
              crumbs: [
                { href: '/home', label: 'Home' },
                ...getParentDaoBreadcrumbs(daoInfo.parentDao),
              ],
              current: daoInfo.name,
            }}
            rightNode={<PinToggle onPin={onPin} pinned={pinned} />}
          />

          <DaoHeader
            coreAddress={daoInfo.coreAddress}
            description={daoInfo.description}
            established={daoInfo.created && formatDate(daoInfo.created)}
            imageUrl={daoInfo.imageUrl}
            name={daoInfo.name}
          />

          {daoInfoBar}
        </GradientHero>

        <div className="px-6">
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
      </div>
    </>
  )
}

enum Tab {
  Proposals = 'Proposals',
  TreasuryAndNfts = 'Treasury & NFTs',
  SubDaos = 'SubDAOs',
  Members = 'Members',
}

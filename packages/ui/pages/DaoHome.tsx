import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import { formatDate } from '@dao-dao/utils'

import {
  Breadcrumbs,
  DaoImage,
  GradientHero,
  MarkdownPreview,
  PinToggle,
  SegmentedControls,
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
  membersTab: ReactNode
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
}: DaoHomeProps) => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(Tab.Proposals)

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <div className="flex flex-col items-stretch mx-auto max-w-6xl">
      <GradientHero childContainerClassName="px-6">
        <div className="flex flex-row gap-6 justify-between items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }]}
            current={daoInfo.name}
          />

          <PinToggle onPin={onPin} pinned={pinned} />
        </div>

        <div className="flex flex-col items-center py-10">
          <DaoImage imageUrl={daoInfo.imageUrl} size="lg" />

          <p className="mt-6 text-center hero-text">{daoInfo.name}</p>
          {daoInfo.created && (
            <p className="mt-2 text-text-tertiary primary-text">
              {t('info.establishedAbbr')} {formatDate(daoInfo.created)}
            </p>
          )}

          <MarkdownPreview
            className="mt-3 whitespace-pre-wrap body-text"
            markdown={daoInfo.description}
          />
        </div>

        {daoInfoBar}
      </GradientHero>

      <div className="px-6">
        <div className="flex flex-col items-center py-6 border-y border-t-border-base border-b-border-secondary">
          <SegmentedControls
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
          <div className={clsx(selectedTab !== Tab.Members && 'hidden')}>
            {membersTab}
          </div>
        </div>
      </div>
    </div>
  )
}

enum Tab {
  Proposals = 'Proposals',
  TreasuryAndNfts = 'Treasury & NFTs',
  SubDaos = 'SubDAOs',
  Members = 'Members',
}

const tabs = [Tab.Proposals, Tab.TreasuryAndNfts, Tab.SubDaos, Tab.Members].map(
  (tab) => ({
    label: tab,
    value: tab,
  })
)

import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDate } from '@dao-dao/utils'

import {
  Breadcrumbs,
  BreadcrumbsProps,
  DaoImage,
  GradientHero,
  MarkdownPreview,
  SegmentedControls,
} from '../../components'

export interface CreateDaoStartProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs: BreadcrumbsProps['crumbs']
}

export const CreateDaoStart = ({ extraCrumbs }: CreateDaoStartProps) => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(Tab.Proposals)

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <div className="flex flex-col items-stretch mx-auto max-w-6xl">
      <GradientHero childContainerClassName="px-6">
        <div className="flex flex-row items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }, ...extraCrumbs]}
            current={t('title.newDao')}
          />
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

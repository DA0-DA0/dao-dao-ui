import {
  DescriptionOutlined,
  HowToVote,
  Link,
  LockOutlined,
  PeopleOutlined,
  Public,
  Search,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDaoIndexerAllStats,
  LoadingData,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import {
  Button,
  DaoInfoCards,
  HorizontalScroller,
  SegmentedControls,
} from '../components'

export type HomeProps = {
  /**
   * The stats.
   */
  stats: DaoDaoIndexerAllStats
  /**
   * The DAO card to render.
   */
  DaoCard: ComponentType<StatefulDaoCardProps>
  /**
   * Featured DAO cards to display on the home page.
   */
  featuredDaos: LoadingData<StatefulDaoCardProps[]>
  /**
   * Optionally show chain x/gov DAO cards.
   */
  chainGovDaos?: LoadingData<StatefulDaoCardProps[]>
  /**
   * Function to open the search modal.
   */
  openSearch: () => void
}

type StatsMode = 'all' | 'month' | 'week'

export const Home = ({
  stats,
  DaoCard,
  chainGovDaos,
  featuredDaos,
  openSearch,
}: HomeProps) => {
  const { t } = useTranslation()

  const [statsMode, setStatsMode] = useState<StatsMode>('all')

  return (
    <>
      <SegmentedControls<StatsMode>
        className="w-max mb-4"
        onSelect={setStatsMode}
        selected={statsMode}
        tabs={[
          {
            label: t('title.all'),
            value: 'all',
          },
          {
            label: '30d',
            value: 'month',
          },
          {
            label: '7d',
            value: 'week',
          },
        ]}
      />

      <DaoInfoCards
        cards={[
          {
            Icon: Public,
            label: t('title.daos'),
            value: stats[statsMode].daos.toLocaleString(),
          },
          {
            Icon: DescriptionOutlined,
            label: t('title.proposals'),
            value: stats[statsMode].proposals.toLocaleString(),
          },
          {
            Icon: HowToVote,
            label: t('title.votesCast'),
            value: stats[statsMode].votes.toLocaleString(),
          },
          {
            Icon: PeopleOutlined,
            label: t('title.uniqueVoters'),
            value: stats[statsMode].uniqueVoters.toLocaleString(),
          },
          // Only show TVL and chain count when all is selected.
          ...(statsMode === 'all'
            ? [
                {
                  Icon: LockOutlined,
                  label: t('title.tvl'),
                  tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
                  value:
                    '$' +
                    stats.tvl.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                },
                // Only show the chain count if more than 1 (i.e. not on a
                // chain-specific home page).
                ...(stats.chains > 1
                  ? [
                      {
                        Icon: Link,
                        label: t('title.chains'),
                        tooltip: t('info.chainsDeployedTooltip'),
                        value: stats.chains.toLocaleString(),
                      },
                    ]
                  : []),
              ]
            : []),
        ]}
        className="mb-8"
        valueClassName="text-text-brand-secondary font-semibold font-mono"
        wrap
      />

      {/* Chain governance DAOs */}
      {chainGovDaos && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex-row items-center xs:items-end flex gap-2 justify-between self-stretch">
            <p className="title-text text-lg">{t('title.chainGovernance')}</p>

            <Button
              contentContainerClassName="!gap-1.5 xs:!gap-2"
              onClick={openSearch}
              variant="none"
            >
              <Search
                className="!text-icon-secondary !h-6 !w-6 xs:!h-5 xs:!w-5"
                onClick={openSearch}
              />
              <p className="secondary-text xs:block hidden">
                {t('button.findAnotherChain')}
              </p>
            </Button>
          </div>

          <HorizontalScroller
            Component={DaoCard}
            containerClassName={clsx(
              'self-stretch px-[1px]',
              (chainGovDaos.loading || chainGovDaos.data.length > 0) &&
                UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
            )}
            // Margin offsets container padding.
            itemClassName="w-64"
            items={chainGovDaos}
            // Max width of 5xl = 64rem, container padding of 6 = 1.5rem
            shadowClassName="w-[max((100%-64rem)/2,1.5rem)]"
          />
        </div>
      )}

      {/* Featured DAOs */}
      <div className="flex flex-col items-center gap-4 mb-2">
        <div className="flex-row items-center xs:items-end flex gap-2 justify-between self-stretch">
          <p className="title-text text-lg">{t('title.featuredDaos')}</p>

          <Button
            contentContainerClassName="!gap-1.5 xs:!gap-2"
            onClick={openSearch}
            variant="none"
          >
            <Search
              className="!text-icon-secondary !h-6 !w-6 xs:!h-5 xs:!w-5"
              onClick={openSearch}
            />
            <p className="secondary-text xs:block hidden">
              {t('button.findAnotherDao')}
            </p>
          </Button>
        </div>

        <HorizontalScroller
          // Margin offsets container padding.
          Component={DaoCard}
          containerClassName={clsx(
            'self-stretch px-[1px]',
            (featuredDaos.loading || featuredDaos.data.length > 0) &&
              UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
          )}
          itemClassName="w-64"
          items={featuredDaos}
          // Max width of 5xl = 64rem, container padding of 6 = 1.5rem
          shadowClassName="w-[max((100%-64rem)/2,1.5rem)]"
        />
      </div>
    </>
  )
}

import {
  DescriptionOutlined,
  HowToVote,
  Link,
  LockOutlined,
  PeopleOutlined,
  Public,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDaoIndexerAllStats,
  LoadingData,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import { DaoInfoCards, HorizontalScroller } from '../components'

export type HomeProps = {
  stats: DaoDaoIndexerAllStats
  DaoCard: ComponentType<StatefulDaoCardProps>
  chainDaos: LoadingData<StatefulDaoCardProps[]>
  featuredDaos: LoadingData<StatefulDaoCardProps[]>
}

export const Home = ({
  stats,
  DaoCard,
  chainDaos,
  featuredDaos,
}: HomeProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col items-stretch gap-4">
        <p className="title-text self-start text-lg">
          {t('title.daoDaoCommunityStatistics')}
        </p>

        <DaoInfoCards
          cards={[
            {
              Icon: Public,
              label: t('title.daos'),
              value: stats.daos.toLocaleString(),
            },
            {
              Icon: DescriptionOutlined,
              label: t('title.proposals'),
              value: stats.proposals.toLocaleString(),
            },
            {
              Icon: HowToVote,
              label: t('title.votesCast'),
              value: stats.votes.toLocaleString(),
            },
            {
              Icon: Link,
              label: t('title.chains'),
              tooltip: t('info.chainsDeployedTooltip'),
              value: stats.chains.toLocaleString(),
            },
            {
              Icon: PeopleOutlined,
              label: t('title.uniqueVoters'),
              value: stats.uniqueVoters.toLocaleString(),
            },
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
          ]}
          valueClassName="text-text-brand-secondary font-semibold font-mono"
          wrap
        />
      </div>

      <div className="flex flex-col items-center gap-4 my-8">
        <p className="title-text self-start text-lg">
          {t('title.chainGovernance')}
        </p>

        {/* Chain governance container */}
        <HorizontalScroller
          Component={DaoCard}
          containerClassName={clsx(
            'self-stretch px-[1px]',
            (chainDaos.loading || chainDaos.data.length > 0) &&
              UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
          )}
          // Margin offsets container padding.
          itemClassName="w-64"
          items={chainDaos}
          // Max width of 5xl = 64rem, container padding of 6 = 1.5rem
          shadowClassName="w-[max((100%-64rem)/2,1.5rem)]"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="title-text self-start text-lg">
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
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

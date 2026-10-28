import {
  DescriptionOutlined,
  HowToVote,
  Link,
  LockOutlined,
  PeopleOutlined,
  Public,
  Search,
  WarningRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDaoIndexerAllStats,
  LazyDaoCardProps,
  LoadingData,
  LoadingDataWithError,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import {
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES,
} from '@dao-dao/utils'

import {
  Button,
  DaoCardLoader,
  DaoInfoCards,
  ErrorPage,
  GridCardContainer,
  HorizontalScroller,
  NoContent,
  SearchBar,
  SegmentedControls,
} from '../components'
import { UseInfiniteScrollReturn } from '../hooks'

export type HomeProps = {
  /**
   * The stats.
   */
  statsMode?: StatsMode
  onStatsModeChange?: (mode: StatsMode) => void
  stats: DaoDaoIndexerAllStats
  /**
   * The DAO card to render.
   */
  DaoCard: ComponentType<StatefulDaoCardProps>
  /**
   * Optionally show chain x/gov DAO cards.
   */
  chainGovDaos?: LoadingData<StatefulDaoCardProps[]>
  /**
   * Featured DAO cards to display on the home page.
   */
  featuredDaos: LoadingData<StatefulDaoCardProps[]>
  /**
   * DAO search stuff.
   *
   * Only defined if search should be shown.
   */
  search?: {
    /**
     * The lazy DAO card to render.
     */
    LazyDaoCard: ComponentType<LazyDaoCardProps>
    /**
     * DAOs to show in searchable list.
     */
    searchedDaos: LoadingDataWithError<LazyDaoCardProps[]>
    /**
     * Whether or not there are more DAOs to load.
     */
    hasMore: boolean
    /**
     * Count of hits found.
     */
    totalHits?: number
    /**
     * Search query.
     *
     * Only defined if search should be shown.
     */
    query: string
    /**
     * Function to set the search query.
     *
     * Only defined if search should be shown.
     */
    setQuery: (query: string) => void
  } & UseInfiniteScrollReturn
  /**
   * Function to open the search modal.
   */
  openSearch: () => void
}

export type StatsMode = 'all' | 'month' | 'week'

export const Home = ({
  stats,
  statsMode: controlledStatsMode,
  onStatsModeChange,
  DaoCard,
  chainGovDaos,
  featuredDaos,
  search,
  openSearch,
}: HomeProps) => {
  const { t } = useTranslation()

  const [localStatsMode, setLocalStatsMode] = useState<StatsMode>('all')
  const statsMode = controlledStatsMode ?? localStatsMode
  const setStatsMode = onStatsModeChange ?? setLocalStatsMode
  const count = (metric: 'daos' | 'proposals' | 'votes' | 'uniqueVoters') => {
    const statsForMode = stats[statsMode]
    const value = statsForMode?.[metric]
    const coverage = statsForMode?.coverage?.[metric]
    return value === null || value === undefined
      ? 'N/A'
      : value.toLocaleString() +
          (coverage && coverage.responding < coverage.attempted
            ? ` (partial: ${coverage.responding}/${coverage.attempted} chains)`
            : '')
  }

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 pt-6 pb-2',
        UNDO_PAGE_PADDING_TOP_CLASSES
      )}
    >
      <SegmentedControls<StatsMode>
        className="w-max"
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
            value: count('daos'),
          },
          {
            Icon: DescriptionOutlined,
            label: t('title.proposals'),
            value: count('proposals'),
          },
          {
            Icon: HowToVote,
            label: t('title.votesCast'),
            value: count('votes'),
          },
          {
            Icon: PeopleOutlined,
            label: t('title.uniqueVoters'),
            value: count('uniqueVoters'),
          },
          // Only show TVL and chain count when all is selected.
          ...(statsMode === 'all'
            ? [
                {
                  Icon: LockOutlined,
                  label: t('title.tvl'),
                  tooltip: t('info.platformTvlUnavailable'),
                  value:
                    stats.tvl !== null
                      ? '$' +
                        stats.tvl.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : 'N/A',
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
        className="-mt-4"
        valueClassName="text-text-interactive-valid font-semibold font-mono"
        wrap
      />

      {/* Chain governance DAOs */}
      {chainGovDaos && (
        <div className="flex flex-col items-center gap-4">
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
            contentContainerClassName="px-6"
            itemClassName="w-64"
            items={chainGovDaos}
            shadowClassName="w-6"
          />
        </div>
      )}

      {/* Featured DAOs */}
      {(featuredDaos.loading || featuredDaos.data.length > 0) && (
        <div className="flex flex-col items-center gap-4">
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
            contentContainerClassName="px-6"
            itemClassName="w-64"
            items={featuredDaos}
            shadowClassName="w-6"
          />
        </div>
      )}

      {/* DAO search */}
      {search && (
        <div className="flex flex-col gap-4" ref={search.infiniteScrollRef}>
          <p className="title-text text-lg">{t('title.allDaos')}</p>

          <SearchBar
            containerClassName="-mt-2 mb-2"
            onInput={(e) => search.setQuery(e.currentTarget.value)}
            placeholder={t('info.searchForDao')}
            value={search.query}
          />

          {search.searchedDaos.errored ? (
            <ErrorPage error={search.searchedDaos.error} />
          ) : search.searchedDaos.loading ||
            search.searchedDaos.data.length > 0 ? (
            <>
              {!!search.totalHits && (
                <p className="caption-text italic -mb-2">
                  {search.totalHits === 1000
                    ? t('info.atLeastNumDaosFound', {
                        count: search.totalHits,
                      })
                    : t('info.numDaosFound', {
                        count: search.totalHits,
                      })}
                </p>
              )}

              <GridCardContainer>
                {search.searchedDaos.loading ? (
                  [...Array(3)].map((_, index) => <DaoCardLoader key={index} />)
                ) : (
                  <>
                    {search.searchedDaos.data.map((props) => (
                      <search.LazyDaoCard
                        key={props.info.chainId + ':' + props.info.coreAddress}
                        {...props}
                      />
                    ))}
                    {search.hasMore &&
                      [...Array(3)].map((_, index) => (
                        <DaoCardLoader key={index} />
                      ))}
                  </>
                )}
              </GridCardContainer>
            </>
          ) : (
            <NoContent
              Icon={WarningRounded}
              body={t('info.nothingFound')}
              // className="h-full w-full justify-center border-0"
            />
          )}
        </div>
      )}
    </div>
  )
}

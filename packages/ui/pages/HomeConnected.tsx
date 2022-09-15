import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoCard,
  DaoCardInfo,
  DropdownOption,
  FeaturedDaos,
  GridCardContainer,
  PageHeader,
  useAppLayoutContext,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export interface HomeConnectedProps {
  featuredDaos: DaoCardInfo[]
  pinnedDaos: DaoCardInfo[]
  rightSidebarContent: ReactNode
}

const maxWidth = 'mx-auto w-full max-w-5xl'
// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const HomeConnected = ({
  featuredDaos,
  pinnedDaos,
  rightSidebarContent,
}: HomeConnectedProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent } = useAppLayoutContext()

  const sortOptions = useMemo(() => getSortOptions(pinnedDaos), [pinnedDaos])
  const { sortedData: sortedPinnedDaos, Dropdown } = useDropdownSorter(
    pinnedDaos,
    sortOptions[0].value
  )

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="flex flex-col gap-8 items-center px-6">
        <PageHeader className={maxWidth} title={t('title.home')} />

        <p className={clsx('title-text', maxWidth)}>
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        {/* Margin offsets container padding. */}
        <div className="relative self-stretch px-[1px] -mx-6">
          {/* Left shadow */}
          <div
            className={clsx(
              'absolute top-0 bottom-0 left-0 z-10',
              widthOfSidePadding
            )}
            style={{
              background:
                'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
            }}
          ></div>

          <FeaturedDaos
            featuredDaos={featuredDaos}
            isDaoPinned={() => false}
            onPin={() => {}}
          />

          {/* Right shadow */}
          <div
            className={clsx(
              'absolute top-0 right-0 bottom-0 z-10',
              widthOfSidePadding
            )}
            style={{
              background:
                'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
            }}
          ></div>
        </div>

        {/* Divider */}
        <div className={clsx('h-[1px] bg-border-secondary', maxWidth)}></div>

        <div className={clsx('flex flex-row justify-between mt-2', maxWidth)}>
          <p className="title-text">{t('title.pinned')}</p>

          <div className="flex flex-row gap-6 justify-between items-center">
            <p className="text-text-body primary-text">{t('title.sortBy')}</p>

            <Dropdown options={sortOptions} />
          </div>
        </div>

        <GridCardContainer className={clsx('mt-1', maxWidth)}>
          {sortedPinnedDaos.map((props) => (
            <DaoCard
              key={props.coreAddress}
              isMember={false}
              onPin={() => {}}
              pinned
              {...props}
            />
          ))}
        </GridCardContainer>
      </div>
    </>
  )
}

const getSortOptions = (
  pinnedDaos: DaoCardInfo[]
): DropdownOption<SortFn<DaoCardInfo>>[] => [
  // Order DAOs pinned.
  {
    label: 'Custom',
    value: (a, b) => pinnedDaos.indexOf(a) - pinnedDaos.indexOf(b),
  },
  {
    label: 'A → Z',
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleUpperCase()),
  },
  {
    label: 'Z → A',
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleUpperCase()),
  },
  {
    label: 'Newest',
    value: (a, b) => b.established.getTime() - a.established.getTime(),
  },
  {
    label: 'Oldest',
    value: (a, b) => a.established.getTime() - b.established.getTime(),
  },
]

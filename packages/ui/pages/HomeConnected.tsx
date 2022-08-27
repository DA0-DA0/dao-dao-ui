import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoCard,
  DaoCardContainer,
  DaoCardInfo,
  DropdownOption,
  FeaturedDaos,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export interface HomeConnectedProps {
  featuredDaos: DaoCardInfo[]
  pinnedDaos: DaoCardInfo[]
}

export const HomeConnected = ({
  featuredDaos,
  pinnedDaos,
}: HomeConnectedProps) => {
  const { t } = useTranslation()

  const sortOptions = useMemo(() => getSortOptions(pinnedDaos), [pinnedDaos])
  const { sortedData: sortedPinnedDaos, Dropdown } = useDropdownSorter(
    pinnedDaos,
    sortOptions[0].value
  )

  return (
    <div className="flex flex-col gap-8 items-stretch">
      <p className="mx-24 mt-12 header-text">{t('title.home')}</p>

      {/* Divider */}
      <div className="mx-24 h-[1px] bg-border-secondary"></div>

      <p className="mx-24 title-text">{t('title.featuredDaos')}</p>

      {/* Featured DAOs container */}
      <div className="relative px-[1px]">
        {/* Left shadow */}
        <div
          className="absolute top-0 bottom-0 left-0 z-10 w-24"
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
          className="absolute top-0 right-0 bottom-0 z-10 w-24"
          style={{
            background:
              'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>
      </div>

      {/* Divider */}
      <div className="mx-24 h-[1px] bg-border-secondary"></div>

      <div className="flex flex-row justify-between mx-24 mt-2">
        <p className="title-text">{t('title.pinned')}</p>

        <div className="flex flex-row gap-6 justify-between items-center">
          <p className="text-text-body primary-text">{t('title.sortBy')}</p>

          <Dropdown options={sortOptions} />
        </div>
      </div>

      <DaoCardContainer className="mx-24 mt-1">
        {sortedPinnedDaos.map((props) => (
          <DaoCard
            key={props.coreAddress}
            isMember={false}
            onPin={() => {}}
            pinned
            {...props}
          />
        ))}
      </DaoCardContainer>
    </div>
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
    label: 'Newer',
    value: (a, b) => b.established.getTime() - a.established.getTime(),
  },
  {
    label: 'Older',
    value: (a, b) => a.established.getTime() - b.established.getTime(),
  },
]

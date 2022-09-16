import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData } from '@dao-dao/tstypes'

import { SortFn, useDropdownSorter } from '../../hooks/useDropdownSorter'
import { Dropdown, DropdownOption } from '../Dropdown'
import { GridCardContainer } from '../GridCardContainer'
import { Loader } from '../Loader'
import { DaoCard } from './DaoCard'

export interface PinnedDaosProps {
  pinnedDaos: LoadingData<DaoCardInfo[]>
  isDaoPinned: (coreAddress: string) => boolean
  onPin: (coreAddress: string) => void
}

export const PinnedDaos = ({
  pinnedDaos,
  isDaoPinned,
  onPin,
}: PinnedDaosProps) => {
  const { t } = useTranslation()

  const sortOptions = useMemo(
    () => getSortOptions(pinnedDaos.loading ? [] : pinnedDaos.data),
    [pinnedDaos]
  )
  const { sortedData: sortedPinnedDaos, dropdownProps: sortDropdownProps } =
    useDropdownSorter(pinnedDaos.loading ? [] : pinnedDaos.data, sortOptions)

  return (
    <>
      <div className="flex flex-row justify-between mt-2">
        <p className="title-text">{t('title.pinned')}</p>

        <div className="flex flex-row gap-6 justify-between items-center">
          <p className="text-text-body primary-text">{t('title.sortBy')}</p>

          <Dropdown {...sortDropdownProps} />
        </div>
      </div>

      {pinnedDaos.loading ? (
        <Loader />
      ) : pinnedDaos.data.length === 0 ? (
        // TODO: Add graphic here.
        <p className="text-text-interactive-error">placeholder for graphic</p>
      ) : (
        <GridCardContainer className="mt-1">
          {sortedPinnedDaos.map((props) => (
            <DaoCard
              key={props.coreAddress}
              onPin={() => onPin(props.coreAddress)}
              pinned={isDaoPinned(props.coreAddress)}
              {...props}
            />
          ))}
        </GridCardContainer>
      )}
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
    value: (a, b) =>
      // Put empty ones last.
      (b.established?.getTime() ?? -Infinity) -
      (a.established?.getTime() ?? -Infinity),
  },
  {
    label: 'Oldest',
    value: (a, b) =>
      // Put empty ones last.
      (a.established?.getTime() ?? Infinity) -
      (b.established?.getTime() ?? Infinity),
  },
]

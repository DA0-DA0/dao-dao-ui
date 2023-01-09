import { PushPinOutlined } from '@mui/icons-material'
import { ComponentType, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData } from '@dao-dao/types'

import { SortFn, useDropdownSorter } from '../../hooks/useDropdownSorter'
import { GridCardContainer } from '../GridCardContainer'
import { Dropdown, DropdownOption } from '../inputs/Dropdown'
import { Loader } from '../logo/Loader'
import { NoContent } from '../NoContent'

export interface PinnedDaosProps {
  DaoCard: ComponentType<DaoCardInfo>
  pinnedDaos: LoadingData<DaoCardInfo[]>
  openSearch: () => void
}

export const PinnedDaos = ({
  DaoCard,
  pinnedDaos,
  openSearch,
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
      <div className="mt-2 flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <p className="title-text">{t('title.following')}</p>

        <div className="flex flex-row items-center justify-between gap-6">
          <p className="primary-text text-text-body">{t('title.sortBy')}</p>

          <Dropdown {...sortDropdownProps} />
        </div>
      </div>

      {pinnedDaos.loading ? (
        <Loader />
      ) : pinnedDaos.data.length === 0 ? (
        <NoContent
          Icon={PushPinOutlined}
          actionNudge={t('info.wouldYouLikeToSearchQuestion')}
          body={t('info.noDaosFollowedYet')}
          buttonLabel={t('button.searchDaos')}
          onClick={openSearch}
        />
      ) : (
        <GridCardContainer>
          {sortedPinnedDaos.map((props) => (
            <DaoCard key={props.coreAddress} {...props} />
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

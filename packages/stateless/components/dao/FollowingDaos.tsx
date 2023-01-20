import { DoneOutlineRounded } from '@mui/icons-material'
import { ComponentType, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData } from '@dao-dao/types'

import { SortFn, useDropdownSorter } from '../../hooks/useDropdownSorter'
import { GridCardContainer } from '../GridCardContainer'
import { Dropdown, DropdownOption } from '../inputs/Dropdown'
import { Loader } from '../logo/Loader'
import { NoContent } from '../NoContent'

export interface FollowingDaosProps {
  DaoCard: ComponentType<DaoCardInfo>
  followingDaos: LoadingData<DaoCardInfo[]>
  openSearch: () => void
}

export const FollowingDaos = ({
  DaoCard,
  followingDaos,
  openSearch,
}: FollowingDaosProps) => {
  const { t } = useTranslation()

  const sortOptions = useMemo(
    () => getSortOptions(followingDaos.loading ? [] : followingDaos.data),
    [followingDaos]
  )
  const { sortedData: sortedFollowingDaos, dropdownProps: sortDropdownProps } =
    useDropdownSorter(
      followingDaos.loading ? [] : followingDaos.data,
      sortOptions
    )

  return (
    <>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="title-text">{t('title.following')}</p>

        <div className="flex flex-row items-center justify-between gap-6">
          <p className="primary-text text-text-body">{t('title.sortBy')}</p>

          <Dropdown {...sortDropdownProps} />
        </div>
      </div>

      {followingDaos.loading ? (
        <Loader />
      ) : followingDaos.data.length === 0 ? (
        <NoContent
          Icon={DoneOutlineRounded}
          actionNudge={t('info.wouldYouLikeToSearchQuestion')}
          body={t('info.noDaosFollowedYet')}
          buttonLabel={t('button.searchDaos')}
          onClick={openSearch}
        />
      ) : (
        <GridCardContainer>
          {sortedFollowingDaos.map((props) => (
            <DaoCard key={props.coreAddress} {...props} />
          ))}
        </GridCardContainer>
      )}
    </>
  )
}

const getSortOptions = (
  followingDaos: DaoCardInfo[]
): DropdownOption<SortFn<DaoCardInfo>>[] => [
  {
    label: 'Date followed (oldest → newest)',
    value: (a, b) => followingDaos.indexOf(a) - followingDaos.indexOf(b),
  },
  {
    label: 'Date followed (newest → oldest)',
    value: (a, b) => followingDaos.indexOf(b) - followingDaos.indexOf(a),
  },
  {
    label: 'DAO name (A → Z)',
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleUpperCase()),
  },
  {
    label: 'DAO name (Z → A)',
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleUpperCase()),
  },
]

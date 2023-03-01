import { DoneOutlineRounded } from '@mui/icons-material'
import { ComponentType, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData, SortFn, TypedOption } from '@dao-dao/types'

import { useButtonPopupSorter } from '../../hooks'
import { GridCardContainer } from '../GridCardContainer'
import { Loader } from '../logo/Loader'
import { NoContent } from '../NoContent'
import { ButtonPopup } from '../popup/ButtonPopup'

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
  const {
    sortedData: sortedFollowingDaos,
    buttonPopupProps: sortButtonPopupProps,
  } = useButtonPopupSorter({
    data: followingDaos.loading ? [] : followingDaos.data,
    options: sortOptions,
  })

  return (
    <>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="title-text">{t('title.following')}</p>

        <ButtonPopup position="left" {...sortButtonPopupProps} />
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
): TypedOption<SortFn<DaoCardInfo>>[] => [
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

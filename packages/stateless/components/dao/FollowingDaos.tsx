import { DoneOutlineRounded } from '@mui/icons-material'
import { TFunction } from 'i18next'
import { ComponentType, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData, SortFn, TypedOption } from '@dao-dao/types'

import { useButtonPopupSorter } from '../../hooks'
import { GridCardContainer } from '../GridCardContainer'
import { NoContent } from '../NoContent'
import { ButtonPopup } from '../popup/ButtonPopup'
import { DaoCardLoader } from './DaoCard'

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
    () => getSortOptions(t, followingDaos.loading ? [] : followingDaos.data),
    [t, followingDaos]
  )
  const {
    sortedData: sortedFollowingDaos,
    buttonPopupProps: sortButtonPopupProps,
  } = useButtonPopupSorter({
    data: followingDaos.loading ? undefined : followingDaos.data,
    options: sortOptions,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="title-text text-lg">{t('title.following')}</p>

        <div className="flex grow flex-row justify-end">
          <ButtonPopup position="left" {...sortButtonPopupProps} />
        </div>
      </div>

      {followingDaos.loading || followingDaos.updating ? (
        <GridCardContainer>
          <DaoCardLoader />
          <DaoCardLoader />
          <DaoCardLoader />
        </GridCardContainer>
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
    </div>
  )
}

const getSortOptions = (
  t: TFunction,
  followingDaos: DaoCardInfo[]
): TypedOption<SortFn<DaoCardInfo>>[] => [
  {
    label: t('info.dateFollowedOldestNewest'),
    value: (a, b) => followingDaos.indexOf(a) - followingDaos.indexOf(b),
  },
  {
    label: t('info.dateFollowedNewestOldest'),
    value: (a, b) => followingDaos.indexOf(b) - followingDaos.indexOf(a),
  },
  {
    label: t('info.daoNameAZ'),
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleUpperCase()),
  },
  {
    label: t('info.daoNameZA'),
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleUpperCase()),
  },
]

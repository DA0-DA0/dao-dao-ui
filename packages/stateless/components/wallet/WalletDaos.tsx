import { WarningRounded } from '@mui/icons-material'
import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  FilterFn,
  LazyDaoCardProps,
  TypedOption,
  WalletDaosProps,
} from '@dao-dao/types'

import { useButtonPopupFilter, useSearchFilter } from '../../hooks'
import { DaoCardLoader } from '../dao/DaoCard'
import { ErrorPage } from '../error'
import { GridCardContainer } from '../GridCardContainer'
import { SearchBar } from '../inputs'
import { NoContent } from '../NoContent'
import { ButtonPopup } from '../popup/ButtonPopup'

export const WalletDaos = ({
  daos,
  LazyDaoCard,
  openSearch,
  includesFollowing,
}: WalletDaosProps) => {
  const { t } = useTranslation()

  const allDaos = daos.loading || daos.errored || !daos.data ? [] : daos.data

  const filterOptions = useMemo(
    (): TypedOption<FilterFn<LazyDaoCardProps>>[] => [
      {
        label: t('title.following'),
        value: ({ isFollowed }) => isFollowed,
      },
      {
        label: t('title.membership'),
        value: ({ isMember }) => isMember,
      },
      {
        label: t('title.all'),
        value: () => true,
      },
    ],
    [t]
  )

  const {
    filteredData: filteredDaos,
    buttonPopupProps: filterDaosButtonProps,
  } = useButtonPopupFilter({
    data: allDaos,
    options: filterOptions,
  })

  const { searchBarProps, filteredData: searchedDaos } = useSearchFilter({
    data: filteredDaos,
    filterableKeys: FILTERABLE_KEYS,
    querySyncedParam: 'dq',
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-stretch gap-2">
        <SearchBar
          containerClassName="grow"
          placeholder={t('info.searchDaosPlaceholder')}
          {...searchBarProps}
        />

        {includesFollowing && (
          <ButtonPopup position="left" {...filterDaosButtonProps} />
        )}
      </div>

      {daos.loading ? (
        <GridCardContainer>
          {[...Array(6)].map((_, index) => (
            <DaoCardLoader key={index} />
          ))}
        </GridCardContainer>
      ) : daos.errored ? (
        <ErrorPage error={daos.error} />
      ) : searchedDaos.length > 0 ? (
        <GridCardContainer>
          {searchedDaos.map(({ item }) => (
            <LazyDaoCard
              key={item.info.chainId + item.info.coreAddress}
              {...item}
            />
          ))}
        </GridCardContainer>
      ) : (
        <NoContent
          Icon={WarningRounded}
          actionNudge={t('info.wouldYouLikeToSearchQuestion')}
          body={t('info.nothingFound')}
          buttonLabel={t('button.searchDaos')}
          onClick={openSearch}
        />
      )}
    </div>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<LazyDaoCardProps>[] = [
  'chainId',
  'coreAddress',
  'name',
  'description',
]

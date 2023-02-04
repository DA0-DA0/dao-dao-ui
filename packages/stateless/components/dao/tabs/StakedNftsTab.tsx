import { Image } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData, NftCardInfo } from '@dao-dao/types'

import { SortFn, useDropdownSorter } from '../../../hooks'
import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown, DropdownOption } from '../../inputs/Dropdown'
import { Loader } from '../../logo/Loader'
import { NoContent } from '../../NoContent'

export interface StakedNftsTabProps<N extends NftCardInfo> {
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
}

export const StakedNftsTab = <N extends NftCardInfo>({
  nfts,
  NftCard,
}: StakedNftsTabProps<N>) => {
  const { t } = useTranslation()

  const { sortedData: sortedNfts, dropdownProps: sortDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, sortOptions)

  return nfts.loading || nfts.data.length > 0 ? (
    <>
      <div className="flex min-h-[3.5rem] flex-col gap-y-4 gap-x-8 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
          <p className="title-text">
            {nfts.loading
              ? t('title.nfts')
              : t('title.numNfts', { count: nfts.data.length })}
          </p>

          <p className="secondary-text break-words">
            {t('info.stakedNftsExplanation')}
          </p>
        </div>

        {!nfts.loading && nfts.data.length > 0 && (
          <div className="flex shrink-0 flex-row items-center justify-between gap-4">
            <p className="primary-text text-text-body">{t('title.sortBy')}</p>

            <Dropdown {...sortDropdownProps} />
          </div>
        )}
      </div>

      {nfts.loading ? (
        <Loader fill={false} />
      ) : (
        <GridCardContainer className="pb-6">
          {sortedNfts.map((props, index) => (
            <NftCard {...(props as N)} key={index} />
          ))}
        </GridCardContainer>
      )}
    </>
  ) : (
    <NoContent Icon={Image} body={t('info.noNftsYet')} />
  )
}

const sortOptions: DropdownOption<
  SortFn<Pick<NftCardInfo, 'name' | 'floorPrice'>>
>[] = [
  {
    label: 'A → Z',
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
  },
  {
    label: 'Z → A',
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase()),
  },
  // {
  //   label: 'Lowest floor',
  //   value: (a, b) =>
  //     !a.floorPrice
  //       ? 1
  //       : !b.floorPrice
  //       ? -1
  //       : a.floorPrice.amount - b.floorPrice.amount,
  // },
  // {
  //   label: 'Highest floor',
  //   value: (a, b) =>
  //     !a.floorPrice
  //       ? 1
  //       : !b.floorPrice
  //       ? -1
  //       : b.floorPrice.amount - a.floorPrice.amount,
  // },
]

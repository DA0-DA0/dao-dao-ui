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

  return (
    <>
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1 border-b border-border-secondary pb-6">
        <p className="title-text text-text-body">{t('title.stakedNfts')}</p>
        <p className="secondary-text">{t('info.stakedNftsExplanation')}</p>
      </div>

      {nfts.loading || nfts.data.length > 0 ? (
        <>
          <div className="my-6 flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
            <p className="title-text">
              {nfts.loading
                ? t('title.nfts')
                : t('title.numNfts', { count: nfts.data.length })}
            </p>

            {!nfts.loading && nfts.data.length > 0 && (
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="primary-text text-text-body">
                  {t('title.sortBy')}
                </p>

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
      )}
    </>
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

import { Image } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { MeBalancesProps, NftCardInfo, TokenCardInfo } from '@dao-dao/types'

import {
  Dropdown,
  DropdownOption,
  GridCardContainer,
  Loader,
  NoContent,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export const MeBalances = <T extends TokenCardInfo, N extends NftCardInfo>({
  tokens,
  TokenCard,
  nfts,
  NftCard,
}: MeBalancesProps<T, N>) => {
  const { t } = useTranslation()

  const { sortedData: sortedNfts, dropdownProps: sortDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, sortOptions)

  return (
    <div className="flex flex-col gap-8">
      <div>
        {tokens.loading || !tokens.data ? (
          <Loader fill={false} />
        ) : tokens.data.length ? (
          <GridCardContainer cardType="wide">
            {tokens.data.map((props, index) => (
              <TokenCard {...props} key={index} />
            ))}
          </GridCardContainer>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>

      {nfts.loading || nfts.data.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="mb-6 flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
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
        </div>
      ) : (
        <NoContent Icon={Image} body={t('info.noNftsYet')} />
      )}
    </div>
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

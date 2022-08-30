import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DropdownOption,
  GridCardContainer,
  NftCard,
  NftCardProps,
  TokenCard,
  TokenCardProps,
} from 'components'
import { SortFn, useDropdownSorter } from 'hooks'

export interface TreasuryAndNftsTabProps {
  tokens: TokenCardProps[]
  nfts: NftCardProps[]
}

export const TreasuryAndNftsTab = ({
  tokens,
  nfts,
}: TreasuryAndNftsTabProps) => {
  const { t } = useTranslation()

  // Sort crowned tokens first.
  const sortedTokens = useMemo(
    () =>
      tokens.sort((a, b) => (!!a.crown === !!b.crown ? 0 : a.crown ? -1 : 1)),
    [tokens]
  )

  const { sortedData: sortedNfts, Dropdown } = useDropdownSorter(
    nfts,
    sortOptions[0].value
  )

  return (
    <>
      <p className="mb-6 text-text-body title-text">{t('title.treasury')}</p>

      {tokens.length ? (
        <GridCardContainer className="mb-9">
          {sortedTokens.map((props, index) => (
            <TokenCard {...props} key={index} />
          ))}
        </GridCardContainer>
      ) : (
        <p className="mb-9 secondary-text">{t('info.nothingFound')}</p>
      )}

      <div className="flex flex-row justify-between">
        <p className="title-text">
          {t('title.numTreasuryNfts', { count: nfts.length })}
        </p>

        <div className="flex flex-row gap-6 justify-between items-center">
          <p className="text-text-body primary-text">{t('title.sortBy')}</p>

          <Dropdown options={sortOptions} />
        </div>
      </div>

      <GridCardContainer className="mt-6">
        {sortedNfts.map((props, index) => (
          <NftCard {...props} key={index} />
        ))}
      </GridCardContainer>
    </>
  )
}

const sortOptions: DropdownOption<SortFn<NftCardProps>>[] = [
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
    label: 'Lowest floor price',
    value: (a, b) =>
      !a.floorPrice
        ? 1
        : !b.floorPrice
        ? -1
        : a.floorPrice.amount - b.floorPrice.amount,
  },
  {
    label: 'Highest floor price',
    value: (a, b) =>
      !a.floorPrice
        ? 1
        : !b.floorPrice
        ? -1
        : b.floorPrice.amount - a.floorPrice.amount,
  },
]

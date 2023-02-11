import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MeBalancesProps, NftCardInfo, TokenCardInfo } from '@dao-dao/types'

import {
  Dropdown,
  DropdownIconButton,
  DropdownOption,
  GridCardContainer,
  Loader,
  NoContent,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export const MeBalances = <T extends TokenCardInfo, N extends NftCardInfo>({
  tokens,
  hiddenTokens,
  TokenCard,
  nfts,
  NftCard,
}: MeBalancesProps<T, N>) => {
  const { t } = useTranslation()

  const { sortedData: sortedNfts, dropdownProps: sortDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, sortOptions)

  const visibleBalances =
    tokens.loading || hiddenTokens.loading
      ? []
      : tokens.data.filter(
          ({ token }) => !hiddenTokens.data.includes(token.denomOrAddress)
        )
  const hiddenBalances =
    tokens.loading || hiddenTokens.loading
      ? []
      : tokens.data.filter(({ token }) =>
          hiddenTokens.data.includes(token.denomOrAddress)
        )

  const [showingHidden, setShowingHidden] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div>
        {tokens.loading || hiddenTokens.loading ? (
          <Loader fill={false} />
        ) : tokens.data.length ? (
          <GridCardContainer cardType="wide">
            {visibleBalances.map((props) => (
              <TokenCard {...props} key={props.token.denomOrAddress} />
            ))}
          </GridCardContainer>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}

        {hiddenBalances.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
              <DropdownIconButton
                className="text-icon-primary"
                open={showingHidden}
                toggle={() => setShowingHidden((s) => !s)}
              />

              <p>{t('title.hidden')}</p>
            </div>

            <GridCardContainer
              cardType="wide"
              className={clsx(!showingHidden && 'hidden')}
            >
              {hiddenBalances.map((props) => (
                <TokenCard {...props} key={props.token.denomOrAddress} />
              ))}
            </GridCardContainer>
          </div>
        )}
      </div>

      {/* Only show NFTs once tokens stop loading. */}
      {!tokens.loading && (nfts.loading || nfts.data.length > 0) ? (
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
        !nfts.loading && <NoContent Icon={Image} body={t('info.noNftsFound')} />
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

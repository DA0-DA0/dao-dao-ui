import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MeBalancesProps, NftCardInfo, TokenCardInfo } from '@dao-dao/types'

import {
  Button,
  Dropdown,
  DropdownIconButton,
  DropdownOption,
  GridCardContainer,
  Loader,
  NoContent,
  TokenLine,
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

  const { sortedData: sortedTokens, dropdownProps: sortTokenDropdownProps } =
    useDropdownSorter(tokens.loading ? [] : tokens.data, tokenSortOptions)

  const { sortedData: sortedNfts, dropdownProps: sortNftDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, nftSortOptions)

  const visibleBalances = hiddenTokens.loading
    ? []
    : sortedTokens.filter(
        ({ token }) => !hiddenTokens.data.includes(token.denomOrAddress)
      )
  const hiddenBalances = hiddenTokens.loading
    ? []
    : sortedTokens.filter(({ token }) =>
        hiddenTokens.data.includes(token.denomOrAddress)
      )

  const [showingHidden, setShowingHidden] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div>
        {tokens.loading || hiddenTokens.loading ? (
          <Loader fill={false} />
        ) : tokens.data.length ? (
          <div className="space-y-1">
            <div className="mb-5 -mt-4 flex flex-row justify-end">
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="primary-text text-text-body">
                  {t('title.sortBy')}
                </p>

                <Dropdown {...sortTokenDropdownProps} />
              </div>
            </div>

            <div className="secondary-text mb-4 grid grid-cols-2 items-center gap-4 px-4 sm:grid-cols-[2fr_1fr_1fr]">
              <p>{t('title.token')}</p>
              <p className="text-right">{t('title.total')}</p>
              <p className="hidden text-right sm:block">
                {t('title.estUsdValue')}
              </p>
            </div>

            {visibleBalances.map((props, index) => (
              <TokenLine
                key={props.token.denomOrAddress}
                TokenCard={TokenCard}
                transparentBackground={index % 2 !== 0}
                {...props}
              />
            ))}
          </div>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}

        {hiddenBalances.length > 0 && (
          <div className="mt-6 space-y-6">
            <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
              <DropdownIconButton
                className="text-icon-primary"
                open={showingHidden}
                toggle={() => setShowingHidden((s) => !s)}
              />

              <Button
                className="text-text-secondary"
                onClick={() => setShowingHidden((s) => !s)}
                variant="none"
              >
                {t('title.hidden')}
              </Button>
            </div>

            <div className={clsx('space-y-1', !showingHidden && 'hidden')}>
              {hiddenBalances.map((props, index) => (
                <TokenLine
                  key={props.token.denomOrAddress}
                  TokenCard={TokenCard}
                  transparentBackground={index % 2 !== 0}
                  {...props}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Only show NFTs once tokens stop loading. */}
      {!tokens.loading &&
        (nfts.loading || nfts.data.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="mb-6 flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
              <div className="flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
                <p className="title-text">
                  {nfts.loading
                    ? t('title.nfts')
                    : t('title.numNfts', { count: nfts.data.length })}
                </p>

                <p className="secondary-text break-words">
                  {t('info.meBalancesNftsDescription')}
                </p>
              </div>

              {!nfts.loading && nfts.data.length > 0 && (
                <div className="flex flex-row items-center justify-between gap-4">
                  <p className="primary-text text-text-body">
                    {t('title.sortBy')}
                  </p>

                  <Dropdown {...sortNftDropdownProps} />
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
          <NoContent Icon={Image} body={t('info.noNftsFound')} />
        ))}
    </div>
  )
}

const tokenSortOptions: DropdownOption<
  SortFn<Pick<TokenCardInfo, 'token' | 'unstakedBalance' | 'lazyInfo'>>
>[] = [
  {
    label: 'Highest value',
    value: (a, b) => {
      const aPrice =
        a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice
          ? -Infinity
          : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.amount
      const bPrice =
        b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice
          ? -Infinity
          : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.amount
      return bPrice - aPrice
    },
  },
  {
    label: 'Lowest value',
    value: (a, b) => {
      const aPrice =
        a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice
          ? Infinity
          : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.amount
      const bPrice =
        b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice
          ? Infinity
          : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.amount
      return aPrice - bPrice
    },
  },
  {
    label: 'A → Z',
    value: (a, b) =>
      a.token.symbol
        .toLocaleLowerCase()
        .localeCompare(b.token.symbol.toLocaleLowerCase()),
  },
  {
    label: 'Z → A',
    value: (a, b) =>
      b.token.symbol
        .toLocaleLowerCase()
        .localeCompare(a.token.symbol.toLocaleLowerCase()),
  },
]

const nftSortOptions: DropdownOption<
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

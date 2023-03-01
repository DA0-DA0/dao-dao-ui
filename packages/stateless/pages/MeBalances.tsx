import { Image } from '@mui/icons-material'
import { ChainInfoID } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  FilterFn,
  MeBalancesProps,
  NftCardInfo,
  SortFn,
  TokenCardInfo,
  TypedOption,
} from '@dao-dao/types'
import { STARGAZE_TESTNET_CHAIN_ID } from '@dao-dao/utils'

import {
  Button,
  ButtonPopup,
  DropdownIconButton,
  GridCardContainer,
  Loader,
  NoContent,
  TokenLine,
} from '../components'
import { useButtonPopupFilter, useButtonPopupSorter } from '../hooks'

export const MeBalances = <T extends TokenCardInfo, N extends NftCardInfo>({
  tokens,
  hiddenTokens,
  TokenCard,
  nfts,
  NftCard,
}: MeBalancesProps<T, N>) => {
  const { t } = useTranslation()

  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: tokens.loading ? [] : tokens.data,
    options: tokenSortOptions,
  })

  const {
    filteredData: filteredNfts,
    buttonPopupProps: filterNftButtonPopupProps,
    selectedOption: { id: selectedNftChainFilter },
  } = useButtonPopupFilter({
    data: nfts.loading ? [] : nfts.data,
    options: nftFilterOptions,
  })

  const {
    sortedData: filteredSortedNfts,
    buttonPopupProps: sortNftButtonPopupProps,
  } = useButtonPopupSorter({
    data: filteredNfts,
    options: nftSortOptions,
  })

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
            <div className="mb-6 -mt-4 flex flex-row justify-end">
              <ButtonPopup position="left" {...sortTokenButtonPopupProps} />
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
                {...(props as T)}
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
                  {...(props as T)}
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
                  {t('info.meBalancesNftsDescription', {
                    context: selectedNftChainFilter,
                  })}
                </p>
              </div>

              {!nfts.loading && nfts.data.length > 0 && (
                <div className="flex flex-row items-center gap-4">
                  <ButtonPopup position="left" {...sortNftButtonPopupProps} />
                  <ButtonPopup position="left" {...filterNftButtonPopupProps} />
                </div>
              )}
            </div>

            {nfts.loading ? (
              <Loader fill={false} />
            ) : (
              <GridCardContainer className="pb-6">
                {filteredSortedNfts.map((props, index) => (
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

const tokenSortOptions: TypedOption<
  SortFn<Pick<TokenCardInfo, 'token' | 'unstakedBalance' | 'lazyInfo'>>
>[] = [
  {
    label: 'Highest value',
    value: (a, b) => {
      const aPrice = a.lazyInfo.loading
        ? // If loading, show at top.
          Infinity
        : // If no price, show at bottom.
        !a.lazyInfo.data.usdUnitPrice
        ? -Infinity
        : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.amount
      const bPrice = b.lazyInfo.loading
        ? // If loading, show at top.
          Infinity
        : // If no price, show at bottom.
        !b.lazyInfo.data.usdUnitPrice
        ? -Infinity
        : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.amount

      // If prices are equal, sort alphabetically by symbol.
      return aPrice === bPrice
        ? a.token.symbol
            .toLocaleLowerCase()
            .localeCompare(b.token.symbol.toLocaleLowerCase())
        : bPrice - aPrice
    },
  },
  {
    label: 'Lowest value',
    value: (a, b) => {
      const aPrice = a.lazyInfo.loading
        ? // If loading, show at top.
          -Infinity
        : !a.lazyInfo.data.usdUnitPrice
        ? // If no price, show at bottom.
          Infinity
        : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.amount
      const bPrice = b.lazyInfo.loading
        ? // If loading, show at top.
          -Infinity
        : !b.lazyInfo.data.usdUnitPrice
        ? // If no price, show at bottom.
          Infinity
        : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.amount

      // If prices are equal, sort alphabetically by symbol.
      return aPrice === bPrice
        ? a.token.symbol
            .toLocaleLowerCase()
            .localeCompare(b.token.symbol.toLocaleLowerCase())
        : aPrice - bPrice
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

const nftSortOptions: TypedOption<
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

const nftFilterOptions: (TypedOption<FilterFn<Pick<NftCardInfo, 'chainId'>>> & {
  id: string
})[] = [
  {
    id: 'all',
    label: 'All',
    value: () => true,
  },
  {
    id: 'juno',
    label: 'Only Juno',
    value: (nft) =>
      nft.chainId === ChainInfoID.Juno1 || nft.chainId === ChainInfoID.Uni6,
  },
  {
    id: 'stargaze',
    label: 'Only Stargaze',
    value: (nft) =>
      nft.chainId === ChainInfoID.Stargaze1 ||
      nft.chainId === STARGAZE_TESTNET_CHAIN_ID,
  },
]

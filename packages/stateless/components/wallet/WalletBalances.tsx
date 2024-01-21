import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  LazyNftCardInfo,
  SortFn,
  TokenCardInfo,
  TypedOption,
  WalletBalancesProps,
} from '@dao-dao/types'
import { getDisplayNameForChainId } from '@dao-dao/utils'

import { useButtonPopupSorter, useChain, useInfiniteScroll } from '../../hooks'
import { Button } from '../buttons'
import { GridCardContainer } from '../GridCardContainer'
import { DropdownIconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { NoContent } from '../NoContent'
import { PAGINATION_MIN_PAGE } from '../Pagination'
import { ButtonPopup } from '../popup'
import { TooltipInfoIcon } from '../tooltip'

const NFTS_PER_PAGE = 18

export const WalletBalances = <
  T extends TokenCardInfo,
  N extends LazyNftCardInfo
>({
  tokens,
  hiddenTokens,
  TokenLine,
  nfts,
  NftCard,
}: WalletBalancesProps<T, N>) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: tokens.loading ? [] : tokens.data,
    options: tokenSortOptions,
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

  const [_nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)
  const maxNftPage = Math.ceil(
    nfts.loading ? 0 : nfts.data.length / NFTS_PER_PAGE
  )
  const nftPage = Math.min(_nftPage, maxNftPage)

  const { infiniteScrollRef } = useInfiniteScroll({
    loadMore: () => setNftPage((p) => p + 1),
    disabled: nfts.loading || _nftPage >= maxNftPage,
  })

  return (
    <div className="flex flex-col gap-8">
      <div>
        {tokens.loading || hiddenTokens.loading ? (
          <Loader fill={false} />
        ) : tokens.data.length ? (
          <div>
            <div className="mb-6 -mt-4 flex flex-row justify-end">
              <ButtonPopup position="left" {...sortTokenButtonPopupProps} />
            </div>

            <div className="secondary-text mb-3 grid grid-cols-2 items-center gap-4 px-4 sm:grid-cols-[2fr_1fr_1fr]">
              <p>{t('title.token')}</p>

              <p className="text-right">{t('title.total')}</p>

              <div className="hidden flex-row items-center justify-end gap-1 sm:flex">
                <p className="text-right">{t('title.estUsdValue')}</p>
                <TooltipInfoIcon
                  size="xs"
                  title={t('info.estimatedUsdValueTooltip')}
                />
              </div>
            </div>

            <div className="space-y-1">
              {visibleBalances.map((props, index) => (
                <TokenLine
                  key={props.token.denomOrAddress + index}
                  transparentBackground={index % 2 !== 0}
                  {...(props as T)}
                />
              ))}
            </div>
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
                  key={props.token.denomOrAddress + index}
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
            <div className="mb-6 flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
              <p className="title-text">
                {nfts.loading
                  ? t('title.nfts')
                  : t('title.numNfts', {
                      count: nfts.data.length,
                    })}
              </p>

              <p className="secondary-text break-words">
                {t('info.meBalancesNftsDescription', {
                  chainName: getDisplayNameForChainId(chainId),
                })}
              </p>
            </div>

            {nfts.loading ? (
              <Loader fill={false} />
            ) : nfts.data.length > 0 ? (
              <GridCardContainer className="pb-6" ref={infiniteScrollRef}>
                {nfts.data
                  .slice(0, nftPage * NFTS_PER_PAGE)
                  .map((props, index) => (
                    <NftCard {...(props as N)} key={index} />
                  ))}
              </GridCardContainer>
            ) : (
              <NoContent Icon={Image} body={t('info.noNftsFound')} />
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
    label: 'Highest USD value',
    value: (a, b) => {
      const aPrice = a.lazyInfo.loading
        ? // If loading, show at top.
          Infinity
        : // If no price, show at bottom.
        !a.lazyInfo.data.usdUnitPrice?.usdPrice
        ? -Infinity
        : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.usdPrice
      const bPrice = b.lazyInfo.loading
        ? // If loading, show at top.
          Infinity
        : // If no price, show at bottom.
        !b.lazyInfo.data.usdUnitPrice?.usdPrice
        ? -Infinity
        : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.usdPrice

      // If prices are equal, sort alphabetically by symbol.
      return aPrice === bPrice
        ? a.token.symbol
            .toLocaleLowerCase()
            .localeCompare(b.token.symbol.toLocaleLowerCase())
        : bPrice - aPrice
    },
  },
  {
    label: 'Lowest USD value',
    value: (a, b) => {
      const aPrice = a.lazyInfo.loading
        ? // If loading, show at top.
          -Infinity
        : !a.lazyInfo.data.usdUnitPrice?.usdPrice
        ? // If no price, show at bottom.
          Infinity
        : a.lazyInfo.data.totalBalance * a.lazyInfo.data.usdUnitPrice.usdPrice
      const bPrice = b.lazyInfo.loading
        ? // If loading, show at top.
          -Infinity
        : !b.lazyInfo.data.usdUnitPrice?.usdPrice
        ? // If no price, show at bottom.
          Infinity
        : b.lazyInfo.data.totalBalance * b.lazyInfo.data.usdUnitPrice.usdPrice

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

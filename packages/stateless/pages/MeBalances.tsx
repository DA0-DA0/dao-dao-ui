import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  AccountType,
  FilterFn,
  LazyNftCardInfo,
  MeBalancesProps,
  SortFn,
  TokenCardInfo,
  TypedOption,
  ValenceAccount,
} from '@dao-dao/types'
import {
  areAccountsEqual,
  getChainForChainId,
  getDisplayNameForChainId,
} from '@dao-dao/utils'

import {
  Button,
  ButtonPopup,
  DropdownIconButton,
  GridCardContainer,
  Loader,
  NoContent,
  PAGINATION_MIN_PAGE,
  Pagination,
  TooltipInfoIcon,
  ValenceAccountTreasury,
} from '../components'
import { useButtonPopupFilter, useButtonPopupSorter } from '../hooks'

const NFTS_PER_PAGE = 18

export const MeBalances = <T extends TokenCardInfo, N extends LazyNftCardInfo>({
  accounts,
  tokens,
  hiddenTokens,
  TokenLine,
  nfts,
  NftCard,
  TreasuryHistoryGraph,
}: MeBalancesProps<T, N>) => {
  const { t } = useTranslation()

  const uniqueChainIds = Array.from(
    new Set(nfts.loading ? [] : nfts.data.map(({ chainId }) => chainId))
  )
  const nftChains = uniqueChainIds.map(getChainForChainId)
  const nftFilterOptions = useMemo(
    () => [
      {
        id: 'all',
        label: t('title.all'),
        value: () => true,
      },
      ...nftChains.map(
        (
          chain
        ): TypedOption<FilterFn<{ chainId: string }>> & {
          id: string
        } => ({
          id: chain.chain_id,
          label: chain.pretty_name,
          value: (nft) => nft.chainId === chain.chain_id,
        })
      ),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([nftChains])
  )

  const valenceAccounts = accounts.filter(
    (account): account is ValenceAccount => account.type === AccountType.Valence
  )
  // Separate valence from non-valence account tokens and display valence
  // separately.
  const nonValenceTokens = tokens.loading
    ? []
    : tokens.data.filter(({ owner }) => owner.type !== AccountType.Valence)

  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: nonValenceTokens,
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
  const nftPage = Math.min(
    _nftPage,
    Math.ceil(filteredNfts.length / NFTS_PER_PAGE)
  )

  return (
    <div className="flex flex-col gap-8 pt-4 sm:pt-0">
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

            {/* Valence Accounts */}
            {valenceAccounts.map((account) => (
              <ValenceAccountTreasury<T>
                key={account.address}
                TokenCard={TokenLine}
                TreasuryHistoryGraph={TreasuryHistoryGraph}
                account={account}
                tokens={
                  tokens.loading
                    ? tokens
                    : {
                        loading: false,
                        updating: tokens.updating,
                        data: tokens.data.filter(({ owner }) =>
                          areAccountsEqual(owner, account)
                        ),
                      }
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Only show NFTs once tokens stop loading. */}
      {!tokens.loading &&
        (nfts.loading || nfts.data.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
                <p className="title-text">
                  {nfts.loading
                    ? t('title.nfts')
                    : t('title.numNfts', {
                        count: filteredNfts.length,
                      })}
                </p>

                <p className="secondary-text break-words">
                  {t('info.meBalancesNftsDescription', {
                    context: selectedNftChainFilter === 'all' ? 'all' : 'chain',
                    chainName:
                      selectedNftChainFilter === 'all'
                        ? ''
                        : getDisplayNameForChainId(selectedNftChainFilter),
                  })}
                </p>
              </div>

              {!nfts.loading && nfts.data.length > 0 && (
                <div className="flex flex-row items-center justify-end">
                  <ButtonPopup position="left" {...filterNftButtonPopupProps} />
                </div>
              )}
            </div>

            {nfts.loading ? (
              <Loader fill={false} />
            ) : filteredNfts.length > 0 ? (
              <>
                <GridCardContainer className="pb-6">
                  {filteredNfts
                    .slice(
                      (nftPage - 1) * NFTS_PER_PAGE,
                      nftPage * NFTS_PER_PAGE
                    )
                    .map((props, index) => (
                      <NftCard {...(props as N)} key={index} />
                    ))}
                </GridCardContainer>

                <Pagination
                  className="mx-auto"
                  page={nftPage}
                  pageSize={NFTS_PER_PAGE}
                  setPage={setNftPage}
                  total={filteredNfts.length}
                />
              </>
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
    label: 'Lowest USD value',
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

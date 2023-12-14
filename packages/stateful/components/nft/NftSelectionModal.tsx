/* eslint-disable @next/next/no-img-element */
import { Image, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { nftCardInfosForKeyAtom } from '@dao-dao/state/recoil'
import {
  Button,
  ButtonPopup,
  Loader,
  Modal,
  NoContent,
  PAGINATION_MIN_PAGE,
  Pagination,
  SearchBar,
} from '@dao-dao/stateless'
import { useButtonPopupFilter, useSearchFilter } from '@dao-dao/stateless/hooks'
import {
  FilterFn,
  LazyNftCardInfo,
  NftCardInfo,
  NftSelectionModalProps,
  TypedOption,
} from '@dao-dao/types'
import { getChainForChainId, getDisplayNameForChainId } from '@dao-dao/utils'

import { LazyNftCard } from './LazyNftCard'

type LazyNftCardWithLoadedInfo = LazyNftCardInfo & {
  loadedInfo?: NftCardInfo
}

const NFTS_PER_PAGE = 30

export const NftSelectionModal = ({
  nfts,
  selectedKeys,
  onNftClick,
  onSelectAll,
  onDeselectAll,
  action,
  secondaryAction,
  fallbackError,
  containerClassName,
  allowSelectingNone,
  selectedDisplay,
  headerDisplay,
  noneDisplay,
  ...modalProps
}: NftSelectionModalProps) => {
  const { t } = useTranslation()
  const showSelectAll =
    (onSelectAll || onDeselectAll) &&
    !nfts.loading &&
    !nfts.errored &&
    nfts.data.length > 2

  // Scroll first selected into view as soon as possible.
  const firstSelectedRef = useRef<HTMLDivElement | null>(null)
  const [scrolledToFirst, setScrolledToFirst] = useState(false)
  useEffect(() => {
    if (
      nfts.loading ||
      scrolledToFirst ||
      !firstSelectedRef.current?.parentElement
    ) {
      return
    }

    setScrolledToFirst(true)

    firstSelectedRef.current.parentElement.scrollTo({
      behavior: 'smooth',
      top:
        // Calculate y position of selected card in scrollable container.
        firstSelectedRef.current.offsetTop -
        firstSelectedRef.current.parentElement.offsetTop -
        // Add some padding on top.
        24,
    })
  }, [nfts, firstSelectedRef, scrolledToFirst])

  const uniqueChainIds = Array.from(
    new Set(
      nfts.loading || nfts.errored
        ? []
        : nfts.data.map(({ chainId }) => chainId)
    )
  )
  const nftChains = uniqueChainIds.map(getChainForChainId)
  const filterOptions = useMemo(
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
          id: chain.chain_name,
          label: getDisplayNameForChainId(chain.chain_id),
          value: (nft) => nft.chainId === chain.chain_id,
        })
      ),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([nftChains])
  )

  const nftCardInfosForKey = useRecoilValue(nftCardInfosForKeyAtom)
  const nftsWithLoadedInfo: LazyNftCardWithLoadedInfo[] = useMemo(
    () =>
      nfts.loading || nfts.errored
        ? []
        : nfts.data.map(
            (info): LazyNftCardWithLoadedInfo => ({
              ...info,
              loadedInfo: nftCardInfosForKey[info.key],
            })
          ),
    [nfts, nftCardInfosForKey]
  )

  const {
    filteredData: filteredNfts,
    buttonPopupProps: filterNftButtonPopupProps,
  } = useButtonPopupFilter({
    data: nftsWithLoadedInfo,
    options: filterOptions,
  })

  const { searchBarProps, filteredData: filteredSearchedNfts } =
    useSearchFilter(filteredNfts, FILTERABLE_KEYS)

  const [_nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)
  const nftPage = Math.min(
    _nftPage,
    Math.ceil(filteredSearchedNfts.length / NFTS_PER_PAGE)
  )

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx('h-full w-full !max-w-3xl', containerClassName)}
      contentContainerClassName={
        nfts.errored
          ? 'items-center justify-center gap-4'
          : !nfts.loading && nfts.data.length > 0
          ? 'no-scrollbar grid grid-flow-row auto-rows-max grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3'
          : undefined
      }
      footerContent={
        <div
          className={clsx(
            'flex flex-row items-center gap-6',
            // If selectedDisplay is null, it will be hidden, so align button at
            // the end.
            selectedDisplay === null ? 'justify-end' : 'justify-between'
          )}
        >
          {selectedDisplay !== undefined ? (
            selectedDisplay
          ) : (
            <p>{t('info.numNftsSelected', { count: selectedKeys.length })}</p>
          )}

          <div className="flex flex-row items-stretch gap-2">
            {secondaryAction && (
              <Button
                loading={secondaryAction.loading}
                onClick={secondaryAction.onClick}
                variant="secondary"
              >
                {secondaryAction.label}
              </Button>
            )}

            <Button
              disabled={!allowSelectingNone && selectedKeys.length === 0}
              loading={action.loading}
              onClick={action.onClick}
              variant="primary"
            >
              {action.label}
            </Button>
          </div>
        </div>
      }
      headerContent={
        headerDisplay ||
        nfts.loading ||
        nfts.errored ||
        nfts.data.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4">
            {headerDisplay}

            <SearchBar
              autoFocus={modalProps.visible}
              placeholder={t('info.searchNftsPlaceholder')}
              {...searchBarProps}
            />

            <div
              className={clsx(
                'flex flex-row flex-wrap items-center gap-x-8 gap-y-4',
                // Push sort/filter to the right no matter what.
                showSelectAll ? 'justify-between' : 'justify-end'
              )}
            >
              {showSelectAll && (
                <Button
                  className="text-text-interactive-active"
                  disabled={nfts.loading}
                  onClick={
                    nfts.loading
                      ? undefined
                      : nfts.data.length === selectedKeys.length
                      ? onDeselectAll
                      : onSelectAll
                  }
                  variant="underline"
                >
                  {!nfts.loading &&
                    (nfts.data.length === selectedKeys.length
                      ? t('button.deselectAllNfts', { count: nfts.data.length })
                      : t('button.selectAllNfts', { count: nfts.data.length }))}
                </Button>
              )}

              <div className="flex grow flex-row items-center justify-end">
                <ButtonPopup position="left" {...filterNftButtonPopupProps} />
              </div>
            </div>

            <Pagination
              className="mx-auto -mt-4"
              page={nftPage}
              pageSize={NFTS_PER_PAGE}
              setPage={setNftPage}
              total={filteredSearchedNfts.length}
            />
          </div>
        ) : undefined
      }
    >
      {nfts.loading ? (
        <Loader />
      ) : nfts.errored ? (
        <>
          <WarningRounded className="!h-14 !w-14" />
          <p className="body-text">
            {fallbackError ?? t('error.checkInternetOrTryAgain')}
          </p>
          <pre className="secondary-text max-w-prose whitespace-pre-wrap text-center text-xs text-text-interactive-error">
            {nfts.error.message}
          </pre>
        </>
      ) : nfts.data.length > 0 ? (
        filteredSearchedNfts
          .slice((nftPage - 1) * NFTS_PER_PAGE, nftPage * NFTS_PER_PAGE)
          .map(({ item }) => (
            <LazyNftCard
              ref={selectedKeys[0] === item.key ? firstSelectedRef : undefined}
              {...item}
              key={item.key}
              checkbox={{
                checked: selectedKeys.includes(item.key),
                // Disable toggling if currently staking.
                onClick: () => !action.loading && onNftClick(item),
              }}
            />
          ))
      ) : (
        noneDisplay || (
          <NoContent
            Icon={Image}
            body={t('info.noNftsFound')}
            className="grow justify-center"
          />
        )
      )}
    </Modal>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<LazyNftCardWithLoadedInfo>[] = [
  'collectionAddress',
  'tokenId',
  'loadedInfo.name',
  'loadedInfo.description',
  'loadedInfo.collectionName',
  'loadedInfo.collectionAddress',
]

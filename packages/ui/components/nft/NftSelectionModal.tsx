/* eslint-disable @next/next/no-img-element */
import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData, NftCardInfo } from '@dao-dao/tstypes'

import { SortFn, useDropdownSorter, useSearchFilter } from '../../hooks'
import { Button } from '../Button'
import { Dropdown, DropdownOption } from '../Dropdown'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Modal, ModalProps } from '../Modal'
import { NoContent } from '../NoContent'
import { SearchBar } from '../SearchBar'
import { NftCard } from './NftCard'

export interface NftSelectionModalProps
  extends Omit<ModalProps, 'children' | 'header'>,
    Required<Pick<ModalProps, 'header'>> {
  nfts: LoadingData<NftCardInfo[]>
  selectedIds: string[]
  getIdForNft: (nft: NftCardInfo) => string
  onNftClick: (nft: NftCardInfo) => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
  onAction: () => void
  actionLoading: boolean
  actionLabel: string
  Loader?: ComponentType<LoaderProps>
  allowSelectingNone?: boolean
  selectedDisplay?: ReactNode
}

export const NftSelectionModal = ({
  nfts,
  selectedIds,
  getIdForNft,
  onNftClick,
  onSelectAll,
  onDeselectAll,
  onAction,
  actionLoading,
  actionLabel,
  containerClassName,
  Loader = DefaultLoader,
  allowSelectingNone,
  selectedDisplay,
  ...modalProps
}: NftSelectionModalProps) => {
  const { t } = useTranslation()

  const showSelectAll =
    (onSelectAll || onDeselectAll) && !nfts.loading && nfts.data.length > 2

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

  const { sortedData: sortedNfts, dropdownProps: sortDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, sortOptions)

  const { searchBarProps, filteredData } = useSearchFilter(
    sortedNfts,
    FILTERABLE_KEYS
  )

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx(
        'flex flex-col w-full !max-w-3xl h-[48rem]',
        containerClassName
      )}
      footerContent={
        <div
          className={clsx(
            'flex flex-row gap-6 items-center',
            // If selectedDisplay is null, it will be hidden, so align button at
            // the end.
            selectedDisplay === null ? 'justify-end' : 'justify-between'
          )}
        >
          {selectedDisplay !== undefined ? (
            selectedDisplay
          ) : (
            <p>{t('info.numNftsSelected', { count: selectedIds.length })}</p>
          )}

          <Button
            disabled={!allowSelectingNone && selectedIds.length === 0}
            loading={actionLoading}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      }
      headerContent={
        <div className="flex flex-col gap-2">
          <div
            className={clsx(
              'flex flex-row gap-12 items-center',
              // Push sort dropdown to the right no matter what.
              showSelectAll ? 'justify-between' : 'justify-end'
            )}
          >
            {showSelectAll && (
              <Button
                className="mt-4 text-text-interactive-active"
                disabled={nfts.loading}
                onClick={
                  nfts.loading
                    ? undefined
                    : nfts.data.length === selectedIds.length
                    ? onDeselectAll
                    : onSelectAll
                }
                variant="underline"
              >
                {!nfts.loading &&
                  (nfts.data.length === selectedIds.length
                    ? t('button.deselectAllNfts', { count: nfts.data.length })
                    : t('button.selectAllNfts', { count: nfts.data.length }))}
              </Button>
            )}

            <div className="flex flex-row gap-4 justify-between items-center">
              <p className="text-text-body primary-text">{t('title.sortBy')}</p>

              <Dropdown {...sortDropdownProps} />
            </div>
          </div>

          <SearchBar
            autoFocus
            placeholder={t('info.searchNftsPlaceholder')}
            {...searchBarProps}
          />
        </div>
      }
    >
      {nfts.loading ? (
        <Loader className="-mt-6" />
      ) : nfts.data.length > 0 ? (
        <div className="grid overflow-y-auto grow grid-cols-2 grid-flow-row auto-rows-max gap-4 py-4 px-6 -mx-6 -mt-6 sm:grid-cols-3 no-scrollbar">
          {filteredData.map((nft: NftCardInfo) => (
            <NftCard
              key={getIdForNft(nft)}
              ref={
                selectedIds[0] === getIdForNft(nft)
                  ? firstSelectedRef
                  : undefined
              }
              {...nft}
              checkbox={{
                checked: selectedIds.includes(getIdForNft(nft)),
                // Disable toggling if currently staking.
                onClick: () => !actionLoading && onNftClick(nft),
              }}
            />
          ))}
        </div>
      ) : (
        <NoContent
          Icon={Image}
          body={t('info.noNftsYet')}
          className="justify-center mb-6 w-full h-full"
        />
      )}
    </Modal>
  )
}

const sortOptions: DropdownOption<SortFn<Pick<NftCardInfo, 'name'>>>[] = [
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
]

const FILTERABLE_KEYS = ['name', 'description']

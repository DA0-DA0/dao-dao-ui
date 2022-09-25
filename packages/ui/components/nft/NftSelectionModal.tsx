/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData, NftCardInfo } from '@dao-dao/tstypes'

import { Button } from '../Button'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Modal, ModalProps } from '../Modal'
import { NftCard } from './NftCard'

export interface NftSelectionModalProps
  extends Omit<ModalProps, 'children' | 'header'>,
    Required<Pick<ModalProps, 'header'>> {
  nfts: LoadingData<NftCardInfo[]>
  selectedIds: string[]
  getIdForNft: (nft: NftCardInfo) => string
  onNftClick: (nft: NftCardInfo) => void
  onSelectAll: () => void
  onDeselectAll: () => void
  onAction: () => void
  actionLoading: boolean
  actionLabel: string
  Loader?: ComponentType<LoaderProps>
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
  ...modalProps
}: NftSelectionModalProps) => {
  const { t } = useTranslation()

  const showSelectAll = !nfts.loading && nfts.data.length > 2

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx(
        'flex flex-col w-full !max-w-3xl h-[48rem]',
        containerClassName
      )}
      footerContent={
        <div className="flex flex-row gap-6 justify-between items-center">
          <div className="flex flex-row flex-wrap gap-4 items-center">
            {t('info.numNftsSelected', { count: selectedIds.length })}
          </div>

          <Button
            disabled={actionLoading || selectedIds.length === 0}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      }
      headerContent={
        <div
          className={clsx(
            'flex flex-row items-center pt-4 -mb-1',
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

          {!nfts.loading && (
            <p className="text-right text-text-secondary link-text">
              {t('info.numOfTotalNfts', {
                count: nfts.data.length,
                total: '?',
                name: '?',
              })}
            </p>
          )}
        </div>
      }
    >
      {nfts.loading ? (
        <Loader className="mb-6" fill={false} />
      ) : (
        <div className="grid overflow-y-auto grid-cols-1 grid-flow-row auto-rows-max gap-4 py-4 px-6 -mx-6 -mt-6 xs:grid-cols-2 sm:grid-cols-3 no-scrollbar">
          {nfts.data.map((nft) => (
            <NftCard
              key={getIdForNft(nft)}
              {...nft}
              checkbox={{
                checked: selectedIds.includes(getIdForNft(nft)),
                // Disable toggling if currently staking.
                onClick: () => !actionLoading && onNftClick(nft),
              }}
            />
          ))}
        </div>
      )}
    </Modal>
  )
}

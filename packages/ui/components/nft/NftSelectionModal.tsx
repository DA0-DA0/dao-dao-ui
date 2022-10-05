/* eslint-disable @next/next/no-img-element */
import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData, NftCardInfo } from '@dao-dao/tstypes'

import { Button } from '../Button'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Modal, ModalProps } from '../Modal'
import { NoContent } from '../NoContent'
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

  const showSelectAll =
    (onSelectAll || onDeselectAll) && !nfts.loading && nfts.data.length > 2

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
            disabled={selectedIds.length === 0}
            loading={actionLoading}
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
        </div>
      }
    >
      {nfts.loading ? (
        <Loader className="-mt-6" />
      ) : nfts.data.length > 0 ? (
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

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import { Modal, ModalProps } from '../Modal'
import { NftCard, NftInfo } from './NftCard'

export interface NftStakingModalProps extends Omit<ModalProps, 'children'> {
  nfts: NftInfo[]
  collection: {
    name: string
    total: number
  }
  selectedAddresses: string[]
  onNftClick: (nft: NftInfo) => void
  onSelectAll: () => void
  onDeselectAll: () => void
  onStake: () => void
}

export const NftStakingModal = ({
  nfts,
  collection: { name, total },
  selectedAddresses,
  onNftClick,
  onSelectAll,
  onDeselectAll,
  onStake,
  containerClassName,
  ...modalProps
}: NftStakingModalProps) => {
  const { t } = useTranslation()

  modalProps.header = {
    title: modalProps.header?.title || t('title.stakeNfts'),
    subtitle:
      modalProps.header?.subtitle || t('info.stakeNftsModalSubtitle', { name }),
  }

  const showSelectAll = nfts.length > 2

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx(
        'flex flex-col w-full max-w-2xl h-[60rem]',
        containerClassName
      )}
      footerContent={
        <div className="flex flex-row gap-6 justify-between items-center">
          <div className="flex flex-row flex-wrap gap-4 items-center">
            {t('info.numNftsSelected', { count: selectedAddresses.length })}
          </div>

          <Button onClick={onStake}>{t('button.stakeNft')}</Button>
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
              onClick={
                nfts.length === selectedAddresses.length
                  ? onDeselectAll
                  : onSelectAll
              }
              variant="underline"
            >
              {nfts.length === selectedAddresses.length
                ? t('button.deselectAllNfts', { count: nfts.length })
                : t('button.selectAllNfts', { count: nfts.length })}
            </Button>
          )}

          <p className="text-right text-text-secondary link-text">
            {t('info.numOfTotalNfts', { count: nfts.length, total, name })}
          </p>
        </div>
      }
    >
      <div className="grid overflow-y-auto grid-cols-1 grid-flow-row auto-rows-max gap-4 py-4 px-6 -mx-6 -mt-6 md:grid-cols-2">
        {nfts.map((nft) => (
          <NftCard
            key={nft.address}
            {...nft}
            checkbox={{
              checked: selectedAddresses.includes(nft.address),
              onClick: () => onNftClick(nft),
            }}
          />
        ))}
      </div>
    </Modal>
  )
}

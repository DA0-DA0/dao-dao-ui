import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  ImageEmoji,
  InputErrorMessage,
  NftCard,
  NftSelectionModal,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadingDataWithError,
  NftCardInfo,
} from '@dao-dao/types'
import { validateAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface TransferCw721Options {
  // The set of NFTs that may be transfered as part of this action.
  options: LoadingDataWithError<NftCardInfo[]>
  // Information about the NFT currently selected.
  nftInfo: NftCardInfo | undefined
}

export const TransferCw721Component: ActionComponent<TransferCw721Options> = ({
  fieldNamePrefix,
  onRemove,
  isCreating,
  errors,
  options: { options, nftInfo },
}) => {
  const { t } = useTranslation()
  const { watch, setValue, setError, register, clearErrors } = useFormContext()

  const tokenId = watch(fieldNamePrefix + 'tokenId')
  const collection = watch(fieldNamePrefix + 'collection')

  const selected = `${collection}${tokenId}`
  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.collection.address}${nft.tokenId}`

  useEffect(() => {
    if (!selected) {
      setError(fieldNamePrefix + 'collection', {
        type: 'required',
        message: t('error.noNftSelected'),
      })
    } else {
      clearErrors(fieldNamePrefix + 'collection')
    }
  }, [selected, setError, clearErrors, t])

  const [showModal, setShowModal] = useState<boolean>(isCreating)

  return (
    <ActionCard
      Icon={ImageEmoji}
      onRemove={onRemove}
      title={t('title.transferNft')}
    >
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="flex flex-col gap-1">
          {nftInfo && <NftCard {...nftInfo} className="max-w-xs" />}
          {isCreating && (
            <Button
              className="text-text-tertiary"
              onClick={() => setShowModal(true)}
              variant="underline"
            >
              ({t('button.selectNft')})
            </Button>
          )}
          <InputErrorMessage error={errors?.collection} />
        </div>
        <div className="flex grow flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="flex flex-row items-center pl-1 sm:pl-0">
            <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
            <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
          </div>
          <div className="flex flex-col gap-1">
            <AddressInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.to}
              fieldName={fieldNamePrefix + 'recipient'}
              register={register}
              validation={[validateRequired, validateAddress]}
            />
            <InputErrorMessage error={errors?.recipient} />
          </div>
        </div>
      </div>

      <NftSelectionModal
        actionLabel={t('button.save')}
        actionLoading={false}
        getIdForNft={getIdForNft}
        header={{
          title: t('title.selectNftToTransfer'),
        }}
        nfts={options}
        onAction={() => setShowModal(false)}
        onNftClick={(nft) => {
          if (getIdForNft(nft) === selected) {
            setValue(fieldNamePrefix, {
              tokenId: '',
              collection: '',
            })
          } else {
            setValue(fieldNamePrefix, {
              tokenId: nft.tokenId,
              collection: nft.collection.address,
            })
          }
        }}
        selectedIds={[selected]}
        visible={showModal}
      />
    </ActionCard>
  )
}

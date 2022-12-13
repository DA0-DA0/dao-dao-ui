import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  HorizontalNftCard,
  ImageEmoji,
  InputErrorMessage,
  NftSelectionModal,
} from '@dao-dao/stateless'
import { ActionComponent, NftCardInfo } from '@dao-dao/types'
import { validateAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from '../ActionCard'
import { TransferNftOptions } from './types'

export const TransferNftComponent: ActionComponent<TransferNftOptions> = ({
  fieldNamePrefix,
  onRemove,
  isCreating,
  errors,
  options: { options, nftInfo, ProfileDisplay },
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
  }, [selected, setError, clearErrors, t, fieldNamePrefix])

  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <ActionCard
      Icon={ImageEmoji}
      onRemove={onRemove}
      title={t('title.transferNft')}
    >
      <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row">
        <div className="flex grow basis-0 flex-col gap-1">
          <p className="primary-text mb-3">
            {isCreating
              ? t('form.whoTransferNftQuestion')
              : t('form.recipient')}
          </p>

          <AddressInput
            ProfileDisplay={ProfileDisplay}
            disabled={!isCreating}
            error={errors?.to}
            fieldName={fieldNamePrefix + 'recipient'}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.recipient} />
        </div>

        <div className="flex grow basis-0 flex-col gap-2">
          {nftInfo && <HorizontalNftCard {...nftInfo} />}

          {isCreating && (
            <Button
              className="self-end text-text-tertiary"
              onClick={() => setShowModal(true)}
              variant="secondary"
            >
              {t('button.selectNft')}
            </Button>
          )}

          <InputErrorMessage error={errors?.collection} />
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
            setValue(fieldNamePrefix + 'tokenId', '')
            setValue(fieldNamePrefix + 'collection', '')
          } else {
            setValue(fieldNamePrefix + 'tokenId', nft.tokenId)
            setValue(fieldNamePrefix + 'collection', nft.collection.address)
          }
        }}
        selectedIds={[selected]}
        visible={showModal}
      />
    </ActionCard>
  )
}

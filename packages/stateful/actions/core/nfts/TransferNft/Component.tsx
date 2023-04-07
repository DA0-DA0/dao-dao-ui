import { Check, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CodeMirrorInput,
  FormSwitchCard,
  HorizontalNftCard,
  InputErrorMessage,
  InputLabel,
  NftSelectionModal,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  LoadingDataWithError,
  NftCardInfo,
} from '@dao-dao/types'
import {
  validateAddress,
  validateContractAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

export interface TransferNftOptions {
  // The set of NFTs that may be transfered as part of this action.
  options: LoadingDataWithError<NftCardInfo[]>
  // Information about the NFT currently selected.
  nftInfo: NftCardInfo | undefined

  AddressInput: ComponentType<AddressInputProps>
}

export const TransferNftComponent: ActionComponent<TransferNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfo, AddressInput },
}) => {
  const { t } = useTranslation()
  const { control, watch, setValue, setError, register, clearErrors } =
    useFormContext()

  const tokenId = watch(fieldNamePrefix + 'tokenId')
  const collection = watch(fieldNamePrefix + 'collection')
  const executeSmartContract = watch(fieldNamePrefix + 'executeSmartContract')

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

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(isCreating && !selected)

  return (
    <>
      <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row lg:flex-wrap">
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="primary-text mb-3">
              {isCreating
                ? t('form.whoTransferNftQuestion')
                : t('form.recipient')}
            </p>

            <AddressInput
              disabled={!isCreating}
              error={errors?.recipient}
              fieldName={fieldNamePrefix + 'recipient'}
              register={register}
              validation={[
                validateRequired,
                // If executing smart contract, ensure recipient is smart
                // contract.
                executeSmartContract
                  ? validateContractAddress
                  : validateAddress,
              ]}
            />
            <InputErrorMessage error={errors?.recipient} />
          </div>

          {/* Don't show if not creating and not executing smart contract. */}
          {(isCreating || executeSmartContract) && (
            <div className="flex flex-col gap-1">
              <FormSwitchCard
                containerClassName="self-start"
                fieldName={fieldNamePrefix + 'executeSmartContract'}
                label={t('form.executeSmartContract')}
                onToggle={() => {
                  // Recipient validation changes as a function of this value,
                  // so reset errors on change and they will get revalidated
                  // later.
                  clearErrors(fieldNamePrefix + 'recipient')
                  // Reset to valid empty JSON object.
                  setValue(fieldNamePrefix + 'smartContractMsg', '{}', {
                    shouldValidate: true,
                  })
                }}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.executeSmartContractTooltip')}
                tooltipIconSize="sm"
                value={executeSmartContract}
              />

              {executeSmartContract && (
                <div className="mt-2 flex flex-col gap-1">
                  <InputLabel name={t('form.smartContractMessage')} />

                  <CodeMirrorInput
                    control={control}
                    error={errors?.smartContractMsg}
                    fieldName={fieldNamePrefix + 'smartContractMsg'}
                    readOnly={!isCreating}
                    validation={[validateJSON]}
                  />

                  {errors?.smartContractMsg?.message ? (
                    <p className="flex items-center gap-1 text-sm text-text-interactive-error">
                      <Close className="!h-5 !w-5" />{' '}
                      <span>{errors.smartContractMsg.message}</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
                      <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex grow flex-col gap-2">
          {nftInfo && <HorizontalNftCard {...nftInfo} />}

          {isCreating && (
            <Button
              className={clsx(
                'text-text-tertiary',
                nftInfo ? 'self-end' : 'self-start'
              )}
              onClick={() => setShowModal(true)}
              variant="secondary"
            >
              {t('button.selectNft')}
            </Button>
          )}

          <InputErrorMessage error={errors?.collection} />
        </div>
      </div>

      {isCreating && (
        <NftSelectionModal
          actionLabel={t('button.save')}
          actionLoading={false}
          getIdForNft={getIdForNft}
          header={{
            title: t('title.selectNftToTransfer'),
          }}
          nfts={options}
          onAction={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            if (getIdForNft(nft) === selected) {
              setValue(fieldNamePrefix + 'tokenId', '')
              setValue(fieldNamePrefix + 'collection', '')
            } else {
              setValue(fieldNamePrefix + 'tokenId', nft.tokenId)
              setValue(fieldNamePrefix + 'collection', nft.collection.address)
            }
          }}
          selectedIds={selected ? [selected] : []}
          visible={showModal}
        />
      )}
    </>
  )
}

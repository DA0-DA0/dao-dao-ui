import { Check, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainProvider,
  CodeMirrorInput,
  FormSwitchCard,
  HorizontalNftCard,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  LazyNftCardInfo,
  LoadingDataWithError,
  NftCardInfo,
  NftSelectionModalProps,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getNftKey,
  makeValidateAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

export type TransferNftData = {
  chainId: string
  collection: string
  tokenId: string
  recipient: string

  // When true, uses `send` instead of `transfer_nft` to transfer the NFT.
  executeSmartContract: boolean
  smartContractMsg: string
}

export interface TransferNftOptions {
  // The set of NFTs that may be transfered as part of this action.
  options: LoadingDataWithError<LazyNftCardInfo[]>
  // Information about the NFT currently selected.
  nftInfo: NftCardInfo | undefined

  AddressInput: ComponentType<AddressInputProps<TransferNftData>>
  NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const TransferNftComponent: ActionComponent<TransferNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfo, AddressInput, NftSelectionModal },
}) => {
  const { t } = useTranslation()
  const { control, watch, setValue, setError, register, clearErrors } =
    useFormContext<TransferNftData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const chain = getChainForChainId(chainId)

  const tokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')
  const collection = watch((fieldNamePrefix + 'collection') as 'collection')
  const executeSmartContract = watch(
    (fieldNamePrefix + 'executeSmartContract') as 'executeSmartContract'
  )

  const selectedKey = getNftKey(chainId, collection, tokenId)

  useEffect(() => {
    if (!selectedKey) {
      setError((fieldNamePrefix + 'collection') as 'collection', {
        type: 'required',
        message: t('error.noNftSelected'),
      })
    } else {
      clearErrors((fieldNamePrefix + 'collection') as 'collection')
    }
  }, [selectedKey, setError, clearErrors, t, fieldNamePrefix])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(
    isCreating && !selectedKey
  )

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

            <ChainProvider chainId={chainId}>
              <AddressInput
                disabled={!isCreating}
                error={errors?.recipient}
                fieldName={(fieldNamePrefix + 'recipient') as 'recipient'}
                register={register}
                validation={[
                  validateRequired,
                  // If executing smart contract, ensure recipient is smart
                  // contract.
                  (executeSmartContract
                    ? makeValidateAddress
                    : makeValidateAddress)(chain.bech32_prefix),
                ]}
              />
            </ChainProvider>
            <InputErrorMessage error={errors?.recipient} />
          </div>

          {/* Don't show if not creating and not executing smart contract. */}
          {(isCreating || executeSmartContract) && (
            <div className="flex flex-col gap-1">
              <FormSwitchCard
                containerClassName="self-start"
                fieldName={
                  (fieldNamePrefix +
                    'executeSmartContract') as 'executeSmartContract'
                }
                label={t('form.executeSmartContract')}
                onToggle={() => {
                  // Recipient validation changes as a function of this value,
                  // so reset errors on change and they will get revalidated
                  // later.
                  clearErrors((fieldNamePrefix + 'recipient') as 'recipient')
                  // Reset to valid empty JSON object.
                  setValue(
                    (fieldNamePrefix +
                      'smartContractMsg') as 'smartContractMsg',
                    '{}',
                    {
                      shouldValidate: true,
                    }
                  )
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
                    fieldName={
                      (fieldNamePrefix +
                        'smartContractMsg') as 'smartContractMsg'
                    }
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
          action={{
            loading: false,
            label: t('button.save'),
            onClick: () => setShowModal(false),
          }}
          header={{
            title: t('title.selectNftToTransfer'),
          }}
          nfts={options}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            if (nft.key === selectedKey) {
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
              setValue((fieldNamePrefix + 'collection') as 'collection', '')
            } else {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', nft.tokenId)
              setValue(
                (fieldNamePrefix + 'collection') as 'collection',
                nft.collectionAddress
              )
            }
          }}
          selectedKeys={selectedKey ? [selectedKey] : []}
          visible={showModal}
        />
      )}
    </>
  )
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import {
  CommonNftSelectors,
  secretContractCodeHashSelector,
} from '@dao-dao/state'
import {
  InputErrorMessage,
  Loader,
  TextInput,
  useChain,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigInputProps } from '@dao-dao/types'
import {
  isSecretNetwork,
  isValidBech32Address,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { CreatorData, GovernanceTokenType } from './types'

export const GovernanceConfigurationInput = ({
  data,
  context: {
    form: {
      formState: { errors },
      register,
      setValue,
      setError,
      clearErrors,
    },
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  //! Validate existing governance token.
  const existingGovernanceNftCollectionAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceNftCollectionAddress
      : undefined
  const collectionInfoLoadable = useRecoilValueLoadable(
    existingGovernanceNftCollectionAddress &&
      isValidBech32Address(existingGovernanceNftCollectionAddress, bech32Prefix)
      ? waitForAll([
          CommonNftSelectors.contractInfoSelector({
            chainId,
            contractAddress: existingGovernanceNftCollectionAddress,
            params: [],
          }),
          CommonNftSelectors.numTokensSelector({
            chainId,
            contractAddress: existingGovernanceNftCollectionAddress,
            params: [],
          }),
          isSecretNetwork(chainId)
            ? secretContractCodeHashSelector({
                chainId,
                contractAddress: existingGovernanceNftCollectionAddress,
              })
            : constSelector(undefined),
        ])
      : constSelector(undefined)
  )

  useEffect(() => {
    if (isSecretNetwork(chainId)) {
      setValue(
        'creator.data.secretCodeHash',
        collectionInfoLoadable.valueMaybe()?.[2]
          ? collectionInfoLoadable.contents[2]
          : undefined
      )
    }

    if (collectionInfoLoadable.state !== 'hasError') {
      if (errors?.creator?.data?._existingError) {
        clearErrors('creator.data._existingError')
      }
      return
    }

    if (!errors?.creator?.data?._existingError) {
      setError('creator.data._existingError', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', { tokenType: 'CW721' }),
      })
    }
  }, [
    chainId,
    clearErrors,
    collectionInfoLoadable,
    errors?.creator?.data?._existingError,
    setError,
    setValue,
    t,
  ])

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex h-14 flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('form.nftCollectionAddress')}
          </p>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <TextInput
              className="symbol-small-body-text font-mono text-text-secondary"
              error={
                errors.creator?.data?.existingGovernanceNftCollectionAddress
              }
              fieldName="creator.data.existingGovernanceNftCollectionAddress"
              ghost
              placeholder={bech32Prefix + '...'}
              register={register}
              validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
            />
            <InputErrorMessage
              error={
                errors.creator?.data?.existingGovernanceNftCollectionAddress ||
                errors.creator?.data?._existingError
              }
            />
          </div>

          {collectionInfoLoadable.state === 'loading' ? (
            <Loader />
          ) : collectionInfoLoadable.state === 'hasValue' ? (
            <p className="primary-text text-text-interactive-valid">
              ${collectionInfoLoadable.valueMaybe()?.[0].symbol}
            </p>
          ) : (
            <InputErrorMessage error={collectionInfoLoadable.errorMaybe()} />
          )}
        </div>
      </div>
    </>
  )
}

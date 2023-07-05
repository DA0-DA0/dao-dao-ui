import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  FormattedJsonDisplay,
  InputErrorMessage,
  TextInput,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigInputProps } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  isValidContractAddress,
  validateContractAddress,
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

  //! Validate existing governance token.
  const existingGovernanceTokenDenomOrAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceTokenDenomOrAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenDenomOrAddress &&
      isValidContractAddress(
        existingGovernanceTokenDenomOrAddress,
        CHAIN_BECH32_PREFIX
      )
      ? Cw721BaseSelectors.contractInfoSelector({
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const numOfTokensLoadable = useRecoilValueLoadable(
    existingGovernanceTokenDenomOrAddress &&
      isValidContractAddress(
        existingGovernanceTokenDenomOrAddress,
        CHAIN_BECH32_PREFIX
      )
      ? Cw721BaseSelectors.numTokensSelector({
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    setValue(
      'creator.data.existingGovernanceTokenInfo',
      existingGovernanceTokenInfoLoadable.state === 'hasValue'
        ? existingGovernanceTokenInfoLoadable.contents
        : undefined
    )

    if (existingGovernanceTokenInfoLoadable.state !== 'hasError') {
      if (errors?.creator?.data?.existingGovernanceTokenInfo) {
        clearErrors('creator.data.existingGovernanceTokenInfo._error')
      }
      return
    }

    if (!errors?.creator?.data?.existingGovernanceTokenInfo) {
      setError('creator.data.existingGovernanceTokenInfo._error', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', { tokenType: 'CW721' }),
      })
    }
  }, [
    clearErrors,
    errors?.creator?.data?.existingGovernanceTokenInfo,
    existingGovernanceTokenInfoLoadable,
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
                errors.creator?.data?.existingGovernanceTokenDenomOrAddress
              }
              fieldName="creator.data.existingGovernanceTokenDenomOrAddress"
              ghost
              placeholder={CHAIN_BECH32_PREFIX + '...'}
              register={register}
              validation={[validateContractAddress, validateRequired]}
            />
            <InputErrorMessage
              error={
                errors.creator?.data?.existingGovernanceTokenDenomOrAddress ||
                errors.creator?.data?.existingGovernanceTokenInfo?._error
              }
            />
          </div>
          <FormattedJsonDisplay
            jsonLoadable={existingGovernanceTokenInfoLoadable}
            title={t('title.collectionInfo')}
          />
          <FormattedJsonDisplay
            jsonLoadable={numOfTokensLoadable}
            title={t('title.totalSupply')}
          />
        </div>
      </div>
    </>
  )
}

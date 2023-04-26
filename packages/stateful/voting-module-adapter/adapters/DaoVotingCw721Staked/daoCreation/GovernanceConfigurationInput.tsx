import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  FormattedJsonDisplay,
  InputErrorMessage,
  TextInput,
  useChain,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigInputProps } from '@dao-dao/types'
import {
  isValidContractAddress,
  makeValidateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationConfig, GovernanceTokenType } from '../types'

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
}: DaoCreationGovernanceConfigInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  //! Validate existing governance token.
  const existingGovernanceTokenAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceTokenAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(existingGovernanceTokenAddress, bech32Prefix)
      ? Cw721BaseSelectors.contractInfoSelector({
          chainId,
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const numOfTokensLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(existingGovernanceTokenAddress, bech32Prefix)
      ? Cw721BaseSelectors.numTokensSelector({
          chainId,
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    setValue(
      'votingModuleAdapter.data.existingGovernanceTokenInfo',
      existingGovernanceTokenInfoLoadable.state === 'hasValue'
        ? existingGovernanceTokenInfoLoadable.contents
        : undefined
    )

    if (existingGovernanceTokenInfoLoadable.state !== 'hasError') {
      if (errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo) {
        clearErrors(
          'votingModuleAdapter.data.existingGovernanceTokenInfo._error'
        )
      }
      return
    }

    if (!errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo) {
      setError('votingModuleAdapter.data.existingGovernanceTokenInfo._error', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', { tokenType: 'CW721' }),
      })
    }
  }, [
    clearErrors,
    errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo,
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
                errors.votingModuleAdapter?.data?.existingGovernanceTokenAddress
              }
              fieldName="votingModuleAdapter.data.existingGovernanceTokenAddress"
              ghost
              placeholder={bech32Prefix + '...'}
              register={register}
              validation={[
                validateRequired,
                makeValidateContractAddress(bech32Prefix),
                () =>
                  existingGovernanceTokenInfoLoadable.state !== 'loading' ||
                  !!data.existingGovernanceTokenInfo ||
                  t('info.verifyingGovernanceToken'),
              ]}
            />
            <InputErrorMessage
              error={
                errors.votingModuleAdapter?.data
                  ?.existingGovernanceTokenAddress ||
                errors.votingModuleAdapter?.data?.existingGovernanceTokenInfo
                  ?._error
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

import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  FormattedJsonDisplay,
  InputErrorMessage,
  TextInput,
} from '@dao-dao/stateless'
import {
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  isValidContractAddress,
  validateContractAddress,
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
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()

  // Fill in default first tier info if tiers not yet edited.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage) return
    setLoadedPage(true)

    setValue('votingModuleAdapter.data.tiers.0.name', t('form.defaultTierName'))
    if (walletAddress) {
      setValue(
        'votingModuleAdapter.data.tiers.0.members.0.address',
        walletAddress
      )
    }
  }, [data.tiers, loadedPage, setValue, t, walletAddress])

  //! Validate tiers.
  // Custom validation function for this page. Called upon attempt to navigate
  // forward.
  const customValidator: CreateDaoCustomValidator = useCallback(
    (setNewErrors) => {
      let valid = true

      const totalWeight =
        data.tiers.reduce(
          (acc, { weight, members }) => acc + weight * members.length,
          0
        ) || 0
      // Ensure voting power has been given to at least one member.
      if (totalWeight === 0) {
        if (setNewErrors) {
          setError('votingModuleAdapter.data._tiersError', {
            message: t('error.noVotingPower'),
          })
        }
        valid = false
      } else if (errors?.votingModuleAdapter?.data?._tiersError) {
        clearErrors('votingModuleAdapter.data._tiersError')
      }

      // Ensure each tier has at least one member.
      data.tiers.forEach((tier, tierIndex) => {
        if (tier.members.length === 0) {
          if (setNewErrors) {
            setError(`votingModuleAdapter.data.tiers.${tierIndex}._error`, {
              message: t('error.noMembers'),
            })
          }
          valid = false
        } else if (
          errors?.votingModuleAdapter?.data?.tiers?.[tierIndex]?._error
        ) {
          clearErrors(`votingModuleAdapter.data.tiers.${tierIndex}._error`)
        }
      })

      return valid
    },
    [
      clearErrors,
      data.tiers,
      errors?.votingModuleAdapter?.data?._tiersError,
      errors?.votingModuleAdapter?.data?.tiers,
      setError,
      t,
    ]
  )
  // Update with function reference as needed.
  useEffect(() => {
    setCustomValidator(customValidator)
  }, [customValidator, setCustomValidator])

  //! Validate existing governance token.
  const existingGovernanceTokenAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceTokenAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(
        existingGovernanceTokenAddress,
        CHAIN_BECH32_PREFIX
      )
      ? Cw721BaseSelectors.contractInfoSelector({
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const numOfTokensLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(
        existingGovernanceTokenAddress,
        CHAIN_BECH32_PREFIX
      )
      ? Cw721BaseSelectors.numTokensSelector({
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

  /*
  useEffect(() => {
    setValue(
      'votingModuleAdapter.data.existingGovernanceTokenInfo.total_supply',
      numOfTokensLoadable.state === 'hasValue'
        ? numOfTokensLoadable.contents?.count?.toString()
        : undefined
    )
  }, [numOfTokensLoadable, setValue])
  */

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex h-14 flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('form.tokenContractAddressTitle')}
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
              placeholder={CHAIN_BECH32_PREFIX + '...'}
              register={register}
              validation={[
                validateContractAddress,
                validateRequired,
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

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state'
import {
  FormattedJsonDisplay,
  InputErrorMessage,
  TextInput,
} from '@dao-dao/stateless'
import {
  DaoCreationGovernanceConfigInputProps,
  TokenType,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  isValidTokenFactoryDenom,
  validateRequired,
  validateTokenFactoryDenom,
} from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export const GovernanceConfigurationInput = ({
  data: { denom },
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

  //! Validate existing governance token.
  const existingGovernanceTokenLoadable = useRecoilValueLoadable(
    denom && isValidTokenFactoryDenom(denom, CHAIN_BECH32_PREFIX)
      ? genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    if (existingGovernanceTokenLoadable.state !== 'hasError') {
      if (errors?.votingModuleAdapter?.data?.denom) {
        clearErrors('votingModuleAdapter.data._tokenError')
      }
      return
    }

    if (!errors?.votingModuleAdapter?.data?._tokenError) {
      setError('votingModuleAdapter.data._tokenError', {
        type: 'manual',
        message: t('error.failedToGetFactoryTokenInfo'),
      })
    }
  }, [
    clearErrors,
    errors?.votingModuleAdapter?.data,
    existingGovernanceTokenLoadable,
    setError,
    setValue,
    t,
  ])

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex h-14 flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('title.factoryToken')}
          </p>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <TextInput
              className="symbol-small-body-text font-mono text-text-secondary"
              error={errors.votingModuleAdapter?.data?.denom}
              fieldName="votingModuleAdapter.data.denom"
              ghost
              placeholder={`factory/${CHAIN_BECH32_PREFIX}.../denom`}
              register={register}
              validation={[
                validateTokenFactoryDenom,
                validateRequired,
                () =>
                  existingGovernanceTokenLoadable.state === 'hasValue' ||
                  t('info.verifyingGovernanceToken'),
              ]}
            />
            <InputErrorMessage
              error={
                errors.votingModuleAdapter?.data?.denom ||
                errors.votingModuleAdapter?.data?._tokenError
              }
            />
          </div>

          <FormattedJsonDisplay
            jsonLoadable={existingGovernanceTokenLoadable}
            title={t('title.tokenInfo')}
          />
        </div>
      </div>
    </>
  )
}

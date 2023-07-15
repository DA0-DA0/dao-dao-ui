import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { makeValidateContractAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../../react'
import { ChooseExistingTokenSwapOptions } from '../types'

// Displayed when entering an existing token swap.
export const ChooseExistingTokenSwap: ActionComponent<
  ChooseExistingTokenSwapOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { chooseLoading, onChooseExistingContract },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">{t('form.tokenSwapExistingInstructions')}</p>

      <div className="space-y-2">
        <InputLabel name={t('form.existingTokenSwapContract')} />

        <AddressInput
          error={errors?.tokenSwapContractAddress}
          fieldName={fieldNamePrefix + 'tokenSwapContractAddress'}
          register={register}
          type="contract"
          validation={[
            validateRequired,
            makeValidateContractAddress(bech32Prefix),
          ]}
        />

        <InputErrorMessage error={errors?.tokenSwapContractAddress} />
      </div>

      <Button
        className="self-end"
        loading={chooseLoading}
        onClick={onChooseExistingContract}
        size="lg"
      >
        {t('button.continue')}
      </Button>
    </div>
  )
}

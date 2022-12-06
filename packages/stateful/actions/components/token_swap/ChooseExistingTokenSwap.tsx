import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ChooseExistingTokenSwapOptions } from './types'

// Displayed when entering an existing token swap.
export const ChooseExistingTokenSwap: ActionComponent<
  ChooseExistingTokenSwapOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { chooseLoading, onChooseExistingContract, Trans },
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">
        <Trans i18nKey="form.tokenSwapExistingInstructions">
          In this step, you will fund a token swap that you (or the
          counterparty) has already initiated. After you fund a swap, you can
          withdraw the tokens you funded unless (or until) the counterparty has
          paid. Likewise, the counterparty can withdraw the tokens they funded
          until you pay.
        </Trans>
      </p>

      <div className="space-y-2">
        <InputLabel name={t('form.existingTokenSwapContract')} />

        <AddressInput
          error={errors?.tokenSwapContractAddress}
          fieldName={fieldNamePrefix + 'tokenSwapContractAddress'}
          iconType="contract"
          register={register}
          validation={[validateRequired, validateContractAddress]}
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

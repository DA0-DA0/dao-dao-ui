import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, NumberInput } from '@dao-dao/stateless'
import { ActionComponent, GenericToken } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'

export interface MintOptions {
  govToken: GenericToken
}

export const MintComponent: ActionComponent<MintOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { govToken },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { register, watch, setValue } = useFormContext()

  return (
    <>
      <NumberInput
        containerClassName="w-full"
        disabled={!isCreating}
        error={errors?.amount}
        fieldName={fieldNamePrefix + 'amount'}
        min={convertMicroDenomToDenomWithDecimals(1, govToken.decimals)}
        register={register}
        setValue={setValue}
        sizing="none"
        step={convertMicroDenomToDenomWithDecimals(1, govToken.decimals)}
        unit={'$' + govToken.symbol}
        validation={[validateRequired, validatePositive]}
        watch={watch}
      />

      {errors?.amount && (
        <div className="-mt-2 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
        </div>
      )}

      <p className="caption-text italic">
        {t('info.tokensWillBeSentToTreasury', {
          type: context.type,
        })}
      </p>
    </>
  )
}

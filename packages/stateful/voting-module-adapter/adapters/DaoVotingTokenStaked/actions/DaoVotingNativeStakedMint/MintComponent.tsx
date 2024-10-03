import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { InputErrorMessage, NumericInput } from '@dao-dao/stateless'
import { ActionComponent, GenericToken } from '@dao-dao/types'
import { validatePositive, validateRequired } from '@dao-dao/utils'

export type MintData = {
  amount: string
}

export type MintOptions = {
  govToken: GenericToken
}

export const MintComponent: ActionComponent<MintOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { govToken },
}) => {
  const { t } = useTranslation()
  const { register, setValue, getValues } = useFormContext<MintData>()

  return (
    <>
      <NumericInput
        containerClassName="w-full"
        disabled={!isCreating}
        error={errors?.amount}
        fieldName={(fieldNamePrefix + 'amount') as 'amount'}
        getValues={getValues}
        min={HugeDecimal.one.toHumanReadableNumber(govToken.decimals)}
        register={register}
        setValue={setValue}
        sizing="none"
        step={HugeDecimal.one.toHumanReadableNumber(govToken.decimals)}
        unit={'$' + govToken.symbol}
        validation={[validateRequired, validatePositive]}
      />

      {errors?.amount && (
        <div className="-mt-2 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
        </div>
      )}

      <p className="caption-text italic">
        {t('info.tokensWillBeSentToTreasury')}
      </p>
    </>
  )
}

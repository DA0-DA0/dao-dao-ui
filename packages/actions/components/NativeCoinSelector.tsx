import { Coin } from '@cosmjs/stargate'
import { XIcon } from '@heroicons/react/solid'
import { ComponentProps, FC, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, NumberInput, SelectInput } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionComponent } from '..'

export interface NativeCoinSelectorProps
  extends ComponentProps<ActionComponent<{ nativeBalances: readonly Coin[] }>> {
  className?: string
}

export const NativeCoinSelector: FC<NativeCoinSelectorProps> = ({
  onRemove,
  fieldNamePrefix,
  errors,
  readOnly,
  options: { nativeBalances },
  className,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch, setError, clearErrors } = useFormContext()

  const watchAmount = watch(fieldNamePrefix + 'amount')
  const watchDenom = watch(fieldNamePrefix + 'denom')

  const validatePossibleSpend = useCallback(
    (id: string, amount: string): string | boolean => {
      const native = nativeBalances.find(({ denom }) => denom === id)
      if (native) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          NATIVE_DECIMALS
        )
        return (
          Number(microAmount) <= Number(native.amount) ||
          t('error.cantSpendMoreThanTreasury', {
            amount: convertMicroDenomToDenomWithDecimals(
              native.amount,
              NATIVE_DECIMALS
            ).toLocaleString(undefined, {
              maximumFractionDigits: NATIVE_DECIMALS,
            }),
            tokenSymbol: nativeTokenLabel(id),
          })
        )
      }
      // If there are no native tokens in the treasury the native balances
      // query will return an empty list.
      if (id === NATIVE_DENOM) {
        return t('error.cantSpendMoreThanTreasury', {
          amount: 0,
          tokenSymbol: nativeTokenLabel(NATIVE_DENOM),
        })
      }
      return 'Unrecognized denom.'
    },
    [nativeBalances, t]
  )

  // Update amount+denom combo error each time either field is updated
  // instead of setting errors individually on each field. Since we only
  // show one or the other and can't detect which error is newer, this
  // would lead to the error not updating if amount set an error and then
  // denom was changed.
  useEffect(() => {
    if (!watchAmount || !watchDenom) {
      clearErrors(fieldNamePrefix + '_error')
      return
    }

    const validation = validatePossibleSpend(watchDenom, watchAmount)
    if (validation === true) {
      clearErrors(fieldNamePrefix + '_error')
    } else if (typeof validation === 'string') {
      setError(fieldNamePrefix + '_error', {
        type: 'custom',
        message: validation,
      })
    }
  }, [
    setError,
    clearErrors,
    validatePossibleSpend,
    fieldNamePrefix,
    watchAmount,
    watchDenom,
  ])

  return (
    <div className={className}>
      <div className="flex flex-row gap-2 items-stretch">
        <NumberInput
          disabled={readOnly}
          error={errors?.amount}
          fieldName={fieldNamePrefix + 'amount'}
          onPlusMinus={[
            () =>
              setValue(
                fieldNamePrefix + 'amount',
                Math.max(Number(watchAmount) + 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
            () =>
              setValue(
                fieldNamePrefix + 'amount',
                Math.max(Number(watchAmount) - 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
          ]}
          register={register}
          sizing="auto"
          step={1 / 10 ** NATIVE_DECIMALS}
          validation={[validateRequired, validatePositive]}
        />

        <SelectInput
          defaultValue={NATIVE_DENOM}
          disabled={readOnly}
          error={errors?.denom}
          fieldName={fieldNamePrefix + 'denom'}
          register={register}
        >
          {nativeBalances.map(({ denom }) => (
            <option key={denom} value={denom}>
              ${nativeTokenLabel(denom)}
            </option>
          ))}
        </SelectInput>

        {!readOnly && (
          <button onClick={onRemove} type="button">
            <XIcon className="w-4 h-4 text-error" />
          </button>
        )}
      </div>

      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?.denom} />
      <InputErrorMessage error={errors?._error} />
    </div>
  )
}

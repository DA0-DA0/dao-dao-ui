import { Coin } from '@cosmjs/stargate'
import { Close } from '@mui/icons-material'
import { ComponentProps, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/tstypes/actions'
import {
  IconButton,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type NativeCoinSelectorProps = ComponentProps<
  ActionComponent<{ nativeBalances: readonly Coin[] }>
> & {
  className?: string
}

export const NativeCoinSelector = ({
  onRemove,
  fieldNamePrefix,
  errors,
  isCreating,
  options: { nativeBalances },
  className,
}: NativeCoinSelectorProps) => {
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
          microAmount <= Number(native.amount) ||
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
      <div className="flex flex-row items-stretch gap-2">
        <NumberInput
          disabled={!isCreating}
          error={errors?.amount}
          fieldName={fieldNamePrefix + 'amount'}
          onMinus={() =>
            setValue(
              fieldNamePrefix + 'amount',
              Math.max(Number(watchAmount) - 1, 1 / 10 ** NATIVE_DECIMALS)
            )
          }
          onPlus={() =>
            setValue(
              fieldNamePrefix + 'amount',
              Math.max(Number(watchAmount) + 1, 1 / 10 ** NATIVE_DECIMALS)
            )
          }
          register={register}
          sizing="auto"
          step={1 / 10 ** NATIVE_DECIMALS}
          validation={[validateRequired, validatePositive]}
        />

        <SelectInput
          defaultValue={NATIVE_DENOM}
          disabled={!isCreating}
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

        {isCreating && (
          <IconButton
            Icon={Close}
            className="self-center"
            onClick={onRemove}
            size="sm"
            variant="ghost"
          />
        )}
      </div>

      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?.denom} />
      <InputErrorMessage error={errors?._error} />
    </div>
  )
}

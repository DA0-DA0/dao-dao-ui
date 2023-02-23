import { Close } from '@mui/icons-material'
import { ComponentProps, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  IconButton,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import { GenericTokenBalance } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
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
  ActionComponent<{ nativeBalances: GenericTokenBalance[] }>
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
      const native = nativeBalances.find(
        ({ token }) => token.denomOrAddress === id
      )
      if (native) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          native.token.decimals
        )
        return (
          microAmount <= Number(native.balance) ||
          t('error.cantSpendMoreThanTreasury', {
            amount: convertMicroDenomToDenomWithDecimals(
              native.balance,
              native.token.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: native.token.decimals,
            }),
            tokenSymbol: native.token.symbol,
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
          min={1 / Math.pow(10, NATIVE_DECIMALS)}
          register={register}
          setValue={setValue}
          sizing="auto"
          step={1 / 10 ** NATIVE_DECIMALS}
          validation={[validateRequired, validatePositive]}
          watch={watch}
        />

        <SelectInput
          defaultValue={NATIVE_DENOM}
          disabled={!isCreating}
          error={errors?.denom}
          fieldName={fieldNamePrefix + 'denom'}
          register={register}
        >
          {nativeBalances.map(({ token: { denomOrAddress, symbol } }) => (
            <option key={denomOrAddress} value={denomOrAddress}>
              ${symbol}
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

import { Coin } from '@cosmjs/stargate'
import { XIcon } from '@heroicons/react/solid'
import { ComponentProps, FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { NumberInput, SelectInput, InputErrorMessage } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  nativeTokenLabel,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  validateRequired,
  validatePositive,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'

export interface NativeCoinSelectorProps
  extends ComponentProps<
    TemplateComponent<{ nativeBalances: readonly Coin[] }>
  > {
  className?: string
}

export const NativeCoinSelector: FC<NativeCoinSelectorProps> = ({
  onRemove,
  getLabel,
  errors,
  readOnly,
  options: { nativeBalances },
  className,
}) => {
  const { register, setValue, watch } = useFormContext()

  const watchAmount = watch(getLabel('amount'))
  const watchDenom = watch(getLabel('denom'))

  const validatePossibleSpend = (
    id: string,
    amount: string
  ): string | boolean => {
    const native = nativeBalances.find(({ denom }) => denom === id)
    if (native) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        native.amount,
        NATIVE_DECIMALS
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      )
      return (
        Number(microAmount) <= Number(native.amount) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount} ${nativeTokenLabel(
          id
        )}).`
      )
    }
    // If there are no native tokens in the treasury the native balances
    // query will return an empty list.
    if (id === NATIVE_DENOM) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${convertDenomToHumanReadableDenom(
        NATIVE_DENOM
      )}).`
    }
    return 'Unrecognized denom.'
  }

  return (
    <div className={className}>
      <div className="flex flex-row gap-2 items-stretch">
        <NumberInput
          disabled={readOnly}
          error={errors?.amount}
          label={getLabel('amount')}
          onPlusMinus={[
            () =>
              setValue(
                getLabel('amount'),
                Math.max(Number(watchAmount) + 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
            () =>
              setValue(
                getLabel('amount'),
                Math.max(Number(watchAmount) - 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
          ]}
          register={register}
          sizing="auto"
          step={1 / 10 ** NATIVE_DECIMALS}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) => validatePossibleSpend(watchDenom, amount),
          ]}
        />

        <SelectInput
          defaultValue={NATIVE_DENOM}
          disabled={readOnly}
          error={errors?.denom}
          label={getLabel('denom')}
          register={register}
          validation={[
            (denom: string) => validatePossibleSpend(denom, watchAmount),
          ]}
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

      <InputErrorMessage error={errors?.amount ?? errors?.denom} />
    </div>
  )
}

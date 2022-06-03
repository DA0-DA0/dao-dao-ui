import { Coin } from '@cosmjs/stargate'
import { XIcon } from '@heroicons/react/outline'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import {
  AddressInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'

interface SpendOptions {
  nativeBalances: readonly Coin[]
  cw20Balances: {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]
}

export const SpendComponent: TemplateComponent<SpendOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { nativeBalances, cw20Balances },
}) => {
  const { register, watch, setValue } = useFormContext()

  const spendAmount = watch(getLabel('amount'))
  const spendDenom = watch(getLabel('denom'))

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
    const cw20 = cw20Balances.find(({ address }) => address === id)
    if (cw20) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        cw20.balance,
        cw20.info.decimals
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        cw20.info.decimals
      )
      return (
        Number(microAmount) <= Number(cw20.balance) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount} $${cw20.info.symbol}).`
      )
    }
    // If there are no native tokens in the treasury the native balances
    // query will return an empty list.
    const nativeHumanReadable = convertDenomToHumanReadableDenom(NATIVE_DENOM)
    if (id === nativeHumanReadable) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${nativeHumanReadable}).`
    }
    return 'Unrecognized denom.'
  }

  const amountDecimals = useMemo(
    () =>
      cw20Balances.find(({ info }) => info.symbol === spendDenom)?.info
        ?.decimals ?? NATIVE_DECIMALS,
    [spendDenom, cw20Balances]
  )

  return (
    <div className="flex justify-between items-center p-3 my-2 bg-primary rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-wrap gap-2 items-center w-24">
          <h2 className="text-3xl">💵</h2>
          <h2>Spend</h2>
        </div>
        <NumberInput
          disabled={readOnly}
          error={errors?.amount}
          label={getLabel('amount')}
          onPlusMinus={[
            () =>
              setValue(
                getLabel('amount'),
                Math.max(
                  Number(spendAmount) + 1,
                  1 / 10 ** amountDecimals
                ).toString()
              ),
            () =>
              setValue(
                getLabel('amount'),
                Math.max(
                  Number(spendAmount) - 1,
                  1 / 10 ** amountDecimals
                ).toString()
              ),
          ]}
          register={register}
          sizing="md"
          step={1 / 10 ** amountDecimals}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) => validatePossibleSpend(spendDenom, amount),
          ]}
        />
        <SelectInput
          defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
          disabled={readOnly}
          error={errors?.denom}
          label={getLabel('denom')}
          register={register}
          validation={[
            (denom: string) => validatePossibleSpend(denom, spendAmount),
          ]}
        >
          {nativeBalances.map(({ denom }) => (
            <option key={denom} value={denom}>
              ${nativeTokenLabel(denom)}
            </option>
          ))}
          {cw20Balances.map(({ address, info: { symbol } }) => (
            <option key={address} value={address}>
              ${symbol}
            </option>
          ))}
        </SelectInput>
        <div className="flex gap-2 items-center">
          <p className="font-mono secondary-text">{'->'}</p>
          <div className="flex flex-col">
            <AddressInput
              disabled={readOnly}
              error={errors?.to}
              label={getLabel('to')}
              register={register}
              validation={[validateRequired, validateAddress]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputErrorMessage error={errors?.amount ?? errors?.denom} />
          <InputErrorMessage error={errors?.to} />
        </div>
      </div>
      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>
  )
}

import { Coin } from '@cosmjs/stargate'
import Emoji from 'a11y-react-emoji'
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
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

interface SpendOptions {
  nativeBalances: readonly Coin[]
  cw20Balances: {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
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
    if (id === NATIVE_DENOM) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${convertDenomToHumanReadableDenom(
        NATIVE_DENOM
      )}).`
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
    <ActionCard
      emoji={<Emoji label="Money" symbol="💵" />}
      onRemove={onRemove}
      title="Spend"
    >
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
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
            sizing="auto"
            step={1 / 10 ** amountDecimals}
            validation={[
              validateRequired,
              validatePositive,
              (amount: string) => validatePossibleSpend(spendDenom, amount),
            ]}
          />

          <SelectInput
            defaultValue={NATIVE_DENOM}
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
        </div>

        <p className="font-mono text-2xl secondary-text">&#10142;</p>

        <div className="grow">
          <AddressInput
            containerClassName="grow"
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
    </ActionCard>
  )
}

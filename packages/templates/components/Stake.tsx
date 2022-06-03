import { Coin } from '@cosmjs/stargate'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import {
  AddressInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  validateValidatorAddress,
  validatePositive,
  validateRequired,
  StakeType,
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

export const stakeActions: { type: StakeType; name: string }[] = [
  {
    type: StakeType.Delegate,
    name: 'Delegate',
  },
  {
    type: StakeType.Undelegate,
    name: 'Undelegate',
  },
  {
    type: StakeType.Redelegate,
    name: 'Redelegate',
  },
  {
    type: StakeType.WithdrawDelegatorReward,
    name: 'Claim Rewards',
  },
]

interface StakeOptions {
  nativeBalances: readonly Coin[]
}

export const StakeComponent: TemplateComponent<StakeOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { nativeBalances },
}) => {
  const { register, watch, clearErrors } = useFormContext()

  const stakeType = watch(getLabel('stakeType'))
  const amount = watch(getLabel('amount'))
  const denom = watch(getLabel('denom'))

  const validatePossibleSpend = (
    denom: string,
    amount: string
  ): string | boolean => {
    const humanReadableDenom =
      convertDenomToHumanReadableDenom(denom).toUpperCase()

    const native = nativeBalances.find((coin) => coin.denom === denom)
    if (native) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        native.amount,
        NATIVE_DECIMALS
      ).toLocaleString()
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      )
      return (
        Number(microAmount) <= Number(native.amount) ||
        `The DAO treasury ${
          Number(native.amount) === 0
            ? 'has no'
            : `only has ${humanReadableAmount}`
        } ${humanReadableDenom}, which is insufficient.`
      )
    }

    // If there are no native tokens in the treasury the native balances
    // query will return an empty list, so check explicitly if the
    // native currency is selected.
    if (denom === NATIVE_DENOM) {
      return `The DAO treasury has no ${humanReadableDenom}, so you can't stake any tokens.`
    }

    return 'Unrecognized denom.'
  }

  // The amount and denom fields are dependent on each other for validation. If
  // one has a valid validation result, the other one as well. This wrapper ensures
  // that react-hook-form is informed as such.
  const validatePossibleSpendWrapper = (denom: string, amount: string) => {
    const valid = validatePossibleSpend(denom, amount)
    if (typeof valid === 'boolean' && valid) {
      clearErrors([getLabel('denom'), getLabel('amount')])
    }
    return valid
  }

  return (
    <div className="p-3 my-2 rounded-lg bg-primary">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap gap-2 items-center w-24">
          <h2 className="text-3xl">📤</h2>
          <h2>Stake</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <SelectInput
          defaultValue={stakeActions[0].type}
          disabled={readOnly}
          error={errors?.stakeType}
          label={getLabel('stakeType')}
          register={register}
        >
          {stakeActions.map(({ name, type }, idx) => (
            <option key={idx} value={type}>
              {name}
            </option>
          ))}
        </SelectInput>

        {stakeType !== StakeType.WithdrawDelegatorReward && (
          <>
            <NumberInput
              disabled={readOnly}
              error={errors?.amount}
              label={getLabel('amount')}
              register={register}
              step={1 / 10 ** NATIVE_DECIMALS}
              validation={[
                validateRequired,
                validatePositive,
                (amount: string) => validatePossibleSpendWrapper(denom, amount),
              ]}
            />

            <SelectInput
              disabled={readOnly}
              error={errors?.denom}
              label={getLabel('denom')}
              register={register}
              validation={[
                (denom: string) => validatePossibleSpendWrapper(denom, amount),
              ]}
            >
              {nativeBalances.length !== 0 ? (
                nativeBalances.map(({ denom }) => (
                  <option key={denom} value={denom}>
                    ${nativeTokenLabel(denom)}
                  </option>
                ))
              ) : (
                <option key="native-filler" value={NATIVE_DENOM}>
                  ${nativeTokenLabel(NATIVE_DENOM)}
                </option>
              )}
            </SelectInput>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <InputErrorMessage error={errors?.denom} />
      </div>

      {stakeType === StakeType.Redelegate && (
        <>
          <h3 className="mt-4 mb-1">From Validator</h3>
          <div className="form-control">
            <AddressInput
              disabled={readOnly}
              error={errors?.fromValidator}
              label={getLabel('fromValidator')}
              register={register}
              validation={[validateValidatorAddress]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InputErrorMessage error={errors?.fromValidator} />
          </div>
        </>
      )}

      <h3 className="mt-4 mb-1">
        {stakeType === StakeType.Redelegate ? 'To Validator' : 'Validator'}
      </h3>
      <div className="form-control">
        <AddressInput
          disabled={readOnly}
          error={errors?.validator}
          label={getLabel('validator')}
          register={register}
          validation={[validateRequired, validateValidatorAddress]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <InputErrorMessage error={errors?.validator} />
      </div>

      <div className="flex gap-2 items-center p-2 mt-3 rounded-lg bg-disabled">
        <InformationCircleIcon className="h-4" />
        <p className="body-text">
          This template is new and in beta. Double check the generated JSON
          before executing.
        </p>
      </div>
    </div>
  )
}

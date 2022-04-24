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
  makeStakingMessage,
  makeDistributeMessage,
  StakeType,
} from '@dao-dao/utils'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

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

export interface StakeData {
  stakeType: StakeType
  validator: string
  fromValidator?: string
  amount: number
  denom: string
}

export const stakeDefaults = (): StakeData => {
  const denom = convertDenomToHumanReadableDenom(
    process.env.NEXT_PUBLIC_FEE_DENOM as string
  )

  return {
    stakeType: stakeActions[0].type,
    validator: '',
    amount: 1,
    denom,
  }
}

interface StakeOptions {
  nativeBalances: {
    denom: string
    balance: number
  }[]
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
    const native = nativeBalances.find((coin) => coin.denom === denom)
    if (native) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        native.balance,
        NATIVE_DECIMALS
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      )
      return (
        Number(microAmount) <= Number(native.balance) ||
        `Can't stake more tokens than are in the DAO treasury (${humanReadableAmount}).`
      )
    }
    // If there are no native tokens in the treasury the native balances
    // query will return an empty list.
    const nativeHumanReadable = convertDenomToHumanReadableDenom(NATIVE_DENOM)
    if (denom === nativeHumanReadable) {
      return `Can't stake more tokens than are in the DAO treasury (0 ${nativeHumanReadable}).`
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
    <div className="p-3 my-2 bg-primary rounded-lg">
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
              step={0.000001}
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

      <div className="flex gap-2 items-center p-2 mt-3 bg-disabled rounded-lg">
        <InformationCircleIcon className="h-4" />
        <p className="body-text">
          This template is new and in beta. Double check the generated JSON
          before executing.
        </p>
      </div>
    </div>
  )
}

export const transformStakeToCosmos = (data: StakeData) => {
  if (data.stakeType === StakeType.WithdrawDelegatorReward) {
    return makeDistributeMessage(data.validator)
  }

  // NOTE: Does not support TOKEN staking at this point, however it could be implemented here!
  const decimals = nativeTokenDecimals(data.denom)!
  const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
  return makeStakingMessage(
    data.stakeType,
    amount,
    data.denom,
    data.validator,
    data.fromValidator
  )
}

export const transformCosmosToStake = (
  msg: Record<string, any>
): StakeData | null => {
  const denom = convertDenomToHumanReadableDenom(
    process.env.NEXT_PUBLIC_FEE_DENOM as string
  )

  if (
    'distribution' in msg &&
    StakeType.WithdrawDelegatorReward in msg.distribution &&
    'validator' in msg.distribution.withdraw_delegator_reward
  ) {
    return {
      stakeType: StakeType.WithdrawDelegatorReward,
      validator: msg.distribution.withdraw_delegator_reward.validator,
      // Default values, not needed for displaying this type of message.
      amount: 1,
      denom,
    }
  } else if ('staking' in msg) {
    const stakeType = stakeActions
      .map(({ type }) => type)
      .find((type) => type in msg.staking)
    if (!stakeType) return null

    const data = msg.staking[stakeType]
    if (
      ((stakeType === StakeType.Redelegate &&
        'src_validator' in data &&
        'dst_validator' in data) ||
        (stakeType !== StakeType.Redelegate && 'validator' in data)) &&
      'amount' in data &&
      'amount' in data.amount &&
      'denom' in data.amount
    ) {
      const { denom } = data.amount

      return {
        stakeType,
        validator:
          stakeType === StakeType.Redelegate
            ? data.dst_validator
            : data.validator,
        fromValidator:
          stakeType === StakeType.Redelegate ? data.src_validator : undefined,
        amount: convertMicroDenomToDenomWithDecimals(
          data.amount.amount,
          nativeTokenDecimals(denom)!
        ),
        denom,
      }
    }
  }

  return null
}

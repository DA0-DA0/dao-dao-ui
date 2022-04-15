import { useRecoilValue } from 'recoil'

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

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { SelectInput } from '@components/input/SelectInput'
import { nativeBalance as nativeBalanceSelector } from 'selectors/treasury'
import { Config } from 'util/contractConfigWrapper'
import {
  validateValidatorAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeStakingMessage, makeDistributeMessage } from 'util/messagehelpers'

import { TemplateComponent, ToCosmosMsgProps } from './templateList'

export const stakeActions = [
  {
    type: 'delegate',
    name: 'Delegate',
  },
  {
    type: 'undelegate',
    name: 'Undelegate',
  },
  {
    type: 'redelegate',
    name: 'Redelegate',
  },
  {
    type: 'withdraw_delegator_reward',
    name: 'Claim Rewards',
  },
]

export interface StakeData {
  stakeType: string
  validator: string
  fromValidator?: string
  amount: number
  denom: string
}

export const stakeDefaults = (
  _walletAddress: string,
  _contractConfig: Config
): StakeData => {
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

export const StakeComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, watch, clearErrors } = useFormContext()

  let nativeBalances = useRecoilValue(nativeBalanceSelector(contractAddress))
  const stakeType = watch(getLabel('stakeType'))
  const amount = watch(getLabel('amount'))
  const denom = watch(getLabel('denom'))

  const validatePossibleSpend = (
    denom: string,
    amount: string
  ): string | boolean => {
    const native = nativeBalances.find((coin) => coin.denom == denom)
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
        `Can't stake more tokens than are in the DAO treasury (${humanReadableAmount}).`
      )
    }
    // If there are no native tokens in the treasury the native balances query
    // will return an empty list.
    const nativeHumanReadable = convertDenomToHumanReadableDenom(NATIVE_DENOM)

    if (denom === nativeHumanReadable) {
      return `Can't stake more tokens than are in the DAO treasury (0 ${nativeHumanReadable})`
    }
    return 'Unrecognized denom.'
  }

  // The amount and denom fields are dependent on eachother for validation. If
  // one has a valid validation result, the other one as well. This wrapper ensures
  // that react-hook-form is informed as such.
  const validatePossibleSpendWrapper = (denom: string, amount: string) => {
    const valid = validatePossibleSpend(denom, amount)
    if (typeof valid == 'boolean' && valid) {
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

        {stakeType != 'withdraw_delegator_reward' && (
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
                nativeBalances.map(({ denom }, idx) => (
                  <option key={idx} value={denom}>
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

      {stakeType == 'redelegate' && (
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
        {stakeType == 'redelegate' ? 'To Validator' : 'Validator'}
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

export const transformStakeToCosmos = (
  self: StakeData,
  _props: ToCosmosMsgProps
) => {
  if (self.stakeType === 'withdraw_delegator_reward') {
    return makeDistributeMessage(self.validator)
  }

  // NOTE: Does not support TOKEN staking at this point, however it could be implemented here!
  const decimals = nativeTokenDecimals(self.denom)!
  const amount = convertDenomToMicroDenomWithDecimals(self.amount, decimals)
  return makeStakingMessage(
    self.stakeType,
    amount,
    self.denom,
    self.validator,
    self.fromValidator
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
    'withdraw_delegator_reward' in msg.distribution &&
    'validator' in msg.distribution.withdraw_delegator_reward
  ) {
    return {
      stakeType: 'withdraw_delegator_reward',
      validator: msg.distribution.withdraw_delegator_reward.validator,
      // Default values, not needed for displaying this type of message.
      amount: 1,
      denom,
    }
  } else if ('staking' in msg) {
    const stakingType = stakeActions
      .map(({ type }) => type)
      .find((type) => type in msg.staking)
    if (!stakingType) return null

    const data = msg.staking[stakingType]
    if (
      ((stakingType === 'redelegate' &&
        'src_validator' in data &&
        'dst_validator' in data) ||
        (stakingType !== 'redelegate' && 'validator' in data)) &&
      'amount' in data &&
      'amount' in data.amount &&
      'denom' in data.amount
    ) {
      const { denom } = data.amount

      return {
        stakeType: stakingType,
        validator:
          stakingType === 'redelegate' ? data.dst_validator : data.validator,
        fromValidator:
          stakingType === 'redelegate' ? data.src_validator : undefined,
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

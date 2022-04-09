import { useRecoilValue } from 'recoil'

import { NATIVE_DECIMALS, NATIVE_DENOM } from 'util/constants'
import { Config } from 'util/contractConfigWrapper'
import {
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
} from 'util/conversion'
import {
  validateValidatorAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeStakingMessage, makeDistributeMessage } from 'util/messagehelpers'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { SelectInput } from '@components/input/SelectInput'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'
import { nativeBalance as nativeBalanceSelector } from 'selectors/treasury'

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
        `Can't stake more tokens than are in the DAO tresury (${humanReadableAmount}).`
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
    <div className="bg-primary p-3 rounded-lg my-2">
      <div className="flex justify-between w-full">
        <div className="flex items-center flex-wrap gap-2 w-24">
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
          label={getLabel('stakeType')}
          register={register}
          error={errors?.stakeType}
          defaultValue={stakeActions[0].type}
          disabled={readOnly}
        >
          {stakeActions.map(({ name, type }, idx) => (
            <option value={type} key={idx}>
              {name}
            </option>
          ))}
        </SelectInput>

        {stakeType != 'withdraw_delegator_reward' && (
          <>
            <NumberInput
              label={getLabel('amount')}
              register={register}
              error={errors?.amount}
              validation={[
                validateRequired,
                validatePositive,
                (amount: string) => validatePossibleSpendWrapper(denom, amount),
              ]}
              step={0.000001}
              disabled={readOnly}
            />

            <SelectInput
              label={getLabel('denom')}
              register={register}
              error={errors?.denom}
              validation={[
                (denom: string) => validatePossibleSpendWrapper(denom, amount),
              ]}
              disabled={readOnly}
            >
              {nativeBalances.length !== 0 ? (
                nativeBalances.map(({ denom }, idx) => (
                  <option value={denom} key={idx}>
                    ${nativeTokenLabel(denom)}
                  </option>
                ))
              ) : (
                <option value={NATIVE_DENOM} key="native-filler">
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
          <h3 className="mb-1 mt-4">From Validator</h3>
          <div className="form-control">
            <AddressInput
              label={getLabel('fromValidator')}
              register={register}
              error={errors?.fromValidator}
              validation={[validateValidatorAddress]}
              disabled={readOnly}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InputErrorMessage error={errors?.fromValidator} />
          </div>
        </>
      )}

      <h3 className="mb-1 mt-4">
        {stakeType == 'redelegate' ? 'To Validator' : 'Validator'}
      </h3>
      <div className="form-control">
        <AddressInput
          label={getLabel('validator')}
          register={register}
          error={errors?.validator}
          validation={[validateRequired, validateValidatorAddress]}
          disabled={readOnly}
        />
      </div>

      <div className="flex flex-col gap-2">
        <InputErrorMessage error={errors?.validator} />
      </div>

      <div className="p-2 rounded-lg mt-3 flex items-center gap-2 bg-disabled">
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

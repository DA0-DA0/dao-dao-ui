import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { SelectInput } from '@components/input/SelectInput'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useRecoilValue, waitForAll } from 'recoil'
import { NATIVE_DECIMALS, NATIVE_DENOM } from 'util/constants'
import { Config } from 'util/contractConfigWrapper'
import { nativeBalance as nativeBalanceSelector } from 'selectors/treasury'
import {
  convertDenomToContractReadableDenom,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from 'util/conversion'
import {
  validateValidatorAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeStakingMessage, makeDistributeMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

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
  walletAddress: string,
  _contractConfig: Config
) => {
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

export const StakeComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
}: {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  multisig?: boolean
}) => {
  const { register, watch, clearErrors } = useFormContext()

  const nativeBalances = useRecoilValue(nativeBalanceSelector(contractAddress))
  const stakeType = watch(getLabel('stakeType'))
  const validator = watch(getLabel('validator'))
  const fromValidator = watch(getLabel('fromValidator'))
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
    <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
      <div className="flex-col items-center gap-4 flex-wrap w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
            <h2 className="text-4xl mr-2">📤</h2>
            <h2>Stake</h2>
          </div>
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        </div>

        <div className="flex gap-4 mt-4">
          <SelectInput
            label={getLabel('stakeType') as never}
            register={register}
            error={errors.stakeType}
            defaultValue={stakeActions[0].type}
            border={false}
          >
            {stakeActions.map(({ name, type }, idx) => {
              return (
                <option value={type} key={idx}>
                  {name}
                </option>
              )
            })}
          </SelectInput>

          {stakeType != 'withdraw_delegator_reward' && (
            <>
              <NumberInput
                label={getLabel('amount') as never}
                register={register}
                error={errors.amount}
                validation={[
                  validateRequired,
                  validatePositive,
                  (amount: string) =>
                    validatePossibleSpendWrapper(denom, amount),
                ]}
                step={0.000001}
                border={false}
              />

              <SelectInput
                label={getLabel('denom') as never}
                register={register}
                error={errors.denom}
                // defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
                validation={[
                  (denom: string) =>
                    validatePossibleSpendWrapper(denom, amount),
                ]}
                border={false}
              >
                {nativeBalances.map(({ denom }, idx) => {
                  return (
                    <option value={denom} key={idx}>
                      ${nativeTokenLabel(denom)}
                    </option>
                  )
                })}
              </SelectInput>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {/* <InputErrorMessage error={errors.amount} /> */}
          <InputErrorMessage error={errors.denom} />
        </div>

        {stakeType == 'redelegate' && (
          <>
            <h3 className="mb-1 mt-4">From Validator</h3>
            <div className="form-control">
              <AddressInput
                label={getLabel('fromValidator') as never}
                register={register}
                error={errors.fromValidator}
                validation={[validateValidatorAddress]}
                border={false}
              />
            </div>

            <div className="flex flex-col gap-2">
              <InputErrorMessage error={errors.fromValidator} />
            </div>
          </>
        )}

        <h3 className="mb-1 mt-4">
          {stakeType == 'redelegate' ? 'To Validator' : 'Validator'}
        </h3>
        <div className="form-control">
          <AddressInput
            label={getLabel('validator') as never}
            register={register}
            error={errors.validator}
            validation={[validateRequired, validateValidatorAddress]}
            border={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <InputErrorMessage error={errors.validator} />
        </div>
      </div>
    </div>
  )
}

export const transformStakeToCosmos = (
  self: StakeData,
  props: ToCosmosMsgProps
) => {
  if (self.stakeType === 'withdraw_delegator_reward') {
    return makeDistributeMessage(self.validator)
  }

  // NOTE: Does not support TOKEN staking at this point, hwoever it could be implemented here!
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

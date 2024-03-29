import clsx from 'clsx'
import { ComponentType, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  TokenAmountDisplay,
  ValidatorPicker,
  useChainContext,
} from '@dao-dao/stateless'
import { AddressInputProps, TokenStake, Validator } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  StakingActionType,
  convertMicroDenomToDenomWithDecimals,
  isValidValidatorAddress,
  makeValidateAddress,
  makeValidateValidatorAddress,
  secondsToWdhms,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export const useStakeActions = (): {
  type: StakingActionType
  name: string
}[] => {
  const { t } = useTranslation()

  return [
    {
      type: StakingActionType.Delegate,
      name: t('title.stake'),
    },
    {
      type: StakingActionType.Undelegate,
      name: t('title.unstake'),
    },
    {
      type: StakingActionType.Redelegate,
      name: t('title.restake'),
    },
    {
      type: StakingActionType.WithdrawDelegatorReward,
      name: t('title.claimRewards'),
    },
    {
      type: StakingActionType.SetWithdrawAddress,
      name: t('title.setWithdrawAddress'),
    },
  ]
}

export interface ManageStakingOptions {
  nativeBalance: string
  stakes: TokenStake[]
  validators: Validator[]
  executed: boolean
  claimedRewards?: number
  nativeUnstakingDurationSeconds: number
  AddressInput: ComponentType<AddressInputProps<ManageStakingData>>
}

export interface ManageStakingData {
  chainId: string
  type: StakingActionType
  validator: string
  // For use when redelegating.
  toValidator: string
  // For use when setting withdraw address.
  withdrawAddress: string
  amount: number

  _error?: string
}

export const ManageStakingComponent: ActionComponent<
  ManageStakingOptions,
  ManageStakingData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    nativeBalance,
    stakes,
    validators,
    executed,
    claimedRewards,
    nativeUnstakingDurationSeconds,
    AddressInput,
  },
}) => {
  const { t } = useTranslation()

  const { register, watch, setError, clearErrors, setValue } =
    useFormContext<ManageStakingData>()
  const stakeActions = useStakeActions()

  const stakedValidatorAddresses = new Set(
    stakes.map((s) => s.validator.address)
  )

  const type = watch((fieldNamePrefix + 'type') as 'type')
  const validator = watch((fieldNamePrefix + 'validator') as 'validator')
  // For use when redelegating.
  const toValidator = watch((fieldNamePrefix + 'toValidator') as 'toValidator')
  const amount = watch((fieldNamePrefix + 'amount') as 'amount')

  const {
    chain: { bech32_prefix: bech32Prefix },
    nativeToken,
  } = useChainContext()

  if (!nativeToken) {
    throw new Error(t('error.missingNativeToken'))
  }

  // Metadata for the given denom.
  const minAmount = convertMicroDenomToDenomWithDecimals(
    1,
    nativeToken.decimals
  )

  // Get how much is staked and pending for the selected validator.
  const sourceValidatorStaked =
    (isValidValidatorAddress(validator, bech32Prefix) &&
      stakes.find(({ validator: { address } }) => address === validator)
        ?.amount) ||
    0
  const sourceValidatorPendingRewards =
    (isValidValidatorAddress(validator, bech32Prefix) &&
      stakes.find(({ validator: { address } }) => address === validator)
        ?.rewards) ||
    0

  // If staking, maxAmount is denom treasury balance. Otherwise (for
  // undelegating and redelegating), maxAmount is the staked amount for the
  // source validator.
  const maxAmount =
    type === StakingActionType.Delegate
      ? convertMicroDenomToDenomWithDecimals(
          nativeBalance,
          nativeToken.decimals
        )
      : sourceValidatorStaked

  // Manually validate based on context.
  const validate = useCallback((): string | boolean => {
    // No validation for setting withdraw address.
    if (type === StakingActionType.SetWithdrawAddress) {
      return true
    }

    if (!validator) {
      return t('error.noValidatorFound')
    }

    // Validate validator address.
    const validateValidator =
      makeValidateValidatorAddress(bech32Prefix)(validator)
    if (typeof validateValidator === 'string') {
      return validateValidator
    }

    // No further validation for claiming rewards.
    if (type === StakingActionType.WithdrawDelegatorReward) {
      return true
    }

    const humanReadableAmount = maxAmount.toLocaleString(undefined, {
      maximumFractionDigits: 6,
    })

    // Logic for delegating.
    if (type === StakingActionType.Delegate) {
      return (
        Number(amount) <= maxAmount ||
        (maxAmount === 0
          ? t('error.treasuryNoTokensCannotStake', {
              tokenSymbol: nativeToken.symbol,
            })
          : t('error.treasuryInsufficient', {
              amount: humanReadableAmount,
              tokenSymbol: nativeToken.symbol,
            }))
      )
    }
    // Logic for undelegating.
    else if (type === StakingActionType.Undelegate) {
      return (
        Number(amount) <= sourceValidatorStaked ||
        (sourceValidatorStaked === 0
          ? t('error.nothingStaked')
          : t('error.stakeInsufficient', {
              amount: humanReadableAmount,
              tokenSymbol: nativeToken.symbol,
            }))
      )
    }
    // Logic for redelegating.
    else if (type === StakingActionType.Redelegate) {
      // Validate toValidator address.
      if (!toValidator) {
        return t('error.noValidatorFound')
      }
      const validateToValidator =
        makeValidateValidatorAddress(bech32Prefix)(toValidator)
      if (typeof validateToValidator === 'string') {
        return validateToValidator
      }

      return (
        Number(amount) <= sourceValidatorStaked ||
        (sourceValidatorStaked === 0
          ? t('error.nothingStaked')
          : t('error.stakeInsufficient', {
              amount: humanReadableAmount,
              tokenSymbol: nativeToken.symbol,
            }))
      )
    }

    return t('error.unexpectedError')
  }, [
    validator,
    bech32Prefix,
    type,
    maxAmount,
    t,
    amount,
    nativeToken.symbol,
    sourceValidatorStaked,
    toValidator,
  ])

  // Perform validation.
  useEffect(() => {
    if (!amount) {
      clearErrors((fieldNamePrefix + '_error') as '_error')
      return
    }

    const validation = validate()
    if (validation === true) {
      clearErrors((fieldNamePrefix + '_error') as '_error')
    } else if (typeof validation === 'string') {
      setError((fieldNamePrefix + '_error') as '_error', {
        type: 'custom',
        message: validation,
      })
    }
  }, [setError, clearErrors, validate, fieldNamePrefix, amount])

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 xs:flex-row">
          {/* Choose type of stake operation. */}
          <SelectInput
            containerClassName={clsx(
              'shrink-0',
              type === StakingActionType.SetWithdrawAddress && 'grow'
            )}
            defaultValue={stakeActions[0].type}
            disabled={!isCreating}
            error={errors?.type}
            fieldName={(fieldNamePrefix + 'type') as 'type'}
            onChange={(value) => {
              // If setting to non-delegate stake type and currently set
              // validator is not one we are staked to, set back to first staked
              // validator in list.
              if (
                value !== StakingActionType.Delegate &&
                !stakedValidatorAddresses.has(validator)
              ) {
                setValue(
                  (fieldNamePrefix + 'validator') as 'validator',
                  stakes.length > 0 ? stakes[0].validator.address : ''
                )
              }
            }}
            register={register}
          >
            {stakeActions.map(({ name, type }, idx) => (
              <option key={idx} value={type}>
                {name}
              </option>
            ))}
          </SelectInput>

          {type !== StakingActionType.SetWithdrawAddress && (
            // Choose source validator.
            <ValidatorPicker
              displayClassName="grow min-w-0"
              onSelect={({ address }) =>
                setValue(
                  (fieldNamePrefix + 'validator') as 'validator',
                  address
                )
              }
              readOnly={!isCreating}
              selectedAddress={validator}
              stakes={stakes}
              token={nativeToken}
              validators={
                type === StakingActionType.Delegate
                  ? validators
                  : // If not delegating, source validator must be one we are staked with.
                    stakes.map(({ validator }) => validator)
              }
            />
          )}
        </div>

        {/* If not withdrawing reward or updating withdraw address, show amount input. */}
        {type !== StakingActionType.WithdrawDelegatorReward &&
          type !== StakingActionType.SetWithdrawAddress && (
            <NumberInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.amount}
              fieldName={(fieldNamePrefix + 'amount') as 'amount'}
              max={maxAmount}
              min={minAmount}
              register={register}
              setValue={setValue}
              step={minAmount}
              unit={'$' + nativeToken.symbol}
              validation={[validateRequired, validatePositive]}
              watch={watch}
            />
          )}
      </div>

      {type === StakingActionType.SetWithdrawAddress && (
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.withdrawAddress')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.withdrawAddress}
            fieldName={
              (fieldNamePrefix + 'withdrawAddress') as 'withdrawAddress'
            }
            register={register}
            validation={[makeValidateAddress(bech32Prefix)]}
          />
          <InputErrorMessage error={errors?.withdrawAddress} />
        </div>
      )}

      {type !== StakingActionType.SetWithdrawAddress &&
        (type !== StakingActionType.WithdrawDelegatorReward ||
          // If claiming rewards, show pending rewards if not executed, and
          // claimed rewards if executed.
          (executed && !!claimedRewards) ||
          (!executed && sourceValidatorPendingRewards > 0)) &&
        // Only show balance when delegating if creating.
        (type !== StakingActionType.Delegate || isCreating) && (
          <div className="flex flex-row items-center gap-2">
            <p className="secondary-text font-semibold">
              {type === StakingActionType.Delegate
                ? t('title.balance')
                : type === StakingActionType.WithdrawDelegatorReward
                ? executed
                  ? t('info.claimedRewards')
                  : t('info.pendingRewards')
                : // type === StakingActionType.Undelegate || type === StakingActionType.Redelegate
                  t('title.staked')}
              :
            </p>

            <TokenAmountDisplay
              amount={
                type === StakingActionType.WithdrawDelegatorReward
                  ? executed
                    ? claimedRewards ?? 0
                    : sourceValidatorPendingRewards
                  : maxAmount
              }
              decimals={nativeToken.decimals}
              iconUrl={nativeToken.imageUrl}
              showFullAmount
              symbol={nativeToken.symbol}
            />
          </div>
        )}

      {type === StakingActionType.Undelegate && isCreating && (
        <p className="caption-text">
          {nativeUnstakingDurationSeconds
            ? t('info.unstakingDurationExplanation', {
                duration: secondsToWdhms(nativeUnstakingDurationSeconds),
              })
            : t('info.unstakingDurationNoneExplanation')}
        </p>
      )}

      {/* If redelegating, show selection for destination validator. */}
      {type === StakingActionType.Redelegate && (
        <div className="flex flex-col items-start gap-1">
          <InputLabel name={t('form.toValidator')} />
          <ValidatorPicker
            onSelect={({ address }) =>
              setValue(
                (fieldNamePrefix + 'toValidator') as 'toValidator',
                address
              )
            }
            readOnly={!isCreating}
            selectedAddress={toValidator}
            stakes={stakes}
            token={nativeToken}
            validators={validators}
          />
        </div>
      )}

      {(errors?.denom || errors?.amount || errors?._error) && (
        <div className="-mt-2 flex flex-col gap-1">
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?._error} />
        </div>
      )}
    </>
  )
}

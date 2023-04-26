import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  TokenAmountDisplay,
  ValidatorPicker,
} from '@dao-dao/stateless'
import { TokenStake, Validator } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  StakeType,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  isValidValidatorAddress,
  makeValidateValidatorAddress,
  secondsToWdhms,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export const useStakeActions = (): { type: StakeType; name: string }[] => {
  const { t } = useTranslation()

  return [
    {
      type: StakeType.Delegate,
      name: t('title.stake'),
    },
    {
      type: StakeType.Undelegate,
      name: t('title.unstake'),
    },
    {
      type: StakeType.Redelegate,
      name: t('title.restake'),
    },
    {
      type: StakeType.WithdrawDelegatorReward,
      name: t('title.claimRewards'),
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
}

export interface ManageStakingData {
  // TODO(polytone)
  chainId: string

  stakeType: StakeType
  validator: string
  // For use when redelegating.
  toValidator: string
  amount: number
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
  },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix, chain_id: chainId },
  } = useActionOptions()
  const nativeToken = getNativeTokenForChainId(chainId)

  const { register, watch, setError, clearErrors, setValue } = useFormContext()
  const stakeActions = useStakeActions()

  const stakedValidatorAddresses = new Set(
    stakes.map((s) => s.validator.address)
  )

  const stakeType = watch(fieldNamePrefix + 'stakeType')
  const validator = watch(fieldNamePrefix + 'validator')
  // For use when redelegating.
  const toValidator = watch(fieldNamePrefix + 'toValidator')
  const amount = watch(fieldNamePrefix + 'amount')

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
    stakeType === StakeType.Delegate
      ? convertMicroDenomToDenomWithDecimals(
          nativeBalance,
          nativeToken.decimals
        )
      : sourceValidatorStaked

  // Manually validate based on context.
  const validate = useCallback((): string | boolean => {
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
    if (stakeType === StakeType.WithdrawDelegatorReward) {
      return true
    }

    const humanReadableAmount = maxAmount.toLocaleString(undefined, {
      maximumFractionDigits: 6,
    })

    // Logic for delegating.
    if (stakeType === StakeType.Delegate) {
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
    else if (stakeType === StakeType.Undelegate) {
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
    else if (stakeType === StakeType.Redelegate) {
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
    stakeType,
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
      clearErrors(fieldNamePrefix + '_error')
      return
    }

    const validation = validate()
    if (validation === true) {
      clearErrors(fieldNamePrefix + '_error')
    } else if (typeof validation === 'string') {
      setError(fieldNamePrefix + '_error', {
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
            containerClassName="shrink-0"
            defaultValue={stakeActions[0].type}
            disabled={!isCreating}
            error={errors?.stakeType}
            fieldName={fieldNamePrefix + 'stakeType'}
            onChange={(value) => {
              // If setting to non-delegate stake type and currently set
              // validator is not one we are staked to, set back to first staked
              // validator in list.
              if (
                value !== StakeType.Delegate &&
                !stakedValidatorAddresses.has(validator)
              ) {
                setValue(
                  fieldNamePrefix + 'validator',
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

          {/* Choose source validator. */}
          <ValidatorPicker
            displayClassName="grow min-w-0"
            onSelect={({ address }) =>
              setValue(fieldNamePrefix + 'validator', address)
            }
            readOnly={!isCreating}
            selectedAddress={validator}
            stakes={stakes}
            token={nativeToken}
            validators={
              stakeType === StakeType.Delegate
                ? validators
                : // If not delegating, source validator must be one we are staked with.
                  stakes.map(({ validator }) => validator)
            }
          />
        </div>

        {/* If not claiming (i.e. withdrawing reward), show amount input. */}
        {stakeType !== StakeType.WithdrawDelegatorReward && (
          <NumberInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.amount}
            fieldName={fieldNamePrefix + 'amount'}
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

      {(stakeType !== StakeType.WithdrawDelegatorReward ||
        // If claiming rewards, show pending rewards if not executed, and
        // claimed rewards if executed.
        (executed && !!claimedRewards) ||
        (!executed && sourceValidatorPendingRewards > 0)) && (
        <div className="flex flex-row items-center gap-2">
          <p className="secondary-text font-semibold">
            {stakeType === StakeType.Delegate
              ? t('title.balance')
              : stakeType === StakeType.WithdrawDelegatorReward
              ? executed
                ? t('info.claimedRewards')
                : t('info.pendingRewards')
              : // stakeType === StakeType.Undelegate || stakeType === StakeType.Redelegate
                t('title.staked')}
            :
          </p>

          <TokenAmountDisplay
            amount={
              stakeType === StakeType.WithdrawDelegatorReward
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

      {stakeType === StakeType.Undelegate && isCreating && (
        <p className="caption-text">
          {nativeUnstakingDurationSeconds
            ? t('info.unstakingDurationExplanation', {
                duration: secondsToWdhms(nativeUnstakingDurationSeconds),
              })
            : t('info.unstakingDurationNoneExplanation')}
        </p>
      )}

      {/* If redelegating, show selection for destination validator. */}
      {stakeType === StakeType.Redelegate && (
        <div className="flex flex-col items-start gap-1">
          <InputLabel name={t('form.toValidator')} />
          <ValidatorPicker
            onSelect={({ address }) =>
              setValue(fieldNamePrefix + 'toValidator', address)
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

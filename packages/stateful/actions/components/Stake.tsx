import { Coin } from '@cosmjs/stargate'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DepositEmoji,
  InputErrorMessage,
  NumberInput,
  SelectInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import { TokenStake, Validator } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  StakeType,
  convertMicroDenomToDenomWithDecimals,
  isValidValidatorAddress,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
  validatePositive,
  validateRequired,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'
import { ValidatorPicker } from './ValidatorPicker'

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

export interface StakeOptions {
  nativeBalances: readonly Coin[]
  stakes: TokenStake[]
  validators: Validator[]
}

export interface StakeData {
  stakeType: StakeType
  validator: string
  // For use when redelegating.
  toValidator: string
  amount: number
  denom: string
}

export const StakeComponent: ActionComponent<StakeOptions, StakeData> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { nativeBalances, stakes, validators },
}) => {
  const { t } = useTranslation()
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
  const denom = watch(fieldNamePrefix + 'denom')

  // Metadata for the given denom.
  const denomDecimals = nativeTokenDecimals(denom) ?? NATIVE_DECIMALS
  const minAmount = 1 / Math.pow(10, NATIVE_DECIMALS)

  // Get how much is staked for the selected validator.
  const sourceValidatorStaked =
    (isValidValidatorAddress(validator, CHAIN_BECH32_PREFIX) &&
      stakes.find(({ validator: { address } }) => address === validator)
        ?.amount) ||
    0

  // If staking, maxAmount is denom treasury balance. Otherwise (for
  // undelegating and redelegating), maxAmount is the staked amount for the
  // source validator.
  const maxAmount =
    stakeType === StakeType.Delegate
      ? convertMicroDenomToDenomWithDecimals(
          nativeBalances.find((coin) => coin.denom === denom)?.amount ?? 0,
          denomDecimals
        )
      : sourceValidatorStaked

  // Manually validate based on context.
  const validate = useCallback((): string | boolean => {
    if (!validator) {
      return t('error.noValidatorFound')
    }

    // Validate validator address.
    const validateValidator = validateValidatorAddress(validator)
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
              tokenSymbol: nativeTokenLabel(denom),
            })
          : t('error.treasuryInsufficientCannotStake', {
              amount: humanReadableAmount,
              tokenSymbol: nativeTokenLabel(denom),
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
              tokenSymbol: nativeTokenLabel(denom),
            }))
      )
    }
    // Logic for redelegating.
    else if (stakeType === StakeType.Redelegate) {
      // Validate toValidator address.
      if (!toValidator) {
        return t('error.noValidatorFound')
      }
      const validateToValidator = validateValidatorAddress(toValidator)
      if (typeof validateToValidator === 'string') {
        return validateToValidator
      }

      return (
        Number(amount) <= sourceValidatorStaked ||
        (sourceValidatorStaked === 0
          ? t('error.nothingStaked')
          : t('error.stakeInsufficient', {
              amount: humanReadableAmount,
              tokenSymbol: nativeTokenLabel(denom),
            }))
      )
    }

    return t('error.unexpectedError')
  }, [
    validator,
    toValidator,
    stakeType,
    maxAmount,
    t,
    amount,
    denom,
    sourceValidatorStaked,
  ])

  // Perform validation.
  useEffect(() => {
    if (!amount || !denom) {
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
  }, [setError, clearErrors, validate, fieldNamePrefix, amount, denom])

  return (
    <ActionCard
      Icon={DepositEmoji}
      onRemove={onRemove}
      title={t('title.stake')}
    >
      <div className="flex flex-row gap-2">
        {/* Choose type of stake operation. */}
        <SelectInput
          className="grow"
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
          nativeDecimals={NATIVE_DECIMALS}
          nativeDenom={NATIVE_DENOM}
          onSelect={({ address }) =>
            setValue(fieldNamePrefix + 'validator', address)
          }
          readOnly={!isCreating}
          selectedAddress={validator}
          stakes={stakes}
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
        <>
          <div className="flex flex-row gap-2">
            <NumberInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.amount}
              fieldName={fieldNamePrefix + 'amount'}
              max={maxAmount}
              min={minAmount}
              onMinus={() =>
                setValue(
                  fieldNamePrefix + 'amount',
                  Math.min(Math.max(amount - 1, minAmount), maxAmount)
                )
              }
              onPlus={() =>
                setValue(
                  fieldNamePrefix + 'amount',
                  Math.min(Math.max(amount + 1, minAmount), maxAmount)
                )
              }
              register={register}
              step={minAmount}
              validation={[validateRequired, validatePositive]}
            />

            <SelectInput
              disabled={!isCreating}
              error={errors?.denom}
              fieldName={fieldNamePrefix + 'denom'}
              register={register}
            >
              {nativeBalances.length !== 0 ? (
                nativeBalances.map(({ denom }) => (
                  <option key={denom} value={denom}>
                    ${nativeTokenLabel(denom)}
                  </option>
                ))
              ) : (
                <option value={NATIVE_DENOM}>
                  ${nativeTokenLabel(NATIVE_DENOM)}
                </option>
              )}
            </SelectInput>
          </div>

          <div className="mt-1 flex flex-row items-center gap-4">
            <p className="secondary-text font-semibold">
              {stakeType === StakeType.Delegate
                ? t('title.balance')
                : t('title.staked')}
              :
            </p>

            <TokenAmountDisplay
              amount={maxAmount}
              decimals={denomDecimals}
              iconUrl={nativeTokenLogoURI(denom)}
              showFullAmount
              symbol={nativeTokenLabel(denom)}
            />
          </div>
        </>
      )}

      {/* If redelegating, show selection for destination validator. */}
      {stakeType === StakeType.Redelegate && (
        <div className="mt-2 flex flex-col items-start gap-2">
          <p>{t('form.toValidator')}</p>

          <ValidatorPicker
            nativeDecimals={NATIVE_DECIMALS}
            nativeDenom={NATIVE_DENOM}
            onSelect={({ address }) =>
              setValue(fieldNamePrefix + 'toValidator', address)
            }
            readOnly={!isCreating}
            selectedAddress={toValidator}
            stakes={stakes}
            validators={validators}
          />
        </div>
      )}

      <InputErrorMessage error={errors?.denom} />
      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?._error} />
    </ActionCard>
  )
}

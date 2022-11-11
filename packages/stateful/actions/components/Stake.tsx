import { Coin } from '@cosmjs/stargate'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  DepositEmoji,
  InputErrorMessage,
  NumberInput,
  SelectInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import { TokenStake } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  StakeType,
  convertMicroDenomToDenomWithDecimals,
  isValidValidatorAddress,
  nativeTokenLabel,
  validatePositive,
  validateRequired,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

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

export interface StakeOptions {
  nativeBalances: readonly Coin[]
  stakes: TokenStake[]
}

export interface StakeData {
  stakeType: StakeType
  validator: string
  customValidator: string
  // Defined if redelegating.
  toValidator: string
  // Defined if redelegating.
  customToValidator: string
  amount: number
  denom: string
}

export const CUSTOM_VALIDATOR = 'CUSTOM'

export const StakeComponent: ActionComponent<StakeOptions, StakeData> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { nativeBalances, stakes },
}) => {
  const { t } = useTranslation()
  const { register, watch, setError, clearErrors, setValue } = useFormContext()

  const minAmount = 1 / Math.pow(10, NATIVE_DECIMALS)

  const stakeType = watch(fieldNamePrefix + 'stakeType')
  const validator = watch(fieldNamePrefix + 'validator')
  const newValidator = watch(fieldNamePrefix + 'newValidator')
  // Defined if redelegating.
  const toValidator = watch(fieldNamePrefix + 'toValidator')
  const amount = watch(fieldNamePrefix + 'amount')
  const denom = watch(fieldNamePrefix + 'denom')

  // Get address of validator or new validator if entered manually. Then, try to
  // find the matching staked amount for that validator. If it does not exist in
  // list, nothing is staked.
  const validatorOrNewValidator =
    validator === CUSTOM_VALIDATOR ? newValidator : validator
  const sourceValidatorStaked =
    (isValidValidatorAddress(validatorOrNewValidator, CHAIN_BECH32_PREFIX) &&
      stakes.find(
        ({ validator: { address } }) => address === validatorOrNewValidator
      )?.amount) ||
    0

  // If staking, maxAmount is denom treasury balance. Otherwise (for
  // undelegating and redelegating), maxAmount is the staked amount for the
  // source validator.
  const maxAmount =
    stakeType === StakeType.Delegate
      ? convertMicroDenomToDenomWithDecimals(
          nativeBalances.find((coin) => coin.denom === denom)?.amount ?? 0,
          NATIVE_DECIMALS
        )
      : sourceValidatorStaked

  const validate = useCallback((): string | boolean => {
    if (!validator) {
      return t('error.noValidatorFound')
    }

    // No validation for claiming rewards.
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

    // Logic for undelegating and redelegating.
    if (
      stakeType === StakeType.Undelegate ||
      stakeType === StakeType.Redelegate
    ) {
      return (
        Number(amount) <= sourceValidatorStaked ||
        `${
          sourceValidatorStaked === 0
            ? 'No token delegations of'
            : stakeType === StakeType.Undelegate
            ? `Max amount that can be undelegated is ${humanReadableAmount}`
            : `Max amount that can be redelegated is ${humanReadableAmount}`
        } ${nativeTokenLabel(denom)}.`
      )
    }

    return 'Invalid stake type.'
  }, [validator, stakeType, maxAmount, t, amount, denom, sourceValidatorStaked])

  // Update amount+denom combo error each time either field is updated
  // instead of setting errors individually on each field. Since we only
  // show one or the other and can't detect which error is newer, this
  // would lead to the error not updating if amount set an error and then
  // denom was changed.
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          {/* Choose type of stake operation. */}
          <SelectInput
            defaultValue={stakeActions[0].type}
            disabled={!isCreating}
            error={errors?.stakeType}
            fieldName={fieldNamePrefix + 'stakeType'}
            onChange={(value) => {
              // If setting to non-delegate stake type and is currently set to
              // CUSTOM_VALIDATOR, set back to first validator in list.
              if (
                value !== StakeType.Delegate &&
                validator === CUSTOM_VALIDATOR
              ) {
                setValue(
                  fieldNamePrefix + 'validator',
                  stakes.length > 0 ? stakes[0].validator.address : ''
                )
              }

              // If setting to delegate stake type and there are no validators,
              // set to CUSTOM_VALIDATOR.
              if (value === StakeType.Delegate && stakes.length === 0) {
                setValue(fieldNamePrefix + 'validator', CUSTOM_VALIDATOR)
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
          <SelectInput
            className="grow"
            disabled={!isCreating}
            error={errors?.validator}
            fieldName={fieldNamePrefix + 'validator'}
            register={register}
            validation={[
              validateRequired,
              // Ensure that this is set to a validator address (and not
              // NEW_VALIDATOR) if the stake type is anything other than
              // delegation.
              ...(stakeType !== StakeType.Delegate
                ? [validateValidatorAddress]
                : []),
            ]}
          >
            {stakes.map(({ validator, amount, decimals, symbol }) => (
              <option key={validator.address} value={validator.address}>
                <TokenAmountDisplay
                  amount={amount}
                  decimals={decimals}
                  prefix={validator.moniker + ' ('}
                  showFullAmount
                  suffix=")"
                  symbol={symbol}
                />
              </option>
            ))}
            {/* If delegating, add option to enter a custom validator address. */}
            {stakeType === StakeType.Delegate && (
              <option value={CUSTOM_VALIDATOR}>
                {t('title.customValidatorAddress')}
              </option>
            )}
          </SelectInput>
        </div>

        {/* If selected custom validator address, show address input. We should not validate stakeType here even though this should only show up when delegating, because when displaying a past proposal, the validator information for the address may or may not be loaded so we must force display custom entry. When set to a non-delegating option, this is manually reset if it's set to CUSTOM_VALIDATOR, so this will disappear appropriately. */}
        {validator === CUSTOM_VALIDATOR && (
          <div className="space-y-1">
            <div className="form-control">
              <AddressInput
                disabled={!isCreating}
                error={errors?.customValidator}
                fieldName={fieldNamePrefix + 'customValidator'}
                placeholder={CHAIN_BECH32_PREFIX + '...'}
                register={register}
                validation={[validateRequired, validateValidatorAddress]}
              />
            </div>

            <InputErrorMessage error={errors?.customValidator} />
          </div>
        )}

        {/* If not claiming (i.e. withdrawing reward), show amount input. */}
        {stakeType !== StakeType.WithdrawDelegatorReward && (
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
        )}

        {/* If redelegating, allow selecting destination validator. */}
        {stakeType === StakeType.Redelegate && (
          <>
            <p className="mt-2">{t('form.toValidator')}</p>

            <SelectInput
              className="grow"
              disabled={!isCreating}
              error={errors?.toValidator}
              fieldName={fieldNamePrefix + 'toValidator'}
              register={register}
              validation={[validateRequired]}
            >
              {stakes.map(({ validator, amount, decimals, symbol }) => (
                <option key={validator.address} value={validator.address}>
                  <TokenAmountDisplay
                    amount={amount}
                    decimals={decimals}
                    prefix={validator.moniker + ' ('}
                    showFullAmount
                    suffix=")"
                    symbol={symbol}
                  />
                </option>
              ))}
              {/* Add option to enter a custom validator address. */}
              <option value={CUSTOM_VALIDATOR}>
                {t('title.customValidatorAddress')}
              </option>
            </SelectInput>

            {/* If selected custom toValidator address, show address input. */}
            {toValidator === CUSTOM_VALIDATOR && (
              <div className="space-y-1">
                <div className="form-control">
                  <AddressInput
                    disabled={!isCreating}
                    error={errors?.customToValidator}
                    fieldName={fieldNamePrefix + 'customToValidator'}
                    placeholder={CHAIN_BECH32_PREFIX + '...'}
                    register={register}
                    validation={[validateRequired, validateValidatorAddress]}
                  />
                </div>

                <InputErrorMessage error={errors?.customToValidator} />
              </div>
            )}
          </>
        )}

        <InputErrorMessage error={errors?.denom} />
        <InputErrorMessage error={errors?.amount} />
        <InputErrorMessage error={errors?._error} />
      </div>
    </ActionCard>
  )
}

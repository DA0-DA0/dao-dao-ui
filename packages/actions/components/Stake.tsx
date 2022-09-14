import { Coin } from '@cosmjs/stargate'
import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  validatePositive,
  validateRequired,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

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
  nativeDelegatedBalance: Coin
}

export const StakeComponent: ActionComponent<StakeOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { nativeBalances, nativeDelegatedBalance },
}) => {
  const { t } = useTranslation()
  const { register, watch, setError, clearErrors, setValue } = useFormContext()

  const stakeType = watch(fieldNamePrefix + 'stakeType')
  const amount = watch(fieldNamePrefix + 'amount')
  const denom = watch(fieldNamePrefix + 'denom')

  const validatePossibleSpend = useCallback(
    (denom: string, amount: string): string | boolean => {
      // Logic for undelegating or redelegating
      if (
        stakeType === StakeType.Undelegate ||
        stakeType === StakeType.Redelegate
      ) {
        const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
          nativeDelegatedBalance.amount,
          NATIVE_DECIMALS
        ).toLocaleString()
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          NATIVE_DECIMALS
        )
        return (
          Number(microAmount) <= Number(nativeDelegatedBalance.amount) ||
          `${
            Number(nativeDelegatedBalance.amount) === 0
              ? 'No native token delegations for'
              : stakeType === StakeType.Undelegate
              ? `Max amount that can be undelegated is ${humanReadableAmount}`
              : `Max amount that can be redelegated is ${humanReadableAmount}`
          } ${nativeTokenLabel(denom)}.`
        )
      }

      // All other staking types can use this logic
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
          `The treasury ${
            Number(native.amount) === 0
              ? 'has no'
              : `only has ${humanReadableAmount}`
          } ${nativeTokenLabel(denom)}, which is insufficient.`
        )
      }

      // If there are no native tokens in the treasury the native balances
      // query will return an empty list, so check explicitly if the
      // native currency is selected.
      if (denom === NATIVE_DENOM) {
        return `The treasury has no ${nativeTokenLabel(
          denom
        )}, so you can't stake any tokens.`
      }

      return 'Unrecognized denom.'
    },
    [nativeBalances, nativeDelegatedBalance, stakeType]
  )

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

    const validation = validatePossibleSpend(denom, amount)
    if (validation === true) {
      clearErrors(fieldNamePrefix + '_error')
    } else if (typeof validation === 'string') {
      setError(fieldNamePrefix + '_error', {
        type: 'custom',
        message: validation,
      })
    }
  }, [
    setError,
    clearErrors,
    validatePossibleSpend,
    fieldNamePrefix,
    amount,
    denom,
  ])

  return (
    <ActionCard Icon={StakeIcon} onRemove={onRemove} title={t('title.stake')}>
      <div className="flex flex-row gap-4 mt-2">
        <SelectInput
          defaultValue={stakeActions[0].type}
          disabled={!isCreating}
          error={errors?.stakeType}
          fieldName={fieldNamePrefix + 'stakeType'}
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
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.amount}
              fieldName={fieldNamePrefix + 'amount'}
              onMinus={() =>
                setValue(
                  fieldNamePrefix + 'amount',
                  Math.max(amount - 1, 1 / 10 ** NATIVE_DECIMALS)
                )
              }
              onPlus={() =>
                setValue(
                  fieldNamePrefix + 'amount',
                  Math.max(amount + 1, 1 / 10 ** NATIVE_DECIMALS)
                )
              }
              register={register}
              step={1 / 10 ** NATIVE_DECIMALS}
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
                <option key="native-filler" value={NATIVE_DENOM}>
                  ${nativeTokenLabel(NATIVE_DENOM)}
                </option>
              )}
            </SelectInput>
          </>
        )}
      </div>

      <InputErrorMessage error={errors?.denom} />
      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?._error} />

      {stakeType === StakeType.Redelegate && (
        <>
          <h3 className="mt-2 mb-1">{t('form.fromValidator')}</h3>
          <div className="form-control">
            <AddressInput
              disabled={!isCreating}
              error={errors?.fromValidator}
              fieldName={fieldNamePrefix + 'fromValidator'}
              register={register}
              validation={[validateValidatorAddress]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InputErrorMessage error={errors?.fromValidator} />
          </div>
        </>
      )}

      <h3 className="mt-2 mb-1">
        {stakeType === StakeType.Redelegate
          ? t('form.toValidator')
          : t('form.validator')}
      </h3>
      <div className="form-control">
        <AddressInput
          disabled={!isCreating}
          error={errors?.validator}
          fieldName={fieldNamePrefix + 'validator'}
          register={register}
          validation={[validateRequired, validateValidatorAddress]}
        />
      </div>

      <InputErrorMessage error={errors?.validator} />

      <div className="flex gap-2 items-center p-2 mt-3 bg-disabled rounded-lg">
        <InformationCircleIcon className="h-4" />
        <p className="body-text">{t('info.actionInBeta')}</p>
      </div>
    </ActionCard>
  )
}

export const StakeIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.box')} symbol="📤" />
}

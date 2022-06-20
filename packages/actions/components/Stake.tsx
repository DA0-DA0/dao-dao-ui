import { Coin } from '@cosmjs/stargate'
import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
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
  convertDenomToHumanReadableDenom,
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
}

export const StakeComponent: ActionComponent<StakeOptions> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  options: { nativeBalances },
}) => {
  const { t } = useTranslation()
  const { register, watch, clearErrors, setValue } = useFormContext()

  const stakeType = watch(getFieldName('stakeType'))
  const amount = watch(getFieldName('amount'))
  const denom = watch(getFieldName('denom'))

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
        `The treasury ${
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
      return `The treasury has no ${humanReadableDenom}, so you can't stake any tokens.`
    }

    return 'Unrecognized denom.'
  }

  // The amount and denom fields are dependent on each other for validation. If
  // one has a valid validation result, the other one as well. This wrapper ensures
  // that react-hook-form is informed as such.
  const validatePossibleSpendWrapper = (denom: string, amount: string) => {
    const valid = validatePossibleSpend(denom, amount)
    if (typeof valid === 'boolean' && valid) {
      clearErrors([getFieldName('denom'), getFieldName('amount')])
    }
    return valid
  }

  return (
    <ActionCard
      emoji={<Emoji label={t('box')} symbol="📤" />}
      onRemove={onRemove}
      title={t('stake')}
    >
      <div className="flex flex-row gap-4 mt-2">
        <SelectInput
          defaultValue={stakeActions[0].type}
          disabled={readOnly}
          error={errors?.stakeType}
          fieldName={getFieldName('stakeType')}
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
              disabled={readOnly}
              error={errors?.amount}
              fieldName={getFieldName('amount')}
              onPlusMinus={[
                () =>
                  setValue(
                    getFieldName('amount'),
                    Math.max(amount + 1, 1 / 10 ** NATIVE_DECIMALS)
                  ),
                () =>
                  setValue(
                    getFieldName('amount'),
                    Math.max(amount - 1, 1 / 10 ** NATIVE_DECIMALS)
                  ),
              ]}
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
              fieldName={getFieldName('denom')}
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

      <InputErrorMessage error={errors?.denom ?? errors?.amount} />

      {stakeType === StakeType.Redelegate && (
        <>
          <h3 className="mt-2 mb-1">{t('fromValidator')}</h3>
          <div className="form-control">
            <AddressInput
              disabled={readOnly}
              error={errors?.fromValidator}
              fieldName={getFieldName('fromValidator')}
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
        {stakeType === StakeType.Redelegate ? t('toValidator') : t('validator')}
      </h3>
      <div className="form-control">
        <AddressInput
          disabled={readOnly}
          error={errors?.validator}
          fieldName={getFieldName('validator')}
          register={register}
          validation={[validateRequired, validateValidatorAddress]}
        />
      </div>

      <InputErrorMessage error={errors?.validator} />

      <div className="flex gap-2 items-center p-2 mt-3 bg-disabled rounded-lg">
        <InformationCircleIcon className="h-4" />
        <p className="body-text">{t('actionInBeta')}</p>
      </div>
    </ActionCard>
  )
}

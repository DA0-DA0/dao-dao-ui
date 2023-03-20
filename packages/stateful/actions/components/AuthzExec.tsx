import { Check, Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  LockWithKeyEmoji,
  NumberInput,
  SelectInput,
  ValidatorPicker,
} from '@dao-dao/stateless'
import { AddressInputProps, Validator } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  NATIVE_TOKEN,
  convertMicroDenomToDenomWithDecimals,
  validateAddress,
  validateJSON,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { AuthzExecActionTypes } from '../actions/AuthzExec'
import { ActionCard } from './ActionCard'

export interface AuthzExecOptions {
  AddressInput: ComponentType<AddressInputProps>
  validators: Validator[]
}

export const useAuthzExecActionTypes = (): {
  type: AuthzExecActionTypes
  name: string
}[] => {
  const { t } = useTranslation()

  return [
    {
      type: AuthzExecActionTypes.Delegate,
      name: t('title.stake'),
    },
    {
      type: AuthzExecActionTypes.Undelegate,
      name: t('title.unstake'),
    },
    {
      type: AuthzExecActionTypes.Redelegate,
      name: t('title.restake'),
    },
    {
      type: AuthzExecActionTypes.ClaimRewards,
      name: t('title.claimRewards'),
    },
    {
      type: AuthzExecActionTypes.Custom,
      name: t('title.custom'),
    },
  ]
}

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { AddressInput, validators },
}) => {
  const { t } = useTranslation()
  const { control, register, setValue, watch } = useFormContext()

  const authzExecActions = useAuthzExecActionTypes()

  const authzExecActionType = watch(fieldNamePrefix + 'authzExecActionType')

  const minAmount = convertMicroDenomToDenomWithDecimals(
    1,
    NATIVE_TOKEN.decimals
  )

  const claimRewardsValidator = watch(
    fieldNamePrefix + 'claimRewards.validatorAddress'
  )
  const delegateValidator = watch(fieldNamePrefix + 'delegate.validatorAddress')
  const redelegateDstValidator = watch(
    fieldNamePrefix + 'redelegate.validatorDstAddress'
  )
  const redelegateSrcValidator = watch(
    fieldNamePrefix + 'redelegate.validatorSrcAddress'
  )
  const undelegateValidator = watch(
    fieldNamePrefix + 'undelegate.validatorAddress'
  )

  return (
    <ActionCard
      Icon={LockWithKeyEmoji}
      onRemove={onRemove}
      title={t('title.authzExec')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.authzExecActionType')}
          tooltip={t('form.authzExecActionTypeTooltip')}
        />
        <SelectInput
          containerClassName="grow"
          defaultValue={authzExecActions[0].type}
          disabled={!isCreating}
          error={errors?.authzExecActionType}
          fieldName={fieldNamePrefix + 'authzExecActionType'}
          register={register}
        >
          {authzExecActions.map(({ name, type }, idx) => (
            <option key={idx} value={type}>
              {name}
            </option>
          ))}
        </SelectInput>
      </div>

      {authzExecActionType === AuthzExecActionTypes.Delegate && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <AddressInput
              disabled={!isCreating}
              error={errors?.delegate?.delegatorAddress}
              fieldName={fieldNamePrefix + 'delegate.delegatorAddress'}
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.delegate?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.validator')} />
            <ValidatorPicker
              displayClassName="grow min-w-0"
              nativeDecimals={NATIVE_TOKEN.decimals}
              nativeDenom={NATIVE_TOKEN.denomOrAddress}
              onSelect={({ address }) =>
                setValue(fieldNamePrefix + 'delegate.validatorAddress', address)
              }
              readOnly={!isCreating}
              selectedAddress={delegateValidator}
              validators={validators}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('title.chooseTokenAmount')} />
            <NumberInput
              disabled={!isCreating}
              error={errors?.delegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'delegate.amount.amount'}
              min={minAmount}
              register={register}
              setValue={setValue}
              step={minAmount}
              unit={'$' + NATIVE_TOKEN.symbol}
              validation={[validatePositive, validateRequired]}
              watch={watch}
            />
            <InputErrorMessage error={errors?.delegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.Undelegate && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <AddressInput
              disabled={!isCreating}
              error={errors?.undelegate?.delegatorAddress}
              fieldName={fieldNamePrefix + 'undelegate.delegatorAddress'}
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.undelegate?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.validator')} />
            <ValidatorPicker
              displayClassName="grow min-w-0"
              nativeDecimals={NATIVE_TOKEN.decimals}
              nativeDenom={NATIVE_TOKEN.denomOrAddress}
              onSelect={({ address }) =>
                setValue(
                  fieldNamePrefix + 'undelegate.validatorAddress',
                  address
                )
              }
              readOnly={!isCreating}
              selectedAddress={undelegateValidator}
              validators={validators}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('title.chooseTokenAmount')} />
            <NumberInput
              disabled={!isCreating}
              error={errors?.undelegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'undelegate.amount.amount'}
              min={minAmount}
              register={register}
              setValue={setValue}
              step={minAmount}
              unit={'$' + NATIVE_TOKEN.symbol}
              validation={[validatePositive, validateRequired]}
              watch={watch}
            />
            <InputErrorMessage error={errors?.undelegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.Redelegate && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <AddressInput
              disabled={!isCreating}
              error={errors?.redelegate?.delegatorAddress}
              fieldName={fieldNamePrefix + 'redelegate.delegatorAddress'}
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.redelegate?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.redelegateSourceValidator')}
              tooltip={t('form.redelegateSourceValidatorTooltip')}
            />
            <ValidatorPicker
              displayClassName="grow min-w-0"
              nativeDecimals={NATIVE_TOKEN.decimals}
              nativeDenom={NATIVE_TOKEN.denomOrAddress}
              onSelect={({ address }) =>
                setValue(
                  fieldNamePrefix + 'redelegate.validatorSrcAddress',
                  address
                )
              }
              readOnly={!isCreating}
              selectedAddress={redelegateSrcValidator}
              validators={validators}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.redelegateDestinationValidator')}
              tooltip={t('form.redelegateDestinationValidatorTooltip')}
            />
            <ValidatorPicker
              displayClassName="grow min-w-0"
              nativeDecimals={NATIVE_TOKEN.decimals}
              nativeDenom={NATIVE_TOKEN.denomOrAddress}
              onSelect={({ address }) =>
                setValue(
                  fieldNamePrefix + 'redelegate.validatorDstAddress',
                  address
                )
              }
              readOnly={!isCreating}
              selectedAddress={redelegateDstValidator}
              validators={validators}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('title.chooseTokenAmount')} />
            <NumberInput
              disabled={!isCreating}
              error={errors?.redelegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'redelegate.amount.amount'}
              min={minAmount}
              register={register}
              setValue={setValue}
              step={minAmount}
              unit={'$' + NATIVE_TOKEN.symbol}
              validation={[validatePositive, validateRequired]}
              watch={watch}
            />
            <InputErrorMessage error={errors?.redelegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.ClaimRewards && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <AddressInput
              disabled={!isCreating}
              error={errors?.claimRewards?.delegatorAddress}
              fieldName={fieldNamePrefix + 'claimRewards.delegatorAddress'}
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.claimRewards?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.validator')} />
            <ValidatorPicker
              displayClassName="grow min-w-0"
              nativeDecimals={NATIVE_TOKEN.decimals}
              nativeDenom={NATIVE_TOKEN.denomOrAddress}
              onSelect={({ address }) =>
                setValue(
                  fieldNamePrefix + 'claimRewards.validatorAddress',
                  address
                )
              }
              readOnly={!isCreating}
              selectedAddress={claimRewardsValidator}
              validators={validators}
            />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.Custom && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.encodedMessages')}
            tooltip={t('form.encodedMessagesTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.custom}
            fieldName={fieldNamePrefix + 'custom'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.custom?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.custom?.message}</span>
            </p>
          ) : (
            <p className="text-success flex items-center gap-1 text-sm">
              <Check className="inline w-5" /> {t('info.jsonIsValid')}
            </p>
          )}
        </div>
      )}
    </ActionCard>
  )
}

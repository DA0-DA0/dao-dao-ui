import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  LockWithKeyEmoji,
  SelectInput,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  validateAddress,
  validateJSON,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { AuthzExecActionTypes } from '../actions/AuthzExec'
import { ActionCard } from './ActionCard'

export interface AuthzExecOptions {}

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

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { control, register, watch } = useFormContext()

  const authzExecActions = useAuthzExecActionTypes()

  const authzExecActionType = watch(fieldNamePrefix + 'authzExecActionType')

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
            <TextInput
              disabled={!isCreating}
              error={errors?.delegate?.deleatorAddress}
              fieldName={fieldNamePrefix + 'delegate.delegatorAddress'}
              placeholder="juno..."
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.delegate?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.validatorAddress')}
              tooltip={t('form.validatorAddressTooltip')}
            />
            <TextInput
              disabled={!isCreating}
              error={errors?.delegate?.validatorAddress}
              fieldName={fieldNamePrefix + 'delegate.validatorAddress'}
              placeholder="junovaloper..."
              register={register}
              validation={[(v: string) => validateValidatorAddress(v)]}
            />
            <InputErrorMessage error={errors?.delegate?.validatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.amount')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.delegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'delegate.amount.amount'}
              placeholder="0"
              register={register}
            />
            <InputErrorMessage error={errors?.delegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.Undelegate && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.undelegate?.deleatorAddress}
              fieldName={fieldNamePrefix + 'undelegate.delegatorAddress'}
              placeholder="juno..."
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.undelegate?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.validatorAddress')}
              tooltip={t('form.validatorAddressTooltip')}
            />
            <TextInput
              disabled={!isCreating}
              error={errors?.undelegate?.validatorAddress}
              fieldName={fieldNamePrefix + 'undelegate.validatorAddress'}
              placeholder="junovaloper..."
              register={register}
              validation={[(v: string) => validateValidatorAddress(v)]}
            />
            <InputErrorMessage error={errors?.undelegate?.validatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.amount')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.undelegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'undelegate.amount.amount'}
              placeholder="0"
              register={register}
            />
            <InputErrorMessage error={errors?.undelegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.Redelegate && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.redelegate?.deleatorAddress}
              fieldName={fieldNamePrefix + 'redelegate.delegatorAddress'}
              placeholder="juno..."
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
            <TextInput
              disabled={!isCreating}
              error={errors?.redelegate?.validatorSrcAddress}
              fieldName={fieldNamePrefix + 'redelegate.validatorSrcAddress'}
              placeholder="junovaloper..."
              register={register}
              validation={[(v: string) => validateValidatorAddress(v)]}
            />
            <InputErrorMessage
              error={errors?.redelegate?.validatorSrcAddress}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.redelegateDestinationValidator')}
              tooltip={t('form.redelegateDestinationValidatorTooltip')}
            />
            <TextInput
              disabled={!isCreating}
              error={errors?.redelegate?.validatorDstAddress}
              fieldName={fieldNamePrefix + 'redelegate.validatorDstAddress'}
              placeholder="junovaloper..."
              register={register}
              validation={[(v: string) => validateValidatorAddress(v)]}
            />
            <InputErrorMessage
              error={errors?.redelegate?.validatorDstAddress}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.amount')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.redelegate?.amount?.amount}
              fieldName={fieldNamePrefix + 'redelegate.amount.amount'}
              placeholder="0"
              register={register}
            />
            <InputErrorMessage error={errors?.redelegate?.amount?.amount} />
          </div>
        </>
      )}

      {authzExecActionType === AuthzExecActionTypes.ClaimRewards && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={t('form.delegatorAddress')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.claimRewards?.deleatorAddress}
              fieldName={fieldNamePrefix + 'claimRewards.delegatorAddress'}
              placeholder="juno..."
              register={register}
              validation={[(v: string) => validateAddress(v)]}
            />
            <InputErrorMessage error={errors?.claimRewards?.delegatorAddress} />
          </div>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel
              name={t('form.validatorAddress')}
              tooltip={t('form.validatorAddressTooltip')}
            />
            <TextInput
              disabled={!isCreating}
              error={errors?.claimRewards?.validatorAddress}
              fieldName={fieldNamePrefix + 'claimRewards.validatorAddress'}
              placeholder="junovaloper..."
              register={register}
              validation={[(v: string) => validateValidatorAddress(v)]}
            />
            <InputErrorMessage error={errors?.claimRewards?.validatorAddress} />
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

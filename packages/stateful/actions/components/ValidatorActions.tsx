import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  PickEmoji,
  SelectInput,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  ValidatorActionType,
  validateJSON,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export const useValidatorActions = (): {
  type: ValidatorActionType
  name: string
}[] => {
  const { t } = useTranslation()

  return [
    {
      type: ValidatorActionType.WithdrawValidatorCommission,
      name: t('title.withdrawValidatorCommission'),
    },
    {
      type: ValidatorActionType.CreateValidator,
      name: t('title.createValidator'),
    },
    {
      type: ValidatorActionType.EditValidator,
      name: t('title.editValidator'),
    },
    {
      type: ValidatorActionType.UnjailValidator,
      name: t('title.unjailValidator'),
    },
  ]
}

export interface ValidatorActionOptions {}

export interface ValidatorActionData {}

export const ValidatorActionsComponent: ActionComponent<
  ValidatorActionOptions,
  ValidatorActionData
> = ({ fieldNamePrefix, onRemove, errors, isCreating }) => {
  const { t } = useTranslation()
  const { register, watch, control } = useFormContext()
  const validatorActions = useValidatorActions()

  const validatorActionType = watch(fieldNamePrefix + 'validatorActionType')

  return (
    <ActionCard
      Icon={PickEmoji}
      onRemove={onRemove}
      title={'Validator actions'}
    >
      <div className="flex flex-col gap-2 xs:flex-row">
        {/* Choose type of stake operation. */}
        <SelectInput
          containerClassName="grow"
          defaultValue={validatorActions[0].type}
          disabled={!isCreating}
          error={errors?.stakeType}
          fieldName={fieldNamePrefix + 'validatorActionType'}
          register={register}
        >
          {validatorActions.map(({ name, type }, idx) => (
            <option key={idx} value={type}>
              {name}
            </option>
          ))}
        </SelectInput>
      </div>

      {validatorActionType === ValidatorActionType.CreateValidator && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.createValidatorMessage')}
            tooltip={t('form.createValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.createMsg?.value}
            fieldName={fieldNamePrefix + 'createMsg.value'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.createMsg?.value?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.createMsg?.value?.message}</span>
            </p>
          ) : (
            <p className="text-success flex items-center gap-1 text-sm">
              <Check className="inline w-5" /> {t('info.jsonIsValid')}
            </p>
          )}
        </div>
      )}

      {validatorActionType === ValidatorActionType.EditValidator && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.editValidatorMessage')}
            tooltip={t('form.editValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.editMsg?.value}
            fieldName={fieldNamePrefix + 'editMsg.value'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.editMsg?.value?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.editMsg?.value?.message}</span>
            </p>
          ) : (
            <p className="text-success flex items-center gap-1 text-sm">
              <Check className="inline w-5" /> {t('info.jsonIsValid')}
            </p>
          )}
        </div>
      )}

      {validatorActionType === ValidatorActionType.UnjailValidator && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={'Validator address'}
            tooltip={'The address for the validator run by your DAO.'}
          />
          <TextInput
            disabled={!isCreating}
            error={errors?.unjailMsg?.value?.validatorAddr}
            fieldName={fieldNamePrefix + 'unjailMsg.value.validatorAddr'}
            placeholder="junovaloper..."
            register={register}
            validation={[(v: string) => validateValidatorAddress(v)]}
          />
          <InputErrorMessage error={errors?.unjailMsg?.value?.validatorAddr} />
        </div>
      )}

      {validatorActionType ===
        ValidatorActionType.WithdrawValidatorCommission && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={'Validator address'}
            tooltip={'The address for the validator run by your DAO.'}
          />
          <TextInput
            disabled={!isCreating}
            error={errors?.withdrawCommissionMsg?.value?.validatorAddress}
            fieldName={
              fieldNamePrefix + 'withdrawCommissionMsg.value.validatorAddress'
            }
            placeholder="junovaloper..."
            register={register}
            validation={[(v: string) => validateValidatorAddress(v)]}
          />
          <InputErrorMessage
            error={errors?.withdrawCommissionMsg?.value.validatorAddress}
          />
        </div>
      )}
    </ActionCard>
  )
}

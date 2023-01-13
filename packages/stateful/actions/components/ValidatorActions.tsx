import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  PickEmoji,
  SelectInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  validateJSON,
  validateValidatorAddress,
} from '@dao-dao/utils'

import { ValidatorActionType } from '../actions/ValidatorActions'
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

export const ValidatorActionsComponent: ActionComponent = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { control, register, watch } = useFormContext()
  const validatorActions = useValidatorActions()

  const validatorActionType = watch(fieldNamePrefix + 'validatorActionType')

  return (
    <ActionCard
      Icon={PickEmoji}
      onRemove={onRemove}
      title={t('title.validatorActions')}
    >
      <SelectInput
        containerClassName="mb-3"
        defaultValue={validatorActions[0].type}
        disabled={!isCreating}
        error={errors?.validatorActionType}
        fieldName={fieldNamePrefix + 'validatorActionType'}
        register={register}
      >
        {validatorActions.map(({ name, type }, idx) => (
          <option key={idx} value={type}>
            {name}
          </option>
        ))}
      </SelectInput>

      {validatorActionType === ValidatorActionType.CreateValidator && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.createValidatorMessage')}
            tooltip={t('form.createValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.createMsg}
            fieldName={fieldNamePrefix + 'createMsg'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.createMsg?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.createMsg?.message}</span>
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
            error={errors?.editMsg}
            fieldName={fieldNamePrefix + 'editMsg'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.editMsg?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.editMsg?.message}</span>
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
            name={t('form.validatorAddress')}
            tooltip={t('form.validatorAddressTooltip')}
          />
          <AddressInput
            disabled={!isCreating}
            error={errors?.unjailMsg?.validatorAddr}
            fieldName={fieldNamePrefix + 'unjailMsg.validatorAddr'}
            placeholder={`${CHAIN_BECH32_PREFIX}valoper...`}
            register={register}
            validation={[(v: string) => validateValidatorAddress(v)]}
          />
          <InputErrorMessage error={errors?.unjailMsg?.validatorAddr} />
        </div>
      )}

      {validatorActionType ===
        ValidatorActionType.WithdrawValidatorCommission && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.validatorAddress')}
            tooltip={t('form.validatorAddressTooltip')}
          />
          <AddressInput
            disabled={!isCreating}
            error={errors?.withdrawCommissionMsg?.validatorAddress}
            fieldName={
              fieldNamePrefix + 'withdrawCommissionMsg.validatorAddress'
            }
            placeholder={`${CHAIN_BECH32_PREFIX}valoper...`}
            register={register}
            validation={[(v: string) => validateValidatorAddress(v)]}
          />
          <InputErrorMessage
            error={errors?.withdrawCommissionMsg?.validatorAddress}
          />
        </div>
      )}
    </ActionCard>
  )
}

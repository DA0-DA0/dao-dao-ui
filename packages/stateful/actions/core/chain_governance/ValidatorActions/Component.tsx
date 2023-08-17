import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { MsgWithdrawValidatorCommission } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@dao-dao/protobuf/codegen/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/tx'
import { CodeMirrorInput, InputLabel, SelectInput } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateJSON } from '@dao-dao/utils'

export const VALIDATOR_ACTION_TYPES = [
  {
    typeUrl: MsgWithdrawValidatorCommission.typeUrl,
    i18nKey: 'title.withdrawValidatorCommission',
  },
  {
    typeUrl: MsgCreateValidator.typeUrl,
    i18nKey: 'title.createValidator',
  },
  {
    typeUrl: MsgEditValidator.typeUrl,
    i18nKey: 'title.editValidator',
  },
  {
    typeUrl: MsgUnjail.typeUrl,
    i18nKey: 'title.unjailValidator',
  },
]

export type ValidatorActionsData = {
  validatorActionTypeUrl: string
  createMsg: string
  editMsg: string
}

export const ValidatorActionsComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { control, register, watch } = useFormContext<ValidatorActionsData>()

  const validatorActionTypeUrl = watch(
    (fieldNamePrefix + 'validatorActionTypeUrl') as 'validatorActionTypeUrl'
  )

  return (
    <>
      <SelectInput
        disabled={!isCreating}
        error={errors?.validatorActionTypeUrl}
        fieldName={
          (fieldNamePrefix +
            'validatorActionTypeUrl') as 'validatorActionTypeUrl'
        }
        register={register}
      >
        {VALIDATOR_ACTION_TYPES.map(({ typeUrl, i18nKey }) => (
          <option key={typeUrl} value={typeUrl}>
            {t(i18nKey)}
          </option>
        ))}
      </SelectInput>

      {validatorActionTypeUrl === MsgCreateValidator.typeUrl && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.createValidatorMessage')}
            tooltip={t('form.createValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.createMsg}
            fieldName={(fieldNamePrefix + 'createMsg') as 'createMsg'}
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

      {validatorActionTypeUrl === MsgEditValidator.typeUrl && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.editValidatorMessage')}
            tooltip={t('form.editValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.editMsg}
            fieldName={(fieldNamePrefix + 'editMsg') as 'editMsg'}
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
    </>
  )
}

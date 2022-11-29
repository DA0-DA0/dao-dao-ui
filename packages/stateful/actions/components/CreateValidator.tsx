import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CodeMirrorInput, InputLabel, PickEmoji } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateJSON } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface CreateValidatorOptions {}

export const CreateValidatorComponent: ActionComponent<
  CreateValidatorOptions
> = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { control } = useFormContext()

  return (
    <ActionCard
      Icon={PickEmoji}
      onRemove={onRemove}
      title={t('title.createValidator')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.createValidatorMessage')}
          tooltip={t('form.createValidatorMessageTooltip')}
        />
        <CodeMirrorInput
          control={control}
          error={errors?.value}
          fieldName={fieldNamePrefix + 'value'}
          readOnly={!isCreating}
          validation={[validateJSON]}
        />
        {errors?.value?.message ? (
          <p className="text-error flex items-center gap-1 text-sm">
            <Close className="inline w-5" />{' '}
            <span>{errors.value?.message}</span>
          </p>
        ) : (
          <p className="text-success flex items-center gap-1 text-sm">
            <Check className="inline w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>
    </ActionCard>
  )
}

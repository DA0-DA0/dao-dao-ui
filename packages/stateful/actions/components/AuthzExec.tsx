import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  InputLabel,
  LockWithKeyEmoji,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateJSON } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface AuthzExecOptions {}

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { control } = useFormContext()

  return (
    <ActionCard
      Icon={LockWithKeyEmoji}
      onRemove={onRemove}
      title={t('title.authzExec')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.encodedMessages')}
          tooltip={t('form.encodedMessagesTooltip')}
        />
        <CodeMirrorInput
          control={control}
          error={errors?.value?.value}
          fieldName={fieldNamePrefix + 'value.value'}
          readOnly={!isCreating}
          validation={[validateJSON]}
        />
        {errors?.value?.value?.message ? (
          <p className="text-error flex items-center gap-1 text-sm">
            <Close className="inline w-5" />{' '}
            <span>{errors.value?.value?.message}</span>
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

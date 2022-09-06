import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/ui'
import { validateJSON, validateRequired } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface AuthzExecOptions {}

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { register, control } = useFormContext()

  return (
    <ActionCard
      Icon={AuthzExecIcon}
      onRemove={onRemove}
      title={t('title.authzExec')}
    >
      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={t('form.messageType')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.type_url}
          fieldName={fieldNamePrefix + 'value.typeUrl'}
          placeholder={!isCreating ? t('info.none') : t('form.messageType')}
          register={register}
          validation={[(v: string) => validateRequired(v)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={t('form.message')} />
        <CodeMirrorInput
          control={control}
          error={errors?.value?.value}
          fieldName={fieldNamePrefix + 'value.value'}
          readOnly={!isCreating}
          validation={[validateJSON]}
        />
        {errors?.value?.value?.message ? (
          <p className="flex gap-1 items-center text-sm text-error">
            <XIcon className="inline w-5" />{' '}
            <span>{errors.value?.value?.message}</span>
          </p>
        ) : (
          <p className="flex gap-1 items-center text-sm text-success">
            <CheckIcon className="inline w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>
    </ActionCard>
  )
}

export const AuthzExecIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.closed_lock_with_key')} symbol="🔐" />
}

import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CodeMirrorInput, InputLabel } from '@dao-dao/ui'
import { validateJSON } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface CreateValidatorOptions {}

export const CreateValidatorComponent: ActionComponent<CreateValidatorOptions> =
  (props) => {
    const { t } = useTranslation()
    const { fieldNamePrefix, onRemove, errors, isCreating } = props
    const { control } = useFormContext()

    return (
      <ActionCard
        Icon={CreateValidatorIcon}
        onRemove={onRemove}
        title={t('title.createValidator')}
      >
        <div className="flex flex-col gap-1 items-stretch">
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
            <p className="flex gap-1 items-center text-sm text-error">
              <XIcon className="inline w-5" />{' '}
              <span>{errors.value?.message}</span>
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

export const CreateValidatorIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.pick')} symbol="⛏" />
}

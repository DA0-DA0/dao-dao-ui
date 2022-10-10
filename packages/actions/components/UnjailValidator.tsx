import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/tstypes/actions'
import { CodeMirrorInput, InputLabel } from '@dao-dao/ui'
import { validateJSON } from '@dao-dao/utils'

import { ActionCard } from '..'

export interface UnjailValidatorOptions {}

export const UnjailValidatorComponent: ActionComponent<
  UnjailValidatorOptions
> = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { control } = useFormContext()

  return (
    <ActionCard
      Icon={UnjailValidatorIcon}
      onRemove={onRemove}
      title={t('title.unjailValidator')}
    >
      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel
          name={t('form.unjailValidatorMessage')}
          tooltip={t('form.unjailValidatorMessageTooltip')}
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

export const UnjailValidatorIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.unlock')} symbol="🔓" />
}

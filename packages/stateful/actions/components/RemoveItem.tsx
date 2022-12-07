import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  SelectInput,
  WrenchEmoji,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface RemoveItemData {
  key: string
}

export interface RemoveItemOptions {
  existingKeys: string[]
}

export const RemoveItemComponent: ActionComponent<RemoveItemOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { existingKeys },
}) => {
  const { t } = useTranslation()
  const { register, trigger } = useFormContext()

  useEffect(() => {
    trigger(fieldNamePrefix + 'key')
  }, [fieldNamePrefix, trigger])

  return (
    <ActionCard
      Icon={WrenchEmoji}
      onRemove={onRemove}
      title={t('title.removeItem')}
    >
      <InputLabel name={t('form.item')} />
      <SelectInput
        disabled={!isCreating}
        error={errors?.key}
        fieldName={fieldNamePrefix + 'key'}
        register={register}
        validation={[
          () => existingKeys.length > 0 || t('error.noItemsSetUnusableAction'),
          validateRequired,
        ]}
      >
        {existingKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </SelectInput>
      <InputErrorMessage error={errors?.key} />
    </ActionCard>
  )
}

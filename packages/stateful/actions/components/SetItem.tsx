import uniq from 'lodash.uniq'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  InputLabel,
  Loader,
  TextInput,
  WrenchEmoji,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface SetItemData {
  key: string
  value: string
}

export interface SetItemOptions {
  existingKeys: string[]
  currentValue: LoadingData<string | null>
}

export const SetItemComponent: ActionComponent<SetItemOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { existingKeys, currentValue },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const watchKey = watch(fieldNamePrefix + 'key')
  const watchValue = watch(fieldNamePrefix + 'value')

  const suggestedValues = SUGGESTED_VALUES_FOR_KEYS[watchKey]

  return (
    <ActionCard
      Icon={WrenchEmoji}
      onRemove={onRemove}
      title={t('title.setItem')}
    >
      {isCreating && (
        <>
          <InputLabel name={t('form.suggestedItems')} />
          <div className="mb-2 flex flex-row flex-wrap gap-1">
            {uniq([...SUGGESTED_KEYS, ...existingKeys]).map((key) => (
              <Button
                key={key}
                center
                disabled={!isCreating}
                onClick={() => {
                  setValue(fieldNamePrefix + 'key', key, {
                    shouldValidate: true,
                  })
                }}
                pressed={watchKey === key}
                size="sm"
                type="button"
                variant="secondary"
              >
                {key}
              </Button>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
        <div className="flex grow basis-0 flex-col gap-1">
          <InputLabel name={t('form.item')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.key}
            fieldName={fieldNamePrefix + 'key'}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.key} />

          {isCreating &&
            watchKey &&
            (currentValue.loading || currentValue.data ? (
              <div className="mt-1 flex flex-row items-center gap-2">
                <InputLabel name={t('form.currentValue') + ':'} />
                {currentValue.loading ? (
                  <Loader fill={false} size={16} />
                ) : (
                  <Button
                    center
                    disabled={!isCreating}
                    onClick={() =>
                      setValue(fieldNamePrefix + 'value', currentValue.data, {
                        shouldValidate: true,
                      })
                    }
                    pressed={watchValue === currentValue.data}
                    size="sm"
                    type="button"
                    variant="secondary"
                  >
                    {currentValue.data}
                  </Button>
                )}
              </div>
            ) : (
              <p className="caption-text mt-1">
                {currentValue.data === null
                  ? t('form.itemNoValueSet')
                  : t('form.itemValueEmpty')}
              </p>
            ))}
        </div>

        <div className="flex grow basis-0 flex-col gap-1">
          <InputLabel name={t('form.value')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.value}
            fieldName={fieldNamePrefix + 'value'}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.value} />

          {isCreating && suggestedValues && (
            <div className="mt-1 space-y-2">
              <InputLabel name={t('form.suggestedValues')} />
              <div className="flex flex-row flex-wrap gap-1">
                {suggestedValues.map((value) => (
                  <Button
                    key={value}
                    center
                    disabled={!isCreating}
                    onClick={() =>
                      setValue(fieldNamePrefix + 'value', value, {
                        shouldValidate: true,
                      })
                    }
                    pressed={watchValue === value}
                    size="sm"
                    type="button"
                    variant="secondary"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ActionCard>
  )
}

const SUGGESTED_KEYS = ['payroll']

const SUGGESTED_VALUES_FOR_KEYS: Record<string, string[] | undefined> = {
  payroll: ['retroactive'],
}

import uniq from 'lodash.uniq'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  InputLabel,
  SegmentedControls,
  SelectInput,
  TextInput,
  WrenchEmoji,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  DAO_CORE_PAYROLL_CONFIG_ITEM_KEY,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface ManageStorageItemsData {
  setting: boolean
  key: string
  value: string
}

export interface ManageStorageItemsOptions {
  existingItems: [string, string][]
}

export const ManageStorageItemsComponent: ActionComponent<
  ManageStorageItemsOptions
> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { existingItems },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue, trigger } = useFormContext()

  const setting = watch(fieldNamePrefix + 'setting')
  const watchKey = watch(fieldNamePrefix + 'key')
  const watchValue = watch(fieldNamePrefix + 'value')

  const suggestedValues = SUGGESTED_VALUES_FOR_KEYS[watchKey]

  const currentValue = existingItems.find(([key]) => key === watchKey)?.[1]

  useEffect(() => {
    trigger(fieldNamePrefix + 'key')
  }, [fieldNamePrefix, trigger])

  return (
    <ActionCard
      Icon={WrenchEmoji}
      onRemove={onRemove}
      title={t('title.manageStorageItems')}
    >
      <SegmentedControls<boolean>
        className="mb-2"
        disabled={!isCreating}
        onSelect={(value) => setValue(fieldNamePrefix + 'setting', value)}
        selected={setting}
        tabs={[
          {
            label: t('title.setItem'),
            value: true,
          },
          {
            label: t('title.removeItem'),
            value: false,
          },
        ]}
      />

      {setting ? (
        <>
          {isCreating && (
            <div className="flex flex-col gap-1">
              <InputLabel name={t('form.suggestedItems')} />
              <div className="flex flex-row flex-wrap gap-1">
                {uniq([
                  ...SUGGESTED_KEYS,
                  ...existingItems.map(([key]) => key),
                ]).map((key) => (
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
            </div>
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
                (currentValue ? (
                  <div className="mt-1 flex flex-row items-center gap-2">
                    <InputLabel name={t('form.currentValue') + ':'} />
                    <Button
                      center
                      disabled={!isCreating}
                      onClick={() =>
                        setValue(fieldNamePrefix + 'value', currentValue, {
                          shouldValidate: true,
                        })
                      }
                      pressed={watchValue === currentValue}
                      size="sm"
                      type="button"
                      variant="secondary"
                    >
                      {currentValue}
                    </Button>
                  </div>
                ) : (
                  <p className="caption-text mt-1">
                    {currentValue === undefined
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
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.item')} />
          <SelectInput
            disabled={!isCreating}
            error={errors?.key}
            fieldName={fieldNamePrefix + 'key'}
            register={register}
            validation={[
              () =>
                existingItems.length > 0 || t('error.noItemsSetUnusableAction'),
              validateRequired,
            ]}
          >
            {existingItems.map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </SelectInput>
          <InputErrorMessage error={errors?.key} />
        </div>
      )}
    </ActionCard>
  )
}

const SUGGESTED_KEYS = [DAO_CORE_PAYROLL_CONFIG_ITEM_KEY]

const SUGGESTED_VALUES_FOR_KEYS: Record<string, string[] | undefined> = {
  [DAO_CORE_PAYROLL_CONFIG_ITEM_KEY]: ['retroactive'],
}

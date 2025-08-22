import { ArrowDropDown, Check } from '@mui/icons-material'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  InputLabel,
  InputThemedText,
  Loader,
  SegmentedControlsTitle,
  Tooltip,
  useActionOptions,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { DaoModule, Module, SuspenseLoaderProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type ManageModulesData<
  Values extends Record<string, unknown> = Record<string, unknown>,
  Extra extends Record<string, unknown> = Record<string, unknown>,
> = {
  mode: 'set' | 'delete'
  id: string
  // Module data type.
  values: Values
  // Module extra data type used only for encoding.
  extra: Extra
}

export type ManageModulesOptions = {
  availableModules: readonly Module[]
  existingModules: DaoModule[]
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const ManageModulesComponent: ActionComponent<ManageModulesOptions> = (
  props
) => {
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { availableModules, existingModules, SuspenseLoader },
  } = props

  const { t } = useTranslation()
  const { setValue, watch, clearErrors } = useFormContext<ManageModulesData>()
  const actionOptions = useActionOptions()

  const mode = watch((fieldNamePrefix + 'mode') as 'mode')
  const moduleId = watch((fieldNamePrefix + 'id') as 'id')

  const existingModule = availableModules.find(
    (module) => module.id === moduleId
  )

  // Memoize so the callbacks don't infinite loop.
  const existingModulesRef = useUpdatingRef(existingModules)

  const selectModule = useCallback(
    ({ id, defaultValues, defaultExtra }: Module) => {
      // Set module ID.
      setValue((fieldNamePrefix + 'id') as 'id', id)
      // Set default values, using existing if present.
      const existingModule = existingModulesRef.current.find(
        (module) => module.id === id
      )
      setValue(
        (fieldNamePrefix + 'values') as 'values',
        // Clone so we don't mutate the default values object.
        cloneDeep(existingModule?.values || defaultValues || {})
      )
      setValue(
        (fieldNamePrefix + 'extra') as 'extra',
        // Clone so we don't mutate the default extra object.
        cloneDeep(defaultExtra || {})
      )
      // Clear errors in case there are any left over from the previous module.
      clearErrors((fieldNamePrefix + 'values') as 'values')
      clearErrors((fieldNamePrefix + 'extra') as 'extra')
    },
    [clearErrors, existingModulesRef, fieldNamePrefix, setValue]
  )

  // When creating, if mode set to 'set', select the first available module. If
  // set to 'delete', reset the module ID to the first existing module, which
  // may be nothing.
  useEffect(() => {
    if (!isCreating) {
      return
    }

    if (mode === 'set' && !moduleId) {
      selectModule(availableModules[0])
    } else if (
      mode === 'delete' &&
      !existingModulesRef.current.some(({ id }) => id === moduleId)
    ) {
      setValue(
        (fieldNamePrefix + 'id') as 'id',
        existingModulesRef.current[0]?.id ?? ''
      )
    }
  }, [
    mode,
    setValue,
    fieldNamePrefix,
    selectModule,
    availableModules,
    isCreating,
    moduleId,
    existingModulesRef,
  ])

  return (
    <>
      <SegmentedControlsTitle
        className="mb-2"
        editable={isCreating}
        fieldName={(fieldNamePrefix + 'mode') as 'mode'}
        tabs={[
          {
            label: t('button.addUpdateModule'),
            value: 'set',
          },
          {
            label: t('button.removeModule'),
            value: 'delete',
          },
        ]}
      />

      {isCreating ? (
        <>
          <div className="space-y-2">
            <InputLabel name={t('form.module')} />

            <FilterableItemPopup
              filterableItemKeys={FILTERABLE_KEYS}
              items={availableModules
                .filter(
                  ({ id }) =>
                    // If setting, show all available modules.
                    mode === 'set' ||
                    // If removing, only show modules that exist.
                    existingModules.some((existing) => existing.id === id)
                )
                .map((module) => ({
                  key: module.id,
                  label: module.title,
                  description: module.description,
                  module,
                  // Show checkmark if module exists when adding/updating
                  // modules.
                  rightNode:
                    mode === 'set' &&
                    existingModules.some(
                      (existing) => existing.id === module.id
                    ) ? (
                      <Tooltip title={t('info.moduleActive')}>
                        <Check className="!h-5 !w-5" />
                      </Tooltip>
                    ) : undefined,
                }))}
              onSelect={({ module }) => selectModule(module)}
              searchPlaceholder={t('info.searchForModule')}
              trigger={{
                type: 'button',
                props: {
                  className: 'self-start',
                  contentContainerClassName: 'justify-between !gap-4',
                  size: 'lg',
                  variant: 'ghost_outline',
                  children: (
                    <>
                      {existingModule ? (
                        <div className="flex flex-col items-start gap-1 text-left">
                          <p>{existingModule.title}</p>
                          <p className="caption-text">
                            {existingModule.description}
                          </p>
                        </div>
                      ) : (
                        <p className="text-text-secondary">
                          {t('button.selectModule')}
                        </p>
                      )}

                      <ArrowDropDown className="!h-6 !w-6 text-icon-primary" />
                    </>
                  ),
                },
              }}
            />
          </div>

          {mode === 'set' && existingModule?.Editor && (
            <SuspenseLoader fallback={<Loader />}>
              <div className="flex flex-col gap-4">
                <existingModule.Editor
                  {...props}
                  accounts={actionOptions.context.accounts}
                  data={props.data.values}
                  errors={errors?.values}
                  extra={props.data.extra}
                  extraErrors={errors?.extra}
                  extraFieldNamePrefix={fieldNamePrefix + 'extra.'}
                  fieldNamePrefix={fieldNamePrefix + 'values.'}
                  options={actionOptions}
                  type="action"
                />
              </div>
            </SuspenseLoader>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <InputThemedText className="!flex-col !items-start !gap-1 self-start">
            <p>{existingModule?.title || moduleId}</p>
            {existingModule && (
              <p className="caption-text">{existingModule.description}</p>
            )}
          </InputThemedText>

          {mode === 'set' && existingModule?.Editor && (
            <SuspenseLoader fallback={<Loader />}>
              <div className="flex flex-col gap-4">
                <existingModule.Editor
                  {...props}
                  accounts={actionOptions.context.accounts}
                  data={props.data.values}
                  extra={props.data.extra}
                  extraErrors={{}}
                  extraFieldNamePrefix={fieldNamePrefix + 'extra.'}
                  fieldNamePrefix={fieldNamePrefix + 'values.'}
                  options={actionOptions}
                  type="action"
                />
              </div>
            </SuspenseLoader>
          )}
        </div>
      )}
    </>
  )
}

const FILTERABLE_KEYS = ['label', 'description']

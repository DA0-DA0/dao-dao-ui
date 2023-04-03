import { ArrowDropDown, VisibilityRounded } from '@mui/icons-material'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useCallback, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  InputLabel,
  InputThemedText,
  Loader,
  SegmentedControlsTitle,
  Tooltip,
} from '@dao-dao/stateless'
import { DaoWidget, SuspenseLoaderProps, Widget } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type ManageWidgetsData = {
  mode: 'set' | 'delete'
  id: string
  // Widget data type.
  values: Record<string, unknown>
}

export type ManageWidgetsOptions = {
  availableWidgets: readonly Widget[]
  existingWidgets: DaoWidget[]
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const ManageWidgetsComponent: ActionComponent<ManageWidgetsOptions> = (
  props
) => {
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { availableWidgets, existingWidgets, SuspenseLoader },
  } = props

  const { t } = useTranslation()
  const { setValue, watch, clearErrors } = useFormContext<ManageWidgetsData>()

  const mode = watch((fieldNamePrefix + 'mode') as 'mode')
  const widgetId = watch((fieldNamePrefix + 'id') as 'id')

  const widget = availableWidgets.find((widget) => widget.id === widgetId)

  // Memoize so the callbacks don't infinite loop.
  const existingWidgetsRef = useRef(existingWidgets)
  existingWidgetsRef.current = existingWidgets

  const selectWidget = useCallback(
    ({ id, defaultValues }: Widget) => {
      // Set widget ID.
      setValue((fieldNamePrefix + 'id') as 'id', id)
      // Set default values, using existing if present.
      const existingWidget = existingWidgetsRef.current.find(
        (widget) => widget.id === id
      )
      setValue(
        (fieldNamePrefix + 'values') as 'values',
        // Clone so we don't mutate the default values object.
        cloneDeep(existingWidget?.values || defaultValues || {})
      )
      // Clear errors for the values in case there are any left over from the
      // previous widget.
      clearErrors((fieldNamePrefix + 'values') as 'values')
    },
    [clearErrors, fieldNamePrefix, setValue]
  )

  // When creating, if mode set to 'set', select the first available widget. If
  // set to 'delete', reset the widget ID to the first existing widget, which
  // may be nothing.
  useEffect(() => {
    if (!isCreating) {
      return
    }

    if (mode === 'set') {
      selectWidget(availableWidgets[0])
    } else if (mode === 'delete') {
      setValue(
        (fieldNamePrefix + 'id') as 'id',
        existingWidgetsRef.current[0]?.id ?? ''
      )
    }
  }, [
    mode,
    setValue,
    fieldNamePrefix,
    selectWidget,
    availableWidgets,
    isCreating,
  ])

  return (
    <>
      <SegmentedControlsTitle
        className="mb-2"
        editable={isCreating}
        fieldName={(fieldNamePrefix + 'mode') as 'mode'}
        tabs={[
          {
            label: t('button.addUpdateWidget'),
            value: 'set',
          },
          {
            label: t('button.removeWidget'),
            value: 'delete',
          },
        ]}
      />

      {isCreating ? (
        <>
          <div className="space-y-2">
            <InputLabel name={t('form.widget')} />

            <FilterableItemPopup
              filterableItemKeys={FILTERABLE_KEYS}
              items={availableWidgets
                .filter(
                  ({ id }) =>
                    // If setting, show all available widgets.
                    mode === 'set' ||
                    // If removing, only show widgets that exist.
                    existingWidgets.some((existing) => existing.id === id)
                )
                .map((widget) => ({
                  key: widget.id,
                  label: t('widgetTitle.' + widget.id),
                  description: t('widgetDescription.' + widget.id),
                  widget,
                  // Show checkmark if widget exists when adding/updating
                  // widgets.
                  rightNode:
                    mode === 'set' &&
                    existingWidgets.some(
                      (existing) => existing.id === widget.id
                    ) ? (
                      <Tooltip title={t('info.widgetActive')}>
                        <VisibilityRounded className="!h-6 !w-6" />
                      </Tooltip>
                    ) : undefined,
                }))}
              onSelect={({ widget }) => selectWidget(widget)}
              searchPlaceholder={t('info.searchForWidget')}
              trigger={{
                type: 'button',
                props: {
                  className: 'self-start',
                  contentContainerClassName: 'justify-between !gap-4',
                  size: 'lg',
                  variant: 'ghost_outline',
                  children: (
                    <>
                      {widget ? (
                        <div className="flex flex-col items-start gap-1 text-left">
                          <p>{t('widgetTitle.' + widget.id)}</p>
                          <p className="caption-text">
                            {t('widgetDescription.' + widget.id)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-text-secondary">
                          {t('button.selectWidget')}
                        </p>
                      )}

                      <ArrowDropDown className="!h-6 !w-6 text-icon-primary" />
                    </>
                  ),
                },
              }}
            />
          </div>

          {mode === 'set' && widget?.Editor && (
            <SuspenseLoader fallback={<Loader />}>
              <div className="flex flex-col gap-4">
                <widget.Editor
                  {...props}
                  errors={errors?.values}
                  fieldNamePrefix={fieldNamePrefix + 'values.'}
                />
              </div>
            </SuspenseLoader>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <InputThemedText className="!flex-col !items-start !gap-1 self-start">
            <p>{widget ? t('widgetTitle.' + widget.id) : widgetId}</p>
            {widget && (
              <p className="caption-text">
                {t('widgetDescription.' + widget.id)}
              </p>
            )}
          </InputThemedText>

          {mode === 'set' && widget?.Editor && (
            <SuspenseLoader fallback={<Loader />}>
              <div className="flex flex-col gap-4">
                <widget.Editor
                  {...props}
                  fieldNamePrefix={fieldNamePrefix + 'values.'}
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

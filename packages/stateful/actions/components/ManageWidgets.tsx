import { ArrowDropDown, Check, Close } from '@mui/icons-material'
import { useCallback, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  FilterableItemPopup,
  InputLabel,
  InputThemedText,
  SegmentedControlsTitle,
  Tooltip,
} from '@dao-dao/stateless'
import { DaoWidget, Widget } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateJSON } from '@dao-dao/utils'

export type ManageWidgetsData = {
  mode: 'set' | 'delete'
  id: string
  values: string
}

export type ManageWidgetsOptions = {
  availableWidgets: readonly Widget[]
  existingWidgets: DaoWidget[]
}

export const ManageWidgetsComponent: ActionComponent<ManageWidgetsOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { availableWidgets, existingWidgets },
}) => {
  const { t } = useTranslation()
  const { setValue, watch, control } = useFormContext<ManageWidgetsData>()

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
        JSON.stringify(existingWidget?.values || defaultValues || {}, null, 2)
      )
    },
    [fieldNamePrefix, setValue]
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
        <div className="flex flex-col gap-2">
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
                // Show checkmark if widget exists when adding/updating widgets.
                rightNode:
                  mode === 'set' &&
                  existingWidgets.some(
                    (existing) => existing.id === widget.id
                  ) ? (
                    <Tooltip title={t('info.widgetActive')}>
                      <Check className="!h-6 !w-6" />
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
                      <div className="flex flex-col items-start gap-1">
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

          {mode === 'set' && (
            <>
              <InputLabel className="mt-2" name={t('form.options')} />

              <CodeMirrorInput
                control={control}
                error={errors?.values}
                fieldName={(fieldNamePrefix + 'values') as 'values'}
                validation={[validateJSON]}
              />

              {errors?.values ? (
                <p className="flex items-center gap-1 text-sm text-text-interactive-error">
                  <Close className="!h-5 !w-5" />{' '}
                  <span>{errors.values.message}</span>
                </p>
              ) : (
                <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
                  <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
                </p>
              )}
            </>
          )}
        </div>
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

          {mode === 'set' && (
            <div className="space-y-1">
              <InputLabel name={t('form.options')} />
              <CodeMirrorInput
                control={control}
                fieldName={(fieldNamePrefix + 'values') as 'values'}
                readOnly
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

const FILTERABLE_KEYS = ['label', 'description']

import { Add, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useState } from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  ActionCategoryWithLabel,
  ActionKey,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types/actions'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { FilterableItemPopup } from '../popup/FilterableItemPopup'
import { Tooltip } from '../tooltip'
import { ActionCard } from './ActionCard'
import { ActionCategoryActionPickerCard } from './ActionCategoryActionPickerCard'
import { ACTION_CATEGORY_SELECTOR_FILTERABLE_KEYS } from './ActionCategorySelector'

// The props needed to render an action from a message.
export type ActionsEditorProps = {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  actionDataFieldName: string
  actionDataErrors:
    | FieldErrors<PartialCategorizedActionKeyAndData[]>
    | undefined
  className?: string
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

type GroupedPartialCategorizedActionKeyAndData = Omit<
  PartialCategorizedActionKeyAndData,
  'data'
> & {
  all: {
    // Index of data in `actionData` list.
    index: number
    data: any
  }[]
}

// Groups actions together and renders editable cards.
export const ActionsEditor = ({
  categories,
  loadedActions,
  actionDataFieldName,
  actionDataErrors,
  className,
  SuspenseLoader,
}: ActionsEditorProps) => {
  const { watch } = useFormContext<{
    actionData: PartialCategorizedActionKeyAndData[]
  }>()
  // All categorized actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []

  // Group action data by action by combining each action's data into a group so
  // they can be rendered together.
  const groupedActionData = actionData.reduce((acc, field, index) => {
    const { categoryKey, actionKey, data } = field

    // If no action is selected, add new group since still picking action from
    // category.
    if (!actionKey) {
      return [
        ...acc,
        {
          categoryKey,
          actionKey,
          all: [{ index, data }],
        },
      ]
    }

    // Get category from loaded actions if key is undefined. It should only be
    // undefined if the action data is loaded from a duplicate/prefill.
    const category = categoryKey
      ? categories.find((c) => c.key === categoryKey)
      : loadedActions[actionKey]?.category

    // Should never happen.
    if (!category) {
      throw new Error(
        `No category found for action ${actionKey} in loaded actions.`
      )
    }

    // Find existing group for action.
    const existingGroup = acc.find((group) => group.actionKey === actionKey)
    if (existingGroup) {
      // Add data to existing group.
      existingGroup.all.push({ index, data })
    } else {
      // or create new group if action does not yet exist.
      acc.push({
        categoryKey: category.key,
        actionKey,
        all: [{ index, data }],
      })
    }

    return acc
  }, [] as GroupedPartialCategorizedActionKeyAndData[])

  return groupedActionData.length > 0 ? (
    <div className={clsx('flex flex-col gap-2', className)}>
      {groupedActionData.map((group, index) => (
        <div key={index} className="group relative" id={`A${index + 1}`}>
          <ActionEditor
            {...group}
            SuspenseLoader={SuspenseLoader}
            actionDataErrors={actionDataErrors}
            actionDataFieldName={actionDataFieldName}
            categories={categories}
            loadedActions={loadedActions}
          />
        </div>
      ))}
    </div>
  ) : null
}

export type ActionEditorProps = GroupedPartialCategorizedActionKeyAndData & {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  actionDataFieldName: string

  // The errors for all actions, pointed to by `actionsFieldName` above.
  actionDataErrors:
    | FieldErrors<PartialCategorizedActionKeyAndData[]>
    | undefined
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

// Renders a group of data that belong to the same action, or a category action
// picker if no action is selected.
export const ActionEditor = ({
  categories,
  loadedActions,
  actionDataFieldName: _actionDataFieldName,
  actionDataErrors,

  categoryKey,
  actionKey,
  all,
  SuspenseLoader,
}: ActionEditorProps) => {
  const { t } = useTranslation()
  const { control, watch, setValue, clearErrors } = useFormContext<{
    actionData: PartialCategorizedActionKeyAndData[]
  }>()

  // Type assertion assumes the passed in field name is correct.
  const actionDataFieldName = _actionDataFieldName as 'actionData'
  const { append, remove } = useFieldArray({
    name: actionDataFieldName,
    control,
  })

  // All categorized actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []

  const [changeCategoryOpen, setChangeCategoryOpen] = useState(false)

  // Clear all errors when the action is removed, in case any manual errors were
  // not cleaned up. If manual errors persist, the form gets stuck.
  const onRemove = () => {
    // Clear all errors for this action.
    all.forEach(({ index }) => clearErrors(`${actionDataFieldName}.${index}`))

    // Remove all entries for this action. Remove the indices in reverse order
    // to prevent the indices from changing. This assumes `all` is ordered by
    // ascending index.
    all.reverse().forEach(({ index }) => remove(index))
  }

  // If no action, render category picker.
  if (!actionKey) {
    // If action and data are not set, category must be set. Otherwise, we can't
    // render anything.
    const category =
      categoryKey && categories.find((category) => category.key === categoryKey)
    if (!category) {
      return null
    }

    // A category picker must have exactly one corresponding action data field
    // so we can retrieve what index to update.
    const index = all[0]?.index
    if (typeof index !== 'number') {
      return null
    }

    return (
      <>
        <ActionCategoryActionPickerCard
          category={category}
          onChangeCategory={() => setChangeCategoryOpen(true)}
          onRemove={onRemove}
          onSelectAction={({ key }) => {
            const action = loadedActions[key]
            if (!action) {
              return
            }

            // Update the first action key and data.
            setValue(`${actionDataFieldName}.${index}.actionKey`, key)
            setValue(
              `${actionDataFieldName}.${index}.data`,
              // Clone to prevent the form from mutating the original object.
              cloneDeep(action.defaults ?? {})
            )
          }}
          usedActionKeys={
            actionData
              .map(({ actionKey }) => actionKey)
              .filter(Boolean) as ActionKey[]
          }
        />

        <FilterableItemPopup
          filterableItemKeys={ACTION_CATEGORY_SELECTOR_FILTERABLE_KEYS}
          items={categories.map((category) => ({
            ...category,
            selected: category.key === categoryKey,
          }))}
          onSelect={({ key }) => {
            // Change category key.
            setValue(`${actionDataFieldName}.${index}.categoryKey`, key)
          }}
          searchPlaceholder={t('info.findCategory')}
          trigger={{
            type: 'manual',
            open: changeCategoryOpen,
            setOpen: setChangeCategoryOpen,
          }}
        />
      </>
    )
  }

  const loadedAction = loadedActions[actionKey]
  if (!loadedAction) {
    return null
  }

  const { category, action } = loadedAction

  const goBackToCategoryPicker = () => {
    // Remove all entries for this action except the first one so that it
    // reverts back to a single category picker. Remove the indices in reverse
    // order to prevent the indices from changing. This assumes `all` is ordered
    // by ascending index.
    all
      .slice(1)
      .reverse()
      .forEach(({ index }) => remove(index))

    // Clear action key and data for the first entry, preserving the category
    // key. Set the category key in case it is undefined. A category key may be
    // undefined if an action was duplicated, prefilled, or manually added from
    // another action.
    const index = all[0].index
    setValue(`${actionDataFieldName}.${index}.categoryKey`, category.key)
    setValue(`${actionDataFieldName}.${index}.actionKey`, undefined)
    setValue(`${actionDataFieldName}.${index}.data`, undefined)
    // Clear errors on action data if any left over.
    clearErrors(`${actionDataFieldName}.${index}.data`)
  }

  return (
    <ActionCard
      action={action}
      category={category}
      onCategoryClick={goBackToCategoryPicker}
      onRemove={onRemove}
    >
      {all.map(({ index, data }) => {
        const removeAction = () => {
          clearErrors(`${actionDataFieldName}.${index}`)
          remove(index)
        }

        return (
          <div
            key={
              // Re-render when the action at a given position changes.
              `${index}-${actionKey}`
            }
            className="flex animate-fade-in flex-row items-start gap-4"
          >
            <div className="flex min-w-0 grow flex-col gap-4">
              <SuspenseLoader fallback={<Loader size={36} />}>
                <action.Component
                  addAction={append}
                  allActionsWithData={actionData}
                  data={data}
                  errors={actionDataErrors?.[index]?.data || {}}
                  fieldNamePrefix={`${actionDataFieldName}.${index}.data.`}
                  index={index}
                  isCreating
                  remove={removeAction}
                />
              </SuspenseLoader>
            </div>

            {/* Show remove button if action is resuable OR if there are more than one action. If there are more than one action, individual ones should be removable. But if there is only one, which is the intended state for an action configured as not reusable, don't show the remove button. */}
            {(!action.notReusable || all.length > 1) && (
              <Tooltip title={t('button.remove')}>
                <IconButton
                  Icon={Remove}
                  circular
                  onClick={() => {
                    // If only one action left, go back to category picker.
                    if (all.length === 1) {
                      goBackToCategoryPicker()
                    } else {
                      // Otherwise just remove this action.
                      removeAction()
                    }
                  }}
                  size="sm"
                  variant="secondary"
                />
              </Tooltip>
            )}
          </div>
        )
      })}

      {/* Don't show add button if action is not reusable. */}
      {!action.notReusable && (
        <Tooltip
          title={t('button.addAnotherAction', {
            action: action.label,
          })}
        >
          <IconButton
            Icon={Add}
            circular
            className="self-end"
            onClick={() =>
              // Make another entry for the same action with the default values.
              append({
                categoryKey,
                actionKey,
                data: cloneDeep(loadedAction.defaults ?? {}),
              })
            }
            size="sm"
            variant="secondary"
          />
        </Tooltip>
      )}
    </ActionCard>
  )
}

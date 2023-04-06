import { Add, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useCallback, useState } from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  ActionCategoryWithLabel,
  ActionKey,
  LoadedActions,
  PartialCategorizedActionAndData,
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

type GroupedActionData = Omit<
  PartialCategorizedActionAndData,
  'data' | 'category'
> & {
  category: ActionCategoryWithLabel
  actionDefaults: any
  all: {
    _id: string
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

  // Group action data by adjacent action, preserving order. Adjacent data of
  // the same action are combined into a group so they can be rendered together.
  const groupedActionData = actionData.reduce(
    (
      acc,
      { _id, categoryKey, actionKey, data },
      index
    ): GroupedActionData[] => {
      const loadedAction = actionKey && loadedActions[actionKey]

      // Get category from loaded action if key is undefined. It should only be
      // undefined if the action data is loaded from a duplicate/prefill or
      // bulk import.
      const category = categoryKey
        ? categories.find((c) => c.key === categoryKey)
        : loadedAction?.category

      // If no action and no category, skip. This is likely due to a cached
      // action in the saved form that no longer exists, or was used and is no
      // longer usable (such as enabling multiple choice). If action key is
      // defined but no action is found, same thing.
      if (!category || (actionKey && !loadedAction)) {
        return acc
      }

      // If no action is selected, add new group since still picking action from
      // category.
      if (!loadedAction) {
        return [
          ...acc,
          {
            category,
            action: undefined,
            actionDefaults: {},
            all: [
              {
                _id,
                index,
                data,
              },
            ],
          },
        ]
      }

      // If most recent group is for the current action, add the current
      // action's data to the most recent group.
      const lastGroup = acc[acc.length - 1]
      if (lastGroup?.action && lastGroup.action.key === actionKey) {
        // Add data to group.
        lastGroup.all.push({
          _id,
          index,
          data,
        })
      } else {
        // or create new group if previously adjacent group is for a different
        // action.
        acc.push({
          category,
          action: loadedAction.action,
          actionDefaults: loadedAction.defaults,
          all: [
            {
              _id,
              index,
              data,
            },
          ],
        })
      }

      return acc
    },
    [] as GroupedActionData[]
  )

  return groupedActionData.length > 0 ? (
    <div className={clsx('flex flex-col gap-2', className)}>
      {groupedActionData.map((group, index) => (
        <div
          key={
            // Re-render when the group at a given position changes.
            `${index}-${group.category.key}`
          }
          className="group relative"
          id={`A${index + 1}`}
        >
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

export type ActionEditorProps = GroupedActionData & {
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

  category,
  action,
  actionDefaults,
  all,
  SuspenseLoader,
}: ActionEditorProps) => {
  const { t } = useTranslation()
  const { control, watch, setValue, clearErrors } = useFormContext<{
    actionData: PartialCategorizedActionKeyAndData[]
  }>()

  // Type assertion assumes the passed in field name is correct.
  const actionDataFieldName = _actionDataFieldName as 'actionData'
  const { append, insert, remove } = useFieldArray({
    name: actionDataFieldName,
    control,
  })
  const addAction = useCallback(
    (data: Omit<PartialCategorizedActionKeyAndData, '_id'>) =>
      append({
        // See `CategorizedActionKeyAndData` comment in
        // `packages/types/actions.ts` for an explanation of why we need to
        // append with a unique ID.
        _id: uuidv4(),
        ...data,
      }),
    [append]
  )

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
  if (!action) {
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
          onSelectAction={({ key }, event) => {
            const action = loadedActions[key]
            if (!action) {
              return
            }

            // If holding shift, add as a new action.
            if (event.shiftKey) {
              addAction({
                categoryKey: category.key,
                actionKey: key,
                // Clone to prevent the form from mutating the original object.
                data: cloneDeep(action.defaults ?? {}),
              })
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
          items={categories.map((c) => ({
            ...c,
            selected: c.key === category.key,
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
      actionCount={all.length}
      category={category}
      onCategoryClick={goBackToCategoryPicker}
      onRemove={onRemove}
    >
      {all.map(({ _id, index, data }) => {
        const removeAction = () => {
          clearErrors(`${actionDataFieldName}.${index}`)
          remove(index)
        }

        return (
          <div
            key={
              // If _id empty, likely due to an old saved form state, use index
              // and action as re-render key. Using a unique `key` ensures that
              // the action does not re-render when other parts of the form
              // change.
              _id || `${index}-${action.key}`
            }
            className="flex animate-fade-in flex-row items-start gap-4"
          >
            <div className="flex min-w-0 grow flex-col gap-4">
              <SuspenseLoader fallback={<Loader size={36} />}>
                <action.Component
                  addAction={addAction}
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
              // Insert another entry for the same action with the default
              // values after the last one in this group.
              insert(all[all.length - 1].index + 1, {
                // See `CategorizedActionKeyAndData` comment in
                // `packages/types/actions.ts` for an explanation of why we need
                // to insert with a unique ID.
                _id: uuidv4(),
                categoryKey: category.key,
                actionKey: action.key,
                data: cloneDeep(actionDefaults),
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

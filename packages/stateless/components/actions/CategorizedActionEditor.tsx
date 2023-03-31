import Fuse from 'fuse.js'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard, FilterableItemPopup, Loader } from '@dao-dao/stateless'
import {
  ActionCategoryWithLabel,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
  SuspenseLoaderProps,
} from '@dao-dao/types'

import { ActionCategoryActionPickerCard } from './ActionCategoryActionPickerCard'

export type CategorizedActionEditorProps =
  PartialCategorizedActionKeyAndData & {
    categories: ActionCategoryWithLabel[]
    loadedActions: LoadedActions
    // The field name that contains all action data, which is expected to be of
    // type `PartialCategorizedActionKeyAndData[]`.
    actionDataFieldName: string
    // The index of this action in the form's field array at `actionsFieldName`.
    index: number
    onRemove: () => void
    // The errors for this particular action, *not* all actions like the
    // `actionsFieldName` above.
    actionErrors: FieldErrors
    addAction: (action: PartialCategorizedActionKeyAndData) => void
    SuspenseLoader: ComponentType<SuspenseLoaderProps>
  }

// A category and action combo editor. If the action is selected, renders
// the selected action's editor. Otherwise, shows the list of actions in the
// category that can be selected.
export const CategorizedActionEditor = ({
  categories,
  loadedActions,
  actionDataFieldName,
  index,
  onRemove: _onRemove,
  actionErrors,
  addAction,
  SuspenseLoader,

  categoryKey,
  actionKey,
  data,
}: CategorizedActionEditorProps) => {
  const { t } = useTranslation()
  const { watch, clearErrors, setValue } = useFormContext<{
    actionData: PartialCategorizedActionKeyAndData[]
  }>()

  const [changeCategoryOpen, setChangeCategoryOpen] = useState(false)

  // All actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []
  // The prefix for this action's field names.
  const actionFieldName =
    `${actionDataFieldName}.${index}` as `actionData.${number}`

  // Clear all errors when the action is removed, in case any manual errors were
  // not cleaned up. If manual errors persist, the form gets stuck.
  const onRemove = () => {
    // Clear all errors for this action.
    clearErrors(actionFieldName)

    // Remove the action from the form.
    _onRemove()
  }

  if (!actionKey || !data) {
    // If action and data are not set, category must be set. Otherwise, we can't
    // render anything.
    if (!categoryKey) {
      return null
    }

    const category = categories.find((category) => category.key === categoryKey)
    if (!category) {
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

            // Update the action key and data.
            setValue(`${actionFieldName}.actionKey`, key)
            setValue(
              `${actionFieldName}.data`,
              // Clone to prevent the form from mutating the original object.
              cloneDeep(action.defaults ?? {})
            )
          }}
        />

        <FilterableItemPopup
          filterableItemKeys={FILTERABLE_KEYS}
          items={categories.map((category) => ({
            ...category,
            selected: category.key === categoryKey,
          }))}
          onSelect={({ key }) => {
            // Change category key.
            setValue(`${actionFieldName}.categoryKey`, key)
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

  return (
    <ActionCard
      action={action}
      category={category}
      onCategoryClick={() => {
        // Clear action key and data, preserving the category key.
        setValue(`${actionFieldName}.actionKey`, undefined)
        setValue(`${actionFieldName}.data`, undefined)
        // Clear errors on action data if any left over.
        clearErrors(`${actionFieldName}.data`)
      }}
      onRemove={onRemove}
    >
      <SuspenseLoader fallback={<Loader />}>
        <action.Component
          addAction={addAction}
          allActionsWithData={actionData}
          data={data}
          errors={actionErrors?.data || {}}
          fieldNamePrefix={actionFieldName + '.data.'}
          index={index}
          isCreating
        />
      </SuspenseLoader>
    </ActionCard>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<ActionCategoryWithLabel>[] = [
  'label',
  'description',
]

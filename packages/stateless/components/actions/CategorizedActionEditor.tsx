import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useEffect } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'

import { ActionCard, Loader } from '@dao-dao/stateless'
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

export const CategorizedActionEditor = ({
  categories,
  loadedActions,
  actionDataFieldName,
  index,
  onRemove,
  actionErrors,
  addAction,
  SuspenseLoader,

  categoryKey,
  actionKey,
  data,
}: CategorizedActionEditorProps) => {
  const { watch, setError, clearErrors, setValue } = useFormContext<{
    actionData: PartialCategorizedActionKeyAndData[]
  }>()

  // All actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []
  // The prefix for this action's field names.
  const actionFieldName =
    `${actionDataFieldName}.${index}` as `actionData.${number}`

  // Set error if no action is selected.
  useEffect(() => {
    if (!actionKey) {
      setError(`${actionFieldName}.actionKey`, {
        type: 'manual',
        message: 'Please select an action.',
      })
    } else {
      clearErrors(`${actionFieldName}.actionKey`)
    }
  }, [actionKey, clearErrors, actionFieldName, setError])

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
      <ActionCategoryActionPickerCard
        category={category}
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
      goBackToCategory={() => {
        // Clear action key and data, preserving the category key.
        setValue(`${actionFieldName}.actionKey`, undefined)
        setValue(`${actionFieldName}.data`, undefined)
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

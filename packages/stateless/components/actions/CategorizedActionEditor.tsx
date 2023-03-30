import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useEffect } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'

import { ActionCard, Loader } from '@dao-dao/stateless'
import {
  ActionCategoryWithLabel,
  CategorizedActionKeyAndData,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
  SuspenseLoaderProps,
} from '@dao-dao/types'

import { ActionCategoryActionPickerCard } from './ActionCategoryActionPickerCard'

export type CategorizedActionEditorProps =
  PartialCategorizedActionKeyAndData & {
    categories: ActionCategoryWithLabel[]
    loadedActions: LoadedActions
    fieldNamePrefix: string
    allActionsWithData: CategorizedActionKeyAndData[]
    index: number
    onRemove: () => void
    errors: FieldErrors
    addAction: (action: PartialCategorizedActionKeyAndData) => void
    isCreating: boolean
    SuspenseLoader: ComponentType<SuspenseLoaderProps>
  }

export const CategorizedActionEditor = ({
  categories,
  loadedActions,
  fieldNamePrefix,
  allActionsWithData,
  index,
  onRemove,
  errors,
  addAction,
  isCreating,
  SuspenseLoader,

  categoryKey,
  actionKey,
  data,
}: CategorizedActionEditorProps) => {
  const { setError, clearErrors, setValue } =
    useFormContext<PartialCategorizedActionKeyAndData>()

  // Set error if no action is selected.
  useEffect(() => {
    if (!actionKey) {
      setError((fieldNamePrefix + 'actionKey') as 'actionKey', {
        type: 'manual',
        message: 'Please select an action.',
      })
    } else {
      clearErrors((fieldNamePrefix + 'actionKey') as 'actionKey')
    }
  }, [actionKey, clearErrors, fieldNamePrefix, setError])

  if (!actionKey || !data) {
    // If not creating, we should never have an action without data. If action
    // and data are not set, category must be set. Otherwise, we can't render
    // anything.
    if (!isCreating || !categoryKey) {
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
          setValue((fieldNamePrefix + 'actionKey') as 'actionKey', key)
          setValue(
            (fieldNamePrefix + 'data') as 'data',
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
      Icon={action.Icon}
      onRemove={onRemove}
      title={`${category.label} > ${action.label}`}
    >
      <SuspenseLoader fallback={<Loader />}>
        <action.Component
          allActionsWithData={allActionsWithData}
          data={data}
          fieldNamePrefix={fieldNamePrefix + 'data.'}
          index={index}
          {...(isCreating
            ? {
                isCreating,
                errors: errors?.data || {},
                addAction,
                onRemove,
              }
            : {
                isCreating,
              })}
        />
      </SuspenseLoader>
    </ActionCard>
  )
}

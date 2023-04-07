import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { v4 as uuidv4 } from 'uuid'

import {
  ActionCategoryWithLabel,
  ActionComponent,
  CosmosMsgFor_Empty,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import { convertActionsToMessages } from '@dao-dao/utils'

import { Loader } from '../logo'
import { ActionCategorySelector } from './ActionCategorySelector'
import { ActionsEditor } from './ActionsEditor'

export type NestedActionsEditorOptions = {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export type NestedActionsEditorFormData = {
  msgs: CosmosMsgFor_Empty[]

  // Internal action data so that errors are added to main form.
  _actionData?: PartialCategorizedActionKeyAndData[]
}

export const NestedActionsEditor: ActionComponent<
  NestedActionsEditorOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { categories, loadedActions, SuspenseLoader },
}) => {
  const { watch, control, setValue, clearErrors, setError } =
    useFormContext<NestedActionsEditorFormData>()

  const { append } = useFieldArray({
    name: (fieldNamePrefix + '_actionData') as '_actionData',
    control,
  })

  const actionData =
    watch((fieldNamePrefix + '_actionData') as '_actionData') || []

  // Update action msgs from actions form data.
  let msgs: CosmosMsgFor_Empty[] = []
  try {
    msgs = convertActionsToMessages(loadedActions, actionData)

    if (errors?.msgs) {
      clearErrors((fieldNamePrefix + 'msgs') as 'msgs')
    }
  } catch (err) {
    console.error(err)

    if (!errors?.msgs) {
      setError((fieldNamePrefix + 'msgs') as 'msgs', {
        type: 'manual',
        message: err instanceof Error ? err.message : `${err}`,
      })
    }
  }

  useDeepCompareEffect(() => {
    if (msgs) {
      setValue((fieldNamePrefix + 'msgs') as 'msgs', msgs)
    }
  }, [msgs])

  return (
    <div className="flex flex-col">
      <ActionsEditor
        SuspenseLoader={SuspenseLoader}
        actionDataErrors={errors?._actionData}
        actionDataFieldName={fieldNamePrefix + '_actionData'}
        categories={categories}
        className="mb-4"
        loadedActions={loadedActions}
      />

      {categories.length === 0 ? (
        <Loader />
      ) : (
        <div className="self-start">
          <ActionCategorySelector
            categories={categories}
            onSelectCategory={({ key }) => {
              append({
                // See `CategorizedActionKeyAndData` comment in
                // `packages/types/actions.ts` for an explanation of why we need
                // to append with a unique ID.
                _id: uuidv4(),
                categoryKey: key,
              })
            }}
          />
        </div>
      )}
    </div>
  )
}

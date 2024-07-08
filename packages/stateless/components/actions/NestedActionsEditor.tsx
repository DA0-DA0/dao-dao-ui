import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {
  ActionCategoryWithLabel,
  ActionComponent,
  LoadedActions,
  NestedActionsEditorFormData,
  SuspenseLoaderProps,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { convertActionsToMessages } from '@dao-dao/utils'

import { Loader } from '../logo'
import { ActionsEditor } from './ActionsEditor'

export type NestedActionsEditorOptions = {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const NestedActionsEditor: ActionComponent<
  NestedActionsEditorOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { categories, loadedActions, SuspenseLoader },
}) => {
  const { watch, setValue, clearErrors, setError } =
    useFormContext<NestedActionsEditorFormData>()

  const actionData =
    watch((fieldNamePrefix + '_actionData') as '_actionData') || []

  // Update action msgs from actions form data.
  let msgs: UnifiedCosmosMsg[] = []
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
    <div className="flex flex-col gap-4">
      <ActionsEditor
        SuspenseLoader={SuspenseLoader}
        actionDataErrors={errors?._actionData}
        actionDataFieldName={fieldNamePrefix + '_actionData'}
        categories={categories}
        loadedActions={loadedActions}
      />

      {categories.length === 0 && <Loader />}
    </div>
  )
}

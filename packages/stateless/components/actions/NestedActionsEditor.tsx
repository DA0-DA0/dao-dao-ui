import { ComponentType, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  ActionComponent,
  ActionEncodeContext,
  NestedActionsEditorFormData,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import { encodeActions } from '@dao-dao/utils'

import { useActionsContext } from '../../contexts'
import { useLoadingPromise, useRateLimitUpdates } from '../../hooks'
import { InputErrorMessage } from '../inputs'
import { ActionsEditor } from './ActionsEditor'

export type NestedActionsEditorOptions = {
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  encodeContext: ActionEncodeContext
}

export const NestedActionsEditor: ActionComponent<
  NestedActionsEditorOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { SuspenseLoader, encodeContext },
}) => {
  const { actionMap } = useActionsContext()
  const { watch, setValue, clearErrors, setError } =
    useFormContext<NestedActionsEditorFormData>()

  const formActionData =
    watch((fieldNamePrefix + '_actionData') as '_actionData') || []

  // Rate limit updating msgs from form data.
  const { value: actionData, iteration: actionDataUpdateId } =
    useRateLimitUpdates({
      value: formActionData,
      delay: 1000,
      // Update whenever the action data changes.
      deps: [JSON.stringify(formActionData)],
    })

  // Update msgs from actions form data.
  const msgs = useLoadingPromise({
    promise: actionData.length
      ? () =>
          encodeActions({
            actionMap,
            encodeContext,
            data: actionData,
          })
      : () => Promise.resolve([]),
    // Update whenever the action data debounce updates.
    deps: [actionMap, actionData, actionDataUpdateId],
  })

  useEffect(() => {
    if (msgs.loading) {
      return
    }

    if (msgs.errored) {
      console.error(msgs.error)
      setError((fieldNamePrefix + 'msgs') as 'msgs', {
        type: 'manual',
        message: msgs.error.message,
      })
      return
    }

    clearErrors((fieldNamePrefix + 'msgs') as 'msgs')
    setValue((fieldNamePrefix + 'msgs') as 'msgs', msgs.data)
  }, [clearErrors, fieldNamePrefix, msgs, setError, setValue])

  return (
    <div className="flex flex-col gap-4">
      <ActionsEditor
        SuspenseLoader={SuspenseLoader}
        actionDataErrors={errors?._actionData}
        actionDataFieldName={fieldNamePrefix + '_actionData'}
        hideEmptyPlaceholder
      />

      <InputErrorMessage className="!m-0" error={errors?.msgs} />
    </div>
  )
}

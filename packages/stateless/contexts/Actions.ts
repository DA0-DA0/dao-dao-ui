import { createContext, useContext } from 'react'

import { LoadingDataWithError } from '@dao-dao/types'
import { Action, ActionKey, IActionsContext } from '@dao-dao/types/actions'

import { useLoadingPromise } from '../hooks'

export const ActionsContext = createContext<IActionsContext | null>(null)

export const useActionsContext = (): IActionsContext => {
  const context = useContext(ActionsContext)

  if (!context) {
    throw new Error(
      'useActionsContext can only be used in a descendant of an Actions provider.'
    )
  }

  return context
}

/**
 * Get the options passed to actions.
 */
export const useActionOptions = () => useActionsContext().options

/**
 * Get all relevant actions.
 */
export const useActions = () => useActionsContext().actions

/**
 * Get all relevant action categories.
 */
export const useActionCategories = () => useActionsContext().categories

/**
 * Get an action from its key, if its valid in the current context. Only core
 * actions are always provided. Adapter-specific actions may be available but
 * are not guaranteed based on the context.
 */
export const useActionForKey = (
  actionKey: ActionKey
): Action<any> | undefined => useActionsContext().actionMap[actionKey]

/**
 * Get an action from its key, if its valid in the current context, making sure
 * to initialize it. Only core actions are always provided. Adapter-specific
 * actions may be available but are not guaranteed based on the context.
 */
export const useInitializedActionForKey = (
  ...params: Parameters<typeof useActionForKey>
): LoadingDataWithError<Action<any>> => {
  const action = useActionForKey(...params)
  return useLoadingPromise({
    promise: async () => {
      if (!action) {
        throw new Error('Action not found')
      }
      if (!action.ready) {
        await action.init()
      }
      return action
    },
    deps: [action, action?.status],
  })
}

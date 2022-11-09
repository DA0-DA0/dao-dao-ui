import { createContext, useContext, useMemo } from 'react'

import { Action, CoreActionKey, IActionsContext } from '@dao-dao/types/actions'

//! External

export const ActionsContext = createContext<IActionsContext | null>(null)

const useActionsContext = (): IActionsContext => {
  const context = useContext(ActionsContext)

  if (!context) {
    throw new Error(
      'useActionsContext can only be used in a descendant of ActionsProviderProps.'
    )
  }

  return context
}

export const useCoreActions = (additionalActions?: Action[]): Action[] => {
  const baseActions = useActionsContext().actions

  return useMemo(
    () =>
      baseActions
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [additionalActions, baseActions]
  )
}

// Only core actions are provided by the top-level context. Adapter-specific
// actions are only available in the adapter.
export const useCoreActionForKey = (actionKey: CoreActionKey) =>
  useCoreActions().find(({ key }) => key === actionKey)

//! Internal

// For internal use to pass around options.
export const useActionOptions = () => useActionsContext().options

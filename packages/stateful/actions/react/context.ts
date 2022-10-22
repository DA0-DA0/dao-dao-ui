import { createContext, useContext, useMemo } from 'react'

import { Action, ActionKey, IActionsContext } from '@dao-dao/types/actions'

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

export const useActions = (additionalActions?: Action[]): Action[] => {
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
export const useActionForKey = (actionKey: ActionKey) =>
  useActions().find(({ key }) => key === actionKey)

//! Internal

// For internal use to pass around options.
export const useActionOptions = () => useActionsContext().options

import { createContext, useContext } from 'react'

import {
  Action,
  ActionKey,
  CoreActionKey,
  IActionsContext,
  LoadedActions,
} from '@dao-dao/types/actions'

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

export const useActions = (additionalActions?: Action[]): Action[] =>
  useActionsContext()
    .actions.concat(additionalActions ?? [])
    // Sort alphabetically.
    .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))

// Only core actions are always provided by the top-level context.
// Adapter-specific actions may be available but are not guaranteed.
export const useActionForKey = (actionKey: ActionKey) =>
  useActions().find(({ key }) => key === actionKey)

// Access options passed to actions.
export const useActionOptions = () => useActionsContext().options

// This hook returns actions ordered for matching. It ensures the last two
// actions are execute smart contract followed by custom, since a lot of actions
// are smart contract executions, and custom is a catch-all that will display
// any message. Do this by assigning values and sorting the actions in ascending
// order.
const keyToValue = (key: ActionKey) =>
  key === CoreActionKey.Execute ? 1 : key === CoreActionKey.Custom ? 2 : 0

export const useOrderedActionsToMatch = (actions: Action[]): Action[] => {
  const orderedActions = actions.sort((a, b) => {
    const aValue = keyToValue(a.key)
    const bValue = keyToValue(b.key)
    return aValue - bValue
  })

  return orderedActions
}

// Call relevant action hooks in the same order every time. This would likely be
// called on the output of useActions.
export const useLoadActions = (actions: Action[]): LoadedActions =>
  actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(),
        defaults: action.useDefaults(),
      },
    }),
    {}
  )

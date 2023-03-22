import { createContext, useContext } from 'react'

import {
  Action,
  ActionKey,
  CoreActionKey,
  IActionsContext,
  LoadedActions,
  UseActionsOptions,
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

export const useActions = (
  additionalActions?: Action[],
  { isCreating = false }: UseActionsOptions = {}
): Action[] =>
  useActionsContext()
    .actions.concat(additionalActions ?? [])
    // Filter out actions which are not allowed to be created. This is used to
    // hide the upgrade actions from the list of actions to create.
    .filter((action) => !isCreating || !action.disallowCreation)
    // Sort alphabetically.
    .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))

// Only core actions are always provided by the top-level context.
// Adapter-specific actions may be available but are not guaranteed.
export const useActionForKey = (actionKey: ActionKey) =>
  useActions().find(({ key }) => key === actionKey)

// Access options passed to actions.
export const useActionOptions = () => useActionsContext().options

// This returns the order value of an action for matching. It ensures the last
// four actions are set items, migrate smart contract, execute smart contract,
// and custom, since these are all catch-alls for other actions, custom being
// the broadest catch-all for all messages. Do this by assigning values and
// sorting the actions in ascending order.
const actionKeyToMatchOrder = (key: ActionKey) =>
  (
    [
      CoreActionKey.ManageStorageItems,
      CoreActionKey.Migrate,
      CoreActionKey.Execute,
      CoreActionKey.Custom,
    ] as ActionKey[]
  ).indexOf(key)

export const useOrderedActionsToMatch = (actions: Action[]): Action[] => {
  const orderedActions = actions.sort((a, b) => {
    const aValue = actionKeyToMatchOrder(a.key)
    const bValue = actionKeyToMatchOrder(b.key)
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

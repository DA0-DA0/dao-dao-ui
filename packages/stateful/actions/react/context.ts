import { createContext, useContext, useMemo } from 'react'

import {
  ActionCategoryWithLabel,
  ActionKey,
  CategorizedAction,
  IActionsContext,
  LoadedActions,
  UseActionsOptions,
} from '@dao-dao/types/actions'

import { actionKeyToMatchOrder } from './utils'

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

export const useActionCategories = ({
  isCreating = true,
}: UseActionsOptions = {}): ActionCategoryWithLabel[] => {
  const categories = useActionsContext().categories

  return useMemo(
    () =>
      categories
        .map((c) =>
          // Filter out actions which are not allowed to be manually chosen.
          !isCreating
            ? c
            : {
                ...c,
                actions: c.actions.filter(
                  (action) => !action.hideFromPicker && !action.programmaticOnly
                ),
              }
        )
        // Filter out categories with no actions.
        .filter((c) => c.actions.length > 0),
    [categories, isCreating]
  )
}

// Get flatten list of actions from categories ordered for matching messages to
// actions.
export const useActionsForMatching = (
  ...args: Parameters<typeof useActionCategories>
) => {
  const categories = useActionCategories(...args)

  return useMemo(
    () =>
      categories
        .flatMap((category): CategorizedAction[] =>
          category.actions.map((action) => ({
            category,
            action,
          }))
        )
        .sort((a, b) => {
          const aValue = actionKeyToMatchOrder(a.action.key)
          const bValue = actionKeyToMatchOrder(b.action.key)
          return aValue - bValue
        }),
    [categories]
  )
}

// Access options passed to actions.
export const useActionOptions = () => useActionsContext().options

// Only core actions are always provided. Adapter-specific actions may be
// available but are not guaranteed based on the context.
export const useActionForKey = (actionKey: ActionKey) =>
  useActionsForMatching().find(({ action }) => action.key === actionKey)

// Flatten action categories into processed list of actions for generating
// messages from actions.
export const useLoadedActionsAndCategories = (
  ...args: Parameters<typeof useActionCategories>
): {
  loadedActions: LoadedActions
  categories: ActionCategoryWithLabel[]
} => {
  const categories = useActionCategories(...args)
  // Load actions by calling hooks necessary to using the action. This calls the
  // hooks in the same order every time, as action categories do not change, so
  // this is a safe use of hooks. Get all action categories, even those
  // hidden from the picker, since we still want to be able to render them if
  // they're added programatically.
  const loadedActions = useActionCategories({ isCreating: false }).reduce(
    (acc, category) => {
      category.actions.forEach((action) => {
        acc[action.key] = {
          category,
          action,
          transform: action.useTransformToCosmos(),
          defaults: action.useDefaults(),
        }
      })
      return acc
    },
    {} as LoadedActions
  )

  return {
    loadedActions,
    categories,
  }
}

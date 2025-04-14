import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { processMessage } from '@dao-dao/state'
import {
  ActionsContext,
  useDao,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  Action,
  ActionCategoryMaker,
  ActionChainContextType,
  ActionContextType,
  ActionMap,
  ActionOptions,
  ActionsProviderProps,
  IActionsContext,
} from '@dao-dao/types'

import { useModules } from '../../modules'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import {
  getCoreActionCategoryMakers,
  getCoreActions,
  makeActionCategories,
} from '../core'

// Make sure this re-renders when the options change. You can do this by setting
// a `key` on this component or one of its ancestors. See DaoPageWrapper.tsx
// where this component is used for a usage example.
export const DaoActionsProvider = ({ children }: ActionsProviderProps) => {
  const { t } = useTranslation()
  const chainContext = useSupportedChainContext()
  const dao = useDao()
  const queryClient = useQueryClient()

  // Get the action category makers for a DAO from its various sources:
  // - core actions
  // - voting module adapter actions
  // - all proposal module adapters actions
  // - module adapter actions
  //
  // The core action categories are relevant to all DAOs, and the adapter action
  // categories are relevant to the DAO's specific modules. There will be one
  // voting module and many proposal modules.

  // Get voting module adapter actions.
  const votingModuleActions = useVotingModuleAdapter().fields.actions

  // Get modules to load actions from.
  const loadingModules = useModules()
  const loadedModules = loadingModules.loading ? undefined : loadingModules.data

  // Combine all actions and categories. Memoize this all so we don't
  // reconstruct the actions and categories on every render. If the maker
  // function is called on every render, components get redefined and flicker,
  // causing them to not be editable and constantly re-render.
  const context: IActionsContext = useMemo(() => {
    const options: ActionOptions = {
      t,
      chain: chainContext.chain,
      chainContext: {
        type: ActionChainContextType.Supported,
        ...chainContext,
      },
      address: dao.coreAddress,
      context: {
        type: ActionContextType.Dao,
        dao,
        accounts: dao.info.accounts,
      },
      queryClient,
    }

    const coreActions = getCoreActions()
    const coreActionCategoryMakers = getCoreActionCategoryMakers()

    // Get all actions for all modules.
    const moduleActions =
      loadedModules?.flatMap(
        ({ module, daoModule }) =>
          module.getActions?.(daoModule.values || {}) || []
      ) ?? []

    // Combine all actions.
    const actions: Action<any>[] = [
      ...[
        ...coreActions,
        ...(votingModuleActions?.actions || []),
        ...moduleActions.flatMap(({ actions }) => actions || []),
      ].flatMap((Action) => {
        // Action constructor throws error for invalid contexts.
        try {
          return new Action(options)
        } catch {
          return []
        }
      }),
      ...moduleActions.flatMap(
        ({ actionMakers }) =>
          actionMakers?.flatMap((maker) => maker(options) || []) || []
      ),
    ]

    const categoryMakers: ActionCategoryMaker[] = [
      ...coreActionCategoryMakers,
      ...(votingModuleActions?.categoryMakers || []),
      ...moduleActions.flatMap(({ categoryMakers }) => categoryMakers),
    ]

    // Make action categories.
    const categories = makeActionCategories(categoryMakers, options)

    return {
      options,
      actions,
      actionMap: actions.reduce((map, action) => {
        map[action.key] = action
        return map
      }, {} as ActionMap),
      categories,
      messageProcessor: processMessage,
    }
  }, [chainContext, dao, loadedModules, queryClient, t, votingModuleActions])

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}

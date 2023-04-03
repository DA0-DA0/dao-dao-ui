import { useWallet } from '@noahsaso/cosmodal'
import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, useDaoInfoContext } from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionOptions,
  IActionsContext,
} from '@dao-dao/types'

import { matchAndLoadCommon } from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { useWidgets } from '../../widgets'
import {
  getCoreActionCategoryMakers,
  makeActionCategoriesWithLabel,
} from '../core'
import { ActionsContext } from './context'

export interface ActionsProviderProps {
  children: ReactNode | ReactNode[]
}

// Make sure this re-renders when the options change. You can do this by setting
// a `key` on this component or one of its ancestors. See DaoPageWrapper.tsx
// where this component is used for a usage example.
export const DaoActionsProvider = ({ children }: ActionsProviderProps) => {
  const { t } = useTranslation()
  const info = useDaoInfoContext()
  const options: ActionOptions = {
    t,
    chainId: info.chainId,
    bech32Prefix: info.bech32Prefix,
    address: info.coreAddress,
    context: {
      type: ActionContextType.Dao,
      info,
    },
  }

  // Get the action category makers for a DAO from its various sources:
  // - core actions
  // - voting module adapter actions
  // - all proposal module adapters actions
  // - widget adapter actions
  //
  // The core action categories are relevant to all DAOs, and the adapter action
  // categories are relevant to the DAO's specific modules. There will be one
  // voting module and many proposal modules.

  const coreActionCategoryMakers = getCoreActionCategoryMakers()

  // Get voting module adapter actions.
  const votingModuleActionCategoryMakers =
    useVotingModuleAdapter().fields.actionCategoryMakers

  // Get all actions for all proposal module adapters.
  const proposalModuleActionCategoryMakers = useMemo(
    () =>
      info.proposalModules.flatMap(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chainId: info.chainId,
            coreAddress: info.coreAddress,
          }).fields.actionCategoryMakers
      ),
    [info]
  )

  const loadingWidgets = useWidgets({
    suspendWhileLoading: true,
  })
  const widgetActionCategoryMakers = loadingWidgets.loading
    ? []
    : loadingWidgets.data.flatMap(
        ({ widget, daoWidget }) =>
          widget.getActionCategoryMakers?.(daoWidget.values || {}) ?? []
      )

  // Make action categories.
  const categories = makeActionCategoriesWithLabel(
    [
      ...coreActionCategoryMakers,
      ...votingModuleActionCategoryMakers,
      ...proposalModuleActionCategoryMakers,
      ...widgetActionCategoryMakers,
    ],
    options
  )

  const context: IActionsContext = {
    options,
    categories,
  }

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}

export const WalletActionsProvider = ({ children }: ActionsProviderProps) => {
  const { t } = useTranslation()
  const { chainInfo, address } = useWallet()

  if (!chainInfo || !address) {
    return <Loader />
  }

  const options: ActionOptions = {
    t,
    chainId: chainInfo.chainId,
    bech32Prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
    address: address,
    context: {
      type: ActionContextType.Wallet,
    },
  }

  const categories = makeActionCategoriesWithLabel(
    getCoreActionCategoryMakers(),
    options
  )

  const context: IActionsContext = {
    options,
    categories,
  }

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}

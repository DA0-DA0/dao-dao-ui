import { useWallet } from '@noahsaso/cosmodal'
import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/stateless'
import {
  ActionOptions,
  ActionOptionsContextType,
  IActionsContext,
} from '@dao-dao/types'

import { matchAndLoadCommon } from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { getActions } from '../actions'
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
      type: ActionOptionsContextType.Dao,
      info,
    },
  }

  // Get the actions for a DAO from its various sources:
  // - core actions
  // - voting module adapter actions
  // - proposal module adapter actions

  // Get voting module adapter actions.
  const votingModuleActions = useVotingModuleAdapter().hooks.useActions(options)

  // Get all actions for all proposal module adapters.
  const proposalModuleUseActionHooks = useMemo(
    () =>
      info.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chainId: info.chainId,
            coreAddress: info.coreAddress,
          }).hooks.useActions
      ),
    [info]
  )
  // The proposal modules for a DAO should never change, so we can safely call
  // these hooks in an iterative callback. They should always be called in the
  // same order.
  const proposalModuleActions = proposalModuleUseActionHooks.flatMap(
    (useActions) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useActions(options)
  )

  const coreActions = getActions(options)

  const context: IActionsContext = {
    options,
    actions: [...coreActions, ...votingModuleActions, ...proposalModuleActions]
      // Sort alphabetically.
      .sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      ),
  }

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}

// Make sure this re-renders when the options change. You can do this by setting
// a `key` on this component or one of its ancestors. See DaoPageWrapper.tsx
// where this component is used for a usage example.
export const WalletActionsProvider = ({ children }: ActionsProviderProps) => {
  const { t } = useTranslation()
  const { chainInfo, address } = useWallet()
  if (!chainInfo || !address) {
    throw new Error('WalletActionsProvider: no wallet connected')
  }

  const options: ActionOptions = {
    t,
    chainId: chainInfo.chainId,
    bech32Prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
    address: address,
    context: {
      type: ActionOptionsContextType.Wallet,
    },
  }

  const coreActions = getActions(options)

  const context: IActionsContext = {
    options,
    actions: coreActions
      // Sort alphabetically.
      .sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      ),
  }

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}

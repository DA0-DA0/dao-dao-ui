import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { govParamsSelector, moduleAddressSelector } from '@dao-dao/state/recoil'
import {
  ErrorPage,
  Loader,
  PageLoader,
  useCachedLoadingWithError,
  useChain,
  useChainContext,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  ActionChainContext,
  ActionChainContextType,
  ActionContext,
  ActionContextType,
  ActionOptions,
  IActionsContext,
} from '@dao-dao/types'

import { useProfile } from '../../hooks'
import { useWallet } from '../../hooks/useWallet'
import { matchAndLoadCommon } from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { useWidgets } from '../../widgets'
import {
  getCoreActionCategoryMakers,
  makeActionCategoriesWithLabel,
} from '../core'
import { ActionsContext } from './context'

export type ActionsProviderProps = {
  children: ReactNode | ReactNode[]
}

export type WalletActionsProviderProps = ActionsProviderProps & {
  // If passed, will override the connected wallet address.
  address?: string
}

export type GovActionsProviderProps = ActionsProviderProps & {
  /**
   * Optionally override loader node.
   */
  loader?: ReactNode
}

// Make sure this re-renders when the options change. You can do this by setting
// a `key` on this component or one of its ancestors. See DaoPageWrapper.tsx
// where this component is used for a usage example.
export const DaoActionsProvider = ({ children }: ActionsProviderProps) => {
  const { t } = useTranslation()
  const chainContext = useSupportedChainContext()
  const info = useDaoInfoContext()

  const options: ActionOptions = {
    t,
    chain: chainContext.chain,
    chainContext: {
      type: ActionChainContextType.Supported,
      ...chainContext,
    },
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
            chain: chainContext.chain,
            coreAddress: info.coreAddress,
          }).fields.actionCategoryMakers || []
      ),
    [chainContext.chain, info.coreAddress, info.proposalModules]
  )

  const loadingWidgets = useWidgets()
  const loadedWidgets = loadingWidgets.loading ? undefined : loadingWidgets.data
  // Memoize this so we don't reconstruct the action makers on every render. The
  // React components often need to access data from the widget values object so
  // they are defined in the maker functions. If the maker function is called on
  // every render, the components will get redefined and will flicker and not be
  // editable because they're constantly re-rendering.
  const widgetActionCategoryMakers = useMemo(
    () =>
      loadedWidgets?.flatMap(
        ({ widget, daoWidget }) =>
          widget.getActionCategoryMakers?.(daoWidget.values || {}) ?? []
      ) ?? [],
    [loadedWidgets]
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

export const BaseActionsProvider = ({
  address,
  context,
  children,
}: ActionsProviderProps & {
  address: string
  context: ActionContext
}) => {
  const { t } = useTranslation()

  const chainContext = useChainContext()
  const actionChainContext: ActionChainContext = chainContext.config
    ? {
        type: ActionChainContextType.Supported,
        ...chainContext,
        // Type-check.
        config: chainContext.config,
      }
    : chainContext.base
    ? {
        type: ActionChainContextType.Configured,
        ...chainContext,
        config: chainContext.base,
      }
    : {
        type: ActionChainContextType.Any,
        ...chainContext,
      }

  const options: ActionOptions = {
    t,
    chain: chainContext.chain,
    chainContext: actionChainContext,
    address,
    context,
  }

  const categories = makeActionCategoriesWithLabel(
    getCoreActionCategoryMakers(),
    options
  )

  return (
    <ActionsContext.Provider
      value={{
        options,
        categories,
      }}
    >
      {children}
    </ActionsContext.Provider>
  )
}

export const WalletActionsProvider = ({
  address: overrideAddress,
  children,
}: WalletActionsProviderProps) => {
  const { address: connectedAddress } = useWallet()

  const address = overrideAddress || connectedAddress

  const { profile } = useProfile({ address })

  if (!address || profile.loading) {
    return <Loader />
  }

  return (
    <BaseActionsProvider
      address={address}
      context={{
        type: ActionContextType.Wallet,
        profile: profile.errored ? undefined : profile.data,
      }}
    >
      {children}
    </BaseActionsProvider>
  )
}

export const GovActionsProvider = ({
  loader,
  children,
}: GovActionsProviderProps) => {
  const { chain_id: chainId } = useChain()
  const govDataLoading = useCachedLoadingWithError(
    waitForAll([
      moduleAddressSelector({
        name: 'gov',
        chainId,
      }),
      govParamsSelector({
        chainId,
      }),
    ])
  )

  return govDataLoading.loading ? (
    <>{loader || <PageLoader />}</>
  ) : govDataLoading.errored ? (
    <ErrorPage error={govDataLoading.error} />
  ) : (
    <BaseActionsProvider
      address={govDataLoading.data[0]}
      context={{
        type: ActionContextType.Gov,
        params: govDataLoading.data[1],
      }}
    >
      {children}
    </BaseActionsProvider>
  )
}

import {
  ActionContextType,
  ActionKeyAndData,
  ActionOptions,
  LoadedActions,
  UnifiedCosmosMsg,
} from '@dao-dao/types'

import { getAccountAddress } from './dao'

// Convert action data to a Cosmos message given all loaded actions.
export const convertActionsToMessages = (
  loadedActions: LoadedActions,
  actions: ActionKeyAndData[],
  {
    // Whether or not to throw the error if a transform fails. If false, the
    // error will be logged to the console, and the message will be skipped.
    throwErrors = true,
  }: {
    throwErrors?: boolean
  } = {}
): UnifiedCosmosMsg[] =>
  actions
    .map(({ actionKey, data }) => {
      // If no action, skip it.
      if (!actionKey) {
        return
      }

      // If no data, throw error because this is invalidly selected.
      if (!data) {
        if (throwErrors) {
          throw new Error('No action selected.')
        }

        return
      }

      try {
        const loadedAction = loadedActions[actionKey]
        if (!loadedAction) {
          return
        }
        // If action not loaded or errored, throw error.
        if (!loadedAction.defaults) {
          throw new Error(`Action not loaded: ${loadedAction.action.label}.`)
        } else if (loadedAction.defaults instanceof Error) {
          throw loadedAction.defaults
        }

        return loadedAction.transform(data)
      } catch (err) {
        if (throwErrors) {
          throw err
        }

        console.error(err)
      }
    })
    // Filter out undefined messages.
    .filter(Boolean) as UnifiedCosmosMsg[]

/**
 * Get the address for the given action options for the given chain. If a DAO,
 * this is the address of the native address on the same chain or the polytone
 * proxy on that chain. For a wallet, this is the address registered in the
 * wallet's profile, if any.
 */
export const getChainAddressForActionOptions = (
  { context, chain, address }: ActionOptions,
  chainId: string
): string | undefined =>
  // If on same chain, return address.
  chain.chain_id === chainId
    ? address
    : // If on different chain, return DAO's polytone proxy address.
    context.type === ActionContextType.Dao
    ? getAccountAddress({
        accounts: context.info.accounts,
        chainId,
      })
    : // If on different chain, return wallet's chain profile address if set.
    context.type === ActionContextType.Wallet
    ? context.profile?.chains[chainId]?.address
    : undefined

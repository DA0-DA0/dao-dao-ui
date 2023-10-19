import {
  ActionContextType,
  ActionOptions,
  CosmosMsgForEmpty,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types'

import { transformBech32Address } from './conversion'
import { getAccountAddress } from './dao'

// Convert action data to a Cosmos message given all loaded actions.
export const convertActionsToMessages = (
  loadedActions: LoadedActions,
  actions: PartialCategorizedActionKeyAndData[],
  {
    // Whether or not to throw the error if a transform fails. If false, the
    // error will be logged to the console, and the message will be skipped.
    throwErrors = true,
  }: {
    throwErrors?: boolean
  } = {}
): CosmosMsgForEmpty[] =>
  actions
    .map(({ categoryKey, actionKey, data }) => {
      // If no category or action, skip it.
      if (!categoryKey && !actionKey) {
        return
      }

      // If no action or data, throw error because this is an unselected action.
      if (!actionKey || !data) {
        if (throwErrors) {
          throw new Error('No action selected.')
        }

        return
      }

      try {
        return loadedActions[actionKey]?.transform(data)
      } catch (err) {
        if (throwErrors) {
          throw err
        }

        console.error(err)
      }
    })
    // Filter out undefined messages.
    .filter(Boolean) as CosmosMsgForEmpty[]

// Get the address for the given action options for the given chain. If a DAO,
// this is the address of the native address on the same chain or the polytone
// proxy on that chain. For a wallet, this is the transformed bech32 address.
export const getChainAddressForActionOptions = (
  { context, chain, address }: ActionOptions,
  chainId: string
) =>
  // If on same chain, return address.
  chain.chain_id === chainId
    ? address
    : // If on different chain, return DAO's polytone proxy address.
    context.type === ActionContextType.Dao
    ? getAccountAddress({
        accounts: context.info.accounts,
        chainId,
      }) || ''
    : // If on different chain, return wallet's transformed bech32 address.
    context.type === ActionContextType.Wallet
    ? transformBech32Address(address, chainId)
    : undefined

import {
  Account,
  AccountType,
  ActionContextType,
  ActionOptions,
  ChainId,
} from '@dao-dao/types'

import { VALENCE_SUPPORTED_CHAINS } from './constants/chains'
import { getAccount } from './dao'

// Whether or not the current action context supports Valence accounts.
export const actionContextSupportsValence = ({
  context,
  chain: { chain_id: chainId },
}: ActionOptions): boolean =>
  VALENCE_SUPPORTED_CHAINS.includes(chainId as ChainId) ||
  (context.type === ActionContextType.Dao &&
    VALENCE_SUPPORTED_CHAINS.some(
      (chainId) => chainId in context.info.polytoneProxies
    ))

// Get the account that will be used to control valence accounts.
export const getValenceControllerAccount = ({
  address,
  context,
  chain: { chain_id: srcChainId },
}: ActionOptions): Account | undefined =>
  context.type === ActionContextType.Dao
    ? // Get first account on any valence supported chain.
      VALENCE_SUPPORTED_CHAINS.map((chainId) =>
        getAccount({
          accounts: context.info.accounts,
          chainId,
        })
      ).find(Boolean)
    : VALENCE_SUPPORTED_CHAINS.includes(srcChainId as ChainId)
    ? {
        type: AccountType.Native,
        chainId: srcChainId,
        address,
      }
    : undefined

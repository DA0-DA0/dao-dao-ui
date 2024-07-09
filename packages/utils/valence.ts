import {
  AccountType,
  ActionContextType,
  ActionOptions,
  ChainId,
} from '@dao-dao/types'

import { VALENCE_ALLOWLIST } from './constants'
import { VALENCE_SUPPORTED_CHAINS } from './constants/chains'

// Whether or not the current action context supports Valence accounts.
export const actionContextSupportsValence = ({
  context,
  chain: { chain_id: chainId },
}: ActionOptions): boolean =>
  // Must either be on the valence allowlist or already have a Valence account.
  context.accounts.some(
    (a) =>
      VALENCE_ALLOWLIST.includes(a.address) || a.type === AccountType.Valence
  ) &&
  // Must be on a supported Valence chain.
  (VALENCE_SUPPORTED_CHAINS.includes(chainId as ChainId) ||
    (context.type === ActionContextType.Dao &&
      VALENCE_SUPPORTED_CHAINS.some(
        (chainId) => chainId in context.dao.info.polytoneProxies
      )))

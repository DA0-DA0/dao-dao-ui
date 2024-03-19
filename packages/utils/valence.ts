import { ActionContextType, ActionOptions, ChainId } from '@dao-dao/types'

import { VALENCE_SUPPORTED_CHAINS } from './constants/chains'

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

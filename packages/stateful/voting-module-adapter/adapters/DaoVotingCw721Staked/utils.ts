import { SupportedChainIndexerMode } from '@dao-dao/types'
import { chainIsIndexed, isSecretNetwork } from '@dao-dao/utils'

/**
 * Whether or not the members (top stakers) of a cw721-staked voting module can
 * be listed. The contract cannot list stakers, so this requires the indexer.
 * Members are also not viewable on Secret Network.
 */
export const canListCw721StakedMembers = (chainId: string): boolean =>
  !isSecretNetwork(chainId) &&
  chainIsIndexed(
    chainId,
    SupportedChainIndexerMode.Tx,
    SupportedChainIndexerMode.All
  )

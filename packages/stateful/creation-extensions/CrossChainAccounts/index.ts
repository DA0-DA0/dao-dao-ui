import { ContractVersion, DaoCreationExtension } from '@dao-dao/types'
import {
  getSupportedChainConfig,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { Editor } from './Editor'
import { CrossChainAccountsExtensionData } from './types'

export const CrossChainAccountsExtension: DaoCreationExtension<CrossChainAccountsExtensionData> =
  {
    id: 'cross-chain-accounts',
    title: 'Cross-Chain Accounts',
    description: 'Set up cross-chain treasuries.',
    defaultEnabled: true,
    minVersion: ContractVersion.V270,
    // Supported if the chain has Polytone connections with other chains.
    isChainSupported: (chain) => {
      const polytone = getSupportedChainConfig(chain.chainId)?.polytone || {}
      return Object.keys(polytone).length > 0
    },
    getDefaultValues: (chain) => {
      const polytone = getSupportedChainConfig(chain.chainId)?.polytone || {}
      return {
        chains: Object.keys(polytone).map((chainId) => ({
          chainId,
          enabled: false,
        })),
      }
    },
    Editor,
    getInitialActions: (daoChain, { chains }) => {
      const enabledChains = chains.flatMap(({ chainId, enabled }) =>
        enabled ? [chainId] : []
      )
      return enabledChains.flatMap((chainId) =>
        maybeMakePolytoneExecuteMessages(daoChain.chainId, chainId)
      )
    },
  }

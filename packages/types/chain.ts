import { Chain } from '@chain-registry/types'

import { Coin } from './contracts'
import { GenericToken } from './token'
import { CodeIdConfig, PolytoneConfig } from './utils'

export type IChainContext = {
  chainId: string
  chain: Chain
  // Chain may not have a native token.
  nativeToken?: GenericToken
  // If defined, this is a supported chain.
  config?: SupportedChainConfig
}

// Require supported chain config.
export type SupportedChainContext = Omit<IChainContext, 'config'> & {
  config: SupportedChainConfig
}

export interface Validator {
  address: string
  moniker: string
  website: string
  details: string
  commission: number
  status: string
  tokens: number
}

export interface Delegation {
  validator: Validator
  delegated: Coin
  pendingReward: Coin
}

export interface UnbondingDelegation {
  validator: Validator
  balance: Coin
  startedAtHeight: number
  finishesAt: Date
}

export interface NativeDelegationInfo {
  delegations: Delegation[]
  unbondingDelegations: UnbondingDelegation[]
}

export enum ContractVersion {
  // Used when referring to gov module.
  Gov = 'gov',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v1.0.0
  V1 = '0.1.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-alpha
  V2Alpha = '0.2.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
  V2Beta = '2.0.0-beta',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.1
  V201 = '2.0.1',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.2
  V202 = '2.0.2',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
  V203 = '2.0.3',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
  V210 = '2.1.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.3.0
  V230 = '2.3.0',

  // Neutron-specific versions.
  // https://github.com/neutron-org/neutron-dao/releases/tag/v0.5.0
  NeutronV021 = '0.2.1',
}

export enum ChainId {
  JunoMainnet = 'juno-1',
  JunoTestnet = 'uni-6',
  OsmosisMainnet = 'osmosis-1',
  OsmosisTestnet = 'osmo-test-5',
  StargazeMainnet = 'stargaze-1',
  StargazeTestnet = 'elgafar-1',
  NeutronMainnet = 'neutron-1',
}

export type SupportedChainConfig = {
  // Unique name among chain configs with the same `mainnet` flag. This is used
  // to identify the chain in the native governance UI.
  name: string
  mainnet: boolean
  accentColor: string
  factoryContractAddress: string
  // Supports new v1 gov proposals introduced in cosmos-sdk v47. Some chains
  // that fork the SDK, like Osmosis, don't support v1 gov proposals even though
  // they use cosmos-sdk v47 or higher, so we need a hardcoded flag.
  supportsV1GovProposals: boolean
  // If defined, it means Kado supports fiat deposit on this chain.
  kado?: {
    network: string
  }
  indexes: {
    search: string
    featured: string
  }
  explorerUrlTemplates: {
    tx: string
    gov: string
    govProp: string
    wallet: string
  }
  codeIds: CodeIdConfig
  polytone?: PolytoneConfig
}

export type SupportedChain = SupportedChainConfig & {
  chain: Chain
}

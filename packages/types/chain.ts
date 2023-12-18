import { Chain } from '@chain-registry/types'

import { Coin } from './contracts'
import { ContractVersion } from './features'
import { GenericToken } from './token'
import { CodeIdConfig, PolytoneConfig } from './utils'

export type IChainContext = {
  chainId: string
  chain: Chain
  // Chain may not have a native token.
  nativeToken?: GenericToken
  // If defined, this is a configured chain, which means it is supported (DAO
  // DAO is deployed on it) or it has a governance interface.
  base?: BaseChainConfig
  // If defined, this is a supported chain, which means DAO DAO is deployed.
  config?: SupportedChainConfig
}

// Require base chain config.
export type ConfiguredChainContext = Omit<IChainContext, 'base' | 'config'> & {
  config: BaseChainConfig
}

// Require supported chain config.
export type SupportedChainContext = Omit<ConfiguredChainContext, 'config'> & {
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

export enum ChainId {
  CosmosHubMainnet = 'cosmoshub-4',
  CosmosHubTestnet = 'theta-testnet-001',
  JunoMainnet = 'juno-1',
  JunoTestnet = 'uni-6',
  OsmosisMainnet = 'osmosis-1',
  OsmosisTestnet = 'osmo-test-5',
  StargazeMainnet = 'stargaze-1',
  StargazeTestnet = 'elgafar-1',
  NeutronMainnet = 'neutron-1',
  TerraMainnet = 'phoenix-1',
  MigalooMainnet = 'migaloo-1',
}

export type BaseChainConfig = {
  chainId: string
  // Unique name among chain configs with the same `mainnet` flag. This is used
  // to identify the chain in the native governance UI.
  name: string
  mainnet: boolean
  accentColor: string
  // Set to true if the chain does not support CosmWasm. If undefined, assumed
  // to be false.
  noCosmWasm?: boolean
  explorerUrlTemplates: {
    tx: string
    gov: string
    govProp: string
    wallet: string
  }
}

export type ConfiguredChain = BaseChainConfig & {
  chain: Chain
}

export type SupportedChainConfig = BaseChainConfig & {
  factoryContractAddress: string
  // If defined, it means Kado supports fiat deposit on this chain.
  kado?: {
    network: string
  }
  indexes: {
    search: string
    featured: string
  }
  codeIds: CodeIdConfig
  // Store code IDs for past versions of contracts, in case DAOs need a
  // particular version of a contract.
  historicalCodeIds?: Partial<Record<ContractVersion, Partial<CodeIdConfig>>>
  polytone?: PolytoneConfig
}

export type SupportedChain = SupportedChainConfig & {
  chain: Chain
}

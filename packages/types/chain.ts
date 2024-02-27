import { Chain } from '@chain-registry/types'

import { Coin } from './contracts'
import { ContractVersion } from './features'
import { GenericToken } from './token'

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
  MigalooTestnet = 'narwhal-2',
  NobleMainnet = 'noble-1',
  KujiraMainnet = 'kaiyo-1',
  ChihuahuaMainnet = 'chihuahua-1',
  OraichainMainnet = 'Oraichain',
}

export type BaseChainConfig = {
  /**
   * Chain ID.
   */
  chainId: string
  /**
   * Unique name among chain configs with the same `mainnet` flag. This is used
   * to identify the chain in the native governance UI.
   */
  name: string
  /**
   * Whether or not this should be shown on the mainnet UI. If not, it will be
   * shown in the testnet UI.
   */
  mainnet: boolean
  /**
   * An accent color for using in the UI.
   */
  accentColor: string
  /**
   * Set to true if the chain does not support CosmWasm. If undefined, assumed
   * to be false.
   */
  noCosmWasm?: boolean
  /**
   * Set to true if the chain does not have a gov module so that it doesn't
   * appear in the gov UI. If undefined, assumed to be false.
   */
  noGov?: boolean
  /**
   * Chain explorer URL templates for various external links.
   */
  explorerUrlTemplates?: {
    tx?: string
    gov?: string
    govProp?: string
    wallet?: string
  }
  /**
   * If defined, overrides the default chain image.
   */
  overrideChainImageUrl?: string
}

export type ConfiguredChain = BaseChainConfig & {
  chain: Chain
}

export type SupportedChainConfig = BaseChainConfig & {
  /**
   * The `cw-admin-factory` contract address that instantiates contracts with
   * themselves set as their admin.
   * https://github.com/DA0-DA0/dao-contracts/tree/development/contracts/external/cw-admin-factory
   */
  factoryContractAddress: string
  /**
   * If defined, it means Kado supports fiat deposit on this chain.
   */
  kado?: {
    /**
     * The Kado network identifier.
     */
    network: string
  }
  /**
   * Code IDs stored on this chain that are used throughout the UI.
   */
  codeIds: CodeIdConfig
  /**
   * Whether or not to create DAOs with CW20s. The alternative is to use token
   * factory native tokens. Defaults to false.
   */
  createWithCw20?: boolean
  /**
   * Whether or not this chain has an indexer.
   */
  noIndexer?: boolean
  /**
   * Past versions of contracts, in case DAOs need a particular version of a
   * contract.
   */
  historicalCodeIds?: Partial<Record<ContractVersion, Partial<CodeIdConfig>>>
  /**
   * Polytone connections to other chains from this chain.
   */
  polytone?: PolytoneConfig
}

export type SupportedChain = SupportedChainConfig & {
  chain: Chain
}

export type CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw1Whitelist: number
  Cw4Group: number
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base?: number

  // https://github.com/DA0-DA0/dao-contracts
  CwPayrollFactory: number
  CwTokenSwap: number
  CwTokenfactoryIssuer: number
  CwVesting: number
  DaoCore: number
  DaoMigrator: number
  DaoPreProposeApprovalSingle: number
  DaoPreProposeApprover: number
  DaoPreProposeMultiple: number
  DaoPreProposeSingle: number
  DaoProposalMultiple: number
  DaoProposalSingle: number
  DaoVotingCw4: number
  DaoVotingCw721Staked: number
  DaoVotingTokenStaked: number

  // For migrating v1 to v2 DAOs, and some chains use CW20s.
  Cw20Base?: number
  Cw20Stake?: number
  DaoVotingCw20Staked?: number
}

export type PolytoneConnection = {
  // Contract address of note on the local/current chain.
  note: string
  // Contract address of the note's listener on the local/current chain.
  listener: string
  // Contract address of the note's voice on the remote chain.
  voice: string
  // IBC connection IDs
  localConnection: string
  remoteConnection: string
  // IBC channel IDs
  localChannel: string
  remoteChannel: string
  // Whether or not the user needs to self-relay an execution. This should be
  // true if no relayers are running on the established connection. If using an
  // existing active connection, the relayers will automatically perform the
  // relay.
  needsSelfRelay?: boolean
}

// Map chain ID to polytone connection information.
export type PolytoneConfig = Record<string, PolytoneConnection>

export type WithChainId<T> = T & {
  chainId: string
}

export type DecodedStargateMsg<Value = any> = {
  stargate: {
    typeUrl: string
    value: Value
  }
}

/**
 * Function that creates a cw1-whitelist contract. Used in the
 * `useCreateCw1Whitelist` hook.
 */
export type CreateCw1Whitelist = (
  admins: string[],
  mutable?: boolean
) => Promise<string | undefined>

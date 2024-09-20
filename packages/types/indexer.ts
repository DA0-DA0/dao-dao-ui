import { ContractVersionInfo } from './contracts'
import {
  Config,
  DumpStateResponse,
  ProposalModuleWithInfo,
} from './contracts/DaoDaoCore'

export enum IndexerFormulaType {
  Account = 'account',
  Contract = 'contract',
  Generic = 'generic',
  Validator = 'validator',
}

export interface IndexerDumpState
  extends Omit<DumpStateResponse, 'proposal_modules'> {
  proposal_modules: ProposalModuleWithInfo[]
  votingModuleInfo: ContractVersionInfo
  createdAt: string // UTC string
  adminInfo?: {
    admin?: string
    config: Config
    info?: ContractVersionInfo
    // Check if it has this current DAO as a SubDAO.
    registeredSubDao?: boolean
  } | null
  proposalCount?: number
  // Map polytone note address to remote address.
  polytoneProxies?: Record<string, string>
  // Hide from search if storage item `hideFromSearch` exists.
  hideFromSearch?: boolean
}

export type IndexerUpBlock = {
  height: number
  timeUnixMs: number
  timestamp: string
}

export type IndexerUpStatus = {
  chainBlock: IndexerUpBlock
  indexerBlock: IndexerUpBlock
  caughtUp: boolean
}

export type DaoDaoIndexerChainStats = {
  daos: number
  proposals: number
  votes: number
  uniqueVoters: number
}

export type DaoDaoIndexerAllStats = {
  /**
   * Stats from all time. If null, we have no stats for the chain (probably
   * because we don't have an indexer running).
   */
  all: DaoDaoIndexerChainStats | null
  /**
   * Stats from last 30 days. If null, we have no stats for the chain (probably
   * because we don't have an indexer running).
   */
  month: DaoDaoIndexerChainStats | null
  /**
   * Stats from last 7 days. If null, we have no stats for the chain (probably
   * because we don't have an indexer running).
   */
  week: DaoDaoIndexerChainStats | null
  /**
   * Total TVL.
   */
  tvl: number | null
  /**
   * Number of chains DAO DAO is deployed on.
   */
  chains: number
}

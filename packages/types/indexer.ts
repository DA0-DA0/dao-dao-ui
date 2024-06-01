import { ContractVersionInfo } from './contracts'
import {
  Config,
  DumpStateResponse,
  ProposalModuleWithInfo,
} from './contracts/DaoCore.v2'

export enum IndexerFormulaType {
  Contract = 'contract',
  Generic = 'generic',
  Validator = 'validator',
  Wallet = 'wallet',
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
   * Stats from all time.
   */
  all: DaoDaoIndexerChainStats
  /**
   * Stats from last 30 days.
   */
  month: DaoDaoIndexerChainStats
  /**
   * Stats from last 7 days.
   */
  week: DaoDaoIndexerChainStats
  /**
   * Number of chains DAO DAO is deployed on.
   */
  chains: number
  /**
   * Total TVL.
   */
  tvl: number
}

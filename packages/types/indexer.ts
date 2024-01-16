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

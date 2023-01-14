import { ContractVersionInfo } from './contracts'
import {
  Config,
  DumpStateResponse,
  ProposalModuleWithInfo,
} from './contracts/DaoCore.v2'

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
}

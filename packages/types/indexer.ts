import { ContractVersionInfo } from './contracts'
import {
  DumpStateResponse,
  ProposalModuleWithInfo,
} from './contracts/DaoCore.v2'

export interface IndexerDumpState
  extends Omit<DumpStateResponse, 'proposal_modules'> {
  proposal_modules: ProposalModuleWithInfo[]
  votingModuleInfo: ContractVersionInfo
  createdAt: string // UTC string
}

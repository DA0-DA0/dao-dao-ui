import { ContractVersionInfo } from './contracts'
import {
  DumpStateResponse,
  ProposalModuleWithInfo,
} from './contracts/CwdCore.v2'

export interface IndexerDumpState extends DumpStateResponse {
  proposalModules: ProposalModuleWithInfo[]
  votingModuleInfo: ContractVersionInfo
  createdAt: string // UTC string
}

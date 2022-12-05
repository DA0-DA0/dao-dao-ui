import { ContractVersionInfo } from './contracts'
import {
  ProposalModuleWithInfo,
  ReducedDumpState,
} from './contracts/CwdCore.v2'

export interface IndexerDumpState extends ReducedDumpState {
  proposalModules: ProposalModuleWithInfo[]
  votingModuleInfo: ContractVersionInfo
  createdAt: string // UTC string
}

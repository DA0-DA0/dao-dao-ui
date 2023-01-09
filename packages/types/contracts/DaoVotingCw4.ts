import { ContractVersionInfo, Uint128 } from './common'

export type DaoResponse = string
export type ExecuteMsg = {
  member_changed_hook: {
    diffs: MemberDiff[]
    [k: string]: unknown
  }
}
export interface MemberDiff {
  key: string
  new?: number | null
  old?: number | null
  [k: string]: unknown
}
export type GroupContractResponse = string
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export interface InstantiateMsg {
  cw4_group_code_id: number
  initial_members: Member[]
  [k: string]: unknown
}
export interface Member {
  addr: string
  weight: number
  [k: string]: unknown
}
export interface MigrateMsg {
  [k: string]: unknown
}
export type QueryMsg =
  | {
      group_contract: {
        [k: string]: unknown
      }
    }
  | {
      dao: {
        [k: string]: unknown
      }
    }
  | {
      voting_power_at_height: {
        address: string
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      total_power_at_height: {
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      info: {
        [k: string]: unknown
      }
    }
export interface TotalPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
  [k: string]: unknown
}
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
  [k: string]: unknown
}

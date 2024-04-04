import { ContractVersionInfo, SecretAnyContractInfo, Uint128 } from './common'

export type DaoResponse = string
export type GroupContractResponse = string | SecretAnyContractInfo
export interface InfoResponse {
  info: ContractVersionInfo
}
export type GroupContract =
  | {
      existing: {
        address: string
      }
    }
  | {
      new: {
        cw4_group_code_id: number
        initial_members: Member[]
      }
    }
export interface InstantiateMsg {
  group_contract: GroupContract
}
export interface Member {
  addr: string
  weight: number
}
export interface MigrateMsg {}
export type QueryMsg =
  | {
      group_contract: {}
    }
  | {
      dao: {}
    }
  | {
      voting_power_at_height: {
        address: string
        height?: number | null
      }
    }
  | {
      total_power_at_height: {
        height?: number | null
      }
    }
  | {
      info: {}
    }
export interface TotalPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}

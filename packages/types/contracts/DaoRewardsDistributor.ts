/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export interface InstantiateMsg {
  owner?: string | null
}
export type ExecuteMsg =
  | {
      member_changed_hook: MemberChangedHookMsg
    }
  | {
      nft_stake_change_hook: NftStakeChangedHookMsg
    }
  | {
      stake_change_hook: StakeChangedHookMsg
    }
  | {
      create: CreateMsg
    }
  | {
      update: {
        emission_rate?: EmissionRate | null
        hook_caller?: string | null
        id: number
        vp_contract?: string | null
        withdraw_destination?: string | null
      }
    }
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      fund: FundMsg
    }
  | {
      fund_latest: {}
    }
  | {
      claim: {
        id: number
      }
    }
  | {
      withdraw: {
        id: number
      }
    }
  | {
      update_ownership: Action
    }
export type NftStakeChangedHookMsg =
  | {
      stake: {
        addr: Addr
        token_id: string
      }
    }
  | {
      unstake: {
        addr: Addr
        token_ids: string[]
      }
    }
export type Addr = string
export type StakeChangedHookMsg =
  | {
      stake: {
        addr: Addr
        amount: Uint128
      }
    }
  | {
      unstake: {
        addr: Addr
        amount: Uint128
      }
    }
export type Uint128 = string
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export type EmissionRate =
  | {
      paused: {}
    }
  | {
      immediate: {}
    }
  | {
      linear: {
        amount: Uint128
        continuous: boolean
        duration: Duration
      }
    }
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type Binary = string
export type Action =
  | {
      transfer_ownership: {
        expiry?: Expiration | null
        new_owner: string
      }
    }
  | 'accept_ownership'
  | 'renounce_ownership'
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {}
    }
export type Timestamp = Uint64
export type Uint64 = string
export interface MemberChangedHookMsg {
  diffs: MemberDiff[]
}
export interface MemberDiff {
  key: string
  new?: number | null
  old?: number | null
}
export interface CreateMsg {
  denom: UncheckedDenom
  emission_rate: EmissionRate
  hook_caller: string
  vp_contract: string
  withdraw_destination?: string | null
}
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export interface FundMsg {
  id: number
}
export type QueryMsg =
  | {
      info: {}
    }
  | {
      ownership: {}
    }
  | {
      pending_rewards: {
        address: string
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      undistributed_rewards: {
        id: number
      }
    }
  | {
      distribution: {
        id: number
      }
    }
  | {
      distributions: {
        limit?: number | null
        start_after?: number | null
      }
    }
export interface MigrateMsg {}
export type Uint256 = string
export type Denom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export interface DistributionState {
  active_epoch: Epoch
  denom: Denom
  funded_amount: Uint128
  historical_earned_puvp: Uint256
  hook_caller: Addr
  id: number
  vp_contract: Addr
  withdraw_destination: Addr
}
export interface Epoch {
  emission_rate: EmissionRate
  ends_at: Expiration
  last_updated_total_earned_puvp: Expiration
  started_at: Expiration
  total_earned_puvp: Uint256
}
export interface DistributionsResponse {
  distributions: DistributionState[]
}
export interface InfoResponse {
  info: ContractVersion
}
export interface ContractVersion {
  contract: string
  version: string
}
export interface OwnershipForAddr {
  owner?: Addr | null
  pending_expiry?: Expiration | null
  pending_owner?: Addr | null
}
export interface PendingRewardsResponse {
  pending_rewards: DistributionPendingRewards[]
}
export interface DistributionPendingRewards {
  denom: Denom
  id: number
  pending_rewards: Uint128
}

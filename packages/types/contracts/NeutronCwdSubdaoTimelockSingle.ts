/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export interface InstantiateMsg {
  overrule_pre_propose: string
  [k: string]: unknown
}
export type ExecuteMsg =
  | {
      timelock_proposal: {
        msgs: CosmosMsgForNeutronMsg[]
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      execute_proposal: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      overrule_proposal: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      update_config: {
        overrule_pre_propose?: string | null
        owner?: string | null
        [k: string]: unknown
      }
    }
export type CosmosMsgForNeutronMsg =
  | {
      bank: BankMsg
    }
  | {
      custom: NeutronMsg
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
    }
  | {
      stargate: {
        type_url: string
        value: Binary
        [k: string]: unknown
      }
    }
  | {
      ibc: IbcMsg
    }
  | {
      wasm: WasmMsg
    }
  | {
      gov: GovMsg
    }
export type BankMsg =
  | {
      send: {
        amount: Coin[]
        to_address: string
        [k: string]: unknown
      }
    }
  | {
      burn: {
        amount: Coin[]
        [k: string]: unknown
      }
    }
export type Uint128 = string
export type NeutronMsg =
  | {
      register_interchain_account: {
        connection_id: string
        interchain_account_id: string
        [k: string]: unknown
      }
    }
  | {
      submit_tx: {
        connection_id: string
        fee: IbcFee
        interchain_account_id: string
        memo: string
        msgs: ProtobufAny[]
        timeout: number
        [k: string]: unknown
      }
    }
  | {
      register_interchain_query: {
        connection_id: string
        keys: KVKey[]
        query_type: string
        transactions_filter: string
        update_period: number
        [k: string]: unknown
      }
    }
  | {
      update_interchain_query: {
        new_keys?: KVKey[] | null
        new_transactions_filter?: string | null
        new_update_period?: number | null
        query_id: number
        [k: string]: unknown
      }
    }
  | {
      remove_interchain_query: {
        query_id: number
        [k: string]: unknown
      }
    }
  | {
      ibc_transfer: {
        fee: IbcFee
        memo: string
        receiver: string
        sender: string
        source_channel: string
        source_port: string
        timeout_height: RequestPacketTimeoutHeight
        timeout_timestamp: number
        token: Coin
        [k: string]: unknown
      }
    }
  | {
      submit_admin_proposal: {
        admin_proposal: AdminProposal
        [k: string]: unknown
      }
    }
  | {
      create_denom: {
        subdenom: string
        [k: string]: unknown
      }
    }
  | {
      change_admin: {
        denom: string
        new_admin_address: string
        [k: string]: unknown
      }
    }
  | {
      mint_tokens: {
        amount: Uint128
        denom: string
        mint_to_address: string
        [k: string]: unknown
      }
    }
  | {
      burn_tokens: {
        amount: Uint128
        burn_from_address: string
        denom: string
        [k: string]: unknown
      }
    }
  | {
      add_schedule: {
        msgs: MsgExecuteContract[]
        name: string
        period: number
        [k: string]: unknown
      }
    }
  | {
      remove_schedule: {
        name: string
        [k: string]: unknown
      }
    }
export type Binary = string
export type AdminProposal =
  | {
      param_change_proposal: ParamChangeProposal
    }
  | {
      software_upgrade_proposal: SoftwareUpgradeProposal
    }
  | {
      cancel_software_upgrade_proposal: CancelSoftwareUpgradeProposal
    }
  | {
      upgrade_proposal: UpgradeProposal
    }
  | {
      client_update_proposal: ClientUpdateProposal
    }
  | {
      pin_codes_proposal: PinCodesProposal
    }
  | {
      unpin_codes_proposal: UnpinCodesProposal
    }
  | {
      sudo_contract_proposal: SudoContractProposal
    }
  | {
      update_admin_proposal: UpdateAdminProposal
    }
  | {
      clear_admin_proposal: ClearAdminProposal
    }
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
        [k: string]: unknown
      }
    }
export type DistributionMsg =
  | {
      set_withdraw_address: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      withdraw_delegator_reward: {
        validator: string
        [k: string]: unknown
      }
    }
export type IbcMsg =
  | {
      transfer: {
        amount: Coin
        channel_id: string
        timeout: IbcTimeout
        to_address: string
        [k: string]: unknown
      }
    }
  | {
      send_packet: {
        channel_id: string
        data: Binary
        timeout: IbcTimeout
        [k: string]: unknown
      }
    }
  | {
      close_channel: {
        channel_id: string
        [k: string]: unknown
      }
    }
export type Timestamp = Uint64
export type Uint64 = string
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        label: string
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      migrate: {
        contract_addr: string
        msg: Binary
        new_code_id: number
        [k: string]: unknown
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
        [k: string]: unknown
      }
    }
  | {
      clear_admin: {
        contract_addr: string
        [k: string]: unknown
      }
    }
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
    [k: string]: unknown
  }
}
export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export interface Coin {
  amount: Uint128
  denom: string
  [k: string]: unknown
}
export interface IbcFee {
  ack_fee: Coin[]
  recv_fee: Coin[]
  timeout_fee: Coin[]
  [k: string]: unknown
}
export interface ProtobufAny {
  type_url: string
  value: Binary
  [k: string]: unknown
}
export interface KVKey {
  key: Binary
  path: string
  [k: string]: unknown
}
export interface RequestPacketTimeoutHeight {
  revision_height?: number | null
  revision_number?: number | null
  [k: string]: unknown
}
export interface ParamChangeProposal {
  description: string
  param_changes: ParamChange[]
  title: string
  [k: string]: unknown
}
export interface ParamChange {
  key: string
  subspace: string
  value: string
  [k: string]: unknown
}
export interface SoftwareUpgradeProposal {
  description: string
  plan: Plan
  title: string
  [k: string]: unknown
}
export interface Plan {
  height: number
  info: string
  name: string
  [k: string]: unknown
}
export interface CancelSoftwareUpgradeProposal {
  description: string
  title: string
  [k: string]: unknown
}
export interface UpgradeProposal {
  description: string
  plan: Plan
  title: string
  upgraded_client_state: ProtobufAny
  [k: string]: unknown
}
export interface ClientUpdateProposal {
  description: string
  subject_client_id: string
  substitute_client_id: string
  title: string
  [k: string]: unknown
}
export interface PinCodesProposal {
  code_ids: number[]
  description: string
  title: string
  [k: string]: unknown
}
export interface UnpinCodesProposal {
  code_ids: number[]
  description: string
  title: string
  [k: string]: unknown
}
export interface SudoContractProposal {
  contract: string
  description: string
  msg: Binary
  title: string
  [k: string]: unknown
}
export interface UpdateAdminProposal {
  contract: string
  description: string
  new_admin: string
  title: string
  [k: string]: unknown
}
export interface ClearAdminProposal {
  contract: string
  description: string
  title: string
  [k: string]: unknown
}
export interface MsgExecuteContract {
  contract: string
  msg: string
  [k: string]: unknown
}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
  [k: string]: unknown
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
  [k: string]: unknown
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      proposal: {
        proposal_id: number
      }
    }
  | {
      list_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      proposal_execution_error: {
        proposal_id: number
      }
    }
export interface MigrateMsg {
  [k: string]: unknown
}
export type Addr = string
export interface Config {
  overrule_pre_propose: Addr
  owner: Addr
  subdao: Addr
}
export type ProposalStatus =
  | 'timelocked'
  | 'overruled'
  | 'executed'
  | 'execution_failed'
export interface ProposalListResponse {
  proposals: SingleChoiceProposal[]
  [k: string]: unknown
}
export interface SingleChoiceProposal {
  id: number
  msgs: CosmosMsgForNeutronMsg[]
  status: ProposalStatus
  [k: string]: unknown
}
export type NullableString = string | null

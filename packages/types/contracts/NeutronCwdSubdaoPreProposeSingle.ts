import { Addr, Binary, Timestamp, Uint128 } from './common'

export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
      }
    }
  | {
      voting_module_token: {}
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export type DepositRefundPolicy = 'always' | 'only_passed' | 'never'
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  open_proposal_submission: boolean
}
export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
}
export type ExecuteMsg =
  | {
      propose: {
        msg: ProposeMessage
      }
    }
  | {
      update_config: {
        deposit_info?: UncheckedDepositInfo | null
        open_proposal_submission: boolean
      }
    }
  | {
      withdraw: {
        denom?: UncheckedDenom | null
      }
    }
  | {
      proposal_created_hook: {
        proposal_id: number
        proposer: string
      }
    }
  | {
      proposal_completed_hook: {
        new_status: Status
        proposal_id: number
      }
    }
export type ProposeMessage = {
  propose: {
    description: string
    msgs: CosmosMsgForNeutronMsg[]
    title: string
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
      stargate: {
        type_url: string
        value: Binary
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
      }
    }
  | {
      burn: {
        amount: Coin[]
      }
    }
export type NeutronMsg =
  | {
      register_interchain_account: {
        connection_id: string
        interchain_account_id: string
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
      }
    }
  | {
      register_interchain_query: {
        connection_id: string
        keys: KVKey[]
        query_type: string
        transactions_filter: string
        update_period: number
      }
    }
  | {
      update_interchain_query: {
        new_keys?: KVKey[] | null
        new_transactions_filter?: string | null
        new_update_period?: number | null
        query_id: number
      }
    }
  | {
      remove_interchain_query: {
        query_id: number
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
      }
    }
  | {
      submit_admin_proposal: {
        admin_proposal: AdminProposal
      }
    }
  | {
      create_denom: {
        subdenom: string
      }
    }
  | {
      change_admin: {
        denom: string
        new_admin_address: string
      }
    }
  | {
      mint_tokens: {
        amount: Uint128
        denom: string
        mint_to_address: string
      }
    }
  | {
      burn_tokens: {
        amount: Uint128
        burn_from_address: string
        denom: string
      }
    }
  | {
      add_schedule: {
        msgs: MsgExecuteContract[]
        name: string
        period: number
      }
    }
  | {
      remove_schedule: {
        name: string
      }
    }
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
export type IbcMsg =
  | {
      transfer: {
        amount: Coin
        channel_id: string
        timeout: IbcTimeout
        to_address: string
      }
    }
  | {
      send_packet: {
        channel_id: string
        data: Binary
        timeout: IbcTimeout
      }
    }
  | {
      close_channel: {
        channel_id: string
      }
    }
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        msg: Binary
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        label: string
        msg: Binary
      }
    }
  | {
      migrate: {
        contract_addr: string
        msg: Binary
        new_code_id: number
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
      }
    }
  | {
      clear_admin: {
        contract_addr: string
      }
    }
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
  }
}
export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export type Status =
  | 'open'
  | 'rejected'
  | 'passed'
  | 'executed'
  | 'closed'
  | 'execution_failed'
export interface Coin {
  amount: Uint128
  denom: string
}
export interface IbcFee {
  ack_fee: Coin[]
  recv_fee: Coin[]
  timeout_fee: Coin[]
}
export interface ProtobufAny {
  type_url: string
  value: Binary
}
export interface KVKey {
  key: Binary
  path: string
}
export interface RequestPacketTimeoutHeight {
  revision_height?: number | null
  revision_number?: number | null
}
export interface ParamChangeProposal {
  description: string
  param_changes: ParamChange[]
  title: string
}
export interface ParamChange {
  key: string
  subspace: string
  value: string
}
export interface SoftwareUpgradeProposal {
  description: string
  plan: Plan
  title: string
}
export interface Plan {
  height: number
  info: string
  name: string
}
export interface CancelSoftwareUpgradeProposal {
  description: string
  title: string
}
export interface UpgradeProposal {
  description: string
  plan: Plan
  title: string
  upgraded_client_state: ProtobufAny
}
export interface ClientUpdateProposal {
  description: string
  subject_client_id: string
  substitute_client_id: string
  title: string
}
export interface PinCodesProposal {
  code_ids: number[]
  description: string
  title: string
}
export interface UnpinCodesProposal {
  code_ids: number[]
  description: string
  title: string
}
export interface SudoContractProposal {
  contract: string
  description: string
  msg: Binary
  title: string
}
export interface UpdateAdminProposal {
  contract: string
  description: string
  new_admin: string
  title: string
}
export interface ClearAdminProposal {
  contract: string
  description: string
  title: string
}
export interface MsgExecuteContract {
  contract: string
  msg: string
}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
}
export type QueryMsg =
  | {
      proposal_module: {}
    }
  | {
      dao: {}
    }
  | {
      config: {}
    }
  | {
      deposit_info: {
        proposal_id: number
      }
    }
  | {
      query_extension: {
        msg: QueryExt
      }
    }
export type QueryExt = {
  timelock_address: {}
}
export type CheckedDenom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export interface Config {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
}
export interface CheckedDepositInfo {
  amount: Uint128
  denom: CheckedDenom
  refund_policy: DepositRefundPolicy
}
export interface DepositInfoResponse {
  deposit_info?: CheckedDepositInfo | null
  proposer: Addr
}

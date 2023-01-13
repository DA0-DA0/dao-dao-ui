export type Addr = string
export type Binary = string
export interface Coin {
  amount: Uint128
  denom: string
}
export type Decimal = string
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export interface Empty {}
export type Uint128 = string
export type Uint64 = string
export type Timestamp = Uint64
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

export type CosmosMsgFor_Empty =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
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
  | StargateMsg
export type CosmosMsgForEmpty = CosmosMsgFor_Empty

export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
  }
}
/**
 * The message types of the bank module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/bank/v1beta1/tx.proto
 */
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
/**
 * The message types of the staking module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/staking/v1beta1/tx.proto
 */
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
      }
    }
/**
 * The message types of the distribution module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/proto/cosmos/distribution/v1beta1/tx.proto
 */
export type DistributionMsg =
  | {
      set_withdraw_address: {
        /**
         * The `withdraw_address`
         */
        address: string
      }
    }
  | {
      withdraw_delegator_reward: {
        /**
         * The `validator_address`
         */
        validator: string
      }
    }
/**
 * The message type representing generic protobuf messages in CosmWasm.
 */
export type StargateMsg = {
  stargate: {
    type_url: string
    value: Binary
  }
}
/**
 * The message types of the wasm module.
 *
 * See https://github.com/CosmWasm/wasmd/blob/v0.14.0/x/wasm/internal/types/tx.proto
 */
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        /**
         * msg is the json-encoded ExecuteMsg struct (as raw Binary)
         */
        msg: Binary
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        /**
         * A human-readbale label for the contract
         */
        label: string
        /**
         * msg is the JSON-encoded InstantiateMsg struct (as raw Binary)
         */
        msg: Binary
      }
    }
  | {
      migrate: {
        contract_addr: string
        /**
         * msg is the json-encoded MigrateMsg struct that will be passed to the new code
         */
        msg: Binary
        /**
         * the code_id of the new logic to place in the given contract
         */
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

export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
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

// V2
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }

// V2
export interface ModuleInstantiateInfo {
  admin?: Admin | null
  code_id: number
  label: string
  msg: Binary
}

export interface ContractVersionInfo {
  contract: string
  version: string
}
export interface InfoResponse {
  info: ContractVersionInfo
}

// Pre-propose stuff.
export type CheckedDenom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export enum DepositRefundPolicy {
  Always = 'always',
  OnlyPassed = 'only_passed',
  Never = 'never',
}
export interface CheckedDepositInfo {
  amount: Uint128
  denom: CheckedDenom
  refund_policy: DepositRefundPolicy
}

export interface MintMsg {
  mint: {
    amount: Uint128
    recipient: string
  }
}

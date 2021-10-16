export type Vote = 'yes' | 'no' | 'abstain' | 'veto'

export interface VoteInfo {
  vote: Vote
  voter: string
  weight: number
}

/**
 * A thin wrapper around u64 that is using strings for JSON encoding/decoding, such that the full u64 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances of this and `u64` to get the value out:
 *
 * ``` # use cosmwasm_std::Uint64; let a = Uint64::from(42u64); assert_eq!(a.u64(), 42);
 *
 * let b = Uint64::from(70u32); assert_eq!(b.u64(), 70); ```
 */
export type Uint64 = string

/**
 * A thin wrapper around u128 that is using strings for JSON encoding/decoding, such that the full u128 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances of this and `u128` to get the value out:
 *
 * ``` # use cosmwasm_std::Uint128; let a = Uint128::from(123u128); assert_eq!(a.u128(), 123);
 *
 * let b = Uint128::from(42u64); assert_eq!(b.u128(), 42);
 *
 * let c = Uint128::from(70u32); assert_eq!(c.u128(), 70); ```
 */
export type Uint128 = string

/**
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 340282366920938463463.374607431768211455 (which is (2^128 - 1) / 10^18)
 */
export type Decimal = string

/**
 * A point in time in nanosecond precision.
 *
 * This type can represent times from 1970-01-01T00:00:00Z to 2554-07-21T23:34:33Z.
 */
export type Timestamp = Uint64

export type Status = 'pending' | 'open' | 'rejected' | 'passed' | 'executed'

/**
 * Expiration represents a point in time when some event happens. It can compare with a BlockInfo and will return is_expired() == true once the condition is hit (and for every block in the future)
 */
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {
        [k: string]: unknown
      }
    }

/**
 * This defines the different ways tallies can happen. Every contract should support a subset of these, ideally all.
 *
 * The total_weight used for calculating success as well as the weights of each individual voter used in tallying should be snapshotted at the beginning of the block at which the proposal starts (this is likely the responsibility of a correct cw4 implementation).
 */
export type ThresholdResponse =
  | {
      absolute_count: {
        total_weight: number
        weight: number
        [k: string]: unknown
      }
    }
  | {
      absolute_percentage: {
        percentage: Decimal
        total_weight: number
        [k: string]: unknown
      }
    }
  | {
      threshold_quorum: {
        quorum: Decimal
        threshold: Decimal
        total_weight: number
        [k: string]: unknown
      }
    }

export interface Coin {
  [k: string]: unknown
  amount: Uint128
  denom: string
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
        [k: string]: unknown
      }
    }
  | {
      burn: {
        amount: Coin[]
        [k: string]: unknown
      }
    }

/**
 * An empty struct that serves as a placeholder in different places, such as contracts that don't set a custom message.
 *
 * It is designed to be expressable in correct JSON and JSON Schema but contains no meaningful data. Previously we used enums without cases, but those cannot represented as valid JSON Schema (https://github.com/CosmWasm/cosmwasm/issues/451)
 */
export interface Empty {
  [k: string]: unknown
}

export type CosmosMsgFor_Empty_1 =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      wasm: WasmMsg
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
        /**
         * msg is the json-encoded ExecuteMsg struct (as raw Binary)
         */
        msg: Binary
        send: Coin[]
        [k: string]: unknown
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        /**
         * A human-readbale label for the contract
         */
        label: string
        /**
         * msg is the JSON-encoded InstantiateMsg struct (as raw Binary)
         */
        msg: Binary
        send: Coin[]
        [k: string]: unknown
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
/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
 */
export type Binary = string

/**
 * Note, if you are storing custom messages in the proposal, the querier needs to know what possible custom message types those are in order to parse the response
 */
export interface ProposalResponse {
  description: string
  expires: Expiration
  id: number
  msgs: CosmosMsgFor_Empty_1[]
  status: Status
  /**
   * This is the threshold that is applied to this proposal. Both the rules of the voting contract, as well as the total_weight of the voting group may have changed since this time. That means that the generic `Threshold{}` query does not provide valid information for existing proposals.
   */
  threshold: ThresholdResponse
  title: string
  [k: string]: unknown
}

export interface ProposalListResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}

/**
 * Duration is a delta of time. You can add it to a BlockInfo or Expiration to move that further in the future. Note that an height-based Duration and a time-based Expiration cannot be combined
 */
export type Duration =
  // TODO: review union type below
  // | {
  //     height: number
  //   }
  // |
  {
    time: number
  }

export interface InstantiateMsg {
  [k: string]: unknown
  max_voting_period: Duration
  required_weight: number
  voters: Voter[]
}

export interface Voter {
  addr: string
  weight: number
  [k: string]: unknown
}

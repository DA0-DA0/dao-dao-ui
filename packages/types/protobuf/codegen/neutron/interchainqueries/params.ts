import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** The parameters for the module. */
export interface Params {
  /**
   * The duration, measured in blocks, that must pass since the query's registration or its last
   * result submission before the query becomes eligible for removal by anyone. Is used to set
   * `submit_timeout` on Interchain Query registration.
   */
  querySubmitTimeout: bigint;
  /** Amount of coins required to be provided as deposit on Interchain Query registration. */
  queryDeposit: Coin[];
  /**
   * Amount of tx hashes to be removed during a single EndBlock. Can vary to balance between
   * network cleaning speed and EndBlock duration. A zero value means no limit.
   */
  txQueryRemovalLimit: bigint;
  /** Maximum amount of keys in a registered key value query */
  maxKvQueryKeysCount: bigint;
  /** max_transactions_filters defines maximum allowed amount of tx filters in msgRegisterInterchainQuery */
  maxTransactionsFilters: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.interchainqueries.Params";
  value: Uint8Array;
}
/** The parameters for the module. */
export interface ParamsAmino {
  /**
   * The duration, measured in blocks, that must pass since the query's registration or its last
   * result submission before the query becomes eligible for removal by anyone. Is used to set
   * `submit_timeout` on Interchain Query registration.
   */
  query_submit_timeout?: string;
  /** Amount of coins required to be provided as deposit on Interchain Query registration. */
  query_deposit?: CoinAmino[];
  /**
   * Amount of tx hashes to be removed during a single EndBlock. Can vary to balance between
   * network cleaning speed and EndBlock duration. A zero value means no limit.
   */
  tx_query_removal_limit?: string;
  /** Maximum amount of keys in a registered key value query */
  max_kv_query_keys_count?: string;
  /** max_transactions_filters defines maximum allowed amount of tx filters in msgRegisterInterchainQuery */
  max_transactions_filters?: string;
}
export interface ParamsAminoMsg {
  type: "/neutron.interchainqueries.Params";
  value: ParamsAmino;
}
/** The parameters for the module. */
export interface ParamsSDKType {
  query_submit_timeout: bigint;
  query_deposit: CoinSDKType[];
  tx_query_removal_limit: bigint;
  max_kv_query_keys_count: bigint;
  max_transactions_filters: bigint;
}
function createBaseParams(): Params {
  return {
    querySubmitTimeout: BigInt(0),
    queryDeposit: [],
    txQueryRemovalLimit: BigInt(0),
    maxKvQueryKeysCount: BigInt(0),
    maxTransactionsFilters: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/neutron.interchainqueries.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.querySubmitTimeout !== BigInt(0)) {
      writer.uint32(8).uint64(message.querySubmitTimeout);
    }
    for (const v of message.queryDeposit) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.txQueryRemovalLimit !== BigInt(0)) {
      writer.uint32(24).uint64(message.txQueryRemovalLimit);
    }
    if (message.maxKvQueryKeysCount !== BigInt(0)) {
      writer.uint32(32).uint64(message.maxKvQueryKeysCount);
    }
    if (message.maxTransactionsFilters !== BigInt(0)) {
      writer.uint32(40).uint64(message.maxTransactionsFilters);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.querySubmitTimeout = reader.uint64();
          break;
        case 2:
          message.queryDeposit.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.txQueryRemovalLimit = reader.uint64();
          break;
        case 4:
          message.maxKvQueryKeysCount = reader.uint64();
          break;
        case 5:
          message.maxTransactionsFilters = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.querySubmitTimeout = object.querySubmitTimeout !== undefined && object.querySubmitTimeout !== null ? BigInt(object.querySubmitTimeout.toString()) : BigInt(0);
    message.queryDeposit = object.queryDeposit?.map(e => Coin.fromPartial(e)) || [];
    message.txQueryRemovalLimit = object.txQueryRemovalLimit !== undefined && object.txQueryRemovalLimit !== null ? BigInt(object.txQueryRemovalLimit.toString()) : BigInt(0);
    message.maxKvQueryKeysCount = object.maxKvQueryKeysCount !== undefined && object.maxKvQueryKeysCount !== null ? BigInt(object.maxKvQueryKeysCount.toString()) : BigInt(0);
    message.maxTransactionsFilters = object.maxTransactionsFilters !== undefined && object.maxTransactionsFilters !== null ? BigInt(object.maxTransactionsFilters.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.query_submit_timeout !== undefined && object.query_submit_timeout !== null) {
      message.querySubmitTimeout = BigInt(object.query_submit_timeout);
    }
    message.queryDeposit = object.query_deposit?.map(e => Coin.fromAmino(e)) || [];
    if (object.tx_query_removal_limit !== undefined && object.tx_query_removal_limit !== null) {
      message.txQueryRemovalLimit = BigInt(object.tx_query_removal_limit);
    }
    if (object.max_kv_query_keys_count !== undefined && object.max_kv_query_keys_count !== null) {
      message.maxKvQueryKeysCount = BigInt(object.max_kv_query_keys_count);
    }
    if (object.max_transactions_filters !== undefined && object.max_transactions_filters !== null) {
      message.maxTransactionsFilters = BigInt(object.max_transactions_filters);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.query_submit_timeout = message.querySubmitTimeout !== BigInt(0) ? message.querySubmitTimeout.toString() : undefined;
    if (message.queryDeposit) {
      obj.query_deposit = message.queryDeposit.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.query_deposit = message.queryDeposit;
    }
    obj.tx_query_removal_limit = message.txQueryRemovalLimit !== BigInt(0) ? message.txQueryRemovalLimit.toString() : undefined;
    obj.max_kv_query_keys_count = message.maxKvQueryKeysCount !== BigInt(0) ? message.maxKvQueryKeysCount.toString() : undefined;
    obj.max_transactions_filters = message.maxTransactionsFilters !== BigInt(0) ? message.maxTransactionsFilters.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.Params",
      value: Params.encode(message).finish()
    };
  }
};
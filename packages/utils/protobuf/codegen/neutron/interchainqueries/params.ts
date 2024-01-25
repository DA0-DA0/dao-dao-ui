import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /**
   * Defines amount of blocks required before query becomes available for
   * removal by anybody
   */
  querySubmitTimeout: bigint;
  /** Amount of coins deposited for the query. */
  queryDeposit: Coin[];
  /**
   * Amount of tx hashes to be removed during a single EndBlock. Can vary to
   * balance between network cleaning speed and EndBlock duration. A zero value
   * means no limit.
   */
  txQueryRemovalLimit: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.interchainqueries.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /**
   * Defines amount of blocks required before query becomes available for
   * removal by anybody
   */
  query_submit_timeout?: string;
  /** Amount of coins deposited for the query. */
  query_deposit?: CoinAmino[];
  /**
   * Amount of tx hashes to be removed during a single EndBlock. Can vary to
   * balance between network cleaning speed and EndBlock duration. A zero value
   * means no limit.
   */
  tx_query_removal_limit?: string;
}
export interface ParamsAminoMsg {
  type: "/neutron.interchainqueries.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  query_submit_timeout: bigint;
  query_deposit: CoinSDKType[];
  tx_query_removal_limit: bigint;
}
function createBaseParams(): Params {
  return {
    querySubmitTimeout: BigInt(0),
    queryDeposit: [],
    txQueryRemovalLimit: BigInt(0)
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
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.query_submit_timeout = message.querySubmitTimeout ? message.querySubmitTimeout.toString() : undefined;
    if (message.queryDeposit) {
      obj.query_deposit = message.queryDeposit.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.query_deposit = [];
    }
    obj.tx_query_removal_limit = message.txQueryRemovalLimit ? message.txQueryRemovalLimit.toString() : undefined;
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
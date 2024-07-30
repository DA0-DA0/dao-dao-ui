import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** Defines maximum amount of messages to be passed in MsgSubmitTx */
  msgSubmitTxMaxMessages: bigint;
  /** Defines a minimum fee required to register interchain account */
  registerFee: Coin[];
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.interchaintxs.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** Defines maximum amount of messages to be passed in MsgSubmitTx */
  msg_submit_tx_max_messages?: string;
  /** Defines a minimum fee required to register interchain account */
  register_fee?: CoinAmino[];
}
export interface ParamsAminoMsg {
  type: "/neutron.interchaintxs.v1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  msg_submit_tx_max_messages: bigint;
  register_fee: CoinSDKType[];
}
function createBaseParams(): Params {
  return {
    msgSubmitTxMaxMessages: BigInt(0),
    registerFee: []
  };
}
export const Params = {
  typeUrl: "/neutron.interchaintxs.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.msgSubmitTxMaxMessages !== BigInt(0)) {
      writer.uint32(8).uint64(message.msgSubmitTxMaxMessages);
    }
    for (const v of message.registerFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.msgSubmitTxMaxMessages = reader.uint64();
          break;
        case 2:
          message.registerFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
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
    message.msgSubmitTxMaxMessages = object.msgSubmitTxMaxMessages !== undefined && object.msgSubmitTxMaxMessages !== null ? BigInt(object.msgSubmitTxMaxMessages.toString()) : BigInt(0);
    message.registerFee = object.registerFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.msg_submit_tx_max_messages !== undefined && object.msg_submit_tx_max_messages !== null) {
      message.msgSubmitTxMaxMessages = BigInt(object.msg_submit_tx_max_messages);
    }
    message.registerFee = object.register_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.msg_submit_tx_max_messages = message.msgSubmitTxMaxMessages !== BigInt(0) ? message.msgSubmitTxMaxMessages.toString() : undefined;
    if (message.registerFee) {
      obj.register_fee = message.registerFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.register_fee = message.registerFee;
    }
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
      typeUrl: "/neutron.interchaintxs.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
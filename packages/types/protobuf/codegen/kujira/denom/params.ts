import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params holds parameters for the denom module */
export interface Params {
  creationFee: Coin[];
}
export interface ParamsProtoMsg {
  typeUrl: "/kujira.denom.Params";
  value: Uint8Array;
}
/** Params holds parameters for the denom module */
export interface ParamsAmino {
  creation_fee?: CoinAmino[];
}
export interface ParamsAminoMsg {
  type: "/kujira.denom.Params";
  value: ParamsAmino;
}
/** Params holds parameters for the denom module */
export interface ParamsSDKType {
  creation_fee: CoinSDKType[];
}
function createBaseParams(): Params {
  return {
    creationFee: []
  };
}
export const Params = {
  typeUrl: "/kujira.denom.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
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
          message.creationFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
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
    message.creationFee = object.creationFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.creationFee = object.creation_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.creationFee) {
      obj.creation_fee = message.creationFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.creation_fee = [];
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
      typeUrl: "/kujira.denom.Params",
      value: Params.encode(message).finish()
    };
  }
};
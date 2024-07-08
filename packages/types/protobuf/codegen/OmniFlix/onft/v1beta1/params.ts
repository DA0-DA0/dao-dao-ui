import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface Params {
  denomCreationFee: Coin | undefined;
}
export interface ParamsProtoMsg {
  typeUrl: "/OmniFlix.onft.v1beta1.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  denom_creation_fee?: CoinAmino | undefined;
}
export interface ParamsAminoMsg {
  type: "/OmniFlix.onft.v1beta1.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  denom_creation_fee: CoinSDKType | undefined;
}
function createBaseParams(): Params {
  return {
    denomCreationFee: Coin.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/OmniFlix.onft.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denomCreationFee !== undefined) {
      Coin.encode(message.denomCreationFee, writer.uint32(10).fork()).ldelim();
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
          message.denomCreationFee = Coin.decode(reader, reader.uint32(), useInterfaces);
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
    message.denomCreationFee = object.denomCreationFee !== undefined && object.denomCreationFee !== null ? Coin.fromPartial(object.denomCreationFee) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.denom_creation_fee !== undefined && object.denom_creation_fee !== null) {
      message.denomCreationFee = Coin.fromAmino(object.denom_creation_fee);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.denom_creation_fee = message.denomCreationFee ? Coin.toAmino(message.denomCreationFee, useInterfaces) : undefined;
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
      typeUrl: "/OmniFlix.onft.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};
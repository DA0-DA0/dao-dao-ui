import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** Params defines fantoken module's parameters */
export interface Params {
  issueFee: Coin | undefined;
  mintFee: Coin | undefined;
  burnFee: Coin | undefined;
}
export interface ParamsProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines fantoken module's parameters */
export interface ParamsAmino {
  issue_fee?: CoinAmino | undefined;
  mint_fee?: CoinAmino | undefined;
  burn_fee?: CoinAmino | undefined;
}
export interface ParamsAminoMsg {
  type: "/bitsong.fantoken.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines fantoken module's parameters */
export interface ParamsSDKType {
  issue_fee: CoinSDKType | undefined;
  mint_fee: CoinSDKType | undefined;
  burn_fee: CoinSDKType | undefined;
}
function createBaseParams(): Params {
  return {
    issueFee: Coin.fromPartial({}),
    mintFee: Coin.fromPartial({}),
    burnFee: Coin.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/bitsong.fantoken.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.issueFee !== undefined) {
      Coin.encode(message.issueFee, writer.uint32(10).fork()).ldelim();
    }
    if (message.mintFee !== undefined) {
      Coin.encode(message.mintFee, writer.uint32(18).fork()).ldelim();
    }
    if (message.burnFee !== undefined) {
      Coin.encode(message.burnFee, writer.uint32(26).fork()).ldelim();
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
          message.issueFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.mintFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.burnFee = Coin.decode(reader, reader.uint32(), useInterfaces);
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
    message.issueFee = object.issueFee !== undefined && object.issueFee !== null ? Coin.fromPartial(object.issueFee) : undefined;
    message.mintFee = object.mintFee !== undefined && object.mintFee !== null ? Coin.fromPartial(object.mintFee) : undefined;
    message.burnFee = object.burnFee !== undefined && object.burnFee !== null ? Coin.fromPartial(object.burnFee) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.issue_fee !== undefined && object.issue_fee !== null) {
      message.issueFee = Coin.fromAmino(object.issue_fee);
    }
    if (object.mint_fee !== undefined && object.mint_fee !== null) {
      message.mintFee = Coin.fromAmino(object.mint_fee);
    }
    if (object.burn_fee !== undefined && object.burn_fee !== null) {
      message.burnFee = Coin.fromAmino(object.burn_fee);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.issue_fee = message.issueFee ? Coin.toAmino(message.issueFee, useInterfaces) : undefined;
    obj.mint_fee = message.mintFee ? Coin.toAmino(message.mintFee, useInterfaces) : undefined;
    obj.burn_fee = message.burnFee ? Coin.toAmino(message.burnFee, useInterfaces) : undefined;
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
      typeUrl: "/bitsong.fantoken.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};
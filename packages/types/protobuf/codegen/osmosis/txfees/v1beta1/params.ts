import { BinaryReader, BinaryWriter } from "../../../binary";
/** Params holds parameters for the txfees module */
export interface Params {
  whitelistedFeeTokenSetters: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/osmosis.txfees.v1beta1.Params";
  value: Uint8Array;
}
/** Params holds parameters for the txfees module */
export interface ParamsAmino {
  whitelisted_fee_token_setters?: string[];
}
export interface ParamsAminoMsg {
  type: "osmosis/txfees/params";
  value: ParamsAmino;
}
/** Params holds parameters for the txfees module */
export interface ParamsSDKType {
  whitelisted_fee_token_setters: string[];
}
function createBaseParams(): Params {
  return {
    whitelistedFeeTokenSetters: []
  };
}
export const Params = {
  typeUrl: "/osmosis.txfees.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.whitelistedFeeTokenSetters) {
      writer.uint32(10).string(v!);
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
          message.whitelistedFeeTokenSetters.push(reader.string());
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
    message.whitelistedFeeTokenSetters = object.whitelistedFeeTokenSetters?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.whitelistedFeeTokenSetters = object.whitelisted_fee_token_setters?.map(e => e) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.whitelistedFeeTokenSetters) {
      obj.whitelisted_fee_token_setters = message.whitelistedFeeTokenSetters.map(e => e);
    } else {
      obj.whitelisted_fee_token_setters = [];
    }
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params, useInterfaces: boolean = false): ParamsAminoMsg {
    return {
      type: "osmosis/txfees/params",
      value: Params.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/osmosis.txfees.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};
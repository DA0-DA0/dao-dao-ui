import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface TokenWeight {
  denom: string;
  normalizedWeight: string;
}
export interface TokenWeightProtoMsg {
  typeUrl: "/pryzm.amm.v1.TokenWeight";
  value: Uint8Array;
}
export interface TokenWeightAmino {
  denom?: string;
  normalized_weight?: string;
}
export interface TokenWeightAminoMsg {
  type: "/pryzm.amm.v1.TokenWeight";
  value: TokenWeightAmino;
}
export interface TokenWeightSDKType {
  denom: string;
  normalized_weight: string;
}
function createBaseTokenWeight(): TokenWeight {
  return {
    denom: "",
    normalizedWeight: ""
  };
}
export const TokenWeight = {
  typeUrl: "/pryzm.amm.v1.TokenWeight",
  encode(message: TokenWeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.normalizedWeight !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.normalizedWeight, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenWeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenWeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.normalizedWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenWeight>): TokenWeight {
    const message = createBaseTokenWeight();
    message.denom = object.denom ?? "";
    message.normalizedWeight = object.normalizedWeight ?? "";
    return message;
  },
  fromAmino(object: TokenWeightAmino): TokenWeight {
    const message = createBaseTokenWeight();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.normalized_weight !== undefined && object.normalized_weight !== null) {
      message.normalizedWeight = object.normalized_weight;
    }
    return message;
  },
  toAmino(message: TokenWeight, useInterfaces: boolean = false): TokenWeightAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.normalized_weight = message.normalizedWeight === "" ? undefined : message.normalizedWeight;
    return obj;
  },
  fromAminoMsg(object: TokenWeightAminoMsg): TokenWeight {
    return TokenWeight.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenWeightProtoMsg, useInterfaces: boolean = false): TokenWeight {
    return TokenWeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenWeight): Uint8Array {
    return TokenWeight.encode(message).finish();
  },
  toProtoMsg(message: TokenWeight): TokenWeightProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.TokenWeight",
      value: TokenWeight.encode(message).finish()
    };
  }
};
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * PerMessageBurnLimit is the maximum amount of a certain denom that can be
 * burned in an single burn
 * @param denom the denom
 * @param amount the amount that can be burned (in microunits).  An amount of
 * 1000000 uusdc is equivalent to 1USDC
 */
export interface PerMessageBurnLimit {
  denom: string;
  amount: string;
}
export interface PerMessageBurnLimitProtoMsg {
  typeUrl: "/circle.cctp.v1.PerMessageBurnLimit";
  value: Uint8Array;
}
/**
 * PerMessageBurnLimit is the maximum amount of a certain denom that can be
 * burned in an single burn
 * @param denom the denom
 * @param amount the amount that can be burned (in microunits).  An amount of
 * 1000000 uusdc is equivalent to 1USDC
 */
export interface PerMessageBurnLimitAmino {
  denom?: string;
  amount?: string;
}
export interface PerMessageBurnLimitAminoMsg {
  type: "/circle.cctp.v1.PerMessageBurnLimit";
  value: PerMessageBurnLimitAmino;
}
/**
 * PerMessageBurnLimit is the maximum amount of a certain denom that can be
 * burned in an single burn
 * @param denom the denom
 * @param amount the amount that can be burned (in microunits).  An amount of
 * 1000000 uusdc is equivalent to 1USDC
 */
export interface PerMessageBurnLimitSDKType {
  denom: string;
  amount: string;
}
function createBasePerMessageBurnLimit(): PerMessageBurnLimit {
  return {
    denom: "",
    amount: ""
  };
}
export const PerMessageBurnLimit = {
  typeUrl: "/circle.cctp.v1.PerMessageBurnLimit",
  encode(message: PerMessageBurnLimit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PerMessageBurnLimit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerMessageBurnLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PerMessageBurnLimit>): PerMessageBurnLimit {
    const message = createBasePerMessageBurnLimit();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: PerMessageBurnLimitAmino): PerMessageBurnLimit {
    const message = createBasePerMessageBurnLimit();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: PerMessageBurnLimit, useInterfaces: boolean = false): PerMessageBurnLimitAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: PerMessageBurnLimitAminoMsg): PerMessageBurnLimit {
    return PerMessageBurnLimit.fromAmino(object.value);
  },
  fromProtoMsg(message: PerMessageBurnLimitProtoMsg, useInterfaces: boolean = false): PerMessageBurnLimit {
    return PerMessageBurnLimit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PerMessageBurnLimit): Uint8Array {
    return PerMessageBurnLimit.encode(message).finish();
  },
  toProtoMsg(message: PerMessageBurnLimit): PerMessageBurnLimitProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.PerMessageBurnLimit",
      value: PerMessageBurnLimit.encode(message).finish()
    };
  }
};
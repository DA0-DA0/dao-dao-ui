import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface MaxMessageBodySize {
  amount: bigint;
}
export interface MaxMessageBodySizeProtoMsg {
  typeUrl: "/circle.cctp.v1.MaxMessageBodySize";
  value: Uint8Array;
}
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface MaxMessageBodySizeAmino {
  amount?: string;
}
export interface MaxMessageBodySizeAminoMsg {
  type: "/circle.cctp.v1.MaxMessageBodySize";
  value: MaxMessageBodySizeAmino;
}
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface MaxMessageBodySizeSDKType {
  amount: bigint;
}
function createBaseMaxMessageBodySize(): MaxMessageBodySize {
  return {
    amount: BigInt(0)
  };
}
export const MaxMessageBodySize = {
  typeUrl: "/circle.cctp.v1.MaxMessageBodySize",
  encode(message: MaxMessageBodySize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== BigInt(0)) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MaxMessageBodySize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaxMessageBodySize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaxMessageBodySize>): MaxMessageBodySize {
    const message = createBaseMaxMessageBodySize();
    message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MaxMessageBodySizeAmino): MaxMessageBodySize {
    const message = createBaseMaxMessageBodySize();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = BigInt(object.amount);
    }
    return message;
  },
  toAmino(message: MaxMessageBodySize, useInterfaces: boolean = false): MaxMessageBodySizeAmino {
    const obj: any = {};
    obj.amount = message.amount ? message.amount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MaxMessageBodySizeAminoMsg): MaxMessageBodySize {
    return MaxMessageBodySize.fromAmino(object.value);
  },
  fromProtoMsg(message: MaxMessageBodySizeProtoMsg, useInterfaces: boolean = false): MaxMessageBodySize {
    return MaxMessageBodySize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MaxMessageBodySize): Uint8Array {
    return MaxMessageBodySize.encode(message).finish();
  },
  toProtoMsg(message: MaxMessageBodySize): MaxMessageBodySizeProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MaxMessageBodySize",
      value: MaxMessageBodySize.encode(message).finish()
    };
  }
};
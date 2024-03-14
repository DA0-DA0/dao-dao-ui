import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface BurningAndMintingPaused {
  paused: boolean;
}
export interface BurningAndMintingPausedProtoMsg {
  typeUrl: "/circle.cctp.v1.BurningAndMintingPaused";
  value: Uint8Array;
}
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface BurningAndMintingPausedAmino {
  paused?: boolean;
}
export interface BurningAndMintingPausedAminoMsg {
  type: "/circle.cctp.v1.BurningAndMintingPaused";
  value: BurningAndMintingPausedAmino;
}
/**
 * Message format for BurningAndMintingPaused
 * @param paused true if paused, false if not paused
 */
export interface BurningAndMintingPausedSDKType {
  paused: boolean;
}
function createBaseBurningAndMintingPaused(): BurningAndMintingPaused {
  return {
    paused: false
  };
}
export const BurningAndMintingPaused = {
  typeUrl: "/circle.cctp.v1.BurningAndMintingPaused",
  encode(message: BurningAndMintingPaused, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused === true) {
      writer.uint32(8).bool(message.paused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BurningAndMintingPaused {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurningAndMintingPaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BurningAndMintingPaused>): BurningAndMintingPaused {
    const message = createBaseBurningAndMintingPaused();
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: BurningAndMintingPausedAmino): BurningAndMintingPaused {
    const message = createBaseBurningAndMintingPaused();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    return message;
  },
  toAmino(message: BurningAndMintingPaused, useInterfaces: boolean = false): BurningAndMintingPausedAmino {
    const obj: any = {};
    obj.paused = message.paused;
    return obj;
  },
  fromAminoMsg(object: BurningAndMintingPausedAminoMsg): BurningAndMintingPaused {
    return BurningAndMintingPaused.fromAmino(object.value);
  },
  fromProtoMsg(message: BurningAndMintingPausedProtoMsg, useInterfaces: boolean = false): BurningAndMintingPaused {
    return BurningAndMintingPaused.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BurningAndMintingPaused): Uint8Array {
    return BurningAndMintingPaused.encode(message).finish();
  },
  toProtoMsg(message: BurningAndMintingPaused): BurningAndMintingPausedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.BurningAndMintingPaused",
      value: BurningAndMintingPaused.encode(message).finish()
    };
  }
};
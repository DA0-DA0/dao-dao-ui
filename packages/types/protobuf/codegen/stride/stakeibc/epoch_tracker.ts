import { BinaryReader, BinaryWriter } from "../../binary";
export interface EpochTracker {
  epochIdentifier: string;
  epochNumber: bigint;
  nextEpochStartTime: bigint;
  duration: bigint;
}
export interface EpochTrackerProtoMsg {
  typeUrl: "/stride.stakeibc.EpochTracker";
  value: Uint8Array;
}
export interface EpochTrackerAmino {
  epoch_identifier?: string;
  epoch_number?: string;
  next_epoch_start_time?: string;
  duration?: string;
}
export interface EpochTrackerAminoMsg {
  type: "/stride.stakeibc.EpochTracker";
  value: EpochTrackerAmino;
}
export interface EpochTrackerSDKType {
  epoch_identifier: string;
  epoch_number: bigint;
  next_epoch_start_time: bigint;
  duration: bigint;
}
function createBaseEpochTracker(): EpochTracker {
  return {
    epochIdentifier: "",
    epochNumber: BigInt(0),
    nextEpochStartTime: BigInt(0),
    duration: BigInt(0)
  };
}
export const EpochTracker = {
  typeUrl: "/stride.stakeibc.EpochTracker",
  encode(message: EpochTracker, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochIdentifier !== "") {
      writer.uint32(10).string(message.epochIdentifier);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).uint64(message.epochNumber);
    }
    if (message.nextEpochStartTime !== BigInt(0)) {
      writer.uint32(24).uint64(message.nextEpochStartTime);
    }
    if (message.duration !== BigInt(0)) {
      writer.uint32(32).uint64(message.duration);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EpochTracker {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpochTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochIdentifier = reader.string();
          break;
        case 2:
          message.epochNumber = reader.uint64();
          break;
        case 3:
          message.nextEpochStartTime = reader.uint64();
          break;
        case 4:
          message.duration = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EpochTracker>): EpochTracker {
    const message = createBaseEpochTracker();
    message.epochIdentifier = object.epochIdentifier ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.nextEpochStartTime = object.nextEpochStartTime !== undefined && object.nextEpochStartTime !== null ? BigInt(object.nextEpochStartTime.toString()) : BigInt(0);
    message.duration = object.duration !== undefined && object.duration !== null ? BigInt(object.duration.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EpochTrackerAmino): EpochTracker {
    const message = createBaseEpochTracker();
    if (object.epoch_identifier !== undefined && object.epoch_identifier !== null) {
      message.epochIdentifier = object.epoch_identifier;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.next_epoch_start_time !== undefined && object.next_epoch_start_time !== null) {
      message.nextEpochStartTime = BigInt(object.next_epoch_start_time);
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = BigInt(object.duration);
    }
    return message;
  },
  toAmino(message: EpochTracker, useInterfaces: boolean = false): EpochTrackerAmino {
    const obj: any = {};
    obj.epoch_identifier = message.epochIdentifier === "" ? undefined : message.epochIdentifier;
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    obj.next_epoch_start_time = message.nextEpochStartTime !== BigInt(0) ? message.nextEpochStartTime.toString() : undefined;
    obj.duration = message.duration !== BigInt(0) ? message.duration.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EpochTrackerAminoMsg): EpochTracker {
    return EpochTracker.fromAmino(object.value);
  },
  fromProtoMsg(message: EpochTrackerProtoMsg, useInterfaces: boolean = false): EpochTracker {
    return EpochTracker.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EpochTracker): Uint8Array {
    return EpochTracker.encode(message).finish();
  },
  toProtoMsg(message: EpochTracker): EpochTrackerProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.EpochTracker",
      value: EpochTracker.encode(message).finish()
    };
  }
};
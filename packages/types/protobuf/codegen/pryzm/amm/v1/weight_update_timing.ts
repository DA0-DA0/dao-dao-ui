import { BinaryReader, BinaryWriter } from "../../../binary";
export interface WeightUpdateTiming {
  poolId: bigint;
  startUnixMillis: bigint;
  endUnixMillis: bigint;
}
export interface WeightUpdateTimingProtoMsg {
  typeUrl: "/pryzm.amm.v1.WeightUpdateTiming";
  value: Uint8Array;
}
export interface WeightUpdateTimingAmino {
  pool_id?: string;
  start_unix_millis?: string;
  end_unix_millis?: string;
}
export interface WeightUpdateTimingAminoMsg {
  type: "/pryzm.amm.v1.WeightUpdateTiming";
  value: WeightUpdateTimingAmino;
}
export interface WeightUpdateTimingSDKType {
  pool_id: bigint;
  start_unix_millis: bigint;
  end_unix_millis: bigint;
}
function createBaseWeightUpdateTiming(): WeightUpdateTiming {
  return {
    poolId: BigInt(0),
    startUnixMillis: BigInt(0),
    endUnixMillis: BigInt(0)
  };
}
export const WeightUpdateTiming = {
  typeUrl: "/pryzm.amm.v1.WeightUpdateTiming",
  encode(message: WeightUpdateTiming, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.startUnixMillis !== BigInt(0)) {
      writer.uint32(16).int64(message.startUnixMillis);
    }
    if (message.endUnixMillis !== BigInt(0)) {
      writer.uint32(24).int64(message.endUnixMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): WeightUpdateTiming {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightUpdateTiming();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.startUnixMillis = reader.int64();
          break;
        case 3:
          message.endUnixMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WeightUpdateTiming>): WeightUpdateTiming {
    const message = createBaseWeightUpdateTiming();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.startUnixMillis = object.startUnixMillis !== undefined && object.startUnixMillis !== null ? BigInt(object.startUnixMillis.toString()) : BigInt(0);
    message.endUnixMillis = object.endUnixMillis !== undefined && object.endUnixMillis !== null ? BigInt(object.endUnixMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: WeightUpdateTimingAmino): WeightUpdateTiming {
    const message = createBaseWeightUpdateTiming();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.start_unix_millis !== undefined && object.start_unix_millis !== null) {
      message.startUnixMillis = BigInt(object.start_unix_millis);
    }
    if (object.end_unix_millis !== undefined && object.end_unix_millis !== null) {
      message.endUnixMillis = BigInt(object.end_unix_millis);
    }
    return message;
  },
  toAmino(message: WeightUpdateTiming, useInterfaces: boolean = false): WeightUpdateTimingAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.start_unix_millis = message.startUnixMillis !== BigInt(0) ? message.startUnixMillis.toString() : undefined;
    obj.end_unix_millis = message.endUnixMillis !== BigInt(0) ? message.endUnixMillis.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: WeightUpdateTimingAminoMsg): WeightUpdateTiming {
    return WeightUpdateTiming.fromAmino(object.value);
  },
  fromProtoMsg(message: WeightUpdateTimingProtoMsg, useInterfaces: boolean = false): WeightUpdateTiming {
    return WeightUpdateTiming.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: WeightUpdateTiming): Uint8Array {
    return WeightUpdateTiming.encode(message).finish();
  },
  toProtoMsg(message: WeightUpdateTiming): WeightUpdateTimingProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.WeightUpdateTiming",
      value: WeightUpdateTiming.encode(message).finish()
    };
  }
};
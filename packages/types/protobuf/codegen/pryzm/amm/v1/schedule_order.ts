import { BinaryReader, BinaryWriter } from "../../../binary";
export interface ScheduleOrder {
  timeMillis: bigint;
  orderId: bigint;
}
export interface ScheduleOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.ScheduleOrder";
  value: Uint8Array;
}
export interface ScheduleOrderAmino {
  time_millis?: string;
  order_id?: string;
}
export interface ScheduleOrderAminoMsg {
  type: "/pryzm.amm.v1.ScheduleOrder";
  value: ScheduleOrderAmino;
}
export interface ScheduleOrderSDKType {
  time_millis: bigint;
  order_id: bigint;
}
function createBaseScheduleOrder(): ScheduleOrder {
  return {
    timeMillis: BigInt(0),
    orderId: BigInt(0)
  };
}
export const ScheduleOrder = {
  typeUrl: "/pryzm.amm.v1.ScheduleOrder",
  encode(message: ScheduleOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.timeMillis !== BigInt(0)) {
      writer.uint32(8).int64(message.timeMillis);
    }
    if (message.orderId !== BigInt(0)) {
      writer.uint32(16).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ScheduleOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeMillis = reader.int64();
          break;
        case 2:
          message.orderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ScheduleOrder>): ScheduleOrder {
    const message = createBaseScheduleOrder();
    message.timeMillis = object.timeMillis !== undefined && object.timeMillis !== null ? BigInt(object.timeMillis.toString()) : BigInt(0);
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ScheduleOrderAmino): ScheduleOrder {
    const message = createBaseScheduleOrder();
    if (object.time_millis !== undefined && object.time_millis !== null) {
      message.timeMillis = BigInt(object.time_millis);
    }
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    return message;
  },
  toAmino(message: ScheduleOrder, useInterfaces: boolean = false): ScheduleOrderAmino {
    const obj: any = {};
    obj.time_millis = message.timeMillis !== BigInt(0) ? message.timeMillis.toString() : undefined;
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ScheduleOrderAminoMsg): ScheduleOrder {
    return ScheduleOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: ScheduleOrderProtoMsg, useInterfaces: boolean = false): ScheduleOrder {
    return ScheduleOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ScheduleOrder): Uint8Array {
    return ScheduleOrder.encode(message).finish();
  },
  toProtoMsg(message: ScheduleOrder): ScheduleOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.ScheduleOrder",
      value: ScheduleOrder.encode(message).finish()
    };
  }
};
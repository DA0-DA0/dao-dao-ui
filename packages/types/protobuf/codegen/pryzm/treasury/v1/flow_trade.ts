import { Timestamp } from "../../../google/protobuf/timestamp";
import { ActionType } from "./action";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export interface FlowTrade {
  endTime: Date | undefined;
  flowId: bigint;
  actionType: ActionType;
}
export interface FlowTradeProtoMsg {
  typeUrl: "/pryzm.treasury.v1.FlowTrade";
  value: Uint8Array;
}
export interface FlowTradeAmino {
  end_time?: string | undefined;
  flow_id?: string;
  action_type?: ActionType;
}
export interface FlowTradeAminoMsg {
  type: "/pryzm.treasury.v1.FlowTrade";
  value: FlowTradeAmino;
}
export interface FlowTradeSDKType {
  end_time: Date | undefined;
  flow_id: bigint;
  action_type: ActionType;
}
function createBaseFlowTrade(): FlowTrade {
  return {
    endTime: new Date(),
    flowId: BigInt(0),
    actionType: 0
  };
}
export const FlowTrade = {
  typeUrl: "/pryzm.treasury.v1.FlowTrade",
  encode(message: FlowTrade, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.flowId !== BigInt(0)) {
      writer.uint32(16).uint64(message.flowId);
    }
    if (message.actionType !== 0) {
      writer.uint32(24).int32(message.actionType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FlowTrade {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlowTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.flowId = reader.uint64();
          break;
        case 3:
          message.actionType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FlowTrade>): FlowTrade {
    const message = createBaseFlowTrade();
    message.endTime = object.endTime ?? undefined;
    message.flowId = object.flowId !== undefined && object.flowId !== null ? BigInt(object.flowId.toString()) : BigInt(0);
    message.actionType = object.actionType ?? 0;
    return message;
  },
  fromAmino(object: FlowTradeAmino): FlowTrade {
    const message = createBaseFlowTrade();
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    if (object.flow_id !== undefined && object.flow_id !== null) {
      message.flowId = BigInt(object.flow_id);
    }
    if (object.action_type !== undefined && object.action_type !== null) {
      message.actionType = object.action_type;
    }
    return message;
  },
  toAmino(message: FlowTrade, useInterfaces: boolean = false): FlowTradeAmino {
    const obj: any = {};
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    obj.flow_id = message.flowId !== BigInt(0) ? message.flowId.toString() : undefined;
    obj.action_type = message.actionType === 0 ? undefined : message.actionType;
    return obj;
  },
  fromAminoMsg(object: FlowTradeAminoMsg): FlowTrade {
    return FlowTrade.fromAmino(object.value);
  },
  fromProtoMsg(message: FlowTradeProtoMsg, useInterfaces: boolean = false): FlowTrade {
    return FlowTrade.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FlowTrade): Uint8Array {
    return FlowTrade.encode(message).finish();
  },
  toProtoMsg(message: FlowTrade): FlowTradeProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.FlowTrade",
      value: FlowTrade.encode(message).finish()
    };
  }
};
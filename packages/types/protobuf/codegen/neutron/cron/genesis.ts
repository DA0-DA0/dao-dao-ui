//@ts-nocheck
import { Schedule, ScheduleAmino, ScheduleSDKType } from "./schedule";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the cron module's genesis state. */
export interface GenesisState {
  scheduleList: Schedule[];
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.cron.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the cron module's genesis state. */
export interface GenesisStateAmino {
  scheduleList?: ScheduleAmino[];
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/neutron.cron.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the cron module's genesis state. */
export interface GenesisStateSDKType {
  scheduleList: ScheduleSDKType[];
  params: ParamsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    scheduleList: [],
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/neutron.cron.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.scheduleList) {
      Schedule.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.scheduleList.push(Schedule.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.scheduleList = object.scheduleList?.map(e => Schedule.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.scheduleList = object.scheduleList?.map(e => Schedule.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    if (message.scheduleList) {
      obj.scheduleList = message.scheduleList.map(e => e ? Schedule.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.scheduleList = [];
    }
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/neutron.cron.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
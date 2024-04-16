//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Hook, HookAmino, HookSDKType } from "./hook";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the scheduler module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  hookList: Hook[];
  hookCount: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/kujira.scheduler.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the scheduler module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  hookList?: HookAmino[];
  hookCount?: string;
}
export interface GenesisStateAminoMsg {
  type: "/kujira.scheduler.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the scheduler module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  hookList: HookSDKType[];
  hookCount: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    hookList: [],
    hookCount: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/kujira.scheduler.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.hookList) {
      Hook.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.hookCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.hookCount);
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
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.hookList.push(Hook.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.hookCount = reader.uint64();
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
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.hookList = object.hookList?.map(e => Hook.fromPartial(e)) || [];
    message.hookCount = object.hookCount !== undefined && object.hookCount !== null ? BigInt(object.hookCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.hookList = object.hookList?.map(e => Hook.fromAmino(e)) || [];
    if (object.hookCount !== undefined && object.hookCount !== null) {
      message.hookCount = BigInt(object.hookCount);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.hookList) {
      obj.hookList = message.hookList.map(e => e ? Hook.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.hookList = [];
    }
    obj.hookCount = message.hookCount ? message.hookCount.toString() : undefined;
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
      typeUrl: "/kujira.scheduler.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
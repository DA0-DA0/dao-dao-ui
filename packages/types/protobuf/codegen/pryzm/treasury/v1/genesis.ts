//@ts-nocheck
import { Action, ActionAmino, ActionSDKType } from "./action";
import { FlowTrade, FlowTradeAmino, FlowTradeSDKType } from "./flow_trade";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the treasury module's genesis state. */
export interface GenesisState {
  action: Action | undefined;
  flowTradeList: FlowTrade[];
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.treasury.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the treasury module's genesis state. */
export interface GenesisStateAmino {
  action?: ActionAmino | undefined;
  flow_trade_list?: FlowTradeAmino[];
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.treasury.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the treasury module's genesis state. */
export interface GenesisStateSDKType {
  action: ActionSDKType | undefined;
  flow_trade_list: FlowTradeSDKType[];
  params: ParamsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    action: Action.fromPartial({}),
    flowTradeList: [],
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.treasury.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.flowTradeList) {
      FlowTrade.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
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
          message.action = Action.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.flowTradeList.push(FlowTrade.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
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
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    message.flowTradeList = object.flowTradeList?.map(e => FlowTrade.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    message.flowTradeList = object.flow_trade_list?.map(e => FlowTrade.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action, useInterfaces) : undefined;
    if (message.flowTradeList) {
      obj.flow_trade_list = message.flowTradeList.map(e => e ? FlowTrade.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.flow_trade_list = message.flowTradeList;
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
      typeUrl: "/pryzm.treasury.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
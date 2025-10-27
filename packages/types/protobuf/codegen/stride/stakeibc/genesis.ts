//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostZone, HostZoneAmino, HostZoneSDKType } from "./host_zone";
import { EpochTracker, EpochTrackerAmino, EpochTrackerSDKType } from "./epoch_tracker";
import { TradeRoute, TradeRouteAmino, TradeRouteSDKType } from "./trade_route";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the stakeibc module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  portId: string;
  hostZoneList: HostZone[];
  epochTrackerList: EpochTracker[];
  tradeRoutes: TradeRoute[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/stride.stakeibc.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the stakeibc module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  port_id?: string;
  host_zone_list?: HostZoneAmino[];
  epoch_tracker_list?: EpochTrackerAmino[];
  trade_routes?: TradeRouteAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/stride.stakeibc.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the stakeibc module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  port_id: string;
  host_zone_list: HostZoneSDKType[];
  epoch_tracker_list: EpochTrackerSDKType[];
  trade_routes: TradeRouteSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    portId: "",
    hostZoneList: [],
    epochTrackerList: [],
    tradeRoutes: []
  };
}
export const GenesisState = {
  typeUrl: "/stride.stakeibc.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    for (const v of message.hostZoneList) {
      HostZone.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.epochTrackerList) {
      EpochTracker.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.tradeRoutes) {
      TradeRoute.encode(v!, writer.uint32(98).fork()).ldelim();
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
          message.portId = reader.string();
          break;
        case 5:
          message.hostZoneList.push(HostZone.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.epochTrackerList.push(EpochTracker.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 12:
          message.tradeRoutes.push(TradeRoute.decode(reader, reader.uint32(), useInterfaces));
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
    message.portId = object.portId ?? "";
    message.hostZoneList = object.hostZoneList?.map(e => HostZone.fromPartial(e)) || [];
    message.epochTrackerList = object.epochTrackerList?.map(e => EpochTracker.fromPartial(e)) || [];
    message.tradeRoutes = object.tradeRoutes?.map(e => TradeRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    message.hostZoneList = object.host_zone_list?.map(e => HostZone.fromAmino(e)) || [];
    message.epochTrackerList = object.epoch_tracker_list?.map(e => EpochTracker.fromAmino(e)) || [];
    message.tradeRoutes = object.trade_routes?.map(e => TradeRoute.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.port_id = message.portId === "" ? undefined : message.portId;
    if (message.hostZoneList) {
      obj.host_zone_list = message.hostZoneList.map(e => e ? HostZone.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_zone_list = message.hostZoneList;
    }
    if (message.epochTrackerList) {
      obj.epoch_tracker_list = message.epochTrackerList.map(e => e ? EpochTracker.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.epoch_tracker_list = message.epochTrackerList;
    }
    if (message.tradeRoutes) {
      obj.trade_routes = message.tradeRoutes.map(e => e ? TradeRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.trade_routes = message.tradeRoutes;
    }
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
      typeUrl: "/stride.stakeibc.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
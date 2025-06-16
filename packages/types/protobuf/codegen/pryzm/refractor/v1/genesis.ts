//@ts-nocheck
import { AssetState, AssetStateAmino, AssetStateSDKType } from "./asset_state";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the refractor module's genesis state. */
export interface GenesisState {
  assetStateList: AssetState[];
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.refractor.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the refractor module's genesis state. */
export interface GenesisStateAmino {
  asset_state_list?: AssetStateAmino[];
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.refractor.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the refractor module's genesis state. */
export interface GenesisStateSDKType {
  asset_state_list: AssetStateSDKType[];
  params: ParamsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    assetStateList: [],
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.refractor.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assetStateList) {
      AssetState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
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
          message.assetStateList.push(AssetState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
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
    message.assetStateList = object.assetStateList?.map(e => AssetState.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.assetStateList = object.asset_state_list?.map(e => AssetState.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    if (message.assetStateList) {
      obj.asset_state_list = message.assetStateList.map(e => e ? AssetState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.asset_state_list = message.assetStateList;
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
      typeUrl: "/pryzm.refractor.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
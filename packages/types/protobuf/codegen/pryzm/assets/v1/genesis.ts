//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { RefractableAsset, RefractableAssetAmino, RefractableAssetSDKType } from "./refractable_asset";
import { MaturityLevel, MaturityLevelAmino, MaturityLevelSDKType } from "./maturity_level";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the assets module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  assets: RefractableAsset[];
  maturityLevelList: MaturityLevel[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.assets.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  assets?: RefractableAssetAmino[];
  maturity_level_list?: MaturityLevelAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.assets.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  assets: RefractableAssetSDKType[];
  maturity_level_list: MaturityLevelSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    assets: [],
    maturityLevelList: []
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.assets.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.assets) {
      RefractableAsset.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.maturityLevelList) {
      MaturityLevel.encode(v!, writer.uint32(34).fork()).ldelim();
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
          message.assets.push(RefractableAsset.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.maturityLevelList.push(MaturityLevel.decode(reader, reader.uint32(), useInterfaces));
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
    message.assets = object.assets?.map(e => RefractableAsset.fromPartial(e)) || [];
    message.maturityLevelList = object.maturityLevelList?.map(e => MaturityLevel.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.assets = object.assets?.map(e => RefractableAsset.fromAmino(e)) || [];
    message.maturityLevelList = object.maturity_level_list?.map(e => MaturityLevel.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? RefractableAsset.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = message.assets;
    }
    if (message.maturityLevelList) {
      obj.maturity_level_list = message.maturityLevelList.map(e => e ? MaturityLevel.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.maturity_level_list = message.maturityLevelList;
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
      typeUrl: "/pryzm.assets.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
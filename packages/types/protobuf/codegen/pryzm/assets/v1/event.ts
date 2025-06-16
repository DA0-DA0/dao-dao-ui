import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { MaturityLevel, MaturityLevelAmino, MaturityLevelSDKType } from "./maturity_level";
import { RefractableAsset, RefractableAssetAmino, RefractableAssetSDKType } from "./refractable_asset";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.assets.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.assets.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
export interface EventAddMaturityLevel {
  maturityLevel: MaturityLevel | undefined;
}
export interface EventAddMaturityLevelProtoMsg {
  typeUrl: "/pryzm.assets.v1.EventAddMaturityLevel";
  value: Uint8Array;
}
export interface EventAddMaturityLevelAmino {
  maturity_level?: MaturityLevelAmino | undefined;
}
export interface EventAddMaturityLevelAminoMsg {
  type: "/pryzm.assets.v1.EventAddMaturityLevel";
  value: EventAddMaturityLevelAmino;
}
export interface EventAddMaturityLevelSDKType {
  maturity_level: MaturityLevelSDKType | undefined;
}
export interface EventDeactivateMaturityLevel {
  maturityLevel: MaturityLevel | undefined;
}
export interface EventDeactivateMaturityLevelProtoMsg {
  typeUrl: "/pryzm.assets.v1.EventDeactivateMaturityLevel";
  value: Uint8Array;
}
export interface EventDeactivateMaturityLevelAmino {
  maturity_level?: MaturityLevelAmino | undefined;
}
export interface EventDeactivateMaturityLevelAminoMsg {
  type: "/pryzm.assets.v1.EventDeactivateMaturityLevel";
  value: EventDeactivateMaturityLevelAmino;
}
export interface EventDeactivateMaturityLevelSDKType {
  maturity_level: MaturityLevelSDKType | undefined;
}
export interface EventSetRefractableAsset {
  refractableAsset: RefractableAsset | undefined;
}
export interface EventSetRefractableAssetProtoMsg {
  typeUrl: "/pryzm.assets.v1.EventSetRefractableAsset";
  value: Uint8Array;
}
export interface EventSetRefractableAssetAmino {
  refractable_asset?: RefractableAssetAmino | undefined;
}
export interface EventSetRefractableAssetAminoMsg {
  type: "/pryzm.assets.v1.EventSetRefractableAsset";
  value: EventSetRefractableAssetAmino;
}
export interface EventSetRefractableAssetSDKType {
  refractable_asset: RefractableAssetSDKType | undefined;
}
export interface EventSetMaturityLevel {
  maturityLevel: MaturityLevel | undefined;
}
export interface EventSetMaturityLevelProtoMsg {
  typeUrl: "/pryzm.assets.v1.EventSetMaturityLevel";
  value: Uint8Array;
}
export interface EventSetMaturityLevelAmino {
  maturity_level?: MaturityLevelAmino | undefined;
}
export interface EventSetMaturityLevelAminoMsg {
  type: "/pryzm.assets.v1.EventSetMaturityLevel";
  value: EventSetMaturityLevelAmino;
}
export interface EventSetMaturityLevelSDKType {
  maturity_level: MaturityLevelSDKType | undefined;
}
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.assets.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};
function createBaseEventAddMaturityLevel(): EventAddMaturityLevel {
  return {
    maturityLevel: MaturityLevel.fromPartial({})
  };
}
export const EventAddMaturityLevel = {
  typeUrl: "/pryzm.assets.v1.EventAddMaturityLevel",
  encode(message: EventAddMaturityLevel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturityLevel !== undefined) {
      MaturityLevel.encode(message.maturityLevel, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventAddMaturityLevel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddMaturityLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maturityLevel = MaturityLevel.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAddMaturityLevel>): EventAddMaturityLevel {
    const message = createBaseEventAddMaturityLevel();
    message.maturityLevel = object.maturityLevel !== undefined && object.maturityLevel !== null ? MaturityLevel.fromPartial(object.maturityLevel) : undefined;
    return message;
  },
  fromAmino(object: EventAddMaturityLevelAmino): EventAddMaturityLevel {
    const message = createBaseEventAddMaturityLevel();
    if (object.maturity_level !== undefined && object.maturity_level !== null) {
      message.maturityLevel = MaturityLevel.fromAmino(object.maturity_level);
    }
    return message;
  },
  toAmino(message: EventAddMaturityLevel, useInterfaces: boolean = false): EventAddMaturityLevelAmino {
    const obj: any = {};
    obj.maturity_level = message.maturityLevel ? MaturityLevel.toAmino(message.maturityLevel, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventAddMaturityLevelAminoMsg): EventAddMaturityLevel {
    return EventAddMaturityLevel.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAddMaturityLevelProtoMsg, useInterfaces: boolean = false): EventAddMaturityLevel {
    return EventAddMaturityLevel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventAddMaturityLevel): Uint8Array {
    return EventAddMaturityLevel.encode(message).finish();
  },
  toProtoMsg(message: EventAddMaturityLevel): EventAddMaturityLevelProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.EventAddMaturityLevel",
      value: EventAddMaturityLevel.encode(message).finish()
    };
  }
};
function createBaseEventDeactivateMaturityLevel(): EventDeactivateMaturityLevel {
  return {
    maturityLevel: MaturityLevel.fromPartial({})
  };
}
export const EventDeactivateMaturityLevel = {
  typeUrl: "/pryzm.assets.v1.EventDeactivateMaturityLevel",
  encode(message: EventDeactivateMaturityLevel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturityLevel !== undefined) {
      MaturityLevel.encode(message.maturityLevel, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDeactivateMaturityLevel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeactivateMaturityLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maturityLevel = MaturityLevel.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDeactivateMaturityLevel>): EventDeactivateMaturityLevel {
    const message = createBaseEventDeactivateMaturityLevel();
    message.maturityLevel = object.maturityLevel !== undefined && object.maturityLevel !== null ? MaturityLevel.fromPartial(object.maturityLevel) : undefined;
    return message;
  },
  fromAmino(object: EventDeactivateMaturityLevelAmino): EventDeactivateMaturityLevel {
    const message = createBaseEventDeactivateMaturityLevel();
    if (object.maturity_level !== undefined && object.maturity_level !== null) {
      message.maturityLevel = MaturityLevel.fromAmino(object.maturity_level);
    }
    return message;
  },
  toAmino(message: EventDeactivateMaturityLevel, useInterfaces: boolean = false): EventDeactivateMaturityLevelAmino {
    const obj: any = {};
    obj.maturity_level = message.maturityLevel ? MaturityLevel.toAmino(message.maturityLevel, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventDeactivateMaturityLevelAminoMsg): EventDeactivateMaturityLevel {
    return EventDeactivateMaturityLevel.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDeactivateMaturityLevelProtoMsg, useInterfaces: boolean = false): EventDeactivateMaturityLevel {
    return EventDeactivateMaturityLevel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDeactivateMaturityLevel): Uint8Array {
    return EventDeactivateMaturityLevel.encode(message).finish();
  },
  toProtoMsg(message: EventDeactivateMaturityLevel): EventDeactivateMaturityLevelProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.EventDeactivateMaturityLevel",
      value: EventDeactivateMaturityLevel.encode(message).finish()
    };
  }
};
function createBaseEventSetRefractableAsset(): EventSetRefractableAsset {
  return {
    refractableAsset: RefractableAsset.fromPartial({})
  };
}
export const EventSetRefractableAsset = {
  typeUrl: "/pryzm.assets.v1.EventSetRefractableAsset",
  encode(message: EventSetRefractableAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.refractableAsset !== undefined) {
      RefractableAsset.encode(message.refractableAsset, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetRefractableAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetRefractableAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refractableAsset = RefractableAsset.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetRefractableAsset>): EventSetRefractableAsset {
    const message = createBaseEventSetRefractableAsset();
    message.refractableAsset = object.refractableAsset !== undefined && object.refractableAsset !== null ? RefractableAsset.fromPartial(object.refractableAsset) : undefined;
    return message;
  },
  fromAmino(object: EventSetRefractableAssetAmino): EventSetRefractableAsset {
    const message = createBaseEventSetRefractableAsset();
    if (object.refractable_asset !== undefined && object.refractable_asset !== null) {
      message.refractableAsset = RefractableAsset.fromAmino(object.refractable_asset);
    }
    return message;
  },
  toAmino(message: EventSetRefractableAsset, useInterfaces: boolean = false): EventSetRefractableAssetAmino {
    const obj: any = {};
    obj.refractable_asset = message.refractableAsset ? RefractableAsset.toAmino(message.refractableAsset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetRefractableAssetAminoMsg): EventSetRefractableAsset {
    return EventSetRefractableAsset.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetRefractableAssetProtoMsg, useInterfaces: boolean = false): EventSetRefractableAsset {
    return EventSetRefractableAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetRefractableAsset): Uint8Array {
    return EventSetRefractableAsset.encode(message).finish();
  },
  toProtoMsg(message: EventSetRefractableAsset): EventSetRefractableAssetProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.EventSetRefractableAsset",
      value: EventSetRefractableAsset.encode(message).finish()
    };
  }
};
function createBaseEventSetMaturityLevel(): EventSetMaturityLevel {
  return {
    maturityLevel: MaturityLevel.fromPartial({})
  };
}
export const EventSetMaturityLevel = {
  typeUrl: "/pryzm.assets.v1.EventSetMaturityLevel",
  encode(message: EventSetMaturityLevel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturityLevel !== undefined) {
      MaturityLevel.encode(message.maturityLevel, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetMaturityLevel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetMaturityLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maturityLevel = MaturityLevel.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetMaturityLevel>): EventSetMaturityLevel {
    const message = createBaseEventSetMaturityLevel();
    message.maturityLevel = object.maturityLevel !== undefined && object.maturityLevel !== null ? MaturityLevel.fromPartial(object.maturityLevel) : undefined;
    return message;
  },
  fromAmino(object: EventSetMaturityLevelAmino): EventSetMaturityLevel {
    const message = createBaseEventSetMaturityLevel();
    if (object.maturity_level !== undefined && object.maturity_level !== null) {
      message.maturityLevel = MaturityLevel.fromAmino(object.maturity_level);
    }
    return message;
  },
  toAmino(message: EventSetMaturityLevel, useInterfaces: boolean = false): EventSetMaturityLevelAmino {
    const obj: any = {};
    obj.maturity_level = message.maturityLevel ? MaturityLevel.toAmino(message.maturityLevel, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetMaturityLevelAminoMsg): EventSetMaturityLevel {
    return EventSetMaturityLevel.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetMaturityLevelProtoMsg, useInterfaces: boolean = false): EventSetMaturityLevel {
    return EventSetMaturityLevel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetMaturityLevel): Uint8Array {
    return EventSetMaturityLevel.encode(message).finish();
  },
  toProtoMsg(message: EventSetMaturityLevel): EventSetMaturityLevelProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.EventSetMaturityLevel",
      value: EventSetMaturityLevel.encode(message).finish()
    };
  }
};
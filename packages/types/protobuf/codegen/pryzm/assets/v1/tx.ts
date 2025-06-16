//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { RefractableAsset, RefractableAssetAmino, RefractableAssetSDKType, MaturityParams, MaturityParamsAmino, MaturityParamsSDKType, FeeRatios, FeeRatiosAmino, FeeRatiosSDKType } from "./refractable_asset";
import { MaturityLevel, MaturityLevelAmino, MaturityLevelSDKType } from "./maturity_level";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgRegisterAsset {
  creator: string;
  asset: RefractableAsset | undefined;
}
export interface MsgRegisterAssetProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgRegisterAsset";
  value: Uint8Array;
}
export interface MsgRegisterAssetAmino {
  creator?: string;
  asset: RefractableAssetAmino | undefined;
}
export interface MsgRegisterAssetAminoMsg {
  type: "pryzm/assets/v1/RegisterAsset";
  value: MsgRegisterAssetAmino;
}
export interface MsgRegisterAssetSDKType {
  creator: string;
  asset: RefractableAssetSDKType | undefined;
}
export interface MsgRegisterAssetResponse {}
export interface MsgRegisterAssetResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgRegisterAssetResponse";
  value: Uint8Array;
}
export interface MsgRegisterAssetResponseAmino {}
export interface MsgRegisterAssetResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgRegisterAssetResponse";
  value: MsgRegisterAssetResponseAmino;
}
export interface MsgRegisterAssetResponseSDKType {}
export interface MsgDisableAsset {
  creator: string;
  assetId: string;
}
export interface MsgDisableAssetProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgDisableAsset";
  value: Uint8Array;
}
export interface MsgDisableAssetAmino {
  creator?: string;
  asset_id?: string;
}
export interface MsgDisableAssetAminoMsg {
  type: "pryzm/assets/v1/DisableAsset";
  value: MsgDisableAssetAmino;
}
export interface MsgDisableAssetSDKType {
  creator: string;
  asset_id: string;
}
export interface MsgDisableAssetResponse {}
export interface MsgDisableAssetResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgDisableAssetResponse";
  value: Uint8Array;
}
export interface MsgDisableAssetResponseAmino {}
export interface MsgDisableAssetResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgDisableAssetResponse";
  value: MsgDisableAssetResponseAmino;
}
export interface MsgDisableAssetResponseSDKType {}
export interface MsgUpdateMaturityParams {
  authority: string;
  assetId: string;
  params: MaturityParams | undefined;
}
export interface MsgUpdateMaturityParamsProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams";
  value: Uint8Array;
}
export interface MsgUpdateMaturityParamsAmino {
  authority?: string;
  asset_id?: string;
  params: MaturityParamsAmino | undefined;
}
export interface MsgUpdateMaturityParamsAminoMsg {
  type: "pryzm/assets/v1/UpdateMaturityParams";
  value: MsgUpdateMaturityParamsAmino;
}
export interface MsgUpdateMaturityParamsSDKType {
  authority: string;
  asset_id: string;
  params: MaturityParamsSDKType | undefined;
}
export interface MsgUpdateMaturityParamsResponse {}
export interface MsgUpdateMaturityParamsResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateMaturityParamsResponseAmino {}
export interface MsgUpdateMaturityParamsResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgUpdateMaturityParamsResponse";
  value: MsgUpdateMaturityParamsResponseAmino;
}
export interface MsgUpdateMaturityParamsResponseSDKType {}
export interface MsgUpdateFeeRatios {
  authority: string;
  assetId: string;
  feeRatios: FeeRatios | undefined;
}
export interface MsgUpdateFeeRatiosProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios";
  value: Uint8Array;
}
export interface MsgUpdateFeeRatiosAmino {
  authority?: string;
  asset_id?: string;
  fee_ratios: FeeRatiosAmino | undefined;
}
export interface MsgUpdateFeeRatiosAminoMsg {
  type: "pryzm/assets/v1/UpdateFeeRatios";
  value: MsgUpdateFeeRatiosAmino;
}
export interface MsgUpdateFeeRatiosSDKType {
  authority: string;
  asset_id: string;
  fee_ratios: FeeRatiosSDKType | undefined;
}
export interface MsgUpdateFeeRatiosResponse {}
export interface MsgUpdateFeeRatiosResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatiosResponse";
  value: Uint8Array;
}
export interface MsgUpdateFeeRatiosResponseAmino {}
export interface MsgUpdateFeeRatiosResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgUpdateFeeRatiosResponse";
  value: MsgUpdateFeeRatiosResponseAmino;
}
export interface MsgUpdateFeeRatiosResponseSDKType {}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pryzm/assets/v1/UpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgIntroduceMaturityLevel {
  creator: string;
  assetId: string;
  symbol: string;
}
export interface MsgIntroduceMaturityLevelProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel";
  value: Uint8Array;
}
export interface MsgIntroduceMaturityLevelAmino {
  creator?: string;
  asset_id?: string;
  symbol?: string;
}
export interface MsgIntroduceMaturityLevelAminoMsg {
  type: "pryzm/assets/v1/IntroduceMaturityLevel";
  value: MsgIntroduceMaturityLevelAmino;
}
export interface MsgIntroduceMaturityLevelSDKType {
  creator: string;
  asset_id: string;
  symbol: string;
}
export interface MsgIntroduceMaturityLevelResponse {
  maturityLevel: MaturityLevel | undefined;
}
export interface MsgIntroduceMaturityLevelResponseProtoMsg {
  typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevelResponse";
  value: Uint8Array;
}
export interface MsgIntroduceMaturityLevelResponseAmino {
  maturity_level?: MaturityLevelAmino | undefined;
}
export interface MsgIntroduceMaturityLevelResponseAminoMsg {
  type: "/pryzm.assets.v1.MsgIntroduceMaturityLevelResponse";
  value: MsgIntroduceMaturityLevelResponseAmino;
}
export interface MsgIntroduceMaturityLevelResponseSDKType {
  maturity_level: MaturityLevelSDKType | undefined;
}
function createBaseMsgRegisterAsset(): MsgRegisterAsset {
  return {
    creator: "",
    asset: RefractableAsset.fromPartial({})
  };
}
export const MsgRegisterAsset = {
  typeUrl: "/pryzm.assets.v1.MsgRegisterAsset",
  encode(message: MsgRegisterAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.asset !== undefined) {
      RefractableAsset.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.asset = RefractableAsset.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterAsset>): MsgRegisterAsset {
    const message = createBaseMsgRegisterAsset();
    message.creator = object.creator ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? RefractableAsset.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgRegisterAssetAmino): MsgRegisterAsset {
    const message = createBaseMsgRegisterAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = RefractableAsset.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgRegisterAsset, useInterfaces: boolean = false): MsgRegisterAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.asset = message.asset ? RefractableAsset.toAmino(message.asset, useInterfaces) : RefractableAsset.toAmino(RefractableAsset.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgRegisterAssetAminoMsg): MsgRegisterAsset {
    return MsgRegisterAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterAsset, useInterfaces: boolean = false): MsgRegisterAssetAminoMsg {
    return {
      type: "pryzm/assets/v1/RegisterAsset",
      value: MsgRegisterAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterAssetProtoMsg, useInterfaces: boolean = false): MsgRegisterAsset {
    return MsgRegisterAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterAsset): Uint8Array {
    return MsgRegisterAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterAsset): MsgRegisterAssetProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgRegisterAsset",
      value: MsgRegisterAsset.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterAssetResponse(): MsgRegisterAssetResponse {
  return {};
}
export const MsgRegisterAssetResponse = {
  typeUrl: "/pryzm.assets.v1.MsgRegisterAssetResponse",
  encode(_: MsgRegisterAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAssetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRegisterAssetResponse>): MsgRegisterAssetResponse {
    const message = createBaseMsgRegisterAssetResponse();
    return message;
  },
  fromAmino(_: MsgRegisterAssetResponseAmino): MsgRegisterAssetResponse {
    const message = createBaseMsgRegisterAssetResponse();
    return message;
  },
  toAmino(_: MsgRegisterAssetResponse, useInterfaces: boolean = false): MsgRegisterAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterAssetResponseAminoMsg): MsgRegisterAssetResponse {
    return MsgRegisterAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterAssetResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterAssetResponse {
    return MsgRegisterAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterAssetResponse): Uint8Array {
    return MsgRegisterAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterAssetResponse): MsgRegisterAssetResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgRegisterAssetResponse",
      value: MsgRegisterAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDisableAsset(): MsgDisableAsset {
  return {
    creator: "",
    assetId: ""
  };
}
export const MsgDisableAsset = {
  typeUrl: "/pryzm.assets.v1.MsgDisableAsset",
  encode(message: MsgDisableAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDisableAsset>): MsgDisableAsset {
    const message = createBaseMsgDisableAsset();
    message.creator = object.creator ?? "";
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: MsgDisableAssetAmino): MsgDisableAsset {
    const message = createBaseMsgDisableAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: MsgDisableAsset, useInterfaces: boolean = false): MsgDisableAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: MsgDisableAssetAminoMsg): MsgDisableAsset {
    return MsgDisableAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDisableAsset, useInterfaces: boolean = false): MsgDisableAssetAminoMsg {
    return {
      type: "pryzm/assets/v1/DisableAsset",
      value: MsgDisableAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDisableAssetProtoMsg, useInterfaces: boolean = false): MsgDisableAsset {
    return MsgDisableAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableAsset): Uint8Array {
    return MsgDisableAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableAsset): MsgDisableAssetProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgDisableAsset",
      value: MsgDisableAsset.encode(message).finish()
    };
  }
};
function createBaseMsgDisableAssetResponse(): MsgDisableAssetResponse {
  return {};
}
export const MsgDisableAssetResponse = {
  typeUrl: "/pryzm.assets.v1.MsgDisableAssetResponse",
  encode(_: MsgDisableAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableAssetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgDisableAssetResponse>): MsgDisableAssetResponse {
    const message = createBaseMsgDisableAssetResponse();
    return message;
  },
  fromAmino(_: MsgDisableAssetResponseAmino): MsgDisableAssetResponse {
    const message = createBaseMsgDisableAssetResponse();
    return message;
  },
  toAmino(_: MsgDisableAssetResponse, useInterfaces: boolean = false): MsgDisableAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDisableAssetResponseAminoMsg): MsgDisableAssetResponse {
    return MsgDisableAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDisableAssetResponseProtoMsg, useInterfaces: boolean = false): MsgDisableAssetResponse {
    return MsgDisableAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableAssetResponse): Uint8Array {
    return MsgDisableAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableAssetResponse): MsgDisableAssetResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgDisableAssetResponse",
      value: MsgDisableAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMaturityParams(): MsgUpdateMaturityParams {
  return {
    authority: "",
    assetId: "",
    params: MaturityParams.fromPartial({})
  };
}
export const MsgUpdateMaturityParams = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams",
  encode(message: MsgUpdateMaturityParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.params !== undefined) {
      MaturityParams.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMaturityParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMaturityParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.params = MaturityParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateMaturityParams>): MsgUpdateMaturityParams {
    const message = createBaseMsgUpdateMaturityParams();
    message.authority = object.authority ?? "";
    message.assetId = object.assetId ?? "";
    message.params = object.params !== undefined && object.params !== null ? MaturityParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateMaturityParamsAmino): MsgUpdateMaturityParams {
    const message = createBaseMsgUpdateMaturityParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = MaturityParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateMaturityParams, useInterfaces: boolean = false): MsgUpdateMaturityParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.params = message.params ? MaturityParams.toAmino(message.params, useInterfaces) : MaturityParams.toAmino(MaturityParams.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMaturityParamsAminoMsg): MsgUpdateMaturityParams {
    return MsgUpdateMaturityParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateMaturityParams, useInterfaces: boolean = false): MsgUpdateMaturityParamsAminoMsg {
    return {
      type: "pryzm/assets/v1/UpdateMaturityParams",
      value: MsgUpdateMaturityParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateMaturityParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateMaturityParams {
    return MsgUpdateMaturityParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMaturityParams): Uint8Array {
    return MsgUpdateMaturityParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMaturityParams): MsgUpdateMaturityParamsProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams",
      value: MsgUpdateMaturityParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMaturityParamsResponse(): MsgUpdateMaturityParamsResponse {
  return {};
}
export const MsgUpdateMaturityParamsResponse = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParamsResponse",
  encode(_: MsgUpdateMaturityParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMaturityParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMaturityParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateMaturityParamsResponse>): MsgUpdateMaturityParamsResponse {
    const message = createBaseMsgUpdateMaturityParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateMaturityParamsResponseAmino): MsgUpdateMaturityParamsResponse {
    const message = createBaseMsgUpdateMaturityParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateMaturityParamsResponse, useInterfaces: boolean = false): MsgUpdateMaturityParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMaturityParamsResponseAminoMsg): MsgUpdateMaturityParamsResponse {
    return MsgUpdateMaturityParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMaturityParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateMaturityParamsResponse {
    return MsgUpdateMaturityParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMaturityParamsResponse): Uint8Array {
    return MsgUpdateMaturityParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMaturityParamsResponse): MsgUpdateMaturityParamsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParamsResponse",
      value: MsgUpdateMaturityParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateFeeRatios(): MsgUpdateFeeRatios {
  return {
    authority: "",
    assetId: "",
    feeRatios: FeeRatios.fromPartial({})
  };
}
export const MsgUpdateFeeRatios = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios",
  encode(message: MsgUpdateFeeRatios, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.feeRatios !== undefined) {
      FeeRatios.encode(message.feeRatios, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateFeeRatios {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateFeeRatios();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.feeRatios = FeeRatios.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateFeeRatios>): MsgUpdateFeeRatios {
    const message = createBaseMsgUpdateFeeRatios();
    message.authority = object.authority ?? "";
    message.assetId = object.assetId ?? "";
    message.feeRatios = object.feeRatios !== undefined && object.feeRatios !== null ? FeeRatios.fromPartial(object.feeRatios) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateFeeRatiosAmino): MsgUpdateFeeRatios {
    const message = createBaseMsgUpdateFeeRatios();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.fee_ratios !== undefined && object.fee_ratios !== null) {
      message.feeRatios = FeeRatios.fromAmino(object.fee_ratios);
    }
    return message;
  },
  toAmino(message: MsgUpdateFeeRatios, useInterfaces: boolean = false): MsgUpdateFeeRatiosAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.fee_ratios = message.feeRatios ? FeeRatios.toAmino(message.feeRatios, useInterfaces) : FeeRatios.toAmino(FeeRatios.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateFeeRatiosAminoMsg): MsgUpdateFeeRatios {
    return MsgUpdateFeeRatios.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateFeeRatios, useInterfaces: boolean = false): MsgUpdateFeeRatiosAminoMsg {
    return {
      type: "pryzm/assets/v1/UpdateFeeRatios",
      value: MsgUpdateFeeRatios.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateFeeRatiosProtoMsg, useInterfaces: boolean = false): MsgUpdateFeeRatios {
    return MsgUpdateFeeRatios.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateFeeRatios): Uint8Array {
    return MsgUpdateFeeRatios.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateFeeRatios): MsgUpdateFeeRatiosProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios",
      value: MsgUpdateFeeRatios.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateFeeRatiosResponse(): MsgUpdateFeeRatiosResponse {
  return {};
}
export const MsgUpdateFeeRatiosResponse = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatiosResponse",
  encode(_: MsgUpdateFeeRatiosResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateFeeRatiosResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateFeeRatiosResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateFeeRatiosResponse>): MsgUpdateFeeRatiosResponse {
    const message = createBaseMsgUpdateFeeRatiosResponse();
    return message;
  },
  fromAmino(_: MsgUpdateFeeRatiosResponseAmino): MsgUpdateFeeRatiosResponse {
    const message = createBaseMsgUpdateFeeRatiosResponse();
    return message;
  },
  toAmino(_: MsgUpdateFeeRatiosResponse, useInterfaces: boolean = false): MsgUpdateFeeRatiosResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateFeeRatiosResponseAminoMsg): MsgUpdateFeeRatiosResponse {
    return MsgUpdateFeeRatiosResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateFeeRatiosResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateFeeRatiosResponse {
    return MsgUpdateFeeRatiosResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateFeeRatiosResponse): Uint8Array {
    return MsgUpdateFeeRatiosResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateFeeRatiosResponse): MsgUpdateFeeRatiosResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatiosResponse",
      value: MsgUpdateFeeRatiosResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
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
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "pryzm/assets/v1/UpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pryzm.assets.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgIntroduceMaturityLevel(): MsgIntroduceMaturityLevel {
  return {
    creator: "",
    assetId: "",
    symbol: ""
  };
}
export const MsgIntroduceMaturityLevel = {
  typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel",
  encode(message: MsgIntroduceMaturityLevel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgIntroduceMaturityLevel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIntroduceMaturityLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.symbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgIntroduceMaturityLevel>): MsgIntroduceMaturityLevel {
    const message = createBaseMsgIntroduceMaturityLevel();
    message.creator = object.creator ?? "";
    message.assetId = object.assetId ?? "";
    message.symbol = object.symbol ?? "";
    return message;
  },
  fromAmino(object: MsgIntroduceMaturityLevelAmino): MsgIntroduceMaturityLevel {
    const message = createBaseMsgIntroduceMaturityLevel();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    return message;
  },
  toAmino(message: MsgIntroduceMaturityLevel, useInterfaces: boolean = false): MsgIntroduceMaturityLevelAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    return obj;
  },
  fromAminoMsg(object: MsgIntroduceMaturityLevelAminoMsg): MsgIntroduceMaturityLevel {
    return MsgIntroduceMaturityLevel.fromAmino(object.value);
  },
  toAminoMsg(message: MsgIntroduceMaturityLevel, useInterfaces: boolean = false): MsgIntroduceMaturityLevelAminoMsg {
    return {
      type: "pryzm/assets/v1/IntroduceMaturityLevel",
      value: MsgIntroduceMaturityLevel.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgIntroduceMaturityLevelProtoMsg, useInterfaces: boolean = false): MsgIntroduceMaturityLevel {
    return MsgIntroduceMaturityLevel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgIntroduceMaturityLevel): Uint8Array {
    return MsgIntroduceMaturityLevel.encode(message).finish();
  },
  toProtoMsg(message: MsgIntroduceMaturityLevel): MsgIntroduceMaturityLevelProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel",
      value: MsgIntroduceMaturityLevel.encode(message).finish()
    };
  }
};
function createBaseMsgIntroduceMaturityLevelResponse(): MsgIntroduceMaturityLevelResponse {
  return {
    maturityLevel: MaturityLevel.fromPartial({})
  };
}
export const MsgIntroduceMaturityLevelResponse = {
  typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevelResponse",
  encode(message: MsgIntroduceMaturityLevelResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturityLevel !== undefined) {
      MaturityLevel.encode(message.maturityLevel, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgIntroduceMaturityLevelResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIntroduceMaturityLevelResponse();
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
  fromPartial(object: Partial<MsgIntroduceMaturityLevelResponse>): MsgIntroduceMaturityLevelResponse {
    const message = createBaseMsgIntroduceMaturityLevelResponse();
    message.maturityLevel = object.maturityLevel !== undefined && object.maturityLevel !== null ? MaturityLevel.fromPartial(object.maturityLevel) : undefined;
    return message;
  },
  fromAmino(object: MsgIntroduceMaturityLevelResponseAmino): MsgIntroduceMaturityLevelResponse {
    const message = createBaseMsgIntroduceMaturityLevelResponse();
    if (object.maturity_level !== undefined && object.maturity_level !== null) {
      message.maturityLevel = MaturityLevel.fromAmino(object.maturity_level);
    }
    return message;
  },
  toAmino(message: MsgIntroduceMaturityLevelResponse, useInterfaces: boolean = false): MsgIntroduceMaturityLevelResponseAmino {
    const obj: any = {};
    obj.maturity_level = message.maturityLevel ? MaturityLevel.toAmino(message.maturityLevel, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgIntroduceMaturityLevelResponseAminoMsg): MsgIntroduceMaturityLevelResponse {
    return MsgIntroduceMaturityLevelResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgIntroduceMaturityLevelResponseProtoMsg, useInterfaces: boolean = false): MsgIntroduceMaturityLevelResponse {
    return MsgIntroduceMaturityLevelResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgIntroduceMaturityLevelResponse): Uint8Array {
    return MsgIntroduceMaturityLevelResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgIntroduceMaturityLevelResponse): MsgIntroduceMaturityLevelResponseProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevelResponse",
      value: MsgIntroduceMaturityLevelResponse.encode(message).finish()
    };
  }
};
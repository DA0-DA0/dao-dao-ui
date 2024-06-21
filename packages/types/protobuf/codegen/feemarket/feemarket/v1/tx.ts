//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the feemarket module.
 */
export interface MsgParams {
  /** Params defines the new parameters for the feemarket module. */
  params: Params | undefined;
  /**
   * Authority defines the authority that is updating the feemarket module
   * parameters.
   */
  authority: string;
}
export interface MsgParamsProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.MsgParams";
  value: Uint8Array;
}
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the feemarket module.
 */
export interface MsgParamsAmino {
  /** Params defines the new parameters for the feemarket module. */
  params?: ParamsAmino | undefined;
  /**
   * Authority defines the authority that is updating the feemarket module
   * parameters.
   */
  authority?: string;
}
export interface MsgParamsAminoMsg {
  type: "/feemarket.feemarket.v1.MsgParams";
  value: MsgParamsAmino;
}
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the feemarket module.
 */
export interface MsgParamsSDKType {
  params: ParamsSDKType | undefined;
  authority: string;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponse {}
export interface MsgParamsResponseProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.MsgParamsResponse";
  value: Uint8Array;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponseAmino {}
export interface MsgParamsResponseAminoMsg {
  type: "/feemarket.feemarket.v1.MsgParamsResponse";
  value: MsgParamsResponseAmino;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponseSDKType {}
function createBaseMsgParams(): MsgParams {
  return {
    params: Params.fromPartial({}),
    authority: ""
  };
}
export const MsgParams = {
  typeUrl: "/feemarket.feemarket.v1.MsgParams",
  encode(message: MsgParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgParams>): MsgParams {
    const message = createBaseMsgParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MsgParamsAmino): MsgParams {
    const message = createBaseMsgParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: MsgParams, useInterfaces: boolean = false): MsgParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.authority = message.authority;
    return obj;
  },
  fromAminoMsg(object: MsgParamsAminoMsg): MsgParams {
    return MsgParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgParamsProtoMsg, useInterfaces: boolean = false): MsgParams {
    return MsgParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgParams): Uint8Array {
    return MsgParams.encode(message).finish();
  },
  toProtoMsg(message: MsgParams): MsgParamsProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.MsgParams",
      value: MsgParams.encode(message).finish()
    };
  }
};
function createBaseMsgParamsResponse(): MsgParamsResponse {
  return {};
}
export const MsgParamsResponse = {
  typeUrl: "/feemarket.feemarket.v1.MsgParamsResponse",
  encode(_: MsgParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgParamsResponse();
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
  fromPartial(_: Partial<MsgParamsResponse>): MsgParamsResponse {
    const message = createBaseMsgParamsResponse();
    return message;
  },
  fromAmino(_: MsgParamsResponseAmino): MsgParamsResponse {
    const message = createBaseMsgParamsResponse();
    return message;
  },
  toAmino(_: MsgParamsResponse, useInterfaces: boolean = false): MsgParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgParamsResponseAminoMsg): MsgParamsResponse {
    return MsgParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgParamsResponseProtoMsg, useInterfaces: boolean = false): MsgParamsResponse {
    return MsgParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgParamsResponse): Uint8Array {
    return MsgParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgParamsResponse): MsgParamsResponseProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.MsgParamsResponse",
      value: MsgParamsResponse.encode(message).finish()
    };
  }
};
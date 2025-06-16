//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Action, ActionAmino, ActionSDKType } from "./action";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pryzm.treasury.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pryzm/treasury/v1/UpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pryzm.treasury.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pryzm.treasury.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgSetAction {
  authority: string;
  action: Action | undefined;
}
export interface MsgSetActionProtoMsg {
  typeUrl: "/pryzm.treasury.v1.MsgSetAction";
  value: Uint8Array;
}
export interface MsgSetActionAmino {
  authority?: string;
  action?: ActionAmino | undefined;
}
export interface MsgSetActionAminoMsg {
  type: "pryzm/treasury/v1/SetAction";
  value: MsgSetActionAmino;
}
export interface MsgSetActionSDKType {
  authority: string;
  action: ActionSDKType | undefined;
}
export interface MsgSetActionResponse {}
export interface MsgSetActionResponseProtoMsg {
  typeUrl: "/pryzm.treasury.v1.MsgSetActionResponse";
  value: Uint8Array;
}
export interface MsgSetActionResponseAmino {}
export interface MsgSetActionResponseAminoMsg {
  type: "/pryzm.treasury.v1.MsgSetActionResponse";
  value: MsgSetActionResponseAmino;
}
export interface MsgSetActionResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/pryzm.treasury.v1.MsgUpdateParams",
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
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "pryzm/treasury/v1/UpdateParams",
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
      typeUrl: "/pryzm.treasury.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pryzm.treasury.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/pryzm.treasury.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetAction(): MsgSetAction {
  return {
    authority: "",
    action: Action.fromPartial({})
  };
}
export const MsgSetAction = {
  typeUrl: "/pryzm.treasury.v1.MsgSetAction",
  encode(message: MsgSetAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.action = Action.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetAction>): MsgSetAction {
    const message = createBaseMsgSetAction();
    message.authority = object.authority ?? "";
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: MsgSetActionAmino): MsgSetAction {
    const message = createBaseMsgSetAction();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: MsgSetAction, useInterfaces: boolean = false): MsgSetActionAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.action = message.action ? Action.toAmino(message.action, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetActionAminoMsg): MsgSetAction {
    return MsgSetAction.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetAction, useInterfaces: boolean = false): MsgSetActionAminoMsg {
    return {
      type: "pryzm/treasury/v1/SetAction",
      value: MsgSetAction.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetActionProtoMsg, useInterfaces: boolean = false): MsgSetAction {
    return MsgSetAction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetAction): Uint8Array {
    return MsgSetAction.encode(message).finish();
  },
  toProtoMsg(message: MsgSetAction): MsgSetActionProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.MsgSetAction",
      value: MsgSetAction.encode(message).finish()
    };
  }
};
function createBaseMsgSetActionResponse(): MsgSetActionResponse {
  return {};
}
export const MsgSetActionResponse = {
  typeUrl: "/pryzm.treasury.v1.MsgSetActionResponse",
  encode(_: MsgSetActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetActionResponse();
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
  fromPartial(_: Partial<MsgSetActionResponse>): MsgSetActionResponse {
    const message = createBaseMsgSetActionResponse();
    return message;
  },
  fromAmino(_: MsgSetActionResponseAmino): MsgSetActionResponse {
    const message = createBaseMsgSetActionResponse();
    return message;
  },
  toAmino(_: MsgSetActionResponse, useInterfaces: boolean = false): MsgSetActionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetActionResponseAminoMsg): MsgSetActionResponse {
    return MsgSetActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetActionResponseProtoMsg, useInterfaces: boolean = false): MsgSetActionResponse {
    return MsgSetActionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetActionResponse): Uint8Array {
    return MsgSetActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetActionResponse): MsgSetActionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.MsgSetActionResponse",
      value: MsgSetActionResponse.encode(message).finish()
    };
  }
};
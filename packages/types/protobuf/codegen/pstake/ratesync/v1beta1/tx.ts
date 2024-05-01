//@ts-nocheck
import { HostChain, HostChainAmino, HostChainSDKType } from "./ratesync";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgCreateHostChain {
  authority: string;
  hostChain: HostChain | undefined;
}
export interface MsgCreateHostChainProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChain";
  value: Uint8Array;
}
export interface MsgCreateHostChainAmino {
  authority?: string;
  host_chain: HostChainAmino | undefined;
}
export interface MsgCreateHostChainAminoMsg {
  type: "pstake/ratesync/MsgCreateHostChain";
  value: MsgCreateHostChainAmino;
}
export interface MsgCreateHostChainSDKType {
  authority: string;
  host_chain: HostChainSDKType | undefined;
}
export interface MsgCreateHostChainResponse {
  iD: bigint;
}
export interface MsgCreateHostChainResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChainResponse";
  value: Uint8Array;
}
export interface MsgCreateHostChainResponseAmino {
  i_d?: string;
}
export interface MsgCreateHostChainResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.MsgCreateHostChainResponse";
  value: MsgCreateHostChainResponseAmino;
}
export interface MsgCreateHostChainResponseSDKType {
  i_d: bigint;
}
export interface MsgUpdateHostChain {
  authority: string;
  hostChain: HostChain | undefined;
}
export interface MsgUpdateHostChainProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChain";
  value: Uint8Array;
}
export interface MsgUpdateHostChainAmino {
  authority?: string;
  host_chain: HostChainAmino | undefined;
}
export interface MsgUpdateHostChainAminoMsg {
  type: "pstake/ratesync/MsgUpdateHostChain";
  value: MsgUpdateHostChainAmino;
}
export interface MsgUpdateHostChainSDKType {
  authority: string;
  host_chain: HostChainSDKType | undefined;
}
export interface MsgUpdateHostChainResponse {}
export interface MsgUpdateHostChainResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChainResponse";
  value: Uint8Array;
}
export interface MsgUpdateHostChainResponseAmino {}
export interface MsgUpdateHostChainResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.MsgUpdateHostChainResponse";
  value: MsgUpdateHostChainResponseAmino;
}
export interface MsgUpdateHostChainResponseSDKType {}
export interface MsgDeleteHostChain {
  authority: string;
  iD: bigint;
}
export interface MsgDeleteHostChainProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChain";
  value: Uint8Array;
}
export interface MsgDeleteHostChainAmino {
  authority?: string;
  i_d?: string;
}
export interface MsgDeleteHostChainAminoMsg {
  type: "pstake/ratesync/MsgDeleteHostChain";
  value: MsgDeleteHostChainAmino;
}
export interface MsgDeleteHostChainSDKType {
  authority: string;
  i_d: bigint;
}
export interface MsgDeleteHostChainResponse {}
export interface MsgDeleteHostChainResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChainResponse";
  value: Uint8Array;
}
export interface MsgDeleteHostChainResponseAmino {}
export interface MsgDeleteHostChainResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.MsgDeleteHostChainResponse";
  value: MsgDeleteHostChainResponseAmino;
}
export interface MsgDeleteHostChainResponseSDKType {}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pstake/ratesync/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreateHostChain(): MsgCreateHostChain {
  return {
    authority: "",
    hostChain: HostChain.fromPartial({})
  };
}
export const MsgCreateHostChain = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChain",
  encode(message: MsgCreateHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateHostChain>): MsgCreateHostChain {
    const message = createBaseMsgCreateHostChain();
    message.authority = object.authority ?? "";
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateHostChainAmino): MsgCreateHostChain {
    const message = createBaseMsgCreateHostChain();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: MsgCreateHostChain, useInterfaces: boolean = false): MsgCreateHostChainAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : HostChain.fromPartial({});
    return obj;
  },
  fromAminoMsg(object: MsgCreateHostChainAminoMsg): MsgCreateHostChain {
    return MsgCreateHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateHostChain, useInterfaces: boolean = false): MsgCreateHostChainAminoMsg {
    return {
      type: "pstake/ratesync/MsgCreateHostChain",
      value: MsgCreateHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateHostChainProtoMsg, useInterfaces: boolean = false): MsgCreateHostChain {
    return MsgCreateHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateHostChain): Uint8Array {
    return MsgCreateHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateHostChain): MsgCreateHostChainProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChain",
      value: MsgCreateHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgCreateHostChainResponse(): MsgCreateHostChainResponse {
  return {
    iD: BigInt(0)
  };
}
export const MsgCreateHostChainResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChainResponse",
  encode(message: MsgCreateHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iD !== BigInt(0)) {
      writer.uint32(8).uint64(message.iD);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateHostChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iD = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateHostChainResponse>): MsgCreateHostChainResponse {
    const message = createBaseMsgCreateHostChainResponse();
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgCreateHostChainResponseAmino): MsgCreateHostChainResponse {
    const message = createBaseMsgCreateHostChainResponse();
    if (object.i_d !== undefined && object.i_d !== null) {
      message.iD = BigInt(object.i_d);
    }
    return message;
  },
  toAmino(message: MsgCreateHostChainResponse, useInterfaces: boolean = false): MsgCreateHostChainResponseAmino {
    const obj: any = {};
    obj.i_d = message.iD ? message.iD.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateHostChainResponseAminoMsg): MsgCreateHostChainResponse {
    return MsgCreateHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgCreateHostChainResponse {
    return MsgCreateHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateHostChainResponse): Uint8Array {
    return MsgCreateHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateHostChainResponse): MsgCreateHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgCreateHostChainResponse",
      value: MsgCreateHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChain(): MsgUpdateHostChain {
  return {
    authority: "",
    hostChain: HostChain.fromPartial({})
  };
}
export const MsgUpdateHostChain = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChain",
  encode(message: MsgUpdateHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateHostChain>): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    message.authority = object.authority ?? "";
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateHostChainAmino): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : HostChain.fromPartial({});
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainAminoMsg): MsgUpdateHostChain {
    return MsgUpdateHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAminoMsg {
    return {
      type: "pstake/ratesync/MsgUpdateHostChain",
      value: MsgUpdateHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateHostChainProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChain {
    return MsgUpdateHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChain): Uint8Array {
    return MsgUpdateHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChain): MsgUpdateHostChainProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChain",
      value: MsgUpdateHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChainResponse(): MsgUpdateHostChainResponse {
  return {};
}
export const MsgUpdateHostChainResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChainResponse",
  encode(_: MsgUpdateHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChainResponse();
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
  fromPartial(_: Partial<MsgUpdateHostChainResponse>): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  fromAmino(_: MsgUpdateHostChainResponseAmino): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  toAmino(_: MsgUpdateHostChainResponse, useInterfaces: boolean = false): MsgUpdateHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainResponseAminoMsg): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChainResponse): Uint8Array {
    return MsgUpdateHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChainResponse): MsgUpdateHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateHostChainResponse",
      value: MsgUpdateHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteHostChain(): MsgDeleteHostChain {
  return {
    authority: "",
    iD: BigInt(0)
  };
}
export const MsgDeleteHostChain = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChain",
  encode(message: MsgDeleteHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.iD !== BigInt(0)) {
      writer.uint32(16).uint64(message.iD);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.iD = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeleteHostChain>): MsgDeleteHostChain {
    const message = createBaseMsgDeleteHostChain();
    message.authority = object.authority ?? "";
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDeleteHostChainAmino): MsgDeleteHostChain {
    const message = createBaseMsgDeleteHostChain();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.i_d !== undefined && object.i_d !== null) {
      message.iD = BigInt(object.i_d);
    }
    return message;
  },
  toAmino(message: MsgDeleteHostChain, useInterfaces: boolean = false): MsgDeleteHostChainAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.i_d = message.iD ? message.iD.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDeleteHostChainAminoMsg): MsgDeleteHostChain {
    return MsgDeleteHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeleteHostChain, useInterfaces: boolean = false): MsgDeleteHostChainAminoMsg {
    return {
      type: "pstake/ratesync/MsgDeleteHostChain",
      value: MsgDeleteHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDeleteHostChainProtoMsg, useInterfaces: boolean = false): MsgDeleteHostChain {
    return MsgDeleteHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteHostChain): Uint8Array {
    return MsgDeleteHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteHostChain): MsgDeleteHostChainProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChain",
      value: MsgDeleteHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteHostChainResponse(): MsgDeleteHostChainResponse {
  return {};
}
export const MsgDeleteHostChainResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChainResponse",
  encode(_: MsgDeleteHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteHostChainResponse();
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
  fromPartial(_: Partial<MsgDeleteHostChainResponse>): MsgDeleteHostChainResponse {
    const message = createBaseMsgDeleteHostChainResponse();
    return message;
  },
  fromAmino(_: MsgDeleteHostChainResponseAmino): MsgDeleteHostChainResponse {
    const message = createBaseMsgDeleteHostChainResponse();
    return message;
  },
  toAmino(_: MsgDeleteHostChainResponse, useInterfaces: boolean = false): MsgDeleteHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeleteHostChainResponseAminoMsg): MsgDeleteHostChainResponse {
    return MsgDeleteHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeleteHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgDeleteHostChainResponse {
    return MsgDeleteHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteHostChainResponse): Uint8Array {
    return MsgDeleteHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteHostChainResponse): MsgDeleteHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.MsgDeleteHostChainResponse",
      value: MsgDeleteHostChainResponse.encode(message).finish()
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
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParams",
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
    obj.authority = message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.fromPartial({});
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "pstake/ratesync/MsgUpdateParams",
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
      typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParamsResponse",
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
      typeUrl: "/pstake.ratesync.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
//@ts-nocheck
import { InterchainAccountPacketData, InterchainAccountPacketDataAmino, InterchainAccountPacketDataSDKType } from "../../v1/packet";
import { Params, ParamsAmino, ParamsSDKType } from "./controller";
import { BinaryReader, BinaryWriter } from "../../../../../binary";
/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccount {
  owner: string;
  connectionId: string;
  version: string;
}
export interface MsgRegisterInterchainAccountProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount";
  value: Uint8Array;
}
/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountAmino {
  owner?: string;
  connection_id?: string;
  version?: string;
}
export interface MsgRegisterInterchainAccountAminoMsg {
  type: "cosmos-sdk/MsgRegisterInterchainAccount";
  value: MsgRegisterInterchainAccountAmino;
}
/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountSDKType {
  owner: string;
  connection_id: string;
  version: string;
}
/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponse {
  channelId: string;
  portId: string;
}
export interface MsgRegisterInterchainAccountResponseProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccountResponse";
  value: Uint8Array;
}
/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponseAmino {
  channel_id?: string;
  port_id?: string;
}
export interface MsgRegisterInterchainAccountResponseAminoMsg {
  type: "cosmos-sdk/MsgRegisterInterchainAccountResponse";
  value: MsgRegisterInterchainAccountResponseAmino;
}
/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponseSDKType {
  channel_id: string;
  port_id: string;
}
/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTx {
  owner: string;
  connectionId: string;
  packetData: InterchainAccountPacketData | undefined;
  /**
   * Relative timeout timestamp provided will be added to the current block time during transaction execution.
   * The timeout timestamp must be non-zero.
   */
  relativeTimeout: bigint;
}
export interface MsgSendTxProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTx";
  value: Uint8Array;
}
/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTxAmino {
  owner?: string;
  connection_id?: string;
  packet_data?: InterchainAccountPacketDataAmino | undefined;
  /**
   * Relative timeout timestamp provided will be added to the current block time during transaction execution.
   * The timeout timestamp must be non-zero.
   */
  relative_timeout?: string;
}
export interface MsgSendTxAminoMsg {
  type: "cosmos-sdk/MsgSendTx";
  value: MsgSendTxAmino;
}
/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTxSDKType {
  owner: string;
  connection_id: string;
  packet_data: InterchainAccountPacketDataSDKType | undefined;
  relative_timeout: bigint;
}
/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponse {
  sequence: bigint;
}
export interface MsgSendTxResponseProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTxResponse";
  value: Uint8Array;
}
/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponseAmino {
  sequence?: string;
}
export interface MsgSendTxResponseAminoMsg {
  type: "cosmos-sdk/MsgSendTxResponse";
  value: MsgSendTxResponseAmino;
}
/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponseSDKType {
  sequence: bigint;
}
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the 27-interchain-accounts/controller parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /**
   * params defines the 27-interchain-accounts/controller parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "cosmos-sdk/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "cosmos-sdk/MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgRegisterInterchainAccount(): MsgRegisterInterchainAccount {
  return {
    owner: "",
    connectionId: "",
    version: ""
  };
}
export const MsgRegisterInterchainAccount = {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount",
  encode(message: MsgRegisterInterchainAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterInterchainAccount>): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.version = object.version ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterInterchainAccountAmino): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    return message;
  },
  toAmino(message: MsgRegisterInterchainAccount, useInterfaces: boolean = false): MsgRegisterInterchainAccountAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.version = message.version === "" ? undefined : message.version;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainAccountAminoMsg): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterInterchainAccount, useInterfaces: boolean = false): MsgRegisterInterchainAccountAminoMsg {
    return {
      type: "cosmos-sdk/MsgRegisterInterchainAccount",
      value: MsgRegisterInterchainAccount.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterInterchainAccountProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainAccount): Uint8Array {
    return MsgRegisterInterchainAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainAccount): MsgRegisterInterchainAccountProtoMsg {
    return {
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount",
      value: MsgRegisterInterchainAccount.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterInterchainAccountResponse(): MsgRegisterInterchainAccountResponse {
  return {
    channelId: "",
    portId: ""
  };
}
export const MsgRegisterInterchainAccountResponse = {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccountResponse",
  encode(message: MsgRegisterInterchainAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.portId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterInterchainAccountResponse>): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterInterchainAccountResponseAmino): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    return message;
  },
  toAmino(message: MsgRegisterInterchainAccountResponse, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponseAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.port_id = message.portId === "" ? undefined : message.portId;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainAccountResponseAminoMsg): MsgRegisterInterchainAccountResponse {
    return MsgRegisterInterchainAccountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterInterchainAccountResponse, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgRegisterInterchainAccountResponse",
      value: MsgRegisterInterchainAccountResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterInterchainAccountResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponse {
    return MsgRegisterInterchainAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainAccountResponse): Uint8Array {
    return MsgRegisterInterchainAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainAccountResponse): MsgRegisterInterchainAccountResponseProtoMsg {
    return {
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccountResponse",
      value: MsgRegisterInterchainAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSendTx(): MsgSendTx {
  return {
    owner: "",
    connectionId: "",
    packetData: InterchainAccountPacketData.fromPartial({}),
    relativeTimeout: BigInt(0)
  };
}
export const MsgSendTx = {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTx",
  encode(message: MsgSendTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.packetData !== undefined) {
      InterchainAccountPacketData.encode(message.packetData, writer.uint32(26).fork()).ldelim();
    }
    if (message.relativeTimeout !== BigInt(0)) {
      writer.uint32(32).uint64(message.relativeTimeout);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.packetData = InterchainAccountPacketData.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.relativeTimeout = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendTx>): MsgSendTx {
    const message = createBaseMsgSendTx();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.packetData = object.packetData !== undefined && object.packetData !== null ? InterchainAccountPacketData.fromPartial(object.packetData) : undefined;
    message.relativeTimeout = object.relativeTimeout !== undefined && object.relativeTimeout !== null ? BigInt(object.relativeTimeout.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSendTxAmino): MsgSendTx {
    const message = createBaseMsgSendTx();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.packet_data !== undefined && object.packet_data !== null) {
      message.packetData = InterchainAccountPacketData.fromAmino(object.packet_data);
    }
    if (object.relative_timeout !== undefined && object.relative_timeout !== null) {
      message.relativeTimeout = BigInt(object.relative_timeout);
    }
    return message;
  },
  toAmino(message: MsgSendTx, useInterfaces: boolean = false): MsgSendTxAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.packet_data = message.packetData ? InterchainAccountPacketData.toAmino(message.packetData, useInterfaces) : undefined;
    obj.relative_timeout = message.relativeTimeout !== BigInt(0) ? message.relativeTimeout.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendTxAminoMsg): MsgSendTx {
    return MsgSendTx.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSendTx, useInterfaces: boolean = false): MsgSendTxAminoMsg {
    return {
      type: "cosmos-sdk/MsgSendTx",
      value: MsgSendTx.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSendTxProtoMsg, useInterfaces: boolean = false): MsgSendTx {
    return MsgSendTx.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendTx): Uint8Array {
    return MsgSendTx.encode(message).finish();
  },
  toProtoMsg(message: MsgSendTx): MsgSendTxProtoMsg {
    return {
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTx",
      value: MsgSendTx.encode(message).finish()
    };
  }
};
function createBaseMsgSendTxResponse(): MsgSendTxResponse {
  return {
    sequence: BigInt(0)
  };
}
export const MsgSendTxResponse = {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTxResponse",
  encode(message: MsgSendTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sequence !== BigInt(0)) {
      writer.uint32(8).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendTxResponse>): MsgSendTxResponse {
    const message = createBaseMsgSendTxResponse();
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSendTxResponseAmino): MsgSendTxResponse {
    const message = createBaseMsgSendTxResponse();
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: MsgSendTxResponse, useInterfaces: boolean = false): MsgSendTxResponseAmino {
    const obj: any = {};
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendTxResponseAminoMsg): MsgSendTxResponse {
    return MsgSendTxResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSendTxResponse, useInterfaces: boolean = false): MsgSendTxResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgSendTxResponse",
      value: MsgSendTxResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSendTxResponseProtoMsg, useInterfaces: boolean = false): MsgSendTxResponse {
    return MsgSendTxResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendTxResponse): Uint8Array {
    return MsgSendTxResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSendTxResponse): MsgSendTxResponseProtoMsg {
    return {
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgSendTxResponse",
      value: MsgSendTxResponse.encode(message).finish()
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
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams",
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
      type: "cosmos-sdk/MsgUpdateParams",
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
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParamsResponse",
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
  toAminoMsg(message: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
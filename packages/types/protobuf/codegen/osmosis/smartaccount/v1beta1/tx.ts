//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/** MsgAddAuthenticatorRequest defines the Msg/AddAuthenticator request type. */
export interface MsgAddAuthenticator {
  sender: string;
  type: string;
  data: Uint8Array;
}
export interface MsgAddAuthenticatorProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticator";
  value: Uint8Array;
}
/** MsgAddAuthenticatorRequest defines the Msg/AddAuthenticator request type. */
export interface MsgAddAuthenticatorAmino {
  sender?: string;
  type?: string;
  data?: string;
}
export interface MsgAddAuthenticatorAminoMsg {
  type: "osmosis/MsgAddAuthenticator";
  value: MsgAddAuthenticatorAmino;
}
/** MsgAddAuthenticatorRequest defines the Msg/AddAuthenticator request type. */
export interface MsgAddAuthenticatorSDKType {
  sender: string;
  type: string;
  data: Uint8Array;
}
/** MsgAddAuthenticatorResponse defines the Msg/AddAuthenticator response type. */
export interface MsgAddAuthenticatorResponse {
  /** MsgAddAuthenticatorResponse defines the Msg/AddAuthenticator response type. */
  success: boolean;
}
export interface MsgAddAuthenticatorResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticatorResponse";
  value: Uint8Array;
}
/** MsgAddAuthenticatorResponse defines the Msg/AddAuthenticator response type. */
export interface MsgAddAuthenticatorResponseAmino {
  /** MsgAddAuthenticatorResponse defines the Msg/AddAuthenticator response type. */
  success?: boolean;
}
export interface MsgAddAuthenticatorResponseAminoMsg {
  type: "osmosis/smartaccount/add-authenticator-response";
  value: MsgAddAuthenticatorResponseAmino;
}
/** MsgAddAuthenticatorResponse defines the Msg/AddAuthenticator response type. */
export interface MsgAddAuthenticatorResponseSDKType {
  success: boolean;
}
/**
 * MsgRemoveAuthenticatorRequest defines the Msg/RemoveAuthenticator request
 * type.
 */
export interface MsgRemoveAuthenticator {
  sender: string;
  id: bigint;
}
export interface MsgRemoveAuthenticatorProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticator";
  value: Uint8Array;
}
/**
 * MsgRemoveAuthenticatorRequest defines the Msg/RemoveAuthenticator request
 * type.
 */
export interface MsgRemoveAuthenticatorAmino {
  sender?: string;
  id?: string;
}
export interface MsgRemoveAuthenticatorAminoMsg {
  type: "osmosis/MsgRemoveAuthenticator";
  value: MsgRemoveAuthenticatorAmino;
}
/**
 * MsgRemoveAuthenticatorRequest defines the Msg/RemoveAuthenticator request
 * type.
 */
export interface MsgRemoveAuthenticatorSDKType {
  sender: string;
  id: bigint;
}
/**
 * MsgRemoveAuthenticatorResponse defines the Msg/RemoveAuthenticator response
 * type.
 */
export interface MsgRemoveAuthenticatorResponse {
  /**
   * MsgRemoveAuthenticatorResponse defines the Msg/RemoveAuthenticator response
   * type.
   */
  success: boolean;
}
export interface MsgRemoveAuthenticatorResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticatorResponse";
  value: Uint8Array;
}
/**
 * MsgRemoveAuthenticatorResponse defines the Msg/RemoveAuthenticator response
 * type.
 */
export interface MsgRemoveAuthenticatorResponseAmino {
  /**
   * MsgRemoveAuthenticatorResponse defines the Msg/RemoveAuthenticator response
   * type.
   */
  success?: boolean;
}
export interface MsgRemoveAuthenticatorResponseAminoMsg {
  type: "osmosis/smartaccount/remove-authenticator-response";
  value: MsgRemoveAuthenticatorResponseAmino;
}
/**
 * MsgRemoveAuthenticatorResponse defines the Msg/RemoveAuthenticator response
 * type.
 */
export interface MsgRemoveAuthenticatorResponseSDKType {
  success: boolean;
}
export interface MsgSetActiveState {
  sender: string;
  active: boolean;
}
export interface MsgSetActiveStateProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveState";
  value: Uint8Array;
}
export interface MsgSetActiveStateAmino {
  sender?: string;
  active?: boolean;
}
export interface MsgSetActiveStateAminoMsg {
  type: "osmosis/MsgSetActiveState";
  value: MsgSetActiveStateAmino;
}
export interface MsgSetActiveStateSDKType {
  sender: string;
  active: boolean;
}
export interface MsgSetActiveStateResponse {}
export interface MsgSetActiveStateResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveStateResponse";
  value: Uint8Array;
}
export interface MsgSetActiveStateResponseAmino {}
export interface MsgSetActiveStateResponseAminoMsg {
  type: "osmosis/smartaccount/set-active-state-response";
  value: MsgSetActiveStateResponseAmino;
}
export interface MsgSetActiveStateResponseSDKType {}
/**
 * TxExtension allows for additional authenticator-specific data in
 * transactions.
 */
export interface TxExtension {
  /**
   * selected_authenticators holds the authenticator_id for the chosen
   * authenticator per message.
   */
  selectedAuthenticators: bigint[];
}
export interface TxExtensionProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.TxExtension";
  value: Uint8Array;
}
/**
 * TxExtension allows for additional authenticator-specific data in
 * transactions.
 */
export interface TxExtensionAmino {
  /**
   * selected_authenticators holds the authenticator_id for the chosen
   * authenticator per message.
   */
  selected_authenticators?: string[];
}
export interface TxExtensionAminoMsg {
  type: "osmosis/smartaccount/tx-extension";
  value: TxExtensionAmino;
}
/**
 * TxExtension allows for additional authenticator-specific data in
 * transactions.
 */
export interface TxExtensionSDKType {
  selected_authenticators: bigint[];
}
function createBaseMsgAddAuthenticator(): MsgAddAuthenticator {
  return {
    sender: "",
    type: "",
    data: new Uint8Array()
  };
}
export const MsgAddAuthenticator = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticator",
  encode(message: MsgAddAuthenticator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddAuthenticator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAuthenticator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddAuthenticator>): MsgAddAuthenticator {
    const message = createBaseMsgAddAuthenticator();
    message.sender = object.sender ?? "";
    message.type = object.type ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgAddAuthenticatorAmino): MsgAddAuthenticator {
    const message = createBaseMsgAddAuthenticator();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: MsgAddAuthenticator, useInterfaces: boolean = false): MsgAddAuthenticatorAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.type = message.type === "" ? undefined : message.type;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddAuthenticatorAminoMsg): MsgAddAuthenticator {
    return MsgAddAuthenticator.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddAuthenticator, useInterfaces: boolean = false): MsgAddAuthenticatorAminoMsg {
    return {
      type: "osmosis/MsgAddAuthenticator",
      value: MsgAddAuthenticator.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddAuthenticatorProtoMsg, useInterfaces: boolean = false): MsgAddAuthenticator {
    return MsgAddAuthenticator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddAuthenticator): Uint8Array {
    return MsgAddAuthenticator.encode(message).finish();
  },
  toProtoMsg(message: MsgAddAuthenticator): MsgAddAuthenticatorProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticator",
      value: MsgAddAuthenticator.encode(message).finish()
    };
  }
};
function createBaseMsgAddAuthenticatorResponse(): MsgAddAuthenticatorResponse {
  return {
    success: false
  };
}
export const MsgAddAuthenticatorResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticatorResponse",
  encode(message: MsgAddAuthenticatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddAuthenticatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAuthenticatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddAuthenticatorResponse>): MsgAddAuthenticatorResponse {
    const message = createBaseMsgAddAuthenticatorResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgAddAuthenticatorResponseAmino): MsgAddAuthenticatorResponse {
    const message = createBaseMsgAddAuthenticatorResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgAddAuthenticatorResponse, useInterfaces: boolean = false): MsgAddAuthenticatorResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    return obj;
  },
  fromAminoMsg(object: MsgAddAuthenticatorResponseAminoMsg): MsgAddAuthenticatorResponse {
    return MsgAddAuthenticatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddAuthenticatorResponse, useInterfaces: boolean = false): MsgAddAuthenticatorResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/add-authenticator-response",
      value: MsgAddAuthenticatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddAuthenticatorResponseProtoMsg, useInterfaces: boolean = false): MsgAddAuthenticatorResponse {
    return MsgAddAuthenticatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddAuthenticatorResponse): Uint8Array {
    return MsgAddAuthenticatorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddAuthenticatorResponse): MsgAddAuthenticatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgAddAuthenticatorResponse",
      value: MsgAddAuthenticatorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveAuthenticator(): MsgRemoveAuthenticator {
  return {
    sender: "",
    id: BigInt(0)
  };
}
export const MsgRemoveAuthenticator = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticator",
  encode(message: MsgRemoveAuthenticator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveAuthenticator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAuthenticator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveAuthenticator>): MsgRemoveAuthenticator {
    const message = createBaseMsgRemoveAuthenticator();
    message.sender = object.sender ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRemoveAuthenticatorAmino): MsgRemoveAuthenticator {
    const message = createBaseMsgRemoveAuthenticator();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgRemoveAuthenticator, useInterfaces: boolean = false): MsgRemoveAuthenticatorAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveAuthenticatorAminoMsg): MsgRemoveAuthenticator {
    return MsgRemoveAuthenticator.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveAuthenticator, useInterfaces: boolean = false): MsgRemoveAuthenticatorAminoMsg {
    return {
      type: "osmosis/MsgRemoveAuthenticator",
      value: MsgRemoveAuthenticator.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRemoveAuthenticatorProtoMsg, useInterfaces: boolean = false): MsgRemoveAuthenticator {
    return MsgRemoveAuthenticator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveAuthenticator): Uint8Array {
    return MsgRemoveAuthenticator.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveAuthenticator): MsgRemoveAuthenticatorProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticator",
      value: MsgRemoveAuthenticator.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveAuthenticatorResponse(): MsgRemoveAuthenticatorResponse {
  return {
    success: false
  };
}
export const MsgRemoveAuthenticatorResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticatorResponse",
  encode(message: MsgRemoveAuthenticatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveAuthenticatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAuthenticatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveAuthenticatorResponse>): MsgRemoveAuthenticatorResponse {
    const message = createBaseMsgRemoveAuthenticatorResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgRemoveAuthenticatorResponseAmino): MsgRemoveAuthenticatorResponse {
    const message = createBaseMsgRemoveAuthenticatorResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgRemoveAuthenticatorResponse, useInterfaces: boolean = false): MsgRemoveAuthenticatorResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveAuthenticatorResponseAminoMsg): MsgRemoveAuthenticatorResponse {
    return MsgRemoveAuthenticatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveAuthenticatorResponse, useInterfaces: boolean = false): MsgRemoveAuthenticatorResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/remove-authenticator-response",
      value: MsgRemoveAuthenticatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRemoveAuthenticatorResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveAuthenticatorResponse {
    return MsgRemoveAuthenticatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveAuthenticatorResponse): Uint8Array {
    return MsgRemoveAuthenticatorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveAuthenticatorResponse): MsgRemoveAuthenticatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticatorResponse",
      value: MsgRemoveAuthenticatorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetActiveState(): MsgSetActiveState {
  return {
    sender: "",
    active: false
  };
}
export const MsgSetActiveState = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveState",
  encode(message: MsgSetActiveState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.active === true) {
      writer.uint32(16).bool(message.active);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetActiveState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetActiveState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.active = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetActiveState>): MsgSetActiveState {
    const message = createBaseMsgSetActiveState();
    message.sender = object.sender ?? "";
    message.active = object.active ?? false;
    return message;
  },
  fromAmino(object: MsgSetActiveStateAmino): MsgSetActiveState {
    const message = createBaseMsgSetActiveState();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    return message;
  },
  toAmino(message: MsgSetActiveState, useInterfaces: boolean = false): MsgSetActiveStateAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.active = message.active === false ? undefined : message.active;
    return obj;
  },
  fromAminoMsg(object: MsgSetActiveStateAminoMsg): MsgSetActiveState {
    return MsgSetActiveState.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetActiveState, useInterfaces: boolean = false): MsgSetActiveStateAminoMsg {
    return {
      type: "osmosis/MsgSetActiveState",
      value: MsgSetActiveState.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetActiveStateProtoMsg, useInterfaces: boolean = false): MsgSetActiveState {
    return MsgSetActiveState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetActiveState): Uint8Array {
    return MsgSetActiveState.encode(message).finish();
  },
  toProtoMsg(message: MsgSetActiveState): MsgSetActiveStateProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveState",
      value: MsgSetActiveState.encode(message).finish()
    };
  }
};
function createBaseMsgSetActiveStateResponse(): MsgSetActiveStateResponse {
  return {};
}
export const MsgSetActiveStateResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveStateResponse",
  encode(_: MsgSetActiveStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetActiveStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetActiveStateResponse();
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
  fromPartial(_: Partial<MsgSetActiveStateResponse>): MsgSetActiveStateResponse {
    const message = createBaseMsgSetActiveStateResponse();
    return message;
  },
  fromAmino(_: MsgSetActiveStateResponseAmino): MsgSetActiveStateResponse {
    const message = createBaseMsgSetActiveStateResponse();
    return message;
  },
  toAmino(_: MsgSetActiveStateResponse, useInterfaces: boolean = false): MsgSetActiveStateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetActiveStateResponseAminoMsg): MsgSetActiveStateResponse {
    return MsgSetActiveStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetActiveStateResponse, useInterfaces: boolean = false): MsgSetActiveStateResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/set-active-state-response",
      value: MsgSetActiveStateResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetActiveStateResponseProtoMsg, useInterfaces: boolean = false): MsgSetActiveStateResponse {
    return MsgSetActiveStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetActiveStateResponse): Uint8Array {
    return MsgSetActiveStateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetActiveStateResponse): MsgSetActiveStateResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.MsgSetActiveStateResponse",
      value: MsgSetActiveStateResponse.encode(message).finish()
    };
  }
};
function createBaseTxExtension(): TxExtension {
  return {
    selectedAuthenticators: []
  };
}
export const TxExtension = {
  typeUrl: "/osmosis.smartaccount.v1beta1.TxExtension",
  encode(message: TxExtension, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.selectedAuthenticators) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TxExtension {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.selectedAuthenticators.push(reader.uint64());
            }
          } else {
            message.selectedAuthenticators.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TxExtension>): TxExtension {
    const message = createBaseTxExtension();
    message.selectedAuthenticators = object.selectedAuthenticators?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: TxExtensionAmino): TxExtension {
    const message = createBaseTxExtension();
    message.selectedAuthenticators = object.selected_authenticators?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: TxExtension, useInterfaces: boolean = false): TxExtensionAmino {
    const obj: any = {};
    if (message.selectedAuthenticators) {
      obj.selected_authenticators = message.selectedAuthenticators.map(e => e.toString());
    } else {
      obj.selected_authenticators = message.selectedAuthenticators;
    }
    return obj;
  },
  fromAminoMsg(object: TxExtensionAminoMsg): TxExtension {
    return TxExtension.fromAmino(object.value);
  },
  toAminoMsg(message: TxExtension, useInterfaces: boolean = false): TxExtensionAminoMsg {
    return {
      type: "osmosis/smartaccount/tx-extension",
      value: TxExtension.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TxExtensionProtoMsg, useInterfaces: boolean = false): TxExtension {
    return TxExtension.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TxExtension): Uint8Array {
    return TxExtension.encode(message).finish();
  },
  toProtoMsg(message: TxExtension): TxExtensionProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.TxExtension",
      value: TxExtension.encode(message).finish()
    };
  }
};
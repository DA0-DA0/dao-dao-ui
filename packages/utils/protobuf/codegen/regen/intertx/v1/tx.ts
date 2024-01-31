//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgRegisterAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterAccount {
  /** owner is the address of the interchain account owner. */
  owner: string;
  /** connection_id is the connection id string (i.e. channel-5). */
  connectionId: string;
  /**
   * version is the application version string. For example, this could be an
   * ICS27 encoded metadata type or an ICS29 encoded metadata type with a nested
   * application version.
   */
  version: string;
}
export interface MsgRegisterAccountProtoMsg {
  typeUrl: "/regen.intertx.v1.MsgRegisterAccount";
  value: Uint8Array;
}
/** MsgRegisterAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterAccountAmino {
  /** owner is the address of the interchain account owner. */
  owner?: string;
  /** connection_id is the connection id string (i.e. channel-5). */
  connection_id?: string;
  /**
   * version is the application version string. For example, this could be an
   * ICS27 encoded metadata type or an ICS29 encoded metadata type with a nested
   * application version.
   */
  version?: string;
}
export interface MsgRegisterAccountAminoMsg {
  type: "/regen.intertx.v1.MsgRegisterAccount";
  value: MsgRegisterAccountAmino;
}
/** MsgRegisterAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterAccountSDKType {
  owner: string;
  connection_id: string;
  version: string;
}
/** MsgRegisterAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterAccountResponse {}
export interface MsgRegisterAccountResponseProtoMsg {
  typeUrl: "/regen.intertx.v1.MsgRegisterAccountResponse";
  value: Uint8Array;
}
/** MsgRegisterAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterAccountResponseAmino {}
export interface MsgRegisterAccountResponseAminoMsg {
  type: "/regen.intertx.v1.MsgRegisterAccountResponse";
  value: MsgRegisterAccountResponseAmino;
}
/** MsgRegisterAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterAccountResponseSDKType {}
/** MsgSubmitTx defines the payload for Msg/SubmitTx */
export interface MsgSubmitTx {
  /** owner is the owner address of the interchain account. */
  owner: string;
  /** connection_id is the id of the connection. */
  connectionId: string;
  /** msg is the bytes of the transaction msg to send. */
  msg?: Any | undefined;
}
export interface MsgSubmitTxProtoMsg {
  typeUrl: "/regen.intertx.v1.MsgSubmitTx";
  value: Uint8Array;
}
/** MsgSubmitTx defines the payload for Msg/SubmitTx */
export interface MsgSubmitTxAmino {
  /** owner is the owner address of the interchain account. */
  owner?: string;
  /** connection_id is the id of the connection. */
  connection_id?: string;
  /** msg is the bytes of the transaction msg to send. */
  msg?: AnyAmino | undefined;
}
export interface MsgSubmitTxAminoMsg {
  type: "/regen.intertx.v1.MsgSubmitTx";
  value: MsgSubmitTxAmino;
}
/** MsgSubmitTx defines the payload for Msg/SubmitTx */
export interface MsgSubmitTxSDKType {
  owner: string;
  connection_id: string;
  msg?: AnySDKType | undefined;
}
/** MsgSubmitTxResponse defines the response for Msg/SubmitTx */
export interface MsgSubmitTxResponse {}
export interface MsgSubmitTxResponseProtoMsg {
  typeUrl: "/regen.intertx.v1.MsgSubmitTxResponse";
  value: Uint8Array;
}
/** MsgSubmitTxResponse defines the response for Msg/SubmitTx */
export interface MsgSubmitTxResponseAmino {}
export interface MsgSubmitTxResponseAminoMsg {
  type: "/regen.intertx.v1.MsgSubmitTxResponse";
  value: MsgSubmitTxResponseAmino;
}
/** MsgSubmitTxResponse defines the response for Msg/SubmitTx */
export interface MsgSubmitTxResponseSDKType {}
function createBaseMsgRegisterAccount(): MsgRegisterAccount {
  return {
    owner: "",
    connectionId: "",
    version: ""
  };
}
export const MsgRegisterAccount = {
  typeUrl: "/regen.intertx.v1.MsgRegisterAccount",
  encode(message: MsgRegisterAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAccount();
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
  fromPartial(object: Partial<MsgRegisterAccount>): MsgRegisterAccount {
    const message = createBaseMsgRegisterAccount();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.version = object.version ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterAccountAmino): MsgRegisterAccount {
    const message = createBaseMsgRegisterAccount();
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
  toAmino(message: MsgRegisterAccount, useInterfaces: boolean = false): MsgRegisterAccountAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.connection_id = message.connectionId;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterAccountAminoMsg): MsgRegisterAccount {
    return MsgRegisterAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterAccountProtoMsg, useInterfaces: boolean = false): MsgRegisterAccount {
    return MsgRegisterAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterAccount): Uint8Array {
    return MsgRegisterAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterAccount): MsgRegisterAccountProtoMsg {
    return {
      typeUrl: "/regen.intertx.v1.MsgRegisterAccount",
      value: MsgRegisterAccount.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterAccountResponse(): MsgRegisterAccountResponse {
  return {};
}
export const MsgRegisterAccountResponse = {
  typeUrl: "/regen.intertx.v1.MsgRegisterAccountResponse",
  encode(_: MsgRegisterAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAccountResponse();
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
  fromPartial(_: Partial<MsgRegisterAccountResponse>): MsgRegisterAccountResponse {
    const message = createBaseMsgRegisterAccountResponse();
    return message;
  },
  fromAmino(_: MsgRegisterAccountResponseAmino): MsgRegisterAccountResponse {
    const message = createBaseMsgRegisterAccountResponse();
    return message;
  },
  toAmino(_: MsgRegisterAccountResponse, useInterfaces: boolean = false): MsgRegisterAccountResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterAccountResponseAminoMsg): MsgRegisterAccountResponse {
    return MsgRegisterAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterAccountResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterAccountResponse {
    return MsgRegisterAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterAccountResponse): Uint8Array {
    return MsgRegisterAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterAccountResponse): MsgRegisterAccountResponseProtoMsg {
    return {
      typeUrl: "/regen.intertx.v1.MsgRegisterAccountResponse",
      value: MsgRegisterAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitTx(): MsgSubmitTx {
  return {
    owner: "",
    connectionId: "",
    msg: undefined
  };
}
export const MsgSubmitTx = {
  typeUrl: "/regen.intertx.v1.MsgSubmitTx",
  encode(message: MsgSubmitTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitTx();
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
          message.msg = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitTx>): MsgSubmitTx {
    const message = createBaseMsgSubmitTx();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    return message;
  },
  fromAmino(object: MsgSubmitTxAmino): MsgSubmitTx {
    const message = createBaseMsgSubmitTx();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = Any.fromAmino(object.msg);
    }
    return message;
  },
  toAmino(message: MsgSubmitTx, useInterfaces: boolean = false): MsgSubmitTxAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.connection_id = message.connectionId;
    obj.msg = message.msg ? Any.toAmino(message.msg, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitTxAminoMsg): MsgSubmitTx {
    return MsgSubmitTx.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitTxProtoMsg, useInterfaces: boolean = false): MsgSubmitTx {
    return MsgSubmitTx.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitTx): Uint8Array {
    return MsgSubmitTx.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitTx): MsgSubmitTxProtoMsg {
    return {
      typeUrl: "/regen.intertx.v1.MsgSubmitTx",
      value: MsgSubmitTx.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitTxResponse(): MsgSubmitTxResponse {
  return {};
}
export const MsgSubmitTxResponse = {
  typeUrl: "/regen.intertx.v1.MsgSubmitTxResponse",
  encode(_: MsgSubmitTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitTxResponse();
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
  fromPartial(_: Partial<MsgSubmitTxResponse>): MsgSubmitTxResponse {
    const message = createBaseMsgSubmitTxResponse();
    return message;
  },
  fromAmino(_: MsgSubmitTxResponseAmino): MsgSubmitTxResponse {
    const message = createBaseMsgSubmitTxResponse();
    return message;
  },
  toAmino(_: MsgSubmitTxResponse, useInterfaces: boolean = false): MsgSubmitTxResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitTxResponseAminoMsg): MsgSubmitTxResponse {
    return MsgSubmitTxResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitTxResponseProtoMsg, useInterfaces: boolean = false): MsgSubmitTxResponse {
    return MsgSubmitTxResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitTxResponse): Uint8Array {
    return MsgSubmitTxResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitTxResponse): MsgSubmitTxResponseProtoMsg {
    return {
      typeUrl: "/regen.intertx.v1.MsgSubmitTxResponse",
      value: MsgSubmitTxResponse.encode(message).finish()
    };
  }
};
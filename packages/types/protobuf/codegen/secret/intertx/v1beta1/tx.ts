//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/** MsgRegisterAccount registers an interchain account for the given owner over the specified connection pair */
export interface MsgRegisterAccount {
  owner: string;
  connectionId: string;
  version: string;
}
export interface MsgRegisterAccountProtoMsg {
  typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount";
  value: Uint8Array;
}
/** MsgRegisterAccount registers an interchain account for the given owner over the specified connection pair */
export interface MsgRegisterAccountAmino {
  owner?: string;
  connection_id?: string;
  version?: string;
}
export interface MsgRegisterAccountAminoMsg {
  type: "/secret.intertx.v1beta1.MsgRegisterAccount";
  value: MsgRegisterAccountAmino;
}
/** MsgRegisterAccount registers an interchain account for the given owner over the specified connection pair */
export interface MsgRegisterAccountSDKType {
  owner: string;
  connection_id: string;
  version: string;
}
/** MsgRegisterAccountResponse is the response type for Msg/RegisterAccount */
export interface MsgRegisterAccountResponse {}
export interface MsgRegisterAccountResponseProtoMsg {
  typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccountResponse";
  value: Uint8Array;
}
/** MsgRegisterAccountResponse is the response type for Msg/RegisterAccount */
export interface MsgRegisterAccountResponseAmino {}
export interface MsgRegisterAccountResponseAminoMsg {
  type: "/secret.intertx.v1beta1.MsgRegisterAccountResponse";
  value: MsgRegisterAccountResponseAmino;
}
/** MsgRegisterAccountResponse is the response type for Msg/RegisterAccount */
export interface MsgRegisterAccountResponseSDKType {}
/** MsgSubmitTx creates and submits an arbitrary transaction msg to be executed using an interchain account */
export interface MsgSubmitTx {
  owner: Uint8Array;
  connectionId: string;
  msg?: Any | undefined;
}
export interface MsgSubmitTxProtoMsg {
  typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx";
  value: Uint8Array;
}
/** MsgSubmitTx creates and submits an arbitrary transaction msg to be executed using an interchain account */
export interface MsgSubmitTxAmino {
  owner?: string;
  connection_id?: string;
  msg?: AnyAmino | undefined;
}
export interface MsgSubmitTxAminoMsg {
  type: "/secret.intertx.v1beta1.MsgSubmitTx";
  value: MsgSubmitTxAmino;
}
/** MsgSubmitTx creates and submits an arbitrary transaction msg to be executed using an interchain account */
export interface MsgSubmitTxSDKType {
  owner: Uint8Array;
  connection_id: string;
  msg?: AnySDKType | undefined;
}
/** MsgSubmitTxResponse defines the MsgSubmitTx response type */
export interface MsgSubmitTxResponse {}
export interface MsgSubmitTxResponseProtoMsg {
  typeUrl: "/secret.intertx.v1beta1.MsgSubmitTxResponse";
  value: Uint8Array;
}
/** MsgSubmitTxResponse defines the MsgSubmitTx response type */
export interface MsgSubmitTxResponseAmino {}
export interface MsgSubmitTxResponseAminoMsg {
  type: "/secret.intertx.v1beta1.MsgSubmitTxResponse";
  value: MsgSubmitTxResponseAmino;
}
/** MsgSubmitTxResponse defines the MsgSubmitTx response type */
export interface MsgSubmitTxResponseSDKType {}
function createBaseMsgRegisterAccount(): MsgRegisterAccount {
  return {
    owner: "",
    connectionId: "",
    version: ""
  };
}
export const MsgRegisterAccount = {
  typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount",
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
      typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount",
      value: MsgRegisterAccount.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterAccountResponse(): MsgRegisterAccountResponse {
  return {};
}
export const MsgRegisterAccountResponse = {
  typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccountResponse",
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
      typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccountResponse",
      value: MsgRegisterAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitTx(): MsgSubmitTx {
  return {
    owner: new Uint8Array(),
    connectionId: "",
    msg: undefined
  };
}
export const MsgSubmitTx = {
  typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx",
  encode(message: MsgSubmitTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner.length !== 0) {
      writer.uint32(10).bytes(message.owner);
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
          message.owner = reader.bytes();
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
    message.owner = object.owner ?? new Uint8Array();
    message.connectionId = object.connectionId ?? "";
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    return message;
  },
  fromAmino(object: MsgSubmitTxAmino): MsgSubmitTx {
    const message = createBaseMsgSubmitTx();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = bytesFromBase64(object.owner);
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
    obj.owner = message.owner ? base64FromBytes(message.owner) : undefined;
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
      typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx",
      value: MsgSubmitTx.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitTxResponse(): MsgSubmitTxResponse {
  return {};
}
export const MsgSubmitTxResponse = {
  typeUrl: "/secret.intertx.v1beta1.MsgSubmitTxResponse",
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
      typeUrl: "/secret.intertx.v1beta1.MsgSubmitTxResponse",
      value: MsgSubmitTxResponse.encode(message).finish()
    };
  }
};
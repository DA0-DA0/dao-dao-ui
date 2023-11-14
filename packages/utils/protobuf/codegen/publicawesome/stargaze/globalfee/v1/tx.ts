//@ts-nocheck
import { CodeAuthorization, CodeAuthorizationAmino, CodeAuthorizationSDKType, ContractAuthorization, ContractAuthorizationAmino, ContractAuthorizationSDKType, Params, ParamsAmino, ParamsSDKType } from "./globalfee";
import { BinaryReader, BinaryWriter } from "../../../../binary";
export interface MsgSetCodeAuthorization {
  sender: string;
  codeAuthorization?: CodeAuthorization | undefined;
}
export interface MsgSetCodeAuthorizationProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization";
  value: Uint8Array;
}
export interface MsgSetCodeAuthorizationAmino {
  sender: string;
  code_authorization?: CodeAuthorizationAmino | undefined;
}
export interface MsgSetCodeAuthorizationAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization";
  value: MsgSetCodeAuthorizationAmino;
}
export interface MsgSetCodeAuthorizationSDKType {
  sender: string;
  code_authorization?: CodeAuthorizationSDKType | undefined;
}
export interface MsgSetCodeAuthorizationResponse {}
export interface MsgSetCodeAuthorizationResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorizationResponse";
  value: Uint8Array;
}
export interface MsgSetCodeAuthorizationResponseAmino {}
export interface MsgSetCodeAuthorizationResponseAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorizationResponse";
  value: MsgSetCodeAuthorizationResponseAmino;
}
export interface MsgSetCodeAuthorizationResponseSDKType {}
export interface MsgRemoveCodeAuthorization {
  sender: string;
  codeId: bigint;
}
export interface MsgRemoveCodeAuthorizationProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization";
  value: Uint8Array;
}
export interface MsgRemoveCodeAuthorizationAmino {
  sender: string;
  code_id: string;
}
export interface MsgRemoveCodeAuthorizationAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization";
  value: MsgRemoveCodeAuthorizationAmino;
}
export interface MsgRemoveCodeAuthorizationSDKType {
  sender: string;
  code_id: bigint;
}
export interface MsgRemoveCodeAuthorizationResponse {}
export interface MsgRemoveCodeAuthorizationResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorizationResponse";
  value: Uint8Array;
}
export interface MsgRemoveCodeAuthorizationResponseAmino {}
export interface MsgRemoveCodeAuthorizationResponseAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorizationResponse";
  value: MsgRemoveCodeAuthorizationResponseAmino;
}
export interface MsgRemoveCodeAuthorizationResponseSDKType {}
export interface MsgSetContractAuthorization {
  sender: string;
  contractAuthorization?: ContractAuthorization | undefined;
}
export interface MsgSetContractAuthorizationProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization";
  value: Uint8Array;
}
export interface MsgSetContractAuthorizationAmino {
  sender: string;
  contract_authorization?: ContractAuthorizationAmino | undefined;
}
export interface MsgSetContractAuthorizationAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization";
  value: MsgSetContractAuthorizationAmino;
}
export interface MsgSetContractAuthorizationSDKType {
  sender: string;
  contract_authorization?: ContractAuthorizationSDKType | undefined;
}
export interface MsgSetContractAuthorizationResponse {}
export interface MsgSetContractAuthorizationResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorizationResponse";
  value: Uint8Array;
}
export interface MsgSetContractAuthorizationResponseAmino {}
export interface MsgSetContractAuthorizationResponseAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorizationResponse";
  value: MsgSetContractAuthorizationResponseAmino;
}
export interface MsgSetContractAuthorizationResponseSDKType {}
export interface MsgRemoveContractAuthorization {
  sender: string;
  contractAddress: string;
}
export interface MsgRemoveContractAuthorizationProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization";
  value: Uint8Array;
}
export interface MsgRemoveContractAuthorizationAmino {
  sender: string;
  contract_address: string;
}
export interface MsgRemoveContractAuthorizationAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization";
  value: MsgRemoveContractAuthorizationAmino;
}
export interface MsgRemoveContractAuthorizationSDKType {
  sender: string;
  contract_address: string;
}
export interface MsgRemoveContractAuthorizationResponse {}
export interface MsgRemoveContractAuthorizationResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorizationResponse";
  value: Uint8Array;
}
export interface MsgRemoveContractAuthorizationResponseAmino {}
export interface MsgRemoveContractAuthorizationResponseAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorizationResponse";
  value: MsgRemoveContractAuthorizationResponseAmino;
}
export interface MsgRemoveContractAuthorizationResponseSDKType {}
export interface MsgUpdateParams {
  sender: string;
  /** NOTE: All parameters must be supplied. */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  sender: string;
  /** NOTE: All parameters must be supplied. */
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  sender: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgSetCodeAuthorization(): MsgSetCodeAuthorization {
  return {
    sender: "",
    codeAuthorization: undefined
  };
}
export const MsgSetCodeAuthorization = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
  encode(message: MsgSetCodeAuthorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.codeAuthorization !== undefined) {
      CodeAuthorization.encode(message.codeAuthorization, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCodeAuthorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCodeAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.codeAuthorization = CodeAuthorization.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetCodeAuthorization>): MsgSetCodeAuthorization {
    const message = createBaseMsgSetCodeAuthorization();
    message.sender = object.sender ?? "";
    message.codeAuthorization = object.codeAuthorization !== undefined && object.codeAuthorization !== null ? CodeAuthorization.fromPartial(object.codeAuthorization) : undefined;
    return message;
  },
  fromAmino(object: MsgSetCodeAuthorizationAmino): MsgSetCodeAuthorization {
    return {
      sender: object.sender,
      codeAuthorization: object?.code_authorization ? CodeAuthorization.fromAmino(object.code_authorization) : undefined
    };
  },
  toAmino(message: MsgSetCodeAuthorization, useInterfaces: boolean = false): MsgSetCodeAuthorizationAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.code_authorization = message.codeAuthorization ? CodeAuthorization.toAmino(message.codeAuthorization, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetCodeAuthorizationAminoMsg): MsgSetCodeAuthorization {
    return MsgSetCodeAuthorization.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetCodeAuthorizationProtoMsg, useInterfaces: boolean = false): MsgSetCodeAuthorization {
    return MsgSetCodeAuthorization.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCodeAuthorization): Uint8Array {
    return MsgSetCodeAuthorization.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCodeAuthorization): MsgSetCodeAuthorizationProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
      value: MsgSetCodeAuthorization.encode(message).finish()
    };
  }
};
function createBaseMsgSetCodeAuthorizationResponse(): MsgSetCodeAuthorizationResponse {
  return {};
}
export const MsgSetCodeAuthorizationResponse = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorizationResponse",
  encode(_: MsgSetCodeAuthorizationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCodeAuthorizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCodeAuthorizationResponse();
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
  fromPartial(_: Partial<MsgSetCodeAuthorizationResponse>): MsgSetCodeAuthorizationResponse {
    const message = createBaseMsgSetCodeAuthorizationResponse();
    return message;
  },
  fromAmino(_: MsgSetCodeAuthorizationResponseAmino): MsgSetCodeAuthorizationResponse {
    return {};
  },
  toAmino(_: MsgSetCodeAuthorizationResponse, useInterfaces: boolean = false): MsgSetCodeAuthorizationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetCodeAuthorizationResponseAminoMsg): MsgSetCodeAuthorizationResponse {
    return MsgSetCodeAuthorizationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetCodeAuthorizationResponseProtoMsg, useInterfaces: boolean = false): MsgSetCodeAuthorizationResponse {
    return MsgSetCodeAuthorizationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCodeAuthorizationResponse): Uint8Array {
    return MsgSetCodeAuthorizationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCodeAuthorizationResponse): MsgSetCodeAuthorizationResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorizationResponse",
      value: MsgSetCodeAuthorizationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveCodeAuthorization(): MsgRemoveCodeAuthorization {
  return {
    sender: "",
    codeId: BigInt(0)
  };
}
export const MsgRemoveCodeAuthorization = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
  encode(message: MsgRemoveCodeAuthorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(16).uint64(message.codeId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveCodeAuthorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveCodeAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.codeId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveCodeAuthorization>): MsgRemoveCodeAuthorization {
    const message = createBaseMsgRemoveCodeAuthorization();
    message.sender = object.sender ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRemoveCodeAuthorizationAmino): MsgRemoveCodeAuthorization {
    return {
      sender: object.sender,
      codeId: BigInt(object.code_id)
    };
  },
  toAmino(message: MsgRemoveCodeAuthorization, useInterfaces: boolean = false): MsgRemoveCodeAuthorizationAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveCodeAuthorizationAminoMsg): MsgRemoveCodeAuthorization {
    return MsgRemoveCodeAuthorization.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveCodeAuthorizationProtoMsg, useInterfaces: boolean = false): MsgRemoveCodeAuthorization {
    return MsgRemoveCodeAuthorization.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveCodeAuthorization): Uint8Array {
    return MsgRemoveCodeAuthorization.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveCodeAuthorization): MsgRemoveCodeAuthorizationProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
      value: MsgRemoveCodeAuthorization.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveCodeAuthorizationResponse(): MsgRemoveCodeAuthorizationResponse {
  return {};
}
export const MsgRemoveCodeAuthorizationResponse = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorizationResponse",
  encode(_: MsgRemoveCodeAuthorizationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveCodeAuthorizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveCodeAuthorizationResponse();
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
  fromPartial(_: Partial<MsgRemoveCodeAuthorizationResponse>): MsgRemoveCodeAuthorizationResponse {
    const message = createBaseMsgRemoveCodeAuthorizationResponse();
    return message;
  },
  fromAmino(_: MsgRemoveCodeAuthorizationResponseAmino): MsgRemoveCodeAuthorizationResponse {
    return {};
  },
  toAmino(_: MsgRemoveCodeAuthorizationResponse, useInterfaces: boolean = false): MsgRemoveCodeAuthorizationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveCodeAuthorizationResponseAminoMsg): MsgRemoveCodeAuthorizationResponse {
    return MsgRemoveCodeAuthorizationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveCodeAuthorizationResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveCodeAuthorizationResponse {
    return MsgRemoveCodeAuthorizationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveCodeAuthorizationResponse): Uint8Array {
    return MsgRemoveCodeAuthorizationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveCodeAuthorizationResponse): MsgRemoveCodeAuthorizationResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorizationResponse",
      value: MsgRemoveCodeAuthorizationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetContractAuthorization(): MsgSetContractAuthorization {
  return {
    sender: "",
    contractAuthorization: undefined
  };
}
export const MsgSetContractAuthorization = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
  encode(message: MsgSetContractAuthorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contractAuthorization !== undefined) {
      ContractAuthorization.encode(message.contractAuthorization, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetContractAuthorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetContractAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.contractAuthorization = ContractAuthorization.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetContractAuthorization>): MsgSetContractAuthorization {
    const message = createBaseMsgSetContractAuthorization();
    message.sender = object.sender ?? "";
    message.contractAuthorization = object.contractAuthorization !== undefined && object.contractAuthorization !== null ? ContractAuthorization.fromPartial(object.contractAuthorization) : undefined;
    return message;
  },
  fromAmino(object: MsgSetContractAuthorizationAmino): MsgSetContractAuthorization {
    return {
      sender: object.sender,
      contractAuthorization: object?.contract_authorization ? ContractAuthorization.fromAmino(object.contract_authorization) : undefined
    };
  },
  toAmino(message: MsgSetContractAuthorization, useInterfaces: boolean = false): MsgSetContractAuthorizationAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.contract_authorization = message.contractAuthorization ? ContractAuthorization.toAmino(message.contractAuthorization, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetContractAuthorizationAminoMsg): MsgSetContractAuthorization {
    return MsgSetContractAuthorization.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetContractAuthorizationProtoMsg, useInterfaces: boolean = false): MsgSetContractAuthorization {
    return MsgSetContractAuthorization.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetContractAuthorization): Uint8Array {
    return MsgSetContractAuthorization.encode(message).finish();
  },
  toProtoMsg(message: MsgSetContractAuthorization): MsgSetContractAuthorizationProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
      value: MsgSetContractAuthorization.encode(message).finish()
    };
  }
};
function createBaseMsgSetContractAuthorizationResponse(): MsgSetContractAuthorizationResponse {
  return {};
}
export const MsgSetContractAuthorizationResponse = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorizationResponse",
  encode(_: MsgSetContractAuthorizationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetContractAuthorizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetContractAuthorizationResponse();
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
  fromPartial(_: Partial<MsgSetContractAuthorizationResponse>): MsgSetContractAuthorizationResponse {
    const message = createBaseMsgSetContractAuthorizationResponse();
    return message;
  },
  fromAmino(_: MsgSetContractAuthorizationResponseAmino): MsgSetContractAuthorizationResponse {
    return {};
  },
  toAmino(_: MsgSetContractAuthorizationResponse, useInterfaces: boolean = false): MsgSetContractAuthorizationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetContractAuthorizationResponseAminoMsg): MsgSetContractAuthorizationResponse {
    return MsgSetContractAuthorizationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetContractAuthorizationResponseProtoMsg, useInterfaces: boolean = false): MsgSetContractAuthorizationResponse {
    return MsgSetContractAuthorizationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetContractAuthorizationResponse): Uint8Array {
    return MsgSetContractAuthorizationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetContractAuthorizationResponse): MsgSetContractAuthorizationResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorizationResponse",
      value: MsgSetContractAuthorizationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveContractAuthorization(): MsgRemoveContractAuthorization {
  return {
    sender: "",
    contractAddress: ""
  };
}
export const MsgRemoveContractAuthorization = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
  encode(message: MsgRemoveContractAuthorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contractAddress !== "") {
      writer.uint32(18).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveContractAuthorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveContractAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveContractAuthorization>): MsgRemoveContractAuthorization {
    const message = createBaseMsgRemoveContractAuthorization();
    message.sender = object.sender ?? "";
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveContractAuthorizationAmino): MsgRemoveContractAuthorization {
    return {
      sender: object.sender,
      contractAddress: object.contract_address
    };
  },
  toAmino(message: MsgRemoveContractAuthorization, useInterfaces: boolean = false): MsgRemoveContractAuthorizationAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.contract_address = message.contractAddress;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveContractAuthorizationAminoMsg): MsgRemoveContractAuthorization {
    return MsgRemoveContractAuthorization.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveContractAuthorizationProtoMsg, useInterfaces: boolean = false): MsgRemoveContractAuthorization {
    return MsgRemoveContractAuthorization.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveContractAuthorization): Uint8Array {
    return MsgRemoveContractAuthorization.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveContractAuthorization): MsgRemoveContractAuthorizationProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
      value: MsgRemoveContractAuthorization.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveContractAuthorizationResponse(): MsgRemoveContractAuthorizationResponse {
  return {};
}
export const MsgRemoveContractAuthorizationResponse = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorizationResponse",
  encode(_: MsgRemoveContractAuthorizationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveContractAuthorizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveContractAuthorizationResponse();
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
  fromPartial(_: Partial<MsgRemoveContractAuthorizationResponse>): MsgRemoveContractAuthorizationResponse {
    const message = createBaseMsgRemoveContractAuthorizationResponse();
    return message;
  },
  fromAmino(_: MsgRemoveContractAuthorizationResponseAmino): MsgRemoveContractAuthorizationResponse {
    return {};
  },
  toAmino(_: MsgRemoveContractAuthorizationResponse, useInterfaces: boolean = false): MsgRemoveContractAuthorizationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveContractAuthorizationResponseAminoMsg): MsgRemoveContractAuthorizationResponse {
    return MsgRemoveContractAuthorizationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveContractAuthorizationResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveContractAuthorizationResponse {
    return MsgRemoveContractAuthorizationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveContractAuthorizationResponse): Uint8Array {
    return MsgRemoveContractAuthorizationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveContractAuthorizationResponse): MsgRemoveContractAuthorizationResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorizationResponse",
      value: MsgRemoveContractAuthorizationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    sender: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
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
          message.sender = reader.string();
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
    message.sender = object.sender ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    return {
      sender: object.sender,
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParamsResponse",
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
    return {};
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
      typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
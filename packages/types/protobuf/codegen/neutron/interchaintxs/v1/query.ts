//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.interchaintxs.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.interchaintxs.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/neutron.interchaintxs.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.interchaintxs.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryInterchainAccountAddressRequest {
  /**
   * owner_address is the owner of the interchain account on the controller
   * chain
   */
  ownerAddress: string;
  /**
   * interchain_account_id is an identifier of your interchain account from
   * which you want to execute msgs
   */
  interchainAccountId: string;
  /**
   * connection_id is an IBC connection identifier between Neutron and remote
   * chain
   */
  connectionId: string;
}
export interface QueryInterchainAccountAddressRequestProtoMsg {
  typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressRequest";
  value: Uint8Array;
}
export interface QueryInterchainAccountAddressRequestAmino {
  /**
   * owner_address is the owner of the interchain account on the controller
   * chain
   */
  owner_address?: string;
  /**
   * interchain_account_id is an identifier of your interchain account from
   * which you want to execute msgs
   */
  interchain_account_id?: string;
  /**
   * connection_id is an IBC connection identifier between Neutron and remote
   * chain
   */
  connection_id?: string;
}
export interface QueryInterchainAccountAddressRequestAminoMsg {
  type: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressRequest";
  value: QueryInterchainAccountAddressRequestAmino;
}
export interface QueryInterchainAccountAddressRequestSDKType {
  owner_address: string;
  interchain_account_id: string;
  connection_id: string;
}
/** Query response for an interchain account address */
export interface QueryInterchainAccountAddressResponse {
  /** The corresponding interchain account address on the host chain */
  interchainAccountAddress: string;
}
export interface QueryInterchainAccountAddressResponseProtoMsg {
  typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressResponse";
  value: Uint8Array;
}
/** Query response for an interchain account address */
export interface QueryInterchainAccountAddressResponseAmino {
  /** The corresponding interchain account address on the host chain */
  interchain_account_address?: string;
}
export interface QueryInterchainAccountAddressResponseAminoMsg {
  type: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressResponse";
  value: QueryInterchainAccountAddressResponseAmino;
}
/** Query response for an interchain account address */
export interface QueryInterchainAccountAddressResponseSDKType {
  interchain_account_address: string;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.interchaintxs.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchaintxs.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/neutron.interchaintxs.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchaintxs.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryInterchainAccountAddressRequest(): QueryInterchainAccountAddressRequest {
  return {
    ownerAddress: "",
    interchainAccountId: "",
    connectionId: ""
  };
}
export const QueryInterchainAccountAddressRequest = {
  typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressRequest",
  encode(message: QueryInterchainAccountAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.interchainAccountId !== "") {
      writer.uint32(18).string(message.interchainAccountId);
    }
    if (message.connectionId !== "") {
      writer.uint32(26).string(message.connectionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryInterchainAccountAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerAddress = reader.string();
          break;
        case 2:
          message.interchainAccountId = reader.string();
          break;
        case 3:
          message.connectionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryInterchainAccountAddressRequest>): QueryInterchainAccountAddressRequest {
    const message = createBaseQueryInterchainAccountAddressRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.interchainAccountId = object.interchainAccountId ?? "";
    message.connectionId = object.connectionId ?? "";
    return message;
  },
  fromAmino(object: QueryInterchainAccountAddressRequestAmino): QueryInterchainAccountAddressRequest {
    const message = createBaseQueryInterchainAccountAddressRequest();
    if (object.owner_address !== undefined && object.owner_address !== null) {
      message.ownerAddress = object.owner_address;
    }
    if (object.interchain_account_id !== undefined && object.interchain_account_id !== null) {
      message.interchainAccountId = object.interchain_account_id;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    return message;
  },
  toAmino(message: QueryInterchainAccountAddressRequest, useInterfaces: boolean = false): QueryInterchainAccountAddressRequestAmino {
    const obj: any = {};
    obj.owner_address = message.ownerAddress === "" ? undefined : message.ownerAddress;
    obj.interchain_account_id = message.interchainAccountId === "" ? undefined : message.interchainAccountId;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    return obj;
  },
  fromAminoMsg(object: QueryInterchainAccountAddressRequestAminoMsg): QueryInterchainAccountAddressRequest {
    return QueryInterchainAccountAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryInterchainAccountAddressRequestProtoMsg, useInterfaces: boolean = false): QueryInterchainAccountAddressRequest {
    return QueryInterchainAccountAddressRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryInterchainAccountAddressRequest): Uint8Array {
    return QueryInterchainAccountAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryInterchainAccountAddressRequest): QueryInterchainAccountAddressRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressRequest",
      value: QueryInterchainAccountAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryInterchainAccountAddressResponse(): QueryInterchainAccountAddressResponse {
  return {
    interchainAccountAddress: ""
  };
}
export const QueryInterchainAccountAddressResponse = {
  typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressResponse",
  encode(message: QueryInterchainAccountAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interchainAccountAddress !== "") {
      writer.uint32(10).string(message.interchainAccountAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryInterchainAccountAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainAccountAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryInterchainAccountAddressResponse>): QueryInterchainAccountAddressResponse {
    const message = createBaseQueryInterchainAccountAddressResponse();
    message.interchainAccountAddress = object.interchainAccountAddress ?? "";
    return message;
  },
  fromAmino(object: QueryInterchainAccountAddressResponseAmino): QueryInterchainAccountAddressResponse {
    const message = createBaseQueryInterchainAccountAddressResponse();
    if (object.interchain_account_address !== undefined && object.interchain_account_address !== null) {
      message.interchainAccountAddress = object.interchain_account_address;
    }
    return message;
  },
  toAmino(message: QueryInterchainAccountAddressResponse, useInterfaces: boolean = false): QueryInterchainAccountAddressResponseAmino {
    const obj: any = {};
    obj.interchain_account_address = message.interchainAccountAddress === "" ? undefined : message.interchainAccountAddress;
    return obj;
  },
  fromAminoMsg(object: QueryInterchainAccountAddressResponseAminoMsg): QueryInterchainAccountAddressResponse {
    return QueryInterchainAccountAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryInterchainAccountAddressResponseProtoMsg, useInterfaces: boolean = false): QueryInterchainAccountAddressResponse {
    return QueryInterchainAccountAddressResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryInterchainAccountAddressResponse): Uint8Array {
    return QueryInterchainAccountAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryInterchainAccountAddressResponse): QueryInterchainAccountAddressResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchaintxs.v1.QueryInterchainAccountAddressResponse",
      value: QueryInterchainAccountAddressResponse.encode(message).finish()
    };
  }
};
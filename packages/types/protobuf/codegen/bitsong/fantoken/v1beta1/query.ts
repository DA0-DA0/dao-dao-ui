//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { FanToken, FanTokenAmino, FanTokenSDKType } from "./fantoken";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryFanTokenRequest is request type for the Query/FanToken RPC method */
export interface QueryFanTokenRequest {
  denom: string;
}
export interface QueryFanTokenRequestProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenRequest";
  value: Uint8Array;
}
/** QueryFanTokenRequest is request type for the Query/FanToken RPC method */
export interface QueryFanTokenRequestAmino {
  denom?: string;
}
export interface QueryFanTokenRequestAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryFanTokenRequest";
  value: QueryFanTokenRequestAmino;
}
/** QueryFanTokenRequest is request type for the Query/FanToken RPC method */
export interface QueryFanTokenRequestSDKType {
  denom: string;
}
/** QueryFanTokenResponse is response type for the Query/FanToken RPC method */
export interface QueryFanTokenResponse {
  fantoken?: FanToken | undefined;
}
export interface QueryFanTokenResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenResponse";
  value: Uint8Array;
}
/** QueryFanTokenResponse is response type for the Query/FanToken RPC method */
export interface QueryFanTokenResponseAmino {
  fantoken?: FanTokenAmino | undefined;
}
export interface QueryFanTokenResponseAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryFanTokenResponse";
  value: QueryFanTokenResponseAmino;
}
/** QueryFanTokenResponse is response type for the Query/FanToken RPC method */
export interface QueryFanTokenResponseSDKType {
  fantoken?: FanTokenSDKType | undefined;
}
/** QueryFanTokensRequest is request type for the Query/FanTokens RPC method */
export interface QueryFanTokensRequest {
  authority: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest | undefined;
}
export interface QueryFanTokensRequestProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensRequest";
  value: Uint8Array;
}
/** QueryFanTokensRequest is request type for the Query/FanTokens RPC method */
export interface QueryFanTokensRequestAmino {
  authority?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino | undefined;
}
export interface QueryFanTokensRequestAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryFanTokensRequest";
  value: QueryFanTokensRequestAmino;
}
/** QueryFanTokensRequest is request type for the Query/FanTokens RPC method */
export interface QueryFanTokensRequestSDKType {
  authority: string;
  pagination?: PageRequestSDKType | undefined;
}
/** QueryFanTokensResponse is response type for the Query/FanTokens RPC method */
export interface QueryFanTokensResponse {
  fantokens: FanToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryFanTokensResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensResponse";
  value: Uint8Array;
}
/** QueryFanTokensResponse is response type for the Query/FanTokens RPC method */
export interface QueryFanTokensResponseAmino {
  fantokens?: FanTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryFanTokensResponseAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryFanTokensResponse";
  value: QueryFanTokensResponseAmino;
}
/** QueryFanTokensResponse is response type for the Query/FanTokens RPC method */
export interface QueryFanTokensResponseSDKType {
  fantokens: FanTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/** QueryParametersRequest is request type for the Query/Parameters RPC method */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParametersRequest is request type for the Query/Parameters RPC method */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParametersRequest is request type for the Query/Parameters RPC method */
export interface QueryParamsRequestSDKType {}
/** QueryParametersResponse is response type for the Query/Parameters RPC method */
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParametersResponse is response type for the Query/Parameters RPC method */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/bitsong.fantoken.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParametersResponse is response type for the Query/Parameters RPC method */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseQueryFanTokenRequest(): QueryFanTokenRequest {
  return {
    denom: ""
  };
}
export const QueryFanTokenRequest = {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenRequest",
  encode(message: QueryFanTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFanTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFanTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFanTokenRequest>): QueryFanTokenRequest {
    const message = createBaseQueryFanTokenRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryFanTokenRequestAmino): QueryFanTokenRequest {
    const message = createBaseQueryFanTokenRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryFanTokenRequest, useInterfaces: boolean = false): QueryFanTokenRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryFanTokenRequestAminoMsg): QueryFanTokenRequest {
    return QueryFanTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFanTokenRequestProtoMsg, useInterfaces: boolean = false): QueryFanTokenRequest {
    return QueryFanTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFanTokenRequest): Uint8Array {
    return QueryFanTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFanTokenRequest): QueryFanTokenRequestProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenRequest",
      value: QueryFanTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFanTokenResponse(): QueryFanTokenResponse {
  return {
    fantoken: undefined
  };
}
export const QueryFanTokenResponse = {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenResponse",
  encode(message: QueryFanTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fantoken !== undefined) {
      FanToken.encode(message.fantoken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFanTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFanTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fantoken = FanToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFanTokenResponse>): QueryFanTokenResponse {
    const message = createBaseQueryFanTokenResponse();
    message.fantoken = object.fantoken !== undefined && object.fantoken !== null ? FanToken.fromPartial(object.fantoken) : undefined;
    return message;
  },
  fromAmino(object: QueryFanTokenResponseAmino): QueryFanTokenResponse {
    const message = createBaseQueryFanTokenResponse();
    if (object.fantoken !== undefined && object.fantoken !== null) {
      message.fantoken = FanToken.fromAmino(object.fantoken);
    }
    return message;
  },
  toAmino(message: QueryFanTokenResponse, useInterfaces: boolean = false): QueryFanTokenResponseAmino {
    const obj: any = {};
    obj.fantoken = message.fantoken ? FanToken.toAmino(message.fantoken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFanTokenResponseAminoMsg): QueryFanTokenResponse {
    return QueryFanTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFanTokenResponseProtoMsg, useInterfaces: boolean = false): QueryFanTokenResponse {
    return QueryFanTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFanTokenResponse): Uint8Array {
    return QueryFanTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFanTokenResponse): QueryFanTokenResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokenResponse",
      value: QueryFanTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFanTokensRequest(): QueryFanTokensRequest {
  return {
    authority: "",
    pagination: undefined
  };
}
export const QueryFanTokensRequest = {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensRequest",
  encode(message: QueryFanTokensRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFanTokensRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFanTokensRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFanTokensRequest>): QueryFanTokensRequest {
    const message = createBaseQueryFanTokensRequest();
    message.authority = object.authority ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryFanTokensRequestAmino): QueryFanTokensRequest {
    const message = createBaseQueryFanTokensRequest();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryFanTokensRequest, useInterfaces: boolean = false): QueryFanTokensRequestAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFanTokensRequestAminoMsg): QueryFanTokensRequest {
    return QueryFanTokensRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFanTokensRequestProtoMsg, useInterfaces: boolean = false): QueryFanTokensRequest {
    return QueryFanTokensRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFanTokensRequest): Uint8Array {
    return QueryFanTokensRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFanTokensRequest): QueryFanTokensRequestProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensRequest",
      value: QueryFanTokensRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFanTokensResponse(): QueryFanTokensResponse {
  return {
    fantokens: [],
    pagination: undefined
  };
}
export const QueryFanTokensResponse = {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensResponse",
  encode(message: QueryFanTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.fantokens) {
      FanToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFanTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFanTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fantokens.push(FanToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFanTokensResponse>): QueryFanTokensResponse {
    const message = createBaseQueryFanTokensResponse();
    message.fantokens = object.fantokens?.map(e => FanToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryFanTokensResponseAmino): QueryFanTokensResponse {
    const message = createBaseQueryFanTokensResponse();
    message.fantokens = object.fantokens?.map(e => FanToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryFanTokensResponse, useInterfaces: boolean = false): QueryFanTokensResponseAmino {
    const obj: any = {};
    if (message.fantokens) {
      obj.fantokens = message.fantokens.map(e => e ? FanToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.fantokens = message.fantokens;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFanTokensResponseAminoMsg): QueryFanTokensResponse {
    return QueryFanTokensResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFanTokensResponseProtoMsg, useInterfaces: boolean = false): QueryFanTokensResponse {
    return QueryFanTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFanTokensResponse): Uint8Array {
    return QueryFanTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFanTokensResponse): QueryFanTokensResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.QueryFanTokensResponse",
      value: QueryFanTokensResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsRequest",
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
      typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsRequest",
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
  typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsResponse",
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
      typeUrl: "/bitsong.fantoken.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
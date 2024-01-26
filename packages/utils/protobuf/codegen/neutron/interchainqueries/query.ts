//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { RegisteredQuery, RegisteredQueryAmino, RegisteredQuerySDKType } from "./genesis";
import { QueryResult, QueryResultAmino, QueryResultSDKType } from "./tx";
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.interchainqueries.QueryParamsRequest";
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
  typeUrl: "/neutron.interchainqueries.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.interchainqueries.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryRegisteredQueriesRequest {
  owners: string[];
  connectionId: string;
  pagination?: PageRequest | undefined;
}
export interface QueryRegisteredQueriesRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesRequest";
  value: Uint8Array;
}
export interface QueryRegisteredQueriesRequestAmino {
  owners?: string[];
  connection_id?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRegisteredQueriesRequestAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueriesRequest";
  value: QueryRegisteredQueriesRequestAmino;
}
export interface QueryRegisteredQueriesRequestSDKType {
  owners: string[];
  connection_id: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryRegisteredQueriesResponse {
  registeredQueries: RegisteredQuery[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse | undefined;
}
export interface QueryRegisteredQueriesResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesResponse";
  value: Uint8Array;
}
export interface QueryRegisteredQueriesResponseAmino {
  registered_queries?: RegisteredQueryAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino | undefined;
}
export interface QueryRegisteredQueriesResponseAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueriesResponse";
  value: QueryRegisteredQueriesResponseAmino;
}
export interface QueryRegisteredQueriesResponseSDKType {
  registered_queries: RegisteredQuerySDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryRegisteredQueryRequest {
  queryId: bigint;
}
export interface QueryRegisteredQueryRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryRequest";
  value: Uint8Array;
}
export interface QueryRegisteredQueryRequestAmino {
  query_id?: string;
}
export interface QueryRegisteredQueryRequestAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueryRequest";
  value: QueryRegisteredQueryRequestAmino;
}
export interface QueryRegisteredQueryRequestSDKType {
  query_id: bigint;
}
export interface QueryRegisteredQueryResponse {
  registeredQuery?: RegisteredQuery | undefined;
}
export interface QueryRegisteredQueryResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResponse";
  value: Uint8Array;
}
export interface QueryRegisteredQueryResponseAmino {
  registered_query?: RegisteredQueryAmino | undefined;
}
export interface QueryRegisteredQueryResponseAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueryResponse";
  value: QueryRegisteredQueryResponseAmino;
}
export interface QueryRegisteredQueryResponseSDKType {
  registered_query?: RegisteredQuerySDKType | undefined;
}
export interface QueryRegisteredQueryResultRequest {
  queryId: bigint;
}
export interface QueryRegisteredQueryResultRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultRequest";
  value: Uint8Array;
}
export interface QueryRegisteredQueryResultRequestAmino {
  query_id?: string;
}
export interface QueryRegisteredQueryResultRequestAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueryResultRequest";
  value: QueryRegisteredQueryResultRequestAmino;
}
export interface QueryRegisteredQueryResultRequestSDKType {
  query_id: bigint;
}
export interface QueryRegisteredQueryResultResponse {
  result?: QueryResult | undefined;
}
export interface QueryRegisteredQueryResultResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultResponse";
  value: Uint8Array;
}
export interface QueryRegisteredQueryResultResponseAmino {
  result?: QueryResultAmino | undefined;
}
export interface QueryRegisteredQueryResultResponseAminoMsg {
  type: "/neutron.interchainqueries.QueryRegisteredQueryResultResponse";
  value: QueryRegisteredQueryResultResponseAmino;
}
export interface QueryRegisteredQueryResultResponseSDKType {
  result?: QueryResultSDKType | undefined;
}
export interface Transaction {
  id: bigint;
  height: bigint;
  data: Uint8Array;
}
export interface TransactionProtoMsg {
  typeUrl: "/neutron.interchainqueries.Transaction";
  value: Uint8Array;
}
export interface TransactionAmino {
  id?: string;
  height?: string;
  data?: string;
}
export interface TransactionAminoMsg {
  type: "/neutron.interchainqueries.Transaction";
  value: TransactionAmino;
}
export interface TransactionSDKType {
  id: bigint;
  height: bigint;
  data: Uint8Array;
}
export interface QueryLastRemoteHeight {
  connectionId: string;
}
export interface QueryLastRemoteHeightProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeight";
  value: Uint8Array;
}
export interface QueryLastRemoteHeightAmino {
  connection_id?: string;
}
export interface QueryLastRemoteHeightAminoMsg {
  type: "/neutron.interchainqueries.QueryLastRemoteHeight";
  value: QueryLastRemoteHeightAmino;
}
export interface QueryLastRemoteHeightSDKType {
  connection_id: string;
}
export interface QueryLastRemoteHeightResponse {
  height: bigint;
}
export interface QueryLastRemoteHeightResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeightResponse";
  value: Uint8Array;
}
export interface QueryLastRemoteHeightResponseAmino {
  height?: string;
}
export interface QueryLastRemoteHeightResponseAminoMsg {
  type: "/neutron.interchainqueries.QueryLastRemoteHeightResponse";
  value: QueryLastRemoteHeightResponseAmino;
}
export interface QueryLastRemoteHeightResponseSDKType {
  height: bigint;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.interchainqueries.QueryParamsRequest",
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
      typeUrl: "/neutron.interchainqueries.QueryParamsRequest",
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
  typeUrl: "/neutron.interchainqueries.QueryParamsResponse",
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
      typeUrl: "/neutron.interchainqueries.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueriesRequest(): QueryRegisteredQueriesRequest {
  return {
    owners: [],
    connectionId: "",
    pagination: undefined
  };
}
export const QueryRegisteredQueriesRequest = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesRequest",
  encode(message: QueryRegisteredQueriesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.owners) {
      writer.uint32(10).string(v!);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueriesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueriesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owners.push(reader.string());
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredQueriesRequest>): QueryRegisteredQueriesRequest {
    const message = createBaseQueryRegisteredQueriesRequest();
    message.owners = object.owners?.map(e => e) || [];
    message.connectionId = object.connectionId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRegisteredQueriesRequestAmino): QueryRegisteredQueriesRequest {
    const message = createBaseQueryRegisteredQueriesRequest();
    message.owners = object.owners?.map(e => e) || [];
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueriesRequest, useInterfaces: boolean = false): QueryRegisteredQueriesRequestAmino {
    const obj: any = {};
    if (message.owners) {
      obj.owners = message.owners.map(e => e);
    } else {
      obj.owners = [];
    }
    obj.connection_id = message.connectionId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueriesRequestAminoMsg): QueryRegisteredQueriesRequest {
    return QueryRegisteredQueriesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueriesRequestProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueriesRequest {
    return QueryRegisteredQueriesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueriesRequest): Uint8Array {
    return QueryRegisteredQueriesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueriesRequest): QueryRegisteredQueriesRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesRequest",
      value: QueryRegisteredQueriesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueriesResponse(): QueryRegisteredQueriesResponse {
  return {
    registeredQueries: [],
    pagination: undefined
  };
}
export const QueryRegisteredQueriesResponse = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesResponse",
  encode(message: QueryRegisteredQueriesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.registeredQueries) {
      RegisteredQuery.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueriesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.registeredQueries.push(RegisteredQuery.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryRegisteredQueriesResponse>): QueryRegisteredQueriesResponse {
    const message = createBaseQueryRegisteredQueriesResponse();
    message.registeredQueries = object.registeredQueries?.map(e => RegisteredQuery.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRegisteredQueriesResponseAmino): QueryRegisteredQueriesResponse {
    const message = createBaseQueryRegisteredQueriesResponse();
    message.registeredQueries = object.registered_queries?.map(e => RegisteredQuery.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueriesResponse, useInterfaces: boolean = false): QueryRegisteredQueriesResponseAmino {
    const obj: any = {};
    if (message.registeredQueries) {
      obj.registered_queries = message.registeredQueries.map(e => e ? RegisteredQuery.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.registered_queries = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueriesResponseAminoMsg): QueryRegisteredQueriesResponse {
    return QueryRegisteredQueriesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueriesResponseProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueriesResponse {
    return QueryRegisteredQueriesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueriesResponse): Uint8Array {
    return QueryRegisteredQueriesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueriesResponse): QueryRegisteredQueriesResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueriesResponse",
      value: QueryRegisteredQueriesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueryRequest(): QueryRegisteredQueryRequest {
  return {
    queryId: BigInt(0)
  };
}
export const QueryRegisteredQueryRequest = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryRequest",
  encode(message: QueryRegisteredQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryId !== BigInt(0)) {
      writer.uint32(8).uint64(message.queryId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredQueryRequest>): QueryRegisteredQueryRequest {
    const message = createBaseQueryRegisteredQueryRequest();
    message.queryId = object.queryId !== undefined && object.queryId !== null ? BigInt(object.queryId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryRegisteredQueryRequestAmino): QueryRegisteredQueryRequest {
    const message = createBaseQueryRegisteredQueryRequest();
    if (object.query_id !== undefined && object.query_id !== null) {
      message.queryId = BigInt(object.query_id);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueryRequest, useInterfaces: boolean = false): QueryRegisteredQueryRequestAmino {
    const obj: any = {};
    obj.query_id = message.queryId ? message.queryId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueryRequestAminoMsg): QueryRegisteredQueryRequest {
    return QueryRegisteredQueryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueryRequestProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueryRequest {
    return QueryRegisteredQueryRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueryRequest): Uint8Array {
    return QueryRegisteredQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueryRequest): QueryRegisteredQueryRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryRequest",
      value: QueryRegisteredQueryRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueryResponse(): QueryRegisteredQueryResponse {
  return {
    registeredQuery: undefined
  };
}
export const QueryRegisteredQueryResponse = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResponse",
  encode(message: QueryRegisteredQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.registeredQuery !== undefined) {
      RegisteredQuery.encode(message.registeredQuery, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.registeredQuery = RegisteredQuery.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredQueryResponse>): QueryRegisteredQueryResponse {
    const message = createBaseQueryRegisteredQueryResponse();
    message.registeredQuery = object.registeredQuery !== undefined && object.registeredQuery !== null ? RegisteredQuery.fromPartial(object.registeredQuery) : undefined;
    return message;
  },
  fromAmino(object: QueryRegisteredQueryResponseAmino): QueryRegisteredQueryResponse {
    const message = createBaseQueryRegisteredQueryResponse();
    if (object.registered_query !== undefined && object.registered_query !== null) {
      message.registeredQuery = RegisteredQuery.fromAmino(object.registered_query);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueryResponse, useInterfaces: boolean = false): QueryRegisteredQueryResponseAmino {
    const obj: any = {};
    obj.registered_query = message.registeredQuery ? RegisteredQuery.toAmino(message.registeredQuery, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueryResponseAminoMsg): QueryRegisteredQueryResponse {
    return QueryRegisteredQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueryResponseProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueryResponse {
    return QueryRegisteredQueryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueryResponse): Uint8Array {
    return QueryRegisteredQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueryResponse): QueryRegisteredQueryResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResponse",
      value: QueryRegisteredQueryResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueryResultRequest(): QueryRegisteredQueryResultRequest {
  return {
    queryId: BigInt(0)
  };
}
export const QueryRegisteredQueryResultRequest = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultRequest",
  encode(message: QueryRegisteredQueryResultRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryId !== BigInt(0)) {
      writer.uint32(8).uint64(message.queryId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueryResultRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueryResultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredQueryResultRequest>): QueryRegisteredQueryResultRequest {
    const message = createBaseQueryRegisteredQueryResultRequest();
    message.queryId = object.queryId !== undefined && object.queryId !== null ? BigInt(object.queryId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryRegisteredQueryResultRequestAmino): QueryRegisteredQueryResultRequest {
    const message = createBaseQueryRegisteredQueryResultRequest();
    if (object.query_id !== undefined && object.query_id !== null) {
      message.queryId = BigInt(object.query_id);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueryResultRequest, useInterfaces: boolean = false): QueryRegisteredQueryResultRequestAmino {
    const obj: any = {};
    obj.query_id = message.queryId ? message.queryId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueryResultRequestAminoMsg): QueryRegisteredQueryResultRequest {
    return QueryRegisteredQueryResultRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueryResultRequestProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueryResultRequest {
    return QueryRegisteredQueryResultRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueryResultRequest): Uint8Array {
    return QueryRegisteredQueryResultRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueryResultRequest): QueryRegisteredQueryResultRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultRequest",
      value: QueryRegisteredQueryResultRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredQueryResultResponse(): QueryRegisteredQueryResultResponse {
  return {
    result: undefined
  };
}
export const QueryRegisteredQueryResultResponse = {
  typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultResponse",
  encode(message: QueryRegisteredQueryResultResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.result !== undefined) {
      QueryResult.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredQueryResultResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredQueryResultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = QueryResult.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredQueryResultResponse>): QueryRegisteredQueryResultResponse {
    const message = createBaseQueryRegisteredQueryResultResponse();
    message.result = object.result !== undefined && object.result !== null ? QueryResult.fromPartial(object.result) : undefined;
    return message;
  },
  fromAmino(object: QueryRegisteredQueryResultResponseAmino): QueryRegisteredQueryResultResponse {
    const message = createBaseQueryRegisteredQueryResultResponse();
    if (object.result !== undefined && object.result !== null) {
      message.result = QueryResult.fromAmino(object.result);
    }
    return message;
  },
  toAmino(message: QueryRegisteredQueryResultResponse, useInterfaces: boolean = false): QueryRegisteredQueryResultResponseAmino {
    const obj: any = {};
    obj.result = message.result ? QueryResult.toAmino(message.result, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredQueryResultResponseAminoMsg): QueryRegisteredQueryResultResponse {
    return QueryRegisteredQueryResultResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredQueryResultResponseProtoMsg, useInterfaces: boolean = false): QueryRegisteredQueryResultResponse {
    return QueryRegisteredQueryResultResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredQueryResultResponse): Uint8Array {
    return QueryRegisteredQueryResultResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredQueryResultResponse): QueryRegisteredQueryResultResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryRegisteredQueryResultResponse",
      value: QueryRegisteredQueryResultResponse.encode(message).finish()
    };
  }
};
function createBaseTransaction(): Transaction {
  return {
    id: BigInt(0),
    height: BigInt(0),
    data: new Uint8Array()
  };
}
export const Transaction = {
  typeUrl: "/neutron.interchainqueries.Transaction",
  encode(message: Transaction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).uint64(message.height);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Transaction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.height = reader.uint64();
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
  fromPartial(object: Partial<Transaction>): Transaction {
    const message = createBaseTransaction();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: TransactionAmino): Transaction {
    const message = createBaseTransaction();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: Transaction, useInterfaces: boolean = false): TransactionAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.height = message.height ? message.height.toString() : undefined;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: TransactionAminoMsg): Transaction {
    return Transaction.fromAmino(object.value);
  },
  fromProtoMsg(message: TransactionProtoMsg, useInterfaces: boolean = false): Transaction {
    return Transaction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Transaction): Uint8Array {
    return Transaction.encode(message).finish();
  },
  toProtoMsg(message: Transaction): TransactionProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.Transaction",
      value: Transaction.encode(message).finish()
    };
  }
};
function createBaseQueryLastRemoteHeight(): QueryLastRemoteHeight {
  return {
    connectionId: ""
  };
}
export const QueryLastRemoteHeight = {
  typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeight",
  encode(message: QueryLastRemoteHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLastRemoteHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastRemoteHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLastRemoteHeight>): QueryLastRemoteHeight {
    const message = createBaseQueryLastRemoteHeight();
    message.connectionId = object.connectionId ?? "";
    return message;
  },
  fromAmino(object: QueryLastRemoteHeightAmino): QueryLastRemoteHeight {
    const message = createBaseQueryLastRemoteHeight();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    return message;
  },
  toAmino(message: QueryLastRemoteHeight, useInterfaces: boolean = false): QueryLastRemoteHeightAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId;
    return obj;
  },
  fromAminoMsg(object: QueryLastRemoteHeightAminoMsg): QueryLastRemoteHeight {
    return QueryLastRemoteHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLastRemoteHeightProtoMsg, useInterfaces: boolean = false): QueryLastRemoteHeight {
    return QueryLastRemoteHeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLastRemoteHeight): Uint8Array {
    return QueryLastRemoteHeight.encode(message).finish();
  },
  toProtoMsg(message: QueryLastRemoteHeight): QueryLastRemoteHeightProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeight",
      value: QueryLastRemoteHeight.encode(message).finish()
    };
  }
};
function createBaseQueryLastRemoteHeightResponse(): QueryLastRemoteHeightResponse {
  return {
    height: BigInt(0)
  };
}
export const QueryLastRemoteHeightResponse = {
  typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeightResponse",
  encode(message: QueryLastRemoteHeightResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLastRemoteHeightResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastRemoteHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLastRemoteHeightResponse>): QueryLastRemoteHeightResponse {
    const message = createBaseQueryLastRemoteHeightResponse();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLastRemoteHeightResponseAmino): QueryLastRemoteHeightResponse {
    const message = createBaseQueryLastRemoteHeightResponse();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: QueryLastRemoteHeightResponse, useInterfaces: boolean = false): QueryLastRemoteHeightResponseAmino {
    const obj: any = {};
    obj.height = message.height ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLastRemoteHeightResponseAminoMsg): QueryLastRemoteHeightResponse {
    return QueryLastRemoteHeightResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLastRemoteHeightResponseProtoMsg, useInterfaces: boolean = false): QueryLastRemoteHeightResponse {
    return QueryLastRemoteHeightResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLastRemoteHeightResponse): Uint8Array {
    return QueryLastRemoteHeightResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLastRemoteHeightResponse): QueryLastRemoteHeightResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryLastRemoteHeightResponse",
      value: QueryLastRemoteHeightResponse.encode(message).finish()
    };
  }
};
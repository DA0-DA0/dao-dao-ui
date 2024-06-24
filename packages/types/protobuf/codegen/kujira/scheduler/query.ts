//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Hook, HookAmino, HookSDKType } from "./hook";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/kujira.scheduler.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/kujira.scheduler.QueryParamsRequest";
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
  typeUrl: "/kujira.scheduler.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/kujira.scheduler.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetHookRequest {
  id: bigint;
}
export interface QueryGetHookRequestProtoMsg {
  typeUrl: "/kujira.scheduler.QueryGetHookRequest";
  value: Uint8Array;
}
export interface QueryGetHookRequestAmino {
  id?: string;
}
export interface QueryGetHookRequestAminoMsg {
  type: "/kujira.scheduler.QueryGetHookRequest";
  value: QueryGetHookRequestAmino;
}
export interface QueryGetHookRequestSDKType {
  id: bigint;
}
export interface QueryGetHookResponse {
  Hook: Hook | undefined;
}
export interface QueryGetHookResponseProtoMsg {
  typeUrl: "/kujira.scheduler.QueryGetHookResponse";
  value: Uint8Array;
}
export interface QueryGetHookResponseAmino {
  Hook?: HookAmino | undefined;
}
export interface QueryGetHookResponseAminoMsg {
  type: "/kujira.scheduler.QueryGetHookResponse";
  value: QueryGetHookResponseAmino;
}
export interface QueryGetHookResponseSDKType {
  Hook: HookSDKType | undefined;
}
export interface QueryAllHookRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllHookRequestProtoMsg {
  typeUrl: "/kujira.scheduler.QueryAllHookRequest";
  value: Uint8Array;
}
export interface QueryAllHookRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllHookRequestAminoMsg {
  type: "/kujira.scheduler.QueryAllHookRequest";
  value: QueryAllHookRequestAmino;
}
export interface QueryAllHookRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllHookResponse {
  Hook: Hook[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllHookResponseProtoMsg {
  typeUrl: "/kujira.scheduler.QueryAllHookResponse";
  value: Uint8Array;
}
export interface QueryAllHookResponseAmino {
  Hook?: HookAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllHookResponseAminoMsg {
  type: "/kujira.scheduler.QueryAllHookResponse";
  value: QueryAllHookResponseAmino;
}
export interface QueryAllHookResponseSDKType {
  Hook: HookSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/kujira.scheduler.QueryParamsRequest",
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
      typeUrl: "/kujira.scheduler.QueryParamsRequest",
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
  typeUrl: "/kujira.scheduler.QueryParamsResponse",
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
      typeUrl: "/kujira.scheduler.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetHookRequest(): QueryGetHookRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryGetHookRequest = {
  typeUrl: "/kujira.scheduler.QueryGetHookRequest",
  encode(message: QueryGetHookRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHookRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHookRequest>): QueryGetHookRequest {
    const message = createBaseQueryGetHookRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetHookRequestAmino): QueryGetHookRequest {
    const message = createBaseQueryGetHookRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryGetHookRequest, useInterfaces: boolean = false): QueryGetHookRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHookRequestAminoMsg): QueryGetHookRequest {
    return QueryGetHookRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHookRequestProtoMsg, useInterfaces: boolean = false): QueryGetHookRequest {
    return QueryGetHookRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHookRequest): Uint8Array {
    return QueryGetHookRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHookRequest): QueryGetHookRequestProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.QueryGetHookRequest",
      value: QueryGetHookRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetHookResponse(): QueryGetHookResponse {
  return {
    Hook: Hook.fromPartial({})
  };
}
export const QueryGetHookResponse = {
  typeUrl: "/kujira.scheduler.QueryGetHookResponse",
  encode(message: QueryGetHookResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.Hook !== undefined) {
      Hook.encode(message.Hook, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHookResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Hook = Hook.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHookResponse>): QueryGetHookResponse {
    const message = createBaseQueryGetHookResponse();
    message.Hook = object.Hook !== undefined && object.Hook !== null ? Hook.fromPartial(object.Hook) : undefined;
    return message;
  },
  fromAmino(object: QueryGetHookResponseAmino): QueryGetHookResponse {
    const message = createBaseQueryGetHookResponse();
    if (object.Hook !== undefined && object.Hook !== null) {
      message.Hook = Hook.fromAmino(object.Hook);
    }
    return message;
  },
  toAmino(message: QueryGetHookResponse, useInterfaces: boolean = false): QueryGetHookResponseAmino {
    const obj: any = {};
    obj.Hook = message.Hook ? Hook.toAmino(message.Hook, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHookResponseAminoMsg): QueryGetHookResponse {
    return QueryGetHookResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHookResponseProtoMsg, useInterfaces: boolean = false): QueryGetHookResponse {
    return QueryGetHookResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHookResponse): Uint8Array {
    return QueryGetHookResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHookResponse): QueryGetHookResponseProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.QueryGetHookResponse",
      value: QueryGetHookResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllHookRequest(): QueryAllHookRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllHookRequest = {
  typeUrl: "/kujira.scheduler.QueryAllHookRequest",
  encode(message: QueryAllHookRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHookRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllHookRequest>): QueryAllHookRequest {
    const message = createBaseQueryAllHookRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHookRequestAmino): QueryAllHookRequest {
    const message = createBaseQueryAllHookRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHookRequest, useInterfaces: boolean = false): QueryAllHookRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHookRequestAminoMsg): QueryAllHookRequest {
    return QueryAllHookRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHookRequestProtoMsg, useInterfaces: boolean = false): QueryAllHookRequest {
    return QueryAllHookRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHookRequest): Uint8Array {
    return QueryAllHookRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHookRequest): QueryAllHookRequestProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.QueryAllHookRequest",
      value: QueryAllHookRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllHookResponse(): QueryAllHookResponse {
  return {
    Hook: [],
    pagination: undefined
  };
}
export const QueryAllHookResponse = {
  typeUrl: "/kujira.scheduler.QueryAllHookResponse",
  encode(message: QueryAllHookResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.Hook) {
      Hook.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHookResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Hook.push(Hook.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllHookResponse>): QueryAllHookResponse {
    const message = createBaseQueryAllHookResponse();
    message.Hook = object.Hook?.map(e => Hook.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHookResponseAmino): QueryAllHookResponse {
    const message = createBaseQueryAllHookResponse();
    message.Hook = object.Hook?.map(e => Hook.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHookResponse, useInterfaces: boolean = false): QueryAllHookResponseAmino {
    const obj: any = {};
    if (message.Hook) {
      obj.Hook = message.Hook.map(e => e ? Hook.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.Hook = message.Hook;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHookResponseAminoMsg): QueryAllHookResponse {
    return QueryAllHookResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHookResponseProtoMsg, useInterfaces: boolean = false): QueryAllHookResponse {
    return QueryAllHookResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHookResponse): Uint8Array {
    return QueryAllHookResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHookResponse): QueryAllHookResponseProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.QueryAllHookResponse",
      value: QueryAllHookResponse.encode(message).finish()
    };
  }
};
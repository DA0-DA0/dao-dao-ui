//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Action, ActionAmino, ActionSDKType } from "./action";
import { FlowTrade, FlowTradeAmino, FlowTradeSDKType } from "./flow_trade";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pryzm.treasury.v1.QueryParamsRequest";
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
  typeUrl: "/pryzm.treasury.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pryzm.treasury.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetActionRequest {}
export interface QueryGetActionRequestProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryGetActionRequest";
  value: Uint8Array;
}
export interface QueryGetActionRequestAmino {}
export interface QueryGetActionRequestAminoMsg {
  type: "/pryzm.treasury.v1.QueryGetActionRequest";
  value: QueryGetActionRequestAmino;
}
export interface QueryGetActionRequestSDKType {}
export interface QueryGetActionResponse {
  action: Action | undefined;
}
export interface QueryGetActionResponseProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryGetActionResponse";
  value: Uint8Array;
}
export interface QueryGetActionResponseAmino {
  action?: ActionAmino | undefined;
}
export interface QueryGetActionResponseAminoMsg {
  type: "/pryzm.treasury.v1.QueryGetActionResponse";
  value: QueryGetActionResponseAmino;
}
export interface QueryGetActionResponseSDKType {
  action: ActionSDKType | undefined;
}
export interface QueryGetFlowTradeRequest {
  flowId: bigint;
}
export interface QueryGetFlowTradeRequestProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeRequest";
  value: Uint8Array;
}
export interface QueryGetFlowTradeRequestAmino {
  flow_id?: string;
}
export interface QueryGetFlowTradeRequestAminoMsg {
  type: "/pryzm.treasury.v1.QueryGetFlowTradeRequest";
  value: QueryGetFlowTradeRequestAmino;
}
export interface QueryGetFlowTradeRequestSDKType {
  flow_id: bigint;
}
export interface QueryGetFlowTradeResponse {
  flowTrade: FlowTrade | undefined;
}
export interface QueryGetFlowTradeResponseProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeResponse";
  value: Uint8Array;
}
export interface QueryGetFlowTradeResponseAmino {
  flow_trade?: FlowTradeAmino | undefined;
}
export interface QueryGetFlowTradeResponseAminoMsg {
  type: "/pryzm.treasury.v1.QueryGetFlowTradeResponse";
  value: QueryGetFlowTradeResponseAmino;
}
export interface QueryGetFlowTradeResponseSDKType {
  flow_trade: FlowTradeSDKType | undefined;
}
export interface QueryAllFlowTradeRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllFlowTradeRequestProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeRequest";
  value: Uint8Array;
}
export interface QueryAllFlowTradeRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllFlowTradeRequestAminoMsg {
  type: "/pryzm.treasury.v1.QueryAllFlowTradeRequest";
  value: QueryAllFlowTradeRequestAmino;
}
export interface QueryAllFlowTradeRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllFlowTradeResponse {
  flowTrade: FlowTrade[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllFlowTradeResponseProtoMsg {
  typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeResponse";
  value: Uint8Array;
}
export interface QueryAllFlowTradeResponseAmino {
  flow_trade?: FlowTradeAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllFlowTradeResponseAminoMsg {
  type: "/pryzm.treasury.v1.QueryAllFlowTradeResponse";
  value: QueryAllFlowTradeResponseAmino;
}
export interface QueryAllFlowTradeResponseSDKType {
  flow_trade: FlowTradeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pryzm.treasury.v1.QueryParamsRequest",
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
      typeUrl: "/pryzm.treasury.v1.QueryParamsRequest",
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
  typeUrl: "/pryzm.treasury.v1.QueryParamsResponse",
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
      typeUrl: "/pryzm.treasury.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetActionRequest(): QueryGetActionRequest {
  return {};
}
export const QueryGetActionRequest = {
  typeUrl: "/pryzm.treasury.v1.QueryGetActionRequest",
  encode(_: QueryGetActionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetActionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionRequest();
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
  fromPartial(_: Partial<QueryGetActionRequest>): QueryGetActionRequest {
    const message = createBaseQueryGetActionRequest();
    return message;
  },
  fromAmino(_: QueryGetActionRequestAmino): QueryGetActionRequest {
    const message = createBaseQueryGetActionRequest();
    return message;
  },
  toAmino(_: QueryGetActionRequest, useInterfaces: boolean = false): QueryGetActionRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetActionRequestAminoMsg): QueryGetActionRequest {
    return QueryGetActionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionRequestProtoMsg, useInterfaces: boolean = false): QueryGetActionRequest {
    return QueryGetActionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetActionRequest): Uint8Array {
    return QueryGetActionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionRequest): QueryGetActionRequestProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryGetActionRequest",
      value: QueryGetActionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetActionResponse(): QueryGetActionResponse {
  return {
    action: Action.fromPartial({})
  };
}
export const QueryGetActionResponse = {
  typeUrl: "/pryzm.treasury.v1.QueryGetActionResponse",
  encode(message: QueryGetActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = Action.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetActionResponse>): QueryGetActionResponse {
    const message = createBaseQueryGetActionResponse();
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: QueryGetActionResponseAmino): QueryGetActionResponse {
    const message = createBaseQueryGetActionResponse();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: QueryGetActionResponse, useInterfaces: boolean = false): QueryGetActionResponseAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetActionResponseAminoMsg): QueryGetActionResponse {
    return QueryGetActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionResponseProtoMsg, useInterfaces: boolean = false): QueryGetActionResponse {
    return QueryGetActionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetActionResponse): Uint8Array {
    return QueryGetActionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionResponse): QueryGetActionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryGetActionResponse",
      value: QueryGetActionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetFlowTradeRequest(): QueryGetFlowTradeRequest {
  return {
    flowId: BigInt(0)
  };
}
export const QueryGetFlowTradeRequest = {
  typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeRequest",
  encode(message: QueryGetFlowTradeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.flowId !== BigInt(0)) {
      writer.uint32(8).uint64(message.flowId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetFlowTradeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetFlowTradeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flowId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetFlowTradeRequest>): QueryGetFlowTradeRequest {
    const message = createBaseQueryGetFlowTradeRequest();
    message.flowId = object.flowId !== undefined && object.flowId !== null ? BigInt(object.flowId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetFlowTradeRequestAmino): QueryGetFlowTradeRequest {
    const message = createBaseQueryGetFlowTradeRequest();
    if (object.flow_id !== undefined && object.flow_id !== null) {
      message.flowId = BigInt(object.flow_id);
    }
    return message;
  },
  toAmino(message: QueryGetFlowTradeRequest, useInterfaces: boolean = false): QueryGetFlowTradeRequestAmino {
    const obj: any = {};
    obj.flow_id = message.flowId !== BigInt(0) ? message.flowId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetFlowTradeRequestAminoMsg): QueryGetFlowTradeRequest {
    return QueryGetFlowTradeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetFlowTradeRequestProtoMsg, useInterfaces: boolean = false): QueryGetFlowTradeRequest {
    return QueryGetFlowTradeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetFlowTradeRequest): Uint8Array {
    return QueryGetFlowTradeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetFlowTradeRequest): QueryGetFlowTradeRequestProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeRequest",
      value: QueryGetFlowTradeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetFlowTradeResponse(): QueryGetFlowTradeResponse {
  return {
    flowTrade: FlowTrade.fromPartial({})
  };
}
export const QueryGetFlowTradeResponse = {
  typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeResponse",
  encode(message: QueryGetFlowTradeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.flowTrade !== undefined) {
      FlowTrade.encode(message.flowTrade, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetFlowTradeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetFlowTradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flowTrade = FlowTrade.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetFlowTradeResponse>): QueryGetFlowTradeResponse {
    const message = createBaseQueryGetFlowTradeResponse();
    message.flowTrade = object.flowTrade !== undefined && object.flowTrade !== null ? FlowTrade.fromPartial(object.flowTrade) : undefined;
    return message;
  },
  fromAmino(object: QueryGetFlowTradeResponseAmino): QueryGetFlowTradeResponse {
    const message = createBaseQueryGetFlowTradeResponse();
    if (object.flow_trade !== undefined && object.flow_trade !== null) {
      message.flowTrade = FlowTrade.fromAmino(object.flow_trade);
    }
    return message;
  },
  toAmino(message: QueryGetFlowTradeResponse, useInterfaces: boolean = false): QueryGetFlowTradeResponseAmino {
    const obj: any = {};
    obj.flow_trade = message.flowTrade ? FlowTrade.toAmino(message.flowTrade, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetFlowTradeResponseAminoMsg): QueryGetFlowTradeResponse {
    return QueryGetFlowTradeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetFlowTradeResponseProtoMsg, useInterfaces: boolean = false): QueryGetFlowTradeResponse {
    return QueryGetFlowTradeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetFlowTradeResponse): Uint8Array {
    return QueryGetFlowTradeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetFlowTradeResponse): QueryGetFlowTradeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryGetFlowTradeResponse",
      value: QueryGetFlowTradeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllFlowTradeRequest(): QueryAllFlowTradeRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllFlowTradeRequest = {
  typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeRequest",
  encode(message: QueryAllFlowTradeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllFlowTradeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFlowTradeRequest();
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
  fromPartial(object: Partial<QueryAllFlowTradeRequest>): QueryAllFlowTradeRequest {
    const message = createBaseQueryAllFlowTradeRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllFlowTradeRequestAmino): QueryAllFlowTradeRequest {
    const message = createBaseQueryAllFlowTradeRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllFlowTradeRequest, useInterfaces: boolean = false): QueryAllFlowTradeRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllFlowTradeRequestAminoMsg): QueryAllFlowTradeRequest {
    return QueryAllFlowTradeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllFlowTradeRequestProtoMsg, useInterfaces: boolean = false): QueryAllFlowTradeRequest {
    return QueryAllFlowTradeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllFlowTradeRequest): Uint8Array {
    return QueryAllFlowTradeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllFlowTradeRequest): QueryAllFlowTradeRequestProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeRequest",
      value: QueryAllFlowTradeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllFlowTradeResponse(): QueryAllFlowTradeResponse {
  return {
    flowTrade: [],
    pagination: undefined
  };
}
export const QueryAllFlowTradeResponse = {
  typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeResponse",
  encode(message: QueryAllFlowTradeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.flowTrade) {
      FlowTrade.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllFlowTradeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFlowTradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flowTrade.push(FlowTrade.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllFlowTradeResponse>): QueryAllFlowTradeResponse {
    const message = createBaseQueryAllFlowTradeResponse();
    message.flowTrade = object.flowTrade?.map(e => FlowTrade.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllFlowTradeResponseAmino): QueryAllFlowTradeResponse {
    const message = createBaseQueryAllFlowTradeResponse();
    message.flowTrade = object.flow_trade?.map(e => FlowTrade.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllFlowTradeResponse, useInterfaces: boolean = false): QueryAllFlowTradeResponseAmino {
    const obj: any = {};
    if (message.flowTrade) {
      obj.flow_trade = message.flowTrade.map(e => e ? FlowTrade.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.flow_trade = message.flowTrade;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllFlowTradeResponseAminoMsg): QueryAllFlowTradeResponse {
    return QueryAllFlowTradeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllFlowTradeResponseProtoMsg, useInterfaces: boolean = false): QueryAllFlowTradeResponse {
    return QueryAllFlowTradeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllFlowTradeResponse): Uint8Array {
    return QueryAllFlowTradeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllFlowTradeResponse): QueryAllFlowTradeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.QueryAllFlowTradeResponse",
      value: QueryAllFlowTradeResponse.encode(message).finish()
    };
  }
};
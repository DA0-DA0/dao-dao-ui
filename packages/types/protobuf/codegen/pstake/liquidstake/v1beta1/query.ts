//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, LiquidValidatorState, LiquidValidatorStateAmino, LiquidValidatorStateSDKType, NetAmountState, NetAmountStateAmino, NetAmountStateSDKType } from "./liquidstake";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/**
 * QueryLiquidValidatorsRequest is the request type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsRequest {}
export interface QueryLiquidValidatorsRequestProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsRequest";
  value: Uint8Array;
}
/**
 * QueryLiquidValidatorsRequest is the request type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsRequestAmino {}
export interface QueryLiquidValidatorsRequestAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsRequest";
  value: QueryLiquidValidatorsRequestAmino;
}
/**
 * QueryLiquidValidatorsRequest is the request type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsRequestSDKType {}
/**
 * QueryLiquidValidatorsResponse is the response type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsResponse {
  liquidValidators: LiquidValidatorState[];
}
export interface QueryLiquidValidatorsResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsResponse";
  value: Uint8Array;
}
/**
 * QueryLiquidValidatorsResponse is the response type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsResponseAmino {
  liquid_validators?: LiquidValidatorStateAmino[];
}
export interface QueryLiquidValidatorsResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsResponse";
  value: QueryLiquidValidatorsResponseAmino;
}
/**
 * QueryLiquidValidatorsResponse is the response type for the
 * Query/LiquidValidators RPC method.
 */
export interface QueryLiquidValidatorsResponseSDKType {
  liquid_validators: LiquidValidatorStateSDKType[];
}
/** QueryStatesRequest is the request type for the Query/States RPC method. */
export interface QueryStatesRequest {}
export interface QueryStatesRequestProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesRequest";
  value: Uint8Array;
}
/** QueryStatesRequest is the request type for the Query/States RPC method. */
export interface QueryStatesRequestAmino {}
export interface QueryStatesRequestAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryStatesRequest";
  value: QueryStatesRequestAmino;
}
/** QueryStatesRequest is the request type for the Query/States RPC method. */
export interface QueryStatesRequestSDKType {}
/** QueryStatesResponse is the response type for the Query/States RPC method. */
export interface QueryStatesResponse {
  netAmountState: NetAmountState | undefined;
}
export interface QueryStatesResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesResponse";
  value: Uint8Array;
}
/** QueryStatesResponse is the response type for the Query/States RPC method. */
export interface QueryStatesResponseAmino {
  net_amount_state?: NetAmountStateAmino | undefined;
}
export interface QueryStatesResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.QueryStatesResponse";
  value: QueryStatesResponseAmino;
}
/** QueryStatesResponse is the response type for the Query/States RPC method. */
export interface QueryStatesResponseSDKType {
  net_amount_state: NetAmountStateSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsRequest",
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
      typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsRequest",
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
  typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsResponse",
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
      typeUrl: "/pstake.liquidstake.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidValidatorsRequest(): QueryLiquidValidatorsRequest {
  return {};
}
export const QueryLiquidValidatorsRequest = {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsRequest",
  encode(_: QueryLiquidValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLiquidValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidValidatorsRequest();
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
  fromPartial(_: Partial<QueryLiquidValidatorsRequest>): QueryLiquidValidatorsRequest {
    const message = createBaseQueryLiquidValidatorsRequest();
    return message;
  },
  fromAmino(_: QueryLiquidValidatorsRequestAmino): QueryLiquidValidatorsRequest {
    const message = createBaseQueryLiquidValidatorsRequest();
    return message;
  },
  toAmino(_: QueryLiquidValidatorsRequest, useInterfaces: boolean = false): QueryLiquidValidatorsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLiquidValidatorsRequestAminoMsg): QueryLiquidValidatorsRequest {
    return QueryLiquidValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryLiquidValidatorsRequest {
    return QueryLiquidValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLiquidValidatorsRequest): Uint8Array {
    return QueryLiquidValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidValidatorsRequest): QueryLiquidValidatorsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsRequest",
      value: QueryLiquidValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidValidatorsResponse(): QueryLiquidValidatorsResponse {
  return {
    liquidValidators: []
  };
}
export const QueryLiquidValidatorsResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsResponse",
  encode(message: QueryLiquidValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidValidators) {
      LiquidValidatorState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLiquidValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidValidators.push(LiquidValidatorState.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidValidatorsResponse>): QueryLiquidValidatorsResponse {
    const message = createBaseQueryLiquidValidatorsResponse();
    message.liquidValidators = object.liquidValidators?.map(e => LiquidValidatorState.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryLiquidValidatorsResponseAmino): QueryLiquidValidatorsResponse {
    const message = createBaseQueryLiquidValidatorsResponse();
    message.liquidValidators = object.liquid_validators?.map(e => LiquidValidatorState.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryLiquidValidatorsResponse, useInterfaces: boolean = false): QueryLiquidValidatorsResponseAmino {
    const obj: any = {};
    if (message.liquidValidators) {
      obj.liquid_validators = message.liquidValidators.map(e => e ? LiquidValidatorState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.liquid_validators = message.liquidValidators;
    }
    return obj;
  },
  fromAminoMsg(object: QueryLiquidValidatorsResponseAminoMsg): QueryLiquidValidatorsResponse {
    return QueryLiquidValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryLiquidValidatorsResponse {
    return QueryLiquidValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLiquidValidatorsResponse): Uint8Array {
    return QueryLiquidValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidValidatorsResponse): QueryLiquidValidatorsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.QueryLiquidValidatorsResponse",
      value: QueryLiquidValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryStatesRequest(): QueryStatesRequest {
  return {};
}
export const QueryStatesRequest = {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesRequest",
  encode(_: QueryStatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStatesRequest();
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
  fromPartial(_: Partial<QueryStatesRequest>): QueryStatesRequest {
    const message = createBaseQueryStatesRequest();
    return message;
  },
  fromAmino(_: QueryStatesRequestAmino): QueryStatesRequest {
    const message = createBaseQueryStatesRequest();
    return message;
  },
  toAmino(_: QueryStatesRequest, useInterfaces: boolean = false): QueryStatesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryStatesRequestAminoMsg): QueryStatesRequest {
    return QueryStatesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStatesRequestProtoMsg, useInterfaces: boolean = false): QueryStatesRequest {
    return QueryStatesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStatesRequest): Uint8Array {
    return QueryStatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStatesRequest): QueryStatesRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesRequest",
      value: QueryStatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStatesResponse(): QueryStatesResponse {
  return {
    netAmountState: NetAmountState.fromPartial({})
  };
}
export const QueryStatesResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesResponse",
  encode(message: QueryStatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.netAmountState !== undefined) {
      NetAmountState.encode(message.netAmountState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.netAmountState = NetAmountState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryStatesResponse>): QueryStatesResponse {
    const message = createBaseQueryStatesResponse();
    message.netAmountState = object.netAmountState !== undefined && object.netAmountState !== null ? NetAmountState.fromPartial(object.netAmountState) : undefined;
    return message;
  },
  fromAmino(object: QueryStatesResponseAmino): QueryStatesResponse {
    const message = createBaseQueryStatesResponse();
    if (object.net_amount_state !== undefined && object.net_amount_state !== null) {
      message.netAmountState = NetAmountState.fromAmino(object.net_amount_state);
    }
    return message;
  },
  toAmino(message: QueryStatesResponse, useInterfaces: boolean = false): QueryStatesResponseAmino {
    const obj: any = {};
    obj.net_amount_state = message.netAmountState ? NetAmountState.toAmino(message.netAmountState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStatesResponseAminoMsg): QueryStatesResponse {
    return QueryStatesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStatesResponseProtoMsg, useInterfaces: boolean = false): QueryStatesResponse {
    return QueryStatesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStatesResponse): Uint8Array {
    return QueryStatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStatesResponse): QueryStatesResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.QueryStatesResponse",
      value: QueryStatesResponse.encode(message).finish()
    };
  }
};
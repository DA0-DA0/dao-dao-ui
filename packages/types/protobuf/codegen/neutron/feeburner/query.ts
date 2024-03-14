//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { TotalBurnedNeutronsAmount, TotalBurnedNeutronsAmountAmino, TotalBurnedNeutronsAmountSDKType } from "./total_burned_neutrons_amount";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.feeburner.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.feeburner.QueryParamsRequest";
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
  typeUrl: "/neutron.feeburner.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.feeburner.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/**
 * QueryTotalBurnedNeutronsAmountRequest is request type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountRequest {}
export interface QueryTotalBurnedNeutronsAmountRequestProtoMsg {
  typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountRequest";
  value: Uint8Array;
}
/**
 * QueryTotalBurnedNeutronsAmountRequest is request type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountRequestAmino {}
export interface QueryTotalBurnedNeutronsAmountRequestAminoMsg {
  type: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountRequest";
  value: QueryTotalBurnedNeutronsAmountRequestAmino;
}
/**
 * QueryTotalBurnedNeutronsAmountRequest is request type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountRequestSDKType {}
/**
 * QueryTotalBurnedNeutronsAmountResponse is response type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountResponse {
  totalBurnedNeutronsAmount: TotalBurnedNeutronsAmount | undefined;
}
export interface QueryTotalBurnedNeutronsAmountResponseProtoMsg {
  typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountResponse";
  value: Uint8Array;
}
/**
 * QueryTotalBurnedNeutronsAmountResponse is response type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountResponseAmino {
  total_burned_neutrons_amount?: TotalBurnedNeutronsAmountAmino | undefined;
}
export interface QueryTotalBurnedNeutronsAmountResponseAminoMsg {
  type: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountResponse";
  value: QueryTotalBurnedNeutronsAmountResponseAmino;
}
/**
 * QueryTotalBurnedNeutronsAmountResponse is response type for the
 * Query/QueryTotalBurnedNeutronsAmount method.
 */
export interface QueryTotalBurnedNeutronsAmountResponseSDKType {
  total_burned_neutrons_amount: TotalBurnedNeutronsAmountSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.feeburner.QueryParamsRequest",
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
      typeUrl: "/neutron.feeburner.QueryParamsRequest",
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
  typeUrl: "/neutron.feeburner.QueryParamsResponse",
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
      typeUrl: "/neutron.feeburner.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTotalBurnedNeutronsAmountRequest(): QueryTotalBurnedNeutronsAmountRequest {
  return {};
}
export const QueryTotalBurnedNeutronsAmountRequest = {
  typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountRequest",
  encode(_: QueryTotalBurnedNeutronsAmountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalBurnedNeutronsAmountRequest();
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
  fromPartial(_: Partial<QueryTotalBurnedNeutronsAmountRequest>): QueryTotalBurnedNeutronsAmountRequest {
    const message = createBaseQueryTotalBurnedNeutronsAmountRequest();
    return message;
  },
  fromAmino(_: QueryTotalBurnedNeutronsAmountRequestAmino): QueryTotalBurnedNeutronsAmountRequest {
    const message = createBaseQueryTotalBurnedNeutronsAmountRequest();
    return message;
  },
  toAmino(_: QueryTotalBurnedNeutronsAmountRequest, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryTotalBurnedNeutronsAmountRequestAminoMsg): QueryTotalBurnedNeutronsAmountRequest {
    return QueryTotalBurnedNeutronsAmountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTotalBurnedNeutronsAmountRequestProtoMsg, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountRequest {
    return QueryTotalBurnedNeutronsAmountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalBurnedNeutronsAmountRequest): Uint8Array {
    return QueryTotalBurnedNeutronsAmountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalBurnedNeutronsAmountRequest): QueryTotalBurnedNeutronsAmountRequestProtoMsg {
    return {
      typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountRequest",
      value: QueryTotalBurnedNeutronsAmountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTotalBurnedNeutronsAmountResponse(): QueryTotalBurnedNeutronsAmountResponse {
  return {
    totalBurnedNeutronsAmount: TotalBurnedNeutronsAmount.fromPartial({})
  };
}
export const QueryTotalBurnedNeutronsAmountResponse = {
  typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountResponse",
  encode(message: QueryTotalBurnedNeutronsAmountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalBurnedNeutronsAmount !== undefined) {
      TotalBurnedNeutronsAmount.encode(message.totalBurnedNeutronsAmount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalBurnedNeutronsAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalBurnedNeutronsAmount = TotalBurnedNeutronsAmount.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalBurnedNeutronsAmountResponse>): QueryTotalBurnedNeutronsAmountResponse {
    const message = createBaseQueryTotalBurnedNeutronsAmountResponse();
    message.totalBurnedNeutronsAmount = object.totalBurnedNeutronsAmount !== undefined && object.totalBurnedNeutronsAmount !== null ? TotalBurnedNeutronsAmount.fromPartial(object.totalBurnedNeutronsAmount) : undefined;
    return message;
  },
  fromAmino(object: QueryTotalBurnedNeutronsAmountResponseAmino): QueryTotalBurnedNeutronsAmountResponse {
    const message = createBaseQueryTotalBurnedNeutronsAmountResponse();
    if (object.total_burned_neutrons_amount !== undefined && object.total_burned_neutrons_amount !== null) {
      message.totalBurnedNeutronsAmount = TotalBurnedNeutronsAmount.fromAmino(object.total_burned_neutrons_amount);
    }
    return message;
  },
  toAmino(message: QueryTotalBurnedNeutronsAmountResponse, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountResponseAmino {
    const obj: any = {};
    obj.total_burned_neutrons_amount = message.totalBurnedNeutronsAmount ? TotalBurnedNeutronsAmount.toAmino(message.totalBurnedNeutronsAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTotalBurnedNeutronsAmountResponseAminoMsg): QueryTotalBurnedNeutronsAmountResponse {
    return QueryTotalBurnedNeutronsAmountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTotalBurnedNeutronsAmountResponseProtoMsg, useInterfaces: boolean = false): QueryTotalBurnedNeutronsAmountResponse {
    return QueryTotalBurnedNeutronsAmountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalBurnedNeutronsAmountResponse): Uint8Array {
    return QueryTotalBurnedNeutronsAmountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalBurnedNeutronsAmountResponse): QueryTotalBurnedNeutronsAmountResponseProtoMsg {
    return {
      typeUrl: "/neutron.feeburner.QueryTotalBurnedNeutronsAmountResponse",
      value: QueryTotalBurnedNeutronsAmountResponse.encode(message).finish()
    };
  }
};
//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Failure, FailureAmino, FailureSDKType } from "./failure";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.contractmanager.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.contractmanager.QueryParamsRequest";
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
  typeUrl: "/neutron.contractmanager.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.contractmanager.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** QueryFailuresRequest is request type for the Query/Failures RPC method. */
export interface QueryFailuresRequest {
  /** address of the contract which Sudo call failed. */
  address: string;
  /** ID of the failure for the given contract. */
  failureId: bigint;
  pagination?: PageRequest | undefined;
}
export interface QueryFailuresRequestProtoMsg {
  typeUrl: "/neutron.contractmanager.QueryFailuresRequest";
  value: Uint8Array;
}
/** QueryFailuresRequest is request type for the Query/Failures RPC method. */
export interface QueryFailuresRequestAmino {
  /** address of the contract which Sudo call failed. */
  address?: string;
  /** ID of the failure for the given contract. */
  failure_id?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryFailuresRequestAminoMsg {
  type: "/neutron.contractmanager.QueryFailuresRequest";
  value: QueryFailuresRequestAmino;
}
/** QueryFailuresRequest is request type for the Query/Failures RPC method. */
export interface QueryFailuresRequestSDKType {
  address: string;
  failure_id: bigint;
  pagination?: PageRequestSDKType | undefined;
}
/** QueryFailuresResponse is response type for the Query/Failures RPC method. */
export interface QueryFailuresResponse {
  failures: Failure[];
  pagination?: PageResponse | undefined;
}
export interface QueryFailuresResponseProtoMsg {
  typeUrl: "/neutron.contractmanager.QueryFailuresResponse";
  value: Uint8Array;
}
/** QueryFailuresResponse is response type for the Query/Failures RPC method. */
export interface QueryFailuresResponseAmino {
  failures?: FailureAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryFailuresResponseAminoMsg {
  type: "/neutron.contractmanager.QueryFailuresResponse";
  value: QueryFailuresResponseAmino;
}
/** QueryFailuresResponse is response type for the Query/Failures RPC method. */
export interface QueryFailuresResponseSDKType {
  failures: FailureSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.contractmanager.QueryParamsRequest",
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
      typeUrl: "/neutron.contractmanager.QueryParamsRequest",
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
  typeUrl: "/neutron.contractmanager.QueryParamsResponse",
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
      typeUrl: "/neutron.contractmanager.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFailuresRequest(): QueryFailuresRequest {
  return {
    address: "",
    failureId: BigInt(0),
    pagination: undefined
  };
}
export const QueryFailuresRequest = {
  typeUrl: "/neutron.contractmanager.QueryFailuresRequest",
  encode(message: QueryFailuresRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.failureId !== BigInt(0)) {
      writer.uint32(16).uint64(message.failureId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFailuresRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFailuresRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.failureId = reader.uint64();
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
  fromPartial(object: Partial<QueryFailuresRequest>): QueryFailuresRequest {
    const message = createBaseQueryFailuresRequest();
    message.address = object.address ?? "";
    message.failureId = object.failureId !== undefined && object.failureId !== null ? BigInt(object.failureId.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryFailuresRequestAmino): QueryFailuresRequest {
    const message = createBaseQueryFailuresRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.failure_id !== undefined && object.failure_id !== null) {
      message.failureId = BigInt(object.failure_id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryFailuresRequest, useInterfaces: boolean = false): QueryFailuresRequestAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.failure_id = message.failureId ? message.failureId.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFailuresRequestAminoMsg): QueryFailuresRequest {
    return QueryFailuresRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFailuresRequestProtoMsg, useInterfaces: boolean = false): QueryFailuresRequest {
    return QueryFailuresRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFailuresRequest): Uint8Array {
    return QueryFailuresRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFailuresRequest): QueryFailuresRequestProtoMsg {
    return {
      typeUrl: "/neutron.contractmanager.QueryFailuresRequest",
      value: QueryFailuresRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFailuresResponse(): QueryFailuresResponse {
  return {
    failures: [],
    pagination: undefined
  };
}
export const QueryFailuresResponse = {
  typeUrl: "/neutron.contractmanager.QueryFailuresResponse",
  encode(message: QueryFailuresResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.failures) {
      Failure.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFailuresResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFailuresResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.failures.push(Failure.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryFailuresResponse>): QueryFailuresResponse {
    const message = createBaseQueryFailuresResponse();
    message.failures = object.failures?.map(e => Failure.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryFailuresResponseAmino): QueryFailuresResponse {
    const message = createBaseQueryFailuresResponse();
    message.failures = object.failures?.map(e => Failure.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryFailuresResponse, useInterfaces: boolean = false): QueryFailuresResponseAmino {
    const obj: any = {};
    if (message.failures) {
      obj.failures = message.failures.map(e => e ? Failure.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failures = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFailuresResponseAminoMsg): QueryFailuresResponse {
    return QueryFailuresResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFailuresResponseProtoMsg, useInterfaces: boolean = false): QueryFailuresResponse {
    return QueryFailuresResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFailuresResponse): Uint8Array {
    return QueryFailuresResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFailuresResponse): QueryFailuresResponseProtoMsg {
    return {
      typeUrl: "/neutron.contractmanager.QueryFailuresResponse",
      value: QueryFailuresResponse.encode(message).finish()
    };
  }
};
//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChain, HostChainAmino, HostChainSDKType } from "./ratesync";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryParamsRequest";
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
  typeUrl: "/pstake.ratesync.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetHostChainRequest {
  iD: bigint;
}
export interface QueryGetHostChainRequestProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainRequest";
  value: Uint8Array;
}
export interface QueryGetHostChainRequestAmino {
  i_d?: string;
}
export interface QueryGetHostChainRequestAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryGetHostChainRequest";
  value: QueryGetHostChainRequestAmino;
}
export interface QueryGetHostChainRequestSDKType {
  i_d: bigint;
}
export interface QueryGetHostChainResponse {
  hostChain: HostChain | undefined;
}
export interface QueryGetHostChainResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainResponse";
  value: Uint8Array;
}
export interface QueryGetHostChainResponseAmino {
  host_chain?: HostChainAmino | undefined;
}
export interface QueryGetHostChainResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryGetHostChainResponse";
  value: QueryGetHostChainResponseAmino;
}
export interface QueryGetHostChainResponseSDKType {
  host_chain: HostChainSDKType | undefined;
}
export interface QueryAllHostChainsRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllHostChainsRequestProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsRequest";
  value: Uint8Array;
}
export interface QueryAllHostChainsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllHostChainsRequestAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryAllHostChainsRequest";
  value: QueryAllHostChainsRequestAmino;
}
export interface QueryAllHostChainsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllHostChainsResponse {
  hostChains: HostChain[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllHostChainsResponseProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsResponse";
  value: Uint8Array;
}
export interface QueryAllHostChainsResponseAmino {
  host_chains?: HostChainAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllHostChainsResponseAminoMsg {
  type: "/pstake.ratesync.v1beta1.QueryAllHostChainsResponse";
  value: QueryAllHostChainsResponseAmino;
}
export interface QueryAllHostChainsResponseSDKType {
  host_chains: HostChainSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pstake.ratesync.v1beta1.QueryParamsRequest",
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
      typeUrl: "/pstake.ratesync.v1beta1.QueryParamsRequest",
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
  typeUrl: "/pstake.ratesync.v1beta1.QueryParamsResponse",
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
      typeUrl: "/pstake.ratesync.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainRequest(): QueryGetHostChainRequest {
  return {
    iD: BigInt(0)
  };
}
export const QueryGetHostChainRequest = {
  typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainRequest",
  encode(message: QueryGetHostChainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iD !== BigInt(0)) {
      writer.uint32(8).uint64(message.iD);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iD = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainRequest>): QueryGetHostChainRequest {
    const message = createBaseQueryGetHostChainRequest();
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetHostChainRequestAmino): QueryGetHostChainRequest {
    const message = createBaseQueryGetHostChainRequest();
    if (object.i_d !== undefined && object.i_d !== null) {
      message.iD = BigInt(object.i_d);
    }
    return message;
  },
  toAmino(message: QueryGetHostChainRequest, useInterfaces: boolean = false): QueryGetHostChainRequestAmino {
    const obj: any = {};
    obj.i_d = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainRequestAminoMsg): QueryGetHostChainRequest {
    return QueryGetHostChainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainRequestProtoMsg, useInterfaces: boolean = false): QueryGetHostChainRequest {
    return QueryGetHostChainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainRequest): Uint8Array {
    return QueryGetHostChainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainRequest): QueryGetHostChainRequestProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainRequest",
      value: QueryGetHostChainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainResponse(): QueryGetHostChainResponse {
  return {
    hostChain: HostChain.fromPartial({})
  };
}
export const QueryGetHostChainResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainResponse",
  encode(message: QueryGetHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainResponse>): QueryGetHostChainResponse {
    const message = createBaseQueryGetHostChainResponse();
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: QueryGetHostChainResponseAmino): QueryGetHostChainResponse {
    const message = createBaseQueryGetHostChainResponse();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: QueryGetHostChainResponse, useInterfaces: boolean = false): QueryGetHostChainResponseAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainResponseAminoMsg): QueryGetHostChainResponse {
    return QueryGetHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainResponseProtoMsg, useInterfaces: boolean = false): QueryGetHostChainResponse {
    return QueryGetHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainResponse): Uint8Array {
    return QueryGetHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainResponse): QueryGetHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.QueryGetHostChainResponse",
      value: QueryGetHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainsRequest(): QueryAllHostChainsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllHostChainsRequest = {
  typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsRequest",
  encode(message: QueryAllHostChainsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainsRequest();
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
  fromPartial(object: Partial<QueryAllHostChainsRequest>): QueryAllHostChainsRequest {
    const message = createBaseQueryAllHostChainsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainsRequestAmino): QueryAllHostChainsRequest {
    const message = createBaseQueryAllHostChainsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainsRequest, useInterfaces: boolean = false): QueryAllHostChainsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainsRequestAminoMsg): QueryAllHostChainsRequest {
    return QueryAllHostChainsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainsRequestProtoMsg, useInterfaces: boolean = false): QueryAllHostChainsRequest {
    return QueryAllHostChainsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainsRequest): Uint8Array {
    return QueryAllHostChainsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainsRequest): QueryAllHostChainsRequestProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsRequest",
      value: QueryAllHostChainsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainsResponse(): QueryAllHostChainsResponse {
  return {
    hostChains: [],
    pagination: undefined
  };
}
export const QueryAllHostChainsResponse = {
  typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsResponse",
  encode(message: QueryAllHostChainsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostChains) {
      HostChain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChains.push(HostChain.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllHostChainsResponse>): QueryAllHostChainsResponse {
    const message = createBaseQueryAllHostChainsResponse();
    message.hostChains = object.hostChains?.map(e => HostChain.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainsResponseAmino): QueryAllHostChainsResponse {
    const message = createBaseQueryAllHostChainsResponse();
    message.hostChains = object.host_chains?.map(e => HostChain.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainsResponse, useInterfaces: boolean = false): QueryAllHostChainsResponseAmino {
    const obj: any = {};
    if (message.hostChains) {
      obj.host_chains = message.hostChains.map(e => e ? HostChain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chains = message.hostChains;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainsResponseAminoMsg): QueryAllHostChainsResponse {
    return QueryAllHostChainsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainsResponseProtoMsg, useInterfaces: boolean = false): QueryAllHostChainsResponse {
    return QueryAllHostChainsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainsResponse): Uint8Array {
    return QueryAllHostChainsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainsResponse): QueryAllHostChainsResponseProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.QueryAllHostChainsResponse",
      value: QueryAllHostChainsResponse.encode(message).finish()
    };
  }
};
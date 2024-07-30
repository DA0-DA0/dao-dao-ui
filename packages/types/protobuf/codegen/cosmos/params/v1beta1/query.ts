//@ts-nocheck
import { ParamChange, ParamChangeAmino, ParamChangeSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
  /** subspace defines the module to query the parameter for. */
  subspace: string;
  /** key defines the key of the parameter in the subspace. */
  key: string;
}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/cosmos.params.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {
  /** subspace defines the module to query the parameter for. */
  subspace?: string;
  /** key defines the key of the parameter in the subspace. */
  key?: string;
}
export interface QueryParamsRequestAminoMsg {
  type: "cosmos-sdk/QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {
  subspace: string;
  key: string;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** param defines the queried parameter. */
  param: ParamChange | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/cosmos.params.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** param defines the queried parameter. */
  param: ParamChangeAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "cosmos-sdk/QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  param: ParamChangeSDKType | undefined;
}
/**
 * QuerySubspacesRequest defines a request type for querying for all registered
 * subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesRequest {}
export interface QuerySubspacesRequestProtoMsg {
  typeUrl: "/cosmos.params.v1beta1.QuerySubspacesRequest";
  value: Uint8Array;
}
/**
 * QuerySubspacesRequest defines a request type for querying for all registered
 * subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesRequestAmino {}
export interface QuerySubspacesRequestAminoMsg {
  type: "cosmos-sdk/QuerySubspacesRequest";
  value: QuerySubspacesRequestAmino;
}
/**
 * QuerySubspacesRequest defines a request type for querying for all registered
 * subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesRequestSDKType {}
/**
 * QuerySubspacesResponse defines the response types for querying for all
 * registered subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesResponse {
  subspaces: Subspace[];
}
export interface QuerySubspacesResponseProtoMsg {
  typeUrl: "/cosmos.params.v1beta1.QuerySubspacesResponse";
  value: Uint8Array;
}
/**
 * QuerySubspacesResponse defines the response types for querying for all
 * registered subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesResponseAmino {
  subspaces?: SubspaceAmino[];
}
export interface QuerySubspacesResponseAminoMsg {
  type: "cosmos-sdk/QuerySubspacesResponse";
  value: QuerySubspacesResponseAmino;
}
/**
 * QuerySubspacesResponse defines the response types for querying for all
 * registered subspaces and all keys for a subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesResponseSDKType {
  subspaces: SubspaceSDKType[];
}
/**
 * Subspace defines a parameter subspace name and all the keys that exist for
 * the subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface Subspace {
  subspace: string;
  keys: string[];
}
export interface SubspaceProtoMsg {
  typeUrl: "/cosmos.params.v1beta1.Subspace";
  value: Uint8Array;
}
/**
 * Subspace defines a parameter subspace name and all the keys that exist for
 * the subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface SubspaceAmino {
  subspace?: string;
  keys?: string[];
}
export interface SubspaceAminoMsg {
  type: "cosmos-sdk/Subspace";
  value: SubspaceAmino;
}
/**
 * Subspace defines a parameter subspace name and all the keys that exist for
 * the subspace.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface SubspaceSDKType {
  subspace: string;
  keys: string[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {
    subspace: "",
    key: ""
  };
}
export const QueryParamsRequest = {
  typeUrl: "/cosmos.params.v1beta1.QueryParamsRequest",
  encode(message: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.subspace !== "") {
      writer.uint32(10).string(message.subspace);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subspace = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    message.subspace = object.subspace ?? "";
    message.key = object.key ?? "";
    return message;
  },
  fromAmino(object: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    return message;
  },
  toAmino(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    obj.subspace = message.subspace === "" ? undefined : message.subspace;
    obj.key = message.key === "" ? undefined : message.key;
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryParamsRequest",
      value: QueryParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.params.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    param: ParamChange.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/cosmos.params.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.param !== undefined) {
      ParamChange.encode(message.param, writer.uint32(10).fork()).ldelim();
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
          message.param = ParamChange.decode(reader, reader.uint32(), useInterfaces);
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
    message.param = object.param !== undefined && object.param !== null ? ParamChange.fromPartial(object.param) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.param !== undefined && object.param !== null) {
      message.param = ParamChange.fromAmino(object.param);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.param = message.param ? ParamChange.toAmino(message.param, useInterfaces) : ParamChange.toAmino(ParamChange.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryParamsResponse",
      value: QueryParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.params.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySubspacesRequest(): QuerySubspacesRequest {
  return {};
}
export const QuerySubspacesRequest = {
  typeUrl: "/cosmos.params.v1beta1.QuerySubspacesRequest",
  encode(_: QuerySubspacesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySubspacesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubspacesRequest();
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
  fromPartial(_: Partial<QuerySubspacesRequest>): QuerySubspacesRequest {
    const message = createBaseQuerySubspacesRequest();
    return message;
  },
  fromAmino(_: QuerySubspacesRequestAmino): QuerySubspacesRequest {
    const message = createBaseQuerySubspacesRequest();
    return message;
  },
  toAmino(_: QuerySubspacesRequest, useInterfaces: boolean = false): QuerySubspacesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QuerySubspacesRequestAminoMsg): QuerySubspacesRequest {
    return QuerySubspacesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QuerySubspacesRequest, useInterfaces: boolean = false): QuerySubspacesRequestAminoMsg {
    return {
      type: "cosmos-sdk/QuerySubspacesRequest",
      value: QuerySubspacesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QuerySubspacesRequestProtoMsg, useInterfaces: boolean = false): QuerySubspacesRequest {
    return QuerySubspacesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySubspacesRequest): Uint8Array {
    return QuerySubspacesRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySubspacesRequest): QuerySubspacesRequestProtoMsg {
    return {
      typeUrl: "/cosmos.params.v1beta1.QuerySubspacesRequest",
      value: QuerySubspacesRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySubspacesResponse(): QuerySubspacesResponse {
  return {
    subspaces: []
  };
}
export const QuerySubspacesResponse = {
  typeUrl: "/cosmos.params.v1beta1.QuerySubspacesResponse",
  encode(message: QuerySubspacesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.subspaces) {
      Subspace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySubspacesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubspacesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subspaces.push(Subspace.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySubspacesResponse>): QuerySubspacesResponse {
    const message = createBaseQuerySubspacesResponse();
    message.subspaces = object.subspaces?.map(e => Subspace.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySubspacesResponseAmino): QuerySubspacesResponse {
    const message = createBaseQuerySubspacesResponse();
    message.subspaces = object.subspaces?.map(e => Subspace.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySubspacesResponse, useInterfaces: boolean = false): QuerySubspacesResponseAmino {
    const obj: any = {};
    if (message.subspaces) {
      obj.subspaces = message.subspaces.map(e => e ? Subspace.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.subspaces = message.subspaces;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySubspacesResponseAminoMsg): QuerySubspacesResponse {
    return QuerySubspacesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QuerySubspacesResponse, useInterfaces: boolean = false): QuerySubspacesResponseAminoMsg {
    return {
      type: "cosmos-sdk/QuerySubspacesResponse",
      value: QuerySubspacesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QuerySubspacesResponseProtoMsg, useInterfaces: boolean = false): QuerySubspacesResponse {
    return QuerySubspacesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySubspacesResponse): Uint8Array {
    return QuerySubspacesResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySubspacesResponse): QuerySubspacesResponseProtoMsg {
    return {
      typeUrl: "/cosmos.params.v1beta1.QuerySubspacesResponse",
      value: QuerySubspacesResponse.encode(message).finish()
    };
  }
};
function createBaseSubspace(): Subspace {
  return {
    subspace: "",
    keys: []
  };
}
export const Subspace = {
  typeUrl: "/cosmos.params.v1beta1.Subspace",
  encode(message: Subspace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.subspace !== "") {
      writer.uint32(10).string(message.subspace);
    }
    for (const v of message.keys) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Subspace {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubspace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subspace = reader.string();
          break;
        case 2:
          message.keys.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Subspace>): Subspace {
    const message = createBaseSubspace();
    message.subspace = object.subspace ?? "";
    message.keys = object.keys?.map(e => e) || [];
    return message;
  },
  fromAmino(object: SubspaceAmino): Subspace {
    const message = createBaseSubspace();
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace;
    }
    message.keys = object.keys?.map(e => e) || [];
    return message;
  },
  toAmino(message: Subspace, useInterfaces: boolean = false): SubspaceAmino {
    const obj: any = {};
    obj.subspace = message.subspace === "" ? undefined : message.subspace;
    if (message.keys) {
      obj.keys = message.keys.map(e => e);
    } else {
      obj.keys = message.keys;
    }
    return obj;
  },
  fromAminoMsg(object: SubspaceAminoMsg): Subspace {
    return Subspace.fromAmino(object.value);
  },
  toAminoMsg(message: Subspace, useInterfaces: boolean = false): SubspaceAminoMsg {
    return {
      type: "cosmos-sdk/Subspace",
      value: Subspace.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SubspaceProtoMsg, useInterfaces: boolean = false): Subspace {
    return Subspace.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Subspace): Uint8Array {
    return Subspace.encode(message).finish();
  },
  toProtoMsg(message: Subspace): SubspaceProtoMsg {
    return {
      typeUrl: "/cosmos.params.v1beta1.Subspace",
      value: Subspace.encode(message).finish()
    };
  }
};
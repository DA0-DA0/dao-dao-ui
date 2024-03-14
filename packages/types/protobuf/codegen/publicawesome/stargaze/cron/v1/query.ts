//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./cron";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * QueryListPrivilegedRequest is request type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedRequest {}
export interface QueryListPrivilegedRequestProtoMsg {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedRequest";
  value: Uint8Array;
}
/**
 * QueryListPrivilegedRequest is request type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedRequestAmino {}
export interface QueryListPrivilegedRequestAminoMsg {
  type: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedRequest";
  value: QueryListPrivilegedRequestAmino;
}
/**
 * QueryListPrivilegedRequest is request type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedRequestSDKType {}
/**
 * QueryListPrivilegedResponse is response type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedResponse {
  /**
   * contract_addresses holds all the smart contract addresses which have
   * privilege status.
   */
  contractAddresses: string[];
}
export interface QueryListPrivilegedResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedResponse";
  value: Uint8Array;
}
/**
 * QueryListPrivilegedResponse is response type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedResponseAmino {
  /**
   * contract_addresses holds all the smart contract addresses which have
   * privilege status.
   */
  contract_addresses?: string[];
}
export interface QueryListPrivilegedResponseAminoMsg {
  type: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedResponse";
  value: QueryListPrivilegedResponseAmino;
}
/**
 * QueryListPrivilegedResponse is response type for the Query/ListPrivileged RPC
 * method.
 */
export interface QueryListPrivilegedResponseSDKType {
  contract_addresses: string[];
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC
 * method.
 */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsRequest";
  value: Uint8Array;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC
 * method.
 */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/publicawesome.stargaze.cron.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC
 * method.
 */
export interface QueryParamsRequestSDKType {}
/**
 * QueryParamsResponse is response type for the Query/Params RPC
 * method.
 */
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsResponse";
  value: Uint8Array;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC
 * method.
 */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/publicawesome.stargaze.cron.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC
 * method.
 */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseQueryListPrivilegedRequest(): QueryListPrivilegedRequest {
  return {};
}
export const QueryListPrivilegedRequest = {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedRequest",
  encode(_: QueryListPrivilegedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryListPrivilegedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListPrivilegedRequest();
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
  fromPartial(_: Partial<QueryListPrivilegedRequest>): QueryListPrivilegedRequest {
    const message = createBaseQueryListPrivilegedRequest();
    return message;
  },
  fromAmino(_: QueryListPrivilegedRequestAmino): QueryListPrivilegedRequest {
    const message = createBaseQueryListPrivilegedRequest();
    return message;
  },
  toAmino(_: QueryListPrivilegedRequest, useInterfaces: boolean = false): QueryListPrivilegedRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryListPrivilegedRequestAminoMsg): QueryListPrivilegedRequest {
    return QueryListPrivilegedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListPrivilegedRequestProtoMsg, useInterfaces: boolean = false): QueryListPrivilegedRequest {
    return QueryListPrivilegedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryListPrivilegedRequest): Uint8Array {
    return QueryListPrivilegedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListPrivilegedRequest): QueryListPrivilegedRequestProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedRequest",
      value: QueryListPrivilegedRequest.encode(message).finish()
    };
  }
};
function createBaseQueryListPrivilegedResponse(): QueryListPrivilegedResponse {
  return {
    contractAddresses: []
  };
}
export const QueryListPrivilegedResponse = {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedResponse",
  encode(message: QueryListPrivilegedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.contractAddresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryListPrivilegedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListPrivilegedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryListPrivilegedResponse>): QueryListPrivilegedResponse {
    const message = createBaseQueryListPrivilegedResponse();
    message.contractAddresses = object.contractAddresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryListPrivilegedResponseAmino): QueryListPrivilegedResponse {
    const message = createBaseQueryListPrivilegedResponse();
    message.contractAddresses = object.contract_addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryListPrivilegedResponse, useInterfaces: boolean = false): QueryListPrivilegedResponseAmino {
    const obj: any = {};
    if (message.contractAddresses) {
      obj.contract_addresses = message.contractAddresses.map(e => e);
    } else {
      obj.contract_addresses = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryListPrivilegedResponseAminoMsg): QueryListPrivilegedResponse {
    return QueryListPrivilegedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListPrivilegedResponseProtoMsg, useInterfaces: boolean = false): QueryListPrivilegedResponse {
    return QueryListPrivilegedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryListPrivilegedResponse): Uint8Array {
    return QueryListPrivilegedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryListPrivilegedResponse): QueryListPrivilegedResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.cron.v1.QueryListPrivilegedResponse",
      value: QueryListPrivilegedResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsRequest",
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
      typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsRequest",
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
  typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsResponse",
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
      typeUrl: "/publicawesome.stargaze.cron.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
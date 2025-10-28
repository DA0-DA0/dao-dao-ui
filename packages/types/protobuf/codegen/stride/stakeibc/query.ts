//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { HostZone, HostZoneAmino, HostZoneSDKType } from "./host_zone";
import { EpochTracker, EpochTrackerAmino, EpochTrackerSDKType } from "./epoch_tracker";
import { AddressUnbonding, AddressUnbondingAmino, AddressUnbondingSDKType } from "./address_unbonding";
import { TradeRoute, TradeRouteAmino, TradeRouteSDKType } from "./trade_route";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * QueryInterchainAccountFromAddressRequest is the request type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressRequest {
  owner: string;
  connectionId: string;
}
export interface QueryInterchainAccountFromAddressRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressRequest";
  value: Uint8Array;
}
/**
 * QueryInterchainAccountFromAddressRequest is the request type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressRequestAmino {
  owner?: string;
  connection_id?: string;
}
export interface QueryInterchainAccountFromAddressRequestAminoMsg {
  type: "/stride.stakeibc.QueryInterchainAccountFromAddressRequest";
  value: QueryInterchainAccountFromAddressRequestAmino;
}
/**
 * QueryInterchainAccountFromAddressRequest is the request type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressRequestSDKType {
  owner: string;
  connection_id: string;
}
/**
 * QueryInterchainAccountFromAddressResponse the response type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressResponse {
  interchainAccountAddress: string;
}
export interface QueryInterchainAccountFromAddressResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressResponse";
  value: Uint8Array;
}
/**
 * QueryInterchainAccountFromAddressResponse the response type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressResponseAmino {
  interchain_account_address?: string;
}
export interface QueryInterchainAccountFromAddressResponseAminoMsg {
  type: "/stride.stakeibc.QueryInterchainAccountFromAddressResponse";
  value: QueryInterchainAccountFromAddressResponseAmino;
}
/**
 * QueryInterchainAccountFromAddressResponse the response type for the
 * Query/InterchainAccountAddress RPC
 */
export interface QueryInterchainAccountFromAddressResponseSDKType {
  interchain_account_address: string;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/stride.stakeibc.QueryParamsRequest";
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
  typeUrl: "/stride.stakeibc.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/stride.stakeibc.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetValidatorsRequest {
  chainId: string;
}
export interface QueryGetValidatorsRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetValidatorsRequest";
  value: Uint8Array;
}
export interface QueryGetValidatorsRequestAmino {
  chain_id?: string;
}
export interface QueryGetValidatorsRequestAminoMsg {
  type: "/stride.stakeibc.QueryGetValidatorsRequest";
  value: QueryGetValidatorsRequestAmino;
}
export interface QueryGetValidatorsRequestSDKType {
  chain_id: string;
}
export interface QueryGetValidatorsResponse {
  validators: Validator[];
}
export interface QueryGetValidatorsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetValidatorsResponse";
  value: Uint8Array;
}
export interface QueryGetValidatorsResponseAmino {
  validators?: ValidatorAmino[];
}
export interface QueryGetValidatorsResponseAminoMsg {
  type: "/stride.stakeibc.QueryGetValidatorsResponse";
  value: QueryGetValidatorsResponseAmino;
}
export interface QueryGetValidatorsResponseSDKType {
  validators: ValidatorSDKType[];
}
export interface QueryGetHostZoneRequest {
  chainId: string;
}
export interface QueryGetHostZoneRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetHostZoneRequest";
  value: Uint8Array;
}
export interface QueryGetHostZoneRequestAmino {
  chain_id?: string;
}
export interface QueryGetHostZoneRequestAminoMsg {
  type: "/stride.stakeibc.QueryGetHostZoneRequest";
  value: QueryGetHostZoneRequestAmino;
}
export interface QueryGetHostZoneRequestSDKType {
  chain_id: string;
}
export interface QueryGetHostZoneResponse {
  hostZone: HostZone | undefined;
}
export interface QueryGetHostZoneResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetHostZoneResponse";
  value: Uint8Array;
}
export interface QueryGetHostZoneResponseAmino {
  host_zone?: HostZoneAmino | undefined;
}
export interface QueryGetHostZoneResponseAminoMsg {
  type: "/stride.stakeibc.QueryGetHostZoneResponse";
  value: QueryGetHostZoneResponseAmino;
}
export interface QueryGetHostZoneResponseSDKType {
  host_zone: HostZoneSDKType | undefined;
}
export interface QueryAllHostZoneRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllHostZoneRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllHostZoneRequest";
  value: Uint8Array;
}
export interface QueryAllHostZoneRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllHostZoneRequestAminoMsg {
  type: "/stride.stakeibc.QueryAllHostZoneRequest";
  value: QueryAllHostZoneRequestAmino;
}
export interface QueryAllHostZoneRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllHostZoneResponse {
  hostZone: HostZone[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllHostZoneResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllHostZoneResponse";
  value: Uint8Array;
}
export interface QueryAllHostZoneResponseAmino {
  host_zone?: HostZoneAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllHostZoneResponseAminoMsg {
  type: "/stride.stakeibc.QueryAllHostZoneResponse";
  value: QueryAllHostZoneResponseAmino;
}
export interface QueryAllHostZoneResponseSDKType {
  host_zone: HostZoneSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryModuleAddressRequest {
  name: string;
}
export interface QueryModuleAddressRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryModuleAddressRequest";
  value: Uint8Array;
}
export interface QueryModuleAddressRequestAmino {
  name?: string;
}
export interface QueryModuleAddressRequestAminoMsg {
  type: "/stride.stakeibc.QueryModuleAddressRequest";
  value: QueryModuleAddressRequestAmino;
}
export interface QueryModuleAddressRequestSDKType {
  name: string;
}
export interface QueryModuleAddressResponse {
  addr: string;
}
export interface QueryModuleAddressResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryModuleAddressResponse";
  value: Uint8Array;
}
export interface QueryModuleAddressResponseAmino {
  addr?: string;
}
export interface QueryModuleAddressResponseAminoMsg {
  type: "/stride.stakeibc.QueryModuleAddressResponse";
  value: QueryModuleAddressResponseAmino;
}
export interface QueryModuleAddressResponseSDKType {
  addr: string;
}
export interface QueryGetEpochTrackerRequest {
  epochIdentifier: string;
}
export interface QueryGetEpochTrackerRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetEpochTrackerRequest";
  value: Uint8Array;
}
export interface QueryGetEpochTrackerRequestAmino {
  epoch_identifier?: string;
}
export interface QueryGetEpochTrackerRequestAminoMsg {
  type: "/stride.stakeibc.QueryGetEpochTrackerRequest";
  value: QueryGetEpochTrackerRequestAmino;
}
export interface QueryGetEpochTrackerRequestSDKType {
  epoch_identifier: string;
}
export interface QueryGetEpochTrackerResponse {
  epochTracker: EpochTracker | undefined;
}
export interface QueryGetEpochTrackerResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetEpochTrackerResponse";
  value: Uint8Array;
}
export interface QueryGetEpochTrackerResponseAmino {
  epoch_tracker?: EpochTrackerAmino | undefined;
}
export interface QueryGetEpochTrackerResponseAminoMsg {
  type: "/stride.stakeibc.QueryGetEpochTrackerResponse";
  value: QueryGetEpochTrackerResponseAmino;
}
export interface QueryGetEpochTrackerResponseSDKType {
  epoch_tracker: EpochTrackerSDKType | undefined;
}
export interface QueryAllEpochTrackerRequest {}
export interface QueryAllEpochTrackerRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllEpochTrackerRequest";
  value: Uint8Array;
}
export interface QueryAllEpochTrackerRequestAmino {}
export interface QueryAllEpochTrackerRequestAminoMsg {
  type: "/stride.stakeibc.QueryAllEpochTrackerRequest";
  value: QueryAllEpochTrackerRequestAmino;
}
export interface QueryAllEpochTrackerRequestSDKType {}
export interface QueryAllEpochTrackerResponse {
  epochTracker: EpochTracker[];
}
export interface QueryAllEpochTrackerResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllEpochTrackerResponse";
  value: Uint8Array;
}
export interface QueryAllEpochTrackerResponseAmino {
  epoch_tracker?: EpochTrackerAmino[];
}
export interface QueryAllEpochTrackerResponseAminoMsg {
  type: "/stride.stakeibc.QueryAllEpochTrackerResponse";
  value: QueryAllEpochTrackerResponseAmino;
}
export interface QueryAllEpochTrackerResponseSDKType {
  epoch_tracker: EpochTrackerSDKType[];
}
export interface QueryGetNextPacketSequenceRequest {
  channelId: string;
  portId: string;
}
export interface QueryGetNextPacketSequenceRequestProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceRequest";
  value: Uint8Array;
}
export interface QueryGetNextPacketSequenceRequestAmino {
  channel_id?: string;
  port_id?: string;
}
export interface QueryGetNextPacketSequenceRequestAminoMsg {
  type: "/stride.stakeibc.QueryGetNextPacketSequenceRequest";
  value: QueryGetNextPacketSequenceRequestAmino;
}
export interface QueryGetNextPacketSequenceRequestSDKType {
  channel_id: string;
  port_id: string;
}
export interface QueryGetNextPacketSequenceResponse {
  sequence: bigint;
}
export interface QueryGetNextPacketSequenceResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceResponse";
  value: Uint8Array;
}
export interface QueryGetNextPacketSequenceResponseAmino {
  sequence?: string;
}
export interface QueryGetNextPacketSequenceResponseAminoMsg {
  type: "/stride.stakeibc.QueryGetNextPacketSequenceResponse";
  value: QueryGetNextPacketSequenceResponseAmino;
}
export interface QueryGetNextPacketSequenceResponseSDKType {
  sequence: bigint;
}
export interface QueryAddressUnbondings {
  address: string;
}
export interface QueryAddressUnbondingsProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAddressUnbondings";
  value: Uint8Array;
}
export interface QueryAddressUnbondingsAmino {
  address?: string;
}
export interface QueryAddressUnbondingsAminoMsg {
  type: "/stride.stakeibc.QueryAddressUnbondings";
  value: QueryAddressUnbondingsAmino;
}
export interface QueryAddressUnbondingsSDKType {
  address: string;
}
export interface QueryAddressUnbondingsResponse {
  addressUnbondings: AddressUnbonding[];
}
export interface QueryAddressUnbondingsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAddressUnbondingsResponse";
  value: Uint8Array;
}
export interface QueryAddressUnbondingsResponseAmino {
  address_unbondings?: AddressUnbondingAmino[];
}
export interface QueryAddressUnbondingsResponseAminoMsg {
  type: "/stride.stakeibc.QueryAddressUnbondingsResponse";
  value: QueryAddressUnbondingsResponseAmino;
}
export interface QueryAddressUnbondingsResponseSDKType {
  address_unbondings: AddressUnbondingSDKType[];
}
export interface QueryAllTradeRoutes {}
export interface QueryAllTradeRoutesProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllTradeRoutes";
  value: Uint8Array;
}
export interface QueryAllTradeRoutesAmino {}
export interface QueryAllTradeRoutesAminoMsg {
  type: "/stride.stakeibc.QueryAllTradeRoutes";
  value: QueryAllTradeRoutesAmino;
}
export interface QueryAllTradeRoutesSDKType {}
export interface QueryAllTradeRoutesResponse {
  tradeRoutes: TradeRoute[];
}
export interface QueryAllTradeRoutesResponseProtoMsg {
  typeUrl: "/stride.stakeibc.QueryAllTradeRoutesResponse";
  value: Uint8Array;
}
export interface QueryAllTradeRoutesResponseAmino {
  trade_routes?: TradeRouteAmino[];
}
export interface QueryAllTradeRoutesResponseAminoMsg {
  type: "/stride.stakeibc.QueryAllTradeRoutesResponse";
  value: QueryAllTradeRoutesResponseAmino;
}
export interface QueryAllTradeRoutesResponseSDKType {
  trade_routes: TradeRouteSDKType[];
}
function createBaseQueryInterchainAccountFromAddressRequest(): QueryInterchainAccountFromAddressRequest {
  return {
    owner: "",
    connectionId: ""
  };
}
export const QueryInterchainAccountFromAddressRequest = {
  typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressRequest",
  encode(message: QueryInterchainAccountFromAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryInterchainAccountFromAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountFromAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryInterchainAccountFromAddressRequest>): QueryInterchainAccountFromAddressRequest {
    const message = createBaseQueryInterchainAccountFromAddressRequest();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    return message;
  },
  fromAmino(object: QueryInterchainAccountFromAddressRequestAmino): QueryInterchainAccountFromAddressRequest {
    const message = createBaseQueryInterchainAccountFromAddressRequest();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    return message;
  },
  toAmino(message: QueryInterchainAccountFromAddressRequest, useInterfaces: boolean = false): QueryInterchainAccountFromAddressRequestAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    return obj;
  },
  fromAminoMsg(object: QueryInterchainAccountFromAddressRequestAminoMsg): QueryInterchainAccountFromAddressRequest {
    return QueryInterchainAccountFromAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryInterchainAccountFromAddressRequestProtoMsg, useInterfaces: boolean = false): QueryInterchainAccountFromAddressRequest {
    return QueryInterchainAccountFromAddressRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryInterchainAccountFromAddressRequest): Uint8Array {
    return QueryInterchainAccountFromAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryInterchainAccountFromAddressRequest): QueryInterchainAccountFromAddressRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressRequest",
      value: QueryInterchainAccountFromAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryInterchainAccountFromAddressResponse(): QueryInterchainAccountFromAddressResponse {
  return {
    interchainAccountAddress: ""
  };
}
export const QueryInterchainAccountFromAddressResponse = {
  typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressResponse",
  encode(message: QueryInterchainAccountFromAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interchainAccountAddress !== "") {
      writer.uint32(10).string(message.interchainAccountAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryInterchainAccountFromAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountFromAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainAccountAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryInterchainAccountFromAddressResponse>): QueryInterchainAccountFromAddressResponse {
    const message = createBaseQueryInterchainAccountFromAddressResponse();
    message.interchainAccountAddress = object.interchainAccountAddress ?? "";
    return message;
  },
  fromAmino(object: QueryInterchainAccountFromAddressResponseAmino): QueryInterchainAccountFromAddressResponse {
    const message = createBaseQueryInterchainAccountFromAddressResponse();
    if (object.interchain_account_address !== undefined && object.interchain_account_address !== null) {
      message.interchainAccountAddress = object.interchain_account_address;
    }
    return message;
  },
  toAmino(message: QueryInterchainAccountFromAddressResponse, useInterfaces: boolean = false): QueryInterchainAccountFromAddressResponseAmino {
    const obj: any = {};
    obj.interchain_account_address = message.interchainAccountAddress === "" ? undefined : message.interchainAccountAddress;
    return obj;
  },
  fromAminoMsg(object: QueryInterchainAccountFromAddressResponseAminoMsg): QueryInterchainAccountFromAddressResponse {
    return QueryInterchainAccountFromAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryInterchainAccountFromAddressResponseProtoMsg, useInterfaces: boolean = false): QueryInterchainAccountFromAddressResponse {
    return QueryInterchainAccountFromAddressResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryInterchainAccountFromAddressResponse): Uint8Array {
    return QueryInterchainAccountFromAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryInterchainAccountFromAddressResponse): QueryInterchainAccountFromAddressResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryInterchainAccountFromAddressResponse",
      value: QueryInterchainAccountFromAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/stride.stakeibc.QueryParamsRequest",
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
      typeUrl: "/stride.stakeibc.QueryParamsRequest",
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
  typeUrl: "/stride.stakeibc.QueryParamsResponse",
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
      typeUrl: "/stride.stakeibc.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetValidatorsRequest(): QueryGetValidatorsRequest {
  return {
    chainId: ""
  };
}
export const QueryGetValidatorsRequest = {
  typeUrl: "/stride.stakeibc.QueryGetValidatorsRequest",
  encode(message: QueryGetValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetValidatorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetValidatorsRequest>): QueryGetValidatorsRequest {
    const message = createBaseQueryGetValidatorsRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryGetValidatorsRequestAmino): QueryGetValidatorsRequest {
    const message = createBaseQueryGetValidatorsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryGetValidatorsRequest, useInterfaces: boolean = false): QueryGetValidatorsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryGetValidatorsRequestAminoMsg): QueryGetValidatorsRequest {
    return QueryGetValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryGetValidatorsRequest {
    return QueryGetValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetValidatorsRequest): Uint8Array {
    return QueryGetValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetValidatorsRequest): QueryGetValidatorsRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetValidatorsRequest",
      value: QueryGetValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetValidatorsResponse(): QueryGetValidatorsResponse {
  return {
    validators: []
  };
}
export const QueryGetValidatorsResponse = {
  typeUrl: "/stride.stakeibc.QueryGetValidatorsResponse",
  encode(message: QueryGetValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetValidatorsResponse>): QueryGetValidatorsResponse {
    const message = createBaseQueryGetValidatorsResponse();
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetValidatorsResponseAmino): QueryGetValidatorsResponse {
    const message = createBaseQueryGetValidatorsResponse();
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetValidatorsResponse, useInterfaces: boolean = false): QueryGetValidatorsResponseAmino {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetValidatorsResponseAminoMsg): QueryGetValidatorsResponse {
    return QueryGetValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryGetValidatorsResponse {
    return QueryGetValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetValidatorsResponse): Uint8Array {
    return QueryGetValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetValidatorsResponse): QueryGetValidatorsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetValidatorsResponse",
      value: QueryGetValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostZoneRequest(): QueryGetHostZoneRequest {
  return {
    chainId: ""
  };
}
export const QueryGetHostZoneRequest = {
  typeUrl: "/stride.stakeibc.QueryGetHostZoneRequest",
  encode(message: QueryGetHostZoneRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostZoneRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostZoneRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostZoneRequest>): QueryGetHostZoneRequest {
    const message = createBaseQueryGetHostZoneRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryGetHostZoneRequestAmino): QueryGetHostZoneRequest {
    const message = createBaseQueryGetHostZoneRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryGetHostZoneRequest, useInterfaces: boolean = false): QueryGetHostZoneRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostZoneRequestAminoMsg): QueryGetHostZoneRequest {
    return QueryGetHostZoneRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostZoneRequestProtoMsg, useInterfaces: boolean = false): QueryGetHostZoneRequest {
    return QueryGetHostZoneRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostZoneRequest): Uint8Array {
    return QueryGetHostZoneRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostZoneRequest): QueryGetHostZoneRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetHostZoneRequest",
      value: QueryGetHostZoneRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostZoneResponse(): QueryGetHostZoneResponse {
  return {
    hostZone: HostZone.fromPartial({})
  };
}
export const QueryGetHostZoneResponse = {
  typeUrl: "/stride.stakeibc.QueryGetHostZoneResponse",
  encode(message: QueryGetHostZoneResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostZone !== undefined) {
      HostZone.encode(message.hostZone, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostZoneResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostZoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZone = HostZone.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostZoneResponse>): QueryGetHostZoneResponse {
    const message = createBaseQueryGetHostZoneResponse();
    message.hostZone = object.hostZone !== undefined && object.hostZone !== null ? HostZone.fromPartial(object.hostZone) : undefined;
    return message;
  },
  fromAmino(object: QueryGetHostZoneResponseAmino): QueryGetHostZoneResponse {
    const message = createBaseQueryGetHostZoneResponse();
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = HostZone.fromAmino(object.host_zone);
    }
    return message;
  },
  toAmino(message: QueryGetHostZoneResponse, useInterfaces: boolean = false): QueryGetHostZoneResponseAmino {
    const obj: any = {};
    obj.host_zone = message.hostZone ? HostZone.toAmino(message.hostZone, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostZoneResponseAminoMsg): QueryGetHostZoneResponse {
    return QueryGetHostZoneResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostZoneResponseProtoMsg, useInterfaces: boolean = false): QueryGetHostZoneResponse {
    return QueryGetHostZoneResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostZoneResponse): Uint8Array {
    return QueryGetHostZoneResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostZoneResponse): QueryGetHostZoneResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetHostZoneResponse",
      value: QueryGetHostZoneResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostZoneRequest(): QueryAllHostZoneRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllHostZoneRequest = {
  typeUrl: "/stride.stakeibc.QueryAllHostZoneRequest",
  encode(message: QueryAllHostZoneRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostZoneRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostZoneRequest();
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
  fromPartial(object: Partial<QueryAllHostZoneRequest>): QueryAllHostZoneRequest {
    const message = createBaseQueryAllHostZoneRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostZoneRequestAmino): QueryAllHostZoneRequest {
    const message = createBaseQueryAllHostZoneRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostZoneRequest, useInterfaces: boolean = false): QueryAllHostZoneRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostZoneRequestAminoMsg): QueryAllHostZoneRequest {
    return QueryAllHostZoneRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostZoneRequestProtoMsg, useInterfaces: boolean = false): QueryAllHostZoneRequest {
    return QueryAllHostZoneRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostZoneRequest): Uint8Array {
    return QueryAllHostZoneRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostZoneRequest): QueryAllHostZoneRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllHostZoneRequest",
      value: QueryAllHostZoneRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostZoneResponse(): QueryAllHostZoneResponse {
  return {
    hostZone: [],
    pagination: undefined
  };
}
export const QueryAllHostZoneResponse = {
  typeUrl: "/stride.stakeibc.QueryAllHostZoneResponse",
  encode(message: QueryAllHostZoneResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostZone) {
      HostZone.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostZoneResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostZoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZone.push(HostZone.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllHostZoneResponse>): QueryAllHostZoneResponse {
    const message = createBaseQueryAllHostZoneResponse();
    message.hostZone = object.hostZone?.map(e => HostZone.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostZoneResponseAmino): QueryAllHostZoneResponse {
    const message = createBaseQueryAllHostZoneResponse();
    message.hostZone = object.host_zone?.map(e => HostZone.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostZoneResponse, useInterfaces: boolean = false): QueryAllHostZoneResponseAmino {
    const obj: any = {};
    if (message.hostZone) {
      obj.host_zone = message.hostZone.map(e => e ? HostZone.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_zone = message.hostZone;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostZoneResponseAminoMsg): QueryAllHostZoneResponse {
    return QueryAllHostZoneResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostZoneResponseProtoMsg, useInterfaces: boolean = false): QueryAllHostZoneResponse {
    return QueryAllHostZoneResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostZoneResponse): Uint8Array {
    return QueryAllHostZoneResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostZoneResponse): QueryAllHostZoneResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllHostZoneResponse",
      value: QueryAllHostZoneResponse.encode(message).finish()
    };
  }
};
function createBaseQueryModuleAddressRequest(): QueryModuleAddressRequest {
  return {
    name: ""
  };
}
export const QueryModuleAddressRequest = {
  typeUrl: "/stride.stakeibc.QueryModuleAddressRequest",
  encode(message: QueryModuleAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryModuleAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryModuleAddressRequest>): QueryModuleAddressRequest {
    const message = createBaseQueryModuleAddressRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryModuleAddressRequestAmino): QueryModuleAddressRequest {
    const message = createBaseQueryModuleAddressRequest();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: QueryModuleAddressRequest, useInterfaces: boolean = false): QueryModuleAddressRequestAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: QueryModuleAddressRequestAminoMsg): QueryModuleAddressRequest {
    return QueryModuleAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryModuleAddressRequestProtoMsg, useInterfaces: boolean = false): QueryModuleAddressRequest {
    return QueryModuleAddressRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryModuleAddressRequest): Uint8Array {
    return QueryModuleAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAddressRequest): QueryModuleAddressRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryModuleAddressRequest",
      value: QueryModuleAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryModuleAddressResponse(): QueryModuleAddressResponse {
  return {
    addr: ""
  };
}
export const QueryModuleAddressResponse = {
  typeUrl: "/stride.stakeibc.QueryModuleAddressResponse",
  encode(message: QueryModuleAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addr !== "") {
      writer.uint32(10).string(message.addr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryModuleAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryModuleAddressResponse>): QueryModuleAddressResponse {
    const message = createBaseQueryModuleAddressResponse();
    message.addr = object.addr ?? "";
    return message;
  },
  fromAmino(object: QueryModuleAddressResponseAmino): QueryModuleAddressResponse {
    const message = createBaseQueryModuleAddressResponse();
    if (object.addr !== undefined && object.addr !== null) {
      message.addr = object.addr;
    }
    return message;
  },
  toAmino(message: QueryModuleAddressResponse, useInterfaces: boolean = false): QueryModuleAddressResponseAmino {
    const obj: any = {};
    obj.addr = message.addr === "" ? undefined : message.addr;
    return obj;
  },
  fromAminoMsg(object: QueryModuleAddressResponseAminoMsg): QueryModuleAddressResponse {
    return QueryModuleAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryModuleAddressResponseProtoMsg, useInterfaces: boolean = false): QueryModuleAddressResponse {
    return QueryModuleAddressResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryModuleAddressResponse): Uint8Array {
    return QueryModuleAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAddressResponse): QueryModuleAddressResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryModuleAddressResponse",
      value: QueryModuleAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetEpochTrackerRequest(): QueryGetEpochTrackerRequest {
  return {
    epochIdentifier: ""
  };
}
export const QueryGetEpochTrackerRequest = {
  typeUrl: "/stride.stakeibc.QueryGetEpochTrackerRequest",
  encode(message: QueryGetEpochTrackerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochIdentifier !== "") {
      writer.uint32(10).string(message.epochIdentifier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetEpochTrackerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetEpochTrackerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochIdentifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetEpochTrackerRequest>): QueryGetEpochTrackerRequest {
    const message = createBaseQueryGetEpochTrackerRequest();
    message.epochIdentifier = object.epochIdentifier ?? "";
    return message;
  },
  fromAmino(object: QueryGetEpochTrackerRequestAmino): QueryGetEpochTrackerRequest {
    const message = createBaseQueryGetEpochTrackerRequest();
    if (object.epoch_identifier !== undefined && object.epoch_identifier !== null) {
      message.epochIdentifier = object.epoch_identifier;
    }
    return message;
  },
  toAmino(message: QueryGetEpochTrackerRequest, useInterfaces: boolean = false): QueryGetEpochTrackerRequestAmino {
    const obj: any = {};
    obj.epoch_identifier = message.epochIdentifier === "" ? undefined : message.epochIdentifier;
    return obj;
  },
  fromAminoMsg(object: QueryGetEpochTrackerRequestAminoMsg): QueryGetEpochTrackerRequest {
    return QueryGetEpochTrackerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetEpochTrackerRequestProtoMsg, useInterfaces: boolean = false): QueryGetEpochTrackerRequest {
    return QueryGetEpochTrackerRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetEpochTrackerRequest): Uint8Array {
    return QueryGetEpochTrackerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetEpochTrackerRequest): QueryGetEpochTrackerRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetEpochTrackerRequest",
      value: QueryGetEpochTrackerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetEpochTrackerResponse(): QueryGetEpochTrackerResponse {
  return {
    epochTracker: EpochTracker.fromPartial({})
  };
}
export const QueryGetEpochTrackerResponse = {
  typeUrl: "/stride.stakeibc.QueryGetEpochTrackerResponse",
  encode(message: QueryGetEpochTrackerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochTracker !== undefined) {
      EpochTracker.encode(message.epochTracker, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetEpochTrackerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetEpochTrackerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochTracker = EpochTracker.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetEpochTrackerResponse>): QueryGetEpochTrackerResponse {
    const message = createBaseQueryGetEpochTrackerResponse();
    message.epochTracker = object.epochTracker !== undefined && object.epochTracker !== null ? EpochTracker.fromPartial(object.epochTracker) : undefined;
    return message;
  },
  fromAmino(object: QueryGetEpochTrackerResponseAmino): QueryGetEpochTrackerResponse {
    const message = createBaseQueryGetEpochTrackerResponse();
    if (object.epoch_tracker !== undefined && object.epoch_tracker !== null) {
      message.epochTracker = EpochTracker.fromAmino(object.epoch_tracker);
    }
    return message;
  },
  toAmino(message: QueryGetEpochTrackerResponse, useInterfaces: boolean = false): QueryGetEpochTrackerResponseAmino {
    const obj: any = {};
    obj.epoch_tracker = message.epochTracker ? EpochTracker.toAmino(message.epochTracker, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetEpochTrackerResponseAminoMsg): QueryGetEpochTrackerResponse {
    return QueryGetEpochTrackerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetEpochTrackerResponseProtoMsg, useInterfaces: boolean = false): QueryGetEpochTrackerResponse {
    return QueryGetEpochTrackerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetEpochTrackerResponse): Uint8Array {
    return QueryGetEpochTrackerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetEpochTrackerResponse): QueryGetEpochTrackerResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetEpochTrackerResponse",
      value: QueryGetEpochTrackerResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllEpochTrackerRequest(): QueryAllEpochTrackerRequest {
  return {};
}
export const QueryAllEpochTrackerRequest = {
  typeUrl: "/stride.stakeibc.QueryAllEpochTrackerRequest",
  encode(_: QueryAllEpochTrackerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllEpochTrackerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllEpochTrackerRequest();
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
  fromPartial(_: Partial<QueryAllEpochTrackerRequest>): QueryAllEpochTrackerRequest {
    const message = createBaseQueryAllEpochTrackerRequest();
    return message;
  },
  fromAmino(_: QueryAllEpochTrackerRequestAmino): QueryAllEpochTrackerRequest {
    const message = createBaseQueryAllEpochTrackerRequest();
    return message;
  },
  toAmino(_: QueryAllEpochTrackerRequest, useInterfaces: boolean = false): QueryAllEpochTrackerRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllEpochTrackerRequestAminoMsg): QueryAllEpochTrackerRequest {
    return QueryAllEpochTrackerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllEpochTrackerRequestProtoMsg, useInterfaces: boolean = false): QueryAllEpochTrackerRequest {
    return QueryAllEpochTrackerRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllEpochTrackerRequest): Uint8Array {
    return QueryAllEpochTrackerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllEpochTrackerRequest): QueryAllEpochTrackerRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllEpochTrackerRequest",
      value: QueryAllEpochTrackerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllEpochTrackerResponse(): QueryAllEpochTrackerResponse {
  return {
    epochTracker: []
  };
}
export const QueryAllEpochTrackerResponse = {
  typeUrl: "/stride.stakeibc.QueryAllEpochTrackerResponse",
  encode(message: QueryAllEpochTrackerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.epochTracker) {
      EpochTracker.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllEpochTrackerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllEpochTrackerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochTracker.push(EpochTracker.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllEpochTrackerResponse>): QueryAllEpochTrackerResponse {
    const message = createBaseQueryAllEpochTrackerResponse();
    message.epochTracker = object.epochTracker?.map(e => EpochTracker.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllEpochTrackerResponseAmino): QueryAllEpochTrackerResponse {
    const message = createBaseQueryAllEpochTrackerResponse();
    message.epochTracker = object.epoch_tracker?.map(e => EpochTracker.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllEpochTrackerResponse, useInterfaces: boolean = false): QueryAllEpochTrackerResponseAmino {
    const obj: any = {};
    if (message.epochTracker) {
      obj.epoch_tracker = message.epochTracker.map(e => e ? EpochTracker.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.epoch_tracker = message.epochTracker;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllEpochTrackerResponseAminoMsg): QueryAllEpochTrackerResponse {
    return QueryAllEpochTrackerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllEpochTrackerResponseProtoMsg, useInterfaces: boolean = false): QueryAllEpochTrackerResponse {
    return QueryAllEpochTrackerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllEpochTrackerResponse): Uint8Array {
    return QueryAllEpochTrackerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllEpochTrackerResponse): QueryAllEpochTrackerResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllEpochTrackerResponse",
      value: QueryAllEpochTrackerResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetNextPacketSequenceRequest(): QueryGetNextPacketSequenceRequest {
  return {
    channelId: "",
    portId: ""
  };
}
export const QueryGetNextPacketSequenceRequest = {
  typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceRequest",
  encode(message: QueryGetNextPacketSequenceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetNextPacketSequenceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNextPacketSequenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.portId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetNextPacketSequenceRequest>): QueryGetNextPacketSequenceRequest {
    const message = createBaseQueryGetNextPacketSequenceRequest();
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    return message;
  },
  fromAmino(object: QueryGetNextPacketSequenceRequestAmino): QueryGetNextPacketSequenceRequest {
    const message = createBaseQueryGetNextPacketSequenceRequest();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    return message;
  },
  toAmino(message: QueryGetNextPacketSequenceRequest, useInterfaces: boolean = false): QueryGetNextPacketSequenceRequestAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.port_id = message.portId === "" ? undefined : message.portId;
    return obj;
  },
  fromAminoMsg(object: QueryGetNextPacketSequenceRequestAminoMsg): QueryGetNextPacketSequenceRequest {
    return QueryGetNextPacketSequenceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetNextPacketSequenceRequestProtoMsg, useInterfaces: boolean = false): QueryGetNextPacketSequenceRequest {
    return QueryGetNextPacketSequenceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetNextPacketSequenceRequest): Uint8Array {
    return QueryGetNextPacketSequenceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetNextPacketSequenceRequest): QueryGetNextPacketSequenceRequestProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceRequest",
      value: QueryGetNextPacketSequenceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetNextPacketSequenceResponse(): QueryGetNextPacketSequenceResponse {
  return {
    sequence: BigInt(0)
  };
}
export const QueryGetNextPacketSequenceResponse = {
  typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceResponse",
  encode(message: QueryGetNextPacketSequenceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sequence !== BigInt(0)) {
      writer.uint32(8).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetNextPacketSequenceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNextPacketSequenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetNextPacketSequenceResponse>): QueryGetNextPacketSequenceResponse {
    const message = createBaseQueryGetNextPacketSequenceResponse();
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetNextPacketSequenceResponseAmino): QueryGetNextPacketSequenceResponse {
    const message = createBaseQueryGetNextPacketSequenceResponse();
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: QueryGetNextPacketSequenceResponse, useInterfaces: boolean = false): QueryGetNextPacketSequenceResponseAmino {
    const obj: any = {};
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetNextPacketSequenceResponseAminoMsg): QueryGetNextPacketSequenceResponse {
    return QueryGetNextPacketSequenceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetNextPacketSequenceResponseProtoMsg, useInterfaces: boolean = false): QueryGetNextPacketSequenceResponse {
    return QueryGetNextPacketSequenceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetNextPacketSequenceResponse): Uint8Array {
    return QueryGetNextPacketSequenceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetNextPacketSequenceResponse): QueryGetNextPacketSequenceResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryGetNextPacketSequenceResponse",
      value: QueryGetNextPacketSequenceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAddressUnbondings(): QueryAddressUnbondings {
  return {
    address: ""
  };
}
export const QueryAddressUnbondings = {
  typeUrl: "/stride.stakeibc.QueryAddressUnbondings",
  encode(message: QueryAddressUnbondings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAddressUnbondings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressUnbondings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAddressUnbondings>): QueryAddressUnbondings {
    const message = createBaseQueryAddressUnbondings();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAddressUnbondingsAmino): QueryAddressUnbondings {
    const message = createBaseQueryAddressUnbondings();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryAddressUnbondings, useInterfaces: boolean = false): QueryAddressUnbondingsAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryAddressUnbondingsAminoMsg): QueryAddressUnbondings {
    return QueryAddressUnbondings.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAddressUnbondingsProtoMsg, useInterfaces: boolean = false): QueryAddressUnbondings {
    return QueryAddressUnbondings.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAddressUnbondings): Uint8Array {
    return QueryAddressUnbondings.encode(message).finish();
  },
  toProtoMsg(message: QueryAddressUnbondings): QueryAddressUnbondingsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAddressUnbondings",
      value: QueryAddressUnbondings.encode(message).finish()
    };
  }
};
function createBaseQueryAddressUnbondingsResponse(): QueryAddressUnbondingsResponse {
  return {
    addressUnbondings: []
  };
}
export const QueryAddressUnbondingsResponse = {
  typeUrl: "/stride.stakeibc.QueryAddressUnbondingsResponse",
  encode(message: QueryAddressUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.addressUnbondings) {
      AddressUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAddressUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressUnbondings.push(AddressUnbonding.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAddressUnbondingsResponse>): QueryAddressUnbondingsResponse {
    const message = createBaseQueryAddressUnbondingsResponse();
    message.addressUnbondings = object.addressUnbondings?.map(e => AddressUnbonding.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAddressUnbondingsResponseAmino): QueryAddressUnbondingsResponse {
    const message = createBaseQueryAddressUnbondingsResponse();
    message.addressUnbondings = object.address_unbondings?.map(e => AddressUnbonding.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAddressUnbondingsResponse, useInterfaces: boolean = false): QueryAddressUnbondingsResponseAmino {
    const obj: any = {};
    if (message.addressUnbondings) {
      obj.address_unbondings = message.addressUnbondings.map(e => e ? AddressUnbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.address_unbondings = message.addressUnbondings;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAddressUnbondingsResponseAminoMsg): QueryAddressUnbondingsResponse {
    return QueryAddressUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAddressUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryAddressUnbondingsResponse {
    return QueryAddressUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAddressUnbondingsResponse): Uint8Array {
    return QueryAddressUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAddressUnbondingsResponse): QueryAddressUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAddressUnbondingsResponse",
      value: QueryAddressUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllTradeRoutes(): QueryAllTradeRoutes {
  return {};
}
export const QueryAllTradeRoutes = {
  typeUrl: "/stride.stakeibc.QueryAllTradeRoutes",
  encode(_: QueryAllTradeRoutes, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllTradeRoutes {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTradeRoutes();
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
  fromPartial(_: Partial<QueryAllTradeRoutes>): QueryAllTradeRoutes {
    const message = createBaseQueryAllTradeRoutes();
    return message;
  },
  fromAmino(_: QueryAllTradeRoutesAmino): QueryAllTradeRoutes {
    const message = createBaseQueryAllTradeRoutes();
    return message;
  },
  toAmino(_: QueryAllTradeRoutes, useInterfaces: boolean = false): QueryAllTradeRoutesAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllTradeRoutesAminoMsg): QueryAllTradeRoutes {
    return QueryAllTradeRoutes.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllTradeRoutesProtoMsg, useInterfaces: boolean = false): QueryAllTradeRoutes {
    return QueryAllTradeRoutes.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllTradeRoutes): Uint8Array {
    return QueryAllTradeRoutes.encode(message).finish();
  },
  toProtoMsg(message: QueryAllTradeRoutes): QueryAllTradeRoutesProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllTradeRoutes",
      value: QueryAllTradeRoutes.encode(message).finish()
    };
  }
};
function createBaseQueryAllTradeRoutesResponse(): QueryAllTradeRoutesResponse {
  return {
    tradeRoutes: []
  };
}
export const QueryAllTradeRoutesResponse = {
  typeUrl: "/stride.stakeibc.QueryAllTradeRoutesResponse",
  encode(message: QueryAllTradeRoutesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tradeRoutes) {
      TradeRoute.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllTradeRoutesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTradeRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradeRoutes.push(TradeRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllTradeRoutesResponse>): QueryAllTradeRoutesResponse {
    const message = createBaseQueryAllTradeRoutesResponse();
    message.tradeRoutes = object.tradeRoutes?.map(e => TradeRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllTradeRoutesResponseAmino): QueryAllTradeRoutesResponse {
    const message = createBaseQueryAllTradeRoutesResponse();
    message.tradeRoutes = object.trade_routes?.map(e => TradeRoute.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllTradeRoutesResponse, useInterfaces: boolean = false): QueryAllTradeRoutesResponseAmino {
    const obj: any = {};
    if (message.tradeRoutes) {
      obj.trade_routes = message.tradeRoutes.map(e => e ? TradeRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.trade_routes = message.tradeRoutes;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllTradeRoutesResponseAminoMsg): QueryAllTradeRoutesResponse {
    return QueryAllTradeRoutesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllTradeRoutesResponseProtoMsg, useInterfaces: boolean = false): QueryAllTradeRoutesResponse {
    return QueryAllTradeRoutesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllTradeRoutesResponse): Uint8Array {
    return QueryAllTradeRoutesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllTradeRoutesResponse): QueryAllTradeRoutesResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.QueryAllTradeRoutesResponse",
      value: QueryAllTradeRoutesResponse.encode(message).finish()
    };
  }
};
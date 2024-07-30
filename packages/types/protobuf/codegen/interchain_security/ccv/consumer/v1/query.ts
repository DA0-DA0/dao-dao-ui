//@ts-nocheck
import { ConsumerParams, ConsumerParamsAmino, ConsumerParamsSDKType } from "../../v1/shared_consumer";
import { SlashRecord, SlashRecordAmino, SlashRecordSDKType } from "./consumer";
import { ConsumerPacketData, ConsumerPacketDataAmino, ConsumerPacketDataSDKType } from "../../v1/wire";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** NextFeeDistributionEstimate holds information about next fee distribution */
export interface NextFeeDistributionEstimate {
  /** current block height at the time of querying */
  currentHeight: bigint;
  /** block height at which last distribution took place */
  lastHeight: bigint;
  /** block height at which next distribution will take place */
  nextHeight: bigint;
  /** ratio between consumer and provider fee distribution */
  distributionFraction: string;
  /** total accruead fees at the time of querying */
  total: string;
  /** amount distributed to provider chain */
  toProvider: string;
  /** amount distributed (kept) by consumer chain */
  toConsumer: string;
}
export interface NextFeeDistributionEstimateProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate";
  value: Uint8Array;
}
/** NextFeeDistributionEstimate holds information about next fee distribution */
export interface NextFeeDistributionEstimateAmino {
  /** current block height at the time of querying */
  currentHeight?: string;
  /** block height at which last distribution took place */
  lastHeight?: string;
  /** block height at which next distribution will take place */
  nextHeight?: string;
  /** ratio between consumer and provider fee distribution */
  distribution_fraction?: string;
  /** total accruead fees at the time of querying */
  total?: string;
  /** amount distributed to provider chain */
  toProvider?: string;
  /** amount distributed (kept) by consumer chain */
  toConsumer?: string;
}
export interface NextFeeDistributionEstimateAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate";
  value: NextFeeDistributionEstimateAmino;
}
/** NextFeeDistributionEstimate holds information about next fee distribution */
export interface NextFeeDistributionEstimateSDKType {
  currentHeight: bigint;
  lastHeight: bigint;
  nextHeight: bigint;
  distribution_fraction: string;
  total: string;
  toProvider: string;
  toConsumer: string;
}
export interface QueryNextFeeDistributionEstimateRequest {}
export interface QueryNextFeeDistributionEstimateRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest";
  value: Uint8Array;
}
export interface QueryNextFeeDistributionEstimateRequestAmino {}
export interface QueryNextFeeDistributionEstimateRequestAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest";
  value: QueryNextFeeDistributionEstimateRequestAmino;
}
export interface QueryNextFeeDistributionEstimateRequestSDKType {}
export interface QueryNextFeeDistributionEstimateResponse {
  data?: NextFeeDistributionEstimate | undefined;
}
export interface QueryNextFeeDistributionEstimateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse";
  value: Uint8Array;
}
export interface QueryNextFeeDistributionEstimateResponseAmino {
  data?: NextFeeDistributionEstimateAmino | undefined;
}
export interface QueryNextFeeDistributionEstimateResponseAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse";
  value: QueryNextFeeDistributionEstimateResponseAmino;
}
export interface QueryNextFeeDistributionEstimateResponseSDKType {
  data?: NextFeeDistributionEstimateSDKType | undefined;
}
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: ConsumerParams | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ConsumerParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ConsumerParamsSDKType | undefined;
}
export interface QueryProviderInfoRequest {}
export interface QueryProviderInfoRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest";
  value: Uint8Array;
}
export interface QueryProviderInfoRequestAmino {}
export interface QueryProviderInfoRequestAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest";
  value: QueryProviderInfoRequestAmino;
}
export interface QueryProviderInfoRequestSDKType {}
export interface QueryProviderInfoResponse {
  consumer: ChainInfo | undefined;
  provider: ChainInfo | undefined;
}
export interface QueryProviderInfoResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse";
  value: Uint8Array;
}
export interface QueryProviderInfoResponseAmino {
  consumer?: ChainInfoAmino | undefined;
  provider?: ChainInfoAmino | undefined;
}
export interface QueryProviderInfoResponseAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse";
  value: QueryProviderInfoResponseAmino;
}
export interface QueryProviderInfoResponseSDKType {
  consumer: ChainInfoSDKType | undefined;
  provider: ChainInfoSDKType | undefined;
}
export interface QueryThrottleStateRequest {}
export interface QueryThrottleStateRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateRequest";
  value: Uint8Array;
}
export interface QueryThrottleStateRequestAmino {}
export interface QueryThrottleStateRequestAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryThrottleStateRequest";
  value: QueryThrottleStateRequestAmino;
}
export interface QueryThrottleStateRequestSDKType {}
export interface QueryThrottleStateResponse {
  slashRecord?: SlashRecord | undefined;
  packetDataQueue: ConsumerPacketData[];
}
export interface QueryThrottleStateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateResponse";
  value: Uint8Array;
}
export interface QueryThrottleStateResponseAmino {
  slash_record?: SlashRecordAmino | undefined;
  packet_data_queue?: ConsumerPacketDataAmino[];
}
export interface QueryThrottleStateResponseAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.QueryThrottleStateResponse";
  value: QueryThrottleStateResponseAmino;
}
export interface QueryThrottleStateResponseSDKType {
  slash_record?: SlashRecordSDKType | undefined;
  packet_data_queue: ConsumerPacketDataSDKType[];
}
export interface ChainInfo {
  chainID: string;
  clientID: string;
  connectionID: string;
  channelID: string;
}
export interface ChainInfoProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.ChainInfo";
  value: Uint8Array;
}
export interface ChainInfoAmino {
  chainID?: string;
  clientID?: string;
  connectionID?: string;
  channelID?: string;
}
export interface ChainInfoAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.ChainInfo";
  value: ChainInfoAmino;
}
export interface ChainInfoSDKType {
  chainID: string;
  clientID: string;
  connectionID: string;
  channelID: string;
}
function createBaseNextFeeDistributionEstimate(): NextFeeDistributionEstimate {
  return {
    currentHeight: BigInt(0),
    lastHeight: BigInt(0),
    nextHeight: BigInt(0),
    distributionFraction: "",
    total: "",
    toProvider: "",
    toConsumer: ""
  };
}
export const NextFeeDistributionEstimate = {
  typeUrl: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate",
  encode(message: NextFeeDistributionEstimate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currentHeight !== BigInt(0)) {
      writer.uint32(8).int64(message.currentHeight);
    }
    if (message.lastHeight !== BigInt(0)) {
      writer.uint32(16).int64(message.lastHeight);
    }
    if (message.nextHeight !== BigInt(0)) {
      writer.uint32(24).int64(message.nextHeight);
    }
    if (message.distributionFraction !== "") {
      writer.uint32(34).string(message.distributionFraction);
    }
    if (message.total !== "") {
      writer.uint32(42).string(message.total);
    }
    if (message.toProvider !== "") {
      writer.uint32(50).string(message.toProvider);
    }
    if (message.toConsumer !== "") {
      writer.uint32(58).string(message.toConsumer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NextFeeDistributionEstimate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextFeeDistributionEstimate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentHeight = reader.int64();
          break;
        case 2:
          message.lastHeight = reader.int64();
          break;
        case 3:
          message.nextHeight = reader.int64();
          break;
        case 4:
          message.distributionFraction = reader.string();
          break;
        case 5:
          message.total = reader.string();
          break;
        case 6:
          message.toProvider = reader.string();
          break;
        case 7:
          message.toConsumer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NextFeeDistributionEstimate>): NextFeeDistributionEstimate {
    const message = createBaseNextFeeDistributionEstimate();
    message.currentHeight = object.currentHeight !== undefined && object.currentHeight !== null ? BigInt(object.currentHeight.toString()) : BigInt(0);
    message.lastHeight = object.lastHeight !== undefined && object.lastHeight !== null ? BigInt(object.lastHeight.toString()) : BigInt(0);
    message.nextHeight = object.nextHeight !== undefined && object.nextHeight !== null ? BigInt(object.nextHeight.toString()) : BigInt(0);
    message.distributionFraction = object.distributionFraction ?? "";
    message.total = object.total ?? "";
    message.toProvider = object.toProvider ?? "";
    message.toConsumer = object.toConsumer ?? "";
    return message;
  },
  fromAmino(object: NextFeeDistributionEstimateAmino): NextFeeDistributionEstimate {
    const message = createBaseNextFeeDistributionEstimate();
    if (object.currentHeight !== undefined && object.currentHeight !== null) {
      message.currentHeight = BigInt(object.currentHeight);
    }
    if (object.lastHeight !== undefined && object.lastHeight !== null) {
      message.lastHeight = BigInt(object.lastHeight);
    }
    if (object.nextHeight !== undefined && object.nextHeight !== null) {
      message.nextHeight = BigInt(object.nextHeight);
    }
    if (object.distribution_fraction !== undefined && object.distribution_fraction !== null) {
      message.distributionFraction = object.distribution_fraction;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    }
    if (object.toProvider !== undefined && object.toProvider !== null) {
      message.toProvider = object.toProvider;
    }
    if (object.toConsumer !== undefined && object.toConsumer !== null) {
      message.toConsumer = object.toConsumer;
    }
    return message;
  },
  toAmino(message: NextFeeDistributionEstimate, useInterfaces: boolean = false): NextFeeDistributionEstimateAmino {
    const obj: any = {};
    obj.currentHeight = message.currentHeight !== BigInt(0) ? message.currentHeight.toString() : undefined;
    obj.lastHeight = message.lastHeight !== BigInt(0) ? message.lastHeight.toString() : undefined;
    obj.nextHeight = message.nextHeight !== BigInt(0) ? message.nextHeight.toString() : undefined;
    obj.distribution_fraction = message.distributionFraction === "" ? undefined : message.distributionFraction;
    obj.total = message.total === "" ? undefined : message.total;
    obj.toProvider = message.toProvider === "" ? undefined : message.toProvider;
    obj.toConsumer = message.toConsumer === "" ? undefined : message.toConsumer;
    return obj;
  },
  fromAminoMsg(object: NextFeeDistributionEstimateAminoMsg): NextFeeDistributionEstimate {
    return NextFeeDistributionEstimate.fromAmino(object.value);
  },
  fromProtoMsg(message: NextFeeDistributionEstimateProtoMsg, useInterfaces: boolean = false): NextFeeDistributionEstimate {
    return NextFeeDistributionEstimate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NextFeeDistributionEstimate): Uint8Array {
    return NextFeeDistributionEstimate.encode(message).finish();
  },
  toProtoMsg(message: NextFeeDistributionEstimate): NextFeeDistributionEstimateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate",
      value: NextFeeDistributionEstimate.encode(message).finish()
    };
  }
};
function createBaseQueryNextFeeDistributionEstimateRequest(): QueryNextFeeDistributionEstimateRequest {
  return {};
}
export const QueryNextFeeDistributionEstimateRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest",
  encode(_: QueryNextFeeDistributionEstimateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextFeeDistributionEstimateRequest();
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
  fromPartial(_: Partial<QueryNextFeeDistributionEstimateRequest>): QueryNextFeeDistributionEstimateRequest {
    const message = createBaseQueryNextFeeDistributionEstimateRequest();
    return message;
  },
  fromAmino(_: QueryNextFeeDistributionEstimateRequestAmino): QueryNextFeeDistributionEstimateRequest {
    const message = createBaseQueryNextFeeDistributionEstimateRequest();
    return message;
  },
  toAmino(_: QueryNextFeeDistributionEstimateRequest, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryNextFeeDistributionEstimateRequestAminoMsg): QueryNextFeeDistributionEstimateRequest {
    return QueryNextFeeDistributionEstimateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNextFeeDistributionEstimateRequestProtoMsg, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateRequest {
    return QueryNextFeeDistributionEstimateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryNextFeeDistributionEstimateRequest): Uint8Array {
    return QueryNextFeeDistributionEstimateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNextFeeDistributionEstimateRequest): QueryNextFeeDistributionEstimateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest",
      value: QueryNextFeeDistributionEstimateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNextFeeDistributionEstimateResponse(): QueryNextFeeDistributionEstimateResponse {
  return {
    data: undefined
  };
}
export const QueryNextFeeDistributionEstimateResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse",
  encode(message: QueryNextFeeDistributionEstimateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data !== undefined) {
      NextFeeDistributionEstimate.encode(message.data, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextFeeDistributionEstimateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = NextFeeDistributionEstimate.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNextFeeDistributionEstimateResponse>): QueryNextFeeDistributionEstimateResponse {
    const message = createBaseQueryNextFeeDistributionEstimateResponse();
    message.data = object.data !== undefined && object.data !== null ? NextFeeDistributionEstimate.fromPartial(object.data) : undefined;
    return message;
  },
  fromAmino(object: QueryNextFeeDistributionEstimateResponseAmino): QueryNextFeeDistributionEstimateResponse {
    const message = createBaseQueryNextFeeDistributionEstimateResponse();
    if (object.data !== undefined && object.data !== null) {
      message.data = NextFeeDistributionEstimate.fromAmino(object.data);
    }
    return message;
  },
  toAmino(message: QueryNextFeeDistributionEstimateResponse, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateResponseAmino {
    const obj: any = {};
    obj.data = message.data ? NextFeeDistributionEstimate.toAmino(message.data, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNextFeeDistributionEstimateResponseAminoMsg): QueryNextFeeDistributionEstimateResponse {
    return QueryNextFeeDistributionEstimateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNextFeeDistributionEstimateResponseProtoMsg, useInterfaces: boolean = false): QueryNextFeeDistributionEstimateResponse {
    return QueryNextFeeDistributionEstimateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryNextFeeDistributionEstimateResponse): Uint8Array {
    return QueryNextFeeDistributionEstimateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNextFeeDistributionEstimateResponse): QueryNextFeeDistributionEstimateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse",
      value: QueryNextFeeDistributionEstimateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsRequest",
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
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: ConsumerParams.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      ConsumerParams.encode(message.params, writer.uint32(10).fork()).ldelim();
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
          message.params = ConsumerParams.decode(reader, reader.uint32(), useInterfaces);
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
    message.params = object.params !== undefined && object.params !== null ? ConsumerParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = ConsumerParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? ConsumerParams.toAmino(message.params, useInterfaces) : undefined;
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
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryProviderInfoRequest(): QueryProviderInfoRequest {
  return {};
}
export const QueryProviderInfoRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest",
  encode(_: QueryProviderInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryProviderInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderInfoRequest();
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
  fromPartial(_: Partial<QueryProviderInfoRequest>): QueryProviderInfoRequest {
    const message = createBaseQueryProviderInfoRequest();
    return message;
  },
  fromAmino(_: QueryProviderInfoRequestAmino): QueryProviderInfoRequest {
    const message = createBaseQueryProviderInfoRequest();
    return message;
  },
  toAmino(_: QueryProviderInfoRequest, useInterfaces: boolean = false): QueryProviderInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryProviderInfoRequestAminoMsg): QueryProviderInfoRequest {
    return QueryProviderInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderInfoRequestProtoMsg, useInterfaces: boolean = false): QueryProviderInfoRequest {
    return QueryProviderInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryProviderInfoRequest): Uint8Array {
    return QueryProviderInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderInfoRequest): QueryProviderInfoRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest",
      value: QueryProviderInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProviderInfoResponse(): QueryProviderInfoResponse {
  return {
    consumer: ChainInfo.fromPartial({}),
    provider: ChainInfo.fromPartial({})
  };
}
export const QueryProviderInfoResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse",
  encode(message: QueryProviderInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumer !== undefined) {
      ChainInfo.encode(message.consumer, writer.uint32(10).fork()).ldelim();
    }
    if (message.provider !== undefined) {
      ChainInfo.encode(message.provider, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryProviderInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumer = ChainInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.provider = ChainInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryProviderInfoResponse>): QueryProviderInfoResponse {
    const message = createBaseQueryProviderInfoResponse();
    message.consumer = object.consumer !== undefined && object.consumer !== null ? ChainInfo.fromPartial(object.consumer) : undefined;
    message.provider = object.provider !== undefined && object.provider !== null ? ChainInfo.fromPartial(object.provider) : undefined;
    return message;
  },
  fromAmino(object: QueryProviderInfoResponseAmino): QueryProviderInfoResponse {
    const message = createBaseQueryProviderInfoResponse();
    if (object.consumer !== undefined && object.consumer !== null) {
      message.consumer = ChainInfo.fromAmino(object.consumer);
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = ChainInfo.fromAmino(object.provider);
    }
    return message;
  },
  toAmino(message: QueryProviderInfoResponse, useInterfaces: boolean = false): QueryProviderInfoResponseAmino {
    const obj: any = {};
    obj.consumer = message.consumer ? ChainInfo.toAmino(message.consumer, useInterfaces) : undefined;
    obj.provider = message.provider ? ChainInfo.toAmino(message.provider, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProviderInfoResponseAminoMsg): QueryProviderInfoResponse {
    return QueryProviderInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderInfoResponseProtoMsg, useInterfaces: boolean = false): QueryProviderInfoResponse {
    return QueryProviderInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryProviderInfoResponse): Uint8Array {
    return QueryProviderInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderInfoResponse): QueryProviderInfoResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse",
      value: QueryProviderInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateRequest(): QueryThrottleStateRequest {
  return {};
}
export const QueryThrottleStateRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateRequest",
  encode(_: QueryThrottleStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryThrottleStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateRequest();
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
  fromPartial(_: Partial<QueryThrottleStateRequest>): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
  fromAmino(_: QueryThrottleStateRequestAmino): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
  toAmino(_: QueryThrottleStateRequest, useInterfaces: boolean = false): QueryThrottleStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateRequestAminoMsg): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateRequestProtoMsg, useInterfaces: boolean = false): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryThrottleStateRequest): Uint8Array {
    return QueryThrottleStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateRequest): QueryThrottleStateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateRequest",
      value: QueryThrottleStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateResponse(): QueryThrottleStateResponse {
  return {
    slashRecord: undefined,
    packetDataQueue: []
  };
}
export const QueryThrottleStateResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateResponse",
  encode(message: QueryThrottleStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.slashRecord !== undefined) {
      SlashRecord.encode(message.slashRecord, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.packetDataQueue) {
      ConsumerPacketData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryThrottleStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashRecord = SlashRecord.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.packetDataQueue.push(ConsumerPacketData.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryThrottleStateResponse>): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    message.slashRecord = object.slashRecord !== undefined && object.slashRecord !== null ? SlashRecord.fromPartial(object.slashRecord) : undefined;
    message.packetDataQueue = object.packetDataQueue?.map(e => ConsumerPacketData.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryThrottleStateResponseAmino): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    if (object.slash_record !== undefined && object.slash_record !== null) {
      message.slashRecord = SlashRecord.fromAmino(object.slash_record);
    }
    message.packetDataQueue = object.packet_data_queue?.map(e => ConsumerPacketData.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryThrottleStateResponse, useInterfaces: boolean = false): QueryThrottleStateResponseAmino {
    const obj: any = {};
    obj.slash_record = message.slashRecord ? SlashRecord.toAmino(message.slashRecord, useInterfaces) : undefined;
    if (message.packetDataQueue) {
      obj.packet_data_queue = message.packetDataQueue.map(e => e ? ConsumerPacketData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.packet_data_queue = message.packetDataQueue;
    }
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateResponseAminoMsg): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateResponseProtoMsg, useInterfaces: boolean = false): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryThrottleStateResponse): Uint8Array {
    return QueryThrottleStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateResponse): QueryThrottleStateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryThrottleStateResponse",
      value: QueryThrottleStateResponse.encode(message).finish()
    };
  }
};
function createBaseChainInfo(): ChainInfo {
  return {
    chainID: "",
    clientID: "",
    connectionID: "",
    channelID: ""
  };
}
export const ChainInfo = {
  typeUrl: "/interchain_security.ccv.consumer.v1.ChainInfo",
  encode(message: ChainInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    if (message.clientID !== "") {
      writer.uint32(18).string(message.clientID);
    }
    if (message.connectionID !== "") {
      writer.uint32(26).string(message.connectionID);
    }
    if (message.channelID !== "") {
      writer.uint32(34).string(message.channelID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ChainInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChainInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.clientID = reader.string();
          break;
        case 3:
          message.connectionID = reader.string();
          break;
        case 4:
          message.channelID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChainInfo>): ChainInfo {
    const message = createBaseChainInfo();
    message.chainID = object.chainID ?? "";
    message.clientID = object.clientID ?? "";
    message.connectionID = object.connectionID ?? "";
    message.channelID = object.channelID ?? "";
    return message;
  },
  fromAmino(object: ChainInfoAmino): ChainInfo {
    const message = createBaseChainInfo();
    if (object.chainID !== undefined && object.chainID !== null) {
      message.chainID = object.chainID;
    }
    if (object.clientID !== undefined && object.clientID !== null) {
      message.clientID = object.clientID;
    }
    if (object.connectionID !== undefined && object.connectionID !== null) {
      message.connectionID = object.connectionID;
    }
    if (object.channelID !== undefined && object.channelID !== null) {
      message.channelID = object.channelID;
    }
    return message;
  },
  toAmino(message: ChainInfo, useInterfaces: boolean = false): ChainInfoAmino {
    const obj: any = {};
    obj.chainID = message.chainID === "" ? undefined : message.chainID;
    obj.clientID = message.clientID === "" ? undefined : message.clientID;
    obj.connectionID = message.connectionID === "" ? undefined : message.connectionID;
    obj.channelID = message.channelID === "" ? undefined : message.channelID;
    return obj;
  },
  fromAminoMsg(object: ChainInfoAminoMsg): ChainInfo {
    return ChainInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ChainInfoProtoMsg, useInterfaces: boolean = false): ChainInfo {
    return ChainInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ChainInfo): Uint8Array {
    return ChainInfo.encode(message).finish();
  },
  toProtoMsg(message: ChainInfo): ChainInfoProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.ChainInfo",
      value: ChainInfo.encode(message).finish()
    };
  }
};
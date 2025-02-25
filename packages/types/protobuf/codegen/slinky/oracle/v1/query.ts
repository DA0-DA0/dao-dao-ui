//@ts-nocheck
import { CurrencyPair, CurrencyPairAmino, CurrencyPairSDKType } from "../../types/v1/currency_pair";
import { QuotePrice, QuotePriceAmino, QuotePriceSDKType } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface GetAllCurrencyPairsRequest {}
export interface GetAllCurrencyPairsRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest";
  value: Uint8Array;
}
export interface GetAllCurrencyPairsRequestAmino {}
export interface GetAllCurrencyPairsRequestAminoMsg {
  type: "/slinky.oracle.v1.GetAllCurrencyPairsRequest";
  value: GetAllCurrencyPairsRequestAmino;
}
export interface GetAllCurrencyPairsRequestSDKType {}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponse {
  currencyPairs: CurrencyPair[];
}
export interface GetAllCurrencyPairsResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse";
  value: Uint8Array;
}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponseAmino {
  currency_pairs?: CurrencyPairAmino[];
}
export interface GetAllCurrencyPairsResponseAminoMsg {
  type: "/slinky.oracle.v1.GetAllCurrencyPairsResponse";
  value: GetAllCurrencyPairsResponseAmino;
}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponseSDKType {
  currency_pairs: CurrencyPairSDKType[];
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequest {
  /** CurrencyPair represents the pair that the user wishes to query. */
  currencyPair: CurrencyPair | undefined;
}
export interface GetPriceRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPriceRequest";
  value: Uint8Array;
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequestAmino {
  /** CurrencyPair represents the pair that the user wishes to query. */
  currency_pair?: CurrencyPairAmino | undefined;
}
export interface GetPriceRequestAminoMsg {
  type: "/slinky.oracle.v1.GetPriceRequest";
  value: GetPriceRequestAmino;
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequestSDKType {
  currency_pair: CurrencyPairSDKType | undefined;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponse {
  /**
   * QuotePrice represents the quote-price for the CurrencyPair given in
   * GetPriceRequest (possibly nil if no update has been made)
   */
  price?: QuotePrice | undefined;
  /** nonce represents the nonce for the CurrencyPair if it exists in state */
  nonce: bigint;
  /**
   * decimals represents the number of decimals that the quote-price is
   * represented in. For Pairs where ETHEREUM is the quote this will be 18,
   * otherwise it will be 8.
   */
  decimals: bigint;
  /** ID represents the identifier for the CurrencyPair. */
  id: bigint;
}
export interface GetPriceResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPriceResponse";
  value: Uint8Array;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponseAmino {
  /**
   * QuotePrice represents the quote-price for the CurrencyPair given in
   * GetPriceRequest (possibly nil if no update has been made)
   */
  price?: QuotePriceAmino | undefined;
  /** nonce represents the nonce for the CurrencyPair if it exists in state */
  nonce?: string;
  /**
   * decimals represents the number of decimals that the quote-price is
   * represented in. For Pairs where ETHEREUM is the quote this will be 18,
   * otherwise it will be 8.
   */
  decimals?: string;
  /** ID represents the identifier for the CurrencyPair. */
  id?: string;
}
export interface GetPriceResponseAminoMsg {
  type: "/slinky.oracle.v1.GetPriceResponse";
  value: GetPriceResponseAmino;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponseSDKType {
  price?: QuotePriceSDKType | undefined;
  nonce: bigint;
  decimals: bigint;
  id: bigint;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequest {
  currencyPairIds: string[];
}
export interface GetPricesRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPricesRequest";
  value: Uint8Array;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequestAmino {
  currency_pair_ids?: string[];
}
export interface GetPricesRequestAminoMsg {
  type: "/slinky.oracle.v1.GetPricesRequest";
  value: GetPricesRequestAmino;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequestSDKType {
  currency_pair_ids: string[];
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponse {
  prices: GetPriceResponse[];
}
export interface GetPricesResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPricesResponse";
  value: Uint8Array;
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponseAmino {
  prices?: GetPriceResponseAmino[];
}
export interface GetPricesResponseAminoMsg {
  type: "/slinky.oracle.v1.GetPricesResponse";
  value: GetPricesResponseAmino;
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponseSDKType {
  prices: GetPriceResponseSDKType[];
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequest {}
export interface GetCurrencyPairMappingRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest";
  value: Uint8Array;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequestAmino {}
export interface GetCurrencyPairMappingRequestAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingRequest";
  value: GetCurrencyPairMappingRequestAmino;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequestSDKType {}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
  key: bigint;
  value?: CurrencyPair | undefined;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino {
  key?: string;
  value?: CurrencyPairAmino | undefined;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAminoMsg {
  type: string;
  value: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntrySDKType {
  key: bigint;
  value?: CurrencyPairSDKType | undefined;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponse {
  /**
   * currency_pair_mapping is a mapping of the id representing the currency pair
   * to the currency pair itself.
   */
  currencyPairMapping: {
    [key: bigint]: CurrencyPair | undefined;
  };
}
export interface GetCurrencyPairMappingResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse";
  value: Uint8Array;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponseAmino {
  /**
   * currency_pair_mapping is a mapping of the id representing the currency pair
   * to the currency pair itself.
   */
  currency_pair_mapping?: {
    [key: string]: CurrencyPairAmino | undefined;
  };
}
export interface GetCurrencyPairMappingResponseAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingResponse";
  value: GetCurrencyPairMappingResponseAmino;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponseSDKType {
  currency_pair_mapping: {
    [key: bigint]: CurrencyPairSDKType | undefined;
  };
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingListRequest {}
export interface GetCurrencyPairMappingListRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListRequest";
  value: Uint8Array;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingListRequestAmino {}
export interface GetCurrencyPairMappingListRequestAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingListRequest";
  value: GetCurrencyPairMappingListRequestAmino;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingListRequestSDKType {}
export interface CurrencyPairMapping {
  /** ID is the unique identifier for this currency pair string. */
  id: bigint;
  /** CurrencyPair is the human-readable representation of the currency pair. */
  currencyPair: CurrencyPair | undefined;
}
export interface CurrencyPairMappingProtoMsg {
  typeUrl: "/slinky.oracle.v1.CurrencyPairMapping";
  value: Uint8Array;
}
export interface CurrencyPairMappingAmino {
  /** ID is the unique identifier for this currency pair string. */
  id?: string;
  /** CurrencyPair is the human-readable representation of the currency pair. */
  currency_pair?: CurrencyPairAmino | undefined;
}
export interface CurrencyPairMappingAminoMsg {
  type: "/slinky.oracle.v1.CurrencyPairMapping";
  value: CurrencyPairMappingAmino;
}
export interface CurrencyPairMappingSDKType {
  id: bigint;
  currency_pair: CurrencyPairSDKType | undefined;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingListResponse {
  /**
   * mappings is a list of the id representing the currency pair
   * to the currency pair itself.
   */
  mappings: CurrencyPairMapping[];
}
export interface GetCurrencyPairMappingListResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListResponse";
  value: Uint8Array;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingListResponseAmino {
  /**
   * mappings is a list of the id representing the currency pair
   * to the currency pair itself.
   */
  mappings?: CurrencyPairMappingAmino[];
}
export interface GetCurrencyPairMappingListResponseAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingListResponse";
  value: GetCurrencyPairMappingListResponseAmino;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingListResponseSDKType {
  mappings: CurrencyPairMappingSDKType[];
}
function createBaseGetAllCurrencyPairsRequest(): GetAllCurrencyPairsRequest {
  return {};
}
export const GetAllCurrencyPairsRequest = {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest",
  encode(_: GetAllCurrencyPairsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAllCurrencyPairsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllCurrencyPairsRequest();
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
  fromPartial(_: Partial<GetAllCurrencyPairsRequest>): GetAllCurrencyPairsRequest {
    const message = createBaseGetAllCurrencyPairsRequest();
    return message;
  },
  fromAmino(_: GetAllCurrencyPairsRequestAmino): GetAllCurrencyPairsRequest {
    const message = createBaseGetAllCurrencyPairsRequest();
    return message;
  },
  toAmino(_: GetAllCurrencyPairsRequest, useInterfaces: boolean = false): GetAllCurrencyPairsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetAllCurrencyPairsRequestAminoMsg): GetAllCurrencyPairsRequest {
    return GetAllCurrencyPairsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAllCurrencyPairsRequestProtoMsg, useInterfaces: boolean = false): GetAllCurrencyPairsRequest {
    return GetAllCurrencyPairsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAllCurrencyPairsRequest): Uint8Array {
    return GetAllCurrencyPairsRequest.encode(message).finish();
  },
  toProtoMsg(message: GetAllCurrencyPairsRequest): GetAllCurrencyPairsRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest",
      value: GetAllCurrencyPairsRequest.encode(message).finish()
    };
  }
};
function createBaseGetAllCurrencyPairsResponse(): GetAllCurrencyPairsResponse {
  return {
    currencyPairs: []
  };
}
export const GetAllCurrencyPairsResponse = {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse",
  encode(message: GetAllCurrencyPairsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currencyPairs) {
      CurrencyPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAllCurrencyPairsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllCurrencyPairsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPairs.push(CurrencyPair.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAllCurrencyPairsResponse>): GetAllCurrencyPairsResponse {
    const message = createBaseGetAllCurrencyPairsResponse();
    message.currencyPairs = object.currencyPairs?.map(e => CurrencyPair.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetAllCurrencyPairsResponseAmino): GetAllCurrencyPairsResponse {
    const message = createBaseGetAllCurrencyPairsResponse();
    message.currencyPairs = object.currency_pairs?.map(e => CurrencyPair.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetAllCurrencyPairsResponse, useInterfaces: boolean = false): GetAllCurrencyPairsResponseAmino {
    const obj: any = {};
    if (message.currencyPairs) {
      obj.currency_pairs = message.currencyPairs.map(e => e ? CurrencyPair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.currency_pairs = message.currencyPairs;
    }
    return obj;
  },
  fromAminoMsg(object: GetAllCurrencyPairsResponseAminoMsg): GetAllCurrencyPairsResponse {
    return GetAllCurrencyPairsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAllCurrencyPairsResponseProtoMsg, useInterfaces: boolean = false): GetAllCurrencyPairsResponse {
    return GetAllCurrencyPairsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAllCurrencyPairsResponse): Uint8Array {
    return GetAllCurrencyPairsResponse.encode(message).finish();
  },
  toProtoMsg(message: GetAllCurrencyPairsResponse): GetAllCurrencyPairsResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse",
      value: GetAllCurrencyPairsResponse.encode(message).finish()
    };
  }
};
function createBaseGetPriceRequest(): GetPriceRequest {
  return {
    currencyPair: CurrencyPair.fromPartial({})
  };
}
export const GetPriceRequest = {
  typeUrl: "/slinky.oracle.v1.GetPriceRequest",
  encode(message: GetPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPair = CurrencyPair.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetPriceRequest>): GetPriceRequest {
    const message = createBaseGetPriceRequest();
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    return message;
  },
  fromAmino(object: GetPriceRequestAmino): GetPriceRequest {
    const message = createBaseGetPriceRequest();
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    return message;
  },
  toAmino(message: GetPriceRequest, useInterfaces: boolean = false): GetPriceRequestAmino {
    const obj: any = {};
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetPriceRequestAminoMsg): GetPriceRequest {
    return GetPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPriceRequestProtoMsg, useInterfaces: boolean = false): GetPriceRequest {
    return GetPriceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetPriceRequest): Uint8Array {
    return GetPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: GetPriceRequest): GetPriceRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPriceRequest",
      value: GetPriceRequest.encode(message).finish()
    };
  }
};
function createBaseGetPriceResponse(): GetPriceResponse {
  return {
    price: undefined,
    nonce: BigInt(0),
    decimals: BigInt(0),
    id: BigInt(0)
  };
}
export const GetPriceResponse = {
  typeUrl: "/slinky.oracle.v1.GetPriceResponse",
  encode(message: GetPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== undefined) {
      QuotePrice.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.decimals !== BigInt(0)) {
      writer.uint32(24).uint64(message.decimals);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(32).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = QuotePrice.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.decimals = reader.uint64();
          break;
        case 4:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetPriceResponse>): GetPriceResponse {
    const message = createBaseGetPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? QuotePrice.fromPartial(object.price) : undefined;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.decimals = object.decimals !== undefined && object.decimals !== null ? BigInt(object.decimals.toString()) : BigInt(0);
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GetPriceResponseAmino): GetPriceResponse {
    const message = createBaseGetPriceResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = QuotePrice.fromAmino(object.price);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = BigInt(object.decimals);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: GetPriceResponse, useInterfaces: boolean = false): GetPriceResponseAmino {
    const obj: any = {};
    obj.price = message.price ? QuotePrice.toAmino(message.price, useInterfaces) : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.decimals = message.decimals !== BigInt(0) ? message.decimals.toString() : undefined;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GetPriceResponseAminoMsg): GetPriceResponse {
    return GetPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPriceResponseProtoMsg, useInterfaces: boolean = false): GetPriceResponse {
    return GetPriceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetPriceResponse): Uint8Array {
    return GetPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: GetPriceResponse): GetPriceResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPriceResponse",
      value: GetPriceResponse.encode(message).finish()
    };
  }
};
function createBaseGetPricesRequest(): GetPricesRequest {
  return {
    currencyPairIds: []
  };
}
export const GetPricesRequest = {
  typeUrl: "/slinky.oracle.v1.GetPricesRequest",
  encode(message: GetPricesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currencyPairIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetPricesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPricesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPairIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetPricesRequest>): GetPricesRequest {
    const message = createBaseGetPricesRequest();
    message.currencyPairIds = object.currencyPairIds?.map(e => e) || [];
    return message;
  },
  fromAmino(object: GetPricesRequestAmino): GetPricesRequest {
    const message = createBaseGetPricesRequest();
    message.currencyPairIds = object.currency_pair_ids?.map(e => e) || [];
    return message;
  },
  toAmino(message: GetPricesRequest, useInterfaces: boolean = false): GetPricesRequestAmino {
    const obj: any = {};
    if (message.currencyPairIds) {
      obj.currency_pair_ids = message.currencyPairIds.map(e => e);
    } else {
      obj.currency_pair_ids = message.currencyPairIds;
    }
    return obj;
  },
  fromAminoMsg(object: GetPricesRequestAminoMsg): GetPricesRequest {
    return GetPricesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPricesRequestProtoMsg, useInterfaces: boolean = false): GetPricesRequest {
    return GetPricesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetPricesRequest): Uint8Array {
    return GetPricesRequest.encode(message).finish();
  },
  toProtoMsg(message: GetPricesRequest): GetPricesRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPricesRequest",
      value: GetPricesRequest.encode(message).finish()
    };
  }
};
function createBaseGetPricesResponse(): GetPricesResponse {
  return {
    prices: []
  };
}
export const GetPricesResponse = {
  typeUrl: "/slinky.oracle.v1.GetPricesResponse",
  encode(message: GetPricesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.prices) {
      GetPriceResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetPricesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(GetPriceResponse.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetPricesResponse>): GetPricesResponse {
    const message = createBaseGetPricesResponse();
    message.prices = object.prices?.map(e => GetPriceResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetPricesResponseAmino): GetPricesResponse {
    const message = createBaseGetPricesResponse();
    message.prices = object.prices?.map(e => GetPriceResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetPricesResponse, useInterfaces: boolean = false): GetPricesResponseAmino {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? GetPriceResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.prices = message.prices;
    }
    return obj;
  },
  fromAminoMsg(object: GetPricesResponseAminoMsg): GetPricesResponse {
    return GetPricesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPricesResponseProtoMsg, useInterfaces: boolean = false): GetPricesResponse {
    return GetPricesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetPricesResponse): Uint8Array {
    return GetPricesResponse.encode(message).finish();
  },
  toProtoMsg(message: GetPricesResponse): GetPricesResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPricesResponse",
      value: GetPricesResponse.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingRequest(): GetCurrencyPairMappingRequest {
  return {};
}
export const GetCurrencyPairMappingRequest = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest",
  encode(_: GetCurrencyPairMappingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetCurrencyPairMappingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingRequest();
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
  fromPartial(_: Partial<GetCurrencyPairMappingRequest>): GetCurrencyPairMappingRequest {
    const message = createBaseGetCurrencyPairMappingRequest();
    return message;
  },
  fromAmino(_: GetCurrencyPairMappingRequestAmino): GetCurrencyPairMappingRequest {
    const message = createBaseGetCurrencyPairMappingRequest();
    return message;
  },
  toAmino(_: GetCurrencyPairMappingRequest, useInterfaces: boolean = false): GetCurrencyPairMappingRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingRequestAminoMsg): GetCurrencyPairMappingRequest {
    return GetCurrencyPairMappingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingRequestProtoMsg, useInterfaces: boolean = false): GetCurrencyPairMappingRequest {
    return GetCurrencyPairMappingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetCurrencyPairMappingRequest): Uint8Array {
    return GetCurrencyPairMappingRequest.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingRequest): GetCurrencyPairMappingRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest",
      value: GetCurrencyPairMappingRequest.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry(): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
  return {
    key: BigInt(0),
    value: undefined
  };
}
export const GetCurrencyPairMappingResponse_CurrencyPairMappingEntry = {
  encode(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== BigInt(0)) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      CurrencyPair.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.uint64();
          break;
        case 2:
          message.value = CurrencyPair.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetCurrencyPairMappingResponse_CurrencyPairMappingEntry>): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    message.key = object.key !== undefined && object.key !== null ? BigInt(object.key.toString()) : BigInt(0);
    message.value = object.value !== undefined && object.value !== null ? CurrencyPair.fromPartial(object.value) : undefined;
    return message;
  },
  fromAmino(object: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = BigInt(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = CurrencyPair.fromAmino(object.value);
    }
    return message;
  },
  toAmino(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry, useInterfaces: boolean = false): GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino {
    const obj: any = {};
    obj.key = message.key !== BigInt(0) ? message.key.toString() : undefined;
    obj.value = message.value ? CurrencyPair.toAmino(message.value, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAminoMsg): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryProtoMsg, useInterfaces: boolean = false): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry): Uint8Array {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.encode(message).finish();
  }
};
function createBaseGetCurrencyPairMappingResponse(): GetCurrencyPairMappingResponse {
  return {
    currencyPairMapping: {}
  };
}
export const GetCurrencyPairMappingResponse = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse",
  encode(message: GetCurrencyPairMappingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    Object.entries(message.currencyPairMapping).forEach(([key, value]) => {
      GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetCurrencyPairMappingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.currencyPairMapping[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetCurrencyPairMappingResponse>): GetCurrencyPairMappingResponse {
    const message = createBaseGetCurrencyPairMappingResponse();
    message.currencyPairMapping = Object.entries(object.currencyPairMapping ?? {}).reduce<{
      [key: bigint]: CurrencyPair;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = CurrencyPair.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: GetCurrencyPairMappingResponseAmino): GetCurrencyPairMappingResponse {
    const message = createBaseGetCurrencyPairMappingResponse();
    message.currencyPairMapping = Object.entries(object.currency_pair_mapping ?? {}).reduce<{
      [key: bigint]: CurrencyPair;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = CurrencyPair.fromAmino(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: GetCurrencyPairMappingResponse, useInterfaces: boolean = false): GetCurrencyPairMappingResponseAmino {
    const obj: any = {};
    obj.currency_pair_mapping = {};
    if (message.currencyPairMapping) {
      Object.entries(message.currencyPairMapping).forEach(([k, v]) => {
        obj.currency_pair_mapping[k] = CurrencyPair.toAmino(v);
      });
    }
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingResponseAminoMsg): GetCurrencyPairMappingResponse {
    return GetCurrencyPairMappingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingResponseProtoMsg, useInterfaces: boolean = false): GetCurrencyPairMappingResponse {
    return GetCurrencyPairMappingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetCurrencyPairMappingResponse): Uint8Array {
    return GetCurrencyPairMappingResponse.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingResponse): GetCurrencyPairMappingResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse",
      value: GetCurrencyPairMappingResponse.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingListRequest(): GetCurrencyPairMappingListRequest {
  return {};
}
export const GetCurrencyPairMappingListRequest = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListRequest",
  encode(_: GetCurrencyPairMappingListRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetCurrencyPairMappingListRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingListRequest();
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
  fromPartial(_: Partial<GetCurrencyPairMappingListRequest>): GetCurrencyPairMappingListRequest {
    const message = createBaseGetCurrencyPairMappingListRequest();
    return message;
  },
  fromAmino(_: GetCurrencyPairMappingListRequestAmino): GetCurrencyPairMappingListRequest {
    const message = createBaseGetCurrencyPairMappingListRequest();
    return message;
  },
  toAmino(_: GetCurrencyPairMappingListRequest, useInterfaces: boolean = false): GetCurrencyPairMappingListRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingListRequestAminoMsg): GetCurrencyPairMappingListRequest {
    return GetCurrencyPairMappingListRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingListRequestProtoMsg, useInterfaces: boolean = false): GetCurrencyPairMappingListRequest {
    return GetCurrencyPairMappingListRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetCurrencyPairMappingListRequest): Uint8Array {
    return GetCurrencyPairMappingListRequest.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingListRequest): GetCurrencyPairMappingListRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListRequest",
      value: GetCurrencyPairMappingListRequest.encode(message).finish()
    };
  }
};
function createBaseCurrencyPairMapping(): CurrencyPairMapping {
  return {
    id: BigInt(0),
    currencyPair: CurrencyPair.fromPartial({})
  };
}
export const CurrencyPairMapping = {
  typeUrl: "/slinky.oracle.v1.CurrencyPairMapping",
  encode(message: CurrencyPairMapping, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CurrencyPairMapping {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrencyPairMapping();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.currencyPair = CurrencyPair.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CurrencyPairMapping>): CurrencyPairMapping {
    const message = createBaseCurrencyPairMapping();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    return message;
  },
  fromAmino(object: CurrencyPairMappingAmino): CurrencyPairMapping {
    const message = createBaseCurrencyPairMapping();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    return message;
  },
  toAmino(message: CurrencyPairMapping, useInterfaces: boolean = false): CurrencyPairMappingAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CurrencyPairMappingAminoMsg): CurrencyPairMapping {
    return CurrencyPairMapping.fromAmino(object.value);
  },
  fromProtoMsg(message: CurrencyPairMappingProtoMsg, useInterfaces: boolean = false): CurrencyPairMapping {
    return CurrencyPairMapping.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CurrencyPairMapping): Uint8Array {
    return CurrencyPairMapping.encode(message).finish();
  },
  toProtoMsg(message: CurrencyPairMapping): CurrencyPairMappingProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.CurrencyPairMapping",
      value: CurrencyPairMapping.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingListResponse(): GetCurrencyPairMappingListResponse {
  return {
    mappings: []
  };
}
export const GetCurrencyPairMappingListResponse = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListResponse",
  encode(message: GetCurrencyPairMappingListResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.mappings) {
      CurrencyPairMapping.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetCurrencyPairMappingListResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mappings.push(CurrencyPairMapping.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetCurrencyPairMappingListResponse>): GetCurrencyPairMappingListResponse {
    const message = createBaseGetCurrencyPairMappingListResponse();
    message.mappings = object.mappings?.map(e => CurrencyPairMapping.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetCurrencyPairMappingListResponseAmino): GetCurrencyPairMappingListResponse {
    const message = createBaseGetCurrencyPairMappingListResponse();
    message.mappings = object.mappings?.map(e => CurrencyPairMapping.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetCurrencyPairMappingListResponse, useInterfaces: boolean = false): GetCurrencyPairMappingListResponseAmino {
    const obj: any = {};
    if (message.mappings) {
      obj.mappings = message.mappings.map(e => e ? CurrencyPairMapping.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.mappings = message.mappings;
    }
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingListResponseAminoMsg): GetCurrencyPairMappingListResponse {
    return GetCurrencyPairMappingListResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingListResponseProtoMsg, useInterfaces: boolean = false): GetCurrencyPairMappingListResponse {
    return GetCurrencyPairMappingListResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetCurrencyPairMappingListResponse): Uint8Array {
    return GetCurrencyPairMappingListResponse.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingListResponse): GetCurrencyPairMappingListResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingListResponse",
      value: GetCurrencyPairMappingListResponse.encode(message).finish()
    };
  }
};
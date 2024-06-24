//@ts-nocheck
import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * QueryMinimumGasPricesRequest is the request type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesRequest {}
export interface QueryMinimumGasPricesRequestProtoMsg {
  typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesRequest";
  value: Uint8Array;
}
/**
 * QueryMinimumGasPricesRequest is the request type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesRequestAmino {}
export interface QueryMinimumGasPricesRequestAminoMsg {
  type: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesRequest";
  value: QueryMinimumGasPricesRequestAmino;
}
/**
 * QueryMinimumGasPricesRequest is the request type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesRequestSDKType {}
/**
 * QueryMinimumGasPricesResponse is the response type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesResponse {
  minimumGasPrices: DecCoin[];
}
export interface QueryMinimumGasPricesResponseProtoMsg {
  typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesResponse";
  value: Uint8Array;
}
/**
 * QueryMinimumGasPricesResponse is the response type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesResponseAmino {
  minimum_gas_prices?: DecCoinAmino[];
}
export interface QueryMinimumGasPricesResponseAminoMsg {
  type: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesResponse";
  value: QueryMinimumGasPricesResponseAmino;
}
/**
 * QueryMinimumGasPricesResponse is the response type for the
 * Query/MinimumGasPrices RPC method.
 */
export interface QueryMinimumGasPricesResponseSDKType {
  minimum_gas_prices: DecCoinSDKType[];
}
function createBaseQueryMinimumGasPricesRequest(): QueryMinimumGasPricesRequest {
  return {};
}
export const QueryMinimumGasPricesRequest = {
  typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesRequest",
  encode(_: QueryMinimumGasPricesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryMinimumGasPricesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMinimumGasPricesRequest();
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
  fromPartial(_: Partial<QueryMinimumGasPricesRequest>): QueryMinimumGasPricesRequest {
    const message = createBaseQueryMinimumGasPricesRequest();
    return message;
  },
  fromAmino(_: QueryMinimumGasPricesRequestAmino): QueryMinimumGasPricesRequest {
    const message = createBaseQueryMinimumGasPricesRequest();
    return message;
  },
  toAmino(_: QueryMinimumGasPricesRequest, useInterfaces: boolean = false): QueryMinimumGasPricesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryMinimumGasPricesRequestAminoMsg): QueryMinimumGasPricesRequest {
    return QueryMinimumGasPricesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMinimumGasPricesRequestProtoMsg, useInterfaces: boolean = false): QueryMinimumGasPricesRequest {
    return QueryMinimumGasPricesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryMinimumGasPricesRequest): Uint8Array {
    return QueryMinimumGasPricesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMinimumGasPricesRequest): QueryMinimumGasPricesRequestProtoMsg {
    return {
      typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesRequest",
      value: QueryMinimumGasPricesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMinimumGasPricesResponse(): QueryMinimumGasPricesResponse {
  return {
    minimumGasPrices: []
  };
}
export const QueryMinimumGasPricesResponse = {
  typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesResponse",
  encode(message: QueryMinimumGasPricesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.minimumGasPrices) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryMinimumGasPricesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMinimumGasPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minimumGasPrices.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMinimumGasPricesResponse>): QueryMinimumGasPricesResponse {
    const message = createBaseQueryMinimumGasPricesResponse();
    message.minimumGasPrices = object.minimumGasPrices?.map(e => DecCoin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryMinimumGasPricesResponseAmino): QueryMinimumGasPricesResponse {
    const message = createBaseQueryMinimumGasPricesResponse();
    message.minimumGasPrices = object.minimum_gas_prices?.map(e => DecCoin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryMinimumGasPricesResponse, useInterfaces: boolean = false): QueryMinimumGasPricesResponseAmino {
    const obj: any = {};
    if (message.minimumGasPrices) {
      obj.minimum_gas_prices = message.minimumGasPrices.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.minimum_gas_prices = message.minimumGasPrices;
    }
    return obj;
  },
  fromAminoMsg(object: QueryMinimumGasPricesResponseAminoMsg): QueryMinimumGasPricesResponse {
    return QueryMinimumGasPricesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMinimumGasPricesResponseProtoMsg, useInterfaces: boolean = false): QueryMinimumGasPricesResponse {
    return QueryMinimumGasPricesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryMinimumGasPricesResponse): Uint8Array {
    return QueryMinimumGasPricesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMinimumGasPricesResponse): QueryMinimumGasPricesResponseProtoMsg {
    return {
      typeUrl: "/gaia.globalfee.v1beta1.QueryMinimumGasPricesResponse",
      value: QueryMinimumGasPricesResponse.encode(message).finish()
    };
  }
};
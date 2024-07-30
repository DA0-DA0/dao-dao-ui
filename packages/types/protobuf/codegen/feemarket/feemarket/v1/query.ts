//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { State, StateAmino, StateSDKType } from "./genesis";
import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}
export interface ParamsRequestProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.ParamsRequest";
  value: Uint8Array;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestAmino {}
export interface ParamsRequestAminoMsg {
  type: "/feemarket.feemarket.v1.ParamsRequest";
  value: ParamsRequestAmino;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestSDKType {}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  params: Params | undefined;
}
export interface ParamsResponseProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.ParamsResponse";
  value: Uint8Array;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface ParamsResponseAminoMsg {
  type: "/feemarket.feemarket.v1.ParamsResponse";
  value: ParamsResponseAmino;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** StateRequest is the request type for the Query/State RPC method. */
export interface StateRequest {}
export interface StateRequestProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.StateRequest";
  value: Uint8Array;
}
/** StateRequest is the request type for the Query/State RPC method. */
export interface StateRequestAmino {}
export interface StateRequestAminoMsg {
  type: "/feemarket.feemarket.v1.StateRequest";
  value: StateRequestAmino;
}
/** StateRequest is the request type for the Query/State RPC method. */
export interface StateRequestSDKType {}
/** StateResponse is the response type for the Query/State RPC method. */
export interface StateResponse {
  state: State | undefined;
}
export interface StateResponseProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.StateResponse";
  value: Uint8Array;
}
/** StateResponse is the response type for the Query/State RPC method. */
export interface StateResponseAmino {
  state?: StateAmino | undefined;
}
export interface StateResponseAminoMsg {
  type: "/feemarket.feemarket.v1.StateResponse";
  value: StateResponseAmino;
}
/** StateResponse is the response type for the Query/State RPC method. */
export interface StateResponseSDKType {
  state: StateSDKType | undefined;
}
/** GasPriceRequest is the request type for the Query/GasPrice RPC method. */
export interface GasPriceRequest {
  /** denom we are querying gas price in */
  denom: string;
}
export interface GasPriceRequestProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.GasPriceRequest";
  value: Uint8Array;
}
/** GasPriceRequest is the request type for the Query/GasPrice RPC method. */
export interface GasPriceRequestAmino {
  /** denom we are querying gas price in */
  denom?: string;
}
export interface GasPriceRequestAminoMsg {
  type: "/feemarket.feemarket.v1.GasPriceRequest";
  value: GasPriceRequestAmino;
}
/** GasPriceRequest is the request type for the Query/GasPrice RPC method. */
export interface GasPriceRequestSDKType {
  denom: string;
}
/**
 * GasPriceResponse is the response type for the Query/GasPrice RPC method.
 * Returns a gas price in specified denom.
 */
export interface GasPriceResponse {
  price: DecCoin | undefined;
}
export interface GasPriceResponseProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.GasPriceResponse";
  value: Uint8Array;
}
/**
 * GasPriceResponse is the response type for the Query/GasPrice RPC method.
 * Returns a gas price in specified denom.
 */
export interface GasPriceResponseAmino {
  price: DecCoinAmino | undefined;
}
export interface GasPriceResponseAminoMsg {
  type: "/feemarket.feemarket.v1.GasPriceResponse";
  value: GasPriceResponseAmino;
}
/**
 * GasPriceResponse is the response type for the Query/GasPrice RPC method.
 * Returns a gas price in specified denom.
 */
export interface GasPriceResponseSDKType {
  price: DecCoinSDKType | undefined;
}
/** GasPriceRequest is the request type for the Query/GasPrices RPC method. */
export interface GasPricesRequest {}
export interface GasPricesRequestProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.GasPricesRequest";
  value: Uint8Array;
}
/** GasPriceRequest is the request type for the Query/GasPrices RPC method. */
export interface GasPricesRequestAmino {}
export interface GasPricesRequestAminoMsg {
  type: "/feemarket.feemarket.v1.GasPricesRequest";
  value: GasPricesRequestAmino;
}
/** GasPriceRequest is the request type for the Query/GasPrices RPC method. */
export interface GasPricesRequestSDKType {}
/**
 * GasPricesResponse is the response type for the Query/GasPrices RPC method.
 * Returns a gas price in all available denoms.
 */
export interface GasPricesResponse {
  prices: DecCoin[];
}
export interface GasPricesResponseProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.GasPricesResponse";
  value: Uint8Array;
}
/**
 * GasPricesResponse is the response type for the Query/GasPrices RPC method.
 * Returns a gas price in all available denoms.
 */
export interface GasPricesResponseAmino {
  prices: DecCoinAmino[];
}
export interface GasPricesResponseAminoMsg {
  type: "/feemarket.feemarket.v1.GasPricesResponse";
  value: GasPricesResponseAmino;
}
/**
 * GasPricesResponse is the response type for the Query/GasPrices RPC method.
 * Returns a gas price in all available denoms.
 */
export interface GasPricesResponseSDKType {
  prices: DecCoinSDKType[];
}
function createBaseParamsRequest(): ParamsRequest {
  return {};
}
export const ParamsRequest = {
  typeUrl: "/feemarket.feemarket.v1.ParamsRequest",
  encode(_: ParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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
  fromPartial(_: Partial<ParamsRequest>): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  fromAmino(_: ParamsRequestAmino): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  toAmino(_: ParamsRequest, useInterfaces: boolean = false): ParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ParamsRequestAminoMsg): ParamsRequest {
    return ParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsRequestProtoMsg, useInterfaces: boolean = false): ParamsRequest {
    return ParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsRequest): Uint8Array {
    return ParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ParamsRequest): ParamsRequestProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.ParamsRequest",
      value: ParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/feemarket.feemarket.v1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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
  fromPartial(object: Partial<ParamsResponse>): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    const message = createBaseParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: ParamsResponse, useInterfaces: boolean = false): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsResponseProtoMsg, useInterfaces: boolean = false): ParamsResponse {
    return ParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};
function createBaseStateRequest(): StateRequest {
  return {};
}
export const StateRequest = {
  typeUrl: "/feemarket.feemarket.v1.StateRequest",
  encode(_: StateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateRequest();
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
  fromPartial(_: Partial<StateRequest>): StateRequest {
    const message = createBaseStateRequest();
    return message;
  },
  fromAmino(_: StateRequestAmino): StateRequest {
    const message = createBaseStateRequest();
    return message;
  },
  toAmino(_: StateRequest, useInterfaces: boolean = false): StateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: StateRequestAminoMsg): StateRequest {
    return StateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: StateRequestProtoMsg, useInterfaces: boolean = false): StateRequest {
    return StateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StateRequest): Uint8Array {
    return StateRequest.encode(message).finish();
  },
  toProtoMsg(message: StateRequest): StateRequestProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.StateRequest",
      value: StateRequest.encode(message).finish()
    };
  }
};
function createBaseStateResponse(): StateResponse {
  return {
    state: State.fromPartial({})
  };
}
export const StateResponse = {
  typeUrl: "/feemarket.feemarket.v1.StateResponse",
  encode(message: StateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.state !== undefined) {
      State.encode(message.state, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = State.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StateResponse>): StateResponse {
    const message = createBaseStateResponse();
    message.state = object.state !== undefined && object.state !== null ? State.fromPartial(object.state) : undefined;
    return message;
  },
  fromAmino(object: StateResponseAmino): StateResponse {
    const message = createBaseStateResponse();
    if (object.state !== undefined && object.state !== null) {
      message.state = State.fromAmino(object.state);
    }
    return message;
  },
  toAmino(message: StateResponse, useInterfaces: boolean = false): StateResponseAmino {
    const obj: any = {};
    obj.state = message.state ? State.toAmino(message.state, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: StateResponseAminoMsg): StateResponse {
    return StateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: StateResponseProtoMsg, useInterfaces: boolean = false): StateResponse {
    return StateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StateResponse): Uint8Array {
    return StateResponse.encode(message).finish();
  },
  toProtoMsg(message: StateResponse): StateResponseProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.StateResponse",
      value: StateResponse.encode(message).finish()
    };
  }
};
function createBaseGasPriceRequest(): GasPriceRequest {
  return {
    denom: ""
  };
}
export const GasPriceRequest = {
  typeUrl: "/feemarket.feemarket.v1.GasPriceRequest",
  encode(message: GasPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GasPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GasPriceRequest>): GasPriceRequest {
    const message = createBaseGasPriceRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: GasPriceRequestAmino): GasPriceRequest {
    const message = createBaseGasPriceRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: GasPriceRequest, useInterfaces: boolean = false): GasPriceRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: GasPriceRequestAminoMsg): GasPriceRequest {
    return GasPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GasPriceRequestProtoMsg, useInterfaces: boolean = false): GasPriceRequest {
    return GasPriceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GasPriceRequest): Uint8Array {
    return GasPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: GasPriceRequest): GasPriceRequestProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.GasPriceRequest",
      value: GasPriceRequest.encode(message).finish()
    };
  }
};
function createBaseGasPriceResponse(): GasPriceResponse {
  return {
    price: DecCoin.fromPartial({})
  };
}
export const GasPriceResponse = {
  typeUrl: "/feemarket.feemarket.v1.GasPriceResponse",
  encode(message: GasPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== undefined) {
      DecCoin.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GasPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = DecCoin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GasPriceResponse>): GasPriceResponse {
    const message = createBaseGasPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? DecCoin.fromPartial(object.price) : undefined;
    return message;
  },
  fromAmino(object: GasPriceResponseAmino): GasPriceResponse {
    const message = createBaseGasPriceResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = DecCoin.fromAmino(object.price);
    }
    return message;
  },
  toAmino(message: GasPriceResponse, useInterfaces: boolean = false): GasPriceResponseAmino {
    const obj: any = {};
    obj.price = message.price ? DecCoin.toAmino(message.price, useInterfaces) : DecCoin.toAmino(DecCoin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: GasPriceResponseAminoMsg): GasPriceResponse {
    return GasPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GasPriceResponseProtoMsg, useInterfaces: boolean = false): GasPriceResponse {
    return GasPriceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GasPriceResponse): Uint8Array {
    return GasPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: GasPriceResponse): GasPriceResponseProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.GasPriceResponse",
      value: GasPriceResponse.encode(message).finish()
    };
  }
};
function createBaseGasPricesRequest(): GasPricesRequest {
  return {};
}
export const GasPricesRequest = {
  typeUrl: "/feemarket.feemarket.v1.GasPricesRequest",
  encode(_: GasPricesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GasPricesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasPricesRequest();
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
  fromPartial(_: Partial<GasPricesRequest>): GasPricesRequest {
    const message = createBaseGasPricesRequest();
    return message;
  },
  fromAmino(_: GasPricesRequestAmino): GasPricesRequest {
    const message = createBaseGasPricesRequest();
    return message;
  },
  toAmino(_: GasPricesRequest, useInterfaces: boolean = false): GasPricesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GasPricesRequestAminoMsg): GasPricesRequest {
    return GasPricesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GasPricesRequestProtoMsg, useInterfaces: boolean = false): GasPricesRequest {
    return GasPricesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GasPricesRequest): Uint8Array {
    return GasPricesRequest.encode(message).finish();
  },
  toProtoMsg(message: GasPricesRequest): GasPricesRequestProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.GasPricesRequest",
      value: GasPricesRequest.encode(message).finish()
    };
  }
};
function createBaseGasPricesResponse(): GasPricesResponse {
  return {
    prices: []
  };
}
export const GasPricesResponse = {
  typeUrl: "/feemarket.feemarket.v1.GasPricesResponse",
  encode(message: GasPricesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.prices) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GasPricesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GasPricesResponse>): GasPricesResponse {
    const message = createBaseGasPricesResponse();
    message.prices = object.prices?.map(e => DecCoin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GasPricesResponseAmino): GasPricesResponse {
    const message = createBaseGasPricesResponse();
    message.prices = object.prices?.map(e => DecCoin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GasPricesResponse, useInterfaces: boolean = false): GasPricesResponseAmino {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.prices = message.prices;
    }
    return obj;
  },
  fromAminoMsg(object: GasPricesResponseAminoMsg): GasPricesResponse {
    return GasPricesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GasPricesResponseProtoMsg, useInterfaces: boolean = false): GasPricesResponse {
    return GasPricesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GasPricesResponse): Uint8Array {
    return GasPricesResponse.encode(message).finish();
  },
  toProtoMsg(message: GasPricesResponse): GasPricesResponseProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.GasPricesResponse",
      value: GasPricesResponse.encode(message).finish()
    };
  }
};
//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { AssetState, AssetStateAmino, AssetStateSDKType } from "./asset_state";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface QueryGetAssetStateRequest {
  assetId: string;
}
export interface QueryGetAssetStateRequestProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateRequest";
  value: Uint8Array;
}
export interface QueryGetAssetStateRequestAmino {
  asset_id?: string;
}
export interface QueryGetAssetStateRequestAminoMsg {
  type: "/pryzm.refractor.v1.QueryGetAssetStateRequest";
  value: QueryGetAssetStateRequestAmino;
}
export interface QueryGetAssetStateRequestSDKType {
  asset_id: string;
}
export interface QueryGetAssetStateResponse {
  assetState: AssetState | undefined;
}
export interface QueryGetAssetStateResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateResponse";
  value: Uint8Array;
}
export interface QueryGetAssetStateResponseAmino {
  asset_state?: AssetStateAmino | undefined;
}
export interface QueryGetAssetStateResponseAminoMsg {
  type: "/pryzm.refractor.v1.QueryGetAssetStateResponse";
  value: QueryGetAssetStateResponseAmino;
}
export interface QueryGetAssetStateResponseSDKType {
  asset_state: AssetStateSDKType | undefined;
}
export interface QueryGetCPExchangeRateRequest {
  assetId: string;
}
export interface QueryGetCPExchangeRateRequestProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateRequest";
  value: Uint8Array;
}
export interface QueryGetCPExchangeRateRequestAmino {
  asset_id?: string;
}
export interface QueryGetCPExchangeRateRequestAminoMsg {
  type: "/pryzm.refractor.v1.QueryGetCPExchangeRateRequest";
  value: QueryGetCPExchangeRateRequestAmino;
}
export interface QueryGetCPExchangeRateRequestSDKType {
  asset_id: string;
}
export interface QueryGetCPExchangeRateResponse {
  exchangeRate: string;
}
export interface QueryGetCPExchangeRateResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateResponse";
  value: Uint8Array;
}
export interface QueryGetCPExchangeRateResponseAmino {
  exchange_rate?: string;
}
export interface QueryGetCPExchangeRateResponseAminoMsg {
  type: "/pryzm.refractor.v1.QueryGetCPExchangeRateResponse";
  value: QueryGetCPExchangeRateResponseAmino;
}
export interface QueryGetCPExchangeRateResponseSDKType {
  exchange_rate: string;
}
export interface QuerySimulateRefractRequest {
  amount: Coin | undefined;
  maturity: string;
}
export interface QuerySimulateRefractRequestProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractRequest";
  value: Uint8Array;
}
export interface QuerySimulateRefractRequestAmino {
  amount?: CoinAmino | undefined;
  maturity?: string;
}
export interface QuerySimulateRefractRequestAminoMsg {
  type: "/pryzm.refractor.v1.QuerySimulateRefractRequest";
  value: QuerySimulateRefractRequestAmino;
}
export interface QuerySimulateRefractRequestSDKType {
  amount: CoinSDKType | undefined;
  maturity: string;
}
export interface QuerySimulateRefractResponse {
  pAmount: Coin | undefined;
  yAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface QuerySimulateRefractResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractResponse";
  value: Uint8Array;
}
export interface QuerySimulateRefractResponseAmino {
  p_amount?: CoinAmino | undefined;
  y_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface QuerySimulateRefractResponseAminoMsg {
  type: "/pryzm.refractor.v1.QuerySimulateRefractResponse";
  value: QuerySimulateRefractResponseAmino;
}
export interface QuerySimulateRefractResponseSDKType {
  p_amount: CoinSDKType | undefined;
  y_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface QuerySimulateRedeemRequest {
  pAmount: Coin | undefined;
  yAmount?: Coin | undefined;
}
export interface QuerySimulateRedeemRequestProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemRequest";
  value: Uint8Array;
}
export interface QuerySimulateRedeemRequestAmino {
  p_amount?: CoinAmino | undefined;
  y_amount?: CoinAmino | undefined;
}
export interface QuerySimulateRedeemRequestAminoMsg {
  type: "/pryzm.refractor.v1.QuerySimulateRedeemRequest";
  value: QuerySimulateRedeemRequestAmino;
}
export interface QuerySimulateRedeemRequestSDKType {
  p_amount: CoinSDKType | undefined;
  y_amount?: CoinSDKType | undefined;
}
export interface QuerySimulateRedeemResponse {
  cAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface QuerySimulateRedeemResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemResponse";
  value: Uint8Array;
}
export interface QuerySimulateRedeemResponseAmino {
  c_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface QuerySimulateRedeemResponseAminoMsg {
  type: "/pryzm.refractor.v1.QuerySimulateRedeemResponse";
  value: QuerySimulateRedeemResponseAmino;
}
export interface QuerySimulateRedeemResponseSDKType {
  c_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pryzm.refractor.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pryzm.refractor.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseQueryGetAssetStateRequest(): QueryGetAssetStateRequest {
  return {
    assetId: ""
  };
}
export const QueryGetAssetStateRequest = {
  typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateRequest",
  encode(message: QueryGetAssetStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAssetStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAssetStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetAssetStateRequest>): QueryGetAssetStateRequest {
    const message = createBaseQueryGetAssetStateRequest();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: QueryGetAssetStateRequestAmino): QueryGetAssetStateRequest {
    const message = createBaseQueryGetAssetStateRequest();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: QueryGetAssetStateRequest, useInterfaces: boolean = false): QueryGetAssetStateRequestAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: QueryGetAssetStateRequestAminoMsg): QueryGetAssetStateRequest {
    return QueryGetAssetStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetAssetStateRequestProtoMsg, useInterfaces: boolean = false): QueryGetAssetStateRequest {
    return QueryGetAssetStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAssetStateRequest): Uint8Array {
    return QueryGetAssetStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAssetStateRequest): QueryGetAssetStateRequestProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateRequest",
      value: QueryGetAssetStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetAssetStateResponse(): QueryGetAssetStateResponse {
  return {
    assetState: AssetState.fromPartial({})
  };
}
export const QueryGetAssetStateResponse = {
  typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateResponse",
  encode(message: QueryGetAssetStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetState !== undefined) {
      AssetState.encode(message.assetState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAssetStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAssetStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetState = AssetState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetAssetStateResponse>): QueryGetAssetStateResponse {
    const message = createBaseQueryGetAssetStateResponse();
    message.assetState = object.assetState !== undefined && object.assetState !== null ? AssetState.fromPartial(object.assetState) : undefined;
    return message;
  },
  fromAmino(object: QueryGetAssetStateResponseAmino): QueryGetAssetStateResponse {
    const message = createBaseQueryGetAssetStateResponse();
    if (object.asset_state !== undefined && object.asset_state !== null) {
      message.assetState = AssetState.fromAmino(object.asset_state);
    }
    return message;
  },
  toAmino(message: QueryGetAssetStateResponse, useInterfaces: boolean = false): QueryGetAssetStateResponseAmino {
    const obj: any = {};
    obj.asset_state = message.assetState ? AssetState.toAmino(message.assetState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetAssetStateResponseAminoMsg): QueryGetAssetStateResponse {
    return QueryGetAssetStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetAssetStateResponseProtoMsg, useInterfaces: boolean = false): QueryGetAssetStateResponse {
    return QueryGetAssetStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAssetStateResponse): Uint8Array {
    return QueryGetAssetStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAssetStateResponse): QueryGetAssetStateResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QueryGetAssetStateResponse",
      value: QueryGetAssetStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetCPExchangeRateRequest(): QueryGetCPExchangeRateRequest {
  return {
    assetId: ""
  };
}
export const QueryGetCPExchangeRateRequest = {
  typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateRequest",
  encode(message: QueryGetCPExchangeRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetCPExchangeRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCPExchangeRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetCPExchangeRateRequest>): QueryGetCPExchangeRateRequest {
    const message = createBaseQueryGetCPExchangeRateRequest();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: QueryGetCPExchangeRateRequestAmino): QueryGetCPExchangeRateRequest {
    const message = createBaseQueryGetCPExchangeRateRequest();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: QueryGetCPExchangeRateRequest, useInterfaces: boolean = false): QueryGetCPExchangeRateRequestAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: QueryGetCPExchangeRateRequestAminoMsg): QueryGetCPExchangeRateRequest {
    return QueryGetCPExchangeRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetCPExchangeRateRequestProtoMsg, useInterfaces: boolean = false): QueryGetCPExchangeRateRequest {
    return QueryGetCPExchangeRateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetCPExchangeRateRequest): Uint8Array {
    return QueryGetCPExchangeRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetCPExchangeRateRequest): QueryGetCPExchangeRateRequestProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateRequest",
      value: QueryGetCPExchangeRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetCPExchangeRateResponse(): QueryGetCPExchangeRateResponse {
  return {
    exchangeRate: ""
  };
}
export const QueryGetCPExchangeRateResponse = {
  typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateResponse",
  encode(message: QueryGetCPExchangeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.exchangeRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.exchangeRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetCPExchangeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCPExchangeRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetCPExchangeRateResponse>): QueryGetCPExchangeRateResponse {
    const message = createBaseQueryGetCPExchangeRateResponse();
    message.exchangeRate = object.exchangeRate ?? "";
    return message;
  },
  fromAmino(object: QueryGetCPExchangeRateResponseAmino): QueryGetCPExchangeRateResponse {
    const message = createBaseQueryGetCPExchangeRateResponse();
    if (object.exchange_rate !== undefined && object.exchange_rate !== null) {
      message.exchangeRate = object.exchange_rate;
    }
    return message;
  },
  toAmino(message: QueryGetCPExchangeRateResponse, useInterfaces: boolean = false): QueryGetCPExchangeRateResponseAmino {
    const obj: any = {};
    obj.exchange_rate = message.exchangeRate === "" ? undefined : message.exchangeRate;
    return obj;
  },
  fromAminoMsg(object: QueryGetCPExchangeRateResponseAminoMsg): QueryGetCPExchangeRateResponse {
    return QueryGetCPExchangeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetCPExchangeRateResponseProtoMsg, useInterfaces: boolean = false): QueryGetCPExchangeRateResponse {
    return QueryGetCPExchangeRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetCPExchangeRateResponse): Uint8Array {
    return QueryGetCPExchangeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetCPExchangeRateResponse): QueryGetCPExchangeRateResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QueryGetCPExchangeRateResponse",
      value: QueryGetCPExchangeRateResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRefractRequest(): QuerySimulateRefractRequest {
  return {
    amount: Coin.fromPartial({}),
    maturity: ""
  };
}
export const QuerySimulateRefractRequest = {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractRequest",
  encode(message: QuerySimulateRefractRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.maturity !== "") {
      writer.uint32(18).string(message.maturity);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateRefractRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRefractRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.maturity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateRefractRequest>): QuerySimulateRefractRequest {
    const message = createBaseQuerySimulateRefractRequest();
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.maturity = object.maturity ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateRefractRequestAmino): QuerySimulateRefractRequest {
    const message = createBaseQuerySimulateRefractRequest();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = object.maturity;
    }
    return message;
  },
  toAmino(message: QuerySimulateRefractRequest, useInterfaces: boolean = false): QuerySimulateRefractRequestAmino {
    const obj: any = {};
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.maturity = message.maturity === "" ? undefined : message.maturity;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRefractRequestAminoMsg): QuerySimulateRefractRequest {
    return QuerySimulateRefractRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRefractRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateRefractRequest {
    return QuerySimulateRefractRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateRefractRequest): Uint8Array {
    return QuerySimulateRefractRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRefractRequest): QuerySimulateRefractRequestProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractRequest",
      value: QuerySimulateRefractRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRefractResponse(): QuerySimulateRefractResponse {
  return {
    pAmount: Coin.fromPartial({}),
    yAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const QuerySimulateRefractResponse = {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractResponse",
  encode(message: QuerySimulateRefractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pAmount !== undefined) {
      Coin.encode(message.pAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.yAmount !== undefined) {
      Coin.encode(message.yAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateRefractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRefractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.yAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateRefractResponse>): QuerySimulateRefractResponse {
    const message = createBaseQuerySimulateRefractResponse();
    message.pAmount = object.pAmount !== undefined && object.pAmount !== null ? Coin.fromPartial(object.pAmount) : undefined;
    message.yAmount = object.yAmount !== undefined && object.yAmount !== null ? Coin.fromPartial(object.yAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateRefractResponseAmino): QuerySimulateRefractResponse {
    const message = createBaseQuerySimulateRefractResponse();
    if (object.p_amount !== undefined && object.p_amount !== null) {
      message.pAmount = Coin.fromAmino(object.p_amount);
    }
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = Coin.fromAmino(object.y_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: QuerySimulateRefractResponse, useInterfaces: boolean = false): QuerySimulateRefractResponseAmino {
    const obj: any = {};
    obj.p_amount = message.pAmount ? Coin.toAmino(message.pAmount, useInterfaces) : undefined;
    obj.y_amount = message.yAmount ? Coin.toAmino(message.yAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRefractResponseAminoMsg): QuerySimulateRefractResponse {
    return QuerySimulateRefractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRefractResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateRefractResponse {
    return QuerySimulateRefractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateRefractResponse): Uint8Array {
    return QuerySimulateRefractResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRefractResponse): QuerySimulateRefractResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QuerySimulateRefractResponse",
      value: QuerySimulateRefractResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRedeemRequest(): QuerySimulateRedeemRequest {
  return {
    pAmount: Coin.fromPartial({}),
    yAmount: undefined
  };
}
export const QuerySimulateRedeemRequest = {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemRequest",
  encode(message: QuerySimulateRedeemRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pAmount !== undefined) {
      Coin.encode(message.pAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.yAmount !== undefined) {
      Coin.encode(message.yAmount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateRedeemRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRedeemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.yAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateRedeemRequest>): QuerySimulateRedeemRequest {
    const message = createBaseQuerySimulateRedeemRequest();
    message.pAmount = object.pAmount !== undefined && object.pAmount !== null ? Coin.fromPartial(object.pAmount) : undefined;
    message.yAmount = object.yAmount !== undefined && object.yAmount !== null ? Coin.fromPartial(object.yAmount) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateRedeemRequestAmino): QuerySimulateRedeemRequest {
    const message = createBaseQuerySimulateRedeemRequest();
    if (object.p_amount !== undefined && object.p_amount !== null) {
      message.pAmount = Coin.fromAmino(object.p_amount);
    }
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = Coin.fromAmino(object.y_amount);
    }
    return message;
  },
  toAmino(message: QuerySimulateRedeemRequest, useInterfaces: boolean = false): QuerySimulateRedeemRequestAmino {
    const obj: any = {};
    obj.p_amount = message.pAmount ? Coin.toAmino(message.pAmount, useInterfaces) : undefined;
    obj.y_amount = message.yAmount ? Coin.toAmino(message.yAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRedeemRequestAminoMsg): QuerySimulateRedeemRequest {
    return QuerySimulateRedeemRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRedeemRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateRedeemRequest {
    return QuerySimulateRedeemRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateRedeemRequest): Uint8Array {
    return QuerySimulateRedeemRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRedeemRequest): QuerySimulateRedeemRequestProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemRequest",
      value: QuerySimulateRedeemRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRedeemResponse(): QuerySimulateRedeemResponse {
  return {
    cAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const QuerySimulateRedeemResponse = {
  typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemResponse",
  encode(message: QuerySimulateRedeemResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateRedeemResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRedeemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateRedeemResponse>): QuerySimulateRedeemResponse {
    const message = createBaseQuerySimulateRedeemResponse();
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateRedeemResponseAmino): QuerySimulateRedeemResponse {
    const message = createBaseQuerySimulateRedeemResponse();
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: QuerySimulateRedeemResponse, useInterfaces: boolean = false): QuerySimulateRedeemResponseAmino {
    const obj: any = {};
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRedeemResponseAminoMsg): QuerySimulateRedeemResponse {
    return QuerySimulateRedeemResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRedeemResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateRedeemResponse {
    return QuerySimulateRedeemResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateRedeemResponse): Uint8Array {
    return QuerySimulateRedeemResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRedeemResponse): QuerySimulateRedeemResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.QuerySimulateRedeemResponse",
      value: QuerySimulateRedeemResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pryzm.refractor.v1.QueryParamsRequest",
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
      typeUrl: "/pryzm.refractor.v1.QueryParamsRequest",
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
  typeUrl: "/pryzm.refractor.v1.QueryParamsResponse",
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
      typeUrl: "/pryzm.refractor.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
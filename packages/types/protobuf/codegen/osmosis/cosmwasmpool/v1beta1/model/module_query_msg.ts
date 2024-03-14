import { Coin, CoinAmino, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { Decimal } from "@cosmjs/math";
/** ===================== CalcOutAmtGivenIn */
export interface CalcOutAmtGivenIn {
  /** token_in is the token to be sent to the pool. */
  tokenIn: Coin | undefined;
  /** token_out_denom is the token denom to be received from the pool. */
  tokenOutDenom: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}
export interface CalcOutAmtGivenInProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenIn";
  value: Uint8Array;
}
/** ===================== CalcOutAmtGivenIn */
export interface CalcOutAmtGivenInAmino {
  /** token_in is the token to be sent to the pool. */
  token_in?: CoinAmino | undefined;
  /** token_out_denom is the token denom to be received from the pool. */
  token_out_denom?: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swap_fee?: string;
}
export interface CalcOutAmtGivenInAminoMsg {
  type: "osmosis/cosmwasmpool/calc-out-amt-given-in";
  value: CalcOutAmtGivenInAmino;
}
/** ===================== CalcOutAmtGivenIn */
export interface CalcOutAmtGivenInSDKType {
  token_in: CoinSDKType | undefined;
  token_out_denom: string;
  swap_fee: string;
}
export interface CalcOutAmtGivenInRequest {
  /**
   * calc_out_amt_given_in is the structure containing all the request
   * information for this query.
   */
  calcOutAmtGivenIn: CalcOutAmtGivenIn | undefined;
}
export interface CalcOutAmtGivenInRequestProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInRequest";
  value: Uint8Array;
}
export interface CalcOutAmtGivenInRequestAmino {
  /**
   * calc_out_amt_given_in is the structure containing all the request
   * information for this query.
   */
  calc_out_amt_given_in?: CalcOutAmtGivenInAmino | undefined;
}
export interface CalcOutAmtGivenInRequestAminoMsg {
  type: "osmosis/cosmwasmpool/calc-out-amt-given-in-request";
  value: CalcOutAmtGivenInRequestAmino;
}
export interface CalcOutAmtGivenInRequestSDKType {
  calc_out_amt_given_in: CalcOutAmtGivenInSDKType | undefined;
}
export interface CalcOutAmtGivenInResponse {
  /** token_out is the token out computed from this swap estimate call. */
  tokenOut: Coin | undefined;
}
export interface CalcOutAmtGivenInResponseProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInResponse";
  value: Uint8Array;
}
export interface CalcOutAmtGivenInResponseAmino {
  /** token_out is the token out computed from this swap estimate call. */
  token_out?: CoinAmino | undefined;
}
export interface CalcOutAmtGivenInResponseAminoMsg {
  type: "osmosis/cosmwasmpool/calc-out-amt-given-in-response";
  value: CalcOutAmtGivenInResponseAmino;
}
export interface CalcOutAmtGivenInResponseSDKType {
  token_out: CoinSDKType | undefined;
}
/** ===================== CalcInAmtGivenOut */
export interface CalcInAmtGivenOut {
  /** token_out is the token out to be receoved from the pool. */
  tokenOut: Coin | undefined;
  /** token_in_denom is the token denom to be sentt to the pool. */
  tokenInDenom: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}
export interface CalcInAmtGivenOutProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOut";
  value: Uint8Array;
}
/** ===================== CalcInAmtGivenOut */
export interface CalcInAmtGivenOutAmino {
  /** token_out is the token out to be receoved from the pool. */
  token_out?: CoinAmino | undefined;
  /** token_in_denom is the token denom to be sentt to the pool. */
  token_in_denom?: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swap_fee?: string;
}
export interface CalcInAmtGivenOutAminoMsg {
  type: "osmosis/cosmwasmpool/calc-in-amt-given-out";
  value: CalcInAmtGivenOutAmino;
}
/** ===================== CalcInAmtGivenOut */
export interface CalcInAmtGivenOutSDKType {
  token_out: CoinSDKType | undefined;
  token_in_denom: string;
  swap_fee: string;
}
export interface CalcInAmtGivenOutRequest {
  /**
   * calc_in_amt_given_out is the structure containing all the request
   * information for this query.
   */
  calcInAmtGivenOut: CalcInAmtGivenOut | undefined;
}
export interface CalcInAmtGivenOutRequestProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutRequest";
  value: Uint8Array;
}
export interface CalcInAmtGivenOutRequestAmino {
  /**
   * calc_in_amt_given_out is the structure containing all the request
   * information for this query.
   */
  calc_in_amt_given_out?: CalcInAmtGivenOutAmino | undefined;
}
export interface CalcInAmtGivenOutRequestAminoMsg {
  type: "osmosis/cosmwasmpool/calc-in-amt-given-out-request";
  value: CalcInAmtGivenOutRequestAmino;
}
export interface CalcInAmtGivenOutRequestSDKType {
  calc_in_amt_given_out: CalcInAmtGivenOutSDKType | undefined;
}
export interface CalcInAmtGivenOutResponse {
  /** token_in is the token in computed from this swap estimate call. */
  tokenIn: Coin | undefined;
}
export interface CalcInAmtGivenOutResponseProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutResponse";
  value: Uint8Array;
}
export interface CalcInAmtGivenOutResponseAmino {
  /** token_in is the token in computed from this swap estimate call. */
  token_in?: CoinAmino | undefined;
}
export interface CalcInAmtGivenOutResponseAminoMsg {
  type: "osmosis/cosmwasmpool/calc-in-amt-given-out-response";
  value: CalcInAmtGivenOutResponseAmino;
}
export interface CalcInAmtGivenOutResponseSDKType {
  token_in: CoinSDKType | undefined;
}
function createBaseCalcOutAmtGivenIn(): CalcOutAmtGivenIn {
  return {
    tokenIn: Coin.fromPartial({}),
    tokenOutDenom: "",
    swapFee: ""
  };
}
export const CalcOutAmtGivenIn = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenIn",
  encode(message: CalcOutAmtGivenIn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(18).string(message.tokenOutDenom);
    }
    if (message.swapFee !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.swapFee, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcOutAmtGivenIn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.tokenOutDenom = reader.string();
          break;
        case 3:
          message.swapFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcOutAmtGivenIn>): CalcOutAmtGivenIn {
    const message = createBaseCalcOutAmtGivenIn();
    message.tokenIn = object.tokenIn !== undefined && object.tokenIn !== null ? Coin.fromPartial(object.tokenIn) : undefined;
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
  fromAmino(object: CalcOutAmtGivenInAmino): CalcOutAmtGivenIn {
    const message = createBaseCalcOutAmtGivenIn();
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = Coin.fromAmino(object.token_in);
    }
    if (object.token_out_denom !== undefined && object.token_out_denom !== null) {
      message.tokenOutDenom = object.token_out_denom;
    }
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = object.swap_fee;
    }
    return message;
  },
  toAmino(message: CalcOutAmtGivenIn, useInterfaces: boolean = false): CalcOutAmtGivenInAmino {
    const obj: any = {};
    obj.token_in = message.tokenIn ? Coin.toAmino(message.tokenIn, useInterfaces) : undefined;
    obj.token_out_denom = message.tokenOutDenom;
    obj.swap_fee = message.swapFee;
    return obj;
  },
  fromAminoMsg(object: CalcOutAmtGivenInAminoMsg): CalcOutAmtGivenIn {
    return CalcOutAmtGivenIn.fromAmino(object.value);
  },
  toAminoMsg(message: CalcOutAmtGivenIn, useInterfaces: boolean = false): CalcOutAmtGivenInAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-out-amt-given-in",
      value: CalcOutAmtGivenIn.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcOutAmtGivenInProtoMsg, useInterfaces: boolean = false): CalcOutAmtGivenIn {
    return CalcOutAmtGivenIn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcOutAmtGivenIn): Uint8Array {
    return CalcOutAmtGivenIn.encode(message).finish();
  },
  toProtoMsg(message: CalcOutAmtGivenIn): CalcOutAmtGivenInProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenIn",
      value: CalcOutAmtGivenIn.encode(message).finish()
    };
  }
};
function createBaseCalcOutAmtGivenInRequest(): CalcOutAmtGivenInRequest {
  return {
    calcOutAmtGivenIn: CalcOutAmtGivenIn.fromPartial({})
  };
}
export const CalcOutAmtGivenInRequest = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInRequest",
  encode(message: CalcOutAmtGivenInRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.calcOutAmtGivenIn !== undefined) {
      CalcOutAmtGivenIn.encode(message.calcOutAmtGivenIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcOutAmtGivenInRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.calcOutAmtGivenIn = CalcOutAmtGivenIn.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcOutAmtGivenInRequest>): CalcOutAmtGivenInRequest {
    const message = createBaseCalcOutAmtGivenInRequest();
    message.calcOutAmtGivenIn = object.calcOutAmtGivenIn !== undefined && object.calcOutAmtGivenIn !== null ? CalcOutAmtGivenIn.fromPartial(object.calcOutAmtGivenIn) : undefined;
    return message;
  },
  fromAmino(object: CalcOutAmtGivenInRequestAmino): CalcOutAmtGivenInRequest {
    const message = createBaseCalcOutAmtGivenInRequest();
    if (object.calc_out_amt_given_in !== undefined && object.calc_out_amt_given_in !== null) {
      message.calcOutAmtGivenIn = CalcOutAmtGivenIn.fromAmino(object.calc_out_amt_given_in);
    }
    return message;
  },
  toAmino(message: CalcOutAmtGivenInRequest, useInterfaces: boolean = false): CalcOutAmtGivenInRequestAmino {
    const obj: any = {};
    obj.calc_out_amt_given_in = message.calcOutAmtGivenIn ? CalcOutAmtGivenIn.toAmino(message.calcOutAmtGivenIn, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CalcOutAmtGivenInRequestAminoMsg): CalcOutAmtGivenInRequest {
    return CalcOutAmtGivenInRequest.fromAmino(object.value);
  },
  toAminoMsg(message: CalcOutAmtGivenInRequest, useInterfaces: boolean = false): CalcOutAmtGivenInRequestAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-out-amt-given-in-request",
      value: CalcOutAmtGivenInRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcOutAmtGivenInRequestProtoMsg, useInterfaces: boolean = false): CalcOutAmtGivenInRequest {
    return CalcOutAmtGivenInRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcOutAmtGivenInRequest): Uint8Array {
    return CalcOutAmtGivenInRequest.encode(message).finish();
  },
  toProtoMsg(message: CalcOutAmtGivenInRequest): CalcOutAmtGivenInRequestProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInRequest",
      value: CalcOutAmtGivenInRequest.encode(message).finish()
    };
  }
};
function createBaseCalcOutAmtGivenInResponse(): CalcOutAmtGivenInResponse {
  return {
    tokenOut: Coin.fromPartial({})
  };
}
export const CalcOutAmtGivenInResponse = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInResponse",
  encode(message: CalcOutAmtGivenInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcOutAmtGivenInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcOutAmtGivenInResponse>): CalcOutAmtGivenInResponse {
    const message = createBaseCalcOutAmtGivenInResponse();
    message.tokenOut = object.tokenOut !== undefined && object.tokenOut !== null ? Coin.fromPartial(object.tokenOut) : undefined;
    return message;
  },
  fromAmino(object: CalcOutAmtGivenInResponseAmino): CalcOutAmtGivenInResponse {
    const message = createBaseCalcOutAmtGivenInResponse();
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = Coin.fromAmino(object.token_out);
    }
    return message;
  },
  toAmino(message: CalcOutAmtGivenInResponse, useInterfaces: boolean = false): CalcOutAmtGivenInResponseAmino {
    const obj: any = {};
    obj.token_out = message.tokenOut ? Coin.toAmino(message.tokenOut, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CalcOutAmtGivenInResponseAminoMsg): CalcOutAmtGivenInResponse {
    return CalcOutAmtGivenInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: CalcOutAmtGivenInResponse, useInterfaces: boolean = false): CalcOutAmtGivenInResponseAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-out-amt-given-in-response",
      value: CalcOutAmtGivenInResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcOutAmtGivenInResponseProtoMsg, useInterfaces: boolean = false): CalcOutAmtGivenInResponse {
    return CalcOutAmtGivenInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcOutAmtGivenInResponse): Uint8Array {
    return CalcOutAmtGivenInResponse.encode(message).finish();
  },
  toProtoMsg(message: CalcOutAmtGivenInResponse): CalcOutAmtGivenInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcOutAmtGivenInResponse",
      value: CalcOutAmtGivenInResponse.encode(message).finish()
    };
  }
};
function createBaseCalcInAmtGivenOut(): CalcInAmtGivenOut {
  return {
    tokenOut: Coin.fromPartial({}),
    tokenInDenom: "",
    swapFee: ""
  };
}
export const CalcInAmtGivenOut = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOut",
  encode(message: CalcInAmtGivenOut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    if (message.swapFee !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.swapFee, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcInAmtGivenOut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.tokenInDenom = reader.string();
          break;
        case 3:
          message.swapFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcInAmtGivenOut>): CalcInAmtGivenOut {
    const message = createBaseCalcInAmtGivenOut();
    message.tokenOut = object.tokenOut !== undefined && object.tokenOut !== null ? Coin.fromPartial(object.tokenOut) : undefined;
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
  fromAmino(object: CalcInAmtGivenOutAmino): CalcInAmtGivenOut {
    const message = createBaseCalcInAmtGivenOut();
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = Coin.fromAmino(object.token_out);
    }
    if (object.token_in_denom !== undefined && object.token_in_denom !== null) {
      message.tokenInDenom = object.token_in_denom;
    }
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = object.swap_fee;
    }
    return message;
  },
  toAmino(message: CalcInAmtGivenOut, useInterfaces: boolean = false): CalcInAmtGivenOutAmino {
    const obj: any = {};
    obj.token_out = message.tokenOut ? Coin.toAmino(message.tokenOut, useInterfaces) : undefined;
    obj.token_in_denom = message.tokenInDenom;
    obj.swap_fee = message.swapFee;
    return obj;
  },
  fromAminoMsg(object: CalcInAmtGivenOutAminoMsg): CalcInAmtGivenOut {
    return CalcInAmtGivenOut.fromAmino(object.value);
  },
  toAminoMsg(message: CalcInAmtGivenOut, useInterfaces: boolean = false): CalcInAmtGivenOutAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-in-amt-given-out",
      value: CalcInAmtGivenOut.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcInAmtGivenOutProtoMsg, useInterfaces: boolean = false): CalcInAmtGivenOut {
    return CalcInAmtGivenOut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcInAmtGivenOut): Uint8Array {
    return CalcInAmtGivenOut.encode(message).finish();
  },
  toProtoMsg(message: CalcInAmtGivenOut): CalcInAmtGivenOutProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOut",
      value: CalcInAmtGivenOut.encode(message).finish()
    };
  }
};
function createBaseCalcInAmtGivenOutRequest(): CalcInAmtGivenOutRequest {
  return {
    calcInAmtGivenOut: CalcInAmtGivenOut.fromPartial({})
  };
}
export const CalcInAmtGivenOutRequest = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutRequest",
  encode(message: CalcInAmtGivenOutRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.calcInAmtGivenOut !== undefined) {
      CalcInAmtGivenOut.encode(message.calcInAmtGivenOut, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcInAmtGivenOutRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.calcInAmtGivenOut = CalcInAmtGivenOut.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcInAmtGivenOutRequest>): CalcInAmtGivenOutRequest {
    const message = createBaseCalcInAmtGivenOutRequest();
    message.calcInAmtGivenOut = object.calcInAmtGivenOut !== undefined && object.calcInAmtGivenOut !== null ? CalcInAmtGivenOut.fromPartial(object.calcInAmtGivenOut) : undefined;
    return message;
  },
  fromAmino(object: CalcInAmtGivenOutRequestAmino): CalcInAmtGivenOutRequest {
    const message = createBaseCalcInAmtGivenOutRequest();
    if (object.calc_in_amt_given_out !== undefined && object.calc_in_amt_given_out !== null) {
      message.calcInAmtGivenOut = CalcInAmtGivenOut.fromAmino(object.calc_in_amt_given_out);
    }
    return message;
  },
  toAmino(message: CalcInAmtGivenOutRequest, useInterfaces: boolean = false): CalcInAmtGivenOutRequestAmino {
    const obj: any = {};
    obj.calc_in_amt_given_out = message.calcInAmtGivenOut ? CalcInAmtGivenOut.toAmino(message.calcInAmtGivenOut, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CalcInAmtGivenOutRequestAminoMsg): CalcInAmtGivenOutRequest {
    return CalcInAmtGivenOutRequest.fromAmino(object.value);
  },
  toAminoMsg(message: CalcInAmtGivenOutRequest, useInterfaces: boolean = false): CalcInAmtGivenOutRequestAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-in-amt-given-out-request",
      value: CalcInAmtGivenOutRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcInAmtGivenOutRequestProtoMsg, useInterfaces: boolean = false): CalcInAmtGivenOutRequest {
    return CalcInAmtGivenOutRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcInAmtGivenOutRequest): Uint8Array {
    return CalcInAmtGivenOutRequest.encode(message).finish();
  },
  toProtoMsg(message: CalcInAmtGivenOutRequest): CalcInAmtGivenOutRequestProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutRequest",
      value: CalcInAmtGivenOutRequest.encode(message).finish()
    };
  }
};
function createBaseCalcInAmtGivenOutResponse(): CalcInAmtGivenOutResponse {
  return {
    tokenIn: Coin.fromPartial({})
  };
}
export const CalcInAmtGivenOutResponse = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutResponse",
  encode(message: CalcInAmtGivenOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CalcInAmtGivenOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CalcInAmtGivenOutResponse>): CalcInAmtGivenOutResponse {
    const message = createBaseCalcInAmtGivenOutResponse();
    message.tokenIn = object.tokenIn !== undefined && object.tokenIn !== null ? Coin.fromPartial(object.tokenIn) : undefined;
    return message;
  },
  fromAmino(object: CalcInAmtGivenOutResponseAmino): CalcInAmtGivenOutResponse {
    const message = createBaseCalcInAmtGivenOutResponse();
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = Coin.fromAmino(object.token_in);
    }
    return message;
  },
  toAmino(message: CalcInAmtGivenOutResponse, useInterfaces: boolean = false): CalcInAmtGivenOutResponseAmino {
    const obj: any = {};
    obj.token_in = message.tokenIn ? Coin.toAmino(message.tokenIn, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CalcInAmtGivenOutResponseAminoMsg): CalcInAmtGivenOutResponse {
    return CalcInAmtGivenOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: CalcInAmtGivenOutResponse, useInterfaces: boolean = false): CalcInAmtGivenOutResponseAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/calc-in-amt-given-out-response",
      value: CalcInAmtGivenOutResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: CalcInAmtGivenOutResponseProtoMsg, useInterfaces: boolean = false): CalcInAmtGivenOutResponse {
    return CalcInAmtGivenOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CalcInAmtGivenOutResponse): Uint8Array {
    return CalcInAmtGivenOutResponse.encode(message).finish();
  },
  toProtoMsg(message: CalcInAmtGivenOutResponse): CalcInAmtGivenOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.CalcInAmtGivenOutResponse",
      value: CalcInAmtGivenOutResponse.encode(message).finish()
    };
  }
};
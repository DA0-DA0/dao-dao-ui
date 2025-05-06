//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { PaymentSchedule, PaymentScheduleAmino, PaymentScheduleSDKType, ValidatorInfo, ValidatorInfoAmino, ValidatorInfoSDKType } from "./genesis";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.revenue.QueryParamsRequest";
  value: Uint8Array;
}
/** Request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.revenue.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** Request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** Response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** Contains all parameters of the module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/neutron.revenue.QueryParamsResponse";
  value: Uint8Array;
}
/** Response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** Contains all parameters of the module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.revenue.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** Response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** Request type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoRequest {}
export interface QueryPaymentInfoRequestProtoMsg {
  typeUrl: "/neutron.revenue.QueryPaymentInfoRequest";
  value: Uint8Array;
}
/** Request type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoRequestAmino {}
export interface QueryPaymentInfoRequestAminoMsg {
  type: "/neutron.revenue.QueryPaymentInfoRequest";
  value: QueryPaymentInfoRequestAmino;
}
/** Request type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoRequestSDKType {}
/** Response type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoResponse {
  /** The current payment schedule. */
  paymentSchedule: PaymentSchedule | undefined;
  /** Revenue amount multiplier value that corresponds to the effective payment period progress. */
  effectivePeriodProgress: string;
  /**
   * The current TWAP of the reward asset in quote asset. Is calculated as:
   * twap_from_time_t(n)_to_time_t(m) = (cumulative_price_at_t(n) - cumulative_price_at_t(m)) / (t(n) - t(m))
   */
  rewardAssetTwap: string;
  /**
   * The current evaluation of the base revenue amount. This is the maximum amount a validator can
   * receive in the current price condition if not affected with reducing factors (e.g. imperfect
   * performance, incomplete payment period, partial validator set presence).
   */
  baseRevenueAmount: Coin | undefined;
}
export interface QueryPaymentInfoResponseProtoMsg {
  typeUrl: "/neutron.revenue.QueryPaymentInfoResponse";
  value: Uint8Array;
}
/** Response type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoResponseAmino {
  /** The current payment schedule. */
  payment_schedule?: PaymentScheduleAmino | undefined;
  /** Revenue amount multiplier value that corresponds to the effective payment period progress. */
  effective_period_progress?: string;
  /**
   * The current TWAP of the reward asset in quote asset. Is calculated as:
   * twap_from_time_t(n)_to_time_t(m) = (cumulative_price_at_t(n) - cumulative_price_at_t(m)) / (t(n) - t(m))
   */
  reward_asset_twap?: string;
  /**
   * The current evaluation of the base revenue amount. This is the maximum amount a validator can
   * receive in the current price condition if not affected with reducing factors (e.g. imperfect
   * performance, incomplete payment period, partial validator set presence).
   */
  base_revenue_amount?: CoinAmino | undefined;
}
export interface QueryPaymentInfoResponseAminoMsg {
  type: "/neutron.revenue.QueryPaymentInfoResponse";
  value: QueryPaymentInfoResponseAmino;
}
/** Response type for the Query/PaymentInfo RPC method. */
export interface QueryPaymentInfoResponseSDKType {
  payment_schedule: PaymentScheduleSDKType | undefined;
  effective_period_progress: string;
  reward_asset_twap: string;
  base_revenue_amount: CoinSDKType | undefined;
}
/** Request type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsRequest {
  /** The validator's node operator address. */
  valOperAddress: string;
}
export interface QueryValidatorStatsRequestProtoMsg {
  typeUrl: "/neutron.revenue.QueryValidatorStatsRequest";
  value: Uint8Array;
}
/** Request type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsRequestAmino {
  /** The validator's node operator address. */
  val_oper_address?: string;
}
export interface QueryValidatorStatsRequestAminoMsg {
  type: "/neutron.revenue.QueryValidatorStatsRequest";
  value: QueryValidatorStatsRequestAmino;
}
/** Request type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsRequestSDKType {
  val_oper_address: string;
}
/** Response type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsResponse {
  /** Contains the validator's information. */
  stats: ValidatorStats | undefined;
}
export interface QueryValidatorStatsResponseProtoMsg {
  typeUrl: "/neutron.revenue.QueryValidatorStatsResponse";
  value: Uint8Array;
}
/** Response type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsResponseAmino {
  /** Contains the validator's information. */
  stats?: ValidatorStatsAmino | undefined;
}
export interface QueryValidatorStatsResponseAminoMsg {
  type: "/neutron.revenue.QueryValidatorStatsResponse";
  value: QueryValidatorStatsResponseAmino;
}
/** Response type for the Query/ValidatorStats RPC method. */
export interface QueryValidatorStatsResponseSDKType {
  stats: ValidatorStatsSDKType | undefined;
}
/** Request type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsRequest {}
export interface QueryValidatorsStatsRequestProtoMsg {
  typeUrl: "/neutron.revenue.QueryValidatorsStatsRequest";
  value: Uint8Array;
}
/** Request type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsRequestAmino {}
export interface QueryValidatorsStatsRequestAminoMsg {
  type: "/neutron.revenue.QueryValidatorsStatsRequest";
  value: QueryValidatorsStatsRequestAmino;
}
/** Request type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsRequestSDKType {}
/** Response type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsResponse {
  /** Contains the validators' information. */
  stats: ValidatorStats[];
}
export interface QueryValidatorsStatsResponseProtoMsg {
  typeUrl: "/neutron.revenue.QueryValidatorsStatsResponse";
  value: Uint8Array;
}
/** Response type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsResponseAmino {
  /** Contains the validators' information. */
  stats?: ValidatorStatsAmino[];
}
export interface QueryValidatorsStatsResponseAminoMsg {
  type: "/neutron.revenue.QueryValidatorsStatsResponse";
  value: QueryValidatorsStatsResponseAmino;
}
/** Response type for the Query/ValidatorsStats RPC method. */
export interface QueryValidatorsStatsResponseSDKType {
  stats: ValidatorStatsSDKType[];
}
/** Contains validator's info and their performance rating. */
export interface ValidatorStats {
  /** Contains the validator's information. */
  validatorInfo: ValidatorInfo | undefined;
  /** The total number of blocks produced by the chain in the current payment period. */
  totalProducedBlocksInPeriod: bigint;
  /** The validator's performance rating. Represented as a decimal value. */
  performanceRating: string;
  /**
   * Contains expected revenue for the validator based on their performance rating in the current
   * payment period, current reward asset TWAP, and duration of validator's presence in the active
   * validator set. Does not take into account effective payment period progress.
   */
  expectedRevenue: Coin | undefined;
}
export interface ValidatorStatsProtoMsg {
  typeUrl: "/neutron.revenue.ValidatorStats";
  value: Uint8Array;
}
/** Contains validator's info and their performance rating. */
export interface ValidatorStatsAmino {
  /** Contains the validator's information. */
  validator_info?: ValidatorInfoAmino | undefined;
  /** The total number of blocks produced by the chain in the current payment period. */
  total_produced_blocks_in_period?: string;
  /** The validator's performance rating. Represented as a decimal value. */
  performance_rating?: string;
  /**
   * Contains expected revenue for the validator based on their performance rating in the current
   * payment period, current reward asset TWAP, and duration of validator's presence in the active
   * validator set. Does not take into account effective payment period progress.
   */
  expected_revenue?: CoinAmino | undefined;
}
export interface ValidatorStatsAminoMsg {
  type: "/neutron.revenue.ValidatorStats";
  value: ValidatorStatsAmino;
}
/** Contains validator's info and their performance rating. */
export interface ValidatorStatsSDKType {
  validator_info: ValidatorInfoSDKType | undefined;
  total_produced_blocks_in_period: bigint;
  performance_rating: string;
  expected_revenue: CoinSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.revenue.QueryParamsRequest",
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
      typeUrl: "/neutron.revenue.QueryParamsRequest",
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
  typeUrl: "/neutron.revenue.QueryParamsResponse",
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
      typeUrl: "/neutron.revenue.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPaymentInfoRequest(): QueryPaymentInfoRequest {
  return {};
}
export const QueryPaymentInfoRequest = {
  typeUrl: "/neutron.revenue.QueryPaymentInfoRequest",
  encode(_: QueryPaymentInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryPaymentInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPaymentInfoRequest();
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
  fromPartial(_: Partial<QueryPaymentInfoRequest>): QueryPaymentInfoRequest {
    const message = createBaseQueryPaymentInfoRequest();
    return message;
  },
  fromAmino(_: QueryPaymentInfoRequestAmino): QueryPaymentInfoRequest {
    const message = createBaseQueryPaymentInfoRequest();
    return message;
  },
  toAmino(_: QueryPaymentInfoRequest, useInterfaces: boolean = false): QueryPaymentInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryPaymentInfoRequestAminoMsg): QueryPaymentInfoRequest {
    return QueryPaymentInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPaymentInfoRequestProtoMsg, useInterfaces: boolean = false): QueryPaymentInfoRequest {
    return QueryPaymentInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryPaymentInfoRequest): Uint8Array {
    return QueryPaymentInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPaymentInfoRequest): QueryPaymentInfoRequestProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryPaymentInfoRequest",
      value: QueryPaymentInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPaymentInfoResponse(): QueryPaymentInfoResponse {
  return {
    paymentSchedule: PaymentSchedule.fromPartial({}),
    effectivePeriodProgress: "",
    rewardAssetTwap: "",
    baseRevenueAmount: Coin.fromPartial({})
  };
}
export const QueryPaymentInfoResponse = {
  typeUrl: "/neutron.revenue.QueryPaymentInfoResponse",
  encode(message: QueryPaymentInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paymentSchedule !== undefined) {
      PaymentSchedule.encode(message.paymentSchedule, writer.uint32(10).fork()).ldelim();
    }
    if (message.effectivePeriodProgress !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.effectivePeriodProgress, 18).atomics);
    }
    if (message.rewardAssetTwap !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rewardAssetTwap, 18).atomics);
    }
    if (message.baseRevenueAmount !== undefined) {
      Coin.encode(message.baseRevenueAmount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryPaymentInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPaymentInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentSchedule = PaymentSchedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.effectivePeriodProgress = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.rewardAssetTwap = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.baseRevenueAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPaymentInfoResponse>): QueryPaymentInfoResponse {
    const message = createBaseQueryPaymentInfoResponse();
    message.paymentSchedule = object.paymentSchedule !== undefined && object.paymentSchedule !== null ? PaymentSchedule.fromPartial(object.paymentSchedule) : undefined;
    message.effectivePeriodProgress = object.effectivePeriodProgress ?? "";
    message.rewardAssetTwap = object.rewardAssetTwap ?? "";
    message.baseRevenueAmount = object.baseRevenueAmount !== undefined && object.baseRevenueAmount !== null ? Coin.fromPartial(object.baseRevenueAmount) : undefined;
    return message;
  },
  fromAmino(object: QueryPaymentInfoResponseAmino): QueryPaymentInfoResponse {
    const message = createBaseQueryPaymentInfoResponse();
    if (object.payment_schedule !== undefined && object.payment_schedule !== null) {
      message.paymentSchedule = PaymentSchedule.fromAmino(object.payment_schedule);
    }
    if (object.effective_period_progress !== undefined && object.effective_period_progress !== null) {
      message.effectivePeriodProgress = object.effective_period_progress;
    }
    if (object.reward_asset_twap !== undefined && object.reward_asset_twap !== null) {
      message.rewardAssetTwap = object.reward_asset_twap;
    }
    if (object.base_revenue_amount !== undefined && object.base_revenue_amount !== null) {
      message.baseRevenueAmount = Coin.fromAmino(object.base_revenue_amount);
    }
    return message;
  },
  toAmino(message: QueryPaymentInfoResponse, useInterfaces: boolean = false): QueryPaymentInfoResponseAmino {
    const obj: any = {};
    obj.payment_schedule = message.paymentSchedule ? PaymentSchedule.toAmino(message.paymentSchedule, useInterfaces) : undefined;
    obj.effective_period_progress = message.effectivePeriodProgress === "" ? undefined : message.effectivePeriodProgress;
    obj.reward_asset_twap = message.rewardAssetTwap === "" ? undefined : message.rewardAssetTwap;
    obj.base_revenue_amount = message.baseRevenueAmount ? Coin.toAmino(message.baseRevenueAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPaymentInfoResponseAminoMsg): QueryPaymentInfoResponse {
    return QueryPaymentInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPaymentInfoResponseProtoMsg, useInterfaces: boolean = false): QueryPaymentInfoResponse {
    return QueryPaymentInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryPaymentInfoResponse): Uint8Array {
    return QueryPaymentInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPaymentInfoResponse): QueryPaymentInfoResponseProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryPaymentInfoResponse",
      value: QueryPaymentInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorStatsRequest(): QueryValidatorStatsRequest {
  return {
    valOperAddress: ""
  };
}
export const QueryValidatorStatsRequest = {
  typeUrl: "/neutron.revenue.QueryValidatorStatsRequest",
  encode(message: QueryValidatorStatsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valOperAddress !== "") {
      writer.uint32(10).string(message.valOperAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorStatsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorStatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valOperAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorStatsRequest>): QueryValidatorStatsRequest {
    const message = createBaseQueryValidatorStatsRequest();
    message.valOperAddress = object.valOperAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorStatsRequestAmino): QueryValidatorStatsRequest {
    const message = createBaseQueryValidatorStatsRequest();
    if (object.val_oper_address !== undefined && object.val_oper_address !== null) {
      message.valOperAddress = object.val_oper_address;
    }
    return message;
  },
  toAmino(message: QueryValidatorStatsRequest, useInterfaces: boolean = false): QueryValidatorStatsRequestAmino {
    const obj: any = {};
    obj.val_oper_address = message.valOperAddress === "" ? undefined : message.valOperAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorStatsRequestAminoMsg): QueryValidatorStatsRequest {
    return QueryValidatorStatsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorStatsRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorStatsRequest {
    return QueryValidatorStatsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorStatsRequest): Uint8Array {
    return QueryValidatorStatsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorStatsRequest): QueryValidatorStatsRequestProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryValidatorStatsRequest",
      value: QueryValidatorStatsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorStatsResponse(): QueryValidatorStatsResponse {
  return {
    stats: ValidatorStats.fromPartial({})
  };
}
export const QueryValidatorStatsResponse = {
  typeUrl: "/neutron.revenue.QueryValidatorStatsResponse",
  encode(message: QueryValidatorStatsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stats !== undefined) {
      ValidatorStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorStatsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stats = ValidatorStats.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorStatsResponse>): QueryValidatorStatsResponse {
    const message = createBaseQueryValidatorStatsResponse();
    message.stats = object.stats !== undefined && object.stats !== null ? ValidatorStats.fromPartial(object.stats) : undefined;
    return message;
  },
  fromAmino(object: QueryValidatorStatsResponseAmino): QueryValidatorStatsResponse {
    const message = createBaseQueryValidatorStatsResponse();
    if (object.stats !== undefined && object.stats !== null) {
      message.stats = ValidatorStats.fromAmino(object.stats);
    }
    return message;
  },
  toAmino(message: QueryValidatorStatsResponse, useInterfaces: boolean = false): QueryValidatorStatsResponseAmino {
    const obj: any = {};
    obj.stats = message.stats ? ValidatorStats.toAmino(message.stats, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorStatsResponseAminoMsg): QueryValidatorStatsResponse {
    return QueryValidatorStatsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorStatsResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorStatsResponse {
    return QueryValidatorStatsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorStatsResponse): Uint8Array {
    return QueryValidatorStatsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorStatsResponse): QueryValidatorStatsResponseProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryValidatorStatsResponse",
      value: QueryValidatorStatsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorsStatsRequest(): QueryValidatorsStatsRequest {
  return {};
}
export const QueryValidatorsStatsRequest = {
  typeUrl: "/neutron.revenue.QueryValidatorsStatsRequest",
  encode(_: QueryValidatorsStatsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorsStatsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorsStatsRequest();
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
  fromPartial(_: Partial<QueryValidatorsStatsRequest>): QueryValidatorsStatsRequest {
    const message = createBaseQueryValidatorsStatsRequest();
    return message;
  },
  fromAmino(_: QueryValidatorsStatsRequestAmino): QueryValidatorsStatsRequest {
    const message = createBaseQueryValidatorsStatsRequest();
    return message;
  },
  toAmino(_: QueryValidatorsStatsRequest, useInterfaces: boolean = false): QueryValidatorsStatsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryValidatorsStatsRequestAminoMsg): QueryValidatorsStatsRequest {
    return QueryValidatorsStatsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorsStatsRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorsStatsRequest {
    return QueryValidatorsStatsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorsStatsRequest): Uint8Array {
    return QueryValidatorsStatsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorsStatsRequest): QueryValidatorsStatsRequestProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryValidatorsStatsRequest",
      value: QueryValidatorsStatsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorsStatsResponse(): QueryValidatorsStatsResponse {
  return {
    stats: []
  };
}
export const QueryValidatorsStatsResponse = {
  typeUrl: "/neutron.revenue.QueryValidatorsStatsResponse",
  encode(message: QueryValidatorsStatsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.stats) {
      ValidatorStats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorsStatsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorsStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stats.push(ValidatorStats.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorsStatsResponse>): QueryValidatorsStatsResponse {
    const message = createBaseQueryValidatorsStatsResponse();
    message.stats = object.stats?.map(e => ValidatorStats.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryValidatorsStatsResponseAmino): QueryValidatorsStatsResponse {
    const message = createBaseQueryValidatorsStatsResponse();
    message.stats = object.stats?.map(e => ValidatorStats.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryValidatorsStatsResponse, useInterfaces: boolean = false): QueryValidatorsStatsResponseAmino {
    const obj: any = {};
    if (message.stats) {
      obj.stats = message.stats.map(e => e ? ValidatorStats.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.stats = message.stats;
    }
    return obj;
  },
  fromAminoMsg(object: QueryValidatorsStatsResponseAminoMsg): QueryValidatorsStatsResponse {
    return QueryValidatorsStatsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorsStatsResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorsStatsResponse {
    return QueryValidatorsStatsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorsStatsResponse): Uint8Array {
    return QueryValidatorsStatsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorsStatsResponse): QueryValidatorsStatsResponseProtoMsg {
    return {
      typeUrl: "/neutron.revenue.QueryValidatorsStatsResponse",
      value: QueryValidatorsStatsResponse.encode(message).finish()
    };
  }
};
function createBaseValidatorStats(): ValidatorStats {
  return {
    validatorInfo: ValidatorInfo.fromPartial({}),
    totalProducedBlocksInPeriod: BigInt(0),
    performanceRating: "",
    expectedRevenue: Coin.fromPartial({})
  };
}
export const ValidatorStats = {
  typeUrl: "/neutron.revenue.ValidatorStats",
  encode(message: ValidatorStats, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorInfo !== undefined) {
      ValidatorInfo.encode(message.validatorInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.totalProducedBlocksInPeriod !== BigInt(0)) {
      writer.uint32(16).uint64(message.totalProducedBlocksInPeriod);
    }
    if (message.performanceRating !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.performanceRating, 18).atomics);
    }
    if (message.expectedRevenue !== undefined) {
      Coin.encode(message.expectedRevenue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorStats {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorInfo = ValidatorInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.totalProducedBlocksInPeriod = reader.uint64();
          break;
        case 3:
          message.performanceRating = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.expectedRevenue = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorStats>): ValidatorStats {
    const message = createBaseValidatorStats();
    message.validatorInfo = object.validatorInfo !== undefined && object.validatorInfo !== null ? ValidatorInfo.fromPartial(object.validatorInfo) : undefined;
    message.totalProducedBlocksInPeriod = object.totalProducedBlocksInPeriod !== undefined && object.totalProducedBlocksInPeriod !== null ? BigInt(object.totalProducedBlocksInPeriod.toString()) : BigInt(0);
    message.performanceRating = object.performanceRating ?? "";
    message.expectedRevenue = object.expectedRevenue !== undefined && object.expectedRevenue !== null ? Coin.fromPartial(object.expectedRevenue) : undefined;
    return message;
  },
  fromAmino(object: ValidatorStatsAmino): ValidatorStats {
    const message = createBaseValidatorStats();
    if (object.validator_info !== undefined && object.validator_info !== null) {
      message.validatorInfo = ValidatorInfo.fromAmino(object.validator_info);
    }
    if (object.total_produced_blocks_in_period !== undefined && object.total_produced_blocks_in_period !== null) {
      message.totalProducedBlocksInPeriod = BigInt(object.total_produced_blocks_in_period);
    }
    if (object.performance_rating !== undefined && object.performance_rating !== null) {
      message.performanceRating = object.performance_rating;
    }
    if (object.expected_revenue !== undefined && object.expected_revenue !== null) {
      message.expectedRevenue = Coin.fromAmino(object.expected_revenue);
    }
    return message;
  },
  toAmino(message: ValidatorStats, useInterfaces: boolean = false): ValidatorStatsAmino {
    const obj: any = {};
    obj.validator_info = message.validatorInfo ? ValidatorInfo.toAmino(message.validatorInfo, useInterfaces) : undefined;
    obj.total_produced_blocks_in_period = message.totalProducedBlocksInPeriod !== BigInt(0) ? message.totalProducedBlocksInPeriod.toString() : undefined;
    obj.performance_rating = message.performanceRating === "" ? undefined : message.performanceRating;
    obj.expected_revenue = message.expectedRevenue ? Coin.toAmino(message.expectedRevenue, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorStatsAminoMsg): ValidatorStats {
    return ValidatorStats.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorStatsProtoMsg, useInterfaces: boolean = false): ValidatorStats {
    return ValidatorStats.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorStats): Uint8Array {
    return ValidatorStats.encode(message).finish();
  },
  toProtoMsg(message: ValidatorStats): ValidatorStatsProtoMsg {
    return {
      typeUrl: "/neutron.revenue.ValidatorStats",
      value: ValidatorStats.encode(message).finish()
    };
  }
};
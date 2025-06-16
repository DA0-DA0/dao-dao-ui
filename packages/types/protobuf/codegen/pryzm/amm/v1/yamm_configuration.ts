import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface YammConfiguration {
  poolId: bigint;
  lambda?: string;
  /** duration (milliseconds) for virtual balance when adding new pAssets to yamm pools */
  maturityIntroductionIntervalMillis?: string;
  maturityExpirationIntervalMillis?: string;
  introductionVirtualBalanceScaler?: string;
  expirationVirtualBalanceScaler?: string;
  /** if the value is not set, will be read from module parameters */
  buyYGivenInLoanFeeRatio?: string;
  /** if the value is not set, will be read from module parameters */
  sellYGivenOutFeeRatio?: string;
  maxAlpha?: string;
  avgMonthlyYieldRate?: string;
  yieldFeeScaler?: string;
}
export interface YammConfigurationProtoMsg {
  typeUrl: "/pryzm.amm.v1.YammConfiguration";
  value: Uint8Array;
}
export interface YammConfigurationAmino {
  pool_id: string;
  lambda?: string;
  /** duration (milliseconds) for virtual balance when adding new pAssets to yamm pools */
  maturity_introduction_interval_millis?: string;
  maturity_expiration_interval_millis?: string;
  introduction_virtual_balance_scaler?: string;
  expiration_virtual_balance_scaler?: string;
  /** if the value is not set, will be read from module parameters */
  buy_y_given_in_loan_fee_ratio?: string;
  /** if the value is not set, will be read from module parameters */
  sell_y_given_out_fee_ratio?: string;
  max_alpha?: string;
  avg_monthly_yield_rate?: string;
  yield_fee_scaler?: string;
}
export interface YammConfigurationAminoMsg {
  type: "/pryzm.amm.v1.YammConfiguration";
  value: YammConfigurationAmino;
}
export interface YammConfigurationSDKType {
  pool_id: bigint;
  lambda?: string;
  maturity_introduction_interval_millis?: string;
  maturity_expiration_interval_millis?: string;
  introduction_virtual_balance_scaler?: string;
  expiration_virtual_balance_scaler?: string;
  buy_y_given_in_loan_fee_ratio?: string;
  sell_y_given_out_fee_ratio?: string;
  max_alpha?: string;
  avg_monthly_yield_rate?: string;
  yield_fee_scaler?: string;
}
function createBaseYammConfiguration(): YammConfiguration {
  return {
    poolId: BigInt(0),
    lambda: undefined,
    maturityIntroductionIntervalMillis: undefined,
    maturityExpirationIntervalMillis: undefined,
    introductionVirtualBalanceScaler: undefined,
    expirationVirtualBalanceScaler: undefined,
    buyYGivenInLoanFeeRatio: undefined,
    sellYGivenOutFeeRatio: undefined,
    maxAlpha: undefined,
    avgMonthlyYieldRate: undefined,
    yieldFeeScaler: undefined
  };
}
export const YammConfiguration = {
  typeUrl: "/pryzm.amm.v1.YammConfiguration",
  encode(message: YammConfiguration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lambda !== undefined) {
      writer.uint32(18).string(Decimal.fromUserInput(message.lambda, 18).atomics);
    }
    if (message.maturityIntroductionIntervalMillis !== undefined) {
      writer.uint32(26).string(message.maturityIntroductionIntervalMillis);
    }
    if (message.maturityExpirationIntervalMillis !== undefined) {
      writer.uint32(34).string(message.maturityExpirationIntervalMillis);
    }
    if (message.introductionVirtualBalanceScaler !== undefined) {
      writer.uint32(42).string(Decimal.fromUserInput(message.introductionVirtualBalanceScaler, 18).atomics);
    }
    if (message.expirationVirtualBalanceScaler !== undefined) {
      writer.uint32(50).string(Decimal.fromUserInput(message.expirationVirtualBalanceScaler, 18).atomics);
    }
    if (message.buyYGivenInLoanFeeRatio !== undefined) {
      writer.uint32(58).string(Decimal.fromUserInput(message.buyYGivenInLoanFeeRatio, 18).atomics);
    }
    if (message.sellYGivenOutFeeRatio !== undefined) {
      writer.uint32(66).string(Decimal.fromUserInput(message.sellYGivenOutFeeRatio, 18).atomics);
    }
    if (message.maxAlpha !== undefined) {
      writer.uint32(74).string(Decimal.fromUserInput(message.maxAlpha, 18).atomics);
    }
    if (message.avgMonthlyYieldRate !== undefined) {
      writer.uint32(82).string(Decimal.fromUserInput(message.avgMonthlyYieldRate, 18).atomics);
    }
    if (message.yieldFeeScaler !== undefined) {
      writer.uint32(90).string(Decimal.fromUserInput(message.yieldFeeScaler, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): YammConfiguration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYammConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lambda = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.maturityIntroductionIntervalMillis = reader.string();
          break;
        case 4:
          message.maturityExpirationIntervalMillis = reader.string();
          break;
        case 5:
          message.introductionVirtualBalanceScaler = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.expirationVirtualBalanceScaler = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.buyYGivenInLoanFeeRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.sellYGivenOutFeeRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.maxAlpha = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.avgMonthlyYieldRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.yieldFeeScaler = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<YammConfiguration>): YammConfiguration {
    const message = createBaseYammConfiguration();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lambda = object.lambda ?? undefined;
    message.maturityIntroductionIntervalMillis = object.maturityIntroductionIntervalMillis ?? undefined;
    message.maturityExpirationIntervalMillis = object.maturityExpirationIntervalMillis ?? undefined;
    message.introductionVirtualBalanceScaler = object.introductionVirtualBalanceScaler ?? undefined;
    message.expirationVirtualBalanceScaler = object.expirationVirtualBalanceScaler ?? undefined;
    message.buyYGivenInLoanFeeRatio = object.buyYGivenInLoanFeeRatio ?? undefined;
    message.sellYGivenOutFeeRatio = object.sellYGivenOutFeeRatio ?? undefined;
    message.maxAlpha = object.maxAlpha ?? undefined;
    message.avgMonthlyYieldRate = object.avgMonthlyYieldRate ?? undefined;
    message.yieldFeeScaler = object.yieldFeeScaler ?? undefined;
    return message;
  },
  fromAmino(object: YammConfigurationAmino): YammConfiguration {
    const message = createBaseYammConfiguration();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lambda !== undefined && object.lambda !== null) {
      message.lambda = object.lambda;
    }
    if (object.maturity_introduction_interval_millis !== undefined && object.maturity_introduction_interval_millis !== null) {
      message.maturityIntroductionIntervalMillis = object.maturity_introduction_interval_millis;
    }
    if (object.maturity_expiration_interval_millis !== undefined && object.maturity_expiration_interval_millis !== null) {
      message.maturityExpirationIntervalMillis = object.maturity_expiration_interval_millis;
    }
    if (object.introduction_virtual_balance_scaler !== undefined && object.introduction_virtual_balance_scaler !== null) {
      message.introductionVirtualBalanceScaler = object.introduction_virtual_balance_scaler;
    }
    if (object.expiration_virtual_balance_scaler !== undefined && object.expiration_virtual_balance_scaler !== null) {
      message.expirationVirtualBalanceScaler = object.expiration_virtual_balance_scaler;
    }
    if (object.buy_y_given_in_loan_fee_ratio !== undefined && object.buy_y_given_in_loan_fee_ratio !== null) {
      message.buyYGivenInLoanFeeRatio = object.buy_y_given_in_loan_fee_ratio;
    }
    if (object.sell_y_given_out_fee_ratio !== undefined && object.sell_y_given_out_fee_ratio !== null) {
      message.sellYGivenOutFeeRatio = object.sell_y_given_out_fee_ratio;
    }
    if (object.max_alpha !== undefined && object.max_alpha !== null) {
      message.maxAlpha = object.max_alpha;
    }
    if (object.avg_monthly_yield_rate !== undefined && object.avg_monthly_yield_rate !== null) {
      message.avgMonthlyYieldRate = object.avg_monthly_yield_rate;
    }
    if (object.yield_fee_scaler !== undefined && object.yield_fee_scaler !== null) {
      message.yieldFeeScaler = object.yield_fee_scaler;
    }
    return message;
  },
  toAmino(message: YammConfiguration, useInterfaces: boolean = false): YammConfigurationAmino {
    const obj: any = {};
    obj.pool_id = message.poolId ? message.poolId.toString() : "0";
    obj.lambda = message.lambda === null ? undefined : message.lambda;
    obj.maturity_introduction_interval_millis = message.maturityIntroductionIntervalMillis === null ? undefined : message.maturityIntroductionIntervalMillis;
    obj.maturity_expiration_interval_millis = message.maturityExpirationIntervalMillis === null ? undefined : message.maturityExpirationIntervalMillis;
    obj.introduction_virtual_balance_scaler = message.introductionVirtualBalanceScaler === null ? undefined : message.introductionVirtualBalanceScaler;
    obj.expiration_virtual_balance_scaler = message.expirationVirtualBalanceScaler === null ? undefined : message.expirationVirtualBalanceScaler;
    obj.buy_y_given_in_loan_fee_ratio = message.buyYGivenInLoanFeeRatio === null ? undefined : message.buyYGivenInLoanFeeRatio;
    obj.sell_y_given_out_fee_ratio = message.sellYGivenOutFeeRatio === null ? undefined : message.sellYGivenOutFeeRatio;
    obj.max_alpha = message.maxAlpha === null ? undefined : message.maxAlpha;
    obj.avg_monthly_yield_rate = message.avgMonthlyYieldRate === null ? undefined : message.avgMonthlyYieldRate;
    obj.yield_fee_scaler = message.yieldFeeScaler === null ? undefined : message.yieldFeeScaler;
    return obj;
  },
  fromAminoMsg(object: YammConfigurationAminoMsg): YammConfiguration {
    return YammConfiguration.fromAmino(object.value);
  },
  fromProtoMsg(message: YammConfigurationProtoMsg, useInterfaces: boolean = false): YammConfiguration {
    return YammConfiguration.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: YammConfiguration): Uint8Array {
    return YammConfiguration.encode(message).finish();
  },
  toProtoMsg(message: YammConfiguration): YammConfigurationProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.YammConfiguration",
      value: YammConfiguration.encode(message).finish()
    };
  }
};
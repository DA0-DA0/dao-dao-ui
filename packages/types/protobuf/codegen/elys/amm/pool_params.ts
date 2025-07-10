import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export interface LegacyPoolParams {
  swapFee: string;
  exitFee: string;
  useOracle: boolean;
  weightBreakingFeeMultiplier: string;
  weightBreakingFeeExponent: string;
  weightRecoveryFeePortion: string;
  thresholdWeightDifference: string;
  weightBreakingFeePortion: string;
  /** denom for fee collection */
  feeDenom: string;
}
export interface LegacyPoolParamsProtoMsg {
  typeUrl: "/elys.amm.LegacyPoolParams";
  value: Uint8Array;
}
export interface LegacyPoolParamsAmino {
  swap_fee?: string;
  exit_fee?: string;
  use_oracle?: boolean;
  weight_breaking_fee_multiplier?: string;
  weight_breaking_fee_exponent?: string;
  weight_recovery_fee_portion?: string;
  threshold_weight_difference?: string;
  weight_breaking_fee_portion?: string;
  /** denom for fee collection */
  fee_denom?: string;
}
export interface LegacyPoolParamsAminoMsg {
  type: "/elys.amm.LegacyPoolParams";
  value: LegacyPoolParamsAmino;
}
export interface LegacyPoolParamsSDKType {
  swap_fee: string;
  exit_fee: string;
  use_oracle: boolean;
  weight_breaking_fee_multiplier: string;
  weight_breaking_fee_exponent: string;
  weight_recovery_fee_portion: string;
  threshold_weight_difference: string;
  weight_breaking_fee_portion: string;
  fee_denom: string;
}
export interface PoolParams {
  swapFee: string;
  useOracle: boolean;
  /** denom for fee collection */
  feeDenom: string;
}
export interface PoolParamsProtoMsg {
  typeUrl: "/elys.amm.PoolParams";
  value: Uint8Array;
}
export interface PoolParamsAmino {
  swap_fee?: string;
  use_oracle?: boolean;
  /** denom for fee collection */
  fee_denom?: string;
}
export interface PoolParamsAminoMsg {
  type: "/elys.amm.PoolParams";
  value: PoolParamsAmino;
}
export interface PoolParamsSDKType {
  swap_fee: string;
  use_oracle: boolean;
  fee_denom: string;
}
function createBaseLegacyPoolParams(): LegacyPoolParams {
  return {
    swapFee: "",
    exitFee: "",
    useOracle: false,
    weightBreakingFeeMultiplier: "",
    weightBreakingFeeExponent: "",
    weightRecoveryFeePortion: "",
    thresholdWeightDifference: "",
    weightBreakingFeePortion: "",
    feeDenom: ""
  };
}
export const LegacyPoolParams = {
  typeUrl: "/elys.amm.LegacyPoolParams",
  encode(message: LegacyPoolParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.swapFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.swapFee, 18).atomics);
    }
    if (message.exitFee !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.exitFee, 18).atomics);
    }
    if (message.useOracle === true) {
      writer.uint32(24).bool(message.useOracle);
    }
    if (message.weightBreakingFeeMultiplier !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.weightBreakingFeeMultiplier, 18).atomics);
    }
    if (message.weightBreakingFeeExponent !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.weightBreakingFeeExponent, 18).atomics);
    }
    if (message.weightRecoveryFeePortion !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.weightRecoveryFeePortion, 18).atomics);
    }
    if (message.thresholdWeightDifference !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.thresholdWeightDifference, 18).atomics);
    }
    if (message.weightBreakingFeePortion !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.weightBreakingFeePortion, 18).atomics);
    }
    if (message.feeDenom !== "") {
      writer.uint32(74).string(message.feeDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacyPoolParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyPoolParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.exitFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.useOracle = reader.bool();
          break;
        case 4:
          message.weightBreakingFeeMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.weightBreakingFeeExponent = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.weightRecoveryFeePortion = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.thresholdWeightDifference = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.weightBreakingFeePortion = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.feeDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacyPoolParams>): LegacyPoolParams {
    const message = createBaseLegacyPoolParams();
    message.swapFee = object.swapFee ?? "";
    message.exitFee = object.exitFee ?? "";
    message.useOracle = object.useOracle ?? false;
    message.weightBreakingFeeMultiplier = object.weightBreakingFeeMultiplier ?? "";
    message.weightBreakingFeeExponent = object.weightBreakingFeeExponent ?? "";
    message.weightRecoveryFeePortion = object.weightRecoveryFeePortion ?? "";
    message.thresholdWeightDifference = object.thresholdWeightDifference ?? "";
    message.weightBreakingFeePortion = object.weightBreakingFeePortion ?? "";
    message.feeDenom = object.feeDenom ?? "";
    return message;
  },
  fromAmino(object: LegacyPoolParamsAmino): LegacyPoolParams {
    const message = createBaseLegacyPoolParams();
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = object.swap_fee;
    }
    if (object.exit_fee !== undefined && object.exit_fee !== null) {
      message.exitFee = object.exit_fee;
    }
    if (object.use_oracle !== undefined && object.use_oracle !== null) {
      message.useOracle = object.use_oracle;
    }
    if (object.weight_breaking_fee_multiplier !== undefined && object.weight_breaking_fee_multiplier !== null) {
      message.weightBreakingFeeMultiplier = object.weight_breaking_fee_multiplier;
    }
    if (object.weight_breaking_fee_exponent !== undefined && object.weight_breaking_fee_exponent !== null) {
      message.weightBreakingFeeExponent = object.weight_breaking_fee_exponent;
    }
    if (object.weight_recovery_fee_portion !== undefined && object.weight_recovery_fee_portion !== null) {
      message.weightRecoveryFeePortion = object.weight_recovery_fee_portion;
    }
    if (object.threshold_weight_difference !== undefined && object.threshold_weight_difference !== null) {
      message.thresholdWeightDifference = object.threshold_weight_difference;
    }
    if (object.weight_breaking_fee_portion !== undefined && object.weight_breaking_fee_portion !== null) {
      message.weightBreakingFeePortion = object.weight_breaking_fee_portion;
    }
    if (object.fee_denom !== undefined && object.fee_denom !== null) {
      message.feeDenom = object.fee_denom;
    }
    return message;
  },
  toAmino(message: LegacyPoolParams, useInterfaces: boolean = false): LegacyPoolParamsAmino {
    const obj: any = {};
    obj.swap_fee = message.swapFee === "" ? undefined : message.swapFee;
    obj.exit_fee = message.exitFee === "" ? undefined : message.exitFee;
    obj.use_oracle = message.useOracle === false ? undefined : message.useOracle;
    obj.weight_breaking_fee_multiplier = message.weightBreakingFeeMultiplier === "" ? undefined : message.weightBreakingFeeMultiplier;
    obj.weight_breaking_fee_exponent = message.weightBreakingFeeExponent === "" ? undefined : message.weightBreakingFeeExponent;
    obj.weight_recovery_fee_portion = message.weightRecoveryFeePortion === "" ? undefined : message.weightRecoveryFeePortion;
    obj.threshold_weight_difference = message.thresholdWeightDifference === "" ? undefined : message.thresholdWeightDifference;
    obj.weight_breaking_fee_portion = message.weightBreakingFeePortion === "" ? undefined : message.weightBreakingFeePortion;
    obj.fee_denom = message.feeDenom === "" ? undefined : message.feeDenom;
    return obj;
  },
  fromAminoMsg(object: LegacyPoolParamsAminoMsg): LegacyPoolParams {
    return LegacyPoolParams.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacyPoolParamsProtoMsg, useInterfaces: boolean = false): LegacyPoolParams {
    return LegacyPoolParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacyPoolParams): Uint8Array {
    return LegacyPoolParams.encode(message).finish();
  },
  toProtoMsg(message: LegacyPoolParams): LegacyPoolParamsProtoMsg {
    return {
      typeUrl: "/elys.amm.LegacyPoolParams",
      value: LegacyPoolParams.encode(message).finish()
    };
  }
};
function createBasePoolParams(): PoolParams {
  return {
    swapFee: "",
    useOracle: false,
    feeDenom: ""
  };
}
export const PoolParams = {
  typeUrl: "/elys.amm.PoolParams",
  encode(message: PoolParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.swapFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.swapFee, 18).atomics);
    }
    if (message.useOracle === true) {
      writer.uint32(16).bool(message.useOracle);
    }
    if (message.feeDenom !== "") {
      writer.uint32(26).string(message.feeDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.useOracle = reader.bool();
          break;
        case 3:
          message.feeDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolParams>): PoolParams {
    const message = createBasePoolParams();
    message.swapFee = object.swapFee ?? "";
    message.useOracle = object.useOracle ?? false;
    message.feeDenom = object.feeDenom ?? "";
    return message;
  },
  fromAmino(object: PoolParamsAmino): PoolParams {
    const message = createBasePoolParams();
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = object.swap_fee;
    }
    if (object.use_oracle !== undefined && object.use_oracle !== null) {
      message.useOracle = object.use_oracle;
    }
    if (object.fee_denom !== undefined && object.fee_denom !== null) {
      message.feeDenom = object.fee_denom;
    }
    return message;
  },
  toAmino(message: PoolParams, useInterfaces: boolean = false): PoolParamsAmino {
    const obj: any = {};
    obj.swap_fee = message.swapFee === "" ? undefined : message.swapFee;
    obj.use_oracle = message.useOracle === false ? undefined : message.useOracle;
    obj.fee_denom = message.feeDenom === "" ? undefined : message.feeDenom;
    return obj;
  },
  fromAminoMsg(object: PoolParamsAminoMsg): PoolParams {
    return PoolParams.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolParamsProtoMsg, useInterfaces: boolean = false): PoolParams {
    return PoolParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolParams): Uint8Array {
    return PoolParams.encode(message).finish();
  },
  toProtoMsg(message: PoolParams): PoolParamsProtoMsg {
    return {
      typeUrl: "/elys.amm.PoolParams",
      value: PoolParams.encode(message).finish()
    };
  }
};
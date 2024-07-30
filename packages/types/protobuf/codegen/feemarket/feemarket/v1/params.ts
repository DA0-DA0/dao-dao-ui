import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/**
 * Params contains the required set of parameters for the EIP1559 fee market
 * plugin implementation.
 */
export interface Params {
  /**
   * Alpha is the amount we additively increase the learning rate
   * when it is above or below the target +/- threshold.
   * 
   * Must be > 0.
   */
  alpha: string;
  /**
   * Beta is the amount we multiplicatively decrease the learning rate
   * when it is within the target +/- threshold.
   * 
   * Must be [0, 1].
   */
  beta: string;
  /**
   * Gamma is the threshold for the learning rate. If the learning rate is
   * above or below the target +/- threshold, we additively increase the
   * learning rate by Alpha. Otherwise, we multiplicatively decrease the
   * learning rate by Beta.
   * 
   * Must be [0, 0.5].
   */
  gamma: string;
  /**
   * Delta is the amount we additively increase/decrease the gas price when the
   * net block utilization difference in the window is above/below the target
   * utilization.
   */
  delta: string;
  /**
   * MinBaseGasPrice determines the initial gas price of the module and the
   * global minimum for the network.
   */
  minBaseGasPrice: string;
  /** MinLearningRate is the lower bound for the learning rate. */
  minLearningRate: string;
  /** MaxLearningRate is the upper bound for the learning rate. */
  maxLearningRate: string;
  /** MaxBlockUtilization is the maximum block utilization. */
  maxBlockUtilization: bigint;
  /**
   * Window defines the window size for calculating an adaptive learning rate
   * over a moving window of blocks.
   */
  window: bigint;
  /** FeeDenom is the denom that will be used for all fee payments. */
  feeDenom: string;
  /**
   * Enabled is a boolean that determines whether the EIP1559 fee market is
   * enabled.
   */
  enabled: boolean;
  /**
   * DistributeFees is a boolean that determines whether the fees are burned or
   * distributed to all stakers.
   */
  distributeFees: boolean;
}
export interface ParamsProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.Params";
  value: Uint8Array;
}
/**
 * Params contains the required set of parameters for the EIP1559 fee market
 * plugin implementation.
 */
export interface ParamsAmino {
  /**
   * Alpha is the amount we additively increase the learning rate
   * when it is above or below the target +/- threshold.
   * 
   * Must be > 0.
   */
  alpha?: string;
  /**
   * Beta is the amount we multiplicatively decrease the learning rate
   * when it is within the target +/- threshold.
   * 
   * Must be [0, 1].
   */
  beta?: string;
  /**
   * Gamma is the threshold for the learning rate. If the learning rate is
   * above or below the target +/- threshold, we additively increase the
   * learning rate by Alpha. Otherwise, we multiplicatively decrease the
   * learning rate by Beta.
   * 
   * Must be [0, 0.5].
   */
  gamma?: string;
  /**
   * Delta is the amount we additively increase/decrease the gas price when the
   * net block utilization difference in the window is above/below the target
   * utilization.
   */
  delta?: string;
  /**
   * MinBaseGasPrice determines the initial gas price of the module and the
   * global minimum for the network.
   */
  min_base_gas_price?: string;
  /** MinLearningRate is the lower bound for the learning rate. */
  min_learning_rate?: string;
  /** MaxLearningRate is the upper bound for the learning rate. */
  max_learning_rate?: string;
  /** MaxBlockUtilization is the maximum block utilization. */
  max_block_utilization?: string;
  /**
   * Window defines the window size for calculating an adaptive learning rate
   * over a moving window of blocks.
   */
  window?: string;
  /** FeeDenom is the denom that will be used for all fee payments. */
  fee_denom?: string;
  /**
   * Enabled is a boolean that determines whether the EIP1559 fee market is
   * enabled.
   */
  enabled?: boolean;
  /**
   * DistributeFees is a boolean that determines whether the fees are burned or
   * distributed to all stakers.
   */
  distribute_fees?: boolean;
}
export interface ParamsAminoMsg {
  type: "/feemarket.feemarket.v1.Params";
  value: ParamsAmino;
}
/**
 * Params contains the required set of parameters for the EIP1559 fee market
 * plugin implementation.
 */
export interface ParamsSDKType {
  alpha: string;
  beta: string;
  gamma: string;
  delta: string;
  min_base_gas_price: string;
  min_learning_rate: string;
  max_learning_rate: string;
  max_block_utilization: bigint;
  window: bigint;
  fee_denom: string;
  enabled: boolean;
  distribute_fees: boolean;
}
function createBaseParams(): Params {
  return {
    alpha: "",
    beta: "",
    gamma: "",
    delta: "",
    minBaseGasPrice: "",
    minLearningRate: "",
    maxLearningRate: "",
    maxBlockUtilization: BigInt(0),
    window: BigInt(0),
    feeDenom: "",
    enabled: false,
    distributeFees: false
  };
}
export const Params = {
  typeUrl: "/feemarket.feemarket.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.alpha !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.alpha, 18).atomics);
    }
    if (message.beta !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.beta, 18).atomics);
    }
    if (message.gamma !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.gamma, 18).atomics);
    }
    if (message.delta !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.delta, 18).atomics);
    }
    if (message.minBaseGasPrice !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.minBaseGasPrice, 18).atomics);
    }
    if (message.minLearningRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.minLearningRate, 18).atomics);
    }
    if (message.maxLearningRate !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.maxLearningRate, 18).atomics);
    }
    if (message.maxBlockUtilization !== BigInt(0)) {
      writer.uint32(64).uint64(message.maxBlockUtilization);
    }
    if (message.window !== BigInt(0)) {
      writer.uint32(72).uint64(message.window);
    }
    if (message.feeDenom !== "") {
      writer.uint32(82).string(message.feeDenom);
    }
    if (message.enabled === true) {
      writer.uint32(88).bool(message.enabled);
    }
    if (message.distributeFees === true) {
      writer.uint32(96).bool(message.distributeFees);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alpha = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.beta = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.gamma = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.delta = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.minBaseGasPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.minLearningRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.maxLearningRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.maxBlockUtilization = reader.uint64();
          break;
        case 9:
          message.window = reader.uint64();
          break;
        case 10:
          message.feeDenom = reader.string();
          break;
        case 11:
          message.enabled = reader.bool();
          break;
        case 12:
          message.distributeFees = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.alpha = object.alpha ?? "";
    message.beta = object.beta ?? "";
    message.gamma = object.gamma ?? "";
    message.delta = object.delta ?? "";
    message.minBaseGasPrice = object.minBaseGasPrice ?? "";
    message.minLearningRate = object.minLearningRate ?? "";
    message.maxLearningRate = object.maxLearningRate ?? "";
    message.maxBlockUtilization = object.maxBlockUtilization !== undefined && object.maxBlockUtilization !== null ? BigInt(object.maxBlockUtilization.toString()) : BigInt(0);
    message.window = object.window !== undefined && object.window !== null ? BigInt(object.window.toString()) : BigInt(0);
    message.feeDenom = object.feeDenom ?? "";
    message.enabled = object.enabled ?? false;
    message.distributeFees = object.distributeFees ?? false;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.alpha !== undefined && object.alpha !== null) {
      message.alpha = object.alpha;
    }
    if (object.beta !== undefined && object.beta !== null) {
      message.beta = object.beta;
    }
    if (object.gamma !== undefined && object.gamma !== null) {
      message.gamma = object.gamma;
    }
    if (object.delta !== undefined && object.delta !== null) {
      message.delta = object.delta;
    }
    if (object.min_base_gas_price !== undefined && object.min_base_gas_price !== null) {
      message.minBaseGasPrice = object.min_base_gas_price;
    }
    if (object.min_learning_rate !== undefined && object.min_learning_rate !== null) {
      message.minLearningRate = object.min_learning_rate;
    }
    if (object.max_learning_rate !== undefined && object.max_learning_rate !== null) {
      message.maxLearningRate = object.max_learning_rate;
    }
    if (object.max_block_utilization !== undefined && object.max_block_utilization !== null) {
      message.maxBlockUtilization = BigInt(object.max_block_utilization);
    }
    if (object.window !== undefined && object.window !== null) {
      message.window = BigInt(object.window);
    }
    if (object.fee_denom !== undefined && object.fee_denom !== null) {
      message.feeDenom = object.fee_denom;
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.distribute_fees !== undefined && object.distribute_fees !== null) {
      message.distributeFees = object.distribute_fees;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.alpha = message.alpha === "" ? undefined : message.alpha;
    obj.beta = message.beta === "" ? undefined : message.beta;
    obj.gamma = message.gamma === "" ? undefined : message.gamma;
    obj.delta = message.delta === "" ? undefined : message.delta;
    obj.min_base_gas_price = message.minBaseGasPrice === "" ? undefined : message.minBaseGasPrice;
    obj.min_learning_rate = message.minLearningRate === "" ? undefined : message.minLearningRate;
    obj.max_learning_rate = message.maxLearningRate === "" ? undefined : message.maxLearningRate;
    obj.max_block_utilization = message.maxBlockUtilization !== BigInt(0) ? message.maxBlockUtilization.toString() : undefined;
    obj.window = message.window !== BigInt(0) ? message.window.toString() : undefined;
    obj.fee_denom = message.feeDenom === "" ? undefined : message.feeDenom;
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.distribute_fees = message.distributeFees === false ? undefined : message.distributeFees;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface Order {
  id: bigint;
  creator: string;
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  whitelistedRoute: boolean;
  allowMatching: boolean;
  amountPerStep: string;
  remainingAmount: string;
  depositedAmount: string;
  minMillisInterval: bigint;
  maxStepSpotPrice: string;
  maxMatchingSpotPrice?: string;
}
export interface OrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.Order";
  value: Uint8Array;
}
export interface OrderAmino {
  id?: string;
  creator?: string;
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  whitelisted_route?: boolean;
  allow_matching?: boolean;
  amount_per_step?: string;
  remaining_amount?: string;
  deposited_amount?: string;
  min_millis_interval?: string;
  max_step_spot_price?: string;
  max_matching_spot_price?: string;
}
export interface OrderAminoMsg {
  type: "/pryzm.amm.v1.Order";
  value: OrderAmino;
}
export interface OrderSDKType {
  id: bigint;
  creator: string;
  pool_id: bigint;
  token_in: string;
  token_out: string;
  whitelisted_route: boolean;
  allow_matching: boolean;
  amount_per_step: string;
  remaining_amount: string;
  deposited_amount: string;
  min_millis_interval: bigint;
  max_step_spot_price: string;
  max_matching_spot_price?: string;
}
export interface DisabledOrderPair {
  whitelistedRoute: boolean;
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
}
export interface DisabledOrderPairProtoMsg {
  typeUrl: "/pryzm.amm.v1.DisabledOrderPair";
  value: Uint8Array;
}
export interface DisabledOrderPairAmino {
  whitelisted_route?: boolean;
  pool_id?: string;
  token_in?: string;
  token_out?: string;
}
export interface DisabledOrderPairAminoMsg {
  type: "/pryzm.amm.v1.DisabledOrderPair";
  value: DisabledOrderPairAmino;
}
export interface DisabledOrderPairSDKType {
  whitelisted_route: boolean;
  pool_id: bigint;
  token_in: string;
  token_out: string;
}
function createBaseOrder(): Order {
  return {
    id: BigInt(0),
    creator: "",
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    whitelistedRoute: false,
    allowMatching: false,
    amountPerStep: "",
    remainingAmount: "",
    depositedAmount: "",
    minMillisInterval: BigInt(0),
    maxStepSpotPrice: "",
    maxMatchingSpotPrice: undefined
  };
}
export const Order = {
  typeUrl: "/pryzm.amm.v1.Order",
  encode(message: Order, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(34).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(42).string(message.tokenOut);
    }
    if (message.whitelistedRoute === true) {
      writer.uint32(48).bool(message.whitelistedRoute);
    }
    if (message.allowMatching === true) {
      writer.uint32(56).bool(message.allowMatching);
    }
    if (message.amountPerStep !== "") {
      writer.uint32(66).string(message.amountPerStep);
    }
    if (message.remainingAmount !== "") {
      writer.uint32(74).string(message.remainingAmount);
    }
    if (message.depositedAmount !== "") {
      writer.uint32(82).string(message.depositedAmount);
    }
    if (message.minMillisInterval !== BigInt(0)) {
      writer.uint32(88).int64(message.minMillisInterval);
    }
    if (message.maxStepSpotPrice !== "") {
      writer.uint32(98).string(Decimal.fromUserInput(message.maxStepSpotPrice, 18).atomics);
    }
    if (message.maxMatchingSpotPrice !== undefined) {
      writer.uint32(106).string(Decimal.fromUserInput(message.maxMatchingSpotPrice, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Order {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.poolId = reader.uint64();
          break;
        case 4:
          message.tokenIn = reader.string();
          break;
        case 5:
          message.tokenOut = reader.string();
          break;
        case 6:
          message.whitelistedRoute = reader.bool();
          break;
        case 7:
          message.allowMatching = reader.bool();
          break;
        case 8:
          message.amountPerStep = reader.string();
          break;
        case 9:
          message.remainingAmount = reader.string();
          break;
        case 10:
          message.depositedAmount = reader.string();
          break;
        case 11:
          message.minMillisInterval = reader.int64();
          break;
        case 12:
          message.maxStepSpotPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 13:
          message.maxMatchingSpotPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Order>): Order {
    const message = createBaseOrder();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.allowMatching = object.allowMatching ?? false;
    message.amountPerStep = object.amountPerStep ?? "";
    message.remainingAmount = object.remainingAmount ?? "";
    message.depositedAmount = object.depositedAmount ?? "";
    message.minMillisInterval = object.minMillisInterval !== undefined && object.minMillisInterval !== null ? BigInt(object.minMillisInterval.toString()) : BigInt(0);
    message.maxStepSpotPrice = object.maxStepSpotPrice ?? "";
    message.maxMatchingSpotPrice = object.maxMatchingSpotPrice ?? undefined;
    return message;
  },
  fromAmino(object: OrderAmino): Order {
    const message = createBaseOrder();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = object.whitelisted_route;
    }
    if (object.allow_matching !== undefined && object.allow_matching !== null) {
      message.allowMatching = object.allow_matching;
    }
    if (object.amount_per_step !== undefined && object.amount_per_step !== null) {
      message.amountPerStep = object.amount_per_step;
    }
    if (object.remaining_amount !== undefined && object.remaining_amount !== null) {
      message.remainingAmount = object.remaining_amount;
    }
    if (object.deposited_amount !== undefined && object.deposited_amount !== null) {
      message.depositedAmount = object.deposited_amount;
    }
    if (object.min_millis_interval !== undefined && object.min_millis_interval !== null) {
      message.minMillisInterval = BigInt(object.min_millis_interval);
    }
    if (object.max_step_spot_price !== undefined && object.max_step_spot_price !== null) {
      message.maxStepSpotPrice = object.max_step_spot_price;
    }
    if (object.max_matching_spot_price !== undefined && object.max_matching_spot_price !== null) {
      message.maxMatchingSpotPrice = object.max_matching_spot_price;
    }
    return message;
  },
  toAmino(message: Order, useInterfaces: boolean = false): OrderAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.allow_matching = message.allowMatching === false ? undefined : message.allowMatching;
    obj.amount_per_step = message.amountPerStep === "" ? undefined : message.amountPerStep;
    obj.remaining_amount = message.remainingAmount === "" ? undefined : message.remainingAmount;
    obj.deposited_amount = message.depositedAmount === "" ? undefined : message.depositedAmount;
    obj.min_millis_interval = message.minMillisInterval !== BigInt(0) ? message.minMillisInterval.toString() : undefined;
    obj.max_step_spot_price = message.maxStepSpotPrice === "" ? undefined : message.maxStepSpotPrice;
    obj.max_matching_spot_price = message.maxMatchingSpotPrice === null ? undefined : message.maxMatchingSpotPrice;
    return obj;
  },
  fromAminoMsg(object: OrderAminoMsg): Order {
    return Order.fromAmino(object.value);
  },
  fromProtoMsg(message: OrderProtoMsg, useInterfaces: boolean = false): Order {
    return Order.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Order): Uint8Array {
    return Order.encode(message).finish();
  },
  toProtoMsg(message: Order): OrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.Order",
      value: Order.encode(message).finish()
    };
  }
};
function createBaseDisabledOrderPair(): DisabledOrderPair {
  return {
    whitelistedRoute: false,
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: ""
  };
}
export const DisabledOrderPair = {
  typeUrl: "/pryzm.amm.v1.DisabledOrderPair",
  encode(message: DisabledOrderPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.whitelistedRoute === true) {
      writer.uint32(8).bool(message.whitelistedRoute);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DisabledOrderPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisabledOrderPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whitelistedRoute = reader.bool();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DisabledOrderPair>): DisabledOrderPair {
    const message = createBaseDisabledOrderPair();
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: DisabledOrderPairAmino): DisabledOrderPair {
    const message = createBaseDisabledOrderPair();
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = object.whitelisted_route;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: DisabledOrderPair, useInterfaces: boolean = false): DisabledOrderPairAmino {
    const obj: any = {};
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: DisabledOrderPairAminoMsg): DisabledOrderPair {
    return DisabledOrderPair.fromAmino(object.value);
  },
  fromProtoMsg(message: DisabledOrderPairProtoMsg, useInterfaces: boolean = false): DisabledOrderPair {
    return DisabledOrderPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DisabledOrderPair): Uint8Array {
    return DisabledOrderPair.encode(message).finish();
  },
  toProtoMsg(message: DisabledOrderPair): DisabledOrderPairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.DisabledOrderPair",
      value: DisabledOrderPair.encode(message).finish()
    };
  }
};
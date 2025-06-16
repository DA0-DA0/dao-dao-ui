import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface CircuitBreaker {
  referenceLptPrice: string;
  lowerBound: string;
  upperBound: string;
  referenceNormalizedWeight: string;
  adjustedUpperBound: string;
  adjustedLowerBound: string;
}
export interface CircuitBreakerProtoMsg {
  typeUrl: "/pryzm.amm.v1.CircuitBreaker";
  value: Uint8Array;
}
export interface CircuitBreakerAmino {
  reference_lpt_price?: string;
  lower_bound?: string;
  upper_bound?: string;
  reference_normalized_weight?: string;
  adjusted_upper_bound?: string;
  adjusted_lower_bound?: string;
}
export interface CircuitBreakerAminoMsg {
  type: "/pryzm.amm.v1.CircuitBreaker";
  value: CircuitBreakerAmino;
}
export interface CircuitBreakerSDKType {
  reference_lpt_price: string;
  lower_bound: string;
  upper_bound: string;
  reference_normalized_weight: string;
  adjusted_upper_bound: string;
  adjusted_lower_bound: string;
}
export interface PoolToken {
  poolId: bigint;
  denom: string;
  balance: string;
  circuitBreaker?: CircuitBreaker | undefined;
}
export interface PoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.PoolToken";
  value: Uint8Array;
}
export interface PoolTokenAmino {
  pool_id?: string;
  denom?: string;
  balance?: string;
  circuit_breaker?: CircuitBreakerAmino | undefined;
}
export interface PoolTokenAminoMsg {
  type: "/pryzm.amm.v1.PoolToken";
  value: PoolTokenAmino;
}
export interface PoolTokenSDKType {
  pool_id: bigint;
  denom: string;
  balance: string;
  circuit_breaker?: CircuitBreakerSDKType | undefined;
}
export interface TokenAmount {
  token: PoolToken | undefined;
  amount: string;
}
export interface TokenAmountProtoMsg {
  typeUrl: "/pryzm.amm.v1.TokenAmount";
  value: Uint8Array;
}
export interface TokenAmountAmino {
  token?: PoolTokenAmino | undefined;
  amount?: string;
}
export interface TokenAmountAminoMsg {
  type: "/pryzm.amm.v1.TokenAmount";
  value: TokenAmountAmino;
}
export interface TokenAmountSDKType {
  token: PoolTokenSDKType | undefined;
  amount: string;
}
export interface TokenInfo {
  denom: string;
  balance: string;
  virtualBalance: string;
  /** weight is nil for pools that dont implement WeightedPoolApi */
  normalizedWeight?: string;
}
export interface TokenInfoProtoMsg {
  typeUrl: "/pryzm.amm.v1.TokenInfo";
  value: Uint8Array;
}
export interface TokenInfoAmino {
  denom?: string;
  balance?: string;
  virtual_balance?: string;
  /** weight is nil for pools that dont implement WeightedPoolApi */
  normalized_weight?: string;
}
export interface TokenInfoAminoMsg {
  type: "/pryzm.amm.v1.TokenInfo";
  value: TokenInfoAmino;
}
export interface TokenInfoSDKType {
  denom: string;
  balance: string;
  virtual_balance: string;
  normalized_weight?: string;
}
function createBaseCircuitBreaker(): CircuitBreaker {
  return {
    referenceLptPrice: "",
    lowerBound: "",
    upperBound: "",
    referenceNormalizedWeight: "",
    adjustedUpperBound: "",
    adjustedLowerBound: ""
  };
}
export const CircuitBreaker = {
  typeUrl: "/pryzm.amm.v1.CircuitBreaker",
  encode(message: CircuitBreaker, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.referenceLptPrice !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.referenceLptPrice, 18).atomics);
    }
    if (message.lowerBound !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.lowerBound, 18).atomics);
    }
    if (message.upperBound !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.upperBound, 18).atomics);
    }
    if (message.referenceNormalizedWeight !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.referenceNormalizedWeight, 18).atomics);
    }
    if (message.adjustedUpperBound !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.adjustedUpperBound, 18).atomics);
    }
    if (message.adjustedLowerBound !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.adjustedLowerBound, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CircuitBreaker {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceLptPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.lowerBound = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.upperBound = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.referenceNormalizedWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.adjustedUpperBound = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.adjustedLowerBound = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CircuitBreaker>): CircuitBreaker {
    const message = createBaseCircuitBreaker();
    message.referenceLptPrice = object.referenceLptPrice ?? "";
    message.lowerBound = object.lowerBound ?? "";
    message.upperBound = object.upperBound ?? "";
    message.referenceNormalizedWeight = object.referenceNormalizedWeight ?? "";
    message.adjustedUpperBound = object.adjustedUpperBound ?? "";
    message.adjustedLowerBound = object.adjustedLowerBound ?? "";
    return message;
  },
  fromAmino(object: CircuitBreakerAmino): CircuitBreaker {
    const message = createBaseCircuitBreaker();
    if (object.reference_lpt_price !== undefined && object.reference_lpt_price !== null) {
      message.referenceLptPrice = object.reference_lpt_price;
    }
    if (object.lower_bound !== undefined && object.lower_bound !== null) {
      message.lowerBound = object.lower_bound;
    }
    if (object.upper_bound !== undefined && object.upper_bound !== null) {
      message.upperBound = object.upper_bound;
    }
    if (object.reference_normalized_weight !== undefined && object.reference_normalized_weight !== null) {
      message.referenceNormalizedWeight = object.reference_normalized_weight;
    }
    if (object.adjusted_upper_bound !== undefined && object.adjusted_upper_bound !== null) {
      message.adjustedUpperBound = object.adjusted_upper_bound;
    }
    if (object.adjusted_lower_bound !== undefined && object.adjusted_lower_bound !== null) {
      message.adjustedLowerBound = object.adjusted_lower_bound;
    }
    return message;
  },
  toAmino(message: CircuitBreaker, useInterfaces: boolean = false): CircuitBreakerAmino {
    const obj: any = {};
    obj.reference_lpt_price = message.referenceLptPrice === "" ? undefined : message.referenceLptPrice;
    obj.lower_bound = message.lowerBound === "" ? undefined : message.lowerBound;
    obj.upper_bound = message.upperBound === "" ? undefined : message.upperBound;
    obj.reference_normalized_weight = message.referenceNormalizedWeight === "" ? undefined : message.referenceNormalizedWeight;
    obj.adjusted_upper_bound = message.adjustedUpperBound === "" ? undefined : message.adjustedUpperBound;
    obj.adjusted_lower_bound = message.adjustedLowerBound === "" ? undefined : message.adjustedLowerBound;
    return obj;
  },
  fromAminoMsg(object: CircuitBreakerAminoMsg): CircuitBreaker {
    return CircuitBreaker.fromAmino(object.value);
  },
  fromProtoMsg(message: CircuitBreakerProtoMsg, useInterfaces: boolean = false): CircuitBreaker {
    return CircuitBreaker.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CircuitBreaker): Uint8Array {
    return CircuitBreaker.encode(message).finish();
  },
  toProtoMsg(message: CircuitBreaker): CircuitBreakerProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.CircuitBreaker",
      value: CircuitBreaker.encode(message).finish()
    };
  }
};
function createBasePoolToken(): PoolToken {
  return {
    poolId: BigInt(0),
    denom: "",
    balance: "",
    circuitBreaker: undefined
  };
}
export const PoolToken = {
  typeUrl: "/pryzm.amm.v1.PoolToken",
  encode(message: PoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.balance !== "") {
      writer.uint32(26).string(message.balance);
    }
    if (message.circuitBreaker !== undefined) {
      CircuitBreaker.encode(message.circuitBreaker, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.balance = reader.string();
          break;
        case 4:
          message.circuitBreaker = CircuitBreaker.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolToken>): PoolToken {
    const message = createBasePoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    message.balance = object.balance ?? "";
    message.circuitBreaker = object.circuitBreaker !== undefined && object.circuitBreaker !== null ? CircuitBreaker.fromPartial(object.circuitBreaker) : undefined;
    return message;
  },
  fromAmino(object: PoolTokenAmino): PoolToken {
    const message = createBasePoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = object.balance;
    }
    if (object.circuit_breaker !== undefined && object.circuit_breaker !== null) {
      message.circuitBreaker = CircuitBreaker.fromAmino(object.circuit_breaker);
    }
    return message;
  },
  toAmino(message: PoolToken, useInterfaces: boolean = false): PoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.balance = message.balance === "" ? undefined : message.balance;
    obj.circuit_breaker = message.circuitBreaker ? CircuitBreaker.toAmino(message.circuitBreaker, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolTokenAminoMsg): PoolToken {
    return PoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolTokenProtoMsg, useInterfaces: boolean = false): PoolToken {
    return PoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolToken): Uint8Array {
    return PoolToken.encode(message).finish();
  },
  toProtoMsg(message: PoolToken): PoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.PoolToken",
      value: PoolToken.encode(message).finish()
    };
  }
};
function createBaseTokenAmount(): TokenAmount {
  return {
    token: PoolToken.fromPartial({}),
    amount: ""
  };
}
export const TokenAmount = {
  typeUrl: "/pryzm.amm.v1.TokenAmount",
  encode(message: TokenAmount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.token !== undefined) {
      PoolToken.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenAmount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = PoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenAmount>): TokenAmount {
    const message = createBaseTokenAmount();
    message.token = object.token !== undefined && object.token !== null ? PoolToken.fromPartial(object.token) : undefined;
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: TokenAmountAmino): TokenAmount {
    const message = createBaseTokenAmount();
    if (object.token !== undefined && object.token !== null) {
      message.token = PoolToken.fromAmino(object.token);
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: TokenAmount, useInterfaces: boolean = false): TokenAmountAmino {
    const obj: any = {};
    obj.token = message.token ? PoolToken.toAmino(message.token, useInterfaces) : undefined;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: TokenAmountAminoMsg): TokenAmount {
    return TokenAmount.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenAmountProtoMsg, useInterfaces: boolean = false): TokenAmount {
    return TokenAmount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenAmount): Uint8Array {
    return TokenAmount.encode(message).finish();
  },
  toProtoMsg(message: TokenAmount): TokenAmountProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.TokenAmount",
      value: TokenAmount.encode(message).finish()
    };
  }
};
function createBaseTokenInfo(): TokenInfo {
  return {
    denom: "",
    balance: "",
    virtualBalance: "",
    normalizedWeight: undefined
  };
}
export const TokenInfo = {
  typeUrl: "/pryzm.amm.v1.TokenInfo",
  encode(message: TokenInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.balance !== "") {
      writer.uint32(18).string(message.balance);
    }
    if (message.virtualBalance !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.virtualBalance, 18).atomics);
    }
    if (message.normalizedWeight !== undefined) {
      writer.uint32(34).string(Decimal.fromUserInput(message.normalizedWeight, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.balance = reader.string();
          break;
        case 3:
          message.virtualBalance = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.normalizedWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenInfo>): TokenInfo {
    const message = createBaseTokenInfo();
    message.denom = object.denom ?? "";
    message.balance = object.balance ?? "";
    message.virtualBalance = object.virtualBalance ?? "";
    message.normalizedWeight = object.normalizedWeight ?? undefined;
    return message;
  },
  fromAmino(object: TokenInfoAmino): TokenInfo {
    const message = createBaseTokenInfo();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = object.balance;
    }
    if (object.virtual_balance !== undefined && object.virtual_balance !== null) {
      message.virtualBalance = object.virtual_balance;
    }
    if (object.normalized_weight !== undefined && object.normalized_weight !== null) {
      message.normalizedWeight = object.normalized_weight;
    }
    return message;
  },
  toAmino(message: TokenInfo, useInterfaces: boolean = false): TokenInfoAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.balance = message.balance === "" ? undefined : message.balance;
    obj.virtual_balance = message.virtualBalance === "" ? undefined : message.virtualBalance;
    obj.normalized_weight = message.normalizedWeight === null ? undefined : message.normalizedWeight;
    return obj;
  },
  fromAminoMsg(object: TokenInfoAminoMsg): TokenInfo {
    return TokenInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenInfoProtoMsg, useInterfaces: boolean = false): TokenInfo {
    return TokenInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenInfo): Uint8Array {
    return TokenInfo.encode(message).finish();
  },
  toProtoMsg(message: TokenInfo): TokenInfoProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.TokenInfo",
      value: TokenInfo.encode(message).finish()
    };
  }
};
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface TokenCircuitBreakerSettings {
  denom: string;
  circuitBreaker?: CircuitBreakerSettings | undefined;
}
export interface TokenCircuitBreakerSettingsProtoMsg {
  typeUrl: "/pryzm.amm.v1.TokenCircuitBreakerSettings";
  value: Uint8Array;
}
export interface TokenCircuitBreakerSettingsAmino {
  denom?: string;
  circuit_breaker?: CircuitBreakerSettingsAmino | undefined;
}
export interface TokenCircuitBreakerSettingsAminoMsg {
  type: "/pryzm.amm.v1.TokenCircuitBreakerSettings";
  value: TokenCircuitBreakerSettingsAmino;
}
export interface TokenCircuitBreakerSettingsSDKType {
  denom: string;
  circuit_breaker?: CircuitBreakerSettingsSDKType | undefined;
}
export interface CircuitBreakerSettings {
  referenceLptPrice: string;
  lowerBound: string;
  upperBound: string;
}
export interface CircuitBreakerSettingsProtoMsg {
  typeUrl: "/pryzm.amm.v1.CircuitBreakerSettings";
  value: Uint8Array;
}
export interface CircuitBreakerSettingsAmino {
  reference_lpt_price?: string;
  lower_bound?: string;
  upper_bound?: string;
}
export interface CircuitBreakerSettingsAminoMsg {
  type: "/pryzm.amm.v1.CircuitBreakerSettings";
  value: CircuitBreakerSettingsAmino;
}
export interface CircuitBreakerSettingsSDKType {
  reference_lpt_price: string;
  lower_bound: string;
  upper_bound: string;
}
function createBaseTokenCircuitBreakerSettings(): TokenCircuitBreakerSettings {
  return {
    denom: "",
    circuitBreaker: undefined
  };
}
export const TokenCircuitBreakerSettings = {
  typeUrl: "/pryzm.amm.v1.TokenCircuitBreakerSettings",
  encode(message: TokenCircuitBreakerSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.circuitBreaker !== undefined) {
      CircuitBreakerSettings.encode(message.circuitBreaker, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenCircuitBreakerSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenCircuitBreakerSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.circuitBreaker = CircuitBreakerSettings.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenCircuitBreakerSettings>): TokenCircuitBreakerSettings {
    const message = createBaseTokenCircuitBreakerSettings();
    message.denom = object.denom ?? "";
    message.circuitBreaker = object.circuitBreaker !== undefined && object.circuitBreaker !== null ? CircuitBreakerSettings.fromPartial(object.circuitBreaker) : undefined;
    return message;
  },
  fromAmino(object: TokenCircuitBreakerSettingsAmino): TokenCircuitBreakerSettings {
    const message = createBaseTokenCircuitBreakerSettings();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.circuit_breaker !== undefined && object.circuit_breaker !== null) {
      message.circuitBreaker = CircuitBreakerSettings.fromAmino(object.circuit_breaker);
    }
    return message;
  },
  toAmino(message: TokenCircuitBreakerSettings, useInterfaces: boolean = false): TokenCircuitBreakerSettingsAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.circuit_breaker = message.circuitBreaker ? CircuitBreakerSettings.toAmino(message.circuitBreaker, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TokenCircuitBreakerSettingsAminoMsg): TokenCircuitBreakerSettings {
    return TokenCircuitBreakerSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenCircuitBreakerSettingsProtoMsg, useInterfaces: boolean = false): TokenCircuitBreakerSettings {
    return TokenCircuitBreakerSettings.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenCircuitBreakerSettings): Uint8Array {
    return TokenCircuitBreakerSettings.encode(message).finish();
  },
  toProtoMsg(message: TokenCircuitBreakerSettings): TokenCircuitBreakerSettingsProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.TokenCircuitBreakerSettings",
      value: TokenCircuitBreakerSettings.encode(message).finish()
    };
  }
};
function createBaseCircuitBreakerSettings(): CircuitBreakerSettings {
  return {
    referenceLptPrice: "",
    lowerBound: "",
    upperBound: ""
  };
}
export const CircuitBreakerSettings = {
  typeUrl: "/pryzm.amm.v1.CircuitBreakerSettings",
  encode(message: CircuitBreakerSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.referenceLptPrice !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.referenceLptPrice, 18).atomics);
    }
    if (message.lowerBound !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.lowerBound, 18).atomics);
    }
    if (message.upperBound !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.upperBound, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CircuitBreakerSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCircuitBreakerSettings();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CircuitBreakerSettings>): CircuitBreakerSettings {
    const message = createBaseCircuitBreakerSettings();
    message.referenceLptPrice = object.referenceLptPrice ?? "";
    message.lowerBound = object.lowerBound ?? "";
    message.upperBound = object.upperBound ?? "";
    return message;
  },
  fromAmino(object: CircuitBreakerSettingsAmino): CircuitBreakerSettings {
    const message = createBaseCircuitBreakerSettings();
    if (object.reference_lpt_price !== undefined && object.reference_lpt_price !== null) {
      message.referenceLptPrice = object.reference_lpt_price;
    }
    if (object.lower_bound !== undefined && object.lower_bound !== null) {
      message.lowerBound = object.lower_bound;
    }
    if (object.upper_bound !== undefined && object.upper_bound !== null) {
      message.upperBound = object.upper_bound;
    }
    return message;
  },
  toAmino(message: CircuitBreakerSettings, useInterfaces: boolean = false): CircuitBreakerSettingsAmino {
    const obj: any = {};
    obj.reference_lpt_price = message.referenceLptPrice === "" ? undefined : message.referenceLptPrice;
    obj.lower_bound = message.lowerBound === "" ? undefined : message.lowerBound;
    obj.upper_bound = message.upperBound === "" ? undefined : message.upperBound;
    return obj;
  },
  fromAminoMsg(object: CircuitBreakerSettingsAminoMsg): CircuitBreakerSettings {
    return CircuitBreakerSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: CircuitBreakerSettingsProtoMsg, useInterfaces: boolean = false): CircuitBreakerSettings {
    return CircuitBreakerSettings.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CircuitBreakerSettings): Uint8Array {
    return CircuitBreakerSettings.encode(message).finish();
  },
  toProtoMsg(message: CircuitBreakerSettings): CircuitBreakerSettingsProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.CircuitBreakerSettings",
      value: CircuitBreakerSettings.encode(message).finish()
    };
  }
};
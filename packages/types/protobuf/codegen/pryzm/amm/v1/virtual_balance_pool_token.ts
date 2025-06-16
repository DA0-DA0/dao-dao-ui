import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface TemporalVirtualBalancePoolToken {
  poolId: bigint;
  denom: string;
  targetVirtualBalance: string;
  startUnixMillis: bigint;
  endUnixMillis: bigint;
}
export interface TemporalVirtualBalancePoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.TemporalVirtualBalancePoolToken";
  value: Uint8Array;
}
export interface TemporalVirtualBalancePoolTokenAmino {
  pool_id?: string;
  denom?: string;
  target_virtual_balance?: string;
  start_unix_millis?: string;
  end_unix_millis?: string;
}
export interface TemporalVirtualBalancePoolTokenAminoMsg {
  type: "/pryzm.amm.v1.TemporalVirtualBalancePoolToken";
  value: TemporalVirtualBalancePoolTokenAmino;
}
export interface TemporalVirtualBalancePoolTokenSDKType {
  pool_id: bigint;
  denom: string;
  target_virtual_balance: string;
  start_unix_millis: bigint;
  end_unix_millis: bigint;
}
export interface PermanentVirtualBalancePoolToken {
  poolId: bigint;
  denom: string;
  virtualBalance: string;
}
export interface PermanentVirtualBalancePoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.PermanentVirtualBalancePoolToken";
  value: Uint8Array;
}
export interface PermanentVirtualBalancePoolTokenAmino {
  pool_id?: string;
  denom?: string;
  virtual_balance?: string;
}
export interface PermanentVirtualBalancePoolTokenAminoMsg {
  type: "/pryzm.amm.v1.PermanentVirtualBalancePoolToken";
  value: PermanentVirtualBalancePoolTokenAmino;
}
export interface PermanentVirtualBalancePoolTokenSDKType {
  pool_id: bigint;
  denom: string;
  virtual_balance: string;
}
function createBaseTemporalVirtualBalancePoolToken(): TemporalVirtualBalancePoolToken {
  return {
    poolId: BigInt(0),
    denom: "",
    targetVirtualBalance: "",
    startUnixMillis: BigInt(0),
    endUnixMillis: BigInt(0)
  };
}
export const TemporalVirtualBalancePoolToken = {
  typeUrl: "/pryzm.amm.v1.TemporalVirtualBalancePoolToken",
  encode(message: TemporalVirtualBalancePoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.targetVirtualBalance !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.targetVirtualBalance, 18).atomics);
    }
    if (message.startUnixMillis !== BigInt(0)) {
      writer.uint32(32).int64(message.startUnixMillis);
    }
    if (message.endUnixMillis !== BigInt(0)) {
      writer.uint32(40).int64(message.endUnixMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TemporalVirtualBalancePoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemporalVirtualBalancePoolToken();
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
          message.targetVirtualBalance = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.startUnixMillis = reader.int64();
          break;
        case 5:
          message.endUnixMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TemporalVirtualBalancePoolToken>): TemporalVirtualBalancePoolToken {
    const message = createBaseTemporalVirtualBalancePoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    message.targetVirtualBalance = object.targetVirtualBalance ?? "";
    message.startUnixMillis = object.startUnixMillis !== undefined && object.startUnixMillis !== null ? BigInt(object.startUnixMillis.toString()) : BigInt(0);
    message.endUnixMillis = object.endUnixMillis !== undefined && object.endUnixMillis !== null ? BigInt(object.endUnixMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: TemporalVirtualBalancePoolTokenAmino): TemporalVirtualBalancePoolToken {
    const message = createBaseTemporalVirtualBalancePoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.target_virtual_balance !== undefined && object.target_virtual_balance !== null) {
      message.targetVirtualBalance = object.target_virtual_balance;
    }
    if (object.start_unix_millis !== undefined && object.start_unix_millis !== null) {
      message.startUnixMillis = BigInt(object.start_unix_millis);
    }
    if (object.end_unix_millis !== undefined && object.end_unix_millis !== null) {
      message.endUnixMillis = BigInt(object.end_unix_millis);
    }
    return message;
  },
  toAmino(message: TemporalVirtualBalancePoolToken, useInterfaces: boolean = false): TemporalVirtualBalancePoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.target_virtual_balance = message.targetVirtualBalance === "" ? undefined : message.targetVirtualBalance;
    obj.start_unix_millis = message.startUnixMillis !== BigInt(0) ? message.startUnixMillis.toString() : undefined;
    obj.end_unix_millis = message.endUnixMillis !== BigInt(0) ? message.endUnixMillis.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: TemporalVirtualBalancePoolTokenAminoMsg): TemporalVirtualBalancePoolToken {
    return TemporalVirtualBalancePoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: TemporalVirtualBalancePoolTokenProtoMsg, useInterfaces: boolean = false): TemporalVirtualBalancePoolToken {
    return TemporalVirtualBalancePoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TemporalVirtualBalancePoolToken): Uint8Array {
    return TemporalVirtualBalancePoolToken.encode(message).finish();
  },
  toProtoMsg(message: TemporalVirtualBalancePoolToken): TemporalVirtualBalancePoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.TemporalVirtualBalancePoolToken",
      value: TemporalVirtualBalancePoolToken.encode(message).finish()
    };
  }
};
function createBasePermanentVirtualBalancePoolToken(): PermanentVirtualBalancePoolToken {
  return {
    poolId: BigInt(0),
    denom: "",
    virtualBalance: ""
  };
}
export const PermanentVirtualBalancePoolToken = {
  typeUrl: "/pryzm.amm.v1.PermanentVirtualBalancePoolToken",
  encode(message: PermanentVirtualBalancePoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.virtualBalance !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.virtualBalance, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PermanentVirtualBalancePoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermanentVirtualBalancePoolToken();
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
          message.virtualBalance = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PermanentVirtualBalancePoolToken>): PermanentVirtualBalancePoolToken {
    const message = createBasePermanentVirtualBalancePoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    message.virtualBalance = object.virtualBalance ?? "";
    return message;
  },
  fromAmino(object: PermanentVirtualBalancePoolTokenAmino): PermanentVirtualBalancePoolToken {
    const message = createBasePermanentVirtualBalancePoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.virtual_balance !== undefined && object.virtual_balance !== null) {
      message.virtualBalance = object.virtual_balance;
    }
    return message;
  },
  toAmino(message: PermanentVirtualBalancePoolToken, useInterfaces: boolean = false): PermanentVirtualBalancePoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.virtual_balance = message.virtualBalance === "" ? undefined : message.virtualBalance;
    return obj;
  },
  fromAminoMsg(object: PermanentVirtualBalancePoolTokenAminoMsg): PermanentVirtualBalancePoolToken {
    return PermanentVirtualBalancePoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: PermanentVirtualBalancePoolTokenProtoMsg, useInterfaces: boolean = false): PermanentVirtualBalancePoolToken {
    return PermanentVirtualBalancePoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PermanentVirtualBalancePoolToken): Uint8Array {
    return PermanentVirtualBalancePoolToken.encode(message).finish();
  },
  toProtoMsg(message: PermanentVirtualBalancePoolToken): PermanentVirtualBalancePoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.PermanentVirtualBalancePoolToken",
      value: PermanentVirtualBalancePoolToken.encode(message).finish()
    };
  }
};
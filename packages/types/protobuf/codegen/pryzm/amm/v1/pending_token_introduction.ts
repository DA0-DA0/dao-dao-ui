import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface PendingTokenIntroduction {
  assetId: string;
  targetPoolId: bigint;
  tokenDenom: string;
  tokenNormalizedWeight: string;
  virtualBalanceIntervalMillis: bigint;
}
export interface PendingTokenIntroductionProtoMsg {
  typeUrl: "/pryzm.amm.v1.PendingTokenIntroduction";
  value: Uint8Array;
}
export interface PendingTokenIntroductionAmino {
  asset_id?: string;
  target_pool_id?: string;
  token_denom?: string;
  token_normalized_weight?: string;
  virtual_balance_interval_millis?: string;
}
export interface PendingTokenIntroductionAminoMsg {
  type: "/pryzm.amm.v1.PendingTokenIntroduction";
  value: PendingTokenIntroductionAmino;
}
export interface PendingTokenIntroductionSDKType {
  asset_id: string;
  target_pool_id: bigint;
  token_denom: string;
  token_normalized_weight: string;
  virtual_balance_interval_millis: bigint;
}
function createBasePendingTokenIntroduction(): PendingTokenIntroduction {
  return {
    assetId: "",
    targetPoolId: BigInt(0),
    tokenDenom: "",
    tokenNormalizedWeight: "",
    virtualBalanceIntervalMillis: BigInt(0)
  };
}
export const PendingTokenIntroduction = {
  typeUrl: "/pryzm.amm.v1.PendingTokenIntroduction",
  encode(message: PendingTokenIntroduction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.targetPoolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.targetPoolId);
    }
    if (message.tokenDenom !== "") {
      writer.uint32(26).string(message.tokenDenom);
    }
    if (message.tokenNormalizedWeight !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.tokenNormalizedWeight, 18).atomics);
    }
    if (message.virtualBalanceIntervalMillis !== BigInt(0)) {
      writer.uint32(40).int64(message.virtualBalanceIntervalMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PendingTokenIntroduction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingTokenIntroduction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.targetPoolId = reader.uint64();
          break;
        case 3:
          message.tokenDenom = reader.string();
          break;
        case 4:
          message.tokenNormalizedWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.virtualBalanceIntervalMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PendingTokenIntroduction>): PendingTokenIntroduction {
    const message = createBasePendingTokenIntroduction();
    message.assetId = object.assetId ?? "";
    message.targetPoolId = object.targetPoolId !== undefined && object.targetPoolId !== null ? BigInt(object.targetPoolId.toString()) : BigInt(0);
    message.tokenDenom = object.tokenDenom ?? "";
    message.tokenNormalizedWeight = object.tokenNormalizedWeight ?? "";
    message.virtualBalanceIntervalMillis = object.virtualBalanceIntervalMillis !== undefined && object.virtualBalanceIntervalMillis !== null ? BigInt(object.virtualBalanceIntervalMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PendingTokenIntroductionAmino): PendingTokenIntroduction {
    const message = createBasePendingTokenIntroduction();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.target_pool_id !== undefined && object.target_pool_id !== null) {
      message.targetPoolId = BigInt(object.target_pool_id);
    }
    if (object.token_denom !== undefined && object.token_denom !== null) {
      message.tokenDenom = object.token_denom;
    }
    if (object.token_normalized_weight !== undefined && object.token_normalized_weight !== null) {
      message.tokenNormalizedWeight = object.token_normalized_weight;
    }
    if (object.virtual_balance_interval_millis !== undefined && object.virtual_balance_interval_millis !== null) {
      message.virtualBalanceIntervalMillis = BigInt(object.virtual_balance_interval_millis);
    }
    return message;
  },
  toAmino(message: PendingTokenIntroduction, useInterfaces: boolean = false): PendingTokenIntroductionAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.target_pool_id = message.targetPoolId !== BigInt(0) ? message.targetPoolId.toString() : undefined;
    obj.token_denom = message.tokenDenom === "" ? undefined : message.tokenDenom;
    obj.token_normalized_weight = message.tokenNormalizedWeight === "" ? undefined : message.tokenNormalizedWeight;
    obj.virtual_balance_interval_millis = message.virtualBalanceIntervalMillis !== BigInt(0) ? message.virtualBalanceIntervalMillis.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PendingTokenIntroductionAminoMsg): PendingTokenIntroduction {
    return PendingTokenIntroduction.fromAmino(object.value);
  },
  fromProtoMsg(message: PendingTokenIntroductionProtoMsg, useInterfaces: boolean = false): PendingTokenIntroduction {
    return PendingTokenIntroduction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PendingTokenIntroduction): Uint8Array {
    return PendingTokenIntroduction.encode(message).finish();
  },
  toProtoMsg(message: PendingTokenIntroduction): PendingTokenIntroductionProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.PendingTokenIntroduction",
      value: PendingTokenIntroduction.encode(message).finish()
    };
  }
};
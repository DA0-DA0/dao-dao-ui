import { PairID, PairIDAmino, PairIDSDKType } from "./pair_id";
import { Pool, PoolAmino, PoolSDKType } from "./pool";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface DepositRecord {
  pairId?: PairID | undefined;
  sharesOwned: string;
  centerTickIndex: bigint;
  lowerTickIndex: bigint;
  upperTickIndex: bigint;
  fee: bigint;
  totalShares?: string;
  pool?: Pool | undefined;
}
export interface DepositRecordProtoMsg {
  typeUrl: "/neutron.dex.DepositRecord";
  value: Uint8Array;
}
export interface DepositRecordAmino {
  pair_id?: PairIDAmino | undefined;
  shares_owned: string;
  center_tick_index?: string;
  lower_tick_index?: string;
  upper_tick_index?: string;
  fee?: string;
  total_shares: string;
  pool?: PoolAmino | undefined;
}
export interface DepositRecordAminoMsg {
  type: "/neutron.dex.DepositRecord";
  value: DepositRecordAmino;
}
export interface DepositRecordSDKType {
  pair_id?: PairIDSDKType | undefined;
  shares_owned: string;
  center_tick_index: bigint;
  lower_tick_index: bigint;
  upper_tick_index: bigint;
  fee: bigint;
  total_shares?: string;
  pool?: PoolSDKType | undefined;
}
function createBaseDepositRecord(): DepositRecord {
  return {
    pairId: undefined,
    sharesOwned: "",
    centerTickIndex: BigInt(0),
    lowerTickIndex: BigInt(0),
    upperTickIndex: BigInt(0),
    fee: BigInt(0),
    totalShares: undefined,
    pool: undefined
  };
}
export const DepositRecord = {
  typeUrl: "/neutron.dex.DepositRecord",
  encode(message: DepositRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pairId !== undefined) {
      PairID.encode(message.pairId, writer.uint32(10).fork()).ldelim();
    }
    if (message.sharesOwned !== "") {
      writer.uint32(18).string(message.sharesOwned);
    }
    if (message.centerTickIndex !== BigInt(0)) {
      writer.uint32(24).int64(message.centerTickIndex);
    }
    if (message.lowerTickIndex !== BigInt(0)) {
      writer.uint32(32).int64(message.lowerTickIndex);
    }
    if (message.upperTickIndex !== BigInt(0)) {
      writer.uint32(40).int64(message.upperTickIndex);
    }
    if (message.fee !== BigInt(0)) {
      writer.uint32(48).uint64(message.fee);
    }
    if (message.totalShares !== undefined) {
      writer.uint32(58).string(message.totalShares);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DepositRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairId = PairID.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.sharesOwned = reader.string();
          break;
        case 3:
          message.centerTickIndex = reader.int64();
          break;
        case 4:
          message.lowerTickIndex = reader.int64();
          break;
        case 5:
          message.upperTickIndex = reader.int64();
          break;
        case 6:
          message.fee = reader.uint64();
          break;
        case 7:
          message.totalShares = reader.string();
          break;
        case 8:
          message.pool = Pool.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DepositRecord>): DepositRecord {
    const message = createBaseDepositRecord();
    message.pairId = object.pairId !== undefined && object.pairId !== null ? PairID.fromPartial(object.pairId) : undefined;
    message.sharesOwned = object.sharesOwned ?? "";
    message.centerTickIndex = object.centerTickIndex !== undefined && object.centerTickIndex !== null ? BigInt(object.centerTickIndex.toString()) : BigInt(0);
    message.lowerTickIndex = object.lowerTickIndex !== undefined && object.lowerTickIndex !== null ? BigInt(object.lowerTickIndex.toString()) : BigInt(0);
    message.upperTickIndex = object.upperTickIndex !== undefined && object.upperTickIndex !== null ? BigInt(object.upperTickIndex.toString()) : BigInt(0);
    message.fee = object.fee !== undefined && object.fee !== null ? BigInt(object.fee.toString()) : BigInt(0);
    message.totalShares = object.totalShares ?? undefined;
    message.pool = object.pool !== undefined && object.pool !== null ? Pool.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: DepositRecordAmino): DepositRecord {
    const message = createBaseDepositRecord();
    if (object.pair_id !== undefined && object.pair_id !== null) {
      message.pairId = PairID.fromAmino(object.pair_id);
    }
    if (object.shares_owned !== undefined && object.shares_owned !== null) {
      message.sharesOwned = object.shares_owned;
    }
    if (object.center_tick_index !== undefined && object.center_tick_index !== null) {
      message.centerTickIndex = BigInt(object.center_tick_index);
    }
    if (object.lower_tick_index !== undefined && object.lower_tick_index !== null) {
      message.lowerTickIndex = BigInt(object.lower_tick_index);
    }
    if (object.upper_tick_index !== undefined && object.upper_tick_index !== null) {
      message.upperTickIndex = BigInt(object.upper_tick_index);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = BigInt(object.fee);
    }
    if (object.total_shares !== undefined && object.total_shares !== null) {
      message.totalShares = object.total_shares;
    }
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Pool.fromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: DepositRecord, useInterfaces: boolean = false): DepositRecordAmino {
    const obj: any = {};
    obj.pair_id = message.pairId ? PairID.toAmino(message.pairId, useInterfaces) : undefined;
    obj.shares_owned = message.sharesOwned ?? "";
    obj.center_tick_index = message.centerTickIndex !== BigInt(0) ? message.centerTickIndex.toString() : undefined;
    obj.lower_tick_index = message.lowerTickIndex !== BigInt(0) ? message.lowerTickIndex.toString() : undefined;
    obj.upper_tick_index = message.upperTickIndex !== BigInt(0) ? message.upperTickIndex.toString() : undefined;
    obj.fee = message.fee !== BigInt(0) ? message.fee.toString() : undefined;
    obj.total_shares = message.totalShares ?? null;
    obj.pool = message.pool ? Pool.toAmino(message.pool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: DepositRecordAminoMsg): DepositRecord {
    return DepositRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: DepositRecordProtoMsg, useInterfaces: boolean = false): DepositRecord {
    return DepositRecord.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DepositRecord): Uint8Array {
    return DepositRecord.encode(message).finish();
  },
  toProtoMsg(message: DepositRecord): DepositRecordProtoMsg {
    return {
      typeUrl: "/neutron.dex.DepositRecord",
      value: DepositRecord.encode(message).finish()
    };
  }
};
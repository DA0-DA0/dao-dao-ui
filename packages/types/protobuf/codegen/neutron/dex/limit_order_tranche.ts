import { TradePairID, TradePairIDAmino, TradePairIDSDKType } from "./trade_pair_id";
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
export interface LimitOrderTrancheKey {
  tradePairId?: TradePairID | undefined;
  tickIndexTakerToMaker: bigint;
  trancheKey: string;
}
export interface LimitOrderTrancheKeyProtoMsg {
  typeUrl: "/neutron.dex.LimitOrderTrancheKey";
  value: Uint8Array;
}
export interface LimitOrderTrancheKeyAmino {
  trade_pair_id?: TradePairIDAmino | undefined;
  tick_index_taker_to_maker?: string;
  tranche_key?: string;
}
export interface LimitOrderTrancheKeyAminoMsg {
  type: "/neutron.dex.LimitOrderTrancheKey";
  value: LimitOrderTrancheKeyAmino;
}
export interface LimitOrderTrancheKeySDKType {
  trade_pair_id?: TradePairIDSDKType | undefined;
  tick_index_taker_to_maker: bigint;
  tranche_key: string;
}
export interface LimitOrderTranche {
  key?: LimitOrderTrancheKey | undefined;
  reservesMakerDenom: string;
  reservesTakerDenom: string;
  totalMakerDenom: string;
  totalTakerDenom: string;
  /**
   * expiration_time is represented as an RFC 3339 formatted date.
   * LimitOrders with expiration_time set are valid as long as blockTime <= expiration_time.
   * JIT orders also use expiration_time to handle deletion, but represent a special case.
   * All JIT orders have an expiration_time of 0001-01-01T00:00:00Z, and an exception is made to
   * still treat these orders as live. Order deletion still functions the
   * same, and the orders will be deleted at the end of the block.
   */
  expirationTime?: Date | undefined;
  priceTakerToMaker: string;
}
export interface LimitOrderTrancheProtoMsg {
  typeUrl: "/neutron.dex.LimitOrderTranche";
  value: Uint8Array;
}
export interface LimitOrderTrancheAmino {
  key?: LimitOrderTrancheKeyAmino | undefined;
  reserves_maker_denom: string;
  reserves_taker_denom: string;
  total_maker_denom: string;
  total_taker_denom: string;
  /**
   * expiration_time is represented as an RFC 3339 formatted date.
   * LimitOrders with expiration_time set are valid as long as blockTime <= expiration_time.
   * JIT orders also use expiration_time to handle deletion, but represent a special case.
   * All JIT orders have an expiration_time of 0001-01-01T00:00:00Z, and an exception is made to
   * still treat these orders as live. Order deletion still functions the
   * same, and the orders will be deleted at the end of the block.
   */
  expiration_time?: string | undefined;
  price_taker_to_maker: string;
}
export interface LimitOrderTrancheAminoMsg {
  type: "/neutron.dex.LimitOrderTranche";
  value: LimitOrderTrancheAmino;
}
export interface LimitOrderTrancheSDKType {
  key?: LimitOrderTrancheKeySDKType | undefined;
  reserves_maker_denom: string;
  reserves_taker_denom: string;
  total_maker_denom: string;
  total_taker_denom: string;
  expiration_time?: Date | undefined;
  price_taker_to_maker: string;
}
function createBaseLimitOrderTrancheKey(): LimitOrderTrancheKey {
  return {
    tradePairId: undefined,
    tickIndexTakerToMaker: BigInt(0),
    trancheKey: ""
  };
}
export const LimitOrderTrancheKey = {
  typeUrl: "/neutron.dex.LimitOrderTrancheKey",
  encode(message: LimitOrderTrancheKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradePairId !== undefined) {
      TradePairID.encode(message.tradePairId, writer.uint32(10).fork()).ldelim();
    }
    if (message.tickIndexTakerToMaker !== BigInt(0)) {
      writer.uint32(16).int64(message.tickIndexTakerToMaker);
    }
    if (message.trancheKey !== "") {
      writer.uint32(26).string(message.trancheKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LimitOrderTrancheKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitOrderTrancheKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradePairId = TradePairID.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.tickIndexTakerToMaker = reader.int64();
          break;
        case 3:
          message.trancheKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LimitOrderTrancheKey>): LimitOrderTrancheKey {
    const message = createBaseLimitOrderTrancheKey();
    message.tradePairId = object.tradePairId !== undefined && object.tradePairId !== null ? TradePairID.fromPartial(object.tradePairId) : undefined;
    message.tickIndexTakerToMaker = object.tickIndexTakerToMaker !== undefined && object.tickIndexTakerToMaker !== null ? BigInt(object.tickIndexTakerToMaker.toString()) : BigInt(0);
    message.trancheKey = object.trancheKey ?? "";
    return message;
  },
  fromAmino(object: LimitOrderTrancheKeyAmino): LimitOrderTrancheKey {
    const message = createBaseLimitOrderTrancheKey();
    if (object.trade_pair_id !== undefined && object.trade_pair_id !== null) {
      message.tradePairId = TradePairID.fromAmino(object.trade_pair_id);
    }
    if (object.tick_index_taker_to_maker !== undefined && object.tick_index_taker_to_maker !== null) {
      message.tickIndexTakerToMaker = BigInt(object.tick_index_taker_to_maker);
    }
    if (object.tranche_key !== undefined && object.tranche_key !== null) {
      message.trancheKey = object.tranche_key;
    }
    return message;
  },
  toAmino(message: LimitOrderTrancheKey, useInterfaces: boolean = false): LimitOrderTrancheKeyAmino {
    const obj: any = {};
    obj.trade_pair_id = message.tradePairId ? TradePairID.toAmino(message.tradePairId, useInterfaces) : undefined;
    obj.tick_index_taker_to_maker = message.tickIndexTakerToMaker !== BigInt(0) ? message.tickIndexTakerToMaker.toString() : undefined;
    obj.tranche_key = message.trancheKey === "" ? undefined : message.trancheKey;
    return obj;
  },
  fromAminoMsg(object: LimitOrderTrancheKeyAminoMsg): LimitOrderTrancheKey {
    return LimitOrderTrancheKey.fromAmino(object.value);
  },
  fromProtoMsg(message: LimitOrderTrancheKeyProtoMsg, useInterfaces: boolean = false): LimitOrderTrancheKey {
    return LimitOrderTrancheKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LimitOrderTrancheKey): Uint8Array {
    return LimitOrderTrancheKey.encode(message).finish();
  },
  toProtoMsg(message: LimitOrderTrancheKey): LimitOrderTrancheKeyProtoMsg {
    return {
      typeUrl: "/neutron.dex.LimitOrderTrancheKey",
      value: LimitOrderTrancheKey.encode(message).finish()
    };
  }
};
function createBaseLimitOrderTranche(): LimitOrderTranche {
  return {
    key: undefined,
    reservesMakerDenom: "",
    reservesTakerDenom: "",
    totalMakerDenom: "",
    totalTakerDenom: "",
    expirationTime: undefined,
    priceTakerToMaker: ""
  };
}
export const LimitOrderTranche = {
  typeUrl: "/neutron.dex.LimitOrderTranche",
  encode(message: LimitOrderTranche, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== undefined) {
      LimitOrderTrancheKey.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.reservesMakerDenom !== "") {
      writer.uint32(18).string(message.reservesMakerDenom);
    }
    if (message.reservesTakerDenom !== "") {
      writer.uint32(26).string(message.reservesTakerDenom);
    }
    if (message.totalMakerDenom !== "") {
      writer.uint32(34).string(message.totalMakerDenom);
    }
    if (message.totalTakerDenom !== "") {
      writer.uint32(42).string(message.totalTakerDenom);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.priceTakerToMaker !== "") {
      writer.uint32(58).string(message.priceTakerToMaker);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LimitOrderTranche {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitOrderTranche();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = LimitOrderTrancheKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.reservesMakerDenom = reader.string();
          break;
        case 3:
          message.reservesTakerDenom = reader.string();
          break;
        case 4:
          message.totalMakerDenom = reader.string();
          break;
        case 5:
          message.totalTakerDenom = reader.string();
          break;
        case 6:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.priceTakerToMaker = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LimitOrderTranche>): LimitOrderTranche {
    const message = createBaseLimitOrderTranche();
    message.key = object.key !== undefined && object.key !== null ? LimitOrderTrancheKey.fromPartial(object.key) : undefined;
    message.reservesMakerDenom = object.reservesMakerDenom ?? "";
    message.reservesTakerDenom = object.reservesTakerDenom ?? "";
    message.totalMakerDenom = object.totalMakerDenom ?? "";
    message.totalTakerDenom = object.totalTakerDenom ?? "";
    message.expirationTime = object.expirationTime ?? undefined;
    message.priceTakerToMaker = object.priceTakerToMaker ?? "";
    return message;
  },
  fromAmino(object: LimitOrderTrancheAmino): LimitOrderTranche {
    const message = createBaseLimitOrderTranche();
    if (object.key !== undefined && object.key !== null) {
      message.key = LimitOrderTrancheKey.fromAmino(object.key);
    }
    if (object.reserves_maker_denom !== undefined && object.reserves_maker_denom !== null) {
      message.reservesMakerDenom = object.reserves_maker_denom;
    }
    if (object.reserves_taker_denom !== undefined && object.reserves_taker_denom !== null) {
      message.reservesTakerDenom = object.reserves_taker_denom;
    }
    if (object.total_maker_denom !== undefined && object.total_maker_denom !== null) {
      message.totalMakerDenom = object.total_maker_denom;
    }
    if (object.total_taker_denom !== undefined && object.total_taker_denom !== null) {
      message.totalTakerDenom = object.total_taker_denom;
    }
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    if (object.price_taker_to_maker !== undefined && object.price_taker_to_maker !== null) {
      message.priceTakerToMaker = object.price_taker_to_maker;
    }
    return message;
  },
  toAmino(message: LimitOrderTranche, useInterfaces: boolean = false): LimitOrderTrancheAmino {
    const obj: any = {};
    obj.key = message.key ? LimitOrderTrancheKey.toAmino(message.key, useInterfaces) : undefined;
    obj.reserves_maker_denom = message.reservesMakerDenom ?? "";
    obj.reserves_taker_denom = message.reservesTakerDenom ?? "";
    obj.total_maker_denom = message.totalMakerDenom ?? "";
    obj.total_taker_denom = message.totalTakerDenom ?? "";
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    obj.price_taker_to_maker = message.priceTakerToMaker ?? "";
    return obj;
  },
  fromAminoMsg(object: LimitOrderTrancheAminoMsg): LimitOrderTranche {
    return LimitOrderTranche.fromAmino(object.value);
  },
  fromProtoMsg(message: LimitOrderTrancheProtoMsg, useInterfaces: boolean = false): LimitOrderTranche {
    return LimitOrderTranche.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LimitOrderTranche): Uint8Array {
    return LimitOrderTranche.encode(message).finish();
  },
  toProtoMsg(message: LimitOrderTranche): LimitOrderTrancheProtoMsg {
    return {
      typeUrl: "/neutron.dex.LimitOrderTranche",
      value: LimitOrderTranche.encode(message).finish()
    };
  }
};
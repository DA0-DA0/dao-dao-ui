import { TradePairID, TradePairIDAmino, TradePairIDSDKType } from "./trade_pair_id";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface PoolReservesKey {
  tradePairId?: TradePairID | undefined;
  tickIndexTakerToMaker: bigint;
  fee: bigint;
}
export interface PoolReservesKeyProtoMsg {
  typeUrl: "/neutron.dex.PoolReservesKey";
  value: Uint8Array;
}
export interface PoolReservesKeyAmino {
  trade_pair_id?: TradePairIDAmino | undefined;
  tick_index_taker_to_maker?: string;
  fee?: string;
}
export interface PoolReservesKeyAminoMsg {
  type: "/neutron.dex.PoolReservesKey";
  value: PoolReservesKeyAmino;
}
export interface PoolReservesKeySDKType {
  trade_pair_id?: TradePairIDSDKType | undefined;
  tick_index_taker_to_maker: bigint;
  fee: bigint;
}
export interface PoolReserves {
  key?: PoolReservesKey | undefined;
  reservesMakerDenom: string;
  /** DEPRECATED: price_taker_to_maker will be removed in future release, `maker_price` should always be used. */
  /** @deprecated */
  priceTakerToMaker: string;
  /**
   * DEPRECATED: price_opposite_taker_maker was an internal implementation detail and will be removed in a future release.
   * It is being kept strictly for backwards compatibility. The actual field value is unused.
   */
  /** @deprecated */
  priceOppositeTakerToMaker: string;
  /** This is the price of the PoolReserves denominated in the opposite token. (ie. 1 TokenA with a maker_price of 10 is worth 10 TokenB ) */
  makerPrice: string;
}
export interface PoolReservesProtoMsg {
  typeUrl: "/neutron.dex.PoolReserves";
  value: Uint8Array;
}
export interface PoolReservesAmino {
  key?: PoolReservesKeyAmino | undefined;
  reserves_maker_denom: string;
  /** DEPRECATED: price_taker_to_maker will be removed in future release, `maker_price` should always be used. */
  /** @deprecated */
  price_taker_to_maker: string;
  /**
   * DEPRECATED: price_opposite_taker_maker was an internal implementation detail and will be removed in a future release.
   * It is being kept strictly for backwards compatibility. The actual field value is unused.
   */
  /** @deprecated */
  price_opposite_taker_to_maker: string;
  /** This is the price of the PoolReserves denominated in the opposite token. (ie. 1 TokenA with a maker_price of 10 is worth 10 TokenB ) */
  maker_price: string;
}
export interface PoolReservesAminoMsg {
  type: "/neutron.dex.PoolReserves";
  value: PoolReservesAmino;
}
export interface PoolReservesSDKType {
  key?: PoolReservesKeySDKType | undefined;
  reserves_maker_denom: string;
  /** @deprecated */
  price_taker_to_maker: string;
  /** @deprecated */
  price_opposite_taker_to_maker: string;
  maker_price: string;
}
function createBasePoolReservesKey(): PoolReservesKey {
  return {
    tradePairId: undefined,
    tickIndexTakerToMaker: BigInt(0),
    fee: BigInt(0)
  };
}
export const PoolReservesKey = {
  typeUrl: "/neutron.dex.PoolReservesKey",
  encode(message: PoolReservesKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradePairId !== undefined) {
      TradePairID.encode(message.tradePairId, writer.uint32(10).fork()).ldelim();
    }
    if (message.tickIndexTakerToMaker !== BigInt(0)) {
      writer.uint32(16).int64(message.tickIndexTakerToMaker);
    }
    if (message.fee !== BigInt(0)) {
      writer.uint32(24).uint64(message.fee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolReservesKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolReservesKey();
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
          message.fee = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolReservesKey>): PoolReservesKey {
    const message = createBasePoolReservesKey();
    message.tradePairId = object.tradePairId !== undefined && object.tradePairId !== null ? TradePairID.fromPartial(object.tradePairId) : undefined;
    message.tickIndexTakerToMaker = object.tickIndexTakerToMaker !== undefined && object.tickIndexTakerToMaker !== null ? BigInt(object.tickIndexTakerToMaker.toString()) : BigInt(0);
    message.fee = object.fee !== undefined && object.fee !== null ? BigInt(object.fee.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PoolReservesKeyAmino): PoolReservesKey {
    const message = createBasePoolReservesKey();
    if (object.trade_pair_id !== undefined && object.trade_pair_id !== null) {
      message.tradePairId = TradePairID.fromAmino(object.trade_pair_id);
    }
    if (object.tick_index_taker_to_maker !== undefined && object.tick_index_taker_to_maker !== null) {
      message.tickIndexTakerToMaker = BigInt(object.tick_index_taker_to_maker);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = BigInt(object.fee);
    }
    return message;
  },
  toAmino(message: PoolReservesKey, useInterfaces: boolean = false): PoolReservesKeyAmino {
    const obj: any = {};
    obj.trade_pair_id = message.tradePairId ? TradePairID.toAmino(message.tradePairId, useInterfaces) : undefined;
    obj.tick_index_taker_to_maker = message.tickIndexTakerToMaker !== BigInt(0) ? message.tickIndexTakerToMaker.toString() : undefined;
    obj.fee = message.fee !== BigInt(0) ? message.fee.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolReservesKeyAminoMsg): PoolReservesKey {
    return PoolReservesKey.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolReservesKeyProtoMsg, useInterfaces: boolean = false): PoolReservesKey {
    return PoolReservesKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolReservesKey): Uint8Array {
    return PoolReservesKey.encode(message).finish();
  },
  toProtoMsg(message: PoolReservesKey): PoolReservesKeyProtoMsg {
    return {
      typeUrl: "/neutron.dex.PoolReservesKey",
      value: PoolReservesKey.encode(message).finish()
    };
  }
};
function createBasePoolReserves(): PoolReserves {
  return {
    key: undefined,
    reservesMakerDenom: "",
    priceTakerToMaker: "",
    priceOppositeTakerToMaker: "",
    makerPrice: ""
  };
}
export const PoolReserves = {
  typeUrl: "/neutron.dex.PoolReserves",
  encode(message: PoolReserves, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== undefined) {
      PoolReservesKey.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.reservesMakerDenom !== "") {
      writer.uint32(18).string(message.reservesMakerDenom);
    }
    if (message.priceTakerToMaker !== "") {
      writer.uint32(26).string(message.priceTakerToMaker);
    }
    if (message.priceOppositeTakerToMaker !== "") {
      writer.uint32(34).string(message.priceOppositeTakerToMaker);
    }
    if (message.makerPrice !== "") {
      writer.uint32(42).string(message.makerPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolReserves {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolReserves();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = PoolReservesKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.reservesMakerDenom = reader.string();
          break;
        case 3:
          message.priceTakerToMaker = reader.string();
          break;
        case 4:
          message.priceOppositeTakerToMaker = reader.string();
          break;
        case 5:
          message.makerPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolReserves>): PoolReserves {
    const message = createBasePoolReserves();
    message.key = object.key !== undefined && object.key !== null ? PoolReservesKey.fromPartial(object.key) : undefined;
    message.reservesMakerDenom = object.reservesMakerDenom ?? "";
    message.priceTakerToMaker = object.priceTakerToMaker ?? "";
    message.priceOppositeTakerToMaker = object.priceOppositeTakerToMaker ?? "";
    message.makerPrice = object.makerPrice ?? "";
    return message;
  },
  fromAmino(object: PoolReservesAmino): PoolReserves {
    const message = createBasePoolReserves();
    if (object.key !== undefined && object.key !== null) {
      message.key = PoolReservesKey.fromAmino(object.key);
    }
    if (object.reserves_maker_denom !== undefined && object.reserves_maker_denom !== null) {
      message.reservesMakerDenom = object.reserves_maker_denom;
    }
    if (object.price_taker_to_maker !== undefined && object.price_taker_to_maker !== null) {
      message.priceTakerToMaker = object.price_taker_to_maker;
    }
    if (object.price_opposite_taker_to_maker !== undefined && object.price_opposite_taker_to_maker !== null) {
      message.priceOppositeTakerToMaker = object.price_opposite_taker_to_maker;
    }
    if (object.maker_price !== undefined && object.maker_price !== null) {
      message.makerPrice = object.maker_price;
    }
    return message;
  },
  toAmino(message: PoolReserves, useInterfaces: boolean = false): PoolReservesAmino {
    const obj: any = {};
    obj.key = message.key ? PoolReservesKey.toAmino(message.key, useInterfaces) : undefined;
    obj.reserves_maker_denom = message.reservesMakerDenom ?? "";
    obj.price_taker_to_maker = message.priceTakerToMaker ?? "";
    obj.price_opposite_taker_to_maker = message.priceOppositeTakerToMaker ?? "";
    obj.maker_price = message.makerPrice ?? "";
    return obj;
  },
  fromAminoMsg(object: PoolReservesAminoMsg): PoolReserves {
    return PoolReserves.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolReservesProtoMsg, useInterfaces: boolean = false): PoolReserves {
    return PoolReserves.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolReserves): Uint8Array {
    return PoolReserves.encode(message).finish();
  },
  toProtoMsg(message: PoolReserves): PoolReservesProtoMsg {
    return {
      typeUrl: "/neutron.dex.PoolReserves",
      value: PoolReserves.encode(message).finish()
    };
  }
};
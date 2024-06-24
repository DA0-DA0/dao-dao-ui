import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../../helpers";
/** SellOrder represents the information for a sell order. */
export interface SellOrder {
  /** id is the unique ID of sell order. */
  id: bigint;
  /** seller is the address of the account that is selling credits. */
  seller: Uint8Array;
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a sell order to a credit batch.
   */
  batchKey: bigint;
  /** quantity is the decimal quantity of credits being sold. */
  quantity: string;
  /**
   * market_id is the market in which this sell order exists and specifies
   * the bank_denom that ask_amount corresponds to forming the ask_price.
   */
  marketId: bigint;
  /**
   * ask_amount is the integer amount (encoded as a string) that the seller is
   * asking for each credit unit of the batch. Each credit unit of the batch
   * will be sold for at least the ask_amount. The ask_amount corresponds to the
   * Market.denom to form the ask price.
   */
  askAmount: string;
  /**
   * disable_auto_retire disables auto-retirement of credits which allows a
   * buyer to disable auto-retirement in their buy order enabling them to
   * resell the credits to another buyer.
   */
  disableAutoRetire: boolean;
  /**
   * expiration is an optional timestamp when the sell order expires. When the
   * expiration time is reached, the sell order is removed from state.
   */
  expiration?: Date | undefined;
  /**
   * maker indicates that this is a maker order, meaning that when it hit
   * the order book, there were no matching buy orders.
   */
  maker: boolean;
}
export interface SellOrderProtoMsg {
  typeUrl: "/regen.ecocredit.marketplace.v1.SellOrder";
  value: Uint8Array;
}
/** SellOrder represents the information for a sell order. */
export interface SellOrderAmino {
  /** id is the unique ID of sell order. */
  id?: string;
  /** seller is the address of the account that is selling credits. */
  seller?: string;
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a sell order to a credit batch.
   */
  batch_key?: string;
  /** quantity is the decimal quantity of credits being sold. */
  quantity?: string;
  /**
   * market_id is the market in which this sell order exists and specifies
   * the bank_denom that ask_amount corresponds to forming the ask_price.
   */
  market_id?: string;
  /**
   * ask_amount is the integer amount (encoded as a string) that the seller is
   * asking for each credit unit of the batch. Each credit unit of the batch
   * will be sold for at least the ask_amount. The ask_amount corresponds to the
   * Market.denom to form the ask price.
   */
  ask_amount?: string;
  /**
   * disable_auto_retire disables auto-retirement of credits which allows a
   * buyer to disable auto-retirement in their buy order enabling them to
   * resell the credits to another buyer.
   */
  disable_auto_retire?: boolean;
  /**
   * expiration is an optional timestamp when the sell order expires. When the
   * expiration time is reached, the sell order is removed from state.
   */
  expiration?: string | undefined;
  /**
   * maker indicates that this is a maker order, meaning that when it hit
   * the order book, there were no matching buy orders.
   */
  maker?: boolean;
}
export interface SellOrderAminoMsg {
  type: "/regen.ecocredit.marketplace.v1.SellOrder";
  value: SellOrderAmino;
}
/** SellOrder represents the information for a sell order. */
export interface SellOrderSDKType {
  id: bigint;
  seller: Uint8Array;
  batch_key: bigint;
  quantity: string;
  market_id: bigint;
  ask_amount: string;
  disable_auto_retire: boolean;
  expiration?: Date | undefined;
  maker: boolean;
}
/** AllowedDenom represents the information for an allowed ask/bid denom. */
export interface AllowedDenom {
  /** denom is the bank denom to allow (ex. ibc/GLKHDSG423SGS) */
  bankDenom: string;
  /**
   * display_denom is the denom to display to the user and is informational.
   * Because the denom is likely an IBC denom, this should be chosen by
   * governance to represent the consensus trusted name of the denom.
   */
  displayDenom: string;
  /**
   * exponent is the exponent that relates the denom to the display_denom and is
   * informational
   */
  exponent: number;
}
export interface AllowedDenomProtoMsg {
  typeUrl: "/regen.ecocredit.marketplace.v1.AllowedDenom";
  value: Uint8Array;
}
/** AllowedDenom represents the information for an allowed ask/bid denom. */
export interface AllowedDenomAmino {
  /** denom is the bank denom to allow (ex. ibc/GLKHDSG423SGS) */
  bank_denom?: string;
  /**
   * display_denom is the denom to display to the user and is informational.
   * Because the denom is likely an IBC denom, this should be chosen by
   * governance to represent the consensus trusted name of the denom.
   */
  display_denom?: string;
  /**
   * exponent is the exponent that relates the denom to the display_denom and is
   * informational
   */
  exponent?: number;
}
export interface AllowedDenomAminoMsg {
  type: "/regen.ecocredit.marketplace.v1.AllowedDenom";
  value: AllowedDenomAmino;
}
/** AllowedDenom represents the information for an allowed ask/bid denom. */
export interface AllowedDenomSDKType {
  bank_denom: string;
  display_denom: string;
  exponent: number;
}
/**
 * Market describes a distinctly processed market between a credit type and
 * allowed bank denom. Each market has its own precision in the order book
 * and is processed independently of other markets. Governance must enable
 * markets one by one. Every additional enabled market potentially adds more
 * processing overhead to the blockchain and potentially weakens liquidity in
 * competing markets. For instance, enabling side by side USD/Carbon and
 * EUR/Carbon markets may have the end result that each market individually has
 * less liquidity and longer settlement times. Such decisions should be taken
 * with care.
 */
export interface Market {
  /** id is the unique ID of the market. */
  id: bigint;
  /** credit_type_abbrev is the abbreviation of the credit type. */
  creditTypeAbbrev: string;
  /** bank_denom is an allowed bank denom. */
  bankDenom: string;
  /**
   * precision_modifier is an optional modifier used to convert arbitrary
   * precision integer bank amounts to uint32 values used for sorting in the
   * order book. Given an arbitrary precision integer x, its uint32 conversion
   * will be x / 10^precision_modifier using round half away from zero
   * rounding.
   * 
   * uint32 values range from 0 to 4,294,967,295.
   * This allows for a full 9 digits of precision. In most real world markets
   * this amount of precision is sufficient and most common downside -
   * that some orders with very miniscule price differences may be ordered
   * equivalently (because of rounding) - is acceptable.
   * Note that this rounding will not affect settlement price which will
   * always be done exactly.
   * 
   * Given a USD stable coin with 6 decimal digits, a precision_modifier
   * of 0 is probably acceptable as long as credits are always less than
   * $4,294/unit. With precision down to $0.001 (a precision_modifier of 3
   * in this case), prices can rise up to $4,294,000/unit. Either scenario
   * is probably quite acceptable given that carbon prices are unlikely to
   * rise above $1000/ton any time in the near future.
   * 
   * If credit prices, exceed the maximum range of uint32 with this
   * precision_modifier, orders with high prices will fail and governance
   * will need to adjust precision_modifier to allow for higher prices in
   * exchange for less precision at the lower end.
   */
  precisionModifier: number;
}
export interface MarketProtoMsg {
  typeUrl: "/regen.ecocredit.marketplace.v1.Market";
  value: Uint8Array;
}
/**
 * Market describes a distinctly processed market between a credit type and
 * allowed bank denom. Each market has its own precision in the order book
 * and is processed independently of other markets. Governance must enable
 * markets one by one. Every additional enabled market potentially adds more
 * processing overhead to the blockchain and potentially weakens liquidity in
 * competing markets. For instance, enabling side by side USD/Carbon and
 * EUR/Carbon markets may have the end result that each market individually has
 * less liquidity and longer settlement times. Such decisions should be taken
 * with care.
 */
export interface MarketAmino {
  /** id is the unique ID of the market. */
  id?: string;
  /** credit_type_abbrev is the abbreviation of the credit type. */
  credit_type_abbrev?: string;
  /** bank_denom is an allowed bank denom. */
  bank_denom?: string;
  /**
   * precision_modifier is an optional modifier used to convert arbitrary
   * precision integer bank amounts to uint32 values used for sorting in the
   * order book. Given an arbitrary precision integer x, its uint32 conversion
   * will be x / 10^precision_modifier using round half away from zero
   * rounding.
   * 
   * uint32 values range from 0 to 4,294,967,295.
   * This allows for a full 9 digits of precision. In most real world markets
   * this amount of precision is sufficient and most common downside -
   * that some orders with very miniscule price differences may be ordered
   * equivalently (because of rounding) - is acceptable.
   * Note that this rounding will not affect settlement price which will
   * always be done exactly.
   * 
   * Given a USD stable coin with 6 decimal digits, a precision_modifier
   * of 0 is probably acceptable as long as credits are always less than
   * $4,294/unit. With precision down to $0.001 (a precision_modifier of 3
   * in this case), prices can rise up to $4,294,000/unit. Either scenario
   * is probably quite acceptable given that carbon prices are unlikely to
   * rise above $1000/ton any time in the near future.
   * 
   * If credit prices, exceed the maximum range of uint32 with this
   * precision_modifier, orders with high prices will fail and governance
   * will need to adjust precision_modifier to allow for higher prices in
   * exchange for less precision at the lower end.
   */
  precision_modifier?: number;
}
export interface MarketAminoMsg {
  type: "/regen.ecocredit.marketplace.v1.Market";
  value: MarketAmino;
}
/**
 * Market describes a distinctly processed market between a credit type and
 * allowed bank denom. Each market has its own precision in the order book
 * and is processed independently of other markets. Governance must enable
 * markets one by one. Every additional enabled market potentially adds more
 * processing overhead to the blockchain and potentially weakens liquidity in
 * competing markets. For instance, enabling side by side USD/Carbon and
 * EUR/Carbon markets may have the end result that each market individually has
 * less liquidity and longer settlement times. Such decisions should be taken
 * with care.
 */
export interface MarketSDKType {
  id: bigint;
  credit_type_abbrev: string;
  bank_denom: string;
  precision_modifier: number;
}
function createBaseSellOrder(): SellOrder {
  return {
    id: BigInt(0),
    seller: new Uint8Array(),
    batchKey: BigInt(0),
    quantity: "",
    marketId: BigInt(0),
    askAmount: "",
    disableAutoRetire: false,
    expiration: undefined,
    maker: false
  };
}
export const SellOrder = {
  typeUrl: "/regen.ecocredit.marketplace.v1.SellOrder",
  encode(message: SellOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.seller.length !== 0) {
      writer.uint32(18).bytes(message.seller);
    }
    if (message.batchKey !== BigInt(0)) {
      writer.uint32(24).uint64(message.batchKey);
    }
    if (message.quantity !== "") {
      writer.uint32(34).string(message.quantity);
    }
    if (message.marketId !== BigInt(0)) {
      writer.uint32(40).uint64(message.marketId);
    }
    if (message.askAmount !== "") {
      writer.uint32(50).string(message.askAmount);
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(56).bool(message.disableAutoRetire);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(74).fork()).ldelim();
    }
    if (message.maker === true) {
      writer.uint32(80).bool(message.maker);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SellOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.seller = reader.bytes();
          break;
        case 3:
          message.batchKey = reader.uint64();
          break;
        case 4:
          message.quantity = reader.string();
          break;
        case 5:
          message.marketId = reader.uint64();
          break;
        case 6:
          message.askAmount = reader.string();
          break;
        case 7:
          message.disableAutoRetire = reader.bool();
          break;
        case 9:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.maker = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SellOrder>): SellOrder {
    const message = createBaseSellOrder();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.seller = object.seller ?? new Uint8Array();
    message.batchKey = object.batchKey !== undefined && object.batchKey !== null ? BigInt(object.batchKey.toString()) : BigInt(0);
    message.quantity = object.quantity ?? "";
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.askAmount = object.askAmount ?? "";
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.expiration = object.expiration ?? undefined;
    message.maker = object.maker ?? false;
    return message;
  },
  fromAmino(object: SellOrderAmino): SellOrder {
    const message = createBaseSellOrder();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = bytesFromBase64(object.seller);
    }
    if (object.batch_key !== undefined && object.batch_key !== null) {
      message.batchKey = BigInt(object.batch_key);
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = object.quantity;
    }
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = BigInt(object.market_id);
    }
    if (object.ask_amount !== undefined && object.ask_amount !== null) {
      message.askAmount = object.ask_amount;
    }
    if (object.disable_auto_retire !== undefined && object.disable_auto_retire !== null) {
      message.disableAutoRetire = object.disable_auto_retire;
    }
    if (object.expiration !== undefined && object.expiration !== null) {
      message.expiration = fromTimestamp(Timestamp.fromAmino(object.expiration));
    }
    if (object.maker !== undefined && object.maker !== null) {
      message.maker = object.maker;
    }
    return message;
  },
  toAmino(message: SellOrder, useInterfaces: boolean = false): SellOrderAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.seller = message.seller ? base64FromBytes(message.seller) : undefined;
    obj.batch_key = message.batchKey !== BigInt(0) ? message.batchKey.toString() : undefined;
    obj.quantity = message.quantity === "" ? undefined : message.quantity;
    obj.market_id = message.marketId !== BigInt(0) ? message.marketId.toString() : undefined;
    obj.ask_amount = message.askAmount === "" ? undefined : message.askAmount;
    obj.disable_auto_retire = message.disableAutoRetire === false ? undefined : message.disableAutoRetire;
    obj.expiration = message.expiration ? Timestamp.toAmino(toTimestamp(message.expiration)) : undefined;
    obj.maker = message.maker === false ? undefined : message.maker;
    return obj;
  },
  fromAminoMsg(object: SellOrderAminoMsg): SellOrder {
    return SellOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: SellOrderProtoMsg, useInterfaces: boolean = false): SellOrder {
    return SellOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SellOrder): Uint8Array {
    return SellOrder.encode(message).finish();
  },
  toProtoMsg(message: SellOrder): SellOrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.SellOrder",
      value: SellOrder.encode(message).finish()
    };
  }
};
function createBaseAllowedDenom(): AllowedDenom {
  return {
    bankDenom: "",
    displayDenom: "",
    exponent: 0
  };
}
export const AllowedDenom = {
  typeUrl: "/regen.ecocredit.marketplace.v1.AllowedDenom",
  encode(message: AllowedDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bankDenom !== "") {
      writer.uint32(10).string(message.bankDenom);
    }
    if (message.displayDenom !== "") {
      writer.uint32(18).string(message.displayDenom);
    }
    if (message.exponent !== 0) {
      writer.uint32(24).uint32(message.exponent);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowedDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bankDenom = reader.string();
          break;
        case 2:
          message.displayDenom = reader.string();
          break;
        case 3:
          message.exponent = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowedDenom>): AllowedDenom {
    const message = createBaseAllowedDenom();
    message.bankDenom = object.bankDenom ?? "";
    message.displayDenom = object.displayDenom ?? "";
    message.exponent = object.exponent ?? 0;
    return message;
  },
  fromAmino(object: AllowedDenomAmino): AllowedDenom {
    const message = createBaseAllowedDenom();
    if (object.bank_denom !== undefined && object.bank_denom !== null) {
      message.bankDenom = object.bank_denom;
    }
    if (object.display_denom !== undefined && object.display_denom !== null) {
      message.displayDenom = object.display_denom;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    return message;
  },
  toAmino(message: AllowedDenom, useInterfaces: boolean = false): AllowedDenomAmino {
    const obj: any = {};
    obj.bank_denom = message.bankDenom === "" ? undefined : message.bankDenom;
    obj.display_denom = message.displayDenom === "" ? undefined : message.displayDenom;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    return obj;
  },
  fromAminoMsg(object: AllowedDenomAminoMsg): AllowedDenom {
    return AllowedDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowedDenomProtoMsg, useInterfaces: boolean = false): AllowedDenom {
    return AllowedDenom.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowedDenom): Uint8Array {
    return AllowedDenom.encode(message).finish();
  },
  toProtoMsg(message: AllowedDenom): AllowedDenomProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.AllowedDenom",
      value: AllowedDenom.encode(message).finish()
    };
  }
};
function createBaseMarket(): Market {
  return {
    id: BigInt(0),
    creditTypeAbbrev: "",
    bankDenom: "",
    precisionModifier: 0
  };
}
export const Market = {
  typeUrl: "/regen.ecocredit.marketplace.v1.Market",
  encode(message: Market, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(18).string(message.creditTypeAbbrev);
    }
    if (message.bankDenom !== "") {
      writer.uint32(26).string(message.bankDenom);
    }
    if (message.precisionModifier !== 0) {
      writer.uint32(32).uint32(message.precisionModifier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Market {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creditTypeAbbrev = reader.string();
          break;
        case 3:
          message.bankDenom = reader.string();
          break;
        case 4:
          message.precisionModifier = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Market>): Market {
    const message = createBaseMarket();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    message.bankDenom = object.bankDenom ?? "";
    message.precisionModifier = object.precisionModifier ?? 0;
    return message;
  },
  fromAmino(object: MarketAmino): Market {
    const message = createBaseMarket();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.credit_type_abbrev !== undefined && object.credit_type_abbrev !== null) {
      message.creditTypeAbbrev = object.credit_type_abbrev;
    }
    if (object.bank_denom !== undefined && object.bank_denom !== null) {
      message.bankDenom = object.bank_denom;
    }
    if (object.precision_modifier !== undefined && object.precision_modifier !== null) {
      message.precisionModifier = object.precision_modifier;
    }
    return message;
  },
  toAmino(message: Market, useInterfaces: boolean = false): MarketAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.credit_type_abbrev = message.creditTypeAbbrev === "" ? undefined : message.creditTypeAbbrev;
    obj.bank_denom = message.bankDenom === "" ? undefined : message.bankDenom;
    obj.precision_modifier = message.precisionModifier === 0 ? undefined : message.precisionModifier;
    return obj;
  },
  fromAminoMsg(object: MarketAminoMsg): Market {
    return Market.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketProtoMsg, useInterfaces: boolean = false): Market {
    return Market.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Market): Uint8Array {
    return Market.encode(message).finish();
  },
  toProtoMsg(message: Market): MarketProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.Market",
      value: Market.encode(message).finish()
    };
  }
};
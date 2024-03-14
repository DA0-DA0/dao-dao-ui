import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/**
 * BuyOrderSellOrderMatch defines the data the FIFO/price-time-priority matching
 * algorithm used to actually match buy and sell orders.
 */
export interface BuyOrderSellOrderMatch {
  /** market_id defines the market within which this match exists. */
  marketId: bigint;
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** sell_order_id is the sell order ID. */
  sellOrderId: bigint;
  /**
   * bid_price_complement is the the complement (^ operator) of the bid price
   * encoded as a uint32 (which should have sufficient precision) - effectively
   * ~price * 10^exponent (usually 10^6). The complement is used so that bids
   * can be sorted high to low.
   */
  bidPriceComplement: number;
  /**
   * ask_price is the ask price encoded to a uint32. Ask prices are sorted low
   * to high.
   */
  askPrice: number;
}
export interface BuyOrderSellOrderMatchProtoMsg {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch";
  value: Uint8Array;
}
/**
 * BuyOrderSellOrderMatch defines the data the FIFO/price-time-priority matching
 * algorithm used to actually match buy and sell orders.
 */
export interface BuyOrderSellOrderMatchAmino {
  /** market_id defines the market within which this match exists. */
  market_id?: string;
  /** buy_order_id is the buy order ID. */
  buy_order_id?: string;
  /** sell_order_id is the sell order ID. */
  sell_order_id?: string;
  /**
   * bid_price_complement is the the complement (^ operator) of the bid price
   * encoded as a uint32 (which should have sufficient precision) - effectively
   * ~price * 10^exponent (usually 10^6). The complement is used so that bids
   * can be sorted high to low.
   */
  bid_price_complement?: number;
  /**
   * ask_price is the ask price encoded to a uint32. Ask prices are sorted low
   * to high.
   */
  ask_price?: number;
}
export interface BuyOrderSellOrderMatchAminoMsg {
  type: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch";
  value: BuyOrderSellOrderMatchAmino;
}
/**
 * BuyOrderSellOrderMatch defines the data the FIFO/price-time-priority matching
 * algorithm used to actually match buy and sell orders.
 */
export interface BuyOrderSellOrderMatchSDKType {
  market_id: bigint;
  buy_order_id: bigint;
  sell_order_id: bigint;
  bid_price_complement: number;
  ask_price: number;
}
/** BuyOrderClassSelector indexes a buy order with class selector. */
export interface BuyOrderClassSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** class_id is the class ID. */
  classId: bigint;
  /** project_location is the project location in the selector's criteria. */
  projectLocation: string;
  /** min_start_date is the minimum start date in the selector's criteria. */
  minStartDate?: Date | undefined;
  /** max_end_date is the maximum end date in the selector's criteria. */
  maxEndDate?: Date | undefined;
}
export interface BuyOrderClassSelectorProtoMsg {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector";
  value: Uint8Array;
}
/** BuyOrderClassSelector indexes a buy order with class selector. */
export interface BuyOrderClassSelectorAmino {
  /** buy_order_id is the buy order ID. */
  buy_order_id?: string;
  /** class_id is the class ID. */
  class_id?: string;
  /** project_location is the project location in the selector's criteria. */
  project_location?: string;
  /** min_start_date is the minimum start date in the selector's criteria. */
  min_start_date?: string | undefined;
  /** max_end_date is the maximum end date in the selector's criteria. */
  max_end_date?: string | undefined;
}
export interface BuyOrderClassSelectorAminoMsg {
  type: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector";
  value: BuyOrderClassSelectorAmino;
}
/** BuyOrderClassSelector indexes a buy order with class selector. */
export interface BuyOrderClassSelectorSDKType {
  buy_order_id: bigint;
  class_id: bigint;
  project_location: string;
  min_start_date?: Date | undefined;
  max_end_date?: Date | undefined;
}
/** BuyOrderProjectSelector indexes a buy order with project selector. */
export interface BuyOrderProjectSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** project_id is the project ID. */
  projectId: bigint;
  /** min_start_date is the minimum start date in the selector's criteria. */
  minStartDate?: Date | undefined;
  /** max_end_date is the maximum end date in the selector's criteria. */
  maxEndDate?: Date | undefined;
}
export interface BuyOrderProjectSelectorProtoMsg {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector";
  value: Uint8Array;
}
/** BuyOrderProjectSelector indexes a buy order with project selector. */
export interface BuyOrderProjectSelectorAmino {
  /** buy_order_id is the buy order ID. */
  buy_order_id?: string;
  /** project_id is the project ID. */
  project_id?: string;
  /** min_start_date is the minimum start date in the selector's criteria. */
  min_start_date?: string | undefined;
  /** max_end_date is the maximum end date in the selector's criteria. */
  max_end_date?: string | undefined;
}
export interface BuyOrderProjectSelectorAminoMsg {
  type: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector";
  value: BuyOrderProjectSelectorAmino;
}
/** BuyOrderProjectSelector indexes a buy order with project selector. */
export interface BuyOrderProjectSelectorSDKType {
  buy_order_id: bigint;
  project_id: bigint;
  min_start_date?: Date | undefined;
  max_end_date?: Date | undefined;
}
/** BuyOrderBatchSelector indexes a buy order with batch selector. */
export interface BuyOrderBatchSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** batch_id is the batch ID. */
  batchId: bigint;
}
export interface BuyOrderBatchSelectorProtoMsg {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector";
  value: Uint8Array;
}
/** BuyOrderBatchSelector indexes a buy order with batch selector. */
export interface BuyOrderBatchSelectorAmino {
  /** buy_order_id is the buy order ID. */
  buy_order_id?: string;
  /** batch_id is the batch ID. */
  batch_id?: string;
}
export interface BuyOrderBatchSelectorAminoMsg {
  type: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector";
  value: BuyOrderBatchSelectorAmino;
}
/** BuyOrderBatchSelector indexes a buy order with batch selector. */
export interface BuyOrderBatchSelectorSDKType {
  buy_order_id: bigint;
  batch_id: bigint;
}
function createBaseBuyOrderSellOrderMatch(): BuyOrderSellOrderMatch {
  return {
    marketId: BigInt(0),
    buyOrderId: BigInt(0),
    sellOrderId: BigInt(0),
    bidPriceComplement: 0,
    askPrice: 0
  };
}
export const BuyOrderSellOrderMatch = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch",
  encode(message: BuyOrderSellOrderMatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.marketId);
    }
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(16).uint64(message.buyOrderId);
    }
    if (message.sellOrderId !== BigInt(0)) {
      writer.uint32(24).uint64(message.sellOrderId);
    }
    if (message.bidPriceComplement !== 0) {
      writer.uint32(37).fixed32(message.bidPriceComplement);
    }
    if (message.askPrice !== 0) {
      writer.uint32(45).fixed32(message.askPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BuyOrderSellOrderMatch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderSellOrderMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint64();
          break;
        case 2:
          message.buyOrderId = reader.uint64();
          break;
        case 3:
          message.sellOrderId = reader.uint64();
          break;
        case 4:
          message.bidPriceComplement = reader.fixed32();
          break;
        case 5:
          message.askPrice = reader.fixed32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderSellOrderMatch>): BuyOrderSellOrderMatch {
    const message = createBaseBuyOrderSellOrderMatch();
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.sellOrderId = object.sellOrderId !== undefined && object.sellOrderId !== null ? BigInt(object.sellOrderId.toString()) : BigInt(0);
    message.bidPriceComplement = object.bidPriceComplement ?? 0;
    message.askPrice = object.askPrice ?? 0;
    return message;
  },
  fromAmino(object: BuyOrderSellOrderMatchAmino): BuyOrderSellOrderMatch {
    const message = createBaseBuyOrderSellOrderMatch();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = BigInt(object.market_id);
    }
    if (object.buy_order_id !== undefined && object.buy_order_id !== null) {
      message.buyOrderId = BigInt(object.buy_order_id);
    }
    if (object.sell_order_id !== undefined && object.sell_order_id !== null) {
      message.sellOrderId = BigInt(object.sell_order_id);
    }
    if (object.bid_price_complement !== undefined && object.bid_price_complement !== null) {
      message.bidPriceComplement = object.bid_price_complement;
    }
    if (object.ask_price !== undefined && object.ask_price !== null) {
      message.askPrice = object.ask_price;
    }
    return message;
  },
  toAmino(message: BuyOrderSellOrderMatch, useInterfaces: boolean = false): BuyOrderSellOrderMatchAmino {
    const obj: any = {};
    obj.market_id = message.marketId ? message.marketId.toString() : undefined;
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.sell_order_id = message.sellOrderId ? message.sellOrderId.toString() : undefined;
    obj.bid_price_complement = message.bidPriceComplement;
    obj.ask_price = message.askPrice;
    return obj;
  },
  fromAminoMsg(object: BuyOrderSellOrderMatchAminoMsg): BuyOrderSellOrderMatch {
    return BuyOrderSellOrderMatch.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderSellOrderMatchProtoMsg, useInterfaces: boolean = false): BuyOrderSellOrderMatch {
    return BuyOrderSellOrderMatch.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BuyOrderSellOrderMatch): Uint8Array {
    return BuyOrderSellOrderMatch.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderSellOrderMatch): BuyOrderSellOrderMatchProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch",
      value: BuyOrderSellOrderMatch.encode(message).finish()
    };
  }
};
function createBaseBuyOrderClassSelector(): BuyOrderClassSelector {
  return {
    buyOrderId: BigInt(0),
    classId: BigInt(0),
    projectLocation: "",
    minStartDate: undefined,
    maxEndDate: undefined
  };
}
export const BuyOrderClassSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector",
  encode(message: BuyOrderClassSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.classId !== BigInt(0)) {
      writer.uint32(16).uint64(message.classId);
    }
    if (message.projectLocation !== "") {
      writer.uint32(26).string(message.projectLocation);
    }
    if (message.minStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.minStartDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.maxEndDate !== undefined) {
      Timestamp.encode(toTimestamp(message.maxEndDate), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BuyOrderClassSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderClassSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.classId = reader.uint64();
          break;
        case 3:
          message.projectLocation = reader.string();
          break;
        case 4:
          message.minStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.maxEndDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderClassSelector>): BuyOrderClassSelector {
    const message = createBaseBuyOrderClassSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.classId = object.classId !== undefined && object.classId !== null ? BigInt(object.classId.toString()) : BigInt(0);
    message.projectLocation = object.projectLocation ?? "";
    message.minStartDate = object.minStartDate ?? undefined;
    message.maxEndDate = object.maxEndDate ?? undefined;
    return message;
  },
  fromAmino(object: BuyOrderClassSelectorAmino): BuyOrderClassSelector {
    const message = createBaseBuyOrderClassSelector();
    if (object.buy_order_id !== undefined && object.buy_order_id !== null) {
      message.buyOrderId = BigInt(object.buy_order_id);
    }
    if (object.class_id !== undefined && object.class_id !== null) {
      message.classId = BigInt(object.class_id);
    }
    if (object.project_location !== undefined && object.project_location !== null) {
      message.projectLocation = object.project_location;
    }
    if (object.min_start_date !== undefined && object.min_start_date !== null) {
      message.minStartDate = fromTimestamp(Timestamp.fromAmino(object.min_start_date));
    }
    if (object.max_end_date !== undefined && object.max_end_date !== null) {
      message.maxEndDate = fromTimestamp(Timestamp.fromAmino(object.max_end_date));
    }
    return message;
  },
  toAmino(message: BuyOrderClassSelector, useInterfaces: boolean = false): BuyOrderClassSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.class_id = message.classId ? message.classId.toString() : undefined;
    obj.project_location = message.projectLocation;
    obj.min_start_date = message.minStartDate ? Timestamp.toAmino(toTimestamp(message.minStartDate)) : undefined;
    obj.max_end_date = message.maxEndDate ? Timestamp.toAmino(toTimestamp(message.maxEndDate)) : undefined;
    return obj;
  },
  fromAminoMsg(object: BuyOrderClassSelectorAminoMsg): BuyOrderClassSelector {
    return BuyOrderClassSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderClassSelectorProtoMsg, useInterfaces: boolean = false): BuyOrderClassSelector {
    return BuyOrderClassSelector.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BuyOrderClassSelector): Uint8Array {
    return BuyOrderClassSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderClassSelector): BuyOrderClassSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector",
      value: BuyOrderClassSelector.encode(message).finish()
    };
  }
};
function createBaseBuyOrderProjectSelector(): BuyOrderProjectSelector {
  return {
    buyOrderId: BigInt(0),
    projectId: BigInt(0),
    minStartDate: undefined,
    maxEndDate: undefined
  };
}
export const BuyOrderProjectSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector",
  encode(message: BuyOrderProjectSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.projectId !== BigInt(0)) {
      writer.uint32(16).uint64(message.projectId);
    }
    if (message.minStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.minStartDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.maxEndDate !== undefined) {
      Timestamp.encode(toTimestamp(message.maxEndDate), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BuyOrderProjectSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderProjectSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.projectId = reader.uint64();
          break;
        case 3:
          message.minStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.maxEndDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderProjectSelector>): BuyOrderProjectSelector {
    const message = createBaseBuyOrderProjectSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.projectId = object.projectId !== undefined && object.projectId !== null ? BigInt(object.projectId.toString()) : BigInt(0);
    message.minStartDate = object.minStartDate ?? undefined;
    message.maxEndDate = object.maxEndDate ?? undefined;
    return message;
  },
  fromAmino(object: BuyOrderProjectSelectorAmino): BuyOrderProjectSelector {
    const message = createBaseBuyOrderProjectSelector();
    if (object.buy_order_id !== undefined && object.buy_order_id !== null) {
      message.buyOrderId = BigInt(object.buy_order_id);
    }
    if (object.project_id !== undefined && object.project_id !== null) {
      message.projectId = BigInt(object.project_id);
    }
    if (object.min_start_date !== undefined && object.min_start_date !== null) {
      message.minStartDate = fromTimestamp(Timestamp.fromAmino(object.min_start_date));
    }
    if (object.max_end_date !== undefined && object.max_end_date !== null) {
      message.maxEndDate = fromTimestamp(Timestamp.fromAmino(object.max_end_date));
    }
    return message;
  },
  toAmino(message: BuyOrderProjectSelector, useInterfaces: boolean = false): BuyOrderProjectSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.project_id = message.projectId ? message.projectId.toString() : undefined;
    obj.min_start_date = message.minStartDate ? Timestamp.toAmino(toTimestamp(message.minStartDate)) : undefined;
    obj.max_end_date = message.maxEndDate ? Timestamp.toAmino(toTimestamp(message.maxEndDate)) : undefined;
    return obj;
  },
  fromAminoMsg(object: BuyOrderProjectSelectorAminoMsg): BuyOrderProjectSelector {
    return BuyOrderProjectSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderProjectSelectorProtoMsg, useInterfaces: boolean = false): BuyOrderProjectSelector {
    return BuyOrderProjectSelector.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BuyOrderProjectSelector): Uint8Array {
    return BuyOrderProjectSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderProjectSelector): BuyOrderProjectSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector",
      value: BuyOrderProjectSelector.encode(message).finish()
    };
  }
};
function createBaseBuyOrderBatchSelector(): BuyOrderBatchSelector {
  return {
    buyOrderId: BigInt(0),
    batchId: BigInt(0)
  };
}
export const BuyOrderBatchSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector",
  encode(message: BuyOrderBatchSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.batchId !== BigInt(0)) {
      writer.uint32(16).uint64(message.batchId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BuyOrderBatchSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderBatchSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.batchId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderBatchSelector>): BuyOrderBatchSelector {
    const message = createBaseBuyOrderBatchSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.batchId = object.batchId !== undefined && object.batchId !== null ? BigInt(object.batchId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BuyOrderBatchSelectorAmino): BuyOrderBatchSelector {
    const message = createBaseBuyOrderBatchSelector();
    if (object.buy_order_id !== undefined && object.buy_order_id !== null) {
      message.buyOrderId = BigInt(object.buy_order_id);
    }
    if (object.batch_id !== undefined && object.batch_id !== null) {
      message.batchId = BigInt(object.batch_id);
    }
    return message;
  },
  toAmino(message: BuyOrderBatchSelector, useInterfaces: boolean = false): BuyOrderBatchSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.batch_id = message.batchId ? message.batchId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BuyOrderBatchSelectorAminoMsg): BuyOrderBatchSelector {
    return BuyOrderBatchSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderBatchSelectorProtoMsg, useInterfaces: boolean = false): BuyOrderBatchSelector {
    return BuyOrderBatchSelector.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BuyOrderBatchSelector): Uint8Array {
    return BuyOrderBatchSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderBatchSelector): BuyOrderBatchSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector",
      value: BuyOrderBatchSelector.encode(message).finish()
    };
  }
};
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface PairMatchProposal {
  poolId: bigint;
  whitelistedRoute: boolean;
  tokenIn: string;
  tokenOut: string;
  buyOrders: bigint[];
  sellOrders: bigint[];
}
export interface PairMatchProposalProtoMsg {
  typeUrl: "/pryzm.amm.v1.PairMatchProposal";
  value: Uint8Array;
}
export interface PairMatchProposalAmino {
  pool_id: string;
  whitelisted_route: boolean;
  token_in?: string;
  token_out?: string;
  buy_orders: string[];
  sell_orders: string[];
}
export interface PairMatchProposalAminoMsg {
  type: "/pryzm.amm.v1.PairMatchProposal";
  value: PairMatchProposalAmino;
}
export interface PairMatchProposalSDKType {
  pool_id: bigint;
  whitelisted_route: boolean;
  token_in: string;
  token_out: string;
  buy_orders: bigint[];
  sell_orders: bigint[];
}
export interface MatchedOrderSummary {
  /**
   * Note that if virtual=true, order_id is set to zero and should be ignored,
   * otherwise we still might have order_id=0 referring to an actual order
   */
  orderId: bigint;
  matchAmount: string;
  outputAmount: string;
  virtual: boolean;
}
export interface MatchedOrderSummaryProtoMsg {
  typeUrl: "/pryzm.amm.v1.MatchedOrderSummary";
  value: Uint8Array;
}
export interface MatchedOrderSummaryAmino {
  /**
   * Note that if virtual=true, order_id is set to zero and should be ignored,
   * otherwise we still might have order_id=0 referring to an actual order
   */
  order_id?: string;
  match_amount?: string;
  output_amount?: string;
  virtual?: boolean;
}
export interface MatchedOrderSummaryAminoMsg {
  type: "/pryzm.amm.v1.MatchedOrderSummary";
  value: MatchedOrderSummaryAmino;
}
export interface MatchedOrderSummarySDKType {
  order_id: bigint;
  match_amount: string;
  output_amount: string;
  virtual: boolean;
}
export interface MatchedPairSummary {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  whitelistedRoute: boolean;
  buyPrice: string;
  sellPrice: string;
  buyOrders: MatchedOrderSummary[];
  sellOrders: MatchedOrderSummary[];
  buyMatchAmount: string;
  sellMatchAmount: string;
}
export interface MatchedPairSummaryProtoMsg {
  typeUrl: "/pryzm.amm.v1.MatchedPairSummary";
  value: Uint8Array;
}
export interface MatchedPairSummaryAmino {
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  whitelisted_route?: boolean;
  buy_price?: string;
  sell_price?: string;
  buy_orders?: MatchedOrderSummaryAmino[];
  sell_orders?: MatchedOrderSummaryAmino[];
  buy_match_amount?: string;
  sell_match_amount?: string;
}
export interface MatchedPairSummaryAminoMsg {
  type: "/pryzm.amm.v1.MatchedPairSummary";
  value: MatchedPairSummaryAmino;
}
export interface MatchedPairSummarySDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
  whitelisted_route: boolean;
  buy_price: string;
  sell_price: string;
  buy_orders: MatchedOrderSummarySDKType[];
  sell_orders: MatchedOrderSummarySDKType[];
  buy_match_amount: string;
  sell_match_amount: string;
}
function createBasePairMatchProposal(): PairMatchProposal {
  return {
    poolId: BigInt(0),
    whitelistedRoute: false,
    tokenIn: "",
    tokenOut: "",
    buyOrders: [],
    sellOrders: []
  };
}
export const PairMatchProposal = {
  typeUrl: "/pryzm.amm.v1.PairMatchProposal",
  encode(message: PairMatchProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.whitelistedRoute === true) {
      writer.uint32(16).bool(message.whitelistedRoute);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    writer.uint32(42).fork();
    for (const v of message.buyOrders) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(50).fork();
    for (const v of message.sellOrders) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PairMatchProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairMatchProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.whitelistedRoute = reader.bool();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.buyOrders.push(reader.uint64());
            }
          } else {
            message.buyOrders.push(reader.uint64());
          }
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sellOrders.push(reader.uint64());
            }
          } else {
            message.sellOrders.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PairMatchProposal>): PairMatchProposal {
    const message = createBasePairMatchProposal();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.buyOrders = object.buyOrders?.map(e => BigInt(e.toString())) || [];
    message.sellOrders = object.sellOrders?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: PairMatchProposalAmino): PairMatchProposal {
    const message = createBasePairMatchProposal();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = object.whitelisted_route;
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    message.buyOrders = object.buy_orders?.map(e => BigInt(e)) || [];
    message.sellOrders = object.sell_orders?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: PairMatchProposal, useInterfaces: boolean = false): PairMatchProposalAmino {
    const obj: any = {};
    obj.pool_id = message.poolId ? message.poolId.toString() : "0";
    obj.whitelisted_route = message.whitelistedRoute ?? false;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    if (message.buyOrders) {
      obj.buy_orders = message.buyOrders.map(e => e.toString());
    } else {
      obj.buy_orders = message.buyOrders;
    }
    if (message.sellOrders) {
      obj.sell_orders = message.sellOrders.map(e => e.toString());
    } else {
      obj.sell_orders = message.sellOrders;
    }
    return obj;
  },
  fromAminoMsg(object: PairMatchProposalAminoMsg): PairMatchProposal {
    return PairMatchProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: PairMatchProposalProtoMsg, useInterfaces: boolean = false): PairMatchProposal {
    return PairMatchProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PairMatchProposal): Uint8Array {
    return PairMatchProposal.encode(message).finish();
  },
  toProtoMsg(message: PairMatchProposal): PairMatchProposalProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.PairMatchProposal",
      value: PairMatchProposal.encode(message).finish()
    };
  }
};
function createBaseMatchedOrderSummary(): MatchedOrderSummary {
  return {
    orderId: BigInt(0),
    matchAmount: "",
    outputAmount: "",
    virtual: false
  };
}
export const MatchedOrderSummary = {
  typeUrl: "/pryzm.amm.v1.MatchedOrderSummary",
  encode(message: MatchedOrderSummary, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    if (message.matchAmount !== "") {
      writer.uint32(26).string(message.matchAmount);
    }
    if (message.outputAmount !== "") {
      writer.uint32(34).string(message.outputAmount);
    }
    if (message.virtual === true) {
      writer.uint32(40).bool(message.virtual);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MatchedOrderSummary {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchedOrderSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        case 3:
          message.matchAmount = reader.string();
          break;
        case 4:
          message.outputAmount = reader.string();
          break;
        case 5:
          message.virtual = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MatchedOrderSummary>): MatchedOrderSummary {
    const message = createBaseMatchedOrderSummary();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    message.matchAmount = object.matchAmount ?? "";
    message.outputAmount = object.outputAmount ?? "";
    message.virtual = object.virtual ?? false;
    return message;
  },
  fromAmino(object: MatchedOrderSummaryAmino): MatchedOrderSummary {
    const message = createBaseMatchedOrderSummary();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    if (object.match_amount !== undefined && object.match_amount !== null) {
      message.matchAmount = object.match_amount;
    }
    if (object.output_amount !== undefined && object.output_amount !== null) {
      message.outputAmount = object.output_amount;
    }
    if (object.virtual !== undefined && object.virtual !== null) {
      message.virtual = object.virtual;
    }
    return message;
  },
  toAmino(message: MatchedOrderSummary, useInterfaces: boolean = false): MatchedOrderSummaryAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    obj.match_amount = message.matchAmount === "" ? undefined : message.matchAmount;
    obj.output_amount = message.outputAmount === "" ? undefined : message.outputAmount;
    obj.virtual = message.virtual === false ? undefined : message.virtual;
    return obj;
  },
  fromAminoMsg(object: MatchedOrderSummaryAminoMsg): MatchedOrderSummary {
    return MatchedOrderSummary.fromAmino(object.value);
  },
  fromProtoMsg(message: MatchedOrderSummaryProtoMsg, useInterfaces: boolean = false): MatchedOrderSummary {
    return MatchedOrderSummary.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MatchedOrderSummary): Uint8Array {
    return MatchedOrderSummary.encode(message).finish();
  },
  toProtoMsg(message: MatchedOrderSummary): MatchedOrderSummaryProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.MatchedOrderSummary",
      value: MatchedOrderSummary.encode(message).finish()
    };
  }
};
function createBaseMatchedPairSummary(): MatchedPairSummary {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    whitelistedRoute: false,
    buyPrice: "",
    sellPrice: "",
    buyOrders: [],
    sellOrders: [],
    buyMatchAmount: "",
    sellMatchAmount: ""
  };
}
export const MatchedPairSummary = {
  typeUrl: "/pryzm.amm.v1.MatchedPairSummary",
  encode(message: MatchedPairSummary, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    if (message.whitelistedRoute === true) {
      writer.uint32(32).bool(message.whitelistedRoute);
    }
    if (message.buyPrice !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.buyPrice, 18).atomics);
    }
    if (message.sellPrice !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.sellPrice, 18).atomics);
    }
    for (const v of message.buyOrders) {
      MatchedOrderSummary.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.sellOrders) {
      MatchedOrderSummary.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.buyMatchAmount !== "") {
      writer.uint32(74).string(message.buyMatchAmount);
    }
    if (message.sellMatchAmount !== "") {
      writer.uint32(82).string(message.sellMatchAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MatchedPairSummary {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchedPairSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.tokenIn = reader.string();
          break;
        case 3:
          message.tokenOut = reader.string();
          break;
        case 4:
          message.whitelistedRoute = reader.bool();
          break;
        case 5:
          message.buyPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.sellPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.buyOrders.push(MatchedOrderSummary.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.sellOrders.push(MatchedOrderSummary.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.buyMatchAmount = reader.string();
          break;
        case 10:
          message.sellMatchAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MatchedPairSummary>): MatchedPairSummary {
    const message = createBaseMatchedPairSummary();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.buyPrice = object.buyPrice ?? "";
    message.sellPrice = object.sellPrice ?? "";
    message.buyOrders = object.buyOrders?.map(e => MatchedOrderSummary.fromPartial(e)) || [];
    message.sellOrders = object.sellOrders?.map(e => MatchedOrderSummary.fromPartial(e)) || [];
    message.buyMatchAmount = object.buyMatchAmount ?? "";
    message.sellMatchAmount = object.sellMatchAmount ?? "";
    return message;
  },
  fromAmino(object: MatchedPairSummaryAmino): MatchedPairSummary {
    const message = createBaseMatchedPairSummary();
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
    if (object.buy_price !== undefined && object.buy_price !== null) {
      message.buyPrice = object.buy_price;
    }
    if (object.sell_price !== undefined && object.sell_price !== null) {
      message.sellPrice = object.sell_price;
    }
    message.buyOrders = object.buy_orders?.map(e => MatchedOrderSummary.fromAmino(e)) || [];
    message.sellOrders = object.sell_orders?.map(e => MatchedOrderSummary.fromAmino(e)) || [];
    if (object.buy_match_amount !== undefined && object.buy_match_amount !== null) {
      message.buyMatchAmount = object.buy_match_amount;
    }
    if (object.sell_match_amount !== undefined && object.sell_match_amount !== null) {
      message.sellMatchAmount = object.sell_match_amount;
    }
    return message;
  },
  toAmino(message: MatchedPairSummary, useInterfaces: boolean = false): MatchedPairSummaryAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.buy_price = message.buyPrice === "" ? undefined : message.buyPrice;
    obj.sell_price = message.sellPrice === "" ? undefined : message.sellPrice;
    if (message.buyOrders) {
      obj.buy_orders = message.buyOrders.map(e => e ? MatchedOrderSummary.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.buy_orders = message.buyOrders;
    }
    if (message.sellOrders) {
      obj.sell_orders = message.sellOrders.map(e => e ? MatchedOrderSummary.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sell_orders = message.sellOrders;
    }
    obj.buy_match_amount = message.buyMatchAmount === "" ? undefined : message.buyMatchAmount;
    obj.sell_match_amount = message.sellMatchAmount === "" ? undefined : message.sellMatchAmount;
    return obj;
  },
  fromAminoMsg(object: MatchedPairSummaryAminoMsg): MatchedPairSummary {
    return MatchedPairSummary.fromAmino(object.value);
  },
  fromProtoMsg(message: MatchedPairSummaryProtoMsg, useInterfaces: boolean = false): MatchedPairSummary {
    return MatchedPairSummary.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MatchedPairSummary): Uint8Array {
    return MatchedPairSummary.encode(message).finish();
  },
  toProtoMsg(message: MatchedPairSummary): MatchedPairSummaryProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.MatchedPairSummary",
      value: MatchedPairSummary.encode(message).finish()
    };
  }
};
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** TokenPairArbRoutes tracks all of the hot routes for a given pair of tokens */
export interface TokenPairArbRoutes {
  /** Stores all of the possible hot paths for a given pair of tokens */
  arbRoutes: Route[];
  /** Token denomination of the first asset */
  tokenIn: string;
  /** Token denomination of the second asset */
  tokenOut: string;
}
export interface TokenPairArbRoutesProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.TokenPairArbRoutes";
  value: Uint8Array;
}
/** TokenPairArbRoutes tracks all of the hot routes for a given pair of tokens */
export interface TokenPairArbRoutesAmino {
  /** Stores all of the possible hot paths for a given pair of tokens */
  arb_routes: RouteAmino[];
  /** Token denomination of the first asset */
  token_in: string;
  /** Token denomination of the second asset */
  token_out: string;
}
export interface TokenPairArbRoutesAminoMsg {
  type: "osmosis/protorev/token-pair-arb-routes";
  value: TokenPairArbRoutesAmino;
}
/** TokenPairArbRoutes tracks all of the hot routes for a given pair of tokens */
export interface TokenPairArbRoutesSDKType {
  arb_routes: RouteSDKType[];
  token_in: string;
  token_out: string;
}
/** Route is a hot route for a given pair of tokens */
export interface Route {
  /**
   * The pool IDs that are travered in the directed cyclic graph (traversed left
   * -> right)
   */
  trades: Trade[];
  /**
   * The step size that will be used to find the optimal swap amount in the
   * binary search
   */
  stepSize: string;
}
export interface RouteProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.Route";
  value: Uint8Array;
}
/** Route is a hot route for a given pair of tokens */
export interface RouteAmino {
  /**
   * The pool IDs that are travered in the directed cyclic graph (traversed left
   * -> right)
   */
  trades: TradeAmino[];
  /**
   * The step size that will be used to find the optimal swap amount in the
   * binary search
   */
  step_size: string;
}
export interface RouteAminoMsg {
  type: "osmosis/protorev/route";
  value: RouteAmino;
}
/** Route is a hot route for a given pair of tokens */
export interface RouteSDKType {
  trades: TradeSDKType[];
  step_size: string;
}
/** Trade is a single trade in a route */
export interface Trade {
  /** The pool id of the pool that is traded on */
  pool: bigint;
  /** The denom of the token that is traded */
  tokenIn: string;
  /** The denom of the token that is received */
  tokenOut: string;
}
export interface TradeProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.Trade";
  value: Uint8Array;
}
/** Trade is a single trade in a route */
export interface TradeAmino {
  /** The pool id of the pool that is traded on */
  pool: string;
  /** The denom of the token that is traded */
  token_in: string;
  /** The denom of the token that is received */
  token_out: string;
}
export interface TradeAminoMsg {
  type: "osmosis/protorev/trade";
  value: TradeAmino;
}
/** Trade is a single trade in a route */
export interface TradeSDKType {
  pool: bigint;
  token_in: string;
  token_out: string;
}
/**
 * RouteStatistics contains the number of trades the module has executed after a
 * swap on a given route and the profits from the trades
 */
export interface RouteStatistics {
  /** profits is the total profit from all trades on this route */
  profits: Coin[];
  /**
   * number_of_trades is the number of trades the module has executed using this
   * route
   */
  numberOfTrades: string;
  /** route is the route that was used (pool ids along the arbitrage route) */
  route: bigint[];
}
export interface RouteStatisticsProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.RouteStatistics";
  value: Uint8Array;
}
/**
 * RouteStatistics contains the number of trades the module has executed after a
 * swap on a given route and the profits from the trades
 */
export interface RouteStatisticsAmino {
  /** profits is the total profit from all trades on this route */
  profits: CoinAmino[];
  /**
   * number_of_trades is the number of trades the module has executed using this
   * route
   */
  number_of_trades: string;
  /** route is the route that was used (pool ids along the arbitrage route) */
  route: string[];
}
export interface RouteStatisticsAminoMsg {
  type: "osmosis/protorev/route-statistics";
  value: RouteStatisticsAmino;
}
/**
 * RouteStatistics contains the number of trades the module has executed after a
 * swap on a given route and the profits from the trades
 */
export interface RouteStatisticsSDKType {
  profits: CoinSDKType[];
  number_of_trades: string;
  route: bigint[];
}
/**
 * PoolWeights contains the weights of all of the different pool types. This
 * distinction is made and necessary because the execution time ranges
 * significantly between the different pool types. Each weight roughly
 * corresponds to the amount of time (in ms) it takes to execute a swap on that
 * pool type.
 * 
 * DEPRECATED: This field is deprecated and will be removed in the next
 * release. It is replaced by the `info_by_pool_type` field.
 */
export interface PoolWeights {
  /** The weight of a stableswap pool */
  stableWeight: bigint;
  /** The weight of a balancer pool */
  balancerWeight: bigint;
  /** The weight of a concentrated pool */
  concentratedWeight: bigint;
  /** The weight of a cosmwasm pool */
  cosmwasmWeight: bigint;
}
export interface PoolWeightsProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.PoolWeights";
  value: Uint8Array;
}
/**
 * PoolWeights contains the weights of all of the different pool types. This
 * distinction is made and necessary because the execution time ranges
 * significantly between the different pool types. Each weight roughly
 * corresponds to the amount of time (in ms) it takes to execute a swap on that
 * pool type.
 * 
 * DEPRECATED: This field is deprecated and will be removed in the next
 * release. It is replaced by the `info_by_pool_type` field.
 */
export interface PoolWeightsAmino {
  /** The weight of a stableswap pool */
  stable_weight: string;
  /** The weight of a balancer pool */
  balancer_weight: string;
  /** The weight of a concentrated pool */
  concentrated_weight: string;
  /** The weight of a cosmwasm pool */
  cosmwasm_weight: string;
}
export interface PoolWeightsAminoMsg {
  type: "osmosis/protorev/pool-weights";
  value: PoolWeightsAmino;
}
/**
 * PoolWeights contains the weights of all of the different pool types. This
 * distinction is made and necessary because the execution time ranges
 * significantly between the different pool types. Each weight roughly
 * corresponds to the amount of time (in ms) it takes to execute a swap on that
 * pool type.
 * 
 * DEPRECATED: This field is deprecated and will be removed in the next
 * release. It is replaced by the `info_by_pool_type` field.
 */
export interface PoolWeightsSDKType {
  stable_weight: bigint;
  balancer_weight: bigint;
  concentrated_weight: bigint;
  cosmwasm_weight: bigint;
}
/**
 * InfoByPoolType contains information pertaining to how expensive (in terms of
 * gas and time) it is to execute a swap on a given pool type. This distinction
 * is made and necessary because the execution time ranges significantly between
 * the different pool types.
 */
export interface InfoByPoolType {
  /** The stable pool info */
  stable: StablePoolInfo | undefined;
  /** The balancer pool info */
  balancer: BalancerPoolInfo | undefined;
  /** The concentrated pool info */
  concentrated: ConcentratedPoolInfo | undefined;
  /** The cosmwasm pool info */
  cosmwasm: CosmwasmPoolInfo | undefined;
}
export interface InfoByPoolTypeProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.InfoByPoolType";
  value: Uint8Array;
}
/**
 * InfoByPoolType contains information pertaining to how expensive (in terms of
 * gas and time) it is to execute a swap on a given pool type. This distinction
 * is made and necessary because the execution time ranges significantly between
 * the different pool types.
 */
export interface InfoByPoolTypeAmino {
  /** The stable pool info */
  stable?: StablePoolInfoAmino | undefined;
  /** The balancer pool info */
  balancer?: BalancerPoolInfoAmino | undefined;
  /** The concentrated pool info */
  concentrated?: ConcentratedPoolInfoAmino | undefined;
  /** The cosmwasm pool info */
  cosmwasm?: CosmwasmPoolInfoAmino | undefined;
}
export interface InfoByPoolTypeAminoMsg {
  type: "osmosis/protorev/info-by-pool-type";
  value: InfoByPoolTypeAmino;
}
/**
 * InfoByPoolType contains information pertaining to how expensive (in terms of
 * gas and time) it is to execute a swap on a given pool type. This distinction
 * is made and necessary because the execution time ranges significantly between
 * the different pool types.
 */
export interface InfoByPoolTypeSDKType {
  stable: StablePoolInfoSDKType | undefined;
  balancer: BalancerPoolInfoSDKType | undefined;
  concentrated: ConcentratedPoolInfoSDKType | undefined;
  cosmwasm: CosmwasmPoolInfoSDKType | undefined;
}
/** StablePoolInfo contains meta data pertaining to a stableswap pool type. */
export interface StablePoolInfo {
  /** The weight of a stableswap pool */
  weight: bigint;
}
export interface StablePoolInfoProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.StablePoolInfo";
  value: Uint8Array;
}
/** StablePoolInfo contains meta data pertaining to a stableswap pool type. */
export interface StablePoolInfoAmino {
  /** The weight of a stableswap pool */
  weight: string;
}
export interface StablePoolInfoAminoMsg {
  type: "osmosis/protorev/stable-pool-info";
  value: StablePoolInfoAmino;
}
/** StablePoolInfo contains meta data pertaining to a stableswap pool type. */
export interface StablePoolInfoSDKType {
  weight: bigint;
}
/** BalancerPoolInfo contains meta data pertaining to a balancer pool type. */
export interface BalancerPoolInfo {
  /** The weight of a balancer pool */
  weight: bigint;
}
export interface BalancerPoolInfoProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.BalancerPoolInfo";
  value: Uint8Array;
}
/** BalancerPoolInfo contains meta data pertaining to a balancer pool type. */
export interface BalancerPoolInfoAmino {
  /** The weight of a balancer pool */
  weight: string;
}
export interface BalancerPoolInfoAminoMsg {
  type: "osmosis/protorev/balancer-pool-info";
  value: BalancerPoolInfoAmino;
}
/** BalancerPoolInfo contains meta data pertaining to a balancer pool type. */
export interface BalancerPoolInfoSDKType {
  weight: bigint;
}
/**
 * ConcentratedPoolInfo contains meta data pertaining to a concentrated pool
 * type.
 */
export interface ConcentratedPoolInfo {
  /** The weight of a concentrated pool */
  weight: bigint;
  /** The maximum number of ticks we can move when rebalancing */
  maxTicksCrossed: bigint;
}
export interface ConcentratedPoolInfoProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.ConcentratedPoolInfo";
  value: Uint8Array;
}
/**
 * ConcentratedPoolInfo contains meta data pertaining to a concentrated pool
 * type.
 */
export interface ConcentratedPoolInfoAmino {
  /** The weight of a concentrated pool */
  weight: string;
  /** The maximum number of ticks we can move when rebalancing */
  max_ticks_crossed: string;
}
export interface ConcentratedPoolInfoAminoMsg {
  type: "osmosis/protorev/concentrated-pool-info";
  value: ConcentratedPoolInfoAmino;
}
/**
 * ConcentratedPoolInfo contains meta data pertaining to a concentrated pool
 * type.
 */
export interface ConcentratedPoolInfoSDKType {
  weight: bigint;
  max_ticks_crossed: bigint;
}
/** CosmwasmPoolInfo contains meta data pertaining to a cosmwasm pool type. */
export interface CosmwasmPoolInfo {
  /** The weight of a cosmwasm pool (by contract address) */
  weightMaps: WeightMap[];
}
export interface CosmwasmPoolInfoProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.CosmwasmPoolInfo";
  value: Uint8Array;
}
/** CosmwasmPoolInfo contains meta data pertaining to a cosmwasm pool type. */
export interface CosmwasmPoolInfoAmino {
  /** The weight of a cosmwasm pool (by contract address) */
  weight_maps: WeightMapAmino[];
}
export interface CosmwasmPoolInfoAminoMsg {
  type: "osmosis/protorev/cosmwasm-pool-info";
  value: CosmwasmPoolInfoAmino;
}
/** CosmwasmPoolInfo contains meta data pertaining to a cosmwasm pool type. */
export interface CosmwasmPoolInfoSDKType {
  weight_maps: WeightMapSDKType[];
}
/**
 * WeightMap maps a contract address to a weight. The weight of an address
 * corresponds to the amount of ms required to execute a swap on that contract.
 */
export interface WeightMap {
  /** The weight of a cosmwasm pool (by contract address) */
  weight: bigint;
  /** The contract address */
  contractAddress: string;
}
export interface WeightMapProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.WeightMap";
  value: Uint8Array;
}
/**
 * WeightMap maps a contract address to a weight. The weight of an address
 * corresponds to the amount of ms required to execute a swap on that contract.
 */
export interface WeightMapAmino {
  /** The weight of a cosmwasm pool (by contract address) */
  weight: string;
  /** The contract address */
  contract_address: string;
}
export interface WeightMapAminoMsg {
  type: "osmosis/protorev/weight-map";
  value: WeightMapAmino;
}
/**
 * WeightMap maps a contract address to a weight. The weight of an address
 * corresponds to the amount of ms required to execute a swap on that contract.
 */
export interface WeightMapSDKType {
  weight: bigint;
  contract_address: string;
}
/**
 * BaseDenom represents a single base denom that the module uses for its
 * arbitrage trades. It contains the denom name alongside the step size of the
 * binary search that is used to find the optimal swap amount
 */
export interface BaseDenom {
  /** The denom i.e. name of the base denom (ex. uosmo) */
  denom: string;
  /**
   * The step size of the binary search that is used to find the optimal swap
   * amount
   */
  stepSize: string;
}
export interface BaseDenomProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.BaseDenom";
  value: Uint8Array;
}
/**
 * BaseDenom represents a single base denom that the module uses for its
 * arbitrage trades. It contains the denom name alongside the step size of the
 * binary search that is used to find the optimal swap amount
 */
export interface BaseDenomAmino {
  /** The denom i.e. name of the base denom (ex. uosmo) */
  denom: string;
  /**
   * The step size of the binary search that is used to find the optimal swap
   * amount
   */
  step_size: string;
}
export interface BaseDenomAminoMsg {
  type: "osmosis/protorev/base-denom";
  value: BaseDenomAmino;
}
/**
 * BaseDenom represents a single base denom that the module uses for its
 * arbitrage trades. It contains the denom name alongside the step size of the
 * binary search that is used to find the optimal swap amount
 */
export interface BaseDenomSDKType {
  denom: string;
  step_size: string;
}
function createBaseTokenPairArbRoutes(): TokenPairArbRoutes {
  return {
    arbRoutes: [],
    tokenIn: "",
    tokenOut: ""
  };
}
export const TokenPairArbRoutes = {
  typeUrl: "/osmosis.protorev.v1beta1.TokenPairArbRoutes",
  encode(message: TokenPairArbRoutes, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.arbRoutes) {
      Route.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TokenPairArbRoutes {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPairArbRoutes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.arbRoutes.push(Route.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tokenIn = reader.string();
          break;
        case 3:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenPairArbRoutes>): TokenPairArbRoutes {
    const message = createBaseTokenPairArbRoutes();
    message.arbRoutes = object.arbRoutes?.map(e => Route.fromPartial(e)) || [];
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: TokenPairArbRoutesAmino): TokenPairArbRoutes {
    return {
      arbRoutes: Array.isArray(object?.arb_routes) ? object.arb_routes.map((e: any) => Route.fromAmino(e)) : [],
      tokenIn: object.token_in,
      tokenOut: object.token_out
    };
  },
  toAmino(message: TokenPairArbRoutes): TokenPairArbRoutesAmino {
    const obj: any = {};
    if (message.arbRoutes) {
      obj.arb_routes = message.arbRoutes.map(e => e ? Route.toAmino(e) : undefined);
    } else {
      obj.arb_routes = [];
    }
    obj.token_in = message.tokenIn;
    obj.token_out = message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: TokenPairArbRoutesAminoMsg): TokenPairArbRoutes {
    return TokenPairArbRoutes.fromAmino(object.value);
  },
  toAminoMsg(message: TokenPairArbRoutes): TokenPairArbRoutesAminoMsg {
    return {
      type: "osmosis/protorev/token-pair-arb-routes",
      value: TokenPairArbRoutes.toAmino(message)
    };
  },
  fromProtoMsg(message: TokenPairArbRoutesProtoMsg): TokenPairArbRoutes {
    return TokenPairArbRoutes.decode(message.value);
  },
  toProto(message: TokenPairArbRoutes): Uint8Array {
    return TokenPairArbRoutes.encode(message).finish();
  },
  toProtoMsg(message: TokenPairArbRoutes): TokenPairArbRoutesProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.TokenPairArbRoutes",
      value: TokenPairArbRoutes.encode(message).finish()
    };
  }
};
function createBaseRoute(): Route {
  return {
    trades: [],
    stepSize: ""
  };
}
export const Route = {
  typeUrl: "/osmosis.protorev.v1beta1.Route",
  encode(message: Route, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.trades) {
      Trade.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.stepSize !== "") {
      writer.uint32(18).string(message.stepSize);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Route {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trades.push(Trade.decode(reader, reader.uint32()));
          break;
        case 2:
          message.stepSize = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Route>): Route {
    const message = createBaseRoute();
    message.trades = object.trades?.map(e => Trade.fromPartial(e)) || [];
    message.stepSize = object.stepSize ?? "";
    return message;
  },
  fromAmino(object: RouteAmino): Route {
    return {
      trades: Array.isArray(object?.trades) ? object.trades.map((e: any) => Trade.fromAmino(e)) : [],
      stepSize: object.step_size
    };
  },
  toAmino(message: Route): RouteAmino {
    const obj: any = {};
    if (message.trades) {
      obj.trades = message.trades.map(e => e ? Trade.toAmino(e) : undefined);
    } else {
      obj.trades = [];
    }
    obj.step_size = message.stepSize;
    return obj;
  },
  fromAminoMsg(object: RouteAminoMsg): Route {
    return Route.fromAmino(object.value);
  },
  toAminoMsg(message: Route): RouteAminoMsg {
    return {
      type: "osmosis/protorev/route",
      value: Route.toAmino(message)
    };
  },
  fromProtoMsg(message: RouteProtoMsg): Route {
    return Route.decode(message.value);
  },
  toProto(message: Route): Uint8Array {
    return Route.encode(message).finish();
  },
  toProtoMsg(message: Route): RouteProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.Route",
      value: Route.encode(message).finish()
    };
  }
};
function createBaseTrade(): Trade {
  return {
    pool: BigInt(0),
    tokenIn: "",
    tokenOut: ""
  };
}
export const Trade = {
  typeUrl: "/osmosis.protorev.v1beta1.Trade",
  encode(message: Trade, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== BigInt(0)) {
      writer.uint32(8).uint64(message.pool);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Trade {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = reader.uint64();
          break;
        case 2:
          message.tokenIn = reader.string();
          break;
        case 3:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Trade>): Trade {
    const message = createBaseTrade();
    message.pool = object.pool !== undefined && object.pool !== null ? BigInt(object.pool.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: TradeAmino): Trade {
    return {
      pool: BigInt(object.pool),
      tokenIn: object.token_in,
      tokenOut: object.token_out
    };
  },
  toAmino(message: Trade): TradeAmino {
    const obj: any = {};
    obj.pool = message.pool ? message.pool.toString() : undefined;
    obj.token_in = message.tokenIn;
    obj.token_out = message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: TradeAminoMsg): Trade {
    return Trade.fromAmino(object.value);
  },
  toAminoMsg(message: Trade): TradeAminoMsg {
    return {
      type: "osmosis/protorev/trade",
      value: Trade.toAmino(message)
    };
  },
  fromProtoMsg(message: TradeProtoMsg): Trade {
    return Trade.decode(message.value);
  },
  toProto(message: Trade): Uint8Array {
    return Trade.encode(message).finish();
  },
  toProtoMsg(message: Trade): TradeProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.Trade",
      value: Trade.encode(message).finish()
    };
  }
};
function createBaseRouteStatistics(): RouteStatistics {
  return {
    profits: [],
    numberOfTrades: "",
    route: []
  };
}
export const RouteStatistics = {
  typeUrl: "/osmosis.protorev.v1beta1.RouteStatistics",
  encode(message: RouteStatistics, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.numberOfTrades !== "") {
      writer.uint32(18).string(message.numberOfTrades);
    }
    writer.uint32(26).fork();
    for (const v of message.route) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RouteStatistics {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteStatistics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profits.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.numberOfTrades = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.route.push(reader.uint64());
            }
          } else {
            message.route.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RouteStatistics>): RouteStatistics {
    const message = createBaseRouteStatistics();
    message.profits = object.profits?.map(e => Coin.fromPartial(e)) || [];
    message.numberOfTrades = object.numberOfTrades ?? "";
    message.route = object.route?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: RouteStatisticsAmino): RouteStatistics {
    return {
      profits: Array.isArray(object?.profits) ? object.profits.map((e: any) => Coin.fromAmino(e)) : [],
      numberOfTrades: object.number_of_trades,
      route: Array.isArray(object?.route) ? object.route.map((e: any) => BigInt(e)) : []
    };
  },
  toAmino(message: RouteStatistics): RouteStatisticsAmino {
    const obj: any = {};
    if (message.profits) {
      obj.profits = message.profits.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.profits = [];
    }
    obj.number_of_trades = message.numberOfTrades;
    if (message.route) {
      obj.route = message.route.map(e => e.toString());
    } else {
      obj.route = [];
    }
    return obj;
  },
  fromAminoMsg(object: RouteStatisticsAminoMsg): RouteStatistics {
    return RouteStatistics.fromAmino(object.value);
  },
  toAminoMsg(message: RouteStatistics): RouteStatisticsAminoMsg {
    return {
      type: "osmosis/protorev/route-statistics",
      value: RouteStatistics.toAmino(message)
    };
  },
  fromProtoMsg(message: RouteStatisticsProtoMsg): RouteStatistics {
    return RouteStatistics.decode(message.value);
  },
  toProto(message: RouteStatistics): Uint8Array {
    return RouteStatistics.encode(message).finish();
  },
  toProtoMsg(message: RouteStatistics): RouteStatisticsProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.RouteStatistics",
      value: RouteStatistics.encode(message).finish()
    };
  }
};
function createBasePoolWeights(): PoolWeights {
  return {
    stableWeight: BigInt(0),
    balancerWeight: BigInt(0),
    concentratedWeight: BigInt(0),
    cosmwasmWeight: BigInt(0)
  };
}
export const PoolWeights = {
  typeUrl: "/osmosis.protorev.v1beta1.PoolWeights",
  encode(message: PoolWeights, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stableWeight !== BigInt(0)) {
      writer.uint32(8).uint64(message.stableWeight);
    }
    if (message.balancerWeight !== BigInt(0)) {
      writer.uint32(16).uint64(message.balancerWeight);
    }
    if (message.concentratedWeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.concentratedWeight);
    }
    if (message.cosmwasmWeight !== BigInt(0)) {
      writer.uint32(32).uint64(message.cosmwasmWeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PoolWeights {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolWeights();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stableWeight = reader.uint64();
          break;
        case 2:
          message.balancerWeight = reader.uint64();
          break;
        case 3:
          message.concentratedWeight = reader.uint64();
          break;
        case 4:
          message.cosmwasmWeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolWeights>): PoolWeights {
    const message = createBasePoolWeights();
    message.stableWeight = object.stableWeight !== undefined && object.stableWeight !== null ? BigInt(object.stableWeight.toString()) : BigInt(0);
    message.balancerWeight = object.balancerWeight !== undefined && object.balancerWeight !== null ? BigInt(object.balancerWeight.toString()) : BigInt(0);
    message.concentratedWeight = object.concentratedWeight !== undefined && object.concentratedWeight !== null ? BigInt(object.concentratedWeight.toString()) : BigInt(0);
    message.cosmwasmWeight = object.cosmwasmWeight !== undefined && object.cosmwasmWeight !== null ? BigInt(object.cosmwasmWeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PoolWeightsAmino): PoolWeights {
    return {
      stableWeight: BigInt(object.stable_weight),
      balancerWeight: BigInt(object.balancer_weight),
      concentratedWeight: BigInt(object.concentrated_weight),
      cosmwasmWeight: BigInt(object.cosmwasm_weight)
    };
  },
  toAmino(message: PoolWeights): PoolWeightsAmino {
    const obj: any = {};
    obj.stable_weight = message.stableWeight ? message.stableWeight.toString() : undefined;
    obj.balancer_weight = message.balancerWeight ? message.balancerWeight.toString() : undefined;
    obj.concentrated_weight = message.concentratedWeight ? message.concentratedWeight.toString() : undefined;
    obj.cosmwasm_weight = message.cosmwasmWeight ? message.cosmwasmWeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolWeightsAminoMsg): PoolWeights {
    return PoolWeights.fromAmino(object.value);
  },
  toAminoMsg(message: PoolWeights): PoolWeightsAminoMsg {
    return {
      type: "osmosis/protorev/pool-weights",
      value: PoolWeights.toAmino(message)
    };
  },
  fromProtoMsg(message: PoolWeightsProtoMsg): PoolWeights {
    return PoolWeights.decode(message.value);
  },
  toProto(message: PoolWeights): Uint8Array {
    return PoolWeights.encode(message).finish();
  },
  toProtoMsg(message: PoolWeights): PoolWeightsProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.PoolWeights",
      value: PoolWeights.encode(message).finish()
    };
  }
};
function createBaseInfoByPoolType(): InfoByPoolType {
  return {
    stable: StablePoolInfo.fromPartial({}),
    balancer: BalancerPoolInfo.fromPartial({}),
    concentrated: ConcentratedPoolInfo.fromPartial({}),
    cosmwasm: CosmwasmPoolInfo.fromPartial({})
  };
}
export const InfoByPoolType = {
  typeUrl: "/osmosis.protorev.v1beta1.InfoByPoolType",
  encode(message: InfoByPoolType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stable !== undefined) {
      StablePoolInfo.encode(message.stable, writer.uint32(10).fork()).ldelim();
    }
    if (message.balancer !== undefined) {
      BalancerPoolInfo.encode(message.balancer, writer.uint32(18).fork()).ldelim();
    }
    if (message.concentrated !== undefined) {
      ConcentratedPoolInfo.encode(message.concentrated, writer.uint32(26).fork()).ldelim();
    }
    if (message.cosmwasm !== undefined) {
      CosmwasmPoolInfo.encode(message.cosmwasm, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InfoByPoolType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoByPoolType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stable = StablePoolInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.balancer = BalancerPoolInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.concentrated = ConcentratedPoolInfo.decode(reader, reader.uint32());
          break;
        case 4:
          message.cosmwasm = CosmwasmPoolInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<InfoByPoolType>): InfoByPoolType {
    const message = createBaseInfoByPoolType();
    message.stable = object.stable !== undefined && object.stable !== null ? StablePoolInfo.fromPartial(object.stable) : undefined;
    message.balancer = object.balancer !== undefined && object.balancer !== null ? BalancerPoolInfo.fromPartial(object.balancer) : undefined;
    message.concentrated = object.concentrated !== undefined && object.concentrated !== null ? ConcentratedPoolInfo.fromPartial(object.concentrated) : undefined;
    message.cosmwasm = object.cosmwasm !== undefined && object.cosmwasm !== null ? CosmwasmPoolInfo.fromPartial(object.cosmwasm) : undefined;
    return message;
  },
  fromAmino(object: InfoByPoolTypeAmino): InfoByPoolType {
    return {
      stable: object?.stable ? StablePoolInfo.fromAmino(object.stable) : undefined,
      balancer: object?.balancer ? BalancerPoolInfo.fromAmino(object.balancer) : undefined,
      concentrated: object?.concentrated ? ConcentratedPoolInfo.fromAmino(object.concentrated) : undefined,
      cosmwasm: object?.cosmwasm ? CosmwasmPoolInfo.fromAmino(object.cosmwasm) : undefined
    };
  },
  toAmino(message: InfoByPoolType): InfoByPoolTypeAmino {
    const obj: any = {};
    obj.stable = message.stable ? StablePoolInfo.toAmino(message.stable) : undefined;
    obj.balancer = message.balancer ? BalancerPoolInfo.toAmino(message.balancer) : undefined;
    obj.concentrated = message.concentrated ? ConcentratedPoolInfo.toAmino(message.concentrated) : undefined;
    obj.cosmwasm = message.cosmwasm ? CosmwasmPoolInfo.toAmino(message.cosmwasm) : undefined;
    return obj;
  },
  fromAminoMsg(object: InfoByPoolTypeAminoMsg): InfoByPoolType {
    return InfoByPoolType.fromAmino(object.value);
  },
  toAminoMsg(message: InfoByPoolType): InfoByPoolTypeAminoMsg {
    return {
      type: "osmosis/protorev/info-by-pool-type",
      value: InfoByPoolType.toAmino(message)
    };
  },
  fromProtoMsg(message: InfoByPoolTypeProtoMsg): InfoByPoolType {
    return InfoByPoolType.decode(message.value);
  },
  toProto(message: InfoByPoolType): Uint8Array {
    return InfoByPoolType.encode(message).finish();
  },
  toProtoMsg(message: InfoByPoolType): InfoByPoolTypeProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.InfoByPoolType",
      value: InfoByPoolType.encode(message).finish()
    };
  }
};
function createBaseStablePoolInfo(): StablePoolInfo {
  return {
    weight: BigInt(0)
  };
}
export const StablePoolInfo = {
  typeUrl: "/osmosis.protorev.v1beta1.StablePoolInfo",
  encode(message: StablePoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weight !== BigInt(0)) {
      writer.uint32(8).uint64(message.weight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StablePoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStablePoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StablePoolInfo>): StablePoolInfo {
    const message = createBaseStablePoolInfo();
    message.weight = object.weight !== undefined && object.weight !== null ? BigInt(object.weight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: StablePoolInfoAmino): StablePoolInfo {
    return {
      weight: BigInt(object.weight)
    };
  },
  toAmino(message: StablePoolInfo): StablePoolInfoAmino {
    const obj: any = {};
    obj.weight = message.weight ? message.weight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: StablePoolInfoAminoMsg): StablePoolInfo {
    return StablePoolInfo.fromAmino(object.value);
  },
  toAminoMsg(message: StablePoolInfo): StablePoolInfoAminoMsg {
    return {
      type: "osmosis/protorev/stable-pool-info",
      value: StablePoolInfo.toAmino(message)
    };
  },
  fromProtoMsg(message: StablePoolInfoProtoMsg): StablePoolInfo {
    return StablePoolInfo.decode(message.value);
  },
  toProto(message: StablePoolInfo): Uint8Array {
    return StablePoolInfo.encode(message).finish();
  },
  toProtoMsg(message: StablePoolInfo): StablePoolInfoProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.StablePoolInfo",
      value: StablePoolInfo.encode(message).finish()
    };
  }
};
function createBaseBalancerPoolInfo(): BalancerPoolInfo {
  return {
    weight: BigInt(0)
  };
}
export const BalancerPoolInfo = {
  typeUrl: "/osmosis.protorev.v1beta1.BalancerPoolInfo",
  encode(message: BalancerPoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weight !== BigInt(0)) {
      writer.uint32(8).uint64(message.weight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BalancerPoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalancerPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BalancerPoolInfo>): BalancerPoolInfo {
    const message = createBaseBalancerPoolInfo();
    message.weight = object.weight !== undefined && object.weight !== null ? BigInt(object.weight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BalancerPoolInfoAmino): BalancerPoolInfo {
    return {
      weight: BigInt(object.weight)
    };
  },
  toAmino(message: BalancerPoolInfo): BalancerPoolInfoAmino {
    const obj: any = {};
    obj.weight = message.weight ? message.weight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BalancerPoolInfoAminoMsg): BalancerPoolInfo {
    return BalancerPoolInfo.fromAmino(object.value);
  },
  toAminoMsg(message: BalancerPoolInfo): BalancerPoolInfoAminoMsg {
    return {
      type: "osmosis/protorev/balancer-pool-info",
      value: BalancerPoolInfo.toAmino(message)
    };
  },
  fromProtoMsg(message: BalancerPoolInfoProtoMsg): BalancerPoolInfo {
    return BalancerPoolInfo.decode(message.value);
  },
  toProto(message: BalancerPoolInfo): Uint8Array {
    return BalancerPoolInfo.encode(message).finish();
  },
  toProtoMsg(message: BalancerPoolInfo): BalancerPoolInfoProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.BalancerPoolInfo",
      value: BalancerPoolInfo.encode(message).finish()
    };
  }
};
function createBaseConcentratedPoolInfo(): ConcentratedPoolInfo {
  return {
    weight: BigInt(0),
    maxTicksCrossed: BigInt(0)
  };
}
export const ConcentratedPoolInfo = {
  typeUrl: "/osmosis.protorev.v1beta1.ConcentratedPoolInfo",
  encode(message: ConcentratedPoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weight !== BigInt(0)) {
      writer.uint32(8).uint64(message.weight);
    }
    if (message.maxTicksCrossed !== BigInt(0)) {
      writer.uint32(16).uint64(message.maxTicksCrossed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConcentratedPoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConcentratedPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weight = reader.uint64();
          break;
        case 2:
          message.maxTicksCrossed = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConcentratedPoolInfo>): ConcentratedPoolInfo {
    const message = createBaseConcentratedPoolInfo();
    message.weight = object.weight !== undefined && object.weight !== null ? BigInt(object.weight.toString()) : BigInt(0);
    message.maxTicksCrossed = object.maxTicksCrossed !== undefined && object.maxTicksCrossed !== null ? BigInt(object.maxTicksCrossed.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ConcentratedPoolInfoAmino): ConcentratedPoolInfo {
    return {
      weight: BigInt(object.weight),
      maxTicksCrossed: BigInt(object.max_ticks_crossed)
    };
  },
  toAmino(message: ConcentratedPoolInfo): ConcentratedPoolInfoAmino {
    const obj: any = {};
    obj.weight = message.weight ? message.weight.toString() : undefined;
    obj.max_ticks_crossed = message.maxTicksCrossed ? message.maxTicksCrossed.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ConcentratedPoolInfoAminoMsg): ConcentratedPoolInfo {
    return ConcentratedPoolInfo.fromAmino(object.value);
  },
  toAminoMsg(message: ConcentratedPoolInfo): ConcentratedPoolInfoAminoMsg {
    return {
      type: "osmosis/protorev/concentrated-pool-info",
      value: ConcentratedPoolInfo.toAmino(message)
    };
  },
  fromProtoMsg(message: ConcentratedPoolInfoProtoMsg): ConcentratedPoolInfo {
    return ConcentratedPoolInfo.decode(message.value);
  },
  toProto(message: ConcentratedPoolInfo): Uint8Array {
    return ConcentratedPoolInfo.encode(message).finish();
  },
  toProtoMsg(message: ConcentratedPoolInfo): ConcentratedPoolInfoProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.ConcentratedPoolInfo",
      value: ConcentratedPoolInfo.encode(message).finish()
    };
  }
};
function createBaseCosmwasmPoolInfo(): CosmwasmPoolInfo {
  return {
    weightMaps: []
  };
}
export const CosmwasmPoolInfo = {
  typeUrl: "/osmosis.protorev.v1beta1.CosmwasmPoolInfo",
  encode(message: CosmwasmPoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.weightMaps) {
      WeightMap.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CosmwasmPoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCosmwasmPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weightMaps.push(WeightMap.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CosmwasmPoolInfo>): CosmwasmPoolInfo {
    const message = createBaseCosmwasmPoolInfo();
    message.weightMaps = object.weightMaps?.map(e => WeightMap.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: CosmwasmPoolInfoAmino): CosmwasmPoolInfo {
    return {
      weightMaps: Array.isArray(object?.weight_maps) ? object.weight_maps.map((e: any) => WeightMap.fromAmino(e)) : []
    };
  },
  toAmino(message: CosmwasmPoolInfo): CosmwasmPoolInfoAmino {
    const obj: any = {};
    if (message.weightMaps) {
      obj.weight_maps = message.weightMaps.map(e => e ? WeightMap.toAmino(e) : undefined);
    } else {
      obj.weight_maps = [];
    }
    return obj;
  },
  fromAminoMsg(object: CosmwasmPoolInfoAminoMsg): CosmwasmPoolInfo {
    return CosmwasmPoolInfo.fromAmino(object.value);
  },
  toAminoMsg(message: CosmwasmPoolInfo): CosmwasmPoolInfoAminoMsg {
    return {
      type: "osmosis/protorev/cosmwasm-pool-info",
      value: CosmwasmPoolInfo.toAmino(message)
    };
  },
  fromProtoMsg(message: CosmwasmPoolInfoProtoMsg): CosmwasmPoolInfo {
    return CosmwasmPoolInfo.decode(message.value);
  },
  toProto(message: CosmwasmPoolInfo): Uint8Array {
    return CosmwasmPoolInfo.encode(message).finish();
  },
  toProtoMsg(message: CosmwasmPoolInfo): CosmwasmPoolInfoProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.CosmwasmPoolInfo",
      value: CosmwasmPoolInfo.encode(message).finish()
    };
  }
};
function createBaseWeightMap(): WeightMap {
  return {
    weight: BigInt(0),
    contractAddress: ""
  };
}
export const WeightMap = {
  typeUrl: "/osmosis.protorev.v1beta1.WeightMap",
  encode(message: WeightMap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weight !== BigInt(0)) {
      writer.uint32(8).uint64(message.weight);
    }
    if (message.contractAddress !== "") {
      writer.uint32(18).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): WeightMap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weight = reader.uint64();
          break;
        case 2:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WeightMap>): WeightMap {
    const message = createBaseWeightMap();
    message.weight = object.weight !== undefined && object.weight !== null ? BigInt(object.weight.toString()) : BigInt(0);
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
  fromAmino(object: WeightMapAmino): WeightMap {
    return {
      weight: BigInt(object.weight),
      contractAddress: object.contract_address
    };
  },
  toAmino(message: WeightMap): WeightMapAmino {
    const obj: any = {};
    obj.weight = message.weight ? message.weight.toString() : undefined;
    obj.contract_address = message.contractAddress;
    return obj;
  },
  fromAminoMsg(object: WeightMapAminoMsg): WeightMap {
    return WeightMap.fromAmino(object.value);
  },
  toAminoMsg(message: WeightMap): WeightMapAminoMsg {
    return {
      type: "osmosis/protorev/weight-map",
      value: WeightMap.toAmino(message)
    };
  },
  fromProtoMsg(message: WeightMapProtoMsg): WeightMap {
    return WeightMap.decode(message.value);
  },
  toProto(message: WeightMap): Uint8Array {
    return WeightMap.encode(message).finish();
  },
  toProtoMsg(message: WeightMap): WeightMapProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.WeightMap",
      value: WeightMap.encode(message).finish()
    };
  }
};
function createBaseBaseDenom(): BaseDenom {
  return {
    denom: "",
    stepSize: ""
  };
}
export const BaseDenom = {
  typeUrl: "/osmosis.protorev.v1beta1.BaseDenom",
  encode(message: BaseDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.stepSize !== "") {
      writer.uint32(18).string(message.stepSize);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BaseDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.stepSize = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BaseDenom>): BaseDenom {
    const message = createBaseBaseDenom();
    message.denom = object.denom ?? "";
    message.stepSize = object.stepSize ?? "";
    return message;
  },
  fromAmino(object: BaseDenomAmino): BaseDenom {
    return {
      denom: object.denom,
      stepSize: object.step_size
    };
  },
  toAmino(message: BaseDenom): BaseDenomAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.step_size = message.stepSize;
    return obj;
  },
  fromAminoMsg(object: BaseDenomAminoMsg): BaseDenom {
    return BaseDenom.fromAmino(object.value);
  },
  toAminoMsg(message: BaseDenom): BaseDenomAminoMsg {
    return {
      type: "osmosis/protorev/base-denom",
      value: BaseDenom.toAmino(message)
    };
  },
  fromProtoMsg(message: BaseDenomProtoMsg): BaseDenom {
    return BaseDenom.decode(message.value);
  },
  toProto(message: BaseDenom): Uint8Array {
    return BaseDenom.encode(message).finish();
  },
  toProtoMsg(message: BaseDenom): BaseDenomProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.BaseDenom",
      value: BaseDenom.encode(message).finish()
    };
  }
};
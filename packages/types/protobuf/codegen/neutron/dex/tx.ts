//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
export enum LimitOrderType {
  GOOD_TIL_CANCELLED = 0,
  FILL_OR_KILL = 1,
  IMMEDIATE_OR_CANCEL = 2,
  JUST_IN_TIME = 3,
  GOOD_TIL_TIME = 4,
  UNRECOGNIZED = -1,
}
export const LimitOrderTypeSDKType = LimitOrderType;
export const LimitOrderTypeAmino = LimitOrderType;
export function limitOrderTypeFromJSON(object: any): LimitOrderType {
  switch (object) {
    case 0:
    case "GOOD_TIL_CANCELLED":
      return LimitOrderType.GOOD_TIL_CANCELLED;
    case 1:
    case "FILL_OR_KILL":
      return LimitOrderType.FILL_OR_KILL;
    case 2:
    case "IMMEDIATE_OR_CANCEL":
      return LimitOrderType.IMMEDIATE_OR_CANCEL;
    case 3:
    case "JUST_IN_TIME":
      return LimitOrderType.JUST_IN_TIME;
    case 4:
    case "GOOD_TIL_TIME":
      return LimitOrderType.GOOD_TIL_TIME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LimitOrderType.UNRECOGNIZED;
  }
}
export function limitOrderTypeToJSON(object: LimitOrderType): string {
  switch (object) {
    case LimitOrderType.GOOD_TIL_CANCELLED:
      return "GOOD_TIL_CANCELLED";
    case LimitOrderType.FILL_OR_KILL:
      return "FILL_OR_KILL";
    case LimitOrderType.IMMEDIATE_OR_CANCEL:
      return "IMMEDIATE_OR_CANCEL";
    case LimitOrderType.JUST_IN_TIME:
      return "JUST_IN_TIME";
    case LimitOrderType.GOOD_TIL_TIME:
      return "GOOD_TIL_TIME";
    case LimitOrderType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface DepositOptions {
  disableAutoswap: boolean;
  failTxOnBel: boolean;
  swapOnDeposit: boolean;
  swapOnDepositSlopToleranceBps: bigint;
}
export interface DepositOptionsProtoMsg {
  typeUrl: "/neutron.dex.DepositOptions";
  value: Uint8Array;
}
export interface DepositOptionsAmino {
  disable_autoswap?: boolean;
  fail_tx_on_bel?: boolean;
  swap_on_deposit?: boolean;
  swap_on_deposit_slop_tolerance_bps?: string;
}
export interface DepositOptionsAminoMsg {
  type: "/neutron.dex.DepositOptions";
  value: DepositOptionsAmino;
}
export interface DepositOptionsSDKType {
  disable_autoswap: boolean;
  fail_tx_on_bel: boolean;
  swap_on_deposit: boolean;
  swap_on_deposit_slop_tolerance_bps: bigint;
}
export interface MsgDeposit {
  creator: string;
  receiver: string;
  tokenA: string;
  tokenB: string;
  amountsA: string[];
  amountsB: string[];
  tickIndexesAToB: bigint[];
  fees: bigint[];
  options: DepositOptions[];
}
export interface MsgDepositProtoMsg {
  typeUrl: "/neutron.dex.MsgDeposit";
  value: Uint8Array;
}
export interface MsgDepositAmino {
  creator?: string;
  receiver?: string;
  token_a?: string;
  token_b?: string;
  amounts_a: string[];
  amounts_b: string[];
  tick_indexes_a_to_b?: string[];
  fees?: string[];
  options?: DepositOptionsAmino[];
}
export interface MsgDepositAminoMsg {
  type: "dex/MsgDeposit";
  value: MsgDepositAmino;
}
export interface MsgDepositSDKType {
  creator: string;
  receiver: string;
  token_a: string;
  token_b: string;
  amounts_a: string[];
  amounts_b: string[];
  tick_indexes_a_to_b: bigint[];
  fees: bigint[];
  options: DepositOptionsSDKType[];
}
export interface FailedDeposit {
  depositIdx: bigint;
  error: string;
}
export interface FailedDepositProtoMsg {
  typeUrl: "/neutron.dex.FailedDeposit";
  value: Uint8Array;
}
export interface FailedDepositAmino {
  deposit_idx?: string;
  error?: string;
}
export interface FailedDepositAminoMsg {
  type: "/neutron.dex.FailedDeposit";
  value: FailedDepositAmino;
}
export interface FailedDepositSDKType {
  deposit_idx: bigint;
  error: string;
}
export interface MsgDepositResponse {
  reserve0Deposited: string[];
  reserve1Deposited: string[];
  failedDeposits: FailedDeposit[];
  sharesIssued: Coin[];
}
export interface MsgDepositResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgDepositResponse";
  value: Uint8Array;
}
export interface MsgDepositResponseAmino {
  reserve0_deposited: string[];
  reserve1_deposited: string[];
  failed_deposits?: FailedDepositAmino[];
  shares_issued: CoinAmino[];
}
export interface MsgDepositResponseAminoMsg {
  type: "/neutron.dex.MsgDepositResponse";
  value: MsgDepositResponseAmino;
}
export interface MsgDepositResponseSDKType {
  reserve0_deposited: string[];
  reserve1_deposited: string[];
  failed_deposits: FailedDepositSDKType[];
  shares_issued: CoinSDKType[];
}
export interface MsgWithdrawal {
  creator: string;
  receiver: string;
  tokenA: string;
  tokenB: string;
  sharesToRemove: string[];
  tickIndexesAToB: bigint[];
  fees: bigint[];
}
export interface MsgWithdrawalProtoMsg {
  typeUrl: "/neutron.dex.MsgWithdrawal";
  value: Uint8Array;
}
export interface MsgWithdrawalAmino {
  creator?: string;
  receiver?: string;
  token_a?: string;
  token_b?: string;
  shares_to_remove: string[];
  tick_indexes_a_to_b?: string[];
  fees?: string[];
}
export interface MsgWithdrawalAminoMsg {
  type: "dex/MsgWithdrawal";
  value: MsgWithdrawalAmino;
}
export interface MsgWithdrawalSDKType {
  creator: string;
  receiver: string;
  token_a: string;
  token_b: string;
  shares_to_remove: string[];
  tick_indexes_a_to_b: bigint[];
  fees: bigint[];
}
export interface MsgWithdrawalResponse {
  reserve0Withdrawn: string;
  reserve1Withdrawn: string;
  sharesBurned: Coin[];
}
export interface MsgWithdrawalResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgWithdrawalResponse";
  value: Uint8Array;
}
export interface MsgWithdrawalResponseAmino {
  reserve0_withdrawn: string;
  reserve1_withdrawn: string;
  shares_burned: CoinAmino[];
}
export interface MsgWithdrawalResponseAminoMsg {
  type: "/neutron.dex.MsgWithdrawalResponse";
  value: MsgWithdrawalResponseAmino;
}
export interface MsgWithdrawalResponseSDKType {
  reserve0_withdrawn: string;
  reserve1_withdrawn: string;
  shares_burned: CoinSDKType[];
}
export interface MsgPlaceLimitOrder {
  creator: string;
  receiver: string;
  tokenIn: string;
  tokenOut: string;
  /** DEPRECATED: tick_index_in_to_out will be removed in future release; limit_sell_price should be used instead. */
  /** @deprecated */
  tickIndexInToOut: bigint;
  amountIn: string;
  orderType: LimitOrderType;
  /** expirationTime is only valid iff orderType == GOOD_TIL_TIME. */
  expirationTime?: Date | undefined;
  maxAmountOut?: string;
  limitSellPrice?: string;
  /**
   * min_average_sell_price is an optional parameter that sets a required minimum average price for the entire trade.
   * if the min_average_sell_price is not met the trade will fail.
   * If min_average_sell_price is omitted limit_sell_price will be used instead
   */
  minAverageSellPrice?: string;
}
export interface MsgPlaceLimitOrderProtoMsg {
  typeUrl: "/neutron.dex.MsgPlaceLimitOrder";
  value: Uint8Array;
}
export interface MsgPlaceLimitOrderAmino {
  creator?: string;
  receiver?: string;
  token_in?: string;
  token_out?: string;
  /** DEPRECATED: tick_index_in_to_out will be removed in future release; limit_sell_price should be used instead. */
  /** @deprecated */
  tick_index_in_to_out?: string;
  amount_in: string;
  order_type?: LimitOrderType;
  /** expirationTime is only valid iff orderType == GOOD_TIL_TIME. */
  expiration_time?: string | undefined;
  max_amount_out: string;
  limit_sell_price: string;
  /**
   * min_average_sell_price is an optional parameter that sets a required minimum average price for the entire trade.
   * if the min_average_sell_price is not met the trade will fail.
   * If min_average_sell_price is omitted limit_sell_price will be used instead
   */
  min_average_sell_price: string;
}
export interface MsgPlaceLimitOrderAminoMsg {
  type: "dex/MsgPlaceLimitOrder";
  value: MsgPlaceLimitOrderAmino;
}
export interface MsgPlaceLimitOrderSDKType {
  creator: string;
  receiver: string;
  token_in: string;
  token_out: string;
  /** @deprecated */
  tick_index_in_to_out: bigint;
  amount_in: string;
  order_type: LimitOrderType;
  expiration_time?: Date | undefined;
  max_amount_out?: string;
  limit_sell_price?: string;
  min_average_sell_price?: string;
}
export interface MsgPlaceLimitOrderResponse {
  trancheKey: string;
  /** Total amount of coin used for the limit order */
  coinIn: Coin | undefined;
  /**
   * Total amount of coin received from the taker portion of the limit order
   * This is the amount of coin immediately available in the users account after
   * executing the limit order. It does not include any future proceeds from the
   * maker portion which will have withdrawn in the future
   */
  takerCoinOut: Coin | undefined;
  /** Total amount of the token in that was immediately swapped for takerOutCoin */
  takerCoinIn: Coin | undefined;
}
export interface MsgPlaceLimitOrderResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgPlaceLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceLimitOrderResponseAmino {
  trancheKey?: string;
  /** Total amount of coin used for the limit order */
  coin_in: CoinAmino | undefined;
  /**
   * Total amount of coin received from the taker portion of the limit order
   * This is the amount of coin immediately available in the users account after
   * executing the limit order. It does not include any future proceeds from the
   * maker portion which will have withdrawn in the future
   */
  taker_coin_out: CoinAmino | undefined;
  /** Total amount of the token in that was immediately swapped for takerOutCoin */
  taker_coin_in: CoinAmino | undefined;
}
export interface MsgPlaceLimitOrderResponseAminoMsg {
  type: "/neutron.dex.MsgPlaceLimitOrderResponse";
  value: MsgPlaceLimitOrderResponseAmino;
}
export interface MsgPlaceLimitOrderResponseSDKType {
  trancheKey: string;
  coin_in: CoinSDKType | undefined;
  taker_coin_out: CoinSDKType | undefined;
  taker_coin_in: CoinSDKType | undefined;
}
export interface MsgWithdrawFilledLimitOrder {
  creator: string;
  trancheKey: string;
}
export interface MsgWithdrawFilledLimitOrderProtoMsg {
  typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder";
  value: Uint8Array;
}
export interface MsgWithdrawFilledLimitOrderAmino {
  creator?: string;
  tranche_key?: string;
}
export interface MsgWithdrawFilledLimitOrderAminoMsg {
  type: "dex/MsgWithdrawFilledLimitOrder";
  value: MsgWithdrawFilledLimitOrderAmino;
}
export interface MsgWithdrawFilledLimitOrderSDKType {
  creator: string;
  tranche_key: string;
}
export interface MsgWithdrawFilledLimitOrderResponse {
  /** Total amount of taker reserves that were withdrawn */
  takerCoinOut: Coin | undefined;
  /** Total amount of maker reserves that were withdrawn --only applies to inactive LimitOrders */
  makerCoinOut: Coin | undefined;
}
export interface MsgWithdrawFilledLimitOrderResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgWithdrawFilledLimitOrderResponseAmino {
  /** Total amount of taker reserves that were withdrawn */
  taker_coin_out: CoinAmino | undefined;
  /** Total amount of maker reserves that were withdrawn --only applies to inactive LimitOrders */
  maker_coin_out: CoinAmino | undefined;
}
export interface MsgWithdrawFilledLimitOrderResponseAminoMsg {
  type: "/neutron.dex.MsgWithdrawFilledLimitOrderResponse";
  value: MsgWithdrawFilledLimitOrderResponseAmino;
}
export interface MsgWithdrawFilledLimitOrderResponseSDKType {
  taker_coin_out: CoinSDKType | undefined;
  maker_coin_out: CoinSDKType | undefined;
}
export interface MsgCancelLimitOrder {
  creator: string;
  trancheKey: string;
}
export interface MsgCancelLimitOrderProtoMsg {
  typeUrl: "/neutron.dex.MsgCancelLimitOrder";
  value: Uint8Array;
}
export interface MsgCancelLimitOrderAmino {
  creator?: string;
  tranche_key?: string;
}
export interface MsgCancelLimitOrderAminoMsg {
  type: "dex/MsgCancelLimitOrder";
  value: MsgCancelLimitOrderAmino;
}
export interface MsgCancelLimitOrderSDKType {
  creator: string;
  tranche_key: string;
}
export interface MsgCancelLimitOrderResponse {
  /** Total amount of taker reserves that were withdrawn */
  takerCoinOut: Coin | undefined;
  /** Total amount of maker reserves that were canceled */
  makerCoinOut: Coin | undefined;
}
export interface MsgCancelLimitOrderResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgCancelLimitOrderResponse";
  value: Uint8Array;
}
export interface MsgCancelLimitOrderResponseAmino {
  /** Total amount of taker reserves that were withdrawn */
  taker_coin_out: CoinAmino | undefined;
  /** Total amount of maker reserves that were canceled */
  maker_coin_out: CoinAmino | undefined;
}
export interface MsgCancelLimitOrderResponseAminoMsg {
  type: "/neutron.dex.MsgCancelLimitOrderResponse";
  value: MsgCancelLimitOrderResponseAmino;
}
export interface MsgCancelLimitOrderResponseSDKType {
  taker_coin_out: CoinSDKType | undefined;
  maker_coin_out: CoinSDKType | undefined;
}
export interface MultiHopRoute {
  hops: string[];
}
export interface MultiHopRouteProtoMsg {
  typeUrl: "/neutron.dex.MultiHopRoute";
  value: Uint8Array;
}
export interface MultiHopRouteAmino {
  hops?: string[];
}
export interface MultiHopRouteAminoMsg {
  type: "/neutron.dex.MultiHopRoute";
  value: MultiHopRouteAmino;
}
export interface MultiHopRouteSDKType {
  hops: string[];
}
export interface MsgMultiHopSwap {
  creator: string;
  receiver: string;
  routes: MultiHopRoute[];
  amountIn: string;
  exitLimitPrice: string;
  /**
   * If pickBestRoute == true then all routes are run and the route with the
   * best price is chosen otherwise, the first successful route is used.
   */
  pickBestRoute: boolean;
}
export interface MsgMultiHopSwapProtoMsg {
  typeUrl: "/neutron.dex.MsgMultiHopSwap";
  value: Uint8Array;
}
export interface MsgMultiHopSwapAmino {
  creator?: string;
  receiver?: string;
  routes?: MultiHopRouteAmino[];
  amount_in: string;
  exit_limit_price: string;
  /**
   * If pickBestRoute == true then all routes are run and the route with the
   * best price is chosen otherwise, the first successful route is used.
   */
  pick_best_route?: boolean;
}
export interface MsgMultiHopSwapAminoMsg {
  type: "dex/MsgMultiHopSwap";
  value: MsgMultiHopSwapAmino;
}
export interface MsgMultiHopSwapSDKType {
  creator: string;
  receiver: string;
  routes: MultiHopRouteSDKType[];
  amount_in: string;
  exit_limit_price: string;
  pick_best_route: boolean;
}
export interface MsgMultiHopSwapResponse {
  coinOut: Coin | undefined;
  route?: MultiHopRoute | undefined;
  dust: Coin[];
}
export interface MsgMultiHopSwapResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgMultiHopSwapResponse";
  value: Uint8Array;
}
export interface MsgMultiHopSwapResponseAmino {
  coin_out: CoinAmino | undefined;
  route?: MultiHopRouteAmino | undefined;
  dust: CoinAmino[];
}
export interface MsgMultiHopSwapResponseAminoMsg {
  type: "/neutron.dex.MsgMultiHopSwapResponse";
  value: MsgMultiHopSwapResponseAmino;
}
export interface MsgMultiHopSwapResponseSDKType {
  coin_out: CoinSDKType | undefined;
  route?: MultiHopRouteSDKType | undefined;
  dust: CoinSDKType[];
}
export interface MsgUpdateParams {
  /** Authority is the address of the governance account. */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/neutron.dex.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  /** Authority is the address of the governance account. */
  authority?: string;
  /** NOTE: All parameters must be supplied. */
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "dex/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/neutron.dex.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/neutron.dex.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseDepositOptions(): DepositOptions {
  return {
    disableAutoswap: false,
    failTxOnBel: false,
    swapOnDeposit: false,
    swapOnDepositSlopToleranceBps: BigInt(0)
  };
}
export const DepositOptions = {
  typeUrl: "/neutron.dex.DepositOptions",
  encode(message: DepositOptions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.disableAutoswap === true) {
      writer.uint32(8).bool(message.disableAutoswap);
    }
    if (message.failTxOnBel === true) {
      writer.uint32(16).bool(message.failTxOnBel);
    }
    if (message.swapOnDeposit === true) {
      writer.uint32(24).bool(message.swapOnDeposit);
    }
    if (message.swapOnDepositSlopToleranceBps !== BigInt(0)) {
      writer.uint32(32).uint64(message.swapOnDepositSlopToleranceBps);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DepositOptions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disableAutoswap = reader.bool();
          break;
        case 2:
          message.failTxOnBel = reader.bool();
          break;
        case 3:
          message.swapOnDeposit = reader.bool();
          break;
        case 4:
          message.swapOnDepositSlopToleranceBps = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DepositOptions>): DepositOptions {
    const message = createBaseDepositOptions();
    message.disableAutoswap = object.disableAutoswap ?? false;
    message.failTxOnBel = object.failTxOnBel ?? false;
    message.swapOnDeposit = object.swapOnDeposit ?? false;
    message.swapOnDepositSlopToleranceBps = object.swapOnDepositSlopToleranceBps !== undefined && object.swapOnDepositSlopToleranceBps !== null ? BigInt(object.swapOnDepositSlopToleranceBps.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: DepositOptionsAmino): DepositOptions {
    const message = createBaseDepositOptions();
    if (object.disable_autoswap !== undefined && object.disable_autoswap !== null) {
      message.disableAutoswap = object.disable_autoswap;
    }
    if (object.fail_tx_on_bel !== undefined && object.fail_tx_on_bel !== null) {
      message.failTxOnBel = object.fail_tx_on_bel;
    }
    if (object.swap_on_deposit !== undefined && object.swap_on_deposit !== null) {
      message.swapOnDeposit = object.swap_on_deposit;
    }
    if (object.swap_on_deposit_slop_tolerance_bps !== undefined && object.swap_on_deposit_slop_tolerance_bps !== null) {
      message.swapOnDepositSlopToleranceBps = BigInt(object.swap_on_deposit_slop_tolerance_bps);
    }
    return message;
  },
  toAmino(message: DepositOptions, useInterfaces: boolean = false): DepositOptionsAmino {
    const obj: any = {};
    obj.disable_autoswap = message.disableAutoswap === false ? undefined : message.disableAutoswap;
    obj.fail_tx_on_bel = message.failTxOnBel === false ? undefined : message.failTxOnBel;
    obj.swap_on_deposit = message.swapOnDeposit === false ? undefined : message.swapOnDeposit;
    obj.swap_on_deposit_slop_tolerance_bps = message.swapOnDepositSlopToleranceBps !== BigInt(0) ? message.swapOnDepositSlopToleranceBps.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: DepositOptionsAminoMsg): DepositOptions {
    return DepositOptions.fromAmino(object.value);
  },
  fromProtoMsg(message: DepositOptionsProtoMsg, useInterfaces: boolean = false): DepositOptions {
    return DepositOptions.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DepositOptions): Uint8Array {
    return DepositOptions.encode(message).finish();
  },
  toProtoMsg(message: DepositOptions): DepositOptionsProtoMsg {
    return {
      typeUrl: "/neutron.dex.DepositOptions",
      value: DepositOptions.encode(message).finish()
    };
  }
};
function createBaseMsgDeposit(): MsgDeposit {
  return {
    creator: "",
    receiver: "",
    tokenA: "",
    tokenB: "",
    amountsA: [],
    amountsB: [],
    tickIndexesAToB: [],
    fees: [],
    options: []
  };
}
export const MsgDeposit = {
  typeUrl: "/neutron.dex.MsgDeposit",
  encode(message: MsgDeposit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenA !== "") {
      writer.uint32(26).string(message.tokenA);
    }
    if (message.tokenB !== "") {
      writer.uint32(34).string(message.tokenB);
    }
    for (const v of message.amountsA) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.amountsB) {
      writer.uint32(50).string(v!);
    }
    writer.uint32(58).fork();
    for (const v of message.tickIndexesAToB) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(66).fork();
    for (const v of message.fees) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.options) {
      DepositOptions.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeposit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenA = reader.string();
          break;
        case 4:
          message.tokenB = reader.string();
          break;
        case 5:
          message.amountsA.push(reader.string());
          break;
        case 6:
          message.amountsB.push(reader.string());
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.tickIndexesAToB.push(reader.int64());
            }
          } else {
            message.tickIndexesAToB.push(reader.int64());
          }
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.fees.push(reader.uint64());
            }
          } else {
            message.fees.push(reader.uint64());
          }
          break;
        case 9:
          message.options.push(DepositOptions.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeposit>): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.creator = object.creator ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenA = object.tokenA ?? "";
    message.tokenB = object.tokenB ?? "";
    message.amountsA = object.amountsA?.map(e => e) || [];
    message.amountsB = object.amountsB?.map(e => e) || [];
    message.tickIndexesAToB = object.tickIndexesAToB?.map(e => BigInt(e.toString())) || [];
    message.fees = object.fees?.map(e => BigInt(e.toString())) || [];
    message.options = object.options?.map(e => DepositOptions.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgDepositAmino): MsgDeposit {
    const message = createBaseMsgDeposit();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.token_a !== undefined && object.token_a !== null) {
      message.tokenA = object.token_a;
    }
    if (object.token_b !== undefined && object.token_b !== null) {
      message.tokenB = object.token_b;
    }
    message.amountsA = object.amounts_a?.map(e => e) || [];
    message.amountsB = object.amounts_b?.map(e => e) || [];
    message.tickIndexesAToB = object.tick_indexes_a_to_b?.map(e => BigInt(e)) || [];
    message.fees = object.fees?.map(e => BigInt(e)) || [];
    message.options = object.options?.map(e => DepositOptions.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgDeposit, useInterfaces: boolean = false): MsgDepositAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    obj.token_a = message.tokenA === "" ? undefined : message.tokenA;
    obj.token_b = message.tokenB === "" ? undefined : message.tokenB;
    if (message.amountsA) {
      obj.amounts_a = message.amountsA.map(e => e);
    } else {
      obj.amounts_a = message.amountsA;
    }
    if (message.amountsB) {
      obj.amounts_b = message.amountsB.map(e => e);
    } else {
      obj.amounts_b = message.amountsB;
    }
    if (message.tickIndexesAToB) {
      obj.tick_indexes_a_to_b = message.tickIndexesAToB.map(e => e.toString());
    } else {
      obj.tick_indexes_a_to_b = message.tickIndexesAToB;
    }
    if (message.fees) {
      obj.fees = message.fees.map(e => e.toString());
    } else {
      obj.fees = message.fees;
    }
    if (message.options) {
      obj.options = message.options.map(e => e ? DepositOptions.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.options = message.options;
    }
    return obj;
  },
  fromAminoMsg(object: MsgDepositAminoMsg): MsgDeposit {
    return MsgDeposit.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeposit, useInterfaces: boolean = false): MsgDepositAminoMsg {
    return {
      type: "dex/MsgDeposit",
      value: MsgDeposit.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDepositProtoMsg, useInterfaces: boolean = false): MsgDeposit {
    return MsgDeposit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeposit): Uint8Array {
    return MsgDeposit.encode(message).finish();
  },
  toProtoMsg(message: MsgDeposit): MsgDepositProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgDeposit",
      value: MsgDeposit.encode(message).finish()
    };
  }
};
function createBaseFailedDeposit(): FailedDeposit {
  return {
    depositIdx: BigInt(0),
    error: ""
  };
}
export const FailedDeposit = {
  typeUrl: "/neutron.dex.FailedDeposit",
  encode(message: FailedDeposit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.depositIdx !== BigInt(0)) {
      writer.uint32(8).uint64(message.depositIdx);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FailedDeposit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailedDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositIdx = reader.uint64();
          break;
        case 2:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FailedDeposit>): FailedDeposit {
    const message = createBaseFailedDeposit();
    message.depositIdx = object.depositIdx !== undefined && object.depositIdx !== null ? BigInt(object.depositIdx.toString()) : BigInt(0);
    message.error = object.error ?? "";
    return message;
  },
  fromAmino(object: FailedDepositAmino): FailedDeposit {
    const message = createBaseFailedDeposit();
    if (object.deposit_idx !== undefined && object.deposit_idx !== null) {
      message.depositIdx = BigInt(object.deposit_idx);
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: FailedDeposit, useInterfaces: boolean = false): FailedDepositAmino {
    const obj: any = {};
    obj.deposit_idx = message.depositIdx !== BigInt(0) ? message.depositIdx.toString() : undefined;
    obj.error = message.error === "" ? undefined : message.error;
    return obj;
  },
  fromAminoMsg(object: FailedDepositAminoMsg): FailedDeposit {
    return FailedDeposit.fromAmino(object.value);
  },
  fromProtoMsg(message: FailedDepositProtoMsg, useInterfaces: boolean = false): FailedDeposit {
    return FailedDeposit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FailedDeposit): Uint8Array {
    return FailedDeposit.encode(message).finish();
  },
  toProtoMsg(message: FailedDeposit): FailedDepositProtoMsg {
    return {
      typeUrl: "/neutron.dex.FailedDeposit",
      value: FailedDeposit.encode(message).finish()
    };
  }
};
function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {
    reserve0Deposited: [],
    reserve1Deposited: [],
    failedDeposits: [],
    sharesIssued: []
  };
}
export const MsgDepositResponse = {
  typeUrl: "/neutron.dex.MsgDepositResponse",
  encode(message: MsgDepositResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.reserve0Deposited) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.reserve1Deposited) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.failedDeposits) {
      FailedDeposit.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sharesIssued) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserve0Deposited.push(reader.string());
          break;
        case 2:
          message.reserve1Deposited.push(reader.string());
          break;
        case 3:
          message.failedDeposits.push(FailedDeposit.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.sharesIssued.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositResponse>): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    message.reserve0Deposited = object.reserve0Deposited?.map(e => e) || [];
    message.reserve1Deposited = object.reserve1Deposited?.map(e => e) || [];
    message.failedDeposits = object.failedDeposits?.map(e => FailedDeposit.fromPartial(e)) || [];
    message.sharesIssued = object.sharesIssued?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgDepositResponseAmino): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    message.reserve0Deposited = object.reserve0_deposited?.map(e => e) || [];
    message.reserve1Deposited = object.reserve1_deposited?.map(e => e) || [];
    message.failedDeposits = object.failed_deposits?.map(e => FailedDeposit.fromAmino(e)) || [];
    message.sharesIssued = object.shares_issued?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgDepositResponse, useInterfaces: boolean = false): MsgDepositResponseAmino {
    const obj: any = {};
    if (message.reserve0Deposited) {
      obj.reserve0_deposited = message.reserve0Deposited.map(e => e);
    } else {
      obj.reserve0_deposited = message.reserve0Deposited;
    }
    if (message.reserve1Deposited) {
      obj.reserve1_deposited = message.reserve1Deposited.map(e => e);
    } else {
      obj.reserve1_deposited = message.reserve1Deposited;
    }
    if (message.failedDeposits) {
      obj.failed_deposits = message.failedDeposits.map(e => e ? FailedDeposit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failed_deposits = message.failedDeposits;
    }
    if (message.sharesIssued) {
      obj.shares_issued = message.sharesIssued.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.shares_issued = message.sharesIssued;
    }
    return obj;
  },
  fromAminoMsg(object: MsgDepositResponseAminoMsg): MsgDepositResponse {
    return MsgDepositResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositResponseProtoMsg, useInterfaces: boolean = false): MsgDepositResponse {
    return MsgDepositResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositResponse): Uint8Array {
    return MsgDepositResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositResponse): MsgDepositResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgDepositResponse",
      value: MsgDepositResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawal(): MsgWithdrawal {
  return {
    creator: "",
    receiver: "",
    tokenA: "",
    tokenB: "",
    sharesToRemove: [],
    tickIndexesAToB: [],
    fees: []
  };
}
export const MsgWithdrawal = {
  typeUrl: "/neutron.dex.MsgWithdrawal",
  encode(message: MsgWithdrawal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenA !== "") {
      writer.uint32(26).string(message.tokenA);
    }
    if (message.tokenB !== "") {
      writer.uint32(34).string(message.tokenB);
    }
    for (const v of message.sharesToRemove) {
      writer.uint32(42).string(v!);
    }
    writer.uint32(50).fork();
    for (const v of message.tickIndexesAToB) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.fees) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenA = reader.string();
          break;
        case 4:
          message.tokenB = reader.string();
          break;
        case 5:
          message.sharesToRemove.push(reader.string());
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.tickIndexesAToB.push(reader.int64());
            }
          } else {
            message.tickIndexesAToB.push(reader.int64());
          }
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.fees.push(reader.uint64());
            }
          } else {
            message.fees.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawal>): MsgWithdrawal {
    const message = createBaseMsgWithdrawal();
    message.creator = object.creator ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenA = object.tokenA ?? "";
    message.tokenB = object.tokenB ?? "";
    message.sharesToRemove = object.sharesToRemove?.map(e => e) || [];
    message.tickIndexesAToB = object.tickIndexesAToB?.map(e => BigInt(e.toString())) || [];
    message.fees = object.fees?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: MsgWithdrawalAmino): MsgWithdrawal {
    const message = createBaseMsgWithdrawal();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.token_a !== undefined && object.token_a !== null) {
      message.tokenA = object.token_a;
    }
    if (object.token_b !== undefined && object.token_b !== null) {
      message.tokenB = object.token_b;
    }
    message.sharesToRemove = object.shares_to_remove?.map(e => e) || [];
    message.tickIndexesAToB = object.tick_indexes_a_to_b?.map(e => BigInt(e)) || [];
    message.fees = object.fees?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: MsgWithdrawal, useInterfaces: boolean = false): MsgWithdrawalAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    obj.token_a = message.tokenA === "" ? undefined : message.tokenA;
    obj.token_b = message.tokenB === "" ? undefined : message.tokenB;
    if (message.sharesToRemove) {
      obj.shares_to_remove = message.sharesToRemove.map(e => e);
    } else {
      obj.shares_to_remove = message.sharesToRemove;
    }
    if (message.tickIndexesAToB) {
      obj.tick_indexes_a_to_b = message.tickIndexesAToB.map(e => e.toString());
    } else {
      obj.tick_indexes_a_to_b = message.tickIndexesAToB;
    }
    if (message.fees) {
      obj.fees = message.fees.map(e => e.toString());
    } else {
      obj.fees = message.fees;
    }
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawalAminoMsg): MsgWithdrawal {
    return MsgWithdrawal.fromAmino(object.value);
  },
  toAminoMsg(message: MsgWithdrawal, useInterfaces: boolean = false): MsgWithdrawalAminoMsg {
    return {
      type: "dex/MsgWithdrawal",
      value: MsgWithdrawal.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgWithdrawalProtoMsg, useInterfaces: boolean = false): MsgWithdrawal {
    return MsgWithdrawal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawal): Uint8Array {
    return MsgWithdrawal.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawal): MsgWithdrawalProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgWithdrawal",
      value: MsgWithdrawal.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawalResponse(): MsgWithdrawalResponse {
  return {
    reserve0Withdrawn: "",
    reserve1Withdrawn: "",
    sharesBurned: []
  };
}
export const MsgWithdrawalResponse = {
  typeUrl: "/neutron.dex.MsgWithdrawalResponse",
  encode(message: MsgWithdrawalResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.reserve0Withdrawn !== "") {
      writer.uint32(10).string(message.reserve0Withdrawn);
    }
    if (message.reserve1Withdrawn !== "") {
      writer.uint32(18).string(message.reserve1Withdrawn);
    }
    for (const v of message.sharesBurned) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawalResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserve0Withdrawn = reader.string();
          break;
        case 2:
          message.reserve1Withdrawn = reader.string();
          break;
        case 3:
          message.sharesBurned.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawalResponse>): MsgWithdrawalResponse {
    const message = createBaseMsgWithdrawalResponse();
    message.reserve0Withdrawn = object.reserve0Withdrawn ?? "";
    message.reserve1Withdrawn = object.reserve1Withdrawn ?? "";
    message.sharesBurned = object.sharesBurned?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgWithdrawalResponseAmino): MsgWithdrawalResponse {
    const message = createBaseMsgWithdrawalResponse();
    if (object.reserve0_withdrawn !== undefined && object.reserve0_withdrawn !== null) {
      message.reserve0Withdrawn = object.reserve0_withdrawn;
    }
    if (object.reserve1_withdrawn !== undefined && object.reserve1_withdrawn !== null) {
      message.reserve1Withdrawn = object.reserve1_withdrawn;
    }
    message.sharesBurned = object.shares_burned?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgWithdrawalResponse, useInterfaces: boolean = false): MsgWithdrawalResponseAmino {
    const obj: any = {};
    obj.reserve0_withdrawn = message.reserve0Withdrawn ?? "";
    obj.reserve1_withdrawn = message.reserve1Withdrawn ?? "";
    if (message.sharesBurned) {
      obj.shares_burned = message.sharesBurned.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.shares_burned = message.sharesBurned;
    }
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawalResponseAminoMsg): MsgWithdrawalResponse {
    return MsgWithdrawalResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawalResponseProtoMsg, useInterfaces: boolean = false): MsgWithdrawalResponse {
    return MsgWithdrawalResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawalResponse): Uint8Array {
    return MsgWithdrawalResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawalResponse): MsgWithdrawalResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgWithdrawalResponse",
      value: MsgWithdrawalResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPlaceLimitOrder(): MsgPlaceLimitOrder {
  return {
    creator: "",
    receiver: "",
    tokenIn: "",
    tokenOut: "",
    tickIndexInToOut: BigInt(0),
    amountIn: "",
    orderType: 0,
    expirationTime: undefined,
    maxAmountOut: undefined,
    limitSellPrice: undefined,
    minAverageSellPrice: undefined
  };
}
export const MsgPlaceLimitOrder = {
  typeUrl: "/neutron.dex.MsgPlaceLimitOrder",
  encode(message: MsgPlaceLimitOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    if (message.tickIndexInToOut !== BigInt(0)) {
      writer.uint32(40).int64(message.tickIndexInToOut);
    }
    if (message.amountIn !== "") {
      writer.uint32(58).string(message.amountIn);
    }
    if (message.orderType !== 0) {
      writer.uint32(64).int32(message.orderType);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.maxAmountOut !== undefined) {
      writer.uint32(82).string(message.maxAmountOut);
    }
    if (message.limitSellPrice !== undefined) {
      writer.uint32(90).string(message.limitSellPrice);
    }
    if (message.minAverageSellPrice !== undefined) {
      writer.uint32(98).string(message.minAverageSellPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPlaceLimitOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlaceLimitOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        case 5:
          message.tickIndexInToOut = reader.int64();
          break;
        case 7:
          message.amountIn = reader.string();
          break;
        case 8:
          message.orderType = (reader.int32() as any);
          break;
        case 9:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.maxAmountOut = reader.string();
          break;
        case 11:
          message.limitSellPrice = reader.string();
          break;
        case 12:
          message.minAverageSellPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPlaceLimitOrder>): MsgPlaceLimitOrder {
    const message = createBaseMsgPlaceLimitOrder();
    message.creator = object.creator ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.tickIndexInToOut = object.tickIndexInToOut !== undefined && object.tickIndexInToOut !== null ? BigInt(object.tickIndexInToOut.toString()) : BigInt(0);
    message.amountIn = object.amountIn ?? "";
    message.orderType = object.orderType ?? 0;
    message.expirationTime = object.expirationTime ?? undefined;
    message.maxAmountOut = object.maxAmountOut ?? undefined;
    message.limitSellPrice = object.limitSellPrice ?? undefined;
    message.minAverageSellPrice = object.minAverageSellPrice ?? undefined;
    return message;
  },
  fromAmino(object: MsgPlaceLimitOrderAmino): MsgPlaceLimitOrder {
    const message = createBaseMsgPlaceLimitOrder();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    if (object.tick_index_in_to_out !== undefined && object.tick_index_in_to_out !== null) {
      message.tickIndexInToOut = BigInt(object.tick_index_in_to_out);
    }
    if (object.amount_in !== undefined && object.amount_in !== null) {
      message.amountIn = object.amount_in;
    }
    if (object.order_type !== undefined && object.order_type !== null) {
      message.orderType = object.order_type;
    }
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    if (object.max_amount_out !== undefined && object.max_amount_out !== null) {
      message.maxAmountOut = object.max_amount_out;
    }
    if (object.limit_sell_price !== undefined && object.limit_sell_price !== null) {
      message.limitSellPrice = object.limit_sell_price;
    }
    if (object.min_average_sell_price !== undefined && object.min_average_sell_price !== null) {
      message.minAverageSellPrice = object.min_average_sell_price;
    }
    return message;
  },
  toAmino(message: MsgPlaceLimitOrder, useInterfaces: boolean = false): MsgPlaceLimitOrderAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.tick_index_in_to_out = message.tickIndexInToOut !== BigInt(0) ? message.tickIndexInToOut.toString() : undefined;
    obj.amount_in = message.amountIn ?? "";
    obj.order_type = message.orderType === 0 ? undefined : message.orderType;
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    obj.max_amount_out = message.maxAmountOut ?? null;
    obj.limit_sell_price = message.limitSellPrice ?? null;
    obj.min_average_sell_price = message.minAverageSellPrice ?? null;
    return obj;
  },
  fromAminoMsg(object: MsgPlaceLimitOrderAminoMsg): MsgPlaceLimitOrder {
    return MsgPlaceLimitOrder.fromAmino(object.value);
  },
  toAminoMsg(message: MsgPlaceLimitOrder, useInterfaces: boolean = false): MsgPlaceLimitOrderAminoMsg {
    return {
      type: "dex/MsgPlaceLimitOrder",
      value: MsgPlaceLimitOrder.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgPlaceLimitOrderProtoMsg, useInterfaces: boolean = false): MsgPlaceLimitOrder {
    return MsgPlaceLimitOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPlaceLimitOrder): Uint8Array {
    return MsgPlaceLimitOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgPlaceLimitOrder): MsgPlaceLimitOrderProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgPlaceLimitOrder",
      value: MsgPlaceLimitOrder.encode(message).finish()
    };
  }
};
function createBaseMsgPlaceLimitOrderResponse(): MsgPlaceLimitOrderResponse {
  return {
    trancheKey: "",
    coinIn: Coin.fromPartial({}),
    takerCoinOut: Coin.fromPartial({}),
    takerCoinIn: Coin.fromPartial({})
  };
}
export const MsgPlaceLimitOrderResponse = {
  typeUrl: "/neutron.dex.MsgPlaceLimitOrderResponse",
  encode(message: MsgPlaceLimitOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.trancheKey !== "") {
      writer.uint32(10).string(message.trancheKey);
    }
    if (message.coinIn !== undefined) {
      Coin.encode(message.coinIn, writer.uint32(18).fork()).ldelim();
    }
    if (message.takerCoinOut !== undefined) {
      Coin.encode(message.takerCoinOut, writer.uint32(26).fork()).ldelim();
    }
    if (message.takerCoinIn !== undefined) {
      Coin.encode(message.takerCoinIn, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPlaceLimitOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlaceLimitOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trancheKey = reader.string();
          break;
        case 2:
          message.coinIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.takerCoinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.takerCoinIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPlaceLimitOrderResponse>): MsgPlaceLimitOrderResponse {
    const message = createBaseMsgPlaceLimitOrderResponse();
    message.trancheKey = object.trancheKey ?? "";
    message.coinIn = object.coinIn !== undefined && object.coinIn !== null ? Coin.fromPartial(object.coinIn) : undefined;
    message.takerCoinOut = object.takerCoinOut !== undefined && object.takerCoinOut !== null ? Coin.fromPartial(object.takerCoinOut) : undefined;
    message.takerCoinIn = object.takerCoinIn !== undefined && object.takerCoinIn !== null ? Coin.fromPartial(object.takerCoinIn) : undefined;
    return message;
  },
  fromAmino(object: MsgPlaceLimitOrderResponseAmino): MsgPlaceLimitOrderResponse {
    const message = createBaseMsgPlaceLimitOrderResponse();
    if (object.trancheKey !== undefined && object.trancheKey !== null) {
      message.trancheKey = object.trancheKey;
    }
    if (object.coin_in !== undefined && object.coin_in !== null) {
      message.coinIn = Coin.fromAmino(object.coin_in);
    }
    if (object.taker_coin_out !== undefined && object.taker_coin_out !== null) {
      message.takerCoinOut = Coin.fromAmino(object.taker_coin_out);
    }
    if (object.taker_coin_in !== undefined && object.taker_coin_in !== null) {
      message.takerCoinIn = Coin.fromAmino(object.taker_coin_in);
    }
    return message;
  },
  toAmino(message: MsgPlaceLimitOrderResponse, useInterfaces: boolean = false): MsgPlaceLimitOrderResponseAmino {
    const obj: any = {};
    obj.trancheKey = message.trancheKey === "" ? undefined : message.trancheKey;
    obj.coin_in = message.coinIn ? Coin.toAmino(message.coinIn, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    obj.taker_coin_out = message.takerCoinOut ? Coin.toAmino(message.takerCoinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    obj.taker_coin_in = message.takerCoinIn ? Coin.toAmino(message.takerCoinIn, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgPlaceLimitOrderResponseAminoMsg): MsgPlaceLimitOrderResponse {
    return MsgPlaceLimitOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPlaceLimitOrderResponseProtoMsg, useInterfaces: boolean = false): MsgPlaceLimitOrderResponse {
    return MsgPlaceLimitOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPlaceLimitOrderResponse): Uint8Array {
    return MsgPlaceLimitOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPlaceLimitOrderResponse): MsgPlaceLimitOrderResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgPlaceLimitOrderResponse",
      value: MsgPlaceLimitOrderResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawFilledLimitOrder(): MsgWithdrawFilledLimitOrder {
  return {
    creator: "",
    trancheKey: ""
  };
}
export const MsgWithdrawFilledLimitOrder = {
  typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder",
  encode(message: MsgWithdrawFilledLimitOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.trancheKey !== "") {
      writer.uint32(18).string(message.trancheKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawFilledLimitOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.trancheKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawFilledLimitOrder>): MsgWithdrawFilledLimitOrder {
    const message = createBaseMsgWithdrawFilledLimitOrder();
    message.creator = object.creator ?? "";
    message.trancheKey = object.trancheKey ?? "";
    return message;
  },
  fromAmino(object: MsgWithdrawFilledLimitOrderAmino): MsgWithdrawFilledLimitOrder {
    const message = createBaseMsgWithdrawFilledLimitOrder();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.tranche_key !== undefined && object.tranche_key !== null) {
      message.trancheKey = object.tranche_key;
    }
    return message;
  },
  toAmino(message: MsgWithdrawFilledLimitOrder, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrderAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.tranche_key = message.trancheKey === "" ? undefined : message.trancheKey;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawFilledLimitOrderAminoMsg): MsgWithdrawFilledLimitOrder {
    return MsgWithdrawFilledLimitOrder.fromAmino(object.value);
  },
  toAminoMsg(message: MsgWithdrawFilledLimitOrder, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrderAminoMsg {
    return {
      type: "dex/MsgWithdrawFilledLimitOrder",
      value: MsgWithdrawFilledLimitOrder.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgWithdrawFilledLimitOrderProtoMsg, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrder {
    return MsgWithdrawFilledLimitOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawFilledLimitOrder): Uint8Array {
    return MsgWithdrawFilledLimitOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawFilledLimitOrder): MsgWithdrawFilledLimitOrderProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder",
      value: MsgWithdrawFilledLimitOrder.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawFilledLimitOrderResponse(): MsgWithdrawFilledLimitOrderResponse {
  return {
    takerCoinOut: Coin.fromPartial({}),
    makerCoinOut: Coin.fromPartial({})
  };
}
export const MsgWithdrawFilledLimitOrderResponse = {
  typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrderResponse",
  encode(message: MsgWithdrawFilledLimitOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.takerCoinOut !== undefined) {
      Coin.encode(message.takerCoinOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.makerCoinOut !== undefined) {
      Coin.encode(message.makerCoinOut, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawFilledLimitOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerCoinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.makerCoinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawFilledLimitOrderResponse>): MsgWithdrawFilledLimitOrderResponse {
    const message = createBaseMsgWithdrawFilledLimitOrderResponse();
    message.takerCoinOut = object.takerCoinOut !== undefined && object.takerCoinOut !== null ? Coin.fromPartial(object.takerCoinOut) : undefined;
    message.makerCoinOut = object.makerCoinOut !== undefined && object.makerCoinOut !== null ? Coin.fromPartial(object.makerCoinOut) : undefined;
    return message;
  },
  fromAmino(object: MsgWithdrawFilledLimitOrderResponseAmino): MsgWithdrawFilledLimitOrderResponse {
    const message = createBaseMsgWithdrawFilledLimitOrderResponse();
    if (object.taker_coin_out !== undefined && object.taker_coin_out !== null) {
      message.takerCoinOut = Coin.fromAmino(object.taker_coin_out);
    }
    if (object.maker_coin_out !== undefined && object.maker_coin_out !== null) {
      message.makerCoinOut = Coin.fromAmino(object.maker_coin_out);
    }
    return message;
  },
  toAmino(message: MsgWithdrawFilledLimitOrderResponse, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrderResponseAmino {
    const obj: any = {};
    obj.taker_coin_out = message.takerCoinOut ? Coin.toAmino(message.takerCoinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    obj.maker_coin_out = message.makerCoinOut ? Coin.toAmino(message.makerCoinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawFilledLimitOrderResponseAminoMsg): MsgWithdrawFilledLimitOrderResponse {
    return MsgWithdrawFilledLimitOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawFilledLimitOrderResponseProtoMsg, useInterfaces: boolean = false): MsgWithdrawFilledLimitOrderResponse {
    return MsgWithdrawFilledLimitOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawFilledLimitOrderResponse): Uint8Array {
    return MsgWithdrawFilledLimitOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawFilledLimitOrderResponse): MsgWithdrawFilledLimitOrderResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrderResponse",
      value: MsgWithdrawFilledLimitOrderResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCancelLimitOrder(): MsgCancelLimitOrder {
  return {
    creator: "",
    trancheKey: ""
  };
}
export const MsgCancelLimitOrder = {
  typeUrl: "/neutron.dex.MsgCancelLimitOrder",
  encode(message: MsgCancelLimitOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.trancheKey !== "") {
      writer.uint32(18).string(message.trancheKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCancelLimitOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelLimitOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.trancheKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelLimitOrder>): MsgCancelLimitOrder {
    const message = createBaseMsgCancelLimitOrder();
    message.creator = object.creator ?? "";
    message.trancheKey = object.trancheKey ?? "";
    return message;
  },
  fromAmino(object: MsgCancelLimitOrderAmino): MsgCancelLimitOrder {
    const message = createBaseMsgCancelLimitOrder();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.tranche_key !== undefined && object.tranche_key !== null) {
      message.trancheKey = object.tranche_key;
    }
    return message;
  },
  toAmino(message: MsgCancelLimitOrder, useInterfaces: boolean = false): MsgCancelLimitOrderAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.tranche_key = message.trancheKey === "" ? undefined : message.trancheKey;
    return obj;
  },
  fromAminoMsg(object: MsgCancelLimitOrderAminoMsg): MsgCancelLimitOrder {
    return MsgCancelLimitOrder.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCancelLimitOrder, useInterfaces: boolean = false): MsgCancelLimitOrderAminoMsg {
    return {
      type: "dex/MsgCancelLimitOrder",
      value: MsgCancelLimitOrder.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCancelLimitOrderProtoMsg, useInterfaces: boolean = false): MsgCancelLimitOrder {
    return MsgCancelLimitOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCancelLimitOrder): Uint8Array {
    return MsgCancelLimitOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelLimitOrder): MsgCancelLimitOrderProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgCancelLimitOrder",
      value: MsgCancelLimitOrder.encode(message).finish()
    };
  }
};
function createBaseMsgCancelLimitOrderResponse(): MsgCancelLimitOrderResponse {
  return {
    takerCoinOut: Coin.fromPartial({}),
    makerCoinOut: Coin.fromPartial({})
  };
}
export const MsgCancelLimitOrderResponse = {
  typeUrl: "/neutron.dex.MsgCancelLimitOrderResponse",
  encode(message: MsgCancelLimitOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.takerCoinOut !== undefined) {
      Coin.encode(message.takerCoinOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.makerCoinOut !== undefined) {
      Coin.encode(message.makerCoinOut, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCancelLimitOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelLimitOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerCoinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.makerCoinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelLimitOrderResponse>): MsgCancelLimitOrderResponse {
    const message = createBaseMsgCancelLimitOrderResponse();
    message.takerCoinOut = object.takerCoinOut !== undefined && object.takerCoinOut !== null ? Coin.fromPartial(object.takerCoinOut) : undefined;
    message.makerCoinOut = object.makerCoinOut !== undefined && object.makerCoinOut !== null ? Coin.fromPartial(object.makerCoinOut) : undefined;
    return message;
  },
  fromAmino(object: MsgCancelLimitOrderResponseAmino): MsgCancelLimitOrderResponse {
    const message = createBaseMsgCancelLimitOrderResponse();
    if (object.taker_coin_out !== undefined && object.taker_coin_out !== null) {
      message.takerCoinOut = Coin.fromAmino(object.taker_coin_out);
    }
    if (object.maker_coin_out !== undefined && object.maker_coin_out !== null) {
      message.makerCoinOut = Coin.fromAmino(object.maker_coin_out);
    }
    return message;
  },
  toAmino(message: MsgCancelLimitOrderResponse, useInterfaces: boolean = false): MsgCancelLimitOrderResponseAmino {
    const obj: any = {};
    obj.taker_coin_out = message.takerCoinOut ? Coin.toAmino(message.takerCoinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    obj.maker_coin_out = message.makerCoinOut ? Coin.toAmino(message.makerCoinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgCancelLimitOrderResponseAminoMsg): MsgCancelLimitOrderResponse {
    return MsgCancelLimitOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelLimitOrderResponseProtoMsg, useInterfaces: boolean = false): MsgCancelLimitOrderResponse {
    return MsgCancelLimitOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCancelLimitOrderResponse): Uint8Array {
    return MsgCancelLimitOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelLimitOrderResponse): MsgCancelLimitOrderResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgCancelLimitOrderResponse",
      value: MsgCancelLimitOrderResponse.encode(message).finish()
    };
  }
};
function createBaseMultiHopRoute(): MultiHopRoute {
  return {
    hops: []
  };
}
export const MultiHopRoute = {
  typeUrl: "/neutron.dex.MultiHopRoute",
  encode(message: MultiHopRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hops) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MultiHopRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiHopRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hops.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MultiHopRoute>): MultiHopRoute {
    const message = createBaseMultiHopRoute();
    message.hops = object.hops?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MultiHopRouteAmino): MultiHopRoute {
    const message = createBaseMultiHopRoute();
    message.hops = object.hops?.map(e => e) || [];
    return message;
  },
  toAmino(message: MultiHopRoute, useInterfaces: boolean = false): MultiHopRouteAmino {
    const obj: any = {};
    if (message.hops) {
      obj.hops = message.hops.map(e => e);
    } else {
      obj.hops = message.hops;
    }
    return obj;
  },
  fromAminoMsg(object: MultiHopRouteAminoMsg): MultiHopRoute {
    return MultiHopRoute.fromAmino(object.value);
  },
  fromProtoMsg(message: MultiHopRouteProtoMsg, useInterfaces: boolean = false): MultiHopRoute {
    return MultiHopRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MultiHopRoute): Uint8Array {
    return MultiHopRoute.encode(message).finish();
  },
  toProtoMsg(message: MultiHopRoute): MultiHopRouteProtoMsg {
    return {
      typeUrl: "/neutron.dex.MultiHopRoute",
      value: MultiHopRoute.encode(message).finish()
    };
  }
};
function createBaseMsgMultiHopSwap(): MsgMultiHopSwap {
  return {
    creator: "",
    receiver: "",
    routes: [],
    amountIn: "",
    exitLimitPrice: "",
    pickBestRoute: false
  };
}
export const MsgMultiHopSwap = {
  typeUrl: "/neutron.dex.MsgMultiHopSwap",
  encode(message: MsgMultiHopSwap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    for (const v of message.routes) {
      MultiHopRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.amountIn !== "") {
      writer.uint32(34).string(message.amountIn);
    }
    if (message.exitLimitPrice !== "") {
      writer.uint32(42).string(message.exitLimitPrice);
    }
    if (message.pickBestRoute === true) {
      writer.uint32(48).bool(message.pickBestRoute);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMultiHopSwap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiHopSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.routes.push(MultiHopRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.amountIn = reader.string();
          break;
        case 5:
          message.exitLimitPrice = reader.string();
          break;
        case 6:
          message.pickBestRoute = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMultiHopSwap>): MsgMultiHopSwap {
    const message = createBaseMsgMultiHopSwap();
    message.creator = object.creator ?? "";
    message.receiver = object.receiver ?? "";
    message.routes = object.routes?.map(e => MultiHopRoute.fromPartial(e)) || [];
    message.amountIn = object.amountIn ?? "";
    message.exitLimitPrice = object.exitLimitPrice ?? "";
    message.pickBestRoute = object.pickBestRoute ?? false;
    return message;
  },
  fromAmino(object: MsgMultiHopSwapAmino): MsgMultiHopSwap {
    const message = createBaseMsgMultiHopSwap();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    message.routes = object.routes?.map(e => MultiHopRoute.fromAmino(e)) || [];
    if (object.amount_in !== undefined && object.amount_in !== null) {
      message.amountIn = object.amount_in;
    }
    if (object.exit_limit_price !== undefined && object.exit_limit_price !== null) {
      message.exitLimitPrice = object.exit_limit_price;
    }
    if (object.pick_best_route !== undefined && object.pick_best_route !== null) {
      message.pickBestRoute = object.pick_best_route;
    }
    return message;
  },
  toAmino(message: MsgMultiHopSwap, useInterfaces: boolean = false): MsgMultiHopSwapAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? MultiHopRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    obj.amount_in = message.amountIn ?? "";
    obj.exit_limit_price = message.exitLimitPrice ?? "";
    obj.pick_best_route = message.pickBestRoute === false ? undefined : message.pickBestRoute;
    return obj;
  },
  fromAminoMsg(object: MsgMultiHopSwapAminoMsg): MsgMultiHopSwap {
    return MsgMultiHopSwap.fromAmino(object.value);
  },
  toAminoMsg(message: MsgMultiHopSwap, useInterfaces: boolean = false): MsgMultiHopSwapAminoMsg {
    return {
      type: "dex/MsgMultiHopSwap",
      value: MsgMultiHopSwap.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgMultiHopSwapProtoMsg, useInterfaces: boolean = false): MsgMultiHopSwap {
    return MsgMultiHopSwap.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMultiHopSwap): Uint8Array {
    return MsgMultiHopSwap.encode(message).finish();
  },
  toProtoMsg(message: MsgMultiHopSwap): MsgMultiHopSwapProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgMultiHopSwap",
      value: MsgMultiHopSwap.encode(message).finish()
    };
  }
};
function createBaseMsgMultiHopSwapResponse(): MsgMultiHopSwapResponse {
  return {
    coinOut: Coin.fromPartial({}),
    route: undefined,
    dust: []
  };
}
export const MsgMultiHopSwapResponse = {
  typeUrl: "/neutron.dex.MsgMultiHopSwapResponse",
  encode(message: MsgMultiHopSwapResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.coinOut !== undefined) {
      Coin.encode(message.coinOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.route !== undefined) {
      MultiHopRoute.encode(message.route, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.dust) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMultiHopSwapResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiHopSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coinOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.route = MultiHopRoute.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.dust.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMultiHopSwapResponse>): MsgMultiHopSwapResponse {
    const message = createBaseMsgMultiHopSwapResponse();
    message.coinOut = object.coinOut !== undefined && object.coinOut !== null ? Coin.fromPartial(object.coinOut) : undefined;
    message.route = object.route !== undefined && object.route !== null ? MultiHopRoute.fromPartial(object.route) : undefined;
    message.dust = object.dust?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgMultiHopSwapResponseAmino): MsgMultiHopSwapResponse {
    const message = createBaseMsgMultiHopSwapResponse();
    if (object.coin_out !== undefined && object.coin_out !== null) {
      message.coinOut = Coin.fromAmino(object.coin_out);
    }
    if (object.route !== undefined && object.route !== null) {
      message.route = MultiHopRoute.fromAmino(object.route);
    }
    message.dust = object.dust?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgMultiHopSwapResponse, useInterfaces: boolean = false): MsgMultiHopSwapResponseAmino {
    const obj: any = {};
    obj.coin_out = message.coinOut ? Coin.toAmino(message.coinOut, useInterfaces) : Coin.toAmino(Coin.fromPartial({}));
    obj.route = message.route ? MultiHopRoute.toAmino(message.route, useInterfaces) : undefined;
    if (message.dust) {
      obj.dust = message.dust.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.dust = message.dust;
    }
    return obj;
  },
  fromAminoMsg(object: MsgMultiHopSwapResponseAminoMsg): MsgMultiHopSwapResponse {
    return MsgMultiHopSwapResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMultiHopSwapResponseProtoMsg, useInterfaces: boolean = false): MsgMultiHopSwapResponse {
    return MsgMultiHopSwapResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMultiHopSwapResponse): Uint8Array {
    return MsgMultiHopSwapResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMultiHopSwapResponse): MsgMultiHopSwapResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgMultiHopSwapResponse",
      value: MsgMultiHopSwapResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/neutron.dex.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "dex/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/neutron.dex.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/neutron.dex.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
import { Pool, PoolAmino, PoolSDKType } from "./pool";
import { DisabledOrderPair, DisabledOrderPairAmino, DisabledOrderPairSDKType, Order, OrderAmino, OrderSDKType } from "./order";
import { PoolToken, PoolTokenAmino, PoolTokenSDKType } from "./pool_token";
import { WeightedToken, WeightedTokenAmino, WeightedTokenSDKType } from "./weighted_token";
import { WeightUpdateTiming, WeightUpdateTimingAmino, WeightUpdateTimingSDKType } from "./weight_update_timing";
import { WhitelistedRoute, WhitelistedRouteAmino, WhitelistedRouteSDKType } from "./whitelisted_route";
import { YammConfiguration, YammConfigurationAmino, YammConfigurationSDKType } from "./yamm_configuration";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { ScheduleOrder, ScheduleOrderAmino, ScheduleOrderSDKType } from "./schedule_order";
import { TemporalVirtualBalancePoolToken, TemporalVirtualBalancePoolTokenAmino, TemporalVirtualBalancePoolTokenSDKType, PermanentVirtualBalancePoolToken, PermanentVirtualBalancePoolTokenAmino, PermanentVirtualBalancePoolTokenSDKType } from "./virtual_balance_pool_token";
import { MatchedPairSummary, MatchedPairSummaryAmino, MatchedPairSummarySDKType } from "./pair_match_proposal";
import { ExitSummary, ExitSummaryAmino, ExitSummarySDKType, JoinSummary, JoinSummaryAmino, JoinSummarySDKType, SwapSummary, SwapSummaryAmino, SwapSummarySDKType, ExitType, JoinType, SwapType, SwapStep, SwapStepAmino, SwapStepSDKType } from "./operations";
import { OraclePricePair, OraclePricePairAmino, OraclePricePairSDKType } from "./oracle_price_pair";
import { PendingTokenIntroduction, PendingTokenIntroductionAmino, PendingTokenIntroductionSDKType } from "./pending_token_introduction";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export enum RemoveOrderReason {
  ORDER_CANCELED = 0,
  ORDER_DEPOSIT_FAILED = 1,
  ORDER_FINISHED = 3,
  UNRECOGNIZED = -1,
}
export const RemoveOrderReasonSDKType = RemoveOrderReason;
export const RemoveOrderReasonAmino = RemoveOrderReason;
export function removeOrderReasonFromJSON(object: any): RemoveOrderReason {
  switch (object) {
    case 0:
    case "ORDER_CANCELED":
      return RemoveOrderReason.ORDER_CANCELED;
    case 1:
    case "ORDER_DEPOSIT_FAILED":
      return RemoveOrderReason.ORDER_DEPOSIT_FAILED;
    case 3:
    case "ORDER_FINISHED":
      return RemoveOrderReason.ORDER_FINISHED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoveOrderReason.UNRECOGNIZED;
  }
}
export function removeOrderReasonToJSON(object: RemoveOrderReason): string {
  switch (object) {
    case RemoveOrderReason.ORDER_CANCELED:
      return "ORDER_CANCELED";
    case RemoveOrderReason.ORDER_DEPOSIT_FAILED:
      return "ORDER_DEPOSIT_FAILED";
    case RemoveOrderReason.ORDER_FINISHED:
      return "ORDER_FINISHED";
    case RemoveOrderReason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface EventSetPool {
  pool: Pool | undefined;
}
export interface EventSetPoolProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetPool";
  value: Uint8Array;
}
export interface EventSetPoolAmino {
  pool?: PoolAmino | undefined;
}
export interface EventSetPoolAminoMsg {
  type: "/pryzm.amm.v1.EventSetPool";
  value: EventSetPoolAmino;
}
export interface EventSetPoolSDKType {
  pool: PoolSDKType | undefined;
}
export interface EventSetPoolCount {
  poolCount: bigint;
}
export interface EventSetPoolCountProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetPoolCount";
  value: Uint8Array;
}
export interface EventSetPoolCountAmino {
  pool_count?: string;
}
export interface EventSetPoolCountAminoMsg {
  type: "/pryzm.amm.v1.EventSetPoolCount";
  value: EventSetPoolCountAmino;
}
export interface EventSetPoolCountSDKType {
  pool_count: bigint;
}
export interface EventSetOrderPairDisabled {
  /**
   * note token_in and token_out are bi-directional
   * meaning disabling token_in=x,token_out=y is
   * disabling token_in=y,token_out=x at the same time.
   */
  pair: DisabledOrderPair | undefined;
  disabled: boolean;
}
export interface EventSetOrderPairDisabledProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetOrderPairDisabled";
  value: Uint8Array;
}
export interface EventSetOrderPairDisabledAmino {
  /**
   * note token_in and token_out are bi-directional
   * meaning disabling token_in=x,token_out=y is
   * disabling token_in=y,token_out=x at the same time.
   */
  pair?: DisabledOrderPairAmino | undefined;
  disabled?: boolean;
}
export interface EventSetOrderPairDisabledAminoMsg {
  type: "/pryzm.amm.v1.EventSetOrderPairDisabled";
  value: EventSetOrderPairDisabledAmino;
}
export interface EventSetOrderPairDisabledSDKType {
  pair: DisabledOrderPairSDKType | undefined;
  disabled: boolean;
}
export interface EventSetLpTokenSupply {
  poolId: bigint;
  supply: string;
}
export interface EventSetLpTokenSupplyProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetLpTokenSupply";
  value: Uint8Array;
}
export interface EventSetLpTokenSupplyAmino {
  pool_id?: string;
  supply?: string;
}
export interface EventSetLpTokenSupplyAminoMsg {
  type: "/pryzm.amm.v1.EventSetLpTokenSupply";
  value: EventSetLpTokenSupplyAmino;
}
export interface EventSetLpTokenSupplySDKType {
  pool_id: bigint;
  supply: string;
}
export interface EventSetPoolToken {
  poolToken: PoolToken | undefined;
}
export interface EventSetPoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetPoolToken";
  value: Uint8Array;
}
export interface EventSetPoolTokenAmino {
  pool_token?: PoolTokenAmino | undefined;
}
export interface EventSetPoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventSetPoolToken";
  value: EventSetPoolTokenAmino;
}
export interface EventSetPoolTokenSDKType {
  pool_token: PoolTokenSDKType | undefined;
}
export interface EventRemovePoolToken {
  poolId: bigint;
  denom: string;
}
export interface EventRemovePoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemovePoolToken";
  value: Uint8Array;
}
export interface EventRemovePoolTokenAmino {
  pool_id?: string;
  denom?: string;
}
export interface EventRemovePoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventRemovePoolToken";
  value: EventRemovePoolTokenAmino;
}
export interface EventRemovePoolTokenSDKType {
  pool_id: bigint;
  denom: string;
}
export interface EventSetWeightedToken {
  weightedToken: WeightedToken | undefined;
}
export interface EventSetWeightedTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetWeightedToken";
  value: Uint8Array;
}
export interface EventSetWeightedTokenAmino {
  weighted_token?: WeightedTokenAmino | undefined;
}
export interface EventSetWeightedTokenAminoMsg {
  type: "/pryzm.amm.v1.EventSetWeightedToken";
  value: EventSetWeightedTokenAmino;
}
export interface EventSetWeightedTokenSDKType {
  weighted_token: WeightedTokenSDKType | undefined;
}
export interface EventRemoveWeightedToken {
  poolId: bigint;
  denom: string;
}
export interface EventRemoveWeightedTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveWeightedToken";
  value: Uint8Array;
}
export interface EventRemoveWeightedTokenAmino {
  pool_id?: string;
  denom?: string;
}
export interface EventRemoveWeightedTokenAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveWeightedToken";
  value: EventRemoveWeightedTokenAmino;
}
export interface EventRemoveWeightedTokenSDKType {
  pool_id: bigint;
  denom: string;
}
export interface EventSetWeightUpdateTiming {
  weightUpdateTiming: WeightUpdateTiming | undefined;
}
export interface EventSetWeightUpdateTimingProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetWeightUpdateTiming";
  value: Uint8Array;
}
export interface EventSetWeightUpdateTimingAmino {
  weight_update_timing?: WeightUpdateTimingAmino | undefined;
}
export interface EventSetWeightUpdateTimingAminoMsg {
  type: "/pryzm.amm.v1.EventSetWeightUpdateTiming";
  value: EventSetWeightUpdateTimingAmino;
}
export interface EventSetWeightUpdateTimingSDKType {
  weight_update_timing: WeightUpdateTimingSDKType | undefined;
}
export interface EventSetWhitelistedRoute {
  whitelistedRoute: WhitelistedRoute | undefined;
}
export interface EventSetWhitelistedRouteProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetWhitelistedRoute";
  value: Uint8Array;
}
export interface EventSetWhitelistedRouteAmino {
  whitelisted_route?: WhitelistedRouteAmino | undefined;
}
export interface EventSetWhitelistedRouteAminoMsg {
  type: "/pryzm.amm.v1.EventSetWhitelistedRoute";
  value: EventSetWhitelistedRouteAmino;
}
export interface EventSetWhitelistedRouteSDKType {
  whitelisted_route: WhitelistedRouteSDKType | undefined;
}
export interface EventSetYammConfiguration {
  yammConfiguration: YammConfiguration | undefined;
}
export interface EventSetYammConfigurationProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetYammConfiguration";
  value: Uint8Array;
}
export interface EventSetYammConfigurationAmino {
  yamm_configuration?: YammConfigurationAmino | undefined;
}
export interface EventSetYammConfigurationAminoMsg {
  type: "/pryzm.amm.v1.EventSetYammConfiguration";
  value: EventSetYammConfigurationAmino;
}
export interface EventSetYammConfigurationSDKType {
  yamm_configuration: YammConfigurationSDKType | undefined;
}
export interface EventSetOrder {
  order: Order | undefined;
}
export interface EventSetOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetOrder";
  value: Uint8Array;
}
export interface EventSetOrderAmino {
  order?: OrderAmino | undefined;
}
export interface EventSetOrderAminoMsg {
  type: "/pryzm.amm.v1.EventSetOrder";
  value: EventSetOrderAmino;
}
export interface EventSetOrderSDKType {
  order: OrderSDKType | undefined;
}
export interface EventSetOrderCount {
  orderCount: bigint;
}
export interface EventSetOrderCountProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetOrderCount";
  value: Uint8Array;
}
export interface EventSetOrderCountAmino {
  order_count?: string;
}
export interface EventSetOrderCountAminoMsg {
  type: "/pryzm.amm.v1.EventSetOrderCount";
  value: EventSetOrderCountAmino;
}
export interface EventSetOrderCountSDKType {
  order_count: bigint;
}
export interface EventRemoveOrder {
  id: bigint;
  reason: RemoveOrderReason;
}
export interface EventRemoveOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveOrder";
  value: Uint8Array;
}
export interface EventRemoveOrderAmino {
  id?: string;
  reason?: RemoveOrderReason;
}
export interface EventRemoveOrderAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveOrder";
  value: EventRemoveOrderAmino;
}
export interface EventRemoveOrderSDKType {
  id: bigint;
  reason: RemoveOrderReason;
}
export interface EventCancelOrder {
  id: bigint;
  withdrawnAmount: Coin | undefined;
}
export interface EventCancelOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventCancelOrder";
  value: Uint8Array;
}
export interface EventCancelOrderAmino {
  id?: string;
  withdrawn_amount?: CoinAmino | undefined;
}
export interface EventCancelOrderAminoMsg {
  type: "/pryzm.amm.v1.EventCancelOrder";
  value: EventCancelOrderAmino;
}
export interface EventCancelOrderSDKType {
  id: bigint;
  withdrawn_amount: CoinSDKType | undefined;
}
export interface EventSetScheduleOrder {
  scheduleOrder: ScheduleOrder | undefined;
}
export interface EventSetScheduleOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetScheduleOrder";
  value: Uint8Array;
}
export interface EventSetScheduleOrderAmino {
  schedule_order?: ScheduleOrderAmino | undefined;
}
export interface EventSetScheduleOrderAminoMsg {
  type: "/pryzm.amm.v1.EventSetScheduleOrder";
  value: EventSetScheduleOrderAmino;
}
export interface EventSetScheduleOrderSDKType {
  schedule_order: ScheduleOrderSDKType | undefined;
}
export interface EventRemoveScheduleOrder {
  orderId: bigint;
  timeMillis: bigint;
}
export interface EventRemoveScheduleOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveScheduleOrder";
  value: Uint8Array;
}
export interface EventRemoveScheduleOrderAmino {
  order_id?: string;
  time_millis?: string;
}
export interface EventRemoveScheduleOrderAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveScheduleOrder";
  value: EventRemoveScheduleOrderAmino;
}
export interface EventRemoveScheduleOrderSDKType {
  order_id: bigint;
  time_millis: bigint;
}
export interface EventSetExecutableOrder {
  orderId: bigint;
}
export interface EventSetExecutableOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetExecutableOrder";
  value: Uint8Array;
}
export interface EventSetExecutableOrderAmino {
  order_id?: string;
}
export interface EventSetExecutableOrderAminoMsg {
  type: "/pryzm.amm.v1.EventSetExecutableOrder";
  value: EventSetExecutableOrderAmino;
}
export interface EventSetExecutableOrderSDKType {
  order_id: bigint;
}
export interface EventRemoveExecutableOrder {
  orderId: bigint;
}
export interface EventRemoveExecutableOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveExecutableOrder";
  value: Uint8Array;
}
export interface EventRemoveExecutableOrderAmino {
  order_id?: string;
}
export interface EventRemoveExecutableOrderAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveExecutableOrder";
  value: EventRemoveExecutableOrderAmino;
}
export interface EventRemoveExecutableOrderSDKType {
  order_id: bigint;
}
export interface EventSetIntroducingPoolToken {
  virtualBalanceToken: TemporalVirtualBalancePoolToken | undefined;
}
export interface EventSetIntroducingPoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetIntroducingPoolToken";
  value: Uint8Array;
}
export interface EventSetIntroducingPoolTokenAmino {
  virtual_balance_token?: TemporalVirtualBalancePoolTokenAmino | undefined;
}
export interface EventSetIntroducingPoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventSetIntroducingPoolToken";
  value: EventSetIntroducingPoolTokenAmino;
}
export interface EventSetIntroducingPoolTokenSDKType {
  virtual_balance_token: TemporalVirtualBalancePoolTokenSDKType | undefined;
}
export interface EventRemoveIntroducingPoolToken {
  poolId: bigint;
  denom: string;
}
export interface EventRemoveIntroducingPoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveIntroducingPoolToken";
  value: Uint8Array;
}
export interface EventRemoveIntroducingPoolTokenAmino {
  pool_id?: string;
  denom?: string;
}
export interface EventRemoveIntroducingPoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveIntroducingPoolToken";
  value: EventRemoveIntroducingPoolTokenAmino;
}
export interface EventRemoveIntroducingPoolTokenSDKType {
  pool_id: bigint;
  denom: string;
}
export interface EventSetExpiringPoolToken {
  virtualBalanceToken: TemporalVirtualBalancePoolToken | undefined;
}
export interface EventSetExpiringPoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetExpiringPoolToken";
  value: Uint8Array;
}
export interface EventSetExpiringPoolTokenAmino {
  virtual_balance_token?: TemporalVirtualBalancePoolTokenAmino | undefined;
}
export interface EventSetExpiringPoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventSetExpiringPoolToken";
  value: EventSetExpiringPoolTokenAmino;
}
export interface EventSetExpiringPoolTokenSDKType {
  virtual_balance_token: TemporalVirtualBalancePoolTokenSDKType | undefined;
}
export interface EventRemoveExpiringPoolToken {
  poolId: bigint;
  denom: string;
}
export interface EventRemoveExpiringPoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveExpiringPoolToken";
  value: Uint8Array;
}
export interface EventRemoveExpiringPoolTokenAmino {
  pool_id?: string;
  denom?: string;
}
export interface EventRemoveExpiringPoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveExpiringPoolToken";
  value: EventRemoveExpiringPoolTokenAmino;
}
export interface EventRemoveExpiringPoolTokenSDKType {
  pool_id: bigint;
  denom: string;
}
export interface EventSetYammPoolForAssetId {
  poolId: bigint;
  assetId: string;
}
export interface EventSetYammPoolForAssetIdProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetYammPoolForAssetId";
  value: Uint8Array;
}
export interface EventSetYammPoolForAssetIdAmino {
  pool_id?: string;
  asset_id?: string;
}
export interface EventSetYammPoolForAssetIdAminoMsg {
  type: "/pryzm.amm.v1.EventSetYammPoolForAssetId";
  value: EventSetYammPoolForAssetIdAmino;
}
export interface EventSetYammPoolForAssetIdSDKType {
  pool_id: bigint;
  asset_id: string;
}
export interface EventSetVaultPaused {
  paused: boolean;
}
export interface EventSetVaultPausedProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetVaultPaused";
  value: Uint8Array;
}
export interface EventSetVaultPausedAmino {
  paused?: boolean;
}
export interface EventSetVaultPausedAminoMsg {
  type: "/pryzm.amm.v1.EventSetVaultPaused";
  value: EventSetVaultPausedAmino;
}
export interface EventSetVaultPausedSDKType {
  paused: boolean;
}
export interface EventExecuteOrder {
  orderId: bigint;
  tradeAmount: string;
  matchAmount: string;
  outputAmount: string;
}
export interface EventExecuteOrderProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventExecuteOrder";
  value: Uint8Array;
}
export interface EventExecuteOrderAmino {
  order_id?: string;
  trade_amount?: string;
  match_amount?: string;
  output_amount?: string;
}
export interface EventExecuteOrderAminoMsg {
  type: "/pryzm.amm.v1.EventExecuteOrder";
  value: EventExecuteOrderAmino;
}
export interface EventExecuteOrderSDKType {
  order_id: bigint;
  trade_amount: string;
  match_amount: string;
  output_amount: string;
}
export interface EventExecuteOrdersForPair {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  whitelistedRoute: boolean;
  buyPrice: string;
  sellPrice: string;
  buyOrders: EventExecuteOrder[];
  sellOrders: EventExecuteOrder[];
  buyTradeAmount: string;
  buyMatchAmount: string;
  sellTradeAmount: string;
  sellMatchAmount: string;
  sellTradeOutput: string;
  buyTradeOutput: string;
}
export interface EventExecuteOrdersForPairProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventExecuteOrdersForPair";
  value: Uint8Array;
}
export interface EventExecuteOrdersForPairAmino {
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  whitelisted_route?: boolean;
  buy_price?: string;
  sell_price?: string;
  buy_orders?: EventExecuteOrderAmino[];
  sell_orders?: EventExecuteOrderAmino[];
  buy_trade_amount?: string;
  buy_match_amount?: string;
  sell_trade_amount?: string;
  sell_match_amount?: string;
  sell_trade_output?: string;
  buy_trade_output?: string;
}
export interface EventExecuteOrdersForPairAminoMsg {
  type: "/pryzm.amm.v1.EventExecuteOrdersForPair";
  value: EventExecuteOrdersForPairAmino;
}
export interface EventExecuteOrdersForPairSDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
  whitelisted_route: boolean;
  buy_price: string;
  sell_price: string;
  buy_orders: EventExecuteOrderSDKType[];
  sell_orders: EventExecuteOrderSDKType[];
  buy_trade_amount: string;
  buy_match_amount: string;
  sell_trade_amount: string;
  sell_match_amount: string;
  sell_trade_output: string;
  buy_trade_output: string;
}
export interface EventExecuteMatchProposal {
  proposer: string;
  pairs: MatchedPairSummary[];
  proposerReward: Coin[];
}
export interface EventExecuteMatchProposalProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventExecuteMatchProposal";
  value: Uint8Array;
}
export interface EventExecuteMatchProposalAmino {
  proposer?: string;
  pairs?: MatchedPairSummaryAmino[];
  proposer_reward?: CoinAmino[];
}
export interface EventExecuteMatchProposalAminoMsg {
  type: "/pryzm.amm.v1.EventExecuteMatchProposal";
  value: EventExecuteMatchProposalAmino;
}
export interface EventExecuteMatchProposalSDKType {
  proposer: string;
  pairs: MatchedPairSummarySDKType[];
  proposer_reward: CoinSDKType[];
}
export interface EventExitPool {
  poolId: bigint;
  summary: ExitSummary | undefined;
}
export interface EventExitPoolProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventExitPool";
  value: Uint8Array;
}
export interface EventExitPoolAmino {
  pool_id?: string;
  summary?: ExitSummaryAmino | undefined;
}
export interface EventExitPoolAminoMsg {
  type: "/pryzm.amm.v1.EventExitPool";
  value: EventExitPoolAmino;
}
export interface EventExitPoolSDKType {
  pool_id: bigint;
  summary: ExitSummarySDKType | undefined;
}
export interface EventJoinPool {
  poolId: bigint;
  summary: JoinSummary | undefined;
}
export interface EventJoinPoolProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventJoinPool";
  value: Uint8Array;
}
export interface EventJoinPoolAmino {
  pool_id?: string;
  summary?: JoinSummaryAmino | undefined;
}
export interface EventJoinPoolAminoMsg {
  type: "/pryzm.amm.v1.EventJoinPool";
  value: EventJoinPoolAmino;
}
export interface EventJoinPoolSDKType {
  pool_id: bigint;
  summary: JoinSummarySDKType | undefined;
}
export interface EventSwap {
  poolId: bigint;
  summary: SwapSummary | undefined;
}
export interface EventSwapProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSwap";
  value: Uint8Array;
}
export interface EventSwapAmino {
  pool_id?: string;
  summary?: SwapSummaryAmino | undefined;
}
export interface EventSwapAminoMsg {
  type: "/pryzm.amm.v1.EventSwap";
  value: EventSwapAmino;
}
export interface EventSwapSDKType {
  pool_id: bigint;
  summary: SwapSummarySDKType | undefined;
}
export interface EventExitPoolRequest {
  creator: string;
  poolId: bigint;
  lptIn: Coin | undefined;
  amountsOut: Coin[];
  protocolFee: Coin | undefined;
  swapFee: Coin[];
  exitType: ExitType;
}
export interface EventExitPoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventExitPoolRequest";
  value: Uint8Array;
}
export interface EventExitPoolRequestAmino {
  creator?: string;
  pool_id?: string;
  lpt_in?: CoinAmino | undefined;
  amounts_out?: CoinAmino[];
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino[];
  exit_type?: ExitType;
}
export interface EventExitPoolRequestAminoMsg {
  type: "/pryzm.amm.v1.EventExitPoolRequest";
  value: EventExitPoolRequestAmino;
}
export interface EventExitPoolRequestSDKType {
  creator: string;
  pool_id: bigint;
  lpt_in: CoinSDKType | undefined;
  amounts_out: CoinSDKType[];
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType[];
  exit_type: ExitType;
}
export interface EventJoinPoolRequest {
  creator: string;
  poolId: bigint;
  lptOut: Coin | undefined;
  amountsIn: Coin[];
  protocolFee: Coin[];
  swapFee: Coin[];
  joinType: JoinType;
}
export interface EventJoinPoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventJoinPoolRequest";
  value: Uint8Array;
}
export interface EventJoinPoolRequestAmino {
  creator?: string;
  pool_id?: string;
  lpt_out?: CoinAmino | undefined;
  amounts_in?: CoinAmino[];
  protocol_fee?: CoinAmino[];
  swap_fee?: CoinAmino[];
  join_type?: JoinType;
}
export interface EventJoinPoolRequestAminoMsg {
  type: "/pryzm.amm.v1.EventJoinPoolRequest";
  value: EventJoinPoolRequestAmino;
}
export interface EventJoinPoolRequestSDKType {
  creator: string;
  pool_id: bigint;
  lpt_out: CoinSDKType | undefined;
  amounts_in: CoinSDKType[];
  protocol_fee: CoinSDKType[];
  swap_fee: CoinSDKType[];
  join_type: JoinType;
}
export interface EventSingleSwapRequest {
  creator: string;
  poolId: bigint;
  amountOut: Coin | undefined;
  amountIn: Coin | undefined;
  protocolFee: Coin | undefined;
  swapFee: Coin | undefined;
  swapType: SwapType;
}
export interface EventSingleSwapRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSingleSwapRequest";
  value: Uint8Array;
}
export interface EventSingleSwapRequestAmino {
  creator?: string;
  pool_id?: string;
  amount_out?: CoinAmino | undefined;
  amount_in?: CoinAmino | undefined;
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino | undefined;
  swap_type?: SwapType;
}
export interface EventSingleSwapRequestAminoMsg {
  type: "/pryzm.amm.v1.EventSingleSwapRequest";
  value: EventSingleSwapRequestAmino;
}
export interface EventSingleSwapRequestSDKType {
  creator: string;
  pool_id: bigint;
  amount_out: CoinSDKType | undefined;
  amount_in: CoinSDKType | undefined;
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType | undefined;
  swap_type: SwapType;
}
export interface EventBatchSwapRequest {
  creator: string;
  steps: SwapStep[];
  amountsIn: Coin[];
  amountsOut: Coin[];
  swapProtocolFee: Coin[];
  joinExitProtocolFee: Coin[];
  swapFee: Coin[];
  swapType: SwapType;
}
export interface EventBatchSwapRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventBatchSwapRequest";
  value: Uint8Array;
}
export interface EventBatchSwapRequestAmino {
  creator?: string;
  steps?: SwapStepAmino[];
  amounts_in?: CoinAmino[];
  amounts_out?: CoinAmino[];
  swap_protocol_fee?: CoinAmino[];
  join_exit_protocol_fee?: CoinAmino[];
  swap_fee?: CoinAmino[];
  swap_type?: SwapType;
}
export interface EventBatchSwapRequestAminoMsg {
  type: "/pryzm.amm.v1.EventBatchSwapRequest";
  value: EventBatchSwapRequestAmino;
}
export interface EventBatchSwapRequestSDKType {
  creator: string;
  steps: SwapStepSDKType[];
  amounts_in: CoinSDKType[];
  amounts_out: CoinSDKType[];
  swap_protocol_fee: CoinSDKType[];
  join_exit_protocol_fee: CoinSDKType[];
  swap_fee: CoinSDKType[];
  swap_type: SwapType;
}
export interface EventYAssetSwapRefractorAction {
  yAmount: string;
  cAmountAfterFee: string;
  feeAmount: string;
}
export interface EventYAssetSwapRefractorActionProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventYAssetSwapRefractorAction";
  value: Uint8Array;
}
export interface EventYAssetSwapRefractorActionAmino {
  y_amount?: string;
  c_amount_after_fee?: string;
  fee_amount?: string;
}
export interface EventYAssetSwapRefractorActionAminoMsg {
  type: "/pryzm.amm.v1.EventYAssetSwapRefractorAction";
  value: EventYAssetSwapRefractorActionAmino;
}
export interface EventYAssetSwapRefractorActionSDKType {
  y_amount: string;
  c_amount_after_fee: string;
  fee_amount: string;
}
export interface EventYAssetSwap {
  poolId: bigint;
  summary: SwapSummary | undefined;
  refractorAction: EventYAssetSwapRefractorAction | undefined;
  fee?: Coin | undefined;
}
export interface EventYAssetSwapProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventYAssetSwap";
  value: Uint8Array;
}
export interface EventYAssetSwapAmino {
  pool_id?: string;
  summary?: SwapSummaryAmino | undefined;
  refractor_action?: EventYAssetSwapRefractorActionAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventYAssetSwapAminoMsg {
  type: "/pryzm.amm.v1.EventYAssetSwap";
  value: EventYAssetSwapAmino;
}
export interface EventYAssetSwapSDKType {
  pool_id: bigint;
  summary: SwapSummarySDKType | undefined;
  refractor_action: EventYAssetSwapRefractorActionSDKType | undefined;
  fee?: CoinSDKType | undefined;
}
export interface EventSetOraclePricePair {
  oraclePricePair: OraclePricePair | undefined;
}
export interface EventSetOraclePricePairProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetOraclePricePair";
  value: Uint8Array;
}
export interface EventSetOraclePricePairAmino {
  oracle_price_pair?: OraclePricePairAmino | undefined;
}
export interface EventSetOraclePricePairAminoMsg {
  type: "/pryzm.amm.v1.EventSetOraclePricePair";
  value: EventSetOraclePricePairAmino;
}
export interface EventSetOraclePricePairSDKType {
  oracle_price_pair: OraclePricePairSDKType | undefined;
}
export interface EventRemoveOraclePricePair {
  assetId: string;
}
export interface EventRemoveOraclePricePairProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemoveOraclePricePair";
  value: Uint8Array;
}
export interface EventRemoveOraclePricePairAmino {
  asset_id?: string;
}
export interface EventRemoveOraclePricePairAminoMsg {
  type: "/pryzm.amm.v1.EventRemoveOraclePricePair";
  value: EventRemoveOraclePricePairAmino;
}
export interface EventRemoveOraclePricePairSDKType {
  asset_id: string;
}
export interface EventSetPendingTokenIntroduction {
  pendingTokenIntroduction: PendingTokenIntroduction | undefined;
}
export interface EventSetPendingTokenIntroductionProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetPendingTokenIntroduction";
  value: Uint8Array;
}
export interface EventSetPendingTokenIntroductionAmino {
  pending_token_introduction?: PendingTokenIntroductionAmino | undefined;
}
export interface EventSetPendingTokenIntroductionAminoMsg {
  type: "/pryzm.amm.v1.EventSetPendingTokenIntroduction";
  value: EventSetPendingTokenIntroductionAmino;
}
export interface EventSetPendingTokenIntroductionSDKType {
  pending_token_introduction: PendingTokenIntroductionSDKType | undefined;
}
export interface EventRemovePendingTokenIntroduction {
  assetId: string;
  targetPoolId: bigint;
}
export interface EventRemovePendingTokenIntroductionProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemovePendingTokenIntroduction";
  value: Uint8Array;
}
export interface EventRemovePendingTokenIntroductionAmino {
  asset_id?: string;
  target_pool_id?: string;
}
export interface EventRemovePendingTokenIntroductionAminoMsg {
  type: "/pryzm.amm.v1.EventRemovePendingTokenIntroduction";
  value: EventRemovePendingTokenIntroductionAmino;
}
export interface EventRemovePendingTokenIntroductionSDKType {
  asset_id: string;
  target_pool_id: bigint;
}
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.amm.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
export interface EventSetPermanentVirtualBalancePoolToken {
  virtualBalanceToken: PermanentVirtualBalancePoolToken | undefined;
}
export interface EventSetPermanentVirtualBalancePoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventSetPermanentVirtualBalancePoolToken";
  value: Uint8Array;
}
export interface EventSetPermanentVirtualBalancePoolTokenAmino {
  virtual_balance_token?: PermanentVirtualBalancePoolTokenAmino | undefined;
}
export interface EventSetPermanentVirtualBalancePoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventSetPermanentVirtualBalancePoolToken";
  value: EventSetPermanentVirtualBalancePoolTokenAmino;
}
export interface EventSetPermanentVirtualBalancePoolTokenSDKType {
  virtual_balance_token: PermanentVirtualBalancePoolTokenSDKType | undefined;
}
export interface EventRemovePermanentVirtualBalancePoolToken {
  poolId: bigint;
  denom: string;
}
export interface EventRemovePermanentVirtualBalancePoolTokenProtoMsg {
  typeUrl: "/pryzm.amm.v1.EventRemovePermanentVirtualBalancePoolToken";
  value: Uint8Array;
}
export interface EventRemovePermanentVirtualBalancePoolTokenAmino {
  pool_id?: string;
  denom?: string;
}
export interface EventRemovePermanentVirtualBalancePoolTokenAminoMsg {
  type: "/pryzm.amm.v1.EventRemovePermanentVirtualBalancePoolToken";
  value: EventRemovePermanentVirtualBalancePoolTokenAmino;
}
export interface EventRemovePermanentVirtualBalancePoolTokenSDKType {
  pool_id: bigint;
  denom: string;
}
function createBaseEventSetPool(): EventSetPool {
  return {
    pool: Pool.fromPartial({})
  };
}
export const EventSetPool = {
  typeUrl: "/pryzm.amm.v1.EventSetPool",
  encode(message: EventSetPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Pool.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetPool>): EventSetPool {
    const message = createBaseEventSetPool();
    message.pool = object.pool !== undefined && object.pool !== null ? Pool.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: EventSetPoolAmino): EventSetPool {
    const message = createBaseEventSetPool();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Pool.fromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: EventSetPool, useInterfaces: boolean = false): EventSetPoolAmino {
    const obj: any = {};
    obj.pool = message.pool ? Pool.toAmino(message.pool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetPoolAminoMsg): EventSetPool {
    return EventSetPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetPoolProtoMsg, useInterfaces: boolean = false): EventSetPool {
    return EventSetPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetPool): Uint8Array {
    return EventSetPool.encode(message).finish();
  },
  toProtoMsg(message: EventSetPool): EventSetPoolProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetPool",
      value: EventSetPool.encode(message).finish()
    };
  }
};
function createBaseEventSetPoolCount(): EventSetPoolCount {
  return {
    poolCount: BigInt(0)
  };
}
export const EventSetPoolCount = {
  typeUrl: "/pryzm.amm.v1.EventSetPoolCount",
  encode(message: EventSetPoolCount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolCount !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetPoolCount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetPoolCount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetPoolCount>): EventSetPoolCount {
    const message = createBaseEventSetPoolCount();
    message.poolCount = object.poolCount !== undefined && object.poolCount !== null ? BigInt(object.poolCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventSetPoolCountAmino): EventSetPoolCount {
    const message = createBaseEventSetPoolCount();
    if (object.pool_count !== undefined && object.pool_count !== null) {
      message.poolCount = BigInt(object.pool_count);
    }
    return message;
  },
  toAmino(message: EventSetPoolCount, useInterfaces: boolean = false): EventSetPoolCountAmino {
    const obj: any = {};
    obj.pool_count = message.poolCount !== BigInt(0) ? message.poolCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetPoolCountAminoMsg): EventSetPoolCount {
    return EventSetPoolCount.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetPoolCountProtoMsg, useInterfaces: boolean = false): EventSetPoolCount {
    return EventSetPoolCount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetPoolCount): Uint8Array {
    return EventSetPoolCount.encode(message).finish();
  },
  toProtoMsg(message: EventSetPoolCount): EventSetPoolCountProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetPoolCount",
      value: EventSetPoolCount.encode(message).finish()
    };
  }
};
function createBaseEventSetOrderPairDisabled(): EventSetOrderPairDisabled {
  return {
    pair: DisabledOrderPair.fromPartial({}),
    disabled: false
  };
}
export const EventSetOrderPairDisabled = {
  typeUrl: "/pryzm.amm.v1.EventSetOrderPairDisabled",
  encode(message: EventSetOrderPairDisabled, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pair !== undefined) {
      DisabledOrderPair.encode(message.pair, writer.uint32(10).fork()).ldelim();
    }
    if (message.disabled === true) {
      writer.uint32(16).bool(message.disabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetOrderPairDisabled {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetOrderPairDisabled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = DisabledOrderPair.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.disabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetOrderPairDisabled>): EventSetOrderPairDisabled {
    const message = createBaseEventSetOrderPairDisabled();
    message.pair = object.pair !== undefined && object.pair !== null ? DisabledOrderPair.fromPartial(object.pair) : undefined;
    message.disabled = object.disabled ?? false;
    return message;
  },
  fromAmino(object: EventSetOrderPairDisabledAmino): EventSetOrderPairDisabled {
    const message = createBaseEventSetOrderPairDisabled();
    if (object.pair !== undefined && object.pair !== null) {
      message.pair = DisabledOrderPair.fromAmino(object.pair);
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    }
    return message;
  },
  toAmino(message: EventSetOrderPairDisabled, useInterfaces: boolean = false): EventSetOrderPairDisabledAmino {
    const obj: any = {};
    obj.pair = message.pair ? DisabledOrderPair.toAmino(message.pair, useInterfaces) : undefined;
    obj.disabled = message.disabled === false ? undefined : message.disabled;
    return obj;
  },
  fromAminoMsg(object: EventSetOrderPairDisabledAminoMsg): EventSetOrderPairDisabled {
    return EventSetOrderPairDisabled.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetOrderPairDisabledProtoMsg, useInterfaces: boolean = false): EventSetOrderPairDisabled {
    return EventSetOrderPairDisabled.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetOrderPairDisabled): Uint8Array {
    return EventSetOrderPairDisabled.encode(message).finish();
  },
  toProtoMsg(message: EventSetOrderPairDisabled): EventSetOrderPairDisabledProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetOrderPairDisabled",
      value: EventSetOrderPairDisabled.encode(message).finish()
    };
  }
};
function createBaseEventSetLpTokenSupply(): EventSetLpTokenSupply {
  return {
    poolId: BigInt(0),
    supply: ""
  };
}
export const EventSetLpTokenSupply = {
  typeUrl: "/pryzm.amm.v1.EventSetLpTokenSupply",
  encode(message: EventSetLpTokenSupply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.supply !== "") {
      writer.uint32(18).string(message.supply);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetLpTokenSupply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetLpTokenSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.supply = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetLpTokenSupply>): EventSetLpTokenSupply {
    const message = createBaseEventSetLpTokenSupply();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.supply = object.supply ?? "";
    return message;
  },
  fromAmino(object: EventSetLpTokenSupplyAmino): EventSetLpTokenSupply {
    const message = createBaseEventSetLpTokenSupply();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.supply !== undefined && object.supply !== null) {
      message.supply = object.supply;
    }
    return message;
  },
  toAmino(message: EventSetLpTokenSupply, useInterfaces: boolean = false): EventSetLpTokenSupplyAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.supply = message.supply === "" ? undefined : message.supply;
    return obj;
  },
  fromAminoMsg(object: EventSetLpTokenSupplyAminoMsg): EventSetLpTokenSupply {
    return EventSetLpTokenSupply.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetLpTokenSupplyProtoMsg, useInterfaces: boolean = false): EventSetLpTokenSupply {
    return EventSetLpTokenSupply.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetLpTokenSupply): Uint8Array {
    return EventSetLpTokenSupply.encode(message).finish();
  },
  toProtoMsg(message: EventSetLpTokenSupply): EventSetLpTokenSupplyProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetLpTokenSupply",
      value: EventSetLpTokenSupply.encode(message).finish()
    };
  }
};
function createBaseEventSetPoolToken(): EventSetPoolToken {
  return {
    poolToken: PoolToken.fromPartial({})
  };
}
export const EventSetPoolToken = {
  typeUrl: "/pryzm.amm.v1.EventSetPoolToken",
  encode(message: EventSetPoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolToken !== undefined) {
      PoolToken.encode(message.poolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetPoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetPoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolToken = PoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetPoolToken>): EventSetPoolToken {
    const message = createBaseEventSetPoolToken();
    message.poolToken = object.poolToken !== undefined && object.poolToken !== null ? PoolToken.fromPartial(object.poolToken) : undefined;
    return message;
  },
  fromAmino(object: EventSetPoolTokenAmino): EventSetPoolToken {
    const message = createBaseEventSetPoolToken();
    if (object.pool_token !== undefined && object.pool_token !== null) {
      message.poolToken = PoolToken.fromAmino(object.pool_token);
    }
    return message;
  },
  toAmino(message: EventSetPoolToken, useInterfaces: boolean = false): EventSetPoolTokenAmino {
    const obj: any = {};
    obj.pool_token = message.poolToken ? PoolToken.toAmino(message.poolToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetPoolTokenAminoMsg): EventSetPoolToken {
    return EventSetPoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetPoolTokenProtoMsg, useInterfaces: boolean = false): EventSetPoolToken {
    return EventSetPoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetPoolToken): Uint8Array {
    return EventSetPoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventSetPoolToken): EventSetPoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetPoolToken",
      value: EventSetPoolToken.encode(message).finish()
    };
  }
};
function createBaseEventRemovePoolToken(): EventRemovePoolToken {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const EventRemovePoolToken = {
  typeUrl: "/pryzm.amm.v1.EventRemovePoolToken",
  encode(message: EventRemovePoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemovePoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemovePoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemovePoolToken>): EventRemovePoolToken {
    const message = createBaseEventRemovePoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventRemovePoolTokenAmino): EventRemovePoolToken {
    const message = createBaseEventRemovePoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventRemovePoolToken, useInterfaces: boolean = false): EventRemovePoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: EventRemovePoolTokenAminoMsg): EventRemovePoolToken {
    return EventRemovePoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemovePoolTokenProtoMsg, useInterfaces: boolean = false): EventRemovePoolToken {
    return EventRemovePoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemovePoolToken): Uint8Array {
    return EventRemovePoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventRemovePoolToken): EventRemovePoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemovePoolToken",
      value: EventRemovePoolToken.encode(message).finish()
    };
  }
};
function createBaseEventSetWeightedToken(): EventSetWeightedToken {
  return {
    weightedToken: WeightedToken.fromPartial({})
  };
}
export const EventSetWeightedToken = {
  typeUrl: "/pryzm.amm.v1.EventSetWeightedToken",
  encode(message: EventSetWeightedToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weightedToken !== undefined) {
      WeightedToken.encode(message.weightedToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetWeightedToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetWeightedToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weightedToken = WeightedToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetWeightedToken>): EventSetWeightedToken {
    const message = createBaseEventSetWeightedToken();
    message.weightedToken = object.weightedToken !== undefined && object.weightedToken !== null ? WeightedToken.fromPartial(object.weightedToken) : undefined;
    return message;
  },
  fromAmino(object: EventSetWeightedTokenAmino): EventSetWeightedToken {
    const message = createBaseEventSetWeightedToken();
    if (object.weighted_token !== undefined && object.weighted_token !== null) {
      message.weightedToken = WeightedToken.fromAmino(object.weighted_token);
    }
    return message;
  },
  toAmino(message: EventSetWeightedToken, useInterfaces: boolean = false): EventSetWeightedTokenAmino {
    const obj: any = {};
    obj.weighted_token = message.weightedToken ? WeightedToken.toAmino(message.weightedToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetWeightedTokenAminoMsg): EventSetWeightedToken {
    return EventSetWeightedToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetWeightedTokenProtoMsg, useInterfaces: boolean = false): EventSetWeightedToken {
    return EventSetWeightedToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetWeightedToken): Uint8Array {
    return EventSetWeightedToken.encode(message).finish();
  },
  toProtoMsg(message: EventSetWeightedToken): EventSetWeightedTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetWeightedToken",
      value: EventSetWeightedToken.encode(message).finish()
    };
  }
};
function createBaseEventRemoveWeightedToken(): EventRemoveWeightedToken {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const EventRemoveWeightedToken = {
  typeUrl: "/pryzm.amm.v1.EventRemoveWeightedToken",
  encode(message: EventRemoveWeightedToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveWeightedToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveWeightedToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveWeightedToken>): EventRemoveWeightedToken {
    const message = createBaseEventRemoveWeightedToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventRemoveWeightedTokenAmino): EventRemoveWeightedToken {
    const message = createBaseEventRemoveWeightedToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventRemoveWeightedToken, useInterfaces: boolean = false): EventRemoveWeightedTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: EventRemoveWeightedTokenAminoMsg): EventRemoveWeightedToken {
    return EventRemoveWeightedToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveWeightedTokenProtoMsg, useInterfaces: boolean = false): EventRemoveWeightedToken {
    return EventRemoveWeightedToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveWeightedToken): Uint8Array {
    return EventRemoveWeightedToken.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveWeightedToken): EventRemoveWeightedTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveWeightedToken",
      value: EventRemoveWeightedToken.encode(message).finish()
    };
  }
};
function createBaseEventSetWeightUpdateTiming(): EventSetWeightUpdateTiming {
  return {
    weightUpdateTiming: WeightUpdateTiming.fromPartial({})
  };
}
export const EventSetWeightUpdateTiming = {
  typeUrl: "/pryzm.amm.v1.EventSetWeightUpdateTiming",
  encode(message: EventSetWeightUpdateTiming, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weightUpdateTiming !== undefined) {
      WeightUpdateTiming.encode(message.weightUpdateTiming, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetWeightUpdateTiming {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetWeightUpdateTiming();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weightUpdateTiming = WeightUpdateTiming.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetWeightUpdateTiming>): EventSetWeightUpdateTiming {
    const message = createBaseEventSetWeightUpdateTiming();
    message.weightUpdateTiming = object.weightUpdateTiming !== undefined && object.weightUpdateTiming !== null ? WeightUpdateTiming.fromPartial(object.weightUpdateTiming) : undefined;
    return message;
  },
  fromAmino(object: EventSetWeightUpdateTimingAmino): EventSetWeightUpdateTiming {
    const message = createBaseEventSetWeightUpdateTiming();
    if (object.weight_update_timing !== undefined && object.weight_update_timing !== null) {
      message.weightUpdateTiming = WeightUpdateTiming.fromAmino(object.weight_update_timing);
    }
    return message;
  },
  toAmino(message: EventSetWeightUpdateTiming, useInterfaces: boolean = false): EventSetWeightUpdateTimingAmino {
    const obj: any = {};
    obj.weight_update_timing = message.weightUpdateTiming ? WeightUpdateTiming.toAmino(message.weightUpdateTiming, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetWeightUpdateTimingAminoMsg): EventSetWeightUpdateTiming {
    return EventSetWeightUpdateTiming.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetWeightUpdateTimingProtoMsg, useInterfaces: boolean = false): EventSetWeightUpdateTiming {
    return EventSetWeightUpdateTiming.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetWeightUpdateTiming): Uint8Array {
    return EventSetWeightUpdateTiming.encode(message).finish();
  },
  toProtoMsg(message: EventSetWeightUpdateTiming): EventSetWeightUpdateTimingProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetWeightUpdateTiming",
      value: EventSetWeightUpdateTiming.encode(message).finish()
    };
  }
};
function createBaseEventSetWhitelistedRoute(): EventSetWhitelistedRoute {
  return {
    whitelistedRoute: WhitelistedRoute.fromPartial({})
  };
}
export const EventSetWhitelistedRoute = {
  typeUrl: "/pryzm.amm.v1.EventSetWhitelistedRoute",
  encode(message: EventSetWhitelistedRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.whitelistedRoute !== undefined) {
      WhitelistedRoute.encode(message.whitelistedRoute, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetWhitelistedRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetWhitelistedRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whitelistedRoute = WhitelistedRoute.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetWhitelistedRoute>): EventSetWhitelistedRoute {
    const message = createBaseEventSetWhitelistedRoute();
    message.whitelistedRoute = object.whitelistedRoute !== undefined && object.whitelistedRoute !== null ? WhitelistedRoute.fromPartial(object.whitelistedRoute) : undefined;
    return message;
  },
  fromAmino(object: EventSetWhitelistedRouteAmino): EventSetWhitelistedRoute {
    const message = createBaseEventSetWhitelistedRoute();
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = WhitelistedRoute.fromAmino(object.whitelisted_route);
    }
    return message;
  },
  toAmino(message: EventSetWhitelistedRoute, useInterfaces: boolean = false): EventSetWhitelistedRouteAmino {
    const obj: any = {};
    obj.whitelisted_route = message.whitelistedRoute ? WhitelistedRoute.toAmino(message.whitelistedRoute, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetWhitelistedRouteAminoMsg): EventSetWhitelistedRoute {
    return EventSetWhitelistedRoute.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetWhitelistedRouteProtoMsg, useInterfaces: boolean = false): EventSetWhitelistedRoute {
    return EventSetWhitelistedRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetWhitelistedRoute): Uint8Array {
    return EventSetWhitelistedRoute.encode(message).finish();
  },
  toProtoMsg(message: EventSetWhitelistedRoute): EventSetWhitelistedRouteProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetWhitelistedRoute",
      value: EventSetWhitelistedRoute.encode(message).finish()
    };
  }
};
function createBaseEventSetYammConfiguration(): EventSetYammConfiguration {
  return {
    yammConfiguration: YammConfiguration.fromPartial({})
  };
}
export const EventSetYammConfiguration = {
  typeUrl: "/pryzm.amm.v1.EventSetYammConfiguration",
  encode(message: EventSetYammConfiguration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.yammConfiguration !== undefined) {
      YammConfiguration.encode(message.yammConfiguration, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetYammConfiguration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetYammConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yammConfiguration = YammConfiguration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetYammConfiguration>): EventSetYammConfiguration {
    const message = createBaseEventSetYammConfiguration();
    message.yammConfiguration = object.yammConfiguration !== undefined && object.yammConfiguration !== null ? YammConfiguration.fromPartial(object.yammConfiguration) : undefined;
    return message;
  },
  fromAmino(object: EventSetYammConfigurationAmino): EventSetYammConfiguration {
    const message = createBaseEventSetYammConfiguration();
    if (object.yamm_configuration !== undefined && object.yamm_configuration !== null) {
      message.yammConfiguration = YammConfiguration.fromAmino(object.yamm_configuration);
    }
    return message;
  },
  toAmino(message: EventSetYammConfiguration, useInterfaces: boolean = false): EventSetYammConfigurationAmino {
    const obj: any = {};
    obj.yamm_configuration = message.yammConfiguration ? YammConfiguration.toAmino(message.yammConfiguration, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetYammConfigurationAminoMsg): EventSetYammConfiguration {
    return EventSetYammConfiguration.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetYammConfigurationProtoMsg, useInterfaces: boolean = false): EventSetYammConfiguration {
    return EventSetYammConfiguration.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetYammConfiguration): Uint8Array {
    return EventSetYammConfiguration.encode(message).finish();
  },
  toProtoMsg(message: EventSetYammConfiguration): EventSetYammConfigurationProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetYammConfiguration",
      value: EventSetYammConfiguration.encode(message).finish()
    };
  }
};
function createBaseEventSetOrder(): EventSetOrder {
  return {
    order: Order.fromPartial({})
  };
}
export const EventSetOrder = {
  typeUrl: "/pryzm.amm.v1.EventSetOrder",
  encode(message: EventSetOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.order !== undefined) {
      Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = Order.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetOrder>): EventSetOrder {
    const message = createBaseEventSetOrder();
    message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
    return message;
  },
  fromAmino(object: EventSetOrderAmino): EventSetOrder {
    const message = createBaseEventSetOrder();
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromAmino(object.order);
    }
    return message;
  },
  toAmino(message: EventSetOrder, useInterfaces: boolean = false): EventSetOrderAmino {
    const obj: any = {};
    obj.order = message.order ? Order.toAmino(message.order, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetOrderAminoMsg): EventSetOrder {
    return EventSetOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetOrderProtoMsg, useInterfaces: boolean = false): EventSetOrder {
    return EventSetOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetOrder): Uint8Array {
    return EventSetOrder.encode(message).finish();
  },
  toProtoMsg(message: EventSetOrder): EventSetOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetOrder",
      value: EventSetOrder.encode(message).finish()
    };
  }
};
function createBaseEventSetOrderCount(): EventSetOrderCount {
  return {
    orderCount: BigInt(0)
  };
}
export const EventSetOrderCount = {
  typeUrl: "/pryzm.amm.v1.EventSetOrderCount",
  encode(message: EventSetOrderCount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderCount !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetOrderCount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetOrderCount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetOrderCount>): EventSetOrderCount {
    const message = createBaseEventSetOrderCount();
    message.orderCount = object.orderCount !== undefined && object.orderCount !== null ? BigInt(object.orderCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventSetOrderCountAmino): EventSetOrderCount {
    const message = createBaseEventSetOrderCount();
    if (object.order_count !== undefined && object.order_count !== null) {
      message.orderCount = BigInt(object.order_count);
    }
    return message;
  },
  toAmino(message: EventSetOrderCount, useInterfaces: boolean = false): EventSetOrderCountAmino {
    const obj: any = {};
    obj.order_count = message.orderCount !== BigInt(0) ? message.orderCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetOrderCountAminoMsg): EventSetOrderCount {
    return EventSetOrderCount.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetOrderCountProtoMsg, useInterfaces: boolean = false): EventSetOrderCount {
    return EventSetOrderCount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetOrderCount): Uint8Array {
    return EventSetOrderCount.encode(message).finish();
  },
  toProtoMsg(message: EventSetOrderCount): EventSetOrderCountProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetOrderCount",
      value: EventSetOrderCount.encode(message).finish()
    };
  }
};
function createBaseEventRemoveOrder(): EventRemoveOrder {
  return {
    id: BigInt(0),
    reason: 0
  };
}
export const EventRemoveOrder = {
  typeUrl: "/pryzm.amm.v1.EventRemoveOrder",
  encode(message: EventRemoveOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.reason !== 0) {
      writer.uint32(16).int32(message.reason);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.reason = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveOrder>): EventRemoveOrder {
    const message = createBaseEventRemoveOrder();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.reason = object.reason ?? 0;
    return message;
  },
  fromAmino(object: EventRemoveOrderAmino): EventRemoveOrder {
    const message = createBaseEventRemoveOrder();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason;
    }
    return message;
  },
  toAmino(message: EventRemoveOrder, useInterfaces: boolean = false): EventRemoveOrderAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.reason = message.reason === 0 ? undefined : message.reason;
    return obj;
  },
  fromAminoMsg(object: EventRemoveOrderAminoMsg): EventRemoveOrder {
    return EventRemoveOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveOrderProtoMsg, useInterfaces: boolean = false): EventRemoveOrder {
    return EventRemoveOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveOrder): Uint8Array {
    return EventRemoveOrder.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveOrder): EventRemoveOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveOrder",
      value: EventRemoveOrder.encode(message).finish()
    };
  }
};
function createBaseEventCancelOrder(): EventCancelOrder {
  return {
    id: BigInt(0),
    withdrawnAmount: Coin.fromPartial({})
  };
}
export const EventCancelOrder = {
  typeUrl: "/pryzm.amm.v1.EventCancelOrder",
  encode(message: EventCancelOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.withdrawnAmount !== undefined) {
      Coin.encode(message.withdrawnAmount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventCancelOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCancelOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.withdrawnAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCancelOrder>): EventCancelOrder {
    const message = createBaseEventCancelOrder();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.withdrawnAmount = object.withdrawnAmount !== undefined && object.withdrawnAmount !== null ? Coin.fromPartial(object.withdrawnAmount) : undefined;
    return message;
  },
  fromAmino(object: EventCancelOrderAmino): EventCancelOrder {
    const message = createBaseEventCancelOrder();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.withdrawn_amount !== undefined && object.withdrawn_amount !== null) {
      message.withdrawnAmount = Coin.fromAmino(object.withdrawn_amount);
    }
    return message;
  },
  toAmino(message: EventCancelOrder, useInterfaces: boolean = false): EventCancelOrderAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.withdrawn_amount = message.withdrawnAmount ? Coin.toAmino(message.withdrawnAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventCancelOrderAminoMsg): EventCancelOrder {
    return EventCancelOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCancelOrderProtoMsg, useInterfaces: boolean = false): EventCancelOrder {
    return EventCancelOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventCancelOrder): Uint8Array {
    return EventCancelOrder.encode(message).finish();
  },
  toProtoMsg(message: EventCancelOrder): EventCancelOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventCancelOrder",
      value: EventCancelOrder.encode(message).finish()
    };
  }
};
function createBaseEventSetScheduleOrder(): EventSetScheduleOrder {
  return {
    scheduleOrder: ScheduleOrder.fromPartial({})
  };
}
export const EventSetScheduleOrder = {
  typeUrl: "/pryzm.amm.v1.EventSetScheduleOrder",
  encode(message: EventSetScheduleOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.scheduleOrder !== undefined) {
      ScheduleOrder.encode(message.scheduleOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetScheduleOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetScheduleOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scheduleOrder = ScheduleOrder.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetScheduleOrder>): EventSetScheduleOrder {
    const message = createBaseEventSetScheduleOrder();
    message.scheduleOrder = object.scheduleOrder !== undefined && object.scheduleOrder !== null ? ScheduleOrder.fromPartial(object.scheduleOrder) : undefined;
    return message;
  },
  fromAmino(object: EventSetScheduleOrderAmino): EventSetScheduleOrder {
    const message = createBaseEventSetScheduleOrder();
    if (object.schedule_order !== undefined && object.schedule_order !== null) {
      message.scheduleOrder = ScheduleOrder.fromAmino(object.schedule_order);
    }
    return message;
  },
  toAmino(message: EventSetScheduleOrder, useInterfaces: boolean = false): EventSetScheduleOrderAmino {
    const obj: any = {};
    obj.schedule_order = message.scheduleOrder ? ScheduleOrder.toAmino(message.scheduleOrder, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetScheduleOrderAminoMsg): EventSetScheduleOrder {
    return EventSetScheduleOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetScheduleOrderProtoMsg, useInterfaces: boolean = false): EventSetScheduleOrder {
    return EventSetScheduleOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetScheduleOrder): Uint8Array {
    return EventSetScheduleOrder.encode(message).finish();
  },
  toProtoMsg(message: EventSetScheduleOrder): EventSetScheduleOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetScheduleOrder",
      value: EventSetScheduleOrder.encode(message).finish()
    };
  }
};
function createBaseEventRemoveScheduleOrder(): EventRemoveScheduleOrder {
  return {
    orderId: BigInt(0),
    timeMillis: BigInt(0)
  };
}
export const EventRemoveScheduleOrder = {
  typeUrl: "/pryzm.amm.v1.EventRemoveScheduleOrder",
  encode(message: EventRemoveScheduleOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    if (message.timeMillis !== BigInt(0)) {
      writer.uint32(16).int64(message.timeMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveScheduleOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveScheduleOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        case 2:
          message.timeMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveScheduleOrder>): EventRemoveScheduleOrder {
    const message = createBaseEventRemoveScheduleOrder();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    message.timeMillis = object.timeMillis !== undefined && object.timeMillis !== null ? BigInt(object.timeMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRemoveScheduleOrderAmino): EventRemoveScheduleOrder {
    const message = createBaseEventRemoveScheduleOrder();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    if (object.time_millis !== undefined && object.time_millis !== null) {
      message.timeMillis = BigInt(object.time_millis);
    }
    return message;
  },
  toAmino(message: EventRemoveScheduleOrder, useInterfaces: boolean = false): EventRemoveScheduleOrderAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    obj.time_millis = message.timeMillis !== BigInt(0) ? message.timeMillis.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRemoveScheduleOrderAminoMsg): EventRemoveScheduleOrder {
    return EventRemoveScheduleOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveScheduleOrderProtoMsg, useInterfaces: boolean = false): EventRemoveScheduleOrder {
    return EventRemoveScheduleOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveScheduleOrder): Uint8Array {
    return EventRemoveScheduleOrder.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveScheduleOrder): EventRemoveScheduleOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveScheduleOrder",
      value: EventRemoveScheduleOrder.encode(message).finish()
    };
  }
};
function createBaseEventSetExecutableOrder(): EventSetExecutableOrder {
  return {
    orderId: BigInt(0)
  };
}
export const EventSetExecutableOrder = {
  typeUrl: "/pryzm.amm.v1.EventSetExecutableOrder",
  encode(message: EventSetExecutableOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetExecutableOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetExecutableOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetExecutableOrder>): EventSetExecutableOrder {
    const message = createBaseEventSetExecutableOrder();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventSetExecutableOrderAmino): EventSetExecutableOrder {
    const message = createBaseEventSetExecutableOrder();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    return message;
  },
  toAmino(message: EventSetExecutableOrder, useInterfaces: boolean = false): EventSetExecutableOrderAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetExecutableOrderAminoMsg): EventSetExecutableOrder {
    return EventSetExecutableOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetExecutableOrderProtoMsg, useInterfaces: boolean = false): EventSetExecutableOrder {
    return EventSetExecutableOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetExecutableOrder): Uint8Array {
    return EventSetExecutableOrder.encode(message).finish();
  },
  toProtoMsg(message: EventSetExecutableOrder): EventSetExecutableOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetExecutableOrder",
      value: EventSetExecutableOrder.encode(message).finish()
    };
  }
};
function createBaseEventRemoveExecutableOrder(): EventRemoveExecutableOrder {
  return {
    orderId: BigInt(0)
  };
}
export const EventRemoveExecutableOrder = {
  typeUrl: "/pryzm.amm.v1.EventRemoveExecutableOrder",
  encode(message: EventRemoveExecutableOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveExecutableOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveExecutableOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveExecutableOrder>): EventRemoveExecutableOrder {
    const message = createBaseEventRemoveExecutableOrder();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRemoveExecutableOrderAmino): EventRemoveExecutableOrder {
    const message = createBaseEventRemoveExecutableOrder();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    return message;
  },
  toAmino(message: EventRemoveExecutableOrder, useInterfaces: boolean = false): EventRemoveExecutableOrderAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRemoveExecutableOrderAminoMsg): EventRemoveExecutableOrder {
    return EventRemoveExecutableOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveExecutableOrderProtoMsg, useInterfaces: boolean = false): EventRemoveExecutableOrder {
    return EventRemoveExecutableOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveExecutableOrder): Uint8Array {
    return EventRemoveExecutableOrder.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveExecutableOrder): EventRemoveExecutableOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveExecutableOrder",
      value: EventRemoveExecutableOrder.encode(message).finish()
    };
  }
};
function createBaseEventSetIntroducingPoolToken(): EventSetIntroducingPoolToken {
  return {
    virtualBalanceToken: TemporalVirtualBalancePoolToken.fromPartial({})
  };
}
export const EventSetIntroducingPoolToken = {
  typeUrl: "/pryzm.amm.v1.EventSetIntroducingPoolToken",
  encode(message: EventSetIntroducingPoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.virtualBalanceToken !== undefined) {
      TemporalVirtualBalancePoolToken.encode(message.virtualBalanceToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetIntroducingPoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetIntroducingPoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.virtualBalanceToken = TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetIntroducingPoolToken>): EventSetIntroducingPoolToken {
    const message = createBaseEventSetIntroducingPoolToken();
    message.virtualBalanceToken = object.virtualBalanceToken !== undefined && object.virtualBalanceToken !== null ? TemporalVirtualBalancePoolToken.fromPartial(object.virtualBalanceToken) : undefined;
    return message;
  },
  fromAmino(object: EventSetIntroducingPoolTokenAmino): EventSetIntroducingPoolToken {
    const message = createBaseEventSetIntroducingPoolToken();
    if (object.virtual_balance_token !== undefined && object.virtual_balance_token !== null) {
      message.virtualBalanceToken = TemporalVirtualBalancePoolToken.fromAmino(object.virtual_balance_token);
    }
    return message;
  },
  toAmino(message: EventSetIntroducingPoolToken, useInterfaces: boolean = false): EventSetIntroducingPoolTokenAmino {
    const obj: any = {};
    obj.virtual_balance_token = message.virtualBalanceToken ? TemporalVirtualBalancePoolToken.toAmino(message.virtualBalanceToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetIntroducingPoolTokenAminoMsg): EventSetIntroducingPoolToken {
    return EventSetIntroducingPoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetIntroducingPoolTokenProtoMsg, useInterfaces: boolean = false): EventSetIntroducingPoolToken {
    return EventSetIntroducingPoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetIntroducingPoolToken): Uint8Array {
    return EventSetIntroducingPoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventSetIntroducingPoolToken): EventSetIntroducingPoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetIntroducingPoolToken",
      value: EventSetIntroducingPoolToken.encode(message).finish()
    };
  }
};
function createBaseEventRemoveIntroducingPoolToken(): EventRemoveIntroducingPoolToken {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const EventRemoveIntroducingPoolToken = {
  typeUrl: "/pryzm.amm.v1.EventRemoveIntroducingPoolToken",
  encode(message: EventRemoveIntroducingPoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveIntroducingPoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveIntroducingPoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveIntroducingPoolToken>): EventRemoveIntroducingPoolToken {
    const message = createBaseEventRemoveIntroducingPoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventRemoveIntroducingPoolTokenAmino): EventRemoveIntroducingPoolToken {
    const message = createBaseEventRemoveIntroducingPoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventRemoveIntroducingPoolToken, useInterfaces: boolean = false): EventRemoveIntroducingPoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: EventRemoveIntroducingPoolTokenAminoMsg): EventRemoveIntroducingPoolToken {
    return EventRemoveIntroducingPoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveIntroducingPoolTokenProtoMsg, useInterfaces: boolean = false): EventRemoveIntroducingPoolToken {
    return EventRemoveIntroducingPoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveIntroducingPoolToken): Uint8Array {
    return EventRemoveIntroducingPoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveIntroducingPoolToken): EventRemoveIntroducingPoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveIntroducingPoolToken",
      value: EventRemoveIntroducingPoolToken.encode(message).finish()
    };
  }
};
function createBaseEventSetExpiringPoolToken(): EventSetExpiringPoolToken {
  return {
    virtualBalanceToken: TemporalVirtualBalancePoolToken.fromPartial({})
  };
}
export const EventSetExpiringPoolToken = {
  typeUrl: "/pryzm.amm.v1.EventSetExpiringPoolToken",
  encode(message: EventSetExpiringPoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.virtualBalanceToken !== undefined) {
      TemporalVirtualBalancePoolToken.encode(message.virtualBalanceToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetExpiringPoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetExpiringPoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.virtualBalanceToken = TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetExpiringPoolToken>): EventSetExpiringPoolToken {
    const message = createBaseEventSetExpiringPoolToken();
    message.virtualBalanceToken = object.virtualBalanceToken !== undefined && object.virtualBalanceToken !== null ? TemporalVirtualBalancePoolToken.fromPartial(object.virtualBalanceToken) : undefined;
    return message;
  },
  fromAmino(object: EventSetExpiringPoolTokenAmino): EventSetExpiringPoolToken {
    const message = createBaseEventSetExpiringPoolToken();
    if (object.virtual_balance_token !== undefined && object.virtual_balance_token !== null) {
      message.virtualBalanceToken = TemporalVirtualBalancePoolToken.fromAmino(object.virtual_balance_token);
    }
    return message;
  },
  toAmino(message: EventSetExpiringPoolToken, useInterfaces: boolean = false): EventSetExpiringPoolTokenAmino {
    const obj: any = {};
    obj.virtual_balance_token = message.virtualBalanceToken ? TemporalVirtualBalancePoolToken.toAmino(message.virtualBalanceToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetExpiringPoolTokenAminoMsg): EventSetExpiringPoolToken {
    return EventSetExpiringPoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetExpiringPoolTokenProtoMsg, useInterfaces: boolean = false): EventSetExpiringPoolToken {
    return EventSetExpiringPoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetExpiringPoolToken): Uint8Array {
    return EventSetExpiringPoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventSetExpiringPoolToken): EventSetExpiringPoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetExpiringPoolToken",
      value: EventSetExpiringPoolToken.encode(message).finish()
    };
  }
};
function createBaseEventRemoveExpiringPoolToken(): EventRemoveExpiringPoolToken {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const EventRemoveExpiringPoolToken = {
  typeUrl: "/pryzm.amm.v1.EventRemoveExpiringPoolToken",
  encode(message: EventRemoveExpiringPoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveExpiringPoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveExpiringPoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveExpiringPoolToken>): EventRemoveExpiringPoolToken {
    const message = createBaseEventRemoveExpiringPoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventRemoveExpiringPoolTokenAmino): EventRemoveExpiringPoolToken {
    const message = createBaseEventRemoveExpiringPoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventRemoveExpiringPoolToken, useInterfaces: boolean = false): EventRemoveExpiringPoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: EventRemoveExpiringPoolTokenAminoMsg): EventRemoveExpiringPoolToken {
    return EventRemoveExpiringPoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveExpiringPoolTokenProtoMsg, useInterfaces: boolean = false): EventRemoveExpiringPoolToken {
    return EventRemoveExpiringPoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveExpiringPoolToken): Uint8Array {
    return EventRemoveExpiringPoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveExpiringPoolToken): EventRemoveExpiringPoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveExpiringPoolToken",
      value: EventRemoveExpiringPoolToken.encode(message).finish()
    };
  }
};
function createBaseEventSetYammPoolForAssetId(): EventSetYammPoolForAssetId {
  return {
    poolId: BigInt(0),
    assetId: ""
  };
}
export const EventSetYammPoolForAssetId = {
  typeUrl: "/pryzm.amm.v1.EventSetYammPoolForAssetId",
  encode(message: EventSetYammPoolForAssetId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetYammPoolForAssetId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetYammPoolForAssetId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetYammPoolForAssetId>): EventSetYammPoolForAssetId {
    const message = createBaseEventSetYammPoolForAssetId();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: EventSetYammPoolForAssetIdAmino): EventSetYammPoolForAssetId {
    const message = createBaseEventSetYammPoolForAssetId();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: EventSetYammPoolForAssetId, useInterfaces: boolean = false): EventSetYammPoolForAssetIdAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: EventSetYammPoolForAssetIdAminoMsg): EventSetYammPoolForAssetId {
    return EventSetYammPoolForAssetId.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetYammPoolForAssetIdProtoMsg, useInterfaces: boolean = false): EventSetYammPoolForAssetId {
    return EventSetYammPoolForAssetId.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetYammPoolForAssetId): Uint8Array {
    return EventSetYammPoolForAssetId.encode(message).finish();
  },
  toProtoMsg(message: EventSetYammPoolForAssetId): EventSetYammPoolForAssetIdProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetYammPoolForAssetId",
      value: EventSetYammPoolForAssetId.encode(message).finish()
    };
  }
};
function createBaseEventSetVaultPaused(): EventSetVaultPaused {
  return {
    paused: false
  };
}
export const EventSetVaultPaused = {
  typeUrl: "/pryzm.amm.v1.EventSetVaultPaused",
  encode(message: EventSetVaultPaused, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused === true) {
      writer.uint32(8).bool(message.paused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetVaultPaused {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetVaultPaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetVaultPaused>): EventSetVaultPaused {
    const message = createBaseEventSetVaultPaused();
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: EventSetVaultPausedAmino): EventSetVaultPaused {
    const message = createBaseEventSetVaultPaused();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    return message;
  },
  toAmino(message: EventSetVaultPaused, useInterfaces: boolean = false): EventSetVaultPausedAmino {
    const obj: any = {};
    obj.paused = message.paused === false ? undefined : message.paused;
    return obj;
  },
  fromAminoMsg(object: EventSetVaultPausedAminoMsg): EventSetVaultPaused {
    return EventSetVaultPaused.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetVaultPausedProtoMsg, useInterfaces: boolean = false): EventSetVaultPaused {
    return EventSetVaultPaused.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetVaultPaused): Uint8Array {
    return EventSetVaultPaused.encode(message).finish();
  },
  toProtoMsg(message: EventSetVaultPaused): EventSetVaultPausedProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetVaultPaused",
      value: EventSetVaultPaused.encode(message).finish()
    };
  }
};
function createBaseEventExecuteOrder(): EventExecuteOrder {
  return {
    orderId: BigInt(0),
    tradeAmount: "",
    matchAmount: "",
    outputAmount: ""
  };
}
export const EventExecuteOrder = {
  typeUrl: "/pryzm.amm.v1.EventExecuteOrder",
  encode(message: EventExecuteOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    if (message.tradeAmount !== "") {
      writer.uint32(18).string(message.tradeAmount);
    }
    if (message.matchAmount !== "") {
      writer.uint32(26).string(message.matchAmount);
    }
    if (message.outputAmount !== "") {
      writer.uint32(34).string(message.outputAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventExecuteOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExecuteOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        case 2:
          message.tradeAmount = reader.string();
          break;
        case 3:
          message.matchAmount = reader.string();
          break;
        case 4:
          message.outputAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventExecuteOrder>): EventExecuteOrder {
    const message = createBaseEventExecuteOrder();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    message.tradeAmount = object.tradeAmount ?? "";
    message.matchAmount = object.matchAmount ?? "";
    message.outputAmount = object.outputAmount ?? "";
    return message;
  },
  fromAmino(object: EventExecuteOrderAmino): EventExecuteOrder {
    const message = createBaseEventExecuteOrder();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    if (object.trade_amount !== undefined && object.trade_amount !== null) {
      message.tradeAmount = object.trade_amount;
    }
    if (object.match_amount !== undefined && object.match_amount !== null) {
      message.matchAmount = object.match_amount;
    }
    if (object.output_amount !== undefined && object.output_amount !== null) {
      message.outputAmount = object.output_amount;
    }
    return message;
  },
  toAmino(message: EventExecuteOrder, useInterfaces: boolean = false): EventExecuteOrderAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    obj.trade_amount = message.tradeAmount === "" ? undefined : message.tradeAmount;
    obj.match_amount = message.matchAmount === "" ? undefined : message.matchAmount;
    obj.output_amount = message.outputAmount === "" ? undefined : message.outputAmount;
    return obj;
  },
  fromAminoMsg(object: EventExecuteOrderAminoMsg): EventExecuteOrder {
    return EventExecuteOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventExecuteOrderProtoMsg, useInterfaces: boolean = false): EventExecuteOrder {
    return EventExecuteOrder.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventExecuteOrder): Uint8Array {
    return EventExecuteOrder.encode(message).finish();
  },
  toProtoMsg(message: EventExecuteOrder): EventExecuteOrderProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventExecuteOrder",
      value: EventExecuteOrder.encode(message).finish()
    };
  }
};
function createBaseEventExecuteOrdersForPair(): EventExecuteOrdersForPair {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    whitelistedRoute: false,
    buyPrice: "",
    sellPrice: "",
    buyOrders: [],
    sellOrders: [],
    buyTradeAmount: "",
    buyMatchAmount: "",
    sellTradeAmount: "",
    sellMatchAmount: "",
    sellTradeOutput: "",
    buyTradeOutput: ""
  };
}
export const EventExecuteOrdersForPair = {
  typeUrl: "/pryzm.amm.v1.EventExecuteOrdersForPair",
  encode(message: EventExecuteOrdersForPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
      EventExecuteOrder.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.sellOrders) {
      EventExecuteOrder.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.buyTradeAmount !== "") {
      writer.uint32(74).string(message.buyTradeAmount);
    }
    if (message.buyMatchAmount !== "") {
      writer.uint32(82).string(message.buyMatchAmount);
    }
    if (message.sellTradeAmount !== "") {
      writer.uint32(90).string(message.sellTradeAmount);
    }
    if (message.sellMatchAmount !== "") {
      writer.uint32(98).string(message.sellMatchAmount);
    }
    if (message.sellTradeOutput !== "") {
      writer.uint32(106).string(message.sellTradeOutput);
    }
    if (message.buyTradeOutput !== "") {
      writer.uint32(114).string(message.buyTradeOutput);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventExecuteOrdersForPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExecuteOrdersForPair();
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
          message.buyOrders.push(EventExecuteOrder.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.sellOrders.push(EventExecuteOrder.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.buyTradeAmount = reader.string();
          break;
        case 10:
          message.buyMatchAmount = reader.string();
          break;
        case 11:
          message.sellTradeAmount = reader.string();
          break;
        case 12:
          message.sellMatchAmount = reader.string();
          break;
        case 13:
          message.sellTradeOutput = reader.string();
          break;
        case 14:
          message.buyTradeOutput = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventExecuteOrdersForPair>): EventExecuteOrdersForPair {
    const message = createBaseEventExecuteOrdersForPair();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.buyPrice = object.buyPrice ?? "";
    message.sellPrice = object.sellPrice ?? "";
    message.buyOrders = object.buyOrders?.map(e => EventExecuteOrder.fromPartial(e)) || [];
    message.sellOrders = object.sellOrders?.map(e => EventExecuteOrder.fromPartial(e)) || [];
    message.buyTradeAmount = object.buyTradeAmount ?? "";
    message.buyMatchAmount = object.buyMatchAmount ?? "";
    message.sellTradeAmount = object.sellTradeAmount ?? "";
    message.sellMatchAmount = object.sellMatchAmount ?? "";
    message.sellTradeOutput = object.sellTradeOutput ?? "";
    message.buyTradeOutput = object.buyTradeOutput ?? "";
    return message;
  },
  fromAmino(object: EventExecuteOrdersForPairAmino): EventExecuteOrdersForPair {
    const message = createBaseEventExecuteOrdersForPair();
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
    message.buyOrders = object.buy_orders?.map(e => EventExecuteOrder.fromAmino(e)) || [];
    message.sellOrders = object.sell_orders?.map(e => EventExecuteOrder.fromAmino(e)) || [];
    if (object.buy_trade_amount !== undefined && object.buy_trade_amount !== null) {
      message.buyTradeAmount = object.buy_trade_amount;
    }
    if (object.buy_match_amount !== undefined && object.buy_match_amount !== null) {
      message.buyMatchAmount = object.buy_match_amount;
    }
    if (object.sell_trade_amount !== undefined && object.sell_trade_amount !== null) {
      message.sellTradeAmount = object.sell_trade_amount;
    }
    if (object.sell_match_amount !== undefined && object.sell_match_amount !== null) {
      message.sellMatchAmount = object.sell_match_amount;
    }
    if (object.sell_trade_output !== undefined && object.sell_trade_output !== null) {
      message.sellTradeOutput = object.sell_trade_output;
    }
    if (object.buy_trade_output !== undefined && object.buy_trade_output !== null) {
      message.buyTradeOutput = object.buy_trade_output;
    }
    return message;
  },
  toAmino(message: EventExecuteOrdersForPair, useInterfaces: boolean = false): EventExecuteOrdersForPairAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.buy_price = message.buyPrice === "" ? undefined : message.buyPrice;
    obj.sell_price = message.sellPrice === "" ? undefined : message.sellPrice;
    if (message.buyOrders) {
      obj.buy_orders = message.buyOrders.map(e => e ? EventExecuteOrder.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.buy_orders = message.buyOrders;
    }
    if (message.sellOrders) {
      obj.sell_orders = message.sellOrders.map(e => e ? EventExecuteOrder.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sell_orders = message.sellOrders;
    }
    obj.buy_trade_amount = message.buyTradeAmount === "" ? undefined : message.buyTradeAmount;
    obj.buy_match_amount = message.buyMatchAmount === "" ? undefined : message.buyMatchAmount;
    obj.sell_trade_amount = message.sellTradeAmount === "" ? undefined : message.sellTradeAmount;
    obj.sell_match_amount = message.sellMatchAmount === "" ? undefined : message.sellMatchAmount;
    obj.sell_trade_output = message.sellTradeOutput === "" ? undefined : message.sellTradeOutput;
    obj.buy_trade_output = message.buyTradeOutput === "" ? undefined : message.buyTradeOutput;
    return obj;
  },
  fromAminoMsg(object: EventExecuteOrdersForPairAminoMsg): EventExecuteOrdersForPair {
    return EventExecuteOrdersForPair.fromAmino(object.value);
  },
  fromProtoMsg(message: EventExecuteOrdersForPairProtoMsg, useInterfaces: boolean = false): EventExecuteOrdersForPair {
    return EventExecuteOrdersForPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventExecuteOrdersForPair): Uint8Array {
    return EventExecuteOrdersForPair.encode(message).finish();
  },
  toProtoMsg(message: EventExecuteOrdersForPair): EventExecuteOrdersForPairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventExecuteOrdersForPair",
      value: EventExecuteOrdersForPair.encode(message).finish()
    };
  }
};
function createBaseEventExecuteMatchProposal(): EventExecuteMatchProposal {
  return {
    proposer: "",
    pairs: [],
    proposerReward: []
  };
}
export const EventExecuteMatchProposal = {
  typeUrl: "/pryzm.amm.v1.EventExecuteMatchProposal",
  encode(message: EventExecuteMatchProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposer !== "") {
      writer.uint32(10).string(message.proposer);
    }
    for (const v of message.pairs) {
      MatchedPairSummary.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.proposerReward) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventExecuteMatchProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExecuteMatchProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposer = reader.string();
          break;
        case 2:
          message.pairs.push(MatchedPairSummary.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.proposerReward.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventExecuteMatchProposal>): EventExecuteMatchProposal {
    const message = createBaseEventExecuteMatchProposal();
    message.proposer = object.proposer ?? "";
    message.pairs = object.pairs?.map(e => MatchedPairSummary.fromPartial(e)) || [];
    message.proposerReward = object.proposerReward?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EventExecuteMatchProposalAmino): EventExecuteMatchProposal {
    const message = createBaseEventExecuteMatchProposal();
    if (object.proposer !== undefined && object.proposer !== null) {
      message.proposer = object.proposer;
    }
    message.pairs = object.pairs?.map(e => MatchedPairSummary.fromAmino(e)) || [];
    message.proposerReward = object.proposer_reward?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EventExecuteMatchProposal, useInterfaces: boolean = false): EventExecuteMatchProposalAmino {
    const obj: any = {};
    obj.proposer = message.proposer === "" ? undefined : message.proposer;
    if (message.pairs) {
      obj.pairs = message.pairs.map(e => e ? MatchedPairSummary.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pairs = message.pairs;
    }
    if (message.proposerReward) {
      obj.proposer_reward = message.proposerReward.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proposer_reward = message.proposerReward;
    }
    return obj;
  },
  fromAminoMsg(object: EventExecuteMatchProposalAminoMsg): EventExecuteMatchProposal {
    return EventExecuteMatchProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: EventExecuteMatchProposalProtoMsg, useInterfaces: boolean = false): EventExecuteMatchProposal {
    return EventExecuteMatchProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventExecuteMatchProposal): Uint8Array {
    return EventExecuteMatchProposal.encode(message).finish();
  },
  toProtoMsg(message: EventExecuteMatchProposal): EventExecuteMatchProposalProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventExecuteMatchProposal",
      value: EventExecuteMatchProposal.encode(message).finish()
    };
  }
};
function createBaseEventExitPool(): EventExitPool {
  return {
    poolId: BigInt(0),
    summary: ExitSummary.fromPartial({})
  };
}
export const EventExitPool = {
  typeUrl: "/pryzm.amm.v1.EventExitPool",
  encode(message: EventExitPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.summary !== undefined) {
      ExitSummary.encode(message.summary, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventExitPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExitPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.summary = ExitSummary.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventExitPool>): EventExitPool {
    const message = createBaseEventExitPool();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.summary = object.summary !== undefined && object.summary !== null ? ExitSummary.fromPartial(object.summary) : undefined;
    return message;
  },
  fromAmino(object: EventExitPoolAmino): EventExitPool {
    const message = createBaseEventExitPool();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = ExitSummary.fromAmino(object.summary);
    }
    return message;
  },
  toAmino(message: EventExitPool, useInterfaces: boolean = false): EventExitPoolAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.summary = message.summary ? ExitSummary.toAmino(message.summary, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventExitPoolAminoMsg): EventExitPool {
    return EventExitPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EventExitPoolProtoMsg, useInterfaces: boolean = false): EventExitPool {
    return EventExitPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventExitPool): Uint8Array {
    return EventExitPool.encode(message).finish();
  },
  toProtoMsg(message: EventExitPool): EventExitPoolProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventExitPool",
      value: EventExitPool.encode(message).finish()
    };
  }
};
function createBaseEventJoinPool(): EventJoinPool {
  return {
    poolId: BigInt(0),
    summary: JoinSummary.fromPartial({})
  };
}
export const EventJoinPool = {
  typeUrl: "/pryzm.amm.v1.EventJoinPool",
  encode(message: EventJoinPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.summary !== undefined) {
      JoinSummary.encode(message.summary, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventJoinPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventJoinPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.summary = JoinSummary.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventJoinPool>): EventJoinPool {
    const message = createBaseEventJoinPool();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.summary = object.summary !== undefined && object.summary !== null ? JoinSummary.fromPartial(object.summary) : undefined;
    return message;
  },
  fromAmino(object: EventJoinPoolAmino): EventJoinPool {
    const message = createBaseEventJoinPool();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = JoinSummary.fromAmino(object.summary);
    }
    return message;
  },
  toAmino(message: EventJoinPool, useInterfaces: boolean = false): EventJoinPoolAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.summary = message.summary ? JoinSummary.toAmino(message.summary, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventJoinPoolAminoMsg): EventJoinPool {
    return EventJoinPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EventJoinPoolProtoMsg, useInterfaces: boolean = false): EventJoinPool {
    return EventJoinPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventJoinPool): Uint8Array {
    return EventJoinPool.encode(message).finish();
  },
  toProtoMsg(message: EventJoinPool): EventJoinPoolProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventJoinPool",
      value: EventJoinPool.encode(message).finish()
    };
  }
};
function createBaseEventSwap(): EventSwap {
  return {
    poolId: BigInt(0),
    summary: SwapSummary.fromPartial({})
  };
}
export const EventSwap = {
  typeUrl: "/pryzm.amm.v1.EventSwap",
  encode(message: EventSwap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.summary !== undefined) {
      SwapSummary.encode(message.summary, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSwap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.summary = SwapSummary.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSwap>): EventSwap {
    const message = createBaseEventSwap();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.summary = object.summary !== undefined && object.summary !== null ? SwapSummary.fromPartial(object.summary) : undefined;
    return message;
  },
  fromAmino(object: EventSwapAmino): EventSwap {
    const message = createBaseEventSwap();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = SwapSummary.fromAmino(object.summary);
    }
    return message;
  },
  toAmino(message: EventSwap, useInterfaces: boolean = false): EventSwapAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.summary = message.summary ? SwapSummary.toAmino(message.summary, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSwapAminoMsg): EventSwap {
    return EventSwap.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSwapProtoMsg, useInterfaces: boolean = false): EventSwap {
    return EventSwap.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSwap): Uint8Array {
    return EventSwap.encode(message).finish();
  },
  toProtoMsg(message: EventSwap): EventSwapProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSwap",
      value: EventSwap.encode(message).finish()
    };
  }
};
function createBaseEventExitPoolRequest(): EventExitPoolRequest {
  return {
    creator: "",
    poolId: BigInt(0),
    lptIn: Coin.fromPartial({}),
    amountsOut: [],
    protocolFee: Coin.fromPartial({}),
    swapFee: [],
    exitType: 0
  };
}
export const EventExitPoolRequest = {
  typeUrl: "/pryzm.amm.v1.EventExitPoolRequest",
  encode(message: EventExitPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.lptIn !== undefined) {
      Coin.encode(message.lptIn, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.exitType !== 0) {
      writer.uint32(56).int32(message.exitType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventExitPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExitPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.lptIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.exitType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventExitPoolRequest>): EventExitPoolRequest {
    const message = createBaseEventExitPoolRequest();
    message.creator = object.creator ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptIn = object.lptIn !== undefined && object.lptIn !== null ? Coin.fromPartial(object.lptIn) : undefined;
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    message.exitType = object.exitType ?? 0;
    return message;
  },
  fromAmino(object: EventExitPoolRequestAmino): EventExitPoolRequest {
    const message = createBaseEventExitPoolRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = Coin.fromAmino(object.lpt_in);
    }
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = Coin.fromAmino(object.protocol_fee);
    }
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    if (object.exit_type !== undefined && object.exit_type !== null) {
      message.exitType = object.exit_type;
    }
    return message;
  },
  toAmino(message: EventExitPoolRequest, useInterfaces: boolean = false): EventExitPoolRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_in = message.lptIn ? Coin.toAmino(message.lptIn, useInterfaces) : undefined;
    if (message.amountsOut) {
      obj.amounts_out = message.amountsOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_out = message.amountsOut;
    }
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    if (message.swapFee) {
      obj.swap_fee = message.swapFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.swap_fee = message.swapFee;
    }
    obj.exit_type = message.exitType === 0 ? undefined : message.exitType;
    return obj;
  },
  fromAminoMsg(object: EventExitPoolRequestAminoMsg): EventExitPoolRequest {
    return EventExitPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventExitPoolRequestProtoMsg, useInterfaces: boolean = false): EventExitPoolRequest {
    return EventExitPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventExitPoolRequest): Uint8Array {
    return EventExitPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: EventExitPoolRequest): EventExitPoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventExitPoolRequest",
      value: EventExitPoolRequest.encode(message).finish()
    };
  }
};
function createBaseEventJoinPoolRequest(): EventJoinPoolRequest {
  return {
    creator: "",
    poolId: BigInt(0),
    lptOut: Coin.fromPartial({}),
    amountsIn: [],
    protocolFee: [],
    swapFee: [],
    joinType: 0
  };
}
export const EventJoinPoolRequest = {
  typeUrl: "/pryzm.amm.v1.EventJoinPoolRequest",
  encode(message: EventJoinPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.protocolFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.joinType !== 0) {
      writer.uint32(56).int32(message.joinType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventJoinPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventJoinPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.protocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.joinType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventJoinPoolRequest>): EventJoinPoolRequest {
    const message = createBaseEventJoinPoolRequest();
    message.creator = object.creator ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    message.joinType = object.joinType ?? 0;
    return message;
  },
  fromAmino(object: EventJoinPoolRequestAmino): EventJoinPoolRequest {
    const message = createBaseEventJoinPoolRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.protocolFee = object.protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    if (object.join_type !== undefined && object.join_type !== null) {
      message.joinType = object.join_type;
    }
    return message;
  },
  toAmino(message: EventJoinPoolRequest, useInterfaces: boolean = false): EventJoinPoolRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_out = message.lptOut ? Coin.toAmino(message.lptOut, useInterfaces) : undefined;
    if (message.amountsIn) {
      obj.amounts_in = message.amountsIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_in = message.amountsIn;
    }
    if (message.protocolFee) {
      obj.protocol_fee = message.protocolFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.protocol_fee = message.protocolFee;
    }
    if (message.swapFee) {
      obj.swap_fee = message.swapFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.swap_fee = message.swapFee;
    }
    obj.join_type = message.joinType === 0 ? undefined : message.joinType;
    return obj;
  },
  fromAminoMsg(object: EventJoinPoolRequestAminoMsg): EventJoinPoolRequest {
    return EventJoinPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventJoinPoolRequestProtoMsg, useInterfaces: boolean = false): EventJoinPoolRequest {
    return EventJoinPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventJoinPoolRequest): Uint8Array {
    return EventJoinPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: EventJoinPoolRequest): EventJoinPoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventJoinPoolRequest",
      value: EventJoinPoolRequest.encode(message).finish()
    };
  }
};
function createBaseEventSingleSwapRequest(): EventSingleSwapRequest {
  return {
    creator: "",
    poolId: BigInt(0),
    amountOut: Coin.fromPartial({}),
    amountIn: Coin.fromPartial({}),
    protocolFee: Coin.fromPartial({}),
    swapFee: Coin.fromPartial({}),
    swapType: 0
  };
}
export const EventSingleSwapRequest = {
  typeUrl: "/pryzm.amm.v1.EventSingleSwapRequest",
  encode(message: EventSingleSwapRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.amountOut !== undefined) {
      Coin.encode(message.amountOut, writer.uint32(26).fork()).ldelim();
    }
    if (message.amountIn !== undefined) {
      Coin.encode(message.amountIn, writer.uint32(34).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(42).fork()).ldelim();
    }
    if (message.swapFee !== undefined) {
      Coin.encode(message.swapFee, writer.uint32(50).fork()).ldelim();
    }
    if (message.swapType !== 0) {
      writer.uint32(56).int32(message.swapType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSingleSwapRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSingleSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.amountOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.amountIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.swapFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.swapType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSingleSwapRequest>): EventSingleSwapRequest {
    const message = createBaseEventSingleSwapRequest();
    message.creator = object.creator ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.amountOut = object.amountOut !== undefined && object.amountOut !== null ? Coin.fromPartial(object.amountOut) : undefined;
    message.amountIn = object.amountIn !== undefined && object.amountIn !== null ? Coin.fromPartial(object.amountIn) : undefined;
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee !== undefined && object.swapFee !== null ? Coin.fromPartial(object.swapFee) : undefined;
    message.swapType = object.swapType ?? 0;
    return message;
  },
  fromAmino(object: EventSingleSwapRequestAmino): EventSingleSwapRequest {
    const message = createBaseEventSingleSwapRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.amount_out !== undefined && object.amount_out !== null) {
      message.amountOut = Coin.fromAmino(object.amount_out);
    }
    if (object.amount_in !== undefined && object.amount_in !== null) {
      message.amountIn = Coin.fromAmino(object.amount_in);
    }
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = Coin.fromAmino(object.protocol_fee);
    }
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = Coin.fromAmino(object.swap_fee);
    }
    if (object.swap_type !== undefined && object.swap_type !== null) {
      message.swapType = object.swap_type;
    }
    return message;
  },
  toAmino(message: EventSingleSwapRequest, useInterfaces: boolean = false): EventSingleSwapRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.amount_out = message.amountOut ? Coin.toAmino(message.amountOut, useInterfaces) : undefined;
    obj.amount_in = message.amountIn ? Coin.toAmino(message.amountIn, useInterfaces) : undefined;
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    obj.swap_fee = message.swapFee ? Coin.toAmino(message.swapFee, useInterfaces) : undefined;
    obj.swap_type = message.swapType === 0 ? undefined : message.swapType;
    return obj;
  },
  fromAminoMsg(object: EventSingleSwapRequestAminoMsg): EventSingleSwapRequest {
    return EventSingleSwapRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSingleSwapRequestProtoMsg, useInterfaces: boolean = false): EventSingleSwapRequest {
    return EventSingleSwapRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSingleSwapRequest): Uint8Array {
    return EventSingleSwapRequest.encode(message).finish();
  },
  toProtoMsg(message: EventSingleSwapRequest): EventSingleSwapRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSingleSwapRequest",
      value: EventSingleSwapRequest.encode(message).finish()
    };
  }
};
function createBaseEventBatchSwapRequest(): EventBatchSwapRequest {
  return {
    creator: "",
    steps: [],
    amountsIn: [],
    amountsOut: [],
    swapProtocolFee: [],
    joinExitProtocolFee: [],
    swapFee: [],
    swapType: 0
  };
}
export const EventBatchSwapRequest = {
  typeUrl: "/pryzm.amm.v1.EventBatchSwapRequest",
  encode(message: EventBatchSwapRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.steps) {
      SwapStep.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.swapProtocolFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.joinExitProtocolFee) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.swapType !== 0) {
      writer.uint32(64).int32(message.swapType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventBatchSwapRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBatchSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.steps.push(SwapStep.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.swapProtocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.joinExitProtocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.swapType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventBatchSwapRequest>): EventBatchSwapRequest {
    const message = createBaseEventBatchSwapRequest();
    message.creator = object.creator ?? "";
    message.steps = object.steps?.map(e => SwapStep.fromPartial(e)) || [];
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.swapProtocolFee = object.swapProtocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.joinExitProtocolFee = object.joinExitProtocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapType = object.swapType ?? 0;
    return message;
  },
  fromAmino(object: EventBatchSwapRequestAmino): EventBatchSwapRequest {
    const message = createBaseEventBatchSwapRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    message.steps = object.steps?.map(e => SwapStep.fromAmino(e)) || [];
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    message.swapProtocolFee = object.swap_protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.joinExitProtocolFee = object.join_exit_protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    if (object.swap_type !== undefined && object.swap_type !== null) {
      message.swapType = object.swap_type;
    }
    return message;
  },
  toAmino(message: EventBatchSwapRequest, useInterfaces: boolean = false): EventBatchSwapRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    if (message.steps) {
      obj.steps = message.steps.map(e => e ? SwapStep.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.steps = message.steps;
    }
    if (message.amountsIn) {
      obj.amounts_in = message.amountsIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_in = message.amountsIn;
    }
    if (message.amountsOut) {
      obj.amounts_out = message.amountsOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_out = message.amountsOut;
    }
    if (message.swapProtocolFee) {
      obj.swap_protocol_fee = message.swapProtocolFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.swap_protocol_fee = message.swapProtocolFee;
    }
    if (message.joinExitProtocolFee) {
      obj.join_exit_protocol_fee = message.joinExitProtocolFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.join_exit_protocol_fee = message.joinExitProtocolFee;
    }
    if (message.swapFee) {
      obj.swap_fee = message.swapFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.swap_fee = message.swapFee;
    }
    obj.swap_type = message.swapType === 0 ? undefined : message.swapType;
    return obj;
  },
  fromAminoMsg(object: EventBatchSwapRequestAminoMsg): EventBatchSwapRequest {
    return EventBatchSwapRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventBatchSwapRequestProtoMsg, useInterfaces: boolean = false): EventBatchSwapRequest {
    return EventBatchSwapRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventBatchSwapRequest): Uint8Array {
    return EventBatchSwapRequest.encode(message).finish();
  },
  toProtoMsg(message: EventBatchSwapRequest): EventBatchSwapRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventBatchSwapRequest",
      value: EventBatchSwapRequest.encode(message).finish()
    };
  }
};
function createBaseEventYAssetSwapRefractorAction(): EventYAssetSwapRefractorAction {
  return {
    yAmount: "",
    cAmountAfterFee: "",
    feeAmount: ""
  };
}
export const EventYAssetSwapRefractorAction = {
  typeUrl: "/pryzm.amm.v1.EventYAssetSwapRefractorAction",
  encode(message: EventYAssetSwapRefractorAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.yAmount !== "") {
      writer.uint32(10).string(message.yAmount);
    }
    if (message.cAmountAfterFee !== "") {
      writer.uint32(18).string(message.cAmountAfterFee);
    }
    if (message.feeAmount !== "") {
      writer.uint32(26).string(message.feeAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYAssetSwapRefractorAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYAssetSwapRefractorAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yAmount = reader.string();
          break;
        case 2:
          message.cAmountAfterFee = reader.string();
          break;
        case 3:
          message.feeAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventYAssetSwapRefractorAction>): EventYAssetSwapRefractorAction {
    const message = createBaseEventYAssetSwapRefractorAction();
    message.yAmount = object.yAmount ?? "";
    message.cAmountAfterFee = object.cAmountAfterFee ?? "";
    message.feeAmount = object.feeAmount ?? "";
    return message;
  },
  fromAmino(object: EventYAssetSwapRefractorActionAmino): EventYAssetSwapRefractorAction {
    const message = createBaseEventYAssetSwapRefractorAction();
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = object.y_amount;
    }
    if (object.c_amount_after_fee !== undefined && object.c_amount_after_fee !== null) {
      message.cAmountAfterFee = object.c_amount_after_fee;
    }
    if (object.fee_amount !== undefined && object.fee_amount !== null) {
      message.feeAmount = object.fee_amount;
    }
    return message;
  },
  toAmino(message: EventYAssetSwapRefractorAction, useInterfaces: boolean = false): EventYAssetSwapRefractorActionAmino {
    const obj: any = {};
    obj.y_amount = message.yAmount === "" ? undefined : message.yAmount;
    obj.c_amount_after_fee = message.cAmountAfterFee === "" ? undefined : message.cAmountAfterFee;
    obj.fee_amount = message.feeAmount === "" ? undefined : message.feeAmount;
    return obj;
  },
  fromAminoMsg(object: EventYAssetSwapRefractorActionAminoMsg): EventYAssetSwapRefractorAction {
    return EventYAssetSwapRefractorAction.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYAssetSwapRefractorActionProtoMsg, useInterfaces: boolean = false): EventYAssetSwapRefractorAction {
    return EventYAssetSwapRefractorAction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYAssetSwapRefractorAction): Uint8Array {
    return EventYAssetSwapRefractorAction.encode(message).finish();
  },
  toProtoMsg(message: EventYAssetSwapRefractorAction): EventYAssetSwapRefractorActionProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventYAssetSwapRefractorAction",
      value: EventYAssetSwapRefractorAction.encode(message).finish()
    };
  }
};
function createBaseEventYAssetSwap(): EventYAssetSwap {
  return {
    poolId: BigInt(0),
    summary: SwapSummary.fromPartial({}),
    refractorAction: EventYAssetSwapRefractorAction.fromPartial({}),
    fee: undefined
  };
}
export const EventYAssetSwap = {
  typeUrl: "/pryzm.amm.v1.EventYAssetSwap",
  encode(message: EventYAssetSwap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.summary !== undefined) {
      SwapSummary.encode(message.summary, writer.uint32(18).fork()).ldelim();
    }
    if (message.refractorAction !== undefined) {
      EventYAssetSwapRefractorAction.encode(message.refractorAction, writer.uint32(26).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYAssetSwap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYAssetSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.summary = SwapSummary.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.refractorAction = EventYAssetSwapRefractorAction.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventYAssetSwap>): EventYAssetSwap {
    const message = createBaseEventYAssetSwap();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.summary = object.summary !== undefined && object.summary !== null ? SwapSummary.fromPartial(object.summary) : undefined;
    message.refractorAction = object.refractorAction !== undefined && object.refractorAction !== null ? EventYAssetSwapRefractorAction.fromPartial(object.refractorAction) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventYAssetSwapAmino): EventYAssetSwap {
    const message = createBaseEventYAssetSwap();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = SwapSummary.fromAmino(object.summary);
    }
    if (object.refractor_action !== undefined && object.refractor_action !== null) {
      message.refractorAction = EventYAssetSwapRefractorAction.fromAmino(object.refractor_action);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventYAssetSwap, useInterfaces: boolean = false): EventYAssetSwapAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.summary = message.summary ? SwapSummary.toAmino(message.summary, useInterfaces) : undefined;
    obj.refractor_action = message.refractorAction ? EventYAssetSwapRefractorAction.toAmino(message.refractorAction, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventYAssetSwapAminoMsg): EventYAssetSwap {
    return EventYAssetSwap.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYAssetSwapProtoMsg, useInterfaces: boolean = false): EventYAssetSwap {
    return EventYAssetSwap.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYAssetSwap): Uint8Array {
    return EventYAssetSwap.encode(message).finish();
  },
  toProtoMsg(message: EventYAssetSwap): EventYAssetSwapProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventYAssetSwap",
      value: EventYAssetSwap.encode(message).finish()
    };
  }
};
function createBaseEventSetOraclePricePair(): EventSetOraclePricePair {
  return {
    oraclePricePair: OraclePricePair.fromPartial({})
  };
}
export const EventSetOraclePricePair = {
  typeUrl: "/pryzm.amm.v1.EventSetOraclePricePair",
  encode(message: EventSetOraclePricePair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oraclePricePair !== undefined) {
      OraclePricePair.encode(message.oraclePricePair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetOraclePricePair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetOraclePricePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oraclePricePair = OraclePricePair.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetOraclePricePair>): EventSetOraclePricePair {
    const message = createBaseEventSetOraclePricePair();
    message.oraclePricePair = object.oraclePricePair !== undefined && object.oraclePricePair !== null ? OraclePricePair.fromPartial(object.oraclePricePair) : undefined;
    return message;
  },
  fromAmino(object: EventSetOraclePricePairAmino): EventSetOraclePricePair {
    const message = createBaseEventSetOraclePricePair();
    if (object.oracle_price_pair !== undefined && object.oracle_price_pair !== null) {
      message.oraclePricePair = OraclePricePair.fromAmino(object.oracle_price_pair);
    }
    return message;
  },
  toAmino(message: EventSetOraclePricePair, useInterfaces: boolean = false): EventSetOraclePricePairAmino {
    const obj: any = {};
    obj.oracle_price_pair = message.oraclePricePair ? OraclePricePair.toAmino(message.oraclePricePair, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetOraclePricePairAminoMsg): EventSetOraclePricePair {
    return EventSetOraclePricePair.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetOraclePricePairProtoMsg, useInterfaces: boolean = false): EventSetOraclePricePair {
    return EventSetOraclePricePair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetOraclePricePair): Uint8Array {
    return EventSetOraclePricePair.encode(message).finish();
  },
  toProtoMsg(message: EventSetOraclePricePair): EventSetOraclePricePairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetOraclePricePair",
      value: EventSetOraclePricePair.encode(message).finish()
    };
  }
};
function createBaseEventRemoveOraclePricePair(): EventRemoveOraclePricePair {
  return {
    assetId: ""
  };
}
export const EventRemoveOraclePricePair = {
  typeUrl: "/pryzm.amm.v1.EventRemoveOraclePricePair",
  encode(message: EventRemoveOraclePricePair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemoveOraclePricePair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveOraclePricePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemoveOraclePricePair>): EventRemoveOraclePricePair {
    const message = createBaseEventRemoveOraclePricePair();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: EventRemoveOraclePricePairAmino): EventRemoveOraclePricePair {
    const message = createBaseEventRemoveOraclePricePair();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: EventRemoveOraclePricePair, useInterfaces: boolean = false): EventRemoveOraclePricePairAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: EventRemoveOraclePricePairAminoMsg): EventRemoveOraclePricePair {
    return EventRemoveOraclePricePair.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveOraclePricePairProtoMsg, useInterfaces: boolean = false): EventRemoveOraclePricePair {
    return EventRemoveOraclePricePair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemoveOraclePricePair): Uint8Array {
    return EventRemoveOraclePricePair.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveOraclePricePair): EventRemoveOraclePricePairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemoveOraclePricePair",
      value: EventRemoveOraclePricePair.encode(message).finish()
    };
  }
};
function createBaseEventSetPendingTokenIntroduction(): EventSetPendingTokenIntroduction {
  return {
    pendingTokenIntroduction: PendingTokenIntroduction.fromPartial({})
  };
}
export const EventSetPendingTokenIntroduction = {
  typeUrl: "/pryzm.amm.v1.EventSetPendingTokenIntroduction",
  encode(message: EventSetPendingTokenIntroduction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pendingTokenIntroduction !== undefined) {
      PendingTokenIntroduction.encode(message.pendingTokenIntroduction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetPendingTokenIntroduction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetPendingTokenIntroduction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingTokenIntroduction = PendingTokenIntroduction.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetPendingTokenIntroduction>): EventSetPendingTokenIntroduction {
    const message = createBaseEventSetPendingTokenIntroduction();
    message.pendingTokenIntroduction = object.pendingTokenIntroduction !== undefined && object.pendingTokenIntroduction !== null ? PendingTokenIntroduction.fromPartial(object.pendingTokenIntroduction) : undefined;
    return message;
  },
  fromAmino(object: EventSetPendingTokenIntroductionAmino): EventSetPendingTokenIntroduction {
    const message = createBaseEventSetPendingTokenIntroduction();
    if (object.pending_token_introduction !== undefined && object.pending_token_introduction !== null) {
      message.pendingTokenIntroduction = PendingTokenIntroduction.fromAmino(object.pending_token_introduction);
    }
    return message;
  },
  toAmino(message: EventSetPendingTokenIntroduction, useInterfaces: boolean = false): EventSetPendingTokenIntroductionAmino {
    const obj: any = {};
    obj.pending_token_introduction = message.pendingTokenIntroduction ? PendingTokenIntroduction.toAmino(message.pendingTokenIntroduction, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetPendingTokenIntroductionAminoMsg): EventSetPendingTokenIntroduction {
    return EventSetPendingTokenIntroduction.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetPendingTokenIntroductionProtoMsg, useInterfaces: boolean = false): EventSetPendingTokenIntroduction {
    return EventSetPendingTokenIntroduction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetPendingTokenIntroduction): Uint8Array {
    return EventSetPendingTokenIntroduction.encode(message).finish();
  },
  toProtoMsg(message: EventSetPendingTokenIntroduction): EventSetPendingTokenIntroductionProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetPendingTokenIntroduction",
      value: EventSetPendingTokenIntroduction.encode(message).finish()
    };
  }
};
function createBaseEventRemovePendingTokenIntroduction(): EventRemovePendingTokenIntroduction {
  return {
    assetId: "",
    targetPoolId: BigInt(0)
  };
}
export const EventRemovePendingTokenIntroduction = {
  typeUrl: "/pryzm.amm.v1.EventRemovePendingTokenIntroduction",
  encode(message: EventRemovePendingTokenIntroduction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.targetPoolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.targetPoolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemovePendingTokenIntroduction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemovePendingTokenIntroduction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.targetPoolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemovePendingTokenIntroduction>): EventRemovePendingTokenIntroduction {
    const message = createBaseEventRemovePendingTokenIntroduction();
    message.assetId = object.assetId ?? "";
    message.targetPoolId = object.targetPoolId !== undefined && object.targetPoolId !== null ? BigInt(object.targetPoolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRemovePendingTokenIntroductionAmino): EventRemovePendingTokenIntroduction {
    const message = createBaseEventRemovePendingTokenIntroduction();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.target_pool_id !== undefined && object.target_pool_id !== null) {
      message.targetPoolId = BigInt(object.target_pool_id);
    }
    return message;
  },
  toAmino(message: EventRemovePendingTokenIntroduction, useInterfaces: boolean = false): EventRemovePendingTokenIntroductionAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.target_pool_id = message.targetPoolId !== BigInt(0) ? message.targetPoolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRemovePendingTokenIntroductionAminoMsg): EventRemovePendingTokenIntroduction {
    return EventRemovePendingTokenIntroduction.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemovePendingTokenIntroductionProtoMsg, useInterfaces: boolean = false): EventRemovePendingTokenIntroduction {
    return EventRemovePendingTokenIntroduction.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemovePendingTokenIntroduction): Uint8Array {
    return EventRemovePendingTokenIntroduction.encode(message).finish();
  },
  toProtoMsg(message: EventRemovePendingTokenIntroduction): EventRemovePendingTokenIntroductionProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemovePendingTokenIntroduction",
      value: EventRemovePendingTokenIntroduction.encode(message).finish()
    };
  }
};
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.amm.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};
function createBaseEventSetPermanentVirtualBalancePoolToken(): EventSetPermanentVirtualBalancePoolToken {
  return {
    virtualBalanceToken: PermanentVirtualBalancePoolToken.fromPartial({})
  };
}
export const EventSetPermanentVirtualBalancePoolToken = {
  typeUrl: "/pryzm.amm.v1.EventSetPermanentVirtualBalancePoolToken",
  encode(message: EventSetPermanentVirtualBalancePoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.virtualBalanceToken !== undefined) {
      PermanentVirtualBalancePoolToken.encode(message.virtualBalanceToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetPermanentVirtualBalancePoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetPermanentVirtualBalancePoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.virtualBalanceToken = PermanentVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetPermanentVirtualBalancePoolToken>): EventSetPermanentVirtualBalancePoolToken {
    const message = createBaseEventSetPermanentVirtualBalancePoolToken();
    message.virtualBalanceToken = object.virtualBalanceToken !== undefined && object.virtualBalanceToken !== null ? PermanentVirtualBalancePoolToken.fromPartial(object.virtualBalanceToken) : undefined;
    return message;
  },
  fromAmino(object: EventSetPermanentVirtualBalancePoolTokenAmino): EventSetPermanentVirtualBalancePoolToken {
    const message = createBaseEventSetPermanentVirtualBalancePoolToken();
    if (object.virtual_balance_token !== undefined && object.virtual_balance_token !== null) {
      message.virtualBalanceToken = PermanentVirtualBalancePoolToken.fromAmino(object.virtual_balance_token);
    }
    return message;
  },
  toAmino(message: EventSetPermanentVirtualBalancePoolToken, useInterfaces: boolean = false): EventSetPermanentVirtualBalancePoolTokenAmino {
    const obj: any = {};
    obj.virtual_balance_token = message.virtualBalanceToken ? PermanentVirtualBalancePoolToken.toAmino(message.virtualBalanceToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetPermanentVirtualBalancePoolTokenAminoMsg): EventSetPermanentVirtualBalancePoolToken {
    return EventSetPermanentVirtualBalancePoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetPermanentVirtualBalancePoolTokenProtoMsg, useInterfaces: boolean = false): EventSetPermanentVirtualBalancePoolToken {
    return EventSetPermanentVirtualBalancePoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetPermanentVirtualBalancePoolToken): Uint8Array {
    return EventSetPermanentVirtualBalancePoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventSetPermanentVirtualBalancePoolToken): EventSetPermanentVirtualBalancePoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventSetPermanentVirtualBalancePoolToken",
      value: EventSetPermanentVirtualBalancePoolToken.encode(message).finish()
    };
  }
};
function createBaseEventRemovePermanentVirtualBalancePoolToken(): EventRemovePermanentVirtualBalancePoolToken {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const EventRemovePermanentVirtualBalancePoolToken = {
  typeUrl: "/pryzm.amm.v1.EventRemovePermanentVirtualBalancePoolToken",
  encode(message: EventRemovePermanentVirtualBalancePoolToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRemovePermanentVirtualBalancePoolToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemovePermanentVirtualBalancePoolToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRemovePermanentVirtualBalancePoolToken>): EventRemovePermanentVirtualBalancePoolToken {
    const message = createBaseEventRemovePermanentVirtualBalancePoolToken();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventRemovePermanentVirtualBalancePoolTokenAmino): EventRemovePermanentVirtualBalancePoolToken {
    const message = createBaseEventRemovePermanentVirtualBalancePoolToken();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventRemovePermanentVirtualBalancePoolToken, useInterfaces: boolean = false): EventRemovePermanentVirtualBalancePoolTokenAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: EventRemovePermanentVirtualBalancePoolTokenAminoMsg): EventRemovePermanentVirtualBalancePoolToken {
    return EventRemovePermanentVirtualBalancePoolToken.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemovePermanentVirtualBalancePoolTokenProtoMsg, useInterfaces: boolean = false): EventRemovePermanentVirtualBalancePoolToken {
    return EventRemovePermanentVirtualBalancePoolToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRemovePermanentVirtualBalancePoolToken): Uint8Array {
    return EventRemovePermanentVirtualBalancePoolToken.encode(message).finish();
  },
  toProtoMsg(message: EventRemovePermanentVirtualBalancePoolToken): EventRemovePermanentVirtualBalancePoolTokenProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.EventRemovePermanentVirtualBalancePoolToken",
      value: EventRemovePermanentVirtualBalancePoolToken.encode(message).finish()
    };
  }
};
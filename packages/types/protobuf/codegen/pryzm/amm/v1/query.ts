//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Swap, SwapAmino, SwapSDKType, SwapType, SwapStep, SwapStepAmino, SwapStepSDKType } from "./operations";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { PoolToken, PoolTokenAmino, PoolTokenSDKType, TokenInfo, TokenInfoAmino, TokenInfoSDKType } from "./pool_token";
import { TokenWeight, TokenWeightAmino, TokenWeightSDKType } from "./token_weight";
import { Pool, PoolAmino, PoolSDKType } from "./pool";
import { WeightedToken, WeightedTokenAmino, WeightedTokenSDKType } from "./weighted_token";
import { WeightUpdateTiming, WeightUpdateTimingAmino, WeightUpdateTimingSDKType } from "./weight_update_timing";
import { TemporalVirtualBalancePoolToken, TemporalVirtualBalancePoolTokenAmino, TemporalVirtualBalancePoolTokenSDKType, PermanentVirtualBalancePoolToken, PermanentVirtualBalancePoolTokenAmino, PermanentVirtualBalancePoolTokenSDKType } from "./virtual_balance_pool_token";
import { YammConfiguration, YammConfigurationAmino, YammConfigurationSDKType } from "./yamm_configuration";
import { WhitelistedRoute, WhitelistedRouteAmino, WhitelistedRouteSDKType } from "./whitelisted_route";
import { Order, OrderAmino, OrderSDKType, DisabledOrderPair, DisabledOrderPairAmino, DisabledOrderPairSDKType } from "./order";
import { ScheduleOrder, ScheduleOrderAmino, ScheduleOrderSDKType } from "./schedule_order";
import { OraclePricePair, OraclePricePairAmino, OraclePricePairSDKType } from "./oracle_price_pair";
import { PendingTokenIntroduction, PendingTokenIntroductionAmino, PendingTokenIntroductionSDKType } from "./pending_token_introduction";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetPoolTokenRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryGetPoolTokenRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenRequest";
  value: QueryGetPoolTokenRequestAmino;
}
export interface QueryGetPoolTokenRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetPoolTokenResponse {
  poolToken: PoolToken | undefined;
}
export interface QueryGetPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryGetPoolTokenResponseAmino {
  pool_token?: PoolTokenAmino | undefined;
}
export interface QueryGetPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenResponse";
  value: QueryGetPoolTokenResponseAmino;
}
export interface QueryGetPoolTokenResponseSDKType {
  pool_token: PoolTokenSDKType | undefined;
}
export interface QueryAllPoolTokenRequest {
  pagination?: PageRequest | undefined;
  poolId: string;
}
export interface QueryAllPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryAllPoolTokenRequestAmino {
  pagination?: PageRequestAmino | undefined;
  pool_id?: string;
}
export interface QueryAllPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenRequest";
  value: QueryAllPoolTokenRequestAmino;
}
export interface QueryAllPoolTokenRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
  pool_id: string;
}
export interface QueryAllPoolTokenResponse {
  poolToken: PoolToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryAllPoolTokenResponseAmino {
  pool_token?: PoolTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenResponse";
  value: QueryAllPoolTokenResponseAmino;
}
export interface QueryAllPoolTokenResponseSDKType {
  pool_token: PoolTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAllPoolTokenForPoolRequest {
  poolId: bigint;
}
export interface QueryAllPoolTokenForPoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolRequest";
  value: Uint8Array;
}
export interface QueryAllPoolTokenForPoolRequestAmino {
  pool_id?: string;
}
export interface QueryAllPoolTokenForPoolRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenForPoolRequest";
  value: QueryAllPoolTokenForPoolRequestAmino;
}
export interface QueryAllPoolTokenForPoolRequestSDKType {
  pool_id: bigint;
}
export interface QueryAllPoolTokenForPoolResponse {
  poolToken: PoolToken[];
}
export interface QueryAllPoolTokenForPoolResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolResponse";
  value: Uint8Array;
}
export interface QueryAllPoolTokenForPoolResponseAmino {
  pool_token?: PoolTokenAmino[];
}
export interface QueryAllPoolTokenForPoolResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenForPoolResponse";
  value: QueryAllPoolTokenForPoolResponseAmino;
}
export interface QueryAllPoolTokenForPoolResponseSDKType {
  pool_token: PoolTokenSDKType[];
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightRequest {
  poolId: bigint;
}
export interface QueryAllPoolTokenWeightRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightRequest";
  value: Uint8Array;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightRequestAmino {
  pool_id?: string;
}
export interface QueryAllPoolTokenWeightRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenWeightRequest";
  value: QueryAllPoolTokenWeightRequestAmino;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightRequestSDKType {
  pool_id: bigint;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightResponse {
  tokenWeight: TokenWeight[];
}
export interface QueryAllPoolTokenWeightResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightResponse";
  value: Uint8Array;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightResponseAmino {
  token_weight?: TokenWeightAmino[];
}
export interface QueryAllPoolTokenWeightResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenWeightResponse";
  value: QueryAllPoolTokenWeightResponseAmino;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenWeightResponseSDKType {
  token_weight: TokenWeightSDKType[];
}
export interface QueryGetPoolTokenWeightRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetPoolTokenWeightRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightRequest";
  value: Uint8Array;
}
export interface QueryGetPoolTokenWeightRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetPoolTokenWeightRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenWeightRequest";
  value: QueryGetPoolTokenWeightRequestAmino;
}
export interface QueryGetPoolTokenWeightRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetPoolTokenWeightResponse {
  tokenWeight: TokenWeight | undefined;
}
export interface QueryGetPoolTokenWeightResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightResponse";
  value: Uint8Array;
}
export interface QueryGetPoolTokenWeightResponseAmino {
  token_weight?: TokenWeightAmino | undefined;
}
export interface QueryGetPoolTokenWeightResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenWeightResponse";
  value: QueryGetPoolTokenWeightResponseAmino;
}
export interface QueryGetPoolTokenWeightResponseSDKType {
  token_weight: TokenWeightSDKType | undefined;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoRequest {
  poolId: bigint;
}
export interface QueryAllPoolTokenInfoRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoRequest";
  value: Uint8Array;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoRequestAmino {
  pool_id?: string;
}
export interface QueryAllPoolTokenInfoRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenInfoRequest";
  value: QueryAllPoolTokenInfoRequestAmino;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoRequestSDKType {
  pool_id: bigint;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoResponse {
  tokenInfo: TokenInfo[];
}
export interface QueryAllPoolTokenInfoResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoResponse";
  value: Uint8Array;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoResponseAmino {
  token_info?: TokenInfoAmino[];
}
export interface QueryAllPoolTokenInfoResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolTokenInfoResponse";
  value: QueryAllPoolTokenInfoResponseAmino;
}
/**
 * computing normalized weights requires reading all tokens from the context
 * and computing weight for all of them
 * therefore, this query is not paginated
 */
export interface QueryAllPoolTokenInfoResponseSDKType {
  token_info: TokenInfoSDKType[];
}
export interface QueryGetPoolTokenInfoRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetPoolTokenInfoRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoRequest";
  value: Uint8Array;
}
export interface QueryGetPoolTokenInfoRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetPoolTokenInfoRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenInfoRequest";
  value: QueryGetPoolTokenInfoRequestAmino;
}
export interface QueryGetPoolTokenInfoRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetPoolTokenInfoResponse {
  tokenInfo: TokenInfo | undefined;
}
export interface QueryGetPoolTokenInfoResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoResponse";
  value: Uint8Array;
}
export interface QueryGetPoolTokenInfoResponseAmino {
  token_info?: TokenInfoAmino | undefined;
}
export interface QueryGetPoolTokenInfoResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolTokenInfoResponse";
  value: QueryGetPoolTokenInfoResponseAmino;
}
export interface QueryGetPoolTokenInfoResponseSDKType {
  token_info: TokenInfoSDKType | undefined;
}
export interface QueryGetPoolRequest {
  id: bigint;
}
export interface QueryGetPoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolRequest";
  value: Uint8Array;
}
export interface QueryGetPoolRequestAmino {
  id?: string;
}
export interface QueryGetPoolRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolRequest";
  value: QueryGetPoolRequestAmino;
}
export interface QueryGetPoolRequestSDKType {
  id: bigint;
}
export interface QueryGetPoolResponse {
  pool: Pool | undefined;
}
export interface QueryGetPoolResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolResponse";
  value: Uint8Array;
}
export interface QueryGetPoolResponseAmino {
  pool?: PoolAmino | undefined;
}
export interface QueryGetPoolResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPoolResponse";
  value: QueryGetPoolResponseAmino;
}
export interface QueryGetPoolResponseSDKType {
  pool: PoolSDKType | undefined;
}
export interface QueryAllPoolRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllPoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolRequest";
  value: Uint8Array;
}
export interface QueryAllPoolRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllPoolRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolRequest";
  value: QueryAllPoolRequestAmino;
}
export interface QueryAllPoolRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllPoolResponse {
  pool: Pool[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPoolResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolResponse";
  value: Uint8Array;
}
export interface QueryAllPoolResponseAmino {
  pool?: PoolAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPoolResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPoolResponse";
  value: QueryAllPoolResponseAmino;
}
export interface QueryAllPoolResponseSDKType {
  pool: PoolSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetWeightedTokenRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetWeightedTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenRequest";
  value: Uint8Array;
}
export interface QueryGetWeightedTokenRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetWeightedTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWeightedTokenRequest";
  value: QueryGetWeightedTokenRequestAmino;
}
export interface QueryGetWeightedTokenRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetWeightedTokenResponse {
  weightedToken: WeightedToken | undefined;
}
export interface QueryGetWeightedTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenResponse";
  value: Uint8Array;
}
export interface QueryGetWeightedTokenResponseAmino {
  weighted_token?: WeightedTokenAmino | undefined;
}
export interface QueryGetWeightedTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWeightedTokenResponse";
  value: QueryGetWeightedTokenResponseAmino;
}
export interface QueryGetWeightedTokenResponseSDKType {
  weighted_token: WeightedTokenSDKType | undefined;
}
export interface QueryAllWeightedTokenRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllWeightedTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenRequest";
  value: Uint8Array;
}
export interface QueryAllWeightedTokenRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllWeightedTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWeightedTokenRequest";
  value: QueryAllWeightedTokenRequestAmino;
}
export interface QueryAllWeightedTokenRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllWeightedTokenResponse {
  weightedToken: WeightedToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllWeightedTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenResponse";
  value: Uint8Array;
}
export interface QueryAllWeightedTokenResponseAmino {
  weighted_token?: WeightedTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllWeightedTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWeightedTokenResponse";
  value: QueryAllWeightedTokenResponseAmino;
}
export interface QueryAllWeightedTokenResponseSDKType {
  weighted_token: WeightedTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetWeightUpdateTimingRequest {
  poolId: bigint;
}
export interface QueryGetWeightUpdateTimingRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingRequest";
  value: Uint8Array;
}
export interface QueryGetWeightUpdateTimingRequestAmino {
  pool_id?: string;
}
export interface QueryGetWeightUpdateTimingRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWeightUpdateTimingRequest";
  value: QueryGetWeightUpdateTimingRequestAmino;
}
export interface QueryGetWeightUpdateTimingRequestSDKType {
  pool_id: bigint;
}
export interface QueryGetWeightUpdateTimingResponse {
  weightUpdateTiming: WeightUpdateTiming | undefined;
}
export interface QueryGetWeightUpdateTimingResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingResponse";
  value: Uint8Array;
}
export interface QueryGetWeightUpdateTimingResponseAmino {
  weight_update_timing?: WeightUpdateTimingAmino | undefined;
}
export interface QueryGetWeightUpdateTimingResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWeightUpdateTimingResponse";
  value: QueryGetWeightUpdateTimingResponseAmino;
}
export interface QueryGetWeightUpdateTimingResponseSDKType {
  weight_update_timing: WeightUpdateTimingSDKType | undefined;
}
export interface QueryAllWeightUpdateTimingRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllWeightUpdateTimingRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingRequest";
  value: Uint8Array;
}
export interface QueryAllWeightUpdateTimingRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllWeightUpdateTimingRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWeightUpdateTimingRequest";
  value: QueryAllWeightUpdateTimingRequestAmino;
}
export interface QueryAllWeightUpdateTimingRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllWeightUpdateTimingResponse {
  weightUpdateTiming: WeightUpdateTiming[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllWeightUpdateTimingResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingResponse";
  value: Uint8Array;
}
export interface QueryAllWeightUpdateTimingResponseAmino {
  weight_update_timing?: WeightUpdateTimingAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllWeightUpdateTimingResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWeightUpdateTimingResponse";
  value: QueryAllWeightUpdateTimingResponseAmino;
}
export interface QueryAllWeightUpdateTimingResponseSDKType {
  weight_update_timing: WeightUpdateTimingSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QuerySimulateSingleSwapRequest {
  swap: Swap | undefined;
}
export interface QuerySimulateSingleSwapRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapRequest";
  value: Uint8Array;
}
export interface QuerySimulateSingleSwapRequestAmino {
  swap?: SwapAmino | undefined;
}
export interface QuerySimulateSingleSwapRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateSingleSwapRequest";
  value: QuerySimulateSingleSwapRequestAmino;
}
export interface QuerySimulateSingleSwapRequestSDKType {
  swap: SwapSDKType | undefined;
}
export interface QuerySimulateSingleSwapResponse {
  amountOut: Coin | undefined;
  amountIn: Coin | undefined;
  /**
   * protocol fee does not contain the y_trade fee and refractor fee
   * which is paid in case of a yAsset trade
   */
  protocolFee: Coin | undefined;
  swapFee: Coin | undefined;
}
export interface QuerySimulateSingleSwapResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapResponse";
  value: Uint8Array;
}
export interface QuerySimulateSingleSwapResponseAmino {
  amount_out?: CoinAmino | undefined;
  amount_in?: CoinAmino | undefined;
  /**
   * protocol fee does not contain the y_trade fee and refractor fee
   * which is paid in case of a yAsset trade
   */
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino | undefined;
}
export interface QuerySimulateSingleSwapResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateSingleSwapResponse";
  value: QuerySimulateSingleSwapResponseAmino;
}
export interface QuerySimulateSingleSwapResponseSDKType {
  amount_out: CoinSDKType | undefined;
  amount_in: CoinSDKType | undefined;
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType | undefined;
}
export interface QuerySimulateInitializePoolRequest {
  poolId: bigint;
  amountsIn: Coin[];
  permanentVirtualBalances: Coin[];
}
export interface QuerySimulateInitializePoolRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolRequest";
  value: Uint8Array;
}
export interface QuerySimulateInitializePoolRequestAmino {
  pool_id?: string;
  amounts_in?: CoinAmino[];
  permanent_virtual_balances?: CoinAmino[];
}
export interface QuerySimulateInitializePoolRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateInitializePoolRequest";
  value: QuerySimulateInitializePoolRequestAmino;
}
export interface QuerySimulateInitializePoolRequestSDKType {
  pool_id: bigint;
  amounts_in: CoinSDKType[];
  permanent_virtual_balances: CoinSDKType[];
}
export interface QuerySimulateInitializePoolResponse {
  lptOut: Coin | undefined;
  amountsIn: Coin[];
  protocolFee: Coin[];
}
export interface QuerySimulateInitializePoolResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolResponse";
  value: Uint8Array;
}
export interface QuerySimulateInitializePoolResponseAmino {
  lpt_out?: CoinAmino | undefined;
  amounts_in?: CoinAmino[];
  protocol_fee?: CoinAmino[];
}
export interface QuerySimulateInitializePoolResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateInitializePoolResponse";
  value: QuerySimulateInitializePoolResponseAmino;
}
export interface QuerySimulateInitializePoolResponseSDKType {
  lpt_out: CoinSDKType | undefined;
  amounts_in: CoinSDKType[];
  protocol_fee: CoinSDKType[];
}
export interface QuerySimulateJoinAllTokensExactLptRequest {
  poolId: bigint;
  lptOut: string;
}
export interface QuerySimulateJoinAllTokensExactLptRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptRequest";
  value: Uint8Array;
}
export interface QuerySimulateJoinAllTokensExactLptRequestAmino {
  pool_id?: string;
  lpt_out?: string;
}
export interface QuerySimulateJoinAllTokensExactLptRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptRequest";
  value: QuerySimulateJoinAllTokensExactLptRequestAmino;
}
export interface QuerySimulateJoinAllTokensExactLptRequestSDKType {
  pool_id: bigint;
  lpt_out: string;
}
export interface QuerySimulateJoinAllTokensExactLptResponse {
  lptOut: Coin | undefined;
  amountsIn: Coin[];
  protocolFee: Coin[];
}
export interface QuerySimulateJoinAllTokensExactLptResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptResponse";
  value: Uint8Array;
}
export interface QuerySimulateJoinAllTokensExactLptResponseAmino {
  lpt_out?: CoinAmino | undefined;
  amounts_in?: CoinAmino[];
  protocol_fee?: CoinAmino[];
}
export interface QuerySimulateJoinAllTokensExactLptResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptResponse";
  value: QuerySimulateJoinAllTokensExactLptResponseAmino;
}
export interface QuerySimulateJoinAllTokensExactLptResponseSDKType {
  lpt_out: CoinSDKType | undefined;
  amounts_in: CoinSDKType[];
  protocol_fee: CoinSDKType[];
}
export interface QuerySimulateJoinExactTokensRequest {
  poolId: bigint;
  amountsIn: Coin[];
}
export interface QuerySimulateJoinExactTokensRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensRequest";
  value: Uint8Array;
}
export interface QuerySimulateJoinExactTokensRequestAmino {
  pool_id?: string;
  amounts_in?: CoinAmino[];
}
export interface QuerySimulateJoinExactTokensRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinExactTokensRequest";
  value: QuerySimulateJoinExactTokensRequestAmino;
}
export interface QuerySimulateJoinExactTokensRequestSDKType {
  pool_id: bigint;
  amounts_in: CoinSDKType[];
}
export interface QuerySimulateJoinExactTokensResponse {
  lptOut: Coin | undefined;
  amountsIn: Coin[];
  protocolFee: Coin[];
  swapFee: Coin[];
}
export interface QuerySimulateJoinExactTokensResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensResponse";
  value: Uint8Array;
}
export interface QuerySimulateJoinExactTokensResponseAmino {
  lpt_out?: CoinAmino | undefined;
  amounts_in?: CoinAmino[];
  protocol_fee?: CoinAmino[];
  swap_fee?: CoinAmino[];
}
export interface QuerySimulateJoinExactTokensResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinExactTokensResponse";
  value: QuerySimulateJoinExactTokensResponseAmino;
}
export interface QuerySimulateJoinExactTokensResponseSDKType {
  lpt_out: CoinSDKType | undefined;
  amounts_in: CoinSDKType[];
  protocol_fee: CoinSDKType[];
  swap_fee: CoinSDKType[];
}
export interface QuerySimulateZeroImpactJoinYammRequest {
  cAmountIn: Coin | undefined;
}
export interface QuerySimulateZeroImpactJoinYammRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammRequest";
  value: Uint8Array;
}
export interface QuerySimulateZeroImpactJoinYammRequestAmino {
  c_amount_in?: CoinAmino | undefined;
}
export interface QuerySimulateZeroImpactJoinYammRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammRequest";
  value: QuerySimulateZeroImpactJoinYammRequestAmino;
}
export interface QuerySimulateZeroImpactJoinYammRequestSDKType {
  c_amount_in: CoinSDKType | undefined;
}
export interface QuerySimulateZeroImpactJoinYammResponse {
  lptOut: Coin | undefined;
  yOut: Coin[];
  refractFee: Coin | undefined;
  joinProtocolFee: Coin[];
  swapFee: Coin[];
}
export interface QuerySimulateZeroImpactJoinYammResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammResponse";
  value: Uint8Array;
}
export interface QuerySimulateZeroImpactJoinYammResponseAmino {
  lpt_out?: CoinAmino | undefined;
  y_out?: CoinAmino[];
  refract_fee?: CoinAmino | undefined;
  join_protocol_fee?: CoinAmino[];
  swap_fee?: CoinAmino[];
}
export interface QuerySimulateZeroImpactJoinYammResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammResponse";
  value: QuerySimulateZeroImpactJoinYammResponseAmino;
}
export interface QuerySimulateZeroImpactJoinYammResponseSDKType {
  lpt_out: CoinSDKType | undefined;
  y_out: CoinSDKType[];
  refract_fee: CoinSDKType | undefined;
  join_protocol_fee: CoinSDKType[];
  swap_fee: CoinSDKType[];
}
export interface QuerySimulateJoinTokenExactLptRequest {
  poolId: bigint;
  lptOut: string;
  tokenIn: string;
}
export interface QuerySimulateJoinTokenExactLptRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptRequest";
  value: Uint8Array;
}
export interface QuerySimulateJoinTokenExactLptRequestAmino {
  pool_id?: string;
  lpt_out?: string;
  token_in?: string;
}
export interface QuerySimulateJoinTokenExactLptRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptRequest";
  value: QuerySimulateJoinTokenExactLptRequestAmino;
}
export interface QuerySimulateJoinTokenExactLptRequestSDKType {
  pool_id: bigint;
  lpt_out: string;
  token_in: string;
}
export interface QuerySimulateJoinTokenExactLptResponse {
  lptOut: Coin | undefined;
  amountIn: Coin | undefined;
  protocolFee: Coin | undefined;
  swapFee: Coin | undefined;
}
export interface QuerySimulateJoinTokenExactLptResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptResponse";
  value: Uint8Array;
}
export interface QuerySimulateJoinTokenExactLptResponseAmino {
  lpt_out?: CoinAmino | undefined;
  amount_in?: CoinAmino | undefined;
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino | undefined;
}
export interface QuerySimulateJoinTokenExactLptResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptResponse";
  value: QuerySimulateJoinTokenExactLptResponseAmino;
}
export interface QuerySimulateJoinTokenExactLptResponseSDKType {
  lpt_out: CoinSDKType | undefined;
  amount_in: CoinSDKType | undefined;
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType | undefined;
}
export interface QuerySimulateExitTokenExactLptRequest {
  poolId: bigint;
  lptIn: string;
  tokenOut: string;
}
export interface QuerySimulateExitTokenExactLptRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptRequest";
  value: Uint8Array;
}
export interface QuerySimulateExitTokenExactLptRequestAmino {
  pool_id?: string;
  lpt_in?: string;
  token_out?: string;
}
export interface QuerySimulateExitTokenExactLptRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptRequest";
  value: QuerySimulateExitTokenExactLptRequestAmino;
}
export interface QuerySimulateExitTokenExactLptRequestSDKType {
  pool_id: bigint;
  lpt_in: string;
  token_out: string;
}
export interface QuerySimulateExitTokenExactLptResponse {
  lptIn: Coin | undefined;
  amountOut: Coin | undefined;
  protocolFee: Coin | undefined;
  swapFee: Coin | undefined;
}
export interface QuerySimulateExitTokenExactLptResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptResponse";
  value: Uint8Array;
}
export interface QuerySimulateExitTokenExactLptResponseAmino {
  lpt_in?: CoinAmino | undefined;
  amount_out?: CoinAmino | undefined;
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino | undefined;
}
export interface QuerySimulateExitTokenExactLptResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptResponse";
  value: QuerySimulateExitTokenExactLptResponseAmino;
}
export interface QuerySimulateExitTokenExactLptResponseSDKType {
  lpt_in: CoinSDKType | undefined;
  amount_out: CoinSDKType | undefined;
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType | undefined;
}
export interface QuerySimulateExitExactTokensRequest {
  poolId: bigint;
  amountsOut: Coin[];
}
export interface QuerySimulateExitExactTokensRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensRequest";
  value: Uint8Array;
}
export interface QuerySimulateExitExactTokensRequestAmino {
  pool_id?: string;
  amounts_out?: CoinAmino[];
}
export interface QuerySimulateExitExactTokensRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitExactTokensRequest";
  value: QuerySimulateExitExactTokensRequestAmino;
}
export interface QuerySimulateExitExactTokensRequestSDKType {
  pool_id: bigint;
  amounts_out: CoinSDKType[];
}
export interface QuerySimulateExitExactTokensResponse {
  lptIn: Coin | undefined;
  amountsOut: Coin[];
  protocolFee: Coin | undefined;
  swapFee: Coin[];
}
export interface QuerySimulateExitExactTokensResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensResponse";
  value: Uint8Array;
}
export interface QuerySimulateExitExactTokensResponseAmino {
  lpt_in?: CoinAmino | undefined;
  amounts_out?: CoinAmino[];
  protocol_fee?: CoinAmino | undefined;
  swap_fee?: CoinAmino[];
}
export interface QuerySimulateExitExactTokensResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitExactTokensResponse";
  value: QuerySimulateExitExactTokensResponseAmino;
}
export interface QuerySimulateExitExactTokensResponseSDKType {
  lpt_in: CoinSDKType | undefined;
  amounts_out: CoinSDKType[];
  protocol_fee: CoinSDKType | undefined;
  swap_fee: CoinSDKType[];
}
export interface QuerySimulateExitAllTokensExactLptRequest {
  poolId: bigint;
  lptIn: string;
}
export interface QuerySimulateExitAllTokensExactLptRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptRequest";
  value: Uint8Array;
}
export interface QuerySimulateExitAllTokensExactLptRequestAmino {
  pool_id?: string;
  lpt_in?: string;
}
export interface QuerySimulateExitAllTokensExactLptRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptRequest";
  value: QuerySimulateExitAllTokensExactLptRequestAmino;
}
export interface QuerySimulateExitAllTokensExactLptRequestSDKType {
  pool_id: bigint;
  lpt_in: string;
}
export interface QuerySimulateExitAllTokensExactLptResponse {
  lptIn: Coin | undefined;
  amountsOut: Coin[];
  protocolFee: Coin | undefined;
}
export interface QuerySimulateExitAllTokensExactLptResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptResponse";
  value: Uint8Array;
}
export interface QuerySimulateExitAllTokensExactLptResponseAmino {
  lpt_in?: CoinAmino | undefined;
  amounts_out?: CoinAmino[];
  protocol_fee?: CoinAmino | undefined;
}
export interface QuerySimulateExitAllTokensExactLptResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptResponse";
  value: QuerySimulateExitAllTokensExactLptResponseAmino;
}
export interface QuerySimulateExitAllTokensExactLptResponseSDKType {
  lpt_in: CoinSDKType | undefined;
  amounts_out: CoinSDKType[];
  protocol_fee: CoinSDKType | undefined;
}
export interface QuerySpotPriceRequest {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  applyFee: boolean;
}
export interface QuerySpotPriceRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySpotPriceRequest";
  value: Uint8Array;
}
export interface QuerySpotPriceRequestAmino {
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  apply_fee?: boolean;
}
export interface QuerySpotPriceRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySpotPriceRequest";
  value: QuerySpotPriceRequestAmino;
}
export interface QuerySpotPriceRequestSDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
  apply_fee: boolean;
}
export interface QuerySpotPriceResponse {
  spotPrice: string;
}
export interface QuerySpotPriceResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySpotPriceResponse";
  value: Uint8Array;
}
export interface QuerySpotPriceResponseAmino {
  spot_price?: string;
}
export interface QuerySpotPriceResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySpotPriceResponse";
  value: QuerySpotPriceResponseAmino;
}
export interface QuerySpotPriceResponseSDKType {
  spot_price: string;
}
export interface QueryGetIntroducingPoolTokenRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetIntroducingPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryGetIntroducingPoolTokenRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetIntroducingPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenRequest";
  value: QueryGetIntroducingPoolTokenRequestAmino;
}
export interface QueryGetIntroducingPoolTokenRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetIntroducingPoolTokenResponse {
  introducingPoolToken: TemporalVirtualBalancePoolToken | undefined;
}
export interface QueryGetIntroducingPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryGetIntroducingPoolTokenResponseAmino {
  introducing_pool_token?: TemporalVirtualBalancePoolTokenAmino | undefined;
}
export interface QueryGetIntroducingPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenResponse";
  value: QueryGetIntroducingPoolTokenResponseAmino;
}
export interface QueryGetIntroducingPoolTokenResponseSDKType {
  introducing_pool_token: TemporalVirtualBalancePoolTokenSDKType | undefined;
}
export interface QueryAllIntroducingPoolTokenRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllIntroducingPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryAllIntroducingPoolTokenRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllIntroducingPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenRequest";
  value: QueryAllIntroducingPoolTokenRequestAmino;
}
export interface QueryAllIntroducingPoolTokenRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllIntroducingPoolTokenResponse {
  introducingPoolToken: TemporalVirtualBalancePoolToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllIntroducingPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryAllIntroducingPoolTokenResponseAmino {
  introducing_pool_token?: TemporalVirtualBalancePoolTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllIntroducingPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenResponse";
  value: QueryAllIntroducingPoolTokenResponseAmino;
}
export interface QueryAllIntroducingPoolTokenResponseSDKType {
  introducing_pool_token: TemporalVirtualBalancePoolTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetPermanentVirtualBalancePoolTokenRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetPermanentVirtualBalancePoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenRequest";
  value: Uint8Array;
}
export interface QueryGetPermanentVirtualBalancePoolTokenRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetPermanentVirtualBalancePoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenRequest";
  value: QueryGetPermanentVirtualBalancePoolTokenRequestAmino;
}
export interface QueryGetPermanentVirtualBalancePoolTokenRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetPermanentVirtualBalancePoolTokenResponse {
  permanentVirtualBalancePoolToken: PermanentVirtualBalancePoolToken | undefined;
}
export interface QueryGetPermanentVirtualBalancePoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenResponse";
  value: Uint8Array;
}
export interface QueryGetPermanentVirtualBalancePoolTokenResponseAmino {
  permanent_virtual_balance_pool_token?: PermanentVirtualBalancePoolTokenAmino | undefined;
}
export interface QueryGetPermanentVirtualBalancePoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenResponse";
  value: QueryGetPermanentVirtualBalancePoolTokenResponseAmino;
}
export interface QueryGetPermanentVirtualBalancePoolTokenResponseSDKType {
  permanent_virtual_balance_pool_token: PermanentVirtualBalancePoolTokenSDKType | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenRequest";
  value: Uint8Array;
}
export interface QueryAllPermanentVirtualBalancePoolTokenRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenRequest";
  value: QueryAllPermanentVirtualBalancePoolTokenRequestAmino;
}
export interface QueryAllPermanentVirtualBalancePoolTokenRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenResponse {
  permanentVirtualBalancePoolToken: PermanentVirtualBalancePoolToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenResponse";
  value: Uint8Array;
}
export interface QueryAllPermanentVirtualBalancePoolTokenResponseAmino {
  permanent_virtual_balance_pool_token?: PermanentVirtualBalancePoolTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPermanentVirtualBalancePoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenResponse";
  value: QueryAllPermanentVirtualBalancePoolTokenResponseAmino;
}
export interface QueryAllPermanentVirtualBalancePoolTokenResponseSDKType {
  permanent_virtual_balance_pool_token: PermanentVirtualBalancePoolTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetExpiringPoolTokenRequest {
  poolId: bigint;
  denom: string;
}
export interface QueryGetExpiringPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryGetExpiringPoolTokenRequestAmino {
  pool_id?: string;
  denom?: string;
}
export interface QueryGetExpiringPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetExpiringPoolTokenRequest";
  value: QueryGetExpiringPoolTokenRequestAmino;
}
export interface QueryGetExpiringPoolTokenRequestSDKType {
  pool_id: bigint;
  denom: string;
}
export interface QueryGetExpiringPoolTokenResponse {
  expiringPoolToken: TemporalVirtualBalancePoolToken | undefined;
}
export interface QueryGetExpiringPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryGetExpiringPoolTokenResponseAmino {
  expiring_pool_token?: TemporalVirtualBalancePoolTokenAmino | undefined;
}
export interface QueryGetExpiringPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetExpiringPoolTokenResponse";
  value: QueryGetExpiringPoolTokenResponseAmino;
}
export interface QueryGetExpiringPoolTokenResponseSDKType {
  expiring_pool_token: TemporalVirtualBalancePoolTokenSDKType | undefined;
}
export interface QueryAllExpiringPoolTokenRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllExpiringPoolTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenRequest";
  value: Uint8Array;
}
export interface QueryAllExpiringPoolTokenRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllExpiringPoolTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllExpiringPoolTokenRequest";
  value: QueryAllExpiringPoolTokenRequestAmino;
}
export interface QueryAllExpiringPoolTokenRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllExpiringPoolTokenResponse {
  expiringPoolToken: TemporalVirtualBalancePoolToken[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllExpiringPoolTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenResponse";
  value: Uint8Array;
}
export interface QueryAllExpiringPoolTokenResponseAmino {
  expiring_pool_token?: TemporalVirtualBalancePoolTokenAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllExpiringPoolTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllExpiringPoolTokenResponse";
  value: QueryAllExpiringPoolTokenResponseAmino;
}
export interface QueryAllExpiringPoolTokenResponseSDKType {
  expiring_pool_token: TemporalVirtualBalancePoolTokenSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryLpTokenRequest {
  poolId: bigint;
}
export interface QueryLpTokenRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryLpTokenRequest";
  value: Uint8Array;
}
export interface QueryLpTokenRequestAmino {
  pool_id?: string;
}
export interface QueryLpTokenRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryLpTokenRequest";
  value: QueryLpTokenRequestAmino;
}
export interface QueryLpTokenRequestSDKType {
  pool_id: bigint;
}
export interface QueryLpTokenResponse {
  lpToken: PoolToken | undefined;
}
export interface QueryLpTokenResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryLpTokenResponse";
  value: Uint8Array;
}
export interface QueryLpTokenResponseAmino {
  lp_token?: PoolTokenAmino | undefined;
}
export interface QueryLpTokenResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryLpTokenResponse";
  value: QueryLpTokenResponseAmino;
}
export interface QueryLpTokenResponseSDKType {
  lp_token: PoolTokenSDKType | undefined;
}
export interface QuerySimulateBatchSwapRequest {
  swapType: SwapType;
  steps: SwapStep[];
}
export interface QuerySimulateBatchSwapRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapRequest";
  value: Uint8Array;
}
export interface QuerySimulateBatchSwapRequestAmino {
  swap_type?: SwapType;
  steps?: SwapStepAmino[];
}
export interface QuerySimulateBatchSwapRequestAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateBatchSwapRequest";
  value: QuerySimulateBatchSwapRequestAmino;
}
export interface QuerySimulateBatchSwapRequestSDKType {
  swap_type: SwapType;
  steps: SwapStepSDKType[];
}
export interface QuerySimulateBatchSwapResponse {
  amountsIn: Coin[];
  amountsOut: Coin[];
  /**
   * protocol fee does not contain the y_trade fee and refractor fee
   * which is paid in case of a yAsset trade
   */
  swapProtocolFee: Coin[];
  joinExitProtocolFee: Coin[];
  swapFee: Coin[];
}
export interface QuerySimulateBatchSwapResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapResponse";
  value: Uint8Array;
}
export interface QuerySimulateBatchSwapResponseAmino {
  amounts_in?: CoinAmino[];
  amounts_out?: CoinAmino[];
  /**
   * protocol fee does not contain the y_trade fee and refractor fee
   * which is paid in case of a yAsset trade
   */
  swap_protocol_fee?: CoinAmino[];
  join_exit_protocol_fee?: CoinAmino[];
  swap_fee?: CoinAmino[];
}
export interface QuerySimulateBatchSwapResponseAminoMsg {
  type: "/pryzm.amm.v1.QuerySimulateBatchSwapResponse";
  value: QuerySimulateBatchSwapResponseAmino;
}
export interface QuerySimulateBatchSwapResponseSDKType {
  amounts_in: CoinSDKType[];
  amounts_out: CoinSDKType[];
  swap_protocol_fee: CoinSDKType[];
  join_exit_protocol_fee: CoinSDKType[];
  swap_fee: CoinSDKType[];
}
export interface QueryGetYammConfigurationRequest {
  poolId: bigint;
}
export interface QueryGetYammConfigurationRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationRequest";
  value: Uint8Array;
}
export interface QueryGetYammConfigurationRequestAmino {
  pool_id?: string;
}
export interface QueryGetYammConfigurationRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetYammConfigurationRequest";
  value: QueryGetYammConfigurationRequestAmino;
}
export interface QueryGetYammConfigurationRequestSDKType {
  pool_id: bigint;
}
export interface QueryGetYammConfigurationResponse {
  yammConfiguration: YammConfiguration | undefined;
}
export interface QueryGetYammConfigurationResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationResponse";
  value: Uint8Array;
}
export interface QueryGetYammConfigurationResponseAmino {
  yamm_configuration?: YammConfigurationAmino | undefined;
}
export interface QueryGetYammConfigurationResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetYammConfigurationResponse";
  value: QueryGetYammConfigurationResponseAmino;
}
export interface QueryGetYammConfigurationResponseSDKType {
  yamm_configuration: YammConfigurationSDKType | undefined;
}
export interface QueryAllYammConfigurationRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllYammConfigurationRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationRequest";
  value: Uint8Array;
}
export interface QueryAllYammConfigurationRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllYammConfigurationRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllYammConfigurationRequest";
  value: QueryAllYammConfigurationRequestAmino;
}
export interface QueryAllYammConfigurationRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllYammConfigurationResponse {
  yammConfiguration: YammConfiguration[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllYammConfigurationResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationResponse";
  value: Uint8Array;
}
export interface QueryAllYammConfigurationResponseAmino {
  yamm_configuration?: YammConfigurationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllYammConfigurationResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllYammConfigurationResponse";
  value: QueryAllYammConfigurationResponseAmino;
}
export interface QueryAllYammConfigurationResponseSDKType {
  yamm_configuration: YammConfigurationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetWhitelistedRouteRequest {
  tokenIn: string;
  tokenOut: string;
}
export interface QueryGetWhitelistedRouteRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteRequest";
  value: Uint8Array;
}
export interface QueryGetWhitelistedRouteRequestAmino {
  token_in?: string;
  token_out?: string;
}
export interface QueryGetWhitelistedRouteRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWhitelistedRouteRequest";
  value: QueryGetWhitelistedRouteRequestAmino;
}
export interface QueryGetWhitelistedRouteRequestSDKType {
  token_in: string;
  token_out: string;
}
export interface QueryGetWhitelistedRouteResponse {
  whitelistedRoute: WhitelistedRoute | undefined;
}
export interface QueryGetWhitelistedRouteResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteResponse";
  value: Uint8Array;
}
export interface QueryGetWhitelistedRouteResponseAmino {
  whitelisted_route?: WhitelistedRouteAmino | undefined;
}
export interface QueryGetWhitelistedRouteResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetWhitelistedRouteResponse";
  value: QueryGetWhitelistedRouteResponseAmino;
}
export interface QueryGetWhitelistedRouteResponseSDKType {
  whitelisted_route: WhitelistedRouteSDKType | undefined;
}
export interface QueryAllWhitelistedRouteRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllWhitelistedRouteRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteRequest";
  value: Uint8Array;
}
export interface QueryAllWhitelistedRouteRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllWhitelistedRouteRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWhitelistedRouteRequest";
  value: QueryAllWhitelistedRouteRequestAmino;
}
export interface QueryAllWhitelistedRouteRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllWhitelistedRouteResponse {
  whitelistedRoute: WhitelistedRoute[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllWhitelistedRouteResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteResponse";
  value: Uint8Array;
}
export interface QueryAllWhitelistedRouteResponseAmino {
  whitelisted_route?: WhitelistedRouteAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllWhitelistedRouteResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllWhitelistedRouteResponse";
  value: QueryAllWhitelistedRouteResponseAmino;
}
export interface QueryAllWhitelistedRouteResponseSDKType {
  whitelisted_route: WhitelistedRouteSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetOrderRequest {
  id: bigint;
}
export interface QueryGetOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetOrderRequest";
  value: Uint8Array;
}
export interface QueryGetOrderRequestAmino {
  id?: string;
}
export interface QueryGetOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetOrderRequest";
  value: QueryGetOrderRequestAmino;
}
export interface QueryGetOrderRequestSDKType {
  id: bigint;
}
export interface QueryGetOrderResponse {
  order: Order | undefined;
}
export interface QueryGetOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetOrderResponse";
  value: Uint8Array;
}
export interface QueryGetOrderResponseAmino {
  order?: OrderAmino | undefined;
}
export interface QueryGetOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetOrderResponse";
  value: QueryGetOrderResponseAmino;
}
export interface QueryGetOrderResponseSDKType {
  order: OrderSDKType | undefined;
}
export interface QueryAllOrderRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllOrderRequest";
  value: Uint8Array;
}
export interface QueryAllOrderRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllOrderRequest";
  value: QueryAllOrderRequestAmino;
}
export interface QueryAllOrderRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllOrderResponse {
  order: Order[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllOrderResponse";
  value: Uint8Array;
}
export interface QueryAllOrderResponseAmino {
  order?: OrderAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllOrderResponse";
  value: QueryAllOrderResponseAmino;
}
export interface QueryAllOrderResponseSDKType {
  order: OrderSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetExecutableOrderRequest {
  orderId: bigint;
}
export interface QueryGetExecutableOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderRequest";
  value: Uint8Array;
}
export interface QueryGetExecutableOrderRequestAmino {
  order_id?: string;
}
export interface QueryGetExecutableOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetExecutableOrderRequest";
  value: QueryGetExecutableOrderRequestAmino;
}
export interface QueryGetExecutableOrderRequestSDKType {
  order_id: bigint;
}
export interface QueryGetExecutableOrderResponse {
  executableOrder: Order | undefined;
}
export interface QueryGetExecutableOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderResponse";
  value: Uint8Array;
}
export interface QueryGetExecutableOrderResponseAmino {
  executable_order?: OrderAmino | undefined;
}
export interface QueryGetExecutableOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetExecutableOrderResponse";
  value: QueryGetExecutableOrderResponseAmino;
}
export interface QueryGetExecutableOrderResponseSDKType {
  executable_order: OrderSDKType | undefined;
}
export interface QueryAllExecutableOrderRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllExecutableOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderRequest";
  value: Uint8Array;
}
export interface QueryAllExecutableOrderRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllExecutableOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllExecutableOrderRequest";
  value: QueryAllExecutableOrderRequestAmino;
}
export interface QueryAllExecutableOrderRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllExecutableOrderResponse {
  executableOrder: Order[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllExecutableOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderResponse";
  value: Uint8Array;
}
export interface QueryAllExecutableOrderResponseAmino {
  executable_order?: OrderAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllExecutableOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllExecutableOrderResponse";
  value: QueryAllExecutableOrderResponseAmino;
}
export interface QueryAllExecutableOrderResponseSDKType {
  executable_order: OrderSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetScheduleOrderRequest {
  orderId: bigint;
}
export interface QueryGetScheduleOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderRequest";
  value: Uint8Array;
}
export interface QueryGetScheduleOrderRequestAmino {
  order_id?: string;
}
export interface QueryGetScheduleOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetScheduleOrderRequest";
  value: QueryGetScheduleOrderRequestAmino;
}
export interface QueryGetScheduleOrderRequestSDKType {
  order_id: bigint;
}
export interface QueryGetScheduleOrderResponse {
  scheduleOrder: ScheduleOrder | undefined;
}
export interface QueryGetScheduleOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderResponse";
  value: Uint8Array;
}
export interface QueryGetScheduleOrderResponseAmino {
  schedule_order?: ScheduleOrderAmino | undefined;
}
export interface QueryGetScheduleOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetScheduleOrderResponse";
  value: QueryGetScheduleOrderResponseAmino;
}
export interface QueryGetScheduleOrderResponseSDKType {
  schedule_order: ScheduleOrderSDKType | undefined;
}
export interface QueryAllScheduleOrderRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllScheduleOrderRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderRequest";
  value: Uint8Array;
}
export interface QueryAllScheduleOrderRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllScheduleOrderRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllScheduleOrderRequest";
  value: QueryAllScheduleOrderRequestAmino;
}
export interface QueryAllScheduleOrderRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllScheduleOrderResponse {
  scheduleOrder: ScheduleOrder[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllScheduleOrderResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderResponse";
  value: Uint8Array;
}
export interface QueryAllScheduleOrderResponseAmino {
  schedule_order?: ScheduleOrderAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllScheduleOrderResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllScheduleOrderResponse";
  value: QueryAllScheduleOrderResponseAmino;
}
export interface QueryAllScheduleOrderResponseSDKType {
  schedule_order: ScheduleOrderSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetOraclePricePairRequest {
  assetId: string;
}
export interface QueryGetOraclePricePairRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairRequest";
  value: Uint8Array;
}
export interface QueryGetOraclePricePairRequestAmino {
  asset_id?: string;
}
export interface QueryGetOraclePricePairRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetOraclePricePairRequest";
  value: QueryGetOraclePricePairRequestAmino;
}
export interface QueryGetOraclePricePairRequestSDKType {
  asset_id: string;
}
export interface QueryGetOraclePricePairResponse {
  oraclePricePair: OraclePricePair | undefined;
}
export interface QueryGetOraclePricePairResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairResponse";
  value: Uint8Array;
}
export interface QueryGetOraclePricePairResponseAmino {
  oracle_price_pair?: OraclePricePairAmino | undefined;
}
export interface QueryGetOraclePricePairResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetOraclePricePairResponse";
  value: QueryGetOraclePricePairResponseAmino;
}
export interface QueryGetOraclePricePairResponseSDKType {
  oracle_price_pair: OraclePricePairSDKType | undefined;
}
export interface QueryAllOraclePricePairRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllOraclePricePairRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairRequest";
  value: Uint8Array;
}
export interface QueryAllOraclePricePairRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllOraclePricePairRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllOraclePricePairRequest";
  value: QueryAllOraclePricePairRequestAmino;
}
export interface QueryAllOraclePricePairRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllOraclePricePairResponse {
  oraclePricePair: OraclePricePair[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllOraclePricePairResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairResponse";
  value: Uint8Array;
}
export interface QueryAllOraclePricePairResponseAmino {
  oracle_price_pair?: OraclePricePairAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllOraclePricePairResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllOraclePricePairResponse";
  value: QueryAllOraclePricePairResponseAmino;
}
export interface QueryAllOraclePricePairResponseSDKType {
  oracle_price_pair: OraclePricePairSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryVaultPauseModeRequest {}
export interface QueryVaultPauseModeRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeRequest";
  value: Uint8Array;
}
export interface QueryVaultPauseModeRequestAmino {}
export interface QueryVaultPauseModeRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryVaultPauseModeRequest";
  value: QueryVaultPauseModeRequestAmino;
}
export interface QueryVaultPauseModeRequestSDKType {}
export interface QueryVaultPauseModeResponse {
  paused: boolean;
}
export interface QueryVaultPauseModeResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeResponse";
  value: Uint8Array;
}
export interface QueryVaultPauseModeResponseAmino {
  paused?: boolean;
}
export interface QueryVaultPauseModeResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryVaultPauseModeResponse";
  value: QueryVaultPauseModeResponseAmino;
}
export interface QueryVaultPauseModeResponseSDKType {
  paused: boolean;
}
export interface QueryGetPendingTokenIntroductionRequest {
  assetId: string;
  targetPoolId: bigint;
}
export interface QueryGetPendingTokenIntroductionRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionRequest";
  value: Uint8Array;
}
export interface QueryGetPendingTokenIntroductionRequestAmino {
  asset_id?: string;
  target_pool_id?: string;
}
export interface QueryGetPendingTokenIntroductionRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionRequest";
  value: QueryGetPendingTokenIntroductionRequestAmino;
}
export interface QueryGetPendingTokenIntroductionRequestSDKType {
  asset_id: string;
  target_pool_id: bigint;
}
export interface QueryGetPendingTokenIntroductionResponse {
  pendingTokenIntroduction: PendingTokenIntroduction | undefined;
}
export interface QueryGetPendingTokenIntroductionResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionResponse";
  value: Uint8Array;
}
export interface QueryGetPendingTokenIntroductionResponseAmino {
  pending_token_introduction?: PendingTokenIntroductionAmino | undefined;
}
export interface QueryGetPendingTokenIntroductionResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionResponse";
  value: QueryGetPendingTokenIntroductionResponseAmino;
}
export interface QueryGetPendingTokenIntroductionResponseSDKType {
  pending_token_introduction: PendingTokenIntroductionSDKType | undefined;
}
export interface QueryAllPendingTokenIntroductionRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllPendingTokenIntroductionRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionRequest";
  value: Uint8Array;
}
export interface QueryAllPendingTokenIntroductionRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllPendingTokenIntroductionRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionRequest";
  value: QueryAllPendingTokenIntroductionRequestAmino;
}
export interface QueryAllPendingTokenIntroductionRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllPendingTokenIntroductionResponse {
  pendingTokenIntroduction: PendingTokenIntroduction[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPendingTokenIntroductionResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionResponse";
  value: Uint8Array;
}
export interface QueryAllPendingTokenIntroductionResponseAmino {
  pending_token_introduction?: PendingTokenIntroductionAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPendingTokenIntroductionResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionResponse";
  value: QueryAllPendingTokenIntroductionResponseAmino;
}
export interface QueryAllPendingTokenIntroductionResponseSDKType {
  pending_token_introduction: PendingTokenIntroductionSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryYammPoolIdRequest {
  assetId: string;
}
export interface QueryYammPoolIdRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryYammPoolIdRequest";
  value: Uint8Array;
}
export interface QueryYammPoolIdRequestAmino {
  asset_id?: string;
}
export interface QueryYammPoolIdRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryYammPoolIdRequest";
  value: QueryYammPoolIdRequestAmino;
}
export interface QueryYammPoolIdRequestSDKType {
  asset_id: string;
}
export interface QueryYammPoolIdResponse {
  poolId: bigint;
}
export interface QueryYammPoolIdResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryYammPoolIdResponse";
  value: Uint8Array;
}
export interface QueryYammPoolIdResponseAmino {
  pool_id?: string;
}
export interface QueryYammPoolIdResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryYammPoolIdResponse";
  value: QueryYammPoolIdResponseAmino;
}
export interface QueryYammPoolIdResponseSDKType {
  pool_id: bigint;
}
export interface QueryOrderStepBoundsRequest {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  whitelistedRoute: boolean;
}
export interface QueryOrderStepBoundsRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsRequest";
  value: Uint8Array;
}
export interface QueryOrderStepBoundsRequestAmino {
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  whitelisted_route?: boolean;
}
export interface QueryOrderStepBoundsRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryOrderStepBoundsRequest";
  value: QueryOrderStepBoundsRequestAmino;
}
export interface QueryOrderStepBoundsRequestSDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
  whitelisted_route: boolean;
}
export interface QueryOrderStepBoundsResponse {
  minStep: string;
  maxStep: string;
}
export interface QueryOrderStepBoundsResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsResponse";
  value: Uint8Array;
}
export interface QueryOrderStepBoundsResponseAmino {
  min_step?: string;
  max_step?: string;
}
export interface QueryOrderStepBoundsResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryOrderStepBoundsResponse";
  value: QueryOrderStepBoundsResponseAmino;
}
export interface QueryOrderStepBoundsResponseSDKType {
  min_step: string;
  max_step: string;
}
export interface QueryAllDisabledOrderPairRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllDisabledOrderPairRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairRequest";
  value: Uint8Array;
}
export interface QueryAllDisabledOrderPairRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllDisabledOrderPairRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryAllDisabledOrderPairRequest";
  value: QueryAllDisabledOrderPairRequestAmino;
}
export interface QueryAllDisabledOrderPairRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllDisabledOrderPairResponse {
  disabledOrderPair: DisabledOrderPair[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllDisabledOrderPairResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairResponse";
  value: Uint8Array;
}
export interface QueryAllDisabledOrderPairResponseAmino {
  disabled_order_pair?: DisabledOrderPairAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllDisabledOrderPairResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryAllDisabledOrderPairResponse";
  value: QueryAllDisabledOrderPairResponseAmino;
}
export interface QueryAllDisabledOrderPairResponseSDKType {
  disabled_order_pair: DisabledOrderPairSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryOrderPairDisabledRequest {
  whitelistedRoute: boolean;
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
}
export interface QueryOrderPairDisabledRequestProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledRequest";
  value: Uint8Array;
}
export interface QueryOrderPairDisabledRequestAmino {
  whitelisted_route?: boolean;
  pool_id?: string;
  token_in?: string;
  token_out?: string;
}
export interface QueryOrderPairDisabledRequestAminoMsg {
  type: "/pryzm.amm.v1.QueryOrderPairDisabledRequest";
  value: QueryOrderPairDisabledRequestAmino;
}
export interface QueryOrderPairDisabledRequestSDKType {
  whitelisted_route: boolean;
  pool_id: bigint;
  token_in: string;
  token_out: string;
}
export interface QueryOrderPairDisabledResponse {
  disabled: boolean;
}
export interface QueryOrderPairDisabledResponseProtoMsg {
  typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledResponse";
  value: Uint8Array;
}
export interface QueryOrderPairDisabledResponseAmino {
  disabled?: boolean;
}
export interface QueryOrderPairDisabledResponseAminoMsg {
  type: "/pryzm.amm.v1.QueryOrderPairDisabledResponse";
  value: QueryOrderPairDisabledResponseAmino;
}
export interface QueryOrderPairDisabledResponseSDKType {
  disabled: boolean;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pryzm.amm.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/pryzm.amm.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenRequest(): QueryGetPoolTokenRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenRequest",
  encode(message: QueryGetPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenRequest();
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
  fromPartial(object: Partial<QueryGetPoolTokenRequest>): QueryGetPoolTokenRequest {
    const message = createBaseQueryGetPoolTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetPoolTokenRequestAmino): QueryGetPoolTokenRequest {
    const message = createBaseQueryGetPoolTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenRequest, useInterfaces: boolean = false): QueryGetPoolTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenRequestAminoMsg): QueryGetPoolTokenRequest {
    return QueryGetPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenRequest {
    return QueryGetPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenRequest): Uint8Array {
    return QueryGetPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenRequest): QueryGetPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenRequest",
      value: QueryGetPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenResponse(): QueryGetPoolTokenResponse {
  return {
    poolToken: PoolToken.fromPartial({})
  };
}
export const QueryGetPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenResponse",
  encode(message: QueryGetPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolToken !== undefined) {
      PoolToken.encode(message.poolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenResponse();
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
  fromPartial(object: Partial<QueryGetPoolTokenResponse>): QueryGetPoolTokenResponse {
    const message = createBaseQueryGetPoolTokenResponse();
    message.poolToken = object.poolToken !== undefined && object.poolToken !== null ? PoolToken.fromPartial(object.poolToken) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPoolTokenResponseAmino): QueryGetPoolTokenResponse {
    const message = createBaseQueryGetPoolTokenResponse();
    if (object.pool_token !== undefined && object.pool_token !== null) {
      message.poolToken = PoolToken.fromAmino(object.pool_token);
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenResponse, useInterfaces: boolean = false): QueryGetPoolTokenResponseAmino {
    const obj: any = {};
    obj.pool_token = message.poolToken ? PoolToken.toAmino(message.poolToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenResponseAminoMsg): QueryGetPoolTokenResponse {
    return QueryGetPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenResponse {
    return QueryGetPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenResponse): Uint8Array {
    return QueryGetPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenResponse): QueryGetPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenResponse",
      value: QueryGetPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenRequest(): QueryAllPoolTokenRequest {
  return {
    pagination: undefined,
    poolId: ""
  };
}
export const QueryAllPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenRequest",
  encode(message: QueryAllPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.poolId !== "") {
      writer.uint32(18).string(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.poolId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenRequest>): QueryAllPoolTokenRequest {
    const message = createBaseQueryAllPoolTokenRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.poolId = object.poolId ?? "";
    return message;
  },
  fromAmino(object: QueryAllPoolTokenRequestAmino): QueryAllPoolTokenRequest {
    const message = createBaseQueryAllPoolTokenRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    return message;
  },
  toAmino(message: QueryAllPoolTokenRequest, useInterfaces: boolean = false): QueryAllPoolTokenRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenRequestAminoMsg): QueryAllPoolTokenRequest {
    return QueryAllPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenRequest {
    return QueryAllPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenRequest): Uint8Array {
    return QueryAllPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenRequest): QueryAllPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenRequest",
      value: QueryAllPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenResponse(): QueryAllPoolTokenResponse {
  return {
    poolToken: [],
    pagination: undefined
  };
}
export const QueryAllPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenResponse",
  encode(message: QueryAllPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.poolToken) {
      PoolToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolToken.push(PoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenResponse>): QueryAllPoolTokenResponse {
    const message = createBaseQueryAllPoolTokenResponse();
    message.poolToken = object.poolToken?.map(e => PoolToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPoolTokenResponseAmino): QueryAllPoolTokenResponse {
    const message = createBaseQueryAllPoolTokenResponse();
    message.poolToken = object.pool_token?.map(e => PoolToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPoolTokenResponse, useInterfaces: boolean = false): QueryAllPoolTokenResponseAmino {
    const obj: any = {};
    if (message.poolToken) {
      obj.pool_token = message.poolToken.map(e => e ? PoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_token = message.poolToken;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenResponseAminoMsg): QueryAllPoolTokenResponse {
    return QueryAllPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenResponse {
    return QueryAllPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenResponse): Uint8Array {
    return QueryAllPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenResponse): QueryAllPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenResponse",
      value: QueryAllPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenForPoolRequest(): QueryAllPoolTokenForPoolRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryAllPoolTokenForPoolRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolRequest",
  encode(message: QueryAllPoolTokenForPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenForPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenForPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenForPoolRequest>): QueryAllPoolTokenForPoolRequest {
    const message = createBaseQueryAllPoolTokenForPoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAllPoolTokenForPoolRequestAmino): QueryAllPoolTokenForPoolRequest {
    const message = createBaseQueryAllPoolTokenForPoolRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryAllPoolTokenForPoolRequest, useInterfaces: boolean = false): QueryAllPoolTokenForPoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenForPoolRequestAminoMsg): QueryAllPoolTokenForPoolRequest {
    return QueryAllPoolTokenForPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenForPoolRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenForPoolRequest {
    return QueryAllPoolTokenForPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenForPoolRequest): Uint8Array {
    return QueryAllPoolTokenForPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenForPoolRequest): QueryAllPoolTokenForPoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolRequest",
      value: QueryAllPoolTokenForPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenForPoolResponse(): QueryAllPoolTokenForPoolResponse {
  return {
    poolToken: []
  };
}
export const QueryAllPoolTokenForPoolResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolResponse",
  encode(message: QueryAllPoolTokenForPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.poolToken) {
      PoolToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenForPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenForPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolToken.push(PoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenForPoolResponse>): QueryAllPoolTokenForPoolResponse {
    const message = createBaseQueryAllPoolTokenForPoolResponse();
    message.poolToken = object.poolToken?.map(e => PoolToken.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllPoolTokenForPoolResponseAmino): QueryAllPoolTokenForPoolResponse {
    const message = createBaseQueryAllPoolTokenForPoolResponse();
    message.poolToken = object.pool_token?.map(e => PoolToken.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllPoolTokenForPoolResponse, useInterfaces: boolean = false): QueryAllPoolTokenForPoolResponseAmino {
    const obj: any = {};
    if (message.poolToken) {
      obj.pool_token = message.poolToken.map(e => e ? PoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_token = message.poolToken;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenForPoolResponseAminoMsg): QueryAllPoolTokenForPoolResponse {
    return QueryAllPoolTokenForPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenForPoolResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenForPoolResponse {
    return QueryAllPoolTokenForPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenForPoolResponse): Uint8Array {
    return QueryAllPoolTokenForPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenForPoolResponse): QueryAllPoolTokenForPoolResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenForPoolResponse",
      value: QueryAllPoolTokenForPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenWeightRequest(): QueryAllPoolTokenWeightRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryAllPoolTokenWeightRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightRequest",
  encode(message: QueryAllPoolTokenWeightRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenWeightRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenWeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenWeightRequest>): QueryAllPoolTokenWeightRequest {
    const message = createBaseQueryAllPoolTokenWeightRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAllPoolTokenWeightRequestAmino): QueryAllPoolTokenWeightRequest {
    const message = createBaseQueryAllPoolTokenWeightRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryAllPoolTokenWeightRequest, useInterfaces: boolean = false): QueryAllPoolTokenWeightRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenWeightRequestAminoMsg): QueryAllPoolTokenWeightRequest {
    return QueryAllPoolTokenWeightRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenWeightRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenWeightRequest {
    return QueryAllPoolTokenWeightRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenWeightRequest): Uint8Array {
    return QueryAllPoolTokenWeightRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenWeightRequest): QueryAllPoolTokenWeightRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightRequest",
      value: QueryAllPoolTokenWeightRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenWeightResponse(): QueryAllPoolTokenWeightResponse {
  return {
    tokenWeight: []
  };
}
export const QueryAllPoolTokenWeightResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightResponse",
  encode(message: QueryAllPoolTokenWeightResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tokenWeight) {
      TokenWeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenWeightResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenWeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenWeight.push(TokenWeight.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenWeightResponse>): QueryAllPoolTokenWeightResponse {
    const message = createBaseQueryAllPoolTokenWeightResponse();
    message.tokenWeight = object.tokenWeight?.map(e => TokenWeight.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllPoolTokenWeightResponseAmino): QueryAllPoolTokenWeightResponse {
    const message = createBaseQueryAllPoolTokenWeightResponse();
    message.tokenWeight = object.token_weight?.map(e => TokenWeight.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllPoolTokenWeightResponse, useInterfaces: boolean = false): QueryAllPoolTokenWeightResponseAmino {
    const obj: any = {};
    if (message.tokenWeight) {
      obj.token_weight = message.tokenWeight.map(e => e ? TokenWeight.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_weight = message.tokenWeight;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenWeightResponseAminoMsg): QueryAllPoolTokenWeightResponse {
    return QueryAllPoolTokenWeightResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenWeightResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenWeightResponse {
    return QueryAllPoolTokenWeightResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenWeightResponse): Uint8Array {
    return QueryAllPoolTokenWeightResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenWeightResponse): QueryAllPoolTokenWeightResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenWeightResponse",
      value: QueryAllPoolTokenWeightResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenWeightRequest(): QueryGetPoolTokenWeightRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetPoolTokenWeightRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightRequest",
  encode(message: QueryGetPoolTokenWeightRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenWeightRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenWeightRequest();
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
  fromPartial(object: Partial<QueryGetPoolTokenWeightRequest>): QueryGetPoolTokenWeightRequest {
    const message = createBaseQueryGetPoolTokenWeightRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetPoolTokenWeightRequestAmino): QueryGetPoolTokenWeightRequest {
    const message = createBaseQueryGetPoolTokenWeightRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenWeightRequest, useInterfaces: boolean = false): QueryGetPoolTokenWeightRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenWeightRequestAminoMsg): QueryGetPoolTokenWeightRequest {
    return QueryGetPoolTokenWeightRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenWeightRequestProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenWeightRequest {
    return QueryGetPoolTokenWeightRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenWeightRequest): Uint8Array {
    return QueryGetPoolTokenWeightRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenWeightRequest): QueryGetPoolTokenWeightRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightRequest",
      value: QueryGetPoolTokenWeightRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenWeightResponse(): QueryGetPoolTokenWeightResponse {
  return {
    tokenWeight: TokenWeight.fromPartial({})
  };
}
export const QueryGetPoolTokenWeightResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightResponse",
  encode(message: QueryGetPoolTokenWeightResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenWeight !== undefined) {
      TokenWeight.encode(message.tokenWeight, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenWeightResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenWeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenWeight = TokenWeight.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPoolTokenWeightResponse>): QueryGetPoolTokenWeightResponse {
    const message = createBaseQueryGetPoolTokenWeightResponse();
    message.tokenWeight = object.tokenWeight !== undefined && object.tokenWeight !== null ? TokenWeight.fromPartial(object.tokenWeight) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPoolTokenWeightResponseAmino): QueryGetPoolTokenWeightResponse {
    const message = createBaseQueryGetPoolTokenWeightResponse();
    if (object.token_weight !== undefined && object.token_weight !== null) {
      message.tokenWeight = TokenWeight.fromAmino(object.token_weight);
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenWeightResponse, useInterfaces: boolean = false): QueryGetPoolTokenWeightResponseAmino {
    const obj: any = {};
    obj.token_weight = message.tokenWeight ? TokenWeight.toAmino(message.tokenWeight, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenWeightResponseAminoMsg): QueryGetPoolTokenWeightResponse {
    return QueryGetPoolTokenWeightResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenWeightResponseProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenWeightResponse {
    return QueryGetPoolTokenWeightResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenWeightResponse): Uint8Array {
    return QueryGetPoolTokenWeightResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenWeightResponse): QueryGetPoolTokenWeightResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenWeightResponse",
      value: QueryGetPoolTokenWeightResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenInfoRequest(): QueryAllPoolTokenInfoRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryAllPoolTokenInfoRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoRequest",
  encode(message: QueryAllPoolTokenInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenInfoRequest>): QueryAllPoolTokenInfoRequest {
    const message = createBaseQueryAllPoolTokenInfoRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAllPoolTokenInfoRequestAmino): QueryAllPoolTokenInfoRequest {
    const message = createBaseQueryAllPoolTokenInfoRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryAllPoolTokenInfoRequest, useInterfaces: boolean = false): QueryAllPoolTokenInfoRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenInfoRequestAminoMsg): QueryAllPoolTokenInfoRequest {
    return QueryAllPoolTokenInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenInfoRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenInfoRequest {
    return QueryAllPoolTokenInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenInfoRequest): Uint8Array {
    return QueryAllPoolTokenInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenInfoRequest): QueryAllPoolTokenInfoRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoRequest",
      value: QueryAllPoolTokenInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolTokenInfoResponse(): QueryAllPoolTokenInfoResponse {
  return {
    tokenInfo: []
  };
}
export const QueryAllPoolTokenInfoResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoResponse",
  encode(message: QueryAllPoolTokenInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tokenInfo) {
      TokenInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolTokenInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolTokenInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInfo.push(TokenInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolTokenInfoResponse>): QueryAllPoolTokenInfoResponse {
    const message = createBaseQueryAllPoolTokenInfoResponse();
    message.tokenInfo = object.tokenInfo?.map(e => TokenInfo.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllPoolTokenInfoResponseAmino): QueryAllPoolTokenInfoResponse {
    const message = createBaseQueryAllPoolTokenInfoResponse();
    message.tokenInfo = object.token_info?.map(e => TokenInfo.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllPoolTokenInfoResponse, useInterfaces: boolean = false): QueryAllPoolTokenInfoResponseAmino {
    const obj: any = {};
    if (message.tokenInfo) {
      obj.token_info = message.tokenInfo.map(e => e ? TokenInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_info = message.tokenInfo;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolTokenInfoResponseAminoMsg): QueryAllPoolTokenInfoResponse {
    return QueryAllPoolTokenInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolTokenInfoResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolTokenInfoResponse {
    return QueryAllPoolTokenInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolTokenInfoResponse): Uint8Array {
    return QueryAllPoolTokenInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolTokenInfoResponse): QueryAllPoolTokenInfoResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolTokenInfoResponse",
      value: QueryAllPoolTokenInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenInfoRequest(): QueryGetPoolTokenInfoRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetPoolTokenInfoRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoRequest",
  encode(message: QueryGetPoolTokenInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenInfoRequest();
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
  fromPartial(object: Partial<QueryGetPoolTokenInfoRequest>): QueryGetPoolTokenInfoRequest {
    const message = createBaseQueryGetPoolTokenInfoRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetPoolTokenInfoRequestAmino): QueryGetPoolTokenInfoRequest {
    const message = createBaseQueryGetPoolTokenInfoRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenInfoRequest, useInterfaces: boolean = false): QueryGetPoolTokenInfoRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenInfoRequestAminoMsg): QueryGetPoolTokenInfoRequest {
    return QueryGetPoolTokenInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenInfoRequestProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenInfoRequest {
    return QueryGetPoolTokenInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenInfoRequest): Uint8Array {
    return QueryGetPoolTokenInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenInfoRequest): QueryGetPoolTokenInfoRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoRequest",
      value: QueryGetPoolTokenInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolTokenInfoResponse(): QueryGetPoolTokenInfoResponse {
  return {
    tokenInfo: TokenInfo.fromPartial({})
  };
}
export const QueryGetPoolTokenInfoResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoResponse",
  encode(message: QueryGetPoolTokenInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenInfo !== undefined) {
      TokenInfo.encode(message.tokenInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolTokenInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolTokenInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInfo = TokenInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPoolTokenInfoResponse>): QueryGetPoolTokenInfoResponse {
    const message = createBaseQueryGetPoolTokenInfoResponse();
    message.tokenInfo = object.tokenInfo !== undefined && object.tokenInfo !== null ? TokenInfo.fromPartial(object.tokenInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPoolTokenInfoResponseAmino): QueryGetPoolTokenInfoResponse {
    const message = createBaseQueryGetPoolTokenInfoResponse();
    if (object.token_info !== undefined && object.token_info !== null) {
      message.tokenInfo = TokenInfo.fromAmino(object.token_info);
    }
    return message;
  },
  toAmino(message: QueryGetPoolTokenInfoResponse, useInterfaces: boolean = false): QueryGetPoolTokenInfoResponseAmino {
    const obj: any = {};
    obj.token_info = message.tokenInfo ? TokenInfo.toAmino(message.tokenInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolTokenInfoResponseAminoMsg): QueryGetPoolTokenInfoResponse {
    return QueryGetPoolTokenInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolTokenInfoResponseProtoMsg, useInterfaces: boolean = false): QueryGetPoolTokenInfoResponse {
    return QueryGetPoolTokenInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolTokenInfoResponse): Uint8Array {
    return QueryGetPoolTokenInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolTokenInfoResponse): QueryGetPoolTokenInfoResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolTokenInfoResponse",
      value: QueryGetPoolTokenInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolRequest(): QueryGetPoolRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryGetPoolRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolRequest",
  encode(message: QueryGetPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPoolRequest>): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetPoolRequestAmino): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryGetPoolRequest, useInterfaces: boolean = false): QueryGetPoolRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolRequestAminoMsg): QueryGetPoolRequest {
    return QueryGetPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolRequestProtoMsg, useInterfaces: boolean = false): QueryGetPoolRequest {
    return QueryGetPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolRequest): Uint8Array {
    return QueryGetPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolRequest): QueryGetPoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolRequest",
      value: QueryGetPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolResponse(): QueryGetPoolResponse {
  return {
    pool: Pool.fromPartial({})
  };
}
export const QueryGetPoolResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPoolResponse",
  encode(message: QueryGetPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolResponse();
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
  fromPartial(object: Partial<QueryGetPoolResponse>): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    message.pool = object.pool !== undefined && object.pool !== null ? Pool.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPoolResponseAmino): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Pool.fromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: QueryGetPoolResponse, useInterfaces: boolean = false): QueryGetPoolResponseAmino {
    const obj: any = {};
    obj.pool = message.pool ? Pool.toAmino(message.pool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolResponseAminoMsg): QueryGetPoolResponse {
    return QueryGetPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolResponseProtoMsg, useInterfaces: boolean = false): QueryGetPoolResponse {
    return QueryGetPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolResponse): Uint8Array {
    return QueryGetPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolResponse): QueryGetPoolResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPoolResponse",
      value: QueryGetPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolRequest(): QueryAllPoolRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPoolRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolRequest",
  encode(message: QueryAllPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolRequest>): QueryAllPoolRequest {
    const message = createBaseQueryAllPoolRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPoolRequestAmino): QueryAllPoolRequest {
    const message = createBaseQueryAllPoolRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPoolRequest, useInterfaces: boolean = false): QueryAllPoolRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolRequestAminoMsg): QueryAllPoolRequest {
    return QueryAllPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolRequest {
    return QueryAllPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolRequest): Uint8Array {
    return QueryAllPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolRequest): QueryAllPoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolRequest",
      value: QueryAllPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolResponse(): QueryAllPoolResponse {
  return {
    pool: [],
    pagination: undefined
  };
}
export const QueryAllPoolResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPoolResponse",
  encode(message: QueryAllPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pool) {
      Pool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool.push(Pool.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPoolResponse>): QueryAllPoolResponse {
    const message = createBaseQueryAllPoolResponse();
    message.pool = object.pool?.map(e => Pool.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPoolResponseAmino): QueryAllPoolResponse {
    const message = createBaseQueryAllPoolResponse();
    message.pool = object.pool?.map(e => Pool.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPoolResponse, useInterfaces: boolean = false): QueryAllPoolResponseAmino {
    const obj: any = {};
    if (message.pool) {
      obj.pool = message.pool.map(e => e ? Pool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool = message.pool;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolResponseAminoMsg): QueryAllPoolResponse {
    return QueryAllPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolResponse {
    return QueryAllPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolResponse): Uint8Array {
    return QueryAllPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolResponse): QueryAllPoolResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPoolResponse",
      value: QueryAllPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetWeightedTokenRequest(): QueryGetWeightedTokenRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetWeightedTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenRequest",
  encode(message: QueryGetWeightedTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWeightedTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWeightedTokenRequest();
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
  fromPartial(object: Partial<QueryGetWeightedTokenRequest>): QueryGetWeightedTokenRequest {
    const message = createBaseQueryGetWeightedTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetWeightedTokenRequestAmino): QueryGetWeightedTokenRequest {
    const message = createBaseQueryGetWeightedTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetWeightedTokenRequest, useInterfaces: boolean = false): QueryGetWeightedTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetWeightedTokenRequestAminoMsg): QueryGetWeightedTokenRequest {
    return QueryGetWeightedTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWeightedTokenRequestProtoMsg, useInterfaces: boolean = false): QueryGetWeightedTokenRequest {
    return QueryGetWeightedTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWeightedTokenRequest): Uint8Array {
    return QueryGetWeightedTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWeightedTokenRequest): QueryGetWeightedTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenRequest",
      value: QueryGetWeightedTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetWeightedTokenResponse(): QueryGetWeightedTokenResponse {
  return {
    weightedToken: WeightedToken.fromPartial({})
  };
}
export const QueryGetWeightedTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenResponse",
  encode(message: QueryGetWeightedTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weightedToken !== undefined) {
      WeightedToken.encode(message.weightedToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWeightedTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWeightedTokenResponse();
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
  fromPartial(object: Partial<QueryGetWeightedTokenResponse>): QueryGetWeightedTokenResponse {
    const message = createBaseQueryGetWeightedTokenResponse();
    message.weightedToken = object.weightedToken !== undefined && object.weightedToken !== null ? WeightedToken.fromPartial(object.weightedToken) : undefined;
    return message;
  },
  fromAmino(object: QueryGetWeightedTokenResponseAmino): QueryGetWeightedTokenResponse {
    const message = createBaseQueryGetWeightedTokenResponse();
    if (object.weighted_token !== undefined && object.weighted_token !== null) {
      message.weightedToken = WeightedToken.fromAmino(object.weighted_token);
    }
    return message;
  },
  toAmino(message: QueryGetWeightedTokenResponse, useInterfaces: boolean = false): QueryGetWeightedTokenResponseAmino {
    const obj: any = {};
    obj.weighted_token = message.weightedToken ? WeightedToken.toAmino(message.weightedToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetWeightedTokenResponseAminoMsg): QueryGetWeightedTokenResponse {
    return QueryGetWeightedTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWeightedTokenResponseProtoMsg, useInterfaces: boolean = false): QueryGetWeightedTokenResponse {
    return QueryGetWeightedTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWeightedTokenResponse): Uint8Array {
    return QueryGetWeightedTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWeightedTokenResponse): QueryGetWeightedTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWeightedTokenResponse",
      value: QueryGetWeightedTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllWeightedTokenRequest(): QueryAllWeightedTokenRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllWeightedTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenRequest",
  encode(message: QueryAllWeightedTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWeightedTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWeightedTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWeightedTokenRequest>): QueryAllWeightedTokenRequest {
    const message = createBaseQueryAllWeightedTokenRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWeightedTokenRequestAmino): QueryAllWeightedTokenRequest {
    const message = createBaseQueryAllWeightedTokenRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWeightedTokenRequest, useInterfaces: boolean = false): QueryAllWeightedTokenRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWeightedTokenRequestAminoMsg): QueryAllWeightedTokenRequest {
    return QueryAllWeightedTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWeightedTokenRequestProtoMsg, useInterfaces: boolean = false): QueryAllWeightedTokenRequest {
    return QueryAllWeightedTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWeightedTokenRequest): Uint8Array {
    return QueryAllWeightedTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWeightedTokenRequest): QueryAllWeightedTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenRequest",
      value: QueryAllWeightedTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllWeightedTokenResponse(): QueryAllWeightedTokenResponse {
  return {
    weightedToken: [],
    pagination: undefined
  };
}
export const QueryAllWeightedTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenResponse",
  encode(message: QueryAllWeightedTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.weightedToken) {
      WeightedToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWeightedTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWeightedTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weightedToken.push(WeightedToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWeightedTokenResponse>): QueryAllWeightedTokenResponse {
    const message = createBaseQueryAllWeightedTokenResponse();
    message.weightedToken = object.weightedToken?.map(e => WeightedToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWeightedTokenResponseAmino): QueryAllWeightedTokenResponse {
    const message = createBaseQueryAllWeightedTokenResponse();
    message.weightedToken = object.weighted_token?.map(e => WeightedToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWeightedTokenResponse, useInterfaces: boolean = false): QueryAllWeightedTokenResponseAmino {
    const obj: any = {};
    if (message.weightedToken) {
      obj.weighted_token = message.weightedToken.map(e => e ? WeightedToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.weighted_token = message.weightedToken;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWeightedTokenResponseAminoMsg): QueryAllWeightedTokenResponse {
    return QueryAllWeightedTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWeightedTokenResponseProtoMsg, useInterfaces: boolean = false): QueryAllWeightedTokenResponse {
    return QueryAllWeightedTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWeightedTokenResponse): Uint8Array {
    return QueryAllWeightedTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWeightedTokenResponse): QueryAllWeightedTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWeightedTokenResponse",
      value: QueryAllWeightedTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetWeightUpdateTimingRequest(): QueryGetWeightUpdateTimingRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGetWeightUpdateTimingRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingRequest",
  encode(message: QueryGetWeightUpdateTimingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWeightUpdateTimingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWeightUpdateTimingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetWeightUpdateTimingRequest>): QueryGetWeightUpdateTimingRequest {
    const message = createBaseQueryGetWeightUpdateTimingRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetWeightUpdateTimingRequestAmino): QueryGetWeightUpdateTimingRequest {
    const message = createBaseQueryGetWeightUpdateTimingRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryGetWeightUpdateTimingRequest, useInterfaces: boolean = false): QueryGetWeightUpdateTimingRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetWeightUpdateTimingRequestAminoMsg): QueryGetWeightUpdateTimingRequest {
    return QueryGetWeightUpdateTimingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWeightUpdateTimingRequestProtoMsg, useInterfaces: boolean = false): QueryGetWeightUpdateTimingRequest {
    return QueryGetWeightUpdateTimingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWeightUpdateTimingRequest): Uint8Array {
    return QueryGetWeightUpdateTimingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWeightUpdateTimingRequest): QueryGetWeightUpdateTimingRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingRequest",
      value: QueryGetWeightUpdateTimingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetWeightUpdateTimingResponse(): QueryGetWeightUpdateTimingResponse {
  return {
    weightUpdateTiming: WeightUpdateTiming.fromPartial({})
  };
}
export const QueryGetWeightUpdateTimingResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingResponse",
  encode(message: QueryGetWeightUpdateTimingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.weightUpdateTiming !== undefined) {
      WeightUpdateTiming.encode(message.weightUpdateTiming, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWeightUpdateTimingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWeightUpdateTimingResponse();
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
  fromPartial(object: Partial<QueryGetWeightUpdateTimingResponse>): QueryGetWeightUpdateTimingResponse {
    const message = createBaseQueryGetWeightUpdateTimingResponse();
    message.weightUpdateTiming = object.weightUpdateTiming !== undefined && object.weightUpdateTiming !== null ? WeightUpdateTiming.fromPartial(object.weightUpdateTiming) : undefined;
    return message;
  },
  fromAmino(object: QueryGetWeightUpdateTimingResponseAmino): QueryGetWeightUpdateTimingResponse {
    const message = createBaseQueryGetWeightUpdateTimingResponse();
    if (object.weight_update_timing !== undefined && object.weight_update_timing !== null) {
      message.weightUpdateTiming = WeightUpdateTiming.fromAmino(object.weight_update_timing);
    }
    return message;
  },
  toAmino(message: QueryGetWeightUpdateTimingResponse, useInterfaces: boolean = false): QueryGetWeightUpdateTimingResponseAmino {
    const obj: any = {};
    obj.weight_update_timing = message.weightUpdateTiming ? WeightUpdateTiming.toAmino(message.weightUpdateTiming, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetWeightUpdateTimingResponseAminoMsg): QueryGetWeightUpdateTimingResponse {
    return QueryGetWeightUpdateTimingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWeightUpdateTimingResponseProtoMsg, useInterfaces: boolean = false): QueryGetWeightUpdateTimingResponse {
    return QueryGetWeightUpdateTimingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWeightUpdateTimingResponse): Uint8Array {
    return QueryGetWeightUpdateTimingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWeightUpdateTimingResponse): QueryGetWeightUpdateTimingResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWeightUpdateTimingResponse",
      value: QueryGetWeightUpdateTimingResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllWeightUpdateTimingRequest(): QueryAllWeightUpdateTimingRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllWeightUpdateTimingRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingRequest",
  encode(message: QueryAllWeightUpdateTimingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWeightUpdateTimingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWeightUpdateTimingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWeightUpdateTimingRequest>): QueryAllWeightUpdateTimingRequest {
    const message = createBaseQueryAllWeightUpdateTimingRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWeightUpdateTimingRequestAmino): QueryAllWeightUpdateTimingRequest {
    const message = createBaseQueryAllWeightUpdateTimingRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWeightUpdateTimingRequest, useInterfaces: boolean = false): QueryAllWeightUpdateTimingRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWeightUpdateTimingRequestAminoMsg): QueryAllWeightUpdateTimingRequest {
    return QueryAllWeightUpdateTimingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWeightUpdateTimingRequestProtoMsg, useInterfaces: boolean = false): QueryAllWeightUpdateTimingRequest {
    return QueryAllWeightUpdateTimingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWeightUpdateTimingRequest): Uint8Array {
    return QueryAllWeightUpdateTimingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWeightUpdateTimingRequest): QueryAllWeightUpdateTimingRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingRequest",
      value: QueryAllWeightUpdateTimingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllWeightUpdateTimingResponse(): QueryAllWeightUpdateTimingResponse {
  return {
    weightUpdateTiming: [],
    pagination: undefined
  };
}
export const QueryAllWeightUpdateTimingResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingResponse",
  encode(message: QueryAllWeightUpdateTimingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.weightUpdateTiming) {
      WeightUpdateTiming.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWeightUpdateTimingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWeightUpdateTimingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.weightUpdateTiming.push(WeightUpdateTiming.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWeightUpdateTimingResponse>): QueryAllWeightUpdateTimingResponse {
    const message = createBaseQueryAllWeightUpdateTimingResponse();
    message.weightUpdateTiming = object.weightUpdateTiming?.map(e => WeightUpdateTiming.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWeightUpdateTimingResponseAmino): QueryAllWeightUpdateTimingResponse {
    const message = createBaseQueryAllWeightUpdateTimingResponse();
    message.weightUpdateTiming = object.weight_update_timing?.map(e => WeightUpdateTiming.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWeightUpdateTimingResponse, useInterfaces: boolean = false): QueryAllWeightUpdateTimingResponseAmino {
    const obj: any = {};
    if (message.weightUpdateTiming) {
      obj.weight_update_timing = message.weightUpdateTiming.map(e => e ? WeightUpdateTiming.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.weight_update_timing = message.weightUpdateTiming;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWeightUpdateTimingResponseAminoMsg): QueryAllWeightUpdateTimingResponse {
    return QueryAllWeightUpdateTimingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWeightUpdateTimingResponseProtoMsg, useInterfaces: boolean = false): QueryAllWeightUpdateTimingResponse {
    return QueryAllWeightUpdateTimingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWeightUpdateTimingResponse): Uint8Array {
    return QueryAllWeightUpdateTimingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWeightUpdateTimingResponse): QueryAllWeightUpdateTimingResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWeightUpdateTimingResponse",
      value: QueryAllWeightUpdateTimingResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateSingleSwapRequest(): QuerySimulateSingleSwapRequest {
  return {
    swap: Swap.fromPartial({})
  };
}
export const QuerySimulateSingleSwapRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapRequest",
  encode(message: QuerySimulateSingleSwapRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.swap !== undefined) {
      Swap.encode(message.swap, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateSingleSwapRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateSingleSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swap = Swap.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateSingleSwapRequest>): QuerySimulateSingleSwapRequest {
    const message = createBaseQuerySimulateSingleSwapRequest();
    message.swap = object.swap !== undefined && object.swap !== null ? Swap.fromPartial(object.swap) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateSingleSwapRequestAmino): QuerySimulateSingleSwapRequest {
    const message = createBaseQuerySimulateSingleSwapRequest();
    if (object.swap !== undefined && object.swap !== null) {
      message.swap = Swap.fromAmino(object.swap);
    }
    return message;
  },
  toAmino(message: QuerySimulateSingleSwapRequest, useInterfaces: boolean = false): QuerySimulateSingleSwapRequestAmino {
    const obj: any = {};
    obj.swap = message.swap ? Swap.toAmino(message.swap, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateSingleSwapRequestAminoMsg): QuerySimulateSingleSwapRequest {
    return QuerySimulateSingleSwapRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateSingleSwapRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateSingleSwapRequest {
    return QuerySimulateSingleSwapRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateSingleSwapRequest): Uint8Array {
    return QuerySimulateSingleSwapRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateSingleSwapRequest): QuerySimulateSingleSwapRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapRequest",
      value: QuerySimulateSingleSwapRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateSingleSwapResponse(): QuerySimulateSingleSwapResponse {
  return {
    amountOut: Coin.fromPartial({}),
    amountIn: Coin.fromPartial({}),
    protocolFee: Coin.fromPartial({}),
    swapFee: Coin.fromPartial({})
  };
}
export const QuerySimulateSingleSwapResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapResponse",
  encode(message: QuerySimulateSingleSwapResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amountOut !== undefined) {
      Coin.encode(message.amountOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountIn !== undefined) {
      Coin.encode(message.amountIn, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.swapFee !== undefined) {
      Coin.encode(message.swapFee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateSingleSwapResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateSingleSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amountOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.swapFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateSingleSwapResponse>): QuerySimulateSingleSwapResponse {
    const message = createBaseQuerySimulateSingleSwapResponse();
    message.amountOut = object.amountOut !== undefined && object.amountOut !== null ? Coin.fromPartial(object.amountOut) : undefined;
    message.amountIn = object.amountIn !== undefined && object.amountIn !== null ? Coin.fromPartial(object.amountIn) : undefined;
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee !== undefined && object.swapFee !== null ? Coin.fromPartial(object.swapFee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateSingleSwapResponseAmino): QuerySimulateSingleSwapResponse {
    const message = createBaseQuerySimulateSingleSwapResponse();
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
    return message;
  },
  toAmino(message: QuerySimulateSingleSwapResponse, useInterfaces: boolean = false): QuerySimulateSingleSwapResponseAmino {
    const obj: any = {};
    obj.amount_out = message.amountOut ? Coin.toAmino(message.amountOut, useInterfaces) : undefined;
    obj.amount_in = message.amountIn ? Coin.toAmino(message.amountIn, useInterfaces) : undefined;
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    obj.swap_fee = message.swapFee ? Coin.toAmino(message.swapFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateSingleSwapResponseAminoMsg): QuerySimulateSingleSwapResponse {
    return QuerySimulateSingleSwapResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateSingleSwapResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateSingleSwapResponse {
    return QuerySimulateSingleSwapResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateSingleSwapResponse): Uint8Array {
    return QuerySimulateSingleSwapResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateSingleSwapResponse): QuerySimulateSingleSwapResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateSingleSwapResponse",
      value: QuerySimulateSingleSwapResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateInitializePoolRequest(): QuerySimulateInitializePoolRequest {
  return {
    poolId: BigInt(0),
    amountsIn: [],
    permanentVirtualBalances: []
  };
}
export const QuerySimulateInitializePoolRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolRequest",
  encode(message: QuerySimulateInitializePoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.permanentVirtualBalances) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateInitializePoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateInitializePoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.permanentVirtualBalances.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateInitializePoolRequest>): QuerySimulateInitializePoolRequest {
    const message = createBaseQuerySimulateInitializePoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.permanentVirtualBalances = object.permanentVirtualBalances?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateInitializePoolRequestAmino): QuerySimulateInitializePoolRequest {
    const message = createBaseQuerySimulateInitializePoolRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.permanentVirtualBalances = object.permanent_virtual_balances?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateInitializePoolRequest, useInterfaces: boolean = false): QuerySimulateInitializePoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.amountsIn) {
      obj.amounts_in = message.amountsIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_in = message.amountsIn;
    }
    if (message.permanentVirtualBalances) {
      obj.permanent_virtual_balances = message.permanentVirtualBalances.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.permanent_virtual_balances = message.permanentVirtualBalances;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySimulateInitializePoolRequestAminoMsg): QuerySimulateInitializePoolRequest {
    return QuerySimulateInitializePoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateInitializePoolRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateInitializePoolRequest {
    return QuerySimulateInitializePoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateInitializePoolRequest): Uint8Array {
    return QuerySimulateInitializePoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateInitializePoolRequest): QuerySimulateInitializePoolRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolRequest",
      value: QuerySimulateInitializePoolRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateInitializePoolResponse(): QuerySimulateInitializePoolResponse {
  return {
    lptOut: Coin.fromPartial({}),
    amountsIn: [],
    protocolFee: []
  };
}
export const QuerySimulateInitializePoolResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolResponse",
  encode(message: QuerySimulateInitializePoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.protocolFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateInitializePoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateInitializePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.protocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateInitializePoolResponse>): QuerySimulateInitializePoolResponse {
    const message = createBaseQuerySimulateInitializePoolResponse();
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateInitializePoolResponseAmino): QuerySimulateInitializePoolResponse {
    const message = createBaseQuerySimulateInitializePoolResponse();
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.protocolFee = object.protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateInitializePoolResponse, useInterfaces: boolean = false): QuerySimulateInitializePoolResponseAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: QuerySimulateInitializePoolResponseAminoMsg): QuerySimulateInitializePoolResponse {
    return QuerySimulateInitializePoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateInitializePoolResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateInitializePoolResponse {
    return QuerySimulateInitializePoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateInitializePoolResponse): Uint8Array {
    return QuerySimulateInitializePoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateInitializePoolResponse): QuerySimulateInitializePoolResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateInitializePoolResponse",
      value: QuerySimulateInitializePoolResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinAllTokensExactLptRequest(): QuerySimulateJoinAllTokensExactLptRequest {
  return {
    poolId: BigInt(0),
    lptOut: ""
  };
}
export const QuerySimulateJoinAllTokensExactLptRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptRequest",
  encode(message: QuerySimulateJoinAllTokensExactLptRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lptOut !== "") {
      writer.uint32(18).string(message.lptOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinAllTokensExactLptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lptOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinAllTokensExactLptRequest>): QuerySimulateJoinAllTokensExactLptRequest {
    const message = createBaseQuerySimulateJoinAllTokensExactLptRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptOut = object.lptOut ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateJoinAllTokensExactLptRequestAmino): QuerySimulateJoinAllTokensExactLptRequest {
    const message = createBaseQuerySimulateJoinAllTokensExactLptRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = object.lpt_out;
    }
    return message;
  },
  toAmino(message: QuerySimulateJoinAllTokensExactLptRequest, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_out = message.lptOut === "" ? undefined : message.lptOut;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinAllTokensExactLptRequestAminoMsg): QuerySimulateJoinAllTokensExactLptRequest {
    return QuerySimulateJoinAllTokensExactLptRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinAllTokensExactLptRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptRequest {
    return QuerySimulateJoinAllTokensExactLptRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinAllTokensExactLptRequest): Uint8Array {
    return QuerySimulateJoinAllTokensExactLptRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinAllTokensExactLptRequest): QuerySimulateJoinAllTokensExactLptRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptRequest",
      value: QuerySimulateJoinAllTokensExactLptRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinAllTokensExactLptResponse(): QuerySimulateJoinAllTokensExactLptResponse {
  return {
    lptOut: Coin.fromPartial({}),
    amountsIn: [],
    protocolFee: []
  };
}
export const QuerySimulateJoinAllTokensExactLptResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptResponse",
  encode(message: QuerySimulateJoinAllTokensExactLptResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.protocolFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinAllTokensExactLptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.protocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinAllTokensExactLptResponse>): QuerySimulateJoinAllTokensExactLptResponse {
    const message = createBaseQuerySimulateJoinAllTokensExactLptResponse();
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateJoinAllTokensExactLptResponseAmino): QuerySimulateJoinAllTokensExactLptResponse {
    const message = createBaseQuerySimulateJoinAllTokensExactLptResponse();
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.protocolFee = object.protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateJoinAllTokensExactLptResponse, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptResponseAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinAllTokensExactLptResponseAminoMsg): QuerySimulateJoinAllTokensExactLptResponse {
    return QuerySimulateJoinAllTokensExactLptResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinAllTokensExactLptResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinAllTokensExactLptResponse {
    return QuerySimulateJoinAllTokensExactLptResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinAllTokensExactLptResponse): Uint8Array {
    return QuerySimulateJoinAllTokensExactLptResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinAllTokensExactLptResponse): QuerySimulateJoinAllTokensExactLptResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinAllTokensExactLptResponse",
      value: QuerySimulateJoinAllTokensExactLptResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinExactTokensRequest(): QuerySimulateJoinExactTokensRequest {
  return {
    poolId: BigInt(0),
    amountsIn: []
  };
}
export const QuerySimulateJoinExactTokensRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensRequest",
  encode(message: QuerySimulateJoinExactTokensRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinExactTokensRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinExactTokensRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinExactTokensRequest>): QuerySimulateJoinExactTokensRequest {
    const message = createBaseQuerySimulateJoinExactTokensRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateJoinExactTokensRequestAmino): QuerySimulateJoinExactTokensRequest {
    const message = createBaseQuerySimulateJoinExactTokensRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateJoinExactTokensRequest, useInterfaces: boolean = false): QuerySimulateJoinExactTokensRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.amountsIn) {
      obj.amounts_in = message.amountsIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_in = message.amountsIn;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinExactTokensRequestAminoMsg): QuerySimulateJoinExactTokensRequest {
    return QuerySimulateJoinExactTokensRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinExactTokensRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinExactTokensRequest {
    return QuerySimulateJoinExactTokensRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinExactTokensRequest): Uint8Array {
    return QuerySimulateJoinExactTokensRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinExactTokensRequest): QuerySimulateJoinExactTokensRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensRequest",
      value: QuerySimulateJoinExactTokensRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinExactTokensResponse(): QuerySimulateJoinExactTokensResponse {
  return {
    lptOut: Coin.fromPartial({}),
    amountsIn: [],
    protocolFee: [],
    swapFee: []
  };
}
export const QuerySimulateJoinExactTokensResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensResponse",
  encode(message: QuerySimulateJoinExactTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.protocolFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinExactTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinExactTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.protocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinExactTokensResponse>): QuerySimulateJoinExactTokensResponse {
    const message = createBaseQuerySimulateJoinExactTokensResponse();
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateJoinExactTokensResponseAmino): QuerySimulateJoinExactTokensResponse {
    const message = createBaseQuerySimulateJoinExactTokensResponse();
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
    }
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.protocolFee = object.protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateJoinExactTokensResponse, useInterfaces: boolean = false): QuerySimulateJoinExactTokensResponseAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinExactTokensResponseAminoMsg): QuerySimulateJoinExactTokensResponse {
    return QuerySimulateJoinExactTokensResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinExactTokensResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinExactTokensResponse {
    return QuerySimulateJoinExactTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinExactTokensResponse): Uint8Array {
    return QuerySimulateJoinExactTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinExactTokensResponse): QuerySimulateJoinExactTokensResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinExactTokensResponse",
      value: QuerySimulateJoinExactTokensResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateZeroImpactJoinYammRequest(): QuerySimulateZeroImpactJoinYammRequest {
  return {
    cAmountIn: Coin.fromPartial({})
  };
}
export const QuerySimulateZeroImpactJoinYammRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammRequest",
  encode(message: QuerySimulateZeroImpactJoinYammRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cAmountIn !== undefined) {
      Coin.encode(message.cAmountIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateZeroImpactJoinYammRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cAmountIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateZeroImpactJoinYammRequest>): QuerySimulateZeroImpactJoinYammRequest {
    const message = createBaseQuerySimulateZeroImpactJoinYammRequest();
    message.cAmountIn = object.cAmountIn !== undefined && object.cAmountIn !== null ? Coin.fromPartial(object.cAmountIn) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateZeroImpactJoinYammRequestAmino): QuerySimulateZeroImpactJoinYammRequest {
    const message = createBaseQuerySimulateZeroImpactJoinYammRequest();
    if (object.c_amount_in !== undefined && object.c_amount_in !== null) {
      message.cAmountIn = Coin.fromAmino(object.c_amount_in);
    }
    return message;
  },
  toAmino(message: QuerySimulateZeroImpactJoinYammRequest, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammRequestAmino {
    const obj: any = {};
    obj.c_amount_in = message.cAmountIn ? Coin.toAmino(message.cAmountIn, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateZeroImpactJoinYammRequestAminoMsg): QuerySimulateZeroImpactJoinYammRequest {
    return QuerySimulateZeroImpactJoinYammRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateZeroImpactJoinYammRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammRequest {
    return QuerySimulateZeroImpactJoinYammRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateZeroImpactJoinYammRequest): Uint8Array {
    return QuerySimulateZeroImpactJoinYammRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateZeroImpactJoinYammRequest): QuerySimulateZeroImpactJoinYammRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammRequest",
      value: QuerySimulateZeroImpactJoinYammRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateZeroImpactJoinYammResponse(): QuerySimulateZeroImpactJoinYammResponse {
  return {
    lptOut: Coin.fromPartial({}),
    yOut: [],
    refractFee: Coin.fromPartial({}),
    joinProtocolFee: [],
    swapFee: []
  };
}
export const QuerySimulateZeroImpactJoinYammResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammResponse",
  encode(message: QuerySimulateZeroImpactJoinYammResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.yOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.refractFee !== undefined) {
      Coin.encode(message.refractFee, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.joinProtocolFee) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateZeroImpactJoinYammResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.yOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.refractFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.joinProtocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateZeroImpactJoinYammResponse>): QuerySimulateZeroImpactJoinYammResponse {
    const message = createBaseQuerySimulateZeroImpactJoinYammResponse();
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.yOut = object.yOut?.map(e => Coin.fromPartial(e)) || [];
    message.refractFee = object.refractFee !== undefined && object.refractFee !== null ? Coin.fromPartial(object.refractFee) : undefined;
    message.joinProtocolFee = object.joinProtocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateZeroImpactJoinYammResponseAmino): QuerySimulateZeroImpactJoinYammResponse {
    const message = createBaseQuerySimulateZeroImpactJoinYammResponse();
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
    }
    message.yOut = object.y_out?.map(e => Coin.fromAmino(e)) || [];
    if (object.refract_fee !== undefined && object.refract_fee !== null) {
      message.refractFee = Coin.fromAmino(object.refract_fee);
    }
    message.joinProtocolFee = object.join_protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateZeroImpactJoinYammResponse, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammResponseAmino {
    const obj: any = {};
    obj.lpt_out = message.lptOut ? Coin.toAmino(message.lptOut, useInterfaces) : undefined;
    if (message.yOut) {
      obj.y_out = message.yOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.y_out = message.yOut;
    }
    obj.refract_fee = message.refractFee ? Coin.toAmino(message.refractFee, useInterfaces) : undefined;
    if (message.joinProtocolFee) {
      obj.join_protocol_fee = message.joinProtocolFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.join_protocol_fee = message.joinProtocolFee;
    }
    if (message.swapFee) {
      obj.swap_fee = message.swapFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.swap_fee = message.swapFee;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySimulateZeroImpactJoinYammResponseAminoMsg): QuerySimulateZeroImpactJoinYammResponse {
    return QuerySimulateZeroImpactJoinYammResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateZeroImpactJoinYammResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateZeroImpactJoinYammResponse {
    return QuerySimulateZeroImpactJoinYammResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateZeroImpactJoinYammResponse): Uint8Array {
    return QuerySimulateZeroImpactJoinYammResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateZeroImpactJoinYammResponse): QuerySimulateZeroImpactJoinYammResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateZeroImpactJoinYammResponse",
      value: QuerySimulateZeroImpactJoinYammResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinTokenExactLptRequest(): QuerySimulateJoinTokenExactLptRequest {
  return {
    poolId: BigInt(0),
    lptOut: "",
    tokenIn: ""
  };
}
export const QuerySimulateJoinTokenExactLptRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptRequest",
  encode(message: QuerySimulateJoinTokenExactLptRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lptOut !== "") {
      writer.uint32(18).string(message.lptOut);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinTokenExactLptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lptOut = reader.string();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinTokenExactLptRequest>): QuerySimulateJoinTokenExactLptRequest {
    const message = createBaseQuerySimulateJoinTokenExactLptRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptOut = object.lptOut ?? "";
    message.tokenIn = object.tokenIn ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateJoinTokenExactLptRequestAmino): QuerySimulateJoinTokenExactLptRequest {
    const message = createBaseQuerySimulateJoinTokenExactLptRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = object.lpt_out;
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    return message;
  },
  toAmino(message: QuerySimulateJoinTokenExactLptRequest, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_out = message.lptOut === "" ? undefined : message.lptOut;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinTokenExactLptRequestAminoMsg): QuerySimulateJoinTokenExactLptRequest {
    return QuerySimulateJoinTokenExactLptRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinTokenExactLptRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptRequest {
    return QuerySimulateJoinTokenExactLptRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinTokenExactLptRequest): Uint8Array {
    return QuerySimulateJoinTokenExactLptRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinTokenExactLptRequest): QuerySimulateJoinTokenExactLptRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptRequest",
      value: QuerySimulateJoinTokenExactLptRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateJoinTokenExactLptResponse(): QuerySimulateJoinTokenExactLptResponse {
  return {
    lptOut: Coin.fromPartial({}),
    amountIn: Coin.fromPartial({}),
    protocolFee: Coin.fromPartial({}),
    swapFee: Coin.fromPartial({})
  };
}
export const QuerySimulateJoinTokenExactLptResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptResponse",
  encode(message: QuerySimulateJoinTokenExactLptResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptOut !== undefined) {
      Coin.encode(message.lptOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountIn !== undefined) {
      Coin.encode(message.amountIn, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.swapFee !== undefined) {
      Coin.encode(message.swapFee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateJoinTokenExactLptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.swapFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateJoinTokenExactLptResponse>): QuerySimulateJoinTokenExactLptResponse {
    const message = createBaseQuerySimulateJoinTokenExactLptResponse();
    message.lptOut = object.lptOut !== undefined && object.lptOut !== null ? Coin.fromPartial(object.lptOut) : undefined;
    message.amountIn = object.amountIn !== undefined && object.amountIn !== null ? Coin.fromPartial(object.amountIn) : undefined;
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee !== undefined && object.swapFee !== null ? Coin.fromPartial(object.swapFee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateJoinTokenExactLptResponseAmino): QuerySimulateJoinTokenExactLptResponse {
    const message = createBaseQuerySimulateJoinTokenExactLptResponse();
    if (object.lpt_out !== undefined && object.lpt_out !== null) {
      message.lptOut = Coin.fromAmino(object.lpt_out);
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
    return message;
  },
  toAmino(message: QuerySimulateJoinTokenExactLptResponse, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptResponseAmino {
    const obj: any = {};
    obj.lpt_out = message.lptOut ? Coin.toAmino(message.lptOut, useInterfaces) : undefined;
    obj.amount_in = message.amountIn ? Coin.toAmino(message.amountIn, useInterfaces) : undefined;
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    obj.swap_fee = message.swapFee ? Coin.toAmino(message.swapFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateJoinTokenExactLptResponseAminoMsg): QuerySimulateJoinTokenExactLptResponse {
    return QuerySimulateJoinTokenExactLptResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateJoinTokenExactLptResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateJoinTokenExactLptResponse {
    return QuerySimulateJoinTokenExactLptResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateJoinTokenExactLptResponse): Uint8Array {
    return QuerySimulateJoinTokenExactLptResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateJoinTokenExactLptResponse): QuerySimulateJoinTokenExactLptResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateJoinTokenExactLptResponse",
      value: QuerySimulateJoinTokenExactLptResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitTokenExactLptRequest(): QuerySimulateExitTokenExactLptRequest {
  return {
    poolId: BigInt(0),
    lptIn: "",
    tokenOut: ""
  };
}
export const QuerySimulateExitTokenExactLptRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptRequest",
  encode(message: QuerySimulateExitTokenExactLptRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lptIn !== "") {
      writer.uint32(18).string(message.lptIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitTokenExactLptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lptIn = reader.string();
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
  fromPartial(object: Partial<QuerySimulateExitTokenExactLptRequest>): QuerySimulateExitTokenExactLptRequest {
    const message = createBaseQuerySimulateExitTokenExactLptRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptIn = object.lptIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateExitTokenExactLptRequestAmino): QuerySimulateExitTokenExactLptRequest {
    const message = createBaseQuerySimulateExitTokenExactLptRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = object.lpt_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: QuerySimulateExitTokenExactLptRequest, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_in = message.lptIn === "" ? undefined : message.lptIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitTokenExactLptRequestAminoMsg): QuerySimulateExitTokenExactLptRequest {
    return QuerySimulateExitTokenExactLptRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitTokenExactLptRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptRequest {
    return QuerySimulateExitTokenExactLptRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitTokenExactLptRequest): Uint8Array {
    return QuerySimulateExitTokenExactLptRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitTokenExactLptRequest): QuerySimulateExitTokenExactLptRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptRequest",
      value: QuerySimulateExitTokenExactLptRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitTokenExactLptResponse(): QuerySimulateExitTokenExactLptResponse {
  return {
    lptIn: Coin.fromPartial({}),
    amountOut: Coin.fromPartial({}),
    protocolFee: Coin.fromPartial({}),
    swapFee: Coin.fromPartial({})
  };
}
export const QuerySimulateExitTokenExactLptResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptResponse",
  encode(message: QuerySimulateExitTokenExactLptResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptIn !== undefined) {
      Coin.encode(message.lptIn, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountOut !== undefined) {
      Coin.encode(message.amountOut, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.swapFee !== undefined) {
      Coin.encode(message.swapFee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitTokenExactLptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.swapFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateExitTokenExactLptResponse>): QuerySimulateExitTokenExactLptResponse {
    const message = createBaseQuerySimulateExitTokenExactLptResponse();
    message.lptIn = object.lptIn !== undefined && object.lptIn !== null ? Coin.fromPartial(object.lptIn) : undefined;
    message.amountOut = object.amountOut !== undefined && object.amountOut !== null ? Coin.fromPartial(object.amountOut) : undefined;
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee !== undefined && object.swapFee !== null ? Coin.fromPartial(object.swapFee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateExitTokenExactLptResponseAmino): QuerySimulateExitTokenExactLptResponse {
    const message = createBaseQuerySimulateExitTokenExactLptResponse();
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = Coin.fromAmino(object.lpt_in);
    }
    if (object.amount_out !== undefined && object.amount_out !== null) {
      message.amountOut = Coin.fromAmino(object.amount_out);
    }
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = Coin.fromAmino(object.protocol_fee);
    }
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = Coin.fromAmino(object.swap_fee);
    }
    return message;
  },
  toAmino(message: QuerySimulateExitTokenExactLptResponse, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptResponseAmino {
    const obj: any = {};
    obj.lpt_in = message.lptIn ? Coin.toAmino(message.lptIn, useInterfaces) : undefined;
    obj.amount_out = message.amountOut ? Coin.toAmino(message.amountOut, useInterfaces) : undefined;
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    obj.swap_fee = message.swapFee ? Coin.toAmino(message.swapFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitTokenExactLptResponseAminoMsg): QuerySimulateExitTokenExactLptResponse {
    return QuerySimulateExitTokenExactLptResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitTokenExactLptResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateExitTokenExactLptResponse {
    return QuerySimulateExitTokenExactLptResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitTokenExactLptResponse): Uint8Array {
    return QuerySimulateExitTokenExactLptResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitTokenExactLptResponse): QuerySimulateExitTokenExactLptResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitTokenExactLptResponse",
      value: QuerySimulateExitTokenExactLptResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitExactTokensRequest(): QuerySimulateExitExactTokensRequest {
  return {
    poolId: BigInt(0),
    amountsOut: []
  };
}
export const QuerySimulateExitExactTokensRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensRequest",
  encode(message: QuerySimulateExitExactTokensRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitExactTokensRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitExactTokensRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateExitExactTokensRequest>): QuerySimulateExitExactTokensRequest {
    const message = createBaseQuerySimulateExitExactTokensRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateExitExactTokensRequestAmino): QuerySimulateExitExactTokensRequest {
    const message = createBaseQuerySimulateExitExactTokensRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateExitExactTokensRequest, useInterfaces: boolean = false): QuerySimulateExitExactTokensRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.amountsOut) {
      obj.amounts_out = message.amountsOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_out = message.amountsOut;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitExactTokensRequestAminoMsg): QuerySimulateExitExactTokensRequest {
    return QuerySimulateExitExactTokensRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitExactTokensRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateExitExactTokensRequest {
    return QuerySimulateExitExactTokensRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitExactTokensRequest): Uint8Array {
    return QuerySimulateExitExactTokensRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitExactTokensRequest): QuerySimulateExitExactTokensRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensRequest",
      value: QuerySimulateExitExactTokensRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitExactTokensResponse(): QuerySimulateExitExactTokensResponse {
  return {
    lptIn: Coin.fromPartial({}),
    amountsOut: [],
    protocolFee: Coin.fromPartial({}),
    swapFee: []
  };
}
export const QuerySimulateExitExactTokensResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensResponse",
  encode(message: QuerySimulateExitExactTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptIn !== undefined) {
      Coin.encode(message.lptIn, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitExactTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitExactTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateExitExactTokensResponse>): QuerySimulateExitExactTokensResponse {
    const message = createBaseQuerySimulateExitExactTokensResponse();
    message.lptIn = object.lptIn !== undefined && object.lptIn !== null ? Coin.fromPartial(object.lptIn) : undefined;
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateExitExactTokensResponseAmino): QuerySimulateExitExactTokensResponse {
    const message = createBaseQuerySimulateExitExactTokensResponse();
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = Coin.fromAmino(object.lpt_in);
    }
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = Coin.fromAmino(object.protocol_fee);
    }
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateExitExactTokensResponse, useInterfaces: boolean = false): QuerySimulateExitExactTokensResponseAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitExactTokensResponseAminoMsg): QuerySimulateExitExactTokensResponse {
    return QuerySimulateExitExactTokensResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitExactTokensResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateExitExactTokensResponse {
    return QuerySimulateExitExactTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitExactTokensResponse): Uint8Array {
    return QuerySimulateExitExactTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitExactTokensResponse): QuerySimulateExitExactTokensResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitExactTokensResponse",
      value: QuerySimulateExitExactTokensResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitAllTokensExactLptRequest(): QuerySimulateExitAllTokensExactLptRequest {
  return {
    poolId: BigInt(0),
    lptIn: ""
  };
}
export const QuerySimulateExitAllTokensExactLptRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptRequest",
  encode(message: QuerySimulateExitAllTokensExactLptRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lptIn !== "") {
      writer.uint32(18).string(message.lptIn);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitAllTokensExactLptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lptIn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateExitAllTokensExactLptRequest>): QuerySimulateExitAllTokensExactLptRequest {
    const message = createBaseQuerySimulateExitAllTokensExactLptRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lptIn = object.lptIn ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateExitAllTokensExactLptRequestAmino): QuerySimulateExitAllTokensExactLptRequest {
    const message = createBaseQuerySimulateExitAllTokensExactLptRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = object.lpt_in;
    }
    return message;
  },
  toAmino(message: QuerySimulateExitAllTokensExactLptRequest, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lpt_in = message.lptIn === "" ? undefined : message.lptIn;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitAllTokensExactLptRequestAminoMsg): QuerySimulateExitAllTokensExactLptRequest {
    return QuerySimulateExitAllTokensExactLptRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitAllTokensExactLptRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptRequest {
    return QuerySimulateExitAllTokensExactLptRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitAllTokensExactLptRequest): Uint8Array {
    return QuerySimulateExitAllTokensExactLptRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitAllTokensExactLptRequest): QuerySimulateExitAllTokensExactLptRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptRequest",
      value: QuerySimulateExitAllTokensExactLptRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateExitAllTokensExactLptResponse(): QuerySimulateExitAllTokensExactLptResponse {
  return {
    lptIn: Coin.fromPartial({}),
    amountsOut: [],
    protocolFee: Coin.fromPartial({})
  };
}
export const QuerySimulateExitAllTokensExactLptResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptResponse",
  encode(message: QuerySimulateExitAllTokensExactLptResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lptIn !== undefined) {
      Coin.encode(message.lptIn, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolFee !== undefined) {
      Coin.encode(message.protocolFee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateExitAllTokensExactLptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lptIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.protocolFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateExitAllTokensExactLptResponse>): QuerySimulateExitAllTokensExactLptResponse {
    const message = createBaseQuerySimulateExitAllTokensExactLptResponse();
    message.lptIn = object.lptIn !== undefined && object.lptIn !== null ? Coin.fromPartial(object.lptIn) : undefined;
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.protocolFee = object.protocolFee !== undefined && object.protocolFee !== null ? Coin.fromPartial(object.protocolFee) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateExitAllTokensExactLptResponseAmino): QuerySimulateExitAllTokensExactLptResponse {
    const message = createBaseQuerySimulateExitAllTokensExactLptResponse();
    if (object.lpt_in !== undefined && object.lpt_in !== null) {
      message.lptIn = Coin.fromAmino(object.lpt_in);
    }
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = Coin.fromAmino(object.protocol_fee);
    }
    return message;
  },
  toAmino(message: QuerySimulateExitAllTokensExactLptResponse, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptResponseAmino {
    const obj: any = {};
    obj.lpt_in = message.lptIn ? Coin.toAmino(message.lptIn, useInterfaces) : undefined;
    if (message.amountsOut) {
      obj.amounts_out = message.amountsOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amounts_out = message.amountsOut;
    }
    obj.protocol_fee = message.protocolFee ? Coin.toAmino(message.protocolFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateExitAllTokensExactLptResponseAminoMsg): QuerySimulateExitAllTokensExactLptResponse {
    return QuerySimulateExitAllTokensExactLptResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateExitAllTokensExactLptResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateExitAllTokensExactLptResponse {
    return QuerySimulateExitAllTokensExactLptResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateExitAllTokensExactLptResponse): Uint8Array {
    return QuerySimulateExitAllTokensExactLptResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateExitAllTokensExactLptResponse): QuerySimulateExitAllTokensExactLptResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateExitAllTokensExactLptResponse",
      value: QuerySimulateExitAllTokensExactLptResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpotPriceRequest(): QuerySpotPriceRequest {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    applyFee: false
  };
}
export const QuerySpotPriceRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySpotPriceRequest",
  encode(message: QuerySpotPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    if (message.applyFee === true) {
      writer.uint32(32).bool(message.applyFee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySpotPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpotPriceRequest();
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
          message.applyFee = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySpotPriceRequest>): QuerySpotPriceRequest {
    const message = createBaseQuerySpotPriceRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.applyFee = object.applyFee ?? false;
    return message;
  },
  fromAmino(object: QuerySpotPriceRequestAmino): QuerySpotPriceRequest {
    const message = createBaseQuerySpotPriceRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    if (object.apply_fee !== undefined && object.apply_fee !== null) {
      message.applyFee = object.apply_fee;
    }
    return message;
  },
  toAmino(message: QuerySpotPriceRequest, useInterfaces: boolean = false): QuerySpotPriceRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.apply_fee = message.applyFee === false ? undefined : message.applyFee;
    return obj;
  },
  fromAminoMsg(object: QuerySpotPriceRequestAminoMsg): QuerySpotPriceRequest {
    return QuerySpotPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpotPriceRequestProtoMsg, useInterfaces: boolean = false): QuerySpotPriceRequest {
    return QuerySpotPriceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySpotPriceRequest): Uint8Array {
    return QuerySpotPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpotPriceRequest): QuerySpotPriceRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySpotPriceRequest",
      value: QuerySpotPriceRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySpotPriceResponse(): QuerySpotPriceResponse {
  return {
    spotPrice: ""
  };
}
export const QuerySpotPriceResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySpotPriceResponse",
  encode(message: QuerySpotPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spotPrice !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.spotPrice, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySpotPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpotPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spotPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySpotPriceResponse>): QuerySpotPriceResponse {
    const message = createBaseQuerySpotPriceResponse();
    message.spotPrice = object.spotPrice ?? "";
    return message;
  },
  fromAmino(object: QuerySpotPriceResponseAmino): QuerySpotPriceResponse {
    const message = createBaseQuerySpotPriceResponse();
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = object.spot_price;
    }
    return message;
  },
  toAmino(message: QuerySpotPriceResponse, useInterfaces: boolean = false): QuerySpotPriceResponseAmino {
    const obj: any = {};
    obj.spot_price = message.spotPrice === "" ? undefined : message.spotPrice;
    return obj;
  },
  fromAminoMsg(object: QuerySpotPriceResponseAminoMsg): QuerySpotPriceResponse {
    return QuerySpotPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpotPriceResponseProtoMsg, useInterfaces: boolean = false): QuerySpotPriceResponse {
    return QuerySpotPriceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySpotPriceResponse): Uint8Array {
    return QuerySpotPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySpotPriceResponse): QuerySpotPriceResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySpotPriceResponse",
      value: QuerySpotPriceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetIntroducingPoolTokenRequest(): QueryGetIntroducingPoolTokenRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetIntroducingPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenRequest",
  encode(message: QueryGetIntroducingPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetIntroducingPoolTokenRequest();
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
  fromPartial(object: Partial<QueryGetIntroducingPoolTokenRequest>): QueryGetIntroducingPoolTokenRequest {
    const message = createBaseQueryGetIntroducingPoolTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetIntroducingPoolTokenRequestAmino): QueryGetIntroducingPoolTokenRequest {
    const message = createBaseQueryGetIntroducingPoolTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetIntroducingPoolTokenRequest, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetIntroducingPoolTokenRequestAminoMsg): QueryGetIntroducingPoolTokenRequest {
    return QueryGetIntroducingPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetIntroducingPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenRequest {
    return QueryGetIntroducingPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetIntroducingPoolTokenRequest): Uint8Array {
    return QueryGetIntroducingPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetIntroducingPoolTokenRequest): QueryGetIntroducingPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenRequest",
      value: QueryGetIntroducingPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetIntroducingPoolTokenResponse(): QueryGetIntroducingPoolTokenResponse {
  return {
    introducingPoolToken: TemporalVirtualBalancePoolToken.fromPartial({})
  };
}
export const QueryGetIntroducingPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenResponse",
  encode(message: QueryGetIntroducingPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.introducingPoolToken !== undefined) {
      TemporalVirtualBalancePoolToken.encode(message.introducingPoolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetIntroducingPoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.introducingPoolToken = TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetIntroducingPoolTokenResponse>): QueryGetIntroducingPoolTokenResponse {
    const message = createBaseQueryGetIntroducingPoolTokenResponse();
    message.introducingPoolToken = object.introducingPoolToken !== undefined && object.introducingPoolToken !== null ? TemporalVirtualBalancePoolToken.fromPartial(object.introducingPoolToken) : undefined;
    return message;
  },
  fromAmino(object: QueryGetIntroducingPoolTokenResponseAmino): QueryGetIntroducingPoolTokenResponse {
    const message = createBaseQueryGetIntroducingPoolTokenResponse();
    if (object.introducing_pool_token !== undefined && object.introducing_pool_token !== null) {
      message.introducingPoolToken = TemporalVirtualBalancePoolToken.fromAmino(object.introducing_pool_token);
    }
    return message;
  },
  toAmino(message: QueryGetIntroducingPoolTokenResponse, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenResponseAmino {
    const obj: any = {};
    obj.introducing_pool_token = message.introducingPoolToken ? TemporalVirtualBalancePoolToken.toAmino(message.introducingPoolToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetIntroducingPoolTokenResponseAminoMsg): QueryGetIntroducingPoolTokenResponse {
    return QueryGetIntroducingPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetIntroducingPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryGetIntroducingPoolTokenResponse {
    return QueryGetIntroducingPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetIntroducingPoolTokenResponse): Uint8Array {
    return QueryGetIntroducingPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetIntroducingPoolTokenResponse): QueryGetIntroducingPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetIntroducingPoolTokenResponse",
      value: QueryGetIntroducingPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllIntroducingPoolTokenRequest(): QueryAllIntroducingPoolTokenRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllIntroducingPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenRequest",
  encode(message: QueryAllIntroducingPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIntroducingPoolTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllIntroducingPoolTokenRequest>): QueryAllIntroducingPoolTokenRequest {
    const message = createBaseQueryAllIntroducingPoolTokenRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllIntroducingPoolTokenRequestAmino): QueryAllIntroducingPoolTokenRequest {
    const message = createBaseQueryAllIntroducingPoolTokenRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllIntroducingPoolTokenRequest, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllIntroducingPoolTokenRequestAminoMsg): QueryAllIntroducingPoolTokenRequest {
    return QueryAllIntroducingPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllIntroducingPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenRequest {
    return QueryAllIntroducingPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllIntroducingPoolTokenRequest): Uint8Array {
    return QueryAllIntroducingPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllIntroducingPoolTokenRequest): QueryAllIntroducingPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenRequest",
      value: QueryAllIntroducingPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllIntroducingPoolTokenResponse(): QueryAllIntroducingPoolTokenResponse {
  return {
    introducingPoolToken: [],
    pagination: undefined
  };
}
export const QueryAllIntroducingPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenResponse",
  encode(message: QueryAllIntroducingPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.introducingPoolToken) {
      TemporalVirtualBalancePoolToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIntroducingPoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.introducingPoolToken.push(TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllIntroducingPoolTokenResponse>): QueryAllIntroducingPoolTokenResponse {
    const message = createBaseQueryAllIntroducingPoolTokenResponse();
    message.introducingPoolToken = object.introducingPoolToken?.map(e => TemporalVirtualBalancePoolToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllIntroducingPoolTokenResponseAmino): QueryAllIntroducingPoolTokenResponse {
    const message = createBaseQueryAllIntroducingPoolTokenResponse();
    message.introducingPoolToken = object.introducing_pool_token?.map(e => TemporalVirtualBalancePoolToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllIntroducingPoolTokenResponse, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenResponseAmino {
    const obj: any = {};
    if (message.introducingPoolToken) {
      obj.introducing_pool_token = message.introducingPoolToken.map(e => e ? TemporalVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.introducing_pool_token = message.introducingPoolToken;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllIntroducingPoolTokenResponseAminoMsg): QueryAllIntroducingPoolTokenResponse {
    return QueryAllIntroducingPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllIntroducingPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryAllIntroducingPoolTokenResponse {
    return QueryAllIntroducingPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllIntroducingPoolTokenResponse): Uint8Array {
    return QueryAllIntroducingPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllIntroducingPoolTokenResponse): QueryAllIntroducingPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllIntroducingPoolTokenResponse",
      value: QueryAllIntroducingPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPermanentVirtualBalancePoolTokenRequest(): QueryGetPermanentVirtualBalancePoolTokenRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetPermanentVirtualBalancePoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenRequest",
  encode(message: QueryGetPermanentVirtualBalancePoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenRequest();
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
  fromPartial(object: Partial<QueryGetPermanentVirtualBalancePoolTokenRequest>): QueryGetPermanentVirtualBalancePoolTokenRequest {
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetPermanentVirtualBalancePoolTokenRequestAmino): QueryGetPermanentVirtualBalancePoolTokenRequest {
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetPermanentVirtualBalancePoolTokenRequest, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetPermanentVirtualBalancePoolTokenRequestAminoMsg): QueryGetPermanentVirtualBalancePoolTokenRequest {
    return QueryGetPermanentVirtualBalancePoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPermanentVirtualBalancePoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenRequest {
    return QueryGetPermanentVirtualBalancePoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPermanentVirtualBalancePoolTokenRequest): Uint8Array {
    return QueryGetPermanentVirtualBalancePoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPermanentVirtualBalancePoolTokenRequest): QueryGetPermanentVirtualBalancePoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenRequest",
      value: QueryGetPermanentVirtualBalancePoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPermanentVirtualBalancePoolTokenResponse(): QueryGetPermanentVirtualBalancePoolTokenResponse {
  return {
    permanentVirtualBalancePoolToken: PermanentVirtualBalancePoolToken.fromPartial({})
  };
}
export const QueryGetPermanentVirtualBalancePoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenResponse",
  encode(message: QueryGetPermanentVirtualBalancePoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.permanentVirtualBalancePoolToken !== undefined) {
      PermanentVirtualBalancePoolToken.encode(message.permanentVirtualBalancePoolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permanentVirtualBalancePoolToken = PermanentVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPermanentVirtualBalancePoolTokenResponse>): QueryGetPermanentVirtualBalancePoolTokenResponse {
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenResponse();
    message.permanentVirtualBalancePoolToken = object.permanentVirtualBalancePoolToken !== undefined && object.permanentVirtualBalancePoolToken !== null ? PermanentVirtualBalancePoolToken.fromPartial(object.permanentVirtualBalancePoolToken) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPermanentVirtualBalancePoolTokenResponseAmino): QueryGetPermanentVirtualBalancePoolTokenResponse {
    const message = createBaseQueryGetPermanentVirtualBalancePoolTokenResponse();
    if (object.permanent_virtual_balance_pool_token !== undefined && object.permanent_virtual_balance_pool_token !== null) {
      message.permanentVirtualBalancePoolToken = PermanentVirtualBalancePoolToken.fromAmino(object.permanent_virtual_balance_pool_token);
    }
    return message;
  },
  toAmino(message: QueryGetPermanentVirtualBalancePoolTokenResponse, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenResponseAmino {
    const obj: any = {};
    obj.permanent_virtual_balance_pool_token = message.permanentVirtualBalancePoolToken ? PermanentVirtualBalancePoolToken.toAmino(message.permanentVirtualBalancePoolToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPermanentVirtualBalancePoolTokenResponseAminoMsg): QueryGetPermanentVirtualBalancePoolTokenResponse {
    return QueryGetPermanentVirtualBalancePoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPermanentVirtualBalancePoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryGetPermanentVirtualBalancePoolTokenResponse {
    return QueryGetPermanentVirtualBalancePoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPermanentVirtualBalancePoolTokenResponse): Uint8Array {
    return QueryGetPermanentVirtualBalancePoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPermanentVirtualBalancePoolTokenResponse): QueryGetPermanentVirtualBalancePoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPermanentVirtualBalancePoolTokenResponse",
      value: QueryGetPermanentVirtualBalancePoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPermanentVirtualBalancePoolTokenRequest(): QueryAllPermanentVirtualBalancePoolTokenRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPermanentVirtualBalancePoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenRequest",
  encode(message: QueryAllPermanentVirtualBalancePoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPermanentVirtualBalancePoolTokenRequest>): QueryAllPermanentVirtualBalancePoolTokenRequest {
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPermanentVirtualBalancePoolTokenRequestAmino): QueryAllPermanentVirtualBalancePoolTokenRequest {
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPermanentVirtualBalancePoolTokenRequest, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPermanentVirtualBalancePoolTokenRequestAminoMsg): QueryAllPermanentVirtualBalancePoolTokenRequest {
    return QueryAllPermanentVirtualBalancePoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPermanentVirtualBalancePoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenRequest {
    return QueryAllPermanentVirtualBalancePoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPermanentVirtualBalancePoolTokenRequest): Uint8Array {
    return QueryAllPermanentVirtualBalancePoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPermanentVirtualBalancePoolTokenRequest): QueryAllPermanentVirtualBalancePoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenRequest",
      value: QueryAllPermanentVirtualBalancePoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPermanentVirtualBalancePoolTokenResponse(): QueryAllPermanentVirtualBalancePoolTokenResponse {
  return {
    permanentVirtualBalancePoolToken: [],
    pagination: undefined
  };
}
export const QueryAllPermanentVirtualBalancePoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenResponse",
  encode(message: QueryAllPermanentVirtualBalancePoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.permanentVirtualBalancePoolToken) {
      PermanentVirtualBalancePoolToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permanentVirtualBalancePoolToken.push(PermanentVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPermanentVirtualBalancePoolTokenResponse>): QueryAllPermanentVirtualBalancePoolTokenResponse {
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenResponse();
    message.permanentVirtualBalancePoolToken = object.permanentVirtualBalancePoolToken?.map(e => PermanentVirtualBalancePoolToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPermanentVirtualBalancePoolTokenResponseAmino): QueryAllPermanentVirtualBalancePoolTokenResponse {
    const message = createBaseQueryAllPermanentVirtualBalancePoolTokenResponse();
    message.permanentVirtualBalancePoolToken = object.permanent_virtual_balance_pool_token?.map(e => PermanentVirtualBalancePoolToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPermanentVirtualBalancePoolTokenResponse, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenResponseAmino {
    const obj: any = {};
    if (message.permanentVirtualBalancePoolToken) {
      obj.permanent_virtual_balance_pool_token = message.permanentVirtualBalancePoolToken.map(e => e ? PermanentVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.permanent_virtual_balance_pool_token = message.permanentVirtualBalancePoolToken;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPermanentVirtualBalancePoolTokenResponseAminoMsg): QueryAllPermanentVirtualBalancePoolTokenResponse {
    return QueryAllPermanentVirtualBalancePoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPermanentVirtualBalancePoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryAllPermanentVirtualBalancePoolTokenResponse {
    return QueryAllPermanentVirtualBalancePoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPermanentVirtualBalancePoolTokenResponse): Uint8Array {
    return QueryAllPermanentVirtualBalancePoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPermanentVirtualBalancePoolTokenResponse): QueryAllPermanentVirtualBalancePoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPermanentVirtualBalancePoolTokenResponse",
      value: QueryAllPermanentVirtualBalancePoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetExpiringPoolTokenRequest(): QueryGetExpiringPoolTokenRequest {
  return {
    poolId: BigInt(0),
    denom: ""
  };
}
export const QueryGetExpiringPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenRequest",
  encode(message: QueryGetExpiringPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetExpiringPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExpiringPoolTokenRequest();
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
  fromPartial(object: Partial<QueryGetExpiringPoolTokenRequest>): QueryGetExpiringPoolTokenRequest {
    const message = createBaseQueryGetExpiringPoolTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetExpiringPoolTokenRequestAmino): QueryGetExpiringPoolTokenRequest {
    const message = createBaseQueryGetExpiringPoolTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetExpiringPoolTokenRequest, useInterfaces: boolean = false): QueryGetExpiringPoolTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetExpiringPoolTokenRequestAminoMsg): QueryGetExpiringPoolTokenRequest {
    return QueryGetExpiringPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetExpiringPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryGetExpiringPoolTokenRequest {
    return QueryGetExpiringPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetExpiringPoolTokenRequest): Uint8Array {
    return QueryGetExpiringPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetExpiringPoolTokenRequest): QueryGetExpiringPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenRequest",
      value: QueryGetExpiringPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetExpiringPoolTokenResponse(): QueryGetExpiringPoolTokenResponse {
  return {
    expiringPoolToken: TemporalVirtualBalancePoolToken.fromPartial({})
  };
}
export const QueryGetExpiringPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenResponse",
  encode(message: QueryGetExpiringPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.expiringPoolToken !== undefined) {
      TemporalVirtualBalancePoolToken.encode(message.expiringPoolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetExpiringPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExpiringPoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expiringPoolToken = TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetExpiringPoolTokenResponse>): QueryGetExpiringPoolTokenResponse {
    const message = createBaseQueryGetExpiringPoolTokenResponse();
    message.expiringPoolToken = object.expiringPoolToken !== undefined && object.expiringPoolToken !== null ? TemporalVirtualBalancePoolToken.fromPartial(object.expiringPoolToken) : undefined;
    return message;
  },
  fromAmino(object: QueryGetExpiringPoolTokenResponseAmino): QueryGetExpiringPoolTokenResponse {
    const message = createBaseQueryGetExpiringPoolTokenResponse();
    if (object.expiring_pool_token !== undefined && object.expiring_pool_token !== null) {
      message.expiringPoolToken = TemporalVirtualBalancePoolToken.fromAmino(object.expiring_pool_token);
    }
    return message;
  },
  toAmino(message: QueryGetExpiringPoolTokenResponse, useInterfaces: boolean = false): QueryGetExpiringPoolTokenResponseAmino {
    const obj: any = {};
    obj.expiring_pool_token = message.expiringPoolToken ? TemporalVirtualBalancePoolToken.toAmino(message.expiringPoolToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetExpiringPoolTokenResponseAminoMsg): QueryGetExpiringPoolTokenResponse {
    return QueryGetExpiringPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetExpiringPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryGetExpiringPoolTokenResponse {
    return QueryGetExpiringPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetExpiringPoolTokenResponse): Uint8Array {
    return QueryGetExpiringPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetExpiringPoolTokenResponse): QueryGetExpiringPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetExpiringPoolTokenResponse",
      value: QueryGetExpiringPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllExpiringPoolTokenRequest(): QueryAllExpiringPoolTokenRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllExpiringPoolTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenRequest",
  encode(message: QueryAllExpiringPoolTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllExpiringPoolTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExpiringPoolTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllExpiringPoolTokenRequest>): QueryAllExpiringPoolTokenRequest {
    const message = createBaseQueryAllExpiringPoolTokenRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllExpiringPoolTokenRequestAmino): QueryAllExpiringPoolTokenRequest {
    const message = createBaseQueryAllExpiringPoolTokenRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllExpiringPoolTokenRequest, useInterfaces: boolean = false): QueryAllExpiringPoolTokenRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllExpiringPoolTokenRequestAminoMsg): QueryAllExpiringPoolTokenRequest {
    return QueryAllExpiringPoolTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllExpiringPoolTokenRequestProtoMsg, useInterfaces: boolean = false): QueryAllExpiringPoolTokenRequest {
    return QueryAllExpiringPoolTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllExpiringPoolTokenRequest): Uint8Array {
    return QueryAllExpiringPoolTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllExpiringPoolTokenRequest): QueryAllExpiringPoolTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenRequest",
      value: QueryAllExpiringPoolTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllExpiringPoolTokenResponse(): QueryAllExpiringPoolTokenResponse {
  return {
    expiringPoolToken: [],
    pagination: undefined
  };
}
export const QueryAllExpiringPoolTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenResponse",
  encode(message: QueryAllExpiringPoolTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.expiringPoolToken) {
      TemporalVirtualBalancePoolToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllExpiringPoolTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExpiringPoolTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expiringPoolToken.push(TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllExpiringPoolTokenResponse>): QueryAllExpiringPoolTokenResponse {
    const message = createBaseQueryAllExpiringPoolTokenResponse();
    message.expiringPoolToken = object.expiringPoolToken?.map(e => TemporalVirtualBalancePoolToken.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllExpiringPoolTokenResponseAmino): QueryAllExpiringPoolTokenResponse {
    const message = createBaseQueryAllExpiringPoolTokenResponse();
    message.expiringPoolToken = object.expiring_pool_token?.map(e => TemporalVirtualBalancePoolToken.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllExpiringPoolTokenResponse, useInterfaces: boolean = false): QueryAllExpiringPoolTokenResponseAmino {
    const obj: any = {};
    if (message.expiringPoolToken) {
      obj.expiring_pool_token = message.expiringPoolToken.map(e => e ? TemporalVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.expiring_pool_token = message.expiringPoolToken;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllExpiringPoolTokenResponseAminoMsg): QueryAllExpiringPoolTokenResponse {
    return QueryAllExpiringPoolTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllExpiringPoolTokenResponseProtoMsg, useInterfaces: boolean = false): QueryAllExpiringPoolTokenResponse {
    return QueryAllExpiringPoolTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllExpiringPoolTokenResponse): Uint8Array {
    return QueryAllExpiringPoolTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllExpiringPoolTokenResponse): QueryAllExpiringPoolTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllExpiringPoolTokenResponse",
      value: QueryAllExpiringPoolTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLpTokenRequest(): QueryLpTokenRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryLpTokenRequest = {
  typeUrl: "/pryzm.amm.v1.QueryLpTokenRequest",
  encode(message: QueryLpTokenRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLpTokenRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLpTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLpTokenRequest>): QueryLpTokenRequest {
    const message = createBaseQueryLpTokenRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLpTokenRequestAmino): QueryLpTokenRequest {
    const message = createBaseQueryLpTokenRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryLpTokenRequest, useInterfaces: boolean = false): QueryLpTokenRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLpTokenRequestAminoMsg): QueryLpTokenRequest {
    return QueryLpTokenRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLpTokenRequestProtoMsg, useInterfaces: boolean = false): QueryLpTokenRequest {
    return QueryLpTokenRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLpTokenRequest): Uint8Array {
    return QueryLpTokenRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLpTokenRequest): QueryLpTokenRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryLpTokenRequest",
      value: QueryLpTokenRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLpTokenResponse(): QueryLpTokenResponse {
  return {
    lpToken: PoolToken.fromPartial({})
  };
}
export const QueryLpTokenResponse = {
  typeUrl: "/pryzm.amm.v1.QueryLpTokenResponse",
  encode(message: QueryLpTokenResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lpToken !== undefined) {
      PoolToken.encode(message.lpToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLpTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLpTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lpToken = PoolToken.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLpTokenResponse>): QueryLpTokenResponse {
    const message = createBaseQueryLpTokenResponse();
    message.lpToken = object.lpToken !== undefined && object.lpToken !== null ? PoolToken.fromPartial(object.lpToken) : undefined;
    return message;
  },
  fromAmino(object: QueryLpTokenResponseAmino): QueryLpTokenResponse {
    const message = createBaseQueryLpTokenResponse();
    if (object.lp_token !== undefined && object.lp_token !== null) {
      message.lpToken = PoolToken.fromAmino(object.lp_token);
    }
    return message;
  },
  toAmino(message: QueryLpTokenResponse, useInterfaces: boolean = false): QueryLpTokenResponseAmino {
    const obj: any = {};
    obj.lp_token = message.lpToken ? PoolToken.toAmino(message.lpToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLpTokenResponseAminoMsg): QueryLpTokenResponse {
    return QueryLpTokenResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLpTokenResponseProtoMsg, useInterfaces: boolean = false): QueryLpTokenResponse {
    return QueryLpTokenResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLpTokenResponse): Uint8Array {
    return QueryLpTokenResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLpTokenResponse): QueryLpTokenResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryLpTokenResponse",
      value: QueryLpTokenResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateBatchSwapRequest(): QuerySimulateBatchSwapRequest {
  return {
    swapType: 0,
    steps: []
  };
}
export const QuerySimulateBatchSwapRequest = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapRequest",
  encode(message: QuerySimulateBatchSwapRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.swapType !== 0) {
      writer.uint32(8).int32(message.swapType);
    }
    for (const v of message.steps) {
      SwapStep.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateBatchSwapRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateBatchSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapType = (reader.int32() as any);
          break;
        case 2:
          message.steps.push(SwapStep.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateBatchSwapRequest>): QuerySimulateBatchSwapRequest {
    const message = createBaseQuerySimulateBatchSwapRequest();
    message.swapType = object.swapType ?? 0;
    message.steps = object.steps?.map(e => SwapStep.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateBatchSwapRequestAmino): QuerySimulateBatchSwapRequest {
    const message = createBaseQuerySimulateBatchSwapRequest();
    if (object.swap_type !== undefined && object.swap_type !== null) {
      message.swapType = object.swap_type;
    }
    message.steps = object.steps?.map(e => SwapStep.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateBatchSwapRequest, useInterfaces: boolean = false): QuerySimulateBatchSwapRequestAmino {
    const obj: any = {};
    obj.swap_type = message.swapType === 0 ? undefined : message.swapType;
    if (message.steps) {
      obj.steps = message.steps.map(e => e ? SwapStep.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.steps = message.steps;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySimulateBatchSwapRequestAminoMsg): QuerySimulateBatchSwapRequest {
    return QuerySimulateBatchSwapRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateBatchSwapRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateBatchSwapRequest {
    return QuerySimulateBatchSwapRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateBatchSwapRequest): Uint8Array {
    return QuerySimulateBatchSwapRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateBatchSwapRequest): QuerySimulateBatchSwapRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapRequest",
      value: QuerySimulateBatchSwapRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateBatchSwapResponse(): QuerySimulateBatchSwapResponse {
  return {
    amountsIn: [],
    amountsOut: [],
    swapProtocolFee: [],
    joinExitProtocolFee: [],
    swapFee: []
  };
}
export const QuerySimulateBatchSwapResponse = {
  typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapResponse",
  encode(message: QuerySimulateBatchSwapResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.amountsIn) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.amountsOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.swapProtocolFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.joinExitProtocolFee) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.swapFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateBatchSwapResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateBatchSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.amountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.swapProtocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.joinExitProtocolFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.swapFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateBatchSwapResponse>): QuerySimulateBatchSwapResponse {
    const message = createBaseQuerySimulateBatchSwapResponse();
    message.amountsIn = object.amountsIn?.map(e => Coin.fromPartial(e)) || [];
    message.amountsOut = object.amountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.swapProtocolFee = object.swapProtocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.joinExitProtocolFee = object.joinExitProtocolFee?.map(e => Coin.fromPartial(e)) || [];
    message.swapFee = object.swapFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySimulateBatchSwapResponseAmino): QuerySimulateBatchSwapResponse {
    const message = createBaseQuerySimulateBatchSwapResponse();
    message.amountsIn = object.amounts_in?.map(e => Coin.fromAmino(e)) || [];
    message.amountsOut = object.amounts_out?.map(e => Coin.fromAmino(e)) || [];
    message.swapProtocolFee = object.swap_protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.joinExitProtocolFee = object.join_exit_protocol_fee?.map(e => Coin.fromAmino(e)) || [];
    message.swapFee = object.swap_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySimulateBatchSwapResponse, useInterfaces: boolean = false): QuerySimulateBatchSwapResponseAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: QuerySimulateBatchSwapResponseAminoMsg): QuerySimulateBatchSwapResponse {
    return QuerySimulateBatchSwapResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateBatchSwapResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateBatchSwapResponse {
    return QuerySimulateBatchSwapResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateBatchSwapResponse): Uint8Array {
    return QuerySimulateBatchSwapResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateBatchSwapResponse): QuerySimulateBatchSwapResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QuerySimulateBatchSwapResponse",
      value: QuerySimulateBatchSwapResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetYammConfigurationRequest(): QueryGetYammConfigurationRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGetYammConfigurationRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationRequest",
  encode(message: QueryGetYammConfigurationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetYammConfigurationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetYammConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetYammConfigurationRequest>): QueryGetYammConfigurationRequest {
    const message = createBaseQueryGetYammConfigurationRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetYammConfigurationRequestAmino): QueryGetYammConfigurationRequest {
    const message = createBaseQueryGetYammConfigurationRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryGetYammConfigurationRequest, useInterfaces: boolean = false): QueryGetYammConfigurationRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetYammConfigurationRequestAminoMsg): QueryGetYammConfigurationRequest {
    return QueryGetYammConfigurationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetYammConfigurationRequestProtoMsg, useInterfaces: boolean = false): QueryGetYammConfigurationRequest {
    return QueryGetYammConfigurationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetYammConfigurationRequest): Uint8Array {
    return QueryGetYammConfigurationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetYammConfigurationRequest): QueryGetYammConfigurationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationRequest",
      value: QueryGetYammConfigurationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetYammConfigurationResponse(): QueryGetYammConfigurationResponse {
  return {
    yammConfiguration: YammConfiguration.fromPartial({})
  };
}
export const QueryGetYammConfigurationResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationResponse",
  encode(message: QueryGetYammConfigurationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.yammConfiguration !== undefined) {
      YammConfiguration.encode(message.yammConfiguration, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetYammConfigurationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetYammConfigurationResponse();
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
  fromPartial(object: Partial<QueryGetYammConfigurationResponse>): QueryGetYammConfigurationResponse {
    const message = createBaseQueryGetYammConfigurationResponse();
    message.yammConfiguration = object.yammConfiguration !== undefined && object.yammConfiguration !== null ? YammConfiguration.fromPartial(object.yammConfiguration) : undefined;
    return message;
  },
  fromAmino(object: QueryGetYammConfigurationResponseAmino): QueryGetYammConfigurationResponse {
    const message = createBaseQueryGetYammConfigurationResponse();
    if (object.yamm_configuration !== undefined && object.yamm_configuration !== null) {
      message.yammConfiguration = YammConfiguration.fromAmino(object.yamm_configuration);
    }
    return message;
  },
  toAmino(message: QueryGetYammConfigurationResponse, useInterfaces: boolean = false): QueryGetYammConfigurationResponseAmino {
    const obj: any = {};
    obj.yamm_configuration = message.yammConfiguration ? YammConfiguration.toAmino(message.yammConfiguration, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetYammConfigurationResponseAminoMsg): QueryGetYammConfigurationResponse {
    return QueryGetYammConfigurationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetYammConfigurationResponseProtoMsg, useInterfaces: boolean = false): QueryGetYammConfigurationResponse {
    return QueryGetYammConfigurationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetYammConfigurationResponse): Uint8Array {
    return QueryGetYammConfigurationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetYammConfigurationResponse): QueryGetYammConfigurationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetYammConfigurationResponse",
      value: QueryGetYammConfigurationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllYammConfigurationRequest(): QueryAllYammConfigurationRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllYammConfigurationRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationRequest",
  encode(message: QueryAllYammConfigurationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllYammConfigurationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllYammConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllYammConfigurationRequest>): QueryAllYammConfigurationRequest {
    const message = createBaseQueryAllYammConfigurationRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllYammConfigurationRequestAmino): QueryAllYammConfigurationRequest {
    const message = createBaseQueryAllYammConfigurationRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllYammConfigurationRequest, useInterfaces: boolean = false): QueryAllYammConfigurationRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllYammConfigurationRequestAminoMsg): QueryAllYammConfigurationRequest {
    return QueryAllYammConfigurationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllYammConfigurationRequestProtoMsg, useInterfaces: boolean = false): QueryAllYammConfigurationRequest {
    return QueryAllYammConfigurationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllYammConfigurationRequest): Uint8Array {
    return QueryAllYammConfigurationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllYammConfigurationRequest): QueryAllYammConfigurationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationRequest",
      value: QueryAllYammConfigurationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllYammConfigurationResponse(): QueryAllYammConfigurationResponse {
  return {
    yammConfiguration: [],
    pagination: undefined
  };
}
export const QueryAllYammConfigurationResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationResponse",
  encode(message: QueryAllYammConfigurationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.yammConfiguration) {
      YammConfiguration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllYammConfigurationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllYammConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yammConfiguration.push(YammConfiguration.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllYammConfigurationResponse>): QueryAllYammConfigurationResponse {
    const message = createBaseQueryAllYammConfigurationResponse();
    message.yammConfiguration = object.yammConfiguration?.map(e => YammConfiguration.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllYammConfigurationResponseAmino): QueryAllYammConfigurationResponse {
    const message = createBaseQueryAllYammConfigurationResponse();
    message.yammConfiguration = object.yamm_configuration?.map(e => YammConfiguration.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllYammConfigurationResponse, useInterfaces: boolean = false): QueryAllYammConfigurationResponseAmino {
    const obj: any = {};
    if (message.yammConfiguration) {
      obj.yamm_configuration = message.yammConfiguration.map(e => e ? YammConfiguration.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.yamm_configuration = message.yammConfiguration;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllYammConfigurationResponseAminoMsg): QueryAllYammConfigurationResponse {
    return QueryAllYammConfigurationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllYammConfigurationResponseProtoMsg, useInterfaces: boolean = false): QueryAllYammConfigurationResponse {
    return QueryAllYammConfigurationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllYammConfigurationResponse): Uint8Array {
    return QueryAllYammConfigurationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllYammConfigurationResponse): QueryAllYammConfigurationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllYammConfigurationResponse",
      value: QueryAllYammConfigurationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetWhitelistedRouteRequest(): QueryGetWhitelistedRouteRequest {
  return {
    tokenIn: "",
    tokenOut: ""
  };
}
export const QueryGetWhitelistedRouteRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteRequest",
  encode(message: QueryGetWhitelistedRouteRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenIn !== "") {
      writer.uint32(10).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(18).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWhitelistedRouteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWhitelistedRouteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenIn = reader.string();
          break;
        case 2:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetWhitelistedRouteRequest>): QueryGetWhitelistedRouteRequest {
    const message = createBaseQueryGetWhitelistedRouteRequest();
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: QueryGetWhitelistedRouteRequestAmino): QueryGetWhitelistedRouteRequest {
    const message = createBaseQueryGetWhitelistedRouteRequest();
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: QueryGetWhitelistedRouteRequest, useInterfaces: boolean = false): QueryGetWhitelistedRouteRequestAmino {
    const obj: any = {};
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: QueryGetWhitelistedRouteRequestAminoMsg): QueryGetWhitelistedRouteRequest {
    return QueryGetWhitelistedRouteRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWhitelistedRouteRequestProtoMsg, useInterfaces: boolean = false): QueryGetWhitelistedRouteRequest {
    return QueryGetWhitelistedRouteRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWhitelistedRouteRequest): Uint8Array {
    return QueryGetWhitelistedRouteRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWhitelistedRouteRequest): QueryGetWhitelistedRouteRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteRequest",
      value: QueryGetWhitelistedRouteRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetWhitelistedRouteResponse(): QueryGetWhitelistedRouteResponse {
  return {
    whitelistedRoute: WhitelistedRoute.fromPartial({})
  };
}
export const QueryGetWhitelistedRouteResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteResponse",
  encode(message: QueryGetWhitelistedRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.whitelistedRoute !== undefined) {
      WhitelistedRoute.encode(message.whitelistedRoute, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetWhitelistedRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWhitelistedRouteResponse();
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
  fromPartial(object: Partial<QueryGetWhitelistedRouteResponse>): QueryGetWhitelistedRouteResponse {
    const message = createBaseQueryGetWhitelistedRouteResponse();
    message.whitelistedRoute = object.whitelistedRoute !== undefined && object.whitelistedRoute !== null ? WhitelistedRoute.fromPartial(object.whitelistedRoute) : undefined;
    return message;
  },
  fromAmino(object: QueryGetWhitelistedRouteResponseAmino): QueryGetWhitelistedRouteResponse {
    const message = createBaseQueryGetWhitelistedRouteResponse();
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = WhitelistedRoute.fromAmino(object.whitelisted_route);
    }
    return message;
  },
  toAmino(message: QueryGetWhitelistedRouteResponse, useInterfaces: boolean = false): QueryGetWhitelistedRouteResponseAmino {
    const obj: any = {};
    obj.whitelisted_route = message.whitelistedRoute ? WhitelistedRoute.toAmino(message.whitelistedRoute, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetWhitelistedRouteResponseAminoMsg): QueryGetWhitelistedRouteResponse {
    return QueryGetWhitelistedRouteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWhitelistedRouteResponseProtoMsg, useInterfaces: boolean = false): QueryGetWhitelistedRouteResponse {
    return QueryGetWhitelistedRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetWhitelistedRouteResponse): Uint8Array {
    return QueryGetWhitelistedRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWhitelistedRouteResponse): QueryGetWhitelistedRouteResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetWhitelistedRouteResponse",
      value: QueryGetWhitelistedRouteResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllWhitelistedRouteRequest(): QueryAllWhitelistedRouteRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllWhitelistedRouteRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteRequest",
  encode(message: QueryAllWhitelistedRouteRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWhitelistedRouteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWhitelistedRouteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWhitelistedRouteRequest>): QueryAllWhitelistedRouteRequest {
    const message = createBaseQueryAllWhitelistedRouteRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWhitelistedRouteRequestAmino): QueryAllWhitelistedRouteRequest {
    const message = createBaseQueryAllWhitelistedRouteRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWhitelistedRouteRequest, useInterfaces: boolean = false): QueryAllWhitelistedRouteRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWhitelistedRouteRequestAminoMsg): QueryAllWhitelistedRouteRequest {
    return QueryAllWhitelistedRouteRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWhitelistedRouteRequestProtoMsg, useInterfaces: boolean = false): QueryAllWhitelistedRouteRequest {
    return QueryAllWhitelistedRouteRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWhitelistedRouteRequest): Uint8Array {
    return QueryAllWhitelistedRouteRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWhitelistedRouteRequest): QueryAllWhitelistedRouteRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteRequest",
      value: QueryAllWhitelistedRouteRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllWhitelistedRouteResponse(): QueryAllWhitelistedRouteResponse {
  return {
    whitelistedRoute: [],
    pagination: undefined
  };
}
export const QueryAllWhitelistedRouteResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteResponse",
  encode(message: QueryAllWhitelistedRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.whitelistedRoute) {
      WhitelistedRoute.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllWhitelistedRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWhitelistedRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whitelistedRoute.push(WhitelistedRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllWhitelistedRouteResponse>): QueryAllWhitelistedRouteResponse {
    const message = createBaseQueryAllWhitelistedRouteResponse();
    message.whitelistedRoute = object.whitelistedRoute?.map(e => WhitelistedRoute.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllWhitelistedRouteResponseAmino): QueryAllWhitelistedRouteResponse {
    const message = createBaseQueryAllWhitelistedRouteResponse();
    message.whitelistedRoute = object.whitelisted_route?.map(e => WhitelistedRoute.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllWhitelistedRouteResponse, useInterfaces: boolean = false): QueryAllWhitelistedRouteResponseAmino {
    const obj: any = {};
    if (message.whitelistedRoute) {
      obj.whitelisted_route = message.whitelistedRoute.map(e => e ? WhitelistedRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.whitelisted_route = message.whitelistedRoute;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllWhitelistedRouteResponseAminoMsg): QueryAllWhitelistedRouteResponse {
    return QueryAllWhitelistedRouteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllWhitelistedRouteResponseProtoMsg, useInterfaces: boolean = false): QueryAllWhitelistedRouteResponse {
    return QueryAllWhitelistedRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllWhitelistedRouteResponse): Uint8Array {
    return QueryAllWhitelistedRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllWhitelistedRouteResponse): QueryAllWhitelistedRouteResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllWhitelistedRouteResponse",
      value: QueryAllWhitelistedRouteResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetOrderRequest(): QueryGetOrderRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryGetOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetOrderRequest",
  encode(message: QueryGetOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetOrderRequest>): QueryGetOrderRequest {
    const message = createBaseQueryGetOrderRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetOrderRequestAmino): QueryGetOrderRequest {
    const message = createBaseQueryGetOrderRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryGetOrderRequest, useInterfaces: boolean = false): QueryGetOrderRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetOrderRequestAminoMsg): QueryGetOrderRequest {
    return QueryGetOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetOrderRequestProtoMsg, useInterfaces: boolean = false): QueryGetOrderRequest {
    return QueryGetOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetOrderRequest): Uint8Array {
    return QueryGetOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetOrderRequest): QueryGetOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetOrderRequest",
      value: QueryGetOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetOrderResponse(): QueryGetOrderResponse {
  return {
    order: Order.fromPartial({})
  };
}
export const QueryGetOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetOrderResponse",
  encode(message: QueryGetOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.order !== undefined) {
      Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrderResponse();
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
  fromPartial(object: Partial<QueryGetOrderResponse>): QueryGetOrderResponse {
    const message = createBaseQueryGetOrderResponse();
    message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
    return message;
  },
  fromAmino(object: QueryGetOrderResponseAmino): QueryGetOrderResponse {
    const message = createBaseQueryGetOrderResponse();
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromAmino(object.order);
    }
    return message;
  },
  toAmino(message: QueryGetOrderResponse, useInterfaces: boolean = false): QueryGetOrderResponseAmino {
    const obj: any = {};
    obj.order = message.order ? Order.toAmino(message.order, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetOrderResponseAminoMsg): QueryGetOrderResponse {
    return QueryGetOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetOrderResponseProtoMsg, useInterfaces: boolean = false): QueryGetOrderResponse {
    return QueryGetOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetOrderResponse): Uint8Array {
    return QueryGetOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetOrderResponse): QueryGetOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetOrderResponse",
      value: QueryGetOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllOrderRequest(): QueryAllOrderRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllOrderRequest",
  encode(message: QueryAllOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllOrderRequest>): QueryAllOrderRequest {
    const message = createBaseQueryAllOrderRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllOrderRequestAmino): QueryAllOrderRequest {
    const message = createBaseQueryAllOrderRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllOrderRequest, useInterfaces: boolean = false): QueryAllOrderRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllOrderRequestAminoMsg): QueryAllOrderRequest {
    return QueryAllOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllOrderRequestProtoMsg, useInterfaces: boolean = false): QueryAllOrderRequest {
    return QueryAllOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllOrderRequest): Uint8Array {
    return QueryAllOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllOrderRequest): QueryAllOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllOrderRequest",
      value: QueryAllOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllOrderResponse(): QueryAllOrderResponse {
  return {
    order: [],
    pagination: undefined
  };
}
export const QueryAllOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllOrderResponse",
  encode(message: QueryAllOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.order) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order.push(Order.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllOrderResponse>): QueryAllOrderResponse {
    const message = createBaseQueryAllOrderResponse();
    message.order = object.order?.map(e => Order.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllOrderResponseAmino): QueryAllOrderResponse {
    const message = createBaseQueryAllOrderResponse();
    message.order = object.order?.map(e => Order.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllOrderResponse, useInterfaces: boolean = false): QueryAllOrderResponseAmino {
    const obj: any = {};
    if (message.order) {
      obj.order = message.order.map(e => e ? Order.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.order = message.order;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllOrderResponseAminoMsg): QueryAllOrderResponse {
    return QueryAllOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllOrderResponseProtoMsg, useInterfaces: boolean = false): QueryAllOrderResponse {
    return QueryAllOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllOrderResponse): Uint8Array {
    return QueryAllOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllOrderResponse): QueryAllOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllOrderResponse",
      value: QueryAllOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetExecutableOrderRequest(): QueryGetExecutableOrderRequest {
  return {
    orderId: BigInt(0)
  };
}
export const QueryGetExecutableOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderRequest",
  encode(message: QueryGetExecutableOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetExecutableOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExecutableOrderRequest();
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
  fromPartial(object: Partial<QueryGetExecutableOrderRequest>): QueryGetExecutableOrderRequest {
    const message = createBaseQueryGetExecutableOrderRequest();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetExecutableOrderRequestAmino): QueryGetExecutableOrderRequest {
    const message = createBaseQueryGetExecutableOrderRequest();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    return message;
  },
  toAmino(message: QueryGetExecutableOrderRequest, useInterfaces: boolean = false): QueryGetExecutableOrderRequestAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetExecutableOrderRequestAminoMsg): QueryGetExecutableOrderRequest {
    return QueryGetExecutableOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetExecutableOrderRequestProtoMsg, useInterfaces: boolean = false): QueryGetExecutableOrderRequest {
    return QueryGetExecutableOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetExecutableOrderRequest): Uint8Array {
    return QueryGetExecutableOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetExecutableOrderRequest): QueryGetExecutableOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderRequest",
      value: QueryGetExecutableOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetExecutableOrderResponse(): QueryGetExecutableOrderResponse {
  return {
    executableOrder: Order.fromPartial({})
  };
}
export const QueryGetExecutableOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderResponse",
  encode(message: QueryGetExecutableOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.executableOrder !== undefined) {
      Order.encode(message.executableOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetExecutableOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExecutableOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.executableOrder = Order.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetExecutableOrderResponse>): QueryGetExecutableOrderResponse {
    const message = createBaseQueryGetExecutableOrderResponse();
    message.executableOrder = object.executableOrder !== undefined && object.executableOrder !== null ? Order.fromPartial(object.executableOrder) : undefined;
    return message;
  },
  fromAmino(object: QueryGetExecutableOrderResponseAmino): QueryGetExecutableOrderResponse {
    const message = createBaseQueryGetExecutableOrderResponse();
    if (object.executable_order !== undefined && object.executable_order !== null) {
      message.executableOrder = Order.fromAmino(object.executable_order);
    }
    return message;
  },
  toAmino(message: QueryGetExecutableOrderResponse, useInterfaces: boolean = false): QueryGetExecutableOrderResponseAmino {
    const obj: any = {};
    obj.executable_order = message.executableOrder ? Order.toAmino(message.executableOrder, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetExecutableOrderResponseAminoMsg): QueryGetExecutableOrderResponse {
    return QueryGetExecutableOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetExecutableOrderResponseProtoMsg, useInterfaces: boolean = false): QueryGetExecutableOrderResponse {
    return QueryGetExecutableOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetExecutableOrderResponse): Uint8Array {
    return QueryGetExecutableOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetExecutableOrderResponse): QueryGetExecutableOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetExecutableOrderResponse",
      value: QueryGetExecutableOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllExecutableOrderRequest(): QueryAllExecutableOrderRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllExecutableOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderRequest",
  encode(message: QueryAllExecutableOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllExecutableOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExecutableOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllExecutableOrderRequest>): QueryAllExecutableOrderRequest {
    const message = createBaseQueryAllExecutableOrderRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllExecutableOrderRequestAmino): QueryAllExecutableOrderRequest {
    const message = createBaseQueryAllExecutableOrderRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllExecutableOrderRequest, useInterfaces: boolean = false): QueryAllExecutableOrderRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllExecutableOrderRequestAminoMsg): QueryAllExecutableOrderRequest {
    return QueryAllExecutableOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllExecutableOrderRequestProtoMsg, useInterfaces: boolean = false): QueryAllExecutableOrderRequest {
    return QueryAllExecutableOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllExecutableOrderRequest): Uint8Array {
    return QueryAllExecutableOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllExecutableOrderRequest): QueryAllExecutableOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderRequest",
      value: QueryAllExecutableOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllExecutableOrderResponse(): QueryAllExecutableOrderResponse {
  return {
    executableOrder: [],
    pagination: undefined
  };
}
export const QueryAllExecutableOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderResponse",
  encode(message: QueryAllExecutableOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.executableOrder) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllExecutableOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExecutableOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.executableOrder.push(Order.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllExecutableOrderResponse>): QueryAllExecutableOrderResponse {
    const message = createBaseQueryAllExecutableOrderResponse();
    message.executableOrder = object.executableOrder?.map(e => Order.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllExecutableOrderResponseAmino): QueryAllExecutableOrderResponse {
    const message = createBaseQueryAllExecutableOrderResponse();
    message.executableOrder = object.executable_order?.map(e => Order.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllExecutableOrderResponse, useInterfaces: boolean = false): QueryAllExecutableOrderResponseAmino {
    const obj: any = {};
    if (message.executableOrder) {
      obj.executable_order = message.executableOrder.map(e => e ? Order.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.executable_order = message.executableOrder;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllExecutableOrderResponseAminoMsg): QueryAllExecutableOrderResponse {
    return QueryAllExecutableOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllExecutableOrderResponseProtoMsg, useInterfaces: boolean = false): QueryAllExecutableOrderResponse {
    return QueryAllExecutableOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllExecutableOrderResponse): Uint8Array {
    return QueryAllExecutableOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllExecutableOrderResponse): QueryAllExecutableOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllExecutableOrderResponse",
      value: QueryAllExecutableOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetScheduleOrderRequest(): QueryGetScheduleOrderRequest {
  return {
    orderId: BigInt(0)
  };
}
export const QueryGetScheduleOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderRequest",
  encode(message: QueryGetScheduleOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetScheduleOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetScheduleOrderRequest();
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
  fromPartial(object: Partial<QueryGetScheduleOrderRequest>): QueryGetScheduleOrderRequest {
    const message = createBaseQueryGetScheduleOrderRequest();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetScheduleOrderRequestAmino): QueryGetScheduleOrderRequest {
    const message = createBaseQueryGetScheduleOrderRequest();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = BigInt(object.order_id);
    }
    return message;
  },
  toAmino(message: QueryGetScheduleOrderRequest, useInterfaces: boolean = false): QueryGetScheduleOrderRequestAmino {
    const obj: any = {};
    obj.order_id = message.orderId !== BigInt(0) ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetScheduleOrderRequestAminoMsg): QueryGetScheduleOrderRequest {
    return QueryGetScheduleOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetScheduleOrderRequestProtoMsg, useInterfaces: boolean = false): QueryGetScheduleOrderRequest {
    return QueryGetScheduleOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetScheduleOrderRequest): Uint8Array {
    return QueryGetScheduleOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetScheduleOrderRequest): QueryGetScheduleOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderRequest",
      value: QueryGetScheduleOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetScheduleOrderResponse(): QueryGetScheduleOrderResponse {
  return {
    scheduleOrder: ScheduleOrder.fromPartial({})
  };
}
export const QueryGetScheduleOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderResponse",
  encode(message: QueryGetScheduleOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.scheduleOrder !== undefined) {
      ScheduleOrder.encode(message.scheduleOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetScheduleOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetScheduleOrderResponse();
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
  fromPartial(object: Partial<QueryGetScheduleOrderResponse>): QueryGetScheduleOrderResponse {
    const message = createBaseQueryGetScheduleOrderResponse();
    message.scheduleOrder = object.scheduleOrder !== undefined && object.scheduleOrder !== null ? ScheduleOrder.fromPartial(object.scheduleOrder) : undefined;
    return message;
  },
  fromAmino(object: QueryGetScheduleOrderResponseAmino): QueryGetScheduleOrderResponse {
    const message = createBaseQueryGetScheduleOrderResponse();
    if (object.schedule_order !== undefined && object.schedule_order !== null) {
      message.scheduleOrder = ScheduleOrder.fromAmino(object.schedule_order);
    }
    return message;
  },
  toAmino(message: QueryGetScheduleOrderResponse, useInterfaces: boolean = false): QueryGetScheduleOrderResponseAmino {
    const obj: any = {};
    obj.schedule_order = message.scheduleOrder ? ScheduleOrder.toAmino(message.scheduleOrder, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetScheduleOrderResponseAminoMsg): QueryGetScheduleOrderResponse {
    return QueryGetScheduleOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetScheduleOrderResponseProtoMsg, useInterfaces: boolean = false): QueryGetScheduleOrderResponse {
    return QueryGetScheduleOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetScheduleOrderResponse): Uint8Array {
    return QueryGetScheduleOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetScheduleOrderResponse): QueryGetScheduleOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetScheduleOrderResponse",
      value: QueryGetScheduleOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllScheduleOrderRequest(): QueryAllScheduleOrderRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllScheduleOrderRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderRequest",
  encode(message: QueryAllScheduleOrderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllScheduleOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllScheduleOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllScheduleOrderRequest>): QueryAllScheduleOrderRequest {
    const message = createBaseQueryAllScheduleOrderRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllScheduleOrderRequestAmino): QueryAllScheduleOrderRequest {
    const message = createBaseQueryAllScheduleOrderRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllScheduleOrderRequest, useInterfaces: boolean = false): QueryAllScheduleOrderRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllScheduleOrderRequestAminoMsg): QueryAllScheduleOrderRequest {
    return QueryAllScheduleOrderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllScheduleOrderRequestProtoMsg, useInterfaces: boolean = false): QueryAllScheduleOrderRequest {
    return QueryAllScheduleOrderRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllScheduleOrderRequest): Uint8Array {
    return QueryAllScheduleOrderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllScheduleOrderRequest): QueryAllScheduleOrderRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderRequest",
      value: QueryAllScheduleOrderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllScheduleOrderResponse(): QueryAllScheduleOrderResponse {
  return {
    scheduleOrder: [],
    pagination: undefined
  };
}
export const QueryAllScheduleOrderResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderResponse",
  encode(message: QueryAllScheduleOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.scheduleOrder) {
      ScheduleOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllScheduleOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllScheduleOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scheduleOrder.push(ScheduleOrder.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllScheduleOrderResponse>): QueryAllScheduleOrderResponse {
    const message = createBaseQueryAllScheduleOrderResponse();
    message.scheduleOrder = object.scheduleOrder?.map(e => ScheduleOrder.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllScheduleOrderResponseAmino): QueryAllScheduleOrderResponse {
    const message = createBaseQueryAllScheduleOrderResponse();
    message.scheduleOrder = object.schedule_order?.map(e => ScheduleOrder.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllScheduleOrderResponse, useInterfaces: boolean = false): QueryAllScheduleOrderResponseAmino {
    const obj: any = {};
    if (message.scheduleOrder) {
      obj.schedule_order = message.scheduleOrder.map(e => e ? ScheduleOrder.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.schedule_order = message.scheduleOrder;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllScheduleOrderResponseAminoMsg): QueryAllScheduleOrderResponse {
    return QueryAllScheduleOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllScheduleOrderResponseProtoMsg, useInterfaces: boolean = false): QueryAllScheduleOrderResponse {
    return QueryAllScheduleOrderResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllScheduleOrderResponse): Uint8Array {
    return QueryAllScheduleOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllScheduleOrderResponse): QueryAllScheduleOrderResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllScheduleOrderResponse",
      value: QueryAllScheduleOrderResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetOraclePricePairRequest(): QueryGetOraclePricePairRequest {
  return {
    assetId: ""
  };
}
export const QueryGetOraclePricePairRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairRequest",
  encode(message: QueryGetOraclePricePairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetOraclePricePairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOraclePricePairRequest();
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
  fromPartial(object: Partial<QueryGetOraclePricePairRequest>): QueryGetOraclePricePairRequest {
    const message = createBaseQueryGetOraclePricePairRequest();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: QueryGetOraclePricePairRequestAmino): QueryGetOraclePricePairRequest {
    const message = createBaseQueryGetOraclePricePairRequest();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: QueryGetOraclePricePairRequest, useInterfaces: boolean = false): QueryGetOraclePricePairRequestAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: QueryGetOraclePricePairRequestAminoMsg): QueryGetOraclePricePairRequest {
    return QueryGetOraclePricePairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetOraclePricePairRequestProtoMsg, useInterfaces: boolean = false): QueryGetOraclePricePairRequest {
    return QueryGetOraclePricePairRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetOraclePricePairRequest): Uint8Array {
    return QueryGetOraclePricePairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetOraclePricePairRequest): QueryGetOraclePricePairRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairRequest",
      value: QueryGetOraclePricePairRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetOraclePricePairResponse(): QueryGetOraclePricePairResponse {
  return {
    oraclePricePair: OraclePricePair.fromPartial({})
  };
}
export const QueryGetOraclePricePairResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairResponse",
  encode(message: QueryGetOraclePricePairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oraclePricePair !== undefined) {
      OraclePricePair.encode(message.oraclePricePair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetOraclePricePairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOraclePricePairResponse();
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
  fromPartial(object: Partial<QueryGetOraclePricePairResponse>): QueryGetOraclePricePairResponse {
    const message = createBaseQueryGetOraclePricePairResponse();
    message.oraclePricePair = object.oraclePricePair !== undefined && object.oraclePricePair !== null ? OraclePricePair.fromPartial(object.oraclePricePair) : undefined;
    return message;
  },
  fromAmino(object: QueryGetOraclePricePairResponseAmino): QueryGetOraclePricePairResponse {
    const message = createBaseQueryGetOraclePricePairResponse();
    if (object.oracle_price_pair !== undefined && object.oracle_price_pair !== null) {
      message.oraclePricePair = OraclePricePair.fromAmino(object.oracle_price_pair);
    }
    return message;
  },
  toAmino(message: QueryGetOraclePricePairResponse, useInterfaces: boolean = false): QueryGetOraclePricePairResponseAmino {
    const obj: any = {};
    obj.oracle_price_pair = message.oraclePricePair ? OraclePricePair.toAmino(message.oraclePricePair, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetOraclePricePairResponseAminoMsg): QueryGetOraclePricePairResponse {
    return QueryGetOraclePricePairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetOraclePricePairResponseProtoMsg, useInterfaces: boolean = false): QueryGetOraclePricePairResponse {
    return QueryGetOraclePricePairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetOraclePricePairResponse): Uint8Array {
    return QueryGetOraclePricePairResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetOraclePricePairResponse): QueryGetOraclePricePairResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetOraclePricePairResponse",
      value: QueryGetOraclePricePairResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllOraclePricePairRequest(): QueryAllOraclePricePairRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllOraclePricePairRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairRequest",
  encode(message: QueryAllOraclePricePairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllOraclePricePairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOraclePricePairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllOraclePricePairRequest>): QueryAllOraclePricePairRequest {
    const message = createBaseQueryAllOraclePricePairRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllOraclePricePairRequestAmino): QueryAllOraclePricePairRequest {
    const message = createBaseQueryAllOraclePricePairRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllOraclePricePairRequest, useInterfaces: boolean = false): QueryAllOraclePricePairRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllOraclePricePairRequestAminoMsg): QueryAllOraclePricePairRequest {
    return QueryAllOraclePricePairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllOraclePricePairRequestProtoMsg, useInterfaces: boolean = false): QueryAllOraclePricePairRequest {
    return QueryAllOraclePricePairRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllOraclePricePairRequest): Uint8Array {
    return QueryAllOraclePricePairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllOraclePricePairRequest): QueryAllOraclePricePairRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairRequest",
      value: QueryAllOraclePricePairRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllOraclePricePairResponse(): QueryAllOraclePricePairResponse {
  return {
    oraclePricePair: [],
    pagination: undefined
  };
}
export const QueryAllOraclePricePairResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairResponse",
  encode(message: QueryAllOraclePricePairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.oraclePricePair) {
      OraclePricePair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllOraclePricePairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOraclePricePairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oraclePricePair.push(OraclePricePair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllOraclePricePairResponse>): QueryAllOraclePricePairResponse {
    const message = createBaseQueryAllOraclePricePairResponse();
    message.oraclePricePair = object.oraclePricePair?.map(e => OraclePricePair.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllOraclePricePairResponseAmino): QueryAllOraclePricePairResponse {
    const message = createBaseQueryAllOraclePricePairResponse();
    message.oraclePricePair = object.oracle_price_pair?.map(e => OraclePricePair.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllOraclePricePairResponse, useInterfaces: boolean = false): QueryAllOraclePricePairResponseAmino {
    const obj: any = {};
    if (message.oraclePricePair) {
      obj.oracle_price_pair = message.oraclePricePair.map(e => e ? OraclePricePair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.oracle_price_pair = message.oraclePricePair;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllOraclePricePairResponseAminoMsg): QueryAllOraclePricePairResponse {
    return QueryAllOraclePricePairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllOraclePricePairResponseProtoMsg, useInterfaces: boolean = false): QueryAllOraclePricePairResponse {
    return QueryAllOraclePricePairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllOraclePricePairResponse): Uint8Array {
    return QueryAllOraclePricePairResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllOraclePricePairResponse): QueryAllOraclePricePairResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllOraclePricePairResponse",
      value: QueryAllOraclePricePairResponse.encode(message).finish()
    };
  }
};
function createBaseQueryVaultPauseModeRequest(): QueryVaultPauseModeRequest {
  return {};
}
export const QueryVaultPauseModeRequest = {
  typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeRequest",
  encode(_: QueryVaultPauseModeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryVaultPauseModeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVaultPauseModeRequest();
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
  fromPartial(_: Partial<QueryVaultPauseModeRequest>): QueryVaultPauseModeRequest {
    const message = createBaseQueryVaultPauseModeRequest();
    return message;
  },
  fromAmino(_: QueryVaultPauseModeRequestAmino): QueryVaultPauseModeRequest {
    const message = createBaseQueryVaultPauseModeRequest();
    return message;
  },
  toAmino(_: QueryVaultPauseModeRequest, useInterfaces: boolean = false): QueryVaultPauseModeRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryVaultPauseModeRequestAminoMsg): QueryVaultPauseModeRequest {
    return QueryVaultPauseModeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryVaultPauseModeRequestProtoMsg, useInterfaces: boolean = false): QueryVaultPauseModeRequest {
    return QueryVaultPauseModeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryVaultPauseModeRequest): Uint8Array {
    return QueryVaultPauseModeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryVaultPauseModeRequest): QueryVaultPauseModeRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeRequest",
      value: QueryVaultPauseModeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryVaultPauseModeResponse(): QueryVaultPauseModeResponse {
  return {
    paused: false
  };
}
export const QueryVaultPauseModeResponse = {
  typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeResponse",
  encode(message: QueryVaultPauseModeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused === true) {
      writer.uint32(8).bool(message.paused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryVaultPauseModeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVaultPauseModeResponse();
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
  fromPartial(object: Partial<QueryVaultPauseModeResponse>): QueryVaultPauseModeResponse {
    const message = createBaseQueryVaultPauseModeResponse();
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: QueryVaultPauseModeResponseAmino): QueryVaultPauseModeResponse {
    const message = createBaseQueryVaultPauseModeResponse();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    return message;
  },
  toAmino(message: QueryVaultPauseModeResponse, useInterfaces: boolean = false): QueryVaultPauseModeResponseAmino {
    const obj: any = {};
    obj.paused = message.paused === false ? undefined : message.paused;
    return obj;
  },
  fromAminoMsg(object: QueryVaultPauseModeResponseAminoMsg): QueryVaultPauseModeResponse {
    return QueryVaultPauseModeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryVaultPauseModeResponseProtoMsg, useInterfaces: boolean = false): QueryVaultPauseModeResponse {
    return QueryVaultPauseModeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryVaultPauseModeResponse): Uint8Array {
    return QueryVaultPauseModeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryVaultPauseModeResponse): QueryVaultPauseModeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryVaultPauseModeResponse",
      value: QueryVaultPauseModeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPendingTokenIntroductionRequest(): QueryGetPendingTokenIntroductionRequest {
  return {
    assetId: "",
    targetPoolId: BigInt(0)
  };
}
export const QueryGetPendingTokenIntroductionRequest = {
  typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionRequest",
  encode(message: QueryGetPendingTokenIntroductionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.targetPoolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.targetPoolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPendingTokenIntroductionRequest();
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
  fromPartial(object: Partial<QueryGetPendingTokenIntroductionRequest>): QueryGetPendingTokenIntroductionRequest {
    const message = createBaseQueryGetPendingTokenIntroductionRequest();
    message.assetId = object.assetId ?? "";
    message.targetPoolId = object.targetPoolId !== undefined && object.targetPoolId !== null ? BigInt(object.targetPoolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetPendingTokenIntroductionRequestAmino): QueryGetPendingTokenIntroductionRequest {
    const message = createBaseQueryGetPendingTokenIntroductionRequest();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.target_pool_id !== undefined && object.target_pool_id !== null) {
      message.targetPoolId = BigInt(object.target_pool_id);
    }
    return message;
  },
  toAmino(message: QueryGetPendingTokenIntroductionRequest, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionRequestAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.target_pool_id = message.targetPoolId !== BigInt(0) ? message.targetPoolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPendingTokenIntroductionRequestAminoMsg): QueryGetPendingTokenIntroductionRequest {
    return QueryGetPendingTokenIntroductionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPendingTokenIntroductionRequestProtoMsg, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionRequest {
    return QueryGetPendingTokenIntroductionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPendingTokenIntroductionRequest): Uint8Array {
    return QueryGetPendingTokenIntroductionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPendingTokenIntroductionRequest): QueryGetPendingTokenIntroductionRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionRequest",
      value: QueryGetPendingTokenIntroductionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPendingTokenIntroductionResponse(): QueryGetPendingTokenIntroductionResponse {
  return {
    pendingTokenIntroduction: PendingTokenIntroduction.fromPartial({})
  };
}
export const QueryGetPendingTokenIntroductionResponse = {
  typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionResponse",
  encode(message: QueryGetPendingTokenIntroductionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pendingTokenIntroduction !== undefined) {
      PendingTokenIntroduction.encode(message.pendingTokenIntroduction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPendingTokenIntroductionResponse();
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
  fromPartial(object: Partial<QueryGetPendingTokenIntroductionResponse>): QueryGetPendingTokenIntroductionResponse {
    const message = createBaseQueryGetPendingTokenIntroductionResponse();
    message.pendingTokenIntroduction = object.pendingTokenIntroduction !== undefined && object.pendingTokenIntroduction !== null ? PendingTokenIntroduction.fromPartial(object.pendingTokenIntroduction) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPendingTokenIntroductionResponseAmino): QueryGetPendingTokenIntroductionResponse {
    const message = createBaseQueryGetPendingTokenIntroductionResponse();
    if (object.pending_token_introduction !== undefined && object.pending_token_introduction !== null) {
      message.pendingTokenIntroduction = PendingTokenIntroduction.fromAmino(object.pending_token_introduction);
    }
    return message;
  },
  toAmino(message: QueryGetPendingTokenIntroductionResponse, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionResponseAmino {
    const obj: any = {};
    obj.pending_token_introduction = message.pendingTokenIntroduction ? PendingTokenIntroduction.toAmino(message.pendingTokenIntroduction, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPendingTokenIntroductionResponseAminoMsg): QueryGetPendingTokenIntroductionResponse {
    return QueryGetPendingTokenIntroductionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPendingTokenIntroductionResponseProtoMsg, useInterfaces: boolean = false): QueryGetPendingTokenIntroductionResponse {
    return QueryGetPendingTokenIntroductionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPendingTokenIntroductionResponse): Uint8Array {
    return QueryGetPendingTokenIntroductionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPendingTokenIntroductionResponse): QueryGetPendingTokenIntroductionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryGetPendingTokenIntroductionResponse",
      value: QueryGetPendingTokenIntroductionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPendingTokenIntroductionRequest(): QueryAllPendingTokenIntroductionRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPendingTokenIntroductionRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionRequest",
  encode(message: QueryAllPendingTokenIntroductionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPendingTokenIntroductionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPendingTokenIntroductionRequest>): QueryAllPendingTokenIntroductionRequest {
    const message = createBaseQueryAllPendingTokenIntroductionRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPendingTokenIntroductionRequestAmino): QueryAllPendingTokenIntroductionRequest {
    const message = createBaseQueryAllPendingTokenIntroductionRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPendingTokenIntroductionRequest, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPendingTokenIntroductionRequestAminoMsg): QueryAllPendingTokenIntroductionRequest {
    return QueryAllPendingTokenIntroductionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPendingTokenIntroductionRequestProtoMsg, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionRequest {
    return QueryAllPendingTokenIntroductionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPendingTokenIntroductionRequest): Uint8Array {
    return QueryAllPendingTokenIntroductionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPendingTokenIntroductionRequest): QueryAllPendingTokenIntroductionRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionRequest",
      value: QueryAllPendingTokenIntroductionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPendingTokenIntroductionResponse(): QueryAllPendingTokenIntroductionResponse {
  return {
    pendingTokenIntroduction: [],
    pagination: undefined
  };
}
export const QueryAllPendingTokenIntroductionResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionResponse",
  encode(message: QueryAllPendingTokenIntroductionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pendingTokenIntroduction) {
      PendingTokenIntroduction.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPendingTokenIntroductionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingTokenIntroduction.push(PendingTokenIntroduction.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPendingTokenIntroductionResponse>): QueryAllPendingTokenIntroductionResponse {
    const message = createBaseQueryAllPendingTokenIntroductionResponse();
    message.pendingTokenIntroduction = object.pendingTokenIntroduction?.map(e => PendingTokenIntroduction.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPendingTokenIntroductionResponseAmino): QueryAllPendingTokenIntroductionResponse {
    const message = createBaseQueryAllPendingTokenIntroductionResponse();
    message.pendingTokenIntroduction = object.pending_token_introduction?.map(e => PendingTokenIntroduction.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPendingTokenIntroductionResponse, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionResponseAmino {
    const obj: any = {};
    if (message.pendingTokenIntroduction) {
      obj.pending_token_introduction = message.pendingTokenIntroduction.map(e => e ? PendingTokenIntroduction.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending_token_introduction = message.pendingTokenIntroduction;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPendingTokenIntroductionResponseAminoMsg): QueryAllPendingTokenIntroductionResponse {
    return QueryAllPendingTokenIntroductionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPendingTokenIntroductionResponseProtoMsg, useInterfaces: boolean = false): QueryAllPendingTokenIntroductionResponse {
    return QueryAllPendingTokenIntroductionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPendingTokenIntroductionResponse): Uint8Array {
    return QueryAllPendingTokenIntroductionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPendingTokenIntroductionResponse): QueryAllPendingTokenIntroductionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllPendingTokenIntroductionResponse",
      value: QueryAllPendingTokenIntroductionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryYammPoolIdRequest(): QueryYammPoolIdRequest {
  return {
    assetId: ""
  };
}
export const QueryYammPoolIdRequest = {
  typeUrl: "/pryzm.amm.v1.QueryYammPoolIdRequest",
  encode(message: QueryYammPoolIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryYammPoolIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryYammPoolIdRequest();
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
  fromPartial(object: Partial<QueryYammPoolIdRequest>): QueryYammPoolIdRequest {
    const message = createBaseQueryYammPoolIdRequest();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: QueryYammPoolIdRequestAmino): QueryYammPoolIdRequest {
    const message = createBaseQueryYammPoolIdRequest();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: QueryYammPoolIdRequest, useInterfaces: boolean = false): QueryYammPoolIdRequestAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: QueryYammPoolIdRequestAminoMsg): QueryYammPoolIdRequest {
    return QueryYammPoolIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryYammPoolIdRequestProtoMsg, useInterfaces: boolean = false): QueryYammPoolIdRequest {
    return QueryYammPoolIdRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryYammPoolIdRequest): Uint8Array {
    return QueryYammPoolIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryYammPoolIdRequest): QueryYammPoolIdRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryYammPoolIdRequest",
      value: QueryYammPoolIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryYammPoolIdResponse(): QueryYammPoolIdResponse {
  return {
    poolId: BigInt(0)
  };
}
export const QueryYammPoolIdResponse = {
  typeUrl: "/pryzm.amm.v1.QueryYammPoolIdResponse",
  encode(message: QueryYammPoolIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryYammPoolIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryYammPoolIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryYammPoolIdResponse>): QueryYammPoolIdResponse {
    const message = createBaseQueryYammPoolIdResponse();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryYammPoolIdResponseAmino): QueryYammPoolIdResponse {
    const message = createBaseQueryYammPoolIdResponse();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryYammPoolIdResponse, useInterfaces: boolean = false): QueryYammPoolIdResponseAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryYammPoolIdResponseAminoMsg): QueryYammPoolIdResponse {
    return QueryYammPoolIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryYammPoolIdResponseProtoMsg, useInterfaces: boolean = false): QueryYammPoolIdResponse {
    return QueryYammPoolIdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryYammPoolIdResponse): Uint8Array {
    return QueryYammPoolIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryYammPoolIdResponse): QueryYammPoolIdResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryYammPoolIdResponse",
      value: QueryYammPoolIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrderStepBoundsRequest(): QueryOrderStepBoundsRequest {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    whitelistedRoute: false
  };
}
export const QueryOrderStepBoundsRequest = {
  typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsRequest",
  encode(message: QueryOrderStepBoundsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryOrderStepBoundsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderStepBoundsRequest();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderStepBoundsRequest>): QueryOrderStepBoundsRequest {
    const message = createBaseQueryOrderStepBoundsRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    return message;
  },
  fromAmino(object: QueryOrderStepBoundsRequestAmino): QueryOrderStepBoundsRequest {
    const message = createBaseQueryOrderStepBoundsRequest();
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
    return message;
  },
  toAmino(message: QueryOrderStepBoundsRequest, useInterfaces: boolean = false): QueryOrderStepBoundsRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    return obj;
  },
  fromAminoMsg(object: QueryOrderStepBoundsRequestAminoMsg): QueryOrderStepBoundsRequest {
    return QueryOrderStepBoundsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderStepBoundsRequestProtoMsg, useInterfaces: boolean = false): QueryOrderStepBoundsRequest {
    return QueryOrderStepBoundsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryOrderStepBoundsRequest): Uint8Array {
    return QueryOrderStepBoundsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderStepBoundsRequest): QueryOrderStepBoundsRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsRequest",
      value: QueryOrderStepBoundsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrderStepBoundsResponse(): QueryOrderStepBoundsResponse {
  return {
    minStep: "",
    maxStep: ""
  };
}
export const QueryOrderStepBoundsResponse = {
  typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsResponse",
  encode(message: QueryOrderStepBoundsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minStep !== "") {
      writer.uint32(10).string(message.minStep);
    }
    if (message.maxStep !== "") {
      writer.uint32(18).string(message.maxStep);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryOrderStepBoundsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderStepBoundsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minStep = reader.string();
          break;
        case 2:
          message.maxStep = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderStepBoundsResponse>): QueryOrderStepBoundsResponse {
    const message = createBaseQueryOrderStepBoundsResponse();
    message.minStep = object.minStep ?? "";
    message.maxStep = object.maxStep ?? "";
    return message;
  },
  fromAmino(object: QueryOrderStepBoundsResponseAmino): QueryOrderStepBoundsResponse {
    const message = createBaseQueryOrderStepBoundsResponse();
    if (object.min_step !== undefined && object.min_step !== null) {
      message.minStep = object.min_step;
    }
    if (object.max_step !== undefined && object.max_step !== null) {
      message.maxStep = object.max_step;
    }
    return message;
  },
  toAmino(message: QueryOrderStepBoundsResponse, useInterfaces: boolean = false): QueryOrderStepBoundsResponseAmino {
    const obj: any = {};
    obj.min_step = message.minStep === "" ? undefined : message.minStep;
    obj.max_step = message.maxStep === "" ? undefined : message.maxStep;
    return obj;
  },
  fromAminoMsg(object: QueryOrderStepBoundsResponseAminoMsg): QueryOrderStepBoundsResponse {
    return QueryOrderStepBoundsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderStepBoundsResponseProtoMsg, useInterfaces: boolean = false): QueryOrderStepBoundsResponse {
    return QueryOrderStepBoundsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryOrderStepBoundsResponse): Uint8Array {
    return QueryOrderStepBoundsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderStepBoundsResponse): QueryOrderStepBoundsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryOrderStepBoundsResponse",
      value: QueryOrderStepBoundsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllDisabledOrderPairRequest(): QueryAllDisabledOrderPairRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllDisabledOrderPairRequest = {
  typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairRequest",
  encode(message: QueryAllDisabledOrderPairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllDisabledOrderPairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDisabledOrderPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDisabledOrderPairRequest>): QueryAllDisabledOrderPairRequest {
    const message = createBaseQueryAllDisabledOrderPairRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllDisabledOrderPairRequestAmino): QueryAllDisabledOrderPairRequest {
    const message = createBaseQueryAllDisabledOrderPairRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllDisabledOrderPairRequest, useInterfaces: boolean = false): QueryAllDisabledOrderPairRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllDisabledOrderPairRequestAminoMsg): QueryAllDisabledOrderPairRequest {
    return QueryAllDisabledOrderPairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDisabledOrderPairRequestProtoMsg, useInterfaces: boolean = false): QueryAllDisabledOrderPairRequest {
    return QueryAllDisabledOrderPairRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllDisabledOrderPairRequest): Uint8Array {
    return QueryAllDisabledOrderPairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDisabledOrderPairRequest): QueryAllDisabledOrderPairRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairRequest",
      value: QueryAllDisabledOrderPairRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllDisabledOrderPairResponse(): QueryAllDisabledOrderPairResponse {
  return {
    disabledOrderPair: [],
    pagination: undefined
  };
}
export const QueryAllDisabledOrderPairResponse = {
  typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairResponse",
  encode(message: QueryAllDisabledOrderPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.disabledOrderPair) {
      DisabledOrderPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllDisabledOrderPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDisabledOrderPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disabledOrderPair.push(DisabledOrderPair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDisabledOrderPairResponse>): QueryAllDisabledOrderPairResponse {
    const message = createBaseQueryAllDisabledOrderPairResponse();
    message.disabledOrderPair = object.disabledOrderPair?.map(e => DisabledOrderPair.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllDisabledOrderPairResponseAmino): QueryAllDisabledOrderPairResponse {
    const message = createBaseQueryAllDisabledOrderPairResponse();
    message.disabledOrderPair = object.disabled_order_pair?.map(e => DisabledOrderPair.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllDisabledOrderPairResponse, useInterfaces: boolean = false): QueryAllDisabledOrderPairResponseAmino {
    const obj: any = {};
    if (message.disabledOrderPair) {
      obj.disabled_order_pair = message.disabledOrderPair.map(e => e ? DisabledOrderPair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.disabled_order_pair = message.disabledOrderPair;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllDisabledOrderPairResponseAminoMsg): QueryAllDisabledOrderPairResponse {
    return QueryAllDisabledOrderPairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDisabledOrderPairResponseProtoMsg, useInterfaces: boolean = false): QueryAllDisabledOrderPairResponse {
    return QueryAllDisabledOrderPairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllDisabledOrderPairResponse): Uint8Array {
    return QueryAllDisabledOrderPairResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDisabledOrderPairResponse): QueryAllDisabledOrderPairResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryAllDisabledOrderPairResponse",
      value: QueryAllDisabledOrderPairResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrderPairDisabledRequest(): QueryOrderPairDisabledRequest {
  return {
    whitelistedRoute: false,
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: ""
  };
}
export const QueryOrderPairDisabledRequest = {
  typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledRequest",
  encode(message: QueryOrderPairDisabledRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.whitelistedRoute === true) {
      writer.uint32(8).bool(message.whitelistedRoute);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryOrderPairDisabledRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderPairDisabledRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whitelistedRoute = reader.bool();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderPairDisabledRequest>): QueryOrderPairDisabledRequest {
    const message = createBaseQueryOrderPairDisabledRequest();
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: QueryOrderPairDisabledRequestAmino): QueryOrderPairDisabledRequest {
    const message = createBaseQueryOrderPairDisabledRequest();
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = object.whitelisted_route;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: QueryOrderPairDisabledRequest, useInterfaces: boolean = false): QueryOrderPairDisabledRequestAmino {
    const obj: any = {};
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: QueryOrderPairDisabledRequestAminoMsg): QueryOrderPairDisabledRequest {
    return QueryOrderPairDisabledRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderPairDisabledRequestProtoMsg, useInterfaces: boolean = false): QueryOrderPairDisabledRequest {
    return QueryOrderPairDisabledRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryOrderPairDisabledRequest): Uint8Array {
    return QueryOrderPairDisabledRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderPairDisabledRequest): QueryOrderPairDisabledRequestProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledRequest",
      value: QueryOrderPairDisabledRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrderPairDisabledResponse(): QueryOrderPairDisabledResponse {
  return {
    disabled: false
  };
}
export const QueryOrderPairDisabledResponse = {
  typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledResponse",
  encode(message: QueryOrderPairDisabledResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.disabled === true) {
      writer.uint32(8).bool(message.disabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryOrderPairDisabledResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderPairDisabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderPairDisabledResponse>): QueryOrderPairDisabledResponse {
    const message = createBaseQueryOrderPairDisabledResponse();
    message.disabled = object.disabled ?? false;
    return message;
  },
  fromAmino(object: QueryOrderPairDisabledResponseAmino): QueryOrderPairDisabledResponse {
    const message = createBaseQueryOrderPairDisabledResponse();
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    }
    return message;
  },
  toAmino(message: QueryOrderPairDisabledResponse, useInterfaces: boolean = false): QueryOrderPairDisabledResponseAmino {
    const obj: any = {};
    obj.disabled = message.disabled === false ? undefined : message.disabled;
    return obj;
  },
  fromAminoMsg(object: QueryOrderPairDisabledResponseAminoMsg): QueryOrderPairDisabledResponse {
    return QueryOrderPairDisabledResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderPairDisabledResponseProtoMsg, useInterfaces: boolean = false): QueryOrderPairDisabledResponse {
    return QueryOrderPairDisabledResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryOrderPairDisabledResponse): Uint8Array {
    return QueryOrderPairDisabledResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderPairDisabledResponse): QueryOrderPairDisabledResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.QueryOrderPairDisabledResponse",
      value: QueryOrderPairDisabledResponse.encode(message).finish()
    };
  }
};
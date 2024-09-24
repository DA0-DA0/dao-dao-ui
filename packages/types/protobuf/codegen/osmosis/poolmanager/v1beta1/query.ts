//@ts-nocheck
import { SwapAmountInRoute, SwapAmountInRouteAmino, SwapAmountInRouteSDKType, SwapAmountOutRoute, SwapAmountOutRouteAmino, SwapAmountOutRouteSDKType } from "./swap_route";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./genesis";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { TakerFeeShareAgreement, TakerFeeShareAgreementAmino, TakerFeeShareAgreementSDKType, TakerFeeSkimAccumulator, TakerFeeSkimAccumulatorAmino, TakerFeeSkimAccumulatorSDKType, AlloyContractTakerFeeShareState, AlloyContractTakerFeeShareStateAmino, AlloyContractTakerFeeShareStateSDKType } from "./taker_fee_share";
import { Pool as Pool1 } from "../../concentratedliquidity/v1beta1/pool";
import { PoolProtoMsg as Pool1ProtoMsg } from "../../concentratedliquidity/v1beta1/pool";
import { PoolSDKType as Pool1SDKType } from "../../concentratedliquidity/v1beta1/pool";
import { CosmWasmPool, CosmWasmPoolProtoMsg, CosmWasmPoolSDKType } from "../../cosmwasmpool/v1beta1/model/pool";
import { Pool as Pool2 } from "../../gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import { PoolProtoMsg as Pool2ProtoMsg } from "../../gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import { PoolSDKType as Pool2SDKType } from "../../gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import { Pool as Pool3 } from "../../gamm/v1beta1/balancerPool";
import { PoolProtoMsg as Pool3ProtoMsg } from "../../gamm/v1beta1/balancerPool";
import { PoolSDKType as Pool3SDKType } from "../../gamm/v1beta1/balancerPool";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** =============================== Params */
export interface ParamsRequest {}
export interface ParamsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.ParamsRequest";
  value: Uint8Array;
}
/** =============================== Params */
export interface ParamsRequestAmino {}
export interface ParamsRequestAminoMsg {
  type: "osmosis/poolmanager/params-request";
  value: ParamsRequestAmino;
}
/** =============================== Params */
export interface ParamsRequestSDKType {}
export interface ParamsResponse {
  params: Params | undefined;
}
export interface ParamsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.ParamsResponse";
  value: Uint8Array;
}
export interface ParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface ParamsResponseAminoMsg {
  type: "osmosis/poolmanager/params-response";
  value: ParamsResponseAmino;
}
export interface ParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequest {
  /** DEPRECATED */
  /** @deprecated */
  sender: string;
  /** @deprecated */
  poolId: bigint;
  tokenIn: string;
  routes: SwapAmountInRoute[];
}
export interface EstimateSwapExactAmountInRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInRequest";
  value: Uint8Array;
}
/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequestAmino {
  /** DEPRECATED */
  /** @deprecated */
  sender?: string;
  /** @deprecated */
  pool_id?: string;
  token_in?: string;
  routes?: SwapAmountInRouteAmino[];
}
export interface EstimateSwapExactAmountInRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-in-request";
  value: EstimateSwapExactAmountInRequestAmino;
}
/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequestSDKType {
  /** @deprecated */
  sender: string;
  /** @deprecated */
  pool_id: bigint;
  token_in: string;
  routes: SwapAmountInRouteSDKType[];
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequest {
  /** @deprecated */
  poolId: bigint;
  tokenIn: string;
  routesPoolId: bigint[];
  routesTokenOutDenom: string[];
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInWithPrimitiveTypesRequest";
  value: Uint8Array;
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequestAmino {
  /** @deprecated */
  pool_id?: string;
  token_in?: string;
  routes_pool_id?: string[];
  routes_token_out_denom?: string[];
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-in-with-primitive-types-request";
  value: EstimateSwapExactAmountInWithPrimitiveTypesRequestAmino;
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequestSDKType {
  /** @deprecated */
  pool_id: bigint;
  token_in: string;
  routes_pool_id: bigint[];
  routes_token_out_denom: string[];
}
export interface EstimateSinglePoolSwapExactAmountInRequest {
  poolId: bigint;
  tokenIn: string;
  tokenOutDenom: string;
}
export interface EstimateSinglePoolSwapExactAmountInRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountInRequest";
  value: Uint8Array;
}
export interface EstimateSinglePoolSwapExactAmountInRequestAmino {
  pool_id?: string;
  token_in?: string;
  token_out_denom?: string;
}
export interface EstimateSinglePoolSwapExactAmountInRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-single-pool-swap-exact-amount-in-request";
  value: EstimateSinglePoolSwapExactAmountInRequestAmino;
}
export interface EstimateSinglePoolSwapExactAmountInRequestSDKType {
  pool_id: bigint;
  token_in: string;
  token_out_denom: string;
}
export interface EstimateSwapExactAmountInResponse {
  tokenOutAmount: string;
}
export interface EstimateSwapExactAmountInResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInResponse";
  value: Uint8Array;
}
export interface EstimateSwapExactAmountInResponseAmino {
  token_out_amount?: string;
}
export interface EstimateSwapExactAmountInResponseAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-in-response";
  value: EstimateSwapExactAmountInResponseAmino;
}
export interface EstimateSwapExactAmountInResponseSDKType {
  token_out_amount: string;
}
/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequest {
  /** DEPRECATED */
  /** @deprecated */
  sender: string;
  /** @deprecated */
  poolId: bigint;
  routes: SwapAmountOutRoute[];
  tokenOut: string;
}
export interface EstimateSwapExactAmountOutRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutRequest";
  value: Uint8Array;
}
/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequestAmino {
  /** DEPRECATED */
  /** @deprecated */
  sender?: string;
  /** @deprecated */
  pool_id?: string;
  routes?: SwapAmountOutRouteAmino[];
  token_out?: string;
}
export interface EstimateSwapExactAmountOutRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-out-request";
  value: EstimateSwapExactAmountOutRequestAmino;
}
/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequestSDKType {
  /** @deprecated */
  sender: string;
  /** @deprecated */
  pool_id: bigint;
  routes: SwapAmountOutRouteSDKType[];
  token_out: string;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
  /** @deprecated */
  poolId: bigint;
  routesPoolId: bigint[];
  routesTokenInDenom: string[];
  tokenOut: string;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutWithPrimitiveTypesRequest";
  value: Uint8Array;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequestAmino {
  /** @deprecated */
  pool_id?: string;
  routes_pool_id?: string[];
  routes_token_in_denom?: string[];
  token_out?: string;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-out-with-primitive-types-request";
  value: EstimateSwapExactAmountOutWithPrimitiveTypesRequestAmino;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequestSDKType {
  /** @deprecated */
  pool_id: bigint;
  routes_pool_id: bigint[];
  routes_token_in_denom: string[];
  token_out: string;
}
export interface EstimateSinglePoolSwapExactAmountOutRequest {
  poolId: bigint;
  tokenInDenom: string;
  tokenOut: string;
}
export interface EstimateSinglePoolSwapExactAmountOutRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountOutRequest";
  value: Uint8Array;
}
export interface EstimateSinglePoolSwapExactAmountOutRequestAmino {
  pool_id?: string;
  token_in_denom?: string;
  token_out?: string;
}
export interface EstimateSinglePoolSwapExactAmountOutRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-single-pool-swap-exact-amount-out-request";
  value: EstimateSinglePoolSwapExactAmountOutRequestAmino;
}
export interface EstimateSinglePoolSwapExactAmountOutRequestSDKType {
  pool_id: bigint;
  token_in_denom: string;
  token_out: string;
}
export interface EstimateSwapExactAmountOutResponse {
  tokenInAmount: string;
}
export interface EstimateSwapExactAmountOutResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutResponse";
  value: Uint8Array;
}
export interface EstimateSwapExactAmountOutResponseAmino {
  token_in_amount?: string;
}
export interface EstimateSwapExactAmountOutResponseAminoMsg {
  type: "osmosis/poolmanager/estimate-swap-exact-amount-out-response";
  value: EstimateSwapExactAmountOutResponseAmino;
}
export interface EstimateSwapExactAmountOutResponseSDKType {
  token_in_amount: string;
}
/** =============================== NumPools */
export interface NumPoolsRequest {}
export interface NumPoolsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsRequest";
  value: Uint8Array;
}
/** =============================== NumPools */
export interface NumPoolsRequestAmino {}
export interface NumPoolsRequestAminoMsg {
  type: "osmosis/poolmanager/num-pools-request";
  value: NumPoolsRequestAmino;
}
/** =============================== NumPools */
export interface NumPoolsRequestSDKType {}
export interface NumPoolsResponse {
  numPools: bigint;
}
export interface NumPoolsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsResponse";
  value: Uint8Array;
}
export interface NumPoolsResponseAmino {
  num_pools?: string;
}
export interface NumPoolsResponseAminoMsg {
  type: "osmosis/poolmanager/num-pools-response";
  value: NumPoolsResponseAmino;
}
export interface NumPoolsResponseSDKType {
  num_pools: bigint;
}
/** =============================== Pool */
export interface PoolRequest {
  poolId: bigint;
}
export interface PoolRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.PoolRequest";
  value: Uint8Array;
}
/** =============================== Pool */
export interface PoolRequestAmino {
  pool_id?: string;
}
export interface PoolRequestAminoMsg {
  type: "osmosis/poolmanager/pool-request";
  value: PoolRequestAmino;
}
/** =============================== Pool */
export interface PoolRequestSDKType {
  pool_id: bigint;
}
export interface PoolResponse {
  pool?: (Pool1 & CosmWasmPool & Pool2 & Pool3 & Any) | undefined;
}
export interface PoolResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.PoolResponse";
  value: Uint8Array;
}
export type PoolResponseEncoded = Omit<PoolResponse, "pool"> & {
  pool?: Pool1ProtoMsg | CosmWasmPoolProtoMsg | Pool2ProtoMsg | Pool3ProtoMsg | AnyProtoMsg | undefined;
};
export interface PoolResponseAmino {
  pool?: AnyAmino | undefined;
}
export interface PoolResponseAminoMsg {
  type: "osmosis/poolmanager/pool-response";
  value: PoolResponseAmino;
}
export interface PoolResponseSDKType {
  pool?: Pool1SDKType | CosmWasmPoolSDKType | Pool2SDKType | Pool3SDKType | AnySDKType | undefined;
}
/** =============================== AllPools */
export interface AllPoolsRequest {}
export interface AllPoolsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsRequest";
  value: Uint8Array;
}
/** =============================== AllPools */
export interface AllPoolsRequestAmino {}
export interface AllPoolsRequestAminoMsg {
  type: "osmosis/poolmanager/all-pools-request";
  value: AllPoolsRequestAmino;
}
/** =============================== AllPools */
export interface AllPoolsRequestSDKType {}
export interface AllPoolsResponse {
  pools: (Pool1 & CosmWasmPool & Pool2 & Pool3 & Any)[] | Any[];
}
export interface AllPoolsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsResponse";
  value: Uint8Array;
}
export type AllPoolsResponseEncoded = Omit<AllPoolsResponse, "pools"> & {
  pools: (Pool1ProtoMsg | CosmWasmPoolProtoMsg | Pool2ProtoMsg | Pool3ProtoMsg | AnyProtoMsg)[];
};
export interface AllPoolsResponseAmino {
  pools?: AnyAmino[];
}
export interface AllPoolsResponseAminoMsg {
  type: "osmosis/poolmanager/all-pools-response";
  value: AllPoolsResponseAmino;
}
export interface AllPoolsResponseSDKType {
  pools: (Pool1SDKType | CosmWasmPoolSDKType | Pool2SDKType | Pool3SDKType | AnySDKType)[];
}
/**
 * =======================================================
 * ListPoolsByDenomRequest
 */
export interface ListPoolsByDenomRequest {
  denom: string;
}
export interface ListPoolsByDenomRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomRequest";
  value: Uint8Array;
}
/**
 * =======================================================
 * ListPoolsByDenomRequest
 */
export interface ListPoolsByDenomRequestAmino {
  denom?: string;
}
export interface ListPoolsByDenomRequestAminoMsg {
  type: "osmosis/poolmanager/list-pools-by-denom-request";
  value: ListPoolsByDenomRequestAmino;
}
/**
 * =======================================================
 * ListPoolsByDenomRequest
 */
export interface ListPoolsByDenomRequestSDKType {
  denom: string;
}
export interface ListPoolsByDenomResponse {
  pools: (Pool1 & CosmWasmPool & Pool2 & Pool3 & Any)[] | Any[];
}
export interface ListPoolsByDenomResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomResponse";
  value: Uint8Array;
}
export type ListPoolsByDenomResponseEncoded = Omit<ListPoolsByDenomResponse, "pools"> & {
  pools: (Pool1ProtoMsg | CosmWasmPoolProtoMsg | Pool2ProtoMsg | Pool3ProtoMsg | AnyProtoMsg)[];
};
export interface ListPoolsByDenomResponseAmino {
  pools?: AnyAmino[];
}
export interface ListPoolsByDenomResponseAminoMsg {
  type: "osmosis/poolmanager/list-pools-by-denom-response";
  value: ListPoolsByDenomResponseAmino;
}
export interface ListPoolsByDenomResponseSDKType {
  pools: (Pool1SDKType | CosmWasmPoolSDKType | Pool2SDKType | Pool3SDKType | AnySDKType)[];
}
/**
 * ==========================================================
 * SpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 */
export interface SpotPriceRequest {
  poolId: bigint;
  baseAssetDenom: string;
  quoteAssetDenom: string;
}
export interface SpotPriceRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceRequest";
  value: Uint8Array;
}
/**
 * ==========================================================
 * SpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 */
export interface SpotPriceRequestAmino {
  pool_id?: string;
  base_asset_denom?: string;
  quote_asset_denom?: string;
}
export interface SpotPriceRequestAminoMsg {
  type: "osmosis/poolmanager/spot-price-request";
  value: SpotPriceRequestAmino;
}
/**
 * ==========================================================
 * SpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 */
export interface SpotPriceRequestSDKType {
  pool_id: bigint;
  base_asset_denom: string;
  quote_asset_denom: string;
}
/**
 * SpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 */
export interface SpotPriceResponse {
  /** String of the Dec. Ex) 10.203uatom */
  spotPrice: string;
}
export interface SpotPriceResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceResponse";
  value: Uint8Array;
}
/**
 * SpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 */
export interface SpotPriceResponseAmino {
  /** String of the Dec. Ex) 10.203uatom */
  spot_price?: string;
}
export interface SpotPriceResponseAminoMsg {
  type: "osmosis/poolmanager/spot-price-response";
  value: SpotPriceResponseAmino;
}
/**
 * SpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 */
export interface SpotPriceResponseSDKType {
  spot_price: string;
}
/** =============================== TotalPoolLiquidity */
export interface TotalPoolLiquidityRequest {
  poolId: bigint;
}
export interface TotalPoolLiquidityRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityRequest";
  value: Uint8Array;
}
/** =============================== TotalPoolLiquidity */
export interface TotalPoolLiquidityRequestAmino {
  pool_id?: string;
}
export interface TotalPoolLiquidityRequestAminoMsg {
  type: "osmosis/poolmanager/total-pool-liquidity-request";
  value: TotalPoolLiquidityRequestAmino;
}
/** =============================== TotalPoolLiquidity */
export interface TotalPoolLiquidityRequestSDKType {
  pool_id: bigint;
}
export interface TotalPoolLiquidityResponse {
  liquidity: Coin[];
}
export interface TotalPoolLiquidityResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityResponse";
  value: Uint8Array;
}
export interface TotalPoolLiquidityResponseAmino {
  liquidity?: CoinAmino[];
}
export interface TotalPoolLiquidityResponseAminoMsg {
  type: "osmosis/poolmanager/total-pool-liquidity-response";
  value: TotalPoolLiquidityResponseAmino;
}
export interface TotalPoolLiquidityResponseSDKType {
  liquidity: CoinSDKType[];
}
/** =============================== TotalLiquidity */
export interface TotalLiquidityRequest {}
export interface TotalLiquidityRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityRequest";
  value: Uint8Array;
}
/** =============================== TotalLiquidity */
export interface TotalLiquidityRequestAmino {}
export interface TotalLiquidityRequestAminoMsg {
  type: "osmosis/poolmanager/total-liquidity-request";
  value: TotalLiquidityRequestAmino;
}
/** =============================== TotalLiquidity */
export interface TotalLiquidityRequestSDKType {}
export interface TotalLiquidityResponse {
  liquidity: Coin[];
}
export interface TotalLiquidityResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityResponse";
  value: Uint8Array;
}
export interface TotalLiquidityResponseAmino {
  liquidity?: CoinAmino[];
}
export interface TotalLiquidityResponseAminoMsg {
  type: "osmosis/poolmanager/total-liquidity-response";
  value: TotalLiquidityResponseAmino;
}
export interface TotalLiquidityResponseSDKType {
  liquidity: CoinSDKType[];
}
/** =============================== TotalVolumeForPool */
export interface TotalVolumeForPoolRequest {
  poolId: bigint;
}
export interface TotalVolumeForPoolRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolRequest";
  value: Uint8Array;
}
/** =============================== TotalVolumeForPool */
export interface TotalVolumeForPoolRequestAmino {
  pool_id?: string;
}
export interface TotalVolumeForPoolRequestAminoMsg {
  type: "osmosis/poolmanager/total-volume-for-pool-request";
  value: TotalVolumeForPoolRequestAmino;
}
/** =============================== TotalVolumeForPool */
export interface TotalVolumeForPoolRequestSDKType {
  pool_id: bigint;
}
export interface TotalVolumeForPoolResponse {
  volume: Coin[];
}
export interface TotalVolumeForPoolResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolResponse";
  value: Uint8Array;
}
export interface TotalVolumeForPoolResponseAmino {
  volume?: CoinAmino[];
}
export interface TotalVolumeForPoolResponseAminoMsg {
  type: "osmosis/poolmanager/total-volume-for-pool-response";
  value: TotalVolumeForPoolResponseAmino;
}
export interface TotalVolumeForPoolResponseSDKType {
  volume: CoinSDKType[];
}
/** =============================== TradingPairTakerFee */
export interface TradingPairTakerFeeRequest {
  denom0: string;
  denom1: string;
}
export interface TradingPairTakerFeeRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeRequest";
  value: Uint8Array;
}
/** =============================== TradingPairTakerFee */
export interface TradingPairTakerFeeRequestAmino {
  denom_0?: string;
  denom_1?: string;
}
export interface TradingPairTakerFeeRequestAminoMsg {
  type: "osmosis/poolmanager/trading-pair-taker-fee-request";
  value: TradingPairTakerFeeRequestAmino;
}
/** =============================== TradingPairTakerFee */
export interface TradingPairTakerFeeRequestSDKType {
  denom_0: string;
  denom_1: string;
}
export interface TradingPairTakerFeeResponse {
  takerFee: string;
}
export interface TradingPairTakerFeeResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeResponse";
  value: Uint8Array;
}
export interface TradingPairTakerFeeResponseAmino {
  taker_fee?: string;
}
export interface TradingPairTakerFeeResponseAminoMsg {
  type: "osmosis/poolmanager/trading-pair-taker-fee-response";
  value: TradingPairTakerFeeResponseAmino;
}
export interface TradingPairTakerFeeResponseSDKType {
  taker_fee: string;
}
/**
 * EstimateTradeBasedOnPriceImpactRequest represents a request to estimate a
 * trade for Balancer/StableSwap/Concentrated liquidity pool types based on the
 * given parameters.
 */
export interface EstimateTradeBasedOnPriceImpactRequest {
  /** from_coin is the total amount of tokens that the user wants to sell. */
  fromCoin: Coin | undefined;
  /**
   * to_coin_denom is the denom identifier of the token that the user wants to
   * buy.
   */
  toCoinDenom: string;
  /**
   * pool_id is the identifier of the liquidity pool that the trade will occur
   * on.
   */
  poolId: bigint;
  /**
   * max_price_impact is the maximum percentage that the user is willing
   * to affect the price of the liquidity pool.
   */
  maxPriceImpact: string;
  /**
   * external_price is an optional external price that the user can enter.
   * It adjusts the MaxPriceImpact as the SpotPrice of a pool can be changed at
   * any time.
   */
  externalPrice: string;
}
export interface EstimateTradeBasedOnPriceImpactRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactRequest";
  value: Uint8Array;
}
/**
 * EstimateTradeBasedOnPriceImpactRequest represents a request to estimate a
 * trade for Balancer/StableSwap/Concentrated liquidity pool types based on the
 * given parameters.
 */
export interface EstimateTradeBasedOnPriceImpactRequestAmino {
  /** from_coin is the total amount of tokens that the user wants to sell. */
  from_coin?: CoinAmino | undefined;
  /**
   * to_coin_denom is the denom identifier of the token that the user wants to
   * buy.
   */
  to_coin_denom?: string;
  /**
   * pool_id is the identifier of the liquidity pool that the trade will occur
   * on.
   */
  pool_id?: string;
  /**
   * max_price_impact is the maximum percentage that the user is willing
   * to affect the price of the liquidity pool.
   */
  max_price_impact?: string;
  /**
   * external_price is an optional external price that the user can enter.
   * It adjusts the MaxPriceImpact as the SpotPrice of a pool can be changed at
   * any time.
   */
  external_price?: string;
}
export interface EstimateTradeBasedOnPriceImpactRequestAminoMsg {
  type: "osmosis/poolmanager/estimate-trade-based-on-price-impact-request";
  value: EstimateTradeBasedOnPriceImpactRequestAmino;
}
/**
 * EstimateTradeBasedOnPriceImpactRequest represents a request to estimate a
 * trade for Balancer/StableSwap/Concentrated liquidity pool types based on the
 * given parameters.
 */
export interface EstimateTradeBasedOnPriceImpactRequestSDKType {
  from_coin: CoinSDKType | undefined;
  to_coin_denom: string;
  pool_id: bigint;
  max_price_impact: string;
  external_price: string;
}
/**
 * EstimateTradeBasedOnPriceImpactResponse represents the response data
 * for an estimated trade based on price impact. If a trade fails to be
 * estimated the response would be 0,0 for input_coin and output_coin and will
 * not error.
 */
export interface EstimateTradeBasedOnPriceImpactResponse {
  /**
   * input_coin is the actual input amount that would be tradeable
   * under the specified price impact.
   */
  inputCoin: Coin | undefined;
  /**
   * output_coin is the amount of tokens of the ToCoinDenom type
   * that will be received for the actual InputCoin trade.
   */
  outputCoin: Coin | undefined;
}
export interface EstimateTradeBasedOnPriceImpactResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactResponse";
  value: Uint8Array;
}
/**
 * EstimateTradeBasedOnPriceImpactResponse represents the response data
 * for an estimated trade based on price impact. If a trade fails to be
 * estimated the response would be 0,0 for input_coin and output_coin and will
 * not error.
 */
export interface EstimateTradeBasedOnPriceImpactResponseAmino {
  /**
   * input_coin is the actual input amount that would be tradeable
   * under the specified price impact.
   */
  input_coin?: CoinAmino | undefined;
  /**
   * output_coin is the amount of tokens of the ToCoinDenom type
   * that will be received for the actual InputCoin trade.
   */
  output_coin?: CoinAmino | undefined;
}
export interface EstimateTradeBasedOnPriceImpactResponseAminoMsg {
  type: "osmosis/poolmanager/estimate-trade-based-on-price-impact-response";
  value: EstimateTradeBasedOnPriceImpactResponseAmino;
}
/**
 * EstimateTradeBasedOnPriceImpactResponse represents the response data
 * for an estimated trade based on price impact. If a trade fails to be
 * estimated the response would be 0,0 for input_coin and output_coin and will
 * not error.
 */
export interface EstimateTradeBasedOnPriceImpactResponseSDKType {
  input_coin: CoinSDKType | undefined;
  output_coin: CoinSDKType | undefined;
}
export interface AllTakerFeeShareAgreementsRequest {}
export interface AllTakerFeeShareAgreementsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsRequest";
  value: Uint8Array;
}
export interface AllTakerFeeShareAgreementsRequestAmino {}
export interface AllTakerFeeShareAgreementsRequestAminoMsg {
  type: "osmosis/poolmanager/all-taker-fee-share-agreements-request";
  value: AllTakerFeeShareAgreementsRequestAmino;
}
export interface AllTakerFeeShareAgreementsRequestSDKType {}
export interface AllTakerFeeShareAgreementsResponse {
  takerFeeShareAgreements: TakerFeeShareAgreement[];
}
export interface AllTakerFeeShareAgreementsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsResponse";
  value: Uint8Array;
}
export interface AllTakerFeeShareAgreementsResponseAmino {
  taker_fee_share_agreements?: TakerFeeShareAgreementAmino[];
}
export interface AllTakerFeeShareAgreementsResponseAminoMsg {
  type: "osmosis/poolmanager/all-taker-fee-share-agreements-response";
  value: AllTakerFeeShareAgreementsResponseAmino;
}
export interface AllTakerFeeShareAgreementsResponseSDKType {
  taker_fee_share_agreements: TakerFeeShareAgreementSDKType[];
}
export interface TakerFeeShareAgreementFromDenomRequest {
  denom: string;
}
export interface TakerFeeShareAgreementFromDenomRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomRequest";
  value: Uint8Array;
}
export interface TakerFeeShareAgreementFromDenomRequestAmino {
  denom?: string;
}
export interface TakerFeeShareAgreementFromDenomRequestAminoMsg {
  type: "osmosis/poolmanager/taker-fee-share-agreement-from-denom-request";
  value: TakerFeeShareAgreementFromDenomRequestAmino;
}
export interface TakerFeeShareAgreementFromDenomRequestSDKType {
  denom: string;
}
export interface TakerFeeShareAgreementFromDenomResponse {
  takerFeeShareAgreement: TakerFeeShareAgreement | undefined;
}
export interface TakerFeeShareAgreementFromDenomResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomResponse";
  value: Uint8Array;
}
export interface TakerFeeShareAgreementFromDenomResponseAmino {
  taker_fee_share_agreement?: TakerFeeShareAgreementAmino | undefined;
}
export interface TakerFeeShareAgreementFromDenomResponseAminoMsg {
  type: "osmosis/poolmanager/taker-fee-share-agreement-from-denom-response";
  value: TakerFeeShareAgreementFromDenomResponseAmino;
}
export interface TakerFeeShareAgreementFromDenomResponseSDKType {
  taker_fee_share_agreement: TakerFeeShareAgreementSDKType | undefined;
}
export interface TakerFeeShareDenomsToAccruedValueRequest {
  denom: string;
  takerFeeDenom: string;
}
export interface TakerFeeShareDenomsToAccruedValueRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueRequest";
  value: Uint8Array;
}
export interface TakerFeeShareDenomsToAccruedValueRequestAmino {
  denom?: string;
  takerFeeDenom?: string;
}
export interface TakerFeeShareDenomsToAccruedValueRequestAminoMsg {
  type: "osmosis/poolmanager/taker-fee-share-denoms-to-accrued-value-request";
  value: TakerFeeShareDenomsToAccruedValueRequestAmino;
}
export interface TakerFeeShareDenomsToAccruedValueRequestSDKType {
  denom: string;
  takerFeeDenom: string;
}
export interface TakerFeeShareDenomsToAccruedValueResponse {
  amount: string;
}
export interface TakerFeeShareDenomsToAccruedValueResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueResponse";
  value: Uint8Array;
}
export interface TakerFeeShareDenomsToAccruedValueResponseAmino {
  amount?: string;
}
export interface TakerFeeShareDenomsToAccruedValueResponseAminoMsg {
  type: "osmosis/poolmanager/taker-fee-share-denoms-to-accrued-value-response";
  value: TakerFeeShareDenomsToAccruedValueResponseAmino;
}
export interface TakerFeeShareDenomsToAccruedValueResponseSDKType {
  amount: string;
}
export interface AllTakerFeeShareAccumulatorsRequest {}
export interface AllTakerFeeShareAccumulatorsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsRequest";
  value: Uint8Array;
}
export interface AllTakerFeeShareAccumulatorsRequestAmino {}
export interface AllTakerFeeShareAccumulatorsRequestAminoMsg {
  type: "osmosis/poolmanager/all-taker-fee-share-accumulators-request";
  value: AllTakerFeeShareAccumulatorsRequestAmino;
}
export interface AllTakerFeeShareAccumulatorsRequestSDKType {}
export interface AllTakerFeeShareAccumulatorsResponse {
  takerFeeSkimAccumulators: TakerFeeSkimAccumulator[];
}
export interface AllTakerFeeShareAccumulatorsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsResponse";
  value: Uint8Array;
}
export interface AllTakerFeeShareAccumulatorsResponseAmino {
  taker_fee_skim_accumulators?: TakerFeeSkimAccumulatorAmino[];
}
export interface AllTakerFeeShareAccumulatorsResponseAminoMsg {
  type: "osmosis/poolmanager/all-taker-fee-share-accumulators-response";
  value: AllTakerFeeShareAccumulatorsResponseAmino;
}
export interface AllTakerFeeShareAccumulatorsResponseSDKType {
  taker_fee_skim_accumulators: TakerFeeSkimAccumulatorSDKType[];
}
export interface RegisteredAlloyedPoolFromDenomRequest {
  denom: string;
}
export interface RegisteredAlloyedPoolFromDenomRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomRequest";
  value: Uint8Array;
}
export interface RegisteredAlloyedPoolFromDenomRequestAmino {
  denom?: string;
}
export interface RegisteredAlloyedPoolFromDenomRequestAminoMsg {
  type: "osmosis/poolmanager/registered-alloyed-pool-from-denom-request";
  value: RegisteredAlloyedPoolFromDenomRequestAmino;
}
export interface RegisteredAlloyedPoolFromDenomRequestSDKType {
  denom: string;
}
export interface RegisteredAlloyedPoolFromDenomResponse {
  contractState: AlloyContractTakerFeeShareState | undefined;
}
export interface RegisteredAlloyedPoolFromDenomResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomResponse";
  value: Uint8Array;
}
export interface RegisteredAlloyedPoolFromDenomResponseAmino {
  contract_state?: AlloyContractTakerFeeShareStateAmino | undefined;
}
export interface RegisteredAlloyedPoolFromDenomResponseAminoMsg {
  type: "osmosis/poolmanager/registered-alloyed-pool-from-denom-response";
  value: RegisteredAlloyedPoolFromDenomResponseAmino;
}
export interface RegisteredAlloyedPoolFromDenomResponseSDKType {
  contract_state: AlloyContractTakerFeeShareStateSDKType | undefined;
}
export interface RegisteredAlloyedPoolFromPoolIdRequest {
  poolId: bigint;
}
export interface RegisteredAlloyedPoolFromPoolIdRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdRequest";
  value: Uint8Array;
}
export interface RegisteredAlloyedPoolFromPoolIdRequestAmino {
  pool_id?: string;
}
export interface RegisteredAlloyedPoolFromPoolIdRequestAminoMsg {
  type: "osmosis/poolmanager/registered-alloyed-pool-from-pool-id-request";
  value: RegisteredAlloyedPoolFromPoolIdRequestAmino;
}
export interface RegisteredAlloyedPoolFromPoolIdRequestSDKType {
  pool_id: bigint;
}
export interface RegisteredAlloyedPoolFromPoolIdResponse {
  contractState: AlloyContractTakerFeeShareState | undefined;
}
export interface RegisteredAlloyedPoolFromPoolIdResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdResponse";
  value: Uint8Array;
}
export interface RegisteredAlloyedPoolFromPoolIdResponseAmino {
  contract_state?: AlloyContractTakerFeeShareStateAmino | undefined;
}
export interface RegisteredAlloyedPoolFromPoolIdResponseAminoMsg {
  type: "osmosis/poolmanager/registered-alloyed-pool-from-pool-id-response";
  value: RegisteredAlloyedPoolFromPoolIdResponseAmino;
}
export interface RegisteredAlloyedPoolFromPoolIdResponseSDKType {
  contract_state: AlloyContractTakerFeeShareStateSDKType | undefined;
}
export interface AllRegisteredAlloyedPoolsRequest {}
export interface AllRegisteredAlloyedPoolsRequestProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsRequest";
  value: Uint8Array;
}
export interface AllRegisteredAlloyedPoolsRequestAmino {}
export interface AllRegisteredAlloyedPoolsRequestAminoMsg {
  type: "osmosis/poolmanager/all-registered-alloyed-pools-request";
  value: AllRegisteredAlloyedPoolsRequestAmino;
}
export interface AllRegisteredAlloyedPoolsRequestSDKType {}
export interface AllRegisteredAlloyedPoolsResponse {
  contractStates: AlloyContractTakerFeeShareState[];
}
export interface AllRegisteredAlloyedPoolsResponseProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsResponse";
  value: Uint8Array;
}
export interface AllRegisteredAlloyedPoolsResponseAmino {
  contract_states?: AlloyContractTakerFeeShareStateAmino[];
}
export interface AllRegisteredAlloyedPoolsResponseAminoMsg {
  type: "osmosis/poolmanager/all-registered-alloyed-pools-response";
  value: AllRegisteredAlloyedPoolsResponseAmino;
}
export interface AllRegisteredAlloyedPoolsResponseSDKType {
  contract_states: AlloyContractTakerFeeShareStateSDKType[];
}
function createBaseParamsRequest(): ParamsRequest {
  return {};
}
export const ParamsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.ParamsRequest",
  encode(_: ParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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
  fromPartial(_: Partial<ParamsRequest>): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  fromAmino(_: ParamsRequestAmino): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  toAmino(_: ParamsRequest, useInterfaces: boolean = false): ParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ParamsRequestAminoMsg): ParamsRequest {
    return ParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ParamsRequest, useInterfaces: boolean = false): ParamsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/params-request",
      value: ParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsRequestProtoMsg, useInterfaces: boolean = false): ParamsRequest {
    return ParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsRequest): Uint8Array {
    return ParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ParamsRequest): ParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.ParamsRequest",
      value: ParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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
  fromPartial(object: Partial<ParamsResponse>): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    const message = createBaseParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: ParamsResponse, useInterfaces: boolean = false): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ParamsResponse, useInterfaces: boolean = false): ParamsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/params-response",
      value: ParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsResponseProtoMsg, useInterfaces: boolean = false): ParamsResponse {
    return ParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountInRequest(): EstimateSwapExactAmountInRequest {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenIn: "",
    routes: []
  };
}
export const EstimateSwapExactAmountInRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInRequest",
  encode(message: EstimateSwapExactAmountInRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountInRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.routes.push(SwapAmountInRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountInRequest>): EstimateSwapExactAmountInRequest {
    const message = createBaseEstimateSwapExactAmountInRequest();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInRequestAmino): EstimateSwapExactAmountInRequest {
    const message = createBaseEstimateSwapExactAmountInRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EstimateSwapExactAmountInRequest, useInterfaces: boolean = false): EstimateSwapExactAmountInRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountInRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountInRequestAminoMsg): EstimateSwapExactAmountInRequest {
    return EstimateSwapExactAmountInRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountInRequest, useInterfaces: boolean = false): EstimateSwapExactAmountInRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-in-request",
      value: EstimateSwapExactAmountInRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountInRequestProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountInRequest {
    return EstimateSwapExactAmountInRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountInRequest): Uint8Array {
    return EstimateSwapExactAmountInRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountInRequest): EstimateSwapExactAmountInRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInRequest",
      value: EstimateSwapExactAmountInRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest(): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    routesPoolId: [],
    routesTokenOutDenom: []
  };
}
export const EstimateSwapExactAmountInWithPrimitiveTypesRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInWithPrimitiveTypesRequest",
  encode(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    writer.uint32(26).fork();
    for (const v of message.routesPoolId) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.routesTokenOutDenom) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest();
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
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.routesPoolId.push(reader.uint64());
            }
          } else {
            message.routesPoolId.push(reader.uint64());
          }
          break;
        case 4:
          message.routesTokenOutDenom.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountInWithPrimitiveTypesRequest>): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.routesPoolId = object.routesPoolId?.map(e => BigInt(e.toString())) || [];
    message.routesTokenOutDenom = object.routesTokenOutDenom?.map(e => e) || [];
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInWithPrimitiveTypesRequestAmino): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    message.routesPoolId = object.routes_pool_id?.map(e => BigInt(e)) || [];
    message.routesTokenOutDenom = object.routes_token_out_denom?.map(e => e) || [];
    return message;
  },
  toAmino(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest, useInterfaces: boolean = false): EstimateSwapExactAmountInWithPrimitiveTypesRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    if (message.routesPoolId) {
      obj.routes_pool_id = message.routesPoolId.map(e => e.toString());
    } else {
      obj.routes_pool_id = message.routesPoolId;
    }
    if (message.routesTokenOutDenom) {
      obj.routes_token_out_denom = message.routesTokenOutDenom.map(e => e);
    } else {
      obj.routes_token_out_denom = message.routesTokenOutDenom;
    }
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountInWithPrimitiveTypesRequestAminoMsg): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountInWithPrimitiveTypesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest, useInterfaces: boolean = false): EstimateSwapExactAmountInWithPrimitiveTypesRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-in-with-primitive-types-request",
      value: EstimateSwapExactAmountInWithPrimitiveTypesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountInWithPrimitiveTypesRequestProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountInWithPrimitiveTypesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest): Uint8Array {
    return EstimateSwapExactAmountInWithPrimitiveTypesRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest): EstimateSwapExactAmountInWithPrimitiveTypesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInWithPrimitiveTypesRequest",
      value: EstimateSwapExactAmountInWithPrimitiveTypesRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSinglePoolSwapExactAmountInRequest(): EstimateSinglePoolSwapExactAmountInRequest {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOutDenom: ""
  };
}
export const EstimateSinglePoolSwapExactAmountInRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountInRequest",
  encode(message: EstimateSinglePoolSwapExactAmountInRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountInRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSinglePoolSwapExactAmountInRequest();
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
          message.tokenOutDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSinglePoolSwapExactAmountInRequest>): EstimateSinglePoolSwapExactAmountInRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountInRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    return message;
  },
  fromAmino(object: EstimateSinglePoolSwapExactAmountInRequestAmino): EstimateSinglePoolSwapExactAmountInRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountInRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out_denom !== undefined && object.token_out_denom !== null) {
      message.tokenOutDenom = object.token_out_denom;
    }
    return message;
  },
  toAmino(message: EstimateSinglePoolSwapExactAmountInRequest, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountInRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out_denom = message.tokenOutDenom === "" ? undefined : message.tokenOutDenom;
    return obj;
  },
  fromAminoMsg(object: EstimateSinglePoolSwapExactAmountInRequestAminoMsg): EstimateSinglePoolSwapExactAmountInRequest {
    return EstimateSinglePoolSwapExactAmountInRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSinglePoolSwapExactAmountInRequest, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountInRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-single-pool-swap-exact-amount-in-request",
      value: EstimateSinglePoolSwapExactAmountInRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSinglePoolSwapExactAmountInRequestProtoMsg, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountInRequest {
    return EstimateSinglePoolSwapExactAmountInRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSinglePoolSwapExactAmountInRequest): Uint8Array {
    return EstimateSinglePoolSwapExactAmountInRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSinglePoolSwapExactAmountInRequest): EstimateSinglePoolSwapExactAmountInRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountInRequest",
      value: EstimateSinglePoolSwapExactAmountInRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountInResponse(): EstimateSwapExactAmountInResponse {
  return {
    tokenOutAmount: ""
  };
}
export const EstimateSwapExactAmountInResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInResponse",
  encode(message: EstimateSwapExactAmountInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountInResponse>): EstimateSwapExactAmountInResponse {
    const message = createBaseEstimateSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInResponseAmino): EstimateSwapExactAmountInResponse {
    const message = createBaseEstimateSwapExactAmountInResponse();
    if (object.token_out_amount !== undefined && object.token_out_amount !== null) {
      message.tokenOutAmount = object.token_out_amount;
    }
    return message;
  },
  toAmino(message: EstimateSwapExactAmountInResponse, useInterfaces: boolean = false): EstimateSwapExactAmountInResponseAmino {
    const obj: any = {};
    obj.token_out_amount = message.tokenOutAmount === "" ? undefined : message.tokenOutAmount;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountInResponseAminoMsg): EstimateSwapExactAmountInResponse {
    return EstimateSwapExactAmountInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountInResponse, useInterfaces: boolean = false): EstimateSwapExactAmountInResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-in-response",
      value: EstimateSwapExactAmountInResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountInResponseProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountInResponse {
    return EstimateSwapExactAmountInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountInResponse): Uint8Array {
    return EstimateSwapExactAmountInResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountInResponse): EstimateSwapExactAmountInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInResponse",
      value: EstimateSwapExactAmountInResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountOutRequest(): EstimateSwapExactAmountOutRequest {
  return {
    sender: "",
    poolId: BigInt(0),
    routes: [],
    tokenOut: ""
  };
}
export const EstimateSwapExactAmountOutRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutRequest",
  encode(message: EstimateSwapExactAmountOutRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountOutRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.routes.push(SwapAmountOutRoute.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<EstimateSwapExactAmountOutRequest>): EstimateSwapExactAmountOutRequest {
    const message = createBaseEstimateSwapExactAmountOutRequest();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutRequestAmino): EstimateSwapExactAmountOutRequest {
    const message = createBaseEstimateSwapExactAmountOutRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromAmino(e)) || [];
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: EstimateSwapExactAmountOutRequest, useInterfaces: boolean = false): EstimateSwapExactAmountOutRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountOutRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountOutRequestAminoMsg): EstimateSwapExactAmountOutRequest {
    return EstimateSwapExactAmountOutRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountOutRequest, useInterfaces: boolean = false): EstimateSwapExactAmountOutRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-out-request",
      value: EstimateSwapExactAmountOutRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountOutRequestProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountOutRequest {
    return EstimateSwapExactAmountOutRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountOutRequest): Uint8Array {
    return EstimateSwapExactAmountOutRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountOutRequest): EstimateSwapExactAmountOutRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutRequest",
      value: EstimateSwapExactAmountOutRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest(): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
  return {
    poolId: BigInt(0),
    routesPoolId: [],
    routesTokenInDenom: [],
    tokenOut: ""
  };
}
export const EstimateSwapExactAmountOutWithPrimitiveTypesRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutWithPrimitiveTypesRequest",
  encode(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    writer.uint32(18).fork();
    for (const v of message.routesPoolId) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.routesTokenInDenom) {
      writer.uint32(26).string(v!);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.routesPoolId.push(reader.uint64());
            }
          } else {
            message.routesPoolId.push(reader.uint64());
          }
          break;
        case 3:
          message.routesTokenInDenom.push(reader.string());
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
  fromPartial(object: Partial<EstimateSwapExactAmountOutWithPrimitiveTypesRequest>): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.routesPoolId = object.routesPoolId?.map(e => BigInt(e.toString())) || [];
    message.routesTokenInDenom = object.routesTokenInDenom?.map(e => e) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutWithPrimitiveTypesRequestAmino): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.routesPoolId = object.routes_pool_id?.map(e => BigInt(e)) || [];
    message.routesTokenInDenom = object.routes_token_in_denom?.map(e => e) || [];
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest, useInterfaces: boolean = false): EstimateSwapExactAmountOutWithPrimitiveTypesRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.routesPoolId) {
      obj.routes_pool_id = message.routesPoolId.map(e => e.toString());
    } else {
      obj.routes_pool_id = message.routesPoolId;
    }
    if (message.routesTokenInDenom) {
      obj.routes_token_in_denom = message.routesTokenInDenom.map(e => e);
    } else {
      obj.routes_token_in_denom = message.routesTokenInDenom;
    }
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountOutWithPrimitiveTypesRequestAminoMsg): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountOutWithPrimitiveTypesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest, useInterfaces: boolean = false): EstimateSwapExactAmountOutWithPrimitiveTypesRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-out-with-primitive-types-request",
      value: EstimateSwapExactAmountOutWithPrimitiveTypesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequestProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountOutWithPrimitiveTypesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest): Uint8Array {
    return EstimateSwapExactAmountOutWithPrimitiveTypesRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest): EstimateSwapExactAmountOutWithPrimitiveTypesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutWithPrimitiveTypesRequest",
      value: EstimateSwapExactAmountOutWithPrimitiveTypesRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSinglePoolSwapExactAmountOutRequest(): EstimateSinglePoolSwapExactAmountOutRequest {
  return {
    poolId: BigInt(0),
    tokenInDenom: "",
    tokenOut: ""
  };
}
export const EstimateSinglePoolSwapExactAmountOutRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountOutRequest",
  encode(message: EstimateSinglePoolSwapExactAmountOutRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountOutRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSinglePoolSwapExactAmountOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.tokenInDenom = reader.string();
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
  fromPartial(object: Partial<EstimateSinglePoolSwapExactAmountOutRequest>): EstimateSinglePoolSwapExactAmountOutRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountOutRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: EstimateSinglePoolSwapExactAmountOutRequestAmino): EstimateSinglePoolSwapExactAmountOutRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountOutRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in_denom !== undefined && object.token_in_denom !== null) {
      message.tokenInDenom = object.token_in_denom;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: EstimateSinglePoolSwapExactAmountOutRequest, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountOutRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in_denom = message.tokenInDenom === "" ? undefined : message.tokenInDenom;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: EstimateSinglePoolSwapExactAmountOutRequestAminoMsg): EstimateSinglePoolSwapExactAmountOutRequest {
    return EstimateSinglePoolSwapExactAmountOutRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSinglePoolSwapExactAmountOutRequest, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountOutRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-single-pool-swap-exact-amount-out-request",
      value: EstimateSinglePoolSwapExactAmountOutRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSinglePoolSwapExactAmountOutRequestProtoMsg, useInterfaces: boolean = false): EstimateSinglePoolSwapExactAmountOutRequest {
    return EstimateSinglePoolSwapExactAmountOutRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSinglePoolSwapExactAmountOutRequest): Uint8Array {
    return EstimateSinglePoolSwapExactAmountOutRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSinglePoolSwapExactAmountOutRequest): EstimateSinglePoolSwapExactAmountOutRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSinglePoolSwapExactAmountOutRequest",
      value: EstimateSinglePoolSwapExactAmountOutRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountOutResponse(): EstimateSwapExactAmountOutResponse {
  return {
    tokenInAmount: ""
  };
}
export const EstimateSwapExactAmountOutResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutResponse",
  encode(message: EstimateSwapExactAmountOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSwapExactAmountOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountOutResponse>): EstimateSwapExactAmountOutResponse {
    const message = createBaseEstimateSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutResponseAmino): EstimateSwapExactAmountOutResponse {
    const message = createBaseEstimateSwapExactAmountOutResponse();
    if (object.token_in_amount !== undefined && object.token_in_amount !== null) {
      message.tokenInAmount = object.token_in_amount;
    }
    return message;
  },
  toAmino(message: EstimateSwapExactAmountOutResponse, useInterfaces: boolean = false): EstimateSwapExactAmountOutResponseAmino {
    const obj: any = {};
    obj.token_in_amount = message.tokenInAmount === "" ? undefined : message.tokenInAmount;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountOutResponseAminoMsg): EstimateSwapExactAmountOutResponse {
    return EstimateSwapExactAmountOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountOutResponse, useInterfaces: boolean = false): EstimateSwapExactAmountOutResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-swap-exact-amount-out-response",
      value: EstimateSwapExactAmountOutResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountOutResponseProtoMsg, useInterfaces: boolean = false): EstimateSwapExactAmountOutResponse {
    return EstimateSwapExactAmountOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSwapExactAmountOutResponse): Uint8Array {
    return EstimateSwapExactAmountOutResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountOutResponse): EstimateSwapExactAmountOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutResponse",
      value: EstimateSwapExactAmountOutResponse.encode(message).finish()
    };
  }
};
function createBaseNumPoolsRequest(): NumPoolsRequest {
  return {};
}
export const NumPoolsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsRequest",
  encode(_: NumPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NumPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsRequest();
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
  fromPartial(_: Partial<NumPoolsRequest>): NumPoolsRequest {
    const message = createBaseNumPoolsRequest();
    return message;
  },
  fromAmino(_: NumPoolsRequestAmino): NumPoolsRequest {
    const message = createBaseNumPoolsRequest();
    return message;
  },
  toAmino(_: NumPoolsRequest, useInterfaces: boolean = false): NumPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: NumPoolsRequestAminoMsg): NumPoolsRequest {
    return NumPoolsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: NumPoolsRequest, useInterfaces: boolean = false): NumPoolsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/num-pools-request",
      value: NumPoolsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: NumPoolsRequestProtoMsg, useInterfaces: boolean = false): NumPoolsRequest {
    return NumPoolsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NumPoolsRequest): Uint8Array {
    return NumPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: NumPoolsRequest): NumPoolsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsRequest",
      value: NumPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseNumPoolsResponse(): NumPoolsResponse {
  return {
    numPools: BigInt(0)
  };
}
export const NumPoolsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsResponse",
  encode(message: NumPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.numPools !== BigInt(0)) {
      writer.uint32(8).uint64(message.numPools);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NumPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numPools = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NumPoolsResponse>): NumPoolsResponse {
    const message = createBaseNumPoolsResponse();
    message.numPools = object.numPools !== undefined && object.numPools !== null ? BigInt(object.numPools.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: NumPoolsResponseAmino): NumPoolsResponse {
    const message = createBaseNumPoolsResponse();
    if (object.num_pools !== undefined && object.num_pools !== null) {
      message.numPools = BigInt(object.num_pools);
    }
    return message;
  },
  toAmino(message: NumPoolsResponse, useInterfaces: boolean = false): NumPoolsResponseAmino {
    const obj: any = {};
    obj.num_pools = message.numPools !== BigInt(0) ? message.numPools.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: NumPoolsResponseAminoMsg): NumPoolsResponse {
    return NumPoolsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: NumPoolsResponse, useInterfaces: boolean = false): NumPoolsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/num-pools-response",
      value: NumPoolsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: NumPoolsResponseProtoMsg, useInterfaces: boolean = false): NumPoolsResponse {
    return NumPoolsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NumPoolsResponse): Uint8Array {
    return NumPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: NumPoolsResponse): NumPoolsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.NumPoolsResponse",
      value: NumPoolsResponse.encode(message).finish()
    };
  }
};
function createBasePoolRequest(): PoolRequest {
  return {
    poolId: BigInt(0)
  };
}
export const PoolRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.PoolRequest",
  encode(message: PoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRequest();
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
  fromPartial(object: Partial<PoolRequest>): PoolRequest {
    const message = createBasePoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PoolRequestAmino): PoolRequest {
    const message = createBasePoolRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: PoolRequest, useInterfaces: boolean = false): PoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolRequestAminoMsg): PoolRequest {
    return PoolRequest.fromAmino(object.value);
  },
  toAminoMsg(message: PoolRequest, useInterfaces: boolean = false): PoolRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/pool-request",
      value: PoolRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: PoolRequestProtoMsg, useInterfaces: boolean = false): PoolRequest {
    return PoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolRequest): Uint8Array {
    return PoolRequest.encode(message).finish();
  },
  toProtoMsg(message: PoolRequest): PoolRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.PoolRequest",
      value: PoolRequest.encode(message).finish()
    };
  }
};
function createBasePoolResponse(): PoolResponse {
  return {
    pool: undefined
  };
}
export const PoolResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.PoolResponse",
  encode(message: PoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      Any.encode((message.pool as Any), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = useInterfaces ? (PoolI_InterfaceDecoder(reader) as Any) : Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolResponse>): PoolResponse {
    const message = createBasePoolResponse();
    message.pool = object.pool !== undefined && object.pool !== null ? Any.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: PoolResponseAmino): PoolResponse {
    const message = createBasePoolResponse();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = PoolI_FromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: PoolResponse, useInterfaces: boolean = false): PoolResponseAmino {
    const obj: any = {};
    obj.pool = message.pool ? PoolI_ToAmino((message.pool as Any), useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolResponseAminoMsg): PoolResponse {
    return PoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: PoolResponse, useInterfaces: boolean = false): PoolResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/pool-response",
      value: PoolResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: PoolResponseProtoMsg, useInterfaces: boolean = false): PoolResponse {
    return PoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolResponse): Uint8Array {
    return PoolResponse.encode(message).finish();
  },
  toProtoMsg(message: PoolResponse): PoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.PoolResponse",
      value: PoolResponse.encode(message).finish()
    };
  }
};
function createBaseAllPoolsRequest(): AllPoolsRequest {
  return {};
}
export const AllPoolsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsRequest",
  encode(_: AllPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllPoolsRequest();
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
  fromPartial(_: Partial<AllPoolsRequest>): AllPoolsRequest {
    const message = createBaseAllPoolsRequest();
    return message;
  },
  fromAmino(_: AllPoolsRequestAmino): AllPoolsRequest {
    const message = createBaseAllPoolsRequest();
    return message;
  },
  toAmino(_: AllPoolsRequest, useInterfaces: boolean = false): AllPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AllPoolsRequestAminoMsg): AllPoolsRequest {
    return AllPoolsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllPoolsRequest, useInterfaces: boolean = false): AllPoolsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/all-pools-request",
      value: AllPoolsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllPoolsRequestProtoMsg, useInterfaces: boolean = false): AllPoolsRequest {
    return AllPoolsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllPoolsRequest): Uint8Array {
    return AllPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllPoolsRequest): AllPoolsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsRequest",
      value: AllPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseAllPoolsResponse(): AllPoolsResponse {
  return {
    pools: []
  };
}
export const AllPoolsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsResponse",
  encode(message: AllPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pools) {
      Any.encode((v! as Any), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(useInterfaces ? (PoolI_InterfaceDecoder(reader) as Any) : Any.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllPoolsResponse>): AllPoolsResponse {
    const message = createBaseAllPoolsResponse();
    message.pools = object.pools?.map(e => Any.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllPoolsResponseAmino): AllPoolsResponse {
    const message = createBaseAllPoolsResponse();
    message.pools = object.pools?.map(e => PoolI_FromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllPoolsResponse, useInterfaces: boolean = false): AllPoolsResponseAmino {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? PoolI_ToAmino((e as Any), useInterfaces) : undefined);
    } else {
      obj.pools = message.pools;
    }
    return obj;
  },
  fromAminoMsg(object: AllPoolsResponseAminoMsg): AllPoolsResponse {
    return AllPoolsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllPoolsResponse, useInterfaces: boolean = false): AllPoolsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/all-pools-response",
      value: AllPoolsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllPoolsResponseProtoMsg, useInterfaces: boolean = false): AllPoolsResponse {
    return AllPoolsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllPoolsResponse): Uint8Array {
    return AllPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllPoolsResponse): AllPoolsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllPoolsResponse",
      value: AllPoolsResponse.encode(message).finish()
    };
  }
};
function createBaseListPoolsByDenomRequest(): ListPoolsByDenomRequest {
  return {
    denom: ""
  };
}
export const ListPoolsByDenomRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomRequest",
  encode(message: ListPoolsByDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ListPoolsByDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPoolsByDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ListPoolsByDenomRequest>): ListPoolsByDenomRequest {
    const message = createBaseListPoolsByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: ListPoolsByDenomRequestAmino): ListPoolsByDenomRequest {
    const message = createBaseListPoolsByDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: ListPoolsByDenomRequest, useInterfaces: boolean = false): ListPoolsByDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: ListPoolsByDenomRequestAminoMsg): ListPoolsByDenomRequest {
    return ListPoolsByDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ListPoolsByDenomRequest, useInterfaces: boolean = false): ListPoolsByDenomRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/list-pools-by-denom-request",
      value: ListPoolsByDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ListPoolsByDenomRequestProtoMsg, useInterfaces: boolean = false): ListPoolsByDenomRequest {
    return ListPoolsByDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ListPoolsByDenomRequest): Uint8Array {
    return ListPoolsByDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: ListPoolsByDenomRequest): ListPoolsByDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomRequest",
      value: ListPoolsByDenomRequest.encode(message).finish()
    };
  }
};
function createBaseListPoolsByDenomResponse(): ListPoolsByDenomResponse {
  return {
    pools: []
  };
}
export const ListPoolsByDenomResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomResponse",
  encode(message: ListPoolsByDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pools) {
      Any.encode((v! as Any), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ListPoolsByDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPoolsByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(useInterfaces ? (PoolI_InterfaceDecoder(reader) as Any) : Any.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ListPoolsByDenomResponse>): ListPoolsByDenomResponse {
    const message = createBaseListPoolsByDenomResponse();
    message.pools = object.pools?.map(e => Any.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ListPoolsByDenomResponseAmino): ListPoolsByDenomResponse {
    const message = createBaseListPoolsByDenomResponse();
    message.pools = object.pools?.map(e => PoolI_FromAmino(e)) || [];
    return message;
  },
  toAmino(message: ListPoolsByDenomResponse, useInterfaces: boolean = false): ListPoolsByDenomResponseAmino {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? PoolI_ToAmino((e as Any), useInterfaces) : undefined);
    } else {
      obj.pools = message.pools;
    }
    return obj;
  },
  fromAminoMsg(object: ListPoolsByDenomResponseAminoMsg): ListPoolsByDenomResponse {
    return ListPoolsByDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ListPoolsByDenomResponse, useInterfaces: boolean = false): ListPoolsByDenomResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/list-pools-by-denom-response",
      value: ListPoolsByDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ListPoolsByDenomResponseProtoMsg, useInterfaces: boolean = false): ListPoolsByDenomResponse {
    return ListPoolsByDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ListPoolsByDenomResponse): Uint8Array {
    return ListPoolsByDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: ListPoolsByDenomResponse): ListPoolsByDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.ListPoolsByDenomResponse",
      value: ListPoolsByDenomResponse.encode(message).finish()
    };
  }
};
function createBaseSpotPriceRequest(): SpotPriceRequest {
  return {
    poolId: BigInt(0),
    baseAssetDenom: "",
    quoteAssetDenom: ""
  };
}
export const SpotPriceRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceRequest",
  encode(message: SpotPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.baseAssetDenom !== "") {
      writer.uint32(18).string(message.baseAssetDenom);
    }
    if (message.quoteAssetDenom !== "") {
      writer.uint32(26).string(message.quoteAssetDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SpotPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.baseAssetDenom = reader.string();
          break;
        case 3:
          message.quoteAssetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SpotPriceRequest>): SpotPriceRequest {
    const message = createBaseSpotPriceRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.baseAssetDenom = object.baseAssetDenom ?? "";
    message.quoteAssetDenom = object.quoteAssetDenom ?? "";
    return message;
  },
  fromAmino(object: SpotPriceRequestAmino): SpotPriceRequest {
    const message = createBaseSpotPriceRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.base_asset_denom !== undefined && object.base_asset_denom !== null) {
      message.baseAssetDenom = object.base_asset_denom;
    }
    if (object.quote_asset_denom !== undefined && object.quote_asset_denom !== null) {
      message.quoteAssetDenom = object.quote_asset_denom;
    }
    return message;
  },
  toAmino(message: SpotPriceRequest, useInterfaces: boolean = false): SpotPriceRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.base_asset_denom = message.baseAssetDenom === "" ? undefined : message.baseAssetDenom;
    obj.quote_asset_denom = message.quoteAssetDenom === "" ? undefined : message.quoteAssetDenom;
    return obj;
  },
  fromAminoMsg(object: SpotPriceRequestAminoMsg): SpotPriceRequest {
    return SpotPriceRequest.fromAmino(object.value);
  },
  toAminoMsg(message: SpotPriceRequest, useInterfaces: boolean = false): SpotPriceRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/spot-price-request",
      value: SpotPriceRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SpotPriceRequestProtoMsg, useInterfaces: boolean = false): SpotPriceRequest {
    return SpotPriceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SpotPriceRequest): Uint8Array {
    return SpotPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: SpotPriceRequest): SpotPriceRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceRequest",
      value: SpotPriceRequest.encode(message).finish()
    };
  }
};
function createBaseSpotPriceResponse(): SpotPriceResponse {
  return {
    spotPrice: ""
  };
}
export const SpotPriceResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceResponse",
  encode(message: SpotPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spotPrice !== "") {
      writer.uint32(10).string(message.spotPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SpotPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spotPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SpotPriceResponse>): SpotPriceResponse {
    const message = createBaseSpotPriceResponse();
    message.spotPrice = object.spotPrice ?? "";
    return message;
  },
  fromAmino(object: SpotPriceResponseAmino): SpotPriceResponse {
    const message = createBaseSpotPriceResponse();
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = object.spot_price;
    }
    return message;
  },
  toAmino(message: SpotPriceResponse, useInterfaces: boolean = false): SpotPriceResponseAmino {
    const obj: any = {};
    obj.spot_price = message.spotPrice === "" ? undefined : message.spotPrice;
    return obj;
  },
  fromAminoMsg(object: SpotPriceResponseAminoMsg): SpotPriceResponse {
    return SpotPriceResponse.fromAmino(object.value);
  },
  toAminoMsg(message: SpotPriceResponse, useInterfaces: boolean = false): SpotPriceResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/spot-price-response",
      value: SpotPriceResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SpotPriceResponseProtoMsg, useInterfaces: boolean = false): SpotPriceResponse {
    return SpotPriceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SpotPriceResponse): Uint8Array {
    return SpotPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: SpotPriceResponse): SpotPriceResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.SpotPriceResponse",
      value: SpotPriceResponse.encode(message).finish()
    };
  }
};
function createBaseTotalPoolLiquidityRequest(): TotalPoolLiquidityRequest {
  return {
    poolId: BigInt(0)
  };
}
export const TotalPoolLiquidityRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityRequest",
  encode(message: TotalPoolLiquidityRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalPoolLiquidityRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalPoolLiquidityRequest();
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
  fromPartial(object: Partial<TotalPoolLiquidityRequest>): TotalPoolLiquidityRequest {
    const message = createBaseTotalPoolLiquidityRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: TotalPoolLiquidityRequestAmino): TotalPoolLiquidityRequest {
    const message = createBaseTotalPoolLiquidityRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: TotalPoolLiquidityRequest, useInterfaces: boolean = false): TotalPoolLiquidityRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: TotalPoolLiquidityRequestAminoMsg): TotalPoolLiquidityRequest {
    return TotalPoolLiquidityRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TotalPoolLiquidityRequest, useInterfaces: boolean = false): TotalPoolLiquidityRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/total-pool-liquidity-request",
      value: TotalPoolLiquidityRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalPoolLiquidityRequestProtoMsg, useInterfaces: boolean = false): TotalPoolLiquidityRequest {
    return TotalPoolLiquidityRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalPoolLiquidityRequest): Uint8Array {
    return TotalPoolLiquidityRequest.encode(message).finish();
  },
  toProtoMsg(message: TotalPoolLiquidityRequest): TotalPoolLiquidityRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityRequest",
      value: TotalPoolLiquidityRequest.encode(message).finish()
    };
  }
};
function createBaseTotalPoolLiquidityResponse(): TotalPoolLiquidityResponse {
  return {
    liquidity: []
  };
}
export const TotalPoolLiquidityResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityResponse",
  encode(message: TotalPoolLiquidityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalPoolLiquidityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalPoolLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidity.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalPoolLiquidityResponse>): TotalPoolLiquidityResponse {
    const message = createBaseTotalPoolLiquidityResponse();
    message.liquidity = object.liquidity?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TotalPoolLiquidityResponseAmino): TotalPoolLiquidityResponse {
    const message = createBaseTotalPoolLiquidityResponse();
    message.liquidity = object.liquidity?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: TotalPoolLiquidityResponse, useInterfaces: boolean = false): TotalPoolLiquidityResponseAmino {
    const obj: any = {};
    if (message.liquidity) {
      obj.liquidity = message.liquidity.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.liquidity = message.liquidity;
    }
    return obj;
  },
  fromAminoMsg(object: TotalPoolLiquidityResponseAminoMsg): TotalPoolLiquidityResponse {
    return TotalPoolLiquidityResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TotalPoolLiquidityResponse, useInterfaces: boolean = false): TotalPoolLiquidityResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/total-pool-liquidity-response",
      value: TotalPoolLiquidityResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalPoolLiquidityResponseProtoMsg, useInterfaces: boolean = false): TotalPoolLiquidityResponse {
    return TotalPoolLiquidityResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalPoolLiquidityResponse): Uint8Array {
    return TotalPoolLiquidityResponse.encode(message).finish();
  },
  toProtoMsg(message: TotalPoolLiquidityResponse): TotalPoolLiquidityResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalPoolLiquidityResponse",
      value: TotalPoolLiquidityResponse.encode(message).finish()
    };
  }
};
function createBaseTotalLiquidityRequest(): TotalLiquidityRequest {
  return {};
}
export const TotalLiquidityRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityRequest",
  encode(_: TotalLiquidityRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalLiquidityRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalLiquidityRequest();
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
  fromPartial(_: Partial<TotalLiquidityRequest>): TotalLiquidityRequest {
    const message = createBaseTotalLiquidityRequest();
    return message;
  },
  fromAmino(_: TotalLiquidityRequestAmino): TotalLiquidityRequest {
    const message = createBaseTotalLiquidityRequest();
    return message;
  },
  toAmino(_: TotalLiquidityRequest, useInterfaces: boolean = false): TotalLiquidityRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: TotalLiquidityRequestAminoMsg): TotalLiquidityRequest {
    return TotalLiquidityRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TotalLiquidityRequest, useInterfaces: boolean = false): TotalLiquidityRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/total-liquidity-request",
      value: TotalLiquidityRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalLiquidityRequestProtoMsg, useInterfaces: boolean = false): TotalLiquidityRequest {
    return TotalLiquidityRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalLiquidityRequest): Uint8Array {
    return TotalLiquidityRequest.encode(message).finish();
  },
  toProtoMsg(message: TotalLiquidityRequest): TotalLiquidityRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityRequest",
      value: TotalLiquidityRequest.encode(message).finish()
    };
  }
};
function createBaseTotalLiquidityResponse(): TotalLiquidityResponse {
  return {
    liquidity: []
  };
}
export const TotalLiquidityResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityResponse",
  encode(message: TotalLiquidityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalLiquidityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidity.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalLiquidityResponse>): TotalLiquidityResponse {
    const message = createBaseTotalLiquidityResponse();
    message.liquidity = object.liquidity?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TotalLiquidityResponseAmino): TotalLiquidityResponse {
    const message = createBaseTotalLiquidityResponse();
    message.liquidity = object.liquidity?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: TotalLiquidityResponse, useInterfaces: boolean = false): TotalLiquidityResponseAmino {
    const obj: any = {};
    if (message.liquidity) {
      obj.liquidity = message.liquidity.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.liquidity = message.liquidity;
    }
    return obj;
  },
  fromAminoMsg(object: TotalLiquidityResponseAminoMsg): TotalLiquidityResponse {
    return TotalLiquidityResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TotalLiquidityResponse, useInterfaces: boolean = false): TotalLiquidityResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/total-liquidity-response",
      value: TotalLiquidityResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalLiquidityResponseProtoMsg, useInterfaces: boolean = false): TotalLiquidityResponse {
    return TotalLiquidityResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalLiquidityResponse): Uint8Array {
    return TotalLiquidityResponse.encode(message).finish();
  },
  toProtoMsg(message: TotalLiquidityResponse): TotalLiquidityResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalLiquidityResponse",
      value: TotalLiquidityResponse.encode(message).finish()
    };
  }
};
function createBaseTotalVolumeForPoolRequest(): TotalVolumeForPoolRequest {
  return {
    poolId: BigInt(0)
  };
}
export const TotalVolumeForPoolRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolRequest",
  encode(message: TotalVolumeForPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalVolumeForPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalVolumeForPoolRequest();
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
  fromPartial(object: Partial<TotalVolumeForPoolRequest>): TotalVolumeForPoolRequest {
    const message = createBaseTotalVolumeForPoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: TotalVolumeForPoolRequestAmino): TotalVolumeForPoolRequest {
    const message = createBaseTotalVolumeForPoolRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: TotalVolumeForPoolRequest, useInterfaces: boolean = false): TotalVolumeForPoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: TotalVolumeForPoolRequestAminoMsg): TotalVolumeForPoolRequest {
    return TotalVolumeForPoolRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TotalVolumeForPoolRequest, useInterfaces: boolean = false): TotalVolumeForPoolRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/total-volume-for-pool-request",
      value: TotalVolumeForPoolRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalVolumeForPoolRequestProtoMsg, useInterfaces: boolean = false): TotalVolumeForPoolRequest {
    return TotalVolumeForPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalVolumeForPoolRequest): Uint8Array {
    return TotalVolumeForPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: TotalVolumeForPoolRequest): TotalVolumeForPoolRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolRequest",
      value: TotalVolumeForPoolRequest.encode(message).finish()
    };
  }
};
function createBaseTotalVolumeForPoolResponse(): TotalVolumeForPoolResponse {
  return {
    volume: []
  };
}
export const TotalVolumeForPoolResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolResponse",
  encode(message: TotalVolumeForPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.volume) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalVolumeForPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalVolumeForPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.volume.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalVolumeForPoolResponse>): TotalVolumeForPoolResponse {
    const message = createBaseTotalVolumeForPoolResponse();
    message.volume = object.volume?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TotalVolumeForPoolResponseAmino): TotalVolumeForPoolResponse {
    const message = createBaseTotalVolumeForPoolResponse();
    message.volume = object.volume?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: TotalVolumeForPoolResponse, useInterfaces: boolean = false): TotalVolumeForPoolResponseAmino {
    const obj: any = {};
    if (message.volume) {
      obj.volume = message.volume.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.volume = message.volume;
    }
    return obj;
  },
  fromAminoMsg(object: TotalVolumeForPoolResponseAminoMsg): TotalVolumeForPoolResponse {
    return TotalVolumeForPoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TotalVolumeForPoolResponse, useInterfaces: boolean = false): TotalVolumeForPoolResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/total-volume-for-pool-response",
      value: TotalVolumeForPoolResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalVolumeForPoolResponseProtoMsg, useInterfaces: boolean = false): TotalVolumeForPoolResponse {
    return TotalVolumeForPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalVolumeForPoolResponse): Uint8Array {
    return TotalVolumeForPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: TotalVolumeForPoolResponse): TotalVolumeForPoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TotalVolumeForPoolResponse",
      value: TotalVolumeForPoolResponse.encode(message).finish()
    };
  }
};
function createBaseTradingPairTakerFeeRequest(): TradingPairTakerFeeRequest {
  return {
    denom0: "",
    denom1: ""
  };
}
export const TradingPairTakerFeeRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeRequest",
  encode(message: TradingPairTakerFeeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom0 !== "") {
      writer.uint32(10).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(18).string(message.denom1);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradingPairTakerFeeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingPairTakerFeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom0 = reader.string();
          break;
        case 2:
          message.denom1 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradingPairTakerFeeRequest>): TradingPairTakerFeeRequest {
    const message = createBaseTradingPairTakerFeeRequest();
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    return message;
  },
  fromAmino(object: TradingPairTakerFeeRequestAmino): TradingPairTakerFeeRequest {
    const message = createBaseTradingPairTakerFeeRequest();
    if (object.denom_0 !== undefined && object.denom_0 !== null) {
      message.denom0 = object.denom_0;
    }
    if (object.denom_1 !== undefined && object.denom_1 !== null) {
      message.denom1 = object.denom_1;
    }
    return message;
  },
  toAmino(message: TradingPairTakerFeeRequest, useInterfaces: boolean = false): TradingPairTakerFeeRequestAmino {
    const obj: any = {};
    obj.denom_0 = message.denom0 === "" ? undefined : message.denom0;
    obj.denom_1 = message.denom1 === "" ? undefined : message.denom1;
    return obj;
  },
  fromAminoMsg(object: TradingPairTakerFeeRequestAminoMsg): TradingPairTakerFeeRequest {
    return TradingPairTakerFeeRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TradingPairTakerFeeRequest, useInterfaces: boolean = false): TradingPairTakerFeeRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/trading-pair-taker-fee-request",
      value: TradingPairTakerFeeRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TradingPairTakerFeeRequestProtoMsg, useInterfaces: boolean = false): TradingPairTakerFeeRequest {
    return TradingPairTakerFeeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradingPairTakerFeeRequest): Uint8Array {
    return TradingPairTakerFeeRequest.encode(message).finish();
  },
  toProtoMsg(message: TradingPairTakerFeeRequest): TradingPairTakerFeeRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeRequest",
      value: TradingPairTakerFeeRequest.encode(message).finish()
    };
  }
};
function createBaseTradingPairTakerFeeResponse(): TradingPairTakerFeeResponse {
  return {
    takerFee: ""
  };
}
export const TradingPairTakerFeeResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeResponse",
  encode(message: TradingPairTakerFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.takerFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.takerFee, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradingPairTakerFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingPairTakerFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradingPairTakerFeeResponse>): TradingPairTakerFeeResponse {
    const message = createBaseTradingPairTakerFeeResponse();
    message.takerFee = object.takerFee ?? "";
    return message;
  },
  fromAmino(object: TradingPairTakerFeeResponseAmino): TradingPairTakerFeeResponse {
    const message = createBaseTradingPairTakerFeeResponse();
    if (object.taker_fee !== undefined && object.taker_fee !== null) {
      message.takerFee = object.taker_fee;
    }
    return message;
  },
  toAmino(message: TradingPairTakerFeeResponse, useInterfaces: boolean = false): TradingPairTakerFeeResponseAmino {
    const obj: any = {};
    obj.taker_fee = message.takerFee === "" ? undefined : message.takerFee;
    return obj;
  },
  fromAminoMsg(object: TradingPairTakerFeeResponseAminoMsg): TradingPairTakerFeeResponse {
    return TradingPairTakerFeeResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TradingPairTakerFeeResponse, useInterfaces: boolean = false): TradingPairTakerFeeResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/trading-pair-taker-fee-response",
      value: TradingPairTakerFeeResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TradingPairTakerFeeResponseProtoMsg, useInterfaces: boolean = false): TradingPairTakerFeeResponse {
    return TradingPairTakerFeeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradingPairTakerFeeResponse): Uint8Array {
    return TradingPairTakerFeeResponse.encode(message).finish();
  },
  toProtoMsg(message: TradingPairTakerFeeResponse): TradingPairTakerFeeResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TradingPairTakerFeeResponse",
      value: TradingPairTakerFeeResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateTradeBasedOnPriceImpactRequest(): EstimateTradeBasedOnPriceImpactRequest {
  return {
    fromCoin: Coin.fromPartial({}),
    toCoinDenom: "",
    poolId: BigInt(0),
    maxPriceImpact: "",
    externalPrice: ""
  };
}
export const EstimateTradeBasedOnPriceImpactRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactRequest",
  encode(message: EstimateTradeBasedOnPriceImpactRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fromCoin !== undefined) {
      Coin.encode(message.fromCoin, writer.uint32(10).fork()).ldelim();
    }
    if (message.toCoinDenom !== "") {
      writer.uint32(18).string(message.toCoinDenom);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.maxPriceImpact !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.maxPriceImpact, 18).atomics);
    }
    if (message.externalPrice !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.externalPrice, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateTradeBasedOnPriceImpactRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromCoin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.toCoinDenom = reader.string();
          break;
        case 3:
          message.poolId = reader.uint64();
          break;
        case 4:
          message.maxPriceImpact = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.externalPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateTradeBasedOnPriceImpactRequest>): EstimateTradeBasedOnPriceImpactRequest {
    const message = createBaseEstimateTradeBasedOnPriceImpactRequest();
    message.fromCoin = object.fromCoin !== undefined && object.fromCoin !== null ? Coin.fromPartial(object.fromCoin) : undefined;
    message.toCoinDenom = object.toCoinDenom ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.maxPriceImpact = object.maxPriceImpact ?? "";
    message.externalPrice = object.externalPrice ?? "";
    return message;
  },
  fromAmino(object: EstimateTradeBasedOnPriceImpactRequestAmino): EstimateTradeBasedOnPriceImpactRequest {
    const message = createBaseEstimateTradeBasedOnPriceImpactRequest();
    if (object.from_coin !== undefined && object.from_coin !== null) {
      message.fromCoin = Coin.fromAmino(object.from_coin);
    }
    if (object.to_coin_denom !== undefined && object.to_coin_denom !== null) {
      message.toCoinDenom = object.to_coin_denom;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.max_price_impact !== undefined && object.max_price_impact !== null) {
      message.maxPriceImpact = object.max_price_impact;
    }
    if (object.external_price !== undefined && object.external_price !== null) {
      message.externalPrice = object.external_price;
    }
    return message;
  },
  toAmino(message: EstimateTradeBasedOnPriceImpactRequest, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactRequestAmino {
    const obj: any = {};
    obj.from_coin = message.fromCoin ? Coin.toAmino(message.fromCoin, useInterfaces) : undefined;
    obj.to_coin_denom = message.toCoinDenom === "" ? undefined : message.toCoinDenom;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.max_price_impact = message.maxPriceImpact === "" ? undefined : message.maxPriceImpact;
    obj.external_price = message.externalPrice === "" ? undefined : message.externalPrice;
    return obj;
  },
  fromAminoMsg(object: EstimateTradeBasedOnPriceImpactRequestAminoMsg): EstimateTradeBasedOnPriceImpactRequest {
    return EstimateTradeBasedOnPriceImpactRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateTradeBasedOnPriceImpactRequest, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-trade-based-on-price-impact-request",
      value: EstimateTradeBasedOnPriceImpactRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateTradeBasedOnPriceImpactRequestProtoMsg, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactRequest {
    return EstimateTradeBasedOnPriceImpactRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateTradeBasedOnPriceImpactRequest): Uint8Array {
    return EstimateTradeBasedOnPriceImpactRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateTradeBasedOnPriceImpactRequest): EstimateTradeBasedOnPriceImpactRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactRequest",
      value: EstimateTradeBasedOnPriceImpactRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateTradeBasedOnPriceImpactResponse(): EstimateTradeBasedOnPriceImpactResponse {
  return {
    inputCoin: Coin.fromPartial({}),
    outputCoin: Coin.fromPartial({})
  };
}
export const EstimateTradeBasedOnPriceImpactResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactResponse",
  encode(message: EstimateTradeBasedOnPriceImpactResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.inputCoin !== undefined) {
      Coin.encode(message.inputCoin, writer.uint32(10).fork()).ldelim();
    }
    if (message.outputCoin !== undefined) {
      Coin.encode(message.outputCoin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateTradeBasedOnPriceImpactResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inputCoin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.outputCoin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateTradeBasedOnPriceImpactResponse>): EstimateTradeBasedOnPriceImpactResponse {
    const message = createBaseEstimateTradeBasedOnPriceImpactResponse();
    message.inputCoin = object.inputCoin !== undefined && object.inputCoin !== null ? Coin.fromPartial(object.inputCoin) : undefined;
    message.outputCoin = object.outputCoin !== undefined && object.outputCoin !== null ? Coin.fromPartial(object.outputCoin) : undefined;
    return message;
  },
  fromAmino(object: EstimateTradeBasedOnPriceImpactResponseAmino): EstimateTradeBasedOnPriceImpactResponse {
    const message = createBaseEstimateTradeBasedOnPriceImpactResponse();
    if (object.input_coin !== undefined && object.input_coin !== null) {
      message.inputCoin = Coin.fromAmino(object.input_coin);
    }
    if (object.output_coin !== undefined && object.output_coin !== null) {
      message.outputCoin = Coin.fromAmino(object.output_coin);
    }
    return message;
  },
  toAmino(message: EstimateTradeBasedOnPriceImpactResponse, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactResponseAmino {
    const obj: any = {};
    obj.input_coin = message.inputCoin ? Coin.toAmino(message.inputCoin, useInterfaces) : undefined;
    obj.output_coin = message.outputCoin ? Coin.toAmino(message.outputCoin, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EstimateTradeBasedOnPriceImpactResponseAminoMsg): EstimateTradeBasedOnPriceImpactResponse {
    return EstimateTradeBasedOnPriceImpactResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateTradeBasedOnPriceImpactResponse, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/estimate-trade-based-on-price-impact-response",
      value: EstimateTradeBasedOnPriceImpactResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateTradeBasedOnPriceImpactResponseProtoMsg, useInterfaces: boolean = false): EstimateTradeBasedOnPriceImpactResponse {
    return EstimateTradeBasedOnPriceImpactResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateTradeBasedOnPriceImpactResponse): Uint8Array {
    return EstimateTradeBasedOnPriceImpactResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateTradeBasedOnPriceImpactResponse): EstimateTradeBasedOnPriceImpactResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.EstimateTradeBasedOnPriceImpactResponse",
      value: EstimateTradeBasedOnPriceImpactResponse.encode(message).finish()
    };
  }
};
function createBaseAllTakerFeeShareAgreementsRequest(): AllTakerFeeShareAgreementsRequest {
  return {};
}
export const AllTakerFeeShareAgreementsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsRequest",
  encode(_: AllTakerFeeShareAgreementsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllTakerFeeShareAgreementsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllTakerFeeShareAgreementsRequest();
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
  fromPartial(_: Partial<AllTakerFeeShareAgreementsRequest>): AllTakerFeeShareAgreementsRequest {
    const message = createBaseAllTakerFeeShareAgreementsRequest();
    return message;
  },
  fromAmino(_: AllTakerFeeShareAgreementsRequestAmino): AllTakerFeeShareAgreementsRequest {
    const message = createBaseAllTakerFeeShareAgreementsRequest();
    return message;
  },
  toAmino(_: AllTakerFeeShareAgreementsRequest, useInterfaces: boolean = false): AllTakerFeeShareAgreementsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AllTakerFeeShareAgreementsRequestAminoMsg): AllTakerFeeShareAgreementsRequest {
    return AllTakerFeeShareAgreementsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllTakerFeeShareAgreementsRequest, useInterfaces: boolean = false): AllTakerFeeShareAgreementsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/all-taker-fee-share-agreements-request",
      value: AllTakerFeeShareAgreementsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllTakerFeeShareAgreementsRequestProtoMsg, useInterfaces: boolean = false): AllTakerFeeShareAgreementsRequest {
    return AllTakerFeeShareAgreementsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllTakerFeeShareAgreementsRequest): Uint8Array {
    return AllTakerFeeShareAgreementsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllTakerFeeShareAgreementsRequest): AllTakerFeeShareAgreementsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsRequest",
      value: AllTakerFeeShareAgreementsRequest.encode(message).finish()
    };
  }
};
function createBaseAllTakerFeeShareAgreementsResponse(): AllTakerFeeShareAgreementsResponse {
  return {
    takerFeeShareAgreements: []
  };
}
export const AllTakerFeeShareAgreementsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsResponse",
  encode(message: AllTakerFeeShareAgreementsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.takerFeeShareAgreements) {
      TakerFeeShareAgreement.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllTakerFeeShareAgreementsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllTakerFeeShareAgreementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerFeeShareAgreements.push(TakerFeeShareAgreement.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllTakerFeeShareAgreementsResponse>): AllTakerFeeShareAgreementsResponse {
    const message = createBaseAllTakerFeeShareAgreementsResponse();
    message.takerFeeShareAgreements = object.takerFeeShareAgreements?.map(e => TakerFeeShareAgreement.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllTakerFeeShareAgreementsResponseAmino): AllTakerFeeShareAgreementsResponse {
    const message = createBaseAllTakerFeeShareAgreementsResponse();
    message.takerFeeShareAgreements = object.taker_fee_share_agreements?.map(e => TakerFeeShareAgreement.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllTakerFeeShareAgreementsResponse, useInterfaces: boolean = false): AllTakerFeeShareAgreementsResponseAmino {
    const obj: any = {};
    if (message.takerFeeShareAgreements) {
      obj.taker_fee_share_agreements = message.takerFeeShareAgreements.map(e => e ? TakerFeeShareAgreement.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.taker_fee_share_agreements = message.takerFeeShareAgreements;
    }
    return obj;
  },
  fromAminoMsg(object: AllTakerFeeShareAgreementsResponseAminoMsg): AllTakerFeeShareAgreementsResponse {
    return AllTakerFeeShareAgreementsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllTakerFeeShareAgreementsResponse, useInterfaces: boolean = false): AllTakerFeeShareAgreementsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/all-taker-fee-share-agreements-response",
      value: AllTakerFeeShareAgreementsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllTakerFeeShareAgreementsResponseProtoMsg, useInterfaces: boolean = false): AllTakerFeeShareAgreementsResponse {
    return AllTakerFeeShareAgreementsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllTakerFeeShareAgreementsResponse): Uint8Array {
    return AllTakerFeeShareAgreementsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllTakerFeeShareAgreementsResponse): AllTakerFeeShareAgreementsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAgreementsResponse",
      value: AllTakerFeeShareAgreementsResponse.encode(message).finish()
    };
  }
};
function createBaseTakerFeeShareAgreementFromDenomRequest(): TakerFeeShareAgreementFromDenomRequest {
  return {
    denom: ""
  };
}
export const TakerFeeShareAgreementFromDenomRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomRequest",
  encode(message: TakerFeeShareAgreementFromDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeShareAgreementFromDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeShareAgreementFromDenomRequest>): TakerFeeShareAgreementFromDenomRequest {
    const message = createBaseTakerFeeShareAgreementFromDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: TakerFeeShareAgreementFromDenomRequestAmino): TakerFeeShareAgreementFromDenomRequest {
    const message = createBaseTakerFeeShareAgreementFromDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: TakerFeeShareAgreementFromDenomRequest, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: TakerFeeShareAgreementFromDenomRequestAminoMsg): TakerFeeShareAgreementFromDenomRequest {
    return TakerFeeShareAgreementFromDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeShareAgreementFromDenomRequest, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-share-agreement-from-denom-request",
      value: TakerFeeShareAgreementFromDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeShareAgreementFromDenomRequestProtoMsg, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomRequest {
    return TakerFeeShareAgreementFromDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeShareAgreementFromDenomRequest): Uint8Array {
    return TakerFeeShareAgreementFromDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeShareAgreementFromDenomRequest): TakerFeeShareAgreementFromDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomRequest",
      value: TakerFeeShareAgreementFromDenomRequest.encode(message).finish()
    };
  }
};
function createBaseTakerFeeShareAgreementFromDenomResponse(): TakerFeeShareAgreementFromDenomResponse {
  return {
    takerFeeShareAgreement: TakerFeeShareAgreement.fromPartial({})
  };
}
export const TakerFeeShareAgreementFromDenomResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomResponse",
  encode(message: TakerFeeShareAgreementFromDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.takerFeeShareAgreement !== undefined) {
      TakerFeeShareAgreement.encode(message.takerFeeShareAgreement, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeShareAgreementFromDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerFeeShareAgreement = TakerFeeShareAgreement.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeShareAgreementFromDenomResponse>): TakerFeeShareAgreementFromDenomResponse {
    const message = createBaseTakerFeeShareAgreementFromDenomResponse();
    message.takerFeeShareAgreement = object.takerFeeShareAgreement !== undefined && object.takerFeeShareAgreement !== null ? TakerFeeShareAgreement.fromPartial(object.takerFeeShareAgreement) : undefined;
    return message;
  },
  fromAmino(object: TakerFeeShareAgreementFromDenomResponseAmino): TakerFeeShareAgreementFromDenomResponse {
    const message = createBaseTakerFeeShareAgreementFromDenomResponse();
    if (object.taker_fee_share_agreement !== undefined && object.taker_fee_share_agreement !== null) {
      message.takerFeeShareAgreement = TakerFeeShareAgreement.fromAmino(object.taker_fee_share_agreement);
    }
    return message;
  },
  toAmino(message: TakerFeeShareAgreementFromDenomResponse, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomResponseAmino {
    const obj: any = {};
    obj.taker_fee_share_agreement = message.takerFeeShareAgreement ? TakerFeeShareAgreement.toAmino(message.takerFeeShareAgreement, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TakerFeeShareAgreementFromDenomResponseAminoMsg): TakerFeeShareAgreementFromDenomResponse {
    return TakerFeeShareAgreementFromDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeShareAgreementFromDenomResponse, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-share-agreement-from-denom-response",
      value: TakerFeeShareAgreementFromDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeShareAgreementFromDenomResponseProtoMsg, useInterfaces: boolean = false): TakerFeeShareAgreementFromDenomResponse {
    return TakerFeeShareAgreementFromDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeShareAgreementFromDenomResponse): Uint8Array {
    return TakerFeeShareAgreementFromDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeShareAgreementFromDenomResponse): TakerFeeShareAgreementFromDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareAgreementFromDenomResponse",
      value: TakerFeeShareAgreementFromDenomResponse.encode(message).finish()
    };
  }
};
function createBaseTakerFeeShareDenomsToAccruedValueRequest(): TakerFeeShareDenomsToAccruedValueRequest {
  return {
    denom: "",
    takerFeeDenom: ""
  };
}
export const TakerFeeShareDenomsToAccruedValueRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueRequest",
  encode(message: TakerFeeShareDenomsToAccruedValueRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.takerFeeDenom !== "") {
      writer.uint32(18).string(message.takerFeeDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeShareDenomsToAccruedValueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.takerFeeDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeShareDenomsToAccruedValueRequest>): TakerFeeShareDenomsToAccruedValueRequest {
    const message = createBaseTakerFeeShareDenomsToAccruedValueRequest();
    message.denom = object.denom ?? "";
    message.takerFeeDenom = object.takerFeeDenom ?? "";
    return message;
  },
  fromAmino(object: TakerFeeShareDenomsToAccruedValueRequestAmino): TakerFeeShareDenomsToAccruedValueRequest {
    const message = createBaseTakerFeeShareDenomsToAccruedValueRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.takerFeeDenom !== undefined && object.takerFeeDenom !== null) {
      message.takerFeeDenom = object.takerFeeDenom;
    }
    return message;
  },
  toAmino(message: TakerFeeShareDenomsToAccruedValueRequest, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.takerFeeDenom = message.takerFeeDenom === "" ? undefined : message.takerFeeDenom;
    return obj;
  },
  fromAminoMsg(object: TakerFeeShareDenomsToAccruedValueRequestAminoMsg): TakerFeeShareDenomsToAccruedValueRequest {
    return TakerFeeShareDenomsToAccruedValueRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeShareDenomsToAccruedValueRequest, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-share-denoms-to-accrued-value-request",
      value: TakerFeeShareDenomsToAccruedValueRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeShareDenomsToAccruedValueRequestProtoMsg, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueRequest {
    return TakerFeeShareDenomsToAccruedValueRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeShareDenomsToAccruedValueRequest): Uint8Array {
    return TakerFeeShareDenomsToAccruedValueRequest.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeShareDenomsToAccruedValueRequest): TakerFeeShareDenomsToAccruedValueRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueRequest",
      value: TakerFeeShareDenomsToAccruedValueRequest.encode(message).finish()
    };
  }
};
function createBaseTakerFeeShareDenomsToAccruedValueResponse(): TakerFeeShareDenomsToAccruedValueResponse {
  return {
    amount: ""
  };
}
export const TakerFeeShareDenomsToAccruedValueResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueResponse",
  encode(message: TakerFeeShareDenomsToAccruedValueResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== "") {
      writer.uint32(10).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeShareDenomsToAccruedValueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeShareDenomsToAccruedValueResponse>): TakerFeeShareDenomsToAccruedValueResponse {
    const message = createBaseTakerFeeShareDenomsToAccruedValueResponse();
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: TakerFeeShareDenomsToAccruedValueResponseAmino): TakerFeeShareDenomsToAccruedValueResponse {
    const message = createBaseTakerFeeShareDenomsToAccruedValueResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: TakerFeeShareDenomsToAccruedValueResponse, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueResponseAmino {
    const obj: any = {};
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: TakerFeeShareDenomsToAccruedValueResponseAminoMsg): TakerFeeShareDenomsToAccruedValueResponse {
    return TakerFeeShareDenomsToAccruedValueResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeShareDenomsToAccruedValueResponse, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-share-denoms-to-accrued-value-response",
      value: TakerFeeShareDenomsToAccruedValueResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeShareDenomsToAccruedValueResponseProtoMsg, useInterfaces: boolean = false): TakerFeeShareDenomsToAccruedValueResponse {
    return TakerFeeShareDenomsToAccruedValueResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeShareDenomsToAccruedValueResponse): Uint8Array {
    return TakerFeeShareDenomsToAccruedValueResponse.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeShareDenomsToAccruedValueResponse): TakerFeeShareDenomsToAccruedValueResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeShareDenomsToAccruedValueResponse",
      value: TakerFeeShareDenomsToAccruedValueResponse.encode(message).finish()
    };
  }
};
function createBaseAllTakerFeeShareAccumulatorsRequest(): AllTakerFeeShareAccumulatorsRequest {
  return {};
}
export const AllTakerFeeShareAccumulatorsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsRequest",
  encode(_: AllTakerFeeShareAccumulatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllTakerFeeShareAccumulatorsRequest();
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
  fromPartial(_: Partial<AllTakerFeeShareAccumulatorsRequest>): AllTakerFeeShareAccumulatorsRequest {
    const message = createBaseAllTakerFeeShareAccumulatorsRequest();
    return message;
  },
  fromAmino(_: AllTakerFeeShareAccumulatorsRequestAmino): AllTakerFeeShareAccumulatorsRequest {
    const message = createBaseAllTakerFeeShareAccumulatorsRequest();
    return message;
  },
  toAmino(_: AllTakerFeeShareAccumulatorsRequest, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AllTakerFeeShareAccumulatorsRequestAminoMsg): AllTakerFeeShareAccumulatorsRequest {
    return AllTakerFeeShareAccumulatorsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllTakerFeeShareAccumulatorsRequest, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/all-taker-fee-share-accumulators-request",
      value: AllTakerFeeShareAccumulatorsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllTakerFeeShareAccumulatorsRequestProtoMsg, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsRequest {
    return AllTakerFeeShareAccumulatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllTakerFeeShareAccumulatorsRequest): Uint8Array {
    return AllTakerFeeShareAccumulatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllTakerFeeShareAccumulatorsRequest): AllTakerFeeShareAccumulatorsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsRequest",
      value: AllTakerFeeShareAccumulatorsRequest.encode(message).finish()
    };
  }
};
function createBaseAllTakerFeeShareAccumulatorsResponse(): AllTakerFeeShareAccumulatorsResponse {
  return {
    takerFeeSkimAccumulators: []
  };
}
export const AllTakerFeeShareAccumulatorsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsResponse",
  encode(message: AllTakerFeeShareAccumulatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.takerFeeSkimAccumulators) {
      TakerFeeSkimAccumulator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllTakerFeeShareAccumulatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.takerFeeSkimAccumulators.push(TakerFeeSkimAccumulator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllTakerFeeShareAccumulatorsResponse>): AllTakerFeeShareAccumulatorsResponse {
    const message = createBaseAllTakerFeeShareAccumulatorsResponse();
    message.takerFeeSkimAccumulators = object.takerFeeSkimAccumulators?.map(e => TakerFeeSkimAccumulator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllTakerFeeShareAccumulatorsResponseAmino): AllTakerFeeShareAccumulatorsResponse {
    const message = createBaseAllTakerFeeShareAccumulatorsResponse();
    message.takerFeeSkimAccumulators = object.taker_fee_skim_accumulators?.map(e => TakerFeeSkimAccumulator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllTakerFeeShareAccumulatorsResponse, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsResponseAmino {
    const obj: any = {};
    if (message.takerFeeSkimAccumulators) {
      obj.taker_fee_skim_accumulators = message.takerFeeSkimAccumulators.map(e => e ? TakerFeeSkimAccumulator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.taker_fee_skim_accumulators = message.takerFeeSkimAccumulators;
    }
    return obj;
  },
  fromAminoMsg(object: AllTakerFeeShareAccumulatorsResponseAminoMsg): AllTakerFeeShareAccumulatorsResponse {
    return AllTakerFeeShareAccumulatorsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllTakerFeeShareAccumulatorsResponse, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/all-taker-fee-share-accumulators-response",
      value: AllTakerFeeShareAccumulatorsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllTakerFeeShareAccumulatorsResponseProtoMsg, useInterfaces: boolean = false): AllTakerFeeShareAccumulatorsResponse {
    return AllTakerFeeShareAccumulatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllTakerFeeShareAccumulatorsResponse): Uint8Array {
    return AllTakerFeeShareAccumulatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllTakerFeeShareAccumulatorsResponse): AllTakerFeeShareAccumulatorsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllTakerFeeShareAccumulatorsResponse",
      value: AllTakerFeeShareAccumulatorsResponse.encode(message).finish()
    };
  }
};
function createBaseRegisteredAlloyedPoolFromDenomRequest(): RegisteredAlloyedPoolFromDenomRequest {
  return {
    denom: ""
  };
}
export const RegisteredAlloyedPoolFromDenomRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomRequest",
  encode(message: RegisteredAlloyedPoolFromDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredAlloyedPoolFromDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RegisteredAlloyedPoolFromDenomRequest>): RegisteredAlloyedPoolFromDenomRequest {
    const message = createBaseRegisteredAlloyedPoolFromDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: RegisteredAlloyedPoolFromDenomRequestAmino): RegisteredAlloyedPoolFromDenomRequest {
    const message = createBaseRegisteredAlloyedPoolFromDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: RegisteredAlloyedPoolFromDenomRequest, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: RegisteredAlloyedPoolFromDenomRequestAminoMsg): RegisteredAlloyedPoolFromDenomRequest {
    return RegisteredAlloyedPoolFromDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: RegisteredAlloyedPoolFromDenomRequest, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/registered-alloyed-pool-from-denom-request",
      value: RegisteredAlloyedPoolFromDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RegisteredAlloyedPoolFromDenomRequestProtoMsg, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomRequest {
    return RegisteredAlloyedPoolFromDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegisteredAlloyedPoolFromDenomRequest): Uint8Array {
    return RegisteredAlloyedPoolFromDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: RegisteredAlloyedPoolFromDenomRequest): RegisteredAlloyedPoolFromDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomRequest",
      value: RegisteredAlloyedPoolFromDenomRequest.encode(message).finish()
    };
  }
};
function createBaseRegisteredAlloyedPoolFromDenomResponse(): RegisteredAlloyedPoolFromDenomResponse {
  return {
    contractState: AlloyContractTakerFeeShareState.fromPartial({})
  };
}
export const RegisteredAlloyedPoolFromDenomResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomResponse",
  encode(message: RegisteredAlloyedPoolFromDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractState !== undefined) {
      AlloyContractTakerFeeShareState.encode(message.contractState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredAlloyedPoolFromDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractState = AlloyContractTakerFeeShareState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RegisteredAlloyedPoolFromDenomResponse>): RegisteredAlloyedPoolFromDenomResponse {
    const message = createBaseRegisteredAlloyedPoolFromDenomResponse();
    message.contractState = object.contractState !== undefined && object.contractState !== null ? AlloyContractTakerFeeShareState.fromPartial(object.contractState) : undefined;
    return message;
  },
  fromAmino(object: RegisteredAlloyedPoolFromDenomResponseAmino): RegisteredAlloyedPoolFromDenomResponse {
    const message = createBaseRegisteredAlloyedPoolFromDenomResponse();
    if (object.contract_state !== undefined && object.contract_state !== null) {
      message.contractState = AlloyContractTakerFeeShareState.fromAmino(object.contract_state);
    }
    return message;
  },
  toAmino(message: RegisteredAlloyedPoolFromDenomResponse, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomResponseAmino {
    const obj: any = {};
    obj.contract_state = message.contractState ? AlloyContractTakerFeeShareState.toAmino(message.contractState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: RegisteredAlloyedPoolFromDenomResponseAminoMsg): RegisteredAlloyedPoolFromDenomResponse {
    return RegisteredAlloyedPoolFromDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: RegisteredAlloyedPoolFromDenomResponse, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/registered-alloyed-pool-from-denom-response",
      value: RegisteredAlloyedPoolFromDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RegisteredAlloyedPoolFromDenomResponseProtoMsg, useInterfaces: boolean = false): RegisteredAlloyedPoolFromDenomResponse {
    return RegisteredAlloyedPoolFromDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegisteredAlloyedPoolFromDenomResponse): Uint8Array {
    return RegisteredAlloyedPoolFromDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: RegisteredAlloyedPoolFromDenomResponse): RegisteredAlloyedPoolFromDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromDenomResponse",
      value: RegisteredAlloyedPoolFromDenomResponse.encode(message).finish()
    };
  }
};
function createBaseRegisteredAlloyedPoolFromPoolIdRequest(): RegisteredAlloyedPoolFromPoolIdRequest {
  return {
    poolId: BigInt(0)
  };
}
export const RegisteredAlloyedPoolFromPoolIdRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdRequest",
  encode(message: RegisteredAlloyedPoolFromPoolIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredAlloyedPoolFromPoolIdRequest();
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
  fromPartial(object: Partial<RegisteredAlloyedPoolFromPoolIdRequest>): RegisteredAlloyedPoolFromPoolIdRequest {
    const message = createBaseRegisteredAlloyedPoolFromPoolIdRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: RegisteredAlloyedPoolFromPoolIdRequestAmino): RegisteredAlloyedPoolFromPoolIdRequest {
    const message = createBaseRegisteredAlloyedPoolFromPoolIdRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: RegisteredAlloyedPoolFromPoolIdRequest, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: RegisteredAlloyedPoolFromPoolIdRequestAminoMsg): RegisteredAlloyedPoolFromPoolIdRequest {
    return RegisteredAlloyedPoolFromPoolIdRequest.fromAmino(object.value);
  },
  toAminoMsg(message: RegisteredAlloyedPoolFromPoolIdRequest, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/registered-alloyed-pool-from-pool-id-request",
      value: RegisteredAlloyedPoolFromPoolIdRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RegisteredAlloyedPoolFromPoolIdRequestProtoMsg, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdRequest {
    return RegisteredAlloyedPoolFromPoolIdRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegisteredAlloyedPoolFromPoolIdRequest): Uint8Array {
    return RegisteredAlloyedPoolFromPoolIdRequest.encode(message).finish();
  },
  toProtoMsg(message: RegisteredAlloyedPoolFromPoolIdRequest): RegisteredAlloyedPoolFromPoolIdRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdRequest",
      value: RegisteredAlloyedPoolFromPoolIdRequest.encode(message).finish()
    };
  }
};
function createBaseRegisteredAlloyedPoolFromPoolIdResponse(): RegisteredAlloyedPoolFromPoolIdResponse {
  return {
    contractState: AlloyContractTakerFeeShareState.fromPartial({})
  };
}
export const RegisteredAlloyedPoolFromPoolIdResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdResponse",
  encode(message: RegisteredAlloyedPoolFromPoolIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractState !== undefined) {
      AlloyContractTakerFeeShareState.encode(message.contractState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredAlloyedPoolFromPoolIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractState = AlloyContractTakerFeeShareState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RegisteredAlloyedPoolFromPoolIdResponse>): RegisteredAlloyedPoolFromPoolIdResponse {
    const message = createBaseRegisteredAlloyedPoolFromPoolIdResponse();
    message.contractState = object.contractState !== undefined && object.contractState !== null ? AlloyContractTakerFeeShareState.fromPartial(object.contractState) : undefined;
    return message;
  },
  fromAmino(object: RegisteredAlloyedPoolFromPoolIdResponseAmino): RegisteredAlloyedPoolFromPoolIdResponse {
    const message = createBaseRegisteredAlloyedPoolFromPoolIdResponse();
    if (object.contract_state !== undefined && object.contract_state !== null) {
      message.contractState = AlloyContractTakerFeeShareState.fromAmino(object.contract_state);
    }
    return message;
  },
  toAmino(message: RegisteredAlloyedPoolFromPoolIdResponse, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdResponseAmino {
    const obj: any = {};
    obj.contract_state = message.contractState ? AlloyContractTakerFeeShareState.toAmino(message.contractState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: RegisteredAlloyedPoolFromPoolIdResponseAminoMsg): RegisteredAlloyedPoolFromPoolIdResponse {
    return RegisteredAlloyedPoolFromPoolIdResponse.fromAmino(object.value);
  },
  toAminoMsg(message: RegisteredAlloyedPoolFromPoolIdResponse, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/registered-alloyed-pool-from-pool-id-response",
      value: RegisteredAlloyedPoolFromPoolIdResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RegisteredAlloyedPoolFromPoolIdResponseProtoMsg, useInterfaces: boolean = false): RegisteredAlloyedPoolFromPoolIdResponse {
    return RegisteredAlloyedPoolFromPoolIdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegisteredAlloyedPoolFromPoolIdResponse): Uint8Array {
    return RegisteredAlloyedPoolFromPoolIdResponse.encode(message).finish();
  },
  toProtoMsg(message: RegisteredAlloyedPoolFromPoolIdResponse): RegisteredAlloyedPoolFromPoolIdResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.RegisteredAlloyedPoolFromPoolIdResponse",
      value: RegisteredAlloyedPoolFromPoolIdResponse.encode(message).finish()
    };
  }
};
function createBaseAllRegisteredAlloyedPoolsRequest(): AllRegisteredAlloyedPoolsRequest {
  return {};
}
export const AllRegisteredAlloyedPoolsRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsRequest",
  encode(_: AllRegisteredAlloyedPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllRegisteredAlloyedPoolsRequest();
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
  fromPartial(_: Partial<AllRegisteredAlloyedPoolsRequest>): AllRegisteredAlloyedPoolsRequest {
    const message = createBaseAllRegisteredAlloyedPoolsRequest();
    return message;
  },
  fromAmino(_: AllRegisteredAlloyedPoolsRequestAmino): AllRegisteredAlloyedPoolsRequest {
    const message = createBaseAllRegisteredAlloyedPoolsRequest();
    return message;
  },
  toAmino(_: AllRegisteredAlloyedPoolsRequest, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AllRegisteredAlloyedPoolsRequestAminoMsg): AllRegisteredAlloyedPoolsRequest {
    return AllRegisteredAlloyedPoolsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllRegisteredAlloyedPoolsRequest, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsRequestAminoMsg {
    return {
      type: "osmosis/poolmanager/all-registered-alloyed-pools-request",
      value: AllRegisteredAlloyedPoolsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllRegisteredAlloyedPoolsRequestProtoMsg, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsRequest {
    return AllRegisteredAlloyedPoolsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllRegisteredAlloyedPoolsRequest): Uint8Array {
    return AllRegisteredAlloyedPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllRegisteredAlloyedPoolsRequest): AllRegisteredAlloyedPoolsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsRequest",
      value: AllRegisteredAlloyedPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseAllRegisteredAlloyedPoolsResponse(): AllRegisteredAlloyedPoolsResponse {
  return {
    contractStates: []
  };
}
export const AllRegisteredAlloyedPoolsResponse = {
  typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsResponse",
  encode(message: AllRegisteredAlloyedPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.contractStates) {
      AlloyContractTakerFeeShareState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllRegisteredAlloyedPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractStates.push(AlloyContractTakerFeeShareState.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllRegisteredAlloyedPoolsResponse>): AllRegisteredAlloyedPoolsResponse {
    const message = createBaseAllRegisteredAlloyedPoolsResponse();
    message.contractStates = object.contractStates?.map(e => AlloyContractTakerFeeShareState.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllRegisteredAlloyedPoolsResponseAmino): AllRegisteredAlloyedPoolsResponse {
    const message = createBaseAllRegisteredAlloyedPoolsResponse();
    message.contractStates = object.contract_states?.map(e => AlloyContractTakerFeeShareState.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllRegisteredAlloyedPoolsResponse, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsResponseAmino {
    const obj: any = {};
    if (message.contractStates) {
      obj.contract_states = message.contractStates.map(e => e ? AlloyContractTakerFeeShareState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.contract_states = message.contractStates;
    }
    return obj;
  },
  fromAminoMsg(object: AllRegisteredAlloyedPoolsResponseAminoMsg): AllRegisteredAlloyedPoolsResponse {
    return AllRegisteredAlloyedPoolsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllRegisteredAlloyedPoolsResponse, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsResponseAminoMsg {
    return {
      type: "osmosis/poolmanager/all-registered-alloyed-pools-response",
      value: AllRegisteredAlloyedPoolsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllRegisteredAlloyedPoolsResponseProtoMsg, useInterfaces: boolean = false): AllRegisteredAlloyedPoolsResponse {
    return AllRegisteredAlloyedPoolsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllRegisteredAlloyedPoolsResponse): Uint8Array {
    return AllRegisteredAlloyedPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllRegisteredAlloyedPoolsResponse): AllRegisteredAlloyedPoolsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.AllRegisteredAlloyedPoolsResponse",
      value: AllRegisteredAlloyedPoolsResponse.encode(message).finish()
    };
  }
};
export const PoolI_InterfaceDecoder = (input: BinaryReader | Uint8Array): Pool1 | CosmWasmPool | Pool2 | Pool3 | Any => {
  const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
  const data = Any.decode(reader, reader.uint32(), true);
  switch (data.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return Pool1.decode(data.value, undefined, true);
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return CosmWasmPool.decode(data.value, undefined, true);
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return Pool2.decode(data.value, undefined, true);
    case "/osmosis.gamm.v1beta1.Pool":
      return Pool3.decode(data.value, undefined, true);
    default:
      return data;
  }
};
export const PoolI_FromAmino = (content: AnyAmino): Any => {
  switch (content.type) {
    case "osmosis/concentratedliquidity/pool":
      return Any.fromPartial({
        typeUrl: "/osmosis.concentratedliquidity.v1beta1.Pool",
        value: Pool1.encode(Pool1.fromPartial(Pool1.fromAmino(content.value))).finish()
      });
    case "osmosis/cosmwasmpool/cosm-wasm-pool":
      return Any.fromPartial({
        typeUrl: "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool",
        value: CosmWasmPool.encode(CosmWasmPool.fromPartial(CosmWasmPool.fromAmino(content.value))).finish()
      });
    case "osmosis/gamm/StableswapPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool",
        value: Pool2.encode(Pool2.fromPartial(Pool2.fromAmino(content.value))).finish()
      });
    case "osmosis/gamm/BalancerPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.v1beta1.Pool",
        value: Pool3.encode(Pool3.fromPartial(Pool3.fromAmino(content.value))).finish()
      });
    default:
      return Any.fromAmino(content);
  }
};
export const PoolI_ToAmino = (content: Any, useInterfaces: boolean = false) => {
  switch (content.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return {
        type: "osmosis/concentratedliquidity/pool",
        value: Pool1.toAmino(Pool1.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return {
        type: "osmosis/cosmwasmpool/cosm-wasm-pool",
        value: CosmWasmPool.toAmino(CosmWasmPool.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return {
        type: "osmosis/gamm/StableswapPool",
        value: Pool2.toAmino(Pool2.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.gamm.v1beta1.Pool":
      return {
        type: "osmosis/gamm/BalancerPool",
        value: Pool3.toAmino(Pool3.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    default:
      return Any.toAmino(content, useInterfaces);
  }
};
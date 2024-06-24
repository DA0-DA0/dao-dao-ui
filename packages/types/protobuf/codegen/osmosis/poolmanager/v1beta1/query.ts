//@ts-nocheck
import { SwapAmountInRoute, SwapAmountInRouteAmino, SwapAmountInRouteSDKType, SwapAmountOutRoute, SwapAmountOutRouteAmino, SwapAmountOutRouteSDKType } from "./swap_route";
import { Params, ParamsAmino, ParamsSDKType } from "./genesis";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Pool as Pool1 } from "../../concentratedliquidity/v1beta1/pool";
import { PoolProtoMsg as Pool1ProtoMsg } from "../../concentratedliquidity/v1beta1/pool";
import { PoolSDKType as Pool1SDKType } from "../../concentratedliquidity/v1beta1/pool";
import { CosmWasmPool, CosmWasmPoolProtoMsg, CosmWasmPoolSDKType } from "../../cosmwasmpool/v1beta1/model/pool";
import { Pool as Pool2 } from "../../gamm/pool-models/balancer/balancerPool";
import { PoolProtoMsg as Pool2ProtoMsg } from "../../gamm/pool-models/balancer/balancerPool";
import { PoolSDKType as Pool2SDKType } from "../../gamm/pool-models/balancer/balancerPool";
import { Pool as Pool3 } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { PoolProtoMsg as Pool3ProtoMsg } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { PoolSDKType as Pool3SDKType } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { BinaryReader, BinaryWriter } from "../../../binary";
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
  pool_id: bigint;
  token_in: string;
  routes: SwapAmountInRouteSDKType[];
}
export interface EstimateSwapExactAmountInWithPrimitiveTypesRequest {
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
  pool_id: bigint;
  routes: SwapAmountOutRouteSDKType[];
  token_out: string;
}
export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
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
    poolId: BigInt(0),
    tokenIn: "",
    routes: []
  };
}
export const EstimateSwapExactAmountInRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountInRequest",
  encode(message: EstimateSwapExactAmountInRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInRequestAmino): EstimateSwapExactAmountInRequest {
    const message = createBaseEstimateSwapExactAmountInRequest();
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
    poolId: BigInt(0),
    routes: [],
    tokenOut: ""
  };
}
export const EstimateSwapExactAmountOutRequest = {
  typeUrl: "/osmosis.poolmanager.v1beta1.EstimateSwapExactAmountOutRequest",
  encode(message: EstimateSwapExactAmountOutRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutRequestAmino): EstimateSwapExactAmountOutRequest {
    const message = createBaseEstimateSwapExactAmountOutRequest();
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
export const PoolI_InterfaceDecoder = (input: BinaryReader | Uint8Array): Pool1 | CosmWasmPool | Pool2 | Pool3 | Any => {
  const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
  const data = Any.decode(reader, reader.uint32(), true);
  switch (data.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return Pool1.decode(data.value, undefined, true);
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return CosmWasmPool.decode(data.value, undefined, true);
    case "/osmosis.gamm.v1beta1.Pool":
      return Pool2.decode(data.value, undefined, true);
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
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
    case "osmosis/gamm/BalancerPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.v1beta1.Pool",
        value: Pool2.encode(Pool2.fromPartial(Pool2.fromAmino(content.value))).finish()
      });
    case "osmosis/gamm/StableswapPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool",
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
    case "/osmosis.gamm.v1beta1.Pool":
      return {
        type: "osmosis/gamm/BalancerPool",
        value: Pool2.toAmino(Pool2.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return {
        type: "osmosis/gamm/StableswapPool",
        value: Pool3.toAmino(Pool3.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    default:
      return Any.toAmino(content, useInterfaces);
  }
};
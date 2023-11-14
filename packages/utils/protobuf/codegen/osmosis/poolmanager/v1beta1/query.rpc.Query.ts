import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { ParamsRequest, ParamsResponse, EstimateSwapExactAmountInRequest, EstimateSwapExactAmountInResponse, EstimateSwapExactAmountInWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountInRequest, EstimateSwapExactAmountOutRequest, EstimateSwapExactAmountOutResponse, EstimateSwapExactAmountOutWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountOutRequest, NumPoolsRequest, NumPoolsResponse, PoolRequest, PoolResponse, AllPoolsRequest, AllPoolsResponse, SpotPriceRequest, SpotPriceResponse, TotalPoolLiquidityRequest, TotalPoolLiquidityResponse, TotalLiquidityRequest, TotalLiquidityResponse } from "./query";
export interface Query {
  params(request?: ParamsRequest): Promise<ParamsResponse>;
  /** Estimates swap amount out given in. */
  estimateSwapExactAmountIn(request: EstimateSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponse>;
  /**
   * EstimateSwapExactAmountInWithPrimitiveTypes is an alternative query for
   * EstimateSwapExactAmountIn. Supports query via GRPC-Gateway by using
   * primitive types instead of repeated structs. Each index in the
   * routes_pool_id field corresponds to the respective routes_token_out_denom
   * value, thus they are required to have the same length and are grouped
   * together as pairs.
   * example usage:
   * http://0.0.0.0:1317/osmosis/poolmanager/v1beta1/1/estimate/
   * swap_exact_amount_in_with_primitive_types?token_in=100000stake&routes_token_out_denom=uatom
   * &routes_token_out_denom=uion&routes_pool_id=1&routes_pool_id=2
   */
  estimateSwapExactAmountInWithPrimitiveTypes(request: EstimateSwapExactAmountInWithPrimitiveTypesRequest): Promise<EstimateSwapExactAmountInResponse>;
  estimateSinglePoolSwapExactAmountIn(request: EstimateSinglePoolSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponse>;
  /** Estimates swap amount in given out. */
  estimateSwapExactAmountOut(request: EstimateSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponse>;
  /** Estimates swap amount in given out. */
  estimateSwapExactAmountOutWithPrimitiveTypes(request: EstimateSwapExactAmountOutWithPrimitiveTypesRequest): Promise<EstimateSwapExactAmountOutResponse>;
  estimateSinglePoolSwapExactAmountOut(request: EstimateSinglePoolSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponse>;
  /** Returns the total number of pools existing in Osmosis. */
  numPools(request?: NumPoolsRequest): Promise<NumPoolsResponse>;
  /** Pool returns the Pool specified by the pool id */
  pool(request: PoolRequest): Promise<PoolResponse>;
  /** AllPools returns all pools on the Osmosis chain sorted by IDs. */
  allPools(request?: AllPoolsRequest): Promise<AllPoolsResponse>;
  /**
   * SpotPrice defines a gRPC query handler that returns the spot price given
   * a base denomination and a quote denomination.
   */
  spotPrice(request: SpotPriceRequest): Promise<SpotPriceResponse>;
  /** TotalPoolLiquidity returns the total liquidity of the specified pool. */
  totalPoolLiquidity(request: TotalPoolLiquidityRequest): Promise<TotalPoolLiquidityResponse>;
  /** TotalLiquidity returns the total liquidity across all pools. */
  totalLiquidity(request?: TotalLiquidityRequest): Promise<TotalLiquidityResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.estimateSwapExactAmountIn = this.estimateSwapExactAmountIn.bind(this);
    this.estimateSwapExactAmountInWithPrimitiveTypes = this.estimateSwapExactAmountInWithPrimitiveTypes.bind(this);
    this.estimateSinglePoolSwapExactAmountIn = this.estimateSinglePoolSwapExactAmountIn.bind(this);
    this.estimateSwapExactAmountOut = this.estimateSwapExactAmountOut.bind(this);
    this.estimateSwapExactAmountOutWithPrimitiveTypes = this.estimateSwapExactAmountOutWithPrimitiveTypes.bind(this);
    this.estimateSinglePoolSwapExactAmountOut = this.estimateSinglePoolSwapExactAmountOut.bind(this);
    this.numPools = this.numPools.bind(this);
    this.pool = this.pool.bind(this);
    this.allPools = this.allPools.bind(this);
    this.spotPrice = this.spotPrice.bind(this);
    this.totalPoolLiquidity = this.totalPoolLiquidity.bind(this);
    this.totalLiquidity = this.totalLiquidity.bind(this);
  }
  params(request: ParamsRequest = {}, useInterfaces: boolean = true): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSwapExactAmountIn(request: EstimateSwapExactAmountInRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSwapExactAmountIn", data);
    return promise.then(data => EstimateSwapExactAmountInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSwapExactAmountInWithPrimitiveTypes(request: EstimateSwapExactAmountInWithPrimitiveTypesRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSwapExactAmountInWithPrimitiveTypesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSwapExactAmountInWithPrimitiveTypes", data);
    return promise.then(data => EstimateSwapExactAmountInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSinglePoolSwapExactAmountIn(request: EstimateSinglePoolSwapExactAmountInRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSinglePoolSwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSinglePoolSwapExactAmountIn", data);
    return promise.then(data => EstimateSwapExactAmountInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSwapExactAmountOut(request: EstimateSwapExactAmountOutRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSwapExactAmountOut", data);
    return promise.then(data => EstimateSwapExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSwapExactAmountOutWithPrimitiveTypes(request: EstimateSwapExactAmountOutWithPrimitiveTypesRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSwapExactAmountOutWithPrimitiveTypesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSwapExactAmountOutWithPrimitiveTypes", data);
    return promise.then(data => EstimateSwapExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSinglePoolSwapExactAmountOut(request: EstimateSinglePoolSwapExactAmountOutRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSinglePoolSwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateSinglePoolSwapExactAmountOut", data);
    return promise.then(data => EstimateSwapExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  numPools(request: NumPoolsRequest = {}, useInterfaces: boolean = true): Promise<NumPoolsResponse> {
    const data = NumPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "NumPools", data);
    return promise.then(data => NumPoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: PoolRequest, useInterfaces: boolean = true): Promise<PoolResponse> {
    const data = PoolRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "Pool", data);
    return promise.then(data => PoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allPools(request: AllPoolsRequest = {}, useInterfaces: boolean = true): Promise<AllPoolsResponse> {
    const data = AllPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "AllPools", data);
    return promise.then(data => AllPoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  spotPrice(request: SpotPriceRequest, useInterfaces: boolean = true): Promise<SpotPriceResponse> {
    const data = SpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "SpotPrice", data);
    return promise.then(data => SpotPriceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalPoolLiquidity(request: TotalPoolLiquidityRequest, useInterfaces: boolean = true): Promise<TotalPoolLiquidityResponse> {
    const data = TotalPoolLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TotalPoolLiquidity", data);
    return promise.then(data => TotalPoolLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalLiquidity(request: TotalLiquidityRequest = {}, useInterfaces: boolean = true): Promise<TotalLiquidityResponse> {
    const data = TotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TotalLiquidity", data);
    return promise.then(data => TotalLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: ParamsRequest, useInterfaces: boolean = true): Promise<ParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    estimateSwapExactAmountIn(request: EstimateSwapExactAmountInRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
      return queryService.estimateSwapExactAmountIn(request, useInterfaces);
    },
    estimateSwapExactAmountInWithPrimitiveTypes(request: EstimateSwapExactAmountInWithPrimitiveTypesRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
      return queryService.estimateSwapExactAmountInWithPrimitiveTypes(request, useInterfaces);
    },
    estimateSinglePoolSwapExactAmountIn(request: EstimateSinglePoolSwapExactAmountInRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountInResponse> {
      return queryService.estimateSinglePoolSwapExactAmountIn(request, useInterfaces);
    },
    estimateSwapExactAmountOut(request: EstimateSwapExactAmountOutRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
      return queryService.estimateSwapExactAmountOut(request, useInterfaces);
    },
    estimateSwapExactAmountOutWithPrimitiveTypes(request: EstimateSwapExactAmountOutWithPrimitiveTypesRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
      return queryService.estimateSwapExactAmountOutWithPrimitiveTypes(request, useInterfaces);
    },
    estimateSinglePoolSwapExactAmountOut(request: EstimateSinglePoolSwapExactAmountOutRequest, useInterfaces: boolean = true): Promise<EstimateSwapExactAmountOutResponse> {
      return queryService.estimateSinglePoolSwapExactAmountOut(request, useInterfaces);
    },
    numPools(request?: NumPoolsRequest, useInterfaces: boolean = true): Promise<NumPoolsResponse> {
      return queryService.numPools(request, useInterfaces);
    },
    pool(request: PoolRequest, useInterfaces: boolean = true): Promise<PoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    allPools(request?: AllPoolsRequest, useInterfaces: boolean = true): Promise<AllPoolsResponse> {
      return queryService.allPools(request, useInterfaces);
    },
    spotPrice(request: SpotPriceRequest, useInterfaces: boolean = true): Promise<SpotPriceResponse> {
      return queryService.spotPrice(request, useInterfaces);
    },
    totalPoolLiquidity(request: TotalPoolLiquidityRequest, useInterfaces: boolean = true): Promise<TotalPoolLiquidityResponse> {
      return queryService.totalPoolLiquidity(request, useInterfaces);
    },
    totalLiquidity(request?: TotalLiquidityRequest, useInterfaces: boolean = true): Promise<TotalLiquidityResponse> {
      return queryService.totalLiquidity(request, useInterfaces);
    }
  };
};
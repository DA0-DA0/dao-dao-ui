import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { ParamsRequest, ParamsResponse, EstimateSwapExactAmountInRequest, EstimateSwapExactAmountInResponse, EstimateSwapExactAmountInWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountInRequest, EstimateSwapExactAmountOutRequest, EstimateSwapExactAmountOutResponse, EstimateSwapExactAmountOutWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountOutRequest, NumPoolsRequest, NumPoolsResponse, PoolRequest, PoolResponse, AllPoolsRequest, AllPoolsResponse, ListPoolsByDenomRequest, ListPoolsByDenomResponse, SpotPriceRequest, SpotPriceResponse, TotalPoolLiquidityRequest, TotalPoolLiquidityResponse, TotalLiquidityRequest, TotalLiquidityResponse, TotalVolumeForPoolRequest, TotalVolumeForPoolResponse, TradingPairTakerFeeRequest, TradingPairTakerFeeResponse, EstimateTradeBasedOnPriceImpactRequest, EstimateTradeBasedOnPriceImpactResponse, AllTakerFeeShareAgreementsRequest, AllTakerFeeShareAgreementsResponse, TakerFeeShareAgreementFromDenomRequest, TakerFeeShareAgreementFromDenomResponse, TakerFeeShareDenomsToAccruedValueRequest, TakerFeeShareDenomsToAccruedValueResponse, AllTakerFeeShareAccumulatorsRequest, AllTakerFeeShareAccumulatorsResponse, RegisteredAlloyedPoolFromDenomRequest, RegisteredAlloyedPoolFromDenomResponse, RegisteredAlloyedPoolFromPoolIdRequest, RegisteredAlloyedPoolFromPoolIdResponse, AllRegisteredAlloyedPoolsRequest, AllRegisteredAlloyedPoolsResponse } from "./query";
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
  /** ListPoolsByDenom return all pools by denom */
  listPoolsByDenom(request: ListPoolsByDenomRequest): Promise<ListPoolsByDenomResponse>;
  /**
   * SpotPrice defines a gRPC query handler that returns the spot price given
   * a base denomination and a quote denomination.
   */
  spotPrice(request: SpotPriceRequest): Promise<SpotPriceResponse>;
  /** TotalPoolLiquidity returns the total liquidity of the specified pool. */
  totalPoolLiquidity(request: TotalPoolLiquidityRequest): Promise<TotalPoolLiquidityResponse>;
  /** TotalLiquidity returns the total liquidity across all pools. */
  totalLiquidity(request?: TotalLiquidityRequest): Promise<TotalLiquidityResponse>;
  /** TotalVolumeForPool returns the total volume of the specified pool. */
  totalVolumeForPool(request: TotalVolumeForPoolRequest): Promise<TotalVolumeForPoolResponse>;
  /** TradingPairTakerFee returns the taker fee for a given set of denoms */
  tradingPairTakerFee(request: TradingPairTakerFeeRequest): Promise<TradingPairTakerFeeResponse>;
  /**
   * EstimateTradeBasedOnPriceImpact returns an estimated trade based on price
   * impact, if a trade cannot be estimated a 0 input and 0 output would be
   * returned.
   */
  estimateTradeBasedOnPriceImpact(request: EstimateTradeBasedOnPriceImpactRequest): Promise<EstimateTradeBasedOnPriceImpactResponse>;
  /**
   * AllTakerFeeShareAgreements returns all taker fee share agreements.
   * A taker fee share agreement includes the denom of the denom getting the
   * taker fees, the percent of the taker fees that the denom gets when it is
   * in the route being traded against, and the address that the taker fees are
   * sent to at epoch.
   */
  allTakerFeeShareAgreements(request?: AllTakerFeeShareAgreementsRequest): Promise<AllTakerFeeShareAgreementsResponse>;
  /**
   * TakerFeeShareAgreementFromDenom returns the taker fee share agreement for a
   * given denom. A taker fee share agreement includes the denom of the denom
   * getting the taker fees, the percent of the taker fees that the denom gets
   * when it is in the route being traded against, and the address that the
   * taker fees are sent to at epoch.
   */
  takerFeeShareAgreementFromDenom(request: TakerFeeShareAgreementFromDenomRequest): Promise<TakerFeeShareAgreementFromDenomResponse>;
  /**
   * TakerFeeShareDenomsToAccruedValue returns the accrued value (as an Int) of
   * the given taker fee denom (the collected fees) for the given fee share
   * denom (the denom with the taker fee share agreement)
   */
  takerFeeShareDenomsToAccruedValue(request: TakerFeeShareDenomsToAccruedValueRequest): Promise<TakerFeeShareDenomsToAccruedValueResponse>;
  /**
   * AllTakerFeeShareAccumulators returns all taker fee share accumulators. A
   * taker fee share accumulator includes the denom of the denom getting the
   * taker fees, and an accumulated value of coins that the denom has accrued
   * since the last time it was distributed in the epoch prior.
   */
  allTakerFeeShareAccumulators(request?: AllTakerFeeShareAccumulatorsRequest): Promise<AllTakerFeeShareAccumulatorsResponse>;
  /**
   * RegisteredAlloyedPoolFromDenom returns the registered alloyed pool state
   * from the given denom. The registered alloyed pool contains the pool's
   * contract address, along with the current distribution composition of taker
   * fee share denoms within the alloyed pool.
   */
  registeredAlloyedPoolFromDenom(request: RegisteredAlloyedPoolFromDenomRequest): Promise<RegisteredAlloyedPoolFromDenomResponse>;
  /**
   * RegisteredAlloyedPoolFromPoolId returns the registered alloyed pool state
   * from the given pool id. The registered alloyed pool contains the pool's
   * contract address, along with the current distribution composition of taker
   * fee share denoms within the alloyed pool.
   */
  registeredAlloyedPoolFromPoolId(request: RegisteredAlloyedPoolFromPoolIdRequest): Promise<RegisteredAlloyedPoolFromPoolIdResponse>;
  /**
   * AllRegisteredAlloyedPools returns all registered alloyed pools. The
   * registered alloyed pool contains the pool's contract address, along with
   * the current distribution composition of taker fee share denoms within the
   * alloyed pool.
   */
  allRegisteredAlloyedPools(request?: AllRegisteredAlloyedPoolsRequest): Promise<AllRegisteredAlloyedPoolsResponse>;
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
    this.listPoolsByDenom = this.listPoolsByDenom.bind(this);
    this.spotPrice = this.spotPrice.bind(this);
    this.totalPoolLiquidity = this.totalPoolLiquidity.bind(this);
    this.totalLiquidity = this.totalLiquidity.bind(this);
    this.totalVolumeForPool = this.totalVolumeForPool.bind(this);
    this.tradingPairTakerFee = this.tradingPairTakerFee.bind(this);
    this.estimateTradeBasedOnPriceImpact = this.estimateTradeBasedOnPriceImpact.bind(this);
    this.allTakerFeeShareAgreements = this.allTakerFeeShareAgreements.bind(this);
    this.takerFeeShareAgreementFromDenom = this.takerFeeShareAgreementFromDenom.bind(this);
    this.takerFeeShareDenomsToAccruedValue = this.takerFeeShareDenomsToAccruedValue.bind(this);
    this.allTakerFeeShareAccumulators = this.allTakerFeeShareAccumulators.bind(this);
    this.registeredAlloyedPoolFromDenom = this.registeredAlloyedPoolFromDenom.bind(this);
    this.registeredAlloyedPoolFromPoolId = this.registeredAlloyedPoolFromPoolId.bind(this);
    this.allRegisteredAlloyedPools = this.allRegisteredAlloyedPools.bind(this);
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
  listPoolsByDenom(request: ListPoolsByDenomRequest, useInterfaces: boolean = true): Promise<ListPoolsByDenomResponse> {
    const data = ListPoolsByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "ListPoolsByDenom", data);
    return promise.then(data => ListPoolsByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
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
  totalVolumeForPool(request: TotalVolumeForPoolRequest, useInterfaces: boolean = true): Promise<TotalVolumeForPoolResponse> {
    const data = TotalVolumeForPoolRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TotalVolumeForPool", data);
    return promise.then(data => TotalVolumeForPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tradingPairTakerFee(request: TradingPairTakerFeeRequest, useInterfaces: boolean = true): Promise<TradingPairTakerFeeResponse> {
    const data = TradingPairTakerFeeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TradingPairTakerFee", data);
    return promise.then(data => TradingPairTakerFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateTradeBasedOnPriceImpact(request: EstimateTradeBasedOnPriceImpactRequest, useInterfaces: boolean = true): Promise<EstimateTradeBasedOnPriceImpactResponse> {
    const data = EstimateTradeBasedOnPriceImpactRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "EstimateTradeBasedOnPriceImpact", data);
    return promise.then(data => EstimateTradeBasedOnPriceImpactResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allTakerFeeShareAgreements(request: AllTakerFeeShareAgreementsRequest = {}, useInterfaces: boolean = true): Promise<AllTakerFeeShareAgreementsResponse> {
    const data = AllTakerFeeShareAgreementsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "AllTakerFeeShareAgreements", data);
    return promise.then(data => AllTakerFeeShareAgreementsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  takerFeeShareAgreementFromDenom(request: TakerFeeShareAgreementFromDenomRequest, useInterfaces: boolean = true): Promise<TakerFeeShareAgreementFromDenomResponse> {
    const data = TakerFeeShareAgreementFromDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TakerFeeShareAgreementFromDenom", data);
    return promise.then(data => TakerFeeShareAgreementFromDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  takerFeeShareDenomsToAccruedValue(request: TakerFeeShareDenomsToAccruedValueRequest, useInterfaces: boolean = true): Promise<TakerFeeShareDenomsToAccruedValueResponse> {
    const data = TakerFeeShareDenomsToAccruedValueRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "TakerFeeShareDenomsToAccruedValue", data);
    return promise.then(data => TakerFeeShareDenomsToAccruedValueResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allTakerFeeShareAccumulators(request: AllTakerFeeShareAccumulatorsRequest = {}, useInterfaces: boolean = true): Promise<AllTakerFeeShareAccumulatorsResponse> {
    const data = AllTakerFeeShareAccumulatorsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "AllTakerFeeShareAccumulators", data);
    return promise.then(data => AllTakerFeeShareAccumulatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredAlloyedPoolFromDenom(request: RegisteredAlloyedPoolFromDenomRequest, useInterfaces: boolean = true): Promise<RegisteredAlloyedPoolFromDenomResponse> {
    const data = RegisteredAlloyedPoolFromDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "RegisteredAlloyedPoolFromDenom", data);
    return promise.then(data => RegisteredAlloyedPoolFromDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredAlloyedPoolFromPoolId(request: RegisteredAlloyedPoolFromPoolIdRequest, useInterfaces: boolean = true): Promise<RegisteredAlloyedPoolFromPoolIdResponse> {
    const data = RegisteredAlloyedPoolFromPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "RegisteredAlloyedPoolFromPoolId", data);
    return promise.then(data => RegisteredAlloyedPoolFromPoolIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allRegisteredAlloyedPools(request: AllRegisteredAlloyedPoolsRequest = {}, useInterfaces: boolean = true): Promise<AllRegisteredAlloyedPoolsResponse> {
    const data = AllRegisteredAlloyedPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Query", "AllRegisteredAlloyedPools", data);
    return promise.then(data => AllRegisteredAlloyedPoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
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
    listPoolsByDenom(request: ListPoolsByDenomRequest, useInterfaces: boolean = true): Promise<ListPoolsByDenomResponse> {
      return queryService.listPoolsByDenom(request, useInterfaces);
    },
    spotPrice(request: SpotPriceRequest, useInterfaces: boolean = true): Promise<SpotPriceResponse> {
      return queryService.spotPrice(request, useInterfaces);
    },
    totalPoolLiquidity(request: TotalPoolLiquidityRequest, useInterfaces: boolean = true): Promise<TotalPoolLiquidityResponse> {
      return queryService.totalPoolLiquidity(request, useInterfaces);
    },
    totalLiquidity(request?: TotalLiquidityRequest, useInterfaces: boolean = true): Promise<TotalLiquidityResponse> {
      return queryService.totalLiquidity(request, useInterfaces);
    },
    totalVolumeForPool(request: TotalVolumeForPoolRequest, useInterfaces: boolean = true): Promise<TotalVolumeForPoolResponse> {
      return queryService.totalVolumeForPool(request, useInterfaces);
    },
    tradingPairTakerFee(request: TradingPairTakerFeeRequest, useInterfaces: boolean = true): Promise<TradingPairTakerFeeResponse> {
      return queryService.tradingPairTakerFee(request, useInterfaces);
    },
    estimateTradeBasedOnPriceImpact(request: EstimateTradeBasedOnPriceImpactRequest, useInterfaces: boolean = true): Promise<EstimateTradeBasedOnPriceImpactResponse> {
      return queryService.estimateTradeBasedOnPriceImpact(request, useInterfaces);
    },
    allTakerFeeShareAgreements(request?: AllTakerFeeShareAgreementsRequest, useInterfaces: boolean = true): Promise<AllTakerFeeShareAgreementsResponse> {
      return queryService.allTakerFeeShareAgreements(request, useInterfaces);
    },
    takerFeeShareAgreementFromDenom(request: TakerFeeShareAgreementFromDenomRequest, useInterfaces: boolean = true): Promise<TakerFeeShareAgreementFromDenomResponse> {
      return queryService.takerFeeShareAgreementFromDenom(request, useInterfaces);
    },
    takerFeeShareDenomsToAccruedValue(request: TakerFeeShareDenomsToAccruedValueRequest, useInterfaces: boolean = true): Promise<TakerFeeShareDenomsToAccruedValueResponse> {
      return queryService.takerFeeShareDenomsToAccruedValue(request, useInterfaces);
    },
    allTakerFeeShareAccumulators(request?: AllTakerFeeShareAccumulatorsRequest, useInterfaces: boolean = true): Promise<AllTakerFeeShareAccumulatorsResponse> {
      return queryService.allTakerFeeShareAccumulators(request, useInterfaces);
    },
    registeredAlloyedPoolFromDenom(request: RegisteredAlloyedPoolFromDenomRequest, useInterfaces: boolean = true): Promise<RegisteredAlloyedPoolFromDenomResponse> {
      return queryService.registeredAlloyedPoolFromDenom(request, useInterfaces);
    },
    registeredAlloyedPoolFromPoolId(request: RegisteredAlloyedPoolFromPoolIdRequest, useInterfaces: boolean = true): Promise<RegisteredAlloyedPoolFromPoolIdResponse> {
      return queryService.registeredAlloyedPoolFromPoolId(request, useInterfaces);
    },
    allRegisteredAlloyedPools(request?: AllRegisteredAlloyedPoolsRequest, useInterfaces: boolean = true): Promise<AllRegisteredAlloyedPoolsResponse> {
      return queryService.allRegisteredAlloyedPools(request, useInterfaces);
    }
  };
};
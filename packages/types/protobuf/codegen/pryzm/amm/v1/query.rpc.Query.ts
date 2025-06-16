import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetPoolTokenRequest, QueryGetPoolTokenResponse, QueryAllPoolTokenRequest, QueryAllPoolTokenResponse, QueryAllPoolTokenForPoolRequest, QueryAllPoolTokenForPoolResponse, QueryAllPoolTokenWeightRequest, QueryAllPoolTokenWeightResponse, QueryGetPoolTokenWeightRequest, QueryGetPoolTokenWeightResponse, QueryAllPoolTokenInfoRequest, QueryAllPoolTokenInfoResponse, QueryGetPoolTokenInfoRequest, QueryGetPoolTokenInfoResponse, QueryGetPoolRequest, QueryGetPoolResponse, QueryAllPoolRequest, QueryAllPoolResponse, QueryGetWeightedTokenRequest, QueryGetWeightedTokenResponse, QueryAllWeightedTokenRequest, QueryAllWeightedTokenResponse, QueryGetWeightUpdateTimingRequest, QueryGetWeightUpdateTimingResponse, QueryAllWeightUpdateTimingRequest, QueryAllWeightUpdateTimingResponse, QuerySimulateSingleSwapRequest, QuerySimulateSingleSwapResponse, QuerySimulateInitializePoolRequest, QuerySimulateInitializePoolResponse, QuerySimulateJoinAllTokensExactLptRequest, QuerySimulateJoinAllTokensExactLptResponse, QuerySimulateJoinExactTokensRequest, QuerySimulateJoinExactTokensResponse, QuerySimulateZeroImpactJoinYammRequest, QuerySimulateZeroImpactJoinYammResponse, QuerySimulateJoinTokenExactLptRequest, QuerySimulateJoinTokenExactLptResponse, QuerySimulateExitTokenExactLptRequest, QuerySimulateExitTokenExactLptResponse, QuerySimulateExitExactTokensRequest, QuerySimulateExitExactTokensResponse, QuerySimulateExitAllTokensExactLptRequest, QuerySimulateExitAllTokensExactLptResponse, QuerySpotPriceRequest, QuerySpotPriceResponse, QueryGetPermanentVirtualBalancePoolTokenRequest, QueryGetPermanentVirtualBalancePoolTokenResponse, QueryAllPermanentVirtualBalancePoolTokenRequest, QueryAllPermanentVirtualBalancePoolTokenResponse, QueryGetIntroducingPoolTokenRequest, QueryGetIntroducingPoolTokenResponse, QueryAllIntroducingPoolTokenRequest, QueryAllIntroducingPoolTokenResponse, QueryGetExpiringPoolTokenRequest, QueryGetExpiringPoolTokenResponse, QueryAllExpiringPoolTokenRequest, QueryAllExpiringPoolTokenResponse, QueryLpTokenRequest, QueryLpTokenResponse, QuerySimulateBatchSwapRequest, QuerySimulateBatchSwapResponse, QueryGetYammConfigurationRequest, QueryGetYammConfigurationResponse, QueryAllYammConfigurationRequest, QueryAllYammConfigurationResponse, QueryGetWhitelistedRouteRequest, QueryGetWhitelistedRouteResponse, QueryAllWhitelistedRouteRequest, QueryAllWhitelistedRouteResponse, QueryGetOrderRequest, QueryGetOrderResponse, QueryAllOrderRequest, QueryAllOrderResponse, QueryGetExecutableOrderRequest, QueryGetExecutableOrderResponse, QueryAllExecutableOrderRequest, QueryAllExecutableOrderResponse, QueryGetScheduleOrderRequest, QueryGetScheduleOrderResponse, QueryAllScheduleOrderRequest, QueryAllScheduleOrderResponse, QueryGetOraclePricePairRequest, QueryGetOraclePricePairResponse, QueryAllOraclePricePairRequest, QueryAllOraclePricePairResponse, QueryVaultPauseModeRequest, QueryVaultPauseModeResponse, QueryGetPendingTokenIntroductionRequest, QueryGetPendingTokenIntroductionResponse, QueryAllPendingTokenIntroductionRequest, QueryAllPendingTokenIntroductionResponse, QueryYammPoolIdRequest, QueryYammPoolIdResponse, QueryOrderStepBoundsRequest, QueryOrderStepBoundsResponse, QueryAllDisabledOrderPairRequest, QueryAllDisabledOrderPairResponse, QueryOrderPairDisabledRequest, QueryOrderPairDisabledResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a PoolToken by index. */
  poolToken(request: QueryGetPoolTokenRequest): Promise<QueryGetPoolTokenResponse>;
  /** Queries a list of PoolToken items. */
  poolTokenAll(request: QueryAllPoolTokenRequest): Promise<QueryAllPoolTokenResponse>;
  poolTokenAllForPool(request: QueryAllPoolTokenForPoolRequest): Promise<QueryAllPoolTokenForPoolResponse>;
  /**
   * Queries a list of TokenWeights
   * computing normalized weights requires reading all tokens from the context
   * and computing weight for all of them. And the number of tokens in a pool is not expected to
   * be high.
   * therefore, this query is not paginated
   */
  poolTokenWeightAll(request: QueryAllPoolTokenWeightRequest): Promise<QueryAllPoolTokenWeightResponse>;
  /** Queries a TokenWeight */
  poolTokenWeight(request: QueryGetPoolTokenWeightRequest): Promise<QueryGetPoolTokenWeightResponse>;
  /**
   * Queries a list of TokenInfo
   * computing normalized weights requires reading all tokens from the context
   * and computing weight for all of them. And the number of tokens in a pool is not expected to
   * be high.
   * therefore, this query is not paginated
   */
  poolTokenInfoAll(request: QueryAllPoolTokenInfoRequest): Promise<QueryAllPoolTokenInfoResponse>;
  /** Queries a TokenInfo */
  poolTokenInfo(request: QueryGetPoolTokenInfoRequest): Promise<QueryGetPoolTokenInfoResponse>;
  /** Queries a Pool by id. */
  pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  /** Queries a list of Pool items. */
  poolAll(request?: QueryAllPoolRequest): Promise<QueryAllPoolResponse>;
  /** Queries a WeightedToken by index. */
  weightedToken(request: QueryGetWeightedTokenRequest): Promise<QueryGetWeightedTokenResponse>;
  /** Queries a list of WeightedToken items. */
  weightedTokenAll(request?: QueryAllWeightedTokenRequest): Promise<QueryAllWeightedTokenResponse>;
  /** Queries a WeightUpdateTiming by index. */
  weightUpdateTiming(request: QueryGetWeightUpdateTimingRequest): Promise<QueryGetWeightUpdateTimingResponse>;
  /** Queries a list of WeightUpdateTiming items. */
  weightUpdateTimingAll(request?: QueryAllWeightUpdateTimingRequest): Promise<QueryAllWeightUpdateTimingResponse>;
  /** Simulates a single swap action and returns the result */
  simulateSingleSwap(request: QuerySimulateSingleSwapRequest): Promise<QuerySimulateSingleSwapResponse>;
  /** Queries a list of SimulateInitializePool items. */
  simulateInitializePool(request: QuerySimulateInitializePoolRequest): Promise<QuerySimulateInitializePoolResponse>;
  /** Queries a list of SimulateJoinAllTokensExactLpt items. */
  simulateJoinAllTokensExactLpt(request: QuerySimulateJoinAllTokensExactLptRequest): Promise<QuerySimulateJoinAllTokensExactLptResponse>;
  /** Queries a list of SimulateJoinExactTokens items. */
  simulateJoinExactTokens(request: QuerySimulateJoinExactTokensRequest): Promise<QuerySimulateJoinExactTokensResponse>;
  /** Queries a list of SimulateJoinExactTokens items. */
  simulateZeroImpactJoinYamm(request: QuerySimulateZeroImpactJoinYammRequest): Promise<QuerySimulateZeroImpactJoinYammResponse>;
  /** Queries a list of SimulateJoinTokenExactLpt items. */
  simulateJoinTokenExactLpt(request: QuerySimulateJoinTokenExactLptRequest): Promise<QuerySimulateJoinTokenExactLptResponse>;
  /** Queries a list of SimulateExitTokenExactLpt items. */
  simulateExitTokenExactLpt(request: QuerySimulateExitTokenExactLptRequest): Promise<QuerySimulateExitTokenExactLptResponse>;
  /** Queries a list of SimulateExitExactTokens items. */
  simulateExitExactTokens(request: QuerySimulateExitExactTokensRequest): Promise<QuerySimulateExitExactTokensResponse>;
  /** Queries a list of SimulateExitAllTokensExactLpt items. */
  simulateExitAllTokensExactLpt(request: QuerySimulateExitAllTokensExactLptRequest): Promise<QuerySimulateExitAllTokensExactLptResponse>;
  /** Queries a list of SpotPrice items. */
  spotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse>;
  /** Queries a PermanentVirtualBalancePoolToken by index. */
  permanentVirtualBalancePoolToken(request: QueryGetPermanentVirtualBalancePoolTokenRequest): Promise<QueryGetPermanentVirtualBalancePoolTokenResponse>;
  /** Queries a list of PermanentVirtualBalancePoolToken items. */
  permanentVirtualBalancePoolTokenAll(request?: QueryAllPermanentVirtualBalancePoolTokenRequest): Promise<QueryAllPermanentVirtualBalancePoolTokenResponse>;
  /** Queries a IntroducingPoolToken by index. */
  introducingPoolToken(request: QueryGetIntroducingPoolTokenRequest): Promise<QueryGetIntroducingPoolTokenResponse>;
  /** Queries a list of IntroducingPoolToken items. */
  introducingPoolTokenAll(request?: QueryAllIntroducingPoolTokenRequest): Promise<QueryAllIntroducingPoolTokenResponse>;
  /** Queries a ExpiringPoolToken by index. */
  expiringPoolToken(request: QueryGetExpiringPoolTokenRequest): Promise<QueryGetExpiringPoolTokenResponse>;
  /** Queries a list of ExpiringPoolToken items. */
  expiringPoolTokenAll(request?: QueryAllExpiringPoolTokenRequest): Promise<QueryAllExpiringPoolTokenResponse>;
  /** Queries a list of LpToken items. */
  lpToken(request: QueryLpTokenRequest): Promise<QueryLpTokenResponse>;
  /** Queries a list of SimulateBatchSwap items. */
  simulateBatchSwap(request: QuerySimulateBatchSwapRequest): Promise<QuerySimulateBatchSwapResponse>;
  /** Queries a YammConfiguration by index. */
  yammConfiguration(request: QueryGetYammConfigurationRequest): Promise<QueryGetYammConfigurationResponse>;
  /** Queries a list of YammConfiguration items. */
  yammConfigurationAll(request?: QueryAllYammConfigurationRequest): Promise<QueryAllYammConfigurationResponse>;
  /** Queries a WhitelistedRoute by index. */
  whitelistedRoute(request: QueryGetWhitelistedRouteRequest): Promise<QueryGetWhitelistedRouteResponse>;
  /** Queries a list of WhitelistedRoute items. */
  whitelistedRouteAll(request?: QueryAllWhitelistedRouteRequest): Promise<QueryAllWhitelistedRouteResponse>;
  /** Queries a Order by id. */
  order(request: QueryGetOrderRequest): Promise<QueryGetOrderResponse>;
  /** Queries a list of Order items. */
  orderAll(request?: QueryAllOrderRequest): Promise<QueryAllOrderResponse>;
  /** Queries a ExecutableOrder by index. */
  executableOrder(request: QueryGetExecutableOrderRequest): Promise<QueryGetExecutableOrderResponse>;
  /** Queries a list of ExecutableOrder items. */
  executableOrderAll(request?: QueryAllExecutableOrderRequest): Promise<QueryAllExecutableOrderResponse>;
  /** Queries a ScheduleOrder by index. */
  scheduleOrder(request: QueryGetScheduleOrderRequest): Promise<QueryGetScheduleOrderResponse>;
  /** Queries a list of ScheduleOrder items. */
  scheduleOrderAll(request?: QueryAllScheduleOrderRequest): Promise<QueryAllScheduleOrderResponse>;
  /** Queries a OraclePricePair by index. */
  oraclePricePair(request: QueryGetOraclePricePairRequest): Promise<QueryGetOraclePricePairResponse>;
  /** Queries a list of OraclePricePair items. */
  oraclePricePairAll(request?: QueryAllOraclePricePairRequest): Promise<QueryAllOraclePricePairResponse>;
  /** Queries a list of VaultPauseMode items. */
  vaultPauseMode(request?: QueryVaultPauseModeRequest): Promise<QueryVaultPauseModeResponse>;
  /** Queries a PendingTokenIntroduction by index. */
  pendingTokenIntroduction(request: QueryGetPendingTokenIntroductionRequest): Promise<QueryGetPendingTokenIntroductionResponse>;
  /** Queries a list of PendingTokenIntroduction items. */
  pendingTokenIntroductionAll(request?: QueryAllPendingTokenIntroductionRequest): Promise<QueryAllPendingTokenIntroductionResponse>;
  /** Queries a YammPoolId item. */
  yammPoolId(request: QueryYammPoolIdRequest): Promise<QueryYammPoolIdResponse>;
  orderStepBounds(request: QueryOrderStepBoundsRequest): Promise<QueryOrderStepBoundsResponse>;
  /** Queries a list of all disabled order pairs */
  disabledOrderPairAll(request?: QueryAllDisabledOrderPairRequest): Promise<QueryAllDisabledOrderPairResponse>;
  /** Queries whether or not a pair is disabled */
  orderPairDisabled(request: QueryOrderPairDisabledRequest): Promise<QueryOrderPairDisabledResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.poolToken = this.poolToken.bind(this);
    this.poolTokenAll = this.poolTokenAll.bind(this);
    this.poolTokenAllForPool = this.poolTokenAllForPool.bind(this);
    this.poolTokenWeightAll = this.poolTokenWeightAll.bind(this);
    this.poolTokenWeight = this.poolTokenWeight.bind(this);
    this.poolTokenInfoAll = this.poolTokenInfoAll.bind(this);
    this.poolTokenInfo = this.poolTokenInfo.bind(this);
    this.pool = this.pool.bind(this);
    this.poolAll = this.poolAll.bind(this);
    this.weightedToken = this.weightedToken.bind(this);
    this.weightedTokenAll = this.weightedTokenAll.bind(this);
    this.weightUpdateTiming = this.weightUpdateTiming.bind(this);
    this.weightUpdateTimingAll = this.weightUpdateTimingAll.bind(this);
    this.simulateSingleSwap = this.simulateSingleSwap.bind(this);
    this.simulateInitializePool = this.simulateInitializePool.bind(this);
    this.simulateJoinAllTokensExactLpt = this.simulateJoinAllTokensExactLpt.bind(this);
    this.simulateJoinExactTokens = this.simulateJoinExactTokens.bind(this);
    this.simulateZeroImpactJoinYamm = this.simulateZeroImpactJoinYamm.bind(this);
    this.simulateJoinTokenExactLpt = this.simulateJoinTokenExactLpt.bind(this);
    this.simulateExitTokenExactLpt = this.simulateExitTokenExactLpt.bind(this);
    this.simulateExitExactTokens = this.simulateExitExactTokens.bind(this);
    this.simulateExitAllTokensExactLpt = this.simulateExitAllTokensExactLpt.bind(this);
    this.spotPrice = this.spotPrice.bind(this);
    this.permanentVirtualBalancePoolToken = this.permanentVirtualBalancePoolToken.bind(this);
    this.permanentVirtualBalancePoolTokenAll = this.permanentVirtualBalancePoolTokenAll.bind(this);
    this.introducingPoolToken = this.introducingPoolToken.bind(this);
    this.introducingPoolTokenAll = this.introducingPoolTokenAll.bind(this);
    this.expiringPoolToken = this.expiringPoolToken.bind(this);
    this.expiringPoolTokenAll = this.expiringPoolTokenAll.bind(this);
    this.lpToken = this.lpToken.bind(this);
    this.simulateBatchSwap = this.simulateBatchSwap.bind(this);
    this.yammConfiguration = this.yammConfiguration.bind(this);
    this.yammConfigurationAll = this.yammConfigurationAll.bind(this);
    this.whitelistedRoute = this.whitelistedRoute.bind(this);
    this.whitelistedRouteAll = this.whitelistedRouteAll.bind(this);
    this.order = this.order.bind(this);
    this.orderAll = this.orderAll.bind(this);
    this.executableOrder = this.executableOrder.bind(this);
    this.executableOrderAll = this.executableOrderAll.bind(this);
    this.scheduleOrder = this.scheduleOrder.bind(this);
    this.scheduleOrderAll = this.scheduleOrderAll.bind(this);
    this.oraclePricePair = this.oraclePricePair.bind(this);
    this.oraclePricePairAll = this.oraclePricePairAll.bind(this);
    this.vaultPauseMode = this.vaultPauseMode.bind(this);
    this.pendingTokenIntroduction = this.pendingTokenIntroduction.bind(this);
    this.pendingTokenIntroductionAll = this.pendingTokenIntroductionAll.bind(this);
    this.yammPoolId = this.yammPoolId.bind(this);
    this.orderStepBounds = this.orderStepBounds.bind(this);
    this.disabledOrderPairAll = this.disabledOrderPairAll.bind(this);
    this.orderPairDisabled = this.orderPairDisabled.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolToken(request: QueryGetPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenResponse> {
    const data = QueryGetPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolToken", data);
    return promise.then(data => QueryGetPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenAll(request: QueryAllPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenResponse> {
    const data = QueryAllPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenAll", data);
    return promise.then(data => QueryAllPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenAllForPool(request: QueryAllPoolTokenForPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenForPoolResponse> {
    const data = QueryAllPoolTokenForPoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenAllForPool", data);
    return promise.then(data => QueryAllPoolTokenForPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenWeightAll(request: QueryAllPoolTokenWeightRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenWeightResponse> {
    const data = QueryAllPoolTokenWeightRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenWeightAll", data);
    return promise.then(data => QueryAllPoolTokenWeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenWeight(request: QueryGetPoolTokenWeightRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenWeightResponse> {
    const data = QueryGetPoolTokenWeightRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenWeight", data);
    return promise.then(data => QueryGetPoolTokenWeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenInfoAll(request: QueryAllPoolTokenInfoRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenInfoResponse> {
    const data = QueryAllPoolTokenInfoRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenInfoAll", data);
    return promise.then(data => QueryAllPoolTokenInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolTokenInfo(request: QueryGetPoolTokenInfoRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenInfoResponse> {
    const data = QueryGetPoolTokenInfoRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolTokenInfo", data);
    return promise.then(data => QueryGetPoolTokenInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "Pool", data);
    return promise.then(data => QueryGetPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolAll(request: QueryAllPoolRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
    const data = QueryAllPoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PoolAll", data);
    return promise.then(data => QueryAllPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  weightedToken(request: QueryGetWeightedTokenRequest, useInterfaces: boolean = true): Promise<QueryGetWeightedTokenResponse> {
    const data = QueryGetWeightedTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WeightedToken", data);
    return promise.then(data => QueryGetWeightedTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  weightedTokenAll(request: QueryAllWeightedTokenRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllWeightedTokenResponse> {
    const data = QueryAllWeightedTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WeightedTokenAll", data);
    return promise.then(data => QueryAllWeightedTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  weightUpdateTiming(request: QueryGetWeightUpdateTimingRequest, useInterfaces: boolean = true): Promise<QueryGetWeightUpdateTimingResponse> {
    const data = QueryGetWeightUpdateTimingRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WeightUpdateTiming", data);
    return promise.then(data => QueryGetWeightUpdateTimingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  weightUpdateTimingAll(request: QueryAllWeightUpdateTimingRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllWeightUpdateTimingResponse> {
    const data = QueryAllWeightUpdateTimingRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WeightUpdateTimingAll", data);
    return promise.then(data => QueryAllWeightUpdateTimingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateSingleSwap(request: QuerySimulateSingleSwapRequest, useInterfaces: boolean = true): Promise<QuerySimulateSingleSwapResponse> {
    const data = QuerySimulateSingleSwapRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateSingleSwap", data);
    return promise.then(data => QuerySimulateSingleSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateInitializePool(request: QuerySimulateInitializePoolRequest, useInterfaces: boolean = true): Promise<QuerySimulateInitializePoolResponse> {
    const data = QuerySimulateInitializePoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateInitializePool", data);
    return promise.then(data => QuerySimulateInitializePoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateJoinAllTokensExactLpt(request: QuerySimulateJoinAllTokensExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinAllTokensExactLptResponse> {
    const data = QuerySimulateJoinAllTokensExactLptRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateJoinAllTokensExactLpt", data);
    return promise.then(data => QuerySimulateJoinAllTokensExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateJoinExactTokens(request: QuerySimulateJoinExactTokensRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinExactTokensResponse> {
    const data = QuerySimulateJoinExactTokensRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateJoinExactTokens", data);
    return promise.then(data => QuerySimulateJoinExactTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateZeroImpactJoinYamm(request: QuerySimulateZeroImpactJoinYammRequest, useInterfaces: boolean = true): Promise<QuerySimulateZeroImpactJoinYammResponse> {
    const data = QuerySimulateZeroImpactJoinYammRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateZeroImpactJoinYamm", data);
    return promise.then(data => QuerySimulateZeroImpactJoinYammResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateJoinTokenExactLpt(request: QuerySimulateJoinTokenExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinTokenExactLptResponse> {
    const data = QuerySimulateJoinTokenExactLptRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateJoinTokenExactLpt", data);
    return promise.then(data => QuerySimulateJoinTokenExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateExitTokenExactLpt(request: QuerySimulateExitTokenExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitTokenExactLptResponse> {
    const data = QuerySimulateExitTokenExactLptRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateExitTokenExactLpt", data);
    return promise.then(data => QuerySimulateExitTokenExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateExitExactTokens(request: QuerySimulateExitExactTokensRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitExactTokensResponse> {
    const data = QuerySimulateExitExactTokensRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateExitExactTokens", data);
    return promise.then(data => QuerySimulateExitExactTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateExitAllTokensExactLpt(request: QuerySimulateExitAllTokensExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitAllTokensExactLptResponse> {
    const data = QuerySimulateExitAllTokensExactLptRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateExitAllTokensExactLpt", data);
    return promise.then(data => QuerySimulateExitAllTokensExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  spotPrice(request: QuerySpotPriceRequest, useInterfaces: boolean = true): Promise<QuerySpotPriceResponse> {
    const data = QuerySpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SpotPrice", data);
    return promise.then(data => QuerySpotPriceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  permanentVirtualBalancePoolToken(request: QueryGetPermanentVirtualBalancePoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetPermanentVirtualBalancePoolTokenResponse> {
    const data = QueryGetPermanentVirtualBalancePoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PermanentVirtualBalancePoolToken", data);
    return promise.then(data => QueryGetPermanentVirtualBalancePoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  permanentVirtualBalancePoolTokenAll(request: QueryAllPermanentVirtualBalancePoolTokenRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPermanentVirtualBalancePoolTokenResponse> {
    const data = QueryAllPermanentVirtualBalancePoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PermanentVirtualBalancePoolTokenAll", data);
    return promise.then(data => QueryAllPermanentVirtualBalancePoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  introducingPoolToken(request: QueryGetIntroducingPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetIntroducingPoolTokenResponse> {
    const data = QueryGetIntroducingPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "IntroducingPoolToken", data);
    return promise.then(data => QueryGetIntroducingPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  introducingPoolTokenAll(request: QueryAllIntroducingPoolTokenRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllIntroducingPoolTokenResponse> {
    const data = QueryAllIntroducingPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "IntroducingPoolTokenAll", data);
    return promise.then(data => QueryAllIntroducingPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  expiringPoolToken(request: QueryGetExpiringPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetExpiringPoolTokenResponse> {
    const data = QueryGetExpiringPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ExpiringPoolToken", data);
    return promise.then(data => QueryGetExpiringPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  expiringPoolTokenAll(request: QueryAllExpiringPoolTokenRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllExpiringPoolTokenResponse> {
    const data = QueryAllExpiringPoolTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ExpiringPoolTokenAll", data);
    return promise.then(data => QueryAllExpiringPoolTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lpToken(request: QueryLpTokenRequest, useInterfaces: boolean = true): Promise<QueryLpTokenResponse> {
    const data = QueryLpTokenRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "LpToken", data);
    return promise.then(data => QueryLpTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateBatchSwap(request: QuerySimulateBatchSwapRequest, useInterfaces: boolean = true): Promise<QuerySimulateBatchSwapResponse> {
    const data = QuerySimulateBatchSwapRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "SimulateBatchSwap", data);
    return promise.then(data => QuerySimulateBatchSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  yammConfiguration(request: QueryGetYammConfigurationRequest, useInterfaces: boolean = true): Promise<QueryGetYammConfigurationResponse> {
    const data = QueryGetYammConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "YammConfiguration", data);
    return promise.then(data => QueryGetYammConfigurationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  yammConfigurationAll(request: QueryAllYammConfigurationRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllYammConfigurationResponse> {
    const data = QueryAllYammConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "YammConfigurationAll", data);
    return promise.then(data => QueryAllYammConfigurationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  whitelistedRoute(request: QueryGetWhitelistedRouteRequest, useInterfaces: boolean = true): Promise<QueryGetWhitelistedRouteResponse> {
    const data = QueryGetWhitelistedRouteRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WhitelistedRoute", data);
    return promise.then(data => QueryGetWhitelistedRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  whitelistedRouteAll(request: QueryAllWhitelistedRouteRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllWhitelistedRouteResponse> {
    const data = QueryAllWhitelistedRouteRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "WhitelistedRouteAll", data);
    return promise.then(data => QueryAllWhitelistedRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  order(request: QueryGetOrderRequest, useInterfaces: boolean = true): Promise<QueryGetOrderResponse> {
    const data = QueryGetOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "Order", data);
    return promise.then(data => QueryGetOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  orderAll(request: QueryAllOrderRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllOrderResponse> {
    const data = QueryAllOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "OrderAll", data);
    return promise.then(data => QueryAllOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  executableOrder(request: QueryGetExecutableOrderRequest, useInterfaces: boolean = true): Promise<QueryGetExecutableOrderResponse> {
    const data = QueryGetExecutableOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ExecutableOrder", data);
    return promise.then(data => QueryGetExecutableOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  executableOrderAll(request: QueryAllExecutableOrderRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllExecutableOrderResponse> {
    const data = QueryAllExecutableOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ExecutableOrderAll", data);
    return promise.then(data => QueryAllExecutableOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  scheduleOrder(request: QueryGetScheduleOrderRequest, useInterfaces: boolean = true): Promise<QueryGetScheduleOrderResponse> {
    const data = QueryGetScheduleOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ScheduleOrder", data);
    return promise.then(data => QueryGetScheduleOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  scheduleOrderAll(request: QueryAllScheduleOrderRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllScheduleOrderResponse> {
    const data = QueryAllScheduleOrderRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "ScheduleOrderAll", data);
    return promise.then(data => QueryAllScheduleOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  oraclePricePair(request: QueryGetOraclePricePairRequest, useInterfaces: boolean = true): Promise<QueryGetOraclePricePairResponse> {
    const data = QueryGetOraclePricePairRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "OraclePricePair", data);
    return promise.then(data => QueryGetOraclePricePairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  oraclePricePairAll(request: QueryAllOraclePricePairRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllOraclePricePairResponse> {
    const data = QueryAllOraclePricePairRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "OraclePricePairAll", data);
    return promise.then(data => QueryAllOraclePricePairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  vaultPauseMode(request: QueryVaultPauseModeRequest = {}, useInterfaces: boolean = true): Promise<QueryVaultPauseModeResponse> {
    const data = QueryVaultPauseModeRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "VaultPauseMode", data);
    return promise.then(data => QueryVaultPauseModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pendingTokenIntroduction(request: QueryGetPendingTokenIntroductionRequest, useInterfaces: boolean = true): Promise<QueryGetPendingTokenIntroductionResponse> {
    const data = QueryGetPendingTokenIntroductionRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PendingTokenIntroduction", data);
    return promise.then(data => QueryGetPendingTokenIntroductionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pendingTokenIntroductionAll(request: QueryAllPendingTokenIntroductionRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPendingTokenIntroductionResponse> {
    const data = QueryAllPendingTokenIntroductionRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "PendingTokenIntroductionAll", data);
    return promise.then(data => QueryAllPendingTokenIntroductionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  yammPoolId(request: QueryYammPoolIdRequest, useInterfaces: boolean = true): Promise<QueryYammPoolIdResponse> {
    const data = QueryYammPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "YammPoolId", data);
    return promise.then(data => QueryYammPoolIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  orderStepBounds(request: QueryOrderStepBoundsRequest, useInterfaces: boolean = true): Promise<QueryOrderStepBoundsResponse> {
    const data = QueryOrderStepBoundsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "OrderStepBounds", data);
    return promise.then(data => QueryOrderStepBoundsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  disabledOrderPairAll(request: QueryAllDisabledOrderPairRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllDisabledOrderPairResponse> {
    const data = QueryAllDisabledOrderPairRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "DisabledOrderPairAll", data);
    return promise.then(data => QueryAllDisabledOrderPairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  orderPairDisabled(request: QueryOrderPairDisabledRequest, useInterfaces: boolean = true): Promise<QueryOrderPairDisabledResponse> {
    const data = QueryOrderPairDisabledRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Query", "OrderPairDisabled", data);
    return promise.then(data => QueryOrderPairDisabledResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    poolToken(request: QueryGetPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenResponse> {
      return queryService.poolToken(request, useInterfaces);
    },
    poolTokenAll(request: QueryAllPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenResponse> {
      return queryService.poolTokenAll(request, useInterfaces);
    },
    poolTokenAllForPool(request: QueryAllPoolTokenForPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenForPoolResponse> {
      return queryService.poolTokenAllForPool(request, useInterfaces);
    },
    poolTokenWeightAll(request: QueryAllPoolTokenWeightRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenWeightResponse> {
      return queryService.poolTokenWeightAll(request, useInterfaces);
    },
    poolTokenWeight(request: QueryGetPoolTokenWeightRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenWeightResponse> {
      return queryService.poolTokenWeight(request, useInterfaces);
    },
    poolTokenInfoAll(request: QueryAllPoolTokenInfoRequest, useInterfaces: boolean = true): Promise<QueryAllPoolTokenInfoResponse> {
      return queryService.poolTokenInfoAll(request, useInterfaces);
    },
    poolTokenInfo(request: QueryGetPoolTokenInfoRequest, useInterfaces: boolean = true): Promise<QueryGetPoolTokenInfoResponse> {
      return queryService.poolTokenInfo(request, useInterfaces);
    },
    pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    poolAll(request?: QueryAllPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
      return queryService.poolAll(request, useInterfaces);
    },
    weightedToken(request: QueryGetWeightedTokenRequest, useInterfaces: boolean = true): Promise<QueryGetWeightedTokenResponse> {
      return queryService.weightedToken(request, useInterfaces);
    },
    weightedTokenAll(request?: QueryAllWeightedTokenRequest, useInterfaces: boolean = true): Promise<QueryAllWeightedTokenResponse> {
      return queryService.weightedTokenAll(request, useInterfaces);
    },
    weightUpdateTiming(request: QueryGetWeightUpdateTimingRequest, useInterfaces: boolean = true): Promise<QueryGetWeightUpdateTimingResponse> {
      return queryService.weightUpdateTiming(request, useInterfaces);
    },
    weightUpdateTimingAll(request?: QueryAllWeightUpdateTimingRequest, useInterfaces: boolean = true): Promise<QueryAllWeightUpdateTimingResponse> {
      return queryService.weightUpdateTimingAll(request, useInterfaces);
    },
    simulateSingleSwap(request: QuerySimulateSingleSwapRequest, useInterfaces: boolean = true): Promise<QuerySimulateSingleSwapResponse> {
      return queryService.simulateSingleSwap(request, useInterfaces);
    },
    simulateInitializePool(request: QuerySimulateInitializePoolRequest, useInterfaces: boolean = true): Promise<QuerySimulateInitializePoolResponse> {
      return queryService.simulateInitializePool(request, useInterfaces);
    },
    simulateJoinAllTokensExactLpt(request: QuerySimulateJoinAllTokensExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinAllTokensExactLptResponse> {
      return queryService.simulateJoinAllTokensExactLpt(request, useInterfaces);
    },
    simulateJoinExactTokens(request: QuerySimulateJoinExactTokensRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinExactTokensResponse> {
      return queryService.simulateJoinExactTokens(request, useInterfaces);
    },
    simulateZeroImpactJoinYamm(request: QuerySimulateZeroImpactJoinYammRequest, useInterfaces: boolean = true): Promise<QuerySimulateZeroImpactJoinYammResponse> {
      return queryService.simulateZeroImpactJoinYamm(request, useInterfaces);
    },
    simulateJoinTokenExactLpt(request: QuerySimulateJoinTokenExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateJoinTokenExactLptResponse> {
      return queryService.simulateJoinTokenExactLpt(request, useInterfaces);
    },
    simulateExitTokenExactLpt(request: QuerySimulateExitTokenExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitTokenExactLptResponse> {
      return queryService.simulateExitTokenExactLpt(request, useInterfaces);
    },
    simulateExitExactTokens(request: QuerySimulateExitExactTokensRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitExactTokensResponse> {
      return queryService.simulateExitExactTokens(request, useInterfaces);
    },
    simulateExitAllTokensExactLpt(request: QuerySimulateExitAllTokensExactLptRequest, useInterfaces: boolean = true): Promise<QuerySimulateExitAllTokensExactLptResponse> {
      return queryService.simulateExitAllTokensExactLpt(request, useInterfaces);
    },
    spotPrice(request: QuerySpotPriceRequest, useInterfaces: boolean = true): Promise<QuerySpotPriceResponse> {
      return queryService.spotPrice(request, useInterfaces);
    },
    permanentVirtualBalancePoolToken(request: QueryGetPermanentVirtualBalancePoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetPermanentVirtualBalancePoolTokenResponse> {
      return queryService.permanentVirtualBalancePoolToken(request, useInterfaces);
    },
    permanentVirtualBalancePoolTokenAll(request?: QueryAllPermanentVirtualBalancePoolTokenRequest, useInterfaces: boolean = true): Promise<QueryAllPermanentVirtualBalancePoolTokenResponse> {
      return queryService.permanentVirtualBalancePoolTokenAll(request, useInterfaces);
    },
    introducingPoolToken(request: QueryGetIntroducingPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetIntroducingPoolTokenResponse> {
      return queryService.introducingPoolToken(request, useInterfaces);
    },
    introducingPoolTokenAll(request?: QueryAllIntroducingPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryAllIntroducingPoolTokenResponse> {
      return queryService.introducingPoolTokenAll(request, useInterfaces);
    },
    expiringPoolToken(request: QueryGetExpiringPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryGetExpiringPoolTokenResponse> {
      return queryService.expiringPoolToken(request, useInterfaces);
    },
    expiringPoolTokenAll(request?: QueryAllExpiringPoolTokenRequest, useInterfaces: boolean = true): Promise<QueryAllExpiringPoolTokenResponse> {
      return queryService.expiringPoolTokenAll(request, useInterfaces);
    },
    lpToken(request: QueryLpTokenRequest, useInterfaces: boolean = true): Promise<QueryLpTokenResponse> {
      return queryService.lpToken(request, useInterfaces);
    },
    simulateBatchSwap(request: QuerySimulateBatchSwapRequest, useInterfaces: boolean = true): Promise<QuerySimulateBatchSwapResponse> {
      return queryService.simulateBatchSwap(request, useInterfaces);
    },
    yammConfiguration(request: QueryGetYammConfigurationRequest, useInterfaces: boolean = true): Promise<QueryGetYammConfigurationResponse> {
      return queryService.yammConfiguration(request, useInterfaces);
    },
    yammConfigurationAll(request?: QueryAllYammConfigurationRequest, useInterfaces: boolean = true): Promise<QueryAllYammConfigurationResponse> {
      return queryService.yammConfigurationAll(request, useInterfaces);
    },
    whitelistedRoute(request: QueryGetWhitelistedRouteRequest, useInterfaces: boolean = true): Promise<QueryGetWhitelistedRouteResponse> {
      return queryService.whitelistedRoute(request, useInterfaces);
    },
    whitelistedRouteAll(request?: QueryAllWhitelistedRouteRequest, useInterfaces: boolean = true): Promise<QueryAllWhitelistedRouteResponse> {
      return queryService.whitelistedRouteAll(request, useInterfaces);
    },
    order(request: QueryGetOrderRequest, useInterfaces: boolean = true): Promise<QueryGetOrderResponse> {
      return queryService.order(request, useInterfaces);
    },
    orderAll(request?: QueryAllOrderRequest, useInterfaces: boolean = true): Promise<QueryAllOrderResponse> {
      return queryService.orderAll(request, useInterfaces);
    },
    executableOrder(request: QueryGetExecutableOrderRequest, useInterfaces: boolean = true): Promise<QueryGetExecutableOrderResponse> {
      return queryService.executableOrder(request, useInterfaces);
    },
    executableOrderAll(request?: QueryAllExecutableOrderRequest, useInterfaces: boolean = true): Promise<QueryAllExecutableOrderResponse> {
      return queryService.executableOrderAll(request, useInterfaces);
    },
    scheduleOrder(request: QueryGetScheduleOrderRequest, useInterfaces: boolean = true): Promise<QueryGetScheduleOrderResponse> {
      return queryService.scheduleOrder(request, useInterfaces);
    },
    scheduleOrderAll(request?: QueryAllScheduleOrderRequest, useInterfaces: boolean = true): Promise<QueryAllScheduleOrderResponse> {
      return queryService.scheduleOrderAll(request, useInterfaces);
    },
    oraclePricePair(request: QueryGetOraclePricePairRequest, useInterfaces: boolean = true): Promise<QueryGetOraclePricePairResponse> {
      return queryService.oraclePricePair(request, useInterfaces);
    },
    oraclePricePairAll(request?: QueryAllOraclePricePairRequest, useInterfaces: boolean = true): Promise<QueryAllOraclePricePairResponse> {
      return queryService.oraclePricePairAll(request, useInterfaces);
    },
    vaultPauseMode(request?: QueryVaultPauseModeRequest, useInterfaces: boolean = true): Promise<QueryVaultPauseModeResponse> {
      return queryService.vaultPauseMode(request, useInterfaces);
    },
    pendingTokenIntroduction(request: QueryGetPendingTokenIntroductionRequest, useInterfaces: boolean = true): Promise<QueryGetPendingTokenIntroductionResponse> {
      return queryService.pendingTokenIntroduction(request, useInterfaces);
    },
    pendingTokenIntroductionAll(request?: QueryAllPendingTokenIntroductionRequest, useInterfaces: boolean = true): Promise<QueryAllPendingTokenIntroductionResponse> {
      return queryService.pendingTokenIntroductionAll(request, useInterfaces);
    },
    yammPoolId(request: QueryYammPoolIdRequest, useInterfaces: boolean = true): Promise<QueryYammPoolIdResponse> {
      return queryService.yammPoolId(request, useInterfaces);
    },
    orderStepBounds(request: QueryOrderStepBoundsRequest, useInterfaces: boolean = true): Promise<QueryOrderStepBoundsResponse> {
      return queryService.orderStepBounds(request, useInterfaces);
    },
    disabledOrderPairAll(request?: QueryAllDisabledOrderPairRequest, useInterfaces: boolean = true): Promise<QueryAllDisabledOrderPairResponse> {
      return queryService.disabledOrderPairAll(request, useInterfaces);
    },
    orderPairDisabled(request: QueryOrderPairDisabledRequest, useInterfaces: boolean = true): Promise<QueryOrderPairDisabledResponse> {
      return queryService.orderPairDisabled(request, useInterfaces);
    }
  };
};
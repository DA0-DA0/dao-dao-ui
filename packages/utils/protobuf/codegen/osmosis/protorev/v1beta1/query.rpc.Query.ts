import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetProtoRevNumberOfTradesRequest, QueryGetProtoRevNumberOfTradesResponse, QueryGetProtoRevProfitsByDenomRequest, QueryGetProtoRevProfitsByDenomResponse, QueryGetProtoRevAllProfitsRequest, QueryGetProtoRevAllProfitsResponse, QueryGetProtoRevStatisticsByRouteRequest, QueryGetProtoRevStatisticsByRouteResponse, QueryGetProtoRevAllRouteStatisticsRequest, QueryGetProtoRevAllRouteStatisticsResponse, QueryGetProtoRevTokenPairArbRoutesRequest, QueryGetProtoRevTokenPairArbRoutesResponse, QueryGetProtoRevAdminAccountRequest, QueryGetProtoRevAdminAccountResponse, QueryGetProtoRevDeveloperAccountRequest, QueryGetProtoRevDeveloperAccountResponse, QueryGetProtoRevInfoByPoolTypeRequest, QueryGetProtoRevInfoByPoolTypeResponse, QueryGetProtoRevMaxPoolPointsPerTxRequest, QueryGetProtoRevMaxPoolPointsPerTxResponse, QueryGetProtoRevMaxPoolPointsPerBlockRequest, QueryGetProtoRevMaxPoolPointsPerBlockResponse, QueryGetProtoRevBaseDenomsRequest, QueryGetProtoRevBaseDenomsResponse, QueryGetProtoRevEnabledRequest, QueryGetProtoRevEnabledResponse, QueryGetProtoRevPoolRequest, QueryGetProtoRevPoolResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * GetProtoRevNumberOfTrades queries the number of arbitrage trades the module
   * has executed
   */
  getProtoRevNumberOfTrades(request?: QueryGetProtoRevNumberOfTradesRequest): Promise<QueryGetProtoRevNumberOfTradesResponse>;
  /** GetProtoRevProfitsByDenom queries the profits of the module by denom */
  getProtoRevProfitsByDenom(request: QueryGetProtoRevProfitsByDenomRequest): Promise<QueryGetProtoRevProfitsByDenomResponse>;
  /** GetProtoRevAllProfits queries all of the profits from the module */
  getProtoRevAllProfits(request?: QueryGetProtoRevAllProfitsRequest): Promise<QueryGetProtoRevAllProfitsResponse>;
  /**
   * GetProtoRevStatisticsByRoute queries the number of arbitrages and profits
   * that have been executed for a given route
   */
  getProtoRevStatisticsByRoute(request: QueryGetProtoRevStatisticsByRouteRequest): Promise<QueryGetProtoRevStatisticsByRouteResponse>;
  /**
   * GetProtoRevAllRouteStatistics queries all of routes that the module has
   * arbitraged against and the number of trades and profits that have been
   * accumulated for each route
   */
  getProtoRevAllRouteStatistics(request?: QueryGetProtoRevAllRouteStatisticsRequest): Promise<QueryGetProtoRevAllRouteStatisticsResponse>;
  /**
   * GetProtoRevTokenPairArbRoutes queries all of the hot routes that the module
   * is currently arbitraging
   */
  getProtoRevTokenPairArbRoutes(request?: QueryGetProtoRevTokenPairArbRoutesRequest): Promise<QueryGetProtoRevTokenPairArbRoutesResponse>;
  /** GetProtoRevAdminAccount queries the admin account of the module */
  getProtoRevAdminAccount(request?: QueryGetProtoRevAdminAccountRequest): Promise<QueryGetProtoRevAdminAccountResponse>;
  /** GetProtoRevDeveloperAccount queries the developer account of the module */
  getProtoRevDeveloperAccount(request?: QueryGetProtoRevDeveloperAccountRequest): Promise<QueryGetProtoRevDeveloperAccountResponse>;
  /**
   * GetProtoRevInfoByPoolType queries pool type information that is currently
   * being utilized by the module
   */
  getProtoRevInfoByPoolType(request?: QueryGetProtoRevInfoByPoolTypeRequest): Promise<QueryGetProtoRevInfoByPoolTypeResponse>;
  /**
   * GetProtoRevMaxPoolPointsPerTx queries the maximum number of pool points
   * that can be consumed per transaction
   */
  getProtoRevMaxPoolPointsPerTx(request?: QueryGetProtoRevMaxPoolPointsPerTxRequest): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponse>;
  /**
   * GetProtoRevMaxPoolPointsPerBlock queries the maximum number of pool points
   * that can consumed per block
   */
  getProtoRevMaxPoolPointsPerBlock(request?: QueryGetProtoRevMaxPoolPointsPerBlockRequest): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponse>;
  /**
   * GetProtoRevBaseDenoms queries the base denoms that the module is currently
   * utilizing for arbitrage
   */
  getProtoRevBaseDenoms(request?: QueryGetProtoRevBaseDenomsRequest): Promise<QueryGetProtoRevBaseDenomsResponse>;
  /** GetProtoRevEnabled queries whether the module is enabled or not */
  getProtoRevEnabled(request?: QueryGetProtoRevEnabledRequest): Promise<QueryGetProtoRevEnabledResponse>;
  /**
   * GetProtoRevPool queries the pool id used via the highest liquidity method
   * for arbitrage route building given a pair of denominations
   */
  getProtoRevPool(request: QueryGetProtoRevPoolRequest): Promise<QueryGetProtoRevPoolResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.getProtoRevNumberOfTrades = this.getProtoRevNumberOfTrades.bind(this);
    this.getProtoRevProfitsByDenom = this.getProtoRevProfitsByDenom.bind(this);
    this.getProtoRevAllProfits = this.getProtoRevAllProfits.bind(this);
    this.getProtoRevStatisticsByRoute = this.getProtoRevStatisticsByRoute.bind(this);
    this.getProtoRevAllRouteStatistics = this.getProtoRevAllRouteStatistics.bind(this);
    this.getProtoRevTokenPairArbRoutes = this.getProtoRevTokenPairArbRoutes.bind(this);
    this.getProtoRevAdminAccount = this.getProtoRevAdminAccount.bind(this);
    this.getProtoRevDeveloperAccount = this.getProtoRevDeveloperAccount.bind(this);
    this.getProtoRevInfoByPoolType = this.getProtoRevInfoByPoolType.bind(this);
    this.getProtoRevMaxPoolPointsPerTx = this.getProtoRevMaxPoolPointsPerTx.bind(this);
    this.getProtoRevMaxPoolPointsPerBlock = this.getProtoRevMaxPoolPointsPerBlock.bind(this);
    this.getProtoRevBaseDenoms = this.getProtoRevBaseDenoms.bind(this);
    this.getProtoRevEnabled = this.getProtoRevEnabled.bind(this);
    this.getProtoRevPool = this.getProtoRevPool.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevNumberOfTrades(request: QueryGetProtoRevNumberOfTradesRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevNumberOfTradesResponse> {
    const data = QueryGetProtoRevNumberOfTradesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevNumberOfTrades", data);
    return promise.then(data => QueryGetProtoRevNumberOfTradesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevProfitsByDenom(request: QueryGetProtoRevProfitsByDenomRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevProfitsByDenomResponse> {
    const data = QueryGetProtoRevProfitsByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevProfitsByDenom", data);
    return promise.then(data => QueryGetProtoRevProfitsByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevAllProfits(request: QueryGetProtoRevAllProfitsRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevAllProfitsResponse> {
    const data = QueryGetProtoRevAllProfitsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevAllProfits", data);
    return promise.then(data => QueryGetProtoRevAllProfitsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevStatisticsByRoute(request: QueryGetProtoRevStatisticsByRouteRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevStatisticsByRouteResponse> {
    const data = QueryGetProtoRevStatisticsByRouteRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevStatisticsByRoute", data);
    return promise.then(data => QueryGetProtoRevStatisticsByRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevAllRouteStatistics(request: QueryGetProtoRevAllRouteStatisticsRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevAllRouteStatisticsResponse> {
    const data = QueryGetProtoRevAllRouteStatisticsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevAllRouteStatistics", data);
    return promise.then(data => QueryGetProtoRevAllRouteStatisticsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevTokenPairArbRoutes(request: QueryGetProtoRevTokenPairArbRoutesRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevTokenPairArbRoutesResponse> {
    const data = QueryGetProtoRevTokenPairArbRoutesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevTokenPairArbRoutes", data);
    return promise.then(data => QueryGetProtoRevTokenPairArbRoutesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevAdminAccount(request: QueryGetProtoRevAdminAccountRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevAdminAccountResponse> {
    const data = QueryGetProtoRevAdminAccountRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevAdminAccount", data);
    return promise.then(data => QueryGetProtoRevAdminAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevDeveloperAccount(request: QueryGetProtoRevDeveloperAccountRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevDeveloperAccountResponse> {
    const data = QueryGetProtoRevDeveloperAccountRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevDeveloperAccount", data);
    return promise.then(data => QueryGetProtoRevDeveloperAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevInfoByPoolType(request: QueryGetProtoRevInfoByPoolTypeRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevInfoByPoolTypeResponse> {
    const data = QueryGetProtoRevInfoByPoolTypeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevInfoByPoolType", data);
    return promise.then(data => QueryGetProtoRevInfoByPoolTypeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevMaxPoolPointsPerTx(request: QueryGetProtoRevMaxPoolPointsPerTxRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponse> {
    const data = QueryGetProtoRevMaxPoolPointsPerTxRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevMaxPoolPointsPerTx", data);
    return promise.then(data => QueryGetProtoRevMaxPoolPointsPerTxResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevMaxPoolPointsPerBlock(request: QueryGetProtoRevMaxPoolPointsPerBlockRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponse> {
    const data = QueryGetProtoRevMaxPoolPointsPerBlockRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevMaxPoolPointsPerBlock", data);
    return promise.then(data => QueryGetProtoRevMaxPoolPointsPerBlockResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevBaseDenoms(request: QueryGetProtoRevBaseDenomsRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevBaseDenomsResponse> {
    const data = QueryGetProtoRevBaseDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevBaseDenoms", data);
    return promise.then(data => QueryGetProtoRevBaseDenomsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevEnabled(request: QueryGetProtoRevEnabledRequest = {}, useInterfaces: boolean = true): Promise<QueryGetProtoRevEnabledResponse> {
    const data = QueryGetProtoRevEnabledRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevEnabled", data);
    return promise.then(data => QueryGetProtoRevEnabledResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getProtoRevPool(request: QueryGetProtoRevPoolRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevPoolResponse> {
    const data = QueryGetProtoRevPoolRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.protorev.v1beta1.Query", "GetProtoRevPool", data);
    return promise.then(data => QueryGetProtoRevPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    getProtoRevNumberOfTrades(request?: QueryGetProtoRevNumberOfTradesRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevNumberOfTradesResponse> {
      return queryService.getProtoRevNumberOfTrades(request, useInterfaces);
    },
    getProtoRevProfitsByDenom(request: QueryGetProtoRevProfitsByDenomRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevProfitsByDenomResponse> {
      return queryService.getProtoRevProfitsByDenom(request, useInterfaces);
    },
    getProtoRevAllProfits(request?: QueryGetProtoRevAllProfitsRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevAllProfitsResponse> {
      return queryService.getProtoRevAllProfits(request, useInterfaces);
    },
    getProtoRevStatisticsByRoute(request: QueryGetProtoRevStatisticsByRouteRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevStatisticsByRouteResponse> {
      return queryService.getProtoRevStatisticsByRoute(request, useInterfaces);
    },
    getProtoRevAllRouteStatistics(request?: QueryGetProtoRevAllRouteStatisticsRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevAllRouteStatisticsResponse> {
      return queryService.getProtoRevAllRouteStatistics(request, useInterfaces);
    },
    getProtoRevTokenPairArbRoutes(request?: QueryGetProtoRevTokenPairArbRoutesRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevTokenPairArbRoutesResponse> {
      return queryService.getProtoRevTokenPairArbRoutes(request, useInterfaces);
    },
    getProtoRevAdminAccount(request?: QueryGetProtoRevAdminAccountRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevAdminAccountResponse> {
      return queryService.getProtoRevAdminAccount(request, useInterfaces);
    },
    getProtoRevDeveloperAccount(request?: QueryGetProtoRevDeveloperAccountRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevDeveloperAccountResponse> {
      return queryService.getProtoRevDeveloperAccount(request, useInterfaces);
    },
    getProtoRevInfoByPoolType(request?: QueryGetProtoRevInfoByPoolTypeRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevInfoByPoolTypeResponse> {
      return queryService.getProtoRevInfoByPoolType(request, useInterfaces);
    },
    getProtoRevMaxPoolPointsPerTx(request?: QueryGetProtoRevMaxPoolPointsPerTxRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponse> {
      return queryService.getProtoRevMaxPoolPointsPerTx(request, useInterfaces);
    },
    getProtoRevMaxPoolPointsPerBlock(request?: QueryGetProtoRevMaxPoolPointsPerBlockRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponse> {
      return queryService.getProtoRevMaxPoolPointsPerBlock(request, useInterfaces);
    },
    getProtoRevBaseDenoms(request?: QueryGetProtoRevBaseDenomsRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevBaseDenomsResponse> {
      return queryService.getProtoRevBaseDenoms(request, useInterfaces);
    },
    getProtoRevEnabled(request?: QueryGetProtoRevEnabledRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevEnabledResponse> {
      return queryService.getProtoRevEnabled(request, useInterfaces);
    },
    getProtoRevPool(request: QueryGetProtoRevPoolRequest, useInterfaces: boolean = true): Promise<QueryGetProtoRevPoolResponse> {
      return queryService.getProtoRevPool(request, useInterfaces);
    }
  };
};
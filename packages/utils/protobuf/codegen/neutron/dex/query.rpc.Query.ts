import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetLimitOrderTrancheUserRequest, QueryGetLimitOrderTrancheUserResponse, QueryAllLimitOrderTrancheUserRequest, QueryAllLimitOrderTrancheUserResponse, QueryAllUserLimitOrdersRequest, QueryAllUserLimitOrdersResponse, QueryGetLimitOrderTrancheRequest, QueryGetLimitOrderTrancheResponse, QueryAllLimitOrderTrancheRequest, QueryAllLimitOrderTrancheResponse, QueryAllUserDepositsRequest, QueryAllUserDepositsResponse, QueryAllTickLiquidityRequest, QueryAllTickLiquidityResponse, QueryGetInactiveLimitOrderTrancheRequest, QueryGetInactiveLimitOrderTrancheResponse, QueryAllInactiveLimitOrderTrancheRequest, QueryAllInactiveLimitOrderTrancheResponse, QueryAllPoolReservesRequest, QueryAllPoolReservesResponse, QueryGetPoolReservesRequest, QueryGetPoolReservesResponse, QueryEstimateMultiHopSwapRequest, QueryEstimateMultiHopSwapResponse, QueryEstimatePlaceLimitOrderRequest, QueryEstimatePlaceLimitOrderResponse, QueryPoolRequest, QueryPoolResponse, QueryPoolByIDRequest, QueryGetPoolMetadataRequest, QueryGetPoolMetadataResponse, QueryAllPoolMetadataRequest, QueryAllPoolMetadataResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a LimitOrderTrancheUser by index. */
  limitOrderTrancheUser(request: QueryGetLimitOrderTrancheUserRequest): Promise<QueryGetLimitOrderTrancheUserResponse>;
  /** Queries a list of LimitOrderTrancheMap items. */
  limitOrderTrancheUserAll(request?: QueryAllLimitOrderTrancheUserRequest): Promise<QueryAllLimitOrderTrancheUserResponse>;
  /** Queries a list of LimitOrderTrancheUser items for a given address. */
  limitOrderTrancheUserAllByAddress(request: QueryAllUserLimitOrdersRequest): Promise<QueryAllUserLimitOrdersResponse>;
  /** Queries a LimitOrderTranche by index. */
  limitOrderTranche(request: QueryGetLimitOrderTrancheRequest): Promise<QueryGetLimitOrderTrancheResponse>;
  /**
   * Queries a list of LimitOrderTranche items for a given pairID / TokenIn
   * combination.
   */
  limitOrderTrancheAll(request: QueryAllLimitOrderTrancheRequest): Promise<QueryAllLimitOrderTrancheResponse>;
  /** Queries a list of UserDeposits items. */
  userDepositsAll(request: QueryAllUserDepositsRequest): Promise<QueryAllUserDepositsResponse>;
  /** Queries a list of TickLiquidity items. */
  tickLiquidityAll(request: QueryAllTickLiquidityRequest): Promise<QueryAllTickLiquidityResponse>;
  /** Queries a InactiveLimitOrderTranche by index. */
  inactiveLimitOrderTranche(request: QueryGetInactiveLimitOrderTrancheRequest): Promise<QueryGetInactiveLimitOrderTrancheResponse>;
  /** Queries a list of InactiveLimitOrderTranche items. */
  inactiveLimitOrderTrancheAll(request?: QueryAllInactiveLimitOrderTrancheRequest): Promise<QueryAllInactiveLimitOrderTrancheResponse>;
  /** Queries a list of PoolReserves items. */
  poolReservesAll(request: QueryAllPoolReservesRequest): Promise<QueryAllPoolReservesResponse>;
  /** Queries a PoolReserve by index */
  poolReserves(request: QueryGetPoolReservesRequest): Promise<QueryGetPoolReservesResponse>;
  /** Queries the simulated result of a multihop swap */
  estimateMultiHopSwap(request: QueryEstimateMultiHopSwapRequest): Promise<QueryEstimateMultiHopSwapResponse>;
  /** Queries the simulated result of a multihop swap */
  estimatePlaceLimitOrder(request: QueryEstimatePlaceLimitOrderRequest): Promise<QueryEstimatePlaceLimitOrderResponse>;
  /** Queries a pool by pair, tick and fee */
  pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Queries a pool by ID */
  poolByID(request: QueryPoolByIDRequest): Promise<QueryPoolResponse>;
  /** Queries a PoolMetadata by ID */
  poolMetadata(request: QueryGetPoolMetadataRequest): Promise<QueryGetPoolMetadataResponse>;
  /** Queries a list of PoolMetadata items. */
  poolMetadataAll(request?: QueryAllPoolMetadataRequest): Promise<QueryAllPoolMetadataResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.limitOrderTrancheUser = this.limitOrderTrancheUser.bind(this);
    this.limitOrderTrancheUserAll = this.limitOrderTrancheUserAll.bind(this);
    this.limitOrderTrancheUserAllByAddress = this.limitOrderTrancheUserAllByAddress.bind(this);
    this.limitOrderTranche = this.limitOrderTranche.bind(this);
    this.limitOrderTrancheAll = this.limitOrderTrancheAll.bind(this);
    this.userDepositsAll = this.userDepositsAll.bind(this);
    this.tickLiquidityAll = this.tickLiquidityAll.bind(this);
    this.inactiveLimitOrderTranche = this.inactiveLimitOrderTranche.bind(this);
    this.inactiveLimitOrderTrancheAll = this.inactiveLimitOrderTrancheAll.bind(this);
    this.poolReservesAll = this.poolReservesAll.bind(this);
    this.poolReserves = this.poolReserves.bind(this);
    this.estimateMultiHopSwap = this.estimateMultiHopSwap.bind(this);
    this.estimatePlaceLimitOrder = this.estimatePlaceLimitOrder.bind(this);
    this.pool = this.pool.bind(this);
    this.poolByID = this.poolByID.bind(this);
    this.poolMetadata = this.poolMetadata.bind(this);
    this.poolMetadataAll = this.poolMetadataAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  limitOrderTrancheUser(request: QueryGetLimitOrderTrancheUserRequest, useInterfaces: boolean = true): Promise<QueryGetLimitOrderTrancheUserResponse> {
    const data = QueryGetLimitOrderTrancheUserRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "LimitOrderTrancheUser", data);
    return promise.then(data => QueryGetLimitOrderTrancheUserResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  limitOrderTrancheUserAll(request: QueryAllLimitOrderTrancheUserRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllLimitOrderTrancheUserResponse> {
    const data = QueryAllLimitOrderTrancheUserRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "LimitOrderTrancheUserAll", data);
    return promise.then(data => QueryAllLimitOrderTrancheUserResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  limitOrderTrancheUserAllByAddress(request: QueryAllUserLimitOrdersRequest, useInterfaces: boolean = true): Promise<QueryAllUserLimitOrdersResponse> {
    const data = QueryAllUserLimitOrdersRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "LimitOrderTrancheUserAllByAddress", data);
    return promise.then(data => QueryAllUserLimitOrdersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  limitOrderTranche(request: QueryGetLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryGetLimitOrderTrancheResponse> {
    const data = QueryGetLimitOrderTrancheRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "LimitOrderTranche", data);
    return promise.then(data => QueryGetLimitOrderTrancheResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  limitOrderTrancheAll(request: QueryAllLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryAllLimitOrderTrancheResponse> {
    const data = QueryAllLimitOrderTrancheRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "LimitOrderTrancheAll", data);
    return promise.then(data => QueryAllLimitOrderTrancheResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userDepositsAll(request: QueryAllUserDepositsRequest, useInterfaces: boolean = true): Promise<QueryAllUserDepositsResponse> {
    const data = QueryAllUserDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "UserDepositsAll", data);
    return promise.then(data => QueryAllUserDepositsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tickLiquidityAll(request: QueryAllTickLiquidityRequest, useInterfaces: boolean = true): Promise<QueryAllTickLiquidityResponse> {
    const data = QueryAllTickLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "TickLiquidityAll", data);
    return promise.then(data => QueryAllTickLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  inactiveLimitOrderTranche(request: QueryGetInactiveLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryGetInactiveLimitOrderTrancheResponse> {
    const data = QueryGetInactiveLimitOrderTrancheRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "InactiveLimitOrderTranche", data);
    return promise.then(data => QueryGetInactiveLimitOrderTrancheResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  inactiveLimitOrderTrancheAll(request: QueryAllInactiveLimitOrderTrancheRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllInactiveLimitOrderTrancheResponse> {
    const data = QueryAllInactiveLimitOrderTrancheRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "InactiveLimitOrderTrancheAll", data);
    return promise.then(data => QueryAllInactiveLimitOrderTrancheResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolReservesAll(request: QueryAllPoolReservesRequest, useInterfaces: boolean = true): Promise<QueryAllPoolReservesResponse> {
    const data = QueryAllPoolReservesRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "PoolReservesAll", data);
    return promise.then(data => QueryAllPoolReservesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolReserves(request: QueryGetPoolReservesRequest, useInterfaces: boolean = true): Promise<QueryGetPoolReservesResponse> {
    const data = QueryGetPoolReservesRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "PoolReserves", data);
    return promise.then(data => QueryGetPoolReservesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateMultiHopSwap(request: QueryEstimateMultiHopSwapRequest, useInterfaces: boolean = true): Promise<QueryEstimateMultiHopSwapResponse> {
    const data = QueryEstimateMultiHopSwapRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "EstimateMultiHopSwap", data);
    return promise.then(data => QueryEstimateMultiHopSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimatePlaceLimitOrder(request: QueryEstimatePlaceLimitOrderRequest, useInterfaces: boolean = true): Promise<QueryEstimatePlaceLimitOrderResponse> {
    const data = QueryEstimatePlaceLimitOrderRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "EstimatePlaceLimitOrder", data);
    return promise.then(data => QueryEstimatePlaceLimitOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: QueryPoolRequest, useInterfaces: boolean = true): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "Pool", data);
    return promise.then(data => QueryPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolByID(request: QueryPoolByIDRequest, useInterfaces: boolean = true): Promise<QueryPoolResponse> {
    const data = QueryPoolByIDRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "PoolByID", data);
    return promise.then(data => QueryPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolMetadata(request: QueryGetPoolMetadataRequest, useInterfaces: boolean = true): Promise<QueryGetPoolMetadataResponse> {
    const data = QueryGetPoolMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "PoolMetadata", data);
    return promise.then(data => QueryGetPoolMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolMetadataAll(request: QueryAllPoolMetadataRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPoolMetadataResponse> {
    const data = QueryAllPoolMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Query", "PoolMetadataAll", data);
    return promise.then(data => QueryAllPoolMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    limitOrderTrancheUser(request: QueryGetLimitOrderTrancheUserRequest, useInterfaces: boolean = true): Promise<QueryGetLimitOrderTrancheUserResponse> {
      return queryService.limitOrderTrancheUser(request, useInterfaces);
    },
    limitOrderTrancheUserAll(request?: QueryAllLimitOrderTrancheUserRequest, useInterfaces: boolean = true): Promise<QueryAllLimitOrderTrancheUserResponse> {
      return queryService.limitOrderTrancheUserAll(request, useInterfaces);
    },
    limitOrderTrancheUserAllByAddress(request: QueryAllUserLimitOrdersRequest, useInterfaces: boolean = true): Promise<QueryAllUserLimitOrdersResponse> {
      return queryService.limitOrderTrancheUserAllByAddress(request, useInterfaces);
    },
    limitOrderTranche(request: QueryGetLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryGetLimitOrderTrancheResponse> {
      return queryService.limitOrderTranche(request, useInterfaces);
    },
    limitOrderTrancheAll(request: QueryAllLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryAllLimitOrderTrancheResponse> {
      return queryService.limitOrderTrancheAll(request, useInterfaces);
    },
    userDepositsAll(request: QueryAllUserDepositsRequest, useInterfaces: boolean = true): Promise<QueryAllUserDepositsResponse> {
      return queryService.userDepositsAll(request, useInterfaces);
    },
    tickLiquidityAll(request: QueryAllTickLiquidityRequest, useInterfaces: boolean = true): Promise<QueryAllTickLiquidityResponse> {
      return queryService.tickLiquidityAll(request, useInterfaces);
    },
    inactiveLimitOrderTranche(request: QueryGetInactiveLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryGetInactiveLimitOrderTrancheResponse> {
      return queryService.inactiveLimitOrderTranche(request, useInterfaces);
    },
    inactiveLimitOrderTrancheAll(request?: QueryAllInactiveLimitOrderTrancheRequest, useInterfaces: boolean = true): Promise<QueryAllInactiveLimitOrderTrancheResponse> {
      return queryService.inactiveLimitOrderTrancheAll(request, useInterfaces);
    },
    poolReservesAll(request: QueryAllPoolReservesRequest, useInterfaces: boolean = true): Promise<QueryAllPoolReservesResponse> {
      return queryService.poolReservesAll(request, useInterfaces);
    },
    poolReserves(request: QueryGetPoolReservesRequest, useInterfaces: boolean = true): Promise<QueryGetPoolReservesResponse> {
      return queryService.poolReserves(request, useInterfaces);
    },
    estimateMultiHopSwap(request: QueryEstimateMultiHopSwapRequest, useInterfaces: boolean = true): Promise<QueryEstimateMultiHopSwapResponse> {
      return queryService.estimateMultiHopSwap(request, useInterfaces);
    },
    estimatePlaceLimitOrder(request: QueryEstimatePlaceLimitOrderRequest, useInterfaces: boolean = true): Promise<QueryEstimatePlaceLimitOrderResponse> {
      return queryService.estimatePlaceLimitOrder(request, useInterfaces);
    },
    pool(request: QueryPoolRequest, useInterfaces: boolean = true): Promise<QueryPoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    poolByID(request: QueryPoolByIDRequest, useInterfaces: boolean = true): Promise<QueryPoolResponse> {
      return queryService.poolByID(request, useInterfaces);
    },
    poolMetadata(request: QueryGetPoolMetadataRequest, useInterfaces: boolean = true): Promise<QueryGetPoolMetadataResponse> {
      return queryService.poolMetadata(request, useInterfaces);
    },
    poolMetadataAll(request?: QueryAllPoolMetadataRequest, useInterfaces: boolean = true): Promise<QueryAllPoolMetadataResponse> {
      return queryService.poolMetadataAll(request, useInterfaces);
    }
  };
};
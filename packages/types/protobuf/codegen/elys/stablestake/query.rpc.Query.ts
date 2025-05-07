import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryBorrowRatioRequest, QueryBorrowRatioResponse, QueryGetPoolRequest, QueryGetPoolResponse, QueryAllPoolRequest, QueryAllPoolResponse, QueryAmmPoolRequest, QueryAmmPoolResponse, QueryAllAmmPoolsRequest, QueryAllAmmPoolsResponse, QueryDebtRequest, QueryDebtResponse, QueryGetInterestRequest, QueryGetInterestResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** BorrowRatio queries the borrow ratio compared to total deposit */
  borrowRatio(request: QueryBorrowRatioRequest): Promise<QueryBorrowRatioResponse>;
  /** Queries a single pool given its index. */
  pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  /** Queries a list of all pools. */
  pools(request?: QueryAllPoolRequest): Promise<QueryAllPoolResponse>;
  ammPool(request: QueryAmmPoolRequest): Promise<QueryAmmPoolResponse>;
  allAmmPools(request?: QueryAllAmmPoolsRequest): Promise<QueryAllAmmPoolsResponse>;
  debt(request: QueryDebtRequest): Promise<QueryDebtResponse>;
  getInterest(request: QueryGetInterestRequest): Promise<QueryGetInterestResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.borrowRatio = this.borrowRatio.bind(this);
    this.pool = this.pool.bind(this);
    this.pools = this.pools.bind(this);
    this.ammPool = this.ammPool.bind(this);
    this.allAmmPools = this.allAmmPools.bind(this);
    this.debt = this.debt.bind(this);
    this.getInterest = this.getInterest.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  borrowRatio(request: QueryBorrowRatioRequest, useInterfaces: boolean = true): Promise<QueryBorrowRatioResponse> {
    const data = QueryBorrowRatioRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "BorrowRatio", data);
    return promise.then(data => QueryBorrowRatioResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "Pool", data);
    return promise.then(data => QueryGetPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pools(request: QueryAllPoolRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
    const data = QueryAllPoolRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "Pools", data);
    return promise.then(data => QueryAllPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  ammPool(request: QueryAmmPoolRequest, useInterfaces: boolean = true): Promise<QueryAmmPoolResponse> {
    const data = QueryAmmPoolRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "AmmPool", data);
    return promise.then(data => QueryAmmPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allAmmPools(request: QueryAllAmmPoolsRequest = {}, useInterfaces: boolean = true): Promise<QueryAllAmmPoolsResponse> {
    const data = QueryAllAmmPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "AllAmmPools", data);
    return promise.then(data => QueryAllAmmPoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  debt(request: QueryDebtRequest, useInterfaces: boolean = true): Promise<QueryDebtResponse> {
    const data = QueryDebtRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "Debt", data);
    return promise.then(data => QueryDebtResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getInterest(request: QueryGetInterestRequest, useInterfaces: boolean = true): Promise<QueryGetInterestResponse> {
    const data = QueryGetInterestRequest.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Query", "GetInterest", data);
    return promise.then(data => QueryGetInterestResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    borrowRatio(request: QueryBorrowRatioRequest, useInterfaces: boolean = true): Promise<QueryBorrowRatioResponse> {
      return queryService.borrowRatio(request, useInterfaces);
    },
    pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    pools(request?: QueryAllPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
      return queryService.pools(request, useInterfaces);
    },
    ammPool(request: QueryAmmPoolRequest, useInterfaces: boolean = true): Promise<QueryAmmPoolResponse> {
      return queryService.ammPool(request, useInterfaces);
    },
    allAmmPools(request?: QueryAllAmmPoolsRequest, useInterfaces: boolean = true): Promise<QueryAllAmmPoolsResponse> {
      return queryService.allAmmPools(request, useInterfaces);
    },
    debt(request: QueryDebtRequest, useInterfaces: boolean = true): Promise<QueryDebtResponse> {
      return queryService.debt(request, useInterfaces);
    },
    getInterest(request: QueryGetInterestRequest, useInterfaces: boolean = true): Promise<QueryGetInterestResponse> {
      return queryService.getInterest(request, useInterfaces);
    }
  };
};
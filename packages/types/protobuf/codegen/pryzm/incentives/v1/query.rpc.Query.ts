import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetPoolRequest, QueryGetPoolResponse, QueryAllPoolRequest, QueryAllPoolResponse, QueryGetBondRequest, QueryGetBondResponse, QueryAllBondRequest, QueryAllBondResponse, QueryGetUnbondingRequest, QueryGetUnbondingResponse, QueryAllUnbondingRequest, QueryAllUnbondingResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Pool by index. */
  pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  /** Queries a list of Pool items. */
  poolAll(request?: QueryAllPoolRequest): Promise<QueryAllPoolResponse>;
  /** Queries a Bond by index. */
  bond(request: QueryGetBondRequest): Promise<QueryGetBondResponse>;
  /** Queries a list of Bond items. */
  bondAll(request: QueryAllBondRequest): Promise<QueryAllBondResponse>;
  /** Queries a Unbonding by id. */
  unbonding(request: QueryGetUnbondingRequest): Promise<QueryGetUnbondingResponse>;
  /** Queries a list of Unbonding items. */
  unbondingAll(request: QueryAllUnbondingRequest): Promise<QueryAllUnbondingResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.pool = this.pool.bind(this);
    this.poolAll = this.poolAll.bind(this);
    this.bond = this.bond.bind(this);
    this.bondAll = this.bondAll.bind(this);
    this.unbonding = this.unbonding.bind(this);
    this.unbondingAll = this.unbondingAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "Pool", data);
    return promise.then(data => QueryGetPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolAll(request: QueryAllPoolRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
    const data = QueryAllPoolRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "PoolAll", data);
    return promise.then(data => QueryAllPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bond(request: QueryGetBondRequest, useInterfaces: boolean = true): Promise<QueryGetBondResponse> {
    const data = QueryGetBondRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "Bond", data);
    return promise.then(data => QueryGetBondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bondAll(request: QueryAllBondRequest, useInterfaces: boolean = true): Promise<QueryAllBondResponse> {
    const data = QueryAllBondRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "BondAll", data);
    return promise.then(data => QueryAllBondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbonding(request: QueryGetUnbondingRequest, useInterfaces: boolean = true): Promise<QueryGetUnbondingResponse> {
    const data = QueryGetUnbondingRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "Unbonding", data);
    return promise.then(data => QueryGetUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbondingAll(request: QueryAllUnbondingRequest, useInterfaces: boolean = true): Promise<QueryAllUnbondingResponse> {
    const data = QueryAllUnbondingRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Query", "UnbondingAll", data);
    return promise.then(data => QueryAllUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    poolAll(request?: QueryAllPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
      return queryService.poolAll(request, useInterfaces);
    },
    bond(request: QueryGetBondRequest, useInterfaces: boolean = true): Promise<QueryGetBondResponse> {
      return queryService.bond(request, useInterfaces);
    },
    bondAll(request: QueryAllBondRequest, useInterfaces: boolean = true): Promise<QueryAllBondResponse> {
      return queryService.bondAll(request, useInterfaces);
    },
    unbonding(request: QueryGetUnbondingRequest, useInterfaces: boolean = true): Promise<QueryGetUnbondingResponse> {
      return queryService.unbonding(request, useInterfaces);
    },
    unbondingAll(request: QueryAllUnbondingRequest, useInterfaces: boolean = true): Promise<QueryAllUnbondingResponse> {
      return queryService.unbondingAll(request, useInterfaces);
    }
  };
};
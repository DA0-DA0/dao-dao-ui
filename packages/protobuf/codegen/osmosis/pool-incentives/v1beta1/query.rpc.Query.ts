import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGaugeIdsRequest, QueryGaugeIdsResponse, QueryDistrInfoRequest, QueryDistrInfoResponse, QueryParamsRequest, QueryParamsResponse, QueryLockableDurationsRequest, QueryLockableDurationsResponse, QueryIncentivizedPoolsRequest, QueryIncentivizedPoolsResponse, QueryExternalIncentiveGaugesRequest, QueryExternalIncentiveGaugesResponse } from "./query";
export interface Query {
  /** GaugeIds takes the pool id and returns the matching gauge ids and durations */
  gaugeIds(request: QueryGaugeIdsRequest): Promise<QueryGaugeIdsResponse>;
  /** DistrInfo returns the pool's matching gauge ids and weights. */
  distrInfo(request?: QueryDistrInfoRequest): Promise<QueryDistrInfoResponse>;
  /** Params returns pool incentives params. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** LockableDurations returns lock durations for pools. */
  lockableDurations(request?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
  /** IncentivizedPools returns currently incentivized pools */
  incentivizedPools(request?: QueryIncentivizedPoolsRequest): Promise<QueryIncentivizedPoolsResponse>;
  /** ExternalIncentiveGauges returns external incentive gauges. */
  externalIncentiveGauges(request?: QueryExternalIncentiveGaugesRequest): Promise<QueryExternalIncentiveGaugesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.gaugeIds = this.gaugeIds.bind(this);
    this.distrInfo = this.distrInfo.bind(this);
    this.params = this.params.bind(this);
    this.lockableDurations = this.lockableDurations.bind(this);
    this.incentivizedPools = this.incentivizedPools.bind(this);
    this.externalIncentiveGauges = this.externalIncentiveGauges.bind(this);
  }
  gaugeIds(request: QueryGaugeIdsRequest, useInterfaces: boolean = true): Promise<QueryGaugeIdsResponse> {
    const data = QueryGaugeIdsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "GaugeIds", data);
    return promise.then(data => QueryGaugeIdsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  distrInfo(request: QueryDistrInfoRequest = {}, useInterfaces: boolean = true): Promise<QueryDistrInfoResponse> {
    const data = QueryDistrInfoRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "DistrInfo", data);
    return promise.then(data => QueryDistrInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockableDurations(request: QueryLockableDurationsRequest = {}, useInterfaces: boolean = true): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "LockableDurations", data);
    return promise.then(data => QueryLockableDurationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  incentivizedPools(request: QueryIncentivizedPoolsRequest = {}, useInterfaces: boolean = true): Promise<QueryIncentivizedPoolsResponse> {
    const data = QueryIncentivizedPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "IncentivizedPools", data);
    return promise.then(data => QueryIncentivizedPoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  externalIncentiveGauges(request: QueryExternalIncentiveGaugesRequest = {}, useInterfaces: boolean = true): Promise<QueryExternalIncentiveGaugesResponse> {
    const data = QueryExternalIncentiveGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolincentives.v1beta1.Query", "ExternalIncentiveGauges", data);
    return promise.then(data => QueryExternalIncentiveGaugesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    gaugeIds(request: QueryGaugeIdsRequest, useInterfaces: boolean = true): Promise<QueryGaugeIdsResponse> {
      return queryService.gaugeIds(request, useInterfaces);
    },
    distrInfo(request?: QueryDistrInfoRequest, useInterfaces: boolean = true): Promise<QueryDistrInfoResponse> {
      return queryService.distrInfo(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    lockableDurations(request?: QueryLockableDurationsRequest, useInterfaces: boolean = true): Promise<QueryLockableDurationsResponse> {
      return queryService.lockableDurations(request, useInterfaces);
    },
    incentivizedPools(request?: QueryIncentivizedPoolsRequest, useInterfaces: boolean = true): Promise<QueryIncentivizedPoolsResponse> {
      return queryService.incentivizedPools(request, useInterfaces);
    },
    externalIncentiveGauges(request?: QueryExternalIncentiveGaugesRequest, useInterfaces: boolean = true): Promise<QueryExternalIncentiveGaugesResponse> {
      return queryService.externalIncentiveGauges(request, useInterfaces);
    }
  };
};
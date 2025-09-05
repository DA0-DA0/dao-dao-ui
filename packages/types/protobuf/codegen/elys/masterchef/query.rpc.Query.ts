import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryExternalIncentiveRequest, QueryExternalIncentiveResponse, QueryPoolInfoRequest, QueryPoolInfoResponse, QueryListPoolInfosRequest, QueryListPoolInfosResponse, QueryPoolRewardInfoRequest, QueryPoolRewardInfoResponse, QueryUserRewardInfoRequest, QueryUserRewardInfoResponse, QueryUserPendingRewardRequest, QueryUserPendingRewardResponse, QueryStableStakeAprRequest, QueryStableStakeAprResponse, QueryPoolAprsRequest, QueryPoolAprsResponse, QueryShowFeeInfoRequest, QueryShowFeeInfoResponse, QueryListFeeInfoRequest, QueryListFeeInfoResponse, QueryAprRequest, QueryAprResponse, QueryAprsRequest, QueryAprsResponse, QueryPoolRewardsRequest, QueryPoolRewardsResponse, QueryAllLiquidityPoolTVLRequest, QueryAllLiquidityPoolTVLResponse, QueryChainTVLRequest, QueryChainTVLResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  externalIncentive(request: QueryExternalIncentiveRequest): Promise<QueryExternalIncentiveResponse>;
  poolInfo(request: QueryPoolInfoRequest): Promise<QueryPoolInfoResponse>;
  listPoolInfos(request?: QueryListPoolInfosRequest): Promise<QueryListPoolInfosResponse>;
  poolRewardInfo(request: QueryPoolRewardInfoRequest): Promise<QueryPoolRewardInfoResponse>;
  userRewardInfo(request: QueryUserRewardInfoRequest): Promise<QueryUserRewardInfoResponse>;
  userPendingReward(request: QueryUserPendingRewardRequest): Promise<QueryUserPendingRewardResponse>;
  stableStakeApr(request: QueryStableStakeAprRequest): Promise<QueryStableStakeAprResponse>;
  poolAprs(request: QueryPoolAprsRequest): Promise<QueryPoolAprsResponse>;
  /** Queries a list of ShowFeeInfo items. */
  showFeeInfo(request: QueryShowFeeInfoRequest): Promise<QueryShowFeeInfoResponse>;
  /** Queries a list of ListFeeInfo items. */
  listFeeInfo(request?: QueryListFeeInfoRequest): Promise<QueryListFeeInfoResponse>;
  /** Calculate APR */
  apr(request: QueryAprRequest): Promise<QueryAprResponse>;
  /** Calculate APRs */
  aprs(request: QueryAprsRequest): Promise<QueryAprsResponse>;
  /** Queries PoolReward items */
  poolRewards(request: QueryPoolRewardsRequest): Promise<QueryPoolRewardsResponse>;
  allLiquidityPoolTVL(request?: QueryAllLiquidityPoolTVLRequest): Promise<QueryAllLiquidityPoolTVLResponse>;
  chainTVL(request?: QueryChainTVLRequest): Promise<QueryChainTVLResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.externalIncentive = this.externalIncentive.bind(this);
    this.poolInfo = this.poolInfo.bind(this);
    this.listPoolInfos = this.listPoolInfos.bind(this);
    this.poolRewardInfo = this.poolRewardInfo.bind(this);
    this.userRewardInfo = this.userRewardInfo.bind(this);
    this.userPendingReward = this.userPendingReward.bind(this);
    this.stableStakeApr = this.stableStakeApr.bind(this);
    this.poolAprs = this.poolAprs.bind(this);
    this.showFeeInfo = this.showFeeInfo.bind(this);
    this.listFeeInfo = this.listFeeInfo.bind(this);
    this.apr = this.apr.bind(this);
    this.aprs = this.aprs.bind(this);
    this.poolRewards = this.poolRewards.bind(this);
    this.allLiquidityPoolTVL = this.allLiquidityPoolTVL.bind(this);
    this.chainTVL = this.chainTVL.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  externalIncentive(request: QueryExternalIncentiveRequest, useInterfaces: boolean = true): Promise<QueryExternalIncentiveResponse> {
    const data = QueryExternalIncentiveRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "ExternalIncentive", data);
    return promise.then(data => QueryExternalIncentiveResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolInfo(request: QueryPoolInfoRequest, useInterfaces: boolean = true): Promise<QueryPoolInfoResponse> {
    const data = QueryPoolInfoRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "PoolInfo", data);
    return promise.then(data => QueryPoolInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  listPoolInfos(request: QueryListPoolInfosRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryListPoolInfosResponse> {
    const data = QueryListPoolInfosRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "ListPoolInfos", data);
    return promise.then(data => QueryListPoolInfosResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolRewardInfo(request: QueryPoolRewardInfoRequest, useInterfaces: boolean = true): Promise<QueryPoolRewardInfoResponse> {
    const data = QueryPoolRewardInfoRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "PoolRewardInfo", data);
    return promise.then(data => QueryPoolRewardInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userRewardInfo(request: QueryUserRewardInfoRequest, useInterfaces: boolean = true): Promise<QueryUserRewardInfoResponse> {
    const data = QueryUserRewardInfoRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "UserRewardInfo", data);
    return promise.then(data => QueryUserRewardInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userPendingReward(request: QueryUserPendingRewardRequest, useInterfaces: boolean = true): Promise<QueryUserPendingRewardResponse> {
    const data = QueryUserPendingRewardRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "UserPendingReward", data);
    return promise.then(data => QueryUserPendingRewardResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stableStakeApr(request: QueryStableStakeAprRequest, useInterfaces: boolean = true): Promise<QueryStableStakeAprResponse> {
    const data = QueryStableStakeAprRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "StableStakeApr", data);
    return promise.then(data => QueryStableStakeAprResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolAprs(request: QueryPoolAprsRequest, useInterfaces: boolean = true): Promise<QueryPoolAprsResponse> {
    const data = QueryPoolAprsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "PoolAprs", data);
    return promise.then(data => QueryPoolAprsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  showFeeInfo(request: QueryShowFeeInfoRequest, useInterfaces: boolean = true): Promise<QueryShowFeeInfoResponse> {
    const data = QueryShowFeeInfoRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "ShowFeeInfo", data);
    return promise.then(data => QueryShowFeeInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  listFeeInfo(request: QueryListFeeInfoRequest = {}, useInterfaces: boolean = true): Promise<QueryListFeeInfoResponse> {
    const data = QueryListFeeInfoRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "ListFeeInfo", data);
    return promise.then(data => QueryListFeeInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  apr(request: QueryAprRequest, useInterfaces: boolean = true): Promise<QueryAprResponse> {
    const data = QueryAprRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "Apr", data);
    return promise.then(data => QueryAprResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aprs(request: QueryAprsRequest, useInterfaces: boolean = true): Promise<QueryAprsResponse> {
    const data = QueryAprsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "Aprs", data);
    return promise.then(data => QueryAprsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolRewards(request: QueryPoolRewardsRequest, useInterfaces: boolean = true): Promise<QueryPoolRewardsResponse> {
    const data = QueryPoolRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "PoolRewards", data);
    return promise.then(data => QueryPoolRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allLiquidityPoolTVL(request: QueryAllLiquidityPoolTVLRequest = {}, useInterfaces: boolean = true): Promise<QueryAllLiquidityPoolTVLResponse> {
    const data = QueryAllLiquidityPoolTVLRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "AllLiquidityPoolTVL", data);
    return promise.then(data => QueryAllLiquidityPoolTVLResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  chainTVL(request: QueryChainTVLRequest = {}, useInterfaces: boolean = true): Promise<QueryChainTVLResponse> {
    const data = QueryChainTVLRequest.encode(request).finish();
    const promise = this.rpc.request("elys.masterchef.Query", "ChainTVL", data);
    return promise.then(data => QueryChainTVLResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    externalIncentive(request: QueryExternalIncentiveRequest, useInterfaces: boolean = true): Promise<QueryExternalIncentiveResponse> {
      return queryService.externalIncentive(request, useInterfaces);
    },
    poolInfo(request: QueryPoolInfoRequest, useInterfaces: boolean = true): Promise<QueryPoolInfoResponse> {
      return queryService.poolInfo(request, useInterfaces);
    },
    listPoolInfos(request?: QueryListPoolInfosRequest, useInterfaces: boolean = true): Promise<QueryListPoolInfosResponse> {
      return queryService.listPoolInfos(request, useInterfaces);
    },
    poolRewardInfo(request: QueryPoolRewardInfoRequest, useInterfaces: boolean = true): Promise<QueryPoolRewardInfoResponse> {
      return queryService.poolRewardInfo(request, useInterfaces);
    },
    userRewardInfo(request: QueryUserRewardInfoRequest, useInterfaces: boolean = true): Promise<QueryUserRewardInfoResponse> {
      return queryService.userRewardInfo(request, useInterfaces);
    },
    userPendingReward(request: QueryUserPendingRewardRequest, useInterfaces: boolean = true): Promise<QueryUserPendingRewardResponse> {
      return queryService.userPendingReward(request, useInterfaces);
    },
    stableStakeApr(request: QueryStableStakeAprRequest, useInterfaces: boolean = true): Promise<QueryStableStakeAprResponse> {
      return queryService.stableStakeApr(request, useInterfaces);
    },
    poolAprs(request: QueryPoolAprsRequest, useInterfaces: boolean = true): Promise<QueryPoolAprsResponse> {
      return queryService.poolAprs(request, useInterfaces);
    },
    showFeeInfo(request: QueryShowFeeInfoRequest, useInterfaces: boolean = true): Promise<QueryShowFeeInfoResponse> {
      return queryService.showFeeInfo(request, useInterfaces);
    },
    listFeeInfo(request?: QueryListFeeInfoRequest, useInterfaces: boolean = true): Promise<QueryListFeeInfoResponse> {
      return queryService.listFeeInfo(request, useInterfaces);
    },
    apr(request: QueryAprRequest, useInterfaces: boolean = true): Promise<QueryAprResponse> {
      return queryService.apr(request, useInterfaces);
    },
    aprs(request: QueryAprsRequest, useInterfaces: boolean = true): Promise<QueryAprsResponse> {
      return queryService.aprs(request, useInterfaces);
    },
    poolRewards(request: QueryPoolRewardsRequest, useInterfaces: boolean = true): Promise<QueryPoolRewardsResponse> {
      return queryService.poolRewards(request, useInterfaces);
    },
    allLiquidityPoolTVL(request?: QueryAllLiquidityPoolTVLRequest, useInterfaces: boolean = true): Promise<QueryAllLiquidityPoolTVLResponse> {
      return queryService.allLiquidityPoolTVL(request, useInterfaces);
    },
    chainTVL(request?: QueryChainTVLRequest, useInterfaces: boolean = true): Promise<QueryChainTVLResponse> {
      return queryService.chainTVL(request, useInterfaces);
    }
  };
};
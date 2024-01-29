import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { ModuleToDistributeCoinsRequest, ModuleToDistributeCoinsResponse, GaugeByIDRequest, GaugeByIDResponse, GaugesRequest, GaugesResponse, ActiveGaugesRequest, ActiveGaugesResponse, ActiveGaugesPerDenomRequest, ActiveGaugesPerDenomResponse, UpcomingGaugesRequest, UpcomingGaugesResponse, UpcomingGaugesPerDenomRequest, UpcomingGaugesPerDenomResponse, RewardsEstRequest, RewardsEstResponse, QueryLockableDurationsRequest, QueryLockableDurationsResponse, QueryAllGroupsRequest, QueryAllGroupsResponse, QueryAllGroupsGaugesRequest, QueryAllGroupsGaugesResponse, QueryAllGroupsWithGaugeRequest, QueryAllGroupsWithGaugeResponse, QueryGroupByGroupGaugeIDRequest, QueryGroupByGroupGaugeIDResponse, QueryCurrentWeightByGroupGaugeIDRequest, QueryCurrentWeightByGroupGaugeIDResponse } from "./query";
/** Query defines the gRPC querier service */
export interface Query {
  /** ModuleToDistributeCoins returns coins that are going to be distributed */
  moduleToDistributeCoins(request?: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
  /** GaugeByID returns gauges by their respective ID */
  gaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
  /** Gauges returns both upcoming and active gauges */
  gauges(request?: GaugesRequest): Promise<GaugesResponse>;
  /** ActiveGauges returns active gauges */
  activeGauges(request?: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
  /** ActiveGaugesPerDenom returns active gauges by denom */
  activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
  /** Returns scheduled gauges that have not yet occurred */
  upcomingGauges(request?: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
  /**
   * UpcomingGaugesPerDenom returns scheduled gauges that have not yet occurred
   * by denom
   */
  upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
  /**
   * RewardsEst returns an estimate of the rewards from now until a specified
   * time in the future The querier either provides an address or a set of locks
   * for which they want to find the associated rewards
   */
  rewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
  /**
   * LockableDurations returns lockable durations that are valid to distribute
   * incentives for
   */
  lockableDurations(request?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
  /** AllGroups returns all groups */
  allGroups(request?: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse>;
  /** AllGroupsGauges returns all group gauges */
  allGroupsGauges(request?: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse>;
  /** AllGroupsWithGauge returns all groups with their group gauge */
  allGroupsWithGauge(request?: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse>;
  /** GroupByGroupGaugeID returns a group given its group gauge ID */
  groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse>;
  /**
   * CurrentWeightByGroupGaugeID returns the current weight since the
   * the last epoch given a group gauge ID
   */
  currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest): Promise<QueryCurrentWeightByGroupGaugeIDResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.moduleToDistributeCoins = this.moduleToDistributeCoins.bind(this);
    this.gaugeByID = this.gaugeByID.bind(this);
    this.gauges = this.gauges.bind(this);
    this.activeGauges = this.activeGauges.bind(this);
    this.activeGaugesPerDenom = this.activeGaugesPerDenom.bind(this);
    this.upcomingGauges = this.upcomingGauges.bind(this);
    this.upcomingGaugesPerDenom = this.upcomingGaugesPerDenom.bind(this);
    this.rewardsEst = this.rewardsEst.bind(this);
    this.lockableDurations = this.lockableDurations.bind(this);
    this.allGroups = this.allGroups.bind(this);
    this.allGroupsGauges = this.allGroupsGauges.bind(this);
    this.allGroupsWithGauge = this.allGroupsWithGauge.bind(this);
    this.groupByGroupGaugeID = this.groupByGroupGaugeID.bind(this);
    this.currentWeightByGroupGaugeID = this.currentWeightByGroupGaugeID.bind(this);
  }
  moduleToDistributeCoins(request: ModuleToDistributeCoinsRequest = {}, useInterfaces: boolean = true): Promise<ModuleToDistributeCoinsResponse> {
    const data = ModuleToDistributeCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "ModuleToDistributeCoins", data);
    return promise.then(data => ModuleToDistributeCoinsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  gaugeByID(request: GaugeByIDRequest, useInterfaces: boolean = true): Promise<GaugeByIDResponse> {
    const data = GaugeByIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "GaugeByID", data);
    return promise.then(data => GaugeByIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  gauges(request: GaugesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<GaugesResponse> {
    const data = GaugesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "Gauges", data);
    return promise.then(data => GaugesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  activeGauges(request: ActiveGaugesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<ActiveGaugesResponse> {
    const data = ActiveGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "ActiveGauges", data);
    return promise.then(data => ActiveGaugesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest, useInterfaces: boolean = true): Promise<ActiveGaugesPerDenomResponse> {
    const data = ActiveGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "ActiveGaugesPerDenom", data);
    return promise.then(data => ActiveGaugesPerDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  upcomingGauges(request: UpcomingGaugesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<UpcomingGaugesResponse> {
    const data = UpcomingGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "UpcomingGauges", data);
    return promise.then(data => UpcomingGaugesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest, useInterfaces: boolean = true): Promise<UpcomingGaugesPerDenomResponse> {
    const data = UpcomingGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "UpcomingGaugesPerDenom", data);
    return promise.then(data => UpcomingGaugesPerDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rewardsEst(request: RewardsEstRequest, useInterfaces: boolean = true): Promise<RewardsEstResponse> {
    const data = RewardsEstRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "RewardsEst", data);
    return promise.then(data => RewardsEstResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockableDurations(request: QueryLockableDurationsRequest = {}, useInterfaces: boolean = true): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "LockableDurations", data);
    return promise.then(data => QueryLockableDurationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allGroups(request: QueryAllGroupsRequest = {}, useInterfaces: boolean = true): Promise<QueryAllGroupsResponse> {
    const data = QueryAllGroupsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "AllGroups", data);
    return promise.then(data => QueryAllGroupsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allGroupsGauges(request: QueryAllGroupsGaugesRequest = {}, useInterfaces: boolean = true): Promise<QueryAllGroupsGaugesResponse> {
    const data = QueryAllGroupsGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "AllGroupsGauges", data);
    return promise.then(data => QueryAllGroupsGaugesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allGroupsWithGauge(request: QueryAllGroupsWithGaugeRequest = {}, useInterfaces: boolean = true): Promise<QueryAllGroupsWithGaugeResponse> {
    const data = QueryAllGroupsWithGaugeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "AllGroupsWithGauge", data);
    return promise.then(data => QueryAllGroupsWithGaugeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest, useInterfaces: boolean = true): Promise<QueryGroupByGroupGaugeIDResponse> {
    const data = QueryGroupByGroupGaugeIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "GroupByGroupGaugeID", data);
    return promise.then(data => QueryGroupByGroupGaugeIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest, useInterfaces: boolean = true): Promise<QueryCurrentWeightByGroupGaugeIDResponse> {
    const data = QueryCurrentWeightByGroupGaugeIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.incentives.Query", "CurrentWeightByGroupGaugeID", data);
    return promise.then(data => QueryCurrentWeightByGroupGaugeIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    moduleToDistributeCoins(request?: ModuleToDistributeCoinsRequest, useInterfaces: boolean = true): Promise<ModuleToDistributeCoinsResponse> {
      return queryService.moduleToDistributeCoins(request, useInterfaces);
    },
    gaugeByID(request: GaugeByIDRequest, useInterfaces: boolean = true): Promise<GaugeByIDResponse> {
      return queryService.gaugeByID(request, useInterfaces);
    },
    gauges(request?: GaugesRequest, useInterfaces: boolean = true): Promise<GaugesResponse> {
      return queryService.gauges(request, useInterfaces);
    },
    activeGauges(request?: ActiveGaugesRequest, useInterfaces: boolean = true): Promise<ActiveGaugesResponse> {
      return queryService.activeGauges(request, useInterfaces);
    },
    activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest, useInterfaces: boolean = true): Promise<ActiveGaugesPerDenomResponse> {
      return queryService.activeGaugesPerDenom(request, useInterfaces);
    },
    upcomingGauges(request?: UpcomingGaugesRequest, useInterfaces: boolean = true): Promise<UpcomingGaugesResponse> {
      return queryService.upcomingGauges(request, useInterfaces);
    },
    upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest, useInterfaces: boolean = true): Promise<UpcomingGaugesPerDenomResponse> {
      return queryService.upcomingGaugesPerDenom(request, useInterfaces);
    },
    rewardsEst(request: RewardsEstRequest, useInterfaces: boolean = true): Promise<RewardsEstResponse> {
      return queryService.rewardsEst(request, useInterfaces);
    },
    lockableDurations(request?: QueryLockableDurationsRequest, useInterfaces: boolean = true): Promise<QueryLockableDurationsResponse> {
      return queryService.lockableDurations(request, useInterfaces);
    },
    allGroups(request?: QueryAllGroupsRequest, useInterfaces: boolean = true): Promise<QueryAllGroupsResponse> {
      return queryService.allGroups(request, useInterfaces);
    },
    allGroupsGauges(request?: QueryAllGroupsGaugesRequest, useInterfaces: boolean = true): Promise<QueryAllGroupsGaugesResponse> {
      return queryService.allGroupsGauges(request, useInterfaces);
    },
    allGroupsWithGauge(request?: QueryAllGroupsWithGaugeRequest, useInterfaces: boolean = true): Promise<QueryAllGroupsWithGaugeResponse> {
      return queryService.allGroupsWithGauge(request, useInterfaces);
    },
    groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest, useInterfaces: boolean = true): Promise<QueryGroupByGroupGaugeIDResponse> {
      return queryService.groupByGroupGaugeID(request, useInterfaces);
    },
    currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest, useInterfaces: boolean = true): Promise<QueryCurrentWeightByGroupGaugeIDResponse> {
      return queryService.currentWeightByGroupGaugeID(request, useInterfaces);
    }
  };
};
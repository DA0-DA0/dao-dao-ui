import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { PoolsRequest, PoolsResponse, ParamsRequest, ParamsResponse, UserPositionsRequest, UserPositionsResponse, LiquidityPerTickRangeRequest, LiquidityPerTickRangeResponse, LiquidityNetInDirectionRequest, LiquidityNetInDirectionResponse, ClaimableSpreadRewardsRequest, ClaimableSpreadRewardsResponse, ClaimableIncentivesRequest, ClaimableIncentivesResponse, PositionByIdRequest, PositionByIdResponse, PoolAccumulatorRewardsRequest, PoolAccumulatorRewardsResponse, IncentiveRecordsRequest, IncentiveRecordsResponse, TickAccumulatorTrackersRequest, TickAccumulatorTrackersResponse, CFMMPoolIdLinkFromConcentratedPoolIdRequest, CFMMPoolIdLinkFromConcentratedPoolIdResponse, UserUnbondingPositionsRequest, UserUnbondingPositionsResponse, GetTotalLiquidityRequest, GetTotalLiquidityResponse, NumNextInitializedTicksRequest, NumNextInitializedTicksResponse } from "./query";
export interface Query {
  /** Pools returns all concentrated liquidity pools */
  pools(request?: PoolsRequest): Promise<PoolsResponse>;
  /** Params returns concentrated liquidity module params. */
  params(request?: ParamsRequest): Promise<ParamsResponse>;
  /** UserPositions returns all concentrated postitions of some address. */
  userPositions(request: UserPositionsRequest): Promise<UserPositionsResponse>;
  /**
   * LiquidityPerTickRange returns the amount of liquidity per every tick range
   * existing within the given pool
   */
  liquidityPerTickRange(request: LiquidityPerTickRangeRequest): Promise<LiquidityPerTickRangeResponse>;
  /**
   * LiquidityNetInDirection returns liquidity net in the direction given.
   * Uses the bound if specified, if not uses either min tick / max tick
   * depending on the direction.
   */
  liquidityNetInDirection(request: LiquidityNetInDirectionRequest): Promise<LiquidityNetInDirectionResponse>;
  /**
   * ClaimableSpreadRewards returns the amount of spread rewards that can be
   * claimed by a position with the given id.
   */
  claimableSpreadRewards(request: ClaimableSpreadRewardsRequest): Promise<ClaimableSpreadRewardsResponse>;
  /**
   * ClaimableIncentives returns the amount of incentives that can be claimed
   * and how many would be forfeited by a position with the given id.
   */
  claimableIncentives(request: ClaimableIncentivesRequest): Promise<ClaimableIncentivesResponse>;
  /** PositionById returns a position with the given id. */
  positionById(request: PositionByIdRequest): Promise<PositionByIdResponse>;
  /**
   * PoolAccumulatorRewards returns the pool-global accumulator rewards.
   * Contains spread factor rewards and uptime rewards.
   */
  poolAccumulatorRewards(request: PoolAccumulatorRewardsRequest): Promise<PoolAccumulatorRewardsResponse>;
  /** IncentiveRecords returns the incentive records for a given poolId */
  incentiveRecords(request: IncentiveRecordsRequest): Promise<IncentiveRecordsResponse>;
  /**
   * TickAccumulatorTrackers returns the tick accumulator trackers.
   * Contains spread factor and uptime accumulator trackers.
   */
  tickAccumulatorTrackers(request: TickAccumulatorTrackersRequest): Promise<TickAccumulatorTrackersResponse>;
  /**
   * CFMMPoolIdLinkFromConcentratedPoolId returns the pool id of the CFMM
   * pool that is linked with the given concentrated pool.
   */
  cFMMPoolIdLinkFromConcentratedPoolId(request: CFMMPoolIdLinkFromConcentratedPoolIdRequest): Promise<CFMMPoolIdLinkFromConcentratedPoolIdResponse>;
  /**
   * UserUnbondingPositions returns the position and lock info of unbonding
   * positions of the given address.
   */
  userUnbondingPositions(request: UserUnbondingPositionsRequest): Promise<UserUnbondingPositionsResponse>;
  /** GetTotalLiquidity returns total liquidity across all cl pools. */
  getTotalLiquidity(request?: GetTotalLiquidityRequest): Promise<GetTotalLiquidityResponse>;
  /**
   * NumNextInitializedTicks returns the provided number of next initialized
   * ticks in the direction of swapping the token in denom.
   */
  numNextInitializedTicks(request: NumNextInitializedTicksRequest): Promise<NumNextInitializedTicksResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.pools = this.pools.bind(this);
    this.params = this.params.bind(this);
    this.userPositions = this.userPositions.bind(this);
    this.liquidityPerTickRange = this.liquidityPerTickRange.bind(this);
    this.liquidityNetInDirection = this.liquidityNetInDirection.bind(this);
    this.claimableSpreadRewards = this.claimableSpreadRewards.bind(this);
    this.claimableIncentives = this.claimableIncentives.bind(this);
    this.positionById = this.positionById.bind(this);
    this.poolAccumulatorRewards = this.poolAccumulatorRewards.bind(this);
    this.incentiveRecords = this.incentiveRecords.bind(this);
    this.tickAccumulatorTrackers = this.tickAccumulatorTrackers.bind(this);
    this.cFMMPoolIdLinkFromConcentratedPoolId = this.cFMMPoolIdLinkFromConcentratedPoolId.bind(this);
    this.userUnbondingPositions = this.userUnbondingPositions.bind(this);
    this.getTotalLiquidity = this.getTotalLiquidity.bind(this);
    this.numNextInitializedTicks = this.numNextInitializedTicks.bind(this);
  }
  pools(request: PoolsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<PoolsResponse> {
    const data = PoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Pools", data);
    return promise.then(data => PoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: ParamsRequest = {}, useInterfaces: boolean = true): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userPositions(request: UserPositionsRequest, useInterfaces: boolean = true): Promise<UserPositionsResponse> {
    const data = UserPositionsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "UserPositions", data);
    return promise.then(data => UserPositionsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidityPerTickRange(request: LiquidityPerTickRangeRequest, useInterfaces: boolean = true): Promise<LiquidityPerTickRangeResponse> {
    const data = LiquidityPerTickRangeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "LiquidityPerTickRange", data);
    return promise.then(data => LiquidityPerTickRangeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidityNetInDirection(request: LiquidityNetInDirectionRequest, useInterfaces: boolean = true): Promise<LiquidityNetInDirectionResponse> {
    const data = LiquidityNetInDirectionRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "LiquidityNetInDirection", data);
    return promise.then(data => LiquidityNetInDirectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimableSpreadRewards(request: ClaimableSpreadRewardsRequest, useInterfaces: boolean = true): Promise<ClaimableSpreadRewardsResponse> {
    const data = ClaimableSpreadRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "ClaimableSpreadRewards", data);
    return promise.then(data => ClaimableSpreadRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimableIncentives(request: ClaimableIncentivesRequest, useInterfaces: boolean = true): Promise<ClaimableIncentivesResponse> {
    const data = ClaimableIncentivesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "ClaimableIncentives", data);
    return promise.then(data => ClaimableIncentivesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  positionById(request: PositionByIdRequest, useInterfaces: boolean = true): Promise<PositionByIdResponse> {
    const data = PositionByIdRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "PositionById", data);
    return promise.then(data => PositionByIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolAccumulatorRewards(request: PoolAccumulatorRewardsRequest, useInterfaces: boolean = true): Promise<PoolAccumulatorRewardsResponse> {
    const data = PoolAccumulatorRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "PoolAccumulatorRewards", data);
    return promise.then(data => PoolAccumulatorRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  incentiveRecords(request: IncentiveRecordsRequest, useInterfaces: boolean = true): Promise<IncentiveRecordsResponse> {
    const data = IncentiveRecordsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "IncentiveRecords", data);
    return promise.then(data => IncentiveRecordsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tickAccumulatorTrackers(request: TickAccumulatorTrackersRequest, useInterfaces: boolean = true): Promise<TickAccumulatorTrackersResponse> {
    const data = TickAccumulatorTrackersRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "TickAccumulatorTrackers", data);
    return promise.then(data => TickAccumulatorTrackersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cFMMPoolIdLinkFromConcentratedPoolId(request: CFMMPoolIdLinkFromConcentratedPoolIdRequest, useInterfaces: boolean = true): Promise<CFMMPoolIdLinkFromConcentratedPoolIdResponse> {
    const data = CFMMPoolIdLinkFromConcentratedPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "CFMMPoolIdLinkFromConcentratedPoolId", data);
    return promise.then(data => CFMMPoolIdLinkFromConcentratedPoolIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userUnbondingPositions(request: UserUnbondingPositionsRequest, useInterfaces: boolean = true): Promise<UserUnbondingPositionsResponse> {
    const data = UserUnbondingPositionsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "UserUnbondingPositions", data);
    return promise.then(data => UserUnbondingPositionsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getTotalLiquidity(request: GetTotalLiquidityRequest = {}, useInterfaces: boolean = true): Promise<GetTotalLiquidityResponse> {
    const data = GetTotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "GetTotalLiquidity", data);
    return promise.then(data => GetTotalLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  numNextInitializedTicks(request: NumNextInitializedTicksRequest, useInterfaces: boolean = true): Promise<NumNextInitializedTicksResponse> {
    const data = NumNextInitializedTicksRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "NumNextInitializedTicks", data);
    return promise.then(data => NumNextInitializedTicksResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    pools(request?: PoolsRequest, useInterfaces: boolean = true): Promise<PoolsResponse> {
      return queryService.pools(request, useInterfaces);
    },
    params(request?: ParamsRequest, useInterfaces: boolean = true): Promise<ParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    userPositions(request: UserPositionsRequest, useInterfaces: boolean = true): Promise<UserPositionsResponse> {
      return queryService.userPositions(request, useInterfaces);
    },
    liquidityPerTickRange(request: LiquidityPerTickRangeRequest, useInterfaces: boolean = true): Promise<LiquidityPerTickRangeResponse> {
      return queryService.liquidityPerTickRange(request, useInterfaces);
    },
    liquidityNetInDirection(request: LiquidityNetInDirectionRequest, useInterfaces: boolean = true): Promise<LiquidityNetInDirectionResponse> {
      return queryService.liquidityNetInDirection(request, useInterfaces);
    },
    claimableSpreadRewards(request: ClaimableSpreadRewardsRequest, useInterfaces: boolean = true): Promise<ClaimableSpreadRewardsResponse> {
      return queryService.claimableSpreadRewards(request, useInterfaces);
    },
    claimableIncentives(request: ClaimableIncentivesRequest, useInterfaces: boolean = true): Promise<ClaimableIncentivesResponse> {
      return queryService.claimableIncentives(request, useInterfaces);
    },
    positionById(request: PositionByIdRequest, useInterfaces: boolean = true): Promise<PositionByIdResponse> {
      return queryService.positionById(request, useInterfaces);
    },
    poolAccumulatorRewards(request: PoolAccumulatorRewardsRequest, useInterfaces: boolean = true): Promise<PoolAccumulatorRewardsResponse> {
      return queryService.poolAccumulatorRewards(request, useInterfaces);
    },
    incentiveRecords(request: IncentiveRecordsRequest, useInterfaces: boolean = true): Promise<IncentiveRecordsResponse> {
      return queryService.incentiveRecords(request, useInterfaces);
    },
    tickAccumulatorTrackers(request: TickAccumulatorTrackersRequest, useInterfaces: boolean = true): Promise<TickAccumulatorTrackersResponse> {
      return queryService.tickAccumulatorTrackers(request, useInterfaces);
    },
    cFMMPoolIdLinkFromConcentratedPoolId(request: CFMMPoolIdLinkFromConcentratedPoolIdRequest, useInterfaces: boolean = true): Promise<CFMMPoolIdLinkFromConcentratedPoolIdResponse> {
      return queryService.cFMMPoolIdLinkFromConcentratedPoolId(request, useInterfaces);
    },
    userUnbondingPositions(request: UserUnbondingPositionsRequest, useInterfaces: boolean = true): Promise<UserUnbondingPositionsResponse> {
      return queryService.userUnbondingPositions(request, useInterfaces);
    },
    getTotalLiquidity(request?: GetTotalLiquidityRequest, useInterfaces: boolean = true): Promise<GetTotalLiquidityResponse> {
      return queryService.getTotalLiquidity(request, useInterfaces);
    },
    numNextInitializedTicks(request: NumNextInitializedTicksRequest, useInterfaces: boolean = true): Promise<NumNextInitializedTicksResponse> {
      return queryService.numNextInitializedTicks(request, useInterfaces);
    }
  };
};
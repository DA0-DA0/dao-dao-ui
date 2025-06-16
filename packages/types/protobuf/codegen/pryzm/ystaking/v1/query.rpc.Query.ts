import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryBondedAmountRequest, QueryBondedAmountResponse, QueryRewardRequest, QueryRewardResponse, QueryGetUserStakeStateRequest, QueryGetUserStakeStateResponse, QueryAllUserStakeStateRequest, QueryAllUserStakeStateResponse, QueryGetAssetPoolStateRequest, QueryGetAssetPoolStateResponse, QueryAllAssetPoolStateRequest, QueryAllAssetPoolStateResponse, QueryGetAssetMaturityPoolStateRequest, QueryGetAssetMaturityPoolStateResponse, QueryAllAssetMaturityPoolStateRequest, QueryAllAssetMaturityPoolStateResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of BondedAmount items. */
  bondedAmount(request: QueryBondedAmountRequest): Promise<QueryBondedAmountResponse>;
  reward(request: QueryRewardRequest): Promise<QueryRewardResponse>;
  userStakeState(request: QueryGetUserStakeStateRequest): Promise<QueryGetUserStakeStateResponse>;
  /** Queries a list of UserStakeState items. */
  userStakeStateAll(request: QueryAllUserStakeStateRequest): Promise<QueryAllUserStakeStateResponse>;
  assetPoolState(request: QueryGetAssetPoolStateRequest): Promise<QueryGetAssetPoolStateResponse>;
  assetPoolStateAll(request?: QueryAllAssetPoolStateRequest): Promise<QueryAllAssetPoolStateResponse>;
  assetMaturityPoolState(request: QueryGetAssetMaturityPoolStateRequest): Promise<QueryGetAssetMaturityPoolStateResponse>;
  assetMaturityPoolStateAll(request?: QueryAllAssetMaturityPoolStateRequest): Promise<QueryAllAssetMaturityPoolStateResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.bondedAmount = this.bondedAmount.bind(this);
    this.reward = this.reward.bind(this);
    this.userStakeState = this.userStakeState.bind(this);
    this.userStakeStateAll = this.userStakeStateAll.bind(this);
    this.assetPoolState = this.assetPoolState.bind(this);
    this.assetPoolStateAll = this.assetPoolStateAll.bind(this);
    this.assetMaturityPoolState = this.assetMaturityPoolState.bind(this);
    this.assetMaturityPoolStateAll = this.assetMaturityPoolStateAll.bind(this);
  }
  bondedAmount(request: QueryBondedAmountRequest, useInterfaces: boolean = true): Promise<QueryBondedAmountResponse> {
    const data = QueryBondedAmountRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "BondedAmount", data);
    return promise.then(data => QueryBondedAmountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  reward(request: QueryRewardRequest, useInterfaces: boolean = true): Promise<QueryRewardResponse> {
    const data = QueryRewardRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "Reward", data);
    return promise.then(data => QueryRewardResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userStakeState(request: QueryGetUserStakeStateRequest, useInterfaces: boolean = true): Promise<QueryGetUserStakeStateResponse> {
    const data = QueryGetUserStakeStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "UserStakeState", data);
    return promise.then(data => QueryGetUserStakeStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userStakeStateAll(request: QueryAllUserStakeStateRequest, useInterfaces: boolean = true): Promise<QueryAllUserStakeStateResponse> {
    const data = QueryAllUserStakeStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "UserStakeStateAll", data);
    return promise.then(data => QueryAllUserStakeStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetPoolState(request: QueryGetAssetPoolStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetPoolStateResponse> {
    const data = QueryGetAssetPoolStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "AssetPoolState", data);
    return promise.then(data => QueryGetAssetPoolStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetPoolStateAll(request: QueryAllAssetPoolStateRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllAssetPoolStateResponse> {
    const data = QueryAllAssetPoolStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "AssetPoolStateAll", data);
    return promise.then(data => QueryAllAssetPoolStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetMaturityPoolState(request: QueryGetAssetMaturityPoolStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetMaturityPoolStateResponse> {
    const data = QueryGetAssetMaturityPoolStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "AssetMaturityPoolState", data);
    return promise.then(data => QueryGetAssetMaturityPoolStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetMaturityPoolStateAll(request: QueryAllAssetMaturityPoolStateRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllAssetMaturityPoolStateResponse> {
    const data = QueryAllAssetMaturityPoolStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Query", "AssetMaturityPoolStateAll", data);
    return promise.then(data => QueryAllAssetMaturityPoolStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    bondedAmount(request: QueryBondedAmountRequest, useInterfaces: boolean = true): Promise<QueryBondedAmountResponse> {
      return queryService.bondedAmount(request, useInterfaces);
    },
    reward(request: QueryRewardRequest, useInterfaces: boolean = true): Promise<QueryRewardResponse> {
      return queryService.reward(request, useInterfaces);
    },
    userStakeState(request: QueryGetUserStakeStateRequest, useInterfaces: boolean = true): Promise<QueryGetUserStakeStateResponse> {
      return queryService.userStakeState(request, useInterfaces);
    },
    userStakeStateAll(request: QueryAllUserStakeStateRequest, useInterfaces: boolean = true): Promise<QueryAllUserStakeStateResponse> {
      return queryService.userStakeStateAll(request, useInterfaces);
    },
    assetPoolState(request: QueryGetAssetPoolStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetPoolStateResponse> {
      return queryService.assetPoolState(request, useInterfaces);
    },
    assetPoolStateAll(request?: QueryAllAssetPoolStateRequest, useInterfaces: boolean = true): Promise<QueryAllAssetPoolStateResponse> {
      return queryService.assetPoolStateAll(request, useInterfaces);
    },
    assetMaturityPoolState(request: QueryGetAssetMaturityPoolStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetMaturityPoolStateResponse> {
      return queryService.assetMaturityPoolState(request, useInterfaces);
    },
    assetMaturityPoolStateAll(request?: QueryAllAssetMaturityPoolStateRequest, useInterfaces: boolean = true): Promise<QueryAllAssetMaturityPoolStateResponse> {
      return queryService.assetMaturityPoolStateAll(request, useInterfaces);
    }
  };
};
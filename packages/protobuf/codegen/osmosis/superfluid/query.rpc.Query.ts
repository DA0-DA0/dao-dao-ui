import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, AssetTypeRequest, AssetTypeResponse, AllAssetsRequest, AllAssetsResponse, AssetMultiplierRequest, AssetMultiplierResponse, AllIntermediaryAccountsRequest, AllIntermediaryAccountsResponse, ConnectedIntermediaryAccountRequest, ConnectedIntermediaryAccountResponse, QueryTotalDelegationByValidatorForDenomRequest, QueryTotalDelegationByValidatorForDenomResponse, TotalSuperfluidDelegationsRequest, TotalSuperfluidDelegationsResponse, SuperfluidDelegationAmountRequest, SuperfluidDelegationAmountResponse, SuperfluidDelegationsByDelegatorRequest, SuperfluidDelegationsByDelegatorResponse, SuperfluidUndelegationsByDelegatorRequest, SuperfluidUndelegationsByDelegatorResponse, SuperfluidDelegationsByValidatorDenomRequest, SuperfluidDelegationsByValidatorDenomResponse, EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, EstimateSuperfluidDelegatedAmountByValidatorDenomResponse, QueryTotalDelegationByDelegatorRequest, QueryTotalDelegationByDelegatorResponse, QueryUnpoolWhitelistRequest, QueryUnpoolWhitelistResponse, UserConcentratedSuperfluidPositionsDelegatedRequest, UserConcentratedSuperfluidPositionsDelegatedResponse, UserConcentratedSuperfluidPositionsUndelegatingRequest, UserConcentratedSuperfluidPositionsUndelegatingResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of superfluid parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * Returns superfluid asset type, whether if it's a native asset or an lp
   * share.
   */
  assetType(request: AssetTypeRequest): Promise<AssetTypeResponse>;
  /** Returns all registered superfluid assets. */
  allAssets(request?: AllAssetsRequest): Promise<AllAssetsResponse>;
  /** Returns the osmo equivalent multiplier used in the most recent epoch. */
  assetMultiplier(request: AssetMultiplierRequest): Promise<AssetMultiplierResponse>;
  /** Returns all superfluid intermediary accounts. */
  allIntermediaryAccounts(request?: AllIntermediaryAccountsRequest): Promise<AllIntermediaryAccountsResponse>;
  /** Returns intermediary account connected to a superfluid staked lock by id */
  connectedIntermediaryAccount(request: ConnectedIntermediaryAccountRequest): Promise<ConnectedIntermediaryAccountResponse>;
  /** Returns the amount of delegations of specific denom for all validators */
  totalDelegationByValidatorForDenom(request: QueryTotalDelegationByValidatorForDenomRequest): Promise<QueryTotalDelegationByValidatorForDenomResponse>;
  /**
   * Returns the total amount of osmo superfluidly staked.
   * Response is denominated in uosmo.
   */
  totalSuperfluidDelegations(request?: TotalSuperfluidDelegationsRequest): Promise<TotalSuperfluidDelegationsResponse>;
  /**
   * Returns the coins superfluid delegated for the delegator, validator, denom
   * triplet
   */
  superfluidDelegationAmount(request: SuperfluidDelegationAmountRequest): Promise<SuperfluidDelegationAmountResponse>;
  /** Returns all the delegated superfluid poistions for a specific delegator. */
  superfluidDelegationsByDelegator(request: SuperfluidDelegationsByDelegatorRequest): Promise<SuperfluidDelegationsByDelegatorResponse>;
  /** Returns all the undelegating superfluid poistions for a specific delegator. */
  superfluidUndelegationsByDelegator(request: SuperfluidUndelegationsByDelegatorRequest): Promise<SuperfluidUndelegationsByDelegatorResponse>;
  /**
   * Returns all the superfluid positions of a specific denom delegated to one
   * validator
   */
  superfluidDelegationsByValidatorDenom(request: SuperfluidDelegationsByValidatorDenomRequest): Promise<SuperfluidDelegationsByValidatorDenomResponse>;
  /**
   * Returns the amount of a specific denom delegated to a specific validator
   * This is labeled an estimate, because the way it calculates the amount can
   * lead rounding errors from the true delegated amount
   */
  estimateSuperfluidDelegatedAmountByValidatorDenom(request: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest): Promise<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse>;
  /** Returns the specified delegations for a specific delegator */
  totalDelegationByDelegator(request: QueryTotalDelegationByDelegatorRequest): Promise<QueryTotalDelegationByDelegatorResponse>;
  /** Returns a list of whitelisted pool ids to unpool. */
  unpoolWhitelist(request?: QueryUnpoolWhitelistRequest): Promise<QueryUnpoolWhitelistResponse>;
  /** Returns all of a user's full range CL positions that are superfluid staked. */
  userConcentratedSuperfluidPositionsDelegated(request: UserConcentratedSuperfluidPositionsDelegatedRequest): Promise<UserConcentratedSuperfluidPositionsDelegatedResponse>;
  userConcentratedSuperfluidPositionsUndelegating(request: UserConcentratedSuperfluidPositionsUndelegatingRequest): Promise<UserConcentratedSuperfluidPositionsUndelegatingResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.assetType = this.assetType.bind(this);
    this.allAssets = this.allAssets.bind(this);
    this.assetMultiplier = this.assetMultiplier.bind(this);
    this.allIntermediaryAccounts = this.allIntermediaryAccounts.bind(this);
    this.connectedIntermediaryAccount = this.connectedIntermediaryAccount.bind(this);
    this.totalDelegationByValidatorForDenom = this.totalDelegationByValidatorForDenom.bind(this);
    this.totalSuperfluidDelegations = this.totalSuperfluidDelegations.bind(this);
    this.superfluidDelegationAmount = this.superfluidDelegationAmount.bind(this);
    this.superfluidDelegationsByDelegator = this.superfluidDelegationsByDelegator.bind(this);
    this.superfluidUndelegationsByDelegator = this.superfluidUndelegationsByDelegator.bind(this);
    this.superfluidDelegationsByValidatorDenom = this.superfluidDelegationsByValidatorDenom.bind(this);
    this.estimateSuperfluidDelegatedAmountByValidatorDenom = this.estimateSuperfluidDelegatedAmountByValidatorDenom.bind(this);
    this.totalDelegationByDelegator = this.totalDelegationByDelegator.bind(this);
    this.unpoolWhitelist = this.unpoolWhitelist.bind(this);
    this.userConcentratedSuperfluidPositionsDelegated = this.userConcentratedSuperfluidPositionsDelegated.bind(this);
    this.userConcentratedSuperfluidPositionsUndelegating = this.userConcentratedSuperfluidPositionsUndelegating.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetType(request: AssetTypeRequest, useInterfaces: boolean = true): Promise<AssetTypeResponse> {
    const data = AssetTypeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "AssetType", data);
    return promise.then(data => AssetTypeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allAssets(request: AllAssetsRequest = {}, useInterfaces: boolean = true): Promise<AllAssetsResponse> {
    const data = AllAssetsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "AllAssets", data);
    return promise.then(data => AllAssetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetMultiplier(request: AssetMultiplierRequest, useInterfaces: boolean = true): Promise<AssetMultiplierResponse> {
    const data = AssetMultiplierRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "AssetMultiplier", data);
    return promise.then(data => AssetMultiplierResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allIntermediaryAccounts(request: AllIntermediaryAccountsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<AllIntermediaryAccountsResponse> {
    const data = AllIntermediaryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "AllIntermediaryAccounts", data);
    return promise.then(data => AllIntermediaryAccountsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connectedIntermediaryAccount(request: ConnectedIntermediaryAccountRequest, useInterfaces: boolean = true): Promise<ConnectedIntermediaryAccountResponse> {
    const data = ConnectedIntermediaryAccountRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "ConnectedIntermediaryAccount", data);
    return promise.then(data => ConnectedIntermediaryAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalDelegationByValidatorForDenom(request: QueryTotalDelegationByValidatorForDenomRequest, useInterfaces: boolean = true): Promise<QueryTotalDelegationByValidatorForDenomResponse> {
    const data = QueryTotalDelegationByValidatorForDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "TotalDelegationByValidatorForDenom", data);
    return promise.then(data => QueryTotalDelegationByValidatorForDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalSuperfluidDelegations(request: TotalSuperfluidDelegationsRequest = {}, useInterfaces: boolean = true): Promise<TotalSuperfluidDelegationsResponse> {
    const data = TotalSuperfluidDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "TotalSuperfluidDelegations", data);
    return promise.then(data => TotalSuperfluidDelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  superfluidDelegationAmount(request: SuperfluidDelegationAmountRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationAmountResponse> {
    const data = SuperfluidDelegationAmountRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "SuperfluidDelegationAmount", data);
    return promise.then(data => SuperfluidDelegationAmountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  superfluidDelegationsByDelegator(request: SuperfluidDelegationsByDelegatorRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationsByDelegatorResponse> {
    const data = SuperfluidDelegationsByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "SuperfluidDelegationsByDelegator", data);
    return promise.then(data => SuperfluidDelegationsByDelegatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  superfluidUndelegationsByDelegator(request: SuperfluidUndelegationsByDelegatorRequest, useInterfaces: boolean = true): Promise<SuperfluidUndelegationsByDelegatorResponse> {
    const data = SuperfluidUndelegationsByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "SuperfluidUndelegationsByDelegator", data);
    return promise.then(data => SuperfluidUndelegationsByDelegatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  superfluidDelegationsByValidatorDenom(request: SuperfluidDelegationsByValidatorDenomRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationsByValidatorDenomResponse> {
    const data = SuperfluidDelegationsByValidatorDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "SuperfluidDelegationsByValidatorDenom", data);
    return promise.then(data => SuperfluidDelegationsByValidatorDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  estimateSuperfluidDelegatedAmountByValidatorDenom(request: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, useInterfaces: boolean = true): Promise<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse> {
    const data = EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "EstimateSuperfluidDelegatedAmountByValidatorDenom", data);
    return promise.then(data => EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalDelegationByDelegator(request: QueryTotalDelegationByDelegatorRequest, useInterfaces: boolean = true): Promise<QueryTotalDelegationByDelegatorResponse> {
    const data = QueryTotalDelegationByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "TotalDelegationByDelegator", data);
    return promise.then(data => QueryTotalDelegationByDelegatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unpoolWhitelist(request: QueryUnpoolWhitelistRequest = {}, useInterfaces: boolean = true): Promise<QueryUnpoolWhitelistResponse> {
    const data = QueryUnpoolWhitelistRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "UnpoolWhitelist", data);
    return promise.then(data => QueryUnpoolWhitelistResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userConcentratedSuperfluidPositionsDelegated(request: UserConcentratedSuperfluidPositionsDelegatedRequest, useInterfaces: boolean = true): Promise<UserConcentratedSuperfluidPositionsDelegatedResponse> {
    const data = UserConcentratedSuperfluidPositionsDelegatedRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "UserConcentratedSuperfluidPositionsDelegated", data);
    return promise.then(data => UserConcentratedSuperfluidPositionsDelegatedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userConcentratedSuperfluidPositionsUndelegating(request: UserConcentratedSuperfluidPositionsUndelegatingRequest, useInterfaces: boolean = true): Promise<UserConcentratedSuperfluidPositionsUndelegatingResponse> {
    const data = UserConcentratedSuperfluidPositionsUndelegatingRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.superfluid.Query", "UserConcentratedSuperfluidPositionsUndelegating", data);
    return promise.then(data => UserConcentratedSuperfluidPositionsUndelegatingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    assetType(request: AssetTypeRequest, useInterfaces: boolean = true): Promise<AssetTypeResponse> {
      return queryService.assetType(request, useInterfaces);
    },
    allAssets(request?: AllAssetsRequest, useInterfaces: boolean = true): Promise<AllAssetsResponse> {
      return queryService.allAssets(request, useInterfaces);
    },
    assetMultiplier(request: AssetMultiplierRequest, useInterfaces: boolean = true): Promise<AssetMultiplierResponse> {
      return queryService.assetMultiplier(request, useInterfaces);
    },
    allIntermediaryAccounts(request?: AllIntermediaryAccountsRequest, useInterfaces: boolean = true): Promise<AllIntermediaryAccountsResponse> {
      return queryService.allIntermediaryAccounts(request, useInterfaces);
    },
    connectedIntermediaryAccount(request: ConnectedIntermediaryAccountRequest, useInterfaces: boolean = true): Promise<ConnectedIntermediaryAccountResponse> {
      return queryService.connectedIntermediaryAccount(request, useInterfaces);
    },
    totalDelegationByValidatorForDenom(request: QueryTotalDelegationByValidatorForDenomRequest, useInterfaces: boolean = true): Promise<QueryTotalDelegationByValidatorForDenomResponse> {
      return queryService.totalDelegationByValidatorForDenom(request, useInterfaces);
    },
    totalSuperfluidDelegations(request?: TotalSuperfluidDelegationsRequest, useInterfaces: boolean = true): Promise<TotalSuperfluidDelegationsResponse> {
      return queryService.totalSuperfluidDelegations(request, useInterfaces);
    },
    superfluidDelegationAmount(request: SuperfluidDelegationAmountRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationAmountResponse> {
      return queryService.superfluidDelegationAmount(request, useInterfaces);
    },
    superfluidDelegationsByDelegator(request: SuperfluidDelegationsByDelegatorRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationsByDelegatorResponse> {
      return queryService.superfluidDelegationsByDelegator(request, useInterfaces);
    },
    superfluidUndelegationsByDelegator(request: SuperfluidUndelegationsByDelegatorRequest, useInterfaces: boolean = true): Promise<SuperfluidUndelegationsByDelegatorResponse> {
      return queryService.superfluidUndelegationsByDelegator(request, useInterfaces);
    },
    superfluidDelegationsByValidatorDenom(request: SuperfluidDelegationsByValidatorDenomRequest, useInterfaces: boolean = true): Promise<SuperfluidDelegationsByValidatorDenomResponse> {
      return queryService.superfluidDelegationsByValidatorDenom(request, useInterfaces);
    },
    estimateSuperfluidDelegatedAmountByValidatorDenom(request: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, useInterfaces: boolean = true): Promise<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse> {
      return queryService.estimateSuperfluidDelegatedAmountByValidatorDenom(request, useInterfaces);
    },
    totalDelegationByDelegator(request: QueryTotalDelegationByDelegatorRequest, useInterfaces: boolean = true): Promise<QueryTotalDelegationByDelegatorResponse> {
      return queryService.totalDelegationByDelegator(request, useInterfaces);
    },
    unpoolWhitelist(request?: QueryUnpoolWhitelistRequest, useInterfaces: boolean = true): Promise<QueryUnpoolWhitelistResponse> {
      return queryService.unpoolWhitelist(request, useInterfaces);
    },
    userConcentratedSuperfluidPositionsDelegated(request: UserConcentratedSuperfluidPositionsDelegatedRequest, useInterfaces: boolean = true): Promise<UserConcentratedSuperfluidPositionsDelegatedResponse> {
      return queryService.userConcentratedSuperfluidPositionsDelegated(request, useInterfaces);
    },
    userConcentratedSuperfluidPositionsUndelegating(request: UserConcentratedSuperfluidPositionsUndelegatingRequest, useInterfaces: boolean = true): Promise<UserConcentratedSuperfluidPositionsUndelegatingResponse> {
      return queryService.userConcentratedSuperfluidPositionsUndelegating(request, useInterfaces);
    }
  };
};
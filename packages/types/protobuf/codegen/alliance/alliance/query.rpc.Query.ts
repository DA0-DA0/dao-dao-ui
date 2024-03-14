import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryAlliancesRequest, QueryAlliancesResponse, QueryIBCAllianceRequest, QueryAllianceResponse, QueryAllAlliancesDelegationsRequest, QueryAlliancesDelegationsResponse, QueryAllianceValidatorRequest, QueryAllianceValidatorResponse, QueryAllAllianceValidatorsRequest, QueryAllianceValidatorsResponse, QueryAlliancesDelegationsRequest, QueryAlliancesDelegationByValidatorRequest, QueryAllianceDelegationRequest, QueryAllianceDelegationResponse, QueryIBCAllianceDelegationRequest, QueryAllianceDelegationRewardsRequest, QueryAllianceDelegationRewardsResponse, QueryIBCAllianceDelegationRewardsRequest, QueryAllianceUnbondingsByDenomAndDelegatorRequest, QueryAllianceUnbondingsByDenomAndDelegatorResponse, QueryAllianceUnbondingsRequest, QueryAllianceUnbondingsResponse, QueryAllianceRedelegationsRequest, QueryAllianceRedelegationsResponse, QueryAllianceRequest } from "./query";
export interface Query {
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Query paginated alliances */
  alliances(request?: QueryAlliancesRequest): Promise<QueryAlliancesResponse>;
  /**
   * Query a specific alliance by ibc hash
   * @deprecated: this endpoint will be replaced for by the encoded version
   * of the denom e.g.: GET:/terra/alliances/ibc%2Falliance
   */
  iBCAlliance(request: QueryIBCAllianceRequest): Promise<QueryAllianceResponse>;
  /** Query all paginated alliance delegations */
  allAlliancesDelegations(request?: QueryAllAlliancesDelegationsRequest): Promise<QueryAlliancesDelegationsResponse>;
  /** Query alliance validator */
  allianceValidator(request: QueryAllianceValidatorRequest): Promise<QueryAllianceValidatorResponse>;
  /** Query all paginated alliance validators */
  allAllianceValidators(request?: QueryAllAllianceValidatorsRequest): Promise<QueryAllianceValidatorsResponse>;
  /** Query all paginated alliance delegations for a delegator addr */
  alliancesDelegation(request: QueryAlliancesDelegationsRequest): Promise<QueryAlliancesDelegationsResponse>;
  /** Query all paginated alliance delegations for a delegator addr and validator_addr */
  alliancesDelegationByValidator(request: QueryAlliancesDelegationByValidatorRequest): Promise<QueryAlliancesDelegationsResponse>;
  /** Query a delegation to an alliance by delegator addr, validator_addr and denom */
  allianceDelegation(request: QueryAllianceDelegationRequest): Promise<QueryAllianceDelegationResponse>;
  /**
   * Query a delegation to an alliance by delegator addr, validator_addr and denom
   * @deprecated: this endpoint will be replaced for by the encoded version
   * of the denom e.g.: GET:/terra/alliances/terradr1231/terravaloper41234/ibc%2Falliance
   */
  iBCAllianceDelegation(request: QueryIBCAllianceDelegationRequest): Promise<QueryAllianceDelegationResponse>;
  /** Query for rewards by delegator addr, validator_addr and denom */
  allianceDelegationRewards(request: QueryAllianceDelegationRewardsRequest): Promise<QueryAllianceDelegationRewardsResponse>;
  /**
   * Query for rewards by delegator addr, validator_addr and denom
   * @deprecated: this endpoint will be replaced for by the encoded version
   * of the denom e.g.: GET:/terra/alliances/terradr1231/terravaloper41234/ibc%2Falliance
   */
  iBCAllianceDelegationRewards(request: QueryIBCAllianceDelegationRewardsRequest): Promise<QueryAllianceDelegationRewardsResponse>;
  /** Query for rewards by delegator addr, validator_addr and denom */
  allianceUnbondingsByDenomAndDelegator(request: QueryAllianceUnbondingsByDenomAndDelegatorRequest): Promise<QueryAllianceUnbondingsByDenomAndDelegatorResponse>;
  /** Query for rewards by delegator addr, validator_addr and denom */
  allianceUnbondings(request: QueryAllianceUnbondingsRequest): Promise<QueryAllianceUnbondingsResponse>;
  /** Query redelegations by denom and delegator address */
  allianceRedelegations(request: QueryAllianceRedelegationsRequest): Promise<QueryAllianceRedelegationsResponse>;
  /** Query a specific alliance by denom */
  alliance(request: QueryAllianceRequest): Promise<QueryAllianceResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.alliances = this.alliances.bind(this);
    this.iBCAlliance = this.iBCAlliance.bind(this);
    this.allAlliancesDelegations = this.allAlliancesDelegations.bind(this);
    this.allianceValidator = this.allianceValidator.bind(this);
    this.allAllianceValidators = this.allAllianceValidators.bind(this);
    this.alliancesDelegation = this.alliancesDelegation.bind(this);
    this.alliancesDelegationByValidator = this.alliancesDelegationByValidator.bind(this);
    this.allianceDelegation = this.allianceDelegation.bind(this);
    this.iBCAllianceDelegation = this.iBCAllianceDelegation.bind(this);
    this.allianceDelegationRewards = this.allianceDelegationRewards.bind(this);
    this.iBCAllianceDelegationRewards = this.iBCAllianceDelegationRewards.bind(this);
    this.allianceUnbondingsByDenomAndDelegator = this.allianceUnbondingsByDenomAndDelegator.bind(this);
    this.allianceUnbondings = this.allianceUnbondings.bind(this);
    this.allianceRedelegations = this.allianceRedelegations.bind(this);
    this.alliance = this.alliance.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  alliances(request: QueryAlliancesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAlliancesResponse> {
    const data = QueryAlliancesRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "Alliances", data);
    return promise.then(data => QueryAlliancesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCAlliance(request: QueryIBCAllianceRequest, useInterfaces: boolean = true): Promise<QueryAllianceResponse> {
    const data = QueryIBCAllianceRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "IBCAlliance", data);
    return promise.then(data => QueryAllianceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allAlliancesDelegations(request: QueryAllAlliancesDelegationsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
    const data = QueryAllAlliancesDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllAlliancesDelegations", data);
    return promise.then(data => QueryAlliancesDelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceValidator(request: QueryAllianceValidatorRequest, useInterfaces: boolean = true): Promise<QueryAllianceValidatorResponse> {
    const data = QueryAllianceValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceValidator", data);
    return promise.then(data => QueryAllianceValidatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allAllianceValidators(request: QueryAllAllianceValidatorsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllianceValidatorsResponse> {
    const data = QueryAllAllianceValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllAllianceValidators", data);
    return promise.then(data => QueryAllianceValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  alliancesDelegation(request: QueryAlliancesDelegationsRequest, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
    const data = QueryAlliancesDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AlliancesDelegation", data);
    return promise.then(data => QueryAlliancesDelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  alliancesDelegationByValidator(request: QueryAlliancesDelegationByValidatorRequest, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
    const data = QueryAlliancesDelegationByValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AlliancesDelegationByValidator", data);
    return promise.then(data => QueryAlliancesDelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceDelegation(request: QueryAllianceDelegationRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationResponse> {
    const data = QueryAllianceDelegationRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceDelegation", data);
    return promise.then(data => QueryAllianceDelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCAllianceDelegation(request: QueryIBCAllianceDelegationRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationResponse> {
    const data = QueryIBCAllianceDelegationRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "IBCAllianceDelegation", data);
    return promise.then(data => QueryAllianceDelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceDelegationRewards(request: QueryAllianceDelegationRewardsRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationRewardsResponse> {
    const data = QueryAllianceDelegationRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceDelegationRewards", data);
    return promise.then(data => QueryAllianceDelegationRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCAllianceDelegationRewards(request: QueryIBCAllianceDelegationRewardsRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationRewardsResponse> {
    const data = QueryIBCAllianceDelegationRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "IBCAllianceDelegationRewards", data);
    return promise.then(data => QueryAllianceDelegationRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceUnbondingsByDenomAndDelegator(request: QueryAllianceUnbondingsByDenomAndDelegatorRequest, useInterfaces: boolean = true): Promise<QueryAllianceUnbondingsByDenomAndDelegatorResponse> {
    const data = QueryAllianceUnbondingsByDenomAndDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceUnbondingsByDenomAndDelegator", data);
    return promise.then(data => QueryAllianceUnbondingsByDenomAndDelegatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceUnbondings(request: QueryAllianceUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryAllianceUnbondingsResponse> {
    const data = QueryAllianceUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceUnbondings", data);
    return promise.then(data => QueryAllianceUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allianceRedelegations(request: QueryAllianceRedelegationsRequest, useInterfaces: boolean = true): Promise<QueryAllianceRedelegationsResponse> {
    const data = QueryAllianceRedelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "AllianceRedelegations", data);
    return promise.then(data => QueryAllianceRedelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  alliance(request: QueryAllianceRequest, useInterfaces: boolean = true): Promise<QueryAllianceResponse> {
    const data = QueryAllianceRequest.encode(request).finish();
    const promise = this.rpc.request("alliance.alliance.Query", "Alliance", data);
    return promise.then(data => QueryAllianceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    alliances(request?: QueryAlliancesRequest, useInterfaces: boolean = true): Promise<QueryAlliancesResponse> {
      return queryService.alliances(request, useInterfaces);
    },
    iBCAlliance(request: QueryIBCAllianceRequest, useInterfaces: boolean = true): Promise<QueryAllianceResponse> {
      return queryService.iBCAlliance(request, useInterfaces);
    },
    allAlliancesDelegations(request?: QueryAllAlliancesDelegationsRequest, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
      return queryService.allAlliancesDelegations(request, useInterfaces);
    },
    allianceValidator(request: QueryAllianceValidatorRequest, useInterfaces: boolean = true): Promise<QueryAllianceValidatorResponse> {
      return queryService.allianceValidator(request, useInterfaces);
    },
    allAllianceValidators(request?: QueryAllAllianceValidatorsRequest, useInterfaces: boolean = true): Promise<QueryAllianceValidatorsResponse> {
      return queryService.allAllianceValidators(request, useInterfaces);
    },
    alliancesDelegation(request: QueryAlliancesDelegationsRequest, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
      return queryService.alliancesDelegation(request, useInterfaces);
    },
    alliancesDelegationByValidator(request: QueryAlliancesDelegationByValidatorRequest, useInterfaces: boolean = true): Promise<QueryAlliancesDelegationsResponse> {
      return queryService.alliancesDelegationByValidator(request, useInterfaces);
    },
    allianceDelegation(request: QueryAllianceDelegationRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationResponse> {
      return queryService.allianceDelegation(request, useInterfaces);
    },
    iBCAllianceDelegation(request: QueryIBCAllianceDelegationRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationResponse> {
      return queryService.iBCAllianceDelegation(request, useInterfaces);
    },
    allianceDelegationRewards(request: QueryAllianceDelegationRewardsRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationRewardsResponse> {
      return queryService.allianceDelegationRewards(request, useInterfaces);
    },
    iBCAllianceDelegationRewards(request: QueryIBCAllianceDelegationRewardsRequest, useInterfaces: boolean = true): Promise<QueryAllianceDelegationRewardsResponse> {
      return queryService.iBCAllianceDelegationRewards(request, useInterfaces);
    },
    allianceUnbondingsByDenomAndDelegator(request: QueryAllianceUnbondingsByDenomAndDelegatorRequest, useInterfaces: boolean = true): Promise<QueryAllianceUnbondingsByDenomAndDelegatorResponse> {
      return queryService.allianceUnbondingsByDenomAndDelegator(request, useInterfaces);
    },
    allianceUnbondings(request: QueryAllianceUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryAllianceUnbondingsResponse> {
      return queryService.allianceUnbondings(request, useInterfaces);
    },
    allianceRedelegations(request: QueryAllianceRedelegationsRequest, useInterfaces: boolean = true): Promise<QueryAllianceRedelegationsResponse> {
      return queryService.allianceRedelegations(request, useInterfaces);
    },
    alliance(request: QueryAllianceRequest, useInterfaces: boolean = true): Promise<QueryAllianceResponse> {
      return queryService.alliance(request, useInterfaces);
    }
  };
};